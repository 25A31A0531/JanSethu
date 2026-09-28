'use client';

import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { ExclusionReason } from '@/lib/types';

interface ExclusionInspectorProps {
  exclusions: ExclusionReason[];
}

export function ExclusionInspector({ exclusions }: ExclusionInspectorProps) {
  if (!exclusions || exclusions.length === 0) return null;

  return (
    <div className="p-5 rounded-3xl bg-slate-900 text-white space-y-3 shadow-xl">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Why Was This Not Shown?</span>
        </div>
        <span className="text-[10px] text-slate-400 font-mono">{exclusions.length} Excluded</span>
      </div>

      <div className="space-y-2 text-xs">
        {exclusions.map((exc, idx) => (
          <div
            key={idx}
            className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1 text-[11px]"
          >
            <div className="flex items-center justify-between">
              <strong className="text-slate-200">{exc.serviceName}</strong>
              <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">
                {exc.reasonType}
              </span>
            </div>
            <p className="text-slate-400">{exc.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
