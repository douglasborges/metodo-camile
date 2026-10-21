import {FINAL_CGU_PLAN,FINAL_CGU_LESSONS,normalizeFinalCguState} from './cgu-final-plan.js';

export const FINAL_CGU_RUNTIME_VERSION='2.0.0-cgu-auditoria-final-20261021';
export const FINAL_CGU_CYCLE_SUBJECTS=Object.freeze([
 'afo','dcon','cpu','adm-publica','afo','dad','cpu','auditoria','afo','dad','cpu','auditoria','auditoria'
]);
export const FINAL_CGU_CYCLE_LABELS=Object.freeze([
 "AFO · Pacelli",
 "Direito Constitucional · Nelma",
 "CPU · Pacelli",
 "Administração Pública · Marcelo",
 "AFO · Pacelli",
 "DAD · Rafael / pré-requisitos → 7 Fontes",
 "CPU · Pacelli",
 "Auditoria · Marcelo",
 "AFO · Pacelli",
 "DAD / 7 Fontes P2",
 "CPU · Pacelli",
 "Auditoria · Marcelo",
 "7 Fontes P3 quando disponível · fallback/reforço P3"
]);

export const PREVIOUS_FINAL_CGU_CYCLE=Object.freeze(["afo","cpu","auditoria","dad","afo","cpu","adm-publica","auditoria","afo","cpu","dcon","auditoria","dad"]);
export function migrateFinalCguCycle(state,previousCycle=PREVIOUS_FINAL_CGU_CYCLE){
 const old=state.cycle||{index:0,minutes:0},index=Number(old.index)||0;
 const equivalent=previousCycle===PREVIOUS_FINAL_CGU_CYCLE
  ? [0,2,7,5,4,6,3,11,8,10,1,12,9][index]
  : FINAL_CGU_CYCLE_SUBJECTS.indexOf(previousCycle[index]);
 state.cycle={...old,index:equivalent>=0?equivalent:0};
 return state;
}

const SOURCE_CONFIG=Object.freeze({
 PAC_AFO:{subjectId:'afo',course:'AFO — Giovanni Pacelli · Curso Regular 2026',minutes:60},
 PAC_CPU:{subjectId:'cpu',course:'Contabilidade Pública — Giovanni Pacelli · Curso Regular 2026',minutes:60},
 NELMA:{subjectId:'dcon',course:'Direito Constitucional — Nelma Fontana · Cebraspe',minutes:60},
 MARC_ADM:{subjectId:'adm-publica',course:'Administração Pública — Marcelo Soares · Faixa Preta',minutes:60},
 MARC_AUD:{subjectId:'auditoria',course:'Auditoria Governamental — Marcelo Soares · CGU',minutes:60},
 RAFA_DAD:{subjectId:'dad',course:'Direito Administrativo — Rafael Oliveira · base até integração 7 Fontes',minutes:60},
 '7F':{subjectId:'cgu7',course:'7 Fontes · CGU Auditoria 2026',minutes:60}
});

const LEGACY_DIRECT=Object.freeze({
 'NELMA-DCON-01':['dcon-u-1'],
 'NELMA-DCON-03':['dcon-u-4'],
 'NELMA-DCON-05':['dcon-u-6'],
 'NELMA-DCON-08':['dcon-u-8'],
 'NELMA-DCON-15':['dcon-u-10'],
 'PAC_CPU-CPU-06':['cpu-pacelli-06'],
 'PAC_CPU-CPU-07':['cpu-pacelli-07'],
 'PAC_CPU-CPU-08':['cpu-pacelli-08'],
 'PAC_CPU-CPU-13':['cpu-pacelli-13'],
 'PAC_CPU-CPU-14':['cpu-pacelli-14'],
 'PAC_CPU-CPU-15':['cpu-pacelli-15']
});

const clone=v=>JSON.parse(JSON.stringify(v));
const emptyQuestions=()=>({attempted:0,correct:0});
function newUnit(lesson,order){
 return {
  id:lesson.id,title:String(lesson.number)+' · '+lesson.title,order,
  theoryDone:false,theoryDate:'',batteryDone:false,generalDone:false,materialReady:false,
  battery:emptyQuestions(),general:emptyQuestions(),legacy:[],marks:[],
  catalog:true,catalogVersion:FINAL_CGU_PLAN.version,sourceCode:lesson.source,source:lesson.teacher,
  course:lesson.course,lessonNumber:lesson.number,priority:lesson.priority,kind:lesson.kind,
  deps:lesson.deps||'',catalogStatus:lesson.status,availability:lesson.availability||'',
  sourcePage:lesson.source_page??null,note:lesson.note||'',
  ...(lesson.exclusiveArt5?{totalBlocks:24,studyPlan:lesson.note}:{}),
  hiddenFromRoute:lesson.source==='7F' && !(lesson.availability==='PUBLICADA_NO_PRINT' && lesson.status==='ESTUDAR')
 };
}
function copyStudyEvidence(target,source){
 if(!source)return target;
 if(source.theoryDone){target.theoryDone=true;target.theoryDate=source.theoryDate||target.theoryDate;}
 if(source.batteryDone)target.batteryDone=true;
 if(source.generalDone)target.generalDone=true;
 if(source.materialReady)target.materialReady=true;
 if(source.battery)target.battery=clone(source.battery);
 if(source.general)target.general=clone(source.general);
 if(Array.isArray(source.legacy))target.legacy=clone(source.legacy);
 if(Array.isArray(source.marks))target.marks=clone(source.marks);
 target.migratedEvidenceFrom=source.id;
 return target;
}
function legacyEvidence(subject,lesson){
 if(lesson.exclusiveArt5)return null;
 const ids=LEGACY_DIRECT[lesson.id]||[];
 let hit=(subject.units||[]).find(u=>ids.includes(u.id));
 if(hit)return hit;
 if(lesson.source==='RAFA_DAD'||lesson.source==='MARC_AUD'){
  const n=String(lesson.number||'').toUpperCase();
  hit=(subject.units||[]).find(u=>String(u.title||'').toUpperCase().includes(n));
 }
 return hit||null;
}
function ensureSubject(state,config,lessons){
 let s=(state.subjects||[]).find(x=>x.id===config.subjectId);
 if(!s){
  s={id:config.subjectId,course:config.course,phase:'new',slotMinutes:config.minutes,units:[],checkpoints:{},notebooks:[],andresanComplete:false};
  state.subjects.push(s);
 }
 s.course=config.course;
 s.slotMinutes=config.minutes;
 s.phase=s.phase||'new'; s.checkpoints=s.checkpoints||{}; s.notebooks=s.notebooks||[];
 const ids=new Set(lessons.map(x=>x.id));
 for(const u of s.units||[]){
  if(!ids.has(u.id) && !u.catalog){u.hiddenFromRoute=true;u.legacyPreserved=true;}
 }
 lessons.forEach((lesson,index)=>{
  let u=(s.units||[]).find(x=>x.id===lesson.id);
  if(!u){
   u=newUnit(lesson,index+1);
   const evidence=legacyEvidence(s,lesson);
   if(evidence)copyStudyEvidence(u,evidence);
   s.units.push(u);
  }else{
   const fresh=newUnit(lesson,index+1);
   const preserved={
    theoryDone:u.theoryDone,theoryDate:u.theoryDate,batteryDone:u.batteryDone,generalDone:u.generalDone,
    materialReady:u.materialReady,battery:u.battery,general:u.general,legacy:u.legacy,marks:u.marks
   };
   Object.assign(u,fresh,preserved);
  }
 });
 return s;
}
export function applyFinalCguCurriculum(state){
 state=normalizeFinalCguState(state);
 state.settings=state.settings||{};
 state.settings.dailyMinimum=300;
 state.settings.dailyTarget=360;
 state.settings.weeklyMinimum=1980;
 state.settings.weeklyTarget=2340;
 state.settings.sundayReviewMinutes=180;
 state.settings.cguPlanStart='2026-10-21';
 state.settings.focus='CGU';
 state.settings.secondary='TCU';
 if(!Array.isArray(state.subjects))state.subjects=[];
 for(const [source,config] of Object.entries(SOURCE_CONFIG)){
  const lessons=FINAL_CGU_LESSONS.filter(x=>x.source===source);
  ensureSubject(state,config,lessons);
 }
 const cgu7=state.subjects.find(x=>x.id==='cgu7');
 if(cgu7)Object.assign(cgu7,{studyPhase:'catalogo',priority:'P3→P2→P1',active:true});
 for(const id of ['afo','cpu','auditoria','dad','adm-publica','dcon']){
  const s=state.subjects.find(x=>x.id===id);
  if(s)Object.assign(s,{studyPhase:'final-cgu',priority:id==='dcon'||id==='adm-publica'?'P1 / PRÉ':'P3/P2',active:true});
 }
 state.cguFinalPlan.catalogLessonCount=FINAL_CGU_LESSONS.length;
 state.cguFinalPlan.appliedAt=state.cguFinalPlan.appliedAt||new Date().toISOString();
 return state;
}
export function finalCguLessonProgress(state,lesson){
 const config=SOURCE_CONFIG[lesson.source];
 const s=config&&(state.subjects||[]).find(x=>x.id===config.subjectId);
 const u=s&&(s.units||[]).find(x=>x.id===lesson.id);
 const sessions=(state.sessions||[]).filter(x=>x.subjectId===config?.subjectId&&x.unitId===lesson.id);
 const minutes=sessions.reduce((a,x)=>a+(Number(x.minutes)||0),0);
 const questions=sessions.reduce((a,x)=>a+(Number(x.questions)||0),0);
 const correct=sessions.reduce((a,x)=>a+(Number(x.correct)||0),0);
 return {
  theoryDone:!!u?.theoryDone,batteryDone:!!u?.batteryDone,generalDone:!!u?.generalDone,
  date:u?.theoryDate||sessions.map(x=>x.date).filter(Boolean).sort().at(-1)||'',
  minutes,questions,correct,
  status:u?.theoryDone?'CONCLUIDO':sessions.length?'EM_ANDAMENTO':'PENDENTE',
  subjectId:config?.subjectId||'',unitId:u?.id||''
 };
}
export function finalCguSlot(index){
 const slot=FINAL_CGU_PLAN.slot_cycle_13[index]||FINAL_CGU_PLAN.slot_cycle_13[0];
 return {...slot,subjectId:FINAL_CGU_CYCLE_SUBJECTS[index]||FINAL_CGU_CYCLE_SUBJECTS[0],label:FINAL_CGU_CYCLE_LABELS[index]||slot.discipline};
}
export function finalCguIsSunday(date=new Date()){return date.getDay()===0;}
export function finalCguPhaseForDate(iso){
 const parts=String(iso||'').split('-').map(Number); if(parts.length!==3||!parts[0]||!parts[1]||!parts[2])return null;
 const value=parts[0]*10000+parts[1]*100+parts[2],year=2026;
 for(let i=0;i<FINAL_CGU_PLAN.phases.length;i++){
  const p=FINAL_CGU_PLAN.phases[i],mm=p.period.match(/(\d{2})\/(\d{2})-(\d{2})\/(\d{2})/); if(!mm)continue;
  const a=year*10000+(+mm[2])*100+(+mm[1]),b=year*10000+(+mm[4])*100+(+mm[3]);
  if(value>=a&&value<=b)return {...p,index:i};
 }
 return null;
}

