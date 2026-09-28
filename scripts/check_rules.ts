import { GOVERNMENT_SERVICES } from '../lib/demoData';

const TARGET_IDS = [
  'pm_kisan_samman_nidhi', 'pm_fasal_bima_yojana', 'kisan_credit_card_kcc', 'smam_agri_mechanization', 'pm_kusum_solar_pump', 'national_livestock_mission_nlm', 'pm_matsya_sampada_pmmsy',
  'death_certificate_registration', 'legal_heir_family_certificate', 'nsap_ignoaps_old_age_pension', 'nsap_ignwps_widow_pension', 'nsap_igndps_disability_pension', 'nsap_nfbs_family_benefit', 'nsap_annapurna_food_security',
  'sdrf_disaster_relief_assistance', 'ndrf_disaster_relief_supplemental', 'disaster_house_reconstruction',
  'pmay_g_rural_housing', 'pmay_u_urban_housing_2', 'pm_surya_ghar_muft_bijli',
  'pm_mudra_yojana', 'cgtmse_credit_guarantee', 'pm_vishwakarma_scheme', 'pmegp_credit_linked_subsidy', 'aspire_rural_innovation', 'sfurti_traditional_clusters', 'msme_performance_credit_rating',
  'pmjdy_financial_inclusion', 'pmsby_accidental_insurance', 'pmjjby_life_insurance', 'atal_pension_yojana_apy',
  'uidai_aadhaar_enrolment_update', 'uidai_aadhaar_download_pvc', 'pan_card_service_nsdl_uti', 'voter_registration_eci_nvsp', 'passport_seva_portal',
  'vb_gram_g_rural_employment', 'ddu_gky_rural_skills', 'ncs_national_career_service', 'day_nulm_urban_livelihoods', 'pm_svanidhi_street_vendor'
];

for (const id of TARGET_IDS) {
  const svc = GOVERNMENT_SERVICES.find(s => s.id === id);
  if (!svc) {
    console.log('NOT FOUND:', id);
    continue;
  }
  const rules = svc.eligibilityRules.map(r => `${r.field} ${r.operator} ${r.value}`).join(', ');
  console.log(`${id}: [${svc.category}] [Jurisdiction: ${svc.jurisdictionLevel}] Rules: ${rules || 'NONE'}`);
}
