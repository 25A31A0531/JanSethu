import {
  CitizenProfile,
  LifeEvent,
  GovernmentService,
  Recommendation,
  JourneyStep,
  ClassificationResult,
  ClarificationQuestion,
  ExclusionReason,
} from './types';
import * as rulesEngine from './rulesEngine';
import { DOCUMENT_TYPES, LIFE_EVENTS } from './demoData';
import { detectLanguage, translateContent, SupportedLanguage } from './i18n';

const GEMINI_API_KEY =
  process.env.GEMINI_API_KEY ||
  process.env.NEXT_PUBLIC_GEMINI_API_KEY ||
  '';

export async function classifyLifeEvent(input: string): Promise<ClassificationResult> {
  if (!input || input.trim().length === 0) {
    return rulesEngine.classifyLifeEvent('general');
  }

  // Fast offline deterministic classification
  return rulesEngine.classifyLifeEvent(input);
}

export async function generateClarifyingQuestions(
  profile: Partial<CitizenProfile>,
  event: LifeEvent
): Promise<ClarificationQuestion[]> {
  return rulesEngine.generateClarifyingQuestions(profile, event);
}

export async function findRelevantServices(
  profile: CitizenProfile,
  event: LifeEvent,
  query?: string
): Promise<{
  recommendations: Recommendation[];
  excludedServices: ExclusionReason[];
}> {
  return rulesEngine.findRelevantServices(profile, event, query);
}

export async function generateActionPlan(
  profile: CitizenProfile,
  services: GovernmentService[]
): Promise<JourneyStep[]> {
  return rulesEngine.generateActionPlan(profile, services);
}

export async function identifyMissingDocuments(
  profile: CitizenProfile,
  service: GovernmentService
): Promise<{ documentId: string; documentName: string; reason: string }[]> {
  const missing: { documentId: string; documentName: string; reason: string }[] = [];

  for (const docId of service.requiredDocuments) {
    const doc = DOCUMENT_TYPES.find((d) => d.id === docId);
    if (doc && doc.status !== 'ready') {
      missing.push({
        documentId: doc.id,
        documentName: doc.name,
        reason:
          doc.status === 'missing'
            ? 'Must be obtained prior to submitting the official scheme application.'
            : 'Requires validity extension or annual renewal for the current financial year.',
      });
    }
  }

  return missing;
}
