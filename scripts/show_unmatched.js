const fs = require('fs');
const unmatched = JSON.parse(fs.readFileSync('scripts/unmatched_prompts.json', 'utf8'));

const byScheme = {};
for (const item of unmatched) {
  if (!byScheme[item.schemeId]) byScheme[item.schemeId] = [];
  byScheme[item.schemeId].push({ lang: item.lang, prompt: item.prompt });
}

fs.writeFileSync('scripts/unmatched_by_scheme.json', JSON.stringify(byScheme, null, 2), 'utf8');
console.log('Saved to scripts/unmatched_by_scheme.json');

for (const [schemeId, items] of Object.entries(byScheme)) {
  console.log(`\n=== ${schemeId} (${items.length} unmatched) ===`);
  for (const it of items) {
    console.log(`  [${it.lang}] ${it.prompt}`);
  }
}
