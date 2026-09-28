const fs = require('fs');

// We will extract prompts directly from test_13_languages.ts
const content = fs.readFileSync('scripts/test_13_languages.ts', 'utf8');

// Also load schemePatterns.ts
const schemePatternsContent = fs.readFileSync('lib/rulesEngine/schemePatterns.ts', 'utf8');

// Parse SCHEME_PATTERNS regexes
const patternMatches = [...schemePatternsContent.matchAll(/(\w+):\s*\{[\s\S]*?pattern:\s*(\/.*?\/[a-z]*)/g)];
const patterns = {};
for (const m of patternMatches) {
  const id = m[1];
  const regStr = m[2];
  try {
    const lastSlash = regStr.lastIndexOf('/');
    const p = regStr.substring(1, lastSlash);
    const flags = regStr.substring(lastSlash + 1);
    patterns[id] = new RegExp(p, flags);
  } catch (e) {
    console.error(`Error parsing regex for ${id}:`, e.message);
  }
}
console.log(`Loaded ${Object.keys(patterns).length} scheme patterns.`);

// Extract scheme test blocks from test_13_languages.ts
// Format:
// {
//   id: '...',
//   expectedCategory: '...',
//   prompts: {
//     en: [ ... ],
//     ...
//   }
// }
// We can use a regex or eval to get SCHEME_SPECS
const specsStart = content.indexOf('const SCHEME_SPECS: SchemeTestSpec[] = [');
const specsEnd = content.indexOf('// Profile for testing');
const specsCode = content.substring(specsStart, specsEnd).replace('const SCHEME_SPECS: SchemeTestSpec[] =', 'return');

const specs = new Function(specsCode)();
console.log(`Loaded ${specs.length} scheme specs.`);

const missingMatches = [];
for (const spec of specs) {
  const pat = patterns[spec.id];
  if (!pat) {
    console.warn(`No pattern for scheme ${spec.id}`);
    continue;
  }
  for (const [lang, prompts] of Object.entries(spec.prompts)) {
    for (const prompt of prompts) {
      const q = prompt.toLowerCase().trim();
      if (!pat.test(q)) {
        missingMatches.push({
          schemeId: spec.id,
          lang,
          prompt,
        });
      }
    }
  }
}

console.log(`\nTotal prompts tested: ${specs.length * 13 * 3}`);
console.log(`Prompts matched by pattern: ${specs.length * 13 * 3 - missingMatches.length}`);
console.log(`Prompts NOT matched by pattern: ${missingMatches.length}`);

fs.writeFileSync('scripts/unmatched_prompts.json', JSON.stringify(missingMatches, null, 2), 'utf8');

const byScheme = {};
for (const m of missingMatches) {
  byScheme[m.schemeId] = (byScheme[m.schemeId] || 0) + 1;
}
console.log('\nUnmatched by scheme:');
console.log(JSON.stringify(byScheme, null, 2));
