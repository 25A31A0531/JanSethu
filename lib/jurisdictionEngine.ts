import { CitizenProfile, GovernmentService, ExclusionReason, JurisdictionBasis } from './types';

function createJurisdictionExclusion(
  service: GovernmentService,
  message: string,
  ruleLabel: string,
  expected: any,
  actual: any
): ExclusionReason {
  return {
    serviceId: service.id,
    serviceName: service.name,
    reasonType: 'jurisdiction',
    message,
    details: { ruleLabel, expected, actual },
  };
}

export function evaluateJurisdiction(
  profile: CitizenProfile,
  service: GovernmentService
): {
  isEligible: boolean;
  matchNote: string;
  exclusion?: ExclusionReason;
  jurisdictionBasis?: JurisdictionBasis;
  matchedLocationState?: string;
} {
  // 1. Central Scheme: strictly check jurisdictionLevel === 'CENTRAL'
  if (service.jurisdictionLevel === 'CENTRAL') {
    return {
      isEligible: true,
      matchNote: 'Central / National Scheme: Applicable across all Indian States and Union Territories.',
      jurisdictionBasis: 'central',
      matchedLocationState: 'All-India',
    };
  }

  // 2. Extract profile locations without any silent fallback
  const residenceState = profile.residenceState?.trim();
  const studyState = profile.studyState?.trim();
  const employmentState = profile.employmentState?.trim();
  const propertyState = profile.propertyState?.trim();
  const agricultureState = profile.agricultureState?.trim();
  const businessState = profile.businessState?.trim();

  const isNationwideFramework = service.applicableStates.includes('ALL');

  // 3. State Frameworks (jurisdictionLevel: 'STATE' with applicableStates: ['ALL'])
  if (isNationwideFramework) {
    if (service.propertyLocationEligible) {
      if (!propertyState) {
        return {
          isEligible: false,
          matchNote: 'Your property location is required to check whether this scheme applies.',
          exclusion: createJurisdictionExclusion(
            service,
            'Your property location is required to check whether this scheme applies.',
            'Property Location Requirement',
            'Valid State / UT',
            'Missing'
          ),
        };
      }
      return {
        isEligible: true,
        matchNote: `State Framework Match: Property is located in ${propertyState}.`,
        jurisdictionBasis: 'property',
        matchedLocationState: propertyState,
      };
    }

    if (service.agricultureLocationEligible) {
      if (!agricultureState) {
        return {
          isEligible: false,
          matchNote: 'Your agricultural land location is required to check whether this scheme applies.',
          exclusion: createJurisdictionExclusion(
            service,
            'Your agricultural land location is required to check whether this scheme applies.',
            'Agricultural Land Requirement',
            'Valid State / UT',
            'Missing'
          ),
        };
      }
      return {
        isEligible: true,
        matchNote: `Agricultural Land Jurisdiction Match: Cultivated land parcel is in ${agricultureState}.`,
        jurisdictionBasis: 'agriculture',
        matchedLocationState: agricultureState,
      };
    }

    if (service.businessLocationEligible) {
      if (!businessState) {
        return {
          isEligible: false,
          matchNote: 'Your business registration location is required to check whether this scheme applies.',
          exclusion: createJurisdictionExclusion(
            service,
            'Your business registration location is required to check whether this scheme applies.',
            'Business Location Requirement',
            'Valid State / UT',
            'Missing'
          ),
        };
      }
      return {
        isEligible: true,
        matchNote: `Enterprise Jurisdiction Match: Business enterprise is registered in ${businessState}.`,
        jurisdictionBasis: 'business',
        matchedLocationState: businessState,
      };
    }

    if (service.employmentLocationEligible) {
      if (!employmentState) {
        return {
          isEligible: false,
          matchNote: 'Your employment location is required to check whether this scheme applies.',
          exclusion: createJurisdictionExclusion(
            service,
            'Your employment location is required to check whether this scheme applies.',
            'Employment Location Requirement',
            'Valid State / UT',
            'Missing'
          ),
        };
      }
      return {
        isEligible: true,
        matchNote: `Workplace Jurisdiction Match: Employment is located in ${employmentState}.`,
        jurisdictionBasis: 'employment',
        matchedLocationState: employmentState,
      };
    }

    if (service.studyLocationEligible) {
      if (!studyState) {
        return {
          isEligible: false,
          matchNote: 'Your study location is required to check whether this scheme applies.',
          exclusion: createJurisdictionExclusion(
            service,
            'Your study location is required to check whether this scheme applies.',
            'Study Location Requirement',
            'Valid State / UT',
            'Missing'
          ),
        };
      }
      return {
        isEligible: true,
        matchNote: `Study Location Match: Educational institution is located in ${studyState}.`,
        jurisdictionBasis: 'study',
        matchedLocationState: studyState,
      };
    }

    // Default for State Framework: Local state revenue / domicile
    if (!residenceState) {
      return {
        isEligible: false,
        matchNote: 'Your residence/domicile state is required to check whether this scheme applies.',
        exclusion: createJurisdictionExclusion(
          service,
          'Your residence/domicile state is required to check whether this scheme applies.',
          'State Domicile Requirement',
          'Valid State / UT',
          'Missing'
        ),
      };
    }
    return {
      isEligible: true,
      matchNote: `State Framework Match: Administrative service available via local administration in ${residenceState}.`,
      jurisdictionBasis: 'residence',
      matchedLocationState: residenceState,
    };
  }

  // 4. Specific State Schemes (e.g., applicableStates: ['Andhra Pradesh'])

  // 4A. Property Location
  if (service.propertyLocationEligible) {
    if (!propertyState) {
      return {
        isEligible: false,
        matchNote: 'Your property location is required to check whether this scheme applies.',
        exclusion: createJurisdictionExclusion(
          service,
          'Your property location is required to check whether this scheme applies.',
          'Property Location Requirement',
          service.applicableStates,
          'Missing'
        ),
      };
    }
    if (service.applicableStates.includes(propertyState)) {
      return {
        isEligible: true,
        matchNote: `Property Jurisdiction Match: The affected property is located in ${propertyState}.`,
        jurisdictionBasis: 'property',
        matchedLocationState: propertyState,
      };
    }
    return {
      isEligible: false,
      matchNote: `Geographic Mismatch: Property located in ${propertyState} is outside scheme jurisdiction (${service.applicableStates.join(', ')}).`,
      exclusion: createJurisdictionExclusion(
        service,
        `Property located in ${propertyState} does not match scheme jurisdiction (${service.applicableStates.join(', ')}).`,
        'Property Location',
        service.applicableStates,
        propertyState
      ),
    };
  }

  // 4B. Agricultural Land Location
  if (service.agricultureLocationEligible) {
    if (!agricultureState) {
      return {
        isEligible: false,
        matchNote: 'Your agricultural land location is required to check whether this scheme applies.',
        exclusion: createJurisdictionExclusion(
          service,
          'Your agricultural land location is required to check whether this scheme applies.',
          'Agricultural Land Requirement',
          service.applicableStates,
          'Missing'
        ),
      };
    }
    if (service.applicableStates.includes(agricultureState)) {
      if (service.residenceRequired && (!residenceState || !service.applicableStates.includes(residenceState))) {
        return {
          isEligible: false,
          matchNote: `Excluded: ${service.name} requires permanent domicile in ${service.applicableStates.join(', ')}.`,
          exclusion: createJurisdictionExclusion(
            service,
            `Scheme requires permanent domicile in ${service.applicableStates.join(', ')}, but citizen's residence is ${residenceState || 'missing'}.`,
            'State Domicile Requirement',
            service.applicableStates,
            residenceState || 'missing'
          ),
        };
      }
      return {
        isEligible: true,
        matchNote: `Agricultural Land Jurisdiction Match: Cultivated land parcel is in ${agricultureState}.`,
        jurisdictionBasis: 'agriculture',
        matchedLocationState: agricultureState,
      };
    }
    return {
      isEligible: false,
      matchNote: `Geographic Mismatch: Cultivated land located in ${agricultureState} is outside scheme jurisdiction (${service.applicableStates.join(', ')}).`,
      exclusion: createJurisdictionExclusion(
        service,
        `Land located in ${agricultureState} does not match scheme jurisdiction (${service.applicableStates.join(', ')}).`,
        'Agricultural Land Location',
        service.applicableStates,
        agricultureState
      ),
    };
  }

  // 4C. Business Enterprise Location
  if (service.businessLocationEligible) {
    if (!businessState) {
      return {
        isEligible: false,
        matchNote: 'Your business registration location is required to check whether this scheme applies.',
        exclusion: createJurisdictionExclusion(
          service,
          'Your business registration location is required to check whether this scheme applies.',
          'Business Location Requirement',
          service.applicableStates,
          'Missing'
        ),
      };
    }
    if (service.applicableStates.includes(businessState)) {
      if (service.residenceRequired && (!residenceState || !service.applicableStates.includes(residenceState))) {
        return {
          isEligible: false,
          matchNote: `Excluded: ${service.name} requires permanent domicile in ${service.applicableStates.join(', ')}.`,
          exclusion: createJurisdictionExclusion(
            service,
            `Scheme requires permanent domicile in ${service.applicableStates.join(', ')}, but citizen's residence is ${residenceState || 'missing'}.`,
            'State Domicile Requirement',
            service.applicableStates,
            residenceState || 'missing'
          ),
        };
      }
      return {
        isEligible: true,
        matchNote: `Enterprise Jurisdiction Match: Business enterprise is registered in ${businessState}.`,
        jurisdictionBasis: 'business',
        matchedLocationState: businessState,
      };
    }
    return {
      isEligible: false,
      matchNote: `Geographic Mismatch: Enterprise in ${businessState} is outside scheme jurisdiction (${service.applicableStates.join(', ')}).`,
      exclusion: createJurisdictionExclusion(
        service,
        `Business in ${businessState} does not match scheme jurisdiction (${service.applicableStates.join(', ')}).`,
        'Business Location',
        service.applicableStates,
        businessState
      ),
    };
  }

  // 4D. Employment Location
  if (service.employmentLocationEligible) {
    if (employmentState && service.applicableStates.includes(employmentState)) {
      if (service.residenceRequired && (!residenceState || !service.applicableStates.includes(residenceState))) {
        return {
          isEligible: false,
          matchNote: `Excluded: ${service.name} requires permanent domicile in ${service.applicableStates.join(', ')}.`,
          exclusion: createJurisdictionExclusion(
            service,
            `Scheme requires permanent domicile in ${service.applicableStates.join(', ')}, but citizen's residence is ${residenceState || 'missing'}.`,
            'State Domicile Requirement',
            service.applicableStates,
            residenceState || 'missing'
          ),
        };
      }
      return {
        isEligible: true,
        matchNote: `Workplace Jurisdiction Match: Employment is located in ${employmentState}.`,
        jurisdictionBasis: 'employment',
        matchedLocationState: employmentState,
      };
    }
  }

  // 4E. Study Location (when studyLocationEligible is true)
  if (service.studyLocationEligible) {
    if (studyState && service.applicableStates.includes(studyState)) {
      if (service.residenceRequired && (!residenceState || !service.applicableStates.includes(residenceState))) {
        return {
          isEligible: false,
          matchNote: `Excluded: ${service.name} requires permanent domicile in ${service.applicableStates.join(', ')}.`,
          exclusion: createJurisdictionExclusion(
            service,
            `Scheme requires permanent domicile in ${service.applicableStates.join(', ')}, but citizen's residence is ${residenceState || 'missing'}.`,
            'State Domicile Requirement',
            service.applicableStates,
            residenceState || 'missing'
          ),
        };
      }
      return {
        isEligible: true,
        matchNote: `Cross-State Study Eligibility: You reside in ${residenceState || 'another state'}, but study in ${studyState}.`,
        jurisdictionBasis: 'study',
        matchedLocationState: studyState,
      };
    }
  }

  // 4F. If scheme strictly requires residence domicile
  if (service.residenceRequired || (!service.employmentLocationEligible && !service.studyLocationEligible)) {
    if (!residenceState) {
      return {
        isEligible: false,
        matchNote: 'Your residence/domicile state is required to check whether this scheme applies.',
        exclusion: createJurisdictionExclusion(
          service,
          'Your residence/domicile state is required to check whether this scheme applies.',
          'State Domicile Requirement',
          service.applicableStates,
          'Missing'
        ),
      };
    }

    if (service.applicableStates.includes(residenceState)) {
      return {
        isEligible: true,
        matchNote: `State Scheme: Specifically available for domiciled residents of ${residenceState}.`,
        jurisdictionBasis: 'residence',
        matchedLocationState: residenceState,
      };
    }

    // Citizen does NOT reside in applicable state:
    // If citizen studies in that state, explicitly explain that domicile is mandatory
    if (studyState && service.applicableStates.includes(studyState) && !service.studyLocationEligible) {
      return {
        isEligible: false,
        matchNote: `Excluded: ${service.name} requires permanent domicile in ${service.applicableStates.join(', ')}.`,
        exclusion: createJurisdictionExclusion(
          service,
          `Scheme requires permanent domicile in ${service.applicableStates.join(', ')}, but citizen's residence is ${residenceState}.`,
          'State Domicile Requirement',
          service.applicableStates,
          residenceState
        ),
      };
    }

    return {
      isEligible: false,
      matchNote: `Geographic Mismatch: Service is strictly designated for ${service.applicableStates.join(', ')}.`,
      exclusion: createJurisdictionExclusion(
        service,
        `Citizen residence state (${residenceState}) does not match scheme jurisdiction (${service.applicableStates.join(', ')}).`,
        'Applicable States',
        service.applicableStates,
        residenceState
      ),
    };
  }

  // Fallback geographic exclusion
  return {
    isEligible: false,
    matchNote: `Geographic Mismatch: Service is strictly designated for ${service.applicableStates.join(', ')}.`,
    exclusion: createJurisdictionExclusion(
      service,
      `Citizen profile locations do not match scheme jurisdiction (${service.applicableStates.join(', ')}).`,
      'Applicable States',
      service.applicableStates,
      residenceState || 'Missing'
    ),
  };
}
