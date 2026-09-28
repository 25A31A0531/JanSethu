'use client';

import React from 'react';
import { CheckCircle2, AlertTriangle, Clock, Info, Sparkles } from 'lucide-react';
import { DocumentStatus } from '@/lib/types';
import { useLanguage } from '@/components/LanguageProvider';

export function DocumentStatusBadge({ status }: { status?: DocumentStatus }) {
  const { t } = useLanguage();
  switch (status) {
    case 'ready':
      return <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full"><CheckCircle2 className="w-3 h-3" /> {t.documents.statusReady}</span>;
    case 'missing':
      return <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-full"><AlertTriangle className="w-3 h-3" /> {t.documents.statusMissing}</span>;
    case 'expiring':
      return <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full"><Clock className="w-3 h-3" /> {t.documents.statusExpiring}</span>;
    default:
      return <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full"><Info className="w-3 h-3" /> {t.documents.statusVerification}</span>;
  }
}

export function DocumentOcrBadge({ data }: { data: Record<string, any> }) {
  return (
    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1.5 text-xs">
      <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-[11px]">
        <Sparkles className="w-3.5 h-3.5" />
        <span>Simulated OCR Extraction Detected:</span>
      </div>
      <ul className="space-y-1 text-slate-700 text-[11px]">
        {Object.entries(data).map(([key, val]) => (
          <li key={key} className="flex justify-between gap-2">
            <span className="text-slate-500">{key}:</span>
            <span className="font-medium text-slate-900">{String(val)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
