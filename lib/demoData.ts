import { DocumentRequirement, DemoScenario } from './types';
export { LIFE_EVENTS } from './demoData/lifeEvents';
export { GOVERNMENT_SERVICES } from './demoData/services';

export const DOCUMENT_TYPES: DocumentRequirement[] = [
  {
    id: 'aadhaar', name: 'Aadhaar Card', category: 'identity',
    description: '12-digit unique identity number issued by UIDAI, linked with mobile number and bank account.',
    issuingAuthority: 'Unique Identification Authority of India (UIDAI)', validityPeriod: 'Lifetime',
    sampleFields: ['Aadhaar No', 'Full Name', 'DOB', 'Linked Mobile'], digitalAccessUrl: 'https://myaadhaar.uidai.gov.in',
    isDigiLockerAvailable: true, status: 'missing',
  },
  {
    id: 'income_cert', name: 'Income Certificate (Meeseva / e-District)', category: 'income',
    description: 'Official revenue document stating the annual household income from all verified sources.',
    issuingAuthority: 'Tahsildar / Revenue Department (State Gov)', validityPeriod: '1 Year (Financial Year based)',
    sampleFields: ['Certificate No', 'Applicant Name', 'Annual Family Income (INR)', 'Valid Till Date'],
    digitalAccessUrl: 'https://serviceonline.gov.in', isDigiLockerAvailable: true, status: 'missing',
  },
  {
    id: 'residence_cert', name: 'Residence / Domicile Certificate', category: 'residence',
    description: 'Proof of permanent residency in the state for availing state-level quotas and welfare schemes.',
    issuingAuthority: 'Tahsildar / Sub-Divisional Magistrate (SDM)', validityPeriod: 'Usually 3 Years or Permanent',
    sampleFields: ['Domicile No', 'Resident Name', 'Mandal / District'], digitalAccessUrl: 'https://serviceonline.gov.in',
    isDigiLockerAvailable: true, status: 'missing',
  },
  {
    id: 'caste_cert', name: 'Integrated Community / Caste Certificate', category: 'identity',
    description: 'Certified confirmation of SC, ST, OBC or EWS category for quota and fee reimbursement.',
    issuingAuthority: 'Revenue Divisional Officer (RDO) / Tahsildar', validityPeriod: 'Permanent (NCL valid 1 year)',
    sampleFields: ['Caste / Sub-caste', 'Category', 'NCL Status'], digitalAccessUrl: 'https://serviceonline.gov.in',
    isDigiLockerAvailable: true, status: 'missing',
  },
  {
    id: 'bank_passbook', name: 'Aadhaar-Seeded Bank Passbook / DBT Mandate', category: 'identity',
    description: 'Bank account passbook with active NPCI Aadhaar seeding for Direct Benefit Transfer (DBT).',
    issuingAuthority: 'Scheduled Commercial Bank / Post Office Payment Bank', validityPeriod: 'Active',
    sampleFields: ['Account No', 'IFSC Code', 'Aadhaar NPCI Status'], isDigiLockerAvailable: false, status: 'missing',
  },
  {
    id: 'education_marksheet', name: 'Academic Marks Sheet & Bonafide Certificate', category: 'academic',
    description: 'College bonafide letter with current semester enrollment number and previous mark sheets.',
    issuingAuthority: 'Affiliated University / College Principal', validityPeriod: 'Current Academic Year',
    sampleFields: ['Roll No', 'College Code', 'Course Name'], isDigiLockerAvailable: true, status: 'needs_verification',
  },
  {
    id: 'land_patta_passbook', name: 'Agricultural Land Title (Pattadar Passbook / 1-B)', category: 'land',
    description: 'Revenue land record verifying ownership, survey numbers, and cultivated crop extent.',
    issuingAuthority: 'State Land Revenue Department', validityPeriod: 'Current Records',
    sampleFields: ['Khata No', 'Survey No', 'Extent (Acres)'], isDigiLockerAvailable: true, status: 'missing',
  },
  {
    id: 'disaster_damage_report', name: 'Disaster Damage Assessment Report / VRO Panchanama', category: 'disaster',
    description: 'Joint survey inspection report prepared by Village Revenue Officer (VRO) / Panchayat Secretary documenting damage extent.',
    issuingAuthority: 'Revenue Department / District Disaster Management Authority (DDMA)', validityPeriod: 'Current Calamity Event',
    sampleFields: ['Survey Report No', 'Damage Category (Pucca/Kutcha/Inundated)', 'House Address', 'Geo-tagged Photos'],
    isDigiLockerAvailable: false, status: 'needs_verification',
  },
  {
    id: 'death_certificate', name: 'Official Death Certificate (CRS)', category: 'legal',
    description: 'Statutory certificate issued under Registration of Births and Deaths Act (Form 6).',
    issuingAuthority: 'Municipal Registrar / Panchayat Secretary (CRS / e-JanMa)', validityPeriod: 'Permanent',
    sampleFields: ['Deceased Name', 'Date of Death', 'Registration No'], digitalAccessUrl: 'https://crsorgi.gov.in',
    isDigiLockerAvailable: true, status: 'missing',
  },
  {
    id: 'legal_heir_cert', name: 'Legal Heir / Family Member Certificate', category: 'legal',
    description: 'Revenue certificate listing all surviving legal heirs for inheritance and benefit claims.',
    issuingAuthority: 'Tahsildar / Executive Magistrate', validityPeriod: 'Permanent',
    sampleFields: ['Deceased Person', 'Heir Names', 'Relationship'], digitalAccessUrl: 'https://serviceonline.gov.in',
    isDigiLockerAvailable: false, status: 'missing',
  },
  {
    id: 'udyam_registration', name: 'Udyam MSME Registration Certificate', category: 'business',
    description: 'Zero-cost self-declaration certificate recognizing the micro or small business enterprise.',
    issuingAuthority: 'Ministry of Micro, Small and Medium Enterprises (MSME)', validityPeriod: 'Lifetime',
    sampleFields: ['Udyam Reg No', 'Enterprise Name', 'Major Activity'], digitalAccessUrl: 'https://udyamregistration.gov.in',
    isDigiLockerAvailable: true, status: 'missing',
  },
  {
    id: 'ration_card', name: 'Ration Card / Food Security Card (NFSA / State PDS)', category: 'identity',
    description: 'National Food Security Act (NFSA) or State Food Civil Supplies card (PHH/AAY/White/BPL card) determining household subsidy eligibility.',
    issuingAuthority: 'Department of Food, Civil Supplies and Consumer Affairs', validityPeriod: 'Active / Periodic Renewal',
    sampleFields: ['Ration Card No', 'Head of Family', 'Card Type (PHH/AAY/NPHH)', 'Family Members'], digitalAccessUrl: 'https://nfsa.gov.in',
    isDigiLockerAvailable: true, status: 'missing',
  },
  {
    id: 'medical_certificate', name: 'Medical Certificate / Hospital Treatment Record', category: 'medical',
    description: 'Official diagnosis report, government hospital prescription, discharge summary, or medical officer fitness/illness certification.',
    issuingAuthority: 'Registered Medical Practitioner / Government District Hospital / Civil Surgeon', validityPeriod: 'As per treatment course',
    sampleFields: ['Patient Name', 'Diagnosis / ICD Code', 'Treating Doctor Reg No', 'Hospital Name'],
    isDigiLockerAvailable: false, status: 'missing',
  },
  {
    id: 'disability_certificate', name: 'Unique Disability ID (UDID) / Medical Board Certificate', category: 'medical',
    description: 'Statutory certificate and smart card issued to persons with disabilities under the RPwD Act.',
    issuingAuthority: 'Department of Empowerment of Persons with Disabilities / District Medical Board', validityPeriod: 'Permanent or Temporary (5 Years)',
    sampleFields: ['UDID Number', 'Disability Type', 'Percentage of Disability', 'Issuing Medical Board'], digitalAccessUrl: 'https://swavlambancard.gov.in',
    isDigiLockerAvailable: true, status: 'missing',
  },
];


export const DEMO_SCENARIOS: DemoScenario[] = [
  {
    id: 'demo-cyclone', title: 'Cyclone-Damaged House Relief', badge: 'Disaster & Housing Relief',
    shortDescription: 'Residential home in coastal Andhra Pradesh destroyed by cyclone heavy rains; navigating SDRF relief compensation.',
    initialQuery: 'My house was destroyed because of cyclone damage. What government help can I get?',
    lifeEventId: 'disaster', expectedPrimary: 'disaster', expectedSecondary: ['housing', 'financial_assistance'],
    profile: {
      name: 'Venkata Ramana', age: 42, residenceState: 'Andhra Pradesh', residenceDistrict: 'Kakinada',
      propertyState: 'Andhra Pradesh', propertyDistrict: 'Kakinada', ruralUrban: 'rural',
      occupation: 'Artisan / Daily Wage', hasHouseDamage: true, annualIncome: 140000, isBPL: true, hasBankLinkedAadhaar: true,
    },
  },
  {
    id: 'demo-student', title: 'Student Seeking Financial Support', badge: 'Education & Scholarship',
    shortDescription: '20-year-old B.Tech student from Andhra Pradesh with household income ₹2.5 Lakh.',
    initialQuery: 'I am a 20-year-old B.Tech student from Andhra Pradesh and my family income is ₹2.5 lakh. What support can I get?',
    lifeEventId: 'education', expectedPrimary: 'education', expectedSecondary: ['financial_assistance'],
    profile: {
      name: 'Ravi Kumar', age: 20, residenceState: 'Andhra Pradesh', residenceDistrict: 'Visakhapatnam',
      studyState: 'Andhra Pradesh', educationLevel: 'B.Tech', annualIncome: 250000, socialCategory: 'OBC', isStudent: true, hasBankLinkedAadhaar: true,
    },
  },
  {
    id: 'demo-farmer', title: 'Farmer Facing Crop Damage', badge: 'Agriculture & Disaster Relief',
    shortDescription: 'Small farmer in Andhra Pradesh with 2.5 acres paddy damaged by heavy unseasonal rains.',
    initialQuery: 'My crops were destroyed by heavy rain. How do I claim insurance?',
    lifeEventId: 'agriculture', expectedPrimary: 'agriculture', expectedSecondary: ['disaster', 'financial_assistance'],
    profile: {
      name: 'Subba Rao', age: 48, residenceState: 'Andhra Pradesh', residenceDistrict: 'East Godavari',
      agricultureState: 'Andhra Pradesh', ruralUrban: 'rural', occupation: 'Farmer', landHoldingAcres: 2.5,
      isFarmer: true, hasInsurance: true, hasBankLinkedAadhaar: true, annualIncome: 180000, isBPL: true,
    },
  },
  {
    id: 'demo-unemployed', title: 'Unemployed Youth Seeking Skill Training', badge: 'Employment & Apprenticeship',
    shortDescription: 'Graduate looking for apprenticeship with government stipend and skill certification.',
    initialQuery: 'I lost my job. What skill training and stipend support can I get?',
    lifeEventId: 'employment', expectedPrimary: 'employment', expectedSecondary: ['financial_assistance'],
    profile: {
      name: 'Suresh Verma', age: 24, residenceState: 'Telangana', residenceDistrict: 'Hyderabad',
      educationLevel: 'Graduate', annualIncome: 100000, hasBankLinkedAadhaar: true,
    },
  },
  {
    id: 'demo-business', title: 'Starting a Small Business', badge: 'MSME & Entrepreneurship',
    shortDescription: 'First-time entrepreneur seeking ₹3 Lakh collateral-free Mudra loan for a retail shop.',
    initialQuery: 'I want to start a small shop and need a collateral-free loan.',
    lifeEventId: 'business', expectedPrimary: 'business', expectedSecondary: ['financial_assistance'],
    profile: {
      name: 'Priya Sharma', age: 27, residenceState: 'Delhi', ruralUrban: 'urban',
      isBusinessOwner: true, businessType: 'Small (Kishor)', annualIncome: 200000, hasBankLinkedAadhaar: true,
    },
  },
  {
    id: 'demo-bereavement', title: 'Family Bereavement & Formalities', badge: 'Bereavement & Succession',
    shortDescription: 'Navigating civil death registration, legal heir certificate, and survivor claims after loss of parent.',
    initialQuery: 'My father passed away. What government-related things do I need to take care of?',
    lifeEventId: 'bereavement', expectedPrimary: 'bereavement', expectedSecondary: ['identity_documents'],
    profile: {
      name: 'Aditya Varma', age: 26, residenceState: 'Andhra Pradesh', residenceDistrict: 'Guntur', hasBankLinkedAadhaar: true,
    },
  },
  {
    id: 'demo-lost-doc', title: 'Lost Aadhaar Card Retrieval', badge: 'Identity & Documents',
    shortDescription: 'Citizen lost wallet containing Aadhaar card, seeking duplicate e-Aadhaar retrieval and PVC reprint.',
    initialQuery: 'I lost my Aadhaar card. How do I get an official duplicate reprint?',
    lifeEventId: 'identity_documents', expectedPrimary: 'identity_documents', expectedSecondary: ['other'],
    profile: {
      name: 'Kavitha M', age: 31, residenceState: 'Tamil Nadu', residenceDistrict: 'Chennai', hasBankLinkedAadhaar: true,
    },
  },
  {
    id: 'demo-healthcare', title: 'Low-Income Family Medical Treatment', badge: 'Healthcare & Health Insurance',
    shortDescription: 'Citizen seeking cashless hospital treatment and health insurance for family hospitalization in Andhra Pradesh.',
    initialQuery: 'I need government health insurance for medical treatment and hospital surgery.',
    lifeEventId: 'healthcare', expectedPrimary: 'healthcare', expectedSecondary: ['financial_assistance'],
    profile: {
      name: 'Lakshmi Devi', age: 38, residenceState: 'Andhra Pradesh', residenceDistrict: 'Guntur',
      annualIncome: 180000, isBPL: true, hasBankLinkedAadhaar: true, hasInsurance: false,
    },
  },
];
