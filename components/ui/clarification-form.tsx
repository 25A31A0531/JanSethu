'use client';

import React, { useState } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { CitizenProfile, ClarificationQuestion, LifeEvent } from '@/lib/types';
import { useLanguage } from '@/components/LanguageProvider';
import { QuestionFieldRenderer } from './question-field-renderer';

interface ClarificationFormProps {
  lifeEvent: LifeEvent;
  questions: ClarificationQuestion[];
  initialProfile?: Partial<CitizenProfile>;
  onSubmit: (completedProfile: CitizenProfile) => void;
  isLoading?: boolean;
}

export function ClarificationForm({
  lifeEvent, questions, initialProfile = {}, onSubmit, isLoading = false,
}: ClarificationFormProps) {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [profile, setProfile] = useState<CitizenProfile>({ ...initialProfile } as CitizenProfile);

  const currentQ = questions[currentIndex];
  const totalQuestions = questions.length;
  const isLastQuestion = currentIndex === totalQuestions - 1;

  if (!currentQ) {
    return (
      <div className="text-center py-8">
        <button onClick={() => onSubmit(profile)} className="bg-slate-900 text-white px-6 py-3 rounded-xl font-semibold text-sm">
          {t.start.generateJourney}
        </button>
      </div>
    );
  }

  const currentValue = profile[currentQ.field as keyof CitizenProfile] ?? '';
  const inputValue = typeof currentValue === 'string' || typeof currentValue === 'number' ? currentValue : '';
  const hasAnswer = currentValue !== '' && currentValue !== undefined && currentValue !== null;

  return (
    <div className="max-w-xl mx-auto bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50">
      <div className="mb-6 pb-4 border-b border-slate-100 flex items-center justify-between">
        <div className="space-y-0.5">
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Step {currentIndex + 1} of {totalQuestions}</span>
          <h3 className="text-sm font-semibold text-slate-800">{lifeEvent.name}</h3>
        </div>
        <div className="flex gap-1">
          {questions.map((_, idx) => (
            <div key={idx} className={`h-2 rounded-full transition-all ${idx === currentIndex ? 'w-6 bg-indigo-600' : idx < currentIndex ? 'w-3 bg-emerald-500' : 'w-2 bg-slate-200'}`} />
          ))}
        </div>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); if (isLastQuestion) onSubmit(profile); else setCurrentIndex((prev) => prev + 1); }} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-base sm:text-lg font-bold text-slate-900 leading-snug">{currentQ.question}</label>
          {currentQ.subtext && <p className="text-xs text-slate-500 leading-relaxed">{currentQ.subtext}</p>}
        </div>

        <div className="py-2">
          <QuestionFieldRenderer question={currentQ} currentValue={currentValue} inputValue={inputValue} onChange={(field, val) => setProfile(prev => ({ ...prev, [field]: val }))} />
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => currentIndex > 0 && setCurrentIndex((prev) => prev - 1)}
            disabled={currentIndex === 0 || isLoading}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${currentIndex === 0 ? 'opacity-0 pointer-events-none' : 'text-slate-600 hover:bg-slate-100'}`}
          >
            <ArrowLeft className="w-4 h-4" /><span>{t.start.backStep}</span>
          </button>

          <button
            type="submit"
            disabled={isLoading || (currentQ.required && !hasAnswer)}
            className="px-6 py-3 rounded-xl text-sm font-bold bg-slate-900 hover:bg-slate-800 text-white shadow-md flex items-center gap-2 transition disabled:opacity-50"
          >
            <span>{isLastQuestion ? t.start.generateJourney : t.start.nextStep}</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </button>
        </div>
      </form>
    </div>
  );
}
