import { GOVERNMENT_SERVICES, DOCUMENT_TYPES, LIFE_EVENTS, DEMO_SCENARIOS } from '../lib/demoData';
import { DISCOVER_CATEGORIES } from '../components/ui/discover-filters-bar';
import { classifyLifeEvent } from '../lib/rulesEngine/classify';
import { findRelevantServices } from '../lib/rulesEngine/findServices';
import { INDIA_STATES_AND_UTS } from '../lib/indiaRegions';
import { CitizenProfile, LifeEvent } from '../lib/types';

function runTestSuite() {
  console.log('====================================================');
  console.log('JANSETU HEALTHCARE EXPANSION COMPREHENSIVE TEST SUITE');
  console.log('====================================================\n');

  let passedTests = 0;
  let totalTests = 0;

  function assert(condition: boolean, testName: string, detail?: string) {
    totalTests++;
    if (condition) {
      console.log(`[PASS] ${testName}`);
      passedTests++;
    } else {
      console.error(`[FAIL] ${testName}${detail ? ` -> ${detail}` : ''}`);
    }
  }

  // ----------------------------------------------------
  // Dimension A: Scheme count & breakdown
  // ----------------------------------------------------
  console.log('\n--- Dimension A: Scheme Inventory & Dataset Breakdown ---');
  const allServices = GOVERNMENT_SERVICES;
  const healthcareServices = allServices.filter(s => s.category === 'healthcare');
  const centralHealthcare = healthcareServices.filter(s => s.jurisdictionLevel === 'CENTRAL');
  const stateHealthcare = healthcareServices.filter(s => s.jurisdictionLevel === 'STATE');

  assert(allServices.length >= 80, `Total schemes in database >= 80 (Found: ${allServices.length})`);
  assert(healthcareServices.length >= 33, `Total healthcare schemes >= 33 (Found: ${healthcareServices.length})`);
  assert(centralHealthcare.length >= 5, `Central healthcare schemes >= 5 (Found: ${centralHealthcare.length})`);
  assert(stateHealthcare.length >= 28, `State healthcare schemes >= 28 (Found: ${stateHealthcare.length})`);

  // Check specific central healthcare IDs
  const centralIds = ['pmjay_ayushman_bharat', 'pm_matru_vandana_yojana', 'janani_suraksha_yojana', 'nikshay_poshan_yojana', 'ayushman_arogya_mandir'];
  for (const id of centralIds) {
    assert(centralHealthcare.some(s => s.id === id), `Central healthcare scheme present: ${id}`);
  }

  // ----------------------------------------------------
  // Dimension B & C & D: All 28 States Covered & Strict Jurisdiction Isolation
  // ----------------------------------------------------
  console.log('\n--- Dimensions B, C & D: 28 States Healthcare Coverage & State Isolation ---');
  const states28 = INDIA_STATES_AND_UTS.filter(r => r.type === 'STATE').map(s => s.name);
  assert(states28.length === 28, `Exactly 28 states identified in India regions (Found: ${states28.length})`);

  const healthcareEvent = LIFE_EVENTS.find(e => e.id === 'healthcare')!;
  assert(!!healthcareEvent, 'Healthcare life event is present in LIFE_EVENTS');

  for (const stateName of states28) {
    const profile: CitizenProfile = {
      residenceState: stateName,
      annualIncome: 150000,
      isBPL: true,
      hasBankLinkedAadhaar: true,
      hasInsurance: false,
    };

    const result = findRelevantServices(profile, healthcareEvent);
    const stateMatched = result.recommendations.filter(r => r.service.jurisdictionLevel === 'STATE');
    const centralMatched = result.recommendations.filter(r => r.service.jurisdictionLevel === 'CENTRAL');

    // 1. Must match at least 1 dedicated state scheme for this state
    assert(
      stateMatched.length >= 1,
      `State ${stateName} has matching state healthcare scheme (Found: ${stateMatched.map(s => s.service.name).join(', ')})`
    );

    // 2. All matched state schemes must apply to this state
    const foreignStateMatched = stateMatched.filter(s => !s.service.applicableStates.includes(stateName) && !s.service.applicableStates.includes('ALL'));
    assert(
      foreignStateMatched.length === 0,
      `State ${stateName} received NO foreign state schemes (Violations: ${foreignStateMatched.map(s => s.service.name).join(', ')})`
    );

    // 3. Must match central healthcare schemes
    assert(
      centralMatched.length >= 1,
      `State ${stateName} matched Central healthcare schemes (Count: ${centralMatched.length})`
    );
  }

  // ----------------------------------------------------
  // Dimension E: Wrong-State Exclusion Rigorous Cross-Test
  // ----------------------------------------------------
  console.log('\n--- Dimension E: Negative Cross-State Exclusion Verification ---');
  // Citizen of Andhra Pradesh
  const apProfile: CitizenProfile = {
    residenceState: 'Andhra Pradesh',
    annualIncome: 180000,
    isBPL: true,
  };
  const apResults = findRelevantServices(apProfile, healthcareEvent);
  const apExcludedIds = apResults.excludedServices.map(e => e.serviceId);

  // Must include AP scheme
  assert(apResults.recommendations.some(r => r.serviceId === 'ap_ntr_vaidya_seva'), 'AP citizen matches Dr. NTR Vaidya Seva');
  // Must exclude other states: KA, TN, KL, MH, WB, GJ, RJ, OD, CG, JH
  assert(apExcludedIds.includes('karnataka_arogya_karnataka'), 'AP citizen strictly excludes Karnataka AB-ArK');
  assert(apExcludedIds.includes('tn_cmchis'), 'AP citizen strictly excludes Tamil Nadu CMCHIS');
  assert(apExcludedIds.includes('kerala_kasp'), 'AP citizen strictly excludes Kerala KASP');
  assert(apExcludedIds.includes('maharashtra_mjpjay'), 'AP citizen strictly excludes Maharashtra MJPJAY');
  assert(apExcludedIds.includes('wb_swasthya_sathi'), 'AP citizen strictly excludes West Bengal Swasthya Sathi');
  assert(apExcludedIds.includes('rajasthan_maa'), 'AP citizen strictly excludes Rajasthan MAA');
  assert(apExcludedIds.includes('odisha_gjay'), 'AP citizen strictly excludes Odisha GJAY');
  assert(apExcludedIds.includes('cg_svnsasy'), 'AP citizen strictly excludes Chhattisgarh SVNSASY');
  assert(apExcludedIds.includes('jharkhand_massy'), 'AP citizen strictly excludes Jharkhand MASSY');

  // Citizen of West Bengal
  const wbProfile: CitizenProfile = {
    residenceState: 'West Bengal',
    annualIncome: 200000,
  };
  const wbResults = findRelevantServices(wbProfile, healthcareEvent);
  assert(wbResults.recommendations.some(r => r.serviceId === 'wb_swasthya_sathi'), 'WB citizen matches Swasthya Sathi');
  assert(wbResults.excludedServices.some(e => e.serviceId === 'ap_ntr_vaidya_seva'), 'WB citizen excludes AP NTR Vaidya Seva');
  assert(wbResults.excludedServices.some(e => e.serviceId === 'telangana_aarogyasri'), 'WB citizen excludes Telangana Rajiv Aarogyasri');

  // ----------------------------------------------------
  // Dimension F: Eligibility & Income Confidence Scoring
  // ----------------------------------------------------
  console.log('\n--- Dimension F: Eligibility Rules & Confidence Scoring ---');
  const bplProfile: CitizenProfile = {
    residenceState: 'Andhra Pradesh',
    annualIncome: 120000,
    isBPL: true,
    hasBankLinkedAadhaar: true,
  };
  const bplMatch = findRelevantServices(bplProfile, healthcareEvent);
  const pmjayRec = bplMatch.recommendations.find(r => r.serviceId === 'pmjay_ayushman_bharat');
  assert(!!pmjayRec, 'BPL citizen matches PM-JAY');
  assert(pmjayRec!.confidenceScore >= 70, `PM-JAY confidence score is strong (Score: ${pmjayRec?.confidenceScore})`);

  // ----------------------------------------------------
  // Dimension G: Document Requirements & Default Truthful Status
  // ----------------------------------------------------
  console.log('\n--- Dimension G: Truthful Document Verification & Readiness ---');
  const medicalDoc = DOCUMENT_TYPES.find(d => d.id === 'medical_certificate');
  const disabilityDoc = DOCUMENT_TYPES.find(d => d.id === 'disability_certificate');
  const rationCardDoc = DOCUMENT_TYPES.find(d => d.id === 'ration_card');

  assert(!!medicalDoc, 'medical_certificate exists in DOCUMENT_TYPES');
  assert(medicalDoc?.status === 'missing', `medical_certificate default status is truthful "missing" (Actual: ${medicalDoc?.status})`);
  assert(medicalDoc?.category === 'medical', `medical_certificate category is "medical" (Actual: ${medicalDoc?.category})`);

  assert(!!disabilityDoc, 'disability_certificate exists in DOCUMENT_TYPES');
  assert(disabilityDoc?.status === 'missing', `disability_certificate default status is truthful "missing" (Actual: ${disabilityDoc?.status})`);

  assert(!!rationCardDoc, 'ration_card exists in DOCUMENT_TYPES');
  assert(rationCardDoc?.status === 'missing', `ration_card default status is truthful "missing" (Actual: ${rationCardDoc?.status})`);

  // ----------------------------------------------------
  // Dimension H: Multilingual Intent Classification (All 13 Languages + Romanized)
  // ----------------------------------------------------
  console.log('\n--- Dimension H: Intent Classification across 13 Languages + Transliterations ---');
  const multilingualQueries = [
    { lang: 'English', query: 'I need government health insurance for medical treatment and hospital surgery' },
    { lang: 'Hindi', query: 'मुझे अस्पताल में इलाज और सर्जरी के लिए स्वास्थ्य बीमा चाहिए' },
    { lang: 'Telugu', query: 'నాకు ఆసుపత్రిలో శస్త్రచికిత్స కోసం ఆరోగ్యశ్రీ సహాయం కావాలి' },
    { lang: 'Tamil', query: 'மருத்துவமனை சிகிச்சை மற்றும் அறுவை சிகிச்சைக்கு மருத்துவ காப்பீடு தேவை' },
    { lang: 'Kannada', query: 'ಆಸ್ಪತ್ರೆ ಚಿಕಿತ್ಸೆ ಮತ್ತು ಶಸ್ತ್ರಚಿಕಿತ್ಸೆಗಾಗಿ ಆರೋಗ್ಯ ವಿಮೆ ಬೇಕು' },
    { lang: 'Malayalam', query: 'ആശുപത്രി ചികിത്സയ്ക്കും ശസ്ത്രക്രിയയ്ക്കും ആരോഗ്യ ഇൻഷുറൻസ് വേണം' },
    { lang: 'Marathi', query: 'रुग्णालयात उपचार आणि शस्त्रक्रियेसाठी आरोग्य विमा हवा आहे' },
    { lang: 'Bengali', query: 'হাসপাতালে চিকিৎসা এবং অস্ত্রোপচারের জন্য স্বাস্থ্য বীমা প্রয়োজন' },
    { lang: 'Gujarati', query: 'હોસ્પિટલમાં સારવાર અને ઓપરેશન માટે સ્વાસ્થ્ય વીમો જોઈએ છે' },
    { lang: 'Punjabi', query: 'ਹਸਪਤਾਲ ਵਿੱਚ ਇਲਾਜ ਅਤੇ ਸਰਜਰੀ ਲਈ ਸਿਹਤ ਬੀਮਾ ਚਾਹੀਦਾ ਹੈ' },
    { lang: 'Odia', query: 'ଡାକ୍ତରଖାନାରେ ଚିକିତ୍ସା ଏବଂ ଅସ୍ତ୍ରୋପଚାର ପାଇଁ ସ୍ୱାସ୍ଥ୍ୟ ବୀମା ଆବଶ୍ୟକ' },
    { lang: 'Assamese', query: 'হাস্পাতালত চিকিৎসা আৰু অস্ত্ৰোপচাৰৰ বাবে স্বাস্থ্য বীমা লাগে' },
    { lang: 'Urdu', query: 'ہسپتال میں علاج اور جراحی کے لیے صحت کارڈ چاہیے' },
    { lang: 'Romanized Hindi', query: 'mujhe aspataal me ilaj aur operation ke liye ayushman card chahiye' },
    { lang: 'Romanized Telugu', query: 'naaku hospital lo operation kosam aarogyasri card kavali' },
    { lang: 'Romanized Telugu (NTR Vaidya Seva)', query: 'naaku operation kosam ntr vaidya seva health card kavali' },
    { lang: 'Telugu (NTR Vaidya Seva)', query: 'నాకు శస్త్రచికిత్స కోసం ఎన్టీఆర్ వైద్య సేవ కార్డు కావాలి' },
  ];

  for (const testCase of multilingualQueries) {
    const classification = classifyLifeEvent(testCase.query);
    assert(
      classification.primaryIntent === 'healthcare',
      `Language [${testCase.lang}] correctly classified as healthcare`,
      `Got ${classification.primaryIntent} for query: "${testCase.query}"`
    );
  }

  // ----------------------------------------------------
  // Dimension I: Medical Specific Edge Queries
  // ----------------------------------------------------
  console.log('\n--- Dimension I: Medical Edge Queries (Cancer, Dialysis, TB, Maternity) ---');
  const edgeQueries = [
    { label: 'Cancer & Chemotherapy', query: 'My father was diagnosed with cancer and needs chemotherapy assistance' },
    { label: 'Kidney Dialysis', query: 'How to get free dialysis support and kidney treatment?' },
    { label: 'Tuberculosis & Nutrition', query: 'TB patient seeking monthly nutrition DBT support under Nikshay' },
    { label: 'Maternity Institutional Delivery', query: 'Pregnant woman looking for PMMVY maternity benefits and safe delivery grant' },
    { label: 'Cashless Card Download', query: 'Where to download Ayushman Bharat Golden Card for cashless admission?' },
    { label: 'Primary Healthcare Clinic', query: 'Free medical checkup and medicines at Ayushman Arogya Mandir' },
  ];

  for (const edge of edgeQueries) {
    const res = classifyLifeEvent(edge.query);
    assert(res.primaryIntent === 'healthcare', `Edge query [${edge.label}] classified as healthcare`);
  }

  // ----------------------------------------------------
  // Dimension J: Discover Filters Bar Integration
  // ----------------------------------------------------
  console.log('\n--- Dimension J: Discover Filters Bar Category Integration ---');
  const healthcareCategory = DISCOVER_CATEGORIES.find(c => c.value === 'healthcare');
  assert(!!healthcareCategory, 'healthcare category exists in DISCOVER_CATEGORIES');
  assert(healthcareCategory?.label === 'Healthcare & Medical Assistance', 'healthcare category has correct label');

  // ----------------------------------------------------
  // Dimension K: Demo Scenarios & Life Events
  // ----------------------------------------------------
  console.log('\n--- Dimension K: Demo Scenarios & Life Events Data ---');
  const healthcareDemo = DEMO_SCENARIOS.find(d => d.id === 'demo-healthcare');
  assert(!!healthcareDemo, 'demo-healthcare scenario is present in DEMO_SCENARIOS');
  assert(healthcareDemo?.expectedPrimary === 'healthcare', 'demo-healthcare expected primary is healthcare');

  // ----------------------------------------------------
  // Dimension L: Zero Regression on Existing 51 Schemes & Other Categories
  // ----------------------------------------------------
  console.log('\n--- Dimension L: Zero Regression on Existing Domains ---');
  const educationQuery = 'I am a 20-year-old B.Tech student from Andhra Pradesh and my family income is ₹2.5 lakh. What support can I get?';
  const eduClass = classifyLifeEvent(educationQuery);
  assert(eduClass.primaryIntent === 'education', 'Education classification intact');

  const disasterQuery = 'My house was destroyed because of cyclone damage. What government relief can I get?';
  const disClass = classifyLifeEvent(disasterQuery);
  assert(disClass.primaryIntent === 'disaster', 'Disaster classification intact');

  const agriQuery = 'My crops were destroyed by heavy rain. How do I claim insurance?';
  const agriClass = classifyLifeEvent(agriQuery);
  assert(agriClass.primaryIntent === 'agriculture', 'Agriculture crop loss classification intact');

  const businessQuery = 'I want to start a small shop and need a collateral-free loan.';
  const bizClass = classifyLifeEvent(businessQuery);
  assert(bizClass.primaryIntent === 'business', 'Business loan classification intact');

  const bereavementQuery = 'My father passed away recently. What government-related things do I need to take care of?';
  const berClass = classifyLifeEvent(bereavementQuery);
  assert(berClass.primaryIntent === 'bereavement', 'Bereavement classification intact');

  const docQuery = 'I lost my Aadhaar card. How do I get an official duplicate reprint?';
  const docClass = classifyLifeEvent(docQuery);
  assert(docClass.primaryIntent === 'identity_documents', 'Identity documents classification intact');

  // Verify non-healthcare schemes are untouched
  const educationServices = GOVERNMENT_SERVICES.filter(s => s.category === 'education');
  const agriServices = GOVERNMENT_SERVICES.filter(s => s.category === 'agriculture');
  const disasterServices = GOVERNMENT_SERVICES.filter(s => s.category === 'disaster');
  const businessServices = GOVERNMENT_SERVICES.filter(s => s.category === 'business');
  const bereavementServices = GOVERNMENT_SERVICES.filter(s => s.category === 'bereavement');

  assert(educationServices.length >= 35, `Education schemes preserved (Count: ${educationServices.length})`);
  assert(agriServices.length >= 3, `Agriculture schemes preserved (Count: ${agriServices.length})`);
  assert(disasterServices.length >= 1, `Disaster schemes preserved (Count: ${disasterServices.length})`);
  assert(businessServices.length >= 1, `Business schemes preserved (Count: ${businessServices.length})`);
  assert(bereavementServices.length >= 2, `Bereavement schemes preserved (Count: ${bereavementServices.length})`);

  console.log('\n====================================================');
  console.log(`TEST SUITE SUMMARY: ${passedTests}/${totalTests} TESTS PASSED`);
  console.log('====================================================');

  if (passedTests !== totalTests) {
    process.exit(1);
  }
}

runTestSuite();
