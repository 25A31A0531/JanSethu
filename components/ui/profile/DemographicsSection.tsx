'use client';

import React from 'react';
import { CitizenProfile } from '@/lib/types';

interface DemographicsSectionProps {
  profile: CitizenProfile;
  onChange: (field: keyof CitizenProfile, val: any) => void;
}

export function DemographicsSection({ profile, onChange }: DemographicsSectionProps) {
  const [ageStr, setAgeStr] = React.useState<string>(
    profile.age !== undefined && profile.age !== null ? String(profile.age) : '25'
  );

  React.useEffect(() => {
    if (profile.age !== undefined && profile.age !== null && String(profile.age) !== ageStr && ageStr !== '') {
      setAgeStr(String(profile.age));
    }
  }, [profile.age]);

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setAgeStr(val);
    if (val === '') {
      onChange('age', 0);
    } else {
      const num = parseInt(val, 10);
      if (!isNaN(num)) {
        onChange('age', num);
      }
    }
  };

  const handleAgeBlur = () => {
    if (!ageStr || parseInt(ageStr, 10) <= 0) {
      setAgeStr('18');
      onChange('age', 18);
    } else {
      const parsed = Math.min(125, Math.max(1, parseInt(ageStr, 10)));
      setAgeStr(String(parsed));
      onChange('age', parsed);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-civic-card space-y-5">
      <h3 className="font-bold text-base text-slate-900 pb-3 border-b border-slate-100">Socio-Economic Demographics</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="space-y-1.5">
          <label className="font-bold text-slate-800 block">Age</label>
          <input
            type="number"
            min={1}
            max={125}
            value={ageStr}
            onChange={handleAgeChange}
            onBlur={handleAgeBlur}
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:outline-none focus:border-indigo-600"
          />
        </div>
        <div className="space-y-1.5">
          <label className="font-bold text-slate-800 block">Social Category</label>
          <select
            value={profile.socialCategory || ''}
            onChange={(e) => onChange('socialCategory', e.target.value || undefined)}
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:outline-none focus:border-indigo-600"
          >
            <option value="">-- Select Social Category (Optional) --</option>
            {['General', 'OBC', 'SC', 'ST', 'EWS', 'Minority'].map((c) => (
              <option key={c} value={c}>
                {c === 'General' ? 'General / Open' : c}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="font-bold text-slate-800 block">Annual Income (INR)</label>
          <select
            value={profile.annualIncome || 250000}
            onChange={(e) => onChange('annualIncome', Number(e.target.value))}
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:outline-none focus:border-indigo-600"
          >
            <option value={100000}>Below ₹1.0 Lakh</option>
            <option value={250000}>₹1.0 Lakh – ₹2.5 Lakh</option>
            <option value={500000}>₹2.5 Lakh – ₹5.0 Lakh</option>
            <option value={800000}>₹5.0 Lakh – ₹8.0 Lakh</option>
            <option value={1200000}>Above ₹8.0 Lakh</option>
          </select>
        </div>
      </div>
    </div>
  );
}
