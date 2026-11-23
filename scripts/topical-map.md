# TinyWow Now: topical map and content blueprint

This file is the plan behind the copy. The rules here are not decoration: `node scripts/lint.js` checks most of them on every build.

## 1. Central topic (source context)

**Free, private tools that do a file job inside your browser.**
Every page answers one job ("merge PDFs", "compress an image to 100 KB") and repeats the same three facts in plain words: it runs in your browser, it costs nothing, and its limits are stated.

Audience intents, in order of weight:

1. Do a quick file job now (tool pages).
2. Pick the right tool for a job (category pages).
3. Learn how to finish a bigger task (blog posts).
4. Check that the site is safe (privacy, about, FAQ answers about uploads).

## 2. Clusters (hubs and spokes)

| Cluster | Hub page | Tools | Common workflows (shown on the hub) |
|---|---|---|---|
| PDF | /pdf-tools | 16 | Scan to searchable text; send a clean PDF by email; prepare a document for signing |
| Image | /image-tools | 12 | Meet a form photo limit; speed up a website image; read text from a screenshot |
| Video | /video-tools | 13 | Share a long recording; make a GIF from a clip; turn a video into audio |
| File and data | /file-tools | 9 | Clean up API data; share a spreadsheet safely; send many files at once |
| Text | /text-tools | 3 | Check an article before you publish; prepare a name for code or a URL; flip a list |

Hub pages link to every tool in the cluster. Each tool links back to its hub through the breadcrumb.

## 3. Page blueprint (symmetry)

Every tool page has the same blocks, in the same order, with the same counts. The lint script rejects a tool that breaks the pattern.

| Block | Count | Length rule |
|---|---|---|
| Direct answer (under the H1) | 1 | 28 to 55 words, answer first, names the entity and its main limit |
| How to use | 3 steps | 22 words or fewer each |
| When to use | 3 items | 6 to 18 words each, each one a real situation |
| Tips | 4 items | 8 to 42 words each, may link to related tools or guides |
| Limits | 3 items | 6 to 26 words each, concrete and true |
| What to do next | 3 links | name of the next tool plus one reason |
| FAQ | 4 questions plus 1 privacy question | answers of 4 to 60 words, first sentence answers directly |
| At a glance | input, output, price, privacy, date | generated |
| Related tools | up to 6 | generated from the same cluster |

Category pages: direct answer, a table that maps six tasks to tools, the full tool grid, three workflows (chains of tools with the reason for the order), and four FAQ questions of the same four types in every cluster (free? uploaded? which formats or limits? one cluster-specific question).

## 4. Internal linking rules

- Tool to hub: breadcrumb.
- Tool to tool: three "what to do next" links per tool, chosen by workflow order (for example Merge PDF, then Compress PDF), not by alphabet.
- Tool to guide: a tip links to the matching blog post when one exists.
- Guide to tool: every post links to its tools in the body and in the "Try it free" cards.
- Link text names the destination ("Split PDF"), never "click here".
- A tool never links to itself.

## 5. Writing rules (checked by the lint script)

- Active voice. The tool is the subject: "The tool refuses files over about 700 MB", not "Files over about 700 MB are refused".
- One idea per sentence. Aim for 9 to 15 words, never more than 30.
- British spelling everywhere (colour, optimise, recognise, centre).
- No filler words (very, really, just, simply, easily).
- No dash characters in sentences. Use a full stop, comma or colon.
- Every sentence ends with a full stop, question mark or colon.
- Claim only what the tool does. State a limit when one exists.

## 6. Symmetry report (copy words per tool page, excluding generated blocks)

Run `node scripts/lint.js --report` for the current numbers. At the time of writing:

| Cluster | Pages | Min | Average | Max |
|---|---|---|---|---|
| PDF | 16 | 267 | 317 | 385 |
| Image | 12 | 248 | 286 | 422 |
| Video | 13 | 217 | 264 | 319 |
| File | 9 | 244 | 265 | 280 |
| Text | 3 | 265 | 281 | 301 |

The spread inside a cluster is the real measure of symmetry. Video has the lowest floor, so it is the first cluster to deepen.

## 7. Known gaps and the plan for outer content

Outer content (guides, comparisons, problem pages) exists for two clusters only. **These topics are candidates. They are not keyword-researched yet.** Research each one before writing it, as we did for the two posts that exist.

| Cluster | Published guide | Candidate guides |
|---|---|---|
| Image | How to compress an image to 100 KB, 50 KB or 20 KB | JPG vs PNG vs WebP (crowded, so lower priority); how to resize a photo for a form |
| PDF | How to merge PDF files without uploading them | How to make a scanned PDF searchable; how to send a large PDF by email |
| Video | none | How to compress a video for WhatsApp or email; how to make a GIF from a video |
| File and data | none | How to open a ZIP file online; how to convert CSV to JSON |
| Text | none | How to check the word count of an article |

Known limits of this plan:

- There is no search volume data. Priorities rest on live results and on the difference this site can show (browser-only processing), not on volumes.
- Ranking results come only from Search Console after indexing. Nothing here predicts rankings.
- Tool pages follow one blueprint on purpose, which makes them look alike. The tips, limits and FAQ answers must stay specific to each tool, or the pages become thin duplicates.
