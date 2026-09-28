'use client';

import React from 'react';
import { Info, ShieldAlert } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';

export function DisclaimerBanner() {
  const { t } = useLanguage();

  return (
    <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4 text-center border-b border-slate-800 flex items-center justify-center gap-2">
      <span className="inline-flex items-center gap-1 font-medium bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded text-[11px] border border-amber-500/30">
        <Info className="w-3 h-3" /> Prototype
      </span>
      <span>{t.disclaimer}</span>
    </div>
  );
}
