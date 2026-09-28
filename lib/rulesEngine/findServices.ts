import { CitizenProfile, LifeEvent, Recommendation, ExclusionReason, GovernmentService } from '../types';
import { GOVERNMENT_SERVICES, DOCUMENT_TYPES } from '../demoData';
import { evaluateJurisdiction } from '../jurisdictionEngine';
import { evaluateEligibilityRules } from '../eligibilityEngine';
import { SCHEME_PATTERNS } from './schemePatterns';

export const isSchemeCurrentlyActive = (service: GovernmentService): boolean => {
  if (service.status !== 'ACTIVE') return false;
  if (
    service.officialVerificationStatus === 'HISTORICAL_ARCHIVED' ||
    service.officialVerificationStatus === 'DISCONTINUED' ||
    service.officialVerificationStatus === 'REPLACED' ||
    service.officialVerificationStatus === 'SUSPENDED' ||
    service.officialVerificationStatus === 'UNVERIFIED'
  ) {
    return false;
  }
  if (service.effectiveTo && new Date(service.effectiveTo) < new Date()) {
    return false;
  }
  return true;
};

/**
 * Candidate Retrieval → Jurisdiction Filter → Eligibility Filter → Query-Aware Ranking
 */
export function findRelevantServices(
  profile: CitizenProfile,
  event: LifeEvent,
  query?: string
): {
  recommendations: Recommendation[];
  excludedServices: ExclusionReason[];
} {
  const recommendations: Recommendation[] = [];
  const excludedServices: ExclusionReason[] = [];
  const queryText = (query || '').toLowerCase().trim();

  // Negative intent detection for cross-scheme scenario isolation
  const hasCycloneDamageQuery = /\b(cyclone|storm|flood|calamity|heavy rain|damage(d)?|collapsed|destroyed)\b/i.test(queryText)
    || /తుఫాను|వరద|కూలిపోయింది|दెబ్బతింది|तूफान|चक्रवात|बाढ़|क्षतिग्रस्त|புயல்|வெள்ளம்|சேதம்|ಪ್ರವಾಹ|ಹಾನಿ|തകർന്നു|वादळ|पूर|ঝড়|বন্যা|વાવાઝોડું|ਤੂਫ਼ਾਨ|ବାତ୍ୟା|ধুমুহা|طوفان/i.test(queryText);

  const hasSolarQuery = /\b(solar|rooftop|surya ghar|muft bijli)\b/i.test(queryText)
    || /సోలార్|సూర్య ఘర్|सोलर|सूर्य घर|சூர்ய கர்|ಸೌರ|മേൽക്കൂര സോളാർ|সৌর|સૂર્ય ઘર|ਸੂਰਿਆ ਘਰ|ସୌର|سولر/i.test(queryText);

  const isPureSolarRooftopQuery = hasSolarQuery && !hasCycloneDamageQuery;

  const candidateServices = GOVERNMENT_SERVICES.filter((svc) => {
    if (!isSchemeCurrentlyActive(svc)) {
      excludedServices.push({
        serviceId: svc.id,
        serviceName: svc.name,
        reasonType: 'status',
        message: `Scheme is not currently active (Status: ${svc.status}). Superseded or historical record.`,
        details: { expected: 'ACTIVE', actual: svc.status },
      });
      return false;
    }

    // Cross-domain isolation:
    // If citizen query is explicitly about cyclone disaster / house damage, do NOT recommend PM Surya Ghar (solar rooftop)
    if (svc.id === 'pm_surya_ghar_muft_bijli' && hasCycloneDamageQuery) {
      return false;
    }

    // If citizen query is purely about solar rooftop panel installation, do NOT recommend disaster reconstruction or SDRF
    if ((svc.id === 'disaster_house_reconstruction' || svc.id === 'sdrf_disaster_relief_assistance' || svc.id === 'ndrf_disaster_relief_supplemental') && isPureSolarRooftopQuery) {
      return false;
    }

    const isCatMatch =
      svc.category === event.category ||
      svc.secondaryCategories?.includes(event.category) ||
      svc.tags.includes(event.id);
    return isCatMatch;
  });

  for (const service of candidateServices) {
    const jurisdictionEval = evaluateJurisdiction(profile, service);
    if (!jurisdictionEval.isEligible) {
      if (jurisdictionEval.exclusion) excludedServices.push(jurisdictionEval.exclusion);
      continue;
    }

    const eligibilityEval = evaluateEligibilityRules(profile, service);
    if (!eligibilityEval.isEligible) {
      if (eligibilityEval.exclusion) excludedServices.push(eligibilityEval.exclusion);
      continue;
    }

    // Compute dynamic relevance score
    let dynamicScore = eligibilityEval.confidenceScore;
    const additionalMatchReasons: string[] = [];

    if (queryText) {
      // 1. Direct scheme regex pattern match across all 13 languages
      const schemeMeta = SCHEME_PATTERNS[service.id];
      if (schemeMeta && schemeMeta.pattern.test(queryText)) {
        dynamicScore += 45; // Decisive boost for direct keyword intent match
        additionalMatchReasons.push(`High Direct Intent Match: Query specifically requests '${service.name}'.`);
      }

      // 2. Matching tags or aliases
      const aliasMatch = service.aliases?.some((a) => queryText.includes(a.toLowerCase()));
      if (aliasMatch) {
        dynamicScore += 25;
        additionalMatchReasons.push(`Alias match: Matched recognized scheme name '${service.name}'.`);
      }

      const tagMatch = service.tags.some((t) => queryText.includes(t.toLowerCase()));
      if (tagMatch) {
        dynamicScore += 15;
      }
    }

    const matchedDocs = service.requiredDocuments.map((docId) =>
      DOCUMENT_TYPES.find((d) => d.id === docId)
    );
    const readyCount = matchedDocs.filter((d) => d?.status === 'ready').length;
    const docPercent =
      matchedDocs.length > 0 ? Math.round((readyCount / matchedDocs.length) * 100) : 100;

    recommendations.push({
      serviceId: service.id,
      service,
      confidenceScore: Math.min(100, dynamicScore),
      potentialEligibility: eligibilityEval.potentialEligibility,
      matchReasons: [jurisdictionEval.matchNote, ...additionalMatchReasons, ...eligibilityEval.matchReasons],
      missingInfoReasons: eligibilityEval.missingInfoReasons,
      cautions: eligibilityEval.cautions,
      documentReadinessPercent: docPercent,
      jurisdictionMatchNote: jurisdictionEval.matchNote,
      jurisdictionBasis: jurisdictionEval.jurisdictionBasis,
      matchedLocationState: jurisdictionEval.matchedLocationState,
      categoryMatchStatus: eligibilityEval.categoryMatchStatus,
    });
  }

  // Sort by highest confidence/relevance score
  recommendations.sort((a, b) => b.confidenceScore - a.confidenceScore);
  return { recommendations, excludedServices };
}
