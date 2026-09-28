'use client';

import React from 'react';
import { FileText, CheckCircle2 } from 'lucide-react';
import { DOCUMENT_TYPES } from '@/lib/demoData';
import { useLanguage } from '@/components/LanguageProvider';

interface StepDocumentsProps {
  requiredDocuments: string[];
}

export function StepDocuments({ requiredDocuments }: StepDocumentsProps) {
  const { t } = useLanguage();
  if (!requiredDocuments || requiredDocuments.length === 0) return null;

  return (
    <div className="mb-4 space-y-1.5">
      <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
        {t.journey.requiredDocuments}:
      </span>
      <div className="flex flex-wrap gap-2">
        {requiredDocuments.map((docId) => {
          const doc = DOCUMENT_TYPES.find((d) => d.id === docId);
          const isReady = doc?.status === 'ready';
          return (
            <span
              key={docId}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border ${
                isReady
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : 'bg-slate-50 text-slate-700 border-slate-200'
              }`}
            >
              <FileText className="w-3 h-3 text-slate-500" />
              <span>{doc?.name || docId}</span>
              {isReady && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
            </span>
          );
        })}
      </div>
    </div>
  );
}
