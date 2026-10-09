"""Run with `python3 tests/browser_smoke.py` (Chromium + Playwright). No remote network needed."""
from pathlib import Path
from playwright.sync_api import sync_playwright
root=Path(__file__).resolve().parent.parent
files=['assets/legacy-rewrites.js','assets/childhood.js','assets/later-life.js','assets/legacy-outcomes.js','assets/passive-life.js','assets/career-stories.js','assets/hobby-world.js','assets/world-social.js','assets/personality-world.js','assets/game.js']
html=(root/'index.html').read_text()
html=html.replace('<link rel="stylesheet" href="./assets/styles.css">','<style>'+(root/'assets/styles.css').read_text()+'</style>')
for f in files:
 script=(root/f).read_text()
 if f=='assets/game.js':
  # Inject a QA-only inspection seam, never included in the shipped game.
  assert 'startingLook=newLook();load();' in script
  script=script.replace('startingLook=newLook();load();', '''window.__qa={
   state:()=>s,
   events:()=>events,
   context,
   resolveEvent,
   ageUp,
   newGame,
   eventOptions,
   showAnnualEvent
  };startingLook=newLook();load();''')
 html=html.replace('<script src="./'+f+'"></script>','<script>'+script+'</script>')
with sync_playwright() as p:
 browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage','--no-proxy-server'])
 for width in (320,390,768,1024):
  page=browser.new_page(viewport={'width':width,'height':850})
  errors=[]
  page.on('pageerror', lambda err:errors.append(str(err)))
  page.goto('about:blank')
  page.evaluate('''() => { window.__store = {}; Object.defineProperty(window, "localStorage", {configurable:true,value:{setItem(k,v){window.__store[k]=v},getItem(k){return window.__store[k]||null},removeItem(k){delete window.__store[k]},get length(){return Object.keys(window.__store).length}}}); }''')
  page.set_content(html)
  assert page.locator('h1').count()>0,errors
  assert page.locator('.name-dice').count()==1
  page.locator('.name-dice').click()
  generated=page.locator('#myName').input_value()
  assert len(generated.split())==2,generated
  assert generated not in ('', 'Unnamed')
  img=page.locator('.dicebear-frame img').first
  first=img.get_attribute('src')
  assert 'eyesColor=' in first and 'hairVariant=' in first and 'mouthVariant=' in first,first
  page.locator('[data-appearance="eyes"]:not(.active)').first.click()
  eyes=page.locator('.dicebear-frame img').first.get_attribute('src')
  assert eyes!=first and 'eyesColor=' in eyes
  page.locator('[data-appearance="shape"]:not(.active)').first.click()
  hair=page.locator('.dicebear-frame img').first.get_attribute('src')
  assert hair!=eyes and 'hairVariant=' in hair
  page.locator('[data-do="theme"]').first.click()
  assert page.evaluate('document.documentElement.dataset.theme')=='dark'
  page.locator('[data-start="0"]').click()
  assert page.locator('#myName').input_value()==generated
  page.locator('[data-setup="begin"]').click()
  assert page.evaluate("__qa.state().people.find(x=>x.id===__qa.state().playerId).name")==generated
  assert page.evaluate('''() => {const s=__qa.state(),player=s.people.find(x=>x.id===s.playerId);const last=player.name.split(' ').at(-1);return s.people.filter(x=>x.id!==player.id).some(p=>p.name.split(' ').at(-1)===last);}''')
  if page.locator('.modal [data-modal]').count():page.locator('.modal [data-modal]').first.click()
  assert page.locator('[data-tab=activities]').count()>0,errors
  # Child story content (including branching chains) was loaded before game.js.
  data=page.evaluate('''() => ({
   count:window.LITTLE_LIFE_CHILDHOOD.stories.length,
   arcs:window.LITTLE_LIFE_CHILDHOOD.arcs.length,
   outcomes:Object.keys(window.LITTLE_LIFE_LEGACY_OUTCOMES).length,
   old:__qa.events().filter(e=>e.id==='classpet')[0].choices[0].v3,
   originalNames:__qa.events().filter(e=>e.id.startsWith('kid_')).length
  })''')
  assert data['count']>=30 and data['arcs']>=5 and data['outcomes']>=90 and data['old'] and data['originalNames']>=45,data
  arc=page.evaluate('''() => {
   __qa.newGame('Poppy Lane','curious',8);
   let e=__qa.events().find(e=>e.id==='kid_arc_library_key_0');
   __qa.resolveEvent(e,e.choices[0],__qa.context());
   const first=__qa.state().childhoodArcs.library_key;
   __qa.state().year=first.due;
   let second=__qa.events().find(e=>e.id==='kid_arc_library_key_1');
   if(!second.when(__qa.state()))throw Error('missing second chapter');
   __qa.resolveEvent(second,second.choices[0],__qa.context());
   let state=__qa.state().childhoodArcs.library_key;
   __qa.state().year=state.due;
   let third=__qa.events().find(e=>e.id==='kid_arc_library_key_2');
   if(!third.when(__qa.state()))throw Error('missing final chapter');
   __qa.resolveEvent(third,third.choices[0],__qa.context());
   return {step:__qa.state().childhoodArcs.library_key.step,completed:__qa.state().childhoodArcs.library_key.completed,echoes:__qa.state().promises.length,history:__qa.state().history.length};
  }''')
  assert arc['step']==3 and arc['completed'] and arc['echoes']>=1,arc
  # Retell a different opening path; chapter two and delayed callbacks must diverge.
  branches=page.evaluate('''() => {
    const paths=[];
    for(const chosen of [0,1,2]) {
      __qa.newGame('Poppy Lane','curious',8);
      const first=__qa.events().find(e=>e.id==='kid_arc_library_key_0');
      __qa.resolveEvent(first,first.choices[chosen],__qa.context());
      __qa.state().year=__qa.state().childhoodArcs.library_key.due;
      let next;
      for(let i=0;i<80;i++) {next=__qa.eventOptions();if(next?.id==='kid_arc_library_key_1')break;}
      if(next?.id!=='kid_arc_library_key_1')throw Error('The sequel was never offered');
      const intro=next.text;
      __qa.resolveEvent(next,next.choices[0],__qa.context());
      __qa.state().year=__qa.state().childhoodArcs.library_key.due;
      for(let i=0;i<80;i++) {next=__qa.eventOptions();if(next?.id==='kid_arc_library_key_2')break;}
      __qa.resolveEvent(next,next.choices[0],__qa.context());
      paths.push([intro,__qa.state().promises.at(-1).text,__qa.state().childhoodArcs.library_key.firstChoice]);
    }
    return paths;
  }''')
  assert len({x[0] for x in branches})==3,branches
  assert len({x[1] for x in branches})==3,branches
  assert [x[2] for x in branches]==[0,1,2],branches
  if page.locator('.modal [data-modal]').count():page.locator('.modal [data-modal]').first.click()
  page.locator('[data-do=style]').first.click()
  assert page.locator('[data-appearance="eyes"]').count()>0
  page.locator('[data-setup=saveLook]').click()
  assert not errors,errors
  width_scroll=page.evaluate('document.documentElement.scrollWidth>innerWidth')
  assert not width_scroll,f'Horizontal overflow at {width}px'
  print(f'BROWSER PASS {width}px | {data["count"]} scenes, {data["arcs"]} arcs, {data["outcomes"]} legacy rewrites | dark mode, avatar and child arc')
  page.close()
 browser.close()