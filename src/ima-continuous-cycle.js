/**
 * Ciclo contínuo e persistente do IMA-SC (Camile).
 * As 15 passagens de 120 minutos totalizam 30h semanais. A ordem não é
 * atrelada ao dia da semana: interromper no 3º bloco significa retomar ali.
 */
import {imaLicitationStatus} from './ima-sc-auditoria-edital-20261106.js';
export const CYCLE_SLOT_MINUTES=120;
export const CYCLE_VERSION='ima-ciclo-continuo-20261115-v1';
export const FOUNDATION_CYCLE=Object.freeze([
 'dad','port','dcon','afo','rl-ima',
 'dad','adm-publica','dcon','ti-ima','port',
 'afo','dad','rl-ima','dcon','leg-ambiental'
]);
export const LICITATIONS_CYCLE=Object.freeze([
 'dad','port','dcon','licita-ima','afo',
 'rl-ima','adm-publica','dad','ti-ima','dcon',
 'port','licita-ima','afo','rl-ima','leg-ambiental'
]);
const copy=x=>JSON.parse(JSON.stringify(x));
const phaseFor=st=>imaLicitationStatus(st).unlocked?'2':'1';
const positions=phase=>phase==='2'?LICITATIONS_CYCLE:FOUNDATION_CYCLE;
export function cycleTargets(st){
 const arr=positions(phaseFor(st)),totals={};
 for(const id of arr)totals[id]=(totals[id]||0)+CYCLE_SLOT_MINUTES;
 if(!('licita-ima' in totals))totals['licita-ima']=0;
 return totals;
}
function normalized(st){
 const phase=phaseFor(st),plan=positions(phase),prior=st.imaCycle||{};
 let index=Number.isInteger(prior.index)?prior.index:0;
 let minutes=Number.isFinite(prior.minutesInPosition)?prior.minutesInPosition:0;
 if(prior.phase!==phase){
  // Ao liberar Licitações, continuar da posição seguinte ao último assunto
  // em estudo, sem reiniciar aulas nem marcar minutos fictícios.
  const oldPlan=positions(prior.phase==='2'?'2':'1');
  const oldSubject=oldPlan[Math.max(0,Math.min(oldPlan.length-1,index))];
  if(prior.phase&&oldSubject){
   const candidate=plan.indexOf(oldSubject);
   index=candidate<0?0:(candidate+1)%plan.length;
  }else index=0;
  minutes=0;
 }
 index=Math.max(0,Math.min(plan.length-1,index));
 minutes=Math.max(0,Math.min(CYCLE_SLOT_MINUTES-1,minutes));
 return {version:CYCLE_VERSION,phase,index,minutesInPosition:minutes,
  roundsCompleted:Number(prior.roundsCompleted)||0,
  transitions:Array.isArray(prior.transitions)?prior.transitions:[]};
}
export function cycleSnapshot(st){
 const c=normalized(st),plan=positions(c.phase);
 return { ...c,plan,number:c.index+1,totalPositions:plan.length,
  subjectId:plan[c.index],remaining:CYCLE_SLOT_MINUTES-c.minutesInPosition,
  nextSubjectId:plan[(c.index+1)%plan.length],
  targetMinutes:15*CYCLE_SLOT_MINUTES,weeklyMinutes:cycleTargets(st)};
}
export function migrateCycle(st){
 const out=copy(st);out.imaCycle=normalized(st);return out;
}
function next(out,source){
 const c=normalized(out),plan=positions(c.phase);
 c.transitions.push({id:'cycle-'+(out.sessions?.length||0)+'-'+(c.transitions.length+1),
  phase:c.phase,from:c.index,to:(c.index+1)%plan.length,
  subjectId:plan[c.index],source,minutesAtAdvance:c.minutesInPosition});
 if(c.transitions.length>400)c.transitions=c.transitions.slice(-400);
 c.index=(c.index+1)%plan.length;
 c.minutesInPosition=0;
 if(c.index===0)c.roundsCompleted++;
 out.imaCycle=c;
 return out;
}
export function advanceCycle(st){
 const out=copy(st);return next(out,'manual');
}
export function creditCycleSession(st,sid,minutes){
 const out=copy(st),c=normalized(out),plan=positions(c.phase);
 if(plan[c.index]!==sid)throw Error('Disciplina registrada não corresponde à posição atual do ciclo.');
 if(!Number.isInteger(minutes)||minutes<1)throw Error('Tempo de estudo inválido.');
 c.minutesInPosition=Math.min(CYCLE_SLOT_MINUTES,c.minutesInPosition+minutes);
 out.imaCycle=c;
 if(c.minutesInPosition>=CYCLE_SLOT_MINUTES)return next(out,'study');
 return out;
}
