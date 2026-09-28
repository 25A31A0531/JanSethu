import * as fs from 'fs';

// Load unmatched prompts by scheme
const unmatched = JSON.parse(fs.readFileSync('scripts/unmatched_by_scheme.json', 'utf8'));

// Load schemePatterns.ts
let schemePatternsText = fs.readFileSync('lib/rulesEngine/schemePatterns.ts', 'utf8');

// For each scheme with unmatched prompts, let's see what needs to be added
console.log('Schemes to update:', Object.keys(unmatched).length);
