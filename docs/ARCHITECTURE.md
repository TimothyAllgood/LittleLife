# Technical notes

## Platform
Static HTML/CSS/JavaScript. No build step, framework, API keys, analytics, or account system. `index.html` loads `assets/legacy-rewrites.js` then `assets/game.js`. A local HTTP server makes behavior consistent with GitHub Pages. Relative paths support `/LittleLife/` deployment.

## Storage
The existing app persists the main save as JSON in `localStorage`; see `KEY`, `OLD_KEY`, `load`, `save`, `migrateOld` and the import/export UI in `assets/game.js`. The game uses save schema `version: 2`. Do not change that shape or drop old look attributes without an explicit migration path. Theme storage is independent of life saves.

## Event pipeline
The original `E` + `C` event functions and later `NE` + `SC` events share the `events` collection. Event selection checks life stage, `when` eligibility, priorities and event history. Consequences change stats, skills, relationships, health, cash, grades, social standing, flags and promises. The earlier 92 event prompts and titles are now overlaid by `assets/legacy-rewrites.js` just before initialization; stable IDs and branching choice logic remain intact.

## Avatar renderer
`avatar(look, age)` renders an `<img>` whose URL is derived by `dicebearUrl(look, age)` for DiceBear Adventurer v10. It passes randomized seed, age-group salt, skin and hair color, background and supported optional toggles; no player names are transmitted. Changing appearance variant controls changes the deterministic seed. Unlike the original SVG renderer, these variants affect the general illustrated look, not necessarily one isolated facial feature. Eye color was removed as a separate picker because the style has no guaranteed independent iris-color selector; offering one that did nothing was misleading. The old `eyes` property still affects variation and remains in legacy saves. Online portraits are optional: an emoji placeholder appears on failure.

Adventurer attribution: Lisa Wischofsky, CC BY 4.0, https://www.dicebear.com/styles/adventurer/.

## Pages deployment
`.github/workflows/pages.yml` uploads the repository root and runs `actions/deploy-pages` when `main` changes. GitHub repo Settings must have Pages source configured as GitHub Actions. A private repository may require a GitHub plan with private Pages access. The connector available for this setup does not expose administrative Pages-enable mutation.

## Testing
Automated static smoke test: source files, stable legacy event manifest counts, no hand-built SVG avatar in runtime, relative URLs, no external runtime libraries besides DiceBear, theme, save functions, and JavaScript syntax. Browser QA is still essential: simulate at least infant, teen and adult scenarios in narrow and tablet viewports, inspect fallbacks when offline, and verify saved-game import/export after moving from `file://` to GitHub Pages.

## Known limitations
- The 92 earliest setups/titles have been rewritten but their pre-existing choice/outcome text still needs an ongoing voice audit.
- The game engine is monolithic; modularization should not risk lost save compatibility.
- Remote portrait images are not cached as local assets; in offline use the fallback renders.
- Existing local saves do not automatically follow users between browser origins or Safari and the Files app.