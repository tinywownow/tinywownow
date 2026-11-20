/* Per-tool "Tips" shown on each tool page. Plain HTML strings (links allowed).
   Rule: only describe what the tool really does, and add something the FAQ does not already say. */
'use strict';
module.exports = {
  'compress-image': [
    'Got a size limit on a form? Type it in <b>Target size</b> (or tap 20, 50, 100 or 200 KB). The tool finds the highest quality that fits. The full method is in our guide to <a href="/blog/compress-image-to-100kb">compressing an image to 100 KB, 50 KB or 20 KB</a>.',
    'For photos, choose <b>JPG</b> or <b>WebP</b> as the output. Keep PNG for screenshots and graphics where every pixel matters and file size does not.',
    'If the picture will only be viewed on screen, set a <b>Max width</b> in Advanced options. Fewer pixels is the biggest single saving.',
    'Start from your original each time. Compressing an already compressed JPG again throws away more detail.'
  ],
  'merge-pdf': [
    'Set the final order before you merge. The up and down arrows move a file, and the merged pages follow the list from top to bottom.',
    'The page count of the result is simply the sum of your files, so a 10-page and a 5-page PDF give a 15-page PDF.',
    'Need only some pages from a file? Pull them out first with <a href="/split-pdf">Split PDF</a>, then merge the extracts.',
    'If the merged file is too big to email, run it through <a href="/compress-pdf">Compress PDF</a>. It helps most on scans and photo-heavy documents.'
  ],
  'split-pdf': [
    'Use ranges such as <b>1-3, 5, 8-10</b> to pull a chapter, a form or a few chosen pages into one new PDF.',
    'A page number past the end of the document is rejected with a message that shows how many pages the file has, so you can correct it.',
    'Choosing every page as its own PDF on a long document creates many files. Download them together as a ZIP.',
    'Changed your mind about the order? Put the pieces back together with <a href="/merge-pdf">Merge PDF</a>.'
  ],
  'compress-pdf': [
    'Check what you have first. This tool re-draws each page as an image, so a PDF that is mostly text may not get smaller at all.',
    'Start with <b>Recommended</b>. Use <b>Strong</b> only if the result is still over your email or upload limit.',
    'Keep the original. The compressed copy cannot be searched or copied from, because its pages are pictures.',
    'The tool shows the size before and after, so you can see right away whether the result is worth using.'
  ],
  'pdf-to-jpg': [
    'Pick <b>Small</b> for quick previews, <b>Standard</b> for viewing on screen, and <b>High</b> when small text must stay sharp.',
    'On a long PDF, convert only the pages you need (for example 2-4). It is faster and gives you fewer files to handle.',
    'Text, line art and screenshots stay crisper as PNG. Try <a href="/pdf-to-png">PDF to PNG</a> if the JPG edges look soft.',
    'Several pages produce several images. Download them together as one ZIP.'
  ],
  'jpg-to-pdf': [
    'Choose <b>A4 pages</b> when you plan to print, and <b>same-size pages</b> when each image should keep its own proportions.',
    'Pages follow the order shown in the list, so arrange the images before you click Create PDF.',
    'JPG images go into the PDF as they are, so the PDF is about as big as your images added together. Shrink big photos first with <a href="/compress-image">Compress Image</a>.',
    'Photographing a document? Crop away the table and background first with <a href="/crop-image">Crop Image</a>.'
  ],
  'pdf-to-word': [
    'Quick test: try to select a word in your PDF viewer. If you cannot, the PDF is a scan and this tool will not find text in it.',
    'Plan to reformat. You get the words, paragraphs and page breaks, but not the columns, tables, fonts or pictures.',
    'For a scanned PDF, run it through <a href="/ocr-pdf">OCR PDF</a> first to add a text layer, then convert the searchable PDF.',
    'The .docx opens in Word, Google Docs, LibreOffice and Pages, so you can fix the layout in whichever you prefer.'
  ],
  'resize-image': [
    'To match a form that asks for exact dimensions, turn <b>Keep proportions</b> off and enter both width and height.',
    'Shrinking the pixel size is the most effective way to cut an image\'s file size. A photo shown at 800 px wide does not need 4,000 px.',
    'The result is saved as a JPG, so transparent areas become white. Keep your original PNG if you need transparency.',
    'Making an image bigger adds pixels but no detail. For enlarging, <a href="/upscale-image">Upscale Image</a> gives cleaner results.'
  ],
  'crop-image': [
    'Use <b>1:1</b> for profile pictures, <b>16:9</b> for video thumbnails and slides, and <b>4:3</b> or <b>3:4</b> for standard photo shapes. The box keeps the ratio while you resize it.',
    'Crop before you compress. Fewer pixels means a smaller file, which matters for passport-style photos and signatures with a size limit. See our <a href="/blog/compress-image-to-100kb">100 KB guide</a>.',
    'The crop is cut from your full-size original, not the preview, so you do not lose resolution.',
    'Save as PNG for lossless quality, or as JPG or WebP for a smaller file.'
  ],
  'compress-video': [
    'Lowering the maximum resolution gives the biggest saving. A clip that only needs to play on a phone rarely needs 4K.',
    'Trim off the parts you do not need first with <a href="/trim-video">Trim Video</a>, so you do not spend time encoding footage you will cut.',
    'The work happens on your own device, so keep the tab open until it finishes. Long, high-resolution videos can take minutes.',
    'The result is an MP4 (H.264 video and AAC audio), which plays on almost every phone and computer.'
  ],
  'trim-video': [
    'Use <b>Fast</b> for a quick cut with no quality loss, and <b>Exact</b> when the cut must land on a precise moment.',
    'To remove only an intro, set the start time and leave the end blank. The clip then runs to the end of the video.',
    'Time can be typed as seconds (90), minutes and seconds (1:30) or hours, minutes and seconds (0:01:30).',
    'Need a smaller file after trimming? Send the clip through <a href="/compress-video">Compress Video</a>.'
  ],
  'image-to-text': [
    'Choose the language of the text before you extract. Text in a different language from the one you picked comes out garbled.',
    'Crop the picture down to just the text with <a href="/crop-image">Crop Image</a>. Less clutter usually reads better.',
    'The first run for a language downloads its recognition data, so it is slower. Later runs are quicker.',
    'Always check names and numbers by eye. OCR can mistake look-alike characters such as 0 and O or 1 and l.'
  ]
};
