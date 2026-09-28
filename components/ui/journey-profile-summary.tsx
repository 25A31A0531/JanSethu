'use client';

import React from 'react';
import Link from 'next/link';
import { FileCheck2 } from 'lucide-react';
import { CitizenProfile, LifeEvent } from '@/lib/types';
import { useLanguage } from '@/components/LanguageProvider';

interface JourneyProfileSummaryProps {
  lifeEvent: LifeEvent;
  profile: CitizenProfile;
  documentReadiness: {
    totalRequired: number;
    readyCount: number;
    percentage: number;
  };
}

export function JourneyProfileSummary({
  lifeEvent,
  profile,
  documentReadiness,
}: JourneyProfileSummaryProps) {
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white border border-slate-200 rounded-3xl p-6 shadow-civic-card">
      <div className="space-y-1 md:border-r md:border-slate-100 md:pr-4">
        <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider block">
          {t.journey.lifeEventLabel}
        </span>
        <h3 className="text-base font-bold text-slate-900">{lifeEvent.name}</h3>
        <p className="text-xs text-slate-500 leading-relaxed">{lifeEvent.description}</p>
      </div>

      <div className="space-y-1.5 md:border-r md:border-slate-100 md:pr-4">
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
          {t.journey.profileSummary}
        </span>
        <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs text-slate-700">
          <div>
            <span className="text-slate-400">Residence: </span>
            <span className="font-semibold">{profile.residenceState}</span>
          </div>
          {profile.studyState && (
            <div>
              <span className="text-slate-400">Study: </span>
              <span className="font-semibold">{profile.studyState}</span>
            </div>
          )}
          {profile.employmentState && (
            <div>
              <span className="text-slate-400">Employment: </span>
              <span className="font-semibold">{profile.employmentState}</span>
            </div>
          )}
          {profile.propertyState && (
            <div>
              <span className="text-slate-400">Property: </span>
              <span className="font-semibold">{profile.propertyState}</span>
            </div>
          )}
          {profile.agricultureState && (
            <div>
              <span className="text-slate-400">Agri Land: </span>
              <span className="font-semibold">{profile.agricultureState}</span>
            </div>
          )}
          {profile.businessState && (
            <div>
              <span className="text-slate-400">Business: </span>
              <span className="font-semibold">{profile.businessState}</span>
            </div>
          )}
          {profile.annualIncome && (
            <div>
              <span className="text-slate-400">Income: </span>
              <span className="font-semibold">₹{(profile.annualIncome / 100000).toFixed(1)}L/yr</span>
            </div>
          )}
          {profile.socialCategory && (
            <div>
              <span className="text-slate-400">Category: </span>
              <span className="font-semibold">{profile.socialCategory}</span>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-bold text-slate-900">Document Readiness</span>
            <span className="font-extrabold text-indigo-600">{documentReadiness.percentage}%</span>
          </div>
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${documentReadiness.percentage}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            {documentReadiness.readyCount} of {documentReadiness.totalRequired} required certificates ready
          </p>
        </div>

        <Link
          href="/documents"
          className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 py-2 rounded-xl transition"
        >
          <FileCheck2 className="w-3.5 h-3.5" />
          <span>Manage Documents</span>
        </Link>
      </div>
    </div>
  );
}
