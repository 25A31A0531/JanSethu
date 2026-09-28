// All types in one file
import type { SupportedLanguage } from './i18n';

export type LifeEventCategory =
  | 'disaster' | 'housing' | 'agriculture' | 'employment' | 'education'
  | 'healthcare' | 'business' | 'bereavement' | 'identity_documents'
  | 'financial_assistance' | 'women_child' | 'senior_citizen' | 'disability'
  | 'migration' | 'transport' | 'consumer' | 'environment' | 'other';

export type JurisdictionLevel = 'CENTRAL' | 'STATE' | 'DISTRICT' | 'LOCAL';
export type SchemeStatus = 'ACTIVE' | 'REPLACED' | 'DISCONTINUED' | 'HISTORICAL' | 'SUSPENDED' | 'UNDER_VERIFICATION' | 'UNDER_REVIEW' | 'UNVERIFIED' | 'UNKNOWN';
export type SourceType = 'verified' | 'demo';
export type SourceConfidence = 'High' | 'Medium' | 'Unverified';
export type EligibilityConfidence = 'High' | 'Medium' | 'Needs verification';
export type DocumentStatus = 'ready' | 'missing' | 'expiring' | 'needs_verification';
export type StepStatus = 'not_started' | 'in_progress' | 'completed';
export type FamilyRelationship = 'Self' | 'Father' | 'Mother' | 'Spouse' | 'Son' | 'Daughter' | 'Brother' | 'Sister' | 'Grandparent' | 'Other Dependent';

export interface DocumentRequirement {
  id: string; name: string;
  category: 'identity' | 'income' | 'residence' | 'academic' | 'land' | 'business' | 'medical' | 'legal' | 'disaster';
  description: string; issuingAuthority: string; validityPeriod?: string; sampleFields?: string[];
  digitalAccessUrl?: string; isDigiLockerAvailable?: boolean; status?: DocumentStatus;
  uploadedAt?: string; extractedData?: Record<string, string | number | boolean>;
}

export interface FamilyMember {
  id: string; relationship: FamilyRelationship; name?: string; age?: number;
  gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say'; occupation?: string;
  residenceState?: string; studyState?: string; employmentState?: string;
  isStudent?: boolean; isFarmer?: boolean; isBusinessOwner?: boolean;
  hasDisability?: boolean; isSeniorCitizen?: boolean; isWidow?: boolean;
  annualIncome?: number; notes?: string;
}

export interface CitizenProfile {
  id?: string; name?: string; age?: number;
  gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  residenceState: string; residenceDistrict?: string;
  studyState?: string; studyDistrict?: string; studyInstitution?: string;
  employmentState?: string; employmentDistrict?: string;
  propertyState?: string; propertyDistrict?: string;
  agricultureState?: string; agricultureDistrict?: string;
  businessState?: string; businessDistrict?: string;
  ruralUrban?: 'rural' | 'urban'; occupation?: string; educationLevel?: string;
  annualIncome?: number; socialCategory?: 'General' | 'OBC' | 'SC' | 'ST' | 'EWS' | 'Minority';
  isStudent?: boolean; isFarmer?: boolean; landHoldingAcres?: number;
  isBusinessOwner?: boolean; businessType?: string; hasDisability?: boolean;
  disabilityPercentage?: number; isSeniorCitizen?: boolean; isBPL?: boolean;
  hasInsurance?: boolean; hasBankLinkedAadhaar?: boolean; hasHouseDamage?: boolean;
  propertyDamageType?: 'severe' | 'partial' | 'inundation';
  activeContextPerson?: FamilyRelationship; familyMembers?: FamilyMember[];
  debugMode?: boolean; preferredLanguage?: string;
}

export interface ClarificationQuestion {
  id: string; field: keyof CitizenProfile | string; question: string; subtext?: string;
  type: 'select' | 'number' | 'text' | 'boolean' | 'radio' | 'range';
  options?: { label: string; value: any; subtext?: string }[];
  placeholder?: string; min?: number; max?: number; step?: number;
  defaultValue?: any; required?: boolean; dependsOn?: { field: string; value: any };
}

export interface ClassificationResult {
  primaryIntent: LifeEventCategory; secondaryIntents: LifeEventCategory[];
  confidence: number; reason: string; extractedContext?: Partial<CitizenProfile>;
  requiresClarification: boolean; clarificationPrompt?: string;
}

export interface LifeEvent {
  id: string; name: string; category: LifeEventCategory; description: string;
  keywords: string[]; icon: string; sampleQueries: string[];
  suggestedQuestions: ClarificationQuestion[];
}

export interface EligibilityRule {
  field: string;
  operator: 'equals' | 'less_than_or_equal' | 'greater_than_or_equal' | 'in' | 'boolean_true' | 'custom';
  value: any; label: string; isMandatory: boolean;
}

export interface ServiceStep {
  stepNumber: number; title: string; description: string; requiredDocuments: string[];
  estimatedEffort: string; portalUrl?: string; isOnline: boolean; offlineOffice?: string;
  tip?: string; dependsOn?: number[];
}

export interface GovernmentService {
  id: string; name: string; aliases?: string[]; department: string; authority: string; ministry?: string;
  category: LifeEventCategory; secondaryCategories?: LifeEventCategory[]; description: string;
  benefitsSummary: string; jurisdictionLevel: JurisdictionLevel; applicableStates: string[];
  applicableDistricts?: string[]; residenceRequired: boolean; studyLocationEligible: boolean;
  employmentLocationEligible: boolean; propertyLocationEligible: boolean;
  agricultureLocationEligible: boolean; businessLocationEligible: boolean;
  jurisdictionConditions?: string; status: SchemeStatus; effectiveFrom?: string;
  effectiveTo?: string; replacementFor?: string; replacedBy?: string;
  eligibilityRules: EligibilityRule[]; requiredDocuments: string[]; steps: ServiceStep[];
  sourceUrl?: string; applicationUrl?: string; sourceAuthority: string;
  sourceType: SourceType; sourceConfidence: SourceConfidence;
  officialVerificationStatus?: 'OFFICIALLY_VERIFIED' | 'GOVERNMENT_CONFIRMED' | 'UNDER_PERIODIC_REVIEW' | 'HISTORICAL_ARCHIVED' | 'DISCONTINUED' | 'REPLACED' | 'SUSPENDED' | 'UNVERIFIED';
  verificationEvidence?: 'OFFICIAL_PORTAL' | 'GOVERNMENT_ORDER' | 'GAZETTE_NOTIFICATION' | 'PRESS_INFORMATION_BUREAU' | 'PENDING_OFFICIAL_REVIEW';
  eligibleCategories?: ('General' | 'OBC' | 'SC' | 'ST' | 'EWS' | 'Minority')[];
  lastVerified: string; version: string; languages?: string[]; tags: string[];
}

export interface ExclusionReason {
  serviceId: string; serviceName: string;
  reasonType: 'jurisdiction' | 'eligibility' | 'status' | 'category';
  message: string; details: { ruleLabel?: string; expected?: any; actual?: any };
}

export type JurisdictionBasis =
  | 'central'
  | 'residence'
  | 'study'
  | 'employment'
  | 'property'
  | 'agriculture'
  | 'business';

export interface Recommendation {
  serviceId: string; service: GovernmentService; confidenceScore: number;
  potentialEligibility: EligibilityConfidence; matchReasons: string[];
  missingInfoReasons?: string[]; cautions?: string[];
  documentReadinessPercent: number; jurisdictionMatchNote: string;
  jurisdictionBasis?: JurisdictionBasis;
  matchedLocationState?: string;
  categoryMatchStatus?: 'MATCHED' | 'NOT_APPLICABLE' | 'MISMATCH' | 'MISSING_PROFILE_CATEGORY';
}

export interface JourneyStep {
  id: string; stepNumber: number; title: string;
  phase: 'Preparation' | 'Documentation' | 'Application' | 'Verification' | 'Tracking';
  description: string; whyItMatters: string; requiredDocuments: string[];
  estimatedEffort: string;
  officialDestination: { name: string; url?: string; isIntegrationPending?: boolean };
  status: StepStatus; dependencies: string[]; serviceId?: string;
}

export interface Journey {
  id: string; title: string; createdAt: string; updatedAt: string;
  lifeEvent: LifeEvent; profile: CitizenProfile; naturalLanguageInput: string;
  recommendations: Recommendation[]; excludedServices?: ExclusionReason[];
  steps: JourneyStep[]; overallProgress: number;
  documentReadiness: { totalRequired: number; readyCount: number; missingCount: number; percentage: number };
}

export interface DemoScenario {
  id: string; title: string; badge: string; shortDescription: string;
  initialQuery: string; lifeEventId: string; expectedPrimary: LifeEventCategory;
  expectedSecondary?: LifeEventCategory[]; profile: CitizenProfile;
}

export interface ChatMessage {
  id: string; sender: 'user' | 'assistant' | 'system'; timestamp: string; text: string;
  responseLanguage?: SupportedLanguage;
  structuredResponse?: {
    understood: string; appliesTo: string; schemes: Recommendation[];
    why: string[]; documentsNeeded: string[]; nextSteps: string[];
    officialSource: string; disclaimer: string;
    responseLanguage?: SupportedLanguage;
  };
  requiresClarification?: boolean; clarificationOptions?: { label: string; action: string }[];
}

export interface GovernmentUpdateNotice {
  id: string; schemeId: string; schemeName: string;
  updateType: 'NEW' | 'UPDATED' | 'REPLACED' | 'DISCONTINUED';
  description: string; publishedDate: string; sourceAuthority: string;
  sourceUrl?: string; verified: boolean;
}
