import test from 'node:test';
import assert from 'node:assert/strict';
import {IMA_AUDIT,IMA_AUDIT_VERSION,IMA_WEEK_SCHEDULE,IMA_TOPIC_TOTAL,refineImaCurriculum} from '../src/ima-sc-auditoria-edital-20261106.js';
import {IMA_ENVIRONMENTAL,IMA_DAD_LAWS,IMA_WEEKLY_MINUTES,reconcileImaSubjects} from '../src/ima-sc-curriculum-20261105.js';

test('audit subjects reflect ANA FURB, not the separate Administrador role',()=>{
 for(const key of ['port','rl','apu','ambiental','dcon','dad','afo','licita','ti'])assert.ok(IMA_AUDIT[key]?.length);
 assert.equal(IMA_TOPIC_TOTAL,Object.values(IMA_AUDIT).flat().length);
 assert.ok(!IMA_AUDIT.apu.some(r=>r.topic.includes('Recrutamento e seleção')));
});
test('LRF, Lei 4320, CF e SC all indexed',()=>{
 assert.ok(IMA_DAD_LAWS.find(x=>x.id==='ima-afo-lrf'&&!x.wait));
 for(const key of ['ima-env-cf225','ima-env-lc140','ima-env-pnma','ima-env-sc14675-t1','ima-env-sc14675-t2','ima-env-ima17354'])assert.ok(IMA_ENVIRONMENTAL.some(x=>x.id===key));
 assert.ok(IMA_AUDIT.afo.some(x=>x.id==='IMA-AFO-M05'));
 assert.ok(IMA_AUDIT.afo.some(x=>x.id==='IMA-AFO-M11'));
 assert.ok(IMA_AUDIT.licita.some(x=>x.id==='IMA-LIC-P08'));
});
test('daily program sums exactly 30 hours and individual categories',()=>{
 const totals={};let law=0;
 for(const d of IMA_WEEK_SCHEDULE){law+=d.law;for(const [id,min] of d.slots)totals[id]=(totals[id]||0)+min;}
 assert.equal(law,210);assert.deepEqual(totals,IMA_WEEKLY_MINUTES);
 assert.equal(Object.values(totals).reduce((a,b)=>a+b,0)+law,1800);
});
test('source audit preserves history and does not pretend completion',()=>{
 const st={subjects:[{id:'dad',units:[{id:'ima-tha-dad-02',theoryDone:true,theoryDate:'2026-11-05'}]},
 {id:'dcon',units:[{id:'NELMA-DCON-01',theoryDone:false}]},
 {id:'afo',units:[]}],sessions:[{id:'old-1',minutes:45}],legislation:{sessions:[{id:'l1',minutes:15}]}};
 const out=refineImaCurriculum(st);
 assert.equal(out.sessions[0].id,'old-1');
 assert.equal(out.subjects.find(x=>x.id==='dad').units.find(x=>x.id==='ima-tha-dad-02').theoryDone,true);
 assert.equal(out.subjects.find(x=>x.id==='dad').units.find(x=>x.id==='IMA-DAD-02').hiddenFromRoute,true);
 assert.equal(out.subjects.find(x=>x.id==='afo').units.find(x=>x.id==='IMA-AFO-M11').theoryDone,false);
 assert.equal(st.subjects[0].units.length,1);
});
test('source audit is idempotent on a minimal supported state',()=>{
 const st={subjects:[],sessions:[],legislation:{sessions:[]}};
 const a=refineImaCurriculum(st),b=refineImaCurriculum(a);
 assert.equal(JSON.stringify(a),JSON.stringify(b));
});
test('reconcile does not block licitations with the PDF Vade Mecum folder 01',()=>{
 const st={subjects:[{id:'dad',units:['02','03','04','05','06','07','08'].map(n=>({id:'ima-tha-dad-'+n,theoryDone:true,batteryDone:false}))}],sessions:[]};
 const out=reconcileImaSubjects(st),lic=out.subjects.find(x=>x.id==='licita-ima');
 assert.ok(lic);
 assert.ok(lic.units.find(x=>x.id==='ima-lic-14').hiddenFromRoute===false);
});
