import { ClassificationResult, CitizenProfile, LifeEvent, ClarificationQuestion } from '../types';
import { detectLanguage } from '../i18n';

export const DISASTER_KEYWORDS = [
  // English
  'cyclone', 'flood', 'floods', 'heavy rain', 'heavy rains', 'storm', 'storms', 'calamity', 'inundation',
  'house damaged', 'house was damaged', 'house destroyed', 'house was destroyed', 'house collapsed',
  'lost my house', 'lost home', 'home damaged', 'home was damaged', 'home destroyed', 'home was destroyed',
  'home collapsed', 'damaged by a storm', 'destroyed in a storm', 'destroyed in a cyclone', 'collapsed during a cyclone',
  'roof damaged', 'sdrf', 'ndrf', 'emergency relief', 'disaster relief', 'earthquake', 'tsunami',

  // Romanized Telugu & Hindi
  'tufaan', 'toofan', 'tufan', 'damage ayyindi', 'toot gaya', 'kharab ho gaya', 'nasht ho gaya', 'padipoyindi', 'koolipoyindi',
  'naa illu', 'mera ghar', 'baadh', 'varadalu',

  // Telugu
  'తుఫాను', 'తుపాను', 'వరద', 'వరదలు', 'ఇల్లు దెబ్బతింది', 'ఇల్లు కూలిపోయింది', 'ఇల్లు పడిపోయింది', 'వర్షం వల్ల',
  'భారీ వర్షాలు', 'విపత్తు', 'పరిహారం', 'ఎస్డీఆర్ఎఫ్', 'ఎన్డీఆర్ఎఫ్',

  // Hindi
  'चक्रवात', 'तूफान', 'बाढ़', 'घर क्षतिग्रस्त', 'घर टूट गया', 'घर गिर गया', 'घर नष्ट हो गया',
  'घर खराब हो गया', 'भारी बारिश', 'आपदा', 'मुआवजा', 'एसडीआरएफ', 'एनडीआरएफ',

  // Tamil
  'புயல்', 'வெள்ளம்', 'வீடு சேதமடைந்தது', 'வீடு இடிந்துவிட்டது', 'வீடு விழுந்தது', 'மழை வெள்ளம்', 'பேரிடர்', 'நிவாரணம்',

  // Kannada
  'ಚಂಡಮಾರುತ', 'ಪ್ರವಾಹ', 'ಮನೆ ಹಾನಿಯಾಗಿದೆ', 'ಮನೆ ಕುಸಿದಿದೆ', 'ಮನೆ ಬಿದ್ದಿದೆ', 'ಭಾರೀ ಮಳೆ', 'ವಿಪತ್ತು', 'ಪರಿಹಾರ',

  // Malayalam
  'ചുഴലിക്കാറ്റ്', 'പ്രളയം', 'വെള്ളപ്പൊക്കം', 'വീട് തകർന്നു', 'വീട് ഇടിഞ്ഞു', 'കനത്ത മഴ', 'ദുരന്തം', 'ദുരിതാശ്വാസം',

  // Marathi
  'चक्रीवादळ', 'वादळ', 'पूर', 'घर कोसळले', 'घर पडले', 'घराचे नुकसान', 'मुसळधार पाऊस', 'आपत्ती', 'मदत',

  // Bengali
  'ঘূর্ণিঝড়', 'ঝড়', 'বন্যা', 'বাড়ি ক্ষতিগ্রস্ত', 'বাড়ি ভেঙে গেছে', 'ভারী বৃষ্টিপাত', 'দুর্যোগ', 'ত্রাণ',

  // Gujarati
  'વાવાઝોડું', 'તોફાન', 'પૂર', 'ઘર પડી ગયું', 'ઘર તૂટી ગયું', 'ઘરને નુકસાન', 'ભારે વરસાદ', 'હોનારત', 'સહાય',

  // Punjabi
  'ਤੂਫ਼ਾਨ', 'ਚੱਕਰਵਾਤ', 'ਹੜ੍ਹ', 'ਘਰ ਢਹਿ ਗਿਆ', 'ਘਰ ਟੁੱਟ ਗਿਆ', 'ਘਰ ਦਾ ਨੁਕਸਾਨ', 'ਭਾਰੀ ਮੀਂਹ', 'ਆਫ਼ਤ', 'ਮੁਆਵਜ਼ਾ',

  // Odia
  'ବାତ୍ୟା', 'ଝଡ଼', 'ବନ୍ୟା', 'ଘର ଭାଙ୍ଗିଯାଇଛି', 'ଘର ନଷ୍ଟ ହୋଇଯାଇଛି', 'ପ୍ରବଳ ବର୍ଷା', 'ବିପର୍ଯ୍ୟୟ', 'ରିଲିଫ',

  // Assamese
  'ধুমুহা', 'ঘূৰ্ণীবতাহ', 'বানপানী', 'ঘৰ ভাঙি গৈছে', 'ঘৰ ধ্বংস হৈছে', 'প্ৰবল বৰষুণ', 'বিপৰ্যয়', 'সাহায্য',

  // Urdu
  'طوفان', 'سائیکلون', 'سیلاب', 'گھر تباہ ہو گیا', 'گھر گر گیا', 'گھر کو نقصان', 'شدید بارش', 'آفت', 'امدادی رقم',
];

export const SOLAR_ROOFTOP_KEYWORDS = [
  // English
  'solar', 'rooftop solar', 'solar rooftop', 'solar panels', 'solar on roof', 'solar panel on roof',
  'solar subsidy', 'pm surya ghar', 'surya ghar', 'muft bijli', 'free electricity solar', 'solar electricity',
  'grid solar', 'install solar', '300 units free',

  // Romanized
  'solar panel', 'roof par solar', 'chhat par solar', 'surya ghar yojana', 'muft bijli yojana',

  // Telugu
  'రూఫ్‌టాప్ సోలార్', 'సూర్య ఘర్', 'సౌర విద్యుత్', 'ఉచిత విద్యుత్ సోలార్', 'ఇంటిపై సోలార్', 'సోలార్ ప్యానెల్',

  // Hindi
  'सोलर रूफटॉप', 'पीएम सूर्य घर', 'छत पर सोलर', 'सौर ऊर्जा', 'मुफ्त बिजली सोलर', 'सोलर पैनल',

  // Tamil
  'கூரை சூரிய மின்சாரம்', 'சூரிய சக்தி பலகை', 'பிஎம் சூர்ய கர்', 'இலவச மின்சாரம் சோலார்',

  // Kannada
  'ಸೌರ ಫಲಕ', 'ಮೇಲ್ಛಾವಣಿ ಸೌರ', 'ಸೂರ್ಯ ಘರ್', 'ಉಚಿತ ಸೌರ ವಿದ್ಯುತ್',

  // Malayalam
  'മേൽക്കൂര സോളാർ', 'സൂര്യ ഘർ', 'സൗരോർജ്ജ പാനൽ', 'സൗജന്യ സൗരോർജ്ജ വൈദ്യുതി',

  // Marathi
  'सौर पॅनेल', 'रूफटॉप सोलर', 'सूर्य घर', 'छतावर सोलर पॅनेल',

  // Bengali
  'ছাদ সৌর বিদ্যুৎ', 'সূর্য ঘর', 'সোলার প্যানেল', 'বিনামূল্যে বিদ্যুৎ সোলার',

  // Gujarati
  'રૂફટોપ સોલાર', 'સૂર્ય ઘર', 'સોલાર પેનલ', 'મફત વીજળી સોલાર',

  // Punjabi
  'ਛੱਤ ਸੋਲਰ ਪੈਨਲ', 'ਸੂਰਿਆ ਘਰ', 'ਸੋਲਰ ਪੈਨਲ', 'ਮੁਫ਼ਤ ਬਿਜਲੀ ਸੋਲਰ',

  // Odia
  'ଛାତ ଉପରେ ସୌର ପ୍ୟାନେଲ', 'ସୂର୍ଯ୍ୟ ଘର', 'ସୌର ବିଦ୍ୟୁତ', 'ମାଗଣା ବିଜୁଳି ସୌର',

  // Assamese
  'ছাদ সৌৰ পেনেল', 'সূৰ্য ঘৰ', 'সৌৰ বিদ্যুৎ', 'বিনামূলীয়া বিদ্যুৎ সৌৰ',

  // Urdu
  'چھت پر سولر پینل', 'سوریہ گھر', 'سولر پینل', 'مفت بجلی سولر',
];

export const HOUSING_KEYWORDS = [
  // English
  'pmay', 'pmay-g', 'pmay-u', 'pucca house', 'build house', 'housing grant', 'rural housing',
  'urban housing', 'awaas yojana', 'awas yojana', 'kutcha house', 'home loan subsidy',
  'interest subsidy urban', 'house construction grant', 'houseless',

  // Romanized
  'pucca makaan', 'pakka ghar', 'illu kattukovali', 'ghar banana hai', 'awas yojana',

  // Telugu
  'పక్కా ఇల్లు', 'గ్రామీణ ఆవాస్', 'పట్టణ ఆవాస్', 'ఇల్లు నిర్మించుకోవడానికి', 'ఆవాస్ యోజన', 'ఇంటి సబ్సిడీ',

  // Hindi
  'पक्का मकान', 'प्रधानमंत्री आवास योजना', 'ग्रामीण आवास', 'शहरी आवास', 'घर बनाने के लिए सहायता', 'कच्चा मकान',

  // Tamil
  'பக்கா வீடு', 'பிரதம மந்திரி ஆவாஸ் யோஜனா', 'கிராமப்புற வீடு', 'நகர்ப்புற வீடு', 'வீடு கட்ட மானியம்',

  // Kannada
  'ಪಕ್ಕಾ ಮನೆ', 'ಪ್ರಧಾನಮಂತ್ರಿ ಆವಾಸ್ ಯೋಜನೆ', 'ಗ್ರಾಮೀಣ ವಸತಿ', 'ನಗರ ವಸತಿ', 'ಮನೆ ನಿರ್ಮಾಣ ಸಬ್ಸಿಡಿ',

  // Malayalam
  'പക്കാ വീട്', 'പ്രധാനമന്ത്രി ആവാസ് യോജന', 'ഗ്രാമീണ ഭവന നിർമ്മാണം', 'വീട് വെക്കാൻ സഹായം',

  // Marathi
  'पक्के घर', 'पंतप्रधान आवास योजना', 'ग्रामीण आवास', 'घर बांधण्यासाठी अनुदान',

  // Bengali
  'পাকা বাড়ি', 'প্রধানমন্ত্রী আবাস যোজনা', 'গ্রামীণ আবাস', 'বাড়ি তৈরির অনুদান',

  // Gujarati
  'પાકું મકાન', 'પ્રધાનમંત્રી આવાસ યોજના', 'ગ્રામીણ આવાસ', 'ઘર બનાવવા સહાય',

  // Punjabi
  'ਪੱਕਾ ਮਕਾਨ', 'ਪ੍ਰਧਾਨ ਮੰਤਰੀ ਆਵਾਸ ਯੋਜਨਾ', 'ਪੇਂਡੂ ਆਵਾਸ', 'ਮਕਾਨ ਬਣਾਉਣ ਲਈ ਸਹਾਇਤਾ',

  // Odia
  'ପକ୍କା ଘର', 'ପ୍ରଧାନମନ୍ତ୍ରୀ ଆବାସ ଯୋଜନା', 'ଗ୍ରାମୀଣ ଆବାସ', 'ଘର ତିଆରି ସହାୟତା',

  // Assamese
  'পকী ঘৰ', 'প্ৰধানমন্ত্ৰী আৱাস যোজনা', 'গ্ৰামীণ আৱাস', 'ঘৰ নিৰ্মাণৰ অনুদান',

  // Urdu
  'پکا مکان', 'وزیراعظم آواس یوجنا', 'دیہی مکان', 'مکان تعمیر کرنے کے لیے گرانٹ',
];

export const AGRI_KEYWORDS = [
  // English
  'crop', 'crops', 'farmer', 'farmers', 'farming', 'farm', 'paddy', 'cotton', 'kisan',
  'agriculture', 'agricultural', 'harvest', 'cultivat', 'crop loss', 'crop damage', 'fasal bima',
  'pmfby', 'pm kisan', 'kcc', 'kisan credit card', 'tractor', 'farm machinery', 'smam',
  'solar pump', 'kusum', 'livestock', 'dairy farm', 'nlm', 'animal husbandry', 'fisheries',
  'fish farming', 'pmmsy', 'matsya sampada', 'aquaculture',

  // Telugu
  'చేను', 'పంట', 'పంట నష్టం', 'రైతు', 'వ్యవసాయం', 'విత్తనాలు', 'పీఎం కిసాన్', 'ఫసల్ బీమా',
  'కిసాన్ క్రెడిట్ కార్డు', 'ట్రాక్టర్ సబ్సిడీ', 'సోలార్ పంపు', 'కుసుమ్', 'పశుపోషణ', 'చేపల పెంపకం',

  // Hindi
  'फसल', 'फसल नुकसान', 'किसान', 'खेती', 'कृषि', 'पैदावार', 'पीएम किसान', 'फसल बीमा',
  'किसान क्रेडिट कार्ड', 'ट्रैक्टर सब्सिडी', 'सोलर पंप', 'कुसुम', 'पशुपालन', 'मत्स्य पालन',

  // Tamil
  'பயிர்', 'பயிர் சேதம்', 'விவசாயி', 'விவசாயம்', 'கிசான்', 'பயிர் காப்பீடு', 'டிராக்டர்', 'சோலார் பம்ப்', 'கால்நடை', 'மீன் வளர்ப்பு',

  // Kannada
  'ಬೆಳೆ', 'ಬೆಳೆ ಹಾನಿ', 'ರೈತ', 'ಕೃಷಿ', 'ಕಿಸಾನ್', 'ಬೆಳೆ ವಿಮೆ', 'ಟ್ರಾಕ್ಟರ್', 'ಸೋಲಾರ್ ಪಂಪ್', 'ಹೈನುಗಾರಿಕೆ', 'ಮೀನುಗಾರಿಕೆ',

  // Malayalam
  'വിള', 'വിളനാശം', 'കർഷകൻ', 'കൃഷി', 'കിസാൻ', 'വിള ഇൻഷുറൻസ്', 'ട്രാക്ടർ', 'സോളാർ പമ്പ്', 'പശുവളർത്തൽ', 'മത്സ്യകൃഷി',

  // Marathi
  'पीक', 'पीक नुकसान', 'शेतकरी', 'शेती', 'कृषी', 'पीएम किसान', 'पीक विमा', 'ट्रॅक्टर', 'सौर कृषी पंप', 'पशुपालन', 'मत्स्य पालन',

  // Bengali
  'ফসল', 'ফসলের ক্ষতি', 'কৃষক', 'কৃষি', 'পিএম কিষাণ', 'ফসল বীমা', 'ট্রাক্টর', 'সৌর পাম্প', 'দুগ্ধ খামার', 'মৎস্য চাষ',

  // Gujarati
  'પાક', 'પાક નુકસાન', 'ખેડૂત', 'ખેતી', 'પીએમ કિસાન', 'પાક વીમો', 'ટ્રેક્ટર', 'સોલાર પંપ', 'પશુપાલન', 'મત્સ્ય પાલન',

  // Punjabi
  'ਫ਼ਸਲ', 'ਫ਼ਸਲ ਦਾ ਨੁਕਸਾਨ', 'ਕਿਸਾਨ', 'ਖੇਤੀਬਾੜੀ', 'ਪੀਐਮ ਕਿਸਾਨ', 'ਫ਼ਸਲ ਬੀਮਾ', 'ਟਰੈਕਟਰ', 'ਸੋਲਰ ਪੰਪ', 'ਪਸ਼ੂ ਪਾਲਣ', 'ਮੱਛੀ ਪਾਲਣ',

  // Odia
  'ଫସଲ', 'ଫସଲ ନଷ୍ଟ', 'ଚାଷୀ', 'କୃଷି', 'ପିଏମ କିଷାନ', 'ଫସଲ ବୀମା', 'ଟ୍ରାକ୍ଟର', 'ସୌର ପମ୍ପ', 'ପଶୁପାଳନ', 'ମତ୍ସ୍ୟ ଚାଷ',

  // Assamese
  'শস্য', 'শস্যৰ ক্ষতি', 'কৃষক', 'কৃষি', 'পিএম কিষাণ', 'শস্য বীমা', 'ট্ৰেক্টৰ', 'সৌৰ পাম্প', 'পশুপালন', 'মীন পালন',

  // Urdu
  'فصل', 'فصل کا نقصان', 'کسان', 'کھیتی باڑی', 'زراعت', 'پی ایم کسان', 'فصل بیمہ', 'ٹریکٹر', 'سولر پمپ', 'مویشی پروری', 'ماہی پروری',
];

export const BEREAVEMENT_KEYWORDS = [
  // English
  'death', 'died', 'passed away', 'father died', 'mother died', 'deceased', 'demise',
  'legal heir', 'succession', 'survivor', 'death certificate', 'register death',
  'widow pension', 'old age pension', 'ignwps', 'ignoaps', 'igndps', 'nfbs', 'family benefit',
  'annapurna', 'food security elderly',

  // Romanized
  'chanipoyaru', 'maranam', 'swargwas', 'inteqal', 'mrityu praman patra', 'varis certificate',

  // Telugu
  'మరణం', 'చనిపోయారు', 'మరణ ధృవీకరణ పత్రం', 'వారసత్వ', 'విధవ పింఛను', 'వృద్ధాప్య పింఛను', 'కుటుంబ ప్రయోజన పథకం', 'అన్నపూర్ణ',

  // Hindi
  'मृत्यु', 'निधन', 'स्वर्गवास', 'मृत्यु प्रमाण पत्र', 'वारिस', 'विधवा पेंशन', 'वृद्धावस्था पेंशन', 'पारिवारिक लाभ', 'अन्नपूर्णा',

  // Tamil
  'இறப்பு', 'மறைவு', 'இறப்புச் சான்றிதழ்', 'வாரிசு', 'விதவை ஓய்வூதியம்', 'முதியோர் ஓய்வூதியம்', 'குடும்ப நலத் திட்டம்',

  // Kannada
  'ಮರಣ', 'ನಿಧನ', 'ಮರಣ ಪ್ರಮಾಣಪತ್ರ', 'ವಾರಸುದಾರ', 'ವಿಧವಾ ವೇತನ', 'ವೃದ್ಧಾಪ್ಯ ವೇತನ', 'ರಾಷ್ಟ್ರೀಯ ಕುಟುಂಬ ನೆರವು',

  // Malayalam
  'മരണം', 'നിര്യാണം', 'മരണ സർട്ടിഫിക്കറ്റ്', 'അവകാശി', 'വിധവാ പെൻഷൻ', 'വയോജന പെൻഷൻ',

  // Marathi
  'मृत्यू', 'निधन', 'मृत्यू दाखला', 'वारस', 'विधवा पेन्शन', 'श्रावणबाळ पेन्शन',

  // Bengali
  'মৃত্যু', 'মারা গেছেন', 'মৃত্যু সনদ', 'উত্তরাধিকারী', 'বিধবা পেনশন', 'বার্ধক্য পেনশন', 'পারিবারিক সুবিধা',

  // Gujarati
  'મૃત્યુ', 'અવસાન', 'મરણનો દાખલો', 'વારસદાર', 'વિધવા સહાય', 'વૃદ્ધ પેન્શન', 'રાષ્ટ્રીય પારિવારિક સહાય',

  // Punjabi
  'ਮੌਤ', 'ਅਕਾਲ ਚਲਾਣਾ', 'ਮੌਤ ਦਾ ਸਰਟੀਫਿਕੇਟ', 'ਵਾਰਸ', 'ਵਿਧਵਾ ਪੈਨਸ਼ਨ', 'ਬੁਢਾਪਾ ਪੈਨਸ਼ਨ', 'ਕੌਮੀ ਪਰਿਵਾਰਕ ਲਾਭ',

  // Odia
  'ମୃତ୍ୟୁ', 'ଦେହାନ୍ତ', 'ମୃତ୍ୟୁ ପ୍ରମାଣପତ୍ର', 'ଉତ୍ତରାଧିକାରୀ', 'ବିଧବା ଭତ୍ତା', 'ବାର୍ଦ୍ଧକ୍ୟ ଭତ୍ତା', 'ଜାତୀୟ ପାରିବାରିକ ସହାୟତା',

  // Assamese
  'মৃত্যু', 'দেহাৱসান', 'মৃত্যু প্ৰমাণপত্ৰ', 'উত্তৰাধিকাৰী', 'বিধৱা পেঞ্চন', 'বৃদ্ধ পেঞ্চন', 'পাৰিবাৰিক সুবিধা',

  // Urdu
  'وفات', 'انتقال', 'ڈیتھ سرٹیفکیٹ', 'وارث', 'بیوہ پنشن', 'اولڈ ایج پنشن', 'خاندانی فائدہ',
];

export const FINANCIAL_KEYWORDS = [
  // English
  'jan dhan', 'pmjdy', 'zero balance', 'bank account', 'open bank account', 'rupay card',
  'pmsby', 'suraksha bima', 'accidental insurance', 'pmjjby', 'jeevan jyoti', 'life insurance',
  'term insurance', 'atal pension', 'apy', 'monthly pension', 'pfrda', 'dbt', 'overdraft',

  // Romanized
  'jan dhan khata', 'zero balance account', 'suraksha bima yojana', 'jeevan jyoti bima', 'atal pension yojana',

  // Telugu
  'జన్ ధన్', 'జీరో బ్యాలెన్స్ బ్యాంక్ ఖాతా', 'సురక్షా బీమా', 'జీవన్ జ్యోతి బీమా', 'అటల్ పెన్షన్ యోజన', 'ప్రమాద బీమా', 'జీవిత బీమా',

  // Hindi
  'जन धन योजना', 'जीरो बैलेंस खाता', 'सुरक्षा बीमा योजना', 'जीवन ज्योति बीमा', 'अटल पेंशन योजना', 'दुर्घटना बीमा', 'जीवन बीमा',

  // Tamil
  'ஜன் தன் திட்டம்', 'ஜீரோ பேலன்ஸ் கணக்கு', 'சுரக்ஷா பீமா', 'ஜீவன் ஜோதி பீமா', 'அடல் பென்ஷன்', 'விபத்து காப்பீடு', 'ஆயுள் காப்பீடு',

  // Kannada
  'ಜನ್ ಧನ್ ಯೋಜನೆ', 'ಶೂನ್ಯ ಬ್ಯಾಲೆನ್ಸ್ ಖಾತೆ', 'ಸುರಕ್ಷಾ ಬಿಮಾ', 'ಜೀವನ ಜ್ಯೋತಿ ಬಿಮಾ', 'ಅಟಲ್ ಪಿಂಚಣಿ ಯೋಜನೆ', 'ಅಪಘಾತ ವಿಮೆ', 'ಜೀವ ವಿಮೆ',

  // Malayalam
  'ജൻ ധൻ അക്കൗണ്ട്', 'സീറോ ബാലൻസ് അക്കൗണ്ട്', 'സുരക്ഷാ ഭീമ', 'ജീവൻ ജ്യോതി ഭീമ', 'അടൽ പെൻഷൻ', 'അപകട ഇൻഷുറൻസ്', 'ജീവൻ ഇൻഷുറൻസ്',

  // Marathi
  'जन धन योजना', 'शून्य शिल्लक खाते', 'सुरक्षा विमा योजना', 'जीवन ज्योती विमा', 'अटल पेन्शन योजना', 'अपघात विमा', 'जीवन विमा',

  // Bengali
  'জন ধন যোজনা', 'জিরো ব্যালেন্স অ্যাকাউন্ট', 'সুরক্ষা বীমা', 'জীবন জ্যোতি বীমা', 'অটল পেনশন যোজনা', 'দুর্ঘটনা বীমা', 'জীবন বীমা',

  // Gujarati
  'જન ધન યોજના', 'ઝીરો બેલેન્સ ખાતું', 'સુરક્ષા વીમા યોજના', 'જીવન જ્યોતિ વીમા', 'અટલ પેન્શન યોજના', 'અકસ્માત વીમો', 'જીવન વીમો',

  // Punjabi
  'ਜਨ ਧਨ ਯੋਜਨਾ', 'ਜ਼ੀਰੋ ਬੈਲੇਂਸ ਖਾਤਾ', 'ਸੁਰੱਖਿਆ ਬੀਮਾ ਯੋਜਨਾ', 'ਜੀਵਨ ਜਯੋਤੀ ਬੀਮਾ', 'ਅਟਲ ਪੈਨਸ਼ਨ ਸਕੀਮ', 'ਦੁਰਘਟਨਾ ਬੀਮਾ', 'ਜੀਵਨ ਬੀਮਾ',

  // Odia
  'ଜନ ଧନ ଯୋଜନା', 'ଜିରୋ ବାଲାନ୍ସ ଖାତା', 'ସୁରକ୍ଷା ବୀମା ଯୋଜନା', 'ଜୀବନ ଜ୍ୟୋତି ବୀମା', 'ଅଟଳ ପେନସନ ଯୋଜନା', 'ଦୁର୍ଘଟଣା ବୀମା', 'ଜୀବନ ବୀମା',

  // Assamese
  'জন ধন যোজনা', 'শূন্য বেলেঞ্চ একাউন্ট', 'সুৰক্ষা বীমা যোজনা', 'জীৱন জ্যোতি বীমা', 'অটল পেঞ্চন আঁচনি', 'দুৰ্ঘটনা বীমা', 'জীৱন বীমা',

  // Urdu
  'جن دھن یوجنا', 'زیرو بیلنس کھاتہ', 'سرکشا بیما', 'جیون جیوتی بیما', 'اٹل پنشن یوجنا', 'حادثاتی بیمہ', 'زندگی کا بیمہ',
];

export const EDUCATION_KEYWORDS = [
  // English variations
  'higher studies', 'higher study', 'higher education',
  'education', 'educational', 'education loan', 'educational loan',
  'student loan', 'study loan', 'student', 'students',
  'scholarship', 'scholarships',
  'btech', 'b.tech', 'college', 'colleges',
  'university', 'universities',
  'tuition', 'tuition fee', 'tuition fees', 'fee reimbursement',
  'degree', 'matric', 'school', 'schooling', 'schools',
  'study', 'studies', 'studying', 'course', 'courses',
  'fee', 'fees',

  // Romanized Telugu (Tanglish)
  'chaduvu', 'chadhuvu', 'chadukodaniki', 'chaduvukodaniki',
  'chadavadam', 'chadavali', 'chaduvukovali', 'chaduvukune',
  'chaduvukovadaniki', 'chaduvutunna', 'chadavataniki', 'vidya',

  // Romanized Hindi (Hinglish)
  'padhai', 'padhna', 'padhne', 'padhaye', 'shiksha',
  'padhai ke liye loan', 'shiksha loan', 'education loan chahiye',
  'padhai ke liye',

  // Native Indic scripts - Hindi
  'छात्र', 'विद्यार्थी', 'शिक्षा ऋण', 'एजुकेशन लोन', 'शिक्षा', 'पढ़ाई',
  'छात्रवृत्ति', 'पढ़ाई के लिए लोन', 'कॉलेज लोन',

  // Telugu
  'విద్యార్థి', 'స్కాలర్‌షిప్', 'చదువు', 'విద్యా', 'విద్యారుణం',

  // Tamil
  'படிப்பு', 'கல்வி', 'கல்விக் கடன்', 'மாணவர்', 'உதவித்தொகை',

  // Kannada
  'ಶಿಕ್ಷಣ', 'ವಿದ್ಯಾಭ್ಯಾಸ', 'ವಿದ್ಯಾರ್ಥಿ', 'ಶೈಕ್ಷಣಿಕ ಸಾಲ', 'ವಿದ್ಯಾರ್ಥಿವೇತನ',

  // Malayalam
  'വിദ്യാഭ്യാസം', 'പഠനം', 'വിദ്യാർത്ഥി', 'വിദ്യാഭ്യാസ വായ്പ', 'സ്കോളർഷിപ്പ്',

  // Marathi
  'शिक्षण', 'विद्यार्थी', 'शैक्षणिक कर्ज', 'शिष्यवृत्ती', 'अभ्यास',

  // Bengali
  'শিক্ষা', 'পড়াশোনা', 'ছাত্র', 'শিক্ষার্থী', 'শিক্ষা ঋণ', 'বৃত্তি',

  // Gujarati
  'શિક્ષણ', 'અભ્યાસ', 'વિદ્યાર્થી', 'શિક્ષણ લોન', 'શિષ્યવૃત્તિ',

  // Punjabi
  'ਸਿੱਖਿਆ', 'ਪੜ੍ਹਾਈ', 'ਵਿਦਿਆਰਥੀ', 'ਐਜੂਕੇਸ਼ਨ ਲੋਨ', 'ਵਜ਼ੀਫ਼ਾ',

  // Odia
  'ଶିକ୍ଷା', 'ପାଠପଢ଼ା', 'ଛାତ୍ର', 'ଶିକ୍ଷା ଋଣ', 'ଛାତ୍ରବୃତ୍ତି',

  // Assamese
  'শিক্ষা', 'পঢ়াশুনা', 'ছাত্ৰ', 'শিক্ষা ঋণ', 'জলপানী',

  // Urdu
  'تعلیم', 'طالب علم', 'ایجوکیشن لون', 'تعلیمی قرض', 'وظیفہ',
];

export const BUSINESS_KEYWORDS = [
  'business', 'shop', 'store', 'startup', 'mudra', 'msme',
  'enterprise', 'commercial loan', 'udyam', 'self employed', 'cgtmse', 'credit guarantee',
  'vishwakarma', 'artisan', 'craftsperson', 'toolkit', 'pmegp', 'kvic', 'margin money',
  'aspire', 'sfurti', 'clusters', 'zed certification', 'credit rating',
  'వ్యాపారం', 'షాపు', 'రుణం', 'ముద్రా రుణం', 'విశ్వకర్మ', 'చేతివృత్తులు', 'టూల్‌కిట్', 'ఎంఎస్ఎంఈ',
  'व्यापार', 'दुकान', 'मुद्रा लोन', 'उद्योग', 'विश्वकर्मा', 'कारीगर', 'टूलकिट', 'क्रेडिट गारंटी',
  'தொழில்', 'வியாபாரம்', 'முத்ரா கடன்', 'விஸ்வகர்மா', 'கைவினைஞர்', 'குறுந்தொழில்',
  'ವ್ಯಾಪಾರ', 'ಉದ್ಯಮ', 'ಮುದ್ರಾ ಸಾಲ', 'ವಿಶ್ವಕರ್ಮ', 'ಕುಶಲಕರ್ಮಿ', 'ಸಣ್ಣ ಕೈಗಾರಿಕೆ',
  'ബിസിനസ്സ്', 'വ്യാപാരം', 'മുദ്ര വായ്പ', 'വിശ്വകർമ്മ', 'കൈത്തൊഴിൽ',
  'व्यवसाय', 'दुकान', 'उद्योग', 'मुद्रा कर्ज', 'विश्वकर्मा', 'लघु उद्योग',
  'ব্যবসা', 'দোকান', 'মুদ্রা ঋণ', 'বিশ্বকর্মা', 'কারিগর', 'ক্ষুদ্র শিল্প',
  'વેપાર', 'દુકાન', 'મુદ્રા લોન', 'વિશ્વકર્મા', 'કારીગર', 'નાના ઉદ્યોગ',
  'ਵਪਾਰ', 'ਦੁਕਾਨ', 'ਮੁਦਰਾ ਲੋਨ', 'ਵਿਸ਼ਵਕਰਮਾ', 'ਕਾਰੀਗਰ', 'ਛੋਟੇ ਉਦਯੋਗ',
  'ବ୍ୟବସାୟ', 'ଦୋକାନ', 'ମୁଦ୍ରା ଋଣ', 'ବିଶ୍ୱକର୍ମା', 'କାରିଗର', 'କ୍ଷୁଦ୍ର ଶିଳ୍ପ',
  'ব্যৱসায়', 'দোকান', 'মুদ্ৰা ঋণ', 'বিশ্বকৰ্মা', 'শিল্পী', 'ক্ষুদ্ৰ উদ্যোগ',
  'کاروبار', 'تجارت', 'مدرا قرض', 'وشوکرما', 'دستکار', 'چھوٹے کاروبار',
];

export const EMPLOYMENT_KEYWORDS = [
  'job', 'unemployed', 'lost job', 'laid off', 'apprentice', 'naps',
  'training', 'career', 'employment', 'vb-gram-g', 'vb gram g', 'rural work', '100 days work',
  'job card', 'wage employment', 'ddu-gky', 'ddu gky', 'rural youth skills', 'placement',
  'ncs', 'national career service', 'job fair', 'day-nulm', 'day nulm', 'street vendor loan',
  'pm svanidhi', 'svanidhi', 'hawker loan', 'thela loan',
  'ఉద్యోగం', 'నిరుద్యోగి', 'శిక్షణ', 'ఉపాధి హామీ', '100 రోజుల పని', 'జాబ్ కార్డు', 'నైపుణ్య శిక్షణ', 'వీధి వ్యాపారి',
  'नौकरी', 'रोजगार', 'बेरोजगार', 'प्रशिक्षण', '100 दिन का काम', 'जॉब कार्ड', 'ग्रामीण कौशल', 'स्ट्रीट वेंडर',
  'வேலை', 'வேலையின்மை', 'பயிற்சி', '100 நாள் வேலை', 'திறன் பயிற்சி', 'சாலையோர வியாபாரி',
  'ಉದ್ಯೋಗ', 'ನಿರುದ್ಯೋಗಿ', 'ತರಬೇತಿ', '100 ದಿನಗಳ ಕೆಲಸ', 'ಜಾಬ್ ಕಾರ್ಡ್', 'ಕೌಶಲ್ಯ ತರಬೇತಿ',
  'ജോലി', 'തൊഴിൽ', 'പരിശീലനം', 'തൊഴിലുറപ്പ്', 'നൈപുണ്യ പരിശീലനം', 'വഴിയോര കച്ചവടം',
  'नोकरी', 'रोजगार', 'प्रशिक्षण', '100 दिवस रोजगार', 'कौशल्य प्रशिक्षण', 'फेरीवाला कर्ज',
  'চাকরি', 'বেকার', 'কর্মসংস্থান', '১০০ দিনের কাজ', 'দক্ষতা প্রশিক্ষণ', 'হকার ঋণ',
  'નોકરી', 'બેરોજગાર', 'રોજગાર', '100 દિવસ રોજગારી', 'કૌશલ્ય તાલીમ', 'ફેરિયા લોન',
  'ਨੌਕਰੀ', 'ਬੇਰੁਜ਼ਗਾਰ', 'ਸਿਖਲਾਈ', '100 ਦਿਨ ਦਾ ਕੰਮ', 'ਹੁਨਰ ਸਿਖਲਾਈ', 'ਰੇਹੜੀ ਵਾਲੇ',
  'ଚାକିରି', 'ବେକାର', 'ନିଯୁକ୍ତି', '୧୦୦ ଦିନର କାମ', 'ଦକ୍ଷତା ତାଲିମ', 'ଉଠାଦୋକାନୀ',
  'চাকৰি', 'বেকাৰ', 'নিযুক্তি', '১০০ দিনৰ কাম', 'দক্ষতা প্ৰশিক্ষণ', 'পদপথৰ ব্যৱসায়ী',
  'نوکری', 'بے روزگار', 'ملازمت', '100 دنوں کا کام', 'ہنر کی تربیت', 'اسٹریٹ وینڈر',
];

export const DOC_KEYWORDS = [
  'aadhaar', 'lost aadhaar', 'lost document', 'reprint aadhaar', 'ration card',
  'voter id', 'pan card', 'certificate', 'enrolment', 'biometric update', 'pvc card',
  'order pvc', 'instant epan', 'passport', 'passport seva', 'apply passport', 'epic download',
  'ఆధార్', 'రేషన్', 'రేషన్ కార్డు', 'ఓటరు కార్డు', 'పాన్ కార్డు', 'పాస్‌పోర్ట్', 'పీవీసీ ఆధార్',
  'आधार', 'पहचान पत्र', 'राशन कार्ड', 'वोटर कार्ड', 'पैन कार्ड', 'पासपोर्ट', 'पीवीसी आधार',
  'ஆதார்', 'ரேஷன் அட்டை', 'வாக்காளர் அட்டை', 'பான் கார்டு', 'பாஸ்போர்ட்',
  'ಆಧಾರ್', 'ಪಡಿತರ ಚೀಟಿ', 'ಮತದಾರರ ಗುರುತಿನ ಚೀಟಿ', 'ಪ್ಯಾನ್ ಕಾರ್ಡ್', 'ಪಾಸ್‌ಪೋರ್ಟ್',
  'ആധാർ', 'റേഷൻ കാർഡ്', 'വോട്ടർ ഐഡി', 'പാൻ കാർഡ്', 'പാസ്‌പോർട്ട്',
  'आधार', 'रेशन कार्ड', 'मतदार ओळखपत्र', 'पॅन कार्ड', 'पासपोर्ट',
  'আধার', 'রেশন কার্ড', 'ভোটার কার্ড', 'প্যান কার্ড', 'পাসপোর্ট',
  'આધાર', 'રેશન કાર્ડ', 'મતદાર કાર્ડ', 'પાન કાર્ડ', 'પાસપોર્ટ',
  'ਆਧਾਰ', 'ਰਾਸ਼ਨ ਕਾਰਡ', 'ਵੋਟਰ ਕਾਰਡ', 'ਪੈਨ ਕਾਰਡ', 'ਪਾਸਪੋਰਟ',
  'ଆଧାର', 'ରାସନ କାର୍ଡ', 'ଭୋଟର କାର୍ଡ', 'ପାନ କାର୍ଡ', 'ପାସପୋର୍ଟ',
  'আধাৰ', 'ৰেচন কাৰ্ড', 'ভোটাৰ কাৰ্ড', 'পেন কাৰ্ড', 'পাছপ’ৰ্ট',
  'آدھار', 'راشن کارڈ', 'ووٹر کارڈ', 'پین کارڈ', 'پاسپورٹ',
];

export const HEALTHCARE_KEYWORDS = [
  // English
  'health', 'hospital', 'hospitals', 'doctor', 'doctors', 'medical', 'medicine', 'medicines',
  'treatment', 'surgery', 'surgeries', 'operation', 'ayushman', 'pmjay', 'pm-jay',
  'ayushman bharat', 'health insurance', 'medical insurance', 'health card', 'cashless',
  'ntr vaidya seva', 'dr ntr vaidya seva', 'ntr health card', 'aarogyasri', 'rajiv aarogyasri',
  'swasthya sathi', 'kasp', 'cmchis', 'mjpjay', 'chiranjeevi', 'maa yojana',
  'gopabandhu', 'gjay', 'bsky', 'abua swasthya', 'massy', 'veer narayan singh', 'svnsasy',
  'himcare', 'atal ayushman', 'ddssy', 'cmjay', 'cmht', 'mhis', 'mshcs', 'cmhis',
  'cmaay', 'niramayam', 'khubchand baghel', 'dialysis', 'cancer', 'chemotherapy', 'chemo',
  'tb', 'tuberculosis', 'icu', 'inpatient', 'patient', 'delivery', 'maternity', 'pregnancy',
  'pregnant', 'vaccination', 'clinic', 'ambulance', 'opd', 'ipd', 'bima hospital',
  'organ transplant', 'heart surgery', 'kidney treatment', 'prescription',

  // Romanized Hindi, Telugu, and Indic forms
  'dawa', 'dawakhana', 'aspataal', 'aspatal', 'bimaari', 'bimari', 'bimar', 'rog', 'ilaj',
  'chikitsa', 'swasthya', 'ayushman card', 'dava', 'rogi', 'aarogya', 'vaidyam', 'dawaee',
  'chikitsa sahayata', 'mandir', 'janani', 'prasuti', 'aarogyasri card', 'ntr card', 'bima hospital',

  // Telugu
  'ఆరోగ్యం', 'ఆసుపత్రి', 'చికిత్స', 'మందులు', 'వైద్యం', 'వైద్య సహాయం', 'ఆరోగ్యశ్రీ', 'ఎన్టీఆర్ వైద్య సేవ',
  'ఆయుష్మాన్', 'ఆపరేషన్', 'సర్జరీ', 'వ్యాధి', 'రోగి', 'డాక్టర్', 'హెల్త్ ఇన్సూరెన్స్',
  'డయాలసిస్', 'క్యాన్సర్', 'ప్రసవం', 'గర్భిణీ', 'క్షయ',

  // Hindi & Maithili
  'स्वास्थ्य', 'अस्पताल', 'इलाज', 'दवा', 'बीमारी', 'चिकित्सा', 'आयुष्मान', 'आयुष्मान कार्ड',
  'ऑपरेशन', 'सर्जरी', 'रोग', 'डॉक्टर', 'स्वास्थ्य बीमा', 'कैंसर', 'डायलिसिस', 'टीबी',
  'प्रसूति', 'गर्भावस्था', 'जननी', 'मातृत्व',

  // Tamil
  'சுகாதாரம்', 'மருத்துவமனை', 'சிகிச்சை', 'மருந்து', 'மருத்துவர்', 'ஆயுஷ்மான்',
  'முதலமைச்சர் காப்பீடு', 'அறுவை சிகிச்சை', 'நோய்', 'காப்பீட்டு அட்டை', 'பிரசவம்',

  // Kannada
  'ಆರೋಗ್ಯ', 'ಆಸ್ಪತ್ರೆ', 'ಚಿಕಿತ್ಸೆ', 'ಔಷಧಿ', 'ವೈದ್ಯರು', 'ಆಯುಷ್ಮಾನ್', 'ಆರೋಗ್ಯ ಕರ್ನಾಟಕ',
  'ಶಸ್ತ್ರಚಿಕಿತ್ಸೆ', 'ರೋಗ', 'ಆರೋಗ್ಯ ವಿಮೆ', 'ಹೆರಿಗೆ',

  // Malayalam
  'ആരോഗ്യം', 'ആശുപത്രി', 'ചികിത്സ', 'മരുന്ന്', 'ഡോക്ടർ', 'ആയുഷ്മാൻ', 'കാരുണ്യ',
  'ശസ്ത്രക്രിയ', 'രോഗം', 'ആരോഗ്യ ഇൻഷുറൻസ്', 'പ്രസവം',

  // Marathi
  'आरोग्य', 'रुग्णालय', 'दवाखाना', 'उपचार', 'औषध', 'डॉक्टर', 'आयुष्मान',
  'महात्मा फुले जन आरोग्य', 'शस्त्रक्रिया', 'आजार', 'आरोग्य विमा', 'प्रसूती',

  // Bengali
  'স্বাস্থ্য', 'হাসপাতাল', 'চিকিৎসা', 'ওষুধ', 'ডাক্তার', 'আয়ুষ্মান', 'স্বাস্থ্য সাথী',
  'অস্ত্রোপচার', 'অসুখ', 'রোগ', 'স্বাস্থ্য বীমা', 'প্রসূতি',

  // Gujarati
  'આરોગ્ય', 'હોસ્પિટલ', 'સારવાર', 'દવા', 'ડોક્ટર', 'આયુષ્માન', 'મુખ્યમંત્રી અમૃતમ',
  'ઓપરેશન', 'બીમારી', 'રોગ', 'સ્વાસ્થ્ય વીમો', 'પ્રસૂતિ',

  // Punjabi
  'ਸਿਹਤ', 'ਹਸਪਤਾਲ', 'ਇਲਾਜ', 'ਦਵਾਈ', 'ਡਾਕਟਰ', 'ਆਯੁਸ਼ਮਾਨ', 'ਸਿਹਤ ਬੀਮਾ', 'ਓਪਰੇਸ਼ਨ',
  'ਬਿਮਾਰੀ', 'ਸਰਬ ਸਿਹਤ ਬੀਮਾ', 'ਜਣੇਪਾ',

  // Odia
  'ସ୍ୱାସ୍ଥ୍ୟ', 'ଡାକ୍ତରଖାନା', 'ଚିକିତ୍ସା', 'ଔଷଧ', 'ଡାକ୍ତର', 'ଆୟୁଷ୍ମାନ', 'ବିଜୁ ସ୍ୱାସ୍ଥ୍ୟ କଲ୍ୟାଣ',
  'ଅସ୍ତ୍ରୋପଚାର', 'ରୋଗ', 'ସ୍ୱାସ୍ଥ୍ୟ ବୀମା', 'ପ୍ରସବ',

  // Assamese
  'স্বাস্থ্য', 'চিকিৎসালয়', 'হাস্পাতাল', 'চিকিৎসা', 'ঔষধ', 'চিকিৎসক', 'আয়ুষ্মান',
  'আয়ুষ্মান অসম', 'অস্ত্ৰোপচাৰ', 'বেমাৰ', 'স্বাস্থ্য বীমা', 'প্ৰসূতি',

  // Urdu
  'صحت', 'ہسپتال', 'علاج', 'دوا', 'ڈاکٹر', 'طبی امداد', 'جراحی', 'آپریشن',
  'بیماری', 'صحت کارڈ', 'صحت بیمہ',
];

export function hasKeyword(text: string, kw: string): boolean {
  const lowerKw = kw.toLowerCase().trim();
  if (!lowerKw) return false;

  // Handle "course" to avoid false positive from "of course"
  if (lowerKw === 'course' || lowerKw === 'courses') {
    const textWithoutOfCourse = text.replace(/\bof\s+courses?\b/gi, '');
    return /\bcourses?\b/i.test(textWithoutOfCourse);
  }

  // Handle "fee" and "fees" with strict word boundaries so it never collides with "coffee", "feet", etc.
  if (lowerKw === 'fee' || lowerKw === 'fees') {
    return /\bfees?\b/i.test(text);
  }

  // Handle "study" to also match morphological variations: "studies", "studying"
  if (lowerKw === 'study' || lowerKw === 'studies' || lowerKw === 'studying') {
    return /\b(study|studies|studying)\b/i.test(text);
  }

  // If keyword contains whitespace (phrases) or non-ASCII characters (Indic scripts), substring match is exact
  if (/\s|[^\x00-\x7F]/.test(lowerKw)) {
    return text.includes(lowerKw);
  }

  // For short single-word ASCII keywords (<= 4 chars) like "job", "crop", "farm", enforce word boundaries
  if (lowerKw.length <= 4) {
    const escaped = lowerKw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`\\b${escaped}\\b`, 'i').test(text);
  }

  // Standard substring match for longer words and stems (e.g., "cultivat", "scholarship")
  return text.includes(lowerKw);
}

export function hasAnyKeyword(text: string, keywords: string[]): boolean {
  return keywords.some((kw) => hasKeyword(text, kw));
}

/**
 * Robust Education & Education Loan query detector
 */
export function isEducationQuery(query: string): boolean {
  if (hasAnyKeyword(query, EDUCATION_KEYWORDS)) {
    return true;
  }

  // Morphological matching for Romanized Telugu education forms
  if (/\b(chadh?uv\w*|chadh?uk\w*|chadav\w*)\b/i.test(query)) {
    return true;
  }

  // Morphological matching for Romanized Hindi education forms
  if (/\b(padh(ai|na|ne|te|raha)\w*)\b/i.test(query)) {
    return true;
  }

  // Compound education phrases (English)
  if (/\bhigher\s+(studies|study|education)\b/i.test(query)) {
    return true;
  }

  const hasStudyTerm = /\b(education|study|student|btech|b\.tech|college|school|tuition|course|degree|shiksha|padhai|chadh?uvu|vidya|kalvi|padikira|chathra|chhatra|vidyarthi)\b/i.test(query)
    || /शिक्षा|पढ़ाई|छात्र|विद्यार्थी|చదువు|విద్య|படிப்பு|கல்வி|ಶಿಕ್ಷಣ|ವಿದ್ಯಾಭ್ಯಾಸ|വിദ്യാഭ്യാസം|പഠനം|शिक्षण|শিক্ষা|શિક્ષણ|ਅਭਿਆਸ|ਸਿੱਖਿਆ|ଶିକ୍ଷା|তালেম|تعلیم/i.test(query);

  const hasLoanTerm = /\b(loan|loans|fee|fees|scholarship|aid|stipend|reimbursement|rin|karan|vaddi|appu)\b/i.test(query)
    || /ऋण|लोन|कर्ज|రుణం|கடன்|ಸಾಲ|വായ്പ|ঋণ|લોન|ਕਰਜ਼|ଋଣ|قرض/i.test(query);

  if (hasStudyTerm && hasLoanTerm) {
    return true;
  }

  return false;
}

/**
 * Robust Disaster, Storm, Cyclone, and House Destruction detector
 */
export function isDisasterQuery(query: string): boolean {
  if (hasAnyKeyword(query, DISASTER_KEYWORDS)) {
    return true;
  }

  // Weather terms
  const weatherPattern = /\b(cyclone|storm|flood|floods|rain|rains|calamity|inundation|tufaan|toofan|tufan)\b/i.test(query)
    || /तूफान|चक्रवात|बाढ़|बारिश|తుఫాను|తుపాను|వరద|புயல்|வெள்ளம்|ಚಂಡಮಾರುತ|ಪ್ರವಾಹ|ചുഴലിക്കാറ്റ്|പ്രളയം|चक्रीवादळ|वादळ|पूर|ঘূর্ণিঝড়|ঝড়|বন্যা|વાવાઝોડું|તોફાન|પૂર|ਤੂਫ਼ਾਨ|ਹੜ੍ਹ|ବାତ୍ୟା|ଝଡ଼|ବନ୍ୟା|ধুমুহা|বানপানী|طوفان|سیلاب/i.test(query);

  // Dwelling / Property terms
  const dwellingPattern = /\b(house|home|roof|property|dwelling|hut|shed|ghar|makan|illu|veedu|mane|bari|kothi)\b/i.test(query)
    || /घर|मकान|छत|ఇల్లు|గృహం|வீடு|கூரை|ಮನೆ|ಛಾವಣಿ|വീട്|বাড়ি|ছাদ|ઘર|છત|ਘਰ|ਛੱਤ|ଘର|ଛାତ|ঘৰ|گھر|چھت/i.test(query);

  // Damage / Collapse / Loss verbs
  const damagePattern = /\b(destroyed|damaged|collapsed|lost|fallen|fell|damage|break|broken|padipoyindi|koolipoyindi|toot|gir|nasht|kharab)\b/i.test(query)
    || /नष्ट|गिर|टूट|खराब|क्षतिग्रस्त|కూలిపోయింది|పడిపోయింది|దెబ్బతింది|சேத|இடிந்து|விழுந்தது|ಹಾನಿ|ಕುಸಿದಿದೆ|ಬಿದ್ದಿದೆ|തകർന്നു|ഇടിഞ്ഞു|कोसळले|पडले|नुकसान|ভেঙে|ক্ষতিগ্রস্ত|પડી|તૂટી|ਨੁਕਸਾਨ|ਢਹਿ|ଭାଙ୍ଗି|ভাঙি|تباہ|گر/i.test(query);

  if ((weatherPattern && damagePattern) || (dwellingPattern && damagePattern && weatherPattern)) {
    return true;
  }

  return false;
}

/**
 * Robust Healthcare, Hospital, Medical Treatment & Insurance detector
 */
export function isHealthcareQuery(query: string): boolean {
  if (hasAnyKeyword(query, HEALTHCARE_KEYWORDS)) {
    return true;
  }

  const medicalTermPattern = /\b(hospital|doctor|doctors|medic(al|ine|ines)|surgery|surgeries|operation|clinic|ayushman|pmjay|aarogyasri|swasthya|kasp|cmchis|mjpjay|bsky|himcare|dialysis|cancer|chemo|icu|cardiac|delivery|maternity|pregnant|pregnancy|tuberculosis|illness|disease|treatment)\b/i;
  if (medicalTermPattern.test(query)) {
    return true;
  }

  return false;
}

/**
 * Context-Aware Multi-Label Life Event Classification
 */
import { SCHEME_PATTERNS } from './schemePatterns';

export function classifyLifeEvent(input: string): ClassificationResult {
  const query = input.toLowerCase().trim();
  detectLanguage(input);

  // 0. Filter out clearly unrelated / chitchat queries
  const isUnrelated = /\b(weather|song|songs|recipe|biryani|cricket|score|joke|movie|cinema|capital of|good morning)\b/i.test(query);
  if (isUnrelated) {
    return {
      primaryIntent: 'other',
      secondaryIntents: [],
      confidence: 0.2,
      reason: 'Query is unrelated to public government services.',
      requiresClarification: true,
      clarificationPrompt: "I'm not confident enough to classify this yet. Try describing what happened, what you need, and which state you live in.",
    };
  }

  // 1. Direct Scheme Intent Matching across all 13 languages
  for (const [, meta] of Object.entries(SCHEME_PATTERNS)) {
    if (meta.pattern.test(query)) {
      return {
        primaryIntent: meta.category,
        secondaryIntents: ['financial_assistance'],
        confidence: 0.98,
        reason: meta.reason,
        extractedContext: meta.context,
        requiresClarification: false,
      };
    }
  }

  // 2. Agriculture Crop Loss under Disaster vs General Disaster
  const isDisaster = isDisasterQuery(query);
  const isAgri = hasAnyKeyword(query, AGRI_KEYWORDS);

  if (isAgri && isDisaster) {
    return {
      primaryIntent: 'agriculture',
      secondaryIntents: ['disaster', 'financial_assistance'],
      confidence: 0.96,
      reason: 'Citizen reports agricultural crop loss resulting from weather/cyclone damage.',
      extractedContext: { isFarmer: true },
      requiresClarification: false,
    };
  }

  // 2. Solar Pump (Agriculture PM-KUSUM) vs Rooftop Solar (PM Surya Ghar)
  const isSolarPump = /\b(solar pump|solar irrigation|kusum|tube well solar|agricultural pump)\b/i.test(query)
    || /सोలార్ పంపు|कुसुम|सोलर पंप|சோலார் பம்ப்|ಸೋಲಾರ್ ಪಂಪ್|സോളാർ പമ്പ്|સૌર પમ્પ|ਸੋਲਰ ਪੰਪ/i.test(query);

  if (isSolarPump) {
    return {
      primaryIntent: 'agriculture',
      secondaryIntents: ['housing', 'financial_assistance'],
      confidence: 0.96,
      reason: 'Citizen inquiries about PM-KUSUM agricultural solar pump / irrigation subsidy.',
      extractedContext: { isFarmer: true },
      requiresClarification: false,
    };
  }

  // 3. Rooftop Solar (PM Surya Ghar - Housing / Renewable Energy)
  const isSolarRooftop = hasAnyKeyword(query, SOLAR_ROOFTOP_KEYWORDS);
  if (isSolarRooftop && !isDisaster) {
    return {
      primaryIntent: 'housing',
      secondaryIntents: ['financial_assistance', 'other'],
      confidence: 0.96,
      reason: 'Citizen inquiries about PM Surya Ghar Muft Bijli Yojana rooftop solar panel installation & subsidy.',
      requiresClarification: false,
    };
  }

  // 4. Natural Disaster / Property Damage (SDRF / NDRF / Disaster Reconstruction)
  if (isDisaster) {
    return {
      primaryIntent: 'disaster',
      secondaryIntents: ['housing', 'financial_assistance'],
      confidence: 0.97,
      reason: 'Citizen reports residential property damage or distress caused by natural calamity/cyclone/storm.',
      extractedContext: { hasHouseDamage: true },
      requiresClarification: false,
    };
  }

  // 5. Permanent Housing Construction (PMAY-G / PMAY-U 2.0)
  const isHousing = hasAnyKeyword(query, HOUSING_KEYWORDS);
  if (isHousing) {
    return {
      primaryIntent: 'housing',
      secondaryIntents: ['financial_assistance', 'other'],
      confidence: 0.95,
      reason: 'Citizen inquiries about pucca house construction grants under Pradhan Mantri Awas Yojana (PMAY).',
      requiresClarification: false,
    };
  }

  // 6. Bereavement / Civil Formalities / Survivor Social Security (NSAP / Death Cert / Legal Heir)
  if (hasAnyKeyword(query, BEREAVEMENT_KEYWORDS)) {
    return {
      primaryIntent: 'bereavement',
      secondaryIntents: ['identity_documents', 'financial_assistance'],
      confidence: 0.95,
      reason: 'Citizen inquiries about civil formalities, certificates, and succession following family bereavement.',
      requiresClarification: false,
    };
  }

  // 7. Healthcare & Medical Assistance
  if (isHealthcareQuery(query)) {
    return {
      primaryIntent: 'healthcare',
      secondaryIntents: ['financial_assistance'],
      confidence: 0.95,
      reason: 'Citizen inquiries about health insurance, hospital treatment, medical costs, surgery, or government healthcare schemes.',
      extractedContext: { hasInsurance: false },
      requiresClarification: false,
    };
  }

  // 8. Education & Scholarships
  if (isEducationQuery(query)) {
    return {
      primaryIntent: 'education',
      secondaryIntents: ['financial_assistance'],
      confidence: 0.94,
      reason: 'Citizen is seeking student scholarships, fee waivers, or higher education financial aid.',
      extractedContext: { isStudent: true },
      requiresClarification: false,
    };
  }

  // 9. Agriculture & Allied Farming
  if (isAgri) {
    return {
      primaryIntent: 'agriculture',
      secondaryIntents: ['financial_assistance'],
      confidence: 0.93,
      reason: 'Citizen inquiries about agricultural support, PM-KISAN, crop insurance, or farming machinery.',
      extractedContext: { isFarmer: true },
      requiresClarification: false,
    };
  }

  // 10. Financial Services, Jan Suraksha & Pension (PMJDY / PMSBY / PMJJBY / APY)
  if (hasAnyKeyword(query, FINANCIAL_KEYWORDS)) {
    return {
      primaryIntent: 'financial_assistance',
      secondaryIntents: ['other'],
      confidence: 0.94,
      reason: 'Citizen inquiries about Jan Dhan bank accounts, social insurance (PMSBY/PMJJBY), or Atal Pension Yojana.',
      requiresClarification: false,
    };
  }

  // 11. Business, MSME, Artisans & Micro-Credit (Mudra / CGTMSE / Vishwakarma / PMEGP)
  if (hasAnyKeyword(query, BUSINESS_KEYWORDS)) {
    return {
      primaryIntent: 'business',
      secondaryIntents: ['financial_assistance'],
      confidence: 0.93,
      reason: 'Citizen is starting or expanding a commercial/micro enterprise and seeking credit, toolkit, or registration.',
      extractedContext: { isBusinessOwner: true },
      requiresClarification: false,
    };
  }

  // 12. Employment, Livelihoods & Skilling (VB-G RAM G / DDU-GKY / NCS / DAY-NULM / SVANidhi)
  if (hasAnyKeyword(query, EMPLOYMENT_KEYWORDS)) {
    return {
      primaryIntent: 'employment',
      secondaryIntents: ['financial_assistance', 'business'],
      confidence: 0.92,
      reason: 'Citizen is seeking employment assistance, rural wage guarantee, street vendor credit, or skill development.',
      requiresClarification: false,
    };
  }

  // 13. Identity Documents & Citizen Services (Aadhaar / PAN / Voter ID / Passport)
  if (hasAnyKeyword(query, DOC_KEYWORDS)) {
    return {
      primaryIntent: 'identity_documents',
      secondaryIntents: ['other'],
      confidence: 0.93,
      reason: 'Citizen inquiries about identity documents, Aadhaar update/reprint, PAN card, Voter ID, or Passport.',
      requiresClarification: false,
    };
  }

  // Fallback
  return {
    primaryIntent: 'other',
    secondaryIntents: [],
    confidence: 0.45,
    reason: 'Insufficient specific keywords to make a confident life-event classification.',
    requiresClarification: true,
    clarificationPrompt: "I'm not confident enough to classify this yet. Try describing what happened, what you need, and which state you live in.",
  };
}

export function generateClarifyingQuestions(
  profile: Partial<CitizenProfile>,
  event: LifeEvent
): ClarificationQuestion[] {
  const existingKeys = Object.keys(profile);
  return event.suggestedQuestions.filter((q) => !existingKeys.includes(String(q.field)));
}
