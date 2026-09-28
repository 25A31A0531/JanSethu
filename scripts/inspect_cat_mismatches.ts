import * as fs from 'fs';

const failures = JSON.parse(fs.readFileSync('scripts/all_failures.json', 'utf8'));
const catMismatches = failures.filter((f: any) => f.reason.startsWith('Category mismatch'));
console.log('Total Category Mismatches:', catMismatches.length);
for (const f of catMismatches.slice(0, 30)) {
  console.log(`[${f.schemeId}] [${f.lang}] "${f.prompt}"`);
  console.log(`  Reason: ${f.reason}`);
}
