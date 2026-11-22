/* Blog posts. Add a new object to this array, run `node scripts/build.js`, commit and push.
   body is trusted HTML written by us. faq and sources are plain text (escaped by the build).
   tools = tool ids shown as "Try it" cards under the post. Section headings need an id (used for the contents list). */
'use strict';
module.exports = [
  {
    slug: 'merge-pdf-without-uploading',
    title: 'How to Merge PDF Files Without Uploading Them',
    seoTitle: 'Merge PDF Files Without Uploading Them',
    h1: 'How to merge PDF files without uploading them',
    meta: 'Merge PDFs privately: use a tool that runs in your browser, check for uploads in the Network tab, or merge offline. Steps, a privacy check and free options.',
    published: '2026-11-23',
    updated: '2026-11-23',
    readMin: 5,
    answer: 'To merge PDF files without uploading them, use a tool that runs inside your browser, such as Merge PDF on TinyWow Now, or a program on your own computer. Add your files, set the order, click merge and download merged.pdf. You can prove that nothing is uploaded by watching the Network tab in your browser developer tools while you merge.',
    body:
      '<h2 id="why">Why it matters where your PDF goes</h2>' +
      '<p>PDFs often hold the documents you least want to leak: contracts, ID scans, bank statements, medical reports and exam forms. Many online mergers work by sending your files to their server, merging them there and sending the result back. Most promise to delete the files afterwards, but then you are relying on their policy and their security. A tool that runs in your browser avoids the question, because your files never leave your device.</p>' +
      '<h2 id="how">How to merge PDFs in your browser</h2>' +
      '<ol>' +
      '<li>Open <a href="/merge-pdf">Merge PDF</a> and drag in two or more files, or click <em>Choose files</em>.</li>' +
      '<li>Put the files in the order you want. The up and down arrows move a file, and the merged pages follow the list from top to bottom.</li>' +
      '<li>Click <em>Merge PDF</em>.</li>' +
      '<li>Download <b>merged.pdf</b>.</li>' +
      '</ol>' +
      '<p>Pages are copied as they are, so text stays selectable and images keep their original quality. There is no fixed limit on the number of files. The practical limit is your device memory, and a few dozen normal documents merge without trouble on most computers.</p>' +
      '<h2 id="verify">How to check that nothing is uploaded</h2>' +
      '<p>Do not take a "no upload" label on trust, including ours. You can test it in about a minute:</p>' +
      '<ol>' +
      '<li>Open the merge page and press <b>F12</b> to open your browser developer tools, then go to the <b>Network</b> tab.</li>' +
      '<li>Clear the list, then merge two files.</li>' +
      '<li>Look at the requests. The first time you use the tool you may see one request for a library script, which is code coming into your browser. You should not see a request that sends your PDF out, such as a POST or PUT carrying a payload the size of your files.</li>' +
      '</ol>' +
      '<p>We ran this check ourselves on 23 November 2026. Merging two PDFs made a single request, the download of the open-source pdf-lib library, and no request that sent any data out. The merged file had both pages, and the text on each page was still selectable.</p>' +
      '<h2 id="options">Three ways to merge without uploading</h2>' +
      '<div class="tbl-wrap"><table><thead><tr><th>Option</th><th>Where your files go</th><th>Install needed</th><th>Good for</th></tr></thead><tbody>' +
      '<tr><td><b>Browser tool</b> (<a href="/merge-pdf">Merge PDF</a>)</td><td>Stay on your device</td><td>No</td><td>Quick merges on any computer or phone</td></tr>' +
      '<tr><td><b>Desktop program</b> (PDFsam)</td><td>Stay on your device</td><td>Yes</td><td>Regular or heavy use</td></tr>' +
      '<tr><td><b>Preview</b> on a Mac</td><td>Stay on your device</td><td>No, it is built in</td><td>Mac users merging a few files</td></tr>' +
      '</tbody></table></div>' +
      '<p>PDFsam is an open-source desktop program, so you can check how it works. On a Mac, Apple\'s guide to Preview describes dragging a PDF file from the Finder into the thumbnail sidebar of an open document to combine them. Preview saves changes automatically, so duplicate your originals first if you want to keep them.</p>' +
      '<h2 id="tips">Tips for a clean merge</h2>' +
      '<ul>' +
      '<li><b>Remove pages you do not need first.</b> Use <a href="/split-pdf">Split PDF</a> to extract just the page ranges you want, then merge the extracts.</li>' +
      '<li><b>Straighten sideways pages.</b> Fix them with <a href="/rotate-pdf">Rotate PDF</a> before you merge.</li>' +
      '<li><b>Think before compressing.</b> If the merged file is too big, <a href="/compress-pdf">Compress PDF</a> can shrink scans and photo-heavy documents, but it turns pages into images, so text in the compressed copy can no longer be selected. Keep the uncompressed merged file as well.</li>' +
      '<li><b>Unlock protected files first.</b> A password-protected PDF cannot be merged. Remove the password in the app that created it. The tool tells you which file is protected.</li>' +
      '</ul>',
    faq: [
      ['Is it safe to merge PDFs online?', 'It depends on the tool. Many sites upload your files to a server, so you rely on their deletion policy. A tool that runs in your browser keeps the files on your device, and you can check that yourself in the Network tab of your developer tools.'],
      ['Does merging reduce the quality of my PDFs?', 'No. Pages are copied as they are, so text stays selectable and images keep their original quality.'],
      ['Can I merge password-protected PDFs?', 'No. Remove the password in the app that created the file, then merge. The tool tells you which file is protected.'],
      ['How many PDFs can I merge at once?', 'There is no fixed limit. The practical limit is your device memory, and a few dozen normal documents merge without trouble on most computers.'],
      ['Can I change the order of the files?', 'Yes. Use the up and down arrows next to each file before you click Merge PDF. The merged pages follow the order of the list.'],
      ['Does it work on a phone?', 'Yes, in a modern phone browser. Very large files depend on your phone memory, so a big merge may be easier on a computer.']
    ],
    sources: [
      { n: 'pdf-lib: create and modify PDF documents in JavaScript', u: 'https://pdf-lib.js.org/' },
      { n: 'Chrome for Developers: Inspect network activity', u: 'https://developer.chrome.com/docs/devtools/network/' },
      { n: 'Apple Support: Combine PDFs in Preview on Mac', u: 'https://support.apple.com/guide/preview/combine-pdfs-prvw43696/mac' },
      { n: 'PDFsam: open-source PDF split and merge', u: 'https://pdfsam.org/' }
    ],
    tools: ['merge-pdf', 'split-pdf', 'rotate-pdf', 'compress-pdf']
  },
  {
    slug: 'compress-image-to-100kb',
    title: 'How to Compress an Image to 100 KB, 50 KB or 20 KB',
    seoTitle: 'Compress Image to 100 KB, 50 KB or 20 KB',
    h1: 'How to compress an image to 100 KB, 50 KB or 20 KB',
    meta: 'Crop, shrink the pixel width, then lower JPG quality. A step-by-step way to get a photo under 100 KB, 50 KB or 20 KB for a form upload, free and private.',
    published: '2026-11-21',
    updated: '2026-11-21',
    readMin: 6,
    answer: 'To get a photo under 100 KB, crop it, reduce its width to about 1,000 to 1,200 pixels, then save it as a JPG at roughly 70 to 80 percent quality. Cutting pixels does most of the work; lowering quality alone rarely shrinks a phone photo that far without visible damage. The Compress Image tool on TinyWow Now can do this for you: type a target size such as 100 KB and it finds the best quality that fits, in your browser, so the photo is not uploaded.',
    body:
      '<h2 id="why">Why the quality slider alone is not enough</h2>' +
      '<p>A JPG stores colour information for the pixels in the picture, so the more pixels it has, the bigger the file. A typical phone photo is 4000 by 3000 pixels, which is 12,000,000 pixels, and files like that are commonly several megabytes. A version 1200 pixels wide (1200 by 900) has about 1,080,000 pixels, roughly eleven times fewer. At 800 by 600 it has 480,000, twenty-five times fewer.</p>' +
      '<p>That is why the reliable order is: <b>crop, then shrink the pixel size, then lower the quality</b>. If you only drag the quality down, you end up with a full-size picture that is full of blocky artefacts and still too heavy.</p>' +
      '<h2 id="steps">Step by step: get an image under your size limit</h2>' +
      '<ol>' +
      '<li><b>Read the rules on the form.</b> Note the maximum file size, the pixel size if one is given, the accepted formats (usually JPG), and whether there is a minimum size too.</li>' +
      '<li><b>Crop first.</b> Open <a href="/crop-image">Crop Image</a> and remove everything that is not needed: for a passport-style photo keep the head and shoulders, for a signature crop tightly around the ink. Less area means fewer pixels to store.</li>' +
      '<li><b>Let the tool hit your limit.</b> Open <a href="/compress-image">Compress Image</a>, drop your file and type your limit in <em>Target size</em>, or tap the 20, 50, 100 or 200 KB button. The tool finds the highest quality that fits under that size and shrinks the pixel size only when it has to. It counts 1 KB as 1,000 bytes, so the result also fits under forms that count 1,024.</li>' +
      '<li><b>Check the result.</b> Under <em>Compressed</em> you can see the new size next to the original. If a file is marked <em>Over target</em>, crop it tighter or choose a slightly larger target.</li>' +
      '<li><b>Prefer to control it yourself?</b> Leave Target size empty, open <em>Advanced options</em>, set <em>Max width</em> from the table below, choose <em>JPG</em> as the output format and start the quality at 80%. Lower the quality by 5 at a time, and if you need to go below about 65%, reduce the max width instead, because quality that low shows artefacts around edges and text.</li>' +
      '</ol>' +
      '<h2 id="targets">Starting points for 200 KB, 100 KB, 50 KB and 20 KB</h2>' +
      '<div class="tbl-wrap"><table><thead><tr><th>Target size</th><th>Max width to try</th><th>Starting quality</th><th>Tip</th></tr></thead><tbody>' +
      '<tr><td><b>200 KB</b></td><td>1600 px</td><td>80%</td><td>Fine for most photo uploads</td></tr>' +
      '<tr><td><b>100 KB</b></td><td>1200 px</td><td>75 to 80%</td><td>Crop first if the subject is small in the frame</td></tr>' +
      '<tr><td><b>50 KB</b></td><td>800 px</td><td>70%</td><td>A plain background compresses much better than a busy one</td></tr>' +
      '<tr><td><b>20 KB</b></td><td>The size the form asks for</td><td>65 to 70%</td><td>Passport-style photos and signatures are usually small to begin with</td></tr>' +
      '</tbody></table></div>' +
      '<p>If you use the Target size box, the tool picks the quality and width for you. These are starting points for doing it by hand, and are not guarantees. The final size depends on the picture: a photo with a plain wall behind the subject compresses far more than a crowded street scene. Always read the size shown after compression before you upload.</p>' +
      '<h2 id="signatures">Signatures and photos with text</h2>' +
      '<p>Lossy JPG compression struggles with sharp edges and text, because it smears them. web.dev warns that high-contrast text and line art are prone to artefacts. For a signature, crop tightly, keep the pixel size the form asks for, and avoid very low quality. Signature fields are often stricter than photo fields, so check whether yours says 10 KB or 20 KB. If the form accepts PNG, a clean scan on a plain white background can sometimes come out smaller as a PNG than as a JPG, so it is worth comparing both.</p>' +
      '<h2 id="mistakes">Common mistakes that make the file bigger or worse</h2>' +
      '<ul>' +
      '<li><b>Compressing the same file again and again.</b> Each lossy pass discards more detail. Go back to your original and make one careful pass.</li>' +
      '<li><b>Using PNG for a photo.</b> PNG is lossless, so the quality slider has no effect on it and photos stay large. Switch the output to JPG or WebP.</li>' +
      '<li><b>Enlarging a small image.</b> Making it bigger adds pixels but no detail, and the file grows.</li>' +
      '<li><b>Going under the minimum.</b> Some forms reject images that are too small in pixels or too light in size. Check both limits.</li>' +
      '</ul>' +
      '<h2 id="privacy">Is it safe to compress a passport photo online?</h2>' +
      '<p>It depends on the tool. Many online compressors upload your file to a server, which matters for ID photos and signatures. A browser-based tool processes the file on your own device instead. TinyWow Now works this way, and you can check it yourself instead of taking our word for it:</p>' +
      '<ol>' +
      '<li>Open the Compress Image page and press <b>F12</b> to open your browser\'s developer tools.</li>' +
      '<li>Go to the <b>Network</b> tab and clear it.</li>' +
      '<li>Compress a photo. You should see no request that carries your image to another server.</li>' +
      '</ol>' +
      '<p>We ran this check ourselves on 21 November 2026: compressing a test image (261 KB down to 137 KB) made no network requests.</p>',
    faq: [
      ['How do I compress an image to 100 KB without losing quality?', 'Strictly speaking, JPG compression always discards some data, so nothing at that size is truly lossless. You can avoid visible loss by cropping, reducing the width to what the form needs and keeping the quality around 75 to 80 percent. At normal viewing size most photos look the same as the original.'],
      ['Why is my image still over the limit after compressing?', 'Usually because the pixel size is still too large. Reduce the Max width first, then fine-tune the quality. Also check that the output format is JPG, since PNG does not shrink with the quality slider.'],
      ['Can I set an exact target size like 100 KB?', 'Yes. Type it in the Target size box on Compress Image, or tap 20, 50, 100 or 200 KB. The tool finds the highest quality that fits and reduces the pixel size only if it has to. When a target is set, PNG images are saved as JPG. We tested targets of 200, 100, 50 and 20 KB on a large 4000 by 3000 test image, and every result came in under its target.'],
      ['Will a 50 KB image look blurry?', 'On screen at normal size, a photo of about 800 pixels wide at 70 percent quality usually looks fine. Fine text, thin lines and large print sizes are where the loss shows.'],
      ['What is the difference between KB and MB?', 'A megabyte is about 1,000 kilobytes, or 1,024 in some systems. A 2 MB photo is therefore roughly 2,000 KB, and it has to lose about 95 percent of its size to fit under 100 KB.'],
      ['Does the image get uploaded when I compress it here?', 'No. The compression runs in your browser, and you can confirm that in the Network tab of your developer tools, as described above.']
    ],
    sources: [
      { n: 'web.dev: Image performance (Learn Performance)', u: 'https://web.dev/learn/performance/image-performance' },
      { n: 'web.dev: Image formats, JPEG (Learn Images)', u: 'https://web.dev/learn/images/jpeg/' },
      { n: 'web.dev: Use srcset to automatically choose the right image', u: 'https://web.dev/articles/use-srcset-to-automatically-choose-the-right-image' }
    ],
    tools: ['compress-image', 'crop-image', 'resize-image', 'image-to-jpg']
  }
];
