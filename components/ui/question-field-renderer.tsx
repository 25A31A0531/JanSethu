'use client';

import React from 'react';
import { CheckCircle } from 'lucide-react';
import { ClarificationQuestion } from '@/lib/types';

interface QuestionFieldRendererProps {
  question: ClarificationQuestion;
  currentValue: any;
  inputValue: any;
  onChange: (field: string, val: any) => void;
}

export function QuestionFieldRenderer({
  question, currentValue, inputValue, onChange,
}: QuestionFieldRendererProps) {
  if (question.type === 'select' && question.options) {
    return (
      <div className="grid grid-cols-1 gap-2.5">
        {question.options.map((opt) => {
          const isSelected = currentValue === opt.value;
          return (
            <button
              key={String(opt.value)}
              type="button"
              onClick={() => onChange(String(question.field), opt.value)}
              className={`w-full p-4 rounded-xl border text-left transition flex items-center justify-between ${
                isSelected
                  ? 'bg-indigo-50/70 border-indigo-600 text-indigo-950 font-semibold shadow-xs ring-1 ring-indigo-600'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              <div>
                <span className="text-sm block">{opt.label}</span>
                {opt.subtext && <span className="text-xs text-slate-500 block mt-0.5 font-normal">{opt.subtext}</span>}
              </div>
              {isSelected && <CheckCircle className="w-5 h-5 text-indigo-600 shrink-0" />}
            </button>
          );
        })}
      </div>
    );
  }

  if (question.type === 'radio' && question.options) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {question.options.map((opt) => {
          const isSelected = currentValue === opt.value;
          return (
            <button
              key={String(opt.value)}
              type="button"
              onClick={() => onChange(String(question.field), opt.value)}
              className={`p-4 rounded-xl border text-left transition flex items-center justify-between ${
                isSelected
                  ? 'bg-indigo-50 border-indigo-600 text-indigo-900 font-semibold ring-1 ring-indigo-600'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span className="text-sm">{opt.label}</span>
              {isSelected && <CheckCircle className="w-4 h-4 text-indigo-600 shrink-0" />}
            </button>
          );
        })}
      </div>
    );
  }

  if (question.type === 'number') {
    return (
      <input
        type="number"
        min={question.min || 0}
        max={question.max || 100}
        value={inputValue}
        onChange={(e) => onChange(String(question.field), Number(e.target.value))}
        className="w-full p-4 text-lg font-semibold bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-indigo-600 focus:outline-none transition"
        placeholder={question.placeholder || 'Enter number'}
        required
      />
    );
  }

  return (
    <input
      type="text"
      value={inputValue}
      onChange={(e) => onChange(String(question.field), e.target.value)}
      className="w-full p-4 text-sm font-medium bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-indigo-600 focus:outline-none transition"
      placeholder={question.placeholder || 'Enter response'}
      required
    />
  );
}
