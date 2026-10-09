"""Full aging regression: many lifetimes, no missing NPC interpolation or crashed stage."""
from pathlib import Path
from playwright.sync_api import sync_playwright
root=Path(__file__).resolve().parent.parent
html=(root/'index.html').read_text().replace('<link rel="stylesheet" href="./assets/styles.css">','<style>'+(root/'assets/styles.css').read_text()+'</style>')
for f in ['assets/legacy-rewrites.js','assets/childhood.js','assets/later-life.js','assets/legacy-outcomes.js','assets/passive-life.js','assets/career-stories.js','assets/hobby-world.js','assets/game.js']:
    script=(root/f).read_text()
    if f=='assets/game.js':script=script.replace('startingLook=newLook();load();','window.__lifeQA={state:()=>s,newGame,ageUp};startingLook=newLook();load();')
    html=html.replace('<script src="./'+f+'"></script>','<script>'+script+'</script>')
with sync_playwright() as pw:
    browser=pw.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage','--no-proxy-server'])
    page=browser.new_page(viewport={'width':390,'height':844})
    errors=[];page.on('pageerror',lambda x:errors.append(str(x)))
    page.goto('about:blank')
    page.evaluate('''() => {const memory={};Object.defineProperty(window,'localStorage',{configurable:true,value:{setItem(k,v){memory[k]=v},getItem(k){return memory[k]||null}}});}''')
    page.set_content(html)
    result=page.evaluate('''() => { const q=window.__lifeQA, reports=[];
       for(let test=0;test<5;test++){
          q.newGame('Rowan Vale','sporty',test===0?0:12);
          const s=q.state();let years=0;
          for(let t=0;t<106;t++){
            if(s.flags.ended)break;
            if(s.age===21){s.jobId='developer';s.skills.coding=70;}
            if(s.age===42){s.jobId='writer';s.skills.writing=90;}
            q.ageUp();years++;
          }
          const saved=s.history.filter(h=>h.kind==='passive');
          if(years<40)throw Error('too few years '+years);
          if(saved.length<30)throw Error('too few passive scenes '+saved.length);
          if(saved.some(h=>/\\{[a-z]+\\}/i.test(h.detail)))throw Error('unreplaced placeholder');
          if(s.people.some(p=>p.born>s.year))throw Error('future born NPC');
          reports.push({years,passive:saved.length,unique:new Set(saved.map(h=>h.title)).size,career:s.history.filter(h=>h.kind==='work').length,people:s.people.length});
       }
       return reports;
    }''')
    assert not errors,errors
    print('LIFETIME PASS',result)
    browser.close()