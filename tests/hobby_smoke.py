"""Interactive coverage for creative practice, D&D, new pursuits, skill drift and iPad layout."""
from pathlib import Path
from playwright.sync_api import sync_playwright
root=Path(__file__).resolve().parent.parent
html=(root/'index.html').read_text().replace('<link rel="stylesheet" href="./assets/styles.css">','<style>'+(root/'assets/styles.css').read_text()+'</style>')
scripts=['assets/legacy-rewrites.js','assets/childhood.js','assets/later-life.js','assets/legacy-outcomes.js','assets/passive-life.js','assets/career-stories.js','assets/hobby-world.js','assets/game.js']
for src in scripts:
    script=(root/src).read_text()
    if src=='assets/game.js':
        script=script.replace('startingLook=newLook();load();', '''window.__hobbyQA={state:()=>s,newGame,ageUp,activities,hobbyMenu,hobbyDo,musicMenu,ll5DnD,hobbyState,save,hobbyById,skillIcons};startingLook=newLook();load();''')
    html=html.replace('<script src="./'+src+'"></script>','<script>'+script+'</script>')
with sync_playwright() as pw:
    browser=pw.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage','--no-proxy-server'])
    for width in (320,390,768,1024):
        page=browser.new_page(viewport={'width':width,'height':850})
        errors=[]
        page.on('pageerror',lambda exc:errors.append(str(exc)))
        page.goto('about:blank')
        page.evaluate('''()=>{const store={};Object.defineProperty(window,'localStorage',{configurable:true,value:{getItem(k){return store[k]||null;},setItem(k,v){store[k]=v;},removeItem(k){delete store[k];}}});}''')
        page.set_content(html)
        page.evaluate("__hobbyQA.newGame('Mira Hart','creative',15)")
        page.evaluate("()=>{document.querySelectorAll('.modal button[data-modal]')[0]?.click();document.querySelector('[data-tab=\"activities\"]')?.click();}")
        assert page.locator('[data-activity="club"]').count()==1, 'club vanished from hobby menu'
        assert page.locator('[data-activity="hobby:music"]').count()==1
        assert page.locator('[data-activity="hobby:fencing"]').count()==1
        assert page.locator('[data-activity="hobby:birdwatching"]').count()==1
        assert page.locator('.hobby-group').count()==4
        # Free instrument selection and a paid practice must have different behavior.
        page.locator('[data-activity="hobby:music"]').click()
        page.get_by_role('button',name='🎸 Guitar').click()
        chosen=page.evaluate('''()=>({energy:__hobbyQA.state().energy,instrument:__hobbyQA.state().instrument})''')
        assert chosen=={'energy':3,'instrument':'guitar'},chosen
        page.get_by_role('button',name='🎼 Practice').click()
        m=page.evaluate('''()=>({skill:__hobbyQA.state().skills.music,energy:__hobbyQA.state().energy,log:__hobbyQA.state().history[0].detail})''')
        assert m['skill']>=2 and m['energy']==2 and '→' in m['log'],m
        # Songwriting gives a real named artifact and positive skill growth.
        page.evaluate("()=>{document.querySelector('[data-close]')?.click();__hobbyQA.musicMenu()}")
        page.get_by_role('button',name='Write a song').click()
        page.get_by_role('button',name='Folk',exact=True).click()
        song=page.evaluate('''()=>({song:__hobbyQA.state().hobbyWorld.music.songs[0],music:__hobbyQA.state().skills.music,energy:__hobbyQA.state().energy})''')
        assert song['song']['name'] and song['song']['instrument']=='guitar' and song['music']>m['skill'] and song['energy']==1,song
        # D&D character is persistent and improves when a session is actually played.
        page.evaluate("()=>{document.querySelector('[data-close]')?.click();__hobbyQA.ll5DnD()}")
        page.get_by_role('button',name='Create your first character').click()
        page.get_by_role('button',name='Rogue',exact=True).click()
        hero=page.evaluate('''()=>({hero:__hobbyQA.state().tabletopHero,cl:__hobbyQA.state().tabletopClass,energy:__hobbyQA.state().energy})''')
        assert hero['hero'] and hero['cl']=='Rogue' and hero['energy']==1,hero
        page.get_by_role('button',name='Play the first session').click()
        page.locator('.modal button[data-modal]').first.click()
        dnd=page.evaluate('''()=>({value:__hobbyQA.state().skills.tabletop,quests:__hobbyQA.state().hobbyWorld.party.quests,energy:__hobbyQA.state().energy})''')
        assert dnd['value']>=3 and dnd['quests']==1 and dnd['energy']==0,dnd
        # New hobby has actual outcomes, progression even on failure, and no cash for minors.
        page.evaluate("__hobbyQA.newGame('June Fox','curious',13)")
        page.evaluate("()=>{const s=__hobbyQA.state();s.energy=3;__hobbyQA.hobbyMenu('archaeology')}")
        page.locator('.modal button[data-modal]').first.click()
        dig=page.evaluate('''()=>({value:__hobbyQA.state().skills.archaeology,energy:__hobbyQA.state().energy,record:__hobbyQA.state().hobbyWorld.notes[0],cash:__hobbyQA.state().cash})''')
        assert dig['value']>0 and dig['energy']==2 and dig['record']['skill']=='archaeology' and dig['cash']==0,dig
        page.evaluate('''()=>{const s=__hobbyQA.state();s.skills.archaeology=60;s.hobbyWorld.last.archaeology=s.year-4;__hobbyQA.ageUp()}''')
        decay=page.evaluate('''()=>({year:__hobbyQA.state().year,skill:__hobbyQA.state().skills.archaeology,log:__hobbyQA.state().history.filter(x=>x.title.startsWith('Rusty at ')).length})''')
        assert decay['year']==2027 and decay['log']>=1 and decay['skill']<60,decay
        assert page.evaluate('''()=>document.documentElement.scrollWidth<=innerWidth'''),f'overflow at {width}'
        assert not errors,(width,errors)
        print('HOBBY PASS',width,{'music':m['skill'],'song':song['song']['name'],'hero':hero['hero'],'quests':dnd['quests'],'archaeology':dig['value'],'decay':decay['skill'],'new':len(page.evaluate('window.LITTLE_LIFE_HOBBY_WORLD.added'))})
        page.close()
    browser.close()