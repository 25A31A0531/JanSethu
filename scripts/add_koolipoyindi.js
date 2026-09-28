const fs = require('fs');

let content = fs.readFileSync('lib/rulesEngine/schemePatterns.ts', 'utf8');

// Find disaster_house_reconstruction block and add Romanized Telugu terms
const schemeKey = 'disaster_house_reconstruction:';
const idx = content.indexOf(schemeKey);
const patternStart = content.indexOf('pattern: /', idx);
const patternEnd = content.indexOf('/i,', patternStart) + 3;

const oldPattern = content.substring(patternStart, patternEnd);
// Insert Romanized Telugu terms before the /i,
const insertBefore = '/i,';
const insertPos = oldPattern.lastIndexOf(insertBefore);
const newPattern = oldPattern.substring(0, insertPos) + 
  '|koolipoyindi|illu\\s*koolipoyindi|naa\\s*illu\\s*cyclone|cyclone\\s*valla\\s*koolipoyindi|padipoyindi' + 
  oldPattern.substring(insertPos);

content = content.substring(0, patternStart) + newPattern + content.substring(patternEnd);
fs.writeFileSync('lib/rulesEngine/schemePatterns.ts', content, 'utf8');
console.log('Done - added Romanized Telugu koolipoyindi terms');
