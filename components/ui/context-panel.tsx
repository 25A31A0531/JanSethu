'use client';

import React from 'react';
import { MapPin, AlertTriangle } from 'lucide-react';
import { CitizenProfile, LifeEvent, Recommendation, ExclusionReason } from '@/lib/types';
import { useLanguage } from '@/components/LanguageProvider';

interface ContextPanelProps {
  profile: CitizenProfile;
  activePerson: string;
  currentLifeEvent: LifeEvent | null;
  matchedRecs: Recommendation[];
  excludedList: ExclusionReason[];
  debugMode: boolean;
  mobileContextOpen: boolean;
}

export function ContextPanel({
  profile, activePerson, currentLifeEvent, matchedRecs, excludedList, debugMode, mobileContextOpen,
}: ContextPanelProps) {
  const { t } = useLanguage();

  return (
    <div className={`lg:block space-y-6 ${mobileContextOpen ? 'block' : 'hidden'}`}>
      {/* Context Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-civic-card space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-700">
              <MapPin className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-sm text-slate-900">{t.ask.contextTitle}</h4>
          </div>
          <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-slate-100 text-slate-700 rounded">
            {activePerson}
          </span>
        </div>

        <div className="space-y-2 text-xs text-slate-600">
          <div className="flex justify-between py-1 border-b border-slate-50">
            <span className="text-slate-500">Residence State:</span>
            <strong className="text-slate-900">{profile.residenceState}</strong>
          </div>
          {profile.studyState && (
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500">Study State:</span>
              <strong className="text-slate-900">{profile.studyState}</strong>
            </div>
          )}
          {profile.employmentState && (
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500">Employment State:</span>
              <strong className="text-slate-900">{profile.employmentState}</strong>
            </div>
          )}
          {profile.propertyState && (
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500">Property State:</span>
              <strong className="text-slate-900">{profile.propertyState}</strong>
            </div>
          )}
          {profile.agricultureState && (
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500">Agriculture State:</span>
              <strong className="text-slate-900">{profile.agricultureState}</strong>
            </div>
          )}
          {profile.businessState && (
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500">Business State:</span>
              <strong className="text-slate-900">{profile.businessState}</strong>
            </div>
          )}
          {profile.socialCategory && (
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500">Social Category:</span>
              <strong className="text-slate-900">{profile.socialCategory}</strong>
            </div>
          )}
          {currentLifeEvent && (
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500">Active Life Event:</span>
              <strong className="text-indigo-600">{currentLifeEvent.name}</strong>
            </div>
          )}
          <div className="flex justify-between py-1 border-b border-slate-50">
            <span className="text-slate-500">Matched Services:</span>
            <strong className="text-slate-900">{matchedRecs.length} verified</strong>
          </div>
        </div>
      </div>

      {/* Debug Exclusion Panel */}
      {debugMode && excludedList.length > 0 && (
        <div className="bg-slate-900 text-white rounded-3xl p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Why Was This Not Shown?</span>
            </div>
            <span className="text-[10px] font-mono text-slate-400">{excludedList.length} Excluded</span>
          </div>
          <div className="space-y-2 text-xs max-h-60 overflow-y-auto pr-1">
            {excludedList.map((exc, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1 text-[11px]">
                <div className="flex items-center justify-between">
                  <strong className="text-slate-200">{exc.serviceName}</strong>
                  <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">
                    {exc.reasonType}
                  </span>
                </div>
                <p className="text-slate-400 leading-relaxed">{exc.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
