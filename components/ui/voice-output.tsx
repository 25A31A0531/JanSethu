'use client';

import React, { useState, useEffect } from 'react';
import { Volume2, Pause, Play, Square } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import { getVoiceLanguageCode, cleanTextForSpeech } from '@/lib/voiceHelpers';

interface VoiceOutputProps {
  text: string;
  className?: string;
}

export function VoiceOutput({ text, className = '' }: VoiceOutputProps) {
  const { language, t } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleSpeak = () => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(cleanTextForSpeech(text));
    utterance.lang = getVoiceLanguageCode(language);
    utterance.rate = 0.95;
    utterance.onstart = () => { setIsPlaying(true); setIsPaused(false); };
    utterance.onend = () => { setIsPlaying(false); setIsPaused(false); };
    utterance.onerror = () => { setIsPlaying(false); setIsPaused(false); };

    window.speechSynthesis.speak(utterance);
  };

  const handlePause = () => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.pause();
    setIsPaused(true);
    setIsPlaying(false);
  };

  const handleStop = () => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  };

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      {!isPlaying && !isPaused && (
        <button
          type="button"
          onClick={handleSpeak}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition"
          title="Read Aloud"
        >
          <Volume2 className="w-3.5 h-3.5" />
          <span>🔊 {t.ask.readAloud}</span>
        </button>
      )}

      {isPlaying && (
        <div className="inline-flex items-center gap-1 bg-indigo-50 border border-indigo-200 rounded-lg p-1">
          <button type="button" onClick={handlePause} className="p-1 rounded text-indigo-700 hover:bg-indigo-100 transition" title="Pause speech">
            <Pause className="w-3.5 h-3.5" />
          </button>
          <button type="button" onClick={handleStop} className="p-1 rounded text-rose-600 hover:bg-rose-100 transition" title="Stop speech">
            <Square className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {isPaused && (
        <div className="inline-flex items-center gap-1 bg-amber-50 border border-amber-200 rounded-lg p-1">
          <button type="button" onClick={handleSpeak} className="p-1 rounded text-amber-700 hover:bg-amber-100 transition" title="Resume speech">
            <Play className="w-3.5 h-3.5" />
          </button>
          <button type="button" onClick={handleStop} className="p-1 rounded text-rose-600 hover:bg-rose-100 transition" title="Stop speech">
            <Square className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
