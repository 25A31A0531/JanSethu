import type { SupportedLanguage } from './index';

export interface DetectedLanguageResult {
  language: SupportedLanguage;
  isConfident: boolean;
}

/**
 * Detect language of query with confidence rating and fallback support
 */
export function detectQueryLanguage(
  text: string,
  fallbackUiLanguage: SupportedLanguage = 'en'
): DetectedLanguageResult {
  if (!text) return { language: fallbackUiLanguage || 'en', isConfident: false };
  const clean = text.trim();

  // 1. Script regex tests (100% confident native script matches)
  if (/[\u0C00-\u0C7F]/.test(clean)) return { language: 'te', isConfident: true };
  if (/[\u0900-\u097F]/.test(clean)) {
    if (/आहे|नाही|माझे|करा|झाले|पाहिजे|योजना/.test(clean)) return { language: 'mr', isConfident: true };
    return { language: 'hi', isConfident: true };
  }
  if (/[\u0B80-\u0BFF]/.test(clean)) return { language: 'ta', isConfident: true };
  if (/[\u0C80-\u0CFF]/.test(clean)) return { language: 'kn', isConfident: true };
  if (/[\u0D00-\u0D7F]/.test(clean)) return { language: 'ml', isConfident: true };
  if (/[\u0980-\u09FF]/.test(clean)) {
    if (/ৰ|ৱ/.test(clean)) return { language: 'as', isConfident: true };
    return { language: 'bn', isConfident: true };
  }
  if (/[\u0A80-\u0AFF]/.test(clean)) return { language: 'gu', isConfident: true };
  if (/[\u0A00-\u0A7F]/.test(clean)) return { language: 'pa', isConfident: true };
  if (/[\u0B00-\u0B7F]/.test(clean)) return { language: 'od', isConfident: true };
  if (/[\u0600-\u06FF]/.test(clean)) return { language: 'ur', isConfident: true };

  // 2. High-confidence Transliterated / Romanized phonetic checks
  const lower = clean.toLowerCase();

  // Strong Romanized Telugu markers
  const teStrongKeywords = [
    'chadukodaniki', 'chaduvukodaniki', 'kattali', 'cheyyali', 'cheyali',
    'dabbulu kavali', 'dabbu kavali', 'naaku chaduko', 'naaku dabbu', 'naa illu',
    'ela apply', 'em cheyali'
  ];
  if (teStrongKeywords.some((kw) => lower.includes(kw))) {
    return { language: 'te', isConfident: true };
  }

  // Count multi-token Telugu matches
  const teTokens = ['naaku', 'naku', 'dabbulu', 'dabbu', 'kavali', 'sahayam', 'pillalu', 'raithu', 'rythu'];
  const teTokenMatches = teTokens.filter((token) => new RegExp(`\\b${token}\\b`, 'i').test(lower)).length;
  if (teTokenMatches >= 2) {
    return { language: 'te', isConfident: true };
  }

  // Strong Romanized Hindi markers
  const hiStrongKeywords = [
    'padhai ke liye', 'paise chahiye', 'madad chahiye', 'kya karu',
    'kaise apply', 'mera ghar', 'sahayata'
  ];
  if (hiStrongKeywords.some((kw) => lower.includes(kw))) {
    return { language: 'hi', isConfident: true };
  }

  // Count multi-token Hindi matches
  const hiTokens = ['mujhe', 'padhai', 'paise', 'chahiye', 'madad', 'kisan', 'kheti'];
  const hiTokenMatches = hiTokens.filter((token) => new RegExp(`\\b${token}\\b`, 'i').test(lower)).length;
  if (hiTokenMatches >= 2) {
    return { language: 'hi', isConfident: true };
  }

  // Strong Romanized Tamil markers
  const taStrongKeywords = ['udavi vendum', 'panam vendum', 'enathu veedu', 'eppadi apply'];
  if (taStrongKeywords.some((kw) => lower.includes(kw))) {
    return { language: 'ta', isConfident: true };
  }
  const taTokens = ['enakku', 'padikira', 'panam', 'udavi', 'vendum', 'thevai'];
  const taTokenMatches = taTokens.filter((token) => new RegExp(`\\b${token}\\b`, 'i').test(lower)).length;
  if (taTokenMatches >= 2) {
    return { language: 'ta', isConfident: true };
  }

  // 3. Ambiguous Romanized queries (single isolated particle with English vocabulary)
  if (teTokenMatches === 1 || hiTokenMatches === 1 || taTokenMatches === 1) {
    return { language: fallbackUiLanguage, isConfident: false };
  }

  // 4. Pure English checks
  const commonEnglishWords = /\b(i|my|we|our|you|the|a|an|is|are|was|were|need|want|have|has|for|in|on|at|to|from|by|with|and|or|of|money|crops|crop|damaged|house|floods|flood|cyclone|loan|scholarship|higher|studies|study|college|business|fees|education)\b/i;
  if (commonEnglishWords.test(lower)) {
    return { language: 'en', isConfident: true };
  }

  return { language: fallbackUiLanguage || 'en', isConfident: false };
}

/**
 * Auto-detect language script or transliterated keywords (backwards-compatible)
 */
export function detectLanguage(text: string): SupportedLanguage {
  return detectQueryLanguage(text).language;
}
