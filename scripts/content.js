/* Long-form copy used only at build time (never shipped to visitors).
   Rules: answer first, active voice, short sentences, state real limits, claim only what the tool does.
   Blueprint and topical map: see scripts/topical-map.md. Check everything with: node scripts/lint.js */
'use strict';
const D = require('../site-data.js');
const count = id => D.TOOLS.filter(t => t.c === id).length;

const PRIVACY_Q = ['Does {n} upload my files?', 'No. {n} runs in your browser, so your files stay on your device. Some tools download a helper library the first time you use them, but your files never leave your device.'];

/* one file per cluster; every tool follows the same blueprint (checked by lint.js) */
const tools = Object.assign({}, require('./copy/pdf.js'), require('./copy/image.js'), require('./copy/video.js'), require('./copy/file.js'), require('./copy/text.js'));

/* Category (hub) pages. Same blueprint for all five:
   answer, pick (task -> tool table), workflows (3 chains), faq (4, same question types). */
const cats = {
  pdf: {
    title: 'Free PDF Tools Online',
    meta: 'Merge, split, compress, rotate, sign, OCR and convert PDFs in your browser. ' + count('pdf') + ' free PDF tools with no sign-up, no watermark and no upload.',
    h1: 'Free PDF tools',
    answer: 'These PDF tools run in your browser, so your documents stay on your device. Merge, split, rotate, compress, watermark, sign and read scanned PDFs, or convert PDFs to and from JPG, PNG, Word, Excel and PowerPoint.',
    pick: [['Combine several PDFs into one', 'merge-pdf'], ['Pull out some pages', 'split-pdf'], ['Make a scan searchable', 'ocr-pdf'], ['Shrink a PDF for upload', 'compress-pdf'], ['Edit the words of a PDF', 'pdf-to-word'], ['Sign a form', 'sign-pdf']],
    workflows: [
      ['Turn a scan into searchable text', ['ocr-pdf', 'pdf-to-text'], 'Run OCR PDF first, then extract the text, or convert the searchable PDF to Word.'],
      ['Send a clean PDF by email', ['rotate-pdf', 'merge-pdf', 'compress-pdf'], 'Fix the orientation, combine the files, then shrink the result if it is still too big.'],
      ['Prepare a document for signing', ['word-to-pdf', 'sign-pdf'], 'Create the PDF from a Word file, then add your signature.']
    ],
    faq: [
      ['Are these PDF tools free?', 'Yes. All ' + count('pdf') + ' PDF tools are free, with no account, no watermark and no usage limit.'],
      ['Do these tools upload my PDFs?', 'No. They process your PDFs in your browser, on your device.'],
      ['Which PDF jobs can the tools do?', 'They merge, split, rotate, compress, watermark, sign and read scanned PDFs. They also convert PDFs to and from JPG, PNG, Word, Excel and PowerPoint.'],
      ['Can I convert a scanned PDF to Word?', 'Not directly. Scans hold pictures of text, so run OCR PDF first to make the PDF searchable, then convert it to Word.']
    ]
  },
  image: {
    title: 'Free Image Tools Online',
    meta: 'Compress, resize, crop, convert, rotate and upscale images in your browser. ' + count('image') + ' free image tools with no upload and no sign-up.',
    h1: 'Free image tools',
    answer: 'These image tools work in your browser, so your photos stay on your device. Compress, resize, crop, rotate, convert, watermark, filter and upscale images, or read the text in them with OCR.',
    pick: [['Meet a size limit such as 100 KB', 'compress-image'], ['Set an exact size in pixels', 'resize-image'], ['Cut out part of a picture', 'crop-image'], ['Change a PNG or WebP to JPG', 'image-to-jpg'], ['Make web images smaller', 'image-to-webp'], ['Copy text from a screenshot', 'image-to-text']],
    workflows: [
      ['Meet a form photo limit', ['crop-image', 'compress-image'], 'Crop away extra pixels, then set a target size such as 100 KB.'],
      ['Speed up a website image', ['resize-image', 'image-to-webp', 'compress-image'], 'Set the display size, convert to WebP, then compress.'],
      ['Read text from a screenshot', ['crop-image', 'image-to-text'], 'Crop to the text, then extract it.']
    ],
    faq: [
      ['Are these image tools free?', 'Yes. All ' + count('image') + ' image tools are free, with no account, no watermark and no usage limit.'],
      ['Do these tools upload my photos?', 'No. They process your photos in your browser, on your device.'],
      ['Which image formats do the tools support?', 'Most tools support JPG, PNG, WebP, GIF and BMP. The compressor supports JPG, PNG and WebP.'],
      ['Do the tools reduce image quality?', 'Only when you choose to compress, or to convert to a lossy format such as JPG or WebP.']
    ]
  },
  video: {
    title: 'Free Video Tools Online',
    meta: 'Compress, trim, convert, merge, rotate and speed up videos in your browser. ' + count('video') + ' free video tools with no upload and no sign-up.',
    h1: 'Free video tools',
    answer: 'These video tools run on your own device, so your videos never leave it. Compress, trim, convert, merge, resize, rotate, flip and speed up videos, extract audio, make GIFs and add subtitle tracks.',
    pick: [['Make a video small enough to send', 'compress-video'], ['Cut a clip to length', 'trim-video'], ['Play an MKV or AVI file on any device', 'convert-video'], ['Join several clips', 'merge-videos'], ['Save the sound as MP3', 'extract-audio'], ['Make an animated GIF', 'video-to-gif']],
    workflows: [
      ['Share a long recording', ['trim-video', 'resize-video', 'compress-video'], 'Cut it to length, lower the resolution, then compress it.'],
      ['Make a GIF from a clip', ['trim-video', 'video-to-gif'], 'Find the exact moment, then turn it into a GIF.'],
      ['Turn a video into audio', ['trim-video', 'extract-audio'], 'Cut the part you want, then save its sound.']
    ],
    faq: [
      ['Are these video tools free?', 'Yes. All ' + count('video') + ' video tools are free, with no account, no watermark and no usage limit.'],
      ['Do these tools upload my videos?', 'No. They process your videos on your device, in your browser.'],
      ['Is there a video size limit?', 'Yes. The tools refuse files over about 700 MB, because browsers have limited memory.'],
      ['Why does the first video tool take a moment to start?', 'It downloads a video engine of about 30 MB the first time. Your browser then keeps it for next time.']
    ]
  },
  file: {
    title: 'Free File and Developer Tools Online',
    meta: 'Create and extract ZIP files, convert spreadsheets, format JSON and XML, convert CSV to JSON, and encode Base64, URLs and hashes. Free and private.',
    h1: 'Free file and data tools',
    answer: 'Create and open ZIP archives, convert spreadsheets, and format or convert data such as JSON, XML, CSV, Base64, URL encoding and SHA hashes. Everything runs in your browser.',
    pick: [['Bundle many files into one', 'compress-files'], ['Open a ZIP archive', 'extract-zip'], ['Read minified JSON', 'json-formatter'], ['Turn a CSV into JSON', 'csv-to-json'], ['Change XLSX to CSV', 'xls-converter'], ['Encode or decode text', 'base64-encode']],
    workflows: [
      ['Clean up API data', ['csv-to-json', 'json-formatter'], 'Convert a CSV export to JSON, then format and validate it.'],
      ['Share a spreadsheet safely', ['xls-converter', 'excel-to-pdf'], 'Convert it to the format you need, or make a read-only PDF.'],
      ['Send many files at once', ['compress-files', 'extract-zip'], 'Zip the files, then open the archive on the other side.']
    ],
    faq: [
      ['Are these file tools free?', 'Yes. All ' + count('file') + ' file tools are free, with no account, no watermark and no usage limit.'],
      ['Do these tools send my data to a server?', 'No. All tools in this category process your data in your browser.'],
      ['Can I open RAR or 7z files?', 'No. The tools open ZIP archives only.'],
      ['Which spreadsheet formats can I convert?', 'You can convert XLSX, XLS, CSV, ODS and HTML.']
    ]
  },
  write: {
    title: 'Free Text Tools Online',
    meta: 'Count words and characters, change text case and reverse text instantly. ' + count('write') + ' free text tools that run in your browser with no sign-up.',
    h1: 'Free text tools',
    answer: 'Count words, characters, sentences and reading time, convert text between cases such as Title Case and snake_case, and reverse text by characters, words or lines. Your text never leaves your browser.',
    pick: [['Check the length of an article', 'word-counter'], ['Fix text typed in ALL CAPS', 'case-converter'], ['Name a variable or a URL slug', 'case-converter'], ['Flip the order of a list', 'text-reverser'], ['Test a palindrome', 'text-reverser'], ['Estimate reading time', 'word-counter']],
    workflows: [
      ['Check an article before you publish', ['word-counter', 'case-converter'], 'Count the words, then fix the capitalisation of the headline.'],
      ['Prepare a name for code or a URL', ['case-converter', 'url-encode'], 'Convert the text to snake_case or kebab-case, then encode it when needed.'],
      ['Flip a list', ['text-reverser', 'word-counter'], 'Reverse the lines, then check how many items you have.']
    ],
    faq: [
      ['Are these text tools free?', 'Yes. All ' + count('write') + ' text tools are free, with no account, no watermark and no usage limit.'],
      ['Does the site save my text?', 'No. Your text stays in your browser, and the site does not store it or send it anywhere.'],
      ['Do these tools use AI?', 'No. They are simple, fast text utilities.'],
      ['Is there a text length limit?', 'The tools set no fixed limit, though long texts depend on your device.']
    ]
  }
};

const home = {
  title: 'Free Online PDF, Image and Video Tools',
  meta: 'Free online tools for PDF, image, video, file and text jobs: merge, split, compress, convert and more. They run in your browser, so files stay private. No sign-up.',
  how: [
    ['Choose a tool', 'Pick the tool for your job from the menu, or browse the categories below.'],
    ['Add your file', 'Drag it in or click Choose files. Your file stays on your device.'],
    ['Download the result', 'Check the result, then save it. You sign up for nothing, and no watermark appears.']
  ],
  why: [
    ['Private by design', 'Every tool runs in your browser, so we never receive your files. You can confirm this in the Network tab of your developer tools.'],
    ['Honest about limits', 'Each tool page states what the tool cannot do, such as PDF compression turning pages into images.'],
    ['Free, with no sign-up', 'You create no account, see no watermark and meet no usage limit.'],
    ['Built for real jobs', 'Each tool page offers tips, limits and next steps, so you finish the whole task and not only one step.']
  ],
  faq: [
    ['What is TinyWow Now?', 'TinyWow Now is a free website with image, PDF, video, file and text tools. Every tool runs in your browser, so your device processes your files and nothing uploads.'],
    ['How do I use a tool?', 'Open the tool you need, add your file by dragging it in or clicking Choose files, set any options, and download the result. You install nothing and create no account. The image compressor on this page is one of the tools, and the full version has more options.'],
    ['Do the tools upload my files to a server?', 'No. The tools run in your browser. Some tools download a helper library the first time you use them, but your files never leave your device. You can check this in the Network tab of your browser developer tools.'],
    ['Is TinyWow Now free?', 'Yes. The site has no sign-up, no watermark and no usage limit.'],
    ['Which tools does the site offer?', 'The site offers ' + D.TOOLS.length + ' tools in five groups. Image tools compress, resize, crop and convert. PDF tools merge, split, compress, read (OCR), sign and convert. Video tools compress, trim, convert and merge. File tools cover ZIP, spreadsheets and JSON, and text tools count and change words.'],
    ['Does it work on my phone?', 'Yes. The site works in modern phone browsers. Video tools can run slowly on older phones, because the work happens on the device.']
  ]
};

const pages = {
  about: {
    title: 'About TinyWow Now',
    meta: 'TinyWow Now is a free set of image, PDF, video, file and text tools that run in your browser, so your files stay private.',
    h1: 'About TinyWow Now',
    body: `<p>TinyWow Now is a free collection of everyday tools for images, PDFs, videos, files and text. We built it for one reason: most online tools make you upload your files to someone else's server. Ours do not.</p>
<h2>Private by design</h2>
<p>Every tool runs in your web browser, on your own device. Your device processes your images, documents and videos, and we never receive them. Some tools download a helper library, such as the PDF or video engine, the first time you use them. Your files never travel with that download.</p>
<h2>Free and simple</h2>
<p>You create no account, see no watermark and meet no usage limit. We keep each tool simple: add a file, choose an option, and download the result.</p>
<h2>Honest about limits</h2>
<p>Working in the browser has trade-offs, and we state them on each tool page. For example, PDF compression turns pages into images, and PDF to Word extracts text without the layout. Large files depend on your device memory.</p>
<h2>How we write each page</h2>
<p>We describe each tool by what it does, and we list its limits on the page. Every tool page follows the same plan: a direct answer, steps, tips, limits, next steps and answers to common questions.</p>
<h2>Contact</h2>
<p>We welcome questions, bug reports and ideas for new tools on our <a href="/contact">contact page</a>.</p>`
  },
  privacy: {
    title: 'Privacy Policy',
    meta: 'How TinyWow Now handles your data: your browser processes your files and nothing uploads. Read what little we collect.',
    h1: 'Privacy Policy',
    body: `<p><strong>Last updated: {date}</strong></p>
<h2>Your files</h2>
<p>All tools on TinyWow Now process files in your web browser, on your device. We do not receive your images, PDFs, videos, text or other files, and we cannot see them.</p>
<h2>Libraries loaded from other servers</h2>
<p>To keep the site fast, some tools load helper libraries from public content delivery networks such as cdnjs, jsDelivr and unpkg. These libraries handle PDF, spreadsheet, text recognition and presentation files. The site also loads fonts from Google Fonts. These requests reveal your IP address and browser details to those providers, as with any website, but they never include your files.</p>
<h2>Data we store</h2>
<p>Your browser stores one small setting on your device: your light or dark theme choice. We offer no accounts and ask for no personal information to use the tools.</p>
<h2>Hosting and logs</h2>
<p>Vercel hosts the site and may keep standard server logs, such as your IP address, the page you requested and the time, for security and operation.</p>
<h2>Cookies and analytics</h2>
<p>We use no advertising cookies. If we add analytics or advertising, we will update this policy first.</p>
<h2>Children</h2>
<p>The site is a general-purpose utility, and we do not direct it at children under 13.</p>
<h2>Changes and contact</h2>
<p>We may update this policy, and we will change the date above when we do. Questions? See our <a href="/contact">contact page</a>.</p>`
  },
  terms: {
    title: 'Terms of Use',
    meta: 'The terms for using TinyWow Now, a free set of browser-based image, PDF, video, file and text tools.',
    h1: 'Terms of Use',
    body: `<p><strong>Last updated: {date}</strong></p>
<h2>Using the tools</h2>
<p>TinyWow Now offers free browser-based tools. You may use them for personal or commercial purposes, as long as you use them lawfully and have the right to process the files you add.</p>
<h2>Your content</h2>
<p>You keep all rights to your files. Because your browser does the processing, we do not receive or store your files.</p>
<h2>No warranty</h2>
<p>We provide the tools "as is", without warranties of any kind. Results can differ from the original. For example, compression and conversion can change quality, layout or formatting. Always keep a copy of your original files, and check the results before you rely on them. A drawn signature that you add with Sign PDF is a visual mark, not a certified digital signature.</p>
<h2>Limitation of liability</h2>
<p>The law limits our liability. To the extent it allows, TinyWow Now takes no liability for loss or damage from your use of the tools or the site.</p>
<h2>Acceptable use</h2>
<p>Do not use the site to break the law, to attack or overload it, or to process content that you have no right to use.</p>
<h2>Changes</h2>
<p>We may change the tools or these terms. If you keep using the site after a change, you accept the updated terms.</p>
<h2>Contact</h2>
<p>See our <a href="/contact">contact page</a>.</p>`
  },
  contact: {
    title: 'Contact TinyWow Now',
    meta: 'Contact TinyWow Now with questions, bug reports or ideas for new tools.',
    h1: 'Contact us',
    body: `<p>We read every message. Write to us with a question, a bug report or an idea for a new tool.</p>
<p><strong>Email:</strong> <a href="mailto:{email}">{email}</a></p>
<h2>Reporting a problem</h2>
<p>To help us fix a bug quickly, tell us which tool you used, what you expected, what happened instead, and which browser and device you used. Please do not email private files.</p>
<h2>Suggesting a tool</h2>
<p>Tell us what you want to do and which file types you use. Tools that run safely in the browser suit this site best.</p>`
  }
};

module.exports = { tools, cats, home, pages, PRIVACY_Q };
