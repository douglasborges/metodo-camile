/**
 * Ciclo sequencial IMA-SC da Camile. A estrutura original de 15 posições
 * é IMUTÁVEL; pausas são apenas um filtro operacional, nunca exclusão.
 * Posições AFO/Exatas são puladas até o usuário solicitar retomada.
 */
import {imaLicitationStatus} from './ima-sc-auditoria-edital-20261106.js';
export const CYCLE_SLOT_MINUTES=120;
export const CYCLE_VERSION='ima-ciclo-continuo-20261118-pausas-v2';
export const PAUSE_VERSION='ima-pausa-afo-exatas-20261118-v1';
export const DEFAULT_PAUSED_SUBJECT_IDS=Object.freeze(['afo','rl-ima']);
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

/** O estado conserva a configuração para permitir retomada futura sem perder dados. */
export function pausedSubjects(st){
 const configured=st?.imaStudyPause?.subjectIds;
 return Array.isArray(configured)?configured.filter(id=>DEFAULT_PAUSED_SUBJECT_IDS.includes(id)):
  [...DEFAULT_PAUSED_SUBJECT_IDS];
}
export const isPausedSubject=(st,id)=>pausedSubjects(st).includes(id);

function findNextUnpaused(plan,start,st){
 const skipped=[];
 for(let n=0;n<plan.length;n++){
  const pos=(start+n)%plan.length,subjectId=plan[pos];
  if(!isPausedSubject(st,subjectId))return {index:pos,skipped};
  skipped.push({index:pos,subjectId});
 }
 throw Error('O ciclo IMA ficou sem disciplinas ativas.');
}
export function cycleTargets(st){
 const arr=positions(phaseFor(st)),totals={};
 for(const id of arr)totals[id]=(totals[id]||0)+(isPausedSubject(st,id)?0:CYCLE_SLOT_MINUTES);
 if(!('licita-ima' in totals))totals['licita-ima']=0;
 // Mesmo pausadas, as disciplinas continuam no relatório, com 0h de meta atual.
 for(const id of DEFAULT_PAUSED_SUBJECT_IDS)if(!(id in totals))totals[id]=0;
 return totals;
}
function normalized(st){
 const phase=phaseFor(st),plan=positions(phase),prior=st.imaCycle||{};
 let index=Number.isInteger(prior.index)?prior.index:0;
 let minutes=Number.isFinite(prior.minutesInPosition)?prior.minutesInPosition:0;
 const preservedPausedProgress=copy(prior.preservedPausedProgress||{});
 if(prior.phase!==phase){
  // Regra preexistente: após liberar Licitações, prosseguir depois da
  // última matéria em andamento (sem inventar estudo ou apagar sessões).
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
 const originalIndex=index;
 const active=findNextUnpaused(plan,index,st);
 if(active.index!==index){
  // A pausa nunca descarta minutos já registrados no ponteiro de AFO/RL.
  if(minutes>0){
   const k=phase+':'+index;
   preservedPausedProgress[k]={subjectId:plan[index],position:index+1,minutes,
    status:'PRESERVADO_NA_PAUSA'};
  }
  index=active.index;minutes=0;
 }
 return {version:CYCLE_VERSION,phase,index,minutesInPosition:minutes,
  roundsCompleted:Number(prior.roundsCompleted)||0,
  transitions:Array.isArray(prior.transitions)?prior.transitions:[],
  preservedPausedProgress,
  skippedFrom:active.index!==originalIndex?originalIndex:null};
}
export function cycleSnapshot(st){
 const c=normalized(st),plan=positions(c.phase);
 const next=findNextUnpaused(plan,(c.index+1)%plan.length,st);
 const effective=plan.filter(id=>!isPausedSubject(st,id)).length;
 return {...c,plan,number:c.index+1,totalPositions:plan.length,
  subjectId:plan[c.index],remaining:CYCLE_SLOT_MINUTES-c.minutesInPosition,
  nextSubjectId:plan[next.index],nextPositionNumber:next.index+1,
  pausedPositionNumbers:plan.map((id,i)=>isPausedSubject(st,id)?i+1:null).filter(Boolean),
  activePositions:effective,skippedPositions:plan.length-effective,
  targetMinutes:effective*CYCLE_SLOT_MINUTES,weeklyGoalMinutes:1800,
  weeklyMinutes:cycleTargets(st)};
}
export function migrateCycle(st){
 const out=copy(st);
 if(!out.imaStudyPause){
  out.imaStudyPause={version:PAUSE_VERSION,subjectIds:[...DEFAULT_PAUSED_SUBJECT_IDS],
   since:'2026-11-18',reason:'Pausa temporária de AFO e RL/Exatas; nenhuma unidade ou sessão excluída'};
 }
 out.imaCycle=normalized(out);
 return out;
}
function next(out,source){
 const c=normalized(out),plan=positions(c.phase);
 const choice=findNextUnpaused(plan,(c.index+1)%plan.length,out);
 c.transitions.push({id:'cycle-'+(out.sessions?.length||0)+'-'+(c.transitions.length+1),
  phase:c.phase,from:c.index,to:choice.index,subjectId:plan[c.index],
  skippedPaused:choice.skipped.map(x=>x.index+1),
  source,minutesAtAdvance:c.minutesInPosition});
 if(c.transitions.length>400)c.transitions=c.transitions.slice(-400);
 c.index=choice.index;c.minutesInPosition=0;
 const prevIndex=c.transitions.at(-1).from;
 if(choice.index<=prevIndex)c.roundsCompleted++;
 c.skippedFrom=null;
 out.imaCycle=c;
 return out;
}
export function advanceCycle(st){
 const out=copy(st);return next(out,'manual');
}
export function creditCycleSession(st,sid,minutes){
 const out=copy(st),c=normalized(out),plan=positions(c.phase);
 if(plan[c.index]!==sid)throw Error('Disciplina registrada não corresponde à posição atual do ciclo.');
 if(isPausedSubject(out,sid))throw Error('A disciplina está temporariamente pausada no ciclo.');
 if(!Number.isInteger(minutes)||minutes<1)throw Error('Tempo de estudo inválido.');
 c.minutesInPosition=Math.min(CYCLE_SLOT_MINUTES,c.minutesInPosition+minutes);
 out.imaCycle=c;
 if(c.minutesInPosition>=CYCLE_SLOT_MINUTES)return next(out,'study');
 return out;
}
