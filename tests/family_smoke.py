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
    for width in (320,390,768,1024):
        page=browser.new_page(viewport={'width':width,'height':820})
        errors=[];page.on('pageerror',lambda exc:errors.append(str(exc)))
        page.goto('about:blank')
        page.evaluate('''()=>{let c={};Object.defineProperty(window,'localStorage',{configurable:true,value:{getItem:k=>c[k]||null,setItem:(k,v)=>{c[k]=v},removeItem:k=>delete c[k]}})}''')
        page.set_content(html)
        assert page.locator('[data-gender="female"]').count()==1
        page.locator('[data-gender="male"]').click()
        assert page.locator('[data-gender="male"]').get_attribute('aria-pressed')=='true'
        page.locator('[data-setup="begin"]').click()
        page.locator('.modal [data-modal]').first.click()
        x=page.evaluate('''()=>{let q=__familyQA,s=q.state(),me=q.byId(s.playerId),members=q.family();return {gender:me.gender,parents:q.parents(me).map(p=>q.role(p)),grand:members.filter(p=>q.role(p).includes('Grand')).length,cousins:members.filter(p=>q.role(p).includes('Cousin')).length,aunts:members.filter(p=>/Aunt|Uncle/.test(q.role(p))).length,siblings:q.siblings(me).map(p=>q.role(p))}}''')
        assert x['gender']=='male' and sorted(x['parents'])==['Father','Mother'],x
        assert x['grand']>=4 and x['cousins']>=2 and x['aunts']>=2,x
        page.locator('.bottom-nav [data-tab="tree"]').click()
        buttons=page.locator('.tree-hit[data-person]')
        assert buttons.count()>=8,(width,buttons.count())
        b=page.locator('.family-branches .tree-hit').first
        name=b.get_attribute('aria-label')
        b.click()
        assert page.locator('.modal').is_visible(),(width,name)
        assert page.locator('.modal [data-modal]').count()>=1,(width,name)
        page.locator('.modal [data-close]').click()
        assert page.evaluate('document.documentElement.scrollWidth<=innerWidth'),('tree overflow',width)
        # Existing save loading / case: adult friend with infant does not become sleepover buddy.
        page.evaluate('''()=>{const q=__familyQA,s=q.state(),a=q.makePerson('Mabel Oldtimer',s.year-72,[],'friend');a.gender='female';a.bonds[s.playerId]=95;s.friendIds=[a.id];s.age=12;q.byId(s.playerId).born=s.year-12;q.save();}''')
        page.locator('.bottom-nav [data-tab="activities"]').click()
        if page.locator('[data-activity="sleepover"]').count():
            page.locator('[data-activity="sleepover"]').first.click()
            assert 'No sleepover buddy' in page.locator('.modal').inner_text(),page.locator('.modal').inner_text()
            page.locator('.modal [data-close]').click()
        # New friendships for underage players should always be peer age.
        peer=page.evaluate('''()=>{const q=__familyQA,a=q.makeFriend(true),s=q.state();return {age:s.age,peerAge:s.year-a.born}}''')
        assert abs(peer['age']-peer['peerAge'])<=3,peer
        # Transition to adulthood and require opposite-gender partner from meeting.
        page.evaluate('''()=>{let q=__familyQA,s=q.state();s.age=27;q.byId(s.playerId).born=s.year-27;s.energy=3;q.connectPartner();}''')
        pair=page.evaluate('''()=>{const q=__familyQA,s=q.state();return {self:q.byId(s.playerId).gender,partner:s.people.at(-1)?.gender, name:s.people.at(-1)?.name}}''')
        assert pair['partner'] and pair['self']!=pair['partner'],pair
        if page.locator('.modal [data-close]').count():page.locator('.modal [data-close]').click()
        page.evaluate('''()=>{const q=__familyQA,x=q.state();x.partnerId=x.people.at(-1).id;x.cash=4500;x.energy=3;q.save();q.render()}''')
        page.locator('.bottom-nav [data-tab="life"]').click()
        page.locator('[data-do="baby"]').first.click()
        assert 'Find out now' in page.locator('.modal').inner_text()
        page.locator('.modal [data-modal]').first.click() # reveal a random boy or girl
        reveal=page.locator('.modal').inner_text()
        assert 'Naming a girl' in reveal or 'Naming a boy' in reveal,reveal
        gender='female' if 'Naming a girl' in reveal else 'male'
        page.locator('.modal [data-modal]').first.click() # name
        pregnant=page.evaluate('''()=>({expecting:__familyQA.state().expecting,energy:__familyQA.state().energy})''')
        assert pregnant['expecting'] and pregnant['expecting']['gender']==gender,pregnant
        page.locator('.modal [data-close]').click() if page.locator('.modal [data-close]').count() else None
        page.locator('.bottom-nav [data-tab="life"]').click()
        assert page.locator('[data-do="pregnancy"]').count()==1
        page.locator('[data-do="pregnancy"]').click()
        assert 'baby shower' in page.locator('.modal').inner_text().lower()
        page.locator('.modal [data-modal]').first.click() # shower
        page.locator('.modal [data-modal]').first.click() # return to life
        # A shower shouldn't prevent a checkup in the same pregnancy.
        page.locator('[data-do="pregnancy"]').click()
        assert 'Visit the doctor' in page.locator('.modal').inner_text()
        page.locator('.modal [data-modal]').first.click() # checkup; shower now hidden
        page.locator('.modal [data-modal]').first.click()
        assert page.evaluate('__familyQA.state().expecting.pregnancyChoices.length')==2
        page.locator('.top-age-button').click()
        assert f"It's a {'girl' if gender=='female' else 'boy'}" in page.locator('.modal').inner_text(),page.locator('.modal').inner_text()[:280]
        born=page.evaluate('''()=>{let q=__familyQA,s=q.state();return q.children(q.byId(s.playerId)).map(p=>({name:p.name,gender:p.gender,role:q.role(p)}))}''')
        assert any(b['gender']==gender and b['role']==('Daughter' if gender=='female' else 'Son') for b in born),born
        assert not errors,(width,errors[:4])
        print('FAMILY PASS',width,{'relatives':x,'adultPair':pair,'newborn':born})
        page.close()
    browser.close()