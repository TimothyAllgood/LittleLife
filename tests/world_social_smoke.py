"""Browser coverage for living world, named NPCs, branches, dating, financial impact and saves."""
from pathlib import Path
from playwright.sync_api import sync_playwright
root=Path(__file__).resolve().parent.parent
html=(root/'index.html').read_text().replace('<link rel="stylesheet" href="./assets/styles.css">','<style>'+(root/'assets/styles.css').read_text()+'</style>')
scripts=['legacy-rewrites','childhood','later-life','legacy-outcomes','passive-life','career-stories','hobby-world','world-social','game']
for src in scripts:
    path='assets/'+src+'.js';code=(root/path).read_text()
    if src=='game':
        code=code.replace('startingLook=newLook();load();', '''window.__worldQA={state:()=>s,newGame,worldNewsItem,worldYear,tradeMarket,investmentValue,makeAcquaintance,socialMove,npcStory,peopleModal,ageUp,save,load,fill,addLog,byId};startingLook=newLook();load();''')
    html=html.replace('<script src="./'+path+'"></script>','<script>'+code+'</script>')
with sync_playwright() as p:
  browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage','--no-proxy-server'])
  for width in (320,390,768,1024):
    page=browser.new_page(viewport={'width':width,'height':860})
    errors=[];page.on('pageerror',lambda exc:errors.append(str(exc)))
    page.goto('about:blank')
    page.evaluate('''()=>{const data={};Object.defineProperty(window,'localStorage',{configurable:true,value:{getItem:k=>data[k]||null,setItem:(k,v)=>{data[k]=v},removeItem:k=>delete data[k]}})}''')
    page.set_content(html)
    page.evaluate("__worldQA.newGame('Avery Reed','curious',25)")
    page.evaluate("document.querySelector('[data-close]')?.click()")
    assert page.locator('.world-paper').count()==1
    count=page.evaluate('window.LITTLE_LIFE_WORLD_SOCIAL.news.length')
    assert count>=30,count
    stories=page.evaluate('window.LITTLE_LIFE_WORLD_SOCIAL.npcStories.length')
    assert stories>=12,stories
    crash=page.evaluate('''()=>{const q=__worldQA,x=q.state(),prev=x.world.index;const evt=window.LITTLE_LIFE_WORLD_SOCIAL.news.find(x=>x.id==='market-crash');q.worldNewsItem(evt);return {now:x.world.index,before:prev,prices:x.world.prices,jobs:x.world.jobs,log:x.history[0]}}''')
    assert crash['now']<crash['before'] and crash['jobs']<0,crash
    page.evaluate('''()=>{__worldQA.state().cash=8000;__worldQA.tradeMarket(true)}''')
    page.locator('[data-modal]').first.click()
    saved=page.evaluate('''()=>({shares:__worldQA.state().world.shares,cash:__worldQA.state().cash,value:__worldQA.investmentValue()})''')
    assert saved['shares']>0 and saved['cash']==7500,saved
    # Direct newspaper consequences change a held investment's value.
    before=saved['value']
    market=page.evaluate('''()=>{const q=__worldQA,x=q.state(),evt=window.LITTLE_LIFE_WORLD_SOCIAL.news.find(x=>x.id==='bull-run');q.worldNewsItem(evt);return q.investmentValue()}''')
    assert market>before,(market,before)
    person=page.evaluate('''()=>{const q=__worldQA,p=q.makeAcquaintance(false);q.save();return {id:p.id,name:p.name,interest:p.npc.interest,quirk:p.npc.quirk}}''')
    assert person['name'] and person['interest'] and person['quirk'],person
    page.evaluate('''(id)=>{__worldQA.state().energy=3;__worldQA.peopleModal(id)}''',person['id'])
    choices=page.locator('.modal [data-modal]').all_text_contents()
    assert any('Flirt' in x for x in choices),choices
    assert any('story together' in x for x in choices),choices
    # NPC story with a skill check, consequences and follow-up history.
    page.evaluate('''(id)=>{const x=__worldQA.state();x.skills.social=95;__worldQA.npcStory(__worldQA.byId(id));}''',person['id'])
    assert page.locator('.modal [data-modal]').count()>=3
    page.locator('.modal [data-modal]').first.click()
    outcome=page.evaluate('''(id)=>{const q=__worldQA,x=q.state(),n=q.byId(id);return {energy:x.energy,mem:n.npc.history[x.playerId].encounters,story:x.history.find(h=>h.kind==='social'),seen:x.socialWorld.storySeen}}''',person['id'])
    assert outcome['energy']==2 and outcome['mem']>=1 and outcome['story'] and outcome['seen'],outcome
    # All kinds of characters have names; grandmother, classmate, colleague and neighbor are persistent.
    names=page.evaluate('''()=>{const q=__worldQA;return [q.fill('your grandma visited the shop',{}),q.fill('a classmate dropped the lunch tray',{}),q.fill('your neighbor borrowed a ladder',{}),q.fill('a coworker brought snacks',{})]}''')
    assert all(x and not any(term in x.lower() for term in ['your grandma','a classmate','your neighbor','a coworker']) for x in names),names
    page.evaluate('''()=>{__worldQA.state().energy=3;__worldQA.save()}''')
    page.evaluate('__worldQA.load()')
    recovered=page.evaluate('''(id)=>{const q=__worldQA,x=q.state();return {npc:q.byId(id).npc.interest,shares:x.world.shares,seen:x.socialWorld.storySeen}}''',person['id'])
    assert recovered['npc']==person['interest'] and recovered['shares']>0 and recovered['seen'],recovered
    # Age-up introduces background headlines and independent NPC lives, no fatal runtime.
    page.evaluate('''()=>{for(let i=0;i<7;i++){const x=__worldQA.state();if(x.flags.ended)break;__worldQA.ageUp()}}''')
    total=page.evaluate('''()=>({headlines:__worldQA.state().world.events.length,people:__worldQA.state().people.length,year:__worldQA.state().year,worldNews:__worldQA.state().history.filter(h=>h.kind==='world').length})''')
    assert total['headlines']>=2 and total['people']>=6,total
    page.evaluate('''()=>{document.querySelector('[data-close]')?.click();document.querySelector('[data-tab="people"]')?.click()}''')
    assert page.get_by_text('People you\'ve met').count()>=1
    assert page.evaluate('document.documentElement.scrollWidth<=innerWidth'),f'overflow {width}'
    assert not errors,(width,errors)
    print('WORLD SOCIAL PASS',width,{'news':count,'npc_stories':stories,'headlines':total['headlines'],'people':total['people'],'invested':saved['value']})
    page.close()
  browser.close()