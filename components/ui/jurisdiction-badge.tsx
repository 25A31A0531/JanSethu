'use client';

import React from 'react';
import { MapPin, Globe2, Building2, ShieldCheck, AlertCircle } from 'lucide-react';
import { JurisdictionLevel, SchemeStatus } from '@/lib/types';

interface JurisdictionBadgeProps {
  level: JurisdictionLevel;
  states?: string[];
  status?: SchemeStatus;
}

export function JurisdictionBadge({ level, states = [], status = 'ACTIVE' }: JurisdictionBadgeProps) {
  const getLevelStyle = () => {
    switch (level) {
      case 'CENTRAL':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'STATE':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'DISTRICT':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getStatusStyle = () => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'HISTORICAL':
      case 'REPLACED':
        return 'bg-amber-50 text-amber-800 border-amber-300';
      case 'DISCONTINUED':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  return (
    <div className="inline-flex items-center gap-1.5 flex-wrap">
      <span
        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${getLevelStyle()}`}
      >
        {level === 'CENTRAL' ? (
          <Globe2 className="w-3 h-3" />
        ) : (
          <MapPin className="w-3 h-3" />
        )}
        <span>
          {level === 'CENTRAL'
            ? 'Central Government'
            : states.includes('ALL')
            ? 'Nationwide State Framework'
            : states.join(', ')}
        </span>
      </span>

      {status !== 'ACTIVE' && (
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${getStatusStyle()}`}
        >
          <AlertCircle className="w-3 h-3" />
          <span>{status}</span>
        </span>
      )}
    </div>
  );
}
