/* TinyWow Now - catalogue shared by the browser (search, icons) and scripts/build.js.
   Long-form SEO copy lives in scripts/content.js so visitors never download it. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.TWN_DATA = factory();
})(typeof self !== 'undefined' ? self : this, function () {
'use strict';

const CATS = [
  { id: 'pdf', slug: 'pdf-tools', name: 'PDF Tools', short: 'PDF', ic: 'tci-pdf', cls: 'cc-pdf', col: ['#E8412C', '#fdeeed'] },
  { id: 'image', slug: 'image-tools', name: 'Image Tools', short: 'Image', ic: 'tci-image', cls: 'cc-image', col: ['#7a9165', '#eef3eb'] },
  { id: 'video', slug: 'video-tools', name: 'Video Tools', short: 'Video', ic: 'tci-video', cls: 'cc-video', col: ['#7c5cbf', '#f0ecf9'] },
  { id: 'file', slug: 'file-tools', name: 'File Tools', short: 'File', ic: 'tci-file', cls: 'cc-file', col: ['#2a7abf', '#e8f1fb'] },
  { id: 'write', slug: 'text-tools', name: 'Text Tools', short: 'Text', ic: 'tci-write', cls: 'cc-write', col: ['#c97a0a', '#fef4e0'] }
];

/* id is the internal key used by the tool code; slug is the public URL. */
const TOOLS = [
  { id: 'merge-pdf', c: 'pdf', n: 'Merge PDF', d: 'Combine multiple PDF files into one' },
  { id: 'split-pdf', c: 'pdf', n: 'Split PDF', d: 'Split a PDF into separate pages' },
  { id: 'compress-pdf', c: 'pdf', n: 'Compress PDF', d: 'Shrink scanned or image-heavy PDFs' },
  { id: 'pdf-to-word', c: 'pdf', n: 'PDF to Word', d: 'Extract PDF text into an editable Word file' },
  { id: 'pdf-to-jpg', c: 'pdf', n: 'PDF to JPG', d: 'Convert each PDF page to a JPG image' },
  { id: 'jpg-to-pdf', c: 'pdf', n: 'JPG to PDF', d: 'Convert JPG images into a PDF file' },
  { id: 'word-to-pdf', c: 'pdf', n: 'Word to PDF', d: 'Turn the text of a Word file into a PDF' },
  { id: 'pdf-to-png', c: 'pdf', n: 'PDF to PNG', d: 'Convert PDF pages to PNG images' },
  { id: 'pdf-to-excel', c: 'pdf', n: 'PDF to Excel', d: 'Pull simple tables from PDF into Excel' },
  { id: 'excel-to-pdf', c: 'pdf', n: 'Excel to PDF', d: 'Convert Excel spreadsheets to PDF' },
  { id: 'rotate-pdf', c: 'pdf', n: 'Rotate PDF', d: 'Rotate PDF pages to any angle' },
  { id: 'watermark-pdf', c: 'pdf', n: 'Watermark PDF', d: 'Add custom watermark text to PDF' },
  { id: 'pdf-to-text', c: 'pdf', n: 'PDF to Text', d: 'Extract all text content from PDF' },
  { id: 'sign-pdf', c: 'pdf', n: 'Sign PDF', d: 'Draw your signature and place it on a PDF' },
  { id: 'pdf-to-ppt', c: 'pdf', n: 'PDF to PPT', d: 'Turn PDF pages into PowerPoint slides' },

  { id: 'compress-image', c: 'image', n: 'Compress Image', d: 'Reduce image file size with quality control' },
  { id: 'resize-image', c: 'image', n: 'Resize Image', d: 'Resize images to exact pixel dimensions' },
  { id: 'image-to-jpg', c: 'image', slug: 'convert-to-jpg', n: 'Convert to JPG', d: 'Convert any image format to JPG' },
  { id: 'image-to-png', c: 'image', slug: 'convert-to-png', n: 'Convert to PNG', d: 'Convert any image format to PNG' },
  { id: 'image-to-webp', c: 'image', slug: 'convert-to-webp', n: 'Convert to WebP', d: 'Convert images to modern WebP format' },
  { id: 'crop-image', c: 'image', n: 'Crop Image', d: 'Crop images to any size or aspect ratio' },
  { id: 'rotate-image', c: 'image', slug: 'rotate-flip-image', n: 'Rotate & Flip', d: 'Rotate or mirror your images freely' },
  { id: 'grayscale-image', c: 'image', n: 'Grayscale', d: 'Convert colour images to black and white' },
  { id: 'watermark-image', c: 'image', n: 'Watermark Image', d: 'Add custom text watermark to images' },
  { id: 'upscale-image', c: 'image', n: 'Upscale Image', d: 'Enlarge images 2-4x with smart sharpening' },
  { id: 'image-to-text', c: 'image', n: 'Image to Text', d: 'Extract text from images and screenshots' },
  { id: 'photo-filter', c: 'image', slug: 'photo-filters', n: 'Photo Filters', d: 'Apply beautiful filters to your photos' },

  { id: 'compress-video', c: 'video', n: 'Compress Video', d: 'Reduce video file size for sharing' },
  { id: 'trim-video', c: 'video', n: 'Trim Video', d: 'Cut and trim videos to any length' },
  { id: 'convert-video', c: 'video', n: 'Convert Video', d: 'Convert between MP4, WebM, MOV, MKV and AVI' },
  { id: 'merge-videos', c: 'video', n: 'Merge Videos', d: 'Join multiple video clips into one' },
  { id: 'extract-audio', c: 'video', slug: 'extract-audio-from-video', n: 'Extract Audio', d: 'Extract the audio track from any video' },
  { id: 'mute-video', c: 'video', slug: 'remove-audio-from-video', n: 'Mute Video', d: 'Remove all audio from your video' },
  { id: 'video-to-gif', c: 'video', n: 'Video to GIF', d: 'Convert video clips to animated GIFs' },
  { id: 'gif-to-video', c: 'video', n: 'GIF to Video', d: 'Convert animated GIF to MP4 video' },
  { id: 'rotate-video', c: 'video', n: 'Rotate Video', d: 'Rotate video orientation freely' },
  { id: 'resize-video', c: 'video', n: 'Resize Video', d: 'Change video resolution and dimensions' },
  { id: 'video-speed', c: 'video', slug: 'change-video-speed', n: 'Video Speed', d: 'Speed up or slow down any video clip' },
  { id: 'add-subtitles', c: 'video', n: 'Add Subtitles', d: 'Add a subtitle track from an SRT or VTT file' },
  { id: 'flip-video', c: 'video', n: 'Flip Video', d: 'Mirror or flip your video' },

  { id: 'compress-files', c: 'file', slug: 'zip-files', n: 'Compress Files', d: 'Create a ZIP archive from multiple files' },
  { id: 'extract-zip', c: 'file', n: 'Extract ZIP', d: 'Extract files from ZIP archives' },
  { id: 'json-formatter', c: 'file', n: 'JSON Formatter', d: 'Format, validate and beautify JSON' },
  { id: 'csv-to-json', c: 'file', n: 'CSV to JSON', d: 'Convert CSV data to JSON format' },
  { id: 'base64-encode', c: 'file', slug: 'base64-encoder-decoder', n: 'Base64 Encoder', d: 'Encode and decode Base64 strings' },
  { id: 'url-encode', c: 'file', slug: 'url-encoder-decoder', n: 'URL Encoder', d: 'Encode and decode URL strings' },
  { id: 'hash-gen', c: 'file', slug: 'hash-generator', n: 'Hash Generator', d: 'Generate SHA-256, SHA-1 and SHA-512 hashes' },
  { id: 'xml-formatter', c: 'file', n: 'XML Formatter', d: 'Format and validate XML documents' },
  { id: 'xls-converter', c: 'file', n: 'XLS Converter', d: 'Convert Excel files to XLSX, XLS, CSV, ODS or HTML' },

  { id: 'word-counter', c: 'write', n: 'Word Counter', d: 'Count words, characters, sentences and more' },
  { id: 'case-converter', c: 'write', n: 'Case Converter', d: 'Convert text to any case format instantly' },
  { id: 'text-reverser', c: 'write', n: 'Text Reverser', d: 'Reverse text, words or lines easily' }
];
TOOLS.forEach(t => { t.slug = t.slug || t.id; });

const GL={
merge:'<path d="M6 3v6c0 3 3 4 6 4s6 1 6 4v4M18 3v6c0 3-3 4-6 4"/>',
split:'<path d="M12 3v7M12 10l-6 6v5M12 10l6 6v5"/>',
compress:'<path d="M4 14h6v6M20 10h-6V4M14 10l7-7M3 21l7-7"/>',
doc:'<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
convert:'<path d="M4 8h13l-3-3M20 16H7l3 3"/>',
image:'<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="1.6"/><path d="M21 16l-5-5-8 8"/>',
crop:'<path d="M6 2v14a2 2 0 0 0 2 2h14M2 6h14a2 2 0 0 1 2 2v14"/>',
rotate:'<path d="M20 11a8 8 0 1 0-2.3 5.7M20 4v7h-7"/>',
resize:'<path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>',
video:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M10 9l5 3-5 3z"/>',
scissors:'<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4L8.1 15.9M14.5 14.5L20 20M8.1 8.1L12 12"/>',
audio:'<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
mute:'<path d="M11 5L6 9H2v6h4l5 4zM22 9l-6 6M16 9l6 6"/>',
bolt:'<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
unlock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 7.5-2"/>',
pen:'<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
text:'<path d="M4 7V4h16v3M9 20h6M12 4v16"/>',
sparkle:'<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z"/>',
table:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M3 15h18M9 4v16"/>',
slides:'<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M12 16v4M8 20h8"/>',
hash:'<path d="M5 9h14M5 15h14M10 4L8 20M16 4l-2 16"/>',
braces:'<path d="M8 4a2 2 0 0 0-2 2v3a2 2 0 0 1-2 2 2 2 0 0 1 2 2v3a2 2 0 0 0 2 2M16 4a2 2 0 0 1 2 2v3a2 2 0 0 0 2 2 2 2 0 0 0-2 2v3a2 2 0 0 1-2 2"/>',
code:'<path d="M8 8l-5 4 5 4M16 8l5 4-5 4M14 4l-4 16"/>',
link:'<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
archive:'<rect x="3" y="4" width="18" height="5" rx="1"/><path d="M5 9v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9M10 13h4"/>',
drop:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',
upscale:'<path d="M3 17l6-6 4 4 8-8M15 7h6v6"/>',
contrast:'<circle cx="12" cy="12" r="9"/><path d="M12 3v18M12 3a9 9 0 0 1 0 18"/>',
palette:'<circle cx="12" cy="12" r="9"/><circle cx="8" cy="10" r="1"/><circle cx="12" cy="7.5" r="1"/><circle cx="16" cy="10" r="1"/>',
scan:'<path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3M7 12h10"/>',
subs:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 12h4M13 12h4M7 15h2M12 15h5"/>',
film:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 4v16M17 4v16M3 9h4M3 15h4M17 9h4M17 15h4"/>',
mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
check:'<circle cx="12" cy="12" r="9"/><path d="M8 12.5l3 3 5-6"/>',
list:'<path d="M4 6h16M4 12h10M4 18h14"/>',
bulb:'<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0 0 12 3z"/>',
casing:'<path d="M3 18L8 6l5 12M5 14h6M15 18l3.5-8 3.5 8M16.5 15.5h4"/>',
bg:'<rect x="3" y="3" width="18" height="18" rx="2" stroke-dasharray="3 3"/><circle cx="12" cy="10" r="3"/><path d="M6 19c1-3 3-4 6-4s5 1 6 4"/>'
};
const GRULES=[[/unlock/,'unlock'],[/^lock-/,'lock'],[/^merge/,'merge'],[/^split/,'split'],[/^compress-files|extract-zip/,'archive'],[/^compress/,'compress'],[/rotate|flip/,'rotate'],[/^resize/,'resize'],[/^crop/,'crop'],[/^trim/,'scissors'],[/watermark/,'drop'],[/remove-bg/,'bg'],[/upscale/,'upscale'],[/grayscale/,'contrast'],[/photo-filter/,'palette'],[/ocr|image-to-text/,'scan'],[/pdf-to-text|word-counter/,'text'],[/^sign|edit-pdf/,'pen'],[/subtitles/,'subs'],[/gif/,'film'],[/extract-audio|video-to-mp3/,'audio'],[/mute/,'mute'],[/speed/,'bolt'],[/excel|xls|csv/,'table'],[/ppt/,'slides'],[/json/,'braces'],[/xml|base64/,'code'],[/hash/,'hash'],[/url/,'link'],[/email|cover-letter/,'mail'],[/grammar/,'check'],[/summar|paragraph/,'list'],[/title/,'bulb'],[/case-conv/,'casing'],[/resume/,'doc'],[/-to-|^convert|paraphraser|reverser/,'convert']];
const CATGL={pdf:'doc',image:'image',video:'video',file:'archive',write:'pen'};
function glKey(t){for(const [r,k] of GRULES)if(r.test(t.id))return k;return CATGL[t.c]||'doc'}
function svgIco(k,s){return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${GL[k]}</svg>`}
function gl(t,s){return svgIco(glKey(t),s||20)}
function cgl(c,s){return svgIco(CATGL[c.id],s||24)}


return { CATS, TOOLS, GL, glKey, svgIco, gl, cgl };
});
