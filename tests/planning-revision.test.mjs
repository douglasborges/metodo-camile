import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import * as M from '../src/core.js';
import {FINAL_CGU_PLAN,FINAL_CGU_LESSONS} from '../src/cgu-final-plan.js';
import {applyFinalCguCurriculum,FINAL_CGU_CYCLE_SUBJECTS,PREVIOUS_FINAL_CGU_CYCLE,finalCguSlot,finalCguLessonProgress} from '../src/cgu-final-runtime.js';
const camile=true;
const seed=()=>JSON.parse(fs.readFileSync(new URL('../data/initial-state.json',import.meta.url)));
const update=s=>camile?M.normalizeMethodState(s):applyFinalCguCurriculum(s);
const previous=s=>{s.cyclePlanVersion=6;s.cguFinalPlan={...s.cguFinalPlan,cycleMigrated:true};delete s.cguFinalPlan.cycleRevision;return s;};
const artId=camile?'dcon-u-2':'ESTRATEGIA-DCON-04';
const dcon=s=>s.subjects.find(x=>x.id==='dcon');
test('ciclo solicitado: 13 posições, sem AFO/CPU consecutivas inclusive na volta',()=>{
 const expected=['afo','dcon','cpu',camile?'adm-publica':'adm','afo','dad','cpu',camile?'auditoria':'aud','afo','dad','cpu',camile?'auditoria':'aud',camile?'auditoria':'aud'];
 assert.deepEqual(M.CYCLE,expected);assert.deepEqual(FINAL_CGU_CYCLE_SUBJECTS,expected);
 for(let i=0;i<13;i++){
  assert.notDeepEqual(new Set([expected[i],expected[(i+1)%13]]),new Set(['afo','cpu']));
  assert.equal(finalCguSlot(i).subjectId,expected[i]);assert.equal(finalCguSlot(i).slot,i+1);
  assert.equal(finalCguSlot(i).discipline,finalCguSlot(i).label);
 }
 assert.match(finalCguSlot(12).label,/Auditoria.*reforço P3.*fallback 7 Fontes/);
 assert.match(finalCguSlot(9).label,/DAD.*7 Fontes P2/);
});
test('migra todas as posições anteriores, preserva minutos e não migra de novo ao recarregar',()=>{
 const map=[0,2,7,5,4,6,3,11,8,10,1,12,9];
 for(let index=0;index<13;index++){
  const s=previous(seed());s.cycle={index,minutes:47,marker:'preservar'};
  const next=update(s);
  assert.equal(next.cycle.index,map[index]);assert.equal(M.CYCLE[next.cycle.index],PREVIOUS_FINAL_CGU_CYCLE[index]);
  assert.equal(next.cycle.minutes,47);assert.equal(next.cycle.marker,'preservar');
  assert.deepEqual(update(JSON.parse(JSON.stringify(next))).cycle,next.cycle);
 }
});
test('migração conserva sessões, horas, importações, cadernos, checkpoints e arquivo histórico',()=>{
 const original=previous(seed());
 original.subjects[0].notebooks.push({id:'preserve-notebook',title:'TCU',stage:'done',log:[{date:'2026-10-10',attempted:20,correct:17}]});
 original.subjects[0].checkpoints['preserve-checkpoint']={done:true,minutes:45};
 const current=update(structuredClone(original));
 for(const key of ['sessions','imports','archive','goals','activeGoalId','legislation','revisions','backups'])assert.deepEqual(current[key],original[key],key);
 for(const subject of original.subjects){
  const retained=current.subjects.find(x=>x.id===subject.id);assert.ok(retained,subject.id);
  assert.deepEqual(retained.notebooks,subject.notebooks);assert.deepEqual(retained.checkpoints,subject.checkpoints);
  for(const unit of subject.units){
   const kept=retained.units.find(x=>x.id===unit.id);assert.ok(kept,unit.id);
   for(const key of ['battery','general','legacy','marks'])assert.deepEqual(kept[key],unit[key],unit.id+' '+key);
   if(unit.theoryDone)assert.equal(kept.theoryDone,true,unit.id);
   if(unit.blocksCompleted)assert.equal(kept.blocksCompleted,unit.blocksCompleted,unit.id);
  }
 }
});
test('metas, data inicial, prioridades e disponibilidade 7 Fontes continuam intactas',()=>{
 const s=update(previous(seed()));
 assert.deepEqual([s.settings.dailyMinimum,s.settings.dailyTarget,s.settings.weeklyMinimum,s.settings.weeklyTarget,s.settings.sundayReviewMinutes],[300,360,1980,2340,180]);
 assert.equal(s.settings.cguPlanStart,'2026-10-21');assert.deepEqual(FINAL_CGU_PLAN.priorities.block_order,['P3','P2','P1']);
 assert.deepEqual(FINAL_CGU_PLAN.schedule.sunday,{minutes:180,review_only:true});
 const lessons=FINAL_CGU_LESSONS.filter(x=>x.source==='7F'&&(x.status==='NAO_ESTUDAR_DUPLICADO'||x.availability==='EM_PREPARACAO_NO_PRINT'));
 assert.ok(lessons.length);
 for(const lesson of lessons){const u=s.subjects.find(x=>x.id==='cgu7').units.find(x=>x.id===lesson.id);assert.equal(u.hiddenFromRoute,true);assert.equal(u.theoryDone,false);}
});
test('art. 5º exclusivo Estratégia entre teoria geral e retorno Cebraspe, sem concluir por equivalência',()=>{
 const raw=previous(seed());
 for(const u of dcon(raw).units)if(u.id!==artId)u.theoryDone=true;
 if(camile){const u=dcon(raw).units.find(x=>x.id===artId);if(u){u.theoryDone=false;u.blocksCompleted=7;}}
 const s=update(raw),route=M.methodUnits(dcon(s)),art=route.find(x=>x.id===artId);
 assert.ok(art);assert.equal(art.theoryDone,false);assert.equal(art.totalBlocks,24);
 assert.match(art.course,/Estratégia Concursos.*Nelma Fontana.*Aula 04/);
 assert.match(art.title,/24 vídeos teóricos \+ exercícios/);
 assert.match(art.note,/exclusiva.*RETORNAR/);
 const ids=route.map(x=>x.id);assert.ok(ids.indexOf('NELMA-DCON-02')<ids.indexOf(artId));assert.ok(ids.indexOf(artId)<ids.indexOf('NELMA-DCON-03'));
 assert.match(route.find(x=>x.id==='NELMA-DCON-02').note,/NÃO ESTUDAR o art. 5º/);
 if(camile)assert.equal(art.blocksCompleted,7);
 const twice=update(JSON.parse(JSON.stringify(s)));assert.equal(dcon(twice).units.find(x=>x.id===artId).theoryDone,false);
});
test('progresso real e sessões da unidade exclusiva sobrevivem à migração e recarga',()=>{
 let s=update(previous(seed())),u=dcon(s).units.find(x=>x.id===artId);
 u.blocksCompleted=9;u.theoryDone=false;u.battery={attempted:12,correct:10};u.marks=['evidência individual'];
 s.sessions.push({id:'art5-real',subjectId:'dcon',unitId:artId,activity:'theory',minutes:37,date:'2026-10-21',title:'Art. 5º',notes:'Bloco 9 concluído',legacy:false});
 for(let i=0;i<2;i++)s=update(JSON.parse(JSON.stringify(s)));
 u=dcon(s).units.find(x=>x.id===artId);assert.equal(u.blocksCompleted,9);assert.equal(u.theoryDone,false);assert.deepEqual(u.battery,{attempted:12,correct:10});assert.deepEqual(u.marks,['evidência individual']);
 const p=finalCguLessonProgress(s,FINAL_CGU_LESSONS.find(x=>x.id===artId));assert.ok(p.minutes>=37);assert.equal(p.unitId,artId);
 u.theoryDone=true;u.theoryDate='2026-10-21';u.blocksCompleted=24;
 const complete=update(s);assert.equal(dcon(complete).units.find(x=>x.id===artId).theoryDone,true);
});

test('uma menção ao bloco 24 ou a um vídeo concluído não conclui os 24 vídeos',()=>{
 let s=update(previous(seed())),u=dcon(s).units.find(x=>x.id===artId);u.theoryDone=false;u.blocksCompleted=7;
 const input={subjectId:'dcon',unitId:artId,activity:'theory',date:M.day(),minutes:20,applyCycle:false,notes:'Bloco 24'};
 s=M.session(s,input);assert.equal(dcon(s).units.find(x=>x.id===artId).blocksCompleted,7);
 s=M.session(s,{...input,notes:'Bloco 8 concluído'});
 assert.equal(dcon(s).units.find(x=>x.id===artId).blocksCompleted,8);
 s=update(s);assert.equal(dcon(s).units.find(x=>x.id===artId).theoryDone,false);
 assert.equal(dcon(s).units.find(x=>x.id===artId).blocksCompleted,8);
});
test('domingo não avança o ciclo; sessão de revisão e minutos prévios permanecem',()=>{
 const RealDate=globalThis.Date;
 try{
  globalThis.Date=class extends RealDate {constructor(...args){super(...(args.length?args:['2026-10-25T12:00:00Z']));}static now(){return new RealDate('2026-10-25T12:00:00Z').valueOf();}};
  let s=update(previous(seed()));s.cycle={index:0,minutes:47};
  const next=M.session(s,{subjectId:'afo',activity:'free',date:M.day(),minutes:180,applyCycle:true,title:'Revisão dominical'});
  assert.deepEqual(next.cycle,s.cycle);assert.equal(next.sessions.length,s.sessions.length+1);
 }finally{globalThis.Date=RealDate;}
});

test('estados já intercalados mantêm as 13 posições e os minutos após correção e recarga',()=>{
 for(let index=0;index<13;index++){
  let s=update(previous(seed()));s.cycle={index,minutes:47};
  const sessions=structuredClone(s.sessions);
  for(let reload=0;reload<2;reload++){
   s=update(JSON.parse(JSON.stringify(s)));
   assert.deepEqual(s.cycle,{index,minutes:47});assert.deepEqual(s.sessions,sessions);
  }
 }
 assert.equal(M.CYCLE[9],'dad');assert.equal(M.CYCLE[11],camile?'auditoria':'aud');assert.equal(M.CYCLE[12],camile?'auditoria':'aud');
 const published=FINAL_CGU_LESSONS.filter(x=>x.source==='7F'&&x.availability==='PUBLICADA_NO_PRINT');
 assert.ok(published.some(x=>x.priority==='P3'));assert.equal(published.some(x=>x.priority==='P2'),false);
});
test('manifest mantém início e atalhos sem build e sem campo id',()=>{
 const manifest=JSON.parse(fs.readFileSync(new URL('../manifest.webmanifest',import.meta.url)));
 assert.equal(manifest.start_url,'./');assert.equal(Object.hasOwn(manifest,'id'),false);
 assert.deepEqual(manifest.shortcuts.map(x=>x.url),['today','progress','data'].map(x=>(camile?'./#':'./index.html#')+x));
 const html=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');assert.match(html,/src\/app\.js\?v=/);
});
