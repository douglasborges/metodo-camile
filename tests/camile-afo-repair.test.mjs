import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {normalizeMethodState} from '../src/core.js';

const initial=()=>JSON.parse(fs.readFileSync(new URL('../data/initial-state.json',import.meta.url)));

test('reparo único da Camile mantém só o AFO de 2h que avançou o ciclo em 21/10/2026',()=>{
 let st=normalizeMethodState(initial());
 const unit=st.subjects.find(x=>x.id==='afo').units.find(x=>x.id==='afo-cgu-01');
 unit.battery.attempted=30;unit.battery.correct=24;unit.batteryDone=true;
 st.cycle={index:1,minutes:0};
 st.sessions.push(
  {id:'afo-anterior',subjectId:'afo',unitId:unit.id,date:'2026-10-20',createdAt:'2026-10-20T18:00:00.000Z',activity:'theory',minutes:90,questions:0,correct:0,legacy:false,cycleApplied:false},
  {id:'afo-dup-1',subjectId:'afo',unitId:unit.id,date:'2026-10-21',createdAt:'2026-10-21T18:00:00.000Z',activity:'battery',minutes:60,questions:10,correct:8,legacy:false,cycleApplied:false},
  {id:'afo-dup-2',subjectId:'afo',unitId:unit.id,date:'2026-10-21',createdAt:'2026-10-21T18:01:00.000Z',activity:'battery',minutes:60,questions:10,correct:8,legacy:false,cycleApplied:false},
  {id:'afo-manter',subjectId:'afo',unitId:unit.id,date:'2026-10-21',createdAt:'2026-10-21T18:02:00.000Z',activity:'battery',minutes:120,questions:10,correct:8,legacy:false,cycleApplied:true,slotComplete:true}
 );
 const next=normalizeMethodState(st);
 assert.deepEqual(next.sessions.filter(x=>x.date==='2026-10-21'&&x.subjectId==='afo').map(x=>x.id),['afo-manter']);
 assert.ok(next.sessions.some(x=>x.id==='afo-anterior'));
 assert.deepEqual(next.cycle,{index:1,minutes:0});
 assert.equal(next.repairs.camileAfoDuplicates20261021.done,true);
 assert.equal(next.repairs.camileAfoDuplicates20261021.keptSessionId,'afo-manter');
 assert.deepEqual(next.repairs.camileAfoDuplicates20261021.removedSessionIds,['afo-dup-1','afo-dup-2']);
 const repairedUnit=next.subjects.find(x=>x.id==='afo').units.find(x=>x.id==='afo-cgu-01');
 assert.equal(repairedUnit.battery.attempted,10);
 assert.equal(repairedUnit.battery.correct,8);
 assert.equal(repairedUnit.batteryDone,false);
 const again=normalizeMethodState(next);
 assert.deepEqual(again.sessions,next.sessions);
 assert.deepEqual(again.repairs,next.repairs);
 assert.deepEqual(again.cycle,next.cycle);
});

test('reparo não remove AFO quando não existe registro final de 120 min com avanço do ciclo',()=>{
 let st=normalizeMethodState(initial());
 st.sessions.push(
  {id:'afo-1',subjectId:'afo',unitId:'',date:'2026-10-21',createdAt:'2026-10-21T18:00:00.000Z',activity:'free',minutes:60,questions:0,correct:0,legacy:false,cycleApplied:false},
  {id:'afo-2',subjectId:'afo',unitId:'',date:'2026-10-21',createdAt:'2026-10-21T18:01:00.000Z',activity:'free',minutes:60,questions:0,correct:0,legacy:false,cycleApplied:false},
  {id:'afo-3',subjectId:'afo',unitId:'',date:'2026-10-21',createdAt:'2026-10-21T18:02:00.000Z',activity:'free',minutes:120,questions:0,correct:0,legacy:false,cycleApplied:false}
 );
 const next=normalizeMethodState(st);
 assert.equal(next.sessions.filter(x=>x.date==='2026-10-21'&&x.subjectId==='afo').length,3);
 assert.equal(next.repairs?.camileAfoDuplicates20261021,undefined);
});
