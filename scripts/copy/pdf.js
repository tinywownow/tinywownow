/* PDF cluster copy. Blueprint per tool (every tool follows it exactly):
   title, meta, answer, steps[3], use[3], tips[4], limits[3], faq[4], next[3] = [toolId, reason], io[2].
   Rules: active voice, short sentences, no apostrophes, "the tool" as the subject, only true claims. */
'use strict';
module.exports = {
  'merge-pdf': {
    title: 'Merge PDF Files Online, Free',
    meta: 'Combine several PDF files into one document in your browser. Set the order, keep the text selectable, and skip the upload. Free, with no sign-up.',
    answer: 'Merge PDF joins two or more PDF files into one document, in the order you choose. It runs in your browser, so your files stay on your device, and the merged PDF keeps selectable text and original image quality.',
    steps: ['Drag in two or more PDF files, or click Choose files.', 'Move the files up or down until they sit in the order you want.', 'Click Merge PDF, then download merged.pdf.'],
    use: ['You need one file for a job application with a CV, cover letter and certificates.', 'You want to join scanned pages from several sessions into one document.', 'A portal accepts only one PDF, but you have several.'],
    tips: [
      'Set the final order first. The merged pages follow the list from top to bottom.',
      'Need only some pages from a file? Extract them with <a href="/split-pdf">Split PDF</a>, then merge the extracts.',
      'Want proof that nothing leaves your device? Read <a href="/blog/merge-pdf-without-uploading">how to merge PDF files without uploading them</a>.',
      'Compress the merged file with <a href="/compress-pdf">Compress PDF</a> only when you must, because that tool turns pages into images.'
    ],
    limits: ['The tool cannot merge password-protected PDFs. Remove the password first, and the tool names the protected file.', 'Your device memory sets the practical limit. A few dozen normal documents merge without trouble on most computers.', 'The tool joins whole files. It does not reorder single pages inside a file.'],
    faq: [
      ['How many PDF files can I merge at once?', 'You can merge as many files as your device memory allows. A few dozen normal documents merge without trouble on most computers.'],
      ['Does merging reduce quality?', 'No. The tool copies pages as they are, so text stays selectable and images keep their original quality.'],
      ['Can I change the order after I add the files?', 'Yes. Use the up and down arrows next to each file. The merged pages follow the order of the list.'],
      ['Why does the tool refuse one of my files?', 'The file is probably password protected or damaged. Remove the password in the app that created the file, then try again.']
    ],
    next: [['split-pdf', 'Extract only the pages you need before you merge.'], ['rotate-pdf', 'Straighten sideways pages before you merge.'], ['compress-pdf', 'Shrink a large merged scan for email.']],
    io: ['PDF', 'PDF']
  },
  'split-pdf': {
    title: 'Split PDF into Pages Online, Free',
    meta: 'Split a PDF into single pages or extract chosen page ranges into a new PDF. Free and private, with no upload and no sign-up.',
    answer: 'Split PDF separates one PDF into single pages, or extracts the pages you choose, such as 1-3, 5, 8-10, into a new PDF. It runs in your browser, so nothing leaves your device.',
    steps: ['Add the PDF you want to split.', 'Choose every page as its own PDF, or type the page ranges you want.', 'Click Split PDF, then download the files or one ZIP.'],
    use: ['You need one chapter or form from a long document.', 'You want to send a client only the pages that concern them.', 'You want to drop unwanted pages before you merge files.'],
    tips: [
      'Type ranges such as 1-3, 5, 8-10 to pull several sections into one new PDF.',
      'Type a page past the end of the file and the tool tells you how many pages the file has.',
      'Splitting every page of a long document creates many files, so download them together as a ZIP.',
      'Changed your mind about the order? Put the pieces back together with <a href="/merge-pdf">Merge PDF</a>.'
    ],
    limits: ['The tool cannot split password-protected PDFs. Remove the password first.', 'Extracted ranges keep their original page order. The tool does not reorder pages.', 'Splitting every page of a long PDF depends on your device memory.'],
    faq: [
      ['How do I extract only certain pages?', 'Choose Extract page ranges and type the pages, separated by commas, such as 2, 4-6. You get one new PDF with only those pages.'],
      ['What happens when I split every page?', 'Each page becomes its own PDF, named after the original file plus the page number. With several files, you can download them together as a ZIP.'],
      ['Does splitting change my pages?', 'No. The tool copies the pages unchanged, so text stays selectable and images keep their quality.'],
      ['Can I split a password-protected PDF?', 'No. Remove the password in the app that created the file, then split it.']
    ],
    next: [['merge-pdf', 'Join the pieces again in a new order.'], ['rotate-pdf', 'Fix pages that open sideways.'], ['compress-pdf', 'Shrink a large extract before you send it.']],
    io: ['PDF', 'PDF (one or many)']
  },
  'compress-pdf': {
    title: 'Compress PDF Online, Reduce File Size',
    meta: 'Shrink scanned and image-heavy PDFs in your browser. Choose light, recommended or strong compression. Free, private and with no sign-up.',
    answer: 'Compress PDF shrinks scanned and image-heavy PDFs by redrawing each page as an optimised image. The text in the compressed copy is no longer selectable, so the tool works best for scans and picture-based documents.',
    steps: ['Add the PDF you want to make smaller.', 'Pick Light, Recommended or Strong compression.', 'Click Compress PDF, then compare the sizes before and after.'],
    use: ['An upload portal rejects your scanned PDF as too large.', 'You want to email a photo-heavy PDF without hitting the attachment limit.', 'You need a smaller archive copy of a scan and do not need the text.'],
    tips: [
      'Check your file first. A PDF that is mostly text may not shrink, because the tool redraws pages as images.',
      'Start with Recommended. Choose Strong only when the result still exceeds your limit.',
      'Keep the original. The compressed copy has no searchable or copyable text.',
      'Run <a href="/ocr-pdf">OCR PDF</a> on the compressed copy when you need to search it again.'
    ],
    limits: ['The tool turns every page into an image, so you lose selectable text.', 'The tool returns your original file when it cannot make a smaller one.', 'The tool has no target-size setting. You pick a level and check the result.'],
    faq: [
      ['How much smaller will my PDF get?', 'It depends on the content. Scans and photo-heavy PDFs often shrink a lot. In our test, a PDF full of photos dropped by about 79 percent, while simple text PDFs may not shrink at all.'],
      ['What if my PDF is already small?', 'The tool returns your original file unchanged and tells you so, so you never get a bigger result.'],
      ['Can I still select text after compression?', 'No. The tool saves pages as images, so you cannot select or search the text. Keep the original, or run OCR PDF on the compressed copy.'],
      ['Which level should I choose?', 'Choose Light for the best quality, Recommended for a good balance, and Strong for the smallest file.']
    ],
    next: [['ocr-pdf', 'Make a compressed scan searchable again.'], ['split-pdf', 'Cut out only the pages you need to send.'], ['merge-pdf', 'Combine files before you compress them.']],
    io: ['PDF', 'PDF']
  },
  'ocr-pdf': {
    title: 'OCR PDF Online, Make Scanned PDF Searchable',
    meta: 'Turn a scanned PDF into a searchable, copyable PDF with OCR in your browser. Free and private, with no upload. Urdu, Hindi and Arabic give a text file.',
    answer: 'OCR PDF reads the text in a scanned PDF and adds it as an invisible layer on top of your original pages. The PDF becomes searchable, you can select and copy its text, and the tool also gives you a .txt file. Everything runs in your browser.',
    steps: ['Add a scanned PDF.', 'Choose the language of the text and, if you want, the pages to read.', 'Click Make PDF searchable, then download the PDF and the text file.'],
    use: ['You need to search a scanned contract, invoice or letter.', 'You want to copy text out of a scan without retyping it.', 'You plan to convert a scan to Word, Excel or plain text.'],
    tips: [
      'Use the clearest scan you have. Sharp, straight, high-contrast pages read best.',
      'On a long document, type the pages you need in the Pages box. The tool leaves pages that already contain text unchanged.',
      'The tool keeps your original page images and adds text underneath, so the file grows only a little.',
      'Search the result, then use it with <a href="/pdf-to-text">PDF to Text</a>, <a href="/pdf-to-word">PDF to Word</a> or <a href="/pdf-to-excel">PDF to Excel</a>. Check names and numbers by eye.'
    ],
    limits: ['English, Spanish, French and German give a searchable PDF. Urdu, Hindi and Arabic give a text file only.', 'The tool reads up to 100 pages at a time.', 'Handwriting, faint scans and tilted photos read poorly.'],
    faq: [
      ['What is the difference between OCR PDF and Image to Text?', 'Image to Text reads one picture and returns plain text. OCR PDF reads a whole PDF, keeps your pages exactly as they look, and adds the text underneath so the PDF itself becomes searchable.'],
      ['Does OCR PDF change how my PDF looks?', 'No. The tool keeps the original pages and adds the recognised text as an invisible layer. The pages look the same, but you can now search and copy text.'],
      ['Why do Urdu, Hindi and Arabic give only a text file?', 'The searchable layer needs a Latin-script font. The tool reads those languages and gives you the text, but it cannot place the text inside the PDF.'],
      ['What happens to pages that already have text?', 'The tool detects them and leaves them as they are, so it never reads a page twice.']
    ],
    next: [['pdf-to-text', 'Extract the recognised text.'], ['pdf-to-word', 'Turn the searchable PDF into an editable document.'], ['image-to-text', 'Read a single photo or screenshot instead.']],
    io: ['PDF (scanned)', 'PDF and TXT']
  },
  'pdf-to-word': {
    title: 'PDF to Word Converter, Free Online',
    meta: 'Extract the text from a PDF into an editable Word (.docx) file. Runs in your browser, free, with no sign-up. The tool does not keep layout or images.',
    answer: 'PDF to Word extracts the text from a PDF and saves it as an editable .docx file. It keeps paragraphs and page breaks, but not the layout, fonts or images, and it needs a PDF with real text instead of a scan.',
    steps: ['Add a PDF that contains selectable text.', 'Click Convert to Word.', 'Download the .docx file and open it in Word, Google Docs or LibreOffice.'],
    use: ['You need to quote or rewrite the words of a PDF report.', 'You want to reuse text from a PDF in an email or document.', 'You plan to translate a PDF and need the text in an editor.'],
    tips: [
      'Select a word in your PDF viewer first. If you cannot, the PDF is a scan, and this tool finds no text.',
      'Expect to reformat. You get the words, paragraphs and page breaks, but not columns, tables, fonts or pictures.',
      'For a scan, run <a href="/ocr-pdf">OCR PDF</a> first, then convert the searchable PDF.',
      'The .docx opens in Word, Google Docs, LibreOffice and Pages, so you can fix the layout in your favourite editor.'
    ],
    limits: ['The tool drops images, tables, columns and fonts.', 'The tool finds no text in scanned PDFs.', 'Complex layouts, such as multi-column pages, need manual tidying afterwards.'],
    faq: [
      ['Will the layout and images stay?', 'No. This tool extracts text only. Tables, images, columns and fonts do not carry over, so expect to reformat the document.'],
      ['Why do I see a "no selectable text" message?', 'The PDF is probably a scan, which holds pictures of text. Run OCR PDF first to add a text layer, then convert the searchable PDF.'],
      ['Which file format does the tool create?', 'It creates a standard .docx file that opens in Microsoft Word, Google Docs, LibreOffice and Pages.'],
      ['Can I convert a PDF that has several columns?', 'Yes, but the tool reads the text line by line, so columns can mix. Tidy the result in your editor.']
    ],
    next: [['ocr-pdf', 'Add a text layer to a scan first.'], ['pdf-to-text', 'Get plain text without a Word file.'], ['word-to-pdf', 'Turn your edited text back into a PDF.']],
    io: ['PDF', 'DOCX']
  },
  'pdf-to-jpg': {
    title: 'PDF to JPG Converter, Free Online',
    meta: 'Convert every page of a PDF to a JPG image, or pick specific pages. Choose the quality and download a ZIP. Free and private, in your browser.',
    answer: 'PDF to JPG turns each page of a PDF into a JPG image. You can convert all pages or only chosen ones, pick the quality, and download the images one by one or as a ZIP. Everything runs in your browser.',
    steps: ['Add the PDF you want to convert.', 'Choose a quality (Small, Standard or High) and, if you want, the pages.', 'Click Convert to JPG, then download the images or the ZIP.'],
    use: ['You want to post a PDF page on social media or in a chat.', 'You need page images for a presentation or a website.', 'You want a quick preview image of a document.'],
    tips: [
      'Pick Small for quick previews, Standard for the screen, and High when small text must stay sharp.',
      'On a long PDF, convert only the pages you need, such as 2-4. It runs faster and gives you fewer files.',
      'Text, line art and screenshots stay crisper as PNG, so try <a href="/pdf-to-png">PDF to PNG</a> when JPG edges look soft.',
      'Several pages produce several images. Download them together as one ZIP.'
    ],
    limits: ['The tool makes one JPG per page, so a long PDF produces many files.', 'Standard renders pages at 1.5 times their PDF size, High at 2 times and Small at 1 time.', 'JPG compresses with some loss, so fine text can look soft on Small.'],
    faq: [
      ['What resolution do the images have?', 'Standard renders pages at 1.5 times their PDF size, High at 2 times and Small at 1 time. Higher settings give sharper but larger files.'],
      ['Can I convert a single page?', 'Yes. Type the page number, or a range such as 2-4, in the Pages box.'],
      ['Do I get one file or many?', 'You get one JPG per page. With several pages, you can download them all together as a ZIP.'],
      ['Should I choose JPG or PNG?', 'Choose JPG for pages with photos, because the files stay smaller. Choose PNG for text, line art and screenshots, because the edges stay sharp.']
    ],
    next: [['pdf-to-png', 'Keep sharp text and line art.'], ['compress-image', 'Shrink the page images for sharing.'], ['jpg-to-pdf', 'Turn edited images back into a PDF.']],
    io: ['PDF', 'JPG']
  },
  'jpg-to-pdf': {
    title: 'JPG to PDF Converter, Free Online',
    meta: 'Turn JPG, PNG and WebP images into one PDF. Reorder pages, fit to A4 or keep the image size. Free and private, with no sign-up.',
    answer: 'JPG to PDF combines one or more images into a single PDF, with one image per page. You can place each image on an A4 page or keep its own size, and you can reorder the pages before you create the file.',
    steps: ['Add your images (JPG, PNG, WebP, GIF or BMP).', 'Set the page order and choose A4 or same-size pages.', 'Click Create PDF, then download images.pdf.'],
    use: ['You need to send photographed documents as one file.', 'A form asks for a PDF, but you only have photos.', 'You want to turn a set of screenshots into a printable document.'],
    tips: [
      'Choose A4 pages for printing and same-size pages when each image should keep its own proportions.',
      'Arrange the images before you click Create PDF. Pages follow the order in the list.',
      'The PDF grows to about the size of your images added together, so shrink big photos first with <a href="/compress-image">Compress Image</a>.',
      'Photographing a document? Crop away the table and background first with <a href="/crop-image">Crop Image</a>.'
    ],
    limits: ['The PDF holds your images as pictures, so the text inside photos stays unsearchable until you run OCR PDF.', 'The tool converts non-JPG images to PNG inside the PDF to keep transparency and quality.', 'Many large photos depend on your device memory.'],
    faq: [
      ['Which image formats can I use?', 'Use JPG, PNG, WebP, GIF or BMP. The tool converts non-JPG images to PNG inside the PDF, so transparency and quality stay intact.'],
      ['Can I put many images in one PDF?', 'Yes. Add as many as you like. Each image becomes its own page, in the order shown.'],
      ['Does the PDF reduce my image quality?', 'No. The tool embeds JPG images as they are, so their quality does not drop.'],
      ['Can I search the text in my photos?', 'Not at first. The PDF holds pictures, not text. Run OCR PDF on the result to make it searchable.']
    ],
    next: [['ocr-pdf', 'Make a photographed document searchable.'], ['merge-pdf', 'Combine the new PDF with other files.'], ['compress-pdf', 'Shrink a photo-heavy PDF for email.']],
    io: ['JPG, PNG, WebP', 'PDF']
  },
  'word-to-pdf': {
    title: 'Word to PDF Converter (Text Only)',
    meta: 'Convert the text of a .docx Word file into a PDF in your browser. Free and private. The tool does not keep images, tables or fancy formatting.',
    answer: 'Word to PDF converts the text of a .docx document into a simple A4 PDF. It does not keep images, tables, fonts or styling, so it suits plain text documents better than formatted reports.',
    steps: ['Add a .docx Word file.', 'Click Convert to PDF.', 'Download the PDF.'],
    use: ['You need a quick PDF copy of a plain letter or note.', 'You want to share text without sending an editable file.', 'You have a .docx file but no Word on this device.'],
    tips: [
      'Use this tool for plain text documents such as letters and notes. For a formatted report, use the Save as PDF option in Word.',
      'Open old .doc files in Word, save them as .docx, then convert.',
      'Export Arabic, Urdu, Chinese and other non-Latin text from Word instead. This tool replaces those characters with question marks.',
      'Join the result with other files using <a href="/merge-pdf">Merge PDF</a>.'
    ],
    limits: ['The tool keeps text and simple paragraph spacing only.', 'The tool reads .docx files, not older .doc files.', 'The tool supports Latin characters only and replaces all others with a question mark.'],
    faq: [
      ['Does it keep my formatting?', 'No. The tool converts only the text, with simple paragraph spacing. Images, tables, headers and fonts do not carry over.'],
      ['Can it convert old .doc files?', 'No. It reads only the modern .docx format. Open the old file in Word and save it as .docx first.'],
      ['What happens to non-English characters?', 'The PDF uses a standard Latin font, so characters outside it, such as Arabic, Urdu or Chinese, turn into question marks.'],
      ['Which page size does the PDF use?', 'The tool creates A4 pages and wraps the text to fit.']
    ],
    next: [['merge-pdf', 'Combine the PDF with other documents.'], ['sign-pdf', 'Add your signature to the finished PDF.'], ['watermark-pdf', 'Stamp DRAFT or CONFIDENTIAL on every page.']],
    io: ['DOCX', 'PDF']
  },
  'pdf-to-png': {
    title: 'PDF to PNG Converter, Free Online',
    meta: 'Convert PDF pages to sharp PNG images in your browser. Pick the pages and quality, then download a ZIP. Free and private, with no sign-up.',
    answer: 'PDF to PNG renders each page of a PDF as a lossless PNG image. You can choose all pages or a range, set the quality, and download the images one by one or as a ZIP. It runs entirely in your browser.',
    steps: ['Add the PDF you want to convert.', 'Choose a quality and, if you want, the pages to export.', 'Click Convert to PNG, then download the images.'],
    use: ['You need sharp images of text, diagrams or screenshots from a PDF.', 'You want page images with crisp edges for a presentation.', 'You want to edit a PDF page in an image editor.'],
    tips: [
      'Choose PNG for sharp text and diagrams. For photo pages, <a href="/pdf-to-jpg">PDF to JPG</a> makes much smaller files.',
      'Use the Small setting when file size matters. Use High only when you must zoom in on fine detail.',
      'Type one page number in the Pages box to export only that page.',
      'Download several pages together as one ZIP file to save time.'
    ],
    limits: ['PNG files stay large, because PNG keeps every detail.', 'The tool makes one image per page.', 'The images hold pictures of words, not text you can select.'],
    faq: [
      ['When should I choose PNG instead of JPG?', 'Choose PNG for text, line art and screenshots, because it stays sharp. Choose JPG for photographs, because the files stay smaller.'],
      ['Why are the PNG files large?', 'PNG keeps every detail and discards nothing. Use the Small quality setting, or switch to PDF to JPG, for smaller files.'],
      ['Can I export only some pages?', 'Yes. Enter pages such as 1-3, 5 in the Pages box.'],
      ['Do the images keep the PDF text?', 'No. Each image is a picture of the page. Use PDF to Text when you need the words.']
    ],
    next: [['pdf-to-jpg', 'Make smaller images from photo pages.'], ['image-to-text', 'Read the text on a page image.'], ['compress-image', 'Shrink the images and set a target size.']],
    io: ['PDF', 'PNG']
  },
  'pdf-to-excel': {
    title: 'PDF to Excel Converter, Simple Tables',
    meta: 'Pull simple text tables from a PDF into an Excel (.xlsx) file in your browser. Free and private. Works best on clean, text-based tables.',
    answer: 'PDF to Excel reads the text on each PDF page, groups it into rows and columns, and saves an .xlsx workbook with one sheet per page. It works best on clean text tables, not on scans or complex layouts.',
    steps: ['Add a PDF that contains selectable text.', 'Click Convert to Excel.', 'Download the .xlsx file and check the columns.'],
    use: ['You need numbers from a PDF report in a spreadsheet.', 'You want to sort or total a table that arrived as a PDF.', 'You want to copy a price list or schedule into Excel.'],
    tips: [
      'Check the first sheet before you trust the whole file. The tool works best when text lines up in clean rows and columns.',
      'Each PDF page becomes its own sheet, so join a table that runs over several pages by hand.',
      'If columns split in odd places, widen them in Excel and tidy the cells. The PDF probably uses spacing instead of a real table.',
      'For a scan, run <a href="/ocr-pdf">OCR PDF</a> first, then convert the searchable PDF.'
    ],
    limits: ['The tool guesses table structure from text positions, so merged cells and multi-column layouts need manual tidying.', 'The tool finds no text in scanned PDFs.', 'The tool makes one sheet per page. It does not join tables across pages.'],
    faq: [
      ['How accurate is the table detection?', 'The tool does a best-effort job based on text positions. Clean tables convert well. Merged cells, scans and multi-column layouts usually need manual tidying.'],
      ['Does it work on scanned PDFs?', 'Not directly. Scans have no selectable text. Run OCR PDF first, then convert the searchable PDF.'],
      ['How does the tool arrange pages in the workbook?', 'Each PDF page becomes its own sheet, named Page 1, Page 2 and so on.'],
      ['Which Excel format does it create?', 'It creates an .xlsx workbook that opens in Excel, Google Sheets and LibreOffice.']
    ],
    next: [['ocr-pdf', 'Add a text layer to a scan first.'], ['xls-converter', 'Convert the workbook to CSV or ODS.'], ['pdf-to-text', 'Get plain text instead of a table.']],
    io: ['PDF', 'XLSX']
  },
  'excel-to-pdf': {
    title: 'Excel to PDF Converter, Free Online',
    meta: 'Convert Excel, CSV and ODS spreadsheets to PDF tables in your browser. Free and private. Latin characters only, and the tool shortens very wide sheets.',
    answer: 'Excel to PDF draws each sheet of an .xlsx, .xls, .csv or .ods file as a table in a landscape PDF. It does not keep cell formatting or charts, and it supports Latin characters only.',
    steps: ['Add an Excel, CSV or ODS file.', 'Click Convert to PDF.', 'Download the PDF, which has one section per sheet.'],
    use: ['You want to share a table that nobody can edit by accident.', 'You need to print a CSV export without opening Excel.', 'You want one PDF of a workbook with several sheets.'],
    tips: [
      'The PDF shows cell values, so a formula appears as its calculated result.',
      'For a wide report, export from Excel itself. This tool scales columns and shortens long text to fit the page.',
      'CSV and ODS files work as well as .xlsx and .xls.',
      'Combine the result with other documents using <a href="/merge-pdf">Merge PDF</a>.'
    ],
    limits: ['The tool drops colours, charts and cell formatting.', 'The tool scales wide sheets to the page width and shortens long cell text.', 'The tool supports Latin characters only and replaces other scripts with a question mark.'],
    faq: [
      ['Does the PDF keep colours, charts and formulas?', 'No. The PDF shows the cell values as plain text in a table. Colours, charts and formatting do not carry over.'],
      ['What happens to wide sheets?', 'The tool scales the columns to fit the page width and shortens long cell text so the table stays on the page.'],
      ['Can it handle non-English text?', 'Only Latin characters work. The tool replaces other scripts with a question mark.'],
      ['How does the tool handle several sheets?', 'It adds one section to the PDF for each sheet.']
    ],
    next: [['merge-pdf', 'Combine the table with other documents.'], ['xls-converter', 'Convert the spreadsheet to another format first.'], ['watermark-pdf', 'Mark the PDF as a draft.']],
    io: ['XLSX, XLS, CSV, ODS', 'PDF']
  },
  'rotate-pdf': {
    title: 'Rotate PDF Pages Online, Free',
    meta: 'Rotate all or selected PDF pages by 90, 180 or 270 degrees. Free and private, with no sign-up. It works in your browser.',
    answer: 'Rotate PDF turns every page, or only the pages you choose, by 90 degrees clockwise, 90 degrees counter-clockwise or 180 degrees. The rest of the document stays unchanged, and the tool works in your browser.',
    steps: ['Add the PDF.', 'Choose the rotation and, if you want, the pages, such as 2-4.', 'Click Rotate PDF, then download the result.'],
    use: ['A scan opens sideways in every viewer.', 'A few pages came out upside down from the scanner.', 'You need to fix the orientation before you merge or print.'],
    tips: [
      'Enter only the sideways pages, such as 3, 5-6, so the rest stay as they are.',
      'Turn 90 degrees for a sideways scan and 180 degrees for an upside-down page.',
      'The tool saves the new orientation into your download, so everyone sees the corrected pages. Keep the original in case you need it.',
      'Next, combine files with <a href="/merge-pdf">Merge PDF</a> or extract pages with <a href="/split-pdf">Split PDF</a>.'
    ],
    limits: ['The tool rotates by 90 degrees either way, or by 180 degrees.', 'The tool cannot rotate password-protected PDFs.', 'The tool changes orientation only. It does not straighten tilted scans.'],
    faq: [
      ['Can I rotate only one page?', 'Yes. Type the page number in the Pages box, and the tool rotates only that page.'],
      ['Is the rotation permanent?', 'Yes. The tool saves it into the new file, so every PDF viewer shows the pages the new way up.'],
      ['Will the text stay selectable?', 'Yes. The tool changes only the page orientation and does not redraw the content.'],
      ['Can I rotate by any angle?', 'No. Choose 90 degrees clockwise, 90 degrees counter-clockwise or 180 degrees.']
    ],
    next: [['merge-pdf', 'Combine the corrected file with others.'], ['split-pdf', 'Extract the corrected pages.'], ['sign-pdf', 'Sign the corrected document.']],
    io: ['PDF', 'PDF']
  },
  'watermark-pdf': {
    title: 'Add Watermark to PDF Online, Free',
    meta: 'Stamp a text watermark such as CONFIDENTIAL or DRAFT on every PDF page. Set the opacity and angle. Free and private, in your browser.',
    answer: 'Watermark PDF stamps your own text, such as CONFIDENTIAL or DRAFT, across every page of a PDF. You choose the opacity and whether the text runs diagonally or horizontally. It supports standard Latin characters.',
    steps: ['Add the PDF.', 'Type your watermark text and pick the opacity and angle.', 'Click Add watermark, then download the stamped PDF.'],
    use: ['You circulate a draft and want every page marked DRAFT.', 'You share a private file and want CONFIDENTIAL on each page.', 'You want your name on a PDF that you send for review.'],
    tips: [
      'Use short words such as DRAFT, CONFIDENTIAL or COPY. A long sentence becomes hard to read across the page.',
      'Lower the opacity to keep the page readable. Raise it when the mark must stand out.',
      'A diagonal watermark is harder to overlook. A horizontal one disturbs text-heavy pages less.',
      'Treat the mark as a visible label, not as security. Keep the original file.'
    ],
    limits: ['The tool adds text watermarks only. It cannot add a logo or image.', 'The tool supports standard Latin letters, numbers and punctuation.', 'The tool draws the text onto each page, so it does not protect the file from copying.'],
    faq: [
      ['Can I choose the watermark text?', 'Yes. Type any text with standard Latin letters, numbers and punctuation.'],
      ['Can someone remove the watermark afterwards?', 'The tool draws the text onto each page and gives no real protection. Keep your original file and share only the stamped copy.'],
      ['Can I use a logo or an image?', 'Not yet. This tool adds text watermarks only.'],
      ['Does the watermark change my original file?', 'No. The tool creates a new stamped PDF and leaves your original untouched.']
    ],
    next: [['sign-pdf', 'Sign the stamped document.'], ['merge-pdf', 'Combine marked files into one.'], ['pdf-to-jpg', 'Share a stamped page as an image.']],
    io: ['PDF', 'PDF']
  },
  'pdf-to-text': {
    title: 'PDF to Text Converter, Free Online',
    meta: 'Extract all selectable text from a PDF into a .txt file you can copy or download. Free and private, in your browser. Scans need OCR first.',
    answer: 'PDF to Text pulls the selectable text out of a PDF, page by page, and gives you a plain .txt file. It works on PDFs with real text, while scanned PDFs need OCR PDF first.',
    steps: ['Add the PDF.', 'Click Extract text.', 'Copy the text from the box, or download the .txt file.'],
    use: ['You want to paste a PDF article into an email or note.', 'You need the words of a report to edit or analyse.', 'You want to search a long document in a text editor.'],
    tips: [
      'Use Copy text for a short extract. Download the .txt file for a long document.',
      'A blank line separates each page, so you can see where each page begins.',
      'The tool reads columns and tables line by line, so paste the result into an editor and tidy the line breaks.',
      'Got nothing back? The PDF is probably a scan. Run <a href="/ocr-pdf">OCR PDF</a>, then extract the text from the searchable PDF.'
    ],
    limits: ['The tool finds no text in scanned PDFs.', 'The tool reads each page top to bottom and left to right, so columns can mix.', 'The tool drops images and layout. You get plain text only.'],
    faq: [
      ['Why is the result empty?', 'The PDF is probably a scan made of images. Run OCR PDF to add a text layer, then extract the text from the searchable PDF.'],
      ['Does the tool keep the line order?', 'The tool reads each page top to bottom and left to right, with a blank line between pages. Columns and tables may need tidying.'],
      ['Can I copy the text without downloading?', 'Yes. The extracted text appears in a box with a Copy text button.'],
      ['Does the text keep its formatting?', 'No. You get plain text. Bold, fonts, images and layout do not carry over.']
    ],
    next: [['ocr-pdf', 'Add a text layer to a scan first.'], ['pdf-to-word', 'Get an editable Word file.'], ['word-counter', 'Count the words in the extracted text.']],
    io: ['PDF', 'TXT']
  },
  'sign-pdf': {
    title: 'Sign PDF Online, Draw Your Signature',
    meta: 'Draw your signature with a mouse or finger and place it on a PDF page. Free and private, with no sign-up. This is a visual signature, not a certified one.',
    answer: 'Sign PDF lets you draw your signature and place it on the first, last or every page of a PDF. You choose the position and size. The tool adds a visual signature image, not a certificate-based digital signature.',
    steps: ['Add the PDF you want to sign.', 'Draw your signature, then choose the page, position and size.', 'Click Sign PDF, then download the signed copy.'],
    use: ['You must return a signed form and have no printer.', 'You want your signature or initials on a contract page.', 'You need to sign a document on your phone.'],
    tips: [
      'Draw slowly in a large box. A finger or stylus on a phone gives a smoother line than a trackpad.',
      'Choose the last page for contracts that you sign at the end. Choose all pages for initials.',
      'Check the position and size before you send the file. You can pick bottom right, bottom left, bottom centre or centre.',
      'Confirm that the person who asked for your signature accepts a drawn signature.'
    ],
    limits: ['The tool adds an image of your signature. It does not add a certificate-based digital signature.', 'The tool offers four positions and three page choices: first, last or all pages.', 'The tool cannot sign password-protected PDFs.'],
    faq: [
      ['Is this a legally binding digital signature?', 'It is a visual signature image placed on the page. It uses no certificate, so check that the person or authority you sign for accepts it.'],
      ['Can I sign on my phone?', 'Yes. Draw with your finger in the signature box.'],
      ['Can I place the signature anywhere?', 'You can choose bottom right, bottom left, bottom centre or centre, on the first, last or all pages.'],
      ['Where does my signature go?', 'Nowhere outside your device. You draw it in your browser, and the tool places it on your PDF locally.']
    ],
    next: [['merge-pdf', 'Combine the signed pages with other documents.'], ['rotate-pdf', 'Fix the page orientation before you sign.'], ['word-to-pdf', 'Create the PDF from a Word file first.']],
    io: ['PDF', 'PDF']
  },
  'pdf-to-ppt': {
    title: 'PDF to PowerPoint Converter, Free',
    meta: 'Turn each PDF page into a PowerPoint slide in your browser. Free and private. The slides hold images, so you cannot edit their text.',
    answer: 'PDF to PPT converts each page of a PDF into a slide in a .pptx file. The slides hold page images, so they look exactly like the PDF, but you cannot edit the text on them.',
    steps: ['Add the PDF.', 'Click Convert to PowerPoint.', 'Download the .pptx file and open it in PowerPoint, Keynote or Google Slides.'],
    use: ['You want to present a PDF as slides.', 'You need to drop PDF pages into an existing deck.', 'You want a slide version of a scanned document.'],
    tips: [
      'Use this tool to present a PDF. It does not help you edit content.',
      'Slides take the proportions of the first page, so pages of different sizes may not fit every slide perfectly.',
      'Need editable text? <a href="/pdf-to-word">PDF to Word</a> gives you the text, though not the layout.',
      'A long PDF makes a long deck of images, so the .pptx file can grow large.'
    ],
    limits: ['The tool cannot edit slide text, because each slide holds an image.', 'The tool sizes the slides to the first PDF page.', 'Long PDFs create large .pptx files.'],
    faq: [
      ['Can I edit the text on the slides?', 'No. Each slide holds an image of the PDF page, so you cannot edit text or shapes.'],
      ['What slide size does the tool use?', 'The slides take the proportions of the first PDF page.'],
      ['Does it work on scanned PDFs?', 'Yes. The tool uses pages as images, so scans convert fine.'],
      ['Which presentation programs open the file?', 'PowerPoint, Keynote and Google Slides open the .pptx file.']
    ],
    next: [['pdf-to-word', 'Get the text in an editable file.'], ['pdf-to-jpg', 'Export single pages as images.'], ['rotate-pdf', 'Fix the page orientation before you convert.']],
    io: ['PDF', 'PPTX']
  }
};
