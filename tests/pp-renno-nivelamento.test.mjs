import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import * as M from '../src/core.js';
import {FINAL_CGU_LESSONS} from '../src/cgu-final-plan.js';
import {RENNO_STEPS,RENNO_UNIT_IDS} from '../src/pp-renno.js';
const load=()=>M.normalizeMethodState(JSON.parse(fs.readFileSync(new URL('../data/initial-state.json',import.meta.url))));
const pp=s=>s.subjects.find(x=>x.id==='politicas');
test('Camile: reutiliza Políticas Públicas e Arranjos, inclui Ex Ante introdutório',()=>{
 const s=load(),route=M.methodUnits(pp(s));
 assert.deepEqual(route.slice(0,3).map(x=>x.title),RENNO_STEPS.map(x=>x.title));
 assert.deepEqual(route.slice(0,3).map(x=>x.id),RENNO_UNIT_IDS);
 assert.equal(pp(s).units.filter(x=>x.id==='pp-renno-exante-intro').length,1);
 assert.ok(pp(s).units.some(x=>x.id==='pp-cgu-3'&&/Ex Ante/.test(x.title)));
 assert.match(FINAL_CGU_LESSONS.find(x=>x.id==='7F-POL-01').deps,/Avaliação de PP Ex Ante/);
});
test('Camile: recarga mantém fases, registros, 7 Fontes, progresso e ciclo',()=>{
 let s=load();s.cycle={index:7,minutes:40};
 const u=pp(s).units.find(x=>x.id==='pp-cgu-1');u.theoryDone=true;u.theoryDate='2026-10-22';u.marks=['histórico PP'];
 const seven=s.subjects.find(x=>x.id==='cgu7').units.find(x=>x.id==='7F-POL-01');seven.progress=.33;
 s.sessions.push({id:'pp-set',subjectId:'cgu7',unitId:'7F-POL-01',activity:'theory',date:'2026-10-22',minutes:31,questions:3,correct:2});
 const before=structuredClone(s.sessions);s=M.normalizeMethodState(M.normalizeMethodState(s));
 assert.deepEqual(s.sessions,before);assert.deepEqual(s.cycle,{index:7,minutes:40});
 assert.equal(pp(s).units.find(x=>x.id==='pp-cgu-1').theoryDone,true);
 assert.deepEqual(pp(s).units.find(x=>x.id==='pp-cgu-1').marks,['histórico PP']);
 for(const id of RENNO_UNIT_IDS)assert.equal(pp(s).units.filter(x=>x.id===id).length,1);
 assert.equal(s.subjects.find(x=>x.id==='cgu7').units.find(x=>x.id==='7F-POL-01').progress,.33);
});