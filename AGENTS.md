# Agent instructions — Little Life

Read `README.md`, `docs/GAME_DESIGN.md`, and `docs/ARCHITECTURE.md` before editing gameplay.

## Product goals
- iPad-first, responsive, welcoming to ages about 11–14 without feeling babyish.
- Branching choices with uncertainty, diverse outcomes and long-lived consequences.
- Family, friendships, rivalry, school, activities, skills, work and money interlock.
- Humor should be specific and human: amusing people making believable mistakes. Weird supernatural arcs exist but remain rare.
- In this project, nothing should feel like an inert button: actions should result in named projects, NPC reactions, lasting effects, decisions, or narrative detail.

## Engineering rules
- **Never erase or reset player progress** during version migration. Keep the existing version 2 data structure loadable. Preserve event ids when rewriting events; saved event histories depend on them.
- Use deterministic appearance seeds for DiceBear. Do not place names or personally identifying details in requests to the DiceBear API.
- Keep teen-suitable handling of fights, crime, losses and injury: meaningful consequences, not gore, instructions or glamorization.
- Avoid introducing remote dependencies for game logic or requiring account sign-in. Images from DiceBear are the only required external resource for portraits; show a graceful fallback offline.
- Escape all user-generated display strings; do not interpolate unsanitized user input into `innerHTML`.
- Avoid adding mechanics with no state, prerequisites, checks, memorable outcomes or persistence.
- Don't silently rebrand, remove mature/younger stages, change save keys, or reduce the event library.
- Preserve light/dark theme across sessions and make avatar editing work in both modes and on narrow screens. DiceBear Adventurer options must map to actual image parameters (eyesColor, hairVariant, etc.), not just reshuffle a seed; protect user appearance fields in old saves.

## Event writing checklist
Every new event should have a plausible trigger and age range, a specific opening situation with named stakes, at least two substantially different choices, non-identical outcomes, and real mechanical impact (skill, finances, popularity, bond, health, alignment, injury or future promise). Negative and neutral events are welcome. Comedy must arise from the circumstances and character choices, not boilerplate exclamations. Check for accidental repeats and contradictory NPC histories. Never substitute event volume for variety.

## Changes and tests
- Entrypoint `index.html` loads `assets/legacy-rewrites.js`, `assets/childhood.js`, `assets/legacy-outcomes.js`, then `assets/game.js` (in that order).
- Original 92 event titles/prompts live in `assets/legacy-rewrites.js` and extra original outcomes in `assets/legacy-outcomes.js`; keep their stable IDs. New one-off childhood scenes and five three-act arcs live in `assets/childhood.js`. Store chapter history in `childhoodArcs` and ensure sequels mention what happened in earlier chapters.
- `assets/game.js` is large and still monolithic. Refactor incrementally with regression tests; don't change closure scope or event registration order without checking.
- Run `node --check assets/game.js`, `node --check assets/legacy-rewrites.js`, `node --check assets/legacy-outcomes.js`, `node --check assets/childhood.js`, `python3 tests/smoke.py`, and `python3 tests/browser_smoke.py`.
- Manual iPad QA: first launch, start newborn, age up, change appearance, use a club, make friend/rival, generate a hobby artifact, start a job, family tree, switch themes, refresh and export/import saves.
- For GitHub Pages the root must remain statically servable at a nested path (`/LittleLife/`), so use relative asset URLs.

## Collaboration
Prefer small, reviewable commits and explain any change to story probabilities or economics. Document current behavior honestly; do not claim exhaustive test coverage because one scenario ran. Never overwrite a live save for convenience.

## Later-life chapter system
- `assets/later-life.js` defines 80 additional teen, young-adult, adult, senior and grief scenes, five multi-year arcs, 39 new career options, 11 simplified illnesses and four retirement-living options. Keep event IDs stable.
- `assets/game.js` integrates this catalog after earlier event rewrites. `s.laterArcs`, `s.illnesses`, `s.pension`, `s.retirementHome`, and `s.masteries` are additive save keys; preserve them during loading, export/import and inheritance resets.
- Arc chapters must *actually* pick up remembered opening choices, not just reuse the same generic sequel paragraph. Model both luck and skill, including meaningful failure.
- Gameplay from 12 through 100+ should mix mundane, wonderful, brutal-but-age-suitable, silly and bizarre outcomes. Avoid making every choice the "right choice". Do not make loss or medical diagnosis a punchline; humorous circumstances can surround them.
- Activities should have concrete stakes. Skill exhibitions can yield trophies, pay (adults) and status; the annual limit prevents farming. Career days offer workplace dilemmas. Retiring manually unlocks from 55; residence choices unlock at 62.
- Keep `docs/ARCHITECTURE.md`, README and `.github/workflows/pages.yml` current when adding scripts. Run `python3 tests/later_smoke.py` after existing smoke tests. Work through aging, multiple generations, illness, senior homes, and all save types, rather than validating by event counts alone.

## Passive-life and careers update
- `assets/passive-life.js` stores authored, conditional ambient journal moments for year transitions. `assets/career-stories.js` stores two distinct scenarios for all current 81 careers. Keep their IDs stable across saves.
- `annualLifeRipples()` runs once per `ageUp`, after finance, school, family, and aging changes; don't run it on render or loading a saved game. It writes 2–3 journal entries at most (1–2 at infant age), plus relevant family/job news. It must not spend energy.
- Gate stories on living NPCs, actual pets/jobs/school and existing skills; placeholders must expand; avoid implying a person died, moved, was born or was injured unless state or log really reflects it.
- Skill milestones, context-specific hobby outcomes, quarterly job incidents, annual career dilemmas, promotion requests and quitting use additive keys `passiveSeen`, `skillMilestones`, `careerScenesSeen`, `careerHistory`, `lastPromotionRequestYear`, and `rippleCount`. Reset personal keys on inheritance. Do not reset family history.
- `tests/ripples_smoke.py` uses Playwright to cover aging, skill effects, job situations, firing/quit/promotion menu and save data on four widths. Run it with all existing smoke tests, and validate the new scripts with `node --check`.
- Journal news must sound like *things that happened*, not generic skill-toasts, analytics or promises about engagement. Employment consequences should be plausible and skill-dependent.

## Hobby-world expansion (October 2026)
- Keep `assets/hobby-world.js` loaded **before** `assets/game.js`. It defines 20 new hobbies and ten expanded original hobby prompts. It is static authored data; runtime registration and game state stay in the main closure in `assets/game.js`.
- Hobby actions consume one available activity turn **only when carried out**. Choosing an instrument, a D&D class, or a campaign is free. Music playing, song creation, D&D sessions, and new hobby practice must award explicit skill progression and show the before/after values. At 100 skill, meaningful story rewards still occur even though the numeric cap cannot be exceeded.
- Record results under `s.hobbyWorld` (`last`, `streak`, `milestones`, `notes`, `music`, `party`, `decayYears`), as well as the existing `s.hobbyHistory`, `s.projects`, `s.promises`, and `s.trophies`. Never change the existing save key or reset family history. Generation inheritance resets personal hobby data.
- To write another hobby scenario, supply a concrete action, authored positive and negative outcomes, and an optional rare twist. Do not write "you improved your skill" as the entire scene. Low skill should mean awkward learning; high skill should unlock reputation, money for adults, and interesting complications, not automatic perfection. A few years without practice may slowly lower a developed skill.
- `hobbyCareerBonus(job)` is an additive, bounded link between new hobbies and existing careers, not a replacement for career requirements. Career applications display the extra points. `skillShowcase` allows new hobbies to enter competitions alongside older skills.
- Preserve the activity menu as an iPad-friendly expandable hobby book. Keep school clubs available. Escape every user-created song, avatar or character name where it is inserted into HTML.
- Update tests: `python3 tests/hobby_smoke.py`; also run all previous suites including `tests/ripples_lifetime.py`. The GitHub Pages workflow checks syntax for the extra catalog. Character sheets, songs, projects and skill decay need save/reload and inheritance coverage.