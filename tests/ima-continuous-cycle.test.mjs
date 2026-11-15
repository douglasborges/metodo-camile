import test from 'node:test';
import assert from 'node:assert/strict';
import {initialIMAState,prepareIMA,activeUnits,getUnit,appendSession,setPart,weekSummary} from '../src/ima-only-state.js';
import {
 FOUNDATION_CYCLE,LICITATIONS_CYCLE,CYCLE_SLOT_MINUTES,cycleSnapshot,cycleTargets,
 advanceCycle,creditCycleSession
} from '../src/ima-continuous-cycle.js';
const seed=()=>prepareIMA(initialIMAState());
const sum=x=>Object.values(x).reduce((a,b)=>a+b,0);
test('ciclo inicial em 15 posições de 2h mantém distribuição semanal 30h, sem dias fixos',()=>{
 const st=seed(),c=cycleSnapshot(st);
 assert.equal(c.phase,'1');assert.equal(c.index,0);assert.equal(c.subjectId,'dad');
 assert.equal(c.number,1);assert.equal(c.totalPositions,15);assert.equal(CYCLE_SLOT_MINUTES,120);
 assert.equal(sum(cycleTargets(st)),1800);
 assert.equal(cycleTargets(st).dad,360);
 assert.equal(cycleTargets(st).dcon,360);
 assert.equal(cycleTargets(st).afo,240);
 assert.equal(cycleTargets(st)['licita-ima'],0);
 assert.equal(FOUNDATION_CYCLE.filter(x=>x==='port').length,2);
 assert.ok(!Object.hasOwn(st,'daySchedule'));
});
test('passagem avança independente de dia após registrar 120min e persiste em JSON',()=>{
 let st=seed();
 st=creditCycleSession(st,'dad',60);
 assert.equal(cycleSnapshot(st).number,1);
 assert.equal(cycleSnapshot(st).remaining,60);
 st=creditCycleSession(st,'dad',60);
 assert.equal(cycleSnapshot(st).number,2);
 assert.equal(cycleSnapshot(st).subjectId,'port');
 let restored=JSON.parse(JSON.stringify(st));
 assert.equal(cycleSnapshot(restored).number,2);
 restored=advanceCycle(restored);
 assert.equal(cycleSnapshot(restored).number,3);
 assert.equal(cycleSnapshot(restored).subjectId,'dcon');
 assert.equal(st.imaCycle.index,1,'sem alterar original');
});
test('registrar sessão da posição atual credita tempo real e não altera posição por registros avulsos',()=>{
 let st=seed();
 st=appendSession(st,{subjectId:'dad',unitId:'ima-tha-dad-02',date:'2026-11-15',
  hours:1,minutes:0,questions:10,correct:7,activity:'theory',inCycle:true});
 assert.equal(cycleSnapshot(st).number,1);assert.equal(cycleSnapshot(st).remaining,60);
 const byHand=appendSession(st,{subjectId:'port',unitId:'port-u-9',date:'2026-11-15',
  hours:1,minutes:0,questions:0,correct:0,activity:'theory'});
 assert.equal(cycleSnapshot(byHand).number,1);
 assert.throws(()=>appendSession(st,{subjectId:'port',unitId:'port-u-9',date:'2026-11-15',
  hours:1,minutes:0,activity:'theory',inCycle:true}),/posição atual/);
 st=appendSession(st,{subjectId:'dad',unitId:'ima-tha-dad-02',date:'2026-11-15',
  hours:1,minutes:0,questions:0,correct:0,activity:'review',inCycle:true});
 assert.equal(cycleSnapshot(st).number,2);
 const w=weekSummary(st,'2026-11-15');
 assert.equal(w.cycle,120);assert.equal(w.targets.dad,360);
});
test('fase 2 inclui Licitações, mantém 30h e preserva avanço já feito',()=>{
 let st=seed();st=advanceCycle(st);
 assert.equal(cycleSnapshot(st).number,2);
 for(const n of ['02','03','04','05','06','07','08']){
  const id='ima-tha-dad-'+n;
  for(const part of getUnit(st,'dad',id).parts)st=setPart(st,'dad',id,part.id,true,'2026-11-15');
 }
 const c=cycleSnapshot(st);assert.equal(c.phase,'2');
 assert.equal(sum(cycleTargets(st)),1800);assert.equal(cycleTargets(st).dad,240);
 assert.equal(cycleTargets(st).dcon,240);assert.equal(cycleTargets(st)['licita-ima'],240);
 assert.equal(c.totalPositions,15);
 assert.equal(LICITATIONS_CYCLE.filter(x=>x==='licita-ima').length,2);
 assert.ok(c.index>=0&&c.index<15);
});
test('currículo do pós-edital inclui exatamente terceira aula Diego e dois cursos de Ambiental',()=>{
 const st=seed(),ti=activeUnits(st,'ti-ima'),env=activeUnits(st,'leg-ambiental'),apu=activeUnits(st,'adm-publica');
 assert.equal(ti[0].teacher,'Rodrigo Schaeffer');
 assert.equal(ti[1].teacher,'Rodrigo Schaeffer');
 assert.equal(ti[2].teacher,'Diego Carvalho');
 assert.match(ti[2].title,/Aula 3/);
 assert.equal(env.length,6);
 assert.deepEqual(env.map(x=>x.teacher),[
  'Guilherme Tomasoni','Guilherme Tomasoni','Guilherme Tomasoni',
  'André Rocha','André Rocha','André Rocha'
 ]);
 assert.ok(apu.some(x=>x.teacher==='Marcelo Soares'));
 assert.ok(apu.some(x=>x.teacher==='Tiago Zanolla'));
 assert.ok(apu.some(x=>x.teacher==='Stefan Fantini'));
 assert.equal(activeUnits(st,'afo')[0].teacher,'Leandro Ravyelle');
 assert.equal(activeUnits(st,'port').length,40);
});
test('continuidade posterior não reconstrói progresso ou muda curso',()=>{
 const original=seed(),c1=cycleSnapshot(original);
 const moved=advanceCycle(advanceCycle(original));
 const loaded=prepareIMA(JSON.parse(JSON.stringify(moved)));
 assert.equal(cycleSnapshot(loaded).number,3);
 assert.equal(cycleSnapshot(original).number,c1.number);
 assert.equal(getUnit(loaded,'port','port-u-8').theoryDone,true);
 assert.equal(getUnit(loaded,'dcon','ESTRATEGIA-DCON-05').theoryDone,false);
});
