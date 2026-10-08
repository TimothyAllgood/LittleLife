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
- Preserve light/dark theme across sessions and make avatar editing work in both modes and on narrow screens.

## Event writing checklist
Every new event should have a plausible trigger and age range, a specific opening situation with named stakes, at least two substantially different choices, non-identical outcomes, and real mechanical impact (skill, finances, popularity, bond, health, alignment, injury or future promise). Negative and neutral events are welcome. Comedy must arise from the circumstances and character choices, not boilerplate exclamations. Check for accidental repeats and contradictory NPC histories. Never substitute event volume for variety.

## Changes and tests
- Entrypoint `index.html` loads `assets/legacy-rewrites.js` before `assets/game.js`.
- Original 92 event titles/prompts are kept in `assets/legacy-rewrites.js`; update that manifest rather than creating duplicate events.
- `assets/game.js` is large and still monolithic. Refactor incrementally with regression tests; don't change closure scope or event registration order without checking.
- Run `node --check assets/game.js`, `node --check assets/legacy-rewrites.js`, `python3 tests/smoke.py`.
- Manual iPad QA: first launch, start newborn, age up, change appearance, use a club, make friend/rival, generate a hobby artifact, start a job, family tree, switch themes, refresh and export/import saves.
- For GitHub Pages the root must remain statically servable at a nested path (`/LittleLife/`), so use relative asset URLs.

## Collaboration
Prefer small, reviewable commits and explain any change to story probabilities or economics. Document current behavior honestly; do not claim exhaustive test coverage because one scenario ran. Never overwrite a live save for convenience.