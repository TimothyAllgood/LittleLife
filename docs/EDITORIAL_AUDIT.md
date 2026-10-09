# Story audit — October 2026

This is a working editorial audit, not a claim that every existing sentence has been rewritten.

## Inventory and changes

- **Before this pass:** 560 registered age-up event definitions and 1,305 choice records (including long-running episodes, personality scenes, and previous updates).
- **After:** 600 events and 1,425 choices. The new `assets/oddities.js` catalog contributes 40 age-specific, one-per-life events, each with three player decisions and distinct success and setback prose.
- `assets/editorial-pass.js` replaces vague or inconsistent wording in **114 existing events**. These include childhood, teen drama, family conflicts, careers, retirement, and eight repeated fallback job outcomes. Original IDs and state mechanics are preserved.
- **Five extremely rare mysteries** use a separate 0.2%-per-age-up selection chance across the eligible pool, not 0.2% per individual mystery. Most characters will never encounter one. Ordinary weird scenes are selected with a 36% chance when eligible, except when a scheduled multi-year chapter takes priority.
- **More than 17 incidents** can plant a branch-specific callback in the journal 2–5 years later. The memory is scheduled on successful choices; failure can still alter skills, relationships, health, reputation, grades, cash, or stress.
- Many new choices have more than one fully written success **and** failure, selected at resolution time, rather than a catch-all random sentence pasted to every outcome.

## Editorial standards

A prompt identifies a particular place, character or object, and a problem that can happen there. A result tells exactly what happened, with a cause and a visible consequence. If a secret matters, say **what the secret is**. If a painting sells, name the painting or the buyer. If someone is embarrassed, show what they did instead of telling the player they *felt embarrassed*. Ordinary happy things, disasters and surreal events must all have room to breathe.

Do not write “It works,” “Something amazing happens,” “Your choices shape your future,” “You had fun,” or “You learned a valuable lesson” as a complete event resolution. Avoid making all good outcomes pleasant, all selfish choices fail, or all failures terminal. A story can be absurd without asking the player to believe that every birthday involves ghosts.

## Testing and remaining debt

`node tests/editorial_catalog.cjs` enforces catalog invariants. `python3 tests/oddities_smoke.py` loads the complete game in Chromium and checks static story facts, save/reload, a specific branch callback, skill changes, age gates, dark mode and screen overflow. Run older browser suites too; the game engine shares state and event selectors.

**Not yet exhaustively revised:** all 486 other preexisting entries that received no direct changes this pass, and background entries from separate passive-world/career modules. Many of those already have distinct details and do not need rewriting. Some still contain loose “someone,” “your family,” or reusable outcome structures; audit by *meaning*, not by banning ordinary pronouns. NPC name persistence inside every incidental old scene also remains a larger social-engine project. Further audits should target scenes that contradict saved family/job history or describe a result without depicting it.

**Known constraint:** This remains a static, randomly selected age-up catalog. Rare incidents are fictional; there is no dynamic language generation at runtime. When building another event batch, favor targeted reactivity and follow-up state over inflating raw event counts.