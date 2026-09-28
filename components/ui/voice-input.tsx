'use client';

import React from 'react';
import { Mic, MicOff, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import { useVoiceRecognition } from './use-voice-recognition';

interface VoiceInputProps {
  onTranscript: (text: string) => void;
  className?: string;
}

export function VoiceInput({ onTranscript, className = '' }: VoiceInputProps) {
  const { language, t } = useLanguage();
  const {
    isListening, isSupported, errorMessage, toggleListening,
  } = useVoiceRecognition(language, onTranscript);

  return (
    <div className="relative inline-flex items-center">
      <button
        type="button"
        onClick={toggleListening}
        className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition ${
          isListening
            ? 'bg-rose-500 text-white animate-pulse shadow-md ring-2 ring-rose-200'
            : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
        } ${className}`}
        title="Speak to JANSETU (Web Speech)"
        aria-label="Speak to JANSETU"
      >
        {isListening ? (
          <><MicOff className="w-4 h-4" /><span>Listening...</span></>
        ) : (
          <><Mic className="w-4 h-4 text-indigo-600" /><span>🎙️ {t.ask.speakBtn}</span></>
        )}
      </button>

      {errorMessage && (
        <div className="absolute left-0 bottom-full mb-2 w-64 p-2 bg-slate-900 text-white text-[11px] rounded-lg shadow-xl flex items-start gap-1.5 z-50 animate-in fade-in">
          <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
}
