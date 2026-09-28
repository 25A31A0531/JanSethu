const fs = require('fs');

const unmatched = JSON.parse(fs.readFileSync('scripts/unmatched_by_scheme.json', 'utf8'));
console.log('Schemes with unmatched prompts:', Object.keys(unmatched).length);

// Let's print out what distinct terms are in each scheme's unmatched prompts
for (const [schemeId, items] of Object.entries(unmatched)) {
  console.log(`\n--- ${schemeId} (${items.length}) ---`);
  for (const it of items) {
    console.log(`[${it.lang}] ${it.prompt}`);
  }
}
