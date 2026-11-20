# TinyWow Now

Free online tools (PDF, Image, Video, File, Text). Static site, no login.
Every tool runs in the visitor's browser, so files are never uploaded.

## How the site is built
Pages are **generated static HTML** (one real URL per tool, category and info page) so search engines and AI crawlers
can read everything without running JavaScript. The generated files are committed, so Vercel just serves them.

    node scripts/build.js      # regenerates every page, sitemap.xml, robots.txt, llms.txt, llms-full.txt

Edit the sources, run the build, then commit **both** the sources and the generated files:

| File | What it is |
|---|---|
| `site.config.json` | Site name, **public URL** (used for canonical links, sitemap, schema) and contact email |
| `site-data.js` | Tool catalogue (id, name, description, URL slug) and icons - shared by the build and the browser |
| `scripts/content.js` | All SEO copy: per-tool answer, steps and FAQ, category text, home FAQ, About/Privacy/Terms/Contact |
| `scripts/build.js` | The generator |
| `styles.css`, `app.js` | Design and behaviour (nav, search, image compressor, text and image utilities) |
| `tools.js` | PDF, video, file, converter and image-extra tools (libraries load on demand) |
| `vendor/ffmpeg/` | Self-hosted ffmpeg.wasm engine for the video tools (~30 MB, cached after first use) |
| `scripts/og.html` | Source of `og-image.png` (render with headless Chrome at 1200x630) |

### When you connect your own domain
1. Set `"url"` in `site.config.json` to the final address (for example `https://yourdomain.com`).
2. Run `node scripts/build.js` and push. Canonicals, sitemap, schema and llms.txt now use the new domain.
3. Submit `https://yourdomain.com/sitemap.xml` in Google Search Console and Bing Webmaster Tools.

### Adding a tool
Add it to `TOOLS` in `site-data.js`, add its copy to `scripts/content.js`, implement it in `tools.js`
(`TOOLS['id']`) or `app.js`, then rebuild.

## Run locally

    python -m http.server 8000   # then open http://localhost:8000

## Deploy
Connected to Vercel through GitHub: every push to `main` deploys automatically (`vercel.json` enables clean URLs).

## Working tools (52)
- **PDF (15):** merge, split, rotate, watermark, sign, compress, JPG to PDF, PDF to JPG/PNG/text/Word/Excel/PowerPoint, Word to PDF, Excel to PDF
- **Image (12):** compress, resize, convert (JPG/PNG/WebP), crop, rotate/flip, grayscale, watermark, filters, upscale, image to text (OCR)
- **Video (13):** compress, trim, convert, merge, extract audio, mute, video to GIF, GIF to video, rotate, flip, resize, speed, add subtitles
- **File (9):** ZIP create/extract, XLS converter, JSON/XML formatters, CSV to JSON, Base64, URL encode, hash generator
- **Text (3):** word counter, case converter, text reverser

## Known limits
- PDF compress rasterises pages (text is no longer selectable); best for scans.
- PDF to Word/Excel are text-based approximations; Word/Excel to PDF are text/table only.
- Video runs in the browser: files over ~700 MB are refused. Subtitles are added as a soft track, not burned in.
- Not built (and not listed): lock/unlock/edit PDF, OCR PDF, PPT to PDF, AI writing tools.
