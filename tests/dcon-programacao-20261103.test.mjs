import test from 'node:test';
import assert from 'node:assert/strict';
import {DCON_CEBRASPE,DCON_AVANCADO,DCON_BASE_ORDER,reconcileDconProgram,dconProgramStatus} from '../src/dcon-programacao-20261103.js';

for (const [who,artId] of [['TCU','ESTRATEGIA-DCON-04'],['Camile','dcon-u-2']]) {
 test('DCON 03/11: conserva histórico, ordena 18 aulas-base e prepara avançado ('+who+')',()=>{
  const history={id:'registro-antigo-'+who,subjectId:'dcon',unitId:artId,minutes:47,questions:11,correct:8};
  const initial={subjects:[{id:'dcon',units:[
   {id:artId,theoryDone:true,batteryDone:false,exerciseVideoDone:false,completedBlocks:[1],blocksCompleted:1},
   {id:'ESTRATEGIA-DCON-05',theoryDone:false,batteryDone:false,completedBlocks:[1,2],blocksCompleted:2}
  ]}],sessions:[history],goals:[{id:'meta-tcu-2',status:'active'}]};
  const next=reconcileDconProgram(initial),d=next.subjects[0];
  assert.equal(initial.subjects[0].units.length,2);
  assert.deepEqual(next.sessions,[history]);
  assert.deepEqual(next.goals,initial.goals);
  assert.equal(d.units.find(u=>u.id===artId).blocksCompleted,1);
  assert.equal(d.units.find(u=>u.id==='ESTRATEGIA-DCON-05').blocksCompleted,2);
  assert.equal(DCON_CEBRASPE.length,16);
  assert.equal(DCON_AVANCADO.length,16);
  assert.equal(DCON_AVANCADO.reduce((sum,row)=>sum+row.blocks,0),28);
  const route=d.units.filter(u=>!u.hiddenFromRoute).sort((a,b)=>a.order-b.order).map(u=>u.id);
  assert.deepEqual(route,[DCON_CEBRASPE[0].id,artId,'ESTRATEGIA-DCON-05',...DCON_CEBRASPE.slice(1).map(u=>u.id)]);
  assert.equal(d.units.filter(u=>u.programPhase==='avancado').length,16);
  assert.ok(d.units.filter(u=>u.programPhase==='avancado').every(u=>u.hiddenFromRoute));
  const same=reconcileDconProgram(next);
  assert.deepEqual(same.sessions,next.sessions);
  assert.equal(same.subjects[0].units.length,next.subjects[0].units.length);
  assert.equal(dconProgramStatus(same).baseDone,false);
  // Não bastam teoria e baterias: exercícios da A04 precisam de evidência explícita.
  for(const u of same.subjects[0].units.filter(u=>u.programPhase!=='avancado')){
   if([artId,'ESTRATEGIA-DCON-05',...DCON_CEBRASPE.map(x=>x.id)].includes(u.id)){
    u.theoryDone=true;u.batteryDone=true;
   }
  }
  assert.equal(dconProgramStatus(same).baseDone,false);
  same.subjects[0].units.find(u=>u.id===artId).exerciseVideoDone=true;
  const opened=reconcileDconProgram(same);
  assert.equal(dconProgramStatus(opened).baseDone,true);
  assert.ok(opened.subjects[0].units.filter(u=>u.programPhase==='avancado').every(u=>!u.hiddenFromRoute));
 });
}
