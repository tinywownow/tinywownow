/* TinyWow Now - browser-side tools (PDF, files, converters, image extras).
   Everything runs locally in the visitor's browser; libraries load on demand. */
(function () {
'use strict';

const CDN = 'https://cdnjs.cloudflare.com/ajax/libs/';
const LIBS = {
  pdflib: CDN + 'pdf-lib/1.17.1/pdf-lib.min.js',
  pdfjs: CDN + 'pdf.js/3.11.174/pdf.min.js',
  jszip: CDN + 'jszip/3.10.1/jszip.min.js',
  xlsx: CDN + 'xlsx/0.18.5/xlsx.full.min.js',
  mammoth: CDN + 'mammoth/1.6.0/mammoth.browser.min.js',
  tess: CDN + 'tesseract.js/5.1.0/tesseract.min.js',
  pptx: 'https://cdn.jsdelivr.net/npm/pptxgenjs@3.12.0/dist/pptxgen.bundle.js'
};
const PDFJS_WORKER = CDN + 'pdf.js/3.11.174/pdf.worker.min.js';
const loaded = {};
function loadScript(src) {
  return loaded[src] || (loaded[src] = new Promise((ok, no) => {
    const s = document.createElement('script');
    s.src = src; s.onload = ok;
    s.onerror = () => { delete loaded[src]; no(new Error('Could not load a required library. Check your internet connection and try again.')); };
    document.head.appendChild(s);
  }));
}
async function need() {
  for (const k of arguments) {
    await loadScript(LIBS[k]);
    if (k === 'pdfjs') window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER;
  }
}

/* ---------- helpers ---------- */
const $ = (r, s) => r.querySelector(s);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fmtSize = b => b >= 1048576 ? (b / 1048576).toFixed(2) + ' MB' : Math.max(1, Math.round(b / 1024)) + ' KB';
const baseName = n => n.replace(/\.[^.]+$/, '');
const toast = (m, ok) => window.showToast && window.showToast(m, ok === false ? 'error' : 'success');
function blobOf(bytes, type) { return new Blob([bytes], { type }); }
function dlBlob(blob, name) {
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name;
  document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000);
}
function canvasBlob(c, type, q) { return new Promise(r => c.toBlob(r, type, q)); }
function loadImage(file) {
  return new Promise((ok, no) => {
    const u = URL.createObjectURL(file), i = new Image();
    i.onload = () => { i.dataset.url = u; ok(i); };
    i.onerror = () => no(new Error(file.name + ' is not a readable image.'));
    i.src = u;
  });
}
function parseRanges(str, n) {
  const out = new Set();
  String(str || '').split(',').map(s => s.trim()).filter(Boolean).forEach(part => {
    const m = part.match(/^(\d+)(?:\s*-\s*(\d+))?$/);
    if (!m) throw new Error('Invalid page range: "' + part + '". Use a format like 1-3, 5, 8-10.');
    let a = +m[1], b = m[2] ? +m[2] : a;
    if (a > b) [a, b] = [b, a];
    if (a < 1 || b > n) throw new Error('Page range ' + part + ' is outside this document (1-' + n + ').');
    for (let i = a; i <= b; i++) out.add(i - 1);
  });
  return [...out].sort((x, y) => x - y);
}
async function loadPdfLib(file) {
  await need('pdflib');
  const buf = await file.arrayBuffer();
  try { return await PDFLib.PDFDocument.load(buf); }
  catch (e) {
    if (/encrypt/i.test(e.message)) throw new Error(file.name + ' is password protected, so it cannot be processed here.');
    throw new Error(file.name + ' could not be read as a PDF.');
  }
}
async function openPdfJs(file) {
  await need('pdfjs');
  const data = new Uint8Array(await file.arrayBuffer());
  try { return await pdfjsLib.getDocument({ data }).promise; }
  catch (e) {
    if (e && e.name === 'PasswordException') throw new Error(file.name + ' is password protected, so it cannot be processed here.');
    throw new Error(file.name + ' could not be read as a PDF.');
  }
}
async function renderPdfPage(page, scale) {
  const vp = page.getViewport({ scale });
  const c = document.createElement('canvas');
  c.width = Math.ceil(vp.width); c.height = Math.ceil(vp.height);
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, c.width, c.height);
  /* intent 'print' avoids requestAnimationFrame, so rendering also continues in background tabs */
  await page.render({ canvasContext: ctx, viewport: vp, intent: 'print' }).promise;
  return c;
}
/* Group PDF text into lines with x/y positions. */
async function pageLines(page) {
  const tc = await page.getTextContent();
  const items = tc.items.filter(i => i.str && i.str.trim() !== '')
    .map(i => ({ x: i.transform[4], y: i.transform[5], w: i.width, h: Math.abs(i.transform[3]) || 10, s: i.str }));
  items.sort((a, b) => b.y - a.y || a.x - b.x);
  const lines = [];
  for (const it of items) {
    const L = lines[lines.length - 1];
    if (L && Math.abs(L.y - it.y) <= Math.max(2, it.h * 0.4)) L.items.push(it);
    else lines.push({ y: it.y, h: it.h, items: [it] });
  }
  lines.forEach(l => l.items.sort((a, b) => a.x - b.x));
  return lines;
}
function lineText(l) {
  let out = '', prev = null;
  for (const it of l.items) {
    if (prev && it.x - (prev.x + prev.w) > prev.h * 0.15 && !prev.s.endsWith(' ') && !it.s.startsWith(' ')) out += ' ';
    out += it.s; prev = it;
  }
  return out;
}
function lineCells(l) {
  const cells = []; let cur = '', prev = null;
  for (const it of l.items) {
    if (prev && it.x - (prev.x + prev.w) > prev.h * 1.4) { cells.push(cur.trim()); cur = ''; }
    else if (prev && it.x - (prev.x + prev.w) > prev.h * 0.15 && !prev.s.endsWith(' ') && !it.s.startsWith(' ')) cur += ' ';
    cur += it.s; prev = it;
  }
  cells.push(cur.trim());
  return cells;
}
function latin(s) { return String(s).replace(/\t/g, '    ').replace(/[^\x20-\x7E\xA0-\xFF]/g, '?'); }
function wrapText(text, font, size, maxW) {
  const out = [];
  String(text).split(/\r?\n/).forEach(par => {
    if (!par.trim()) { out.push(''); return; }
    let line = '';
    par.split(/\s+/).forEach(w => {
      const t = line ? line + ' ' + w : w;
      if (font.widthOfTextAtSize(t, size) <= maxW) line = t;
      else {
        if (line) out.push(line);
        while (font.widthOfTextAtSize(w, size) > maxW) {
          let k = w.length; while (k > 1 && font.widthOfTextAtSize(w.slice(0, k), size) > maxW) k--;
          out.push(w.slice(0, k)); w = w.slice(k);
        }
        line = w;
      }
    });
    out.push(line);
  });
  return out;
}
async function textToPdf(text, title) {
  await need('pdflib');
  const { PDFDocument, StandardFonts, rgb } = PDFLib;
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const W = 595.28, H = 841.89, M = 56, size = 11, lh = 15;
  const lines = wrapText(latin(text), font, size, W - 2 * M);
  let page = doc.addPage([W, H]), y = H - M;
  for (const ln of lines) {
    if (y < M) { page = doc.addPage([W, H]); y = H - M; }
    if (ln) page.drawText(ln, { x: M, y, size, font, color: rgb(0.1, 0.1, 0.1) });
    y -= lh;
  }
  if (title) doc.setTitle(latin(title));
  return doc.save();
}

/* ---------- generic tool UI ---------- */
const CSS = `
.tf-list{display:flex;flex-direction:column;gap:8px;margin:0 0 18px}
.tf-row{display:flex;align-items:center;gap:12px;background:var(--surface);border:1.5px solid var(--border);border-radius:14px;padding:10px 12px}
.tf-ic{width:36px;height:36px;border-radius:10px;background:var(--sagebg);color:var(--sage3);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:.7rem;font-weight:800}
.tf-nm{flex:1;min-width:0;font-weight:600;font-size:.9rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.tf-nm span{display:block;font-weight:400;font-size:.75rem;color:var(--text3)}
.tf-btn{width:30px;height:30px;border-radius:8px;background:var(--surface2);color:var(--text2);font-size:.85rem;flex-shrink:0}
.tf-btn:hover{background:var(--sagebg);color:var(--sage3)}
.tf-btn.rm:hover{background:var(--redbg);color:var(--red)}
.tf-err{display:none;background:var(--redbg);border:1px solid var(--redborder);color:var(--red);border-radius:12px;padding:12px 16px;font-size:.9rem;margin-bottom:20px}
.tf-err.show{display:block}
.tf-prog{display:none;margin-bottom:20px}
.tf-prog.show{display:block}
.tf-res{display:flex;align-items:center;gap:12px;padding:10px 0;border-top:1px solid var(--bordersoft)}
.tf-res:first-of-type{border-top:0}
.tf-note{font-size:.82rem;color:var(--text2);background:var(--amberbg);border-radius:10px;padding:9px 13px;margin-bottom:12px}
.tf-txt{width:100%;min-height:150px;margin-top:12px;padding:12px;border:1.5px solid var(--border);border-radius:12px;background:var(--bg);color:var(--text);font-size:.88rem;font-family:inherit;resize:vertical}
.tf-in{width:100%;padding:9px 11px;border:1.5px solid var(--border);border-radius:9px;background:var(--bg);color:var(--text);font-size:.9rem;outline:none;font-family:inherit}
.tf-in:focus{border-color:var(--sage)}
.tf-sig{border:1.5px dashed var(--sageborder);border-radius:14px;background:#fff;touch-action:none;cursor:crosshair;width:100%;max-width:520px;height:150px;display:block}
.cr-stage{position:relative;display:inline-block;max-width:100%;overflow:hidden;border-radius:14px;line-height:0;touch-action:none;user-select:none;margin-bottom:16px}
.cr-stage img{max-width:100%;max-height:520px;display:block}
.cr-box{position:absolute;border:2px solid #fff;box-shadow:0 0 0 9999px rgba(0,0,0,.5);cursor:move}
.cr-box i{position:absolute;width:16px;height:16px;background:#fff;border:2px solid var(--sage3);border-radius:50%}
.cr-box i[data-h=nw]{left:-9px;top:-9px;cursor:nwse-resize}.cr-box i[data-h=ne]{right:-9px;top:-9px;cursor:nesw-resize}
.cr-box i[data-h=sw]{left:-9px;bottom:-9px;cursor:nesw-resize}.cr-box i[data-h=se]{right:-9px;bottom:-9px;cursor:nwse-resize}
`;
function injectCss() {
  if (document.getElementById('tf-css')) return;
  const s = document.createElement('style'); s.id = 'tf-css'; s.textContent = CSS; document.head.appendChild(s);
}
const UP_ICO = '<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 16V4M7 9l5-5 5 5"/><path d="M4 16v2.5A1.5 1.5 0 0 0 5.5 20h13a1.5 1.5 0 0 0 1.5-1.5V16"/></svg>';

function render(ui, t) {
  injectCss();
  const cfg = TOOLS[t.id];
  if (cfg.custom) return cfg.custom(ui, t);
  const files = [];
  const exts = cfg.exts || [];
  ui.innerHTML = `
    <div class="upload cz-drop" id="tfDrop" tabindex="0" role="button" aria-label="Choose files">
      <input type="file" class="hidden-file" id="tfIn" accept="${cfg.accept}" ${cfg.multiple ? 'multiple' : ''}>
      <div class="cz-up-ico">${UP_ICO}</div>
      <div class="up-title">${cfg.title || 'Drop your file here'}</div>
      <div class="up-sub">${cfg.sub || (cfg.multiple ? 'You can select several files' : 'or click to browse')}</div>
      <span class="cz-pick">${cfg.multiple ? 'Choose files' : 'Choose file'}</span>
      <div class="up-fmts">${exts.map(f => `<span class="fmt">${f}</span>`).join('')}</div>
    </div>
    <div class="tf-list" id="tfList"></div>
    ${cfg.opts ? `<div class="opts" id="tfOpts"><div class="opts-t">Options</div>${cfg.opts}</div>` : ''}
    <button class="act-btn" id="tfGo" disabled>${cfg.label || t.n}</button>
    <div class="tf-prog" id="tfProg"><div class="prog-wrap"><div class="prog-bar" id="tfBar"></div></div><div id="tfMsg" style="font-size:.8rem;color:var(--text3);text-align:center;margin-top:5px">Working…</div></div>
    <div class="tf-err" id="tfErr"></div>
    <div class="output" id="tfOut"></div>`;
  const drop = $(ui, '#tfDrop'), inp = $(ui, '#tfIn'), list = $(ui, '#tfList'), go = $(ui, '#tfGo'),
    prog = $(ui, '#tfProg'), bar = $(ui, '#tfBar'), msg = $(ui, '#tfMsg'), err = $(ui, '#tfErr'), out = $(ui, '#tfOut');
  let urls = [];
  const o = {
    v: id => { const e = $(ui, '#' + id); return e ? e.value : ''; },
    n: id => parseFloat(o.v(id)),
    prog: (p, m) => { bar.style.width = Math.round(p * 100) + '%'; if (m) msg.textContent = m; },
    root: ui
  };
  const okFile = f => !exts.length || exts.some(e => f.name.toLowerCase().endsWith(e.toLowerCase()));
  function showErr(m) { err.textContent = m; err.classList.add('show'); }
  function drawList() {
    list.innerHTML = files.map((f, i) => `<div class="tf-row" data-i="${i}">
      <div class="tf-ic">${esc((f.name.split('.').pop() || '').slice(0, 4).toUpperCase())}</div>
      <div class="tf-nm">${esc(f.name)}<span>${fmtSize(f.size)}</span></div>
      ${cfg.sortable && files.length > 1 ? `<button class="tf-btn" data-up="${i}" aria-label="Move up" ${i === 0 ? 'disabled' : ''}>↑</button><button class="tf-btn" data-dn="${i}" aria-label="Move down" ${i === files.length - 1 ? 'disabled' : ''}>↓</button>` : ''}
      <button class="tf-btn rm" data-rm="${i}" aria-label="Remove">✕</button></div>`).join('');
    go.disabled = files.length < (cfg.min || 1);
    if (cfg.onFiles) cfg.onFiles(files, o);
  }
  function add(fl) {
    err.classList.remove('show');
    const good = [...fl].filter(okFile);
    if (good.length < fl.length) showErr('Some files were skipped. Supported: ' + exts.join(', '));
    if (!good.length) return;
    if (cfg.multiple) files.push(...good); else { files.length = 0; files.push(good[0]); }
    drawList();
  }
  drop.onclick = () => inp.click();
  drop.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); inp.click(); } };
  drop.ondragover = e => { e.preventDefault(); drop.classList.add('drag'); };
  drop.ondragleave = () => drop.classList.remove('drag');
  drop.ondrop = e => { e.preventDefault(); drop.classList.remove('drag'); add(e.dataTransfer.files); };
  inp.onchange = () => { add(inp.files); inp.value = ''; };
  list.onclick = e => {
    const u = e.target.closest('[data-up]'), d = e.target.closest('[data-dn]'), r = e.target.closest('[data-rm]');
    if (u) { const i = +u.dataset.up;[files[i - 1], files[i]] = [files[i], files[i - 1]]; }
    else if (d) { const i = +d.dataset.dn;[files[i + 1], files[i]] = [files[i], files[i + 1]]; }
    else if (r) files.splice(+r.dataset.rm, 1);
    else return;
    drawList();
  };
  if (cfg.init) cfg.init(ui, o);
  go.onclick = async () => {
    err.classList.remove('show'); out.classList.remove('show'); out.innerHTML = '';
    urls.forEach(URL.revokeObjectURL); urls = [];
    go.disabled = true; prog.classList.add('show'); o.prog(0.02, 'Preparing…');
    const label = go.innerHTML; go.innerHTML = '<div class="spin"></div> Working…';
    try {
      const res = await cfg.run(files.slice(), o);
      showResults(res);
      toast('Done!');
    } catch (e) {
      console.error(e); showErr(e && e.message ? e.message : 'Something went wrong. Please try another file.');
    } finally {
      prog.classList.remove('show'); go.innerHTML = label; go.disabled = files.length < (cfg.min || 1);
    }
  };
  function showResults(res) {
    res = res.filter(Boolean);
    const notes = res.filter(r => r.note).map(r => `<div class="tf-note">${esc(r.note)}</div>`).join('');
    const items = res.filter(r => r.blob);
    out.innerHTML = `<div class="out-hdr"><span class="out-title">Done: ${items.length} file${items.length === 1 ? '' : 's'} ready</span>
      ${items.length > 1 ? '<button class="btn-dl" id="tfZip">Download all (ZIP)</button>' : ''}</div>${notes}
      ${items.map((r, i) => `<div class="tf-res">
        <div class="tf-ic">${esc((r.name.split('.').pop() || '').slice(0, 4).toUpperCase())}</div>
        <div class="tf-nm">${esc(r.name)}<span>${fmtSize(r.blob.size)}${r.info ? ' · ' + esc(r.info) : ''}</span></div>
        <button class="btn-dl" data-dl="${i}">Download</button></div>
        ${r.text !== undefined ? `<textarea class="tf-txt" readonly>${esc(r.text)}</textarea><button class="btn-dl" data-cp="${i}" style="margin-top:8px">Copy text</button>` : ''}`).join('')}`;
    out.classList.add('show');
    out.onclick = async e => {
      const d = e.target.closest('[data-dl]'), c = e.target.closest('[data-cp]'), z = e.target.closest('#tfZip');
      if (d) dlBlob(items[+d.dataset.dl].blob, items[+d.dataset.dl].name);
      if (c) { try { await navigator.clipboard.writeText(items[+c.dataset.cp].text); toast('Copied!'); } catch (x) { toast('Could not copy', false); } }
      if (z) {
        try {
          await need('jszip'); const zip = new JSZip();
          items.forEach(r => zip.file(r.name, r.blob));
          dlBlob(await zip.generateAsync({ type: 'blob' }), (cfg.zipName || 'tinywownow-files') + '.zip');
        } catch (x) { toast('Could not create ZIP', false); }
      }
    };
    out.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

/* ---------- tool definitions ---------- */
const TOOLS = {};
const PDF = { accept: '.pdf,application/pdf', exts: ['.pdf'] };
const IMG = { accept: 'image/*', exts: ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.bmp'] };
const sel = (id, label, opts, extra) => `<div class="opt-row"><span class="opt-lbl">${label}</span><select class="opt-sel" id="${id}">${opts.map(o => `<option value="${o[0]}">${o[1]}</option>`).join('')}</select></div>${extra || ''}`;
const txt = (id, label, ph, val) => `<div class="opt-row"><span class="opt-lbl">${label}</span><input class="opt-inp" id="${id}" placeholder="${ph || ''}" value="${val || ''}"></div>`;

TOOLS['merge-pdf'] = Object.assign({}, PDF, {
  multiple: true, min: 2, sortable: true, title: 'Drop PDF files here', sub: 'Add at least 2 files. Use the arrows to set the order.', label: 'Merge PDF',
  zipName: 'merged',
  async run(files, o) {
    await need('pdflib');
    const out = await PDFLib.PDFDocument.create();
    for (let i = 0; i < files.length; i++) {
      o.prog(i / files.length, 'Merging ' + files[i].name);
      const d = await loadPdfLib(files[i]);
      (await out.copyPages(d, d.getPageIndices())).forEach(p => out.addPage(p));
    }
    const b = await out.save();
    return [{ name: 'merged.pdf', blob: blobOf(b, 'application/pdf'), info: out.getPageCount() + ' pages' }];
  }
});

TOOLS['split-pdf'] = Object.assign({}, PDF, {
  label: 'Split PDF', zipName: 'split-pages',
  opts: sel('o_mode', 'Split mode', [['each', 'Every page as its own PDF'], ['range', 'Extract page ranges into one PDF']]) + txt('o_range', 'Pages', 'e.g. 1-3, 5, 8-10 (for "Extract" mode)'),
  async run(files, o) {
    const src = await loadPdfLib(files[0]), n = src.getPageCount(), base = baseName(files[0].name);
    if (o.v('o_mode') === 'range') {
      const idx = parseRanges(o.v('o_range'), n);
      if (!idx.length) throw new Error('Enter the pages you want to extract, for example 1-3, 5.');
      const d = await PDFLib.PDFDocument.create();
      (await d.copyPages(src, idx)).forEach(p => d.addPage(p));
      return [{ name: base + '-pages.pdf', blob: blobOf(await d.save(), 'application/pdf'), info: idx.length + ' pages' }];
    }
    if (n < 2) throw new Error('This PDF has only one page.');
    const res = [];
    for (let i = 0; i < n; i++) {
      o.prog(i / n, 'Page ' + (i + 1) + ' of ' + n);
      const d = await PDFLib.PDFDocument.create();
      (await d.copyPages(src, [i])).forEach(p => d.addPage(p));
      res.push({ name: base + '-page-' + (i + 1) + '.pdf', blob: blobOf(await d.save(), 'application/pdf') });
    }
    return res;
  }
});

TOOLS['rotate-pdf'] = Object.assign({}, PDF, {
  label: 'Rotate PDF',
  opts: sel('o_ang', 'Rotate', [['90', '90° clockwise'], ['180', '180°'], ['270', '90° counter-clockwise']]) + txt('o_pages', 'Pages', 'All pages (or e.g. 1-3, 5)'),
  async run(files, o) {
    const d = await loadPdfLib(files[0]), n = d.getPageCount();
    const idx = o.v('o_pages').trim() ? parseRanges(o.v('o_pages'), n) : d.getPageIndices();
    const a = parseInt(o.v('o_ang'));
    idx.forEach(i => { const p = d.getPage(i); p.setRotation(PDFLib.degrees((p.getRotation().angle + a) % 360)); });
    return [{ name: baseName(files[0].name) + '-rotated.pdf', blob: blobOf(await d.save(), 'application/pdf'), info: idx.length + ' pages rotated' }];
  }
});

TOOLS['jpg-to-pdf'] = Object.assign({}, IMG, {
  multiple: true, sortable: true, title: 'Drop images here', label: 'Create PDF', zipName: 'pdf',
  opts: sel('o_size', 'Page size', [['a4', 'A4 (fit image, with margin)'], ['fit', 'Same size as each image']]),
  async run(files, o) {
    await need('pdflib');
    const doc = await PDFLib.PDFDocument.create();
    for (let i = 0; i < files.length; i++) {
      o.prog(i / files.length, 'Adding ' + files[i].name);
      const f = files[i], img = await loadImage(f);
      let bytes, emb;
      if (/jpe?g$/i.test(f.name) || f.type === 'image/jpeg') { bytes = new Uint8Array(await f.arrayBuffer()); emb = await doc.embedJpg(bytes); }
      else {
        const c = document.createElement('canvas'); c.width = img.naturalWidth; c.height = img.naturalHeight;
        c.getContext('2d').drawImage(img, 0, 0);
        emb = await doc.embedPng(new Uint8Array(await (await canvasBlob(c, 'image/png')).arrayBuffer()));
      }
      URL.revokeObjectURL(img.dataset.url);
      const w = emb.width, h = emb.height;
      if (o.v('o_size') === 'fit') { doc.addPage([w, h]).drawImage(emb, { x: 0, y: 0, width: w, height: h }); }
      else {
        const land = w > h, PW = land ? 841.89 : 595.28, PH = land ? 595.28 : 841.89, M = 28;
        const s = Math.min((PW - 2 * M) / w, (PH - 2 * M) / h), dw = w * s, dh = h * s;
        doc.addPage([PW, PH]).drawImage(emb, { x: (PW - dw) / 2, y: (PH - dh) / 2, width: dw, height: dh });
      }
    }
    return [{ name: 'images.pdf', blob: blobOf(await doc.save(), 'application/pdf'), info: files.length + ' pages' }];
  }
});

TOOLS['watermark-pdf'] = Object.assign({}, PDF, {
  label: 'Add watermark',
  opts: txt('o_text', 'Text', 'e.g. CONFIDENTIAL', 'CONFIDENTIAL') +
    sel('o_op', 'Opacity', [['0.15', 'Light'], ['0.3', 'Medium'], ['0.5', 'Strong']]) +
    sel('o_rot', 'Angle', [['45', 'Diagonal (45°)'], ['0', 'Horizontal']]) +
    '<p class="up-sub">The watermark supports standard Latin characters.</p>',
  async run(files, o) {
    const text = latin(o.v('o_text').trim());
    if (!text) throw new Error('Enter the watermark text.');
    const d = await loadPdfLib(files[0]);
    const font = await d.embedFont(PDFLib.StandardFonts.HelveticaBold);
    const rot = parseFloat(o.v('o_rot')), th = rot * Math.PI / 180, op = parseFloat(o.v('o_op'));
    d.getPages().forEach(p => {
      const { width, height } = p.getSize();
      let size = Math.min(width, height) / 8; const maxW = (rot ? Math.hypot(width, height) : width) * 0.7;
      while (font.widthOfTextAtSize(text, size) > maxW && size > 8) size -= 2;
      const tw = font.widthOfTextAtSize(text, size), a = tw / 2, b = size * 0.35;
      const x = width / 2 - (a * Math.cos(th) - b * Math.sin(th)), y = height / 2 - (a * Math.sin(th) + b * Math.cos(th));
      p.drawText(text, { x, y, size, font, color: PDFLib.rgb(0.45, 0.45, 0.45), opacity: op, rotate: PDFLib.degrees(rot) });
    });
    return [{ name: baseName(files[0].name) + '-watermarked.pdf', blob: blobOf(await d.save(), 'application/pdf') }];
  }
});

TOOLS['sign-pdf'] = Object.assign({}, PDF, {
  label: 'Sign PDF',
  opts: '<div class="opt-row" style="align-items:flex-start;flex-direction:column"><span class="opt-lbl">Draw your signature</span><canvas class="tf-sig" id="o_sig" width="1040" height="300"></canvas><button type="button" class="conv-btn" id="o_sigclr" style="margin-top:8px">Clear</button></div>' +
    sel('o_where', 'Pages', [['last', 'Last page'], ['first', 'First page'], ['all', 'All pages']]) +
    sel('o_pos', 'Position', [['br', 'Bottom right'], ['bl', 'Bottom left'], ['bc', 'Bottom centre'], ['c', 'Centre']]) +
    sel('o_sz', 'Size', [['0.22', 'Small'], ['0.32', 'Medium'], ['0.45', 'Large']]),
  init(ui) {
    const c = $(ui, '#o_sig'), ctx = c.getContext('2d'); let down = false, box = null;
    ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = '#14213d';
    const pt = e => { const r = c.getBoundingClientRect(); return [(e.clientX - r.left) * c.width / r.width, (e.clientY - r.top) * c.height / r.height]; };
    const grow = (x, y) => { box = box ? [Math.min(box[0], x), Math.min(box[1], y), Math.max(box[2], x), Math.max(box[3], y)] : [x, y, x, y]; c._box = box; };
    c.onpointerdown = e => { down = true; c.setPointerCapture(e.pointerId); const [x, y] = pt(e); ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + .1, y + .1); ctx.stroke(); grow(x, y); };
    c.onpointermove = e => { if (!down) return; const [x, y] = pt(e); ctx.lineTo(x, y); ctx.stroke(); grow(x, y); };
    c.onpointerup = c.onpointercancel = () => { down = false; };
    $(ui, '#o_sigclr').onclick = () => { ctx.clearRect(0, 0, c.width, c.height); box = null; c._box = null; };
  },
  async run(files, o) {
    const c = $(o.root, '#o_sig'), b = c._box;
    if (!b || (b[2] - b[0] < 8 && b[3] - b[1] < 8)) throw new Error('Draw your signature in the box first.');
    const pad = 10, sx = Math.max(0, b[0] - pad), sy = Math.max(0, b[1] - pad), sw = Math.min(c.width, b[2] + pad) - sx, sh = Math.min(c.height, b[3] + pad) - sy;
    const t = document.createElement('canvas'); t.width = sw; t.height = sh; t.getContext('2d').drawImage(c, sx, sy, sw, sh, 0, 0, sw, sh);
    const d = await loadPdfLib(files[0]);
    const png = await d.embedPng(new Uint8Array(await (await canvasBlob(t, 'image/png')).arrayBuffer()));
    const pages = d.getPages(), where = o.v('o_where');
    const targets = where === 'all' ? pages : where === 'first' ? [pages[0]] : [pages[pages.length - 1]];
    targets.forEach(p => {
      const { width, height } = p.getSize(), w = width * parseFloat(o.v('o_sz')), h = w * sh / sw, m = 36;
      const pos = o.v('o_pos');
      const x = pos === 'bl' ? m : pos === 'bc' ? (width - w) / 2 : pos === 'c' ? (width - w) / 2 : width - w - m;
      const y = pos === 'c' ? (height - h) / 2 : m;
      p.drawImage(png, { x, y, width: w, height: h });
    });
    return [{ name: baseName(files[0].name) + '-signed.pdf', blob: blobOf(await d.save(), 'application/pdf') }];
  }
});

function pdfToImages(type, ext) {
  return Object.assign({}, PDF, {
    label: 'Convert to ' + ext.toUpperCase(), zipName: 'pdf-pages',
    opts: sel('o_q', 'Quality', [['1.5', 'Standard'], ['2', 'High (larger files)'], ['1', 'Small']]) + txt('o_pages', 'Pages', 'All pages (or e.g. 1-3, 5)'),
    async run(files, o) {
      const pdf = await openPdfJs(files[0]), n = pdf.numPages, base = baseName(files[0].name);
      const idx = o.v('o_pages').trim() ? parseRanges(o.v('o_pages'), n) : [...Array(n).keys()];
      const res = [];
      for (let k = 0; k < idx.length; k++) {
        o.prog(k / idx.length, 'Page ' + (idx[k] + 1) + ' of ' + n);
        const c = await renderPdfPage(await pdf.getPage(idx[k] + 1), parseFloat(o.v('o_q')));
        res.push({ name: base + '-page-' + (idx[k] + 1) + '.' + ext, blob: await canvasBlob(c, type, 0.92), info: c.width + '×' + c.height });
      }
      return res;
    }
  });
}
TOOLS['pdf-to-jpg'] = pdfToImages('image/jpeg', 'jpg');
TOOLS['pdf-to-png'] = pdfToImages('image/png', 'png');

TOOLS['pdf-to-text'] = Object.assign({}, PDF, {
  label: 'Extract text',
  async run(files, o) {
    const pdf = await openPdfJs(files[0]); let all = [];
    for (let i = 1; i <= pdf.numPages; i++) {
      o.prog(i / pdf.numPages, 'Page ' + i + ' of ' + pdf.numPages);
      const lines = await pageLines(await pdf.getPage(i));
      all.push(lines.map(lineText).join('\n'));
    }
    const text = all.join('\n\n').trim();
    if (!text) throw new Error('No selectable text found. This looks like a scanned PDF. Export its pages as images and use Image to Text instead.');
    return [{ name: baseName(files[0].name) + '.txt', blob: blobOf(text, 'text/plain;charset=utf-8'), text }];
  }
});

TOOLS['compress-pdf'] = Object.assign({}, PDF, {
  label: 'Compress PDF',
  opts: sel('o_lvl', 'Compression', [['rec', 'Recommended'], ['strong', 'Strong (smallest)'], ['light', 'Light (best quality)']]) +
    '<p class="up-sub">Pages are re-rendered as images, so text in the compressed file is no longer selectable. Best for scanned documents and image-heavy PDFs.</p>',
  async run(files, o) {
    const f = files[0], pdf = await openPdfJs(f), n = pdf.numPages;
    const L = { rec: [1.4, 0.7], strong: [1.0, 0.5], light: [2, 0.85] }[o.v('o_lvl')];
    await need('pdflib');
    const out = await PDFLib.PDFDocument.create();
    for (let i = 1; i <= n; i++) {
      o.prog(i / n, 'Page ' + i + ' of ' + n);
      const page = await pdf.getPage(i), v1 = page.getViewport({ scale: 1 });
      const c = await renderPdfPage(page, L[0]);
      const jpg = await out.embedJpg(new Uint8Array(await (await canvasBlob(c, 'image/jpeg', L[1])).arrayBuffer()));
      out.addPage([v1.width, v1.height]).drawImage(jpg, { x: 0, y: 0, width: v1.width, height: v1.height });
    }
    const blob = blobOf(await out.save(), 'application/pdf');
    if (blob.size >= f.size) return [{ name: f.name, blob: f, note: 'This PDF is already well optimised, so a smaller file could not be made. The original is returned unchanged.', info: 'unchanged' }];
    return [{ name: baseName(f.name) + '-compressed.pdf', blob, info: fmtSize(f.size) + ' → ' + fmtSize(blob.size) + ' (−' + Math.round((1 - blob.size / f.size) * 100) + '%)' }];
  }
});

TOOLS['pdf-to-word'] = Object.assign({}, PDF, {
  label: 'Convert to Word',
  opts: '<p class="up-sub">Extracts the text into an editable .docx. Layout, images and fonts are not preserved.</p>',
  async run(files, o) {
    const pdf = await openPdfJs(files[0]); await need('jszip');
    const x = s => s.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c])).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '');
    let body = '', any = false;
    for (let i = 1; i <= pdf.numPages; i++) {
      o.prog(i / pdf.numPages, 'Page ' + i + ' of ' + pdf.numPages);
      const lines = await pageLines(await pdf.getPage(i));
      const gaps = lines.slice(1).map((l, k) => lines[k].y - l.y).filter(g => g > 0).sort((a, b) => a - b), med = gaps.length ? gaps[Math.floor(gaps.length / 2)] : 12;
      lines.forEach((l, k) => {
        if (k && lines[k - 1].y - l.y > med * 1.7) body += '<w:p/>';
        any = true; body += `<w:p><w:r><w:t xml:space="preserve">${x(lineText(l))}</w:t></w:r></w:p>`;
      });
      if (i < pdf.numPages) body += '<w:p><w:r><w:br w:type="page"/></w:r></w:p>';
    }
    if (!any) throw new Error('No selectable text found. This looks like a scanned PDF.');
    const zip = new JSZip();
    zip.file('[Content_Types].xml', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>');
    zip.file('_rels/.rels', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>');
    zip.file('word/document.xml', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>' + body + '<w:sectPr/></w:body></w:document>');
    const blob = await zip.generateAsync({ type: 'blob', mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    return [{ name: baseName(files[0].name) + '.docx', blob }];
  }
});

TOOLS['pdf-to-excel'] = Object.assign({}, PDF, {
  label: 'Convert to Excel',
  opts: '<p class="up-sub">Works best on PDFs that contain simple text tables. Each page becomes a sheet.</p>',
  async run(files, o) {
    const pdf = await openPdfJs(files[0]); await need('xlsx');
    const wb = XLSX.utils.book_new(); let rows = 0;
    for (let i = 1; i <= pdf.numPages; i++) {
      o.prog(i / pdf.numPages, 'Page ' + i + ' of ' + pdf.numPages);
      const lines = await pageLines(await pdf.getPage(i));
      if (!lines.length) continue;
      const aoa = lines.map(lineCells); rows += aoa.length;
      XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(aoa), 'Page ' + i);
    }
    if (!rows) throw new Error('No selectable text found in this PDF.');
    const blob = blobOf(XLSX.write(wb, { bookType: 'xlsx', type: 'array' }), 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    return [{ name: baseName(files[0].name) + '.xlsx', blob, info: rows + ' rows' }];
  }
});

TOOLS['pdf-to-ppt'] = Object.assign({}, PDF, {
  label: 'Convert to PowerPoint',
  opts: '<p class="up-sub">Each page becomes a slide image. Text on the slides is not editable.</p>',
  async run(files, o) {
    const pdf = await openPdfJs(files[0]); await need('pptx');
    const first = (await pdf.getPage(1)).getViewport({ scale: 1 }), W = 10, H = W * first.height / first.width;
    const ppt = new PptxGenJS(); ppt.defineLayout({ name: 'PDF', width: W, height: H }); ppt.layout = 'PDF';
    for (let i = 1; i <= pdf.numPages; i++) {
      o.prog(i / pdf.numPages, 'Page ' + i + ' of ' + pdf.numPages);
      const c = await renderPdfPage(await pdf.getPage(i), 1.6);
      ppt.addSlide().addImage({ data: c.toDataURL('image/jpeg', 0.85), x: 0, y: 0, w: W, h: H });
    }
    const blob = await ppt.write({ outputType: 'blob' });
    return [{ name: baseName(files[0].name) + '.pptx', blob, info: pdf.numPages + ' slides' }];
  }
});

TOOLS['word-to-pdf'] = {
  accept: '.docx', exts: ['.docx'], label: 'Convert to PDF',
  opts: '<p class="up-sub">Converts the text of a .docx into a PDF. Images, tables and fancy formatting are not kept. Older .doc files are not supported.</p>',
  async run(files, o) {
    await need('mammoth');
    const r = await mammoth.extractRawText({ arrayBuffer: await files[0].arrayBuffer() });
    if (!r.value.trim()) throw new Error('No text was found in this document.');
    return [{ name: baseName(files[0].name) + '.pdf', blob: blobOf(await textToPdf(r.value, baseName(files[0].name)), 'application/pdf') }];
  }
};

TOOLS['excel-to-pdf'] = {
  accept: '.xlsx,.xls,.csv,.ods', exts: ['.xlsx', '.xls', '.csv', '.ods'], label: 'Convert to PDF',
  opts: '<p class="up-sub">Draws each sheet as a table. Only Latin characters are supported, and very wide tables are shortened to fit the page.</p>',
  async run(files, o) {
    await need('xlsx', 'pdflib');
    const wb = XLSX.read(await files[0].arrayBuffer(), { type: 'array' });
    const doc = await PDFLib.PDFDocument.create(), font = await doc.embedFont(PDFLib.StandardFonts.Helvetica), bold = await doc.embedFont(PDFLib.StandardFonts.HelveticaBold);
    const W = 841.89, H = 595.28, M = 30, size = 8, rh = 13; let pages = 0;
    for (const name of wb.SheetNames) {
      const aoa = XLSX.utils.sheet_to_json(wb.Sheets[name], { header: 1, defval: '' }).slice(0, 5000);
      if (!aoa.length) continue;
      const cols = Math.max(...aoa.map(r => r.length)); if (!cols) continue;
      let widths = [...Array(cols).keys()].map(c => Math.min(160, Math.max(30, ...aoa.slice(0, 200).map(r => font.widthOfTextAtSize(latin(r[c] === undefined ? '' : r[c]), size) + 10))));
      const total = widths.reduce((a, b) => a + b, 0), avail = W - 2 * M;
      if (total > avail) widths = widths.map(w => w * avail / total);
      let page = doc.addPage([W, H]), y = H - M; pages++;
      page.drawText(latin(name), { x: M, y, size: 10, font: bold }); y -= 20;
      for (const row of aoa) {
        if (y < M) { page = doc.addPage([W, H]); y = H - M; pages++; }
        let x = M;
        for (let c = 0; c < cols; c++) {
          let s = latin(row[c] === undefined ? '' : row[c]);
          while (s.length > 1 && font.widthOfTextAtSize(s, size) > widths[c] - 6) s = s.slice(0, -1);
          if (s) page.drawText(s, { x: x + 3, y, size, font });
          x += widths[c];
        }
        page.drawLine({ start: { x: M, y: y - 3 }, end: { x: M + widths.reduce((a, b) => a + b, 0), y: y - 3 }, thickness: 0.3, color: PDFLib.rgb(0.8, 0.8, 0.8) });
        y -= rh;
      }
    }
    if (!pages) throw new Error('This spreadsheet is empty.');
    return [{ name: baseName(files[0].name) + '.pdf', blob: blobOf(await doc.save(), 'application/pdf'), info: pages + ' pages' }];
  }
};

TOOLS['xls-converter'] = {
  accept: '.xlsx,.xls,.csv,.ods', exts: ['.xlsx', '.xls', '.csv', '.ods'], label: 'Convert', zipName: 'sheets',
  opts: sel('o_fmt', 'Convert to', [['xlsx', 'Excel (.xlsx)'], ['biff8', 'Excel 97-2003 (.xls)'], ['csv', 'CSV (.csv)'], ['ods', 'OpenDocument (.ods)'], ['html', 'HTML table (.html)']]),
  async run(files, o) {
    await need('xlsx');
    const wb = XLSX.read(await files[0].arrayBuffer(), { type: 'array' }), f = o.v('o_fmt'), base = baseName(files[0].name);
    if (f === 'csv') {
      return wb.SheetNames.map(n => ({ name: base + (wb.SheetNames.length > 1 ? '-' + n : '') + '.csv', blob: blobOf('﻿' + XLSX.utils.sheet_to_csv(wb.Sheets[n]), 'text/csv;charset=utf-8') }));
    }
    const ext = { xlsx: 'xlsx', biff8: 'xls', ods: 'ods', html: 'html' }[f];
    return [{ name: base + '.' + ext, blob: blobOf(XLSX.write(wb, { bookType: f, type: 'array' }), 'application/octet-stream') }];
  }
};

TOOLS['compress-files'] = {
  accept: '*/*', exts: [], multiple: true, min: 1, title: 'Drop files here', label: 'Create ZIP', zipName: 'archive',
  opts: sel('o_lvl', 'Compression', [['6', 'Normal'], ['9', 'Maximum'], ['0', 'None (store only)']]),
  async run(files, o) {
    await need('jszip'); const zip = new JSZip();
    files.forEach(f => zip.file(f.name, f));
    const lvl = parseInt(o.v('o_lvl'));
    const blob = await zip.generateAsync({ type: 'blob', compression: lvl ? 'DEFLATE' : 'STORE', compressionOptions: { level: lvl || 1 } }, m => o.prog(m.percent / 100, 'Compressing…'));
    return [{ name: 'archive.zip', blob, info: files.length + ' files' }];
  }
};

TOOLS['extract-zip'] = {
  accept: '.zip,application/zip', exts: ['.zip'], label: 'Extract ZIP', zipName: 'extracted',
  async run(files, o) {
    await need('jszip');
    let zip; try { zip = await JSZip.loadAsync(files[0]); } catch (e) { throw new Error('This file is not a valid ZIP archive (or it is password protected).'); }
    const names = Object.keys(zip.files).filter(n => !zip.files[n].dir);
    if (!names.length) throw new Error('This ZIP archive is empty.');
    const res = [];
    for (let i = 0; i < names.length; i++) {
      o.prog(i / names.length, names[i]);
      res.push({ name: names[i].split('/').pop(), blob: await zip.files[names[i]].async('blob') });
    }
    return res;
  }
};

/* ---------- image extras ---------- */
TOOLS['upscale-image'] = Object.assign({}, IMG, {
  title: 'Drop an image here', label: 'Upscale image',
  opts: sel('o_f', 'Scale', [['2', '2× larger'], ['3', '3× larger'], ['4', '4× larger']]) + sel('o_sh', 'Sharpening', [['0.5', 'Medium'], ['0.25', 'Light'], ['0', 'None'], ['0.9', 'Strong']]) +
    sel('o_fmt', 'Output', [['image/png', 'PNG'], ['image/jpeg', 'JPG'], ['image/webp', 'WebP']]) +
    '<p class="up-sub">Smart resampling plus sharpening. It enlarges the image cleanly, but it does not invent new detail like AI upscalers.</p>',
  async run(files, o) {
    const img = await loadImage(files[0]), f = parseInt(o.v('o_f')), W = img.naturalWidth * f, H = img.naturalHeight * f;
    if (Math.max(W, H) > 9000 || W * H > 64e6) throw new Error('The result would be too large (' + W + '×' + H + '). Try a smaller scale or a smaller image.');
    let c = document.createElement('canvas'); c.width = img.naturalWidth; c.height = img.naturalHeight; c.getContext('2d').drawImage(img, 0, 0);
    while (c.width < W) {
      const nw = Math.min(W, c.width * 2), nh = Math.round(nw * H / W), n = document.createElement('canvas'); n.width = nw; n.height = nh;
      const x = n.getContext('2d'); x.imageSmoothingEnabled = true; x.imageSmoothingQuality = 'high'; x.drawImage(c, 0, 0, nw, nh); c = n;
    }
    if (c.width !== W) { const n = document.createElement('canvas'); n.width = W; n.height = H; const x = n.getContext('2d'); x.imageSmoothingQuality = 'high'; x.drawImage(c, 0, 0, W, H); c = n; }
    const k = parseFloat(o.v('o_sh'));
    if (k > 0 && W * H <= 25e6) {
      const ctx = c.getContext('2d'), src = ctx.getImageData(0, 0, W, H), dst = ctx.createImageData(W, H), a = src.data, b = dst.data;
      for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
        const i = (y * W + x) * 4;
        for (let ch = 0; ch < 3; ch++) {
          const cen = a[i + ch];
          const l = x > 0 ? a[i - 4 + ch] : cen, r = x < W - 1 ? a[i + 4 + ch] : cen, u = y > 0 ? a[i - W * 4 + ch] : cen, d = y < H - 1 ? a[i + W * 4 + ch] : cen;
          const v = cen + k * (4 * cen - l - r - u - d);
          b[i + ch] = v < 0 ? 0 : v > 255 ? 255 : v;
        }
        b[i + 3] = a[i + 3];
      }
      ctx.putImageData(dst, 0, 0);
    }
    const mime = o.v('o_fmt'), ext = { 'image/png': 'png', 'image/jpeg': 'jpg', 'image/webp': 'webp' }[mime];
    if (mime === 'image/jpeg') { const n = document.createElement('canvas'); n.width = W; n.height = H; const x = n.getContext('2d'); x.fillStyle = '#fff'; x.fillRect(0, 0, W, H); x.drawImage(c, 0, 0); c = n; }
    return [{ name: baseName(files[0].name) + '-' + f + 'x.' + ext, blob: await canvasBlob(c, mime, 0.92), info: img.naturalWidth + '×' + img.naturalHeight + ' → ' + W + '×' + H }];
  }
});

TOOLS['image-to-text'] = Object.assign({}, IMG, {
  title: 'Drop an image here', label: 'Extract text',
  opts: sel('o_lang', 'Language', [['eng', 'English'], ['urd', 'Urdu'], ['hin', 'Hindi'], ['ara', 'Arabic'], ['spa', 'Spanish'], ['fra', 'French'], ['deu', 'German']]) +
    '<p class="up-sub">Text recognition runs in your browser. The first run downloads the language data, so it can take a little while.</p>',
  async run(files, o) {
    await need('tess');
    const r = await Tesseract.recognize(files[0], o.v('o_lang'), { logger: m => { if (m.progress !== undefined) o.prog(m.progress, (m.status || 'Working') + '…'); } });
    const text = (r.data.text || '').trim();
    if (!text) throw new Error('No text could be found in this image. Try a sharper or higher-resolution picture.');
    return [{ name: baseName(files[0].name) + '.txt', blob: blobOf(text, 'text/plain;charset=utf-8'), text }];
  }
});

TOOLS['crop-image'] = {
  custom(ui) {
    ui.innerHTML = `
      <div class="upload cz-drop" id="crDrop" tabindex="0" role="button" aria-label="Choose an image">
        <input type="file" class="hidden-file" id="crIn" accept="image/*">
        <div class="cz-up-ico">${UP_ICO}</div><div class="up-title">Drop an image here</div><div class="up-sub">or click to browse</div>
        <span class="cz-pick">Choose image</span></div>
      <div id="crWork" style="display:none">
        <div class="opts"><div class="opts-t">Shape</div>
          <div class="cz-presets cz-seg" id="crAsp" style="grid-template-columns:repeat(5,1fr)"><button class="fbtn on" data-r="0">Free</button><button class="fbtn" data-r="1">1:1</button><button class="fbtn" data-r="1.3333">4:3</button><button class="fbtn" data-r="1.7778">16:9</button><button class="fbtn" data-r="0.75">3:4</button></div>
          ${sel('crFmt', 'Output', [['image/png', 'PNG'], ['image/jpeg', 'JPG'], ['image/webp', 'WebP']])}
          <div id="crDim" class="up-sub" style="margin-top:6px"></div></div>
        <div style="text-align:center"><div class="cr-stage" id="crStage"><img id="crImg" alt=""><div class="cr-box" id="crBox"><i data-h="nw"></i><i data-h="ne"></i><i data-h="sw"></i><i data-h="se"></i></div></div></div>
        <button class="act-btn" id="crGo">Crop image</button>
        <div class="output" id="crOut"></div>
      </div>`;
    const drop = $(ui, '#crDrop'), inp = $(ui, '#crIn'), work = $(ui, '#crWork'), img = $(ui, '#crImg'), stage = $(ui, '#crStage'), box = $(ui, '#crBox'), dim = $(ui, '#crDim');
    let file = null, r = 0, B = { x: 0, y: 0, w: 0, h: 0 };
    const sw = () => img.clientWidth, sh = () => img.clientHeight;
    function paint() {
      box.style.left = B.x + 'px'; box.style.top = B.y + 'px'; box.style.width = B.w + 'px'; box.style.height = B.h + 'px';
      const s = img.naturalWidth / sw(); dim.textContent = 'Selection: ' + Math.round(B.w * s) + ' × ' + Math.round(B.h * s) + ' px';
    }
    function initBox() {
      const W = sw(), H = sh(); let w = W * 0.8, h = H * 0.8;
      if (r) { h = w / r; if (h > H * 0.9) { h = H * 0.9; w = h * r; } }
      B = { x: (W - w) / 2, y: (H - h) / 2, w, h }; paint();
    }
    function load(f) {
      if (!f || !f.type.startsWith('image/')) return;
      file = f; img.onload = () => { drop.style.display = 'none'; work.style.display = 'block'; initBox(); };
      img.src = URL.createObjectURL(f);
    }
    drop.onclick = () => inp.click(); drop.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); inp.click(); } };
    drop.ondragover = e => { e.preventDefault(); drop.classList.add('drag'); }; drop.ondragleave = () => drop.classList.remove('drag');
    drop.ondrop = e => { e.preventDefault(); drop.classList.remove('drag'); load(e.dataTransfer.files[0]); };
    inp.onchange = () => { load(inp.files[0]); inp.value = ''; };
    $(ui, '#crAsp').onclick = e => {
      const b = e.target.closest('.fbtn'); if (!b) return;
      ui.querySelectorAll('#crAsp .fbtn').forEach(x => x.classList.remove('on')); b.classList.add('on'); r = parseFloat(b.dataset.r);
      if (r) { const W = sw(), H = sh(), cx = B.x + B.w / 2, cy = B.y + B.h / 2; let w = B.w, h = w / r; if (h > H) { h = H; w = h * r; } if (w > W) { w = W; h = w / r; } B = { x: Math.min(Math.max(0, cx - w / 2), W - w), y: Math.min(Math.max(0, cy - h / 2), H - h), w, h }; }
      paint();
    };
    let drag = null;
    box.onpointerdown = e => {
      e.preventDefault(); box.setPointerCapture(e.pointerId);
      drag = { h: e.target.dataset.h || 'move', sx: e.clientX, sy: e.clientY, b: { ...B } };
    };
    box.onpointermove = e => {
      if (!drag) return;
      const dx = e.clientX - drag.sx, dy = e.clientY - drag.sy, W = sw(), H = sh(), s = drag.b; let n;
      if (drag.h === 'move') { n = { x: Math.min(Math.max(0, s.x + dx), W - s.w), y: Math.min(Math.max(0, s.y + dy), H - s.h), w: s.w, h: s.h }; }
      else {
        let x = s.x, y = s.y, w = s.w, h = s.h;
        if (drag.h.includes('e')) w = s.w + dx; if (drag.h.includes('s')) h = s.h + dy;
        if (drag.h.includes('w')) { w = s.w - dx; x = s.x + dx; } if (drag.h.includes('n')) { h = s.h - dy; y = s.y + dy; }
        if (r) { h = w / r; if (drag.h.includes('n')) y = s.y + s.h - h; }
        if (w < 24 || h < 24 || x < 0 || y < 0 || x + w > W + 0.5 || y + h > H + 0.5) return;
        n = { x, y, w, h };
      }
      B = n; paint();
    };
    box.onpointerup = box.onpointercancel = () => { drag = null; };
    window.addEventListener('resize', () => { if (file && work.style.display !== 'none') initBox(); });
    $(ui, '#crGo').onclick = async () => {
      const s = img.naturalWidth / sw(), mime = $(ui, '#crFmt').value, ext = { 'image/png': 'png', 'image/jpeg': 'jpg', 'image/webp': 'webp' }[mime];
      const c = document.createElement('canvas'); c.width = Math.max(1, Math.round(B.w * s)); c.height = Math.max(1, Math.round(B.h * s));
      const x = c.getContext('2d'); if (mime === 'image/jpeg') { x.fillStyle = '#fff'; x.fillRect(0, 0, c.width, c.height); }
      x.drawImage(img, B.x * s, B.y * s, B.w * s, B.h * s, 0, 0, c.width, c.height);
      const blob = await canvasBlob(c, mime, 0.92), out = $(ui, '#crOut'), url = URL.createObjectURL(blob);
      out.innerHTML = `<div class="out-hdr"><span class="out-title">Done: ${c.width} × ${c.height} px · ${fmtSize(blob.size)}</span><button class="btn-dl" id="crDl">Download</button></div><img src="${url}" alt="Cropped result" style="max-width:100%;max-height:360px;border-radius:12px;margin:0 auto">`;
      out.classList.add('show'); $(ui, '#crDl').onclick = () => { dlBlob(blob, baseName(file.name) + '-cropped.' + ext); toast('Image downloaded!'); };
      toast('Image cropped!');
    };
  }
};

window.TWN = { has: id => !!TOOLS[id], render, ids: Object.keys(TOOLS) };
})();
