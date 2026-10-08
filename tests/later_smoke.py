"""Focused interactive tests for the later-life expansion. Run locally with Chromium and Playwright."""
from pathlib import Path
from playwright.sync_api import sync_playwright
root=Path(__file__).resolve().parent.parent
html=(root/'index.html').read_text().replace('<link rel="stylesheet" href="./assets/styles.css">','<style>'+(root/'assets/styles.css').read_text()+'</style>')
files=['assets/legacy-rewrites.js','assets/childhood.js','assets/later-life.js','assets/legacy-outcomes.js','assets/game.js']
for f in files:
 script=(root/f).read_text()
 if f=='assets/game.js':
  seam='''window.__llLaterQA={state:()=>s,events:()=>events,newGame,resolveEvent,context,eventOptions,skillShowcase,medicalVisit,retireNow,retirementHomes,annualLife,passAway,activities,journalTab,home,save};startingLook=newLook();load();'''
  assert 'startingLook=newLook();load();' in script
  script=script.replace('startingLook=newLook();load();',seam)
 html=html.replace('<script src="./'+f+'"></script>','<script>'+script+'</script>')
with sync_playwright() as pw:
 browser=pw.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage','--no-proxy-server'])
 for width in (320,390,768,1024):
  page=browser.new_page(viewport={'width':width,'height':840})
  errors=[]
  page.on('pageerror',lambda err:errors.append(str(err)))
  page.goto('about:blank')
  page.evaluate('''() => { const d={};Object.defineProperty(window,'localStorage',{configurable:true,value:{setItem(k,v){d[k]=v},getItem(k){return d[k]||null},removeItem(k){delete d[k]}}});}''')
  page.set_content(html)
  result=page.evaluate('''() => {
   const qa=__llLaterQA, data=window.LITTLE_LIFE_LATER;
   if(data.scenes.length<80||data.jobs.length<35||data.arcs.length!==5)throw Error('catalog incomplete');
   qa.newGame('Tessa Hart','creative',14);
   let s=qa.state(),ev=qa.events().find(e=>e.id==='later_foodfight');if(!ev||ev.choices.length!==3)throw Error('food fight missing');
   qa.resolveEvent(ev,ev.choices[1],qa.context());
   if(!s.history.some(h=>h.title==='Operation Marinara'))throw Error('food fight did not save');
   qa.newGame('Tessa Hart','curious',14);s=qa.state();
   const first=qa.events().find(e=>e.id==='later_arc_schoolnewspaper_0');
   if(!first.when(s))throw Error('first chapter locked');
   qa.resolveEvent(first,first.choices[0],qa.context());
   const a=s.laterArcs.schoolnewspaper;if(a.step!==1)throw Error('first chapter did not start');
   s.year=a.nextYear;
   let second=qa.events().find(e=>e.id==='later_arc_schoolnewspaper_1');
   if(!second.when(s))throw Error('sequel not due');
   let intro='';for(let n=0;n<100;n++){let hit=qa.eventOptions();if(hit?.id===second.id){intro=hit.text;break;}}
   if(!intro.includes('receipts you guarded'))throw Error('previous choice was not remembered: '+intro);
   qa.resolveEvent(second,second.choices[0],qa.context());s.year=s.laterArcs.schoolnewspaper.nextYear;
   const third=qa.events().find(e=>e.id==='later_arc_schoolnewspaper_2');
   if(!third.when(s))throw Error('final chapter missing');
   qa.resolveEvent(third,third.choices[0],qa.context());
   if(!s.laterArcs.schoolnewspaper.finished||!s.promises.length)throw Error('no later echo');
   qa.newGame('Jamie Cole','curious',35);s=qa.state();s.skills.art=100;s.energy=3;s.cash=30000;
   qa.skillShowcase();
   const opts=Array.from(document.querySelectorAll('.modal button[data-modal]'));
   if(!opts.length)throw Error('showcase did not open');
   const firstOpt=opts.find(x=>x.textContent.includes('County gallery'))||opts[0];const priorRandom=Math.random;Math.random=()=>0.01;firstOpt.click();Math.random=priorRandom;
   if(!s.trophies.some(t=>t.name==='County gallery night'))throw Error('skills did not earn trophy');
   if(s.lastShowcaseYear!==s.year)throw Error('skill showcase repeat not locked');
   const cashBefore=s.cash;
   s.illnesses=[{id:'flu',name:'the flu',years:2,harm:13,cost:210}];s.energy=3;
   qa.medicalVisit();
   const choice=Array.from(document.querySelectorAll('.modal button[data-modal]')).find(x=>x.textContent.includes('treatment'));
   if(!choice)throw Error('treatment choice missing');choice.click();
   if(s.cash>=cashBefore)throw Error('treatment did not cost money');
   qa.newGame('Marta Woods','social',67);s=qa.state();s.cash=160000;s.jobId='teacher';s.jobYears=20;s.energy=3;
   qa.retireNow();
   const leave=Array.from(document.querySelectorAll('.modal button[data-modal]')).find(x=>x.textContent.includes('keys'));
   if(!leave)throw Error('retirement confirmation missing');leave.click();
   if(!s.flags.retired||s.jobId!==null||s.pension<1000)throw Error('retirement failed');
   qa.retirementHomes();
   const home=Array.from(document.querySelectorAll('.modal button[data-modal]')).find(x=>x.textContent.includes('Golden Hour'));
   if(!home)throw Error('retirement homes missing');home.click();
   if(s.retirementHome!=='golden')throw Error('did not move');
   const previous=s.cash;qa.annualLife();if(s.cash>=previous)throw Error('retirement home did not charge yearly');
   if(!qa.journalTab().includes('THE STORY SO FAR'))throw Error('dynamic journal missing');
   qa.save();if(!localStorage.getItem('little-life-2026-v2').includes('golden'))throw Error('retirement not persisted');
   qa.passAway();
   if(!s.flags.ended||!s.lives.at(-1).cause)throw Error('death reason not recorded');
   return {scenes:data.scenes.length,arcs:data.arcs.length,careers:data.jobs.length,illnesses:data.illnesses.length,retirement:s.retirementHome,health:s.stats.health};
  }''')
  assert not errors,(width,errors)
  assert not page.evaluate('document.documentElement.scrollWidth>innerWidth'),f'overflow {width}'
  print('LATER PASS',width,result)
  page.close()
 browser.close()