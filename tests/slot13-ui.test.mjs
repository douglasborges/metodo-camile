import test from 'node:test';
import assert from 'node:assert/strict';
import {FINAL_CGU_PLAN,FINAL_CGU_LESSONS} from '../src/cgu-final-plan.js';
import {FINAL_CGU_CYCLE_SUBJECTS,finalCguSlot,finalCguSlotLessons} from '../src/cgu-final-runtime.js';

test('ciclo do chat Análise do curso CGU: ordem e materiais 7 Fontes',()=>{
 assert.equal(FINAL_CGU_PLAN.slot_cycle_13.length,13);
 assert.deepEqual(FINAL_CGU_CYCLE_SUBJECTS,['afo','auditoria','cgu7','cpu','dcon','cgu7','afo','adm-publica','cgu7','cpu','auditoria','cgu7','cgu7']);
 assert.deepEqual(finalCguSlotLessons(2).map(x=>x.category).filter((v,i,a)=>a.indexOf(v)===i),['DIR']);
 assert.ok(finalCguSlotLessons(5).every(x=>x.category==='POL'));
 assert.ok(finalCguSlotLessons(8).some(x=>x.category==='GOV'));
 assert.ok(finalCguSlotLessons(8).some(x=>x.category==='ETICA'));
 assert.ok(finalCguSlotLessons(11).some(x=>x.category==='CONTR'));
 assert.ok(finalCguSlotLessons(11).some(x=>x.category==='INTEG'));
 assert.ok(finalCguSlotLessons(12).some(x=>x.category==='DADOS'));
 assert.ok(finalCguSlotLessons(12).some(x=>x.category==='SOC'));
});
test('datas reais de Sociedade e Contratações não alteram disponibilidade por inferência',()=>{
 const society=FINAL_CGU_LESSONS.filter(x=>x.category==='SOC');
 const contr=FINAL_CGU_LESSONS.filter(x=>x.category==='CONTR');
 assert.deepEqual(society.map(x=>x.planned_release_date),['2026-10-22','2026-10-31','2026-11-10','2026-11-20','2026-11-30','2026-12-12']);
 assert.deepEqual(contr.map(x=>x.planned_release_date),['2026-11-11','2026-11-18','2026-11-25','2026-12-02','2026-12-09']);
 assert.ok([...society,...contr].every(x=>x.release_rule.includes('somente considerar disponível')));
});
