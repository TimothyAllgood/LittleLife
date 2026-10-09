// Dependency-free catalog contract: run in Actions without a browser install.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const sandbox={window:{}};
for(const name of ['editorial-pass','oddities'])vm.runInNewContext(fs.readFileSync(`assets/${name}.js`,'utf8'),sandbox,{filename:name});
const S=sandbox.window.LITTLE_LIFE_ODDITIES.scenes;
const E=sandbox.window.LITTLE_LIFE_EDITORIAL.edits;
const original=new Set();
assert.equal(S.length,40,'Unexpected number of new authored scenes');
assert.equal(Object.keys(E).length>=100,true,'Not enough audited legacy revisions');
assert.equal(S.filter(s=>s.rare).length,5,'Unusual mystery frequency should be deliberate');
assert.ok(S.filter(s=>Object.values(s.choices).some(c=>c.follow)).length>=17,'Missing callbacks');
assert.ok(S.filter(s=>s.choices.some(c=>c.good.length>1&&c.bad.length>1)).length>=15,'Multiple results per approach');
for(const scene of S){
 assert.ok(!original.has(scene.id),'Duplicate ID: '+scene.id);original.add(scene.id);
 assert.ok(scene.min>=0&&scene.max<=105&&scene.min<=scene.max,'Invalid age gate: '+scene.id);
 assert.equal(scene.choices.length,3,'Expected 3 choices: '+scene.id);
 assert.ok(scene.title.length>=15&&scene.text.length>=70,'Vague event premise: '+scene.id);
 const seen=new Set();
 for(const c of scene.choices){
  assert.ok(c.label.length>=16,'Too-short choice: '+scene.id);
  assert.ok(!seen.has(c.label),'Duplicate choices: '+scene.id);seen.add(c.label);
  assert.ok(c.good.every(x=>x.length>=45)&&c.bad.every(x=>x.length>=45),'Generic or missing outcome: '+scene.id);
  assert.ok(Object.keys(c.ok).length&&Object.keys(c.no).length,'No state consequences: '+scene.id);
 }
}
for(const [id,edit] of Object.entries(E)){
 assert.ok(edit.title||edit.text||edit.choices,'Empty edit: '+id);
 for(const choice of Object.values(edit.choices||{})){
  assert.ok(choice.good||choice.bad||choice.label,'Empty choice edit: '+id);
 }
}
console.log('EDITORIAL CATALOG PASS', S.length, 'new stories;',Object.keys(E).length,'legacy scenes reviewed;',S.filter(s=>s.rare).length,'rare mysteries');