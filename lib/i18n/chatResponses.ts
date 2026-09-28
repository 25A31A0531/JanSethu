import type { SupportedLanguage } from './index';
import type { JurisdictionBasis } from '../types';

export interface ChatLabels {
  whatIUnderstood: string;
  contextAppliedTo: string;
  verifiedServices: string;
  benefit: string;
  whyMatches: string;
  requiredDocuments: string;
  nextSteps: string;
  officialSource: string;
  step: string;
}

export const CHAT_LABELS: Record<SupportedLanguage, ChatLabels> = {
  en: {
    whatIUnderstood: 'What I Understood:',
    contextAppliedTo: 'Context Applied To:',
    verifiedServices: 'Verified Government Services',
    benefit: 'Benefit:',
    whyMatches: 'Why this matches:',
    requiredDocuments: 'Required Documents:',
    nextSteps: 'What to do next:',
    officialSource: 'Official Source:',
    step: 'Step',
  },
  te: {
    whatIUnderstood: 'నేను అర్థం చేసుకున్నది:',
    contextAppliedTo: 'వర్తించిన వివరాలు:',
    verifiedServices: 'ధృవీకరించబడిన ప్రభుత్వ సేవలు',
    benefit: 'ప్రయోజనం:',
    whyMatches: 'ఇది ఎందుకు సరిపోలుతుంది:',
    requiredDocuments: 'అవసరమైన పత్రాలు:',
    nextSteps: 'తదుపరి చేయాల్సిన చర్యలు:',
    officialSource: 'అధికారిక మూలం:',
    step: 'దశ',
  },
  hi: {
    whatIUnderstood: 'मैंने जो समझा:',
    contextAppliedTo: 'लागू संदर्भ:',
    verifiedServices: 'सत्यापित सरकारी सेवाएं',
    benefit: 'लाभ:',
    whyMatches: 'यह क्यों मेल खाता है:',
    requiredDocuments: 'आवश्यक दस्तावेज़:',
    nextSteps: 'आगे क्या करना है:',
    officialSource: 'आधिकारिक स्रोत:',
    step: 'चरण',
  },
  ta: {
    whatIUnderstood: 'நான் புரிந்து கொண்டது:',
    contextAppliedTo: 'பயன்படுத்தப்பட்ட சூழல்:',
    verifiedServices: 'சரிபார்க்கப்பட்ட அரசு சேவைகள்',
    benefit: 'பயன்:',
    whyMatches: 'இது ஏன் பொருந்துகிறது:',
    requiredDocuments: 'தேவையான ஆவணங்கள்:',
    nextSteps: 'அடுத்து என்ன செய்ய வேண்டும்:',
    officialSource: 'அதிகாரப்பூர்வ ஆதாரம்:',
    step: 'படி',
  },
  kn: {
    whatIUnderstood: 'ನಾನು ಅರ್ಥಮಾಡಿಕೊಂಡದ್ದು:',
    contextAppliedTo: 'ಅನ್ವಯಿಸಲಾದ ಸಂದರ್ಭ:',
    verifiedServices: 'ಪರಿಶೀಲಿಸಿದ ಸರ್ಕಾರಿ ಸೇವೆಗಳು',
    benefit: 'ಪ್ರಯೋಜನ:',
    whyMatches: 'ಇದು ಏಕೆ ಹೊಂದಿಕೆಯಾಗುತ್ತದೆ:',
    requiredDocuments: 'ಅಗತ್ಯ ದಾಖಲೆಗಳು:',
    nextSteps: 'ಮುಂದೆ ಏನು ಮಾಡಬೇಕು:',
    officialSource: 'ಅಧಿಕೃತ ಮೂಲ:',
    step: 'ಹಂತ',
  },
  ml: {
    whatIUnderstood: 'ഞാൻ മനസ്സിലാക്കിയത്:',
    contextAppliedTo: 'ബാധകമാക്കിയ സന്ദർഭം:',
    verifiedServices: 'സ്ഥിരീകരിച്ച സർക്കാർ സേവനങ്ങളിൽ',
    benefit: 'പ്രയോജനം:',
    whyMatches: 'ഇത് എന്തുകൊണ്ട് അനുയോജ്യമാകുന്നു:',
    requiredDocuments: 'ആവശ്യമായ രേഖകൾ:',
    nextSteps: 'അടുത്തതായി എന്തുചെയ്യണം:',
    officialSource: 'ഔദ്യോഗിക ഉറവിടം:',
    step: 'ഘട്ടം',
  },
  mr: {
    whatIUnderstood: 'मी समजून घेतलेली माहिती:',
    contextAppliedTo: 'लागू संदर्भ:',
    verifiedServices: 'सत्यापित सरकारी सेवा',
    benefit: 'लाभ:',
    whyMatches: 'हे का जुळते:',
    requiredDocuments: 'आवश्यक कागदपत्रे:',
    nextSteps: 'पुढे काय करावे:',
    officialSource: 'अधिकृत स्रोत:',
    step: 'टप्पा',
  },
  bn: {
    whatIUnderstood: 'আমি যা বুঝেছি:',
    contextAppliedTo: 'প্রযুক্ত প্রসঙ্গ:',
    verifiedServices: 'যাচাইকৃত সরকারি পরিষেবা',
    benefit: 'সুবিধা:',
    whyMatches: 'এটি কেন উপযুক্ত:',
    requiredDocuments: 'প্রয়োজনীয় নথি:',
    nextSteps: 'পরবর্তী পদক্ষেপ:',
    officialSource: 'অফিসিয়াল উৎস:',
    step: 'ধাপ',
  },
  gu: {
    whatIUnderstood: 'હું જે સમજ્યો:',
    contextAppliedTo: 'લાગુ સંદર્ભ:',
    verifiedServices: 'ચકાસાયેલ સરકારી સેવાઓ',
    benefit: 'લાભ:',
    whyMatches: 'આ કેમ મેળ ખાય છે:',
    requiredDocuments: 'જરૂરી દસ્તાવેજો:',
    nextSteps: 'આગળ શું કરવું:',
    officialSource: 'સત્તાવાર સ્ત્રોત:',
    step: 'પગલું',
  },
  pa: {
    whatIUnderstood: 'ਮੈਂ ਜੋ ਸਮਝਿਆ:',
    contextAppliedTo: 'ਲਾਗੂ ਸੰਦਰਭ:',
    verifiedServices: 'ਪ੍ਰਮਾਣਿਤ ਸਰਕਾਰੀ ਸੇਵਾਵਾਂ',
    benefit: 'ਲਾਭ:',
    whyMatches: 'ਇਹ ਕਿਉਂ ਮੇਲ ਖਾਂਦਾ ਹੈ:',
    requiredDocuments: 'ਲੋੜੀਂਦੇ ਦਸਤਾਵੇਜ਼:',
    nextSteps: 'ਅੱਗੇ ਕੀ ਕਰਨਾ ਹੈ:',
    officialSource: 'ਅਧਿਕਾਰਤ ਸਰੋਤ:',
    step: 'ਕਦਮ',
  },
  od: {
    whatIUnderstood: 'ମୁଁ ଯାହା ବୁଝିଲି:',
    contextAppliedTo: 'ପ୍ରଯୁଜ୍ୟ ପ୍ରସଙ୍ଗ:',
    verifiedServices: 'ଯାଞ୍ଚ ହୋଇଥିବା ସରକାରୀ ସେବାଗୁଡିକ',
    benefit: 'ଲାଭ:',
    whyMatches: 'ଏହା କାହିଁକି ମେଳ ଖାଉଛି:',
    requiredDocuments: 'ଆବଶ୍ୟକ ଦଲିଲ:',
    nextSteps: 'ପରବର୍ତ୍ତୀ କାର୍ଯ୍ୟାନୁଷ୍ଠାନ:',
    officialSource: 'ଅଧିକାରୀକ ଉତ୍ସ:',
    step: 'ପଦକ୍ଷେପ',
  },
  as: {
    whatIUnderstood: 'মই যি বুজিলোঁ:',
    contextAppliedTo: 'প্ৰযোজ্য প্ৰসংগ:',
    verifiedServices: 'প্ৰমাণিত চৰকাৰী সেৱাসমূহ',
    benefit: 'সুবিধা:',
    whyMatches: 'এইটো কিয় মিলিছে:',
    requiredDocuments: 'প্ৰয়োজনীয় নথি-পত্ৰ:',
    nextSteps: 'পৰৱৰ্তী পদক্ষেপ:',
    officialSource: 'চৰকাৰী উৎস:',
    step: 'পদক্ষেপ',
  },
  ur: {
    whatIUnderstood: 'جو میں سمجھا:',
    contextAppliedTo: 'لاگو سیاق و سباق:',
    verifiedServices: 'تصدیق شدہ سرکاری خدمات',
    benefit: 'فائدہ:',
    whyMatches: 'یہ کیوں مطابقت رکھتا ہے:',
    requiredDocuments: 'ضروری دستاویزات:',
    nextSteps: 'آگے کیا کرنا ہے:',
    officialSource: 'سرکاری ذریعہ:',
    step: 'مرحلہ',
  },
};

export function getChatLabels(lang: SupportedLanguage): ChatLabels {
  return CHAT_LABELS[lang] || CHAT_LABELS.en;
}

export const GREETING_RESPONSES: Record<SupportedLanguage, string> = {
  en: 'Hello! I can help you find government services and next steps. You can ask about education loans, scholarships, jobs, documents, business loans, crop loss, or disaster relief.',
  te: 'నమస్తే! ప్రభుత్వ సేవలు మరియు తదుపరి చర్యలను కనుగొనడంలో నేను మీకు సహాయపడగలను. ఉన్నత విద్య రుణాలు, స్కాలర్‌షిప్‌లు, ఉద్యోగాలు, ధృవీకరణ పత్రాలు, వ్యాపార రుణాలు, పంట నష్టం లేదా విపత్తు సహాయం గురించి మీరు అడగవచ్చు.',
  hi: 'नमस्ते! मैं सरकारी सेवाएं और अगले कदम खोजने में आपकी मदद कर सकता हूँ। आप शिक्षा ऋण, छात्रवृत्ति, नौकरी, दस्तावेज़, व्यापार ऋण, फसल नुकसान या आपदा राहत के बारे में पूछ सकते हैं।',
  ta: 'வணக்கம்! அரசு சேவைகள் மற்றும் அடுத்த கட்ட நடவடிக்கைகளைக் கண்டறிய நான் உங்களுக்கு உதவ முடியும். கல்விக்கடன், உதவித்தொகை, வேலைவாய்ப்பு, ஆவணங்கள், வணிகக் கடன், பயிர் இழப்பு அல்லது பேரிடர் நிவாரணம் பற்றி நீங்கள் கேட்கலாம்.',
  kn: 'ನಮಸ್ಕಾರ! ಸರ್ಕಾರಿ ಸೇವೆಗಳು ಮತ್ತು ಮುಂದಿನ ಹಂತಗಳನ್ನು ಹುಡುಕಲು ನಾನು ನಿಮಗೆ ಸಹಾಯ ಮಾಡಬಲ್ಲೆ. ನೀವು ವಿದ್ಯಾಭ್ಯಾಸ ಸಾಲ, ವಿದ್ಯಾರ್ಥಿವೇತನ, ಉದ್ಯೋಗ, ದಾಖಲೆಗಳು, ವ್ಯಾಪಾರ ಸಾಲ, ಬೆಳೆ ನಷ್ಟ ಅಥವಾ ವಿಪತ್ತು ಪರಿಹಾರದ ಬಗ್ಗೆ ಕೇಳಬಹುದು.',
  ml: 'നമസ്കാരം! സർക്കാർ സേവനങ്ങളും അടുത്ത ഘട്ടങ്ങളും കണ്ടെത്താൻ എന്നെ സഹായിക്കാനാകും. വിദ്യാഭ്യാസ വായ്പകൾ, സ്കോളർഷിപ്പുകൾ, തൊഴിൽ, രേഖകൾ, ബിസിനസ് വായ്പകൾ, വിളനാശം അല്ലെങ്കിൽ ദുരിതാശ്വാസം എന്നിവയെക്കുറിച്ച് നിങ്ങൾക്ക് ചോദിക്കാം.',
  mr: 'नमस्कार! मी तुम्हाला सरकारी सेवा आणि पुढील पावले शोधण्यात मदत करू शकतो. तुम्ही शैक्षणिक कर्ज, शिष्यवृत्ती, नोकरी, कागदपत्रे, व्यवसाय कर्ज, पीक नुकसान किंवा आपत्ती मदतीबद्दल विचारू शकता.',
  bn: 'নমস্কার! আমি আপনাকে সরকারি পরিষেবা এবং পরবর্তী পদক্ষেপ খুঁজে পেতে সাহায্য করতে পারি। আপনি শিক্ষা ঋণ, বৃত্তি, চাকরি, নথি, ব্যবসায়িক ঋণ, ফসলের ক্ষতি বা দুর্যোগ ত্রাণ সম্পর্কে জিজ্ঞাসা করতে পারেন।',
  gu: 'નમસ્તે! હું તમને સરકારી સેવાઓ અને આગળનાં પગલાં શોધવામાં મદદ કરી શકું છું. તમે શિક્ષણ લોન, શિષ્યવૃત્તિ, નોકરી, દસ્તાવેજો, વ્યવસાય લોન, પાક નુકસાન અથવા આપત્તિ રાહત વિશે પૂછી શકો છો.',
  pa: 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਸਰਕਾਰੀ ਸੇਵਾਵਾਂ ਅਤੇ ਅਗਲੇ ਕਦਮ ਲੱਭਣ ਵਿੱਚ ਤੁਹਾਡੀ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ। ਤੁਸੀਂ ਸਿੱਖਿਆ ਕਰਜ਼ੇ, ਵਜ਼ੀਫ਼ੇ, ਨੌਕਰੀਆਂ, ਦਸਤਾਵੇਜ਼ਾਂ, ਕਾਰੋਬਾਰੀ ਕਰਜ਼ਿਆਂ, ਫਸਲਾਂ ਦੇ ਨੁਕਸਾਨ ਜਾਂ ਆਫ਼ਤ ਰਾਹਤ ਬਾਰੇ ਪੁੱਛ ਸਕਦੇ ਹੋ।',
  od: 'ନମସ୍କାର! ସରକାରୀ ସେବା ଏବଂ ପରବର୍ତ୍ତୀ ପଦକ୍ଷେପ ଖୋଜିବାରେ ମୁଁ ଆପଣଙ୍କୁ ସାହାଯ୍ୟ କରିପାରିବି। ଆପଣ ଶିକ୍ଷା ଋଣ, ବୃତ୍ତି, ଚାକିରି, ଦଲିଲ, ବ୍ୟବସାୟ ଋଣ, ଫସଲ କ୍ଷତି କିମ୍ବା ବିପର୍ଯ୍ୟୟ ସହାୟତା ବିଷୟରେ ପଚାରିପାରିବେ।',
  as: 'নমস্কাৰ! মই চৰকাৰী সেৱা আৰু পৰৱৰ্তী পদক্ষেপসমূহ বিচাৰি পোৱাত আপোনাক সহায় কৰিব পাৰোঁ। আপুনি শিক্ষা ঋণ, বৃত্তি, চাকৰি, নথি-পত্ৰ, ব্যৱসায়িক ঋণ, শস্যৰ ক্ষতি বা দুৰ্যোগ সাহায্যৰ বিষয়ে সুধিব পাৰে।',
  ur: 'سلام! میں سرکاری خدمات اور اگلے اقدامات تلاش کرنے میں آپ کی مدد کر سکتا ہوں۔ آپ تعلیمی قرضے، وظائف، ملازمت، دستاویزات، کاروباری قرضے، فصلوں کے نقصان یا قدرتی آفت کی امداد کے بارے میں پوچھ سکتے ہیں۔',
};

export function getGreetingResponse(lang: SupportedLanguage): string {
  return GREETING_RESPONSES[lang] || GREETING_RESPONSES.en;
}

export const CLARIFICATION_FALLBACKS: Record<SupportedLanguage, string> = {
  en: 'I can help with government services. Tell me what happened, what support you need, and your state.',
  te: 'నేను ప్రభుత్వ సేవలకు సంబంధించి సహాయం చేయగలను. మీ పరిస్థితి ఏమిటి, ఎలాంటి సహాయం కావాలి మరియు మీ రాష్ట్రం ఏమిటో తెలపండి.',
  hi: 'मैं सरकारी सेवाओं में आपकी मदद कर सकता हूँ। बताइए क्या स्थिति है, किस सहायता की आवश्यकता है, और आपका राज्य कौन सा है।',
  ta: 'அரசு சேவைகளில் நான் உங்களுக்கு உதவ முடியும். உங்கள் நிலை என்ன, என்ன உதவி தேவை, உங்கள் மாநிலம் எது என்று சொல்லுங்கள்.',
  kn: 'ನಾನು ಸರ್ಕಾರಿ ಸೇವೆಗಳಿಗೆ ಸಹಾಯ ಮಾಡಬಲ್ಲೆ. ನಿಮ್ಮ ಪರಿಸ್ಥಿತಿ ಏನು, ಯಾವ ನೆರವು ಬೇಕು ಮತ್ತು ನಿಮ್ಮ ರಾಜ್ಯ ಯಾವುದು ಎಂದು ತಿಳಿಸಿ.',
  ml: 'സർക്കാർ സേവനങ്ങളിൽ ഞാൻ സഹായിക്കാം. നിങ്ങളുടെ സാഹചര്യം എന്താണെന്നും എന്ത് സഹായമാണ് ആവശ്യമെന്നും നിങ്ങളുടെ സംസ്ഥാനം ഏതാണെന്നും പറയുക.',
  mr: 'मी सरकारी सेवांमध्ये मदत करू शकतो. काय परिस्थिती आहे, काय मदत हवी आहे आणि आपले राज्य कोणते आहे ते सांगा.',
  bn: 'আমি সরকারি পরিষেবা সংক্রান্ত সহায়তা করতে পারি। কি ঘটেছে, কি সাহায্য প্রয়োজন এবং আপনার রাজ্য কি তা জানান।',
  gu: 'હું સરકારી સેવાઓમાં મદદ કરી શકું છું. શું બન્યું છે, શી સહાય જોઈએ છે અને તમારું રાજ્ય કયું છે તે જણાવો.',
  pa: 'ਮੈਂ ਸਰਕਾਰੀ ਸੇਵਾਵਾਂ ਵਿੱਚ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ। ਦੱਸੋ ਕੀ ਸਥਿਤੀ ਹੈ, ਕਿਸ ਸਹਾਇਤਾ ਦੀ ਲੋੜ ਹੈ ਅਤੇ ਤੁਹਾਡਾ ਰਾਜ ਕਿਹੜਾ ਹੈ।',
  od: 'ମୁଁ ସରକାରୀ ସେବା ସମ୍ବନ୍ଧରେ ସାହାଯ୍ୟ କରିପାରିବି। ଆପଣଙ୍କର କଣ ହୋଇଛି, କି ପ୍ରକାର ସହାୟତା ଦରକାର ଏବଂ ଆପଣଙ୍କ ରାଜ୍ୟ କୁହନ୍ତୁ।',
  as: 'মই চৰকাৰী সেৱাসমূহৰ ক্ষেত্ৰত সহায় কৰিব পাৰোঁ। কি ঘটিছে, কেনেধৰণৰ সাহায্যৰ প্ৰয়োজন আৰু আপোনাৰ ৰাজ্য কি জনাওক।',
  ur: 'میں سرکاری خدمات میں مدد کر سکتا ہوں۔ بتائیں کیا صورتحال ہے، کیا مدد درکار ہے، اور آپ کی ریاست کون سی ہے۔',
};

export function getClarificationFallback(lang: SupportedLanguage, defaultPrompt?: string): string {
  if (lang === 'en' && defaultPrompt) return defaultPrompt;
  return CLARIFICATION_FALLBACKS[lang] || CLARIFICATION_FALLBACKS.en;
}

export const NO_SERVICE_MATCH_FALLBACKS: Record<SupportedLanguage, string> = {
  en: 'I could not match that to a verified government service yet. Please add a little more detail about your situation or requirement.',
  te: 'ఇప్పటికీ దీనికి సరిపోయే ధృవీకరించబడిన ప్రభుత్వ సేవను కనుగొనలేకపోయాను. దయచేసి మీ పరిస్థితి లేదా అవసరం గురించి మరిన్ని వివరాలు తెలపండి.',
  hi: 'मुझे अभी तक कोई उपयुक्त सत्यापित सरकारी सेवा नहीं मिली। कृपया अपनी स्थिति या आवश्यकता के बारे में कुछ और विवरण दें।',
  ta: 'சரிபார்க்கப்பட்ட அரசு சேவை எதையும் இதுவரை பொருத்த முடியவில்லை. உங்கள் நிலை அல்லது தேவை பற்றி மேலும் சில விவரங்களைச் சேர்க்கவும்.',
  kn: 'ಪರಿಶೀಲಿಸಿದ ಸರ್ಕಾರಿ ಸೇವೆಗೆ ಹೊಂದಿಸಲು ಇನ್ನೂ ಸಾಧ್ಯವಾಗಿಲ್ಲ. ದಯವಿಟ್ಟು ನಿಮ್ಮ ಪರಿಸ್ಥಿತಿ ಅಥವಾ ಅಗತ್ಯದ ಬಗ್ಗೆ ಸ್ವಲ್ಪ ಹೆಚ್ಚಿನ ವಿವರಗಳನ್ನು ನೀಡಿ.',
  ml: 'സ്ഥിരീകരിച്ച സർക്കാർ സേവനവുമായി ഇതുവരെ പൊരുത്തപ്പെടുത്താനായില്ല. നിങ്ങളുടെ സാഹചര്യം അല്ലെങ്കിൽ ആവശ്യത്തെക്കുറിച്ച് കുറച്ചുകൂടി വിശദാംശങ്ങൾ നൽകുക.',
  mr: 'मला अद्याप कोणत्याही सत्यापित सरकारी सेवेचा मेळ घालता आला नाही. कृपया आपल्या परिस्थितीबद्दल किंवा आवश्यकतेबद्दल थोडा अधिक तपशील द्या.',
  bn: 'এখনও কোনো যাচাইকৃত সরকারি পরিষেবার সাথে মেলাতে পারিনি। দয়া করে আপনার পরিস্থিতি বা প্রয়োজনীয়তা সম্পর্কে আরও কিছু বিবরণ দিন।',
  gu: 'હજુ સુધી કોઈ ચકાસાયેલ સરકારી સેવા સાથે મેળ બેસાડી શકાયો નથી. કૃપા કરીને તમારી પરિસ્થિતિ અથવા જરૂરિયાત વિશે થોડી વધુ વિગતો આપો.',
  pa: 'ਮੈਂ ਅਜੇ ਤੱਕ ਇਸਨੂੰ ਕਿਸੇ ਪ੍ਰਮਾਣਿਤ ਸਰਕਾਰੀ ਸੇਵਾ ਨਾਲ ਮੇਲ ਨਹੀਂ ਕਰ ਸਕਿਆ। ਕਿਰਪਾ ਕਰਕੇ ਆਪਣੀ ਸਥਿਤੀ ਜਾਂ ਲੋੜ ਬਾਰੇ ਥੋੜ੍ਹਾ ਹੋਰ ਵੇਰਵਾ ਦਿਓ।',
  od: 'ଏପର୍ଯ୍ୟନ୍ତ ଏକ ଯାଞ୍ଚ ହୋଇଥିବା ସରକାରୀ ସେବା ସହିତ ମେଳ ହୋଇପାରିଲା ନାହିଁ। ଦୟାକରି ଆପଣଙ୍କ ପରିସ୍ଥିତି କିମ୍ବା ଆବଶ୍ୟକତା ବିଷୟରେ ଆଉ କିଛି ବିବରଣୀ ପ୍ରଦାନ କରନ୍ତୁ।',
  as: 'এতিয়ালৈকে কোনো প্ৰমাণিত চৰকাৰী সেৱাৰ সৈতে মিলাব পৰা নাই। অনুগ্ৰহ কৰি আপোনাৰ পৰিস্থিতি বা প্ৰয়োজনীয়তাৰ বিষয়ে অলপ অধিক বিৱৰণ দিয়ক।',
  ur: 'میں ابھی تک اسے کسی تصدیق شدہ سرکاری سروس سے مماثل نہیں کر سکا۔ براہ کرم اپنی صورتحال یا ضرورت کے بارے میں کچھ مزید تفصیل فراہم کریں۔',
};

export function getNoServiceMatchFallback(lang: SupportedLanguage): string {
  return NO_SERVICE_MATCH_FALLBACKS[lang] || NO_SERVICE_MATCH_FALLBACKS.en;
}

export function getRoadmapIntroText(lang: SupportedLanguage, eventName: string, activePerson: string): string {
  switch (lang) {
    case 'te':
      return `నేను **${eventName}** కింద **${activePerson}** కోసం మీ పరిస్థితిని విశ్లేషించాను. ఇది మీ ధృవీకరించబడిన కార్యాచరణ ప్రణాళిక:`;
    case 'hi':
      return `मैंने **${activePerson}** के लिए **${eventName}** के तहत आपकी स्थिति का विश्लेषण किया है। यहाँ आपका सत्यापित रोडमैप है:`;
    case 'ta':
      return `நான் **${activePerson}** க்காக **${eventName}** இன் கீழ் உங்கள் நிலையை ஆய்வு செய்துள்ளேன். இதோ உங்கள் சரிபார்க்கப்பட்ட வழிகாட்டி:`;
    case 'kn':
      return `ನಾನು **${activePerson}** ಗಾಗಿ **${eventName}** ಅಡಿಯಲ್ಲಿ ನಿಮ್ಮ ಪರಿಸ್ಥಿತಿಯನ್ನು ವಿಶ್ಲೇಷಿಸಿದ್ದೇನೆ. ಇದು ನಿಮ್ಮ ಪರಿಶೀಲಿಸಿದ ಕ್ರಿಯಾ ಯೋಜನೆ:`;
    case 'ml':
      return `ഞാൻ **${activePerson}** നായി **${eventName}** ന് കീഴിൽ നിങ്ങളുടെ സാഹചര്യം വിശകലനം ചെയ്തു. ഇതാ നിങ്ങളുടെ സ്ഥിരീകരിച്ച കർമ്മപദ്ധതി:`;
    case 'mr':
      return `मी **${activePerson}** साठी **${eventName}** अंतर्गत तुमच्या परिस्थितीचे विश्लेषण केले आहे. हा तुमचा सत्यापित रोडमॅप आहे:`;
    case 'bn':
      return `আমি **${activePerson}** এর জন্য **${eventName}** এর অধীনে আপনার পরিস্থিতি বিশ্লেষণ করেছি। এখানে আপনার যাচাইকৃত রোডম্যাপ:`;
    case 'gu':
      return `મેં **${activePerson}** માટે **${eventName}** હેઠળ તમારી પરિસ્થિતિનું વિશ્લેષણ કર્યું છે. અહીં તમારો ચકાસાયેલ રોડમેપ છે:`;
    case 'pa':
      return `ਮੈਂ **${activePerson}** ਲਈ **${eventName}** ਅਧੀਨ ਤੁਹਾਡੀ ਸਥਿਤੀ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕੀਤਾ ਹੈ। ਇਹ ਤੁਹਾਡਾ ਪ੍ਰਮਾਣਿਤ ਰੋਡਮੈਪ ਹੈ:`;
    case 'od':
      return `ମୁଁ **${activePerson}** ପାଇଁ **${eventName}** ଅଧୀନରେ ଆପଣଙ୍କ ପରିସ୍ଥିତି ବିଶ୍ଳେଷଣ କରିଛି। ଏହା ଆପଣଙ୍କର ଯାଞ୍ଚ ହୋଇଥିବା କାର୍ଯ୍ୟ ଯୋଜନା:`;
    case 'as':
      return `মই **${activePerson}** ৰ বাবে **${eventName}** ৰ অধীনত আপোনাৰ পৰিস্থিতি বিশ্লেষণ কৰিছোঁ। এয়া আপোনাৰ প্ৰমাণিত কাৰ্যপৰিকল্পনা:`;
    case 'ur':
      return `میں نے **${activePerson}** کے لیے **${eventName}** کے تحت آپ کی صورتحال کا تجزیہ کیا ہے۔ یہ آپ کا تصدیق شدہ روڈ میپ ہے:`;
    default:
      return `I have analyzed your situation under **${eventName}** for **${activePerson}**. Here is your verified roadmap:`;
  }
}

export function localizeLifeEventName(categoryId: string, lang: SupportedLanguage): string {
  if (lang === 'en') {
    switch (categoryId) {
      case 'education': case 'higher_education': return 'Higher Education & Loans';
      case 'agriculture': case 'crop_loss': return 'Agriculture & Crop Loss';
      case 'disaster': return 'Disaster & Emergency Relief';
      case 'business': return 'Business & MSME Support';
      case 'healthcare': return 'Healthcare & Medical Assistance';
      case 'housing': return 'Housing & Shelter Support';
      default: return categoryId.replace(/_/g, ' ');
    }
  }

  const map: Record<string, Record<SupportedLanguage, string>> = {
    education: {
      en: 'Higher Education & Loans', te: 'ఉన్నత విద్య & రుణాలు', hi: 'उच्च शिक्षा एवं ऋण',
      ta: 'உயர் கல்வி & கடன்கள்', kn: 'ಉನ್ನತ ಶಿಕ್ಷಣ ಮತ್ತು ಸಾಲಗಳು', ml: 'ഉന്നത വിദ്യാഭ്യാസവും വായ്പകളും',
      mr: 'उच्च शिक्षण आणि कर्ज', bn: 'উচ্চশিক্ষা ও ঋণ', gu: 'ઉચ્ચ શિક્ષણ અને લોન',
      pa: 'ਉੱਚ ਸਿੱਖਿਆ ਅਤੇ ਕਰਜ਼ੇ', od: 'ଉଚ୍ଚ ଶିକ୍ଷା ଏବଂ ଋଣ', as: 'উচ্চ শিক্ষা আৰু ঋণ', ur: 'اعلیٰ تعلیم اور قرضے',
    },
    agriculture: {
      en: 'Agriculture & Crop Loss', te: 'వ్యవసాయం & పంట నష్టం', hi: 'कृषि और फसल नुकसान',
      ta: 'விவசாயம் & பயிர் இழப்பு', kn: 'ಕೃಷಿ ಮತ್ತು ಬೆಳೆ ನಷ್ಟ', ml: 'കൃഷിയും വിളനാശവും',
      mr: 'शेती आणि पीक नुकसान', bn: 'কৃষি ও ফসলের ক্ষতি', gu: 'ખેતી અને પાક નુકસાન',
      pa: 'ਖੇਤੀਬਾੜੀ ਅਤੇ ਫਸਲਾਂ ਦਾ ਨੁਕਸਾਨ', od: 'କୃଷି ଏବଂ ଫସଲ କ୍ଷତି', as: 'কৃষি আৰু শস্যৰ ক্ষতি', ur: 'زراعت اور فصلوں کا نقصان',
    },
    disaster: {
      en: 'Disaster & Emergency Relief', te: 'విపత్తు & అత్యవసర సహాయం', hi: 'आपदा और आपातकालीन राहत',
      ta: 'பேரிடர் & அவசர நிவாரணம்', kn: 'ವಿಪತ್ತು ಮತ್ತು ತುರ್ತು ಪರಿಹಾರ', ml: 'ദുരന്ത നിവാരണവും അടിയന്തര സഹായവും',
      mr: 'आपत्ती आणि आपत्कालीन मदत', bn: 'দুর্যোগ ও জরুরি ত্রাণ', gu: 'આપત્તિ અને કટોકટી રાહત',
      pa: 'ਆਫ਼ਤ ਅਤੇ ਐਮਰਜੈਂਸੀ ਰਾਹਤ', od: 'ବିପର୍ଯ୍ୟୟ ଏବଂ ଜରୁରୀକାଳୀନ ସହାୟତା', as: 'দুৰ্যোগ আৰু জৰুৰীকালীন সাহায্য', ur: 'آفت اور ہنگامی امداد',
    },
    business: {
      en: 'Business & MSME Support', te: 'వ్యాపార & ఎంఎస్ఎంఈ మద్దతు', hi: 'व्यापार एवं एमएसएमई सहायता',
      ta: 'வணிகம் & குறுந்தொழில் ஆதரவு', kn: 'ವ್ಯಾಪಾರ ಮತ್ತು ಎಂಎಸ್‌ಎಂಇ ನೆರವು', ml: 'ബിസിനസ്സും എംഎസ്എംഇ പിന്തുണയും',
      mr: 'व्यवसाय आणि एमएसएमई मदत', bn: 'ব্যবসা ও এমএসএমই সহায়তা', gu: 'વ્યવસાય અને એમએસએમઈ સહાય',
      pa: 'ਕਾਰੋਬਾਰ ਅਤੇ ਐਮਐਸਐਮਈ ਸਹਾਇਤਾ', od: 'ବ୍ୟବସାୟ ଏବଂ ଏମଏସଏମଇ ସହାୟତା', as: 'ব্যৱসায় আৰু এমএছএমই সাহায্য', ur: 'کاروبار اور ایم ایس ایم ای مدد',
    },
    healthcare: {
      en: 'Healthcare & Medical Assistance', te: 'వైద్య & ఆరోగ్య సహాయం', hi: 'स्वास्थ्य और चिकित्सा सहायता',
      ta: 'சுகாதாரம் & மருத்துவ உதவி', kn: 'ಆರೋಗ್ಯ ಮತ್ತು ವೈದ್ಯಕೀಯ ನೆರವು', ml: 'ആരോഗ്യവും ചികിത്സാ സഹായവും',
      mr: 'आरोग्य आणि वैद्यकीय मदत', bn: 'স্বাস্থ্যসেবা ও চিকিৎসা সহায়তা', gu: 'આરોગ્ય અને તબીબી સહાય',
      pa: 'ਸਿਹਤ ਸੰਭਾਲ ਅਤੇ ਡਾਕਟਰੀ ਸਹਾਇਤਾ', od: 'ସ୍ୱାସ୍ଥ୍ୟସେବା ଏବଂ ଚିକିତ୍ସା ସହାୟତା', as: 'স্বাস্থ্যসেৱা আৰু চিকিৎসা সাহায্য', ur: 'صحت کی دیکھ بھال اور طبی امداد',
    },
    housing: {
      en: 'Housing & Shelter Support', te: 'గృహ & వసతి పథకాలు', hi: 'आवास और आश्रय सहायता',
      ta: 'வீட்டு வசதி & தங்குமிடம்', kn: 'ವಸತಿ ಮತ್ತು ಆಶ್ರಯ ಯೋಜನೆಗಳು', ml: 'ഭവനവും പാർപ്പിട പദ്ധതികളും',
      mr: 'गृहनिर्माण आणि निवारा योजना', bn: 'আবাসন ও আশ্রয় সহায়তা', gu: 'આવાસ અને આશ્રય સહાય',
      pa: 'ਰਿਹਾਇਸ਼ ਅਤੇ ਆਸਰਾ ਸਹਾਇਤਾ', od: 'ଗୃହ ନିର୍ମାଣ ଏବଂ ଆଶ୍ରୟ ସହାୟତା', as: 'গৃহ নিৰ্মাণ আৰু আশ্ৰয় সাহায্য', ur: 'رہائش اور پناہ گاہ کی مدد',
    },
  };

  const key = categoryId === 'higher_education' ? 'education' : categoryId === 'crop_loss' ? 'agriculture' : categoryId;
  return map[key]?.[lang] || map[key]?.en || categoryId.replace(/_/g, ' ');
}

export function localizeRelationship(person: string, lang: SupportedLanguage): string {
  if (lang === 'en') return person;
  const rels: Record<string, Record<SupportedLanguage, string>> = {
    Self: {
      en: 'Self', te: 'మీరు (Self)', hi: 'स्वयं (Self)', ta: 'நீங்கள் (Self)', kn: 'ನೀವು (Self)',
      ml: 'നിങ്ങൾ (Self)', mr: 'स्वतः (Self)', bn: 'নিজে (Self)', gu: 'પોતે (Self)', pa: 'ਖੁਦ (Self)',
      od: 'ନିଜେ (Self)', as: 'নিজে (Self)', ur: 'خود (Self)',
    },
    Father: {
      en: 'Father', te: 'తండ్రి', hi: 'पिता', ta: 'தந்தை', kn: 'ತಂದೆ',
      ml: 'പിതാവ്', mr: 'वडील', bn: 'পিতা', gu: 'પિતા', pa: 'ਪਿਤਾ',
      od: 'ପିତା', as: 'পিতা', ur: 'والد',
    },
    Mother: {
      en: 'Mother', te: 'తల్లి', hi: 'माता', ta: 'தாய்', kn: 'ತಾಯಿ',
      ml: 'മാതാവ്', mr: 'आई', bn: 'মাতা', gu: 'માતા', pa: 'ਮਾਤਾ',
      od: 'ମାତା', as: 'মাতৃ', ur: 'والدہ',
    },
    Son: {
      en: 'Son', te: 'కుమారుడు', hi: 'बेटा', ta: 'மகன்', kn: 'ಮಗ',
      ml: 'മകൻ', mr: 'मुलगा', bn: 'ছেলে', gu: 'પુત્ર', pa: 'ਪੁੱਤਰ',
      od: 'ପୁଅ', as: 'পুত্ৰ', ur: 'بیٹا',
    },
    Daughter: {
      en: 'Daughter', te: 'కుమార్తె', hi: 'बेटी', ta: 'மகள்', kn: 'ಮಗಳು',
      ml: 'മകൾ', mr: 'मुलगी', bn: 'মেয়ে', gu: 'પુત્રી', pa: 'ਧੀ',
      od: 'ଝିଅ', as: 'কন্যা', ur: 'بیٹی',
    },
    Spouse: {
      en: 'Spouse', te: 'భార్య/భర్త', hi: 'जीवनसाथी', ta: 'துணைவர்', kn: 'ಪತಿ/ಪತ್ನಿ',
      ml: 'ഭാര്യ/ഭർത്താവ്', mr: 'जोडीदार', bn: 'স্বামী/স্ত্রী', gu: 'જીવનસાથી', pa: 'ਜੀਵਨ ਸਾਥੀ',
      od: 'ସ୍ୱାମୀ/ସ୍ତ୍ରୀ', as: 'স্বামী/স্ত্ৰী', ur: 'شریک حیات',
    },
  };
  return rels[person]?.[lang] || rels[person]?.en || person;
}

export function localizeNextStep(
  stepNumber: number,
  title: string,
  lang: SupportedLanguage,
  primaryServiceName?: string
): string {
  const stepLabel = CHAT_LABELS[lang]?.step || 'Step';
  const prefix = `${stepLabel} 0${stepNumber}: `;

  if (lang === 'en') {
    return prefix + title;
  }

  if (title.includes('Prepare & Verify Foundational Revenue Certificates')) {
    const certMap: Record<SupportedLanguage, string> = {
      en: 'Prepare & Verify Foundational Revenue Certificates',
      te: 'ప్రాథమిక ఆదాయ మరియు నివాస ధృవీకరణ పత్రాలను సిద్ధం చేసుకొని ధృవీకరించుకోండి',
      hi: 'बुनियादी आय और निवास प्रमाण पत्र तैयार और सत्यापित करें',
      ta: 'அடிப்படை வருமானம் மற்றும் இருப்பிட சான்றிதழ்களை தயார் செய்து சரிபார்க்கவும்',
      kn: 'ಮೂಲ ಆದಾಯ ಮತ್ತು ನಿವಾಸ ಪ್ರಮಾಣಪತ್ರಗಳನ್ನು ಸಿದ್ಧಪಡಿಸಿ ಮತ್ತು ಪರಿಶೀಲಿಸಿ',
      ml: 'അടിസ്ഥാന വരുമാന, താമസ സർട്ടിഫിക്കറ്റുകൾ തയ്യാറാക്കി പരിശോധിക്കുക',
      mr: 'मूलभूत उत्पन्न आणि निवास प्रमाणपत्रे तयार आणि सत्यापित करा',
      bn: 'মৌলিক আয় এবং আবাসিক শংসাপত্র প্রস্তুত ও যাচাই করুন',
      gu: 'મૂળભૂત આવક અને રહેઠાણ પ્રમાણપત્રો તૈયાર અને ચકાસો',
      pa: 'ਮੁੱਢਲੀ ਆਮਦਨ ਅਤੇ ਰਿਹਾਇਸ਼ੀ ਸਰਟੀਫਿਕੇਟ ਤਿਆਰ ਅਤੇ ਤਸਦੀਕ ਕਰੋ',
      od: 'ମୌଳିକ ଆୟ ଏବଂ ବାସସ୍ଥାନ ପ୍ରମାଣପତ୍ର ପ୍ରସ୍ତୁତ ଏବଂ ଯାଞ୍ଚ କରନ୍ତୁ',
      as: 'মৌলিক আয় আৰু স্থায়ী ঠিকনাৰ প্ৰমাণপত্ৰ প্ৰস্তুত আৰু পৰীক্ষা কৰক',
      ur: 'بنیادی آمدنی اور رہائش کے سرٹیفکیٹ تیار اور تصدیق کریں',
    };
    return prefix + (certMap[lang] || certMap.en);
  }

  if (title.startsWith('Register on')) {
    const authority = title.replace('Register on', '').trim();
    switch (lang) {
      case 'te': return prefix + `${authority} పోర్టల్‌లో వన్-టైమ్ రిజిస్ట్రేషన్ (OTR) చేయండి`;
      case 'hi': return prefix + `${authority} पोर्टल पर वन-टाइम पंजीकरण (OTR) करें`;
      case 'ta': return prefix + `${authority} போர்ட்டலில் பதிவு (OTR) செய்யவும்`;
      case 'kn': return prefix + `${authority} ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ನೋಂದಣಿ (OTR) ಮಾಡಿ`;
      case 'ml': return prefix + `${authority} പോർട്ടലിൽ രജിസ്ട്രേഷൻ (OTR) ചെയ്യുക`;
      case 'mr': return prefix + `${authority} पोर्टलवर नोंदणी (OTR) करा`;
      case 'bn': return prefix + `${authority} পোর্টালে নিবন্ধন (OTR) করুন`;
      case 'gu': return prefix + `${authority} પોર્ટલ પર નોંધણી (OTR) કરો`;
      case 'pa': return prefix + `${authority} ਪੋਰਟਲ 'ਤੇ ਰਜਿਸਟ੍ਰੇਸ਼ਨ (OTR) ਕਰੋ`;
      case 'od': return prefix + `${authority} ପୋର୍ଟାଲରେ ପଞ୍ଜିକରଣ (OTR) କରନ୍ତୁ`;
      case 'as': return prefix + `${authority} পৰ্টেলত পঞ্জীয়ন (OTR) কৰক`;
      case 'ur': return prefix + `${authority} پورٹل پر رجسٹریشن (OTR) کریں`;
      default: return prefix + title;
    }
  }

  if (title.includes('Submit Scheme Application for')) {
    const schemeName = primaryServiceName || title.replace('Submit Scheme Application for', '').trim();
    switch (lang) {
      case 'te': return prefix + `${schemeName} కోసం పథక దరఖాస్తును సమర్పించండి`;
      case 'hi': return prefix + `${schemeName} के लिए योजना आवेदन जमा करें`;
      case 'ta': return prefix + `${schemeName} க்கான திட்ட விண்ணப்பத்தைச் சமர்ப்பிக்கவும்`;
      case 'kn': return prefix + `${schemeName} ಗಾಗಿ ಯೋಜನೆ ಅರ್ಜಿಯನ್ನು ಸಲ್ಲಿಸಿ`;
      case 'ml': return prefix + `${schemeName} നായുള്ള പദ്ധതി അപേക്ഷ സമർപ്പിക്കുക`;
      case 'mr': return prefix + `${schemeName} साठी योजना अर्ज सादर करा`;
      case 'bn': return prefix + `${schemeName} এর জন্য স্কিম আবেদন জমা দিন`;
      case 'gu': return prefix + `${schemeName} માટે યોજનાની અરજી સબમિટ કરો`;
      case 'pa': return prefix + `${schemeName} ਲਈ ਸਕੀਮ ਅਰਜ਼ੀ ਜਮ੍ਹਾਂ ਕਰੋ`;
      case 'od': return prefix + `${schemeName} ପାଇଁ ଯୋଜନା ଆବେଦନ ଦାଖଲ କରନ୍ତୁ`;
      case 'as': return prefix + `${schemeName} ৰ বাবে আঁচনিৰ আবেদন দাখিল কৰক`;
      case 'ur': return prefix + `${schemeName} کے لیے اسکیم کی درخواست جمع کرائیں`;
      default: return prefix + title;
    }
  }

  if (title.includes('Departmental Verification')) {
    const verifyMap: Record<SupportedLanguage, string> = {
      en: 'Departmental Verification & Field Endorsement',
      te: 'శాఖా పరమైన పరిశీలన మరియు ఫీల్డ్ ధృవీకరణ',
      hi: 'विभागीय सत्यापन और फील्ड समर्थन',
      ta: 'துறை சரிபார்ப்பு மற்றும் கள ஆய்வு',
      kn: 'ಇಲಾಖಾ ಪರಿಶೀಲನೆ ಮತ್ತು ಕ್ಷೇತ್ರ ಅನುಮೋದನೆ',
      ml: 'വകുപ്പുതല പരിശോധനയും ഫീൽഡ് പരിശോധനയും',
      mr: 'विभागीय पडताळणी आणि क्षेत्रीय समर्थन',
      bn: 'বিভাগীয় যাচাইকরণ এবং ক্ষেত্র অনুমোদন',
      gu: 'વિભાગીય ચકાસણી અને ક્ષેત્ર સમર્થન',
      pa: 'ਵਿਭਾਗੀ ਤਸਦੀਕ ਅਤੇ ਫੀਲਡ ਸਮਰਥਨ',
      od: 'ବିଭାଗୀୟ ଯାଞ୍ଚ ଏବଂ କ୍ଷେତ୍ର ଅନୁମୋଦନ',
      as: 'বিভাগীয় পৰীক্ষণ আৰু ক্ষেত্ৰ অনুমোদন',
      ur: 'محکمانہ تصدیق اور فیلਡ توثیق',
    };
    return prefix + (verifyMap[lang] || verifyMap.en);
  }

  return prefix + title;
}

export function localizeMatchReason(reason: string, lang: SupportedLanguage): string {
  if (lang === 'en') return reason;
  const reasonMap: Record<string, Record<SupportedLanguage, string>> = {
    'Matches citizen criteria.': {
      en: 'Matches citizen criteria.',
      te: 'పౌరుడి ప్రాథమిక అర్హత నిబంధనలకు సరిపోలుతుంది.',
      hi: 'नागरिक पात्रता मानदंडों से मेल खाता है।',
      ta: 'குடிமக்கள் தகுதி அளவுகோல்களுடன் பொருந்துகிறது.',
      kn: 'ನಾಗರಿಕ ಅರ್ಹತಾ ಮಾನದಂಡಗಳಿಗೆ ಹೊಂದಿಕೆಯಾಗುತ್ತದೆ.',
      ml: 'പൗര യോഗ്യതാ മാനദണ്ഡങ്ങളുമായി പൊരുത്തപ്പെടുന്നു.',
      mr: 'नागरिक पात्रता निकषांशी जुळते.',
      bn: 'নাগরিক যোগ্যতার মানদণ্ডের সাথে মেলে।',
      gu: 'નાગરિક પાત્રતા માપદંડો સાથે મેળ ખાય છે.',
      pa: 'ਨਾਗਰਿਕ ਯੋਗਤਾ ਦੇ ਮਾਪਦੰਡਾਂ ਨਾਲ ਮੇਲ ਖਾਂਦਾ ਹੈ।',
      od: 'ନାଗରିକ ଯୋଗ୍ୟତା ମାନଦଣ୍ଡ ସହିତ ମେଳ ଖାଉଛି।',
      as: 'নাগৰিক যোগ্যতাৰ মাপকাঠিৰ সৈতে মিলিছে।',
      ur: 'شہری کی اہلیت کے معیارات کے مطابق ہے۔',
    },
  };

  return reasonMap[reason]?.[lang] || reason;
}

export function localizeDocumentName(docName: string, lang: SupportedLanguage): string {
  if (lang === 'en') return docName;
  const docMap: Record<string, Record<SupportedLanguage, string>> = {
    'Aadhaar Card': {
      en: 'Aadhaar Card', te: 'ఆధార్ కార్డు (Aadhaar Card)', hi: 'आधार कार्ड (Aadhaar Card)',
      ta: 'ஆதார் அட்டை (Aadhaar Card)', kn: 'ಆಧಾರ್ ಕಾರ್ಡ್ (Aadhaar Card)', ml: 'ആധാർ കാർഡ് (Aadhaar Card)',
      mr: 'आधार कार्ड (Aadhaar Card)', bn: 'আধার কার্ড (Aadhaar Card)', gu: 'આધાર કાર્ડ (Aadhaar Card)',
      pa: 'ਆਧਾਰ ਕਾਰਡ (Aadhaar Card)', od: 'ଆଧାର କାର୍ଡ (Aadhaar Card)', as: 'আধাৰ কাৰ্ড (Aadhaar Card)', ur: 'آدھار کارڈ (Aadhaar Card)',
    },
    'Income Certificate': {
      en: 'Income Certificate', te: 'ఆదాయ ధృవీకరణ పత్రం (Income Certificate)', hi: 'आय प्रमाण पत्र (Income Certificate)',
      ta: 'வருமானச் சான்றிதழ் (Income Certificate)', kn: 'ಆದಾಯ ಪ್ರಮಾಣಪತ್ರ (Income Certificate)', ml: 'വരുമാന സർട്ടിഫിക്കറ്റ് (Income Certificate)',
      mr: 'उत्पन्न प्रमाणपत्र (Income Certificate)', bn: 'আয় শংসাপত্র (Income Certificate)', gu: 'આવક પ્રમાણપત્ર (Income Certificate)',
      pa: 'ਆਮਦਨ ਸਰਟੀਫਿਕੇਟ (Income Certificate)', od: 'ଆୟ ପ୍ରମାଣପତ୍ର (Income Certificate)', as: 'আয়ৰ প্ৰমাণপত্ৰ (Income Certificate)', ur: 'آمدنی کا سرٹیفکیٹ (Income Certificate)',
    },
    'Bank Passbook': {
      en: 'Bank Passbook', te: 'బ్యాంక్ పాస్‌బుక్ (Bank Passbook)', hi: 'बैंक पासबुक (Bank Passbook)',
      ta: 'வங்கி பாஸ்புக் (Bank Passbook)', kn: 'ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್ (Bank Passbook)', ml: 'ബാങ്ക് പാസ്ബുക്ക് (Bank Passbook)',
      mr: 'बँक पासबुक (Bank Passbook)', bn: 'ব্যাংক পাসবই (Bank Passbook)', gu: 'બેંક પાસબુક (Bank Passbook)',
      pa: 'ਬੈਂਕ ਪਾਸਬੁੱਕ (Bank Passbook)', od: 'ବ୍ୟାଙ୍କ ପାସବୁକ୍ (Bank Passbook)', as: 'বেংক পাছবুক (Bank Passbook)', ur: 'بینک پاس بک (Bank Passbook)',
    },
    'Caste Certificate': {
      en: 'Caste Certificate', te: 'కుల ధృవీకరణ పత్రం (Caste Certificate)', hi: 'जाति प्रमाण पत्र (Caste Certificate)',
      ta: 'சாதிச் சான்றிதழ் (Caste Certificate)', kn: 'ಜಾತಿ ಪ್ರಮಾಣಪತ್ರ (Caste Certificate)', ml: 'ജാതി സർട്ടിഫിക്കറ്റ് (Caste Certificate)',
      mr: 'जातीचा दाखला (Caste Certificate)', bn: 'জাতিগত শংসাপত্র (Caste Certificate)', gu: 'જાતિ પ્રમાણપત્ર (Caste Certificate)',
      pa: 'ਜਾਤੀ ਸਰਟੀਫਿਕੇਟ (Caste Certificate)', od: 'ଜାତି ପ୍ରମାଣପତ୍ର (Caste Certificate)', as: 'জাতিৰ প্ৰমাণপত্ৰ (Caste Certificate)', ur: 'ذات کا سرٹیفکیٹ (Caste Certificate)',
    },
    'Admission Letter': {
      en: 'Admission Letter', te: 'అడ్మిషన్ లెటర్ (Admission Letter)', hi: 'प्रवेश पत्र (Admission Letter)',
      ta: 'சேர்க்கைக் கடிதம் (Admission Letter)', kn: 'ಪ್ರವೇಶ ಪತ್ರ (Admission Letter)', ml: 'പ്രവേശന കത്ത് (Admission Letter)',
      mr: 'प्रवेश पत्र (Admission Letter)', bn: 'ভর্তি পত্র (Admission Letter)', gu: 'પ્રવેશ પત્ર (Admission Letter)',
      pa: 'ਦਾਖ਼ਲਾ ਪੱਤਰ (Admission Letter)', od: 'ନାମଲେଖା ପତ୍ର (Admission Letter)', as: 'নামভৰ্তিৰ পত্ৰ (Admission Letter)', ur: 'داخلہ کا خط (Admission Letter)',
    },
  };

  return docMap[docName]?.[lang] || docName;
}

export function formatAppliesToContext(
  person: string,
  basis: JurisdictionBasis | undefined,
  matchedState: string | undefined,
  residenceState: string | undefined,
  lang: SupportedLanguage = 'en'
): string {
  const locState = matchedState || residenceState || 'India';

  if (lang === 'te') {
    switch (basis) {
      case 'study':
        return `${person} • చదువుతున్న రాష్ట్రం: ${locState}`;
      case 'employment':
        return `${person} • పని చేస్తున్న రాష్ట్రం: ${locState}`;
      case 'property':
        return `${person} • ఆస్తి ఉన్న రాష్ట్రం: ${locState}`;
      case 'agriculture':
        return `${person} • వ్యవసాయ భూమి: ${locState}`;
      case 'business':
        return `${person} • వ్యాపారం: ${locState}`;
      case 'central':
        return `${person} • అఖిల భారత (కేంద్ర)`;
      case 'residence':
      default:
        return `${person} • నివాసం: ${locState}`;
    }
  }

  if (lang === 'hi') {
    switch (basis) {
      case 'study':
        return `${person} • अध्ययन राज्य: ${locState}`;
      case 'employment':
        return `${person} • कार्य राज्य: ${locState}`;
      case 'property':
        return `${person} • संपत्ति राज्य: ${locState}`;
      case 'agriculture':
        return `${person} • कृषि भूमि: ${locState}`;
      case 'business':
        return `${person} • व्यवसाय: ${locState}`;
      case 'central':
        return `${person} • अखिल भारतीय (केंद्रीय)`;
      case 'residence':
      default:
        return `${person} • निवास: ${locState}`;
    }
  }

  switch (basis) {
    case 'study':
      return `${person} • Studying in: ${locState}`;
    case 'employment':
      return `${person} • Working in: ${locState}`;
    case 'property':
      return `${person} • Property in: ${locState}`;
    case 'agriculture':
      return `${person} • Agricultural land in: ${locState}`;
    case 'business':
      return `${person} • Business in: ${locState}`;
    case 'central':
      return `${person} • All-India (National)`;
    case 'residence':
    default:
      return `${person} • Residence: ${locState}`;
  }
}
