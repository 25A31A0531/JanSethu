'use client';

import React from 'react';
import { User, Users, ChevronRight, Check } from 'lucide-react';
import { FamilyRelationship } from '@/lib/types';
import { useLanguage } from '@/components/LanguageProvider';

interface FamilyContextSelectorProps {
  activePerson: FamilyRelationship;
  onChange: (person: FamilyRelationship) => void;
  className?: string;
}

export function FamilyContextSelector({
  activePerson,
  onChange,
  className = '',
}: FamilyContextSelectorProps) {
  const { t } = useLanguage();

  const options: { id: FamilyRelationship; label: string }[] = [
    { id: 'Self', label: t.ask.self },
    { id: 'Father', label: t.ask.father },
    { id: 'Mother', label: t.ask.mother },
    { id: 'Daughter', label: t.ask.daughter },
    { id: 'Son', label: t.ask.son },
    { id: 'Spouse', label: t.ask.spouse },
    { id: 'Other Dependent', label: t.ask.other },
  ];

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
        <Users className="w-3.5 h-3.5 text-indigo-600" />
        <span>{t.ask.switchPerson}</span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => {
          const isSelected = activePerson === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onChange(opt.id)}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                isSelected
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
              }`}
            >
              {isSelected && <Check className="w-3 h-3 text-amber-400" />}
              <span>{opt.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
