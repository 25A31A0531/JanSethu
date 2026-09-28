'use client';

import React from 'react';
import { Loader2, CheckCircle2 } from 'lucide-react';

export function ProcessingCard({ mode }: { mode: 'analyzing' | 'generating' }) {
  if (mode === 'analyzing') {
    return (
      <div className="max-w-md mx-auto bg-white border border-slate-200 rounded-3xl p-8 text-center shadow-lg space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 mx-auto flex items-center justify-center animate-spin">
          <Loader2 className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900">Understanding Your Situation</h3>
          <p className="text-xs text-slate-500 mt-1">
            Classifying life event, mapping required prerequisites & government regulations...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white border border-slate-200 rounded-3xl p-8 text-center shadow-lg space-y-4">
      <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center animate-bounce">
        <CheckCircle2 className="w-6 h-6" />
      </div>
      <div>
        <h3 className="text-base font-bold text-slate-900">Generating Action Plan</h3>
        <p className="text-xs text-slate-500 mt-1">
          Computing eligibility confidence, sorting dependency roadmap, checking document readiness...
        </p>
      </div>
    </div>
  );
}
