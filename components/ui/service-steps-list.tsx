'use client';

import React from 'react';
import { ServiceStep } from '@/lib/types';

export function ServiceStepsList({ steps }: { steps: ServiceStep[] }) {
  if (!steps || steps.length === 0) return null;

  return (
    <div className="mt-3 pt-3 border-t border-slate-100 space-y-3 bg-slate-50 p-4 rounded-2xl">
      <h5 className="text-xs font-bold text-slate-900">Application Procedure:</h5>
      <ol className="space-y-3 text-xs">
        {steps.map((st) => (
          <li key={st.stepNumber} className="flex items-start gap-3">
            <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
              {st.stepNumber}
            </span>
            <div className="space-y-0.5">
              <span className="font-bold text-slate-900">{st.title}</span>
              <p className="text-slate-600 leading-relaxed">{st.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
