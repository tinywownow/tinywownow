/* More per-tool "Tips" (the other 40 tools). Same rules as tips.js:
   only describe what the tool really does, and add something the FAQ does not already say. */
'use strict';
module.exports = {
  /* ---------------- PDF ---------------- */
  'rotate-pdf': [
    'If only a few pages are sideways, enter just those pages (for example 3, 5-6) so the rest of the document stays as it is.',
    'A scan that opens sideways needs a 90 degree turn. One that opens upside down needs 180.',
    'The new orientation is saved into the file you download, so everyone you share it with sees the corrected pages. Keep the original in case you need it unrotated.',
    'Once the pages are the right way up, you can combine files with <a href="/merge-pdf">Merge PDF</a> or pull out pages with <a href="/split-pdf">Split PDF</a>.'
  ],
  'watermark-pdf': [
    'Short words work best, such as DRAFT, CONFIDENTIAL or COPY. A long sentence gets hard to read across the page.',
    'Lower the opacity to keep the page readable, and raise it when the mark must be obvious.',
    'A diagonal watermark is harder to overlook, while a horizontal one is less intrusive on text-heavy pages.',
    'Treat it as a visible label, not security. Keep the original file, and use it for sharing drafts rather than protecting secrets.'
  ],
  'pdf-to-text': [
    'For a short extract, use the Copy text button. For a long document, download the .txt file instead.',
    'A blank line separates each page in the result, which makes it easy to find where a page begins.',
    'Columns and tables are read line by line, so paste the result into a text editor and tidy the line breaks if the order looks odd.',
    'If you get nothing back, the PDF is probably a scan. Run it through <a href="/ocr-pdf">OCR PDF</a> to add a text layer, then extract the text from the searchable PDF.'
  ],
  'sign-pdf': [
    'Draw slowly and use a larger signature box. A finger or stylus on a phone gives a smoother line than a trackpad.',
    'Choose the <b>last page</b> for contracts that are signed at the end, and <b>all pages</b> if you want your signature or initials on every page.',
    'Check the position and size before you send the file. The options are bottom right, bottom left, bottom centre or centre.',
    'This adds an image of your signature, not a certificate-based digital signature, so confirm that the person asking accepts it.'
  ],
  'pdf-to-ppt': [
    'Because every slide is a picture of the page, this suits presenting a PDF as slides. It does not suit editing the content.',
    'Slides take the proportions of the first page, so a PDF whose pages are different sizes may not fit every slide perfectly.',
    'Need editable text? <a href="/pdf-to-word">PDF to Word</a> gives you the text of a PDF, though not its layout.',
    'A long PDF becomes a long slide deck made of images, so the .pptx file can be large.'
  ],
  'word-to-pdf': [
    'It is best for plain text documents such as letters and notes. For a formatted report with images and tables, use the Save as PDF option in Word itself.',
    'Old .doc files are not read. Open them in Word, save as .docx, then convert.',
    'Arabic, Urdu, Chinese and other non-Latin text is replaced with question marks, so export those documents from Word instead.',
    'If the PDF is too large to email afterwards, try <a href="/compress-pdf">Compress PDF</a>.'
  ],
  'pdf-to-png': [
    'PNG suits pages with sharp text, diagrams and screenshots. For pages that are mostly photos, <a href="/pdf-to-jpg">PDF to JPG</a> makes much smaller files.',
    'Use the Small setting when file size matters, and High only when you need to zoom in on fine detail.',
    'Type a single page number in the Pages box to export just that page instead of the whole document.',
    'Several pages produce several images, which you can download together as a ZIP.'
  ],
  'pdf-to-excel': [
    'It works best when the text lines up in clean rows and columns. Check the first sheet before you rely on the whole file.',
    'Every PDF page becomes its own sheet, so a table that runs over several pages needs to be joined by hand.',
    'If columns split in odd places, the PDF probably uses spacing rather than a real table. Widen the columns in Excel and tidy the cells.',
    'For a scan, there is no text to read yet. Run it through <a href="/ocr-pdf">OCR PDF</a> first, then convert the searchable PDF.'
  ],
  'excel-to-pdf': [
    'The PDF shows cell values, so a formula appears as its calculated result.',
    'Very wide sheets are scaled to the page and long cell text is shortened. For a wide report, exporting from Excel itself gives a better layout.',
    'CSV and ODS files work as well as .xlsx and .xls, so you can print a CSV export without opening Excel.',
    'Only Latin characters are supported, so sheets in other scripts will show question marks.'
  ],

  'ocr-pdf': [
    'Use the clearest scan you have. Sharp, straight, high-contrast pages read best, and a photo taken at an angle reads worse than a flat scan.',
    'On a long document, type the pages you need in the Pages box. Pages that already contain text are left as they are.',
    'Your pages are not re-compressed. The original images stay exactly as they are and the text is added underneath, so the file only grows a little.',
    'Once the PDF is searchable, use it with <a href="/pdf-to-text">PDF to Text</a>, <a href="/pdf-to-word">PDF to Word</a> or <a href="/pdf-to-excel">PDF to Excel</a>, and check names and numbers by eye.'
  ],

  /* ---------------- IMAGE ---------------- */
  'image-to-jpg': [
    'Use it when an app or form rejects a WebP, PNG or GIF but accepts JPG.',
    'Keep your transparent PNG logos as PNG. JPG fills the see-through areas with white and cannot bring the transparency back.',
    'For a smaller JPG, run the result through <a href="/compress-image">Compress Image</a> afterwards.',
    'This tool converts one image at a time. Use Compress Image if you have a batch.'
  ],
  'image-to-png': [
    'Convert to PNG when you plan to edit and save an image several times, because PNG will not lose more detail on each save.',
    'Do not convert photos to PNG just to upload them. The file will be much larger than the JPG, with no visible gain.',
    'PNG is a good fit for screenshots, logos and graphics with sharp edges and text.',
    'Transparency is kept when the source image has it, for example a WebP or GIF.'
  ],
  'image-to-webp': [
    'Use WebP for images on your own website, where smaller files help pages load faster.',
    'Keep a JPG copy for emails, documents and older software, which may not open WebP.',
    'Compare the file sizes after converting. WebP is usually smaller than JPG or PNG, but the saving depends on the picture.',
    'For a specific size limit, use <a href="/compress-image">Compress Image</a> with WebP as the output and a target size.'
  ],
  'photo-filter': [
    'Apply the filter last. Resize, crop and fix the orientation first, because each JPG save loses a little detail.',
    'Vivid lifts dull, flat photos. Warm and Cool change the mood, and Sepia and Fade give a vintage look.',
    'Each filter has a fixed strength, so if one looks too strong, try Fade or a different filter instead.',
    'If a filter seems to do nothing, you may be on an older Safari. A current Chrome, Edge or Firefox supports it.'
  ],
  'rotate-image': [
    'Use 90 degrees to fix a phone photo that opens sideways, and 180 degrees for one that is upside down.',
    'Flip horizontally to un-mirror a selfie or to correct text that appears reversed.',
    'The result is saved as a JPG, so transparent areas of a PNG become white.',
    'To trim the picture after turning it, use <a href="/crop-image">Crop Image</a>.'
  ],
  'grayscale-image': [
    'Black and white is useful when you want to print a photo without colour ink, or for a classic look.',
    'Keep your colour original. The grey version cannot be turned back into colour.',
    'Photos without colour often make smaller files, so you can follow up with <a href="/compress-image">Compress Image</a> if size matters.',
    'For a warmer old-photo effect, try the Sepia filter in <a href="/photo-filters">Photo Filters</a>.'
  ],
  'watermark-image': [
    'Choose a low opacity so the photo stays the star and the watermark stays readable.',
    'Use your name or website, and keep the text short so it does not crowd the picture.',
    'Resize the image to its final size first, then add the watermark.',
    'A text watermark across the middle discourages casual reuse, but it does not stop determined copying.'
  ],
  'upscale-image': [
    'It works best on images that are already clean. A blurry or heavily compressed picture will just be a larger blurry picture.',
    'Try 2x first. Bigger factors magnify every flaw, and results beyond about 9,000 pixels or 64 megapixels are refused.',
    'Choose PNG as the output to avoid another round of JPG loss, then compress the final file if you need it smaller.',
    'For the opposite job, making a large image smaller, use <a href="/resize-image">Resize Image</a>.'
  ],

  /* ---------------- VIDEO ---------------- */
  'convert-video': [
    'Choose MP4 for sharing, WebM for embedding on websites and MOV for Apple editing software.',
    'If a phone or TV will not play an MKV or AVI file, converting it to MP4 usually fixes it.',
    'Conversion keeps good quality but does not aim for a file size. To make the file smaller, use <a href="/compress-video">Compress Video</a>.',
    'Long and high-resolution videos take longer, because everything runs on your own device.'
  ],
  'merge-videos': [
    'Set the output size to match your best clip. Smaller clips are scaled up to fit, with black bars where needed.',
    'Clips with the same orientation look best. Mixing portrait and landscape clips adds black bars around some of them.',
    'Check the order with the arrows before you merge, because the clips play from top to bottom.',
    'Keep the total under about 700 MB. If you are over, compress the clips first with <a href="/compress-video">Compress Video</a>.'
  ],
  'extract-audio': [
    'Choose MP3 for sharing, M4A for good quality in a smaller file, and WAV when you want to edit the audio.',
    'To keep only part of the sound, cut the video first with <a href="/trim-video">Trim Video</a>, then extract the audio.',
    'WAV files are uncompressed and large, so a long video can produce a very big file.',
    'If you get a message that the video has no audio, the original file has no sound track.'
  ],
  'mute-video': [
    'Use it to remove background noise or copyrighted music from a screen recording before you share it.',
    'The video is copied without re-encoding, so it is fast and the picture is exactly as it was.',
    'The result keeps the same format as your original, and the original file is not changed.',
    'Want new sound? Add your own music or voiceover afterwards in your video editor.'
  ],
  'video-to-gif': [
    'Start with a low frame rate (8 fps) and a width of about 320 px. You can raise them if the file is still small enough.',
    'Keep the clip as short as possible. GIFs are large, and the maximum length here is 20 seconds.',
    'Set the start time to the exact moment you want, so you do not waste seconds on footage you do not need.',
    'On a website, an MP4 is usually far smaller than a GIF, so a GIF is mainly worth it for chat and email.'
  ],
  'gif-to-video': [
    'Use it when a GIF is slow to load or too large. The MP4 is usually many times smaller.',
    'The MP4 is a normal video, so turn on looping in your player or in the embed settings of your website.',
    'Colours may shift very slightly because MP4 uses a different colour format.',
    'This tool takes GIF files only. To go the other way, use <a href="/video-to-gif">Video to GIF</a>.'
  ],
  'rotate-video': [
    'Use 90 degrees for a clip filmed sideways and 180 degrees for one filmed upside down.',
    'Rotating redraws every frame, so it takes longer than a simple copy, especially for long videos.',
    'If you want a mirror image rather than a turn, use <a href="/flip-video">Flip Video</a>.',
    'Audio is kept, so you do not need to add it back.'
  ],
  'resize-video': [
    'Pick 720p for messaging apps, 1080p for general use and 480p when you need a small file.',
    'Scale down rather than up. Making a video bigger does not add any detail.',
    'Smaller dimensions mean fewer pixels to store, so the file also gets smaller. For more control, add <a href="/compress-video">Compress Video</a>.',
    'The width is set automatically, so you never have to work out the right ratio.'
  ],
  'video-speed': [
    'Use 2x or 3x to get through a long tutorial or recording quickly, and 0.5x to study a moment in slow motion.',
    'The audio speeds up or slows down with the picture, and its pitch is kept natural.',
    'A faster video is shorter, so the file usually gets smaller too.',
    'Only the listed speeds are available: 0.5x, 0.75x, 1.5x, 2x, 3x and 4x.'
  ],
  'add-subtitles': [
    'The subtitles are a separate track that viewers switch on in the player. They are not burned into the picture.',
    'Some social sites ignore soft subtitle tracks. If a site lets you upload an .srt file directly, upload it there instead.',
    'MP4 and MOV videos are copied without re-encoding, so adding subtitles to them is fast.',
    'Check that the timings in your subtitle file match this version of the video, especially if you trimmed it.'
  ],
  'flip-video': [
    'Flip horizontally to correct text that appears reversed in a mirrored selfie video.',
    'Use a vertical flip for an upside-down clip, and <a href="/rotate-video">Rotate Video</a> for a sideways one.',
    'Flipping redraws every frame, so long clips take a while on your device.',
    'Audio is kept as it is.'
  ],

  /* ---------------- FILE ---------------- */
  'compress-files': [
    'Files that are already compressed, such as JPG photos, MP4 videos and image-heavy PDFs, barely shrink in a ZIP. Its main benefit is bundling them into one file.',
    'Normal compression is enough for most files. Maximum takes longer and saves only a little more.',
    'Folders cannot be added, so select the files directly.',
    'The file is named archive.zip. Rename it after you download it, and note that this tool cannot add a password.'
  ],
  'extract-zip': [
    'You see the list of files first, so you can download only the ones you need instead of everything.',
    'Only .zip files are opened. For RAR or 7z archives you need a desktop program.',
    'Password-protected ZIP files cannot be opened here.',
    'Very large archives depend on your device memory, so try one on a computer if your phone struggles.'
  ],
  'json-formatter': [
    'Paste a minified API response to read it. The output is indented with two spaces per level.',
    'Common causes of an error are a trailing comma, single quotes instead of double quotes, and keys without quotes.',
    'It checks that the JSON is valid syntax. It does not check your data against a schema.',
    'Your data stays in the browser, but still avoid pasting secrets such as tokens, and do not share the result if it contains any.'
  ],
  'xml-formatter': [
    'It checks that the XML is well formed, not that it follows a schema (XSD).',
    'Common errors are an unclosed tag, tags whose upper and lower case do not match, and a bare & that should be &amp;.',
    'Comments and attributes are kept, so formatting only changes the indentation.',
    'Use it to read a long one-line XML response, then copy the formatted version.'
  ],
  'csv-to-json': [
    'The first row must be the header. Its values become the keys of every object in the JSON.',
    'Every value comes out as text, including numbers, so convert them in your code if you need numeric types.',
    'The separator is detected from the first line, so keep the same one throughout the data.',
    'Fields in quotes can contain commas and quote marks, and they are read correctly.'
  ],
  'base64-encode': [
    'Base64 is encoding, not encryption. Anyone can decode it, so never use it to hide a password.',
    'Encoded data is about a third larger than the original, so it suits small pieces of data.',
    'Text is handled as UTF-8, so emoji and non-English characters survive a round trip.',
    'Use Decode to read a Base64 string you have received, for example inside a data URL or a config file.'
  ],
  'url-encode': [
    'Encode only the part you add, such as the value of a query parameter. Encoding a whole URL also changes its slashes and colons.',
    'A space becomes %20 and an ampersand becomes %26, which stops them breaking the address.',
    'Use Decode to read a long encoded link. If it shows Invalid input, a % sequence in the text is incomplete.',
    'The tool follows the standard encodeURIComponent rules, which are the same as in JavaScript.'
  ],
  'hash-gen': [
    'Prefer SHA-256. SHA-1 is included for older systems that still ask for it.',
    'The same text always gives the same hash, and changing one character changes the whole result. A trailing space or new line counts as a change, so copy your text carefully.',
    'A hash cannot be turned back into the text. It is useful for comparing two pieces of text, not for hiding them.',
    'Do not store passwords as plain SHA hashes. Use a proper password hashing method designed for that.'
  ],
  'xls-converter': [
    'Convert to CSV when you need to import a spreadsheet into another system. A workbook with several sheets produces one CSV file per sheet.',
    'Formulas are kept when you convert between Excel formats. CSV stores only the calculated values.',
    'Choose HTML to get a table you can paste into a web page.',
    'To share a spreadsheet as a read-only document, use <a href="/excel-to-pdf">Excel to PDF</a>.'
  ],

  /* ---------------- TEXT ---------------- */
  'word-counter': [
    'Use the character count to check text against limits, such as a meta description, which is usually shown up to around 155 characters.',
    'Words are groups separated by spaces, so a hyphenated word such as well-known counts as one.',
    'Reading time is based on 200 words per minute, which is a typical speed for silent reading.',
    'The counts update as you type, so paste your draft and trim it until you reach your target.'
  ],
  'case-converter': [
    'Use sentence case to fix text that was typed in ALL CAPS, and lowercase before you apply another style.',
    'camelCase, PascalCase and snake_case are for variable and file names. kebab-case is a good choice for URL slugs.',
    'Title Case capitalises every word, including small ones like of and the, so adjust those by hand for headlines.',
    'You can click one style after another on the same text and copy the result you like best.'
  ],
  'text-reverser': [
    'Use Reverse Lines to flip the order of a list, for example to turn an oldest-first list into newest-first.',
    'Reverse Characters is a quick way to check a palindrome: reverse the text and compare it with the original.',
    'Some multi-part emoji may break when characters are reversed, so use words or lines mode for text that includes them.',
    'Reverse Words keeps each word as it is and only changes their order.'
  ]
};
