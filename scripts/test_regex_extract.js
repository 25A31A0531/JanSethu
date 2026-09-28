const fs = require('fs');

const schemePatternsText = fs.readFileSync('lib/rulesEngine/schemePatterns.ts', 'utf8');

const content = fs.readFileSync('scripts/test_13_languages.ts', 'utf8');
const specsStart = content.indexOf('const SCHEME_SPECS: SchemeTestSpec[] = [');
const specsEnd = content.indexOf('// Profile for testing');
const specsCode = content.substring(specsStart, specsEnd).replace('const SCHEME_SPECS: SchemeTestSpec[] =', 'return');
const specs = new Function(specsCode)();

console.log('Testing extraction for', specs.length, 'specs:');
let found = 0;
for (const spec of specs) {
  // Regex to match the scheme block's pattern
  // scheme_id: { ... pattern: / ... /flags,
  const re = new RegExp(`(${spec.id}:\\s*\\{[\\s\\S]*?pattern:\\s*\\/)([\\s\\S]*?)(\\/([a-z]*),)`, 'm');
  const m = schemePatternsText.match(re);
  if (m) {
    found++;
  } else {
    console.log('NOT FOUND:', spec.id);
  }
}
console.log(`Found ${found} of ${specs.length}`);
