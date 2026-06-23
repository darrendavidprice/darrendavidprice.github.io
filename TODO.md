# darrenprice.github.io — Site To-Do List

Add this file to project knowledge. Update it as items are completed or added.
Repo: `darrendavidprice.github.io`

---

## Content quality

- [x] **Spot-check publication explainers** *(Medium — done across 3 batches this session)*
  All 27 primary-section entries with arXiv IDs refined against published abstracts.
  Length normalised to 50–110 words; concrete data (luminosities, cross-sections,
  significances, theory comparisons) added per paper. One title correction on the
  EW Wjj paper (was wrongly "8 TeV only"). **Two entries cannot use this workflow
  and remain at their original length:** `p-menary-density-neurips-2020` (NeurIPS
  workshop, no arXiv) and `p-atlas-jinst-2008` (foundational ATLAS detector paper,
  no arXiv). Both need manual treatment if a richer explainer is wanted — the
  current 30 w / 22 w wording is acceptable as-is.

- [ ] **Add explainer figures (`explainer_image` + `explainer_caption`) where useful** *(optional, Quick per entry)*
  Functionality verified end-to-end this session; two worked examples shipped
  (`p-ds50-lowmass-wimp-2023` PNG plot, `p-ssww-majorana` SVG diagram). The
  schema, template and CSS all support it — adding a figure to any other primary
  entry is just two YAML fields and an asset drop into
  `assets/images/explainers/`. README "Explainer figures" subsection has full
  usage + an optional float-wrap CSS swap if the parallel-column grid layout
  proves limiting.

- [ ] **Curate talk types and tags in `talks.yml`** *(Medium)*
  440 entries were semi-automatically tagged. Some `type:` (invited / seminar / public)
  and tag assignments may be wrong; affects filtering and theme page pull-through.

- [ ] **Fill Conor Sheehan's alumni research focus** *(Quick — needs one line from Darren)*
  `_data/team.yml` still carries `focus: EDIT ME — research focus to add.` for Conor
  Sheehan. More visible now that his card shows a real portrait (v3.0.0). Replace with
  a one-line research focus.

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

- [x] **Performance / load-time audit on both explorers** *(this session)*
  Ran headless measurements (Playwright, 8-run averages). Both pages excellent: FCP 230-300ms, zero cumulative layout shift, 1 resource (everything inlined), ~500 DOM nodes, ~10MB JS heap, slider drag at ~58fps median with the rAF throttle coalescing 60 events into ~32 frames. The single concrete optimisation that came out of the audit was wrapping the initial `refresh()` in `requestAnimationFrame` so first paint can happen with the empty SVG skeletons before the (~80-125ms) reference-curve drawing — small win on recoil (FCP −8ms, long-task 93ms→75ms), neutral on sensitivity. Both kept.

- [x] **Cross-browser / cross-device QA on both explorers** *(this session — partial: Chromium runtime + static cross-engine scan)*
  Ran a headless Chromium QA harness across 3 viewports (desktop 1280×800, tablet 768×1024, mobile 390×844) on both explorers — 6 scenarios total. **All pass**: zero console errors, zero JavaScript exceptions, zero horizontal overflow at any viewport, all sliders respond to programmatic input, the recoil mode-toggle correctly reveals adv-only controls + σ-mass pane, the sensitivity explorer's scroll-snap pane swap measures exactly one pane width on mobile (324px = clientWidth = half of 648px scrollWidth). Fresh-load screenshots confirm beginner mode on recoil shows only velocity + recoil panes (σ-mass hidden, all 8 adv-only control groups display:none).

  Direct unit-tested the new 7-regime `statusText` classifier with synthetic minPt values landing in each regime — all 7 route to the correct world-leader benchmark (CRESST-III / DS-50 Migdal / PandaX-4T / LZ light-DM / LZ classic / heavy-WIMP).

  Static cross-engine compatibility scan flagged zero high-severity risks across both explorers + the global CSS + the three JS modules. **One real polish item fixed** in this session: `max-height: calc(100vh - Nrem)` on `.plot-card` (8 occurrences across both explorers) replaced with `100dvh` so the sticky plot sits cleanly inside iOS Safari's variable viewport (URL bar showing or hidden). `100dvh` is universally supported since Safari 15.4 / Chrome 108 / Firefox 101. `backdrop-filter` flagged as low; already paired with `-webkit-backdrop-filter` so non-issue.

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

## Done ✓

### v3.0.0 — Team portraits + silhouette fallback
- [x] **15 processed portrait JPEGs** (480×480, EXIF-transposed, face-centred or tight-circle crops) added to `assets/images/people/` — 2 current members (Darren, Conner Roberts) + 13 alumni.
- [x] **Universal `silhouette.svg` fallback** — single theme-coloured SVG (warm paper bg, oxblood figure at 32% opacity); retires the per-member initials placeholder. Any entry with a missing/blank `photo:` falls back via Liquid's `default` filter, so swapping the one SVG restyles every placeholder site-wide.
- [x] **`photo:` schema extended to alumni**; alumni cards switched from a vertical flex column to a 2-col grid (`56px 1fr`) with a circular 56px `.alumnus-photo` thumbnail — same layout reused on the theme-page People pull-through (`_layouts/theme.html`). Current-member cards keep their 88px photo. HANDOFF §4 schema + §6 design rows updated.

### v3.3.0 — CV grants + roles overhaul (this session)
- [x] **Grants: per-grant £ values removed entirely** — dropped from `_data/grants.yml` AND from the `cv/index.html` template (`{{ gr.value }}` deleted), so amounts can never render again. Strapline totals corrected to "£6.2 million attributable to me / £25.5 million total grant value" + five fellowships, Breakthrough Prize (2025) and EPS HEP Prize (2013). Full list rebuilt to all 21 grants from the master CV (was 18); funder assigned (IRIS/PPGP/4IR-IAA → STFC).
- [x] **Roles regrouped to the CV-excerpt headings** — five group taxonomy replaced with: *Within international scientific collaborations* / *Within national scientific projects* / *Within funding agencies* / *Within the organisational structure of the University of Manchester*, plus kept *Professional service* and *Fellowships & prizes* (excerpt page 1 not supplied). Added: JBCE Programme Advisory Board, Member of Senate, UoM Public & Civic Engagement Group, UKRI-STFC Projects Peer Review Panel, EPS HEP Prize (2013). IPPOG moved to international collaborations. Dropped the duplicated Turing project-management role (the Turing AI grant covers it). Wording/year updates applied (work-strand lead 2021–, GridPP7 2022–24, Faculty Extended Leadership Team, PP Grants Panel reappointed 2022 / again 2025–27). 41 roles total; nothing else removed.
- [x] **Build hotfix: `HANDOFF.md` + `TODO.md` excluded from Jekyll** (`_config.yml`) — a documentation `{% if %}` example in HANDOFF was parsed as Liquid and broke the GitHub Pages build. Both docs stay in the repo (browsable) but are no longer rendered.
- [x] **Build hotfix: conference `[N attendees]` reserved-word bug** — CV template used `{{ o.size }}`; once `size:` fields were stripped, Liquid's reserved `.size` returned the hash key-count (4) for every entry. Guard switched to the non-reserved `o.attendees`; nothing renders now, and a future `attendees:` field would work correctly.

### v3.2.0 — CV refresh + About rewrite + media bios (this session)
- [x] **`roles.yml` refresh** — added **DarkSide-UK Physics Coordinator** (2026–) and **DarkSide International Advisory Board** (2025–); added **Associate Dean for Engagement** (2024–) and **Member, Faculty Leadership Team** (2024–) to the Manchester section; added **2025 Breakthrough Prize in Fundamental Physics** (co-awardee) to Fellowships; updated Turing → "2019–23 Turing / Turing AI Fellowship" and Presidential → "2020–24"; year corrections (DarkSide Editorial Board 2021–23, Outer Detector Readout 2019–22, ATLAS E&O 2022–24, DØ MC generators 2010–14, 4IR CDT 2017–25, PG Coordinator 2016–25, IPPOG 2017–24); removed the "~290k CHF/yr budget" clause; PG-coordinator student count reworded to "over 120 across the role; over 65 at any one time". **Skipped per Darren:** JBCE row and Member-of-Senate change (will check on live build).
- [x] **`grants.yml`** — DarkSide-UK 2022–25; PPRP DarkSide 2021–25 / role "PI (UoM part)"; 4IR CDT 2017–25; Senior Experimental Fellowship 2015–20. Funding values preserved.
- [x] **`organisation.yml`** — all attendee `size:` fields removed; added 4 entries (2026 + 2025 DarkSide(-UK) collaboration meetings, 2023 MPI@LHC, 2013 EW-theory VB+quarkonium workshop), each slotted into its year position.
- [x] **CV page retitled** "Leadership & service" → **"Leadership, governance & service"** (title / heading / lede / breadcrumb).
- [x] **About page rewritten** — new lede + structured body (intro, "What I work on" with four sub-areas, "Leadership, engagement and strategy", "A wider view of science"). Internal links to all relevant theme pages + /cv/ + /engagement/. Title "Professor of Particle Physics and Associate Dean for Engagement" reflected.
- [x] **Media bios refreshed** (`bios.yml`) — new short (~40 w) / medium (~85 w) / long (~225 w); long uses "led teams in the discovery of new particles" and renders multi-paragraph via `white-space: pre-line`.

### v3.1.0 — Research-theme heroes + group photo (this session)

- [x] **Theme-hero infrastructure** — new `_data/theme_heroes.yml` (schema in HANDOFF §4); `_layouts/theme.html` extended to render a hero banner above the body and a 2-col figure gallery below it; new `.theme-hero` + `.theme-figures` + `.theme-figure` rules in `assets/css/styles.css` (1-col on mobile, 2-col from 760px). Themes without a `theme_heroes.yml` entry render exactly as before.
- [x] **Dark matter theme** — hero: DarkSide-20k veto vessel during construction at LNGS (Darren in front, Dec 2023). Inline figure: Boulby Underground Laboratory.
- [x] **Instrumentation theme** — hero: underside of a DarkSide vPDU showing the gold-plated readout PCB. Inline figures: vPDU module being assembled from silicon photosensor tiles in the Manchester cleanroom; optomechanical levitating-sensor vacuum chamber and laser optics table.
- [x] **Levitating sensors theme** — hero: vacuum chamber and laser optics for the Manchester optomechanical levitated-sensor experiment (same source image as the third instrumentation figure).
- [x] **Group photo on /team/** — `assets/images/team-group-2022.jpg`. Replaces the `PLACEHOLDER — group photo` block.
- [x] **Internal versioning scheme** — `vMAJOR.MINOR.PATCH` baseline established at v3.0.0 (post-team-photos batch); this update is v3.1.0 (new theme-hero feature + first photo batch on theme pages). Version block lives in the README.md header as an HTML comment; not displayed on the rendered site. HANDOFF §1 references it.

### Pedagogy & accessibility pass on both explorers (this session)
- [x] **"Try these three things first" guided entry-point panel** at the top of both explorers — three concrete slider moves a non-expert can make first
- [x] **Per-control "How this control works" disclosures** beneath each slider/toggle (4 on the recoil explorer's beginner controls + 6 on the sensitivity explorer's controls)
- [x] **"What does this plot show?" disclosure** under each plot card; body updates as the user swipes between panes on mobile
- [x] **"What each control changes" cross-reference table** on both explorers — glance-table mapping each slider to which part of the physics it moves
- [x] **Collapsible "Model & assumptions" accordion** replacing the previous dense italic disclaimer on both pages (5 sections per explorer: physics model used / detector acceptance / semi-empirical normalisation / what this does not include / why real analyses differ)
- [x] **WIMP-is-shorthand aside** near the relevant control on each page, acknowledging the slider extends well outside the canonical thermal-relic WIMP range
- [x] **"Near the ν-fog" preset** added to the recoil explorer (quiet Xe at 30 GeV with σ near the ν-floor)
- [x] **Poisson toy logic overhauled** on the recoil explorer: replaces "is this a fluctuation?" framing with significance-based verdicts. Computes Z = (n_obs − n_bg) / √n_bg, gated by a minimum-excess-events requirement so a "5σ" off near-zero background doesn't claim discovery off 2 events. Verdict tiers at Z = 3σ ("evidence") and Z = 5σ ("discovery"), each with explicit reminders that even a 5σ excess only says "*something* is producing events" — WIMP identification needs spectral-shape information the counting toy doesn't have. 100× ensemble summary tallies how many runs cross each tier and reports the expected Z. New "What does 3σ / 5σ mean?" disclosure next to the toy
- [x] **"draws one Poisson-fluctuated year"** → "one experiment with this exposure" — more accurate when exposure is 200 t·yr (ChatGPT review point)
- [x] **/A divisor in `dRdER` documented in-code** as the per-detector-mass conversion (N_T = N_A/(A·m_u) target nuclei per kg), absorbed into K_RATE's empirical normalisation — closing a question raised in external review
- [x] **Accessibility:** `aria-live="polite"` on every dynamic region (flux readout, readout chips, status panel, toy expectation, toy result, pane legend); `<title>` and `<desc>` on every SVG plot; arrow-key + roving-tabindex keyboard navigation on the target and form-factor radiogroups; `<noscript>` fallback message; visible swipe-pane labels on mobile that update as you swipe
- [x] **Performance:** all slider drag events route through a `requestAnimationFrame`-throttled `scheduleRefresh()` so multi-handler cascades coalesce into one redraw per animation frame — smoother on phones, indistinguishable on fast desktops

### Recoil explorer build & earlier-session work
Built `/research/dark-matter/recoil-explorer/` as a single-file HTML page — three panes (velocity, recoil spectrum, σ-mass), beginner/advanced toggle, He/Si/Ar/Ge/Xe targets, flux-headline / readout-chips / mass-matching-meter / diagnostic / Poisson "run the experiment" toy. Selection-efficiency turn-on ε(E) folded into rate integral via erf form (validated to within 2.3× of published LZ from 10 GeV to 1 TeV, K_RATE = 20 anchored on LZ @ 40 GeV = 2.1e-48). Recoil-pane y-axis locked to a Mchi/v0/vesc-independent reference, beginner-mode threshold drags the halfway energy with it. Colour semantics on both spectra (above = green, below = red). σ-mass pane trimmed to ≥5 GeV with low-mass note. Halo speed v0/v_esc carry their measurement provenance. **Full architecture in HANDOFF §12.**

### Sensitivity explorer build & earlier-session work
Two-channel counting analysis (S1+S2 with PSD + S2-only with Migdal — best wins at each mass), two threshold sliders, real published references (DS-50 S1+S2, DS-50 S2+Migdal, LZ 4.2 t·yr, DS-20k S1+S2, DS-20k S2+Migdal 1yr/10yr), liquid-argon ν fog from O'Hare 2021, coherent-ν background term, depth-dependent cosmogenic attenuation, two-pane plot split with sticky full-width plot, mobile swipe-snap with dot indicator, in-figure labels (no legend), full slider-aware contextual annotations, regime-aware status panel with feasibility line and realism warnings. Calibrated to DS-50 (1.15e-44 @ 100 GeV) and LZ (2.1e-48 minimum). **Full architecture in HANDOFF §11.**

### Site infrastructure (earlier sessions)
Hamburger mobile nav, hand-rolled OG + Twitter/X meta tags (jekyll-seo-tag removed), favicons (ico + svg + apple-touch-icon), jekyll-sitemap plugin, themed 404, og-card (1200×630), `.gitignore`, repo URL set to `darrendavidprice.github.io`. Research theme pages with People pull-through, alumni tiled-card grid, Team page populated (12 + 51), /join structure mirrored from DM Manchester. Publications (81 entries, 4 CV-style sections, tags + explainers + DOI links), Talks (440 entries with all links), News (with optional explainer + external link). **Active design decisions live in HANDOFF §6.**

### Site infrastructure (this session)
- [x] **`_config.yml` author fields populated** — ORCID (`0000-0003-2750-9977`), Google Scholar (`https://scholar.google.co.uk/citations?user=PrWdd5cAAAAJ`), GitHub/X/email/phone/INSPIRE confirmed.
- [x] **Bluesky added** (`darrenprice.bsky.social`) — new `bluesky:` field on `site.author`, rendered in `_includes/socials.html` after X.
- [x] **GitLab field deliberately left empty** — Darren's GitLab is the CERN instance (`dprice`) behind SSO, which would render a broken link for public visitors. Field commented in `_config.yml` so it stays out of the rendered socials list. Re-enable by setting `gitlab: "https://gitlab.cern.ch/dprice"` if access policy changes.

### Sensitivity explorer (this session)
- [x] **CRESST-III, PandaX-4T, and LZ light-DM reference curves added** to the sensitivity explorer. The plot now shows the complete leading-experiment envelope from 40 MeV to 10 TeV: CRESST-III (sub-200 MeV cryogenic, arXiv:2405.06527 + arXiv:1904.00498), DS-50 Migdal (0.2–2.5 GeV), PandaX-4T low-DM (2.5–5 GeV, arXiv:2507.11930), LZ light-DM 5.7 t·yr WS2025 (3–9 GeV transition, arXiv:2512.08065), LZ classic 4.2 t·yr (9 GeV+). Distinct colours (purple CRESST, indigo PandaX, dashed teal LZ light-DM), in-figure labels, accessibility descs and Model & Assumptions disclaimer all updated.
- [x] **Recoil explorer ctx-mass / ctx-xsec rewritten** with a 7-regime mass classifier (sub-40 MeV / 40–200 MeV / 0.2–2.5 GeV / 2.5–5 GeV / 5–9 GeV / 9 GeV–1 TeV / >1 TeV) per Darren's binning. The sub-40 MeV regime explicitly says "no clean elastic SI direct-detection limit — constraints depend on non-standard assumptions" rather than the previous "invisible / excluded" misframing. Each regime cites its leading experiment(s) in the verdict text; σ bands are per-regime rather than fixed.

### Sensitivity explorer + docs (this session)
- [x] **`statusText` rewritten with a 7-regime mass classifier** to match the recoil explorer's binning. Replaces the previous binary `Mmin < 5 GeV` low/high pivot with seven branches, each benchmarking against the right world-leader: <40 MeV declines to benchmark; 40–200 MeV pivots at 100 MeV against `REF_CRESST_III`; 0.2–2.5 GeV pivots at 1 GeV against `REF_DS50_S2` / `REF_DS20K_S2[_10YR]`; 2.5–5 GeV pivots at 3 GeV against `REF_PANDAX4T_LDM` (and `REF_LZ_LIGHT` as fall-through); 5–9 GeV pivots at 7 GeV against `REF_LZ_LIGHT` with shared-leadership note; 9 GeV–1 TeV uses user's `Mmin` against `REF_LZ` / `REF_DS50_S1S2` / `REF_DS20K` ("LZ 4.2 t·yr" wording, was "LZ 2024"); >1 TeV reports the heavy-WIMP regime with the n=ρ/M flux-suppression caveat. Each regime checks the ν-fog floor first. Unit-tested by calling `statusText` directly from headless Chromium with synthetic minPt values landing in each regime — all seven route correctly.
- [x] **HANDOFF §11 reference-curve table updated** to include `REF_CRESST_III`, `REF_PANDAX4T_LDM`, `REF_LZ_LIGHT` with sources. Added a "World-leading SI direct-detection limit by mass band" table aligned with the `statusText` regime classifier — single source of truth for which experiment owns which band. Status-panel description in §11 rewritten for the new 7-regime logic. Editing tip for "adding a reference curve" extended to remind future edits to keep the table, the `statusText` branches, and the in-figure labels mutually consistent.
- [x] **README.md publications schema corrected** — was "3 sections: primary / editorial / proceedings", now "4 sections: primary / convener / editorial / proceedings" (table row + prose paragraph). Sensitivity-explorer description updated to mention CRESST-III, PandaX-4T low-DM, and LZ light-DM in the reference list, and the 7-regime status panel.
- [x] **iOS Safari polish: `100vh` → `100dvh`** on sticky `.plot-card` max-height in both explorers (4 occurrences each, 8 total). Avoids the plot card overflowing iOS Safari's URL-bar–dependent viewport. `100dvh` is universally supported on Safari 15.4+ / Chrome 108+ / Firefox 101+ — fine.

### Publication explainers (this session)
- [x] **Spot-check pass complete for all 27 primary-section papers with arXiv IDs**, in three batches of 10 / 10 / 7 covering 2023 → 2009. Each refinement based on the published abstract (fetched via `web_search` + `web_fetch`), aiming for 50–110 words with concrete data (luminosities, cross-sections, significances, theory comparisons) over the prior generic framing. One title correction along the way (`p-atlas-ew-wjj-agc-2017` — paper actually combines 7+8 TeV, not "8 TeV only").
- [x] **Two primary entries deliberately left untouched** because the arXiv-fetch workflow can't apply: `p-menary-density-neurips-2020` (no arXiv, NeurIPS workshop) and `p-atlas-jinst-2008` (no arXiv, the foundational ATLAS detector paper). Their existing 30 w / 22 w wordings are acceptable; refining them would need manual input from Darren.

### Explainer figure feature (this session)
- [x] **Verified `explainer_image` + `explainer_caption` end-to-end** — schema, `_includes/pub-entry.html` template and `.explainer-body.has-fig` CSS already supported this; zero publications used it so it had never been tested in production. Confirmed via a headless render against the real CSS.
- [x] **Two worked examples shipped:** `p-ds50-lowmass-wimp-2023` (matplotlib PNG plot of the 2023-vs-2018 factor-of-ten reach gain, theme palette) and `p-ssww-majorana` (hand-rolled SVG Feynman-style diagram of the ssWW Majorana topology). Assets live in `assets/images/explainers/`.
- [x] **README "Explainer figures" subsection added** — covers the YAML usage, the parallel-column grid layout behaviour (≥620 px side-by-side, stacks below), and a drop-in CSS-float refactor option (3 lines of CSS) for swapping to text-wrap-around-figure if the parallel-grid layout proves limiting later.
