import test from 'node:test';
import assert from 'node:assert/strict';
import {initialIMAState,prepareIMA,activeUnits,getUnit,appendSession,setPart,weekSummary} from '../src/ima-only-state.js';
import {cycleSnapshot,cycleTargets,advanceCycle,creditCycleSession,isPausedSubject,
 FOUNDATION_CYCLE,LICITATIONS_CYCLE,DEFAULT_PAUSED_SUBJECT_IDS,migrateCycle} from '../src/ima-continuous-cycle.js';

const seed=()=>prepareIMA(initialIMAState());
const sum=x=>Object.values(x).reduce((a,b)=>a+b,0);

test('preserva as 15 posições; pausa exatamente AFO e RL/Exatas nas duas fases',()=>{
 const s=seed(),c=cycleSnapshot(s);
 assert.deepEqual(DEFAULT_PAUSED_SUBJECT_IDS,['afo','rl-ima']);
 assert.equal(FOUNDATION_CYCLE.length,15);
 assert.equal(LICITATIONS_CYCLE.length,15);
 assert.equal(c.totalPositions,15);
 assert.deepEqual(c.pausedPositionNumbers,[4,5,11,13]);
 assert.equal(c.activePositions,11);assert.equal(c.skippedPositions,4);
 assert.equal(c.targetMinutes,1320);
 assert.equal(c.weeklyGoalMinutes,1800);
 assert.equal(sum(cycleTargets(s)),1320);
 assert.equal(cycleTargets(s).afo,0);
 assert.equal(cycleTargets(s)['rl-ima'],0);
 assert.equal(cycleTargets(s).dad,360);
 assert.equal(cycleTargets(s).dcon,360);
 assert.equal(cycleTargets(s).port,240);
 assert.ok(activeUnits(s,'afo').length>0);
 assert.ok(activeUnits(s,'rl-ima').length>0);
});
test('ao sair de DCON posição 3 salta AFO 4 e Exatas 5: próxima DAD 6',()=>{
 let s=seed();
 s=advanceCycle(advanceCycle(s)); // 1 dad -> 2 port -> 3 dcon
 assert.equal(cycleSnapshot(s).number,3);
 assert.equal(cycleSnapshot(s).nextPositionNumber,6);
 assert.equal(cycleSnapshot(s).nextSubjectId,'dad');
 const before=JSON.stringify(s.subjects);
 s=advanceCycle(s);
 assert.equal(cycleSnapshot(s).number,6);
 assert.equal(cycleSnapshot(s).subjectId,'dad');
 assert.deepEqual(s.imaCycle.transitions.at(-1).skippedPaused,[4,5]);
 assert.equal(JSON.stringify(s.subjects),before,'nenhum curso ou progresso alterado');
 s=advanceCycle(advanceCycle(advanceCycle(s))); // 6->7->8->9
 assert.equal(cycleSnapshot(s).number,9);
 s=advanceCycle(s); // 9 -> 10 port
 assert.equal(cycleSnapshot(s).number,10);
 s=advanceCycle(s); // 10 -> 12 DAD, pulando 11 AFO
 assert.equal(cycleSnapshot(s).number,12);
 s=advanceCycle(s); // 12 ->14 DCON, pulando 13 Exatas
 assert.equal(cycleSnapshot(s).number,14);
 s=advanceCycle(s); // 14 ->15 ambiental
 assert.equal(cycleSnapshot(s).number,15);
 s=advanceCycle(s); // 15 ->1 DAD, nova volta
 assert.equal(cycleSnapshot(s).number,1);
 assert.equal(s.imaCycle.roundsCompleted,1);
});
test('cursor antigo parado em AFO preserva minutos da posição e vai à próxima ativa',()=>{
 const s=seed();
 s.imaOnly.version='3.2.1-ima-progresso-historico-validado-20261115';
 s.imaCycle.index=3; // AFO
 s.imaCycle.minutesInPosition=43;
 const oldSubjects=JSON.stringify(s.subjects);
 const oldSessions=JSON.stringify(s.sessions);
 const oldLegislation=JSON.stringify(s.legislation);
 const oldSettings=JSON.stringify(s.settings);
 s.customNotes={freeForm:'não apagar notas extras'};
 const result=prepareIMA(s),current=cycleSnapshot(result);
 assert.equal(current.number,6);
 assert.equal(current.subjectId,'dad');
 assert.equal(result.imaCycle.preservedPausedProgress['1:3'].minutes,43);
 assert.equal(result.imaCycle.preservedPausedProgress['1:3'].subjectId,'afo');
 assert.equal(JSON.stringify(result.subjects),oldSubjects);
 assert.equal(JSON.stringify(result.sessions),oldSessions);
 assert.equal(JSON.stringify(result.legislation),oldLegislation);
 assert.equal(JSON.stringify(result.settings),oldSettings);
 assert.deepEqual(result.customNotes,s.customNotes);
 assert.equal(result.imaStudyPause.subjectIds.length,2);
 assert.equal(JSON.stringify(prepareIMA(result)),JSON.stringify(result));
});
test('cursor antigo parado em RL 5 salta para DAD 6 sem fabricar horas ou sessões',()=>{
 const s=seed();
 s.imaOnly.version='3.2.1-ima-progresso-historico-validado-20261115';
 s.imaCycle.index=4;s.imaCycle.minutesInPosition=29;
 const r=prepareIMA(s);
 assert.equal(cycleSnapshot(r).number,6);
 assert.equal(r.imaCycle.preservedPausedProgress['1:4'].minutes,29);
 assert.equal(r.sessions.length,0);
});
test('avançar automaticamente em sessão DCON preserva trava de Licitações',()=>{
 let s=seed();
 s=advanceCycle(advanceCycle(s));
 assert.equal(cycleSnapshot(s).number,3);
 s=creditCycleSession(s,'dcon',120);
 assert.equal(cycleSnapshot(s).number,6);
 assert.equal(cycleSnapshot(s).subjectId,'dad');
 assert.equal(cycleTargets(s)['licita-ima'],0);
 assert.throws(()=>creditCycleSession(s,'afo',20),/posição atual|pausada/);
 assert.throws(()=>appendSession(s,{subjectId:'afo',unitId:activeUnits(s,'afo')[0].id,
  date:'2026-11-17',hours:1,minutes:0,questions:0,correct:0}),/pausada/);
});
test('progresso e sessões históricos de AFO/Exatas continuam guardados e consultáveis',()=>{
 const s=seed();
 const afo=activeUnits(s,'afo')[0],rl=activeUnits(s,'rl-ima')[0];
 s.subjects.find(x=>x.id==='afo').units[0].theoryDone=true;
 s.subjects.find(x=>x.id==='rl-ima').units[0].theoryDone=true;
 s.sessions.push({id:'afo-antigo',date:'2026-11-14',subjectId:'afo',unitId:afo.id,
  activity:'theory',minutes:80,questions:15,correct:10,ima:true});
 s.sessions.push({id:'rl-antigo',date:'2026-11-14',subjectId:'rl-ima',unitId:rl.id,
  activity:'theory',minutes:50,questions:6,correct:5,ima:true});
 s.imaOnly.version='3.2.1-ima-progresso-historico-validado-20261115';
 const r=prepareIMA(s);
 assert.equal(r.sessions.length,2);
 assert.equal(r.subjects.find(x=>x.id==='afo').units[0].theoryDone,true);
 assert.equal(r.subjects.find(x=>x.id==='rl-ima').units[0].theoryDone,true);
 assert.deepEqual(r.sessions.map(x=>x.id),['afo-antigo','rl-antigo']);
 assert.equal(weekSummary(r,'2026-11-14').actual.afo,80);
 assert.equal(weekSummary(r,'2026-11-14').actual['rl-ima'],50);
 assert.equal(weekSummary(r,'2026-11-14').targets.afo,0);
 assert.equal(weekSummary(r,'2026-11-14').targets['rl-ima'],0);
});
test('fase 2 permanece após concluir Thallius; Licitações entra, AFO/RL pulam',()=>{
 let s=seed();
 for(const n of ['02','03','04','05','06','07','08']){
  const u=getUnit(s,'dad','ima-tha-dad-'+n);
  for(const p of u.parts)s=setPart(s,'dad',u.id,p.id,true,'2026-11-17');
 }
 const c=cycleSnapshot(s),t=cycleTargets(s);
 assert.equal(c.phase,'2');
 assert.deepEqual(c.pausedPositionNumbers,[5,6,13,14]);
 assert.equal(c.totalPositions,15);assert.equal(c.activePositions,11);
 assert.equal(t['licita-ima'],240);
 assert.equal(t.afo,0);assert.equal(t['rl-ima'],0);
 assert.equal(sum(t),1320);
 // posição 4 Licitações -> pular 5 AFO, 6 RL -> posição 7 APU.
 s=advanceCycle(advanceCycle(advanceCycle(s)));
 assert.equal(cycleSnapshot(s).number,4);
 assert.equal(cycleSnapshot(s).subjectId,'licita-ima');
 s=advanceCycle(s);
 assert.equal(cycleSnapshot(s).number,7);
});
test('retomada futura das pausas pode ser configurada sem apagar nem recriar cursos',()=>{
 const s=seed(),subjectsBefore=JSON.stringify(s.subjects);
 s.imaStudyPause.subjectIds=[];
 const restored=migrateCycle(s);
 assert.equal(isPausedSubject(restored,'afo'),false);
 assert.equal(isPausedSubject(restored,'rl-ima'),false);
 assert.equal(sum(cycleTargets(restored)),1800);
 assert.equal(cycleSnapshot(restored).activePositions,15);
 assert.equal(JSON.stringify(restored.subjects),subjectsBefore);
});
