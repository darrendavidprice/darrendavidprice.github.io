# darrenprice.github.io — Site To-Do List

Add this file to project knowledge. Update it as items are completed or added.
Repo: `darrendavidprice.github.io`

---

## Content quality

- [x] **Spot-check publication explainers** *(Medium — done)*
  All 27 primary-section entries with arXiv IDs refined against published abstracts.
  Length normalised to 50–110 words; concrete data (luminosities, cross-sections,
  significances, theory comparisons) added per paper. One title correction on the
  EW Wjj paper (was wrongly "8 TeV only"). **Two entries cannot use this workflow
  and remain at their original length:** `p-menary-density-neurips-2020` (NeurIPS
  workshop, no arXiv) and `p-atlas-jinst-2008` (foundational ATLAS detector paper,
  no arXiv). Both need manual treatment if a richer explainer is wanted — the
  current 30 w / 22 w wording is acceptable as-is.

- [ ] **Add explainer figures (`explainer_image` + `explainer_caption`) where useful** *(optional, Quick per entry)*
  Functionality verified end-to-end; two worked examples shipped
  (`p-ds50-lowmass-wimp-2023` PNG plot, `p-ssww-majorana` SVG diagram). The
  schema, template and CSS all support it — adding a figure to any other primary
  entry is just two YAML fields and an asset drop into
  `assets/images/explainers/`. README "Explainer figures" subsection has full
  usage + an optional float-wrap CSS swap if the parallel-column grid layout
  proves limiting.

- [ ] **Check tags, links and dates of all auto-added (pre-2024 parsed) entries in `talks.yml`** *(Medium)*
  The original 440 entries (2004–2023) were parsed from `Presentations.html` and
  semi-automatically tagged. Go through and verify `type:` (invited / seminar /
  public / internal), tag assignments, agenda/slides links, and `iso`/`date`
  values; errors affect filtering and theme-page pull-through. (The 42 hand-curated
  2023–2026 entries added in v3.4.2 are already checked.)

- [x] **Fill Conor Sheehan's alumni research focus** *(v3.4.1)*
  Set to "Fast inference techniques in the physical sciences." in `_data/team.yml`
  (was the `EDIT ME` placeholder).

- [ ] **Consider external links on the About page** *(Quick — needs Darren's decision)*
  About currently uses internal links only (v3.2.0). Candidate external targets if
  wanted, for review: ATLAS / CERN (atlas.cern, home.cern), Alan Turing Institute,
  STFC Data Intensive Science CDT site, Gran Sasso (LNGS) and Boulby underground labs,
  Manchester staff page, and St Joseph's / Port Talbot. Recommendation: link ATLAS,
  CERN, the Turing Institute and the CDT (all stable institutional URLs); leave the
  school and lab mentions as plain text unless Darren wants them. Decide and I'll wire.

- [ ] **Reconcile "discovery of new particles" wording across About vs bios** *(Quick — optional)*
  v3.2.0 changed the media bios to "led teams in the discovery of new particles" (per
  Darren) but, per the same instruction's scope, left the About body verbatim as
  supplied ("My research has contributed to the discovery of new particles"). If the
  stronger "led teams" framing is wanted on About too, it's a one-line change.

---

## Pages & navigation

- [x] **Add hero images to research theme pages — first three done** *(v3.1.0)*
  Hero banner + figure gallery infrastructure shipped via new `_data/theme_heroes.yml`
  and an updated `_layouts/theme.html`. Currently populated: dark-matter (DarkSide-20k
  veto vessel hero + Boulby inline), instrumentation (vPDU underside hero + assembly
  + levitating-sensors inline), levitating-sensors (vacuum chamber + optics hero).
  Remaining 5 themes (electroweak, QCD, B-physics, neutrinos, AI/ML) render exactly
  as before — add an entry to `theme_heroes.yml` to give any of them a hero too.

- [ ] **Add hero images to the remaining 5 research themes** *(Medium — needs images from Darren)*
  Infrastructure shipped in v3.1.0; 3 of 8 themes populated. Still without a hero:
  **electroweak, QCD, B-physics, neutrinos, AI/ML**. Each needs a ~1600×720 hero
  image (optional inline figures) dropped into `assets/images/heroes/` and a block
  added to `_data/theme_heroes.yml`. Pure additive — themes without an entry keep
  rendering as they do now.

- [ ] **Add remaining team member photos** *(Medium — partially done v3.0.0)*
  Real portraits now in for 2 of 12 current members (Darren, Conner Roberts) and
  13 of 51 alumni; everyone else falls back to the shared `silhouette.svg`
  (initials placeholder retired). Remaining: ~10 current members (Ash, Graham,
  Rob, the 4 newer PhD students, Hayden, David, Louis) and 38 alumni. Drop a
  square portrait into `assets/images/people/` and set the `photo:` field in
  `team.yml` per member; the silhouette fallback disappears automatically.

- [x] **Replace group photo placeholder on Team page** *(v3.1.0)*
  Replaced the placeholder with `assets/images/team-group-2022.jpg` — partial group
  social shot from July 2022 (1600 wide). Caption notes "rotates as new members join".

---

## UX & performance

- [ ] **Talks page year / tag filtering** *(Larger)*
  440 entries with only a type toggle is hard to navigate. A year-range filter or
  decade grouping would help significantly.

- [ ] **Publications "show more" / pagination** *(Medium)*
  81 entries render on load — fine now, but worth a progressive reveal as the list grows.

- [ ] **Writing section: add real posts + real-world test** *(Medium)*
  Only one example post exists. The writing infrastructure (tags, RSS, prev/next nav,
  single-post layout) is complete and ready, but untested at scale — worth a pass
  once a few real posts are added.

- [ ] **Client-side search across talks/pubs/news** *(Larger — Low priority, potential)*
  440 talks + 81 pubs + 15 news entries. A lightweight Lunr or Pagefind index over
  titles, venues, and tags would help findability. Deferred until the corpus or
  navigation pain warrants the added build/runtime weight.

---

## Explorers — quality assurance

- [x] **Performance / load-time audit on both explorers** *(done, earlier session)*
  Ran headless measurements (Playwright, 8-run averages). Both pages excellent: FCP 230-300ms, zero cumulative layout shift, 1 resource (everything inlined), ~500 DOM nodes, ~10MB JS heap, slider drag at ~58fps median with the rAF throttle coalescing 60 events into ~32 frames. The single concrete optimisation that came out of the audit was wrapping the initial `refresh()` in `requestAnimationFrame` so first paint can happen with the empty SVG skeletons before the (~80-125ms) reference-curve drawing — small win on recoil (FCP −8ms, long-task 93ms→75ms), neutral on sensitivity. Both kept.

- [x] **Cross-browser / cross-device QA on both explorers** *(done, earlier session — partial: Chromium runtime + static cross-engine scan)*
  Ran a headless Chromium QA harness across 3 viewports (desktop 1280×800, tablet 768×1024, mobile 390×844) on both explorers — 6 scenarios total. **All pass**: zero console errors, zero JavaScript exceptions, zero horizontal overflow at any viewport, all sliders respond to programmatic input, the recoil mode-toggle correctly reveals adv-only controls + σ-mass pane, the sensitivity explorer's scroll-snap pane swap measures exactly one pane width on mobile (324px = clientWidth = half of 648px scrollWidth). Fresh-load screenshots confirm beginner mode on recoil shows only velocity + recoil panes (σ-mass hidden, all 8 adv-only control groups display:none).

  Direct unit-tested the new 7-regime `statusText` classifier with synthetic minPt values landing in each regime — all 7 route to the correct world-leader benchmark (CRESST-III / DS-50 Migdal / PandaX-4T / LZ light-DM / LZ classic / heavy-WIMP).

  Static cross-engine compatibility scan flagged zero high-severity risks across both explorers + the global CSS + the three JS modules. **One real polish item fixed**: `max-height: calc(100vh - Nrem)` on `.plot-card` (8 occurrences across both explorers) replaced with `100dvh` so the sticky plot sits cleanly inside iOS Safari's variable viewport (URL bar showing or hidden). `100dvh` is universally supported since Safari 15.4 / Chrome 108 / Firefox 101. `backdrop-filter` flagged as low; already paired with `-webkit-backdrop-filter` so non-issue.

  **What's still uncovered:** Playwright's Firefox and WebKit downloads are blocked by this sandbox's network proxy, and real iPhone Safari testing is not possible here. Spot-checks still needed on real Safari (macOS + iOS) and real Firefox for: SVG in-figure label rendering, scroll-snap pane swap feel on iOS, sticky plot behaviour under iOS rubber-band scroll, Poisson-toy histogram layout, and any FOUT/FOIT around the Google Fonts swap. The structural and JS-engine portion is solid — these spot-checks are visual/feel-only.

---

## Sensitivity explorer (research/dark-matter/sensitivity-explorer)

- [ ] **Profile-likelihood vs counting boost** *(Larger, optional)*
  Model is a counting analysis above threshold; published projections use
  profile-likelihood with spectral shape. Result: at the DS-20k preset the user
  curve sits ~1.7× above the published TDR minimum. Honest and noted in the
  disclaimer, but if we ever want a closer match we'd need a mass-dependent
  shape-likelihood boost factor.

- [ ] **Optional: low-mass S2/Migdal shape model** *(Larger, optional)*
  Sub-GeV sensitivity in the model is dominated by a phenomenological Migdal
  rate × probability + mass-suppression. Counting analysis can't reproduce the
  shape-likelihood Migdal performance of published analyses — user curve sits
  significantly above the DS-50 / DS-20k S2+Migdal published references in the
  sub-GeV regime. Disclaimer covers this.

---

## Recoil explorer (research/dark-matter/recoil-explorer) — v2 enhancements

The "What does dark matter look like in the detector?" page ships as a focused
v1 (halo → target → spectra, with Poisson toy, presets, beginner/advanced
toggle). These are deliberately-deferred enhancements, kept out of v1 so the
core threshold-cliff / mass-matching lessons stay crisp:

- [ ] **Interaction-type selector** *(Larger, optional)*
  v1 is spin-independent WIMP–nucleus contact scattering only. A dropdown for
  spin-dependent, light-mediator, momentum-suppressed and velocity-suppressed
  interactions would show that "same cross section" does not mean "same number
  of detected events" — a common misconception. Each changes the recoil
  spectrum shape; needs its own form-factor / operator handling.

- [ ] **Energy resolution smearing** *(Medium, optional)*
  Add a resolution slider that convolves the true recoil spectrum with a
  Gaussian to produce a reconstructed spectrum. Show true vs reconstructed
  curves overlaid — explains why detectors don't measure exact recoil energy.

- [ ] **Temporal-effects companion page (annual modulation)** *(Larger, optional, future page)*
  Deliberately left out of the recoil explorer. Could become its own third
  interactive — "Run the detector in June vs December" — studying the
  few-percent annual modulation, observation-date dependence, and lab-frame
  velocity-distribution shift through the year. Hard to show honestly as a
  small effect inside the recoil page; better as a dedicated page if pursued.

- [ ] **Detector side-by-side comparison mode** *(Larger, optional)*
  Compare two configs at once (Ar vs Xe, high vs low threshold, etc.). Strong
  pedagogically but doubles the UI; deferred from v1.

---

## Assets

- [ ] **Regenerate og-card now that a portrait is available** *(Quick — needs sign-off)*
  Portrait blocker resolved: `assets/images/people/darren-price.jpg` (cropped 2022
  CERN-plaza portrait) shipped in v3.0.0 and can drive the card. Current og-card shows
  name, title, institution, Turing Fellow / DarkSide tagline, and
  `darrendavidprice.github.io`. **Note:** the new About/bios copy retitles Darren to
  "Professor of Particle Physics and Associate Dean for Engagement" — the og-card
  tagline should be reconciled with that when regenerated. Still needs sign-off on:
  preferred portrait/crop, and which credentials/taglines to show.

---

## SEO & discoverability

- [ ] **Validate structured data on the live site** *(Quick — DO WHEN: v3.4.0 is pushed)*
  Paste the homepage, `/about/`, and an explorer URL into Google's Rich Results
  Test and <https://validator.schema.org/>. Confirm zero errors, one `@graph`
  per page, and that `Person.sameAs` resolves. Locally validated as JSON; the
  live check confirms crawler-side parsing.
- [ ] **Activate `Blog` / `BlogPosting` JSON-LD** *(Quick — DO WHEN: the Writing section has ≥1 real post)*
  Flip `enable_blog_jsonld: true` in `_config.yml`. The `BlogPosting` branch in
  `_includes/structured-data.html` already emits headline / dates / author /
  publisher / keywords / image; verify on a real post once one exists.
- [ ] **Request indexing / confirm `same_as` completeness** *(Quick)*
  Before requesting indexing, re-check the `site.author.same_as` list is current
  and complete (it's the disambiguation payload for a common name).
- [ ] **(Optional, likely skip) `BreadcrumbList` / `ScholarlyArticle`** *(Larger — only if a need arises)*
  Breadcrumbs deliberately omitted (short paths). Per-publication
  `ScholarlyArticle` deferred — DOI / arXiv / INSPIRE are already authoritative.

---

## Done ✓

### v3.4.2 — talks 2023–2026, About inline links, Writing post suppressed
- [x] **`_data/talks.yml`:** appended **42 hand-curated entries (2023–2026)**, taking the record from 440 → 482; header comment year range updated to 2004–2026. Breakdown: 3× 2023 (manual), 21× 2024, 15× 2025, 3× 2026; types internal 22 / public 18 / seminar 2 (page sorts by `iso` desc so they slot in automatically; internal hidden behind the Working-meetings toggle). All tags map to canonical IDs (no new tags). Decisions: New Scientist Discovery Tours unified to `public`; the two Feb-2024 DRD2 talks set `internal`; four near-duplicate April-2024 SOLAIRE "vision…" entries retitled "SOLAIRE working meeting updates" (kept internal). Date fix: "Open Data in particle physics research" Apr→May 2025. 14 of the 42 carry agenda links (8 from source + 7 supplied by Darren; t2024-002 updated to the `?view=standard` variant). Bradford link applied to t2026-001 (the Bradford talk), per Darren's row-41/40 note.
- [x] **`about/index.html`:** six inline external links added (house style `rel="noopener"`): ATLAS → atlas.cern, CERN → cern.ch; "DarkSide" split out to lngs.infn.it/en/darkside with "dark matter programme" kept on the internal `/research/dark-matter/` link; Gran Sasso → lngs.infn.it/en/lngs-overview; St. Joseph's Comprehensive School → stjosephscomp.co.uk; Port Talbot → Wikipedia. First-occurrence only.
- [x] **`_posts/2026-05-01-the-real-cost-of-ai-in-research.md`:** `published: false` added — removes the example post from `site.posts` everywhere (homepage / footer / `/writing/` fall back to their "coming soon" empty-states). Flip back to `true` (or delete the line) when a real Writing post exists.

### v3.4.1 — CV/roles, team focuses, teaching alignment, engagement rebuild
- [x] **`roles.yml` (CV):** IPPOG UK-rep end-dated to 2017–20; removed the DarkSide Outer Detector Readout Electronics co-leader entry; reworded the ATLAS B-Physics & Light States entry ("set research strategy and oversaw operational delivery for the research group…"); Editorial Board entry re-dated to 2010– and broadened to "member and chair for ATLAS and DØ"; added "Chair, Manchester Leadership Group for the British Science Festival 2027; member, BSA BSF Steering Group" (2026–) under the UoM group. The RAL public-engagement conference confirmed already removed in v3.4.0 (the only "Rutherford Appleton" string left is an unrelated 2017 seminar in talks.yml); the 2015 IoP HEPP and 2013 YETI Durham organising entries already present in organisation.yml.
- [x] **`team.yml`:** rewrote 13 research-focus lines (Darren; Ash Ritchie-Yates; Rob Chapple; Saulė Pigulevičiūtė; Haoxiang Zhan; Andrzej Gawdzik; Stephen Menary; Agni Bethani; James Robinson; Ellen Sandford; Candice Basson; Conor Sheehan — closing the `EDIT ME`; Yi Yang). Added **Dark matter** tag to Rebecca Pickles' `worked_on`. First-letter capitalisation + trailing periods normalised to house style.
- [x] **`team/index.html`:** stray-"Now" fix — guard changed from `{% if a.now.label %}` to `{% if a.now.label != blank %}` (empty string is truthy in Liquid, so the 8 alumni with `now: {label:''}` were rendering a bare "Now").
- [x] **`supervision.yml` + `teaching/index.html`:** added Ash Ritchie-Yates to `pdra` so "Postdoctoral researchers supervised" now lists **8**, matching current+alumni postdocs on the team page. "MPhys projects" now **computed live** from team.yml MPhys entries (one project/assessment per student, splitting "X & Y" boxes) → currently **39**; `mphys_note` reduced to the spanning fragment. Examining list expanded to the full ten universities (adds Edinburgh, Sheffield, Zürich) + internal examiner at Manchester.
- [x] **`engagement/index.html` rebuilt:** Leadership roles converted to a dated `roles-list` — Associate Dean moved to top; ATLAS E&O Coordinator and IPPOG recast to past tense; five entries added (BSF 2027 chair, JBCE board, UoM Public & Civic group, New Scientist Discovery Tours, IoP/STFC PE advisory). BSF 2027 organisation surfaced high in a broadened "Public engagement & outreach" section; Media subsection added (incl. LHC Run-3 media event + Dubai Eye); the two interactive dark-matter explorers broken out under their own "Interactive tools" heading. New 2025 hero (Rob Watson 006) + a CSS-grid photo gallery (three 2025 talk shots); three small event thumbnails (Pint of Science 2018, 'Collider' exhibit 2014, RS Summer Science 2013) as wrapped `.event-fig` images beside their write-ups. DPatcolliderexhibit2014 (143×255 selfie) not used.
- [x] **Assets/CSS:** 2025 photos downscaled/compressed into `assets/images/engagement/` (hero 1800px; gallery 1400px; thumbnails native). Added `.photo-grid`, `.event-fig`, `.event-block` to `styles.css`.

### v3.4.0 — JSON-LD structured data + doc/content tidy
- [x] **New `_includes/structured-data.html`** — hand-rolled JSON-LD (consistent with the deliberate no-`jekyll-seo-tag` decision), written from the principles in hawksley.dev's "JSON-LD Explained for Personal Websites" and wired against the **real** `_config.yml` field names. Single `@graph`, shared `@id` anchors so crawlers merge nodes across pages; `Person` emitted on every page because single-page (LLM) scrapers don't merge. Emits: `WebSite` (full on home, slim elsewhere) + `Person` always; `ProfilePage` via `jsonld_type: ProfilePage` (on `/about/`); `SoftwareApplication` via a `jsonld_software:` map (on both explorers); generic `WebPage` on other non-home pages; `BlogPosting` on posts gated behind `site.enable_blog_jsonld` (OFF). Headline win is `Person.sameAs` from a curated `site.author.same_as` list (ORCID / Scholar / INSPIRE / GitHub / LinkedIn / X / Bluesky / Manchester staff page). `jobTitle` = "Professor of Particle Physics and Associate Dean"; `worksFor` University of Manchester with Wikidata/Wikipedia `sameAs`; `knowsAbout` research areas. `BreadcrumbList` omitted (short paths). Validated: all four page scenarios (home / about / explorer / generic) round-trip as valid JSON against the real config values.
- [x] **Wired** — `{% include structured-data.html %}` in `default.html` `<head>` after the OG/Twitter block; `same_as:` list + `enable_blog_jsonld: false` added to `_config.yml`; `jsonld_type` on About; `jsonld_software:` maps on both explorers. HANDOFF §6 design-decisions table gained a "Structured data (JSON-LD)" row.
- [x] **Did NOT integrate the bundled `jsonld-update.zip`** — its include read field names (`schema_type`, `schema_app_*`, per-field `author.x`/`author.manchester`) that disagreed with both its own docs and the real config, and its bundled HANDOFF/TODO were built on the pre-v3.0.0 docs. Rebuilt from principles instead; no doc regression.
- [x] **Doc trim pass** — HANDOFF §2 collapsed (removed duplicated shipped-history list + stale explorer narratives); §7 source paths corrected (versioned zip name; CV/TDR PDFs noted as not persisting); §8 resolved soft-spot removed; §9/§10 zip name fixed. TODO Done "(this session)" tags stripped; pre-v3.0.0 granular Done subsections collapsed into one terse block pointing to HANDOFF §11/§12.
- [x] **Content fixes** — removed the "UK HEP Public Engagement Conference" (Rutherford Appleton Laboratory) entry from `_data/organisation.yml` (CV organisation list now 22 entries); reworded the instrumentation vPDU hero caption in `_data/theme_heroes.yml` ("PCB shown developed by the UK team and assembled together with SiPM tile and electronics into a working photodetector at Manchester").


- [x] **15 processed portrait JPEGs** (480×480, EXIF-transposed, face-centred or tight-circle crops) added to `assets/images/people/` — 2 current members (Darren, Conner Roberts) + 13 alumni.
- [x] **Universal `silhouette.svg` fallback** — single theme-coloured SVG (warm paper bg, oxblood figure at 32% opacity); retires the per-member initials placeholder. Any entry with a missing/blank `photo:` falls back via Liquid's `default` filter, so swapping the one SVG restyles every placeholder site-wide.
- [x] **`photo:` schema extended to alumni**; alumni cards switched from a vertical flex column to a 2-col grid (`56px 1fr`) with a circular 56px `.alumnus-photo` thumbnail — same layout reused on the theme-page People pull-through (`_layouts/theme.html`). Current-member cards keep their 88px photo. HANDOFF §4 schema + §6 design rows updated.

### v3.3.0 — CV grants + roles overhaul
- [x] **Grants: per-grant £ values removed entirely** — dropped from `_data/grants.yml` AND from the `cv/index.html` template (`{{ gr.value }}` deleted), so amounts can never render again. Strapline totals corrected to "£6.2 million attributable to me / £25.5 million total grant value" + five fellowships, Breakthrough Prize (2025) and EPS HEP Prize (2013). Full list rebuilt to all 21 grants from the master CV (was 18); funder assigned (IRIS/PPGP/4IR-IAA → STFC).
- [x] **Roles regrouped to the CV-excerpt headings** — five group taxonomy replaced with: *Within international scientific collaborations* / *Within national scientific projects* / *Within funding agencies* / *Within the organisational structure of the University of Manchester*, plus kept *Professional service* and *Fellowships & prizes* (excerpt page 1 not supplied). Added: JBCE Programme Advisory Board, Member of Senate, UoM Public & Civic Engagement Group, UKRI-STFC Projects Peer Review Panel, EPS HEP Prize (2013). IPPOG moved to international collaborations. Dropped the duplicated Turing project-management role (the Turing AI grant covers it). Wording/year updates applied (work-strand lead 2021–, GridPP7 2022–24, Faculty Extended Leadership Team, PP Grants Panel reappointed 2022 / again 2025–27). 41 roles total; nothing else removed.
- [x] **Build hotfix: `HANDOFF.md` + `TODO.md` excluded from Jekyll** (`_config.yml`) — a documentation `{% if %}` example in HANDOFF was parsed as Liquid and broke the GitHub Pages build. Both docs stay in the repo (browsable) but are no longer rendered.
- [x] **Build hotfix: conference `[N attendees]` reserved-word bug** — CV template used `{{ o.size }}`; once `size:` fields were stripped, Liquid's reserved `.size` returned the hash key-count (4) for every entry. Guard switched to the non-reserved `o.attendees`; nothing renders now, and a future `attendees:` field would work correctly.

### v3.2.0 — CV refresh + About rewrite + media bios
- [x] **`roles.yml` refresh** — added **DarkSide-UK Physics Coordinator** (2026–) and **DarkSide International Advisory Board** (2025–); added **Associate Dean for Engagement** (2024–) and **Member, Faculty Leadership Team** (2024–) to the Manchester section; added **2025 Breakthrough Prize in Fundamental Physics** (co-awardee) to Fellowships; updated Turing → "2019–23 Turing / Turing AI Fellowship" and Presidential → "2020–24"; year corrections (DarkSide Editorial Board 2021–23, Outer Detector Readout 2019–22, ATLAS E&O 2022–24, DØ MC generators 2010–14, 4IR CDT 2017–25, PG Coordinator 2016–25, IPPOG 2017–24); removed the "~290k CHF/yr budget" clause; PG-coordinator student count reworded to "over 120 across the role; over 65 at any one time". **Skipped per Darren:** JBCE row and Member-of-Senate change (will check on live build).
- [x] **`grants.yml`** — DarkSide-UK 2022–25; PPRP DarkSide 2021–25 / role "PI (UoM part)"; 4IR CDT 2017–25; Senior Experimental Fellowship 2015–20. Funding values preserved.
- [x] **`organisation.yml`** — all attendee `size:` fields removed; added 4 entries (2026 + 2025 DarkSide(-UK) collaboration meetings, 2023 MPI@LHC, 2013 EW-theory VB+quarkonium workshop), each slotted into its year position.
- [x] **CV page retitled** "Leadership & service" → **"Leadership, governance & service"** (title / heading / lede / breadcrumb).
- [x] **About page rewritten** — new lede + structured body (intro, "What I work on" with four sub-areas, "Leadership, engagement and strategy", "A wider view of science"). Internal links to all relevant theme pages + /cv/ + /engagement/. Title "Professor of Particle Physics and Associate Dean for Engagement" reflected.
- [x] **Media bios refreshed** (`bios.yml`) — new short (~40 w) / medium (~85 w) / long (~225 w); long uses "led teams in the discovery of new particles" and renders multi-paragraph via `white-space: pre-line`.

### v3.1.0 — Research-theme heroes + group photo

- [x] **Theme-hero infrastructure** — new `_data/theme_heroes.yml` (schema in HANDOFF §4); `_layouts/theme.html` extended to render a hero banner above the body and a 2-col figure gallery below it; new `.theme-hero` + `.theme-figures` + `.theme-figure` rules in `assets/css/styles.css` (1-col on mobile, 2-col from 760px). Themes without a `theme_heroes.yml` entry render exactly as before.
- [x] **Dark matter theme** — hero: DarkSide-20k veto vessel during construction at LNGS (Darren in front, Dec 2023). Inline figure: Boulby Underground Laboratory.
- [x] **Instrumentation theme** — hero: underside of a DarkSide vPDU showing the gold-plated readout PCB. Inline figures: vPDU module being assembled from silicon photosensor tiles in the Manchester cleanroom; optomechanical levitating-sensor vacuum chamber and laser optics table.
- [x] **Levitating sensors theme** — hero: vacuum chamber and laser optics for the Manchester optomechanical levitated-sensor experiment (same source image as the third instrumentation figure).
- [x] **Group photo on /team/** — `assets/images/team-group-2022.jpg`. Replaces the `PLACEHOLDER — group photo` block.
- [x] **Internal versioning scheme** — `vMAJOR.MINOR.PATCH` baseline established at v3.0.0 (post-team-photos batch); this update is v3.1.0 (new theme-hero feature + first photo batch on theme pages). Version block lives in the README.md header as an HTML comment; not displayed on the rendered site. HANDOFF §1 references it.

### Pre-v3.0.0 — explorers, pedagogy, and core site (earlier sessions)

These predate the v3.x versioning baseline. Terse summaries only; full
architecture for both explorers lives in **HANDOFF §11 / §12**.

- **Recoil explorer built** — single-file page, three panes (velocity / recoil
  spectrum / σ-mass), beginner-advanced toggle, He/Si/Ar/Ge/Xe targets, flux
  headline, mass-matching meter, diagnostic, Poisson "run the experiment" toy.
  erf selection-efficiency turn-on folded into the rate integral; validated to
  within ~2.3× of published LZ (10 GeV–1 TeV, K_RATE = 20). **HANDOFF §12.**
- **Sensitivity explorer built** — two-channel counting analysis (S1+S2 with
  PSD + S2-only with Migdal, best wins per mass), two threshold sliders,
  published reference curves, liquid-argon ν fog, depth-dependent cosmogenics,
  two-pane plot with mobile swipe-snap. Calibrated to DS-50 and LZ minima.
  **HANDOFF §11.**
- **Explorer reference set + 7-regime classifiers** — CRESST-III, PandaX-4T
  low-DM, and LZ light-DM reference curves added (full 40 MeV–10 TeV envelope);
  both explorers' status/commentary rewritten to a shared 7-regime mass
  classifier; sub-40 MeV reframed as "no clean elastic SI DD limit" (not
  "invisible/excluded"); `100vh`→`100dvh` iOS fix. **HANDOFF §11 table is the
  single source of truth for which experiment owns which mass band.**
- **Pedagogy & accessibility pass on both explorers** — guided entry-point
  panel, per-control disclosures, "what does this plot show?", control
  cross-reference table, Model & assumptions accordion, WIMP-is-shorthand
  aside, significance-aware Poisson toy with 3σ/5σ tiers, `aria-live` regions,
  SVG `<title>`/`<desc>`, keyboard nav, rAF-throttled redraws.
- **Publication explainers spot-checked** — all 27 primary entries with arXiv
  IDs refined against published abstracts (50–110 w, concrete data). Two
  no-arXiv entries (`p-menary-density-neurips-2020`, `p-atlas-jinst-2008`)
  left as-is. `explainer_image` + `explainer_caption` figure support verified;
  two worked examples shipped.
- **Core site + infrastructure** — hamburger nav, hand-rolled OG/Twitter tags
  (jekyll-seo-tag removed), favicons, jekyll-sitemap, themed 404, og-card,
  populated `_config.yml` author fields (incl. Bluesky; GitLab intentionally
  empty). Publications (4 sections), Talks (440), News, Team (12 + 51), /join
  mirrored from DM Manchester. **Active design decisions in HANDOFF §6.**
