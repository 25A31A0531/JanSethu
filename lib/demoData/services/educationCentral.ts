import { GovernmentService } from '../../types';

export const EDUCATION_CENTRAL_SERVICES: GovernmentService[] = [
  {
    id: 'nsp_css_scholarship',
    name: 'Central Sector Scheme of Scholarship for College and University Students (NSP)',
    department: 'Department of Higher Education',
    authority: 'Ministry of Education, Govt of India',
    ministry: 'Ministry of Education',
    category: 'education', secondaryCategories: ['financial_assistance'],
    description: 'Centrally funded merit-cum-means scholarship for students pursuing regular graduate, medical, and professional degree courses.',
    benefitsSummary: '₹12,000 per annum for Graduation years (1st-3rd yr), ₹20,000 per annum for Post-Graduation.',
    jurisdictionLevel: 'CENTRAL', applicableStates: ['ALL'], residenceRequired: false,
    studyLocationEligible: true, employmentLocationEligible: false, propertyLocationEligible: false,
    agricultureLocationEligible: false, businessLocationEligible: false,
    status: 'ACTIVE', effectiveFrom: '2015-06-01',
    officialVerificationStatus: 'OFFICIALLY_VERIFIED',
    verificationEvidence: 'OFFICIAL_PORTAL',
    eligibleCategories: ['General', 'OBC', 'SC', 'ST', 'EWS', 'Minority'],
    applicationUrl: 'https://scholarships.gov.in',
    eligibilityRules: [
      { field: 'isStudent', operator: 'boolean_true', value: true, label: 'Enrolled in recognized undergraduate / professional degree', isMandatory: true },
      { field: 'annualIncome', operator: 'less_than_or_equal', value: 450000, label: 'Annual family income must not exceed ₹4.5 Lakh', isMandatory: true },
      { field: 'age', operator: 'less_than_or_equal', value: 25, label: 'Age within eligible bracket (18-25 years)', isMandatory: false },
    ],
    requiredDocuments: ['aadhaar', 'income_cert', 'education_marksheet', 'bank_passbook'],
    steps: [
      {
        stepNumber: 1, title: 'Verify Active Income Certificate',
        description: 'Ensure active revenue income certificate with family income under ₹4.5 Lakh ceiling.',
        requiredDocuments: ['income_cert'], estimatedEffort: '2-4 business days', isOnline: true,
        portalUrl: 'https://serviceonline.gov.in',
      },
      {
        stepNumber: 2, title: 'Complete OTR on National Scholarship Portal (NSP)',
        description: 'Complete One-Time Registration on scholarships.gov.in using Aadhaar Face Auth / OTP.',
        requiredDocuments: ['aadhaar', 'bank_passbook'], estimatedEffort: '30 minutes', isOnline: true,
        portalUrl: 'https://scholarships.gov.in',
      },
      {
        stepNumber: 3, title: 'Submit CSS Scheme Application with Bonafide',
        description: 'Select CSS scheme, upload college bonafide certificate, and submit before deadline.',
        requiredDocuments: ['education_marksheet'], estimatedEffort: '45 minutes', isOnline: true,
        portalUrl: 'https://scholarships.gov.in',
      },
      {
        stepNumber: 4, title: 'College Nodal Officer & State DBT Sanction',
        description: 'College scholarship nodal officer endorses student verification; funds disbursed via PFMS DBT.',
        requiredDocuments: [], estimatedEffort: '10-20 business days', isOnline: true,
      },
    ],
    sourceUrl: 'https://scholarships.gov.in', sourceAuthority: 'National Scholarship Portal, Ministry of Education',
    sourceType: 'verified', sourceConfidence: 'High', lastVerified: '2026-08-30', version: '2026.1',
    tags: ['scholarship', 'education', 'btech', 'degree', 'nsp', 'central'],
  },
];
