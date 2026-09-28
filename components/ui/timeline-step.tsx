'use client';

import React from 'react';
import { CheckCircle2, ExternalLink, Sparkles } from 'lucide-react';
import { JourneyStep } from '@/lib/types';
import { useLanguage } from '@/components/LanguageProvider';
import { translateContent } from '@/lib/i18n';
import { StepStatusBadge } from './step-status-badge';
import { StepDocuments } from './step-documents';

interface TimelineStepProps {
  step: JourneyStep;
  onToggle: (stepId: string) => void;
}

export function TimelineStep({ step, onToggle }: TimelineStepProps) {
  const { language } = useLanguage();
  const isCompleted = step.status === 'completed';
  const isInProgress = step.status === 'in_progress';

  return (
    <div className="relative group">
      <div
        onClick={() => onToggle(step.id)}
        className={`absolute -left-[35px] md:-left-[43px] top-1.5 w-8 h-8 md:w-9 md:h-9 rounded-xl flex items-center justify-center font-bold text-xs cursor-pointer shadow-sm transition transform group-hover:scale-110 ${
          isCompleted ? 'bg-emerald-600 text-white ring-4 ring-emerald-100' : isInProgress ? 'bg-indigo-600 text-white ring-4 ring-indigo-100 animate-pulse' : 'bg-white border-2 border-slate-300 text-slate-700 hover:border-indigo-400'
        }`}
        title="Click to toggle status"
      >
        {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <span>0{step.stepNumber}</span>}
      </div>

      <div className={`bg-white border rounded-2xl p-5 md:p-6 shadow-civic-card transition-all ${
        isInProgress ? 'border-indigo-300 ring-2 ring-indigo-50 shadow-md' : isCompleted ? 'border-emerald-200 bg-emerald-50/20' : 'border-slate-200 hover:border-slate-300'
      }`}>
        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                {translateContent(step.phase, language).text}
              </span>
              <StepStatusBadge status={step.status} />
            </div>
            <h4 className="text-base font-bold text-slate-900">{translateContent(step.title, language).text}</h4>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">⏱ {step.estimatedEffort}</span>
            <button onClick={() => onToggle(step.id)} className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3 py-1 rounded-lg border border-indigo-100 transition">
              {isCompleted ? 'Mark Pending' : isInProgress ? 'Mark Done' : 'Start Step'}
            </button>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">{step.description}</p>
        <div className="mb-4 p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2.5 text-xs text-slate-700">
          <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-slate-900 block mb-0.5">{translateContent('Why this step matters:', language).text}</span>
            <span className="text-slate-600 leading-relaxed">{step.whyItMatters}</span>
          </div>
        </div>

        <StepDocuments requiredDocuments={step.requiredDocuments} />

        {step.officialDestination && (
          <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="text-slate-500 font-medium">Destination Portal: <strong className="text-slate-800">{step.officialDestination.name}</strong></span>
            {step.officialDestination.url ? (
              <a href={step.officialDestination.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-indigo-600 hover:text-indigo-800 hover:underline">
                <span>Open Official Portal</span><ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : <span className="text-slate-400 italic">(Offline / In-person administrative step)</span>}
          </div>
        )}
      </div>
    </div>
  );
}
