import { LifeEvent } from '../types';

export const DISASTER_HOUSING_EVENTS: LifeEvent[] = [
  {
    id: 'disaster',
    name: 'Disaster, Cyclone & Emergency Relief',
    category: 'disaster',
    description: 'Immediate ex-gratia relief, house damage compensation, and rehabilitation assistance following cyclones, floods, or natural calamities.',
    keywords: ['cyclone', 'flood', 'heavy rain', 'disaster', 'house damaged', 'destroyed', 'rain damage', 'calamity', 'sdrf', 'ndrf', 'storm', 'inundation', 'earthquake'],
    icon: 'AlertTriangle',
    sampleQueries: [
      'My house was destroyed because of cyclone damage.',
      'Our home was submerged in flood waters. How to claim state disaster relief compensation?',
      'Severe rainstorm damaged our roof and belongings. What emergency support is available?',
    ],
    suggestedQuestions: [
      {
        id: 'propertyState', field: 'propertyState', question: 'State where the affected house/property is located', type: 'select',
        options: [
          { label: 'Andhra Pradesh', value: 'Andhra Pradesh' }, { label: 'Tamil Nadu', value: 'Tamil Nadu' },
          { label: 'Telangana', value: 'Telangana' }, { label: 'Odisha', value: 'Odisha' },
          { label: 'West Bengal', value: 'West Bengal' }, { label: 'Kerala', value: 'Kerala' }, { label: 'Other State', value: 'ALL' },
        ],
        defaultValue: 'Andhra Pradesh', required: true,
      },
      {
        id: 'propertyDamageType', field: 'propertyDamageType', question: 'Type and extent of structure damage', type: 'select',
        options: [
          { label: 'Fully Collapsed / Severely Damaged Pucca House', value: 'severe' },
          { label: 'Partially Damaged Kutcha / Pucca House', value: 'partial' },
          { label: 'Severe Inundation / Household Asset Loss', value: 'inundation' },
        ],
        required: true,
      },
    ],
  },
  {
    id: 'housing',
    name: 'Housing & Property Reconstruction',
    category: 'housing',
    description: 'Pucca house construction grants, disaster house reconstruction, and urban/rural housing subsidies under PMAY.',
    keywords: ['house', 'housing', 'pucca house', 'pmay', 'home construction', 'shelter', 'reconstruction', 'property'],
    icon: 'Home',
    sampleQueries: [
      'I need government financial support to reconstruct my damaged house.',
      'How to apply for PMAY-Gramin housing grant?',
    ],
    suggestedQuestions: [
      {
        id: 'ruralUrban', field: 'ruralUrban', question: 'Is the house located in a rural Gram Panchayat or Urban Municipality?', type: 'radio',
        options: [{ label: 'Rural (Gram Panchayat)', value: 'rural' }, { label: 'Urban (Municipality / Municipal Corp)', value: 'urban' }],
        defaultValue: 'rural', required: true,
      },
    ],
  },
];


export const EDUCATION_AGRI_EVENTS: LifeEvent[] = [
  {
    id: 'education',
    name: 'Higher Education & Scholarships',
    category: 'education',
    description: 'Financial assistance, fee reimbursement, and merit scholarships for college and university students.',
    keywords: ['student', 'college', 'scholarship', 'btech', 'degree', 'tuition', 'fee', 'exam', 'university', 'study', 'education', 'matric'],
    icon: 'GraduationCap',
    sampleQueries: [
      'I am a 20-year-old B.Tech student from Andhra Pradesh and my family income is ₹2.5 lakh. What support can I get?',
      'I am studying B.Tech in Andhra Pradesh but my home state is Tamil Nadu. What scholarships apply?',
      'How to apply for Central Sector Scheme of Scholarship on National Scholarship Portal (NSP)?',
    ],
    suggestedQuestions: [
      { id: 'age', field: 'age', question: 'What is your current age?', type: 'number', min: 14, max: 40, defaultValue: 20, required: true },
      {
        id: 'residenceState', field: 'residenceState', question: 'Which state is your permanent domicile / residence?', type: 'select',
        options: [
          { label: 'Andhra Pradesh', value: 'Andhra Pradesh' }, { label: 'Tamil Nadu', value: 'Tamil Nadu' },
          { label: 'Telangana', value: 'Telangana' }, { label: 'Karnataka', value: 'Karnataka' },
          { label: 'Maharashtra', value: 'Maharashtra' }, { label: 'Delhi', value: 'Delhi' }, { label: 'Other State', value: 'ALL' },
        ],
        defaultValue: 'Andhra Pradesh', required: true,
      },
      {
        id: 'studyState', field: 'studyState', question: 'Which state is your college / institution located in?', type: 'select',
        options: [
          { label: 'Same as Residence State', value: 'Andhra Pradesh' }, { label: 'Andhra Pradesh', value: 'Andhra Pradesh' },
          { label: 'Tamil Nadu', value: 'Tamil Nadu' }, { label: 'Telangana', value: 'Telangana' },
          { label: 'Karnataka', value: 'Karnataka' }, { label: 'Delhi', value: 'Delhi' },
        ],
        defaultValue: 'Andhra Pradesh', required: true,
      },
      {
        id: 'educationLevel', field: 'educationLevel', question: 'Current course / level of study', type: 'select',
        options: [
          { label: 'Undergraduate Professional (B.Tech / MBBS / B.E)', value: 'B.Tech' },
          { label: 'Undergraduate General (B.A / B.Sc / B.Com)', value: 'Undergraduate General' },
          { label: "Postgraduate / Master's", value: 'Postgraduate' },
          { label: 'Diploma / Polytechnic', value: 'Diploma' },
        ],
        defaultValue: 'B.Tech', required: true,
      },
      {
        id: 'annualIncome', field: 'annualIncome', question: 'Annual household income', type: 'select',
        options: [
          { label: 'Below ₹1,50,000 / year', value: 150000 }, { label: '₹1,50,000 – ₹2,50,000 / year', value: 250000 },
          { label: '₹2,50,000 – ₹5,00,000 / year', value: 500000 }, { label: 'Above ₹5,00,000 / year', value: 800000 },
        ],
        defaultValue: 250000, required: true,
      },
    ],
  },
  {
    id: 'agriculture',
    name: 'Agriculture & Crop Damage Assistance',
    category: 'agriculture',
    description: 'Relief for crop damage due to unseasonal rain/drought, PMFBY insurance claims, and PM-KISAN support.',
    keywords: ['crop', 'farmer', 'rain', 'drought', 'flood', 'heavy rain', 'agriculture', 'kisan', 'land', 'paddy', 'cotton', 'harvest', 'farm'],
    icon: 'Wheat',
    sampleQueries: [
      'My crops were destroyed by heavy rain. How to claim insurance?',
      'I am a small farmer with 2.5 acres land looking for solar pump subsidy and input support.',
    ],
    suggestedQuestions: [
      {
        id: 'agricultureState', field: 'agricultureState', question: 'State where agricultural land is located', type: 'select',
        options: [
          { label: 'Andhra Pradesh', value: 'Andhra Pradesh' }, { label: 'Telangana', value: 'Telangana' },
          { label: 'Tamil Nadu', value: 'Tamil Nadu' }, { label: 'Karnataka', value: 'Karnataka' },
          { label: 'Maharashtra', value: 'Maharashtra' }, { label: 'Other State', value: 'ALL' },
        ],
        defaultValue: 'Andhra Pradesh', required: true,
      },
      {
        id: 'landHoldingAcres', field: 'landHoldingAcres', question: 'Total landholding size in acres', type: 'select',
        options: [
          { label: 'Marginal (Under 1 Acre)', value: 1 }, { label: 'Small (1 to 2.5 Acres)', value: 2.5 },
          { label: 'Medium (2.5 to 5 Acres)', value: 5 }, { label: 'Tenant Farmer / Landless', value: 0 },
        ],
        defaultValue: 2.5, required: true,
      },
    ],
  },
];


export const HEALTHCARE_EVENTS: LifeEvent[] = [
  {
    id: 'healthcare',
    name: 'Healthcare, Medical Treatment & Health Insurance',
    category: 'healthcare',
    description: 'Ayushman Bharat PM-JAY, state health assurance cards, cashless hospital care, surgery assistance, and critical illness support.',
    keywords: [
      'health', 'hospital', 'medical', 'doctor', 'treatment', 'surgery', 'ayushman', 'pmjay',
      'medicine', 'clinic', 'operation', 'illness', 'disease', 'patient', 'aarogyasri',
      'swasthya sathi', 'cmchis', 'kasp', 'mjpjay', 'bima', 'cashless', 'maternity',
      'delivery', 'tb', 'tuberculosis', 'dialysis', 'cancer', 'chemotherapy', 'icu',
      'health insurance', 'health card',
    ],
    icon: 'Activity',
    sampleQueries: [
      'I need government health insurance for medical treatment and hospital surgery.',
      'How to apply for Ayushman Bharat PM-JAY Golden Card for cashless hospital treatment?',
      'What free healthcare schemes are available for low income families in my state?',
      'My family member needs dialysis / cancer surgery, what financial help is available?',
    ],
    suggestedQuestions: [
      {
        id: 'residenceState', field: 'residenceState', question: 'State where you permanently reside', type: 'select',
        options: [
          { label: 'Andhra Pradesh', value: 'Andhra Pradesh' },
          { label: 'Telangana', value: 'Telangana' },
          { label: 'Tamil Nadu', value: 'Tamil Nadu' },
          { label: 'Karnataka', value: 'Karnataka' },
          { label: 'Maharashtra', value: 'Maharashtra' },
          { label: 'West Bengal', value: 'West Bengal' },
          { label: 'Uttar Pradesh', value: 'Uttar Pradesh' },
          { label: 'Rajasthan', value: 'Rajasthan' },
          { label: 'Gujarat', value: 'Gujarat' },
          { label: 'Bihar', value: 'Bihar' },
          { label: 'Kerala', value: 'Kerala' },
          { label: 'All India / Other State', value: 'ALL' },
        ],
        defaultValue: 'Andhra Pradesh', required: true,
      },
      {
        id: 'isBPL', field: 'isBPL', question: 'Do you hold a BPL Ration Card / Food Security Card?', type: 'radio',
        options: [
          { label: 'Yes, BPL / NFSA / Antyodaya / Priority Card', value: true },
          { label: 'No / Above Poverty Line', value: false },
        ],
        defaultValue: true, required: true,
      },
      {
        id: 'annualIncome', field: 'annualIncome', question: 'Annual family household income (₹)', type: 'number',
        defaultValue: 180000, required: true,
      },
    ],
  },
];

export const PRIMARY_LIFE_EVENTS: LifeEvent[] = [
  ...HEALTHCARE_EVENTS,
  ...DISASTER_HOUSING_EVENTS,
  ...EDUCATION_AGRI_EVENTS,
];


export const SECONDARY_LIFE_EVENTS: LifeEvent[] = [
  {
    id: 'business',
    name: 'Starting a Small Business & MSME Loans',
    category: 'business',
    description: 'Collateral-free loans (Mudra), Udyam registration, technology subsidies, and enterprise support.',
    keywords: ['business', 'shop', 'startup', 'store', 'mudra', 'msme', 'loan', 'enterprise', 'commercial', 'retail', 'trade', 'udyam'],
    icon: 'Briefcase',
    sampleQueries: [
      'I want to start a small shop and need a collateral-free loan of ₹3 lakh.',
      'How to register a micro business on Udyam and get Mudra loan?',
    ],
    suggestedQuestions: [
      {
        id: 'businessType', field: 'businessType', question: 'Required loan category & stage', type: 'select',
        options: [
          { label: 'Shishu: Micro Loan up to ₹50,000', value: 'Micro (Shishu)' },
          { label: 'Kishor: Starting Small Business ₹50,000 – ₹5 Lakh', value: 'Small (Kishor)' },
          { label: 'Tarun: Established Business ₹5 Lakh – ₹10 Lakh', value: 'Expanding (Tarun)' },
        ],
        defaultValue: 'Small (Kishor)', required: true,
      },
    ],
  },
  {
    id: 'bereavement',
    name: 'Family Bereavement, Death & Legal Succession',
    category: 'bereavement',
    description: 'Civil death registration, Legal Heir Certificate, survivor pensions, and PMJJBY insurance claim settlements.',
    keywords: ['death', 'father passed away', 'mother died', 'passed away', 'deceased', 'legal heir', 'succession', 'pension', 'funeral', 'survivor', 'pmjjby'],
    icon: 'HeartHandshake',
    sampleQueries: [
      'My father passed away. What government-related things do I need to take care of?',
      "How to obtain a Legal Heir Certificate and claim bank insurance after a parent's death?",
    ],
    suggestedQuestions: [
      {
        id: 'residenceState', field: 'residenceState', question: 'State of deceased person domicile', type: 'select',
        options: [
          { label: 'Andhra Pradesh', value: 'Andhra Pradesh' }, { label: 'Telangana', value: 'Telangana' },
          { label: 'Tamil Nadu', value: 'Tamil Nadu' }, { label: 'Karnataka', value: 'Karnataka' },
          { label: 'Maharashtra', value: 'Maharashtra' }, { label: 'Delhi', value: 'Delhi' },
        ],
        defaultValue: 'Andhra Pradesh', required: true,
      },
    ],
  },
  {
    id: 'employment',
    name: 'Employment, Skill Training & Apprenticeship',
    category: 'employment',
    description: 'Unemployment support, National Apprenticeship Promotion Scheme (NAPS), and PMKVY skill certification.',
    keywords: ['job', 'unemployed', 'lost job', 'laid off', 'skills', 'training', 'apprentice', 'naps', 'pmkvy', 'employment', 'career'],
    icon: 'UserCheck',
    sampleQueries: [
      'I lost my job and want to know what skill training and stipend support I can get.',
      'How to enroll in National Apprenticeship Promotion Scheme (NAPS)?',
    ],
    suggestedQuestions: [
      { id: 'age', field: 'age', question: 'Your age', type: 'number', defaultValue: 24, required: true },
    ],
  },
  {
    id: 'identity_documents',
    name: 'Identity Documents & Card Replacement',
    category: 'identity_documents',
    description: 'Lost Aadhaar reprint, Ration card update, Voter ID revision, and DigiLocker access.',
    keywords: ['lost aadhaar', 'aadhaar card', 'lost document', 'ration card', 'voter id', 'pan card', 'domicile', 'reprint'],
    icon: 'FileText',
    sampleQueries: [
      'I lost my Aadhaar card. How do I get an official duplicate reprint?',
      'How to transfer my Ration Card under One Nation One Ration Card (ONORC)?',
    ],
    suggestedQuestions: [
      {
        id: 'residenceState', field: 'residenceState', question: 'Current state of residence', type: 'select',
        options: [
          { label: 'Andhra Pradesh', value: 'Andhra Pradesh' }, { label: 'Telangana', value: 'Telangana' },
          { label: 'Tamil Nadu', value: 'Tamil Nadu' }, { label: 'All India', value: 'ALL' },
        ],
        defaultValue: 'ALL', required: true,
      },
    ],
  },
  {
    id: 'financial_assistance',
    name: 'Financial Services, Jan Suraksha & Guaranteed Pension',
    category: 'financial_assistance',
    description: 'Pradhan Mantri Jan Dhan Yojana (PMJDY) zero-balance banking, PMSBY accidental insurance, PMJJBY life insurance, and Atal Pension Yojana (APY).',
    keywords: ['jan dhan', 'pmjdy', 'bank account', 'zero balance', 'pmsby', 'pmjjby', 'insurance', 'life insurance', 'accidental insurance', 'atal pension', 'apy', 'pension', 'dbt'],
    icon: 'Shield',
    sampleQueries: [
      'How to open a zero balance Jan Dhan bank account with RuPay card?',
      'How to enroll in PM Suraksha Bima Yojana for ₹20 accidental insurance?',
      'How to get Atal Pension Yojana guaranteed monthly pension from age 60?',
    ],
    suggestedQuestions: [
      { id: 'age', field: 'age', question: 'Your age', type: 'number', defaultValue: 28, required: true },
      {
        id: 'annualIncome', field: 'annualIncome', question: 'Annual family income', type: 'number',
        defaultValue: 200000, required: true,
      },
    ],
  },
];


export const LIFE_EVENTS: LifeEvent[] = [
  ...PRIMARY_LIFE_EVENTS,
  ...SECONDARY_LIFE_EVENTS,
];
