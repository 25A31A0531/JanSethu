const fs = require('fs');

let content = fs.readFileSync('lib/rulesEngine/schemePatterns.ts', 'utf8');

// Fix 1: maritalStatus -> use gender only (CitizenProfile has no maritalStatus)
// Line 79: {"gender":"female","maritalStatus":"widowed","isBPL":true}
content = content.replace(
  '{"gender":"female","maritalStatus":"widowed","isBPL":true}',
  '{"gender":"female","isBPL":true}'
);

// Fix 2: disabilityPercent -> disabilityPercentage
// Line 85: {"age":30,"hasDisability":true,"disabilityPercent":80,"isBPL":true}
content = content.replace(
  '{"age":30,"hasDisability":true,"disabilityPercent":80,"isBPL":true}',
  '{"age":30,"hasDisability":true,"disabilityPercentage":80,"isBPL":true}'
);

// Fix 3: residenceType -> ruralUrban (rural = 'rural', urban = 'urban')
// Line 129: {"isBusinessOwner":false,"annualIncome":120000,"residenceType":"rural"}
content = content.replace(
  '{"isBusinessOwner":false,"annualIncome":120000,"residenceType":"rural"}',
  '{"isBusinessOwner":false,"annualIncome":120000,"ruralUrban":"rural"}'
);

// Line 135: {"isBusinessOwner":false,"annualIncome":200000,"residenceType":"urban"}
content = content.replace(
  '{"isBusinessOwner":false,"annualIncome":200000,"residenceType":"urban"}',
  '{"isBusinessOwner":false,"annualIncome":200000,"ruralUrban":"urban"}'
);

fs.writeFileSync('lib/rulesEngine/schemePatterns.ts', content, 'utf8');
console.log('Fixed type errors in schemePatterns.ts');

// Also check if any other residenceType or maritalStatus or disabilityPercent (non-age) remain
const remaining = content.match(/"maritalStatus"|"disabilityPercent":|"residenceType"/g);
if (remaining) {
  console.log('Remaining issues:', remaining);
} else {
  console.log('No remaining type issues');
}
