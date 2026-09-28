import { en, te, hi, ta, kn, ml, mr, bn, gu, pa, od, as, ur } from './languagePacks';
export type SupportedLanguage =
  | 'en' | 'te' | 'hi' | 'ta' | 'kn' | 'ml' | 'mr' | 'bn' | 'gu' | 'pa' | 'od' | 'as' | 'ur';

export { detectLanguage } from './detect';
export { translateContent } from './translate';

export const dictionaries: Record<SupportedLanguage, typeof en> = {
  en, te, hi, ta, kn, ml, mr, bn, gu, pa, od, as, ur,
};

export const LANGUAGE_OPTIONS: { code: SupportedLanguage; label: string; nativeName: string }[] = [
  { code: 'en', label: 'English', nativeName: 'English' },
  { code: 'te', label: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'hi', label: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'ta', label: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'kn', label: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'ml', label: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'mr', label: 'Marathi', nativeName: 'मराठी' },
  { code: 'bn', label: 'Bengali', nativeName: 'বাংলা' },
  { code: 'gu', label: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'pa', label: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
  { code: 'od', label: 'Odia', nativeName: 'ଓଡ଼ିଆ' },
  { code: 'as', label: 'Assamese', nativeName: 'অসমীয়া' },
  { code: 'ur', label: 'Urdu', nativeName: 'اردو' },
];
