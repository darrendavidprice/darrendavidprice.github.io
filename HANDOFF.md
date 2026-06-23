# Darren Price Site — Project Handoff

This document captures everything a new chat in this project needs to continue
iterating on the website smoothly. Attach it to project knowledge.

---

## 1. Project at a glance

> **Internal version: v3.3.0** (2026-06). Bumped per shipped batch — see README header for version history. Use this to cross-check chats and zip files.

**Goal.** A personal academic website for **Prof. Darren Price** (Professor of
Particle Physics & Data Intensive Science, University of Manchester; leads
Manchester DarkSide group and ATLAS B-physics/electroweak work; Turing
Fellow). Deployed as a **GitHub Pages user site** at `darrendavidprice.github.io`.

**Stack.** Jekyll + YAML data files + GitHub Pages native build. No build
pipeline beyond what GitHub Pages provides. Local preview uses the
`github-pages` gem (which requires **Ruby 3.1.x** — newer Ruby breaks Liquid
4.0.3 via `tainted?`).

**Visual identity.** A bespoke editorial light theme called **"Manuscript"** —
warm paper background, oxblood ink accent, monospace metadata labels.
Modelled tonally on the sibling Dark Matter Manchester site
(<https://darkmatter-manchester.github.io/>) but with its own palette.

---

## 2. Current state

- **Canonical build** lives at `/home/claude/build/` in the project
  filesystem. **This does not reliably persist across chats.** If missing,
  restore from `darrendavidprice-site-full.zip` (see §7 and §9) — this zip
  is fully up to date and requires no post-extraction fixes.

- **All previously-tracked site fixes are complete.** Full history of shipped
  updates from earlier sessions:
  1. Publications restructured into 4 CV-style sections; talks re-parsed
     from `Presentations.html` with all links restored; news/achievements
     gained optional explainer + external-link fields; first /join rework.
  2. /join section re-aligned faithfully with the live DM Manchester /join
     pages (postdoc · phd · phd/advice · masters) using DM's section
     structure and `EDIT ME` placeholders.
  3. Scheme entries on postdoc and PhD join pages render as card boxes.
  4. Team page fully populated: 12 current members, 51 alumni.
  5. Alumni section: responsive tiled card grid (`.alumni-grid` /
     `.alumnus-card`): 3-col ≥860px, 2-col ≥520px, 1-col mobile. No photo.
  6. Research theme pages auto-pull matching team members into a "People"
     section via a `case/when` block in `_layouts/theme.html`.
  7. Mobile hamburger nav: `<button class="nav-toggle">` in
     `_includes/header.html`; `id="site-nav"` on `<nav>`.
  8. Infrastructure pass: `.gitignore`; `jekyll-sitemap` plugin (sitemap.xml);
     `jekyll-seo-tag` removed (hand-rolled OG/Twitter tags in default.html);
     themed `404.html` at root.
  9. og-card regenerated: 1200×630px, Manuscript palette.
  10. Repo URL updated throughout to `darrendavidprice.github.io`.

- **Sensitivity explorer** — a major interactive piece at
  `/research/dark-matter/sensitivity-explorer/`. Substantial pedagogical tool;
  see §11 below for full architecture and design notes. **Latest reference set
  (this session): added CRESST-III (purple, sub-200 MeV cryogenic envelope,
  arXiv:2405.06527 + arXiv:1904.00498), PandaX-4T low-DM (indigo, 2.5–5 GeV
  S2-only, arXiv:2507.11930), and LZ light-DM 5.7 t·yr WS2025 (dashed teal,
  3–9 GeV transition, arXiv:2512.08065).** The plot now shows the complete
  leading-experiment envelope from 40 MeV to 10 TeV. Sources in Model &
  Assumptions disclaimer.

- **Recoil explorer (this session)** — companion interactive at
  `/research/dark-matter/recoil-explorer/`, "What does dark matter look like in
  a detector?". Reuses the §11 physics engine; see §12 for full notes. The two
  explorers cross-link both ways (callout cards on the DM research page, sibling
  links at the foot of each, a combined engagement-page line). **Latest: ctx-mass
  and ctx-xsec rewritten with a 7-regime mass classifier (sub-40 MeV / 40–200 MeV
  / 0.2–2.5 GeV / 2.5–5 GeV / 5–9 GeV / 9 GeV–1 TeV / >1 TeV). Sub-40 MeV
  explicitly says "no clean elastic SI direct-detection limit — constraints
  depend on non-standard assumptions" rather than "invisible/excluded". Per-
  regime σ bands; each regime cites its leading experiment in the verdict text.**

- **Sensitivity-explorer status panel (this session)** — `statusText(minPt, state)`
  rewritten with the same 7-regime classifier as the recoil explorer; replaces
  the previous binary `Mmin < 5 GeV` pivot. Each regime pivots at a representative
  mass and benchmarks against the relevant `REF_*` curve from §11's
  "World-leading SI direct-detection limit by mass band" table (which mirrors
  the classifier). The `100vh` → `100dvh` swap was also applied universally
  across both explorers (iOS Safari URL-bar fix; 8 occurrences).

- **Publication explainers spot-check pass (this session)** — all 27 primary-
  section entries with arXiv IDs refined against published abstracts (3 batches
  of 10 / 10 / 7). Length normalised to 50–110 words; concrete data (luminosities,
  cross-sections, significance values, theory comparisons) added per paper.
  One title correction (`p-atlas-ew-wjj-agc-2017` was wrongly tagged "8 TeV only";
  paper combines 7+8 TeV — now matches the published EPJC title). Two primary
  entries cannot use this workflow and remain at their original length:
  `p-menary-density-neurips-2020` (no arXiv, NeurIPS workshop) and
  `p-atlas-jinst-2008` (no arXiv, foundational ATLAS detector paper).

- **Explainer figures with left-justified image + caption (this session)** —
  `explainer_image` and `explainer_caption` were already wired in the schema,
  template (`_includes/pub-entry.html` lines 42–55) and CSS
  (`.explainer-body.has-fig` two-column grid, `assets/css/styles.css`).
  Verified end-to-end via headless render. Two worked examples now live in
  `_data/publications.yml`: `p-ds50-lowmass-wimp-2023` (PNG plot,
  `assets/images/explainers/ds50-lowmass-wimp.png`, matplotlib in theme
  palette) and `p-ssww-majorana` (SVG Feynman diagram,
  `assets/images/explainers/ssww-majorana.svg`, hand-rolled). README has a new
  "Explainer figures" subsection covering YAML usage, the parallel-grid layout
  behaviour, and a drop-in CSS-float refactor alternative if text-wrap-around
  is preferred later.

---

## 3. Architecture

### Repository structure

```
/                       <- repo root (= site root for GitHub Pages)
├── .gitignore          <- excludes _site/, .jekyll-cache/, vendor/, etc.
├── _config.yml         <- site config (title, nav, plugins, feed, posts permalink)
├── _data/              <- YAML data driving most pages
│   ├── publications.yml   - 81 entries across 4 sections
│   ├── talks.yml          - 440 talks, 2004-2023
│   ├── news.yml           - timeline (with optional explainer + link)
│   ├── team.yml           - current members + alumni
│   ├── themes.yml         - the 8 research themes
│   ├── tags.yml           - canonical tag vocabulary
│   ├── grants.yml, roles.yml, organisation.yml, supervision.yml, bios.yml
├── _layouts/           <- default · page · post · theme
├── _includes/          <- header · footer · section-nav · pub-entry · talk-entry · news-entry · tag-chips · icon-pdf · pullquote · socials
├── _posts/             <- Markdown blog posts (Writing section)
├── assets/
│   ├── css/styles.css     - all styling; theme tokens in :root
│   ├── js/                - filters.js · citations.js · misc.js
│   └── images/            - portraits, theme heroes, og-card.png, favicon.svg
├── 404.html            <- themed 404 page (sitemap: false in front matter)
├── about/ research/ team/ writing/ engagement/ consultancy/
├── media/ join/ contact/ cv/ teaching/
├── research/dark-matter/sensitivity-explorer/index.html  <- §11
├── research/dark-matter/recoil-explorer/index.html       <- §12
└── index.html          <- homepage
```

Pages live in named directories with `index.html` (pretty URLs everywhere via
`permalink: pretty`).

### Theme tokens

Open `assets/css/styles.css` and you'll find the `:root` block at the very
top — that's the single point for retheming. Current values:

| Variable | Value | Use |
|---|---|---|
| `--bg` | `#f3efe6` | Warm paper background |
| `--bg-elevated` | `#ebe5d8` | Deeper paper for cards |
| `--bg-card` | `#fffaf0` | Card highlight |
| `--text` | `#3c372f` | Body |
| `--text-bright` | `#1a1712` | Headlines |
| `--text-muted` | `#7a7468` | Meta, captions |
| `--accent` | `#8c3a2b` | Oxblood ink |
| `--accent-soft` | `rgba(140,58,43,0.35)` | Link underlines (light-theme contrast) |
| `--rule` | `rgba(26,23,18,0.16)` | Dividers / borders |
| `--font-display` | Fraunces | Headlines, eyebrows |
| `--font-body` | Newsreader | Body text |
| `--font-mono` | IBM Plex Mono | Metadata labels |

To retheme: swap these and update the Google Fonts `<link>` in
`_layouts/default.html`.

---

## 4. Data files — schema reference

### `publications.yml` — four top-level lists

```yaml
primary:    [...]   # 29 entries, significant personal contribution, WITH explainer
convener:   [...]   # 15 entries, group convener role, NO explainer
editorial:  [...]   # 11 entries, editorial-board chair / expert review
proceedings: [...]  # 26 entries, conference results & notes
```

Each entry:
```yaml
- id: short-slug
  year: 2023
  status: refereed | preprint | proceedings | note | thesis | poster
  title: "..."
  collaboration: "ATLAS Collaboration"   # OR authors: [..]
  venue: "Phys. Rev. D 107 (2023) 063001"
  arxiv: "2207.11966"
  doi: "10.1103/PhysRevD.107.063001"
  tags: [dark-matter, collider]
  explainer: "..."            # PRIMARY section only
  explainer_image: "/path"    # optional; renders left of text
  explainer_caption: "..."    # optional caption for the figure
  links:                       # all optional
    pdf:  "..."                # else defaults to https://arxiv.org/pdf/<arxiv>
    aux_figures: "..."
    data: "..."
    note: "..."
    press: [{label: "BBC News", url: "..."}, ...]
```

Rendering rule (in `pub-entry.html`): the **venue text itself is the DOI
link**; separate links for arXiv abstract, INSPIRE, PDF icon, data, press.
Tags render as inline chips.

### `talks.yml` — flat list of 440 entries

```yaml
entries:
  - id: t2023-001
    type: invited | seminar | public | internal | poster
    title: "..."
    venue: "..."
    location: "..."     # optional
    year: 2023
    iso: "2023-07"
    date: "Jul 2023"
    tags: [b-physics, collider]
    links:              # all optional
      agenda: "https://indico.cern.ch/..."   # title links here
      slides: "https://.../slides.pdf"        # PDF icon
      recording: "https://..."
```

- **Internal talks are hidden by default** on the page; "Working meetings"
  toggle reveals them.
- **No plenary/marker** anywhere.
- **No explainers** on talks (explainers are publications-only).
- The whole file was generated by parsing `Presentations.html` directly —
  not the flat `talks.txt`, which had lost the pre-2016 year headers and
  all link URLs. If you ever need to regenerate it, parse the HTML.

### `news.yml`

Each entry: `id, category, year, iso, date, title, body, tags`, plus
two **optional** fields:

```yaml
explainer: "One sentence of extra context, shown as a '+ More context' drop-down."
link: { url: "https://...", label: "BBC News" }   # OR a plain URL string
```

### `team.yml`

```yaml
current:
  - { initials: "AB", photo: "",  name: "...", role: "...", focus: "...",
      works_on: [tag, tag], email: "...", linkedin: "..." }
alumni:
  - { name: "...", role: "...", years: "2018-22",
      worked_on: [tag, tag],
      now: { label: "Postdoc at X", url: "..." } }
```

**Important:** `works_on` / `worked_on` use **free-text display labels**
(e.g. "Dark matter", "ML/AI", "B-physics"), not tag IDs. The theme
layout maps these to theme IDs via a `case/when` block — see §6.

`photo: ""` renders glowing circular placeholder with initials. Drop a
file into `assets/images/people/` and point `photo:` at it to swap to a
real portrait.

### `tags.yml` and `themes.yml`

- `tags.yml` has 12 canonical tags. The first 8 are also research themes
  (have a page at `/research/<id>/`).
- `themes.yml` defines those 8 — each with `id`, `label`, `order`, `image`,
  `blurb`. The 8th is **AI / Machine learning**.
- **Theme hero banners** (added v3.1.0) are driven by a separate
  `_data/theme_heroes.yml` so the canonical `themes.yml` stays small.
  Theme IDs absent from `theme_heroes.yml` render without a hero.

### Other data files

| File | Drives |
|---|---|
| `grants.yml` | Funding list on /cv |
| `roles.yml` | Leadership, governance & service on /cv |
| `organisation.yml` | Conference organisation list on /cv |
| `supervision.yml` | Student supervision on /teaching |
| `bios.yml` | Copy-able 50/100/250-word biographies on /about |
| `engagement.yml` | Reverse-chrono engagement entries on /engagement (added v3.0.0) |
| `theme_heroes.yml` | Hero banner + optional figure gallery per research theme (added v3.1.0). Schema: `<theme-id>: { hero: {image, alt, caption?, credit?}, figures?: [{image, alt, caption?}] }` |

---

## 5. Workflow rules (these matter)

1. **Partial-zip-only updates** by default. Every site update is delivered
   as a partial zip of only the changed/new files, with an `_UPDATE_NOTES.md`
   inside that lists what changed and any directories the user needs to
   delete first. Full zips only when the user explicitly asks for one.
2. **Wait for explicit "go".** Track fixes as a running list. Do not
   regenerate or send anything until the user explicitly says "go" /
   "remake" / "update the repo".
3. **No `Gemfile` or `.ruby-version` in delivered zips.** The user manages
   Ruby/Bundler locally.
4. **Memory entries for durable decisions only** — not for individual build
   tasks (those live in the running list within the conversation).
5. **Always use `unzip -o` from the terminal** when applying partial zips —
   macOS Archive Utility can silently drop files from subdirectories.
6. **Single files** can be delivered bare (no zip) when only one file changes.

### Local preview (for the user)

A working local `Gemfile`:

```ruby
source "https://rubygems.org"
gem "github-pages", group: :jekyll_plugins
gem "webrick", "~> 1.8"
```

Then with Ruby 3.1.6 set via `rbenv local 3.1.6`:

```sh
bundle install
bundle exec jekyll serve --livereload
```

Ruby >= 3.2 will fail with `undefined method tainted?` — Liquid 4.0.3 calls
a method removed in Ruby 3.2. Fix is Ruby 3.1.x, not bumping Liquid.

**Note on the "No repo name found" error.** Add this to your **local-only**
`_config.yml` (do not commit or include in delivered zips):

```yaml
repository: "darrendavidprice/darrendavidprice.github.io"
```

---

## 6. Active design decisions (durable)

| Area | Decision |
|---|---|
| **Theme** | Manuscript (warm paper, oxblood ink, mono metadata, Fraunces + Newsreader + IBM Plex Mono). |
| **Top nav** | 11 items: About · Research · Team · Teaching · CV · Writing · Engagement · Consultancy · Media · Join · Contact. |
| **Research themes** | 8 themes incl AI/ML. Tags compose freely; tags & themes share the first 8 IDs in `tags.yml`. |
| **Theme heroes** | Optional per-theme banner + figure gallery, driven by `_data/theme_heroes.yml`. Layout renders hero above body, figures in a 2-col grid (1-col on mobile) below body. Themes without an entry render unchanged. Currently populated: dark-matter, instrumentation, levitating-sensors (v3.1.0). |
| **Publications** | 4 CV-style sections. Journal text is DOI link; separate INSPIRE / arXiv / PDF-icon / data / press links. Explainers on PRIMARY only. |
| **Presentations** | 440 entries. Title -> agenda link; PDF icon -> slides. Internal talks hidden by default. |
| **News & achievements** | Optional explainer drop-down + optional external link ({url,label} or plain URL). |
| **Team — current** | Glowing photo-cards with initials placeholder. |
| **Team — alumni** | Tiled cards (`.alumni-grid` / `.alumnus-card`): 3-col/2-col/1-col responsive. No photo. |
| **Theme pages — People** | `_layouts/theme.html` case/when maps theme IDs to team.yml labels: dark-matter->"Dark matter","DarkSide"; electroweak->"Electroweak","Electroweak physics"; qcd->"QCD","Collider physics","Phenomenology"; b-physics->"B-physics","B-physics & quarkonium"; neutrinos->"Neutrinos"; instrumentation->"Instrumentation"; levitating-sensors->"Levitating sensors"; ai-ml->"ML/AI","AI". |
| **Mobile nav** | `.nav-toggle` button in header.html; `id="site-nav"` on nav; misc.js toggles `.is-open`. Breakpoint 860px. |
| **SEO** | Hand-rolled OG + Twitter/X tags in default.html. `jekyll-seo-tag` not used. `jekyll-sitemap` generates /sitemap.xml. |
| **Socials (`_includes/socials.html`)** | Email · INSPIRE-HEP · ORCID · Google Scholar · GitHub · LinkedIn · X · Bluesky. GitLab field present in `_config.yml` but empty (CERN GitLab is behind SSO; would render a broken link). All entries gated by `{% if site.author.<field> %}` so setting `gitlab:` re-enables it without a template change. |
| **Favicons** | favicon.ico (root), assets/images/favicon.svg, apple-touch-icon.png (root). |
| **og-card** | 1200x630, darren-price.jpg faded right, name/title/institution/taglines. Awaiting portrait confirmation. |
| **404** | 404.html at root, default layout, sitemap: false. |
| **Writing** | Jekyll _posts Markdown. One example post. |
| **Join** | Mirrors DM /join/ structure. 4 sub-pages with EDIT ME placeholders. |
| **Sensitivity explorer** | See §11 — full architecture, model calibration, reference data sources. |

---

## 7. Source materials and filesystem

| Path | What |
|---|---|
| `/home/claude/build/` | **Canonical current build.** Not guaranteed to persist — restore from zip if missing. |
| `/mnt/user-data/uploads/darrendavidprice-site-full.zip` | **Current full snapshot — the restore source.** Fully up to date; no post-extraction fixes needed. |
| `/mnt/user-data/uploads/DARKSIDE-CSN2-TDR-2112_red-7.pdf` | DS-20k TDR Figure 2 — the source for REF_DS20K data in the explorer. |
| `/mnt/user-data/uploads/DarrenPrice_CV_Jan2023.pdf` | Master content source for team/grants/roles/publications. |
| `/home/claude/old/` | Old iWeb site. Does not persist. talks.yml is complete so unlikely to be needed. |
| `/mnt/user-data/outputs/*.zip` | Previous deliverables. |

---

## 8. Open EDIT ME placeholders and known rough edges

- `_config.yml`: all `author:` fields populated (ORCID, Scholar, GitHub, X, Bluesky, email, phone, INSPIRE, LinkedIn). GitLab intentionally empty — see §6 SEO/Socials row.
- `_data/team.yml`: drop real photos into `assets/images/people/`.
- `team/index.html`: PLACEHOLDER group photo block.
- `news.yml`: a few entries have `# EDIT — confirm exact start date` notes.
- `_data/publications.yml`: press/aux-figure links not populated.
- `_data/talks.yml`: type/tag inference was semi-automatic.
- `/join/postdoc/` and `/join/phd/`: EDIT ME placeholders throughout.
- `/join/phd/advice/`: all five sections are EDIT ME placeholders.
- `_posts/`: only one example post exists.
- `assets/images/og-card.png`: awaiting portrait confirmation.

Soft-spots:
- Publication explainers written from training knowledge + CV notes; worth
  a spot-check pass with the user.
- The darkmatter-manchester.github.io URL can be unreliable from search —
  paste it directly into the prompt if needed.
- Sensitivity explorer model is a counting analysis above threshold; it sits
  ~1.7× above the DS-20k TDR projection at minimum (PL vs counting). Honest
  and documented in the disclaimer.

---

## 9. How to start a new chat smoothly

1. **Open this doc first.**
2. **Skim project memory** (workflow rule + theme spec).
3. **Restore the canonical build if missing:**
   ```sh
   ls /home/claude/build/ && ls /home/claude/build/_data/
   ```
   If missing:
   ```sh
   mkdir -p /home/claude/build
   cd /home/claude/build
   unzip /mnt/user-data/uploads/darrendavidprice-site-full.zip
   ```
   No post-extraction fixes needed — zip is fully current.

4. **Quick sanity check:**
   ```sh
   python3 -c "import yaml; d=yaml.safe_load(open('_data/team.yml')); print('current:', len(d['current']), 'alumni:', len(d['alumni']))"
   grep -c "nav-toggle" _includes/header.html
   grep "sitemap\|seo-tag" _config.yml
   ls research/dark-matter/sensitivity-explorer/index.html
   ```

5. **Ask what to tune next.** Track fixes, wait for "go", deliver partial zip.

---

## 10. What the user should carry into the new chat

Upload `darrendavidprice-site-full.zip` at the start of the new chat. The CV
PDF and DS-20k TDR PDF persist in `/mnt/user-data/uploads/` and do not need
re-uploading.

**When applying partial zips locally, always use:**
```sh
cd ~/path/to/repo
unzip -o ~/Downloads/update-name.zip
```
Do NOT use macOS Archive Utility — it can silently drop subdirectory files.

To compare against the DM site, paste the relevant URL directly into the
prompt — web_fetch on a user-provided URL always works.

---

## 11. Sensitivity Explorer — architecture and design

**Location:** `/research/dark-matter/sensitivity-explorer/index.html`
(self-contained: HTML + CSS + JS + reference data tables in one file,
~1830 lines).

**Tagline:** "How do we hunt for dark matter?" — interactive pedagogical
tool. User slides through Target / S1 threshold / S2 threshold / Exposure /
Intrinsic background / Depth and watches their experiment's sensitivity
curve move against published references.

### Physics model (counting analysis above threshold)

- **Halo:** Standard Halo Model (ρ₀ = 0.3 GeV/cm³, v₀ = 220 km/s,
  v<sub>esc</sub> = 544 km/s, v<sub>Earth</sub> = 232 km/s).
- **Form factor:** Helm.
- **Limit setting:** Feldman-Cousins-like 90% CL, `n90 = √(2.3² + 1.282² · N_BG)`,
  smooth transition from BG-free (n90 = 2.3) to BG-dominated (n90 = 1.282 · √N_BG).
- **Two analysis channels run in parallel; the better limit wins** at each
  mass:
  1. **S1+S2 channel** — effective threshold = max(Eth_S1, Eth_S2). Wide
     ROI [Eth, 200] keV-nr. Has PSD ⇒ low BG (uses `bgIntrinsic` directly).
  2. **S2-only channel** — threshold = Eth_S2. Narrow ROI [Eth_S2, 5] keV-nr.
     No PSD ⇒ 5× higher BG. Picks up a phenomenological Migdal contribution
     for sub-GeV reach.
- **Critical implementation detail:** `rateBetween(M, A, Elo, Ehi)`
  integrates signal strictly within the BG ROI window. Without this, the
  S2-only channel was free-riding on high-mass signal events that physically
  would never appear in a sub-5-keV ionization window. Fixing this made the
  S1 threshold slider correctly affect high-mass reach.
- **Background terms** in `bgEff`:
  - User-set `bgIntrinsic` (post-PSD for S1+S2; ×5 for S2-only)
  - Cosmogenic: `cosmoBgSurface = 1e3 × 10^(-d/500)` /(keV·t·yr).
    Steeper than raw μ-flux falloff — reflects post-veto NR-mimicking
    residual. Surface dominates everything; Boulby (2805) gives 2.5e-3
    (≈ typical intrinsic); Gran Sasso (3800) gives 2.5e-5 (sub-dominant);
    SNOLAB / Jinping negligible.
  - ν-induced: `nuBgDiff(A, Eth)` — empirical 8B + atmospheric ν rates
    per target. Makes the ν fog a real asymptotic floor — once exposure
    × ν_rate becomes large, σ ∝ 1/√exposure rather than 1/exposure.
- **Calibration constants:**
  - `CAL_AR = 1.4e-43` — tuned so DS-50 baseline → 1.15×10⁻⁴⁴ at 100 GeV
    (target 1.1×10⁻⁴⁴, matches published DS-50 limit).
  - `CAL_XE = 7.8e-44` — tuned so LZ preset → 2.1×10⁻⁴⁸ minimum (target
    2.2×10⁻⁴⁸, matches arXiv:2410.17036).

### Reference curves and sources

All data tables are inline in the JS:

| Curve | Source |
|---|---|
| `REF_DS50_S1S2` | Published DS-50 high-mass limit (~1×10⁻⁴⁴ at 100 GeV) |
| `REF_DS50_S2` | arXiv:2207.11967 (PRL 130, 101001), 12.3 t·d Migdal — approximated from the figure since per-mass values aren't in a public release |
| `REF_CRESST_III` | Combined CRESST-III envelope: SOS detector with 6.7 eV threshold (arXiv:2405.06527, leading 74–202 MeV) + Detector A CaWO₄ with 30.1 eV threshold (arXiv:1904.00498). σ-reach anchors from the CRESST decade roadmap (arXiv:2505.01183 — O(10⁻³⁸) cm² at 1 GeV, O(10⁻⁴²) cm² at 10 GeV). Coarse pedagogical digitisation, not publication-grade. |
| `REF_PANDAX4T_LDM` | PandaX-4T low-DM / ionisation-only S2 search: arXiv:2507.11930 (PRL 135, 211001), 1.04 t·yr / 259-day. Leading SI limit in 2.5–5 GeV/c². Anchor: σ(3 GeV) = 1.1×10⁻⁴³ cm². The mild upward fluctuation above ~3.5 GeV reflects a slight event excess in the 5–8 electron S2 region noted in the paper. |
| `REF_LZ` | arXiv:2410.17036, 4.2 t·yr WS2024+WS2022 (min 2.2×10⁻⁴⁸ at 40 GeV). Classic-WIMP analysis, starts at 9 GeV. |
| `REF_LZ_LIGHT` | LZ light-DM WS2025: arXiv:2512.08065, 5.7 t·yr / ROI 1–6 keV NR. Covers 3–9 GeV/c² — bridges the previous gap between DS-50/PandaX-4T low-mass analyses and the LZ classic-WIMP search (which starts at 9 GeV). Same paper reports first 4.5σ evidence of ⁸B solar-ν CEνNS in xenon. |
| `REF_DS20K` | DarkSide-20k TDR (DARKSIDE-CSN2-TDR-2112), Figure 2 top panel — "DS-20k Fid 10 y (200 t·yr)" curve. Min ~1×10⁻⁴⁸ at ~150 GeV |
| `REF_DS20K_S2` | arXiv:2407.05813 Fig 4a (2N_e ultimate fit) — Zenodo 13911875 |
| `REF_DS20K_S2_10YR` | Above × 1/√t scaling (paper's stated extrapolation) |
| `REF_NU_FOG_AR` | O'Hare 2021 (arXiv:2109.03116, PRL 127 251802), Ar SI floor from `cajohare/NeutrinoFog/Ar_SI.txt`. Two-bump structure (⁸B near 500 MeV; atmospheric high mass; valley ~30 GeV). Sub-100-MeV values extrapolated. |

**Honest caveat on `REF_CRESST_III`, `REF_PANDAX4T_LDM`, `REF_LZ_LIGHT`:** these are coarse pedagogical digitisations anchored on text figures and round-number reach statements from the papers themselves — not traced from the published curves point-by-point. Each is isolated as a single `const REF_*` array in the explorer source, so swapping in HEPData values later is a search-and-replace.

**World-leading SI direct-detection limit by mass band** (mirrors the `statusText` regime classifier):

| Mass band | Leading experiment(s) | Reference curve |
|---|---|---|
| < 40 MeV | no clean elastic SI DD limit; non-standard analyses only | (none — `statusText` declines to benchmark) |
| 40 – 200 MeV | CRESST-III (cryogenic CaWO₄ + SOS) | `REF_CRESST_III` |
| 0.2 – 2.5 GeV | DS-50 ionisation-only / Migdal | `REF_DS50_S2` |
| 2.5 – 5 GeV | PandaX-4T low-DM (S2-only, 1.04 t·yr) | `REF_PANDAX4T_LDM` |
| 5 – 9 GeV | bridging band — DS-50, PandaX-4T, LZ light-DM share leadership | `REF_LZ_LIGHT` (cleanest contiguous benchmark) |
| 9 GeV – 1 TeV | LZ 4.2 t·yr (WS2024+WS2022) | `REF_LZ` |
| > 1 TeV | LZ + DS-20k, with n = ρ/M flux suppression | `REF_LZ`, `REF_DS20K` |

### UI architecture (CRITICAL — different from other site pages)

- **Two-pane plot split**: TWO separate SVGs side-by-side (one per pane).
  - Low-mass pane: 40 MeV – 5 GeV, σ 10⁻⁴⁷ – 10⁻³⁵
  - High-mass pane: 1 GeV – 10 TeV, σ 10⁻⁴⁹ – 10⁻⁴²
  - Each SVG has 540×640 viewBox with the same internal coords (x=80,
    y=60, w=430, h=495).
  - `PANES` array in JS holds both; each entry has `svgId` for layer
    addressing via `paneLayer(pane, layerClass)`.
- **Sticky plot, full-width** — `.plot-card` is `position: sticky; top: 0`
  with `max-height: calc(100vh - 1rem)`. Stays in view while the user
  scrolls the controls below.
- **Mobile (≤720px) swipe-snap** — `.plot-row` becomes
  `overflow-x: auto; scroll-snap-type: x mandatory`; each pane gets
  `flex: 0 0 100%; scroll-snap-align: center`. Dot indicator below shows
  which pane is current; tap a dot to scroll to it.
- **Controls grid** below the plot — `repeat(auto-fit, minmax(280px, 1fr))`.
  3 columns desktop / 2 tablet / 1 mobile. Reset-all button at top.
- **No legend** — replaced entirely by in-figure labels (DS-50, LZ, DS-20k,
  DS-50 S2+Migdal, DS-20k S2 1yr, DS-20k 10yr, "ν fog ⁸B bump", "ν fog
  atmospheric", and "your experiment" — the last follows the user-curve
  minimum on whichever pane it falls in).
- **ν fog rendering**: `fogAreaPath()` fills the region BELOW the fog line
  (toward the bottom of the pane, lower σ — the unreachable territory).
  Dark fill (`rgba(40,35,28,0.32)`), dashed line on top.

### Contextual annotations (live, slider-value-dependent)

Below each slider, a `.ctx-note` div updates on every refresh. Logic in
`ctxBg`, `ctxExp`, `ctxThreshold`, `ctxDepth`:

- **Background:** banana-K-40 equivalents (1 banana ≈ 0.5 /(keV·t·yr)),
  switches to dust-grain counts below 1 banana, whimsy at 5+ (fruit bowl)
  and 50+ (banana processing factory). When BG falls below the ν-induced
  floor: "At this radiopurity, solar neutrinos scattering coherently off
  your target nuclei are the dominant background — there's no point cleaning
  the detector any further."
- **Exposure:** Ar (DS-50 → multi-tonne LAr → DS-20k territory ≤1000 t·yr
  → ARGO ≤3000 → beyond); Xe (LZ → DARWIN/XLZD with $cost → red flag at
  5× annual world production).
- **S1 threshold:** DS-50-class ≥20; DS-20k/LZ-class ≥5; aggressive ≥1;
  warn <1 (no SiPM-as-future-tech language since DS-20k already uses them).
- **S2 threshold:** conservative ≥1; DS-20k baseline ≥0.3 (Migdal opens);
  ≥0.1 sub-keV; warn ≥0.05 (bandgap floor); warn <0.05 — bandgap floor
  language, smaller-bandgap targets (Si, Ge), quantum sensors (Skipper-CCD,
  TES, MKID, SNSPD, **opto-mechanical levitated sensors**).
- **Depth:** dynamic lab annotation. < 30 m.w.e. "Exposed surface"; < 300
  "building with concrete"; < 2500 "shallow underground"; [2500, 3100]
  **Boulby** (2805 m.w.e., 1100 m, halite); [3500, 4100] **Gran Sasso**
  (3800 m.w.e., 1400 m, dolomite); [5700, 6300] **SNOLAB** (6010, 2070 m,
  Norite); [6400, 7000] **Jinping** (6720, 2400 m, marble); > 7000
  engineering tail (lithostatic pressure, ~120 °C rock temp).

### Status panel (regime-aware)

`statusText(minPt, state)` runs a **7-regime mass classifier** (parallel to the
recoil explorer's, so the two pages stay consistent), choosing the right
world-leading experiment as the benchmark for each band. Pivot mass and
benchmark curves per regime are tabulated in §11's "World-leading SI direct-
detection limit by mass band" table above.

- **< 40 MeV** → declines to benchmark (no clean elastic SI DD limit; non-
  standard analyses only). Sets a "no clean limit" verdict.
- **40 – 200 MeV** → pivots at 100 MeV; benchmark `REF_CRESST_III`.
- **0.2 – 2.5 GeV** → pivots at 1 GeV; benchmarks `REF_DS50_S2`,
  `REF_DS20K_S2`, `REF_DS20K_S2_10YR`. Reports user's σ at 1 GeV explicitly.
- **2.5 – 5 GeV** → pivots at 3 GeV; benchmark `REF_PANDAX4T_LDM`, falls
  through to `REF_LZ_LIGHT` if PandaX-4T no comparison is possible.
- **5 – 9 GeV** → pivots at 7 GeV; benchmark `REF_LZ_LIGHT`. Verdict text
  notes DS-50, PandaX-4T and LZ-light all share leadership in this band.
- **9 GeV – 1 TeV** → benchmarks at user's actual `Mmin` against `REF_LZ`,
  `REF_DS50_S1S2`, `REF_DS20K`. (Verdict wording: "LZ 4.2 t·yr", not the old
  "LZ 2024".)
- **> 1 TeV** → reports the heavy-WIMP regime, notes the n = ρ/M flux
  suppression that makes limits *rise* with mass.

Each regime checks the ν-fog floor first (`REF_NU_FOG_AR`) and short-circuits
to a "you're in the fog" verdict where applicable.

Also builds a "Reaching that limit requires:" feasibility line listing
the dialed-in technical challenges (S2 < 0.05 keV; sub-1-keV S1; Xe cost
> $300M; Ar > ARGO; sub-1000 m.w.e. cosmics; BG < 1e-4 radiopurity).
Else: "Feasible configuration — all controls in regimes that real detectors
have demonstrated."

### Quantitative caveats (in the disclaimer at the foot of the page)

- Model is counting-above-threshold; published projections use
  profile-likelihood with spectral shape. At the DS-20k preset the user
  curve sits ~1.7× above the TDR minimum because of this. Expected and noted.
- Migdal sub-GeV: published analyses use shape-likelihood Migdal fits;
  this tool's counting approach is significantly more conservative at
  sub-GeV. The qualitative dependences (threshold, exposure, depth, target)
  are what's pedagogically intended.

### Editing tips

- **Calibration drift**: if a future change moves the DS-50 minimum away
  from 1.1×10⁻⁴⁴ at 100 GeV, retune `CAL_AR` proportionally. Same for
  `CAL_XE` and the LZ minimum.
- **Adding a reference curve**: add a `const REF_NEWNAME = [...]`, then
  add a `<path>` in `drawCurves` per pane (and an in-figure label). Update
  the disclaimer to cite the source, and — if the new curve is a leader in
  some mass band — update the `statusText` regime classifier to benchmark
  against it. The HANDOFF §11 "World-leading SI direct-detection limit by
  mass band" table is the single source of truth for which experiment owns
  which band; keep that, the `statusText` branches, and the in-figure
  labels mutually consistent.
- **Adjusting ν fog appearance**: `.curve-fog-fill` and `.curve-fog-line`
  CSS classes; `fogAreaPath` builds the below-line filled region.
- **Mobile pane width**: `@media (max-width: 720px)` breakpoint — change
  to match site-wide mobile breakpoint if needed.
- **JS-only file**: edit `research/dark-matter/sensitivity-explorer/index.html`
  directly. No build step; the page is self-contained. Always run a Node
  syntax check (`node --check`) after edits.
- **Standalone preview build** (for testing without Jekyll): extract the
  HTML body, strip the front matter, wrap with the site CSS inline — see
  the python build scripts used in previous sessions.

---

## 12. Recoil Explorer — architecture and design

**Location:** `/research/dark-matter/recoil-explorer/index.html`
**Permalink:** `/research/dark-matter/recoil-explorer/`
**Title:** "What does dark matter look like in a detector?"
**Status:** v1 shipped. Single self-contained HTML file (Jekyll front matter +
scoped `<style>` + body + inlined `<script>`), same convention as §11.

### Purpose — the companion framing

The sensitivity explorer (§11) is "detector-out": how deep can a detector reach.
This page is "particle-in": what dark matter *is doing* and why it's hard to
catch. The two cross-link both ways (callout cards on the DM research page; a
`.sibling-link` block at the foot of each explorer; a combined line on the
engagement page).

### Three plot panes (shared geometry `PLOT = {x:78,y:56,w:432,h:430}`)

1. **Velocity distribution** (`svg-vel`) — lab-frame halo speed distribution
   `fLab(v, v0, vesc, vE)` (truncated, Earth-shifted Maxwellian). Whole
   distribution filled faint blue; the part fast enough to clear the recoil
   threshold (`v > vMin(Eth)`) overlaid in oxblood; dashed accent line marks the
   min speed. Beginner + advanced.
2. **Recoil spectrum** (`svg-rec`, the centrepiece) — `dR/dE` on log-log axes.
   Below-threshold region greyed (`.recoil-fill-lost`), above-threshold filled
   oxblood. Threshold dashed line + "invisible" annotation. Beginner + advanced.
3. **σ–mass** (`svg-sig`) — ADVANCED ONLY (gated by `body.adv-mode`). Reference
   curves `REF_DS50 / REF_LZ / REF_DS20K / REF_FOG` (coarser approximations than
   §11's — this pane is for *placing* the user's WIMP, not precision), ν-fog
   fill, and a "your WIMP" marker at (Mchi, σ). Hidden in beginner mode via CSS;
   the third pane-dot is also hidden until advanced.

### Physics engine (reused from §11 for consistency)

`erf`, `helmF2(ER,A,useFF)` (form-factor toggle), `vMin`, `gOfVmin(vmin,v0,vesc)`
(now parameterised by halo sliders), `fLab` (new — for the velocity histogram),
`dRdER(...)`, `rateBetween(...)`, `maxRecoil(Mchi,A,vesc)`, `numberDensity`,
`fluxThrough`.

**CALIBRATION — important.** `const K_RATE = 7.3e-2;` This normalisation was
derived (not guessed) to give ~5 events/kg/yr for Xe, 100 GeV, σ=1e-45 cm² in
[1,100] keV — the textbook benchmark. An earlier value of 1.4e3 gave rates ~5
orders of magnitude too high; if recoil counts ever look absurd, this constant
is the first thing to check. Derivation lives in the session transcript
(`/tmp/calib.js` approach: raw integral × ρ/M back-solved against the 5/kg/yr
target). Verified preset counts: classic ~5000 (1000 kg × 5/kg/yr), lowmass ~30,
lz ~91, mismatch & cliff exactly 0 (diagnostic fires).

### Beginner / Advanced split

- Default = **Beginner**. Toggle button top-right of the controls
  (`#btn-mode`, toggles `body.adv-mode`).
- **Beginner controls:** WIMP mass, cross-section, target (He/Si/Ar/Ge/Xe),
  recoil threshold. Halo fixed at ρ₀=0.3, v₀=220, v_esc=544, Helm on.
- **Advanced ADDS:** exposure, background, ρ₀, v₀, v_esc, Helm form-factor
  toggle — plus the σ–mass pane. Advanced-only `.control-group.adv-only`
  revealed via CSS.

### Live outputs

- **Flux panel** (the headline): `updateFlux` switches body-part contextually —
  thumbnail (palmRate > 5e9 /s), palm (normal), whole body (< 200 /s), then falls
  back to per-minute/hour/day if even the body rate < 1/s. Areas: thumb 1.5,
  palm 100, body 9000 cm².
- **Readout chips:** number density n=ρ/m, reduced mass μ, max recoil energy,
  % recoils above threshold.
- **Mass-matching meter:** energy-transfer efficiency η = 4·M·MN/(M+MN)²
  (1 = perfectly matched). Caption explains light-vs-heavy mismatch.
- **Diagnostic panel** ("Would this detector see it?"): expected signal count +
  a "why did it fail?" reason list (threshold above max recoil; recoils below
  threshold; WIMP too light for target; small exposure; background swamps
  signal; cross-section too small).
- **Poisson toy** ("Run the experiment"): `expectedCounts` → λ_sig, λ_bg.
  `runToyOnce` draws one Poisson year; `runToy100` draws 100 and bins them into
  an adaptive histogram (≤16 bins, brackets mean ± 3σ for large λ) to show the
  spread. Drives home that one event ≠ discovery.

### Presets

`classic` (100 GeV Xe), `lowmass` (1 GeV Si), `heavy` (5 TeV Xe),
`mismatch` (2 GeV Xe → vanishes), `cliff` (5 GeV Ar, 30 keV cutoff → 0),
`darkside` (Ar, 200 t·yr), `lz` (40 GeV Xe, 1e-47, 4 t·yr). Presets merge over
`DEFAULTS` and then call `loadTargetBaseline(state)` so each target's acceptance
loads automatically; a preset may carry explicit `Eth`/`effHalf`/`effPlateau`
overrides (only `cliff` does, to force a high-cutoff cliff).

### Detector acceptance / selection-efficiency model

The hard threshold is replaced by a smooth selection efficiency ε(E):

```
ε(E) = 0                                                          for E ≤ start
ε(E) = plateau · 0.5 · [1 + erf((E − half) / (√2 · σ))],  σ = (half−start)/2.5
```

- Exactly `plateau/2` at `half`; ~0.65% of plateau at the cutoff edge, then 0 below.
- erf (vs the earlier arctan) drops to near-zero by `start` and reaches plateau
  without a long heavy tail — closer to published NR acceptance shapes, and
  visibly sharper on the log-E recoil axis.
- Three free parameters = the three advanced sliders: lower cutoff
  (= `state.Eth`), halfway-to-plateau energy (`state.effHalf`), plateau
  efficiency (`state.effPlateau`). Constraint enforced in `wire()`:
  `effHalf ≥ Eth · EFF_MARGIN` (1.15). In beginner mode the threshold slider
  also rescales `effHalf` so the baseline turn-on shape translates rather
  than growing a long flat tail.
- **Beginner mode** hides the two extra sliders; selecting a target calls
  `loadTargetBaseline` which sets all three from `TARGET_EFF[target]`.
- `rateBetween(..., eff)` takes an optional efficiency descriptor and weights
  the integrand by ε(E); pass `null` for the raw (true) recoil rate.
  `expectedCounts` and the detected-fraction chip use the eff-weighted
  integral over `[~0, ROI_HI[target]]`; the chip is "Recoils detected
  (acceptance-weighted)" and collapses toward zero for low-mass WIMPs.
- **Rendering** (`drawRecoil`): raw dR/dE is the line; the ε-weighted detected
  spectrum is the filled region; ε(E) itself draws as a dashed teal curve on a
  right-hand 0–100% axis. The cutoff is marked with the dashed vertical line.

**Validated constants** (in the JS, near the top of the script):

```
K_RATE = 20.0                  // anchored so LZ-config recovers 2.1e-48 @ 40 GeV
TARGET_EFF = {                  // start / half / plateau (keVnr, keVnr, fraction)
  he:{0.02, 0.10, 0.80}, si:{0.04, 0.20, 0.85},
  ar:{13.0, 60.0, 0.30},       // DarkSide-50-shaped; reused for DS-20k per spec
  ge:{0.05, 0.30, 0.88}, xe:{5.0, 8.0, 0.90} }   // xe = LZ-like
ROI_HI = { he:30, si:25, ar:100, ge:50, xe:55 }  // analysis upper bound, keVnr
```

**CRITICAL physics fix made during validation.** The old `dRdER` carried a
spurious `μ_N²` (WIMP–nucleus reduced mass squared) in the numerator, which made
the rate *grow* with mass and the high-mass limit wrongly *improve*. The correct
SI rate is `dR/dE ∝ (ρ/Mχ)·σ_n·A²·F²/μ_n²·⟨1/v⟩` — the nucleus enters only via
A², F² and v_min. After removing `μ_N²`, `pre·M` is ~constant, so the rate falls
as 1/M at high mass and the limit correctly *rises* with mass. **If the engine is
ever copied from the sensitivity explorer, check that page for the same bug.**

**Limit-recovery validation** (harness `/tmp/validate.js`, this session). Limit
predictor: σ such that the eff-weighted signal = `n90(N_BG)`, with
`n90 = √(2.3² + 1.282²·N_BG)` and `N_BG = bg·ROIwidth·exposure` (same n90 as the
sensitivity explorer). Anchored on LZ @40 GeV = 2.1e-48 (web-verified,
arXiv:2410.17036, 4.2 t·yr). Results (model/published ratio):

| Config | mass | ratio |
|---|---|---|
| LZ (Xe, 4.2 t·yr) | 10 / 40 / 100 / 200 / 1000 GeV | 2.30 / 1.00 / 0.46 / 0.49 / 1.36 |
| DS-20k (Ar, 200 t·yr) | 150 / 1000 GeV | 1.37 / 1.23 |
| DS-50 (Ar, 0.05 t·yr) | 100 GeV | 0.55 |

All within ~2.3× of published, most within 1.5× (erf turn-on, K_RATE = 20.0).
Scaling checks all correct: exposure → 1/exp in the low-BG regime
(×9.9/decade); raising the cutoff on a 10 GeV WIMP drives the limit to "no
reach" (threshold cliff); heavier targets win at high mass (A²); light
targets (He, Si) keep reach at 3 GeV where Ar/Xe have none. Everyday counts
are now sane (classic ≈ 236 events, was ~5000; mismatch = 0).

### S1/S2 handling

Per the design decision: NOT a control axis. Each target carries a `readout`
string (Ar/Xe → "S1 scintillation + S2 ionisation (dual-phase TPC)"; Ge/Si →
"phonons + ionisation (cryogenic)"; He → "phonon / scintillation"). Surfaced in
the target ctx-note and explainer cell 05. The recoil spectrum is the same
physics; only the readout language differs by technology.

### UX polish (added this session)

- **Colour semantics inverted.** Detected / above-threshold = green; lost /
  below-threshold = red. Velocity pane fills are now disjoint
  (`vdist-fill` red below `vthresh`, `vdist-fill-vis` green above). Recoil
  pane carries both fills: `recoil-fill` (green, ε-weighted detected band)
  and a re-introduced `recoil-fill-lost` (red, between the detected curve
  and the raw spectrum). Render z-order: detected → lost → raw line.
- **Recoil y-axis locked.** `refRateMax(target, σ, ρ, useFF)` evaluates
  dR/dE for a 1 TeV WIMP on the current target with baseline halo
  (220/544); RHI rounds the peak × 3 up to a decade, RLO = RHI/1e6. The
  axis tracks σ and ρ but stays put under WIMP-mass, v₀ and v_esc moves.
- **Beginner-mode eff-half tie.** In the threshold slider handler, when
  `!advMode`, `state.effHalf` rescales to keep the baseline ratio
  `TARGET_EFF[target].half / start`. Advanced mode keeps the half/start
  pair independent (with the `EFF_MARGIN` clamp as a safety rail).
- **σ-mass pane.** XLO trimmed to 5 GeV. Standing annotation: "M<5 GeV —
  dedicated S2-only / Migdal / cryogenic analyses extend reach (not
  shown)". Off-plot marker text now distinguishes the low-mass region
  from the high-mass / high-σ / low-σ cases.
- **Mass-aware σ commentary.** `ctx-xsec` now branches on Mchi: below
  100 MeV, large σ is described as potentially invisible to existing
  detectors rather than "excluded decades ago".
- **Background ctx always lands on the toy.** Quiet-fog and noisy-surface
  variants both still mention that the rate feeds the toy below.
- **Halo speed sliders explain themselves.** `ctx-v0` cites the Sun's
  circular speed (~220 km/s, Gaia / stellar dynamics) and warn-tints
  outside ~200–245 km/s. `ctx-vesc` cites RAVE / Gaia (~528–600 km/s)
  and warn-tints outside ~500–620 km/s ("modelling a different galaxy").
- **Toy rewritten.** `runToyOnce` reframes the verdict as "you saw N —
  expected ≈ B background (±√B)", with separate branches for
  total ≤ 1.1·bExp (nothing to be lucky about), strong-signal
  (sExp ≥ 10·√bExp), low-expected-signal (sExp < 0.3), and the marginal
  middle. `runToy100` extends the histogram x-range to bracket the
  expected background, overlays a dashed bg-line (`.toy-bg-line` CSS
  with absolute positioning inside the now `position:relative`
  `.toy-hist`), and writes a verdict-aware summary that connects the
  spread to whether a single year could plausibly claim discovery.


  `/tmp/recoil.js`; re-inline by replacing the single non-`src` `<script>` block
  (python regex, `count=1`) and always `node --check` the re-extracted inline JS.
- **Rate calibration**: `K_RATE = 20.0` is anchored on LZ's published limit, not
  the old 5/kg/yr rule of thumb. If the engine changes, re-run `/tmp/validate.js`
  and rescale `K_RATE` by got/pub at LZ @40 GeV; retune `TARGET_EFF` per target.
- **Standalone preview** (no Jekyll): strip front matter, inline the site
  `:root` tokens from `assets/css/styles.css`, resolve `relative_url` to live-site
  URLs, reconstruct heading/lede. Render with headless Playwright (the only
  console error will be a Google Fonts 403 from the sandbox — harmless).
- **v2 enhancements** still in TODO.md: interaction-type selector,
  energy-resolution smearing, annual-modulation companion page, side-by-side
  comparison. The efficiency turn-on is now DONE (this session).
