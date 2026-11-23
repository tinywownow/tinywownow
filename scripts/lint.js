#!/usr/bin/env node
/* Content lint: active voice, readability, punctuation, consistency and symmetry.
   Run:  node scripts/lint.js            (prints findings, exits 1 when there are errors)
         node scripts/lint.js --report   (also prints the symmetry table)
   This is a heuristic checker. It catches the common problems, and a human read is still needed. */
'use strict';
const D = require('../site-data.js');
const C = require('./content.js');
const BLOG = require('./blog.js');

const errors = [], warns = [];
const err = (where, msg, text) => errors.push(where + ': ' + msg + (text ? '  >> ' + String(text).slice(0, 140) : ''));
const warn = (where, msg, text) => warns.push(where + ': ' + msg + (text ? '  >> ' + String(text).slice(0, 140) : ''));

const strip = h => String(h).replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<\/?(?:a|b|em|strong|i|span|code)(?:\s[^>]*)?>/g, '').replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/\s+/g, ' ').trim();
const words = s => (String(s).match(/[A-Za-z0-9][A-Za-z0-9'%.\-+]*/g) || []);
const sentences = s => String(s).split(/(?<=[.!?])\s+(?=[A-Z0-9"(])/).map(x => x.trim()).filter(Boolean);

/* ---------- passive voice (heuristic) ---------- */
const IRREG = 'built|made|done|given|shown|seen|taken|kept|held|sent|set|run|written|chosen|known|found|left|lost|read|put|drawn|hidden|frozen|stolen|laid|paid|told|bought|brought|caught|taught|thought|understood|worn|won|spoken|broken|forgotten|gotten|ridden|risen|shaken|stuck|struck|sung|thrown|woken|cut|hit|shut|split|spread|let|begun|driven|eaten|fallen|flown|forgiven|gone|grown|lain|meant|sold|shot|slept|spent|swept|torn|withdrawn';
const PASSIVE = new RegExp('\\b(?:is|are|was|were|be|been|being|get|gets|got)\\s+(?:\\w+ly\\s+)?((?:\\w+(?:ed|en))|' + IRREG + ')\\b', 'gi');
const NOT_PARTICIPLE = new Set('red speed need seed feed indeed hundred bed shed open even often then when screen token listen children women men ten wooden linen kitchen golden ripen chosen-skip have has taken-skip fixed-skip'.split(' '));
function passive(text) {
  const out = [];
  let m; PASSIVE.lastIndex = 0;
  while ((m = PASSIVE.exec(text))) { if (!NOT_PARTICIPLE.has(m[1].toLowerCase())) out.push(m[0]); }
  return out;
}

/* ---------- readability ---------- */
function syll(w) {
  w = w.toLowerCase().replace(/[^a-z]/g, '');
  if (!w) return 0; if (w.length <= 3) return 1;
  w = w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '').replace(/^y/, '');
  const m = w.match(/[aeiouy]{1,2}/g); return Math.max(1, m ? m.length : 1);
}
const FRE = { w: 0, s: 0, y: 0 };
function fre(text) {
  const ss = sentences(text), ww = words(text).filter(x => /[A-Za-z]/.test(x));
  if (!ss.length || !ww.length) return null;
  const y = ww.reduce((a, b) => a + syll(b), 0);
  return 206.835 - 1.015 * (ww.length / ss.length) - 84.6 * (y / ww.length);
}
function addFre(text) {
  const ss = sentences(text), ww = words(text).filter(x => /[A-Za-z]/.test(x));
  FRE.w += ww.length; FRE.s += ss.length; FRE.y += ww.reduce((a, b) => a + syll(b), 0);
}

/* ---------- per-text checks ---------- */
const AMERICAN = /\b(color(?!s?\b.*hex)|colors|optimiz\w*|recogniz\w*|center(?!ed text)|centered|favorite|capitaliz\w*|digitiz\w*|behavior|analyz\w*|organiz\w*|minimiz\w*|customiz\w*|summariz\w*|normaliz\w*|licens(?:e)d?)\b/i;
const FLUFF = /\b(very|really|simply|easily|seamless\w*|robust|utiliz\w*|leverag\w*|just|basically|actually|obviously|powerful|amazing|awesome|best-in-class|cutting-edge|state-of-the-art)\b/i;
const A_AN_VOWEL_EXC = /^(user|use|used|useful|usual|usually|unique|universal|union|unit|uni\w*|url|usb|one|once|euro|european|eu|utf|ui|ux)/i;
const AN_CONS_EXC = /^(hour|honest|heir|honor|honour)/i;
function checkText(where, text, opt) {
  opt = opt || {};
  const t = String(text);
  if (!t.trim()) { err(where, 'empty text'); return; }
  if (/\s{2,}/.test(t)) err(where, 'double space', t);
  if (/\s+(?:[,;:!?]|\.(?![A-Za-z.]))/.test(t) && !/\.\.\./.test(t)) err(where, 'space before punctuation', t);
  if (/[,.;:]{2,}/.test(t.replace(/\.\.\./g, ''))) err(where, 'repeated punctuation', t);
  if (/\b(\w+)\s+\1\b/i.test(t.replace(/\b(that|had)\s+\1\b/gi, ''))) err(where, 'repeated word', t);
  if (/[—–]/.test(t)) err(where, 'dash character (use a full stop, comma or colon)', t);
  if (/[‘’“”]/.test(t)) warn(where, 'curly quotes (site uses straight quotes)', t);
  if (!opt.noEnd && !/[.!?:)"']$/.test(t.trim()) && !/^[A-Z]/.test('') ) err(where, 'does not end with . ! or ?', t);
  if (!opt.noCap && /^[a-z]/.test(t.trim()) && !/^(camelCase|snake_case|kebab-case|pdf|sha|url|json|xml|csv|iPhone)/.test(t.trim())) err(where, 'does not start with a capital', t);
  const p = passive(t); if (p.length) err(where, 'passive voice: "' + p.join('", "') + '"', t);
  const am = t.match(AMERICAN); if (am) err(where, 'American spelling "' + am[0] + '" (site uses British English)', t);
  const fl = t.match(FLUFF); if (fl) warn(where, 'filler word "' + fl[0] + '"', t);
  sentences(t).forEach(s => {
    const n = words(s).length;
    if (n > 30) err(where, 'sentence too long (' + n + ' words)', s); else if (n > 26) warn(where, 'long sentence (' + n + ' words)', s);
  });
  const re = /\b(an?)\s+([A-Za-z][A-Za-z0-9\-]*)/g; let m;
  while ((m = re.exec(t))) {
    const art = m[1].toLowerCase(), w = m[2];
    const acr = /^[A-Z]{2,}/.test(w) || /^[A-Z][a-z]*[0-9]/.test(w);
    let needAn;
    if (acr) needAn = /^[AEIOFHLMNRX]/.test(w); else needAn = /^[aeiou]/i.test(w) && !A_AN_VOWEL_EXC.test(w);
    if (!acr && AN_CONS_EXC.test(w)) needAn = true;
    if (art === 'a' && needAn) err(where, 'use "an" before "' + w + '"', t);
    if (art === 'an' && !needAn) err(where, 'use "a" before "' + w + '"', t);
  }
  if (!opt.noFre) addFre(t);
}

/* ---------- blueprint and symmetry ---------- */
const BP = { steps: 3, use: 3, tips: 4, limits: 3, faq: 4, next: 3 };
const sym = {};   // cluster -> {pages, words[]}
const catOf = {}; D.TOOLS.forEach(t => { catOf[t.id] = t.c; });

D.TOOLS.forEach(t => {
  const K = C.tools[t.id], w0 = 'tool ' + t.id;
  if (!K) { err(w0, 'missing copy'); return; }
  ['title', 'meta', 'answer', 'steps', 'use', 'tips', 'limits', 'faq', 'next', 'io'].forEach(f => { if (K[f] === undefined) err(w0, 'missing field ' + f); });
  Object.keys(BP).forEach(f => { if (K[f] && K[f].length !== BP[f]) err(w0, f + ' has ' + K[f].length + ' items, expected ' + BP[f]); });
  if (K.io && K.io.length !== 2) err(w0, 'io needs 2 items');
  if (K.title && K.title.length > 46) err(w0, 'title longer than 46 characters (' + K.title.length + ')', K.title);
  if (K.meta && (K.meta.length > 160 || K.meta.length < 90)) err(w0, 'meta length ' + K.meta.length + ' (aim for 90 to 160)', K.meta);
  const aw = words(K.answer || '').length;
  if (aw < 28 || aw > 55) err(w0, 'answer has ' + aw + ' words (aim for 28 to 55)', K.answer);
  checkText(w0 + ' answer', K.answer);
  (K.steps || []).forEach((s, i) => { checkText(w0 + ' step ' + (i + 1), s); if (words(s).length > 22) err(w0 + ' step ' + (i + 1), 'step longer than 22 words', s); });
  (K.use || []).forEach((s, i) => { checkText(w0 + ' use ' + (i + 1), s); const n = words(s).length; if (n < 6 || n > 18) err(w0 + ' use ' + (i + 1), 'use item has ' + n + ' words (aim for 6 to 18)', s); });
  (K.tips || []).forEach((s, i) => { const x = strip(s); checkText(w0 + ' tip ' + (i + 1), x); const n = words(x).length; if (n < 8 || n > 42) err(w0 + ' tip ' + (i + 1), 'tip has ' + n + ' words (aim for 8 to 42)', x); });
  (K.limits || []).forEach((s, i) => { checkText(w0 + ' limit ' + (i + 1), s); const n = words(s).length; if (n < 6 || n > 26) err(w0 + ' limit ' + (i + 1), 'limit has ' + n + ' words (aim for 6 to 26)', s); });
  (K.faq || []).forEach((q, i) => {
    checkText(w0 + ' faq q' + (i + 1), q[0]); if (!/\?$/.test(q[0])) err(w0 + ' faq q' + (i + 1), 'question must end with ?', q[0]);
    checkText(w0 + ' faq a' + (i + 1), q[1]); const n = words(q[1]).length; if (n < 4 || n > 60) err(w0 + ' faq a' + (i + 1), 'answer has ' + n + ' words (aim for 4 to 60)', q[1]);
  });
  (K.next || []).forEach((n, i) => { if (!D.TOOLS.find(x => x.id === n[0])) err(w0 + ' next ' + (i + 1), 'unknown tool ' + n[0]); if (n[0] === t.id) err(w0 + ' next ' + (i + 1), 'links to itself'); checkText(w0 + ' next ' + (i + 1), n[1]); });
  const total = [K.answer, ...(K.steps || []), ...(K.use || []), ...(K.tips || []).map(strip), ...(K.limits || []), ...(K.faq || []).flat(), ...(K.next || []).map(n => n[1])].join(' ');
  const c = catOf[t.id]; (sym[c] = sym[c] || { n: 0, w: [] }); sym[c].n++; sym[c].w.push(words(total).length);
});
Object.keys(C.tools).forEach(id => { if (!D.TOOLS.find(t => t.id === id)) err('copy ' + id, 'copy exists for an unknown tool'); });

D.CATS.forEach(c => {
  const K = C.cats[c.id], w0 = 'category ' + c.id;
  if (!K) { err(w0, 'missing copy'); return; }
  checkText(w0 + ' answer', K.answer);
  if ((K.pick || []).length !== 6) err(w0, 'pick needs 6 rows');
  if ((K.workflows || []).length !== 3) err(w0, 'workflows needs 3 items');
  if ((K.faq || []).length !== 4) err(w0, 'faq needs 4 items');
  if (K.meta.length > 175 || K.meta.length < 90) err(w0, 'meta length ' + K.meta.length, K.meta);
  (K.pick || []).forEach((p, i) => { checkText(w0 + ' pick ' + (i + 1), p[0], { noEnd: true }); if (!D.TOOLS.find(x => x.id === p[1])) err(w0 + ' pick ' + (i + 1), 'unknown tool ' + p[1]); });
  (K.workflows || []).forEach((w, i) => { checkText(w0 + ' workflow ' + (i + 1) + ' title', w[0], { noEnd: true }); checkText(w0 + ' workflow ' + (i + 1), w[2]); w[1].forEach(id => { if (!D.TOOLS.find(x => x.id === id)) err(w0 + ' workflow ' + (i + 1), 'unknown tool ' + id); }); });
  (K.faq || []).forEach((q, i) => { checkText(w0 + ' faq q' + (i + 1), q[0]); checkText(w0 + ' faq a' + (i + 1), q[1]); });
});

const H = C.home;
checkText('home meta', H.meta); H.how.forEach((s, i) => checkText('home how ' + (i + 1), s[1])); H.why.forEach((s, i) => checkText('home why ' + (i + 1), s[1]));
H.faq.forEach((q, i) => { checkText('home faq q' + (i + 1), q[0]); checkText('home faq a' + (i + 1), q[1]); });
checkText('privacy question', C.PRIVACY_Q[0].replace(/\{n\}/g, 'Merge PDF')); checkText('privacy answer', C.PRIVACY_Q[1].replace(/\{n\}/g, 'Merge PDF'));

Object.keys(C.pages).forEach(k => {
  const P = C.pages[k];
  const body = P.body.replace(/\{date\}/g, '1 January 2026').replace(/\{email\}/g, 'a@b.com');
  (body.match(/<p>[\s\S]*?<\/p>/g) || []).forEach((p, i) => { const x = strip(p); if (/^(Email:|Last updated)/.test(x)) return; checkText('page ' + k + ' p' + (i + 1), x); });
});

BLOG.forEach(p => {
  const w0 = 'blog ' + p.slug;
  checkText(w0 + ' answer', p.answer);
  if (p.meta.length > 160) err(w0, 'meta longer than 160 (' + p.meta.length + ')', p.meta);
  (p.body.match(/<(?:p|li)>[\s\S]*?<\/(?:p|li)>/g) || []).forEach((x, i) => { const s = strip(x); if (s.length < 3) return; checkText(w0 + ' block ' + (i + 1), s); });
  (p.body.match(/<p>[\s\S]*?<\/p>/g) || []).forEach((x, i) => { const n = sentences(strip(x)).length; if (n > 4) warn(w0 + ' paragraph ' + (i + 1), 'paragraph has ' + n + ' sentences'); });
  p.faq.forEach((q, i) => { checkText(w0 + ' faq q' + (i + 1), q[0]); checkText(w0 + ' faq a' + (i + 1), q[1]); });
});

/* ---------- output ---------- */
const fleschAll = 206.835 - 1.015 * (FRE.w / FRE.s) - 84.6 * (FRE.y / FRE.w);
console.log('Checked: ' + D.TOOLS.length + ' tools, ' + D.CATS.length + ' categories, home, ' + Object.keys(C.pages).length + ' info pages, ' + BLOG.length + ' blog posts');
console.log('Reading ease (Flesch, all prose): ' + fleschAll.toFixed(1) + '  (60 to 70 = plain English)  | avg sentence ' + (FRE.w / FRE.s).toFixed(1) + ' words');
if (process.argv.includes('--report') || process.argv.includes('--symmetry')) {
  console.log('\nSymmetry (words of copy per tool page, by cluster):');
  console.log('cluster'.padEnd(10) + 'pages'.padEnd(7) + 'min'.padEnd(6) + 'avg'.padEnd(6) + 'max');
  Object.keys(sym).forEach(c => { const w = sym[c].w; console.log(c.padEnd(10) + String(sym[c].n).padEnd(7) + String(Math.min(...w)).padEnd(6) + String(Math.round(w.reduce((a, b) => a + b, 0) / w.length)).padEnd(6) + Math.max(...w)); });
}
if (warns.length) { console.log('\nWARNINGS (' + warns.length + ')'); warns.slice(0, 60).forEach(w => console.log('  - ' + w)); if (warns.length > 60) console.log('  ... ' + (warns.length - 60) + ' more'); }
if (errors.length) { console.log('\nERRORS (' + errors.length + ')'); errors.forEach(e => console.log('  - ' + e)); process.exit(1); }
console.log('\nNo errors.');
