'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Journey, StepStatus } from '@/lib/types';
import { getJourneyById, saveJourneyToStorage, getDebugMode } from '@/lib/storage';
import { JourneyTimeline } from '@/components/ui/journey-timeline';
import { DependencyGraph } from '@/components/ui/dependency-graph';
import { ServiceCard } from '@/components/ui/service-card';
import { useLanguage } from '@/components/LanguageProvider';
import { JourneyProfileSummary } from '@/components/ui/journey-profile-summary';
import { ExclusionInspector } from '@/components/ui/exclusion-inspector';
import { JourneyHeader } from '@/components/ui/journey-header';
import { createFallbackJourney } from '@/lib/buildDemoJourney';

export default function JourneyResultPage() {
  const params = useParams();
  const { t } = useLanguage();
  const journeyId = (params?.id as string) || '';
  const [journey, setJourney] = useState<Journey | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [debugMode, setDebugMode] = useState(getDebugMode());

  useEffect(() => {
    if (!journeyId) return;
    setDebugMode(getDebugMode());
    const loaded = getJourneyById(journeyId) || createFallbackJourney(journeyId);
    setJourney(loaded);
    saveJourneyToStorage(loaded);
    setLoading(false);
  }, [journeyId]);

  const handleStepStatusChange = (stepId: string, newStatus: StepStatus) => {
    if (!journey) return;
    const updatedSteps = journey.steps.map((s) => (s.id === stepId ? { ...s, status: newStatus } : s));
    const completedCount = updatedSteps.filter((s) => s.status === 'completed').length;
    const updatedJourney: Journey = {
      ...journey, steps: updatedSteps,
      overallProgress: Math.round((completedCount / updatedSteps.length) * 100),
      updatedAt: new Date().toISOString(),
    };
    setJourney(updatedJourney);
    saveJourneyToStorage(updatedJourney);
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading || !journey) {
    return <div className="max-w-4xl mx-auto px-4 py-20 text-center text-sm text-slate-500">Loading personalized action plan...</div>;
  }

  const { profile, lifeEvent, recommendations, excludedServices = [], steps, documentReadiness } = journey;

  return (
    <div
      className="min-h-screen"
      style={{ background: 'linear-gradient(160deg, #f0f7ff 0%, #f8fafc 50%, #f0fdf8 100%)' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
        <JourneyHeader title={t.journey.header} originalQuery={journey.naturalLanguageInput} copied={copied} onShare={handleShare} onPrint={() => typeof window !== 'undefined' && window.print()} />
      <JourneyProfileSummary lifeEvent={lifeEvent} profile={profile} documentReadiness={documentReadiness} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-civic-card space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">{t.journey.recommendedJourney}</h2>
                <p className="text-xs text-slate-500">Prerequisite-sequenced roadmap with verified destinations</p>
              </div>
              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">{journey.overallProgress}% Complete</span>
            </div>
            <JourneyTimeline steps={steps} onStepStatusChange={handleStepStatusChange} />
          </div>
          <DependencyGraph steps={steps} />
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">Relevant Government Services ({recommendations.length})</h3>
            <span className="text-xs text-slate-500 font-medium">Ranked by Fit</span>
          </div>
          <div className="space-y-4">
            {recommendations.map((rec) => <ServiceCard key={rec.serviceId} recommendation={rec} profile={profile} />)}
          </div>
          {debugMode && <ExclusionInspector exclusions={excludedServices} />}
        </div>
      </div>
      </div>
    </div>
  );
}
