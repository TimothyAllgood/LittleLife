"""Regression coverage for the yearly passive pass, hobbies and specific careers."""
from pathlib import Path
from playwright.sync_api import sync_playwright
root=Path(__file__).resolve().parent.parent
src=(root/'index.html').read_text().replace('<link rel="stylesheet" href="./assets/styles.css">','<style>'+(root/'assets/styles.css').read_text()+'</style>')
for p in ['assets/legacy-rewrites.js','assets/childhood.js','assets/later-life.js','assets/legacy-outcomes.js','assets/passive-life.js','assets/career-stories.js','assets/hobby-world.js','assets/world-social.js','assets/personality-world.js','assets/game.js']:
    code=(root/p).read_text()
    if p=='assets/game.js':
        code=code.replace('startingLook=newLook();load();', '''window.__ripplesQA={state:()=>s,newGame,ageUp,annualLifeRipples,annualWorkRipples,annualCareerChoice,annualSkillMilestones,rippleGate,quitCurrentJob,askForPromotion,outcomeModal,careerResolution,careerSceneRoll,save};startingLook=newLook();load();''')
    src=src.replace('<script src="./'+p+'"></script>','<script>'+code+'</script>')
with sync_playwright() as pw:
    browser=pw.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage','--no-proxy-server'])
    for width in (320,390,768,1024):
        page=browser.new_page(viewport={'width':width,'height':850})
        errors=[]
        page.on('pageerror',lambda e:errors.append(str(e)))
        page.goto('about:blank')
        page.evaluate('''() => { const d={};Object.defineProperty(window,'localStorage',{configurable:true,value:{setItem(k,v){d[k]=v},getItem(k){return d[k]||null},removeItem(k){delete d[k]}}});}''')
        page.set_content(src)
        result=page.evaluate('''() => {
          const q=__ripplesQA,data=window.LITTLE_LIFE_RIPPLES,career=window.LITTLE_LIFE_CAREERS.jobs;
          if(data.scenes.length<90||Object.keys(career).length<80)throw Error('catalog incomplete');
          if(Object.values(career).some(v=>v.length<2))throw Error('career missing authored dilemmas');
          q.newGame('Morgan Hart','creative',8);let s=q.state(),before=s.history.length;
          q.ageUp();const passive=s.history.filter(x=>x.kind==='passive'&&x.age===9);
          if(passive.length<2||passive.length>3)throw Error('passive aging wrong: '+passive.length);
          if(s.rippleCount<2)throw Error('did not count ripples');
          if(passive.some(x=>/\\{[a-z]+\\}/i.test(x.detail)))throw Error('unexpanded placeholders');
          s.skills.music=90;q.annualSkillMilestones();if(s.skillMilestones.music!==3)throw Error('milestones absent');
          const milestones=s.history.filter(x=>x.kind==='milestone');if(!milestones.length)throw Error('milestone not logged');
          s.lastActionRequested='hobby:music';const random=Math.random;Math.random=()=>.01;
          q.outcomeModal('🎵','A song you wrote','You finally finish the chorus.',{music:5});Math.random=random;
          if(!s.history[0].detail.includes('busker'))throw Error('no linked hobby result');
          q.newGame('Jamie Cole','curious',30);s=q.state();s.jobId='developer';s.jobYears=4;s.jobLevel=1;s.skills.coding=90;s.cash=10000;s.energy=3;
          Math.random=()=>.01;q.annualWorkRipples();Math.random=random;
          if(!s.careerHistory.length||!s.history.some(x=>x.kind==='work'))throw Error('no job incident');
          q.annualCareerChoice();
          // Since this choice is probabilistic, force it for the next trial.
          Math.random=()=>.01;q.annualCareerChoice();Math.random=random;
          const choice=Array.from(document.querySelectorAll('[data-modal]')).find(b=>b.textContent.includes('Get to work'));
          if(!choice)throw Error('career dilemma did not open');choice.click();
          if(!s.history.some(x=>x.title==='You earned your keep'||x.title==='Not your finest shift'))throw Error('career choice had no effect');
          q.askForPromotion();
          const ask=Array.from(document.querySelectorAll('[data-modal]')).find(b=>b.textContent.includes('Show the work'));
          if(!ask)throw Error('promotion request absent');ask.click();
          if(s.lastPromotionRequestYear!==s.year)throw Error('request should have annual limit');
          q.quitCurrentJob();
          const exit=Array.from(document.querySelectorAll('[data-modal]')).find(b=>b.textContent.includes('good terms'));
          if(!exit)throw Error('quit confirmation absent');exit.click();
          if(s.jobId!==null||s.jobYears!==0)throw Error('quit did not stop employment');
          q.save();const saved=localStorage.getItem('little-life-2026-v2');
          if(!saved.includes('careerHistory')||!saved.includes('passiveSeen'))throw Error('new state not in save');
          return {passive:passive.length,scenes:data.scenes.length,jobPaths:Object.keys(career).length,careerEntries:Object.values(career).reduce((n,v)=>n+v.length,0),milestones:milestones.length};
        }''')
        assert not errors,(width,errors)
        assert not page.evaluate('document.documentElement.scrollWidth>innerWidth'),f'overflow {width}'
        print('RIPPLES PASS',width,result)
        page.close()
    browser.close()