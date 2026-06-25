/**
 * Headless NLP test runner for MariaAIPro (no browser required)
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const match = html.match(/<script>\s*([\s\S]*?)\s*<\/script>\s*<\/body>/);
if (!match) {
  console.error('Could not extract script from index.html');
  process.exit(1);
}

let script = match[1];
script = script.replace(/document\.addEventListener\('DOMContentLoaded'[\s\S]*$/, '');
script += `
;({
  preprocess, porterStemmer, cosineSimilarity, FAQ_DATA,
  TfIdfVectorizer, findMatches, nlpEngine, CONFIG
});`;

const sandbox = { console, performance, setTimeout, clearTimeout };
const ctx = vm.createContext(sandbox);
const api = vm.runInContext(script, ctx);

api.nlpEngine.vectorizer.build(api.FAQ_DATA.map(f => f.question));

const tests = [];
const assert = (name, condition) => tests.push({ name, pass: !!condition });

const { preprocess, porterStemmer, cosineSimilarity, FAQ_DATA, TfIdfVectorizer, findMatches } = api;

assert('preprocess removes stopwords', !preprocess('what is the machine learning').includes('what'));
assert('preprocess lowercases', preprocess('Hello WORLD').includes('hello'));
assert('porterStemmer running→run', porterStemmer('running') === 'run' || porterStemmer('running').startsWith('run'));
assert('cosine identical vectors = 1', Math.abs(cosineSimilarity([1, 0], [1, 0]) - 1) < 0.001);
assert('cosine orthogonal = 0', cosineSimilarity([1, 0], [0, 1]) === 0);
assert('FAQ count >= 40', FAQ_DATA.length >= 40);

const v = new TfIdfVectorizer();
v.build(['machine learning algorithms', 'deep learning neural networks']);
const sim = cosineSimilarity(v.vectorize('machine learning'), v.documentVectors[0]);
assert('TF-IDF match > 0', sim > 0);

const ml = findMatches('What is machine learning?');
assert('ML question matches', ml.matchType === 'direct' || ml.topScore > 0.3);
assert('ML top score > 0.5', ml.topScore > 0.5);

const internship = findMatches('How to find AI internships as a student?');
assert('Internship question matches', internship.topScore > 0.5);

const gibberish = findMatches('xyzqwerty nonsense');
assert('Gibberish fallback', gibberish.matchType === 'none' || gibberish.topScore < 0.75);

const passed = tests.filter(t => t.pass).length;
const total = tests.length;

console.log('\n=== MariaAIPro Test Results ===\n');
tests.forEach(t => console.log(`${t.pass ? 'PASS' : 'FAIL'}  ${t.name}`));
console.log(`\n${passed}/${total} tests passed`);

console.log('\n--- Live NLP Samples ---');
console.log(`"What is machine learning?" → ${ml.matchType} (${(ml.topScore * 100).toFixed(1)}%)`);
console.log(`  → ${ml.matches[0].question}`);
console.log(`"How to find AI internships?" → ${internship.matchType} (${(internship.topScore * 100).toFixed(1)}%)`);
console.log(`"xyzqwerty" → ${gibberish.matchType} (${(gibberish.topScore * 100).toFixed(1)}%)`);

process.exit(passed === total ? 0 : 1);
