import test from 'node:test';
import assert from 'node:assert/strict';
import {IMA_AUDIT,IMA_AUDIT_VERSION,IMA_WEEK_SCHEDULE,IMA_WEEK_SCHEDULE_FOUNDATION,IMA_LAW_EXTRA_WEEK_MINUTES,imaLicitationStatus,imaWeeklyMinutesFor,IMA_TOPIC_TOTAL,refineImaCurriculum} from '../src/ima-sc-auditoria-edital-20261106.js';
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
test('duas fases somam 30 horas de ciclo; legislação soma 3h30 fora delas',()=>{
 const totals=schedule=>{const out={};for(const d of schedule)for(const [id,min] of d.slots)out[id]=(out[id]||0)+min;return out};
 const phase2=totals(IMA_WEEK_SCHEDULE),phase1=totals(IMA_WEEK_SCHEDULE_FOUNDATION);
 assert.deepEqual(phase2,IMA_WEEKLY_MINUTES);
 assert.equal(Object.values(phase1).reduce((a,b)=>a+b,0),1800);
 assert.equal(Object.values(phase2).reduce((a,b)=>a+b,0),1800);
 assert.equal(IMA_LAW_EXTRA_WEEK_MINUTES,210);
 for(const key of ['dad','dcon','afo'])assert.equal(phase2[key],240);
 assert.equal(phase2['licita-ima'],240);
 assert.equal(phase1['dad'],360);assert.equal(phase1['dcon'],360);
 assert.equal(phase1['licita-ima']||0,0);
 assert.equal(phase1['afo'],240);
});
test('desbloqueio pela conclusão da pasta 08 após pastas 02–07',()=>{
 const rows=['02','03','04','05','06','07','08'].map(n=>({id:'ima-tha-dad-'+n,theoryDone:n!=='08'}));
 const state={subjects:[{id:'dad',units:rows}]};
 assert.equal(imaLicitationStatus(state).unlocked,false);
 assert.equal(imaWeeklyMinutesFor(state).dad,360);
 rows.at(-1).theoryDone=true;
 assert.equal(imaLicitationStatus(state).unlocked,true);
 assert.equal(imaWeeklyMinutesFor(state).dad,240);
 assert.equal(imaWeeklyMinutesFor(state)['licita-ima'],240);
 rows[0].theoryDone=true;rows[0].equivalenceReviewRequired=true;
 assert.equal(imaLicitationStatus(state).unlocked,false,'migração de outro professor não libera sem confirmação');
 rows[0].confirmedThallius=true;
 assert.equal(imaLicitationStatus(state).unlocked,true);
});
test('complemento Rafael cadastra seis partes sem substituir Thallius',()=>{
 const st={subjects:[{id:'dad',units:['02','03','04','05','06','07','08'].map(n=>({id:'ima-tha-dad-'+n,theoryDone:true}))}],sessions:[]};
 const out=reconcileImaSubjects(st);
 const lic=out.subjects.find(x=>x.id==='licita-ima');
 const r=lic.units.filter(x=>x.raSupplement);
 assert.equal(r.length,6);
 assert.equal(new Set(r.map(x=>x.id)).size,6);
 assert.ok(r.every(x=>x.hiddenFromRoute&&x.optionalSupplement));
 assert.ok(lic.units.find(x=>x.id==='ima-lic-14'));
 assert.ok(lic.units.find(x=>x.id==='ima-lic-15'));
 assert.ok(lic.units.every(x=>x.unlockCondition?.includes('Pasta 08')||x.raSupplement||!x.unlockCondition));
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
