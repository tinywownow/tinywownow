/* Long-form copy used only at build time (never shipped to visitors).
   Rules: answer first, state real limits, only claim what the tool actually does. */
'use strict';

const PRIVACY_Q = ['Are my files uploaded to a server?', 'No. {n} runs in your browser, so your files stay on your device. Some tools download a helper library the first time you use them, but your files are never sent anywhere.'];

const tools = {
  /* ---------------- PDF ---------------- */
  'merge-pdf': {
    title: 'Merge PDF Files Online, Free', meta: 'Combine several PDF files into one document online. Reorder files, no sign-up, no watermark, and your files never leave your device.',
    answer: 'Merge PDF joins two or more PDF files into a single document in the order you choose. It runs in your browser, so nothing is uploaded, and the merged file keeps selectable text and original image quality.',
    steps: ['Add two or more PDF files by dragging them in or clicking Choose files.', 'Use the up and down arrows to put the files in the order you want.', 'Click Merge PDF, then download merged.pdf.'],
    faq: [['How many PDF files can I merge at once?', 'There is no fixed limit. The practical limit is your device memory, and a few dozen normal documents merge without trouble on most computers.'], ['Can I merge password-protected PDFs?', 'No. Remove the password in the app that created the file, then merge. The tool tells you which file is protected.'], ['Does merging reduce quality?', 'No. Pages are copied as they are, so text stays selectable and images keep their original quality.']],
    io: ['PDF', 'PDF']
  },
  'split-pdf': {
    title: 'Split PDF into Pages Online, Free', meta: 'Split a PDF into single pages or extract chosen page ranges into a new PDF. Free, private, no sign-up, works in your browser.',
    answer: 'Split PDF separates one PDF into individual pages, or extracts the pages you choose (for example 1-3, 5, 8-10) into a new PDF. It works in your browser and nothing is uploaded.',
    steps: ['Add the PDF you want to split.', 'Choose "Every page as its own PDF", or "Extract page ranges" and type the pages, such as 1-3, 5.', 'Click Split PDF and download the files, or all of them as one ZIP.'],
    faq: [['How do I extract only certain pages?', 'Choose Extract page ranges and type the pages separated by commas, for example 2, 4-6. You get one new PDF containing just those pages.'], ['What happens when I split every page?', 'Each page becomes its own PDF named after the original file with the page number. When there are several files you can download them together as a ZIP.'], ['Can I split a password-protected PDF?', 'No. Remove the password first, then split the file.']],
    io: ['PDF', 'PDF (one or many)']
  },
  'compress-pdf': {
    title: 'Compress PDF Online, Reduce File Size', meta: 'Shrink scanned and image-heavy PDFs in your browser. Choose light, recommended or strong compression. Free, private, no sign-up.',
    answer: 'Compress PDF reduces the file size of scanned or image-heavy PDFs by re-rendering each page as an optimised image. Text in the compressed copy is no longer selectable, so it works best for scans and picture-based documents.',
    steps: ['Add the PDF you want to make smaller.', 'Pick Light, Recommended or Strong compression.', 'Click Compress PDF and download the result. The tool shows the size before and after.'],
    faq: [['How much smaller will my PDF get?', 'It depends on the content. Scans and photo-heavy PDFs often shrink a lot (a test PDF full of photos dropped by about 79%), while simple text PDFs may not shrink at all.'], ['What if my PDF is already small?', 'If a smaller file cannot be made, the tool returns your original file unchanged and tells you so, so you never get a bigger result.'], ['Is text still selectable after compression?', 'No. Pages are saved as images to reduce size, so text can no longer be selected or searched. Keep the original if you need that.']],
    io: ['PDF', 'PDF']
  },
  'pdf-to-word': {
    title: 'PDF to Word Converter, Free Online', meta: 'Extract the text from a PDF into an editable Word (.docx) file. Runs in your browser, free, no sign-up. Layout and images are not preserved.',
    answer: 'PDF to Word extracts the text from a PDF and saves it as an editable .docx file. It keeps paragraphs and page breaks, but not the original layout, fonts or images, and it needs a PDF with real text (not a scan).',
    steps: ['Add a PDF that contains selectable text.', 'Click Convert to Word.', 'Download the .docx file and open it in Word, Google Docs or LibreOffice.'],
    faq: [['Will the layout and images be kept?', 'No. This tool extracts text only. Tables, images, columns and fonts are not reproduced, so expect to reformat the document.'], ['Why do I get a "no selectable text" message?', 'The PDF is probably a scan, which contains pictures of text instead of text. Export its pages as images and run Image to Text instead.'], ['Which file format does it create?', 'A standard .docx file that opens in Microsoft Word, Google Docs, LibreOffice and Pages.']],
    io: ['PDF', 'DOCX']
  },
  'pdf-to-jpg': {
    title: 'PDF to JPG Converter, Free Online', meta: 'Convert every page of a PDF to a JPG image, or pick specific pages. Choose quality, download as ZIP. Free, private, in your browser.',
    answer: 'PDF to JPG turns each page of a PDF into a JPG image. You can convert all pages or only chosen ones, pick the quality, and download the images individually or as one ZIP. Everything runs in your browser.',
    steps: ['Add the PDF you want to convert.', 'Choose a quality (Small, Standard or High) and optionally the pages, such as 1-3, 5.', 'Click Convert to JPG and download the images or the ZIP.'],
    faq: [['What resolution do the images have?', 'Standard renders pages at 1.5 times their PDF size, High at 2 times and Small at 1 times. Higher settings give sharper but larger files.'], ['Can I convert just one page?', 'Yes. Type the page number, or a range such as 2-4, in the Pages box.'], ['Do I get one file or many?', 'One JPG per page. When there are several you can download them all together as a ZIP.']],
    io: ['PDF', 'JPG']
  },
  'jpg-to-pdf': {
    title: 'JPG to PDF Converter, Free Online', meta: 'Turn JPG, PNG and WebP images into one PDF. Reorder pages, fit to A4 or keep image size. Free, private, no sign-up.',
    answer: 'JPG to PDF combines one or more images into a single PDF, one image per page. You can place each image on an A4 page or keep its own size, and reorder the pages before you create the file.',
    steps: ['Add your images (JPG, PNG, WebP, GIF or BMP).', 'Use the arrows to set the page order and choose A4 or same-size pages.', 'Click Create PDF and download images.pdf.'],
    faq: [['Which image formats can I use?', 'JPG, PNG, WebP, GIF and BMP. Non-JPG images are converted to PNG inside the PDF so transparency and quality are kept.'], ['Can I put many images in one PDF?', 'Yes. Add as many as you like; each becomes its own page in the order shown.'], ['Does the PDF reduce my image quality?', 'JPG images are embedded as they are, so quality is not reduced.']],
    io: ['JPG, PNG, WebP', 'PDF']
  },
  'word-to-pdf': {
    title: 'Word to PDF Converter (Text Only)', meta: 'Convert the text of a .docx Word file into a PDF in your browser. Free and private. Images, tables and fancy formatting are not kept.',
    answer: 'Word to PDF converts the text of a .docx document into a simple A4 PDF. It does not keep images, tables, fonts or styling, so use it for plain text documents rather than formatted reports.',
    steps: ['Add a .docx Word file.', 'Click Convert to PDF.', 'Download the PDF.'],
    faq: [['Does it keep my formatting?', 'No. Only the text is converted, with simple paragraph spacing. Images, tables, headers and fonts are not reproduced.'], ['Can it convert old .doc files?', 'No. Only the modern .docx format is supported. Open an old file in Word and save it as .docx first.'], ['What about non-English characters?', 'The PDF uses a standard Latin font, so characters outside it (for example Arabic, Urdu or Chinese) are replaced with a question mark.']],
    io: ['DOCX', 'PDF']
  },
  'pdf-to-png': {
    title: 'PDF to PNG Converter, Free Online', meta: 'Convert PDF pages to sharp PNG images in your browser. Pick pages and quality, download as ZIP. Free, private, no sign-up.',
    answer: 'PDF to PNG renders each page of a PDF as a lossless PNG image. Choose all pages or a range, set the quality, and download the images one by one or as a ZIP. It runs entirely in your browser.',
    steps: ['Add the PDF to convert.', 'Choose a quality and, if needed, the pages to export.', 'Click Convert to PNG and download the images.'],
    faq: [['When should I choose PNG instead of JPG?', 'PNG is lossless, so it is better for text, line art and screenshots. JPG makes smaller files for photographs.'], ['Why are the PNG files large?', 'PNG does not discard detail. Use the Small quality setting, or PDF to JPG, for smaller files.'], ['Can I export only some pages?', 'Yes. Enter pages such as 1-3, 5 in the Pages box.']],
    io: ['PDF', 'PNG']
  },
  'pdf-to-excel': {
    title: 'PDF to Excel Converter, Simple Tables', meta: 'Pull simple text tables from a PDF into an Excel (.xlsx) file in your browser. Free and private. Best for clean, text-based tables.',
    answer: 'PDF to Excel reads the text on each PDF page, groups it into rows and columns, and saves it as an .xlsx workbook with one sheet per page. It works best on clean text-based tables, not on scans or complex layouts.',
    steps: ['Add a PDF that contains selectable text.', 'Click Convert to Excel.', 'Download the .xlsx file and check the columns.'],
    faq: [['How accurate is the table detection?', 'It is a best-effort approach based on text positions. Clean tables convert well; merged cells, scans and multi-column layouts usually need manual tidying.'], ['Does it work on scanned PDFs?', 'No. Scanned PDFs have no selectable text. Use Image to Text on page images instead.'], ['How are pages arranged in the workbook?', 'Each PDF page becomes its own sheet, named Page 1, Page 2 and so on.']],
    io: ['PDF', 'XLSX']
  },
  'excel-to-pdf': {
    title: 'Excel to PDF Converter, Free Online', meta: 'Convert Excel, CSV and ODS spreadsheets to PDF tables in your browser. Free and private. Latin characters only; very wide sheets are shortened.',
    answer: 'Excel to PDF draws each sheet of an .xlsx, .xls, .csv or .ods file as a table in a landscape PDF. It does not keep cell formatting or charts, and it supports Latin characters only.',
    steps: ['Add an Excel, CSV or ODS file.', 'Click Convert to PDF.', 'Download the PDF, which has one section per sheet.'],
    faq: [['Are colours, charts and formulas kept?', 'No. The PDF shows the cell values as plain text in a table. Charts, colours and formatting are not reproduced.'], ['What happens to very wide sheets?', 'Columns are scaled to fit the page width and long cell text is shortened so the table stays on the page.'], ['Can it handle non-English text?', 'Only Latin characters are supported. Other scripts are replaced with a question mark.']],
    io: ['XLSX, XLS, CSV, ODS', 'PDF']
  },
  'rotate-pdf': {
    title: 'Rotate PDF Pages Online, Free', meta: 'Rotate all or selected PDF pages by 90, 180 or 270 degrees. Free, private, no sign-up, works in your browser.',
    answer: 'Rotate PDF turns every page, or only the pages you choose, by 90 degrees clockwise, 90 degrees counter-clockwise or 180 degrees. The rest of the document is unchanged, and the file is processed in your browser.',
    steps: ['Add the PDF.', 'Choose the rotation and, optionally, the pages such as 2-4.', 'Click Rotate PDF and download the result.'],
    faq: [['Can I rotate only one page?', 'Yes. Type the page number in the Pages box, and only that page is rotated.'], ['Is the rotation permanent?', 'Yes. It is saved into the new file, so every PDF viewer shows the pages the new way up.'], ['Will text stay selectable?', 'Yes. Only the page orientation changes; content is not re-rendered.']],
    io: ['PDF', 'PDF']
  },
  'watermark-pdf': {
    title: 'Add Watermark to PDF Online, Free', meta: 'Stamp a text watermark such as CONFIDENTIAL or DRAFT on every PDF page. Set opacity and angle. Free, private, in your browser.',
    answer: 'Watermark PDF stamps your own text, such as CONFIDENTIAL or DRAFT, across every page of a PDF. You choose the opacity and whether the text runs diagonally or horizontally. It supports standard Latin characters.',
    steps: ['Add the PDF.', 'Type your watermark text and pick the opacity and angle.', 'Click Add watermark and download the stamped PDF.'],
    faq: [['Can I choose the watermark text?', 'Yes. Type any text using standard Latin letters, numbers and punctuation.'], ['Can the watermark be removed afterwards?', 'The text is drawn onto each page. It is not a secure protection, so keep your original file.'], ['Can I use a logo or an image?', 'Not yet. This tool adds text watermarks only.']],
    io: ['PDF', 'PDF']
  },
  'pdf-to-text': {
    title: 'PDF to Text Converter, Free Online', meta: 'Extract all selectable text from a PDF into a .txt file you can copy or download. Free, private, in your browser. Scans need OCR instead.',
    answer: 'PDF to Text pulls the selectable text out of a PDF, page by page, and gives you a plain .txt file. It works on PDFs that contain real text; scanned PDFs need Image to Text (OCR) instead.',
    steps: ['Add the PDF.', 'Click Extract text.', 'Copy the text from the box, or download the .txt file.'],
    faq: [['Why is the result empty?', 'The PDF is probably a scan made of images. Export the pages as images and use the Image to Text tool.'], ['Is the original line order kept?', 'Text is read top to bottom and left to right on each page, with a blank line between pages. Columns and tables may need tidying.'], ['Can I copy the text without downloading?', 'Yes. The extracted text appears in a box with a Copy text button.']],
    io: ['PDF', 'TXT']
  },
  'sign-pdf': {
    title: 'Sign PDF Online, Draw Your Signature', meta: 'Draw your signature with a mouse or finger and place it on a PDF page. Free, private, no sign-up. This is a visual signature, not a certified one.',
    answer: 'Sign PDF lets you draw your signature and place it on the first, last or every page of a PDF, in the position and size you choose. It adds a visual signature image, not a certificate-based digital signature.',
    steps: ['Add the PDF to sign.', 'Draw your signature in the box, then choose the page, position and size.', 'Click Sign PDF and download the signed copy.'],
    faq: [['Is this a legally binding digital signature?', 'It is a visual signature image placed on the page. It does not use a certificate, so check whether the person or authority you are signing for accepts that.'], ['Can I sign on my phone?', 'Yes. Draw with your finger in the signature box.'], ['Can I place the signature anywhere?', 'You can choose bottom right, bottom left, bottom centre or centre, on the first, last or all pages.']],
    io: ['PDF', 'PDF']
  },
  'pdf-to-ppt': {
    title: 'PDF to PowerPoint Converter, Free', meta: 'Turn each PDF page into a PowerPoint slide in your browser. Free and private. Slides are images, so text is not editable.',
    answer: 'PDF to PPT converts each page of a PDF into a slide in a .pptx file. The slides are page images, so they look exactly like the PDF but the text on them cannot be edited.',
    steps: ['Add the PDF.', 'Click Convert to PowerPoint.', 'Download the .pptx file and open it in PowerPoint, Keynote or Google Slides.'],
    faq: [['Can I edit the text on the slides?', 'No. Each slide is an image of the PDF page, so text and shapes are not editable.'], ['What slide size does it use?', 'The slide takes the proportions of the first PDF page.'], ['Does it work on scanned PDFs?', 'Yes. Because pages are used as images, scans convert fine.']],
    io: ['PDF', 'PPTX']
  },

  /* ---------------- IMAGE ---------------- */
  'compress-image': {
    title: 'Image Compressor, Compress JPG PNG WebP', meta: 'Compress images online without uploading them. Shrink JPG, PNG and WebP files with quality control, batch processing, no sign-up, no watermark.',
    answer: 'The image compressor reduces the file size of JPG, PNG and WebP images right in your browser, so your photos are never uploaded. Pick a compression level, add as many images as you like, and download the smaller files.',
    steps: ['Drop your images in, or click Choose images. You can add many at once.', 'Pick Light, Balanced, Strong or Maximum compression. Results update instantly.', 'Download each image, or use Download all.'],
    faq: [['How much smaller will my images be?', 'Typical photos shrink by 40 to 80 percent at Balanced quality with little visible change. Images that are already well compressed may shrink less.'], ['Is PNG compression lossless?', 'Yes. PNG is a lossless format, so the quality slider does not change it. To shrink a PNG, resize it, or convert it to WebP or JPG.'], ['What if the result is bigger than the original?', 'When format and size are unchanged and the new file would be larger, the tool keeps your original and marks it "Already optimal".']],
    io: ['JPG, PNG, WebP', 'JPG, PNG, WebP']
  },
  'resize-image': {
    title: 'Resize Image Online, Exact Pixels', meta: 'Resize JPG, PNG and WebP images to exact pixel dimensions in your browser. Free, private, no sign-up, no watermark.',
    answer: 'Resize Image changes the width and height of a picture to the exact pixel size you enter. It runs in your browser, so your image is not uploaded, and you can download the resized file immediately.',
    steps: ['Add an image.', 'Enter the width and height in pixels.', 'Click Resize Image and download the result.'],
    faq: [['Does it keep the aspect ratio?', 'Turn on Keep proportions and enter one side; the other is calculated for you. Turn it off to stretch the image to exact dimensions.'], ['Which formats can I resize?', 'JPG, PNG, WebP, GIF and BMP images. The result is saved as a JPG.'], ['Will resizing reduce file size?', 'Usually yes, because fewer pixels means a smaller file. For more control use the Image Compressor.']],
    io: ['JPG, PNG, WebP, GIF, BMP', 'JPG']
  },
  'image-to-jpg': {
    title: 'Convert Image to JPG Online, Free', meta: 'Convert PNG, WebP, GIF and BMP images to JPG in your browser. Free, private, no sign-up. Transparent areas become white.',
    answer: 'Convert to JPG changes PNG, WebP, GIF and BMP images into the widely supported JPG format. Transparent areas are filled with white because JPG does not support transparency.',
    steps: ['Add an image.', 'Click Convert to JPG.', 'Download the JPG file.'],
    faq: [['What happens to transparency?', 'JPG cannot store transparency, so transparent areas become white.'], ['Will the quality drop?', 'JPG is a lossy format, so a small amount of detail is lost. The file is saved at high quality (92 percent).'], ['Can I convert many images at once?', 'Not yet. Convert one image at a time, or use the Image Compressor for batches.']],
    io: ['PNG, WebP, GIF, BMP', 'JPG']
  },
  'image-to-png': {
    title: 'Convert Image to PNG Online, Free', meta: 'Convert JPG, WebP, GIF and BMP images to lossless PNG in your browser. Free, private, no sign-up.',
    answer: 'Convert to PNG saves JPG, WebP, GIF and BMP images as lossless PNG files. PNG keeps sharp edges and transparency, which makes it suited to graphics, screenshots and logos.',
    steps: ['Add an image.', 'Click Convert to PNG.', 'Download the PNG file.'],
    faq: [['Does converting JPG to PNG improve quality?', 'No. It cannot restore detail that JPG already removed, but it stops further loss when you edit and save again.'], ['Why is the PNG bigger than the JPG?', 'PNG stores every pixel without discarding detail, so photographs make larger files.'], ['Is transparency preserved?', 'Yes, if the source image has it (for example a WebP or GIF).']],
    io: ['JPG, WebP, GIF, BMP', 'PNG']
  },
  'image-to-webp': {
    title: 'Convert Image to WebP Online, Free', meta: 'Convert JPG, PNG and other images to modern WebP in your browser for smaller files and faster pages. Free and private.',
    answer: 'Convert to WebP changes JPG, PNG, GIF and BMP images into WebP, a modern format that is usually smaller than JPG or PNG at similar quality. It is supported by all current browsers.',
    steps: ['Add an image.', 'Click Convert to WebP.', 'Download the WebP file.'],
    faq: [['Why use WebP?', 'WebP files are typically smaller than equivalent JPG or PNG files, which makes web pages load faster.'], ['Is WebP supported everywhere?', 'All current browsers support it. Some older software and apps cannot open WebP files.'], ['Does WebP support transparency?', 'Yes, WebP supports transparency, like PNG.']],
    io: ['JPG, PNG, GIF, BMP', 'WebP']
  },
  'crop-image': {
    title: 'Crop Image Online, Free', meta: 'Crop JPG, PNG and WebP images by dragging a box, with free or fixed aspect ratios (1:1, 4:3, 16:9, 3:4). Free, private, in your browser.',
    answer: 'Crop Image lets you drag a selection box over your picture, choose a free or fixed shape such as 1:1, 4:3 or 16:9, and download the cropped result as PNG, JPG or WebP. It works in your browser.',
    steps: ['Add an image.', 'Choose a shape, then drag the box and its corners to frame the part you want.', 'Click Crop image and download the result.'],
    faq: [['Can I crop to a square or 16:9?', 'Yes. Pick 1:1, 4:3, 16:9 or 3:4 and the box keeps that ratio while you resize it.'], ['What quality is the cropped image?', 'The crop is taken from the original full-size image, not the preview, so no resolution is lost.'], ['Which formats can I save as?', 'PNG, JPG or WebP.']],
    io: ['JPG, PNG, WebP, GIF, BMP', 'PNG, JPG, WebP']
  },
  'rotate-image': {
    title: 'Rotate and Flip Image Online, Free', meta: 'Rotate images by 90 or 180 degrees and flip them horizontally or vertically in your browser. Free, private, no sign-up.',
    answer: 'Rotate & Flip turns a picture 90 degrees left or right, 180 degrees, and optionally mirrors it horizontally or vertically. It runs in your browser and saves the result as a JPG.',
    steps: ['Add an image.', 'Choose the rotation and, if needed, a flip direction.', 'Click Rotate & Flip and download the result.'],
    faq: [['Can I flip without rotating?', 'Choose a flip direction and rotate by 180 or 90 degrees as needed; combining them covers every orientation.'], ['Is quality lost?', 'The file is re-saved as a high-quality JPG, so there is a very small loss.'], ['Can I rotate by any angle?', 'Not yet. You can rotate by 90 degrees left, 90 degrees right or 180 degrees.']],
    io: ['JPG, PNG, WebP, GIF, BMP', 'JPG']
  },
  'grayscale-image': {
    title: 'Convert Image to Grayscale Online', meta: 'Turn colour photos into black and white in your browser. Free, private, no sign-up, no watermark.',
    answer: 'Grayscale converts a colour image to black and white using standard luminance weights. It runs in your browser and saves the result as a JPG.',
    steps: ['Add a colour image.', 'Click Grayscale.', 'Download the black and white image.'],
    faq: [['How is the grey level calculated?', 'Each pixel uses the common luminance formula (29.9 percent red, 58.7 percent green and 11.4 percent blue), which matches how the eye sees brightness.'], ['Can I get the colours back?', 'No. Keep your original image if you may need the colour version.'], ['What format is the result?', 'A high-quality JPG.']],
    io: ['JPG, PNG, WebP, GIF, BMP', 'JPG']
  },
  'watermark-image': {
    title: 'Add Watermark to Image Online, Free', meta: 'Add a text watermark to your photos in your browser. Choose your own text and opacity. Free, private, no sign-up.',
    answer: 'Watermark Image writes your own text diagonally across a picture with adjustable opacity. It runs in your browser, so your photo is not uploaded, and the result is saved as a JPG.',
    steps: ['Add an image.', 'Type your watermark text and choose the opacity.', 'Click Watermark Image and download the result.'],
    faq: [['Can I use my own text?', 'Yes. Type any text, such as your name or website, and choose how visible it is.'], ['Where is the watermark placed?', 'It is centred across the image at a slight angle.'], ['Can I add a logo?', 'Not yet. This tool adds text watermarks only.']],
    io: ['JPG, PNG, WebP, GIF, BMP', 'JPG']
  },
  'upscale-image': {
    title: 'Upscale Image Online, Enlarge 2x 3x 4x', meta: 'Enlarge images 2x, 3x or 4x with smooth resampling and sharpening, in your browser. Free and private. Not an AI upscaler.',
    answer: 'Upscale Image makes a picture 2, 3 or 4 times larger using smooth resampling followed by optional sharpening. It enlarges cleanly but does not invent new detail the way AI upscalers do.',
    steps: ['Add an image.', 'Choose the scale, sharpening level and output format.', 'Click Upscale image and download the larger version.'],
    faq: [['Is this AI upscaling?', 'No. It uses high-quality resampling and sharpening, so results are cleaner than simple stretching but will not add missing detail.'], ['What is the maximum size?', 'Results larger than about 9,000 pixels on a side, or 64 megapixels, are refused to protect your device.'], ['Which output format is best?', 'PNG keeps every detail but makes big files. JPG and WebP are smaller.']],
    io: ['JPG, PNG, WebP, GIF, BMP', 'PNG, JPG, WebP']
  },
  'image-to-text': {
    title: 'Image to Text (OCR) Online, Free', meta: 'Extract text from images and screenshots with OCR in your browser. English, Urdu, Hindi, Arabic and more. Free, no upload, no sign-up.',
    answer: 'Image to Text uses optical character recognition (OCR) to read the text in a photo or screenshot and give it to you as editable text. It runs in your browser, so the picture is not uploaded.',
    steps: ['Add an image or screenshot that contains text.', 'Choose the language of the text.', 'Click Extract text, then copy the result or download the .txt file.'],
    faq: [['Which languages are supported?', 'English, Urdu, Hindi, Arabic, Spanish, French and German.'], ['Why is the first run slow?', 'The first time you use a language, your browser downloads its recognition data. After that it is quicker.'], ['How can I get better results?', 'Use a sharp, high-resolution picture with dark text on a plain background and straight lines of text.']],
    io: ['JPG, PNG, WebP, GIF, BMP', 'TXT']
  },
  'photo-filter': {
    title: 'Photo Filters Online, Free', meta: 'Apply filters such as Vivid, Warm, Cool, Sepia, Fade and Black and White to your photos in your browser. Free and private.',
    answer: 'Photo Filters applies a one-click look to your picture, such as Vivid, Warm, Cool, Sepia, Fade or Black and White. It runs in your browser and saves the result as a JPG.',
    steps: ['Add a photo.', 'Choose a filter.', 'Click Apply filter and download the result.'],
    faq: [['Which filters are available?', 'Vivid, Warm, Cool, Sepia, Fade and Black and White.'], ['Does it change my original?', 'No. Your original stays untouched; you download a new file.'], ['Can I adjust the strength?', 'Not yet. Each filter has a fixed strength.']],
    io: ['JPG, PNG, WebP, GIF, BMP', 'JPG']
  },

  /* ---------------- VIDEO ---------------- */
  'compress-video': {
    title: 'Compress Video Online, Reduce Size', meta: 'Shrink video files in your browser with H.264 compression. Choose quality and resolution. Free, private, no upload, no sign-up.',
    answer: 'Compress Video makes a video file smaller by re-encoding it with H.264 and AAC, with a choice of quality and maximum resolution. It runs on your own device, so the video is never uploaded.',
    steps: ['Add a video (MP4, MOV, MKV, WebM, AVI and more).', 'Pick the compression level and, if you like, a maximum resolution.', 'Click Compress video and download the smaller MP4.'],
    faq: [['How long does it take?', 'It runs on your device, so time depends on the video length and your computer. Short clips take seconds; long, high-resolution videos can take several minutes.'], ['Is there a size limit?', 'Files over about 700 MB are refused because browsers have limited memory.'], ['What if my video is already small?', 'If a smaller file cannot be made, the tool returns your original unchanged and says so.']],
    io: ['MP4, MOV, MKV, WebM, AVI', 'MP4']
  },
  'trim-video': {
    title: 'Trim Video Online, Cut Clips Free', meta: 'Cut a video to the part you need by setting start and end times. Fast no-re-encode mode or exact mode. Free, private, in your browser.',
    answer: 'Trim Video cuts a video to the start and end times you set. Fast mode copies the video without re-encoding it, which is quick but cuts at the nearest keyframe. Exact mode re-encodes for frame-accurate cuts.',
    steps: ['Add a video.', 'Type the start and end time, such as 0:05 and 0:30, and choose Fast or Exact.', 'Click Trim video and download the clip.'],
    faq: [['What is the difference between Fast and Exact?', 'Fast copies the existing video data, so there is no quality loss and it is quick, but the cut can be a moment off. Exact re-encodes the clip so the cut is precise.'], ['What time formats can I use?', 'Seconds (90), minutes and seconds (1:30), or hours, minutes and seconds (0:01:30).'], ['Can I leave the end time blank?', 'Yes. The clip then runs from your start time to the end of the video.']],
    io: ['MP4, MOV, MKV, WebM, AVI', 'MP4 or the original format']
  },
  'convert-video': {
    title: 'Convert Video Online, MP4 WebM MOV', meta: 'Convert video between MP4, WebM, MOV, MKV and AVI in your browser. Free, private, no upload, no sign-up.',
    answer: 'Convert Video changes a video file into MP4, WebM, MOV, MKV or AVI. The conversion runs in your browser, so the file is not uploaded, and MP4 (H.264 and AAC) works on nearly every device.',
    steps: ['Add a video.', 'Choose the format to convert to.', 'Click Convert video and download the file.'],
    faq: [['Which format should I pick?', 'MP4 works almost everywhere. WebM suits websites, MOV suits Apple software, and MKV and AVI are for specific players.'], ['Will the quality change?', 'The video is re-encoded at good quality (H.264 CRF 23 for MP4, MOV and MKV), so a small loss is possible.'], ['Why is conversion slow?', 'It runs on your device, so long or high-resolution videos take longer.']],
    io: ['MP4, MOV, MKV, WebM, AVI', 'MP4, WebM, MOV, MKV, AVI']
  },
  'merge-videos': {
    title: 'Merge Videos Online, Join Clips Free', meta: 'Join several video clips into one MP4 in your browser. Reorder clips and choose the output size. Free, private, no upload.',
    answer: 'Merge Videos joins two or more clips into a single MP4, in the order you choose. Clips are scaled to one output size (720p, 1080p or 480p) so differently sized videos play smoothly together.',
    steps: ['Add at least two video clips.', 'Use the arrows to set the order and choose the output size.', 'Click Merge videos and download merged.mp4.'],
    faq: [['What if my clips have different sizes?', 'Each clip is scaled to fit the output size you choose, with black bars where needed.'], ['What if one clip has no audio?', 'If some clips have no sound, the merged video has no audio, and the tool tells you.'], ['Is there a limit on clips?', 'Not a fixed one, but the total size must stay under about 700 MB.']],
    io: ['MP4, MOV, MKV, WebM, AVI', 'MP4']
  },
  'extract-audio': {
    title: 'Extract Audio from Video, MP3 M4A WAV', meta: 'Pull the audio track out of any video as MP3, M4A or WAV in your browser. Free, private, no upload, no sign-up.',
    answer: 'Extract Audio saves the sound of a video as an MP3, M4A (AAC) or WAV file. It runs in your browser, so the video is not uploaded.',
    steps: ['Add a video that has sound.', 'Choose MP3, M4A or WAV.', 'Click Extract audio and download the file.'],
    faq: [['Which audio format should I choose?', 'MP3 is the most compatible. M4A gives good quality in smaller files. WAV is uncompressed and large.'], ['What if the video has no audio?', 'The tool tells you that the video has no audio track.'], ['Is the audio quality reduced?', 'MP3 is saved at high quality (VBR level 2). Choose WAV for no compression.']],
    io: ['MP4, MOV, MKV, WebM, AVI', 'MP3, M4A, WAV']
  },
  'mute-video': {
    title: 'Remove Audio from Video Online, Free', meta: 'Remove the sound from a video without re-encoding it, in your browser. Fast, free, private, no upload.',
    answer: 'Remove Audio deletes the sound track from a video and keeps the picture exactly as it is. Because the video is copied without re-encoding, it is fast and loses no quality.',
    steps: ['Add a video.', 'Click Remove audio.', 'Download the silent video.'],
    faq: [['Does removing audio change the video quality?', 'No. The video stream is copied unchanged.'], ['Can I keep the audio and remove it later?', 'Your original file is not changed, so you can keep both versions.'], ['What if my video has no audio already?', 'The tool tells you it already has no audio.']],
    io: ['MP4, MOV, MKV, WebM, AVI', 'Same format']
  },
  'video-to-gif': {
    title: 'Video to GIF Converter, Free Online', meta: 'Turn a part of a video into an animated GIF in your browser. Choose start, length, frame rate and width. Free and private.',
    answer: 'Video to GIF converts a clip of up to 20 seconds into an animated GIF. You choose where it starts, how long it is, the frame rate and the width, and a palette is generated for good colours.',
    steps: ['Add a video.', 'Set the start time, length (up to 20 seconds), frame rate and width.', 'Click Create GIF and download it.'],
    faq: [['Why is my GIF so large?', 'GIFs are inefficient. Use a shorter clip, a lower frame rate (8 fps) or a smaller width (320 px).'], ['What is the maximum length?', '20 seconds.'], ['Is there a watermark?', 'No.']],
    io: ['MP4, MOV, MKV, WebM, AVI', 'GIF']
  },
  'gif-to-video': {
    title: 'GIF to MP4 Converter, Free Online', meta: 'Convert an animated GIF into a small MP4 video in your browser. Free, private, no upload, no sign-up.',
    answer: 'GIF to Video turns an animated GIF into an MP4 video, which is usually much smaller and plays smoothly on phones and websites. The conversion runs in your browser.',
    steps: ['Add a GIF.', 'Click Convert to MP4.', 'Download the MP4.'],
    faq: [['Why convert a GIF to MP4?', 'MP4 files are usually many times smaller than the same animation as a GIF, and they play more smoothly.'], ['Does the MP4 loop?', 'The file is a normal video. Most players and websites can loop it.'], ['Will the colours change?', 'Slightly. MP4 uses a different colour format, but results look very close.']],
    io: ['GIF', 'MP4']
  },
  'rotate-video': {
    title: 'Rotate Video Online, Free', meta: 'Rotate a video 90 degrees left or right, or 180 degrees, in your browser. Free, private, no upload, no sign-up.',
    answer: 'Rotate Video turns a video 90 degrees clockwise, 90 degrees counter-clockwise or 180 degrees and saves it as a new MP4. It is useful for clips filmed sideways or upside down.',
    steps: ['Add a video.', 'Choose the rotation.', 'Click Rotate video and download the MP4.'],
    faq: [['Does rotating re-encode the video?', 'Yes. The picture must be re-drawn, so the result is saved as a new MP4 at good quality.'], ['Can I flip the video instead?', 'Yes, use the Flip Video tool for mirroring.'], ['Is audio kept?', 'Yes, audio is kept.']],
    io: ['MP4, MOV, MKV, WebM, AVI', 'MP4']
  },
  'resize-video': {
    title: 'Resize Video Online, 1080p 720p 480p', meta: 'Change a video to 1080p, 720p, 480p, 360p or 240p in your browser. Free, private, no upload, no sign-up.',
    answer: 'Resize Video changes the height of a video to 1080p, 720p, 480p, 360p or 240p and adjusts the width automatically to keep the proportions. It saves the result as an MP4.',
    steps: ['Add a video.', 'Choose the target height.', 'Click Resize video and download the MP4.'],
    faq: [['Will the aspect ratio change?', 'No. The width is set automatically to keep the original proportions.'], ['Can it make a video bigger?', 'It can scale up, but it cannot add detail, so use it mainly to scale down.'], ['Does resizing make the file smaller?', 'Usually yes, because fewer pixels need to be stored.']],
    io: ['MP4, MOV, MKV, WebM, AVI', 'MP4']
  },
  'video-speed': {
    title: 'Change Video Speed Online, Free', meta: 'Speed up or slow down a video from 0.5x to 4x with audio kept in sync, in your browser. Free, private, no upload.',
    answer: 'Video Speed makes a video play faster (1.5x, 2x, 3x, 4x) or slower (0.75x, 0.5x), and changes the audio speed to match. It runs in your browser and saves an MP4.',
    steps: ['Add a video.', 'Choose a speed.', 'Click Change speed and download the MP4.'],
    faq: [['Does the audio pitch change?', 'No. The audio speed is adjusted without changing its pitch.'], ['What are the speed options?', '0.5x, 0.75x, 1.5x, 2x, 3x and 4x.'], ['What if my video has no audio?', 'Only the picture is processed, and the result has no sound.']],
    io: ['MP4, MOV, MKV, WebM, AVI', 'MP4']
  },
  'add-subtitles': {
    title: 'Add Subtitles to Video Online, SRT VTT', meta: 'Add an SRT or VTT subtitle file to a video as a selectable subtitle track, in your browser. Free, private, no upload.',
    answer: 'Add Subtitles combines a video with an .srt or .vtt subtitle file and saves an MP4 with a selectable subtitle track that viewers can switch on or off. The text is not burned into the picture.',
    steps: ['Add one video file and one .srt or .vtt subtitle file.', 'Click Add subtitles.', 'Download the MP4 and turn subtitles on in your player.'],
    faq: [['Are the subtitles burned into the video?', 'No. They are added as a separate track, so viewers can turn them on or off. Some players and social sites ignore soft subtitle tracks.'], ['Which subtitle formats work?', 'SRT and VTT.'], ['Which videos work best?', 'MP4 and MOV videos are copied without re-encoding. Other formats are converted to MP4.']],
    io: ['MP4, MOV and others + SRT or VTT', 'MP4']
  },
  'flip-video': {
    title: 'Flip Video Online, Mirror Horizontally', meta: 'Flip a video horizontally (mirror) or vertically in your browser. Free, private, no upload, no sign-up.',
    answer: 'Flip Video mirrors a video left to right, or turns it upside down, and saves the result as an MP4. It runs in your browser, so the video is not uploaded.',
    steps: ['Add a video.', 'Choose horizontal or vertical flip.', 'Click Flip video and download the MP4.'],
    faq: [['What is the difference between flip and rotate?', 'Flip makes a mirror image. Rotate turns the video around without mirroring it.'], ['Is audio kept?', 'Yes.'], ['Does it re-encode the video?', 'Yes, at good quality, because every frame must be redrawn.']],
    io: ['MP4, MOV, MKV, WebM, AVI', 'MP4']
  },

  /* ---------------- FILE ---------------- */
  'compress-files': {
    title: 'Create ZIP File Online, Free', meta: 'Put several files into one ZIP archive in your browser. Choose compression level. Free, private, no upload, no sign-up.',
    answer: 'Compress Files packs any number of files into a single ZIP archive. You can choose normal, maximum or no compression. The ZIP is created in your browser, so your files are not uploaded.',
    steps: ['Add the files you want to include.', 'Choose a compression level.', 'Click Create ZIP and download archive.zip.'],
    faq: [['Can I zip any kind of file?', 'Yes, any file type. Folders are not supported; add the files directly.'], ['Can I add a password?', 'No. This tool does not encrypt ZIP files.'], ['Which compression level should I use?', 'Normal suits most files. Maximum makes slightly smaller files but is slower. None only bundles the files.']],
    io: ['Any files', 'ZIP']
  },
  'extract-zip': {
    title: 'Extract ZIP File Online, Free', meta: 'Open a ZIP archive and download its files in your browser. Free, private, no upload, no sign-up.',
    answer: 'Extract ZIP opens a ZIP archive in your browser and lists the files inside, so you can download them one by one or all together. Nothing is uploaded.',
    steps: ['Add a ZIP file.', 'Click Extract ZIP.', 'Download individual files, or all of them.'],
    faq: [['Can I open password-protected ZIP files?', 'No. Encrypted archives are not supported.'], ['Does it keep folder structure?', 'Files are listed by name. Folder paths are not recreated.'], ['Which archive types work?', 'ZIP only. RAR and 7z are not supported.']],
    io: ['ZIP', 'Files']
  },
  'json-formatter': {
    title: 'JSON Formatter and Validator Online', meta: 'Format, beautify and validate JSON instantly in your browser. See clear error messages. Free, private, no sign-up.',
    answer: 'JSON Formatter checks that your JSON is valid and rewrites it with clean indentation so it is easy to read. If something is wrong it shows the error message from the parser.',
    steps: ['Paste your JSON into the input box.', 'The formatted result appears on the right, with a valid or error message.', 'Click Copy JSON to copy the result.'],
    faq: [['Does it validate JSON?', 'Yes. It shows "Valid JSON" or the parser error message.'], ['Is my data sent anywhere?', 'No. Formatting happens in your browser.'], ['How is the output indented?', 'With two spaces per level.']],
    io: ['JSON', 'Formatted JSON']
  },
  'csv-to-json': {
    title: 'CSV to JSON Converter Online, Free', meta: 'Convert CSV data to JSON in your browser. Handles quoted fields, commas, semicolons and tabs. Free, private, no sign-up.',
    answer: 'CSV to JSON turns pasted CSV data into a JSON array of objects, using the first row as keys. It handles quoted fields and detects commas, semicolons or tabs as separators.',
    steps: ['Paste your CSV, with a header row, into the input box.', 'The JSON appears on the right as you type.', 'Click Copy JSON.'],
    faq: [['Does it handle commas inside quotes?', 'Yes. Quoted fields, including escaped quotes, are parsed correctly.'], ['Which separators are detected?', 'Commas, semicolons and tabs, based on the first line.'], ['Are numbers converted to numbers?', 'No. Every value is output as text.']],
    io: ['CSV', 'JSON']
  },
  'base64-encode': {
    title: 'Base64 Encode and Decode Online', meta: 'Encode text to Base64 or decode Base64 back to text, with UTF-8 support. Free, private, instant, in your browser.',
    answer: 'Base64 Encoder converts text to Base64 and decodes Base64 back to readable text, including characters outside basic English (UTF-8). It runs in your browser.',
    steps: ['Choose Encode or Decode.', 'Type or paste your text.', 'Click Copy Result.'],
    faq: [['What is Base64?', 'Base64 is a way to represent data using only letters, digits, plus and slash, so it can travel safely through systems that handle only text.'], ['Is Base64 encryption?', 'No. Anyone can decode it, so never use it to protect secrets.'], ['Does it support emoji and other languages?', 'Yes, text is handled as UTF-8.']],
    io: ['Text', 'Base64']
  },
  'url-encode': {
    title: 'URL Encode and Decode Online, Free', meta: 'Percent-encode text for URLs or decode it back, instantly in your browser. Free, private, no sign-up.',
    answer: 'URL Encoder converts text into percent-encoded form that is safe to use in a web address, and decodes it back. For example a space becomes %20 and an ampersand becomes %26.',
    steps: ['Choose Encode or Decode.', 'Type or paste your text.', 'Click Copy Result.'],
    faq: [['Which characters are encoded?', 'Everything except letters, digits and - _ . ! ~ * \' ( ), using the standard encodeURIComponent rules.'], ['What does decode do with invalid input?', 'It shows "Invalid input" instead of guessing.'], ['Should I encode a whole URL?', 'Encode only the parts you add, such as query values. Encoding a full URL also encodes its slashes and colons.']],
    io: ['Text', 'Encoded text']
  },
  'hash-gen': {
    title: 'Hash Generator, SHA-256 SHA-1 SHA-512', meta: 'Generate SHA-256, SHA-1 and SHA-512 hashes from text in your browser. Free, private, instant, nothing is sent anywhere.',
    answer: 'Hash Generator creates SHA-256, SHA-1 and SHA-512 hashes of any text using your browser\'s built-in cryptography. Your text is never sent to a server.',
    steps: ['Type or paste your text.', 'The three hashes appear instantly.', 'Copy the one you need.'],
    faq: [['Is MD5 included?', 'No. MD5 is not available in the browser\'s crypto functions and is not secure. SHA-256 is the recommended choice.'], ['Can a hash be reversed?', 'No. Hashes are one-way, though weak hashes of common words can be looked up.'], ['Can I hash a file?', 'Not yet. This tool hashes text only.']],
    io: ['Text', 'SHA-256, SHA-1, SHA-512']
  },
  'xml-formatter': {
    title: 'XML Formatter and Validator Online', meta: 'Format and validate XML with clean indentation in your browser. Free, private, no sign-up.',
    answer: 'XML Formatter checks that your XML is well formed and rewrites it with indentation so the structure is easy to read. If the XML is invalid it shows an error.',
    steps: ['Paste your XML into the input box.', 'The formatted XML appears on the right.', 'Click Copy XML.'],
    faq: [['Does it validate XML?', 'It checks that the XML is well formed. It does not validate against a schema (XSD).'], ['Is my XML uploaded?', 'No. It is processed in your browser.'], ['Are comments and attributes kept?', 'Yes, they are preserved.']],
    io: ['XML', 'Formatted XML']
  },
  'xls-converter': {
    title: 'XLS Converter, XLSX CSV ODS Online', meta: 'Convert spreadsheets between XLSX, XLS, CSV, ODS and HTML in your browser. Free, private, no upload, no sign-up.',
    answer: 'XLS Converter converts a spreadsheet between Excel (.xlsx, .xls), CSV, OpenDocument (.ods) and HTML table formats. It runs in your browser, so your data stays on your device.',
    steps: ['Add a spreadsheet (XLSX, XLS, CSV or ODS).', 'Choose the format to convert to.', 'Click Convert and download the file.'],
    faq: [['What happens with several sheets?', 'XLSX, XLS, ODS and HTML keep all sheets. CSV can hold one sheet only, so each sheet is saved as its own CSV file.'], ['Are formulas kept?', 'Formulas are kept when converting between Excel formats; CSV stores the calculated values.'], ['Is there a size limit?', 'No fixed limit, but very large files depend on your device memory.']],
    io: ['XLSX, XLS, CSV, ODS', 'XLSX, XLS, CSV, ODS, HTML']
  },

  /* ---------------- TEXT ---------------- */
  'word-counter': {
    title: 'Word Counter and Character Counter', meta: 'Count words, characters, sentences, paragraphs and reading time as you type. Free, private, no sign-up.',
    answer: 'Word Counter counts the words, characters, sentences and paragraphs in your text as you type, and estimates reading time at 200 words per minute.',
    steps: ['Type or paste your text into the box.', 'Read the live counts above it.', 'Edit your text until you reach your target length.'],
    faq: [['How are words counted?', 'Words are groups of characters separated by spaces or line breaks.'], ['How is reading time calculated?', 'At 200 words per minute, rounded up to whole minutes.'], ['Is my text stored?', 'No. It stays in your browser and is not saved or sent anywhere.']],
    io: ['Text', 'Counts']
  },
  'case-converter': {
    title: 'Case Converter, UPPER lower Title camelCase', meta: 'Convert text to UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case or kebab-case. Free and instant.',
    answer: 'Case Converter changes the capitalisation of your text to uppercase, lowercase, title case, sentence case, camelCase, PascalCase, snake_case or kebab-case with one click.',
    steps: ['Type or paste your text into Input.', 'Click the case style you want.', 'Click Copy Result.'],
    faq: [['What is the difference between camelCase and PascalCase?', 'camelCase starts with a lowercase letter (myVariableName). PascalCase starts with a capital (MyVariableName).'], ['What is snake_case?', 'Words are lowercase and joined by underscores, for example my_variable_name.'], ['Does Title Case follow style guides?', 'It capitalises the first letter of every word. It does not skip small words like "of" or "the".']],
    io: ['Text', 'Text']
  },
  'text-reverser': {
    title: 'Text Reverser, Reverse Text Words Lines', meta: 'Reverse the characters, words or lines of any text instantly. Free, private, no sign-up.',
    answer: 'Text Reverser flips your text by characters, by words or by lines. Type or paste text and the reversed version appears instantly.',
    steps: ['Type or paste your text.', 'Choose Reverse Characters, Reverse Words or Reverse Lines.', 'Click Copy Result.'],
    faq: [['What is the difference between the three modes?', 'Characters reverses every letter ("abc" becomes "cba"), words reverses the order of words, and lines reverses the order of lines.'], ['Does it work with emoji?', 'Basic emoji work, but some multi-part emoji may be split when reversing characters.'], ['Is my text saved?', 'No. It stays in your browser.']],
    io: ['Text', 'Text']
  }
};

const cats = {
  pdf: {
    title: 'Free PDF Tools Online', meta: 'Merge, split, compress, rotate, sign and convert PDFs in your browser. 15 free PDF tools with no sign-up, no watermark and no upload.',
    h1: 'Free PDF tools', answer: 'These PDF tools run in your browser, so your documents are never uploaded. Merge, split, rotate, compress, watermark and sign PDFs, or convert them to and from JPG, PNG, Word, Excel and PowerPoint.',
    faq: [['Are these PDF tools really free?', 'Yes. There is no account, no watermark and no usage limit.'], ['Are my PDFs uploaded?', 'No. They are processed on your device in your browser.'], ['Can I convert a scanned PDF to Word?', 'Not directly. Scans contain pictures of text, so use PDF to JPG and then Image to Text (OCR) to get the text.']]
  },
  image: {
    title: 'Free Image Tools Online', meta: 'Compress, resize, crop, convert, rotate and upscale images in your browser. 12 free image tools with no upload and no sign-up.',
    h1: 'Free image tools', answer: 'These image tools work in your browser, so your photos stay on your device. Compress, resize, crop, rotate, convert between JPG, PNG and WebP, add watermarks and filters, upscale, and extract text with OCR.',
    faq: [['Which image formats are supported?', 'JPG, PNG, WebP, GIF and BMP for most tools; the compressor supports JPG, PNG and WebP.'], ['Do the tools reduce quality?', 'Only when you choose to compress or convert to a lossy format such as JPG or WebP.'], ['Is there a file size limit?', 'No fixed limit, but very large images depend on your device memory.']]
  },
  video: {
    title: 'Free Video Tools Online', meta: 'Compress, trim, convert, merge, rotate and speed up videos in your browser. 13 free video tools with no upload and no sign-up.',
    h1: 'Free video tools', answer: 'These video tools run on your own device, so your videos are never uploaded. Compress, trim, convert, merge, resize, rotate, flip, change speed, extract audio, make GIFs and add subtitle tracks.',
    faq: [['Why does the first video tool take a moment to start?', 'It downloads a video engine of about 30 MB the first time. Your browser then keeps it for next time.'], ['Is there a video size limit?', 'Files over about 700 MB are refused because browsers have limited memory.'], ['How long does processing take?', 'It depends on the video length and your device. Short clips take seconds; long, high-resolution videos can take minutes.']]
  },
  file: {
    title: 'Free File and Developer Tools Online', meta: 'Create and extract ZIP files, convert spreadsheets, format JSON and XML, convert CSV to JSON, and encode Base64, URLs and hashes. Free, private.',
    h1: 'Free file and data tools', answer: 'Create and open ZIP archives, convert spreadsheets, and format or convert data, including JSON, XML, CSV, Base64, URL encoding and SHA hashes. Everything runs in your browser.',
    faq: [['Is my data sent to a server?', 'No. All tools in this category process your data in your browser.'], ['Can I open RAR or 7z files?', 'No. Only ZIP archives are supported.'], ['Which spreadsheet formats can I convert?', 'XLSX, XLS, CSV, ODS and HTML.']]
  },
  write: {
    title: 'Free Text Tools Online', meta: 'Count words and characters, change text case and reverse text instantly. Free text tools that run in your browser with no sign-up.',
    h1: 'Free text tools', answer: 'Count words, characters, sentences and reading time, convert text between cases such as Title Case and snake_case, and reverse text by characters, words or lines. Your text never leaves your browser.',
    faq: [['Is my text saved?', 'No. It stays in your browser and is not stored or sent anywhere.'], ['Do these tools use AI?', 'No. They are simple, fast text utilities.'], ['Is there a text length limit?', 'No fixed limit, though very long texts depend on your device.']]
  }
};

const home = {
  title: 'Free Image Compressor and Online File Tools',
  meta: 'Compress images online in your browser with no upload. Plus 50+ free PDF, video, file and text tools. No sign-up, no watermark, private by design.',
  faq: [
    ['What is TinyWow Now?', 'TinyWow Now is a free website with image, PDF, video, file and text tools. Every tool runs in your browser, so your files are processed on your own device and are not uploaded.'],
    ['How do I compress an image online?', 'Drop your JPG, PNG or WebP images into the compressor at the top of the page, choose Light, Balanced, Strong or Maximum compression, and download the smaller files. You can add many images at once.'],
    ['Are my files uploaded to a server?', 'No. The tools run in your browser. Some tools download a helper library the first time you use them, but your files are never sent to us or anyone else.'],
    ['Is TinyWow Now really free?', 'Yes. There is no sign-up, no watermark and no usage limit.'],
    ['Which tools are available?', 'Over 50 tools: an image compressor, resizer and converter; PDF merge, split, compress, sign and convert tools; video compress, trim, convert and merge tools; ZIP, spreadsheet and JSON tools; and text utilities.'],
    ['Does it work on my phone?', 'Yes. The site works in modern phone browsers. Video tools can be slow on older phones because they run on the device.']
  ]
};

const pages = {
  about: {
    title: 'About TinyWow Now', meta: 'TinyWow Now is a free set of image, PDF, video, file and text tools that run in your browser, so your files stay private.',
    h1: 'About TinyWow Now',
    body: `<p>TinyWow Now is a free collection of everyday tools for images, PDFs, videos, files and text. We built it for one reason: most online tools make you upload your files to someone else's server. Ours don't.</p>
<h2>Private by design</h2>
<p>Every tool runs in your web browser, on your own device. Your images, documents and videos are processed locally and are not uploaded to our servers. Some tools download a helper library (for example the PDF or video engine) the first time you use them; your files are never part of that download.</p>
<h2>Free and simple</h2>
<p>There is no account to create, no watermark on your results and no usage limit. We aim to keep each tool simple: add a file, choose an option, download the result.</p>
<h2>Honest about limits</h2>
<p>Doing everything in the browser has trade-offs, and we say so on each tool's page. For example, PDF compression turns pages into images, and PDF to Word extracts text without keeping the layout. Very large files depend on your device's memory.</p>
<h2>Contact</h2>
<p>Questions, bug reports or ideas for new tools are welcome on our <a href="/contact">contact page</a>.</p>`
  },
  privacy: {
    title: 'Privacy Policy', meta: 'How TinyWow Now handles your data: files are processed in your browser and are not uploaded. Read what little we collect.',
    h1: 'Privacy Policy',
    body: `<p><strong>Last updated: {date}</strong></p>
<h2>Your files</h2>
<p>All tools on TinyWow Now process files in your web browser, on your device. Your images, PDFs, videos, text and other files are not uploaded to our servers and we cannot see them.</p>
<h2>Libraries loaded from other servers</h2>
<p>To keep the site fast, some tools load helper libraries (for example for PDF, spreadsheet, text recognition and presentation handling) from public content delivery networks such as cdnjs, jsDelivr and unpkg, and fonts from Google Fonts. Those requests reveal your IP address and browser details to those providers, as with any website, but they never include your files.</p>
<h2>Data we store</h2>
<p>Your browser stores one small setting on your device (your light or dark theme choice). We do not use accounts and we do not ask for personal information to use the tools.</p>
<h2>Hosting and logs</h2>
<p>The site is hosted on Vercel, which may keep standard server logs (such as IP address, page requested and time) for security and operation.</p>
<h2>Cookies and analytics</h2>
<p>We do not use advertising cookies. If we add analytics or advertising in the future, we will update this policy first.</p>
<h2>Children</h2>
<p>The site is a general-purpose utility and is not directed at children under 13.</p>
<h2>Changes and contact</h2>
<p>We may update this policy and will change the date above when we do. Questions? See our <a href="/contact">contact page</a>.</p>`
  },
  terms: {
    title: 'Terms of Use', meta: 'The terms for using TinyWow Now, a free set of browser-based image, PDF, video, file and text tools.',
    h1: 'Terms of Use',
    body: `<p><strong>Last updated: {date}</strong></p>
<h2>Using the tools</h2>
<p>TinyWow Now provides free browser-based tools. You may use them for personal or commercial purposes, as long as you use them lawfully and have the right to process the files you add.</p>
<h2>Your content</h2>
<p>You keep all rights to your files. Because processing happens in your browser, we do not receive or store your files.</p>
<h2>No warranty</h2>
<p>The tools are provided "as is", without warranties of any kind. Results can differ from the original (for example, compression and conversion can change quality, layout or formatting). Always keep a copy of your original files and check results before relying on them. A drawn signature added with Sign PDF is a visual mark, not a certified digital signature.</p>
<h2>Limitation of liability</h2>
<p>To the extent allowed by law, TinyWow Now is not liable for any loss or damage arising from your use of the tools or the site.</p>
<h2>Acceptable use</h2>
<p>Do not use the site to break the law, to attack or overload it, or to process content you have no right to use.</p>
<h2>Changes</h2>
<p>We may change the tools or these terms. Continued use after a change means you accept the updated terms.</p>
<h2>Contact</h2>
<p>See our <a href="/contact">contact page</a>.</p>`
  },
  contact: {
    title: 'Contact TinyWow Now', meta: 'Contact TinyWow Now with questions, bug reports or ideas for new tools.',
    h1: 'Contact us',
    body: `<p>We read every message. Write to us with a question, a bug report, or an idea for a new tool.</p>
<p><strong>Email:</strong> <a href="mailto:{email}">{email}</a></p>
<h2>Reporting a problem</h2>
<p>To help us fix a bug quickly, please tell us which tool you used, what you expected, what happened instead, and which browser and device you were using. Please do not send private files by email.</p>
<h2>Suggesting a tool</h2>
<p>Tell us what you are trying to do and which file types are involved. Tools that can run safely in the browser are the easiest to add.</p>`
  }
};

module.exports = { tools, cats, home, pages, PRIVACY_Q };
