# 🌱 Little Life

A teen-friendly, choice-driven life simulator where the mundane, the embarrassing, and the downright strange can all change a family story. Start at birth or age 12, grow skills, make friends and enemies, get jobs, adopt pets, raise a family, and pass your story to the next generation.

**Play:** once GitHub Pages is enabled, the intended URL is `https://timothyallgood.github.io/LittleLife/`.

## What is in the game?

- Hundreds of age-aware events with choices, skill checks, consequences, and longer story arcs.
- Relationships, friendships, rivalries, family generations and a family tree.
- School, clubs, grades, college, careers, money, housing, travel, vehicles, injuries and legal consequences.
- D&D, gaming, writing, music, art, filmmaking, and other hobbies with recorded projects.
- Rare, weird mystery storylines, with much lower occurrence than everyday incidents.
- Illustrated **DiceBear Adventurer** avatars with persistent looks, a baby-to-senior life progression, and theme preferences saved locally.
- Age-appropriate tone, including difficult or negative outcomes without graphic detail.

## Run locally

This is currently a dependency-free static web app. Serve it using any local HTTP server:

```sh
python3 -m http.server 8000
# Then visit http://localhost:8000/
```

The game logic and event system do not require an account or server. **Character portraits are fetched from DiceBear**, so portrait images require an internet connection; the app displays a small placeholder when the API is unreachable. Other game content remains available offline after the files are loaded. No advertising or telemetry code is included.

## Repository layout

```text
index.html                 Small HTML shell and entry point
assets/styles.css          UI and responsive light/dark design
assets/game.js             Game state, rules, activity and event engine
assets/legacy-rewrites.js  Narrative revisions for all 92 original event setups
.github/workflows/pages.yml  GitHub Pages deploy action
docs/GAME_DESIGN.md       Gameplay direction and tone
docs/ARCHITECTURE.md      Data model, save system, DiceBear mapping and testing
AGENTS.md                 Contributor/AI-agent guardrails
```

## Testing

```sh
node --check assets/game.js
node --check assets/legacy-rewrites.js
python3 tests/smoke.py
```

See `docs/ARCHITECTURE.md` for browser-testing recommendations. In particular, check avatar customization in both themes, an early-childhood event, a teen event, career progression, and save export/import before merging gameplay changes.

## Save data & privacy

Game progress is kept in your browser's `localStorage`, not in an online account. The game also supports export and import. Changing origin (for example, moving from a downloaded HTML file to GitHub Pages) does **not** migrate local storage automatically: **export the old save, then import it at the new URL**.

DiceBear receives a generated appearance seed and style choices to render the portrait. It does *not* receive player names from this integration. To work without DiceBear entirely, the app shows an emoji fallback; a future build could bundle assets or use a local renderer.

## GitHub Pages setup

A deploy workflow is provided at `.github/workflows/pages.yml` and publishes the root directory of `main`. Repository owner must enable **Settings → Pages → Build and deployment → GitHub Actions**. Make sure Actions workflows are allowed in repository settings. For **private repositories**, check that your GitHub plan supports private Pages publishing. A public repository is the alternative, if you want the source visible to everyone. The workflow alone does not turn Pages on.

Once the Pages deployment succeeds, the site should be accessible at `https://timothyallgood.github.io/LittleLife/` (case-sensitive repository path). Check the Pages settings panel for the actual URL and status.

## Content direction

The game is built for early teens, not strictly for young children. Consequences are allowed: embarrassment, losing friends, being injured, punishment, failure, legal problems, and even sad family moments. Avoid explicit sex, gratuitous gore, slurs, and instructional crime detail. Not every life should be easy, and not every joke should sound like a greeting card. See `docs/GAME_DESIGN.md`.

## Avatar credit

Portraits use [DiceBear's Adventurer style](https://www.dicebear.com/styles/adventurer/) by **Lisa Wischofsky**, licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). DiceBear is a separate third-party service. This project is not affiliated with BitLife, ReLife, or DiceBear.

## Status

Playable evolving prototype. Most content is still in one JavaScript game engine for save compatibility. The 92 earliest event *prompts and titles* were editorially rewritten; their existing branching outcomes are preserved to avoid breaking consequence logic. Outcome-by-outcome copyediting, a fully local avatar renderer, and further code modularization remain potential follow-up work.