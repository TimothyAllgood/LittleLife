"""Audit the rewritten events and play the weirdest parts on phone and iPad sizes."""
from pathlib import Path
import re
from playwright.sync_api import sync_playwright

root=Path(__file__).resolve().parent.parent
html=(root/'index.html').read_text().replace('<link rel="stylesheet" href="./assets/styles.css">','<style>'+(root/'assets/styles.css').read_text()+'</style>')
for name in re.findall(r'<script src="\./([^"]+)"></script>',html):
    code=(root/name).read_text()
    if name=='assets/game.js':
        code=code.replace('startingLook=newLook();load();', '''window.__oddQA={state:()=>s,events,newGame,ageUp,save,load,resolveEvent,context,showAnnualEvent,eventOptions};startingLook=newLook();load();''')
    html=html.replace(f'<script src="./{name}"></script>','<script>'+code+'</script>')

with sync_playwright() as play:
    browser=play.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage','--no-proxy-server'])
    for width in (320,390,768,1024):
        page=browser.new_page(viewport={'width':width,'height':830})
        errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
        page.goto('about:blank')
        page.evaluate('''()=>{let memory={};Object.defineProperty(window,'localStorage',{configurable:true,value:{setItem:(k,v)=>memory[k]=v,getItem:k=>memory[k]||null,removeItem:k=>delete memory[k]}})}''')
        page.set_content(html)
        check=page.evaluate('''()=>{
            let q=window.__oddQA;
            const newScenes=q.events.filter(e=>e.id.startsWith('odd_'));
            const ids=new Set(q.events.map(e=>e.id));
            const authored=Object.keys(window.LITTLE_LIFE_EDITORIAL.edits);
            if(newScenes.length!==40)throw Error('Expected 40 specific scenes, got '+newScenes.length);
            if(authored.length<110)throw Error('Insufficient cross-era editorial rewrites: '+authored.length);
            if(ids.size!==q.events.length)throw Error('Duplicate saved event ID');
            if(newScenes.some(e=>e.choices.length!==3))throw Error('Each story needs 3 decisions');
            if(newScenes.some(e=>e.choices.some(c=>!(c.ok&&c.no))))throw Error('Choices missing effects');
            if(newScenes.some(e=>e.choices.some(c=>!c.good||!c.bad)))throw Error('Missing result');
            if(!newScenes.some(e=>e.choices.some(c=>c.winVariants.length>1)))throw Error('No alternate outcomes');
            if(!newScenes.some(e=>e.choices.some(c=>c.ok.follow)))throw Error('No multi-year callbacks');
            let rare=window.LITTLE_LIFE_ODDITIES.scenes.filter(e=>e.rare).length;
            if(rare!==5)throw Error('Expected rare mysteries');
            const old=q.events.find(e=>e.id==='familylegacy');
            if(old.choices[0].good.includes('something special'))throw Error('Old vague outcome was not revised');
            if(q.events.find(e=>e.id==='ll5_job_dungeonmaster').choices[1].bad.includes('problem gets worse'))throw Error('Generic career copy survived');
            q.newGame('Nico Hart','curious',10);
            const baby=q.events.find(e=>e.id==='odd_tax-form'),school=q.events.find(e=>e.id==='odd_goose-mayor');
            if(baby.when(q.state()))throw Error('Baby story showing at age ten');
            if(!school.when(q.state()))throw Error('Child story missing');
            const prevHistory=q.state().history.length;
            let random=Math.random;Math.random=()=>.01;
            let c=school.choices[0];q.resolveEvent(school,c,q.context());
            Math.random=random;
            if(q.state().history.length<=prevHistory)throw Error('No outcome journal');
            if(!q.state().promises.some(p=>p.text.includes('Mayor Honk')))throw Error('No branch-specific callback');
            if(q.state().skills.writing<6)throw Error('Written outcome did not award skill');
            q.save();q.load();
            if(!q.state().promises.some(p=>p.text.includes('Mayor Honk')))throw Error('Lost callback on reload');
            q.newGame('Ada Reid','creative',30);
            const fern=q.events.find(e=>e.id==='odd_office-plant-coup');
            if(fern.when(q.state()))throw Error('Work event without job');
            q.state().jobId='developer';
            if(!fern.when(q.state()))throw Error('Work event with job missing');
            q.state().eventsSeen[fern.id]=1;
            if(fern.when(q.state()))throw Error('One-per-life event repeats');
            const rareScene=q.events.find(e=>e.id==='odd_clock-duplicate');
            if(!rareScene.when(q.state()))throw Error('Adult rare story not eligible');
            return {all:q.events.length,added:newScenes.length,rewrites:authored.length,rare,callbacks:q.state().promises.length};
        }''')
        page.evaluate('window.__oddQA.newGame("Rory Hale","social",15)')
        if page.locator('.modal [data-modal]').count():page.locator('.modal [data-modal]').first.click()
        assert page.locator('.top-age-button').is_visible(),width
        assert not page.evaluate('document.documentElement.scrollWidth>innerWidth'),f'horizontal overflow: {width}'
        page.locator('[data-do="theme"]').first.click()
        assert page.evaluate('document.documentElement.dataset.theme')=='dark',width
        assert not errors,(width,errors)
        print('ODDITIES PASS',width,check)
        page.close()
    browser.close()