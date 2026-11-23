/* Blog posts. Add a new object to this array, run `node scripts/build.js`, commit and push.
   body is trusted HTML written by us. faq and sources are plain text (escaped by the build).
   tools = tool ids shown as "Try it" cards under the post. Section headings need an id (used for the contents list). */
'use strict';
module.exports = [
  {
    slug: 'compress-video-for-email',
    title: 'How to Compress a Video for Email',
    seoTitle: 'Compress a Video for Email Under 25 MB',
    h1: 'How to compress a video for email',
    meta: 'Get a video under your email limit: check the limit, work out the size you need, then compress it in your browser. Steps, a size formula and a privacy check.',
    published: '2026-11-23',
    updated: '2026-11-23',
    readMin: 5,
    answer: 'To compress a video for email, check your limit first. Gmail allows up to 25 MB of attachments for personal accounts. Then lower the resolution and raise the compression until the file fits with room to spare. Compress Video on TinyWow Now does this in your browser, so your video never uploads.',
    body:
      '<h2 id="limit">Know your limit before you compress</h2>' +
      '<p>Gmail lets you attach up to 25 MB in total on a personal account. When you attach more, Gmail adds a Google Drive link instead. Work and school accounts differ, because the Google Workspace administrator sets their limits. Other providers set their own limits, so check yours before you start.</p>' +
      '<p>Email adds overhead to every attachment, so the message grows larger than the file. As a rule of thumb, aim for 15 to 18 MB when the limit is 25 MB. This margin is our own advice, not a figure from Google.</p>' +
      '<h2 id="maths">Work out the size your video needs</h2>' +
      '<p>A video file grows with its bitrate and its length. Multiply the size you want in megabytes by 8, then divide by the length in seconds. The answer is the average bitrate, in megabits per second, that fits.</p>' +
      '<div class="tbl-wrap"><table><thead><tr><th>Video length</th><th>Target size</th><th>Average bitrate that fits</th></tr></thead><tbody>' +
      '<tr><td>1 minute (60 s)</td><td>18 MB</td><td>2.4 Mbps (18 &times; 8 &divide; 60)</td></tr>' +
      '<tr><td>3 minutes (180 s)</td><td>18 MB</td><td>0.8 Mbps (18 &times; 8 &divide; 180)</td></tr>' +
      '<tr><td>5 minutes (300 s)</td><td>18 MB</td><td>0.48 Mbps (18 &times; 8 &divide; 300)</td></tr>' +
      '</tbody></table></div>' +
      '<p>Treat these numbers as a guide. Compress Video sets quality and resolution, not bitrate, so you check the result and adjust. A longer video needs a lower bitrate, which means a smaller picture or stronger compression.</p>' +
      '<h2 id="how">How to compress a video for email</h2>' +
      '<ol>' +
      '<li>Open <a href="/compress-video">Compress Video</a> and add your file.</li>' +
      '<li>Set <em>Compression</em> to Balanced (recommended) first. Choose Strong (smallest) when the result is still too big.</li>' +
      '<li>Set <em>Resolution</em> to Max 720p for most clips, or Max 480p for long ones.</li>' +
      '<li>Click <em>Compress video</em>, then read the sizes before and after.</li>' +
      '<li>Download the MP4 and check that it plays. If it is still over your limit, follow the next section and run it again.</li>' +
      '</ol>' +
      '<p>The tool compresses with H.264 video and AAC audio, and it never scales a video up. Balanced uses H.264 CRF 28 and Strong uses CRF 32. A higher number gives a smaller file with more visible loss.</p>' +
      '<h2 id="shrink">What shrinks a video the most</h2>' +
      '<ul>' +
      '<li><b>A shorter video.</b> Every second you cut removes data. Use <a href="/trim-video">Trim Video</a> to keep only the part you need.</li>' +
      '<li><b>A lower resolution.</b> A 1280 &times; 720 picture holds 921,600 pixels, against 2,073,600 at 1920 &times; 1080. That is more than half fewer pixels to store. <a href="/resize-video">Resize Video</a> does only this step.</li>' +
      '<li><b>Stronger compression.</b> Move from Balanced to Strong when the picture still looks good at the smaller size.</li>' +
      '</ul>' +
      '<p>A ZIP file does not help. Video already uses compression, so a ZIP barely shrinks it and only bundles files.</p>' +
      '<h2 id="too-big">When compression is not enough</h2>' +
      '<p>Share a link instead. Gmail turns large attachments into Google Drive links, and you can upload the file to any cloud storage and send its link. The tool refuses files over about 700 MB, so trim a long recording first or share it as a link.</p>' +
      '<p>Sending the video on WhatsApp instead? Its limits differ by platform and change over time, so read the current WhatsApp help page for your device before you compress.</p>' +
      '<h2 id="privacy">Does the video upload?</h2>' +
      '<p>No. Compress Video runs on your device, in your browser. The first run downloads a video engine of about 30 MB, and your browser keeps it for next time. You can check this yourself with the Network tab, as our guide to <a href="/blog/merge-pdf-without-uploading">merging PDF files without uploading them</a> explains.</p>' +
      '<p>We ran this check on 23 November 2026 with a short test clip. The tool made four requests, all downloads of its own video engine files, and no request that sent data out. The compression finished in five seconds on a four-second clip, and longer videos take longer.</p>',
    faq: [
      ['What size should a video be for email?', 'It must fit your provider limit with room to spare. Gmail allows 25 MB in total for personal accounts, and Workspace administrators set their own limits for work and school accounts.'],
      ['How do I send a video that is too big for email?', 'Compress it with Compress Video, or share a link. Gmail adds a Google Drive link automatically when your attachments exceed 25 MB.'],
      ['Does compressing a video reduce its quality?', 'Yes, a little. The tool uses lossy H.264 compression, and stronger levels and lower resolutions show more loss. Keep your original file.'],
      ['Which format should I send?', 'Send an MP4 with H.264 video and AAC audio, because it plays on nearly every device. Compress Video saves an MP4.'],
      ['Can I set an exact size such as 20 MB?', 'Not yet. Compress Video sets quality and resolution, not a target size. Use the size formula above, then check the result and adjust.'],
      ['Does the tool upload my video?', 'No. The tool runs in your browser, on your device. You can confirm this in the Network tab of your developer tools.']
    ],
    sources: [
      { n: 'Gmail Help: Send attachments with your Gmail message', u: 'https://support.google.com/mail/answer/6584' },
      { n: 'WhatsApp Help Center: How to send media, contacts, or location', u: 'https://faq.whatsapp.com/453914586839706/' },
      { n: 'Chrome for Developers: Inspect network activity', u: 'https://developer.chrome.com/docs/devtools/network/' }
    ],
    tools: ['compress-video', 'trim-video', 'resize-video', 'convert-video']
  },
  {
    slug: 'merge-pdf-without-uploading',
    title: 'How to Merge PDF Files Without Uploading Them',
    seoTitle: 'Merge PDF Files Without Uploading Them',
    h1: 'How to merge PDF files without uploading them',
    meta: 'Merge PDFs privately: use a tool that runs in your browser, check for uploads in the Network tab, or merge offline. Steps, a privacy check and free options.',
    published: '2026-11-23',
    updated: '2026-11-23',
    readMin: 5,
    answer: 'To merge PDF files without uploading them, use a tool that runs in your browser, such as Merge PDF, or a program on your own computer. Add your files, set the order, click merge and download merged.pdf. You can prove that nothing uploads by watching the Network tab in your browser developer tools while you merge.',
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
      '<p>The tool copies pages as they are, so text stays selectable and images keep their original quality. It sets no fixed limit on the number of files. Your device memory sets the practical limit, and a few dozen normal documents merge without trouble on most computers.</p>' +
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
      '<li><b>Remove pages you do not need first.</b> Use <a href="/split-pdf">Split PDF</a> to extract only the page ranges you want, then merge the extracts.</li>' +
      '<li><b>Straighten sideways pages.</b> Fix them with <a href="/rotate-pdf">Rotate PDF</a> before you merge.</li>' +
      '<li><b>Think before compressing.</b> When the merged file is too big, <a href="/compress-pdf">Compress PDF</a> shrinks scans and photo-heavy documents, but it turns pages into images. You cannot select text in the compressed copy, so keep the uncompressed merged file too.</li>' +
      '<li><b>Unlock protected files first.</b> The tool cannot merge a password-protected PDF, so remove the password in the app that created it. The tool names the file that needs unlocking.</li>' +
      '</ul>',
    faq: [
      ['Is it safe to merge PDFs online?', 'It depends on the tool. Many sites upload your files to a server, so you rely on their deletion policy. A tool that runs in your browser keeps the files on your device. You can check this yourself in the Network tab of your developer tools.'],
      ['Does merging reduce the quality of my PDFs?', 'No. The tool copies pages as they are, so text stays selectable and images keep their original quality.'],
      ['Can I merge password-protected PDFs?', 'No. Remove the password in the app that created the file, then merge. The tool names the file that needs unlocking.'],
      ['How many PDFs can I merge at once?', 'There is no fixed limit. The practical limit is your device memory, and a few dozen normal documents merge without trouble on most computers.'],
      ['Can I change the order of the files?', 'Yes. Use the up and down arrows next to each file before you click Merge PDF. The merged pages follow the order of the list.'],
      ['Does it work on a phone?', 'Yes, in a modern phone browser. Large files depend on your phone memory, so a big merge may run better on a computer.']
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
    answer: 'To get a photo under 100 KB, crop it and reduce its width to about 1,000 to 1,200 pixels. Then save it as a JPG at roughly 70 to 80 percent quality. Cutting pixels does most of the work, and lowering quality alone rarely shrinks a phone photo that far without visible damage. The Compress Image tool on TinyWow Now does this for you. Type a target size such as 100 KB, and the tool finds the best quality that fits. It runs in your browser, so your photo never uploads.',
    body:
      '<h2 id="why">Why the quality slider alone is not enough</h2>' +
      '<p>A JPG stores colour information for the pixels in the picture, so the more pixels it has, the bigger the file. A typical phone photo is 4000 by 3000 pixels, which is 12,000,000 pixels, and files like that are commonly several megabytes. A version 1200 pixels wide (1200 by 900) has about 1,080,000 pixels, roughly eleven times fewer. At 800 by 600 it has 480,000, twenty-five times fewer.</p>' +
      '<p>That is why the reliable order is: <b>crop, then shrink the pixel size, then lower the quality</b>. If you only drag the quality down, you end up with a full-size picture that is full of blocky artefacts and still too heavy.</p>' +
      '<h2 id="steps">Step by step: get an image under your size limit</h2>' +
      '<ol>' +
      '<li><b>Read the rules on the form.</b> Note the maximum file size and the pixel size, if the form gives one. Note the formats it accepts (usually JPG) and whether it sets a minimum size too.</li>' +
      '<li><b>Crop first.</b> Open <a href="/crop-image">Crop Image</a> and remove everything you do not need. For a passport-style photo, keep the head and shoulders. For a signature, crop tightly around the ink. Less area means fewer pixels to store.</li>' +
      '<li><b>Let the tool hit your limit.</b> Open <a href="/compress-image">Compress Image</a>, drop your file and type your limit in <em>Target size</em>, or tap the 20, 50, 100 or 200 KB button. The tool finds the highest quality that fits under that size and shrinks the pixel size only when it has to. It counts 1 KB as 1,000 bytes, so the result also fits under forms that count 1,024.</li>' +
      '<li><b>Check the result.</b> Under <em>Compressed</em> you can see the new size next to the original. If the tool marks a file as <em>Over target</em>, crop it tighter or choose a slightly larger target.</li>' +
      '<li><b>Prefer to control it yourself?</b> Leave Target size empty, open <em>Advanced options</em>, set <em>Max width</em> from the table below, choose <em>JPG</em> as the output format and start the quality at 80%. Lower the quality by 5 at a time. Below about 65%, reduce the max width instead, because quality that low shows artefacts around edges and text.</li>' +
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
      '<p>Lossy JPG compression struggles with sharp edges and text, because it smears them. web.dev warns that high-contrast text and line art are prone to artefacts. For a signature, crop tightly, keep the pixel size the form asks for, and avoid low quality. Signature fields are often stricter than photo fields, so check whether yours says 10 KB or 20 KB. If the form accepts PNG, a clean scan on a plain white background can sometimes shrink more as a PNG than as a JPG. Compare both.</p>' +
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
      ['Can I set an exact target size like 100 KB?', 'Yes. Type it in the Target size box on Compress Image, or tap 20, 50, 100 or 200 KB. The tool finds the highest quality that fits and reduces the pixel size only if it has to. When you set a target, the tool saves PNG images as JPG. We tested targets of 200, 100, 50 and 20 KB on a large 4000 by 3000 test image, and every result came in under its target.'],
      ['Will a 50 KB image look blurry?', 'On screen at normal size, a photo of about 800 pixels wide at 70 percent quality usually looks fine. Fine text, thin lines and large print sizes are where the loss shows.'],
      ['What is the difference between KB and MB?', 'A megabyte is about 1,000 kilobytes, or 1,024 in some systems. A 2 MB photo is therefore roughly 2,000 KB, and it has to lose about 95 percent of its size to fit under 100 KB.'],
      ['Does the tool upload my image when I compress it here?', 'No. The compression runs in your browser, and you can confirm that in the Network tab of your developer tools, as described above.']
    ],
    sources: [
      { n: 'web.dev: Image performance (Learn Performance)', u: 'https://web.dev/learn/performance/image-performance' },
      { n: 'web.dev: Image formats, JPEG (Learn Images)', u: 'https://web.dev/learn/images/jpeg/' },
      { n: 'web.dev: Use srcset to automatically choose the right image', u: 'https://web.dev/articles/use-srcset-to-automatically-choose-the-right-image' }
    ],
    tools: ['compress-image', 'crop-image', 'resize-image', 'image-to-jpg']
  }
];
