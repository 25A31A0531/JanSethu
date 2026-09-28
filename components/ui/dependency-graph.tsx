'use client';

import React from 'react';
import { ArrowDown, CheckCircle, Layers } from 'lucide-react';
import { JourneyStep } from '@/lib/types';
import { useLanguage } from '@/components/LanguageProvider';

interface DependencyGraphProps {
  steps: JourneyStep[];
}

export function DependencyGraph({ steps }: DependencyGraphProps) {
  const { t } = useLanguage();
  if (!steps || steps.length === 0) return null;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <div className="flex items-start justify-between mb-6 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-indigo-50 text-indigo-700 rounded-xl"><Layers className="w-5 h-5" /></div>
          <div>
            <h3 className="text-base font-bold text-slate-900">{t.journey.whyOrderTitle}</h3>
            <p className="text-xs text-slate-500 mt-0.5">{t.journey.whyOrderSubtitle}</p>
          </div>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg">Linear Dependency Chain</span>
      </div>

      <div className="relative space-y-4">
        {steps.map((step, idx) => {
          const isLast = idx === steps.length - 1;
          const isDone = step.status === 'completed';
          const isInProg = step.status === 'in_progress';
          const nodeClass = isDone ? 'bg-emerald-600 text-white' : isInProg ? 'bg-indigo-600 text-white ring-4 ring-indigo-100' : 'bg-white border-2 border-slate-300 text-slate-600';

          return (
            <div key={step.id} className="relative flex flex-col items-start">
              <div className="w-full flex items-start gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-white hover:border-indigo-200 hover:shadow-sm transition group">
                <div className="shrink-0 flex flex-col items-center">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shadow-xs transition ${nodeClass}`}>
                    {isDone ? <CheckCircle className="w-4 h-4" /> : `0${step.stepNumber}`}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition">{step.title}</span>
                      <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-slate-200/70 text-slate-700">{step.phase}</span>
                    </div>
                    <span className="text-[11px] text-slate-500 font-medium">⏱ {step.estimatedEffort}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-2">{step.description}</p>
                  <div className="flex items-center gap-2 text-[11px] text-indigo-700 bg-indigo-50/60 px-2.5 py-1 rounded-md border border-indigo-100/80">
                    <span className="font-semibold shrink-0">Prerequisite Rationale:</span>
                    <span className="truncate text-slate-700">{step.whyItMatters}</span>
                  </div>
                </div>
              </div>

              {!isLast && (
                <div className="w-full flex justify-start pl-7 py-1 text-slate-300">
                  <div className="flex items-center gap-2 text-[10px] font-medium text-slate-400">
                    <div className="w-0.5 h-4 bg-slate-200 ml-1.5" />
                    <ArrowDown className="w-3.5 h-3.5 text-slate-400" />
                    <span className="italic">Required before next step</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
