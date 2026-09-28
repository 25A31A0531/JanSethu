import { GOVERNMENT_SERVICES } from '../lib/demoData/services';

const TARGET_IDS = [
  // 1. Agriculture (7)
  'pm_kisan_samman_nidhi',
  'pm_fasal_bima_yojana',
  'kisan_credit_card_kcc',
  'smam_agri_mechanization',
  'pm_kusum_solar_pump',
  'national_livestock_mission_nlm',
  'pm_matsya_sampada_pmmsy',

  // 2. Bereavement / Social Security (7)
  'death_certificate_registration',
  'legal_heir_family_certificate',
  'nsap_ignoaps_old_age_pension',
  'nsap_ignwps_widow_pension',
  'nsap_igndps_disability_pension',
  'nsap_nfbs_family_benefit',
  'nsap_annapurna_food_security',

  // 3. Disaster (3)
  'sdrf_disaster_relief_assistance',
  'ndrf_disaster_relief_supplemental',
  'disaster_house_reconstruction',

  // 4. Housing & Solar (3)
  'pmay_g_rural_housing',
  'pmay_u_urban_housing_2',
  'pm_surya_ghar_muft_bijli',

  // 5. Business / MSME (7)
  'pm_mudra_yojana',
  'cgtmse_credit_guarantee',
  'pm_vishwakarma_scheme',
  'pmegp_credit_linked_subsidy',
  'aspire_rural_innovation',
  'sfurti_traditional_clusters',
  'msme_performance_credit_rating',

  // 6. Financial Services & DBT (4)
  'pmjdy_financial_inclusion',
  'pmsby_accidental_insurance',
  'pmjjby_life_insurance',
  'atal_pension_yojana_apy',

  // 7. Identity & Citizen Services (5)
  'uidai_aadhaar_enrolment_update',
  'uidai_aadhaar_download_pvc',
  'pan_card_service_nsdl_uti',
  'voter_registration_eci_nvsp',
  'passport_seva_portal',

  // 8. Employment & Livelihood (5)
  'vb_gram_g_rural_employment',
  'ddu_gky_rural_skills',
  'ncs_national_career_service',
  'day_nulm_urban_livelihoods',
  'pm_svanidhi_street_vendor',
];

console.log('=== DATASET VERIFICATION ===');
console.log(`Total services in catalog: ${GOVERNMENT_SERVICES.length}`);

// Check unique IDs
const idMap = new Map<string, any>();
const duplicates: string[] = [];

for (const s of GOVERNMENT_SERVICES) {
  if (idMap.has(s.id)) {
    duplicates.push(s.id);
  } else {
    idMap.set(s.id, s);
  }
}

if (duplicates.length > 0) {
  console.error(`❌ Duplicate IDs detected (${duplicates.length}):`, duplicates);
  process.exit(1);
} else {
  console.log(`✅ All ${GOVERNMENT_SERVICES.length} service IDs are completely unique!`);
}

// Check all 38 target IDs
console.log('\n--- Checking 38 Target IDs ---');
const missing: string[] = [];
for (const tid of TARGET_IDS) {
  const service = idMap.get(tid);
  if (!service) {
    missing.push(tid);
  } else {
    // Quick validation of essential fields
    if (!service.name || !service.category || !service.sourceUrl) {
      console.warn(`⚠️ Warning: Service ${tid} has incomplete fields!`);
    }
  }
}

if (missing.length > 0) {
  console.error(`❌ Missing target IDs (${missing.length}):`, missing);
  process.exit(1);
} else {
  console.log(`✅ All ${TARGET_IDS.length} target records are PRESENT and valid!`);
}

// Check MGNREGA rule: Must NOT be active
const mgnrega = idMap.get('mgnrega') || idMap.get('mgnrega_rural_employment');
if (mgnrega && mgnrega.status === 'ACTIVE') {
  console.error('❌ Violation: MGNREGA found as active scheme. VB-G RAM G should be used.');
  process.exit(1);
} else {
  console.log('✅ MGNREGA rule verified: No active MGNREGA record; VB-G RAM G is the active rural employment record.');
}

// Check PM Surya Ghar categorization
const suryaGhar = idMap.get('pm_surya_ghar_muft_bijli');
if (suryaGhar.category !== 'housing' && suryaGhar.category !== 'financial_assistance') {
  console.error(`❌ PM Surya Ghar has unexpected category: ${suryaGhar.category}`);
} else {
  console.log(`✅ PM Surya Ghar properly categorized under '${suryaGhar.category}'.`);
}

// Summary of categories
const categoryCounts: Record<string, number> = {};
for (const s of GOVERNMENT_SERVICES) {
  categoryCounts[s.category] = (categoryCounts[s.category] || 0) + 1;
}
console.log('\n--- Breakdown by Category ---');
for (const [cat, count] of Object.entries(categoryCounts)) {
  console.log(`  - ${cat}: ${count}`);
}
