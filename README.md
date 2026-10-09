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

## The world moves without you

Click **Age up** and the journal fills with small and big background happenings. Relatives can have children, older family members may die, classmates spread rumors, friends move, world news disrupts routines, and your practiced hobbies can attract opportunities. The story pool has **101 contextual passive scenes**, often with two different endings and some multi-year callbacks. It checks family and friend availability, age, school enrollment, money, health, hobbies, and retirement status before selecting. Childhood gets 1–2, later years 2–3, with additional job and family news when appropriate.

There are **162 authored career incidents across 81 career paths**, plus an interactive workplace dilemma that can arise at a birthday. Skills and performance affect the resolution. The Work page also allows quitting your job or requesting a promotion once per year; some choices may end in warnings or dismissal. Career experiences and hobby milestones are stored with the save.

The catalog lives in `assets/passive-life.js` and `assets/career-stories.js`. The gameplay hooks and persistence live in `assets/game.js`. No player account or backend is required.

For local regression testing, run `python3 tests/ripples_smoke.py` with Playwright/Chromium installed, plus the existing smoke tests.

## Hobbies: choosing a passion and getting better

The **Activities → Your hobbies** book now groups pursuits into Favorites, Games & Performance, Making Things, and Nature & Adventure. Expand a shelf, choose an activity, then pick the actual thing to do. A successful attempt can bring acclaim or a new opportunity; a disastrous one still teaches you something. The outcome explicitly shows skill before, after, and amount gained.

- **Music:** choose an instrument without spending a turn, then practice, write songs in a named genre (saved to your portfolio and repertoire), perform, and potentially join a band. Writing a song awards Music experience; instrument selection by itself does not.
- **D&D:** build a named character and choose a class and campaign without spending a turn. Playing sessions uses a turn, awards Tabletop skill, increases the character's level and quest count, and changes the party's trust based on the result. Rogues, fighters, paladins, and bards have advantages on different approaches.
- **Twenty additional pursuits:** fencing, staged historical dueling, archaeology, birdwatching, stage magic, pottery, woodworking, sewing, languages, hiking, geocaching, robotics, fishing, horse riding, calligraphy, stand-up comedy, sailing, model making, debate, and fossil hunting. Each has three specific situations, alternate results, and occasional twists.
- Ten existing extra hobbies also get new choices, beyond their original prompts. You may enter skill competitions, reach mastery, get paid for occasional high-level work as an adult, gain school or popularity benefits, receive a callback from an earlier hobby incident, or become rusty if you neglect a trained skill for years.
- Niche skills can now contribute up to **18 extra points** in compatible job applications (e.g., archaeology helps a treasure hunter, birdwatching helps a wildlife photographer, robotics helps an engineer). Work applications display the hobby bonus where applicable. These are bonuses, not guaranteed hiring.
- Your best skills and latest memorable hobby moment now appear on the Home page when you have developed a hobby.

Older saves load without migration and initialize the additional `hobbyWorld` data only when needed. New generations get their own personal hobby histories; the family tree remains intact. This is a game, not a lesson in real-life medical or sports safety: dangerous pursuits are written as supervised, teen-suitable activities.

Tests: `python3 tests/hobby_smoke.py` in addition to the existing smoke suites. The new data file `assets/hobby-world.js` is parsed by the GitHub Pages workflow with `node --check`.


## A world that keeps moving (World & People update)

The **World outside** newspaper on Home shows world headlines with their consequences. The 34 authored world scenarios cover booming and crashing markets, housing costs, hiring freezes and construction booms, illness waves and medical discoveries, droughts and floods, peace and war abroad, scientific breakthroughs, conservation successes, festivals and more. Fictional situations have different details across appearances; some are extremely rare. A developing crisis usually lasts a few years and fades rather than permanently stacking penalties. School performance, employment, savings, cost of living and health can be affected. Headlines are logged in the Journal for the same saved family across generations.

Adults can invest limited savings in the fictional **Town Index** from Home, or cash out. Its value changes year to year and when major economic news breaks. There is no brokerage, API, real-money trading or simulated debt; this is a simple risky *game* mechanic. One investment action is permitted per year. Shares and market history persist as part of the family's save.

**People** now includes named acquaintances, in addition to friends, partners and relatives. Every NPC has a saved personality, interest, odd habit, ambition, an independent occupation and memories per playable character. Meeting someone does **not** automatically make them your partner; talk to them, invite them places, give gifts, make enemies, apologize, flirt or ask them on a date when appropriate. Relationship interactions spend an activity only when performed. Dating is age-gated, marriages remain adult-only, and all writing stays PG-13. Friends sometimes move, marry, have children or change careers without asking you. Grandparents, schoolmates, neighbors, coworkers and teachers used in event copy get persistent names rather than generic labels. Acquaintances may drift out of the contact list; historical people and important relationships remain in the save.

There are **16 authored NPC story encounters**, selectable from an individual person's interaction screen, with three different approaches each. Skills, bond and trust modify odds; harmful choices can create rivals; memorable choices sometimes return in later-year journal entries. The older relationship actions and family tree remain.

Data: `assets/world-social.js`. Runtime: final section of `assets/game.js`. Compatibility: existing `version: 2` saves add `s.world`, `s.socialWorld`, and `p.npc` lazily, without deleting existing data. The global world remains across family generations; personal acquaintances are refreshed when control passes to an heir.

Run `python3 tests/world_social_smoke.py` with Playwright and Chromium to test world market effects, investing, NPC state, social branches, named event roles, save/reload, several age-ups and layouts at 320, 390, 768 and 1024 pixels. Test cases supplement actual long-life playtesting; randomness means not every storyline is seen in one simulation.


## Personalities & strange endings (October 2026)

A character's personality is **not just a badge**. The character creator now separates an initial aptitude (Curious/Creative/Social/Sporty) from the character's temperament, with 16 selectable starting identities. Across the game there are 46 authored disposition types, all usable by NPCs. Each has a distinctive habit, a weakness, and five underlying tendencies: heart, nerve, focus, wonder and mischief.

- **Relationships:** NPCs react differently to conversation, gifts, invitations, insults, gossip, apologies and romance. Compatibility and trust alter success odds as well as future bonds. A grudge-holder is slower to forgive; an outgoing acquaintance is easier to invite; kind people take insults harder; NPCs can drift apart or get closer in their own time.
- **Life-long consequences:** Temperament affects school grades, hobby performance, job eligibility and the success of certain event choices. Older players feel these differences too. Values nudge probabilities rather than guaranteeing outcomes, and related activity effects gradually shift the five tendencies.
- **Character growth:** The personal chapter on Home has a compact personality portrait and five tendencies. A year-by-year *self-discovery* activity offers twelve different authored dilemmas across childhood, teenage, adult and senior life. It consumes one activity when a choice is made and can eventually lead to an **optional change of primary personality**. The same fixed talent-show prompt is not repeated each year.
- **New story content:** Fourteen branching age-up episodes have three different choices each, with skill checks, failure outcomes and callbacks. Annual interactions with named family/friends can reflect their habits as well as your own. There are also twelve eccentric, **rare, non-graphic** potential causes of death, logged in the journal and family history. They are not an invitation to harm anyone in real life.
- **Save compatibility:** No new save key or account is required. Older characters without personality data are upgraded lazily, without replacing the existing person or family tree. The family legacy retains a named cause of death, while a new generation gets its own growth data. No existing save is intentionally reset.

Static checks: `node --check assets/personality-world.js && node --check assets/game.js && python3 tests/smoke.py`. Interactive local regression: `python3 tests/personality_smoke.py` (Chromium + Playwright), followed by the existing browser, world, hobby, career, passive-year and lifetime suites.