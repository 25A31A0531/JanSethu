'use client';

import { useState, useEffect, useRef } from 'react';
import { getVoiceLangSpeechCode } from '@/lib/voiceHelpers';

export function useVoiceRecognition(
  language: string,
  onTranscript: (text: string) => void
) {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);
  const errorTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showError = (message: string) => {
    if (errorTimerRef.current) clearTimeout(errorTimerRef.current);
    setErrorMessage(message);
    errorTimerRef.current = setTimeout(() => setErrorMessage(null), 6000);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SR) setIsSupported(false);
    }
  }, []);

  useEffect(() => () => {
    if (errorTimerRef.current) clearTimeout(errorTimerRef.current);
    recognitionRef.current?.abort?.();
  }, []);

  const toggleListening = () => {
    if (!isSupported) { showError("Voice input isn't available in this browser. You can type instead."); return; }
    if (isListening) { recognitionRef.current?.stop(); setIsListening(false); return; }

    try {
      const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const rec = new SR();
      recognitionRef.current = rec;
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = getVoiceLangSpeechCode(language);

      rec.onstart = () => { setIsListening(true); if (errorTimerRef.current) clearTimeout(errorTimerRef.current); setErrorMessage(null); };
      rec.onresult = (e: any) => {
        const transcript = e.results[0][0].transcript;
        if (transcript) { onTranscript(transcript); }
        setIsListening(false);
      };
      rec.onerror = (e: any) => {
        if (e.error === 'aborted') return;
        showError(e.error === 'not-allowed' ? 'Microphone access is blocked.' : e.error === 'no-speech' ? 'No speech was detected.' : 'Voice recognition error. Please type your request.');
        setIsListening(false);
      };
      rec.onend = () => { recognitionRef.current = null; setIsListening(false); };
      rec.start();
    } catch {
      setIsListening(false);
      showError("Voice input isn't available in this browser. You can type instead.");
    }
  };

  return { isListening, isSupported, errorMessage, toggleListening };
}
