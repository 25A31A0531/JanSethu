import { Compass, FileCheck2, AlertTriangle, ShieldCheck, CheckCircle2, Lock } from 'lucide-react';

export const LEARN_TOPICS = [
  {
    id: 'how-schemes-work', icon: Compass, color: 'bg-indigo-50 text-indigo-700',
    title: 'How Government Schemes Work',
    subtitle: 'Central Sector vs. Centrally Sponsored vs. State Schemes',
    points: [
      'Central Sector Schemes (e.g. PM-KISAN) are 100% funded and managed by Central Ministries via DBT.',
      'Centrally Sponsored Schemes (e.g. PMFBY, Post-Matric Scholarships) are jointly funded (60:40) with State implementation.',
      'State Welfare Schemes (e.g. AP Jagananna Vidya Deevena) are state-specific and strictly require local domicile certification.',
    ],
  },
  {
    id: 'documents-needed', icon: FileCheck2, color: 'bg-emerald-50 text-emerald-700',
    title: 'Documents You Always Need',
    subtitle: 'The 4 Golden Civic Pillars in India',
    points: [
      'Aadhaar with Active Mobile Link: Required for OTP authentication and biometric KYC.',
      'Aadhaar-Seeded Bank Account (NPCI DBT): Benefits are credited to Aadhaar-mapped accounts, not just bank account numbers.',
      'Annual Income Certificate: Must be refreshed every financial year from the Tahsildar / e-District portal.',
      'Integrated Caste / Community Certificate: Crucial for fee waivers and category reservations.',
    ],
  },
  {
    id: 'avoid-misinformation', icon: AlertTriangle, color: 'bg-amber-50 text-amber-700',
    title: 'How to Avoid Misinformation & Fake Apps',
    subtitle: 'Spotting Scam Portals and WhatsApp Rumors',
    points: [
      'Never pay money for application forms: Official government portals (like NSP, PMFBY, Udyam) are 100% free.',
      'Beware of fraudulent domains ending in .com, .org, or .in without .gov.in / .nic.in official prefixes.',
      'No government official will ask for your Aadhaar OTP or bank password over phone calls.',
    ],
  },
  {
    id: 'verify-official', icon: ShieldCheck, color: 'bg-blue-50 text-blue-700',
    title: 'How to Verify an Official Service',
    subtitle: 'Check for Authentic Government Digital Signatures',
    points: [
      'Always check the address bar: Genuine central and state portals end in .gov.in, .nic.in, or state specific portals (e.g., ap.gov.in, telangana.gov.in).',
      'Verify digital certificate QR codes: Legitimate certificates (Death, Income, Caste) have a scan-able DigiLocker/e-District QR code.',
      'Use Common Service Centers (CSC): When in doubt, apply at an authorized Village Secretariat or CSC center.',
    ],
  },
  {
    id: 'understanding-eligibility', icon: CheckCircle2, color: 'bg-purple-50 text-purple-700',
    title: 'Understanding Eligibility Criteria',
    subtitle: 'Income Ceilings, Age Limits, and Social Categories',
    points: [
      'Gross vs. Net Household Income: Government income limits evaluate aggregate family income from all taxable and agricultural sources.',
      'Domicile Conditions: Most state schemes require a minimum continuous residency duration (usually 5 to 7 years).',
      'Attendance & Course Accreditation: Higher education schemes mandate minimum 75% bio-metric attendance.',
    ],
  },
  {
    id: 'protecting-documents', icon: Lock, color: 'bg-rose-50 text-rose-700',
    title: 'Protecting Personal Documents Online',
    subtitle: 'Digital Hygiene for Indian Citizens',
    points: [
      'Use Masked Aadhaar: Download Masked Aadhaar from UIDAI which shows only the last 4 digits for casual verifications.',
      'DigiLocker Integration: Store authentic digital credentials on the DigiLocker app under the IT Act 2000.',
      "Client-Side Safety: JANSETU processes document metadata locally in your browser and never stores sensitive PDFs on remote servers.",
    ],
  },
];
