"""Interactive character, NPC dispositions, event gates, inheritance, and eccentric endings."""
from pathlib import Path
from playwright.sync_api import sync_playwright

root=Path(__file__).resolve().parent.parent
html=(root/'index.html').read_text().replace('<link rel="stylesheet" href="./assets/styles.css">', '<style>'+(root/'assets/styles.css').read_text()+'</style>')
assets=['legacy-rewrites','childhood','later-life','legacy-outcomes','passive-life','career-stories','hobby-world','world-social','personality-world','game']
for name in assets:
 path=f'assets/{name}.js'
 src=(root/path).read_text()
 if name=='game':
  src=src.replace('startingLook=newLook();load();', '''window.__personaQA={state:()=>s,newGame,save,load,me,byId,makePerson,makeAcquaintance,socialMove,personalitySocialModifier,personalitySkillBoost,personalityState,personalityAnnual,ageUp,passAway,inherit,resolveEvent,events,showAnnualEvent,personalityPicker,personaReflection};startingLook=newLook();load();''')
 html=html.replace(f'<script src="./{path}"></script>', '<script>'+src+'</script>')

with sync_playwright() as p:
 browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage','--no-proxy-server'])
 for width in (320,390,768,1024):
  page=browser.new_page(viewport={'width':width,'height':860})
  failures=[];page.on('pageerror',lambda error:failures.append(str(error)))
  page.goto('about:blank')
  page.evaluate('''()=>{let db={};Object.defineProperty(window,'localStorage',{configurable:true,value:{getItem:k=>db[k]||null,setItem:(k,v)=>{db[k]=v},removeItem:k=>delete db[k]}})}''')
  page.set_content(html)
  n=page.evaluate("window.LITTLE_LIFE_PERSONALITY.profiles.length")
  assert n>=40,n
  assert page.evaluate("window.LITTLE_LIFE_PERSONALITY.scenes.length")>=14
  assert page.evaluate("window.LITTLE_LIFE_PERSONALITY.deaths.length")>=10
  assert page.evaluate("window.LITTLE_LIFE_PERSONALITY.reflections.length")>=12
  page.get_by_role('button',name='prankster',exact=False).first.click()
  assert page.locator('[data-personality="prankster"]').get_attribute('aria-pressed')=='true'
  # The normal Start flow must keep the selected disposition.
  page.evaluate("window.__personaQA.newGame('Avery Reed','creative',12)")
  page.locator('.modal [data-modal]').first.click()
  state=page.evaluate("()=>({trait:__personaQA.me().personality,persona:__personaQA.state().persona,skill:__personaQA.personalitySkillBoost('social')})")
  assert state['trait']=='prankster' and state['persona']['owner'] and state['skill'] is not None,state
  assert page.locator('.persona-card .persona-stat').count()==5
  # The same move should produce different responses from different temperaments.
  people=page.evaluate('''()=>{const q=__personaQA;const x=q.state();const a=q.makeAcquaintance(true),b=q.makeAcquaintance(true);a.personality='kind';b.personality='grudge-holder';x.energy=20;x.skills.social=35;return {a:a.id,b:b.id}}''')
  a=page.evaluate('''id=>{const q=__personaQA,x=q.state(),p=q.byId(id);q.socialMove(id,'talk');return {bond:p.bonds[x.playerId],detail:x.history[0].detail}}''',people['a'])
  b=page.evaluate('''id=>{const q=__personaQA,x=q.state(),p=q.byId(id);q.socialMove(id,'talk');return {bond:p.bonds[x.playerId],detail:x.history[0].detail}}''',people['b'])
  assert a['detail']!=b['detail'] and 'grudge' not in a['detail'].lower(),(a,b)
  assert 'bring up' in b['detail'] or 'not ready' in b['detail'] or 'two summers' in b['detail'],b
  # The explicit character-growth activity consumes energy only when selected.
  before=page.evaluate("()=>({energy:__personaQA.state().energy,persona:__personaQA.state().persona.axes.warmth})")
  page.evaluate('__personaQA.personaReflection()')
  assert page.locator('.modal [data-modal]').count()==4
  page.locator('.modal [data-modal]').nth(2).click()
  after=page.evaluate("()=>({energy:__personaQA.state().energy,persona:__personaQA.state().persona.axes.warmth,year:__personaQA.state().persona.reflectionYear})")
  assert after['energy']==before['energy']-1 and after['persona']>before['persona'],(before,after)
  # One authored event is a real three-way skill check with a two-year callback.
  scene=page.evaluate('''()=>{const q=__personaQA,x=q.state(),ev=q.events.find(e=>e.id==='persona-secret-valentine');x.energy=3;x.skills.social=95;x.age=15;x.year=2029;const prev=x.history.length,random=Math.random;Math.random=()=>.10;q.resolveEvent(ev,ev.choices[0],{friendId:x.friendIds[0]});Math.random=random;return {newLog:x.history[0],seen:x.promises.length,axes:x.persona.axes.warmth,events:ev.choices.length}}''')
  assert scene['events']==3 and '{friend}' not in scene['newLog']['detail'] and ' — ' in scene['newLog']['detail'] and scene['seen']>=1,scene
  # Older saves missing personality axes must recover without resetting the family.
  migrated=page.evaluate('''()=>{const q=__personaQA,x=q.state(),people=x.people.length;delete x.persona;delete q.me().personality;q.save();q.load();return {people:x.people.length,trait:q.me().personality,owner:q.state().persona.owner}}''')
  assert migrated['people']>=5 and migrated['trait'] and migrated['owner'],migrated
  # A named and non-graphic weird cause of death is recorded in both family history and the journal.
  deceased=page.evaluate('''()=>{const q=__personaQA,x=q.state(),m=q.me();x.age=84;x.year=2100;const kid=q.makePerson('Casey Reed',2080,[m.id],'family');x.fate={icon:'🧀',title:'The cheese-wheel incident',text:'A freak cheese wheel mishap became a local legend.',year:2100};q.passAway();return {cause:x.lives.at(-1).cause,journal:x.history[0].title,child:kid.id,ended:x.flags.ended}}''')
  assert deceased['cause']=='The cheese-wheel incident' and deceased['ended']
  page.evaluate('(id)=>__personaQA.inherit(id)',deceased['child'])
  inherited=page.evaluate('''()=>({owner:__personaQA.state().persona.owner,player:__personaQA.state().playerId,fate:__personaQA.state().fate,oldCause:__personaQA.state().lives.at(-1).cause})''')
  assert inherited['owner']==inherited['player'] and inherited['fate'] is None and inherited['oldCause']=='The cheese-wheel incident',inherited
  page.evaluate("()=>{document.querySelector('[data-close]')?.click();document.querySelector('[data-do=theme]')?.click()}")
  assert page.evaluate("document.documentElement.getAttribute('data-theme')")=='dark'
  assert page.evaluate('document.documentElement.scrollWidth<=innerWidth'),f'overflow at {width}'
  assert not failures,(width,failures)
  print('PERSONALITY PASS',width,{'profiles':n,'scene_branches':scene['events'],'inherited':inherited['player'],'loss':deceased['cause']})
  page.close()
 browser.close()