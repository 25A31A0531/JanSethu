'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Loader2, MessageSquare } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import { VoiceInput } from './voice-input';
import { ROTATING_EXAMPLES } from './life-event-examples';
import { LifeEventChips } from './life-event-chips';

interface LifeEventInputProps {
  onSubmit: (input: string) => void;
  isAnalyzing?: boolean;
  initialValue?: string;
}

export function LifeEventInput({ onSubmit, isAnalyzing = false, initialValue = '' }: LifeEventInputProps) {
  const { t } = useLanguage();
  const [input, setInput] = useState(initialValue);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % ROTATING_EXAMPLES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isAnalyzing) return;
    onSubmit(input.trim());
  };

  const handleChipClick = (query: string) => {
    setInput(query);
    onSubmit(query);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      <form onSubmit={handleSubmit} className="relative">
        <div className="bg-white border-2 border-slate-300 focus-within:border-indigo-600 focus-within:ring-4 focus-within:ring-indigo-100 rounded-3xl p-4 sm:p-5 shadow-xl shadow-slate-200/50 transition-all">
          <div className="flex items-center justify-between gap-2 text-xs font-semibold text-slate-400 mb-2">
            <div className="flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-indigo-600" />
              <span>Describe your situation in everyday language</span>
            </div>
            <VoiceInput onTranscript={(spoken) => { setInput(spoken); onSubmit(spoken); }} />
          </div>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isAnalyzing}
            rows={3}
            className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 text-sm sm:text-base font-normal leading-relaxed resize-none focus:outline-none"
            placeholder={ROTATING_EXAMPLES[placeholderIndex]}
            aria-label="Describe your situation"
          />

          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 mt-2">
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Supports 13 Indian languages. You can also type Romanized Telugu or Hindi in English letters.</span>
            </div>

            <button
              type="submit"
              disabled={!input.trim() || isAnalyzing}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition-all"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                  <span>Analyzing Life Event...</span>
                </>
              ) : (
                <>
                  <span>{t.start.buildPlanCTA}</span>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      <LifeEventChips onSelect={handleChipClick} disabled={isAnalyzing} />
    </div>
  );
}
