const p = 'I live in a kutcha house in rural village and need PMAY-Gramin housing grant of 1.2 lakh.';
// If we escape regex special characters and replace whitespace with \s+
const escaped = p.toLowerCase().trim()
  .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  .replace(/\s+/g, '\\s*');
const reg = new RegExp(escaped, 'i');
console.log('Direct test:', reg.test(p.toLowerCase().trim()));
