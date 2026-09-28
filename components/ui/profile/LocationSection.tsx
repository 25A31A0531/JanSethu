'use client';

import React from 'react';
import { MapPin } from 'lucide-react';
import { CitizenProfile } from '@/lib/types';
import { INDIA_STATES_AND_UTS } from '@/lib/indiaRegions';
import { useLanguage } from '@/components/LanguageProvider';

interface LocationSectionProps {
  profile: CitizenProfile;
  onChange: (field: keyof CitizenProfile, val: any) => void;
}

export function LocationSection({ profile, onChange }: LocationSectionProps) {
  const { t } = useLanguage();
  const stateSelect = (field: keyof CitizenProfile, label: string, showType?: boolean) => (
    <div className="space-y-1.5">
      <label className="font-bold text-slate-800 block">{label}</label>
      <select
        value={(profile[field] as string) || profile.residenceState}
        onChange={(e) => onChange(field, e.target.value)}
        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:outline-none focus:border-indigo-600"
      >
        {INDIA_STATES_AND_UTS.map((st) => (
          <option key={st.code} value={st.name}>{st.name}{showType ? ` (${st.type})` : ''}</option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-civic-card space-y-5">
      <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
        <MapPin className="w-5 h-5 text-indigo-600" />
        <div>
          <h3 className="font-bold text-base text-slate-900">{t.profile.residenceSection}</h3>
          <p className="text-xs text-slate-500">Government schemes filter eligibility based on these geographic locations.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
        {stateSelect('residenceState', `${t.profile.residenceState} *`, true)}
        {stateSelect('studyState', t.profile.studyState)}
        {stateSelect('employmentState', t.profile.employmentState)}
        {stateSelect('propertyState', t.profile.propertyState)}
        {stateSelect('agricultureState', 'Agricultural Land State')}
        {stateSelect('businessState', 'Business Enterprise State')}
      </div>
    </div>
  );
}
