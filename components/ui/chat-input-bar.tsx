'use client';

import React from 'react';
import { Send } from 'lucide-react';
import { FamilyRelationship } from '@/lib/types';
import { FamilyContextSelector } from './family-context';
import { VoiceInput } from './voice-input';
import { useLanguage } from '@/components/LanguageProvider';

interface ChatInputBarProps {
  inputText: string;
  setInputText: (v: string) => void;
  isProcessing: boolean;
  activePerson: FamilyRelationship;
  onFamilyChange: (person: FamilyRelationship) => void;
  onSend: (text?: string) => void;
}

export function ChatInputBar({
  inputText, setInputText, isProcessing, activePerson, onFamilyChange, onSend,
}: ChatInputBarProps) {
  const { t } = useLanguage();

  return (
    <div className="p-4 border-t border-slate-200 bg-white space-y-3">
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1">
        <FamilyContextSelector activePerson={activePerson} onChange={onFamilyChange} />
      </div>
      <form onSubmit={(e) => { e.preventDefault(); onSend(); }} className="flex items-center gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={t.ask.placeholder}
            disabled={isProcessing}
            className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-xs sm:text-sm font-medium focus:bg-white focus:border-indigo-600 focus:outline-none transition"
          />
        </div>
        <VoiceInput onTranscript={(spoken) => onSend(spoken)} />
        <button
          type="submit"
          disabled={!inputText.trim() || isProcessing}
          className="p-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold disabled:opacity-50 transition shadow-sm"
          aria-label="Send message"
        >
          <Send className="w-4 h-4 text-amber-400" />
        </button>
      </form>
    </div>
  );
}
