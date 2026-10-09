"""Dependency-free static checks. Also run browser smoke tests before shipping."""
from pathlib import Path
import re

root=Path(__file__).resolve().parent.parent
html=(root/'index.html').read_text()
css=(root/'assets/styles.css').read_text()
js=(root/'assets/game.js').read_text()
rewrites=(root/'assets/legacy-rewrites.js').read_text()
childhood=(root/'assets/childhood.js').read_text()
outcomes=(root/'assets/legacy-outcomes.js').read_text()
later=(root/'assets/later-life.js').read_text()
assert all((root/p).is_file() for p in ['assets/passive-life.js','assets/career-stories.js','assets/hobby-world.js','tests/ripples_smoke.py','index.html','assets/styles.css','assets/game.js','assets/legacy-rewrites.js','assets/childhood.js','assets/later-life.js','assets/legacy-outcomes.js','README.md','AGENTS.md'])
assert html.index('passive-life.js')<html.index('game.js') and html.index('career-stories.js')<html.index('game.js')
assert 'hobby-world.js' in html and html.index('hobby-world.js')<html.index('game.js')
assert 'annualLifeRipples()' in js and 'annualCareerChoice()' in js and 'quitCurrentJob' in js and 'askForPromotion' in js
assert 'assets/styles.css' in html and 'assets/legacy-rewrites.js' in html and 'assets/game.js' in html
assert html.index('legacy-rewrites.js') < html.index('childhood.js') < html.index('later-life.js') < html.index('legacy-outcomes.js') < html.index('game.js')
assert 'https://api.dicebear.com/10.x/adventurer/svg' in js
assert 'function dicebearUrl' in js and 'function avatar(' in js
assert '<svg' not in js[js.index('function avatar('):js.index('const me=()')]
assert 'data-theme="dark"' in css
assert 'localStorage' in js and 'function save()' in js and 'function load()' in js
old_ids=re.findall(r"\bE\('([^']+)','(?:baby|child|teen|young|adult|senior)'",js)
rewrite_ids=re.findall(r'^  "([a-z]+)": \{',rewrites,re.M)
assert len(old_ids)==92, len(old_ids)
assert set(rewrite_ids)==set(old_ids), (len(rewrite_ids),set(old_ids)-set(rewrite_ids))
assert len(re.findall(r'\{id:\x27[^\x27]+\x27,age:',childhood))>=58
assert len(re.findall(r'\{id:\x27[^\x27]+\x27,age:\[\d+,\d+\],icon:\x27[^\x27]+\x27,acts:',childhood))==5
assert len(re.findall(r'^ [a-z]+:\s*\[',outcomes,re.M))>=90
assert 'LITTLE_LIFE_LATER' in later and "const scenes=[" in later and "const arcs=[" in later and "const illnesses=[" in later
assert 'function retirementHomes' in js and 'function medicalVisit' in js and 'function skillShowcase' in js
assert 'eyesColor' in js and 'hairVariant' in js and 'data-setup=\"randomName\"' in js
assert 'Uses confidence' not in js and 'Your choices shape later events' not in js and 'consequences can stick' not in js
assert 'function childhoodSequelText' in js and 'firstChoice' in js
print(f'PASS: {len(old_ids)} legacy scene rewrites, 58+ child events and 5 arcs, explicit DiceBear, name randomizer, saves, scripts.')