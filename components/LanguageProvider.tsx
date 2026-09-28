'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { SupportedLanguage, dictionaries, detectLanguage } from '@/lib/i18n';
import { getSavedLanguage, saveLanguage } from '@/lib/storage';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: typeof dictionaries.en;
  autoDetectAndSetLanguage: (text: string) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: dictionaries.en,
  autoDetectAndSetLanguage: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<SupportedLanguage>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setLanguageState(getSavedLanguage());
    setMounted(true);
  }, []);

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    saveLanguage(lang);
  };

  const autoDetectAndSetLanguage = (text: string) => {
    const detected = detectLanguage(text);
    if (detected !== language) {
      setLanguage(detected);
    }
  };

  const t = dictionaries[language] || dictionaries.en;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, autoDetectAndSetLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
