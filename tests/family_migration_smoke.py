"""Family genders, genealogy, age boundaries, pregnancy, and iPad interactions."""
from pathlib import Path
from playwright.sync_api import sync_playwright
import re

root=Path(__file__).resolve().parent.parent
html=(root/'index.html').read_text().replace('<link rel="stylesheet" href="./assets/styles.css">','<style>'+(root/'assets/styles.css').read_text()+'</style>')
for file in re.findall(r'<script src="\./(assets/[\w-]+\.js)"></script>',html):
    js=(root/file).read_text()
    if file.endswith('game.js'):
        js=js.replace('startingLook=newLook();load();', '''window.__familyQA={state:()=>s,newGame,ageUp,save,load,byId,parents,siblings,children,family,role,makePerson,makeFriend,birthChild,completeBirth,partner,connectPartner,treeTab,peopleModal,makeAcquaintance, socialMove, socialYears,render,familyTarget, familyRelation, familyBirthPopup};startingLook=newLook();load();''')
    html=html.replace(f'<script src="./{file}"></script>','<script>'+js+'</script>')

with sync_playwright() as p:
    browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage'])
    page=browser.new_page(viewport={'width':390,'height':820})
    errors=[];page.on('pageerror',lambda exc:errors.append(str(exc)))
    page.goto('about:blank')
    page.evaluate('''()=>{const c={};Object.defineProperty(window,'localStorage',{configurable:true,value:{getItem:k=>c[k]||null,setItem:(k,v)=>{c[k]=v},removeItem:k=>delete c[k]}})}''')
    page.set_content(html)
    page.locator('[data-setup="begin"]').click()
    page.locator('.modal [data-modal]').first.click()
    check=page.evaluate('''()=>{const q=__familyQA,s=q.state();const ids=s.people.map(p=>p.id),n=s.people.length;s.people.forEach(p=>delete p.gender);delete s.familyWorld;q.save();q.load();return {old:n,after:q.state().people.length,ids:JSON.stringify(ids),now:JSON.stringify(q.state().people.map(p=>p.id)),genders:q.state().people.every(p=>['male','female'].includes(p.gender))}}''')
    assert check['genders'] and check['old']==check['after'] and check['ids']==check['now'],check
    unavailable=page.evaluate('''()=>{const q=__familyQA,s=q.state();s.age=26;q.byId(s.playerId).born=s.year-26;s.energy=3;const p=q.makePerson('Tessa Same',s.year-26,[],'acquaintance');p.gender=q.byId(s.playerId).gender;p.bonds[s.playerId]=99;q.socialMove(p.id,'askout');return s.partnerId;}''')
    assert unavailable is None,unavailable
    page.evaluate('''()=>{const q=__familyQA,s=q.state();const co=q.makePerson('Ben Partner',s.year-28,[],'romance');co.gender='male';s.partnerId=co.id;co.bonds[s.playerId]=90;s.cash=7000;s.energy=3;q.render()}''')
    page.locator('.bottom-nav [data-tab="life"]').click()
    page.locator('[data-do="baby"]').first.click()
    page.locator('.modal [data-modal]').nth(2).click()
    assert 'Naming a surprise' in page.locator('.modal').inner_text()
    page.locator('.modal [data-modal]').first.click()
    pending=page.evaluate('''()=>__familyQA.state().expecting''')
    assert pending['surprise'] and pending['gender'] is None,pending
    page.locator('.modal [data-close]').click()
    page.locator('.top-age-button').click()
    assert "It's a " in page.locator('.modal').inner_text()
    new=page.evaluate('''()=>{const q=__familyQA,s=q.state(),a=q.byId(s.playerId);return q.children(a).map(c=>({gender:c.gender,role:q.role(c)}))}''')
    assert new and new[-1]['gender'] in ('male','female') and new[-1]['role'] in ('Son','Daughter'),new
    assert not errors,errors
    print('FAMILY MIGRATION/SURPRISE PASS',check['old'],'retained; delivered',new[-1])
    page.close();browser.close()