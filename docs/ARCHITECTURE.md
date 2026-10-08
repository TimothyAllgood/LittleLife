# Technical notes

## Platform
Static HTML/CSS/JavaScript. No build step, framework, API keys, analytics, or account system. `index.html` loads `assets/legacy-rewrites.js`, `assets/childhood.js`, `assets/legacy-outcomes.js`, then `assets/game.js`, in that order. A local HTTP server makes behavior consistent with GitHub Pages. Relative paths support `/LittleLife/` deployment.

## Storage
The existing app persists the main save as JSON in `localStorage`; see `KEY`, `OLD_KEY`, `load`, `save`, `migrateOld` and the import/export UI in `assets/game.js`. The game uses save schema `version: 2`. Do not change that shape or drop old look attributes without an explicit migration path. Theme storage is independent of life saves.

## Event pipeline
The original `E` + `C` event functions and later `NE` + `SC` events share the `events` collection. Event selection checks life stage, `when` eligibility, priorities and event history. Consequences change stats, skills, relationships, health, cash, grades, social standing, flags and promises. The original 92 event prompts and titles are overlaid by `assets/legacy-rewrites.js`. The 90 legacy events not already converted in v3 get authored per-choice outcomes from `assets/legacy-outcomes.js`. The original event IDs are preserved for `eventsSeen` and saved histories.

## Avatar renderer
`avatar(look, age)` renders an `<img>` whose URL is derived by `dicebearUrl(look, age)` for DiceBear Adventurer v10. It passes a stable random seed (not a name or an age-dependent salt) and explicit Adventurer style options: `hairVariant`, `hairColor`, `skinColor`, `eyesColor`, `eyesVariant`, `eyebrowsVariant`, `mouthVariant`, glasses, earrings, freckles and background. The editor maps eye colors and hairstyles to exact supported options. The old `eyes`, `shape`, `face`, `brows`, and `smile` appearance values are preserved for earlier saves. Babies use a lower chance of hair and the same deterministic identity. Optional remote image failures fall back to an emoji. Online portraits are optional: an emoji placeholder appears on failure.

Adventurer attribution: Lisa Wischofsky, CC BY 4.0, https://www.dicebear.com/styles/adventurer/.

## Multi-year childhood arcs

`assets/childhood.js` contains 58 scene objects and five three-act arcs. Story IDs are `kid_<id>`, while chapter IDs are `kid_arc_<arcId>_<step>`. `s.childhoodArcs` records `step`, `due`, `firstChoice`, `branch`, and `completed`, plus pending callbacks in `s.promises`. `eventOptions` prioritizes due chapters over one-off child stories (84% on each eligible selection), and still sometimes selects an original event. Scene IDs are shown at most once per life via `eventsSeen`. First-chapter choices alter chapter two and chapter three dialogue and are preserved in the save. A completed arc can produce a later reminder event. Inherited player characters start their own childhood arc state.

## Pages deployment
`.github/workflows/pages.yml` uploads the repository root and runs `actions/deploy-pages` when `main` changes. GitHub repo Settings must have Pages source configured as GitHub Actions. A private repository may require a GitHub plan with private Pages access. The connector available for this setup does not expose administrative Pages-enable mutation.

## Testing
Automated static smoke test (`python3 tests/smoke.py`) and browser regression suite (`python3 tests/browser_smoke.py`): source files, stable legacy event manifest counts, no hand-built SVG avatar in runtime, relative URLs, no external runtime libraries besides DiceBear, theme, save functions, and JavaScript syntax. Browser QA is still essential: simulate at least infant, teen and adult scenarios in narrow and tablet viewports, inspect fallbacks when offline, and verify saved-game import/export after moving from `file://` to GitHub Pages.

## Known limitations
- All 92 original setups were rewritten; 90 previously generic old events have additional per-choice outcomes, and the other two have existing bespoke choice behavior. Additional newer scene dialogue should still receive iterative playtest feedback.
- The game engine is monolithic; modularization should not risk lost save compatibility.
- Remote portrait images are not cached as local assets; in offline use the fallback renders.
- Existing local saves do not automatically follow users between browser origins or Safari and the Files app.

## Later-life events and opportunities (October 2026)

`assets/later-life.js` is catalog data. It holds 80 stage/context scenes with explicit success and failure, five three-chapter storylines, 39 extra jobs, illness definitions and living options. It is loaded before `assets/game.js`, which registers stage-appropriate events into the existing resolver and wraps existing hooks (rather than replacing save formats).

Each arc keeps `{step, firstChoice, firstLabel, firstYear, nextYear, finished}` under `s.laterArcs[arc.id]`. Due chapters have priority when an annual event is selected. Finishing an arc queues a future echo in the existing `s.promises` system. One-off scenes remain non-repeatable for each playable character, keyed in `s.eventsSeen`.

New state is lazily initialized in `ensureWorld`: `illnesses`, `laterArcs`, `masteries`, `retirementHome`, `retirementFriends`, `pension`, `retirementYear`, `lastRetirementMoveYear`, `lastShowcaseYear`, and related flags. Inheritance clears character-specific attributes while retaining the family's shared history. Existing players retain all original save keys and data.

Illnesses are **simplified game systems**, not medically accurate diagnosis advice. Per-year checks are relatively rare. Symptoms can affect health; a player can spend an activity and money on care. Older players can retire early; fixed pension income and retirement-home charges apply in annual life processing. Deaths receive age-appropriate, non-graphic causes, and the chosen child can inherit the family story.

The home/journal chapter draws a short, state-based recap from named family, grade/career, illness, and recent saved history. This text is rendered with escaping. Activities expose contests, visits and careers through the existing action dispatcher.

The deployment validates all standalone JS scripts, as well as `tests/smoke.py`, `tests/browser_smoke.py`, and `tests/later_smoke.py` in local QA. Because the last two need Chromium, they are not part of the minimal GitHub Pages deployment job.

## Ambient years and career-specific incidents

`index.html` loads `assets/passive-life.js` (101 contextual scene entries) and `assets/career-stories.js` (81 careers with 2 distinct authored incidents each) before the game engine. Both are plain JS data objects on `window`; no network calls or build tooling are needed.

The game engine runs `annualLifeRipples()` *only* from `ageUp()`, after the ordinary annual finance, school, world and family processing. It selects 1–2 newborn/toddler or 2–3 older passive diary moments, with at least a five-year cooldown per scene and an alternative text/outcome on repeat. `rippleGate` checks living NPCs, enrollment, actual financial and personal conditions; interpolations escape via the existing log rendering. Pregnancies in the player's own household remain under the original one-child-per-year constraint; the separate background new-sibling event checks parental ages and family size.

`annualSkillMilestones` logs grounded rewards when new tiers are crossed; `outcomeModal` adds some context-dependent mishaps or memorable hobby moments without creating a second modal. Work incidents are skill-checked and can yield warnings; occasional annual career choice modals offer doing the work, getting help, or irresponsibly shirking it. A result modal then resumes the normal yearly interactive event. The Work page exposes a voluntary quit and one promotion request per year.

Additive state: `passiveSeen`, `skillMilestones`, `careerScenesSeen`, `careerHistory`, `lastPromotionRequestYear`, `rippleCount`, `lastActionRequested`. These require no migration, initialize on first use, and reset per character when the player inherits a new generation. Existing `promises` store several later echo callbacks; custom titles/icons are honored without disrupting older promises. No existing save key changed.

QA: `tests/ripples_smoke.py` exercises the passes, story interpolation, skill milestones, career choices, promotion/quit, localStorage and narrow layouts. The GitHub Pages workflow runs static validation; Playwright tests are local.