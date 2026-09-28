'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Sparkles, AlertCircle, Layers, RefreshCcw, MessageSquare } from 'lucide-react';
import { LifeEventInput } from '@/components/ui/life-event-input';
import { ClarificationForm } from '@/components/ui/clarification-form';
import { ProcessingCard } from '@/components/ui/processing-card';
import { CitizenProfile, LifeEvent } from '@/lib/types';
import { saveJourneyToStorage } from '@/lib/storage';
import { useLanguage } from '@/components/LanguageProvider';
import { buildStartJourney } from '@/lib/buildStartJourney';
import { runLifeEventClassification } from '@/lib/classifyEventHelper';

function StartContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useLanguage();
  const [naturalQuery, setNaturalQuery] = useState('');
  const [phase, setPhase] = useState<'input' | 'analyzing' | 'clarifying' | 'generating'>('input');
  const [detectedEvent, setDetectedEvent] = useState<LifeEvent | null>(null);
  const [classificationProfile, setClassificationProfile] = useState<Partial<CitizenProfile>>({});
  const [questions, setQuestions] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleInitialSubmit = (query: string) => {
    if (!query.trim()) return;
    setNaturalQuery(query);
    setPhase('analyzing');
    setErrorMessage(null);
    setTimeout(() => {
      const res = runLifeEventClassification(query);
      if (res.error || !res.lifeEvent) {
        setErrorMessage(res.error || 'Unable to classify event.');
        setPhase('input');
        return;
      }
      setDetectedEvent(res.lifeEvent);
      setClassificationProfile(res.initialProfile || {});
      setQuestions(res.questions || []);
      setPhase('clarifying');
    }, 1100);
  };

  useEffect(() => {
    const q = searchParams?.get('q');
    if (q) { setNaturalQuery(q); handleInitialSubmit(q); }
  }, [searchParams]);

  const handleClarificationComplete = (completedProfile: CitizenProfile) => {
    if (!detectedEvent) return;
    setPhase('generating');
    setTimeout(() => {
      const journey = buildStartJourney(detectedEvent, completedProfile, naturalQuery);
      saveJourneyToStorage(journey);
      router.push(`/journey/${journey.id}`);
    }, 900);
  };

  const getTitle = () => {
    if (phase === 'clarifying') return t.start.clarificationTitle;
    if (phase === 'analyzing' || phase === 'generating') return 'Preparing Your Action Plan';
    return t.start.title;
  };

  return (
    <div
      className="min-h-[85vh]"
      style={{ background: 'linear-gradient(160deg, #f0f7ff 0%, #f8fafc 50%, #f0fdf8 100%)' }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-4">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold"
            style={{
              background: 'rgba(255,255,255,0.9)',
              border: '1px solid rgba(99,102,241,0.2)',
              color: '#4338ca',
              boxShadow: '0 2px 8px rgba(99,102,241,0.1)',
            }}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Life-Event Intelligence Engine</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
            {getTitle()}
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            {phase === 'clarifying' ? t.start.clarificationSubtitle : t.start.subtitle}
          </p>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div
            className="max-w-xl mx-auto mb-6 flex items-start gap-3 p-4 rounded-2xl"
            style={{ background: 'rgba(254,243,199,0.9)', border: '1px solid rgba(252,211,77,0.5)' }}
          >
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1 text-sm">
              <span className="font-bold text-amber-900 block">Need more context</span>
              <p className="text-amber-800 leading-relaxed">{errorMessage}</p>
            </div>
          </div>
        )}

        {/* Input Phase */}
        {phase === 'input' && (
          <div
            className="p-6 sm:p-8 rounded-3xl"
            style={{
              background: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(226,232,240,0.8)',
              boxShadow: '0 8px 32px rgba(15,23,42,0.08)',
            }}
          >
            <LifeEventInput onSubmit={handleInitialSubmit} initialValue={naturalQuery} isAnalyzing={false} />
          </div>
        )}

        {/* Analyzing / Generating Phase */}
        {(phase === 'analyzing' || phase === 'generating') && (
          <div
            className="p-6 sm:p-8 rounded-3xl"
            style={{
              background: 'rgba(255,255,255,0.9)',
              border: '1px solid rgba(226,232,240,0.8)',
              boxShadow: '0 8px 32px rgba(15,23,42,0.08)',
            }}
          >
            <ProcessingCard mode={phase} />
          </div>
        )}

        {/* Clarifying Phase */}
        {phase === 'clarifying' && detectedEvent && (
          <div className="space-y-5">
            <div
              className="max-w-xl mx-auto flex items-center justify-between p-4 rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(226,232,240,0.7)' }}
            >
              <div className="flex items-center gap-2 text-sm">
                <Layers className="w-4 h-4 text-blue-600" />
                <span className="text-slate-600">Identified Life Event:</span>
                <strong className="text-slate-900">{detectedEvent.name}</strong>
              </div>
              <button
                onClick={() => setPhase('input')}
                className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 transition"
              >
                <RefreshCcw className="w-3 h-3" />
                <span>Change</span>
              </button>
            </div>

            <div
              className="rounded-3xl overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.9)',
                border: '1px solid rgba(226,232,240,0.8)',
                boxShadow: '0 8px 32px rgba(15,23,42,0.08)',
              }}
            >
              <ClarificationForm
                lifeEvent={detectedEvent}
                questions={questions}
                initialProfile={{
                  ...classificationProfile,
                  hasHouseDamage: detectedEvent.id === 'disaster' ? true : undefined,
                }}
                onSubmit={handleClarificationComplete}
                isLoading={false}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function StartPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl mx-auto flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #1d4ed8, #0d9488)' }}
          >
            <span className="text-white font-bold text-lg">JS</span>
          </div>
          <p className="text-sm text-slate-500">Loading JANSETU Navigator...</p>
        </div>
      </div>
    }>
      <StartContent />
    </Suspense>
  );
}
