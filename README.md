# TinyWow Now

Free online tools (PDF, Image, File, Text). Static site, no build step, no login.
Every tool runs in the visitor's browser, so files are never uploaded.

## Run
Double-click `index.html`, or serve the folder:

    python -m http.server 8000   # then open http://localhost:8000

## Deploy
Connected to Vercel through GitHub: every push to `main` deploys automatically.

## Files
- `index.html` - site shell, home page, image compressor, text and image tools
- `tools.js` - PDF, file, converter and image-extra tools (libraries load on demand from CDNs)
- `logo.svg`, `logo-animated.svg` - logo mark

## Working tools (39)
- **PDF:** merge, split, rotate, watermark, sign, compress, JPG to PDF, PDF to JPG/PNG/text/Word/Excel/PowerPoint, Word to PDF, Excel to PDF
- **Image:** compress, resize, convert (JPG/PNG/WebP), crop, rotate/flip, grayscale, watermark, filters, upscale, image to text (OCR)
- **File:** ZIP create/extract, XLS converter, JSON/XML formatters, CSV to JSON, Base64, URL encode, hash generator
- **Text:** word counter, case converter, text reverser

## Known limits
- PDF compress rasterises pages (text is no longer selectable); best for scans.
- PDF to Word/Excel are text-based approximations; Word/Excel to PDF are text/table only.
- Hidden until built: video tools, AI writing tools, remove background, lock/unlock/edit PDF, OCR PDF, PPT to PDF.
  Add a tool by registering it in `tools.js` (`TOOLS['id']`); it appears on the site automatically.
