/* File and data cluster copy. Same blueprint and rules as pdf.js. */
'use strict';
module.exports = {
  'compress-files': {
    title: 'Create ZIP File Online, Free',
    meta: 'Put several files into one ZIP archive in your browser. Choose the compression level. Free and private, with no upload and no sign-up.',
    answer: 'Zip Files packs any number of files into one ZIP archive. You can choose normal, maximum or no compression. The tool creates the ZIP in your browser, so your files stay on your device.',
    steps: ['Add the files you want to include.', 'Choose a compression level.', 'Click Create ZIP, then download archive.zip.'],
    use: ['You want to send many files as one attachment.', 'You need to bundle a project or a set of photos.', 'You want to keep related files together in one download.'],
    tips: [
      'Files that already use compression, such as JPG photos, MP4 videos and image-heavy PDFs, barely shrink in a ZIP. Its main benefit is bundling them into one file.',
      'Normal compression suits most files. Maximum takes longer and saves only a little more.',
      'Select the files directly, because the tool cannot add folders.',
      'The tool names the file archive.zip, so rename it after you download it.'
    ],
    limits: ['The tool cannot add folders. Add the files directly.', 'The tool cannot add a password to the ZIP.', 'Large sets of files depend on your device memory.'],
    faq: [
      ['Can I zip any kind of file?', 'Yes, any file type. The tool does not support folders, so add the files directly.'],
      ['Can I add a password?', 'No. This tool does not encrypt ZIP files.'],
      ['Which compression level should I use?', 'Normal suits most files. Maximum makes slightly smaller files but works more slowly. None only bundles the files.'],
      ['How do I open the ZIP again?', 'Use Extract ZIP on this site, or open the file with your operating system.']
    ],
    next: [['extract-zip', 'Open a ZIP archive and pick single files.'], ['compress-image', 'Shrink photos before you zip them.'], ['merge-pdf', 'Combine PDFs into one file instead of zipping them.']],
    io: ['Any files', 'ZIP']
  },
  'extract-zip': {
    title: 'Extract ZIP File Online, Free',
    meta: 'Open a ZIP archive and download its files in your browser. Free and private, with no upload and no sign-up.',
    answer: 'Extract ZIP opens a ZIP archive in your browser and lists the files inside, so you can download them one by one or all together. Nothing leaves your device.',
    steps: ['Add a ZIP file.', 'Click Extract ZIP.', 'Download single files, or all of them.'],
    use: ['You want one file from a large archive.', 'You have no unzip program on this device.', 'You want to check the contents of a ZIP before you save it.'],
    tips: [
      'Read the file list first, then download only the files you need.',
      'Use a desktop program for RAR or 7z archives, because this tool opens ZIP files only.',
      'Open a password-protected ZIP in a desktop program, because this tool cannot read encrypted archives.',
      'Try a computer if a large archive struggles on your phone. Archives depend on device memory.'
    ],
    limits: ['The tool opens ZIP files only. It does not open RAR or 7z.', 'The tool cannot open password-protected archives.', 'The tool lists files by name and does not recreate folder paths.'],
    faq: [
      ['Can I open password-protected ZIP files?', 'No. The tool does not support encrypted archives.'],
      ['Does it keep the folder structure?', 'The tool lists files by name and does not recreate folder paths.'],
      ['Which archive types work?', 'ZIP only. The tool does not open RAR or 7z.'],
      ['Can I download a single file?', 'Yes. Each file in the list has its own download button.']
    ],
    next: [['compress-files', 'Pack files into a new ZIP.'], ['pdf-to-text', 'Extract the words from a PDF you unpacked.'], ['image-to-text', 'Read the words in an image you unpacked.']],
    io: ['ZIP', 'Files']
  },
  'json-formatter': {
    title: 'JSON Formatter and Validator Online',
    meta: 'Format, beautify and validate JSON instantly in your browser. See clear error messages. Free and private, with no sign-up.',
    answer: 'JSON Formatter checks that your JSON is valid and rewrites it with clean indentation, so it is easy to read. When something is wrong, it shows the error message from the parser.',
    steps: ['Paste your JSON into the input box.', 'Read the formatted result on the right, with a valid or error message.', 'Click Copy JSON to copy the result.'],
    use: ['You want to read a minified API response.', 'You need to find the typo that breaks your JSON.', 'You want to paste tidy JSON into documentation.'],
    tips: [
      'Paste a minified API response to read it. The output uses two spaces per level.',
      'Look for a trailing comma, single quotes instead of double quotes, or keys without quotes when you see an error.',
      'The tool checks JSON syntax. It does not check your data against a schema.',
      'Your data stays in the browser, but do not paste secrets such as tokens, and do not share output that contains them.'
    ],
    limits: ['The tool checks syntax only. It does not check a schema.', 'The tool indents with two spaces and has no other setting.', 'Large inputs depend on your device memory.'],
    faq: [
      ['Does it validate JSON?', 'Yes. It shows Valid JSON, or the error message from the parser.'],
      ['Does the tool send my data anywhere?', 'No. Formatting happens in your browser.'],
      ['How does the tool indent the output?', 'It uses two spaces per level.'],
      ['Why does my JSON show an error?', 'Common causes are a trailing comma, single quotes instead of double quotes, and keys without quotes. The error message shows what the parser found.']
    ],
    next: [['csv-to-json', 'Convert CSV data into JSON first.'], ['xml-formatter', 'Format XML the same way.'], ['base64-encode', 'Decode a Base64 string that holds JSON.']],
    io: ['JSON', 'Formatted JSON']
  },
  'csv-to-json': {
    title: 'CSV to JSON Converter Online, Free',
    meta: 'Convert CSV data to JSON in your browser. Handles quoted fields, commas, semicolons and tabs. Free and private, with no sign-up.',
    answer: 'CSV to JSON turns pasted CSV data into a JSON array of objects, with the first row as keys. It reads quoted fields and detects commas, semicolons or tabs as separators.',
    steps: ['Paste your CSV, with a header row, into the input box.', 'Watch the JSON appear on the right as you type.', 'Click Copy JSON.'],
    use: ['You want to feed spreadsheet data into an app or API.', 'You need test data in JSON from a CSV export.', 'You want to check how your CSV parses.'],
    tips: [
      'Put the header row first. Its values become the keys of every object in the JSON.',
      'Convert numbers in your code when you need numeric types, because every value comes out as text.',
      'Keep one separator throughout the data. The tool detects it from the first line.',
      'Quote fields that contain commas or quote marks. The tool reads them correctly.'
    ],
    limits: ['The tool outputs every value as text.', 'The tool needs a header row to name the keys.', 'The tool detects commas, semicolons and tabs from the first line only.'],
    faq: [
      ['Does it handle commas inside quotes?', 'Yes. The tool reads quoted fields, including escaped quotes, correctly.'],
      ['Which separators does it detect?', 'It detects commas, semicolons and tabs, based on the first line.'],
      ['Does the tool convert numbers to numbers?', 'No. The tool outputs every value as text.'],
      ['Where do the keys come from?', 'The first row of your CSV provides the keys for every object.']
    ],
    next: [['json-formatter', 'Format and validate the JSON result.'], ['xls-converter', 'Convert a spreadsheet to CSV first.'], ['base64-encode', 'Encode the JSON as Base64.']],
    io: ['CSV', 'JSON']
  },
  'base64-encode': {
    title: 'Base64 Encode and Decode Online',
    meta: 'Encode text to Base64 or decode Base64 back to text, with UTF-8 support. Free, private and instant, in your browser.',
    answer: 'The Base64 Encoder and Decoder converts text to Base64 and decodes Base64 back to readable text, including characters outside basic English (UTF-8). It runs in your browser, so your text stays on your device.',
    steps: ['Choose Encode or Decode.', 'Type or paste your text.', 'Click Copy Result.'],
    use: ['You need to read a Base64 string from a config file or data URL.', 'You want to encode a short text for safe transport.', 'You want to test how an API handles Base64 input.'],
    tips: [
      'Remember that Base64 is encoding, not encryption. Anyone can decode it, so never use it to hide a password.',
      'Expect encoded data to grow by about a third, so Base64 suits small pieces of data.',
      'Use UTF-8 text freely. Emoji and non-English characters survive a round trip.',
      'Use Decode to read a Base64 string that you received.'
    ],
    limits: ['The tool encodes text, not files.', 'Base64 hides nothing, because anyone can decode it.', 'The tool treats text as UTF-8.'],
    faq: [
      ['What is Base64?', 'Base64 represents data with only letters, digits, plus and slash, so it can travel safely through systems that handle only text.'],
      ['Is Base64 encryption?', 'No. Anyone can decode it, so never use it to protect secrets.'],
      ['Does it support emoji and other languages?', 'Yes. The tool handles text as UTF-8.'],
      ['Does the encoded text get longer?', 'Yes. Base64 output is about one third larger than the original.']
    ],
    next: [['url-encode', 'Percent-encode text for web addresses.'], ['hash-gen', 'Create a SHA hash of the same text.'], ['json-formatter', 'Format the decoded JSON.']],
    io: ['Text', 'Base64']
  },
  'url-encode': {
    title: 'URL Encode and Decode Online, Free',
    meta: 'Percent-encode text for URLs or decode it back, instantly in your browser. Free and private, with no sign-up.',
    answer: 'The URL Encoder and Decoder converts text into percent-encoded form that is safe to use in a web address, and decodes it back. For example, a space becomes %20 and an ampersand becomes %26.',
    steps: ['Choose Encode or Decode.', 'Type or paste your text.', 'Click Copy Result.'],
    use: ['You need to put text with spaces or symbols into a query string.', 'You want to read a long percent-encoded link.', 'You want to test how a URL parameter behaves.'],
    tips: [
      'Encode only the part you add, such as the value of a query parameter. Encoding a whole URL also changes its slashes and colons.',
      'Remember that a space becomes %20 and an ampersand becomes %26, which stops them from breaking the address.',
      'Use Decode to read a long encoded link. When it shows Invalid input, a % sequence in the text is incomplete.',
      'The tool follows the standard encodeURIComponent rules, which match JavaScript.'
    ],
    limits: ['The tool encodes every character except letters, digits and a few safe symbols.', 'The tool shows Invalid input when it cannot decode a string.', 'The tool encodes a whole URL as one piece, including its slashes.'],
    faq: [
      ['Which characters does the tool encode?', 'It encodes everything except letters, digits and a few safe symbols, with the standard encodeURIComponent rules.'],
      ['What does decode do with invalid input?', 'It shows Invalid input instead of guessing.'],
      ['Should I encode a whole URL?', 'Encode only the parts you add, such as query values. Encoding a full URL also encodes its slashes and colons.'],
      ['Does it work with non-English text?', 'Yes. The tool encodes any text as UTF-8.']
    ],
    next: [['base64-encode', 'Encode text as Base64 instead.'], ['hash-gen', 'Create a SHA hash of the text.'], ['case-converter', 'Change the text case before you encode it.']],
    io: ['Text', 'Encoded text']
  },
  'hash-gen': {
    title: 'Hash Generator, SHA-256 SHA-1 SHA-512',
    meta: 'Generate SHA-256, SHA-1 and SHA-512 hashes from text in your browser. Free, private and instant. The tool sends nothing anywhere.',
    answer: 'Hash Generator creates SHA-256, SHA-1 and SHA-512 hashes of any text with the cryptography that your browser provides. The tool never sends your text to a server, so your input stays private.',
    steps: ['Type or paste your text.', 'Read the three hashes as they appear.', 'Copy the one you need.'],
    use: ['You want to compare two pieces of text without reading them.', 'You need a checksum for a short string.', 'You want to see how a tiny change alters a hash.'],
    tips: [
      'Prefer SHA-256. The tool includes SHA-1 for older systems that still ask for it.',
      'Copy your text carefully. The same text always gives the same hash, and a trailing space or new line changes the whole result.',
      'Use a hash to compare two pieces of text, not to hide them, because nobody can turn a hash back into text.',
      'Do not store passwords as plain SHA hashes. Use a proper password hashing method.'
    ],
    limits: ['The tool hashes text only. It does not hash files.', 'The tool does not offer MD5.', 'The tool offers SHA-1, SHA-256 and SHA-512 only.'],
    faq: [
      ['Does the tool include MD5?', 'No. The browser does not provide MD5, and MD5 is not secure. SHA-256 is the recommended choice.'],
      ['Can someone reverse a hash?', 'No. Hashes work one way, though attackers can look up weak hashes of common words.'],
      ['Can I hash a file?', 'Not yet. This tool hashes text only.'],
      ['Why does one extra space change the hash?', 'A hash covers every character, so even a space or a new line produces a completely different result.']
    ],
    next: [['base64-encode', 'Encode the same text as Base64.'], ['url-encode', 'Percent-encode the text.'], ['word-counter', 'Check the length of the text first.']],
    io: ['Text', 'SHA-256, SHA-1, SHA-512']
  },
  'xml-formatter': {
    title: 'XML Formatter and Validator Online',
    meta: 'Format and validate XML with clean indentation in your browser. Free and private, with no sign-up.',
    answer: 'XML Formatter checks that your XML is well formed and rewrites it with indentation, so the structure is easy to read. When the XML is invalid, it shows an error.',
    steps: ['Paste your XML into the input box.', 'Read the formatted XML on the right.', 'Click Copy XML.'],
    use: ['You want to read a long one-line XML response.', 'You need to find the broken tag in your XML.', 'You want tidy XML for documentation.'],
    tips: [
      'Paste a long one-line XML response to read it, then copy the formatted version.',
      'Look for an unclosed tag, tags whose upper and lower case differ, or a bare & that should read &amp; when you see an error.',
      'Expect only the indentation to change. The tool keeps comments and attributes.',
      'Use a schema validator when you need to check against an XSD, because this tool checks only that the XML is well formed.'
    ],
    limits: ['The tool checks that XML is well formed. It does not check against a schema (XSD).', 'The tool shows an error for invalid XML.', 'Large inputs depend on your device memory.'],
    faq: [
      ['Does it validate XML?', 'It checks that the XML is well formed. It does not validate against a schema (XSD).'],
      ['Does the tool upload my XML?', 'No. The tool processes it in your browser.'],
      ['Does the tool keep comments and attributes?', 'Yes. The tool preserves both.'],
      ['Why does my XML show an error?', 'Common causes are an unclosed tag, tags whose upper and lower case differ, and a bare & character.']
    ],
    next: [['json-formatter', 'Format JSON the same way.'], ['base64-encode', 'Decode a Base64 string that holds XML.'], ['url-encode', 'Percent-encode a value from the XML.']],
    io: ['XML', 'Formatted XML']
  },
  'xls-converter': {
    title: 'XLS Converter, XLSX CSV ODS Online',
    meta: 'Convert spreadsheets between XLSX, XLS, CSV, ODS and HTML in your browser. Free and private, with no upload and no sign-up.',
    answer: 'XLS Converter converts a spreadsheet between Excel (.xlsx, .xls), CSV, OpenDocument (.ods) and HTML table formats. It runs in your browser, so your data stays on your device.',
    steps: ['Add a spreadsheet (XLSX, XLS, CSV or ODS).', 'Choose the format to convert to.', 'Click Convert, then download the file.'],
    use: ['You need a CSV to import into another system.', 'You want to open an old .xls file in a newer program.', 'You want an HTML table to paste into a web page.'],
    tips: [
      'Convert to CSV when you need to import a spreadsheet into another system. A workbook with several sheets produces one CSV file per sheet.',
      'Remember that formulas stay intact between Excel formats, while CSV stores only the calculated values.',
      'Read what you keep and lose in our guide to <a href="/blog/convert-excel-to-csv">converting Excel to CSV</a>, including zeros, dates and formulas.',
      'Share a read-only copy with <a href="/excel-to-pdf">Excel to PDF</a>.'
    ],
    limits: ['CSV holds one sheet only, so the tool saves each sheet as its own CSV file.', 'CSV stores calculated values, not formulas.', 'Large files depend on your device memory.'],
    faq: [
      ['What happens with several sheets?', 'XLSX, XLS, ODS and HTML keep all sheets. CSV holds one sheet only, so the tool saves each sheet as its own CSV file.'],
      ['Does the tool keep formulas?', 'It keeps formulas when you convert between Excel formats. CSV stores the calculated values.'],
      ['Is there a size limit?', 'The tool sets no fixed limit, but large files depend on your device memory.'],
      ['Which formats can I convert to?', 'You can convert to XLSX, XLS, CSV, ODS or HTML.']
    ],
    next: [['excel-to-pdf', 'Turn the spreadsheet into a PDF.'], ['csv-to-json', 'Convert CSV data to JSON.'], ['pdf-to-excel', 'Pull a table out of a PDF.']],
    io: ['XLSX, XLS, CSV, ODS', 'XLSX, XLS, CSV, ODS, HTML']
  }
};
