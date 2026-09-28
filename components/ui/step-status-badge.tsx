'use client';

import React from 'react';
import { CheckCircle2, Clock, Circle } from 'lucide-react';
import { StepStatus } from '@/lib/types';
import { useLanguage } from '@/components/LanguageProvider';

interface StepStatusBadgeProps {
  status: StepStatus;
}

export function StepStatusBadge({ status }: StepStatusBadgeProps) {
  const { t } = useLanguage();
  switch (status) {
    case 'completed':
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
          <CheckCircle2 className="w-3 h-3" /> {t.journey.statusCompleted}
        </span>
      );
    case 'in_progress':
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-full">
          <Clock className="w-3 h-3" /> {t.journey.statusInProgress}
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-full">
          <Circle className="w-3 h-3" /> {t.journey.statusNotStarted}
        </span>
      );
  }
}
