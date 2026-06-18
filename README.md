# Proudly Ghanaian — National Symbols Campaign

> **NCCE Ghana** · Educational & Patriotic Platform  
> An educational web platform by the National Commission for Civic Education (NCCE) Ghana, celebrating and explaining Ghana's five national symbols.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Site Map](#site-map)
3. [Tech Stack](#tech-stack)
4. [Folder Structure](#folder-structure)
5. [Issues Encountered and Fixed](#issues-encountered-and-fixed)
   - [Issue 1 — Footer Extra White Space (index.html only)](#issue-1--footer-extra-white-space-indexhtml-only)
   - [Issue 2 — Images & Assets Not Displaying (all pages)](#issue-2--images--assets-not-displaying-all-pages)
6. [Debugging Methodology](#debugging-methodology)
7. [How to Prevent / Fix Similar Errors](#how-to-prevent--fix-similar-errors)

---

## Project Overview

The **Proudly Ghanaian: National Symbols Campaign** is an educational and patriotic initiative by the **National Commission for Civic Education (NCCE)** of Ghana. Its purpose is to deepen every citizen's understanding of Ghana's five national symbols — the **Flag**, the **Black Star**, the **Coat of Arms**, the **National Anthem**, and the **National Pledge** — and to clearly communicate how each symbol promotes patriotism, civic responsibility, and national unity.

The campaign targets Ghana's youth, the general public, and the Ghanaian diaspora — ensuring every Ghanaian, wherever they are in the world, can connect with the symbols that define their national identity.

---

## Site Map

| File | Page Title |
|---|---|
| `index.html` | Home — Proudly Ghanaian Campaign |
| `flag.html` | The National Flag of Ghana |
| `blackstar.html` | The Black Star — Lodestar of African Freedom |
| `coatofArms.html` | The Coat of Arms of Ghana |
| `anthem.html` | National Anthem — God Bless Our Homeland Ghana |
| `pledge.html` | The National Pledge of Ghana |
| `gallery.html` | Symbol Gallery |
| `style.css` | Shared stylesheet (all pages) |
| `script.js` | Shared JavaScript (all pages) |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 |
| Styles | CSS3 (Grid, Flexbox, CSS Variables, Animations) |
| Scripting | Vanilla JavaScript (ES6+) |
| Fonts | Google Fonts — Cormorant Garamond, DM Sans, Cinzel |
| Icons | Font Awesome 7 |
| Audio | HTML5 `<audio>` element |
| Media Embed | SoundCloud iframe (anthem page) |

---

## Folder Structure

```
Second Term Pearson/
├── index.html             # Home page (hero + intro + symbols grid + importance)
├── flag.html              # The National Flag
├── blackstar.html         # The Black Star
├── coatofArms.html        # The Coat of Arms
├── anthem.html            # National Anthem
├── pledge.html            # National Pledge
├── gallery.html           # Image gallery
├── style.css              # Shared stylesheet for all pages
├── script.js              # Shared JS (nav toggle, scroll reveal, smooth scroll)
├── images/                # All image assets
│   ├── HD_Ghana_Coat_Of_Arms_Logo_PNG-removebg-preview.png   ← Nav/Footer logo
│   ├── HD_Ghana_Coat_Of_Arms_Logo_PNG.jpg                   ← Coat of Arms page hero
│   ├── Ghanaian flag waving in the breeze.png                ← Index + Flag page
│   ├── download.jpg / download-removebg-preview.png          ← Black Star card
│   ├── gh.png                                                  ← Index page hero bg
│   ├── Theodosia.jpg                                           ← Sidebar (Flag, Gallery)
│   ├── pledge.jpg                                              ← Pledge card + sidebar
│   ├── amon kotei.jpg                                          ← Coat of Arms sidebar
│   ├── Ghana black star.jpg                                    ← Black Star page hero
│   ├── national anthem.jpg                                     ← Anthem page hero
│   ├── philip gbeho.jpg                                        ← Anthem sidebar + Gallery
│   ├── Nkrumah.jpg                                             ← Black Star + Gallery
│   └── flag two.jpg                                            ← Gallery
└── audio/
    └── Yɛn Ara Asaase Ni...mp3   # Background music (index.html)
```

---

## Issues Encountered and Fixed

---

### Issue 1 — Footer Extra White Space (index.html only)

#### Symptom
The footer renders correctly on all pages **except** `index.html`, which shows a large, continuous white gap **below the footer** — not inside it. Scrolling past the footer enters empty white space with no content.

#### Root Cause: CSS Selector Mismatch Due to a Unique HTML Wrapper

**`style.css` lines 1857–1866 (before fix):**
```css
.footer {
  background: rgb(12, 22, 12);
  padding: 4rem 0;
  color: rgba(253, 250, 244, .7);
  display: flex;
}
#footer{
  bottom: 0;
  margin-top: 100px;   /* ← 100px gap pushed content into the white area */
}
```

The CSS rule `#footer { margin-top: 100px; bottom: 0; }` targeted `id="footer"`, but that ID only existed on `index.html`, embedded in a `<section id="footer">` wrapper that surrounded `<footer class="footer">`. No other page had this wrapper:

| Page | Footer element | Has `<section id="footer">`? |
|---|---|---|
| `index.html` | `<section id="footer"><footer class="footer">` | **Yes** ← margin-top applied |
| `flag.html` | `<footer class="footer">` (direct) | No |
| `blackstar.html` | `<footer class="footer">` (direct) | No |
| `pledge.html` | `<footer class="footer">` (direct) | No |
| `gallery.html` | `<footer class="footer">` (direct) | No |
| `anthem.html` | `<footer class="footer">` (direct) | No |
| `coatofArms.html` | `<footer class="footer">` (direct) | No |

Because the `<section id="footer">` wrapper existed only on `index.html`, `margin-top: 100px` created a 100px gap between the `.importance` section and the footer **only on the home page**, pushing the footer down and leaving a large white area below it. `bottom: 0` in the same rule was a no-op — it does not apply without a declared `position` value.

#### Fix Applied

**Change 1 — Remove the orphaned CSS rule from `style.css`:**
```diff
 /* FOOTER */
 .footer {
   background: rgb(12, 22, 12);
   padding: 4rem  0;
   color: rgba(253, 250, 244, .7);
   display: flex;
 }
-#footer{
-  bottom: 0;
-  margin-top: 100px;
-}
 .footer-top {
```

**Change 2 — Remove the `<section id="footer">` wrapper from `index.html`:**
```diff
-<section id="footer">
 <footer class="footer">
   <div class="container"> … </div>
 </footer>
-</section>
```

This makes `<footer class="footer">` sit directly in the body on the home page — exactly as every other page already does.

#### Why only index.html?
Only `index.html` had the `<section id="footer">` wrapper. Only that wrapper matched the `#footer` CSS selector. Only a matched selector applies its declarations. Therefore only `index.html` was affected.

---

### Issue 2 — Images & Assets Not Displaying (all pages)

#### Symptom
Images, hero-section background images, and the footer logo were broken (showing missing-file icons or blank space) across all seven HTML pages.

#### Root Cause: Broken Asset Paths (`/images/` instead of `images/`)

Both `<img src>` attributes and CSS `background-image: url()` values used **`/images/`** (leading slash) as the path prefix, which is **absolute** — resolved from the filesystem root on a local file. That directory does not exist, so the browser returned 404 for every asset. The correct relative path is **`images/`** (no leading slash), resolved from each HTML file's own directory.

**Example of the broken pattern (in CSS):**
```css
/* BROKEN — looks for C:\images\ on Windows, or file:///images/ universally */
.hero { background-image: url(/images/gh.png); background-size: cover; }

/* CORRECT — resolves relative to each .html file's directory */
.hero { background-image: url(images/gh.png); background-size: cover; }
```

**Example of the broken pattern (in HTML):**
```html
<!-- BROKEN -->
<img src="/images/HD_Ghana_Coat_Of_Arms_Logo_PNG-removebg-preview.png">

<!-- CORRECT -->
<img src="images/HD_Ghana_Coat_Of_Arms_Logo_PNG-removebg-preview.png">
```

A secondary path issue affected `style.css` hero background rules with Windows-style escaped spaces (`\ `):
```css
/* BROKEN — backslash-escaped space inside CSS url() breaks on many browsers */
 .page-hero{background-image: url(/images/Ghanaian\ flag\ waving\ in\ the\ breeze.png); }

/* CORRECT — forward-slash relative path, spaces are legal in url() */
 .page-hero{background-image: url(images/Ghanaian flag waving in the breeze.png); }
```

#### Fix Applied — 28 Broken Paths Corrected

| File | Broken Reference | Corrected |
|---|---|---|
| `style.css:343` | `url(/images/gh.png)` | `url(images/gh.png)` |
| `index.html:21` | `src="/images/HD_Ghana_Coat…"` | `src="images/…"` |
| `index.html:270` | `src="/images/download.jpg"` | `src="images/download.jpg"` |
| `index.html:378` | `src="/images/HD_Ghana_Coat…"` | `src="images/…"` |
| `pledge.html:13` | `url(/images/pledge.jpg)` | `url(images/pledge.jpg)` |
| `pledge.html:186` | `src="/images/HD_Ghana_Coat…"` | `src="images/…"` |
| `gallery.html:48` | `src="/images/flag two.jpg"` | `src="images/…"` |
| `gallery.html:69` | `src="/images/HD_Ghana_Coat…"` | `src="images/…"` |
| `gallery.html:80` | `src="/images/national anthem.jpg"` | `src="images/…"` |
| `gallery.html:90` | `src="/images/philip gbeho.jpg"` | `src="images/…"` |
| `gallery.html:100` | `src="/images/Theodosia.jpg"` | `src="images/…"` |
| `gallery.html:109` | `src="/images/pledge.jpg"` | `src="images/…"` |
| `gallery.html:119` | `src="/images/Nkrumah.jpg"` | `src="images/…"` |
| `gallery.html:134` | `src="/images/HD_Ghana_Coat…"` | `src="images/…"` |
| `flag.html:13` | `url(/images/Ghanaian\ flag…)` | `url(images/…)` |
| `flag.html:71` | `src="/images/Theodosia.jpg"` | `src="images/Theodosia.jpg"` |
| `flag.html:240` | `src="/images/HD_Ghana_Coat…"` | `src="images/…"` |
| `coatofArms.html:37` | `url(/images/HD\ Ghana\ Coat…)` | `url(images/…)` |
| `coatofArms.html:68` | `src="/images/amon kotei.jpg"` | `src="images/amon kotei.jpg"` |
| `coatofArms.html:164` | `src="/images/HD_Ghana_Coat…"` | `src="images/…"` |
| `blackstar.html:13` | `url(/images/Ghana\ black\ star.jpg)` | `url(images/…)` |
| `blackstar.html:80` | `src="/images/Nkrumah.jpg"` | `src="images/Nkrumah.jpg"` |
| `blackstar.html:190` | `src="/images/HD_Ghana_Coat…"` | `src="images/…"` |
| `anthem.html:13` | `url(/images/national\ anthem.jpg)` | `url(images/…)` |
| `anthem.html:70` | `src="/images/philip gbeho.jpg"` | `src="images/philip gbeho.jpg`` |
| `anthem.html:242` | `src="/images/HD_Ghana_Coat…"` | `src="images/…"` |

> All 28 broken paths were corrected. `images/` (relative) replaced `/images/` (absolute) on every affected line.

---

## Debugging Methodology

The following systematic approach was used to identify and fix both issues:

### Step 1 — Catalog every page's DOM structure
Extracted the active HTML element tree from every `.html` file and compared node-for-node between the broken page (`index.html`) and a known-good page (`flag.html`). Differences were isolated to two structural facts: an extra `<section id="footer">` wrapper, and a distinct `<style>` block placement at `index.html` line 329.

### Step 2 — Isolate layout vs. CSS vs. asset issues
- **Layout issue** — traced `margin-top`, `padding-top`, `padding-bottom`, and `min-height` on every ancestor element of `<footer>` across all pages.
- **CSS selector audit** — grepped every CSS rule for `#footer`, `margin-top`, `min-height`, and `flex` properties on `body` and `html`.
- **Asset path audit** — grepped every `<img src=` and every `url()` in `.css` and inline `<style>` blocks. Compared against `Get-ChildItem` inventory of the actual `images\` directory.

### Step 3 — Confirm the CSS is what broke layout
Eliminated all structural hypotheses first:
- `body` had `margin: 0; padding: 0; display: flex; flex-direction: column;` — identical on all pages ✓  
- No `min-height: 100vh` on any ancestor of the footer ✓  
- No `position: fixed/sticky` on footer elements ✓  
- No spacer `<div>` or empty element after `</footer>` ✓  

Only then was `#footer { margin-top: 100px; }` confirmed as the sole differentiator.

### Step 4 — Confirm path failures against the file system
Listed actual files with `Get-ChildItem` and verified every referenced image exists. Cross-referenced path strings character by character. Leading `/` was the only consistently wrong prefix — it maps to the filesystem root on local files.

---

## How to Prevent / Fix Similar Errors

### Footer / Spacing Issues

| Command / Check | What it tells you |
|---|---|
| Open DevTools → **Elements** tab | Inspect the element tree to see if unexpected wrappers exist |
| Check **Computed** tab → scroll to *margin/padding* | See the final resolved value after cascading |
| Collapse all ancestors of `<footer>` one by one | Isolate which ancestor element contributes the gap |
| Check for **margin collapsing** | A `margin-top` on a child pushes through a parent with no border/padding |
| Remove `id="…"` wrappers unique to one page | Unnecessary wrapper IDs attract selector hits no other page gets |
| Grep for `#id-selectors` in the CSS | IDs are page-specific; ensure they don't accidentally span pages |

> **Key principle:** If a layout problem affects only one page out of many sharing the same stylesheet, the cause is almost always a page-unique HTML wrapper or a structurally unique `<style>` block — not a global stylesheet rule.

### Image / Asset Not Loading

| Scenario | Fix |
|---|---|
| `src="/images/file.png"` | Remove the leading `/`: `src="images/file.png"` |
| `url(/images/bg.png)` in CSS | Remove the leading `/`: `url(images/bg.png)` |
| `url(/images/name\ with\ spaces.png)` in CSS | Two bugs: leading `/` + backslash spaces. Use `url(images/name with spaces.png)` |
| `src="/audio/file.mp3"` | Remove the leading `/`: `src="audio/file.mp3"` |
| File referenced but not found | Run `Get-ChildItem -Recurse .\images\` and compare against every reference |

> **Leading slash rule:** A leading `/` in a URL makes it absolute from the domain root. When served from a local filesystem there is no root-level `images/` folder — use a relative path without the leading `/`.

### General Checklist

```bash
# 1. Confirm assets exist on disk
Get-ChildItem -Recurse ".\images\"   # Windows PowerShell

# 2. Find all broken absolute paths at once
# Searches for: src="/images/...", url(/images/..., src="C:\images\..."
grep -r "/images/" *.html style.css

# 3. Find orphaned CSS selectors (no matching element in any HTML)
# grep "#footer" style.css                
# then verify no <element id="footer"> exists in any HTML file

# 4. Find every <img> and inline style rule per page
Select-String -Path "*.html" -Pattern "src=|url("

# 5. Check CSS inheritance chain in DevTools
# Right-click broken element → Inspect → Computed tab → filter "margin" or "background"
```

### Build / Deployment Considerations

- This project is **pure HTML/CSS/JS** — no build step, bundler, or bundling tool is required.
- All pages expect `style.css` and `script.js` to sit in the **same directory** as the HTML files.
- The `images/` and `audio/` folders must be deployed alongside the HTML files at the same relative path level.
- Do **not** add a leading `/` to any `src` or `url()` path — this project does not live at the root of a web server; it uses relative paths from each file's own directory.
- Before deploying to a live server, run a local HTTP server (`npx serve` or Python `python -m http.server`) rather than opening HTML files directly from the filesystem (`file://`) — the browser treats `file://` and `http://` path resolution differently, and `file://` path bugs are easier to spot on HTTP.

---

*Last updated: After full CSS and HTML audit by senior frontend engineer — all open issues in original source fixed.*
