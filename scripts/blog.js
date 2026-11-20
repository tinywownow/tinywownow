/* Blog posts. Add a new object to this array, run `node scripts/build.js`, commit and push.
   body is trusted HTML written by us. faq and sources are plain text (escaped by the build).
   tools = tool ids shown as "Try it" cards under the post. */
'use strict';
module.exports = [
  {
    slug: 'jpg-vs-png-vs-webp',
    title: 'JPG vs PNG vs WebP: Which Image Format Should You Use?',
    h1: 'JPG vs PNG vs WebP: which image format should you use?',
    meta: 'Use JPG for photos, PNG for screenshots and transparency, and WebP for the smallest files on the web. See when each format wins, with a quick table and free converters.',
    published: '2026-11-21',
    updated: '2026-11-21',
    readMin: 5,
    answer: 'Use JPG for photos you will email, upload or print, because every app opens it. Use PNG for screenshots, logos and anything with text or a transparent background. Use WebP when you want the smallest file for a website, since all current major browsers support it and it handles both photos and transparency.',
    body:
      '<h2 id="at-a-glance">JPG, PNG and WebP at a glance</h2>' +
      '<div class="tbl-wrap"><table><thead><tr><th>Format</th><th>Best for</th><th>Compression</th><th>Transparency</th><th>Main drawback</th></tr></thead><tbody>' +
      '<tr><td><b>JPG</b></td><td>Photos</td><td>Lossy</td><td>No</td><td>Blurry edges around text and sharp lines; quality drops each time you re-save it</td></tr>' +
      '<tr><td><b>PNG</b></td><td>Screenshots, logos, text, graphics</td><td>Lossless</td><td>Yes</td><td>Big files for photos</td></tr>' +
      '<tr><td><b>WebP</b></td><td>Almost anything on the web</td><td>Lossy or lossless</td><td>Yes</td><td>Some older apps, email clients and print tools cannot open it</td></tr>' +
      '</tbody></table></div>' +
      '<h2 id="jpg">JPG: the safe choice for photos</h2>' +
      '<p>JPG throws away detail your eye is unlikely to notice, which is why a photo can shrink a lot with little visible change. It works everywhere: phones, email, social apps, printers and old software. The trade-offs are that it cannot be transparent, and it smears fine lines and text, so a screenshot saved as JPG often looks fuzzy. Every re-save also loses a little more quality, so keep your original and export a JPG copy.</p>' +
      '<h2 id="png">PNG: sharp and lossless, but heavy for photos</h2>' +
      '<p>PNG keeps every pixel exactly as it was, so text, icons and interface screenshots stay crisp, and it supports transparent backgrounds. That is also why a photo saved as PNG can be several times larger than the same photo as JPG. Because PNG is lossless, a quality slider does nothing for it. To make a PNG smaller you resize it, or switch to WebP or JPG.</p>' +
      '<h2 id="webp">WebP: the smallest option for the web</h2>' +
      '<p>WebP can work in lossy mode like JPG or lossless mode like PNG, and it supports transparency. Google, which created the format, reports that lossy WebP files are 25 to 34 percent smaller than comparable JPEGs, and lossless WebP files are about 26 percent smaller than PNGs (see sources below). That makes it a good default for website images, where smaller files load faster. The catch is compatibility outside browsers: some older editors, email clients, document tools and print services still do not accept it. When in doubt, send JPG.</p>' +
      '<h2 id="choose">Which one should you pick?</h2>' +
      '<ul>' +
      '<li><b>Photo on your website or blog:</b> WebP, or JPG if you want maximum compatibility.</li>' +
      '<li><b>Photo to email, WhatsApp, a job portal or a printer:</b> JPG. It is accepted almost everywhere.</li>' +
      '<li><b>Screenshot or anything with small text:</b> PNG, so the text stays sharp.</li>' +
      '<li><b>Logo or icon with a transparent background:</b> PNG, or WebP if your site supports it.</li>' +
      '<li><b>An image you may edit again:</b> keep the original or a PNG, and export a smaller copy to share.</li>' +
      '</ul>' +
      '<h2 id="how-to">How to shrink or convert an image with TinyWow Now</h2>' +
      '<p>All of these run in your browser, so your images are not uploaded.</p>' +
      '<ol>' +
      '<li><b>Make a photo smaller:</b> open <a href="/compress-image">Compress Image</a>, drop your files, and set the quality (the slider starts at 75%). Under Output format choose <em>WebP (smallest)</em> or <em>JPG</em>, then download each file or all of them.</li>' +
      '<li><b>Switch format only:</b> use <a href="/convert-to-webp">Convert to WebP</a>, <a href="/convert-to-jpg">Convert to JPG</a> or <a href="/convert-to-png">Convert to PNG</a>. When you convert a transparent image to JPG, the transparent area is filled with white, because JPG has no transparency.</li>' +
      '<li><b>Still too big?</b> Lower the pixel size with <a href="/resize-image">Resize Image</a> first. A photo wider than the screen it will be shown on wastes bytes.</li>' +
      '</ol>',
    faq: [
      ['Is WebP better than JPG?', 'For file size, usually yes: Google reports lossy WebP files are 25 to 34 percent smaller than comparable JPEGs. For compatibility, JPG still wins, because every app and device opens it. Choose WebP for websites and JPG for sharing.'],
      ['Does converting a JPG to PNG improve the quality?', 'No. The detail lost when the JPG was saved cannot be recovered. A PNG made from a JPG looks the same and is usually much larger.'],
      ['Why did my transparent PNG get a white background as a JPG?', 'JPG cannot store transparency. Converters fill the see-through area with a solid colour, and our converter uses white. Keep the PNG or use WebP if you need transparency.'],
      ['Which format is best for an email or a form upload?', 'JPG for photos and PNG for screenshots. Some email clients and upload forms reject WebP, so avoid it when you are not sure what the receiving side supports.'],
      ['Does re-saving a JPG lower its quality each time?', 'Yes. JPG is lossy, so each save discards a little more detail. Edit from your original file and export a JPG only once at the end.']
    ],
    sources: [
      { n: 'Google for Developers: An image format for the Web (WebP)', u: 'https://developers.google.com/speed/webp' },
      { n: 'MDN Web Docs: Image file type and format guide', u: 'https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types' }
    ],
    tools: ['compress-image', 'image-to-webp', 'image-to-jpg', 'resize-image']
  }
];
