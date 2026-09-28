import { CitizenProfile, LifeEvent, Journey } from '@/lib/types';
import { DOCUMENT_TYPES } from '@/lib/demoData';
import { findRelevantServices, generateActionPlan } from '@/lib/rulesEngine';

export function buildStartJourney(
  detectedEvent: LifeEvent,
  completedProfile: CitizenProfile,
  naturalQuery: string
): Journey {
  const { recommendations, excludedServices } = findRelevantServices(completedProfile, detectedEvent);
  const primaryServices = recommendations.map((r) => r.service);
  const steps = generateActionPlan(completedProfile, primaryServices);

  const requiredDocIds = Array.from(new Set(primaryServices.flatMap((s) => s.requiredDocuments)));
  const totalRequired = requiredDocIds.length;
  const readyCount = requiredDocIds.filter(
    (id) => DOCUMENT_TYPES.find((d) => d.id === id)?.status === 'ready'
  ).length;
  const percentage = totalRequired > 0 ? Math.round((readyCount / totalRequired) * 100) : 100;

  return {
    id: `journey-${Date.now()}`,
    title: `${detectedEvent.name} Navigator`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lifeEvent: detectedEvent,
    profile: completedProfile,
    naturalLanguageInput: naturalQuery,
    recommendations,
    excludedServices,
    steps,
    overallProgress: 20,
    documentReadiness: {
      totalRequired,
      readyCount,
      missingCount: totalRequired - readyCount,
      percentage,
    },
  };
}
