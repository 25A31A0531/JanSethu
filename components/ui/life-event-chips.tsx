'use client';

import React from 'react';
import { Lightbulb } from 'lucide-react';
import { EXAMPLE_CHIPS } from './life-event-examples';

interface LifeEventChipsProps {
  onSelect: (query: string) => void;
  disabled?: boolean;
}

export function LifeEventChips({ onSelect, disabled = false }: LifeEventChipsProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 pl-1">
        <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
        <span>Quick Example Situations:</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {EXAMPLE_CHIPS.map((chip, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onSelect(chip.query)}
            disabled={disabled}
            className="text-xs font-medium px-3 py-1.5 rounded-full bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 text-slate-700 hover:text-indigo-900 transition shadow-xs"
          >
            {chip.label}
          </button>
        ))}
      </div>
    </div>
  );
}
