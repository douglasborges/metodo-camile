import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {IMA_ENVIRONMENTAL,IMA_DCON_LAWS,IMA_DAD_LAWS,IMA_WEEKLY_MINUTES,imaLegislationPair,reconcileImaSubjects} from '../src/ima-sc-curriculum-20261105.js';

test('ANA Ambiental possui somente cinco normas-tópicos? 6 recortes de 5 leis/CF',()=>{
 const s=IMA_ENVIRONMENTAL.map(x=>x.id).join(' ');
 for(const key of ['cf225','lc140','pnma','14675-t1','14675-t2','ima17354'])assert.ok(s.includes(key));
 for(const key of ['snuc','965-','116428','crimes-ambientais','recursos-hidricos'])assert.ok(!s.includes(key));
});
test('rodízio diário 2 normas / 15 min, blocos de 5 dias e alternância DCON/DAD',()=>{
 const d1=imaLegislationPair('2026-11-06'),d2=imaLegislationPair('2026-11-07'),d6=imaLegislationPair('2026-11-11');
 assert.equal(d1.length,2);assert.equal(d2.length,2);
 assert.equal(d1[0].group,'dcon');assert.equal(d2[0].group,'dad');
 assert.equal(d1[1].group,'ambiental');assert.equal(d2[1].group,'ambiental');
 assert.notEqual(d1[1].id,d6[1].id);
});
test('ciclo semanal totaliza 30h mais 3h30 extraciclo de legislação',()=>{
 assert.equal(Object.values(IMA_WEEKLY_MINUTES).reduce((n,x)=>n+x,0),1800);
 assert.equal(1800+7*30,2010);
 assert.equal(IMA_WEEKLY_MINUTES['leg-ambiental'],120);
 assert.equal(IMA_WEEKLY_MINUTES['ti-ima'],120);
});
test('migrador aditivo preserva sessões e cria disciplinas próprias',()=>{
 const state={subjects:[],sessions:[{id:'hist-a',minutes:70}],settings:{},legislation:{sessions:[{id:'law-hist',minutes:15}]}};
 const after=reconcileImaSubjects(state);
 assert.deepEqual(after.sessions,state.sessions);assert.deepEqual(after.legislation.sessions,state.legislation.sessions);
 for(const id of ['ti-ima','leg-ambiental','licita-ima','rl-ima'])assert.ok(after.subjects.some(x=>x.id===id));
 assert.equal(state.subjects.length,0);
});
test('interfaces apresentam rota IMA, preservando histórico',()=>{
 const app=readFileSync(new URL('../src/app.js',import.meta.url),'utf8');
 const personal=readFileSync(new URL('../src/personal.js',import.meta.url),'utf8');
 assert.match(app,/function imaPage\(/);
 assert.match(app,/function legislationPage\(/);
 assert.match(personal,/imaLegislationPair/);
 assert.match(personal,/oldQueue\.filter/);
});
