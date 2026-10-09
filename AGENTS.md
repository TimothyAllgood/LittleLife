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


## World and social simulation (October 2026)
- `assets/world-social.js` defines 34 fictional world headlines and 16 branching NPC-centered stories. Load it **before** `assets/game.js`, after all previous static catalogs. It adds zero network requests.
- `assets/game.js` lazily initializes `world` (market index, holdings, current cost/hiring pressure, news, active events) and `socialWorld` (contacts, role name registry, story history) in the existing version-2 save. Never reset the family's world market or investment holdings on inheritance; reset personal contact lists but preserve historical people and their previous generation memories.
- `annualFinances` is wrapped to apply world news on every age-up. Current events have different weights, cooldowns and finite durations. Avoid stacking permanent inflation/jobs effects indefinitely; negative events are not all comedy, especially war and serious illness. Tie headline changes to actual savings, jobs, grades, illness, bills, or other persistent gameplay consequences. Do not treat fictional stocks as real financial guidance.
- Player NPC records have persistent `npc` profile and per-player `npc.history[characterId]` trust/memory. `makePerson` initializes profiles for new people and `ensureExtras` upgrades old saves safely. Acquaintances are named and visible in People but need not become permanent friends. A chance meeting never grants automatic romance. Adult marriage remains 18+, teen crushes are limited to same-age peers, and no explicit sexual scenarios are allowed.
- NPCs may find jobs, move, date/marry, have children, become rivals or die. Keep their state and the family tree consistent with journal entries; do not invent a birth or death without creating/changing a person record. The NPC scene selector spends the activity only on a specific choice and records relationship/skill outcomes. Follow-up memories should mention the named person and particular incident, not generic slogans.
- `namedStory` transforms specific stock labels like “your grandma” and “a classmate” into persistent named characters, but do not blanket replace all pronouns or create hundreds of contacts for every newspaper sentence. When authoring new content, directly use names from the actual `p` rather than relying on this compatibility fallback.
- Confirm syntax with `node --check assets/world-social.js` and `node --check assets/game.js`; run `python3 tests/world_social_smoke.py` in addition to existing smoke and long-life suites. Test existing save import and a new generation after the protagonist's death. Check mobile widths and cash values under a boom and crash.


## Personalities and choice consequences
- `assets/personality-world.js` is loaded immediately before `assets/game.js`. It exports 46 dispositions, 16 character-creator picks, 14 branching episodic encounters, 12 age-specific repeatable reflection settings, and 12 rare non-graphic ending descriptions. Avoid names, APIs, or external calls in this catalog.
- `p.personality` is the persistent, currently expressed archetype for **all people**, including parents, siblings, friends, partners, children and the playable character. Older `p.personality` values are still accepted. Do **not** replace the player's selected personality with an aptitude or generic stat.
- `s.persona` tracks the current playable character's five evolving tendencies and lifetime reflections; it is scoped to `s.playerId` via `owner`. The data resets on inheritance but preserves the inheriting child's existing primary trait and preserves the old generation's recorded history. New additive fields must be safe on existing saves.
- Social probability/bond consequences use both people's temperaments, including friendliness, grudges, openness, bravery and habits. Respect consent/age limits for romantic interactions. NPC quirks are specific; avoid generic stock dialogue and don't print the same response every time.
- Biases to skills/grades/career success are *bounded*, not guaranteed. Character growth should come from choices, not random personality rerolls each birthday. Reflection actions cost activity time after committing to a choice. Every stage needs a distinct setup, with real successes and failures.
- Weird deaths should be very uncommon and non-graphic, with fictional causes, journal/legacy consistency and family continuation. Never glamorize violence, illness or suicide; don't replace a serious family loss with a joke.
- Check `node --check assets/personality-world.js`, `python3 tests/personality_smoke.py` and all existing regression tests after personality engine changes. Also test narrow iPad/phone layouts and dark mode.

## Specific stories, staged fights, and visible effects
- Keep `assets/story-pass.js` loaded after `personality-world.js` and **before** `game.js`. `story-pass.js` is pure authored catalog data. `game.js` integrates it at the end of registration; the 55 `v4_*` copied-boilerplate failure outcomes now have distinct, hand-written consequences. Do not restore "you have mixed feelings," "takes longer," or other filler as generic outcomes. Audit concrete stakes and identity across *every* stage; never replace a meaningful incident with a bland stat descriptor.
- `Age +1` is sticky in `.top` on all main playable tabs. It should remain a touch-friendly target at 320–1024px and not overlap the bottom menu or modal. Keep the preexisting age panels for players who expect them. No aging while an active fight waits for a decision.
- `s.activeFight` and `s.fightHistory` are additive fields to v2 saves. Save between stages to allow resume on reload; only spend an action when deliberately starting a social fight, not when an age-up scene triggers one. Record named NPC injuries and follow-up reactions. Serious complications are extremely uncommon, non-graphic, and require severe existing health loss. Continue the family legacy after death.
- Effects are compared around player clicks using snapshots and deferred until **after** event listeners mutate state. Use `setTimeout(...,0)` rather than `queueMicrotask` from a capture-phase listener: the browser can drain microtasks before target/bubble click handlers run. Changes appear inside the result dialog and the live top strip, with actual deltas to named relationships and skills. Preserve escaped display names and dark-mode contrasts.
- Run `node --check assets/story-pass.js`, `python3 tests/story_combat_smoke.py`, and the full existing regression suites when modifying encounters, NPCs, injuries or UI. Ensure creator/edit-mode behavior and old family saves remain intact.