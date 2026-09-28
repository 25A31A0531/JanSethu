export const VOICE_LANGUAGES = [
  { code: 'en', label: 'English', speechCode: 'en-IN' },
  { code: 'te', label: 'తెలుగు', speechCode: 'te-IN' },
  { code: 'hi', label: 'हिन्दी', speechCode: 'hi-IN' },
  { code: 'ta', label: 'தமிழ்', speechCode: 'ta-IN' },
  { code: 'kn', label: 'ಕನ್ನಡ', speechCode: 'kn-IN' },
  { code: 'ml', label: 'മലയാളം', speechCode: 'ml-IN' },
  { code: 'mr', label: 'मराठी', speechCode: 'mr-IN' },
  { code: 'bn', label: 'বাংলা', speechCode: 'bn-IN' },
  { code: 'gu', label: 'ગુજરાતી', speechCode: 'gu-IN' },
  { code: 'pa', label: 'ਪੰਜਾਬੀ', speechCode: 'pa-IN' },
  { code: 'od', label: 'ଓଡ଼ିଆ', speechCode: 'or-IN' },
  { code: 'as', label: 'অসমীয়া', speechCode: 'as-IN' },
  { code: 'ur', label: 'اردو', speechCode: 'ur-IN' },
];

export function getVoiceLangSpeechCode(code: string): string {
  const item = VOICE_LANGUAGES.find((l) => l.code === code);
  return item ? item.speechCode : 'en-IN';
}


import { SupportedLanguage } from '@/lib/i18n';

export function getVoiceLanguageCode(language: SupportedLanguage | string): string {
  switch (language) {
    case 'te': return 'te-IN';
    case 'hi': return 'hi-IN';
    case 'ta': return 'ta-IN';
    case 'kn': return 'kn-IN';
    case 'ml': return 'ml-IN';
    case 'mr': return 'mr-IN';
    case 'bn': return 'bn-IN';
    case 'gu': return 'gu-IN';
    case 'pa': return 'pa-IN';
    case 'od': return 'od-IN';
    case 'as': return 'as-IN';
    case 'ur': return 'ur-IN';
    default: return 'en-IN';
  }
}

export function cleanTextForSpeech(text: string): string {
  return text.replace(/[#*_`\[\]()]/g, '').replace(/\n+/g, '. ').trim();
}
