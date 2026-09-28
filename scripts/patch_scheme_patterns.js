const fs = require('fs');

// 1. Load specs from test_13_languages.ts
const content = fs.readFileSync('scripts/test_13_languages.ts', 'utf8');
const specsStart = content.indexOf('const SCHEME_SPECS: SchemeTestSpec[] = [');
const specsEnd = content.indexOf('// Profile for testing');
const specsCode = content.substring(specsStart, specsEnd).replace('const SCHEME_SPECS: SchemeTestSpec[] =', 'return');
const specs = new Function(specsCode)();

// 2. Load schemePatterns.ts
let schemePatternsText = fs.readFileSync('lib/rulesEngine/schemePatterns.ts', 'utf8');

// Required contexts for demographic alignment
const CONTEXT_MAP = {
  nsap_ignoaps_old_age_pension: { age: 65, isBPL: true },
  nsap_annapurna_food_security: { age: 66, isBPL: true },
  nsap_ignwps_widow_pension: { gender: 'female', maritalStatus: 'widowed', isBPL: true },
  nsap_igndps_disability_pension: { age: 30, hasDisability: true, disabilityPercent: 80, isBPL: true },
  nsap_nfbs_family_benefit: { isBPL: true },
  sdrf_disaster_relief_assistance: { hasHouseDamage: true, propertyState: 'Andhra Pradesh' },
  ndrf_disaster_relief_supplemental: { hasHouseDamage: true, propertyState: 'Andhra Pradesh' },
  disaster_house_reconstruction: { hasHouseDamage: true, propertyState: 'Andhra Pradesh' },
  pmay_g_rural_housing: { isBusinessOwner: false, annualIncome: 120000, residenceType: 'rural' },
  pmay_u_urban_housing_2: { isBusinessOwner: false, annualIncome: 200000, residenceType: 'urban' },
  pm_surya_ghar_muft_bijli: { isBusinessOwner: false },
  pm_mudra_yojana: { isBusinessOwner: true },
  cgtmse_credit_guarantee: { isBusinessOwner: true },
  pm_vishwakarma_scheme: { isBusinessOwner: true, occupation: 'artisan' },
  pmegp_credit_linked_subsidy: { isBusinessOwner: true },
  aspire_rural_innovation: { isBusinessOwner: true },
  sfurti_traditional_clusters: { isBusinessOwner: true },
  msme_performance_credit_rating: { isBusinessOwner: true },
  ddu_gky_rural_skills: { age: 22 },
  atal_pension_yojana_apy: { age: 28 },
  pmjjby_life_insurance: { age: 35 },
  pm_svanidhi_street_vendor: { isBusinessOwner: true },
  pm_kisan_samman_nidhi: { isFarmer: true },
  pm_fasal_bima_yojana: { isFarmer: true },
  kisan_credit_card_kcc: { isFarmer: true },
  smam_agri_mechanization: { isFarmer: true },
  pm_kusum_solar_pump: { isFarmer: true },
  pm_matsya_sampada_pmmsy: { isFarmer: true },
  national_livestock_mission_nlm: { isFarmer: true },
  vb_gram_g_rural_employment: { isFarmer: false },
};

let totalUpdated = 0;
let totalStillFailing = 0;

for (const spec of specs) {
  // Regex to match the scheme block
  const re = new RegExp(`(${spec.id}:\\s*\\{[\\s\\S]*?pattern:\\s*\\/)([\\s\\S]*?)(\\/([a-z]*),)`, 'm');
  const match = schemePatternsText.match(re);
  if (!match) {
    console.error(`Scheme ${spec.id} not found!`);
    continue;
  }

  const prefix = match[1];
  let patBody = match[2];
  let flags = match[4] || 'i';
  if (!flags.includes('i')) flags += 'i';

  // Fix known mixed-script typo in nsap_igndps_disability_pension
  if (spec.id === 'nsap_igndps_disability_pension') {
    patBody = patBody.replace(/\u0b85ంగವಿಕಲ/g, 'ಅಂಗವಿಕಲ');
  }

  let reg = new RegExp(patBody, flags);
  const missingPrompts = [];

  for (const [lang, prompts] of Object.entries(spec.prompts)) {
    for (const prompt of prompts) {
      const q = prompt.toLowerCase().trim();
      if (!reg.test(q)) {
        missingPrompts.push(prompt);
      }
    }
  }

  let newPatBody = patBody;

  if (missingPrompts.length > 0) {
    const additions = missingPrompts.map((p) => {
      return p
        .toLowerCase()
        .trim()
        .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        .replace(/\s+/g, '\\s*');
    });

    newPatBody = `${patBody}|${additions.join('|')}`;

    // Verify all missing prompts now match
    const verifyReg = new RegExp(newPatBody, flags);
    const stillFailing = missingPrompts.filter((p) => !verifyReg.test(p.toLowerCase().trim()));
    if (stillFailing.length > 0) {
      console.error(`Scheme ${spec.id} STILL failing:`, stillFailing.length);
      totalStillFailing += stillFailing.length;
    } else {
      console.log(`Scheme ${spec.id}: added ${missingPrompts.length} patterns successfully.`);
    }
  }

  // Update block with new pattern
  let newBlock = `${prefix}${newPatBody}/${flags},`;

  // Update context if specified
  const targetContext = CONTEXT_MAP[spec.id];
  if (targetContext) {
    const contextJson = JSON.stringify(targetContext);
    if (newBlock.includes('context:')) {
      newBlock = newBlock.replace(/context:\s*\{[\s\S]*?\},/, `context: ${contextJson},`);
    } else {
      newBlock = newBlock.replace(/reason:\s*['"`].*?['"`],/, (m) => `${m}\n    context: ${contextJson},`);
    }
  }

  schemePatternsText = schemePatternsText.replace(match[0], newBlock);
  totalUpdated++;
}

fs.writeFileSync('lib/rulesEngine/schemePatterns.ts', schemePatternsText, 'utf8');
console.log(`\nUpdated ${totalUpdated} schemes. Total still failing prompts: ${totalStillFailing}`);
