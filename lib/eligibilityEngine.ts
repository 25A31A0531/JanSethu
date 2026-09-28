import { CitizenProfile, GovernmentService, EligibilityConfidence, ExclusionReason } from './types';

function createExclusion(service: GovernmentService, msg: string, ruleLabel: string, exp: any, act: any, reasonType: 'eligibility' | 'category' = 'eligibility'): ExclusionReason {
  return {
    serviceId: service.id, serviceName: service.name, reasonType,
    message: msg, details: { ruleLabel, expected: exp, actual: act },
  };
}

export function evaluateEligibilityRules(
  profile: CitizenProfile,
  service: GovernmentService
): {
  isEligible: boolean; confidenceScore: number; potentialEligibility: EligibilityConfidence;
  matchReasons: string[]; missingInfoReasons: string[]; cautions: string[]; exclusion?: ExclusionReason;
  categoryMatchStatus?: 'MATCHED' | 'NOT_APPLICABLE' | 'MISMATCH' | 'MISSING_PROFILE_CATEGORY';
} {
  const matchReasons: string[] = [];
  const missingInfoReasons: string[] = [];
  const cautions: string[] = [];
  let score = 70;
  let isDisqualified = false;
  let primaryExclusionReason: ExclusionReason | undefined;
  let categoryMatchStatus: 'MATCHED' | 'NOT_APPLICABLE' | 'MISMATCH' | 'MISSING_PROFILE_CATEGORY' = 'NOT_APPLICABLE';

  for (const rule of service.eligibilityRules) {
    const userVal = profile[rule.field as keyof CitizenProfile];

    // Special handling for socialCategory: never guess if missing
    if (rule.field === 'socialCategory') {
      if (!userVal) {
        if (rule.isMandatory) {
          missingInfoReasons.push(`Social category requirement: ${rule.label} (Not specified in profile)`);
          categoryMatchStatus = 'MISSING_PROFILE_CATEGORY';
          score -= 5;
        }
        continue;
      }

      if (rule.operator === 'in' && Array.isArray(rule.value)) {
        if (rule.value.includes(userVal)) {
          matchReasons.push(`Social Category Match: Configured category (${userVal}) meets ${rule.label}.`);
          score += 20; // Priority boost for category-targeted schemes
          categoryMatchStatus = 'MATCHED';
        } else if (rule.isMandatory) {
          isDisqualified = true;
          primaryExclusionReason = createExclusion(
            service,
            `Social category criteria: Scheme is designated for ${rule.value.join(', ')}, but citizen profile category is ${userVal}.`,
            rule.label,
            rule.value,
            userVal,
            'category'
          );
          cautions.push(`Category criteria: primarily reserved for ${rule.value.join(', ')}.`);
          score -= 30;
          categoryMatchStatus = 'MISMATCH';
        }
      } else if (rule.operator === 'equals') {
        if (userVal === rule.value) {
          matchReasons.push(`Social Category Match: Configured category (${userVal}) meets ${rule.label}.`);
          score += 20;
          categoryMatchStatus = 'MATCHED';
        } else if (rule.isMandatory) {
          isDisqualified = true;
          primaryExclusionReason = createExclusion(
            service,
            `Social category criteria: Scheme is designated for ${rule.value}, but citizen profile category is ${userVal}.`,
            rule.label,
            rule.value,
            userVal,
            'category'
          );
          score -= 30;
          categoryMatchStatus = 'MISMATCH';
        }
      }
      continue;
    }

    if (userVal === undefined || userVal === null) {
      if (rule.isMandatory) { missingInfoReasons.push(`Requires verification: ${rule.label}`); score -= 5; }
      continue;
    }

    if (rule.operator === 'less_than_or_equal') {
      if (typeof userVal === 'number' && userVal <= rule.value) {
        matchReasons.push(`Income/Age criteria satisfied: ₹${userVal.toLocaleString('en-IN')} is within the limit of ₹${Number(rule.value).toLocaleString('en-IN')}.`);
        score += 10;
      } else {
        cautions.push(`May exceed threshold: Your value (${userVal}) exceeds the requirement (${rule.value}).`);
        score -= 30;
        if (rule.isMandatory) {
          isDisqualified = true;
          primaryExclusionReason = createExclusion(service, `Income/Limit exceeded: Profile value (${userVal}) is above threshold (${rule.value}).`, rule.label, rule.value, userVal);
        }
      }
    } else if (rule.operator === 'greater_than_or_equal') {
      if (typeof userVal === 'number' && userVal >= rule.value) {
        matchReasons.push(`Age/Criteria satisfied: meets minimum requirement (${rule.value}+).`);
        score += 10;
      } else {
        cautions.push(`Does not meet minimum requirement of ${rule.value}.`);
        score -= 25;
        if (rule.isMandatory) {
          isDisqualified = true;
          primaryExclusionReason = createExclusion(service, `Minimum criteria not met: Profile value (${userVal}) is below minimum (${rule.value}).`, rule.label, rule.value, userVal);
        }
      }
    } else if (rule.operator === 'boolean_true') {
      if (userVal === true) {
        matchReasons.push(`Profile status match: ${rule.label}`);
        score += 10;
      } else if (userVal === false && rule.isMandatory) {
        isDisqualified = true;
        primaryExclusionReason = createExclusion(service, `Mandatory condition not met: ${rule.label}`, rule.label, true, false);
        cautions.push(`Does not meet mandatory condition: ${rule.label}`);
        score -= 20;
      }
    } else if (rule.operator === 'in') {
      if (Array.isArray(rule.value) && rule.value.includes(userVal)) {
        matchReasons.push(`Criteria match: ${userVal} is eligible.`);
        score += 10;
      } else if (rule.isMandatory) {
        isDisqualified = true;
        primaryExclusionReason = createExclusion(service, `Criteria not met: Expected ${rule.value.join(', ')}, got ${userVal}.`, rule.label, rule.value, userVal);
        cautions.push(`Criteria: primarily reserved for ${rule.value.join(', ')}.`);
        score -= 20;
      }
    } else if (rule.operator === 'equals' && userVal === rule.value) {
      matchReasons.push(`Criteria match: ${rule.label}`);
      score += 10;
    }
  }

  score = Math.min(98, Math.max(15, score));
  const potentialEligibility: EligibilityConfidence = (isDisqualified || score < 50) ? 'Needs verification' : score < 75 ? 'Medium' : 'High';

  return {
    isEligible: !isDisqualified, confidenceScore: score, potentialEligibility,
    matchReasons, missingInfoReasons, cautions, exclusion: primaryExclusionReason,
    categoryMatchStatus,
  };
}
