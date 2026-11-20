#!/usr/bin/env node
/* Generates the static site: one real HTML page per tool, category and info page,
   plus sitemap.xml, robots.txt, llms.txt and llms-full.txt.
   Run:  node scripts/build.js        (set SITE_URL to override site.config.json) */
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.join(__dirname, '..');
const D = require(path.join(ROOT, 'site-data.js'));
const C = require('./content.js');
const CFG = JSON.parse(fs.readFileSync(path.join(ROOT, 'site.config.json'), 'utf8'));
const SITE = (process.env.SITE_URL || CFG.url).replace(/\/+$/, '');
const NAME = CFG.name;
const NOW = new Date();
const TODAY = NOW.toISOString().slice(0, 10);
const TODAY_LONG = NOW.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

/* ---------- helpers ---------- */
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const hash = f => crypto.createHash('md5').update(fs.readFileSync(path.join(ROOT, f))).digest('hex').slice(0, 8);
const V = { css: hash('styles.css'), app: hash('app.js'), data: hash('site-data.js'), tools: hash('tools.js') };
const abs = p => SITE + (p === '/' ? '/' : p);
const cat = id => D.CATS.find(c => c.id === id);
const toolsOf = id => D.TOOLS.filter(t => t.c === id);
const byId = id => D.TOOLS.find(t => t.id === id);
const hasOg = fs.existsSync(path.join(ROOT, 'og-image.png'));
const OG = hasOg ? SITE + '/og-image.png' : null;
const ORG_ID = SITE + '/#organization';

/* ids whose UI is built into app.js (everything else needs tools.js) */
const IN_APP = new Set(['compress-image', 'word-counter', 'case-converter', 'text-reverser', 'json-formatter', 'base64-encode', 'url-encode', 'hash-gen', 'xml-formatter', 'csv-to-json',
  'resize-image', 'image-to-jpg', 'image-to-png', 'image-to-webp', 'rotate-image', 'grayscale-image', 'watermark-image', 'photo-filter']);

const POPULAR = ['compress-image', 'merge-pdf', 'jpg-to-pdf', 'resize-image', 'compress-pdf', 'pdf-to-jpg', 'compress-video', 'image-to-text', 'crop-image', 'convert-to-webp', 'trim-video', 'word-counter']
  .map(s => D.TOOLS.find(t => t.slug === s || t.id === s)).filter(Boolean);

/* ---------- shared HTML pieces ---------- */
const LOGO = size => '<svg class="logo-mark" width="' + size + '" height="' + size + '" viewBox="0 0 40 40" fill="none" aria-hidden="true"><path class="lg-file" d="M10.5 4H23.5L33 13.5V32.5A3.5 3.5 0 0 1 29.5 36H10.5A3.5 3.5 0 0 1 7 32.5V7.5A3.5 3.5 0 0 1 10.5 4Z" fill="#7a9165"/><path class="lg-fold" d="M23.5 4V13.5H33Z" fill="#5a7047"/><path class="lg-spark" d="M20 17.5l2.1 5.4 5.4 2.1-5.4 2.1L20 32.5l-2.1-5.4-5.4-2.1 5.4-2.1z" fill="#fff"/></svg>';
const CHECK = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';

function nav() {
  const drops = D.CATS.map(c => {
    const list = toolsOf(c.id);
    return '<div class="nav-drop"><a class="nav-btn" href="/' + c.slug + '">' + c.short + ' <span class="chev">&#9662;</span></a><div class="drop-menu">' +
      list.slice(0, 10).map(t => '<a class="drop-item" href="/' + t.slug + '"><div class="drop-ico ' + c.ic + '">' + D.gl(t, 18) + '</div><span>' + esc(t.n) + '</span></a>').join('') +
      '<a class="drop-all" href="/' + c.slug + '"><span>View all ' + list.length + ' ' + c.name + '</span><span>&rarr;</span></a></div></div>';
  }).join('');
  const mob = D.CATS.map(c => '<div class="mob-sec">' + c.name + '</div>' + toolsOf(c.id).slice(0, 6).map(t => '<a class="mob-link" href="/' + t.slug + '"><span class="mob-ic ' + c.ic + '">' + D.gl(t, 17) + '</span>' + esc(t.n) + '</a>').join('') +
    '<a class="mob-link" href="/' + c.slug + '" style="color:var(--sage3);font-weight:600">All ' + c.name + ' &rarr;</a>').join('');
  return '<nav class="nav" id="nav" aria-label="Main"><div class="nav-inner">' +
    '<a class="logo" href="/" aria-label="' + NAME + ' home">' + LOGO(38) + '<span class="logo-txt">TinyWow <em>Now</em></span></a>' +
    '<div class="nav-links">' + drops + '<a class="nav-btn" href="/tools">All Tools</a></div>' +
    '<div class="nav-actions"><div class="nav-sw" style="position:relative"><span class="ns-ico" aria-hidden="true">&#128269;</span>' +
    '<input class="nav-search" id="navSearch" type="search" placeholder="Search tools&hellip;" aria-label="Search tools" autocomplete="off" oninput="doNavSearch(this.value)"><div class="search-drop" id="searchDrop"></div></div>' +
    '<button class="theme-btn" id="themeBtn" onclick="toggleTheme()" title="Toggle dark mode" aria-label="Toggle dark mode">&#127769;</button></div>' +
    '<button class="nav-toggle" onclick="toggleMob()" aria-label="Menu" aria-expanded="false">&#9776;</button></div></nav>' +
    '<div class="mob-menu" id="mobMenu">' + mob + '</div>';
}

function footer() {
  const cols = D.CATS.map(c => '<div><div class="fcol-t">' + c.name + '</div><div class="flinks">' +
    toolsOf(c.id).slice(0, 5).map(t => '<a class="flink" href="/' + t.slug + '">' + esc(t.n) + '</a>').join('') +
    '<a class="flink" href="/' + c.slug + '" style="color:var(--sage3);font-weight:600">All ' + c.short.toLowerCase() + ' tools</a></div></div>').join('');
  return '<footer class="footer"><div class="wrap"><div class="footer-g" style="grid-template-columns:2fr repeat(5,1fr)"><div>' +
    '<div style="display:flex;align-items:center;gap:9px">' + LOGO(32) + '<span class="logo-txt" style="font-size:1rem">TinyWow <em>Now</em></span></div>' +
    '<p class="f-desc">Free online tools for images, PDFs, videos, files and text. They run in your browser, so your files stay private.</p>' +
    '<div class="flinks"><a class="flink" href="/about">About</a><a class="flink" href="/blog">Blog</a><a class="flink" href="/privacy">Privacy Policy</a><a class="flink" href="/terms">Terms of Use</a><a class="flink" href="/contact">Contact</a></div></div>' + cols + '</div>' +
    '<div class="foot-bot"><span class="foot-copy">&copy; ' + NOW.getUTCFullYear() + ' ' + NAME + ' &middot; Free online tools for everyone</span>' +
    '<div class="foot-badges"><span class="fbadge">Private</span><span class="fbadge">Fast</span><span class="fbadge">Free forever</span></div></div></div></footer>' +
    '<div id="toast" role="status" aria-live="polite"><span id="t-ico">&#9989;</span> <span id="toastMsg">Done!</span></div>';
}

/* legacy "#tool-xxx" links from the old single-page version */
const LEGACY = {}; D.TOOLS.forEach(t => { if (t.slug !== t.id) LEGACY[t.id] = t.slug; });
const HEAD_SCRIPT = '<script>(function(){try{document.documentElement.setAttribute("data-theme",localStorage.getItem("twn-theme")||"light")}catch(e){}' +
  'var h=location.hash,p=location.pathname;if(p==="/"&&h){var m=' + JSON.stringify(LEGACY) + ',c={write:"text"};' +
  'if(h.indexOf("#tool-")===0){var i=h.slice(6);location.replace("/"+(m[i]||i))}else if(h.indexOf("#cat-")===0){var k=h.slice(5);location.replace("/"+(c[k]||k)+"-tools")}else if(h==="#all-tools"){location.replace("/tools")}}})()</script>';

function shell(o) {
  const title = o.title.length > 70 ? o.title : o.title;
  const canonical = abs(o.path);
  const ld = (o.jsonld || []).map(j => '<script type="application/ld+json">' + JSON.stringify(j) + '</script>').join('');
  const og = '<meta property="og:type" content="' + (o.ogType || 'website') + '"><meta property="og:site_name" content="' + NAME + '"><meta property="og:title" content="' + esc(o.title) + '"><meta property="og:description" content="' + esc(o.desc) + '"><meta property="og:url" content="' + canonical + '"><meta property="og:locale" content="en_US">' +
    (OG ? '<meta property="og:image" content="' + OG + '"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="' + NAME + ' - free online image, PDF, video and file tools">' : '') +
    '<meta name="twitter:card" content="' + (OG ? 'summary_large_image' : 'summary') + '"><meta name="twitter:title" content="' + esc(o.title) + '"><meta name="twitter:description" content="' + esc(o.desc) + '">' + (OG ? '<meta name="twitter:image" content="' + OG + '">' : '');
  const scripts = '<script src="/site-data.js?v=' + V.data + '" defer></script>' + (o.needsTools ? '<script src="/tools.js?v=' + V.tools + '" defer></script>' : '') + '<script src="/app.js?v=' + V.app + '" defer></script>';
  return '<!DOCTYPE html>\n<html lang="en" data-theme="light">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n' +
    '<title>' + esc(title) + '</title>\n<meta name="description" content="' + esc(o.desc) + '">\n<link rel="canonical" href="' + canonical + '">\n' +
    '<meta name="robots" content="' + (o.noindex ? 'noindex,follow' : 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1') + '">\n<meta name="theme-color" content="#7a9165">\n' +
    '<link rel="icon" href="/favicon.ico" sizes="48x48">\n<link rel="icon" type="image/svg+xml" href="/logo.svg" sizes="any">\n<link rel="apple-touch-icon" href="/apple-touch-icon.png">\n' + og + '\n' + HEAD_SCRIPT + '\n' +
    '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n' +
    '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&display=swap">\n' +
    '<link rel="stylesheet" href="/styles.css?v=' + V.css + '">\n' + ld + '\n</head>\n<body' + (o.bodyAttrs ? ' ' + o.bodyAttrs : '') + '>\n<a class="skip" href="#main">Skip to content</a>\n' +
    nav() + '\n<main id="main">' + o.body + '</main>\n' + footer() + '\n' + scripts + '\n</body>\n</html>\n';
}

/* ---------- reusable blocks ---------- */
function toolCard(t, showCat) {
  const c = cat(t.c);
  return '<a class="tc" href="/' + t.slug + '" data-cat="' + t.c + '" data-text="' + esc((t.n + ' ' + t.d).toLowerCase()) + '">' +
    '<div class="tc-ico ' + c.ic + '">' + D.gl(t, 22) + '</div><h3 class="tc-nm">' + esc(t.n) + '</h3><p class="tc-ds">' + esc(t.d) + '</p>' +
    '<div class="tc-ft">' + (showCat ? '<span class="tc-tag">' + c.name + '</span>' : '<span></span>') + '<span class="tc-go">Try free &rarr;</span></div></a>';
}
function breadcrumb(items) {
  return '<nav class="breadcrumb" aria-label="Breadcrumb">' + items.map((it, i) => (i ? '<span class="bc-sep">/</span>' : '') + (it.href ? '<a href="' + it.href + '">' + esc(it.name) + '</a>' : '<span aria-current="page">' + esc(it.name) + '</span>')).join('') + '</nav>';
}
const crumbLd = items => ({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: abs(it.href || it.path) })) });
function faqBlock(heading, faq) {
  return '<section class="seo-sec"><h2>' + esc(heading) + '</h2><div class="faq-grid">' + faq.map(q => '<div class="faq-i"><h3>' + esc(q[0]) + '</h3><p>' + esc(q[1]) + '</p></div>').join('') + '</div></section>';
}
/* FAQPage markup mirrors the visible Q&A on the page exactly */
const faqLd = faq => ({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map(q => ({ '@type': 'Question', name: q[0], acceptedAnswer: { '@type': 'Answer', text: q[1] } })) });
const orgLd = { '@context': 'https://schema.org', '@type': 'Organization', '@id': ORG_ID, name: NAME, url: SITE + '/', logo: { '@type': 'ImageObject', url: SITE + '/logo.svg' }, email: CFG.email };

const written = [];
function write(rel, content) {
  const file = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
  written.push(rel);
}

/* ---------- pages ---------- */
const urls = []; // for sitemap: {path, priority}

/* home */
(function home() {
  const H = C.home, img = byId('compress-image');
  const body =
    '<section class="hx"><div class="hx-bg"></div><div class="wrap hx-grid"><div class="hx-copy">' +
    '<div class="hx-eye"><span class="hx-dot"></span>Private &middot; runs in your browser</div>' +
    '<h1 class="hx-h1">Compress <span class="hx-hl">images</span> online, free</h1>' +
    '<p class="hx-sub">Make your JPG, PNG and WebP images smaller in seconds, still sharp and ready to share. No sign-up, no watermark, and nothing is uploaded.</p>' +
    '<ul class="hx-trust">' +
    '<li><span class="hx-ck">' + CHECK + '</span><span><b>Files stay on your device.</b> Compression happens right in your browser.</span></li>' +
    '<li><span class="hx-ck">' + CHECK + '</span><span><b>Batch compress.</b> Drop as many images as you like at once.</span></li>' +
    '<li><span class="hx-ck">' + CHECK + '</span><span><b>Free, no limits.</b> No account and no watermark.</span></li></ul></div>' +
    '<div class="hx-stage"><div class="hx-float hx-f1"><span class="hx-fi"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M6 13l6 6 6-6"/></svg></span><span><s>2.4 MB</s> &rarr; <em>380 KB</em></span></div>' +
    '<div class="hx-float hx-f2"><span class="hx-fi"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/></svg></span><span>100% private</span></div>' +
    '<div class="hx-card" id="heroTool"><noscript><p class="noscript-msg">The image compressor needs JavaScript. Please turn it on in your browser.</p></noscript></div></div></div></section>' +
    '<section class="feats"><div class="wrap"><div class="feats-g">' +
    [['Private by design', 'Your images never leave your device.', '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/>'], ['Instant results', 'No uploading and no waiting in a queue.', '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>'], ['Batch compress', 'Drop many images and save them all.', '<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>'], ['Free, no sign-up', 'No watermark and no limits.', '<rect x="3" y="8" width="18" height="13" rx="2"/><path d="M12 8v13M3 12h18M12 8c-2 0-4-1-4-3s3-2 4 3c1-5 4-5 4-3s-2 3-4 3z"/>']]
      .map(f => '<div class="feat"><span class="feat-ico"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + f[2] + '</svg></span><div><b>' + f[0] + '</b><span>' + f[1] + '</span></div></div>').join('') + '</div></div></section>' +
    '<section class="sec"><div class="wrap"><div class="sec-row"><div><span class="eyebrow">Categories</span><h2 class="sec-h">' + D.TOOLS.length + ' free tools for everyday files</h2><p class="sec-sub">Pick a category and get it done in seconds.</p></div><a class="fbtn" href="/tools">View all tools &rarr;</a></div>' +
    '<div class="cats-g">' + D.CATS.map(c => '<a class="cat-card ' + c.cls + '" href="/' + c.slug + '"><div class="cat-ico">' + D.cgl(c, 28) + '</div><h3 class="cat-nm">' + c.name + '</h3><div class="cat-cnt">' + toolsOf(c.id).length + ' tools available</div><div class="cat-pills">' + toolsOf(c.id).slice(0, 3).map(t => '<span class="cpill">' + esc(t.n) + '</span>').join('') + '</div></a>').join('') + '</div></div></section>' +
    '<section class="sec" style="padding-top:0"><div class="wrap"><div class="sec-row"><div><span class="eyebrow">Popular</span><h2 class="sec-h">Handy tools to try next</h2><p class="sec-sub">Free to use, with no account needed.</p></div></div><div class="tools-g">' + POPULAR.map(t => toolCard(t, true)).join('') + '</div></div></section>' +
    '<section class="sec" style="padding-top:0"><div class="wrap"><div class="seo-sec" style="margin-top:0"><h2 class="sec-h">Image Compressor: frequently asked questions</h2><div class="faq-grid">' + H.faq.map(q => '<div class="faq-i"><h3>' + esc(q[0]) + '</h3><p>' + esc(q[1]) + '</p></div>').join('') + '</div></div></div></section>' +
    '<section class="sec-sm"><div class="wrap"><div class="cta-band"><h2 class="cta-h">Start using free tools today</h2><p class="cta-s">No registration, no watermarks, no limits. Your files never leave your device.</p><div class="cta-btns"><a class="btn-white" href="/tools">Browse all ' + D.TOOLS.length + ' tools</a><a class="btn-out-w" href="/pdf-tools">Start with PDF tools</a></div></div></div></section>';
  const ld = [orgLd,
    { '@context': 'https://schema.org', '@type': 'WebSite', '@id': SITE + '/#website', url: SITE + '/', name: NAME, inLanguage: 'en', publisher: { '@id': ORG_ID } },
    { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Image Compressor', url: SITE + '/', description: C.tools['compress-image'].answer, applicationCategory: 'MultimediaApplication', operatingSystem: 'Any (web browser)', browserRequirements: 'Requires JavaScript', isAccessibleForFree: true, offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }, dateModified: TODAY, publisher: { '@id': ORG_ID } }, faqLd(H.faq)];
  write('index.html', shell({ title: H.title + ' | ' + NAME, desc: H.meta, path: '/', body, jsonld: ld }));
  urls.push({ path: '/', pr: '1.0' });
})();

/* tool pages */
D.TOOLS.forEach(t => {
  const c = cat(t.c), K = C.tools[t.id];
  if (!K) throw new Error('Missing content for ' + t.id);
  const crumbs = [{ name: 'Home', href: '/' }, { name: c.name, href: '/' + c.slug }, { name: t.n }];
  const related = toolsOf(t.c).filter(x => x.id !== t.id).slice(0, 6);
  const faq = K.faq.concat([[C.PRIVACY_Q[0], C.PRIVACY_Q[1].replace('{n}', t.n)]]);
  const body = '<div class="tool-pg">' + breadcrumb(crumbs) +
    '<div class="tool-hdr"><div class="tool-hdr-ico ' + c.ic + '" style="background:' + c.col[1] + '">' + D.gl(t, 30) + '</div><div><h1 class="tool-hdr-title">' + esc(t.n) + '</h1>' +
    '<p class="tool-hdr-desc">' + esc(K.answer) + '</p><div class="feat-pills"><div class="fpill"><span>&#10003;</span> Free forever</div><div class="fpill"><span>&#10003;</span> No sign-up</div><div class="fpill"><span>&#10003;</span> Files stay on your device</div></div></div></div>' +
    '<div id="toolUI"><noscript><p class="noscript-msg">This tool needs JavaScript. Please turn it on in your browser.</p></noscript></div>' +
    '<section class="seo-sec"><h2>How to use ' + esc(t.n) + '</h2><ol class="seo-steps">' + K.steps.map(s => '<li><span>' + esc(s) + '</span></li>').join('') + '</ol></section>' +
    faqBlock(t.n + ': frequently asked questions', faq) +
    '<section class="seo-sec"><h2>' + esc(t.n) + ' at a glance</h2><ul class="fact-list"><li><b>Input</b>' + esc(K.io[0]) + '</li><li><b>Output</b>' + esc(K.io[1]) + '</li><li><b>Price</b>Free, no sign-up, no watermark</li><li><b>Privacy</b>Runs in your browser; files are not uploaded</li><li><b>Last updated</b>' + TODAY_LONG + '</li></ul></section>' +
    '<section class="seo-sec"><h2>Related ' + esc(c.short.toLowerCase()) + ' tools</h2><div class="tools-g" style="grid-template-columns:repeat(auto-fill,minmax(170px,1fr))">' + related.map(r => toolCard(r, false)).join('') + '</div></section></div>';
  const ld = [{ '@context': 'https://schema.org', '@type': 'WebApplication', name: t.n, url: abs('/' + t.slug), description: K.answer, applicationCategory: (t.c === 'image' || t.c === 'video') ? 'MultimediaApplication' : 'UtilitiesApplication', operatingSystem: 'Any (web browser)', browserRequirements: 'Requires JavaScript', isAccessibleForFree: true, offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }, dateModified: TODAY, inLanguage: 'en', publisher: { '@id': ORG_ID } },
    crumbLd(crumbs.map(x => ({ name: x.name, href: x.href || '/' + t.slug }))), faqLd(faq)];
  write(t.slug + '/index.html', shell({ title: K.title + ' | ' + NAME, desc: K.meta, path: '/' + t.slug, body, jsonld: ld, bodyAttrs: 'data-tool="' + t.id + '" data-name="' + esc(t.n) + '"', needsTools: !IN_APP.has(t.id) }));
  urls.push({ path: '/' + t.slug, pr: t.id === 'compress-image' ? '0.9' : '0.8' });
});

/* category pages */
D.CATS.forEach(c => {
  const K = C.cats[c.id], list = toolsOf(c.id);
  const crumbs = [{ name: 'Home', href: '/' }, { name: c.name }];
  const body = '<section class="cat-hero"><div class="wrap">' + breadcrumb(crumbs) + '<div class="cat-ph"><div class="cat-ph-ico ' + c.cls + '" style="background:' + c.col[1] + ';color:' + c.col[0] + '">' + D.cgl(c, 34) + '</div><div>' +
    '<h1 style="font-size:clamp(1.8rem,4vw,2.5rem);margin-bottom:8px">' + esc(K.h1) + '</h1><p style="color:var(--text2);font-size:1.05rem;max-width:680px">' + esc(K.answer) + '</p>' +
    '<div style="margin-top:12px;display:flex;gap:12px;flex-wrap:wrap;font-size:.85rem"><span style="color:var(--text2)">' + list.length + ' tools available</span><span style="color:var(--sage2)">&#10003; 100% free</span><span style="color:var(--sage2)">&#10003; No sign-up</span></div></div></div></div></section>' +
    '<section class="sec-sm"><div class="wrap"><div class="tools-g">' + list.map(t => toolCard(t, false)).join('') + '</div></div></section>' +
    '<section class="sec-sm" style="padding-top:0"><div class="wrap">' + faqBlock(c.name + ': frequently asked questions', K.faq) + '</div></section>';
  const ld = [{ '@context': 'https://schema.org', '@type': 'CollectionPage', name: K.h1, url: abs('/' + c.slug), description: K.meta, isPartOf: { '@id': SITE + '/#website' }, dateModified: TODAY, mainEntity: { '@type': 'ItemList', itemListElement: list.map((t, i) => ({ '@type': 'ListItem', position: i + 1, name: t.n, url: abs('/' + t.slug) })) } },
    crumbLd([{ name: 'Home', href: '/' }, { name: c.name, href: '/' + c.slug }]), faqLd(K.faq)];
  write(c.slug + '/index.html', shell({ title: K.title + ' | ' + NAME, desc: K.meta, path: '/' + c.slug, body, jsonld: ld }));
  urls.push({ path: '/' + c.slug, pr: '0.9' });
});

/* all tools */
(function all() {
  const crumbs = [{ name: 'Home', href: '/' }, { name: 'All tools' }];
  const body = '<section class="cat-hero" style="text-align:center"><div class="wrap">' + breadcrumb(crumbs) + '<h1 style="font-size:clamp(2rem,4vw,2.8rem);margin-bottom:10px">All free online tools</h1>' +
    '<p style="color:var(--text2);font-size:1.08rem;max-width:620px;margin:0 auto 24px">' + D.TOOLS.length + ' tools for images, PDFs, videos, files and text. Every one runs in your browser, so your files stay private.</p>' +
    '<div style="max-width:480px;margin:0 auto;position:relative"><span style="position:absolute;left:16px;top:50%;transform:translateY(-50%);color:var(--text3)" aria-hidden="true">&#128269;</span><input id="allSrch" type="search" aria-label="Search all tools" style="width:100%;padding:13px 16px 13px 42px;border:1.5px solid var(--border);border-radius:32px;background:var(--bg);color:var(--text);font-size:.93rem;outline:none" placeholder="Search tools&hellip;"></div></div></section>' +
    '<section class="sec-sm"><div class="wrap"><div class="filters" id="allF"><button class="fbtn on" data-cat="all">All (' + D.TOOLS.length + ')</button>' + D.CATS.map(c => '<button class="fbtn" data-cat="' + c.id + '">' + c.name + ' (' + toolsOf(c.id).length + ')</button>').join('') + '</div>' +
    '<div class="tools-g" id="allT">' + D.TOOLS.map(t => toolCard(t, true)).join('') + '</div><p id="allNone" style="display:none;text-align:center;padding:48px;color:var(--text3)">No tools found.</p></div></section>';
  const ld = [{ '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'All free online tools', url: abs('/tools'), isPartOf: { '@id': SITE + '/#website' }, dateModified: TODAY, mainEntity: { '@type': 'ItemList', itemListElement: D.TOOLS.map((t, i) => ({ '@type': 'ListItem', position: i + 1, name: t.n, url: abs('/' + t.slug) })) } }, crumbLd([{ name: 'Home', href: '/' }, { name: 'All tools', href: '/tools' }])];
  write('tools/index.html', shell({ title: 'All ' + D.TOOLS.length + ' Free Online Tools: PDF, Image, Video | ' + NAME, desc: 'Browse all ' + D.TOOLS.length + ' free tools: image compressor, PDF merge and split, video compress and trim, ZIP, JSON and text tools. Private and no sign-up.', path: '/tools', body, jsonld: ld }));
  urls.push({ path: '/tools', pr: '0.9' });
})();

/* info pages */
Object.keys(C.pages).forEach(k => {
  const P = C.pages[k], crumbs = [{ name: 'Home', href: '/' }, { name: P.h1.replace('Contact us', 'Contact') }];
  const html = P.body.replace(/\{date\}/g, TODAY_LONG).replace(/\{email\}/g, CFG.email);
  const links = [['about', 'About'], ['privacy', 'Privacy Policy'], ['terms', 'Terms of Use'], ['contact', 'Contact'], ['blog', 'Blog']].map(l => '<li><a href="/' + l[0] + '"' + (l[0] === k ? ' aria-current="page" class="on"' : '') + '>' + l[1] + '</a></li>').join('');
  const aside = '<aside class="post-aside" aria-label="More about ' + esc(NAME) + '"><div class="aside-box"><div class="aside-t">' + esc(NAME) + '</div><ul>' + links + '</ul></div>' +
    '<a class="aside-cta" href="/tools"><b>Browse all ' + D.TOOLS.length + ' tools</b><span>Free, private, runs in your browser</span><em>Open the tools &rarr;</em></a></aside>';
  const body = '<div class="wrap blog-wrap"><div class="post-layout"><div class="prose post">' + breadcrumb(crumbs) + '<h1>' + esc(P.h1) + '</h1>' + html + '</div>' + aside + '</div></div>';
  const type = { about: 'AboutPage', contact: 'ContactPage' }[k] || 'WebPage';
  const ld = [{ '@context': 'https://schema.org', '@type': type, name: P.title, url: abs('/' + k), description: P.meta, isPartOf: { '@id': SITE + '/#website' }, dateModified: TODAY }, crumbLd([{ name: 'Home', href: '/' }, { name: crumbs[1].name, href: '/' + k }])];
  write(k + '/index.html', shell({ title: P.title + ' | ' + NAME, desc: P.meta, path: '/' + k, body, jsonld: k === 'about' ? ld.concat([orgLd]) : ld }));
  urls.push({ path: '/' + k, pr: k === 'about' ? '0.5' : '0.3' });
});

/* blog */
const POSTS = require('./blog.js').slice().sort((a, b) => b.published.localeCompare(a.published));
const longDate = d => new Date(d + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
const BLOG_AUTHOR = { '@type': 'Organization', '@id': ORG_ID, name: NAME + ' team' };
(function blog() {
  if (!POSTS.length) return;
  const crumbs = [{ name: 'Home', href: '/' }, { name: 'Blog' }];
  const list = POSTS.map(p => '<a class="post-card" href="/blog/' + p.slug + '"><span class="post-meta">' + longDate(p.published) + ' &middot; ' + p.readMin + ' min read</span><h2>' + esc(p.title) + '</h2><p>' + esc(p.answer) + '</p><span class="tc-go">Read the guide &rarr;</span></a>').join('');
  const body = '<div class="wrap prose blog-index">' + breadcrumb(crumbs) + '<h1>Blog</h1><p>Short, practical guides to working with images, PDFs and video files, from the team behind ' + esc(NAME) + '.</p><div class="post-list">' + list + '</div></div>';
  const ld = [{ '@context': 'https://schema.org', '@type': 'Blog', name: NAME + ' Blog', url: abs('/blog'), isPartOf: { '@id': SITE + '/#website' }, publisher: { '@id': ORG_ID }, blogPost: POSTS.map(p => ({ '@type': 'BlogPosting', headline: p.title, url: abs('/blog/' + p.slug), datePublished: p.published })) }, crumbLd([{ name: 'Home', href: '/' }, { name: 'Blog', href: '/blog' }])];
  write('blog/index.html', shell({ title: 'Blog: Image, PDF and Video Guides | ' + NAME, desc: 'Practical guides to compressing images, choosing file formats and working with PDFs and video, from ' + NAME + '.', path: '/blog', body, jsonld: ld }));
  urls.push({ path: '/blog', pr: '0.6', lm: POSTS[0].updated });
  POSTS.forEach(p => {
    const pc = [{ name: 'Home', href: '/' }, { name: 'Blog', href: '/blog' }, { name: p.title }];
    const tl = p.tools.map(byId).filter(Boolean);
    const toc = (p.body.match(/<h2 id="[^"]+">.*?<\/h2>/g) || []).map(h => { const m = h.match(/<h2 id="([^"]+)">(.*?)<\/h2>/); return '<li><a href="#' + m[1] + '">' + m[2].replace(/<[^>]+>/g, '') + '</a></li>'; })
      .concat(['<li><a href="#faq">Frequently asked questions</a></li>', (p.sources && p.sources.length) ? '<li><a href="#sources">Sources</a></li>' : '']).join('');
    const aside = '<aside class="post-aside" aria-label="On this page"><div class="aside-box"><div class="aside-t">On this page</div><ul>' + toc + '</ul></div>' +
      (tl[0] ? '<a class="aside-cta" href="/' + tl[0].slug + '"><b>' + esc(tl[0].n) + '</b><span>Free, private, runs in your browser</span><em>Open the tool &rarr;</em></a>' : '') + '</aside>';
    const body = '<div class="wrap blog-wrap"><div class="post-layout"><article class="prose post">' + breadcrumb(pc) + '<h1>' + esc(p.h1) + '</h1>' +
      '<p class="post-meta">By ' + esc(NAME) + ' team &middot; Published ' + longDate(p.published) + ' &middot; Updated ' + longDate(p.updated) + ' &middot; ' + p.readMin + ' min read</p>' +
      '<p class="post-lede">' + esc(p.answer) + '</p>' + p.body +
      '<h2 id="faq">Frequently asked questions</h2>' + p.faq.map(q => '<div class="faq-i"><h3>' + esc(q[0]) + '</h3><p>' + esc(q[1]) + '</p></div>').join('') +
      (p.sources && p.sources.length ? '<h2 id="sources">Sources</h2><ul>' + p.sources.map(s => '<li><a href="' + s.u + '" rel="noopener" target="_blank">' + esc(s.n) + '</a></li>').join('') + '</ul>' : '') +
      '<h2 id="try">Try it free</h2><div class="tools-g" style="grid-template-columns:repeat(auto-fill,minmax(170px,1fr))">' + tl.map(t => toolCard(t, false)).join('') + '</div></article>' + aside + '</div></div>';
    const posting = { '@context': 'https://schema.org', '@type': 'BlogPosting', headline: p.title, description: p.meta, url: abs('/blog/' + p.slug), mainEntityOfPage: { '@type': 'WebPage', '@id': abs('/blog/' + p.slug) }, datePublished: p.published, dateModified: p.updated, inLanguage: 'en', author: BLOG_AUTHOR, publisher: { '@id': ORG_ID }, isPartOf: { '@id': SITE + '/#website' } };
    if (OG) posting.image = OG;
    const ld = [posting,
      crumbLd([{ name: 'Home', href: '/' }, { name: 'Blog', href: '/blog' }, { name: p.title, href: '/blog/' + p.slug }]), faqLd(p.faq)];
    write('blog/' + p.slug + '/index.html', shell({ title: (p.seoTitle || p.title) + ' | ' + NAME, desc: p.meta, path: '/blog/' + p.slug, body, jsonld: ld, ogType: 'article' }));
    urls.push({ path: '/blog/' + p.slug, pr: '0.7', lm: p.updated });
  });
})();

/* 404 */
write('404.html', shell({ title: 'Page not found | ' + NAME, desc: 'This page could not be found. Browse our free online tools instead.', path: '/404', noindex: true,
  body: '<div class="wrap prose blog-index" style="text-align:center"><h1>Page not found</h1><p>We could not find that page. Try one of these popular tools instead.</p><div class="tools-g" style="text-align:left;margin-top:24px">' + POPULAR.slice(0, 6).map(t => toolCard(t, true)).join('') + '</div><p style="margin-top:28px"><a class="btn-dl" style="text-decoration:none;display:inline-block" href="/tools">Browse all tools</a></p></div>' }));

/* ---------- sitemap, robots, llms ---------- */
write('sitemap.xml', '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  urls.map(u => '  <url><loc>' + abs(u.path) + '</loc><lastmod>' + (u.lm || TODAY) + '</lastmod><priority>' + u.pr + '</priority></url>').join('\n') + '\n</urlset>\n');

write('robots.txt', [
  '# ' + NAME + ' - everything public is welcome to be crawled, indexed and cited.',
  'User-agent: *', 'Allow: /', 'Disallow: /vendor/', '',
  '# Search and AI-answer crawlers: allowed so the site can appear and be cited in search and AI answers',
  'User-agent: Googlebot', 'Allow: /', '', 'User-agent: Bingbot', 'Allow: /', '', 'User-agent: OAI-SearchBot', 'Allow: /', '', 'User-agent: ChatGPT-User', 'Allow: /', '',
  'User-agent: Claude-SearchBot', 'Allow: /', '', 'User-agent: Claude-User', 'Allow: /', '', 'User-agent: PerplexityBot', 'Allow: /', '', 'User-agent: Perplexity-User', 'Allow: /', '', 'User-agent: Applebot', 'Allow: /', '',
  '# Model-training crawlers are also allowed. To opt out, change Allow to Disallow for these.',
  'User-agent: GPTBot', 'Allow: /', '', 'User-agent: ClaudeBot', 'Allow: /', '', 'User-agent: Google-Extended', 'Allow: /', '', 'User-agent: Applebot-Extended', 'Allow: /', '',
  'Sitemap: ' + SITE + '/sitemap.xml', ''].join('\n'));

const catBlocks = D.CATS.map(c => '## ' + c.name + '\n' + toolsOf(c.id).map(t => '- [' + t.n + '](' + abs('/' + t.slug) + '): ' + t.d).join('\n')).join('\n\n');
write('llms.txt', '# ' + NAME + '\n\n> Free online tools for images, PDFs, videos, files and text. Every tool runs in the visitor\'s web browser, so files are processed on the user\'s own device and are not uploaded. No sign-up, no watermark.\n\n' +
  '## Key facts\n- Price: free, no account needed\n- Privacy: files are processed locally in the browser and are never uploaded to a server\n- Main tool: image compressor for JPG, PNG and WebP at ' + SITE + '/\n- Number of tools: ' + D.TOOLS.length + '\n- Contact: ' + CFG.email + '\n\n' + catBlocks +
  (POSTS.length ? '\n\n## Blog\n' + POSTS.map(p => '- [' + p.title + '](' + abs('/blog/' + p.slug) + '): ' + p.answer).join('\n') : '') +
  '\n\n## Optional\n- [About](' + abs('/about') + '): who we are and how the tools work\n- [Privacy Policy](' + abs('/privacy') + ')\n- [Full tool guide for language models](' + abs('/llms-full.txt') + ')\n');
write('llms-full.txt', '# ' + NAME + ' - full tool guide\n\nLast updated: ' + TODAY + '\n\n' + D.TOOLS.map(t => {
  const K = C.tools[t.id];
  return '## ' + t.n + '\nURL: ' + abs('/' + t.slug) + '\n' + K.answer + '\n\nHow to use:\n' + K.steps.map((s, i) => (i + 1) + '. ' + s).join('\n') + '\n\n' + K.faq.map(q => 'Q: ' + q[0] + '\nA: ' + q[1]).join('\n\n') + '\n';
}).join('\n---\n\n'));

console.log('Built ' + written.length + ' files for ' + SITE + ' (' + urls.length + ' URLs in sitemap)' + (hasOg ? '' : ' - no og-image.png found'));
