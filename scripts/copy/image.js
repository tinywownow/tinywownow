/* Image cluster copy. Same blueprint and rules as pdf.js. */
'use strict';
module.exports = {
  'compress-image': {
    title: 'Image Compressor, Compress JPG PNG WebP',
    meta: 'Compress images online in your browser. Set a target size such as 100 KB or pick a quality level. JPG, PNG and WebP, with no upload.',
    answer: 'The image compressor reduces the file size of JPG, PNG and WebP images in your browser, so your photos never leave your device. Pick a compression level or type a target size such as 100 KB, add as many images as you like, and download the smaller files.',
    steps: ['Drop your images in, or click Choose images. You can add many at once.', 'Pick Light, Balanced, Strong or Maximum, or type a target size in KB.', 'Download each image, or click Download all.'],
    use: ['A form accepts only images under 100 KB or 200 KB.', 'You want faster web pages without visible quality loss.', 'You need to email many photos and want smaller attachments.'],
    tips: [
      'Type your limit in Target size, or tap 20, 50, 100 or 200 KB. The tool finds the highest quality that fits. Read the full method in <a href="/blog/compress-image-to-100kb">how to compress an image to 100 KB, 50 KB or 20 KB</a>.',
      'Choose JPG or WebP as the output for photos. Keep PNG for screenshots and graphics where every pixel matters.',
      'Set a Max width in Advanced options when you need the image only on screen. Fewer pixels give the biggest saving.',
      'Start from your original each time. Compressing an already compressed JPG again discards more detail.'
    ],
    limits: ['PNG is lossless, so the quality slider does not change PNG files. Resize, or switch to WebP or JPG.', 'With a target size, the tool saves PNG images as JPG and fills transparent areas with white.', 'The tool marks a file as Over target when it cannot reach your limit.'],
    faq: [
      ['How much smaller will my images get?', 'Typical photos shrink by 40 to 80 percent at Balanced quality with little visible change. Images that are already well compressed shrink less.'],
      ['How do I compress an image to 100 KB, 50 KB or 20 KB?', 'Type the size in the Target size box, or tap the 20, 50, 100 or 200 KB button. The tool finds the highest quality that fits and reduces the pixel size only when it must.'],
      ['Is PNG compression lossless?', 'Yes. PNG is lossless, so the quality slider does not change it. To shrink a PNG, resize it, or convert it to WebP or JPG.'],
      ['What if the result is bigger than the original?', 'When the format and size stay the same and the new file would grow, the tool keeps your original and marks it Already optimal.']
    ],
    next: [['resize-image', 'Reduce the pixel size for a bigger saving.'], ['crop-image', 'Crop away pixels you do not need first.'], ['image-to-webp', 'Convert photos to WebP for smaller web files.']],
    io: ['JPG, PNG, WebP', 'JPG, PNG, WebP']
  },
  'resize-image': {
    title: 'Resize Image Online, Exact Pixels',
    meta: 'Resize JPG, PNG and WebP images to exact pixel dimensions in your browser. Free and private, with no sign-up and no watermark.',
    answer: 'Resize Image changes the width and height of a picture to the exact pixel size you enter. It runs in your browser, so your image stays on your device, and you can download the resized file straight away.',
    steps: ['Add an image.', 'Enter the width and height in pixels.', 'Click Resize Image, then download the result.'],
    use: ['A form asks for an exact size, such as 600 by 800 pixels.', 'You want a smaller file for email or a website.', 'You need one size for a set of product photos.'],
    tips: [
      'Turn off Keep proportions and enter both sides to match a form that asks for exact dimensions.',
      'Shrinking the pixel size is the quickest way to cut file size. A photo that shows at 800 px wide does not need 4,000 px.',
      'The tool saves a JPG, so transparent areas turn white. Keep your original PNG when you need transparency.',
      'To enlarge an image, use <a href="/upscale-image">Upscale Image</a>, which gives cleaner results.'
    ],
    limits: ['The tool saves the result as a JPG.', 'The tool fills transparent areas with white.', 'The tool cannot add detail when you enlarge a picture.'],
    faq: [
      ['Does it keep the aspect ratio?', 'Turn on Keep proportions and enter one side. The tool calculates the other side for you. Turn it off to stretch the image to exact dimensions.'],
      ['Which formats can I resize?', 'You can resize JPG, PNG, WebP, GIF and BMP images. The tool saves the result as a JPG.'],
      ['Will resizing reduce the file size?', 'Usually yes, because fewer pixels need less data. For more control, use the Image Compressor.'],
      ['Can I resize many images at once?', 'Not yet. Resize one image at a time, or set a Max width in the Image Compressor to shrink a batch.']
    ],
    next: [['compress-image', 'Set a target size for the resized image.'], ['crop-image', 'Crop the picture before you resize it.'], ['upscale-image', 'Enlarge a small picture cleanly.']],
    io: ['JPG, PNG, WebP, GIF, BMP', 'JPG']
  },
  'image-to-jpg': {
    title: 'Convert Image to JPG Online, Free',
    meta: 'Convert PNG, WebP, GIF and BMP images to JPG in your browser. Free and private, with no sign-up. Transparent areas become white.',
    answer: 'Convert to JPG changes PNG, WebP, GIF and BMP images into the widely supported JPG format. The tool fills transparent areas with white, because JPG does not support transparency.',
    steps: ['Add an image.', 'Click Convert to JPG.', 'Download the JPG file.'],
    use: ['An app or form rejects your WebP or PNG file.', 'You want a smaller file from a screenshot or graphic.', 'You need a format that every device opens.'],
    tips: [
      'Use this tool when an app or form accepts JPG but rejects WebP, PNG or GIF.',
      'Keep transparent PNG logos as PNG. JPG fills see-through areas with white and cannot restore them.',
      'For a smaller JPG, run the result through <a href="/compress-image">Compress Image</a>.',
      'This tool converts one image at a time. Use Compress Image for batches.'
    ],
    limits: ['The tool saves JPG at high quality (92 percent), which still loses a little detail.', 'The tool fills transparency with white.', 'The tool converts one image at a time.'],
    faq: [
      ['What happens to transparency?', 'JPG cannot store transparency, so the tool fills transparent areas with white.'],
      ['Will the quality drop?', 'JPG is a lossy format, so you lose a small amount of detail. The tool saves the file at high quality (92 percent).'],
      ['Can I convert many images at once?', 'Not yet. Convert one image at a time, or use the Image Compressor for batches.'],
      ['Which formats can I convert?', 'You can convert PNG, WebP, GIF and BMP images.']
    ],
    next: [['compress-image', 'Shrink the JPG further.'], ['image-to-png', 'Keep a lossless copy instead.'], ['image-to-webp', 'Choose a smaller modern format for the web.']],
    io: ['PNG, WebP, GIF, BMP', 'JPG']
  },
  'image-to-png': {
    title: 'Convert Image to PNG Online, Free',
    meta: 'Convert JPG, WebP, GIF and BMP images to lossless PNG in your browser. Free and private, with no sign-up.',
    answer: 'Convert to PNG saves JPG, WebP, GIF and BMP images as lossless PNG files. PNG keeps sharp edges and transparency, which suits graphics, screenshots and logos. It runs in your browser.',
    steps: ['Add an image.', 'Click Convert to PNG.', 'Download the PNG file.'],
    use: ['You plan to edit and save an image several times.', 'You need sharp edges for a logo, icon or screenshot.', 'You need to keep the transparency of a WebP or GIF.'],
    tips: [
      'Convert to PNG before you edit and save an image several times. PNG loses no more detail on each save.',
      'Do not convert photos to PNG only to upload them. The file grows a lot with no visible gain.',
      'Use PNG for screenshots, logos and graphics with sharp edges and text.',
      'The tool keeps transparency when the source image has it, such as a WebP or GIF.'
    ],
    limits: ['The tool cannot restore detail that a JPG already lost.', 'The tool makes larger files than JPG for photos.', 'The tool keeps transparency only when the source image has it.'],
    faq: [
      ['Does converting JPG to PNG improve quality?', 'No. PNG cannot restore detail that the JPG already removed. It only stops further loss when you edit and save again.'],
      ['Why is the PNG bigger than the JPG?', 'PNG stores every pixel without discarding detail, so photographs make larger files.'],
      ['Does the tool keep transparency?', 'Yes, when the source image has it, for example a WebP or GIF.'],
      ['Which formats can I convert?', 'You can convert JPG, WebP, GIF and BMP images.']
    ],
    next: [['image-to-jpg', 'Make a smaller file for photos.'], ['image-to-webp', 'Keep transparency in a smaller file.'], ['compress-image', 'Shrink images for sharing.']],
    io: ['JPG, WebP, GIF, BMP', 'PNG']
  },
  'image-to-webp': {
    title: 'Convert Image to WebP Online, Free',
    meta: 'Convert JPG, PNG and other images to modern WebP in your browser for smaller files and faster pages. Free and private.',
    answer: 'Convert to WebP changes JPG, PNG, GIF and BMP images into WebP, a modern format that is usually smaller than JPG or PNG at similar quality. All current browsers support it.',
    steps: ['Add an image.', 'Click Convert to WebP.', 'Download the WebP file.'],
    use: ['You want faster pages on your own website.', 'You need smaller image files at similar quality.', 'You want transparency in a smaller file than PNG.'],
    tips: [
      'Use WebP for images on your own website, where smaller files help pages load faster.',
      'Keep a JPG copy for email, documents and older software, which may not open WebP.',
      'Compare the file sizes after you convert. WebP is usually smaller, but the saving depends on the picture.',
      'For a size limit, use <a href="/compress-image">Compress Image</a> with WebP as the output and a target size.'
    ],
    limits: ['Some older software and apps cannot open WebP files.', 'The saving varies by picture, so WebP is not always smaller.', 'The tool keeps your original file and creates a new WebP copy.'],
    faq: [
      ['Why use WebP?', 'WebP files are typically smaller than equivalent JPG or PNG files, which makes web pages load faster.'],
      ['Does every program support WebP?', 'All current browsers support it. Some older software and apps cannot open WebP files.'],
      ['Does WebP support transparency?', 'Yes. WebP supports transparency, like PNG.'],
      ['How much smaller is WebP?', 'Google reports that lossy WebP files are 25 to 34 percent smaller than comparable JPEGs. Your saving depends on the picture.']
    ],
    next: [['compress-image', 'Set a target size for the WebP file.'], ['image-to-jpg', 'Make a universal copy for email.'], ['resize-image', 'Reduce the pixel size first.']],
    io: ['JPG, PNG, GIF, BMP', 'WebP']
  },
  'crop-image': {
    title: 'Crop Image Online, Free',
    meta: 'Crop JPG, PNG and WebP images by dragging a box, with free or fixed ratios (1:1, 4:3, 16:9, 3:4). Free and private, in your browser.',
    answer: 'Crop Image lets you drag a selection box over your picture. Choose a free or fixed shape, such as 1:1, 4:3 or 16:9, and download the cropped result as PNG, JPG or WebP. It runs in your browser.',
    steps: ['Add an image.', 'Choose a shape, then drag the box and its corners to frame the part you want.', 'Click Crop image, then download the result.'],
    use: ['You need a square profile picture.', 'You want to cut the background away from a photographed document.', 'You must trim an image to a 16:9 thumbnail or slide.'],
    tips: [
      'Use 1:1 for profile pictures, 16:9 for thumbnails and slides, and 4:3 or 3:4 for standard photo shapes.',
      'Crop before you compress. Fewer pixels give a smaller file, which helps with passport-style photos and signatures. See the <a href="/blog/compress-image-to-100kb">100 KB guide</a>.',
      'The tool cuts from your full-size original, not the preview, so you keep the full resolution.',
      'Save as PNG for lossless quality, or as JPG or WebP for a smaller file.'
    ],
    limits: ['The tool offers free, 1:1, 4:3, 16:9 and 3:4 shapes.', 'The tool crops rectangular areas only, not freehand shapes.', 'The tool saves PNG, JPG or WebP.'],
    faq: [
      ['Can I crop to a square or 16:9?', 'Yes. Pick 1:1, 4:3, 16:9 or 3:4, and the box keeps that ratio while you resize it.'],
      ['What quality does the cropped image have?', 'The tool cuts from the original full-size image, not the preview, so you lose no resolution.'],
      ['Which formats can I save as?', 'You can save as PNG, JPG or WebP.'],
      ['Which formats can I crop?', 'You can crop JPG, PNG, WebP, GIF and BMP images.']
    ],
    next: [['compress-image', 'Shrink the cropped image to a target size.'], ['resize-image', 'Set exact pixel dimensions.'], ['rotate-image', 'Straighten the picture before you crop.']],
    io: ['JPG, PNG, WebP, GIF, BMP', 'PNG, JPG, WebP']
  },
  'rotate-image': {
    title: 'Rotate and Flip Image Online, Free',
    meta: 'Rotate images by 90 or 180 degrees and flip them horizontally or vertically in your browser. Free and private, with no sign-up.',
    answer: 'Rotate and Flip Image turns a picture 90 degrees left or right, or 180 degrees, and optionally mirrors it horizontally or vertically. It runs in your browser and saves the result as a JPG.',
    steps: ['Add an image.', 'Choose the rotation and, if you need it, a flip direction.', 'Click Rotate and Flip Image, then download the result.'],
    use: ['A phone photo opens sideways on your computer.', 'A selfie shows its text in reverse.', 'A scanned page arrived upside down.'],
    tips: [
      'Use 90 degrees for a sideways phone photo and 180 degrees for an upside-down one.',
      'Flip horizontally to un-mirror a selfie or to correct reversed text.',
      'The tool saves a JPG, so transparent areas of a PNG turn white.',
      'Trim the straightened picture afterwards with <a href="/crop-image">Crop Image</a>.'
    ],
    limits: ['The tool rotates by 90 degrees left, 90 degrees right or 180 degrees only.', 'The tool re-saves the image as a high-quality JPG, so you lose a tiny amount of detail.', 'The tool fills transparency with white.'],
    faq: [
      ['Can I flip without rotating?', 'Choose a flip direction and rotate by 180 or 90 degrees as needed. Combining them covers every orientation.'],
      ['Does the tool lose quality?', 'The tool re-saves the file as a high-quality JPG, so you lose a small amount of detail.'],
      ['Can I rotate by any angle?', 'Not yet. You can rotate by 90 degrees left, 90 degrees right or 180 degrees.'],
      ['Which formats can I use?', 'You can use JPG, PNG, WebP, GIF and BMP images.']
    ],
    next: [['crop-image', 'Trim the straightened picture.'], ['resize-image', 'Set the final size.'], ['photo-filter', 'Add a look to the finished photo.']],
    io: ['JPG, PNG, WebP, GIF, BMP', 'JPG']
  },
  'grayscale-image': {
    title: 'Convert Image to Grayscale Online',
    meta: 'Turn colour photos into black and white in your browser. Free and private, with no sign-up and no watermark.',
    answer: 'Grayscale Image converts a colour picture to black and white with standard luminance weights. It runs in your browser, so your photo stays on your device, and it saves the result as a JPG.',
    steps: ['Add a colour image.', 'Click Grayscale Image.', 'Download the black and white image.'],
    use: ['You want a classic black-and-white photo look.', 'You plan to print a photo without colour ink.', 'You want to remove colour distractions from a product photo.'],
    tips: [
      'Use black and white to print a photo without colour ink, or for a classic look.',
      'Keep your colour original. You cannot turn the grey version back into colour.',
      'Photos without colour often make smaller files, so follow up with <a href="/compress-image">Compress Image</a> when size matters.',
      'For a warmer old-photo effect, try the Sepia filter in <a href="/photo-filters">Photo Filters</a>.'
    ],
    limits: ['The tool cannot restore the colours.', 'The tool saves the result as a JPG file.', 'The tool uses fixed luminance weights, with no manual contrast control.'],
    faq: [
      ['How does the tool calculate the grey level?', 'Each pixel uses the common luminance formula (29.9 percent red, 58.7 percent green and 11.4 percent blue), which matches how the eye sees brightness.'],
      ['Can I get the colours back?', 'No. Keep your original image if you may need the colour version.'],
      ['Which format does the tool save?', 'It saves a high-quality JPG.'],
      ['Can I adjust the contrast?', 'Not yet. The tool uses fixed luminance weights.']
    ],
    next: [['photo-filter', 'Try Sepia or Fade for a vintage look.'], ['compress-image', 'Shrink the black and white photo.'], ['crop-image', 'Crop the photo before you convert it.']],
    io: ['JPG, PNG, WebP, GIF, BMP', 'JPG']
  },
  'watermark-image': {
    title: 'Add Watermark to Image Online, Free',
    meta: 'Add a text watermark to your photos in your browser. Choose your own text and opacity. Free and private, with no sign-up.',
    answer: 'Watermark Image writes your own text diagonally across a picture, with adjustable opacity. It runs in your browser, so your photo stays on your device, and the tool saves the result as a JPG.',
    steps: ['Add an image.', 'Type your watermark text and choose the opacity.', 'Click Watermark Image, then download the result.'],
    use: ['You post photos online and want your name on them.', 'You share a draft design and want it clearly marked.', 'You want to discourage casual reuse of your pictures.'],
    tips: [
      'Choose a low opacity so the photo stays the star and the watermark stays readable.',
      'Use your name or website, and keep the text short so it does not crowd the picture.',
      'Resize the image to its final size first, then add the watermark.',
      'A text watermark across the middle discourages casual reuse, but it does not stop determined copying.'
    ],
    limits: ['The tool adds text watermarks only. It cannot add a logo.', 'The tool centres the text across the image at a slight angle.', 'The tool saves the result as a JPG file.'],
    faq: [
      ['Can I use my own text?', 'Yes. Type any text, such as your name or website, and choose how visible it is.'],
      ['Where does the watermark sit?', 'The tool centres it across the image at a slight angle.'],
      ['Can I add a logo?', 'Not yet. This tool adds text watermarks only.'],
      ['Does the watermark change my original?', 'No. The tool saves a new file and leaves your original untouched.']
    ],
    next: [['resize-image', 'Set the final size before you stamp.'], ['compress-image', 'Shrink the watermarked photo.'], ['photo-filter', 'Add a look to the photo.']],
    io: ['JPG, PNG, WebP, GIF, BMP', 'JPG']
  },
  'upscale-image': {
    title: 'Upscale Image Online, Enlarge 2x 3x 4x',
    meta: 'Enlarge images 2x, 3x or 4x with smooth resampling and sharpening, in your browser. Free and private. This is not an AI upscaler.',
    answer: 'Upscale Image makes a picture 2, 3 or 4 times larger with smooth resampling and optional sharpening. It enlarges cleanly, but it does not invent new detail the way AI upscalers do.',
    steps: ['Add an image.', 'Choose the scale, the sharpening level and the output format.', 'Click Upscale image, then download the larger version.'],
    use: ['A logo or photo looks too small for a banner or print.', 'You want a larger copy of a small image for a document.', 'You need a cleaner enlargement than simple stretching.'],
    tips: [
      'Start with clean images. A blurry or heavily compressed picture becomes a larger blurry picture.',
      'Try 2x first. Bigger factors magnify every flaw, and the tool refuses results beyond about 9,000 pixels or 64 megapixels.',
      'Choose PNG as the output to avoid another round of JPG loss, then compress the final file if you need it smaller.',
      'To make a large image smaller, use <a href="/resize-image">Resize Image</a>.'
    ],
    limits: ['The tool does not add missing detail, because it is not an AI upscaler.', 'The tool refuses results above about 9,000 pixels on a side or 64 megapixels.', 'PNG keeps every detail but makes big files.'],
    faq: [
      ['Is this AI upscaling?', 'No. The tool uses high-quality resampling and sharpening. The results look cleaner than simple stretching, but they do not add missing detail.'],
      ['What is the maximum size?', 'The tool refuses results larger than about 9,000 pixels on a side or 64 megapixels, to protect your device.'],
      ['Which output format is best?', 'PNG keeps every detail but makes big files. JPG and WebP make smaller files.'],
      ['Which scale should I choose?', 'Try 2x first. Higher scales enlarge every flaw in the picture.']
    ],
    next: [['resize-image', 'Set an exact size instead of a scale.'], ['compress-image', 'Shrink the enlarged file.'], ['image-to-png', 'Keep a lossless copy.']],
    io: ['JPG, PNG, WebP, GIF, BMP', 'PNG, JPG, WebP']
  },
  'heic-to-jpg': {
    title: 'HEIC to JPG Converter, No Upload',
    meta: 'Convert HEIC photos from your iPhone to JPG in your browser. Free, with no upload, no sign-up and no watermark. Convert many photos at once.',
    answer: 'HEIC to JPG converts iPhone and iPad photos to JPG, the format that opens on every phone, computer and website. The tool runs in your browser, so your photos never leave your device. Add one photo or many, then download the JPG files.',
    steps: ['Drop your HEIC photos in, or click to choose them. You can add many at once.', 'Pick a quality: High, Balanced or Smaller file.', 'Click Convert to JPG, then download each photo or click Download all.'],
    use: ['A Windows PC, a website or a form will not open your iPhone photos.', 'You want to email or upload photos that every device can show.', 'A print shop or a school portal asks for JPG files.'],
    tips: [
      'Keep High quality for photos you plan to print or edit. Choose Smaller file for email.',
      'The tool keeps the full pixel size of each photo. To meet a size limit, shrink the JPG afterwards with <a href="/compress-image">Compress Image</a>.',
      'To stop saving HEIC in future, open Settings, then Camera, then Formats, and choose Most Compatible.',
      'Add many photos at once, then click Download all to save every JPG in one ZIP file.'
    ],
    limits: ['The tool converts the main image in each file and ignores extra images stored inside it.', 'The JPG carries no metadata, such as location, and no colour profile.', 'The tool fills transparent areas with white.'],
    faq: [
      ['How do I open HEIC photos on Windows?', 'Convert the file to JPG with this tool, and it then opens in any app. Windows can also open HEIC after you install the HEIF Image Extensions from Microsoft, but many apps still reject the file.'],
      ['Is the conversion free and private?', 'Yes. The tool is free, needs no sign-up and adds no watermark. It runs in your browser, so your photos are never uploaded.'],
      ['Will the JPG lose quality?', 'JPG is a lossy format, so the file keeps slightly less detail than the original. At High quality the difference is hard to see. The JPG is often larger than the HEIC, because HEIC compresses better.'],
      ['Can I convert many HEIC files at once?', 'Yes. Add as many photos as you like, then click Download all to get one ZIP file.']
    ],
    next: [['compress-image', 'Shrink the JPG to meet a size limit.'], ['jpg-to-pdf', 'Put your photos into one PDF.'], ['image-to-png', 'Keep a lossless copy instead.']],
    io: ['HEIC, HEIF', 'JPG']
  },
  'image-to-text': {
    title: 'Image to Text (OCR) Online, Free',
    meta: 'Extract text from images and screenshots with OCR in your browser. English, Urdu, Hindi, Arabic and more. Free, with no upload and no sign-up.',
    answer: 'Image to Text uses optical character recognition (OCR) to read the text in a photo or screenshot and return it as editable text. It runs in your browser, so the picture stays on your device.',
    steps: ['Add an image or screenshot that contains text.', 'Choose the language of the text.', 'Click Extract text, then copy the result or download the .txt file.'],
    use: ['You want to copy text from a screenshot.', 'You need the words from a photo of a sign or page.', 'You want to digitise a printed page quickly.'],
    tips: [
      'Choose the language of the text before you extract. A different language produces garbled output.',
      'Crop the picture down to the text with <a href="/crop-image">Crop Image</a>. Less clutter reads better.',
      'The first run for a language downloads its recognition data, so it takes longer. Later runs finish faster.',
      'Check names and numbers by eye. OCR can confuse look-alike characters such as 0 and O or 1 and l.'
    ],
    limits: ['The tool reads English, Urdu, Hindi, Arabic, Spanish, French and German.', 'The tool reads one image at a time. For a whole scanned PDF, use OCR PDF.', 'Blurry pictures and handwriting read poorly.'],
    faq: [
      ['Which languages does the tool support?', 'It supports English, Urdu, Hindi, Arabic, Spanish, French and German.'],
      ['Why does the first run take longer?', 'Your browser downloads the recognition data for the language the first time. After that, the tool runs faster.'],
      ['How can I get better results?', 'Use a sharp, high-resolution picture with dark text on a plain background and straight lines of text.'],
      ['Can it read a whole PDF?', 'Not here. Use OCR PDF to read a scanned PDF and keep the pages as they look.']
    ],
    next: [['ocr-pdf', 'Read a whole scanned PDF instead.'], ['crop-image', 'Crop the picture down to the text first.'], ['word-counter', 'Count the words you extracted.']],
    io: ['JPG, PNG, WebP, GIF, BMP', 'TXT']
  },
  'photo-filter': {
    title: 'Photo Filters Online, Free',
    meta: 'Apply filters such as Vivid, Warm, Cool, Sepia, Fade and Black and white to your photos in your browser. Free and private.',
    answer: 'Photo Filters applies a one-click look to your picture, such as Vivid, Warm, Cool, Sepia, Fade or Black and white. It runs in your browser and saves the result as a JPG.',
    steps: ['Add a photo.', 'Choose a filter.', 'Click Apply filter, then download the result.'],
    use: ['A flat photo needs more punch.', 'You want a warm or cool mood across a set of photos.', 'You want a vintage or black-and-white look.'],
    tips: [
      'Apply the filter last. Resize, crop and fix the orientation first, because each JPG save loses a little detail.',
      'Use Vivid to lift dull photos, Warm and Cool to change the mood, and Sepia or Fade for a vintage look.',
      'Each filter has a fixed strength. If one looks too strong, try Fade or another filter.',
      'If a filter does nothing, you may use an older Safari. A current Chrome, Edge or Firefox supports it.'
    ],
    limits: ['The tool offers six fixed filters and no strength slider.', 'The tool needs a browser that supports canvas filters. Older Safari versions do not.', 'The tool saves the result as a JPG file.'],
    faq: [
      ['Which filters does the tool offer?', 'It offers Vivid, Warm, Cool, Sepia, Fade and Black and white.'],
      ['Does it change my original?', 'No. Your original stays untouched, and you download a new file.'],
      ['Can I adjust the strength?', 'Not yet. Each filter has a fixed strength.'],
      ['Why does nothing happen in my browser?', 'Older Safari versions do not support the canvas filters that this tool uses. Try a current Chrome, Edge or Firefox.']
    ],
    next: [['crop-image', 'Crop the photo before you filter it.'], ['compress-image', 'Shrink the finished photo.'], ['grayscale-image', 'Make a plain black and white copy.']],
    io: ['JPG, PNG, WebP, GIF, BMP', 'JPG']
  }
};
