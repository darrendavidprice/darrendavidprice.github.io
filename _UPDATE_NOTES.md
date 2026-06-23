# Update v3.3.0 — CV grants + roles overhaul (partial zip)

Apply from your repo root with:  unzip -o ~/Downloads/darrendavidprice-site-v3.3.0.zip

## Files in this zip and where they go
- cv/index.html          -> cv/index.html            (replace)
- _data/grants.yml       -> _data/grants.yml          (replace)
- _data/roles.yml        -> _data/roles.yml           (replace)
- README.md              -> README.md                 (replace; version bump only)
- HANDOFF.md             -> HANDOFF.md                 (replace; version line only)
- TODO.md                -> TODO.md                    (replace; Done block added)

NOTE: _config.yml is NOT included — the HANDOFF/TODO exclude fix you already
committed is unchanged, and leaving it out avoids clobbering any local-only
`repository:` line.

## What changed
GRANTS
- Per-grant £ values removed from the data AND the template — amounts can never display again.
- Strapline corrected: £6.2M attributable to me / £25.5M total value + 5 fellowships,
  Breakthrough Prize (2025), EPS HEP Prize (2013).
- Full 21-grant list (was 18).

ROLES (regrouped to your CV-excerpt headings)
- Within international scientific collaborations / national scientific projects /
  funding agencies / the University of Manchester, plus Professional service and
  Fellowships & prizes.
- Added: JBCE board, Member of Senate, Public & Civic Engagement Group,
  UKRI-STFC Projects Peer Review Panel, EPS Prize (2013).
- IPPOG moved to international. Turing project-management role dropped (grant covers it).
- Year/wording updates: work-strand 2021–, GridPP7 2022–24, Faculty Extended
  Leadership Team, PP Grants Panel reappointed 2022 / again 2025–27.
- 41 roles total; nothing else removed.

BUILD HOTFIXES folded in
- cv/index.html also carries the [N attendees] reserved-word fix (o.size -> o.attendees).

## Smoke test after deploy
- /cv/ shows no £ figures against individual grants; strapline reads £6.2M / £25.5M.
- /cv/ roles render under the six new headings, newest-first.
- Conference & workshop organisation shows no "[N attendees]".
