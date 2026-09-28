import { classifyLifeEvent, generateClarifyingQuestions } from '@/lib/rulesEngine';
import { CitizenProfile, LifeEvent } from '@/lib/types';
import { LIFE_EVENTS } from '@/lib/demoData';
import { getCitizenProfile } from '@/lib/storage';

export function runLifeEventClassification(query: string): {
  error?: string;
  lifeEvent?: LifeEvent;
  initialProfile?: Partial<CitizenProfile>;
  questions?: any[];
} {
  if (query.trim().length < 4) {
    return { error: 'I’m not confident enough to classify this yet. Describe what happened, what you need, and your state.' };
  }
  const classification = classifyLifeEvent(query);
  if (classification.requiresClarification || classification.primaryIntent === 'other') {
    return { error: classification.clarificationPrompt || 'Please describe a government-service need, what happened, and your state.' };
  }
  const lifeEvent = LIFE_EVENTS.find((e) => e.id === classification.primaryIntent);
  if (!lifeEvent) {
    return { error: 'Please describe a government-service need so I can find the right help.' };
  }
  const savedProf = getCitizenProfile();
  const initialProfile: Partial<CitizenProfile> = { ...savedProf, ...(classification.extractedContext || {}) };
  const questions = generateClarifyingQuestions(initialProfile, lifeEvent);
  return { lifeEvent, initialProfile, questions };
}
