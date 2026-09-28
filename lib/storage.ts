import { DocumentRequirement, CitizenProfile, FamilyMember, Journey } from './types';
import { DOCUMENT_TYPES } from './demoData';
import { SupportedLanguage } from './i18n';

const STORAGE_KEYS = {
  JOURNEYS: 'jansetu_saved_journeys', ACTIVE_JOURNEY: 'jansetu_active_journey',
  DOCUMENTS: 'jansetu_user_documents', LANGUAGE: 'jansetu_selected_lang',
  PROFILE: 'jansetu_citizen_profile', FAMILY: 'jansetu_family_members', DEBUG_MODE: 'jansetu_debug_mode',
};
const isClient = () => typeof window !== 'undefined';
export const DEFAULT_CITIZEN_PROFILE: CitizenProfile = {
  name: 'Citizen (Demo Profile)', age: 25, residenceState: 'Andhra Pradesh',
  residenceDistrict: 'Visakhapatnam', studyState: 'Andhra Pradesh', employmentState: 'Andhra Pradesh',
  propertyState: 'Andhra Pradesh', agricultureState: 'Andhra Pradesh', businessState: 'Andhra Pradesh',
  ruralUrban: 'urban', annualIncome: 250000, socialCategory: 'OBC', isStudent: true,
  hasBankLinkedAadhaar: true, debugMode: false,
};

export function getCitizenProfile(): CitizenProfile { try { return isClient() ? JSON.parse(localStorage.getItem(STORAGE_KEYS.PROFILE) || 'null') || DEFAULT_CITIZEN_PROFILE : DEFAULT_CITIZEN_PROFILE; } catch { return DEFAULT_CITIZEN_PROFILE; } }
export function saveCitizenProfile(profile: CitizenProfile) { try { if (isClient()) localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile)); } catch { console.error('Failed to save profile'); } }
export function getFamilyMembers(): FamilyMember[] { try { return isClient() ? JSON.parse(localStorage.getItem(STORAGE_KEYS.FAMILY) || '[]') : []; } catch { return []; } }
export function saveFamilyMembers(members: FamilyMember[]) { try { if (isClient()) localStorage.setItem(STORAGE_KEYS.FAMILY, JSON.stringify(members)); } catch { console.error('Failed to save family members'); } }
export function getDebugMode(): boolean { try { return isClient() && localStorage.getItem(STORAGE_KEYS.DEBUG_MODE) === 'true'; } catch { return false; } }
export function setDebugMode(enabled: boolean) { try { if (isClient()) localStorage.setItem(STORAGE_KEYS.DEBUG_MODE, String(enabled)); } catch { console.error('Failed to set debug mode'); } }
export function getSavedJourneys(): Journey[] { try { return isClient() ? JSON.parse(localStorage.getItem(STORAGE_KEYS.JOURNEYS) || '[]') : []; } catch { return []; } }
export function saveJourneyToStorage(journey: Journey) { try { if (!isClient()) return; const journeys = getSavedJourneys(); const index = journeys.findIndex((item) => item.id === journey.id); if (index >= 0) journeys[index] = journey; else journeys.unshift(journey); localStorage.setItem(STORAGE_KEYS.JOURNEYS, JSON.stringify(journeys)); localStorage.setItem(STORAGE_KEYS.ACTIVE_JOURNEY, JSON.stringify(journey)); } catch { console.error('Failed to save journey to storage'); } }
export function getActiveJourney(): Journey | null { try { return isClient() ? JSON.parse(localStorage.getItem(STORAGE_KEYS.ACTIVE_JOURNEY) || 'null') : null; } catch { return null; } }
export function getJourneyById(id: string): Journey | null { const saved = getSavedJourneys().find((item) => item.id === id); const active = getActiveJourney(); return saved || (active?.id === id ? active : null); }
export function getUserDocuments(): DocumentRequirement[] { try { if (!isClient()) return DOCUMENT_TYPES; const saved = localStorage.getItem(STORAGE_KEYS.DOCUMENTS); if (saved) return JSON.parse(saved); localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(DOCUMENT_TYPES)); return DOCUMENT_TYPES; } catch { return DOCUMENT_TYPES; } }
export function updateUserDocument(document: DocumentRequirement): DocumentRequirement[] { try { if (!isClient()) return DOCUMENT_TYPES; const documents = getUserDocuments(); const index = documents.findIndex((item) => item.id === document.id); if (index >= 0) documents[index] = document; else documents.push(document); localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(documents)); return documents; } catch { return DOCUMENT_TYPES; } }
export function getSavedLanguage(): SupportedLanguage { try { const value = isClient() ? localStorage.getItem(STORAGE_KEYS.LANGUAGE) : null; return ['en', 'te', 'hi', 'ta', 'kn', 'ml', 'mr', 'bn', 'gu', 'pa', 'as', 'od', 'ur'].includes(value || '') ? value as SupportedLanguage : 'en'; } catch { return 'en'; } }
export function saveLanguage(language: SupportedLanguage) { try { if (isClient()) localStorage.setItem(STORAGE_KEYS.LANGUAGE, language); } catch { console.error('Failed to save language'); } }
