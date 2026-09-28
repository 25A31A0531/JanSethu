'use client';

import { useState, useEffect, useRef } from 'react';
import { CitizenProfile, FamilyRelationship, ChatMessage, Recommendation, ExclusionReason, LifeEvent } from '@/lib/types';
import { classifyLifeEvent, findRelevantServices, generateActionPlan } from '@/lib/rulesEngine';
import { getCitizenProfile, saveCitizenProfile, getDebugMode } from '@/lib/storage';
import { LIFE_EVENTS, DOCUMENT_TYPES } from '@/lib/demoData';
import { SupportedLanguage } from '@/lib/i18n';
import { detectQueryLanguage } from '@/lib/i18n/detect';
import {
  getGreetingResponse, getClarificationFallback, getNoServiceMatchFallback,
  getRoadmapIntroText, localizeLifeEventName, localizeRelationship,
  localizeNextStep, localizeMatchReason, localizeDocumentName, formatAppliesToContext,
} from '@/lib/i18n/chatResponses';

const WELCOME_MESSAGES: Record<SupportedLanguage, string> = {
  en: 'Namaste! I am JANSETU, your citizen government-service navigator. Describe any life situation or event and I will provide a personalized, jurisdiction-aware roadmap grounded in official public records.',
  te: 'నమస్తే! నేను జనసేతు. మీ పరిస్థితిని వివరించండి; సంబంధిత ప్రభుత్వ సేవలు మరియు తదుపరి చర్యలను సూచిస్తాను.',
  hi: 'नमस्ते! मैं जनसेतु हूँ। अपनी स्थिति बताइए; मैं संबंधित सरकारी सेवाएं और अगले कदम सुझाऊंगा।',
  ta: 'வணக்கம்! நான் ஜனசேது. உங்கள் நிலையை விளக்குங்கள்; தொடர்புடைய அரசு சேவைகள் மற்றும் அடுத்த படிகளைச் சொல்கிறேன்.',
  kn: 'ನಮಸ್ಕಾರ! ನಾನು ಜನಸೇತು. ನಿಮ್ಮ ಪರಿಸ್ಥಿತಿಯನ್ನು ವಿವರಿಸಿ; ಸಂಬಂಧಿತ ಸರ್ಕಾರಿ ಸೇವೆಗಳು ಮತ್ತು ಮುಂದಿನ ಹಂತಗಳನ್ನು ತಿಳಿಸುತ್ತೇನೆ.',
  ml: 'നമസ്കാരം! ഞാൻ ജനസേതു. നിങ്ങളുടെ സാഹചര്യം വിവരിക്കുക; ബന്ധപ്പെട്ട സർക്കാർ സേവനങ്ങളും അടുത്ത ഘട്ടങ്ങളും നിർദേശിക്കാം.',
  mr: 'नमस्कार! मी जनसेतू आहे. तुमची परिस्थिती सांगा; संबंधित सरकारी सेवा आणि पुढील पावले सुचवेन.',
  bn: 'নমস্কার! আমি জনসেতু। আপনার পরিস্থিতি বলুন; প্রাসঙ্গিক সরকারি পরিষেবা ও পরবর্তী পদক্ষেপ জানাব।',
  gu: 'નમસ્તે! હું જનસેતુ છું. તમારી પરિસ્થિતિ જણાવો; સંબંધિત સરકારી સેવાઓ અને આગળનાં પગલાં જણાવીશ.',
  pa: 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਜਨਸੇਤੁ ਹਾਂ। ਆਪਣੀ ਸਥਿਤੀ ਦੱਸੋ; ਮੈਂ ਸੰਬੰਧਿਤ ਸਰਕਾਰੀ ਸੇਵਾਵਾਂ ਅਤੇ ਅਗਲੇ ਕਦਮ ਦੱਸਾਂਗਾ।',
  od: 'ନମସ୍କାର! ମୁଁ ଜନସେତୁ। ଆପଣଙ୍କ ସ୍ଥିତି କୁହନ୍ତୁ; ସମ୍ପର୍କିତ ସରକାରୀ ସେବା ଓ ପରବର୍ତ୍ତୀ ପଦକ୍ଷେପ ଜଣାଇବି।',
  as: 'নমস্কাৰ! মই জনসেতু। আপোনাৰ পৰিস্থিতি কওক; প্ৰাসংগিক চৰকাৰী সেৱা আৰু পৰৱৰ্তী পদক্ষেপ জনাম।',
  ur: 'نمستے! میں جن سیتو ہوں۔ اپنی صورتحال بتائیں؛ میں متعلقہ سرکاری خدمات اور اگلے مراحل بتاؤں گا۔',
};

export function useChatbotLogic(language: SupportedLanguage) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [profile, setProfile] = useState<CitizenProfile>(getCitizenProfile());
  const [activePerson, setActivePerson] = useState<FamilyRelationship>('Self');
  const [currentLifeEvent, setCurrentLifeEvent] = useState<LifeEvent | null>(null);
  const [matchedRecs, setMatchedRecs] = useState<Recommendation[]>([]);
  const [excludedList, setExcludedList] = useState<ExclusionReason[]>([]);
  const [debugMode] = useState(getDebugMode());
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setProfile(getCitizenProfile());
    setMessages((prev) => {
      const hasUserMessage = prev.some((m) => m.sender === 'user');
      if (!hasUserMessage) {
        return [{
          id: 'welcome', sender: 'assistant',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: WELCOME_MESSAGES[language] || WELCOME_MESSAGES.en,
          responseLanguage: language,
        }];
      }
      return prev;
    });
  }, [language]);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const handleFamilyChange = (person: FamilyRelationship) => {
    setActivePerson(person);
    setProfile((prev) => { const u = { ...prev, activeContextPerson: person }; saveCitizenProfile(u); return u; });
  };

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query || isProcessing) return;

    const { language: detectedLang, isConfident } = detectQueryLanguage(query, language);
    const responseLanguage: SupportedLanguage = isConfident ? detectedLang : (language || 'en');

    setMessages((prev) => [...prev, {
      id: `user-${Date.now()}`,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: query,
      responseLanguage,
    }]);
    setInputText('');
    setIsProcessing(true);

    if (/^(hi|hello|hey|namaste|namaskar|నమస్తే|నమస్కారం|నమస్కారము|नमस्ते|नमस्कार)[!,.\s]*$/iu.test(query)) {
      setTimeout(() => {
        setMessages((prev) => [...prev, {
          id: `bot-${Date.now()}`,
          sender: 'assistant',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: getGreetingResponse(responseLanguage),
          responseLanguage,
        }]);
        setIsProcessing(false);
      }, 300);
      return;
    }

    setTimeout(() => {
      const classification = classifyLifeEvent(query);
      if (classification.requiresClarification || classification.primaryIntent === 'other' || !classification.primaryIntent) {
        setMessages((prev) => [...prev, {
          id: `bot-${Date.now()}`,
          sender: 'assistant',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: getClarificationFallback(responseLanguage, classification.clarificationPrompt),
          responseLanguage,
        }]);
        setIsProcessing(false);
        return;
      }
      const matchedEvent = LIFE_EVENTS.find((e) => e.id === classification.primaryIntent);
      if (!matchedEvent) {
        setMessages((prev) => [...prev, {
          id: `bot-${Date.now()}`,
          sender: 'assistant',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: getNoServiceMatchFallback(responseLanguage),
          responseLanguage,
        }]);
        setIsProcessing(false);
        return;
      }
      setCurrentLifeEvent(matchedEvent);
      const effectiveProfile: CitizenProfile = { ...profile, ...(classification.extractedContext || {}) };
      const { recommendations, excludedServices } = findRelevantServices(effectiveProfile, matchedEvent, query);
      setMatchedRecs(recommendations);
      setExcludedList(excludedServices);

      if (recommendations.length === 0) {
        setMessages((prev) => [...prev, {
          id: `bot-${Date.now()}`,
          sender: 'assistant',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: getNoServiceMatchFallback(responseLanguage),
          responseLanguage,
        }]);
        setIsProcessing(false);
        return;
      }

      const steps = generateActionPlan(effectiveProfile, recommendations.map((r) => r.service));
      const topRec = recommendations[0];
      const localizedEventName = localizeLifeEventName(matchedEvent.category || matchedEvent.id, responseLanguage) || matchedEvent.name;
      const localizedPerson = localizeRelationship(activePerson, responseLanguage);

      const introText = getRoadmapIntroText(responseLanguage, localizedEventName, localizedPerson);
      const localizedSteps = steps.slice(0, 4).map((s) => localizeNextStep(s.stepNumber, s.title, responseLanguage, topRec?.service.name));
      const localizedWhy = topRec?.matchReasons ? topRec.matchReasons.map((r) => localizeMatchReason(r, responseLanguage)) : [localizeMatchReason('Matches citizen criteria.', responseLanguage)];
      const localizedDocs = topRec?.service.requiredDocuments.map((d) => {
        const docObj = DOCUMENT_TYPES.find((doc) => doc.id === d);
        return localizeDocumentName(docObj?.name || d, responseLanguage);
      }) || ['Aadhaar Card'];

      setMessages((prev) => [...prev, {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: introText,
        responseLanguage,
        structuredResponse: {
          understood: `${classification.reason} (Primary: ${classification.primaryIntent})`,
          appliesTo: formatAppliesToContext(
            localizedPerson,
            topRec?.jurisdictionBasis,
            topRec?.matchedLocationState,
            effectiveProfile.residenceState,
            responseLanguage
          ),
          schemes: recommendations.slice(0, 3),
          why: localizedWhy,
          documentsNeeded: localizedDocs,
          nextSteps: localizedSteps,
          officialSource: topRec?.service.sourceAuthority || 'National Government Portal',
          disclaimer: 'JANSETU is an independent prototype.',
          responseLanguage,
        },
      }]);
      setIsProcessing(false);
    }, 1000);
  };

  return {
    messages, inputText, setInputText, isProcessing, profile, activePerson,
    currentLifeEvent, matchedRecs, excludedList, debugMode, messagesEndRef,
    handleFamilyChange, handleSendMessage,
  };
}
