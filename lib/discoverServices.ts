import { GOVERNMENT_SERVICES } from '@/lib/demoData';
import { Recommendation, CitizenProfile } from '@/lib/types';
import { evaluateJurisdiction } from '@/lib/jurisdictionEngine';
import { evaluateEligibilityRules } from '@/lib/eligibilityEngine';
import { isSchemeCurrentlyActive } from '@/lib/rulesEngine/findServices';

export function filterAndRankServices(
  searchQuery: string,
  selectedCategory: string,
  selectedJurisdiction: 'ALL' | 'CENTRAL' | 'STATE',
  selectedState: string,
  sortBy: 'relevant' | 'confidence',
  defaultProfile: CitizenProfile
): Recommendation[] {
  return GOVERNMENT_SERVICES.filter((svc) => {
    if (!isSchemeCurrentlyActive(svc)) return false;

    const q = searchQuery.toLowerCase();
    const textMatch =
      !q ||
      svc.name.toLowerCase().includes(q) ||
      svc.description.toLowerCase().includes(q) ||
      svc.department.toLowerCase().includes(q) ||
      svc.tags.some((tag) => tag.toLowerCase().includes(q));

    if (!textMatch) return false;

    if (
      selectedCategory !== 'ALL' &&
      svc.category !== selectedCategory &&
      !svc.secondaryCategories?.includes(selectedCategory as any)
    ) {
      return false;
    }

    if (selectedJurisdiction !== 'ALL' && svc.jurisdictionLevel !== selectedJurisdiction) {
      return false;
    }

    if (
      selectedState !== 'ALL' &&
      svc.jurisdictionLevel === 'STATE' &&
      !svc.applicableStates.includes('ALL') &&
      !svc.applicableStates.includes(selectedState)
    ) {
      return false;
    }

    return true;
  })
    .map((service) => {
      const jurisdictionEval = evaluateJurisdiction(defaultProfile, service);
      const eligibilityEval = evaluateEligibilityRules(defaultProfile, service);

      const rec: Recommendation = {
        serviceId: service.id,
        service,
        confidenceScore: eligibilityEval.confidenceScore,
        potentialEligibility: eligibilityEval.potentialEligibility,
        matchReasons: [jurisdictionEval.matchNote, ...eligibilityEval.matchReasons],
        missingInfoReasons: eligibilityEval.missingInfoReasons,
        cautions: eligibilityEval.cautions,
        documentReadinessPercent: 85,
        jurisdictionMatchNote: jurisdictionEval.matchNote,
        jurisdictionBasis: jurisdictionEval.jurisdictionBasis,
        matchedLocationState: jurisdictionEval.matchedLocationState,
        categoryMatchStatus: eligibilityEval.categoryMatchStatus,
      };
      return rec;
    })
    .sort((a, b) => b.confidenceScore - a.confidenceScore);
}
