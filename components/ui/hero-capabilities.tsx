'use client';

import React from 'react';
import { MessageSquare, Compass, ListOrdered } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';

export function HeroCapabilities() {
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-civic-card hover:shadow-civic-card-hover transition space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-700">
          <MessageSquare className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-slate-900">{t.home.capabilities.understandTitle}</h3>
        <p className="text-sm text-slate-600 leading-relaxed">{t.home.capabilities.understandDesc}</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-civic-card hover:shadow-civic-card-hover transition space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-700">
          <Compass className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-slate-900">{t.home.capabilities.discoverTitle}</h3>
        <p className="text-sm text-slate-600 leading-relaxed">{t.home.capabilities.discoverDesc}</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-civic-card hover:shadow-civic-card-hover transition space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-700">
          <ListOrdered className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-slate-900">{t.home.capabilities.actTitle}</h3>
        <p className="text-sm text-slate-600 leading-relaxed">{t.home.capabilities.actDesc}</p>
      </div>
    </div>
  );
}
