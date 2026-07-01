# darrendavidprice.github.io

<!--
================================================================
 SITE INTERNAL VERSION — v3.4.2   (2026-06)
 Not displayed on the rendered site. Bump on each shipped batch
 so chats / zip files can be reconciled across sessions:
   MAJOR  — site-wide restructure, theme overhaul, breaking schema
   MINOR  — new features (e.g. theme heroes, new data file,
            new page types, accessibility / SEO landings)
   PATCH  — content corrections, small visual fixes, typo passes
 History (top = newest):
   v3.4.0  JSON-LD structured data (SEO + entity disambiguation).
           New hand-rolled _includes/structured-data.html (single
           @graph, shared @id anchors), included in default.html <head>
           after the OG/Twitter block. WebSite (full on home, slim
           elsewhere) + Person on every page; ProfilePage on /about/
           (jsonld_type front matter); SoftwareApplication on both
           explorers (jsonld_software front matter); generic WebPage
           elsewhere; BlogPosting gated behind enable_blog_jsonld
           (OFF until real Writing posts). Person.sameAs driven by a
           curated site.author.same_as list (ORCID/Scholar/INSPIRE/
           GitHub/LinkedIn/X/Bluesky/Manchester staff page). Job title
           "Professor of Particle Physics and Associate Dean".
           BreadcrumbList intentionally omitted (paths already short).
           Also in this batch: HANDOFF.md/TODO.md trimmed of stale
           "this session" tags + duplicated history; removed the UK HEP
           Public Engagement Conference (RAL) from the CV organisation
           list; reworded the instrumentation vPDU hero caption.
   v3.3.0  CV grants + roles overhaul. Grants: per-grant £ values
           removed from data AND template (never displayed again),
           strapline totals corrected to £6.2M attributable / £25.5M
           total + Breakthrough (2025) & EPS (2013) prizes, full
           21-grant list. Roles regrouped to CV-excerpt headings
           (international collaborations / national projects / funding
           agencies / University of Manchester) plus Professional
           service and Fellowships & prizes; added JBCE board, Senate,
           Public & Civic Engagement Group, UKRI-STFC Projects Peer
           Review Panel, EPS Prize; IPPOG moved to international;
           dropped the duplicated Turing project-management role.
           Bundles two build hotfixes: exclude HANDOFF.md/TODO.md from
           Jekyll (Liquid example broke the GitHub Pages build), and
           the conference [N attendees] reserved-word fix (o.size →
           o.attendees).
   v3.2.0  CV refresh (roles/grants/organisation: new DarkSide
           coordinator + IAB roles, Associate Dean for Engagement,
           Faculty Leadership Team, 2025 Breakthrough Prize, year
           and funding corrections, attendee sizes removed); CV page
           retitled "Leadership, governance & service"; About page
           rewritten with new structure + internal links; media bios
           (short/medium/long) refreshed.
   v3.1.0  Research-theme hero banners + figure galleries;
           group photo on /team/; theme_heroes.yml data file
           and theme.html layout updates.
   v3.0.0  Baseline — post-team-photos batch (current+alumni
           portraits, silhouette fallback, alumni focus field,
           CV refresh, accessibility + print + OG polish).
================================================================
-->

Source for the personal academic website of **Darren Price** — particle
physicist, University of Manchester. Built with **Jekyll** and data files,
served by **GitHub Pages**. Editorial "Manuscript" theme (warm paper, oxblood
ink, monospace metadata; Fraunces + Newsreader + IBM Plex Mono).

> **Repo name.** For a GitHub *user* site this repository must be named
> exactly `<your-github-username>.github.io`. Confirm the username matches
> before the first push, and update `url:` in `_config.yml` if needed.
>
> **Ruby/Bundler are managed locally and not committed.** There is
> deliberately no `Gemfile` or `.ruby-version` in this repo — add your own
> locally (Ruby 3.1.x is the smoothest with the `github-pages` gem; see notes
> below). GitHub Pages builds server-side regardless.

---

## How content works

Almost everything is driven by YAML **data files** in `_data/`. Each has a
comment header explaining its fields, and most contain clearly-marked
`EXAMPLE`/dummy entries showing the pattern.

| File | Drives |
|------|--------|
| `publications.yml` | Publications (4 sections: primary / convener / editorial / proceedings) + theme pages + homepage |
| `talks.yml`        | Presentations + theme pages + homepage |
| `news.yml`         | News & achievements + homepage + theme pages |
| `team.yml`         | Team page (current photo-cards + alumni) |
| `grants.yml`, `roles.yml`, `organisation.yml` | CV / Leadership, governance & service |
| `supervision.yml`  | Teaching |
| `bios.yml`         | Copy-able biographies on About |
| `themes.yml`       | The eight research themes |
| `tags.yml`         | Canonical tag list (filters + chips) |

Blog posts live in `_posts/` as Markdown (the **Writing** section).

### Tags & themes

Tags in `tags.yml` **compose freely** — a paper can carry several. The first
eight tags are also **themes** (page under `research/<id>/`); the rest are tags
only. Per paper/talk the tags render as inline chips and drive the filters.

### Publications

Four CV-style sections — *primary contributions · convener · editorial-board ·
conference results* — that hide when a topic filter empties them. Per entry:
badge, title, inline tag chips, the journal text linking to the DOI, plus
arXiv, INSPIRE, a PDF icon (defaults to the arXiv PDF), and any data/press
links. Impact explainers appear on **primary-author** papers only. Citation
counts load live from INSPIRE-HEP via `assets/js/citations.js`.

#### Explainer figures (optional, primary section)

A primary-section entry's `explainer` body can carry an optional left-justified
figure with caption. Two extra fields on the entry:

```yaml
explainer_image: /assets/images/explainers/some-paper-fig.png
explainer_caption: >-
  Italic muted caption that sits directly below the figure.
```

The image path is resolved via Jekyll's `relative_url`, accepts PNG / JPG / SVG,
and the figure gets a 1 px rule border and `loading="lazy"` automatically.
Worked examples live on `p-ds50-lowmass-wimp-2023` (PNG plot) and
`p-ssww-majorana` (SVG diagram) in `_data/publications.yml`; the source assets
are in `assets/images/explainers/`.

**Layout behaviour.** When `explainer_image` is set, the explainer body
switches from one column to a two-column CSS grid (`0.8fr 1fr`) at viewport
widths ≥ 620 px — figure on the left, text on the right, never wrapping under
each other. Below 620 px both stack vertically (figure first). Definitions live
on `.explainer-body` and `.explainer-body.has-fig` in `assets/css/styles.css`.

**Refactor option — text wrap under figure.** If you'd rather have the
explainer text *wrap around and under* a tall portrait figure (a CSS-float
layout instead of the parallel-column grid), swap the two rules above for:

```css
.explainer-body { padding: 1rem; background: var(--bg-elevated); border: 1px solid var(--rule); margin-top: 0.75rem; }
.explainer-body.has-fig .explainer-fig { float: left; width: 40%; margin: 0 1rem 0.5rem 0; }
.explainer-body::after { content: ""; display: block; clear: both; }
```

Trade-off: float wraps text under the figure (good for portrait images and
short captions, less predictable for long explainers); the current grid
layout keeps figure and text in parallel columns (predictable but leaves
whitespace when the two sides differ a lot in length).

### Presentations

Full record, filterable by **type** and **topic**. Working-meeting (`internal`)
talks are **hidden by default**. Titles link to an agenda where set; a PDF icon
links to slides where set. Type/topic tags were auto-derived and can be curated
in `talks.yml`.

### Writing (blog)

Markdown posts in `_posts/` (`layout: post`). The index at `/writing/` is
tag-filterable; posts have long-form typography, stylised oversized-quote
blockquotes, a `{% raw %}{% include pullquote.html text="…" %}{% endraw %}` for
pull-quotes, prev/next nav, and an RSS/Atom feed at `/feed.xml` (jekyll-feed).
"Latest writing" shows on the homepage and in the footer.

## Interactive research pages

Two self-contained HTML/JS pedagogical tools live under `research/dark-matter/`:

### Sensitivity explorer (`/research/dark-matter/sensitivity-explorer/`)
*"How do we hunt for dark matter?"* — build your experiment from threshold,
exposure, background and depth, see the recovered 90% C.L. limit move against
published references (CRESST-III, DS-50 S1+S2 and S2+Migdal, PandaX-4T low-DM
S2-only, LZ light-DM WS2025, LZ classic 4.2 t·yr, DS-20k S1+S2, DS-20k
S2+Migdal 1yr/10yr) and the liquid-argon neutrino fog. Two-pane plot (low mass
40 MeV–5 GeV / high mass 1 GeV–10 TeV) with mobile swipe-snap; calibrated so
DS-50 and LZ presets reproduce published minima. Status panel runs a 7-regime
mass classifier and benchmarks the user curve against the world-leading
result in each band.

### Recoil explorer (`/research/dark-matter/recoil-explorer/`)
*"What does dark matter look like in a detector?"* — companion to the
sensitivity explorer, pointed the other way: given a WIMP candidate (mass,
cross-section, target, threshold, halo), show the lab-frame velocity
distribution, the recoil-energy spectrum dR/dE, the detector acceptance
ε(E) turn-on, and a Poisson "run the experiment" toy that draws single
years and 100-year ensembles. Significance-aware verdicts: every outcome
reports the observed Z = S/√B with a minimum-excess gate (a "5σ" off 0.01
expected background needs at least 5 real excess events to count), and
distinguishes a *significant excess of events* from *WIMP identification* —
the latter needs spectral-shape information the counting toy doesn't have.
Per-target acceptance baselines load automatically in beginner mode;
advanced mode exposes the three free parameters of ε(E) plus ρ₀, v₀, v_esc
and the Helm form-factor toggle, and unlocks the σ–mass placement pane.

### Pedagogy and accessibility, both explorers

Both pages share a common set of pedagogical scaffolding and accessibility
features, layered consistently:

- **"Try these three things first"** entry-point panel above each explorer
  with three guided steps a non-expert can walk through.
- **Per-control "How this control works" disclosures** (`<details>`) beneath
  each slider/toggle, opening a short physics paragraph for the curious without
  cluttering the default view.
- **"What does this plot show?" disclosure** beneath each plot card; the body
  updates as the user swipes between panes on mobile.
- **"What each control changes" cross-reference table** below the live readout —
  one-line per control mapping slider to physics effect.
- **"WIMP is shorthand here"** aside near the relevant control on each page,
  acknowledging the term covers a much wider mass range than the canonical
  thermal-relic WIMP.
- **Collapsible "Model & assumptions" accordion** at the foot of each page,
  replacing the previous dense italic disclaimer with separately-titled
  sections (physics model used / detector acceptance / semi-empirical
  normalisation / what this does not include / why real analyses differ).
- **Accessibility:** `aria-live="polite"` on every dynamic region (flux
  readout, readout chips, status panel, toy result, pane legend); `<title>`
  and `<desc>` on every SVG plot; arrow-key + roving-tabindex keyboard
  navigation on the target and form-factor radiogroups; `<noscript>` fallback
  message; visible swipe-pane labels on mobile.
- **Performance:** all slider drag events route through a
  `requestAnimationFrame`-throttled `scheduleRefresh()` so multi-handler
  cascades coalesce into one redraw per animation frame.

## Theme / styling

All design is in `assets/css/styles.css`; retheme via the `:root` variables at
the top. Fonts are set there and in the `<link>` in `_layouts/default.html`.

## Local preview

Add a `Gemfile` containing:

```ruby
source "https://rubygems.org"
gem "github-pages", group: :jekyll_plugins
gem "webrick", "~> 1.8"
```

then (Ruby 3.1.x recommended for the github-pages gem):

```sh
bundle install
bundle exec jekyll serve --livereload
```

## Deployment

Public repo named `<username>.github.io` → push to `main` → *Settings → Pages →
Deploy from a branch → `main` / `/ (root)`*. Custom domain later via `CNAME`.

## License

Template (HTML/CSS) under MIT — see `LICENSE`. Content © Darren Price.
