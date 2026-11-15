import test from 'node:test';
import assert from 'node:assert/strict';
import {initialIMAState,prepareIMA,activeUnits,getUnit} from '../src/ima-only-state.js';
import {VERIFIED_PROGRESS_VERSION} from '../src/ima-progress-validated-20261115.js';
const seed=()=>prepareIMA(initialIMAState());
const u=(st,sid,id)=>st.subjects.find(s=>s.id===sid)?.units.find(x=>x.id===id);
test('restaura exatamente a teoria confirmada, não mais do que isso',()=>{
 const st=seed(),p=activeUnits(st,'port'),a04=getUnit(st,'dcon','dcon-u-2');
 assert.equal(st.imaProgressReadout.version,VERIFIED_PROGRESS_VERSION);
 assert.equal(p.length,40);
 assert.equal(p.filter(x=>x.theoryDone).length,8);
 for(let i=0;i<8;i++){
  assert.equal(p[i].theoryDone,true);
  assert.equal(p[i].theoryDate,'','não inventar datas individuais');
  assert.equal(p[i].batteryDone,false,'não inventar questões TEC');
 }
 assert.equal(p[8].theoryDone,false);
 assert.equal(getUnit(st,'dcon','NELMA-DCON-01').theoryDone,true);
 assert.equal(a04.theoryDone,true);
 assert.equal(a04.parts.length,25);assert.ok(a04.parts.every(x=>x.done));
 assert.equal(a04.blocksCompleted,24);assert.equal(a04.exerciseVideoDone,true);
 assert.equal(getUnit(st,'dcon','ESTRATEGIA-DCON-05').theoryDone,false);
 assert.equal(getUnit(st,'dcon','NELMA-DCON-03').theoryDone,false);
 assert.equal(activeUnits(st,'dad').filter(x=>x.theoryDone).length,0);
 assert.equal(activeUnits(st,'licita-ima').filter(x=>x.theoryDone).length,0);
 assert.equal(st.sessions.length,0,'histórico confirmado não cria sessões fictícias');
});
test('APU do Marcelo permanece parcial: 70+70min e bloco 1/3, AP05 pendente',()=>{
 const st=seed(),ap=u(st,'adm-publica','MARC_ADM-ADM-AP-01'),ap05=getUnit(st,'adm-publica','MARC_ADM-ADM-AP-05');
 assert.ok(ap,'unidade histórica deve existir na base nova');
 assert.equal(ap.hiddenFromRoute,true);
 assert.equal(ap.theoryDone,false);
 assert.equal(ap.historicalStudy.status,'ESTUDADO_PARCIALMENTE');
 assert.equal(ap.historicalStudy.durationMinutes,140);
 assert.equal(ap.historicalStudy.sessionsReported,2);
 assert.equal(ap.historicalStudy.completedBlocks,1);
 assert.equal(ap.historicalStudy.totalBlocks,3);
 assert.equal(ap05.theoryDone,false);
 assert.equal(st.sessions.length,0,'140 min não são sessões inventadas no ciclo novo');
});
test('migração de versão antiga repara flags ausentes, preserva progresso recente e ciclo',()=>{
 const old=seed();
 old.imaOnly.version='3.2.0-ima-ciclo-continuo-pos-edital-20261115';
 for(let i=1;i<=8;i++)u(old,'port','port-u-'+i).theoryDone=false;
 u(old,'dcon','NELMA-DCON-01').theoryDone=false;
 const a04=u(old,'dcon','dcon-u-2');
 a04.theoryDone=false;a04.blocksCompleted=0;a04.exerciseVideoDone=false;
 a04.parts.forEach(x=>x.done=false);
 const a5=u(old,'dcon','ESTRATEGIA-DCON-05');
 a5.parts[0].done=true;a5.blocksCompleted=1;a5.theoryDone=false;
 u(old,'port','port-u-9').theoryDone=true;
 const ap05=u(old,'adm-publica','MARC_ADM-ADM-AP-05');
 ap05.parts[0].done=true;
 old.sessions.push({id:'sessao-real-14nov',date:'2026-11-14',subjectId:'port',unitId:'port-u-9',
 activity:'theory',minutes:65,questions:0,correct:0,ima:true,inCycle:true,cyclePhase:'1',cyclePosition:2});
 old.imaCycle.index=2;old.imaCycle.minutesInPosition=65;
 const snapshot=JSON.stringify(old),fresh=prepareIMA(old);
 assert.equal(JSON.stringify(old),snapshot,'não alterar backup original');
 for(let i=1;i<=9;i++)assert.equal(u(fresh,'port','port-u-'+i).theoryDone,true);
 assert.equal(u(fresh,'dcon','NELMA-DCON-01').theoryDone,true);
 assert.equal(u(fresh,'dcon','dcon-u-2').parts.filter(x=>x.done).length,25);
 assert.equal(u(fresh,'dcon','ESTRATEGIA-DCON-05').parts[0].done,true,'não reiniciar A05 recente');
 assert.equal(u(fresh,'adm-publica','MARC_ADM-ADM-AP-05').parts[0].done,true,'não perder AP05 recente');
 assert.equal(fresh.sessions.length,1);
 assert.equal(fresh.sessions[0].minutes,65);
 assert.equal(fresh.sessions[0].inCycle,true);
 assert.equal(fresh.imaCycle.index,2);
 assert.equal(JSON.stringify(prepareIMA(fresh)),JSON.stringify(fresh),'carga idempotente');
});
