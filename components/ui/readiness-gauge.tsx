'use client';

import React from 'react';
import { CheckCircle2, AlertTriangle } from 'lucide-react';

interface ReadinessGaugeProps {
  readyCount: number;
  totalCount: number;
  readinessPercent: number;
}

export function ReadinessGauge({ readyCount, totalCount, readinessPercent }: ReadinessGaugeProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-civic-card flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="space-y-2 text-center md:text-left">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
          Overall Readiness Score
        </span>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
          Your profile is {readinessPercent}% document-ready
        </h2>
        <p className="text-xs text-slate-500 max-w-xl">
          {readyCount} of {totalCount} foundational civil documents are validated. Having all required documents ready in advance prevents scheme disqualification.
        </p>
      </div>

      <div className="shrink-0 flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
        <div className="w-20 h-20 rounded-full border-4 border-emerald-500 bg-white flex flex-col items-center justify-center shadow-inner">
          <span className="text-xl font-extrabold text-slate-900">{readinessPercent}%</span>
          <span className="text-[10px] font-bold text-emerald-700 uppercase">Ready</span>
        </div>
        <div className="space-y-1 text-xs text-slate-600">
          <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{readyCount} Valid</span>
          </div>
          <div className="flex items-center gap-1.5 text-rose-700 font-semibold">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>{totalCount - readyCount} Missing / Pending</span>
          </div>
        </div>
      </div>
    </div>
  );
}
