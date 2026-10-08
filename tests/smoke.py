"""Dependency-free static checks. Also run browser smoke tests before shipping."""
from pathlib import Path
import re

root=Path(__file__).resolve().parent.parent
html=(root/'index.html').read_text()
css=(root/'assets/styles.css').read_text()
js=(root/'assets/game.js').read_text()
rewrites=(root/'assets/legacy-rewrites.js').read_text()
assert all((root/p).is_file() for p in ['index.html','assets/styles.css','assets/game.js','assets/legacy-rewrites.js','README.md','AGENTS.md'])
assert 'assets/styles.css' in html and 'assets/legacy-rewrites.js' in html and 'assets/game.js' in html
assert html.index('legacy-rewrites.js') < html.index('game.js')
assert 'https://api.dicebear.com/10.x/adventurer/svg' in js
assert 'function dicebearUrl' in js and 'function avatar(' in js
assert '<svg' not in js[js.index('function avatar('):js.index('const me=()')]
assert 'data-theme="dark"' in css
assert 'localStorage' in js and 'function save()' in js and 'function load()' in js
old_ids=re.findall(r"\bE\('([^']+)','(?:baby|child|teen|young|adult|senior)'",js)
rewrite_ids=re.findall(r'^  "([a-z]+)": \{',rewrites,re.M)
assert len(old_ids)==92, len(old_ids)
assert set(rewrite_ids)==set(old_ids), (len(rewrite_ids),set(old_ids)-set(rewrite_ids))
print(f'PASS: {len(old_ids)} original events have editorial rewrites, DiceBear is wired, relative assets and saves are retained.')