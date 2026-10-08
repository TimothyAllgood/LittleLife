# 🌱 Little Life

**[Play Little Life](https://timothyallgood.github.io/LittleLife/)** · [Report a bug](https://github.com/TimothyAllgood/LittleLife/issues)

An iPad-first, teen-friendly, choose-your-own-mess life simulator. Start as a baby or a teenager, make friends and enemies, stumble through jobs, create things, grow old, and leave behind a family full of stories. Some lives end up wealthy; others end up as an accidental teapot influencer. It's a game, not a career-coaching application.

There are no ads, accounts, in-app purchases, sexual content, or graphic violence. Difficult things happen—bullying, illness, injuries, crime, family disagreements, financial trouble, and loss—but the presentation aims for an older-kid/teen audience.

## Playing

Open the game above in Safari or another modern browser. Make a character and play through your life one year at a time. Most years you have several chances to do things *before* aging up. Choices change skills, finances, relationships, reputation, your storybook, and sometimes events years later.

Things to try:

- **Babyhood and childhood:** Family, school, clubs, friendships, pranks, mysteries, and five multi-year childhood storylines.
- **Teen years:** Sleepovers, food fights, tricky friendships, rivalries, exams, bands, gaming, competitions and graduation.
- **Adulthood:** Relationships, children, college, moving, bills, unusual job opportunities, work crises, illness, difficult decisions, and new multi-year mysteries.
- **Later years:** Retire when you're ready (from age 55), choose your home, hang out with memorable neighbors, foster pets, get into ridiculous adventures, or begin an unexpected second career.
- **Skills:** Practice hobbies and take them to a showcase. Skill and confidence affect outcomes; success can earn trophies, money, popularity, and career opportunities. Pick an instrument, write a story, make something, play D&D, or enter a game tournament.
- **Generations:** When your character dies, choose a living child to continue the family. The family tree and the histories of earlier lives remain.

Story outcomes are intentionally unpredictable. Even a good choice can fail, and being mean sometimes appears to work—at least until it catches up with you.

## Saves, portraits and offline use

Progress saves to **local storage** in that browser. Keep backups through **Settings → Export family save**, particularly before clearing browser data or switching devices; import backups from Settings. Existing version-2 Little Life saves load without needing to start over. Light/dark preference saves independently.

Portraits use **DiceBear Adventurer** SVGs from `https://api.dicebear.com` with a persistent, non-identifying character seed. A fallback appears without the connection. Game logic, data, layout and saves are local to the static site. No account is required.

## Development

Little Life is deliberately dependency-free: standard HTML, CSS and browser JavaScript. You do **not** need Node packages, a backend, a database, or a build step.

Clone the repository and serve the folder with any static file server. For example:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

The HTML entrypoint is `index.html`. Scripts load in the following order:

1. `assets/legacy-rewrites.js` — revised copy for the original event intros.
2. `assets/childhood.js` — childhood one-offs and five long-running arcs.
3. `assets/later-life.js` — teen/adult/senior scenes and arcs, jobs, illnesses, retirement-home catalog.
4. `assets/legacy-outcomes.js` — rewritten results of original choices.
5. `assets/game.js` — game state, event resolution, UI rendering, save/load, additional gameplay and hooks.

Styles are in `assets/styles.css`. Current code intentionally retains one large game script; modularize incrementally and preserve old save keys. See [architecture](docs/ARCHITECTURE.md), [game design](docs/GAME_DESIGN.md), and [agent instructions](AGENTS.md).

## Tests

Run these before publishing:

```sh
node --check assets/game.js
node --check assets/childhood.js
node --check assets/later-life.js
node --check assets/legacy-rewrites.js
node --check assets/legacy-outcomes.js
python3 tests/smoke.py
python3 tests/browser_smoke.py
python3 tests/later_smoke.py
```

The Playwright tests require Python `playwright` and locally installed Chromium (`/usr/bin/chromium`). They exercise avatar customization, dark mode, branching childhood and later-life arcs, illnesses, jobs, competitions, retirement and small-screen layout. Browser QA complements rather than replaces actual full-life playtesting.

## GitHub Pages

Every push to `main` runs `.github/workflows/pages.yml`. It validates JS and the static source before uploading to GitHub Pages. In repository Settings → Pages, set Source to **GitHub Actions**. Pages supports the nested `/LittleLife/` path because all script/style URLs are relative.

## Writing stories

The north star is the range and playfulness of BitLife without its adult material. Give each event a particular incident, person or problem. Include options that are kind, selfish, misguided, selfish-but-funny, neutral, or occasionally awful—and make different outcomes genuinely different. Avoid repetition, lecture-like mechanics copy, generic “you learn a valuable lesson” endings, and UI jargon that sounds like a product pitch. Follow-ups should remember what the player actually did.

This game is fiction. Health and financial mechanics are simplified for play, not advice for real decisions.

## License

No license has been assigned to the repository. Copyright remains with the owner; contributions require permission.