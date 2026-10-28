import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import * as M from '../src/core.js';
import {FINAL_CGU_LESSONS} from '../src/dcon-ordered-curriculum.js';
const load=()=>M.normalizeMethodState(JSON.parse(fs.readFileSync(new URL('../data/initial-state.json',import.meta.url))));
const dcon=s=>s.subjects.find(s=>s.id==='dcon');
test('Camile: A01 → Estratégia A04 → A05 → Cebraspe A02 → A03',()=>{
 const s=load(),ids=M.methodUnits(dcon(s)).map(u=>u.id);
 assert.deepEqual(ids.slice(0,5),['NELMA-DCON-01','dcon-u-2','ESTRATEGIA-DCON-05','NELMA-DCON-02','NELMA-DCON-03']);
 assert.deepEqual(FINAL_CGU_LESSONS.filter(l=>l.source==='NELMA').slice(0,5).map(l=>l.id),ids.slice(0,5));
 assert.equal(dcon(s).units.find(u=>u.id==='dcon-u-2').totalBlocks,24);
 assert.equal(dcon(s).units.find(u=>u.id==='ESTRATEGIA-DCON-05').totalBlocks,8);
});
test('Camile: bateria A04 sem concluir A02, mantém sessão e contagem após recarga',()=>{
 let s=load(),d=dcon(s);
 d.units.find(u=>u.id==='NELMA-DCON-02').theoryDone=false;
 d.units.find(u=>u.id==='dcon-u-2').theoryDone=false;
 const before=s.sessions.length;
 s=M.session(s,{subjectId:'dcon',unitId:'dcon-u-2',activity:'battery',date:M.day(),minutes:28,questions:20,correct:16,applyCycle:false});
 assert.equal(s.sessions.length,before+1);
 assert.equal(dcon(s).units.find(u=>u.id==='dcon-u-2').battery.attempted,20);
 assert.equal(dcon(s).units.find(u=>u.id==='dcon-u-2').batteryDone,false);
 s=M.normalizeMethodState(s);
 assert.equal(dcon(s).units.find(u=>u.id==='dcon-u-2').battery.attempted,20);
 assert.equal(dcon(s).units.find(u=>u.id==='NELMA-DCON-02').theoryDone,false);
});
