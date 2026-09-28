import { classifyLifeEvent } from '../lib/rulesEngine/classify';
import { SCHEME_PATTERNS } from '../lib/rulesEngine/schemePatterns';

const q = 'ಅಂಗವಿಕಲ ವೇತನಕ್ಕೆ ಯಾವ ಪ್ರಮಾಣಪತ್ರ ಬೇಕು?';
console.log('Result:', classifyLifeEvent(q));
const p = SCHEME_PATTERNS['nsap_igndps_disability_pension'];
console.log('Pattern test:', p.pattern.test(q.toLowerCase()));
