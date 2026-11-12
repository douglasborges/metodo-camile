/**
 * IMA-SC — modelo ativo exclusivo da Camile (2026/2027).
 * Migração não destrutiva na origem: faça backup do JSON anterior ANTES de persistir.
 * Nenhum módulo da CGU, 7 Fontes ou Andresan é usado neste currículo.
 */
import {reconcileDconProgram} from './dcon-programacao-20261103.js';
import {reconcileImaSubjects,imaLegislationPair,IMA_LAWS} from './ima-sc-curriculum-20261105.js';
import {reconcileCamileImaProgress} from './ima-camile-progresso-metas-20261107.js';
import {IMA_AUDIT,imaLicitationStatus,imaWeekScheduleFor,imaWeeklyMinutesFor,IMA_WELCOME} from './ima-sc-auditoria-edital-20261106.js';

export const VERSION='3.0.0-ima-only-20261112';
export const OLD_STORAGE_KEY='metodo-et:camile:v1';
export const ARCHIVE_KEY='metodo-et:camile:archive-before-ima-v3';
export const SUBJECTS=Object.freeze([
 ['dad','Direito Administrativo','Thallius Moraes · DAD'],
 ['dcon','Direito Constitucional','Nelma Fontana · Cebraspe + Estratégia'],
 ['port','Português','Marcello Giulian · Extensivo (40 aulas)'],
 ['afo','AFO','Leandro Ravyelle · BizurAFO'],
 ['rl-ima','RL e Matemática','Guilherme Neves · Enxutos e complementos'],
 ['adm-publica','Administração Pública','Marcelo Soares · Faixa Preta (AP-05)'],
 ['ti-ima','TI / IA','Rodrigo Schaeffer · Combo Informática'],
 ['leg-ambiental','Legislação Ambiental','Anexo V · André Rocha e legislação seca'],
 ['licita-ima','Licitações e Contratos','Thallius Moraes · Rafael Oliveira (complemento)']
]);
const clone=v=>JSON.parse(JSON.stringify(v));
const keySet=(arr)=>new Set(arr);
const DAD_PASTAS=[
 ['02','Estado, governo, Administração e fontes',[1,2,3,4,5]],
 ['03','Organização administrativa',[1,2,3,4,5]],
 ['04','Órgãos públicos',[6]],
 ['05','Centralização, descentralização e desconcentração',[1,2]],
 ['06','Princípios administrativos',[1,2,3]],
 ['07','Atos administrativos',[1,2,3,4,5,6,7,8]],
 ['08','Poderes administrativos',[1,2,3,4,5]],
 ['09','Agentes públicos',[1,2,3,4,5,6,7,8,9]],
 ['11','Improbidade administrativa',[1,2,3,4,5,6,7,8,9]],
 ['12','Processo administrativo',[1,2,3,4,5,6,7,8]],
 ['13','Responsabilidade civil do Estado',[1,2,3,4,5]],
 ['16','Controle da Administração',[1,2,3,4,5,6]],
 ['17','Serviços públicos',[1,2,3,4,5]],
 ['19','Terceiro setor',[1,2]],
 ['26','Lei de Acesso à Informação',[1,2,3,4,5,6,7,8]],
 ['27','Lei Anticorrupção',[1,2,3]],
 ['28','Lei Geral de Proteção de Dados',[1,2,3,4,5,6,7,8,9,10]]
];
const DAD_IDS=DAD_PASTAS.map(([n])=>'ima-tha-dad-'+n);
const DCON_IDS=['NELMA-DCON-01','dcon-u-2','ESTRATEGIA-DCON-05',
 ...Array.from({length:9},(_,i)=>'NELMA-DCON-'+String(i+2).padStart(2,'0')),
 'NELMA-DCON-15','NELMA-DCON-16'];
const PORT_IDS=Array.from({length:40},(_,i)=>'port-u-'+(i+1));
const AFO_IDS=IMA_AUDIT.afo.map(x=>x.id);
const RL_IDS=IMA_AUDIT.rl.map(x=>x.id);
const TI_IDS=['IMA-TI-R67','IMA-TI-R49','IMA-TI-R15','IMA-TI-DIG','IMA-TI-RESP'];
const ENV_IDS=['ima-env-cf225','ima-env-lc140','ima-env-pnma','ima-env-sc14675-t1','ima-env-sc14675-t2','ima-env-ima17354'];
const LIC_IDS=['ima-lic-14','ima-lic-15',...Array.from({length:6},(_,i)=>'IMA-LIC-RAFAEL-A10-P'+(i+1)),'IMA-LIC-CRIMES'];
const IDs={dad:DAD_IDS,dcon:DCON_IDS,port:PORT_IDS,afo:AFO_IDS,'rl-ima':RL_IDS,
 'adm-publica':['MARC_ADM-ADM-AP-05'],'ti-ima':TI_IDS,'leg-ambiental':ENV_IDS,'licita-ima':LIC_IDS};
const LEGACY_KEPT={dcon:new Set(['dcon-u-1','dcon-u-4']),port:new Set(), 'adm-publica':new Set(['MARC_ADM-ADM-AP-01'])};
const escP=(n)=>String(n).padStart(2,'0');
export const WEEKDAY=['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'];
const LEGACY_PORT_TITLES=[
 'Aula 1 | Acentuação Gráfica','Aula 2 | Ortografia','Aula 3 | Classes de Palavras',
 'Aula 4 | Classes de Palavras; Funções Sintáticas','Aula 5 | Funções Sintáticas',
 'Aula 6 | Concordância Verbal; Concordância Nominal',
 'Aula 7 | Concordância Nominal; Regência Verbal',
 'Aula 8 | Regência Verbal; Crase; Colocação Pronominal',
 'Aula 9 | Colocação Pronominal','Aula 10 | Colocação Pronominal; Verbos',
 'Aula 11 | Orações','Aula 12 | Orações; Pontuação','Aula 13 | Pontuação; Questões'
];
export function initialIMAState(){
 const seed=(id,course,units=[])=>({id,course,phase:'new',slotMinutes:60,units,checkpoints:{},notebooks:[],andresanComplete:false});
 const make=(id,title,order)=>({id,title,order,theoryDone:false,theoryDate:'',
  batteryDone:false,generalDone:false,materialReady:false,
  battery:{attempted:0,correct:0},general:{attempted:0,correct:0},legacy:[],marks:[]});
 const port=seed('port','Marcello Giulian · Extensivo',
  LEGACY_PORT_TITLES.map((t,i)=>make('port-u-'+(i+1),t,i+1)));
 const dcon=seed('dcon','Nelma Fontana · Cebraspe e Estratégia',
  [make('dcon-u-2','Estratégia A04 — art. 5º (24 VAs + VA25)',2)]);
 const subjects=[port,dcon,...SUBJECTS.filter(([id])=>!['port','dcon'].includes(id)).map(([id,,course])=>seed(id,course))];
 return {version:1,settings:{focus:'IMA',secondary:'IMA',weeklyMinimum:1800,
   weeklyTarget:1800,dailyMinimum:240,dailyTarget:240},subjects,
  sessions:[],imports:[],archive:[],cycle:{index:0,minutes:0},
  legislation:{sessions:[]}};
}
const defaultUnit=(id,title,order,source)=>({id,title,order,source,phase:'new',theoryDone:false,theoryDate:'',
 batteryDone:false,generalDone:false,materialReady:false,battery:{attempted:0,correct:0},
 general:{attempted:0,correct:0},legacy:[],marks:[],parts:[]});
const lookup=(s,id)=>s.units.find(u=>u.id===id);
function ensureUnit(s,id,title,order,source){
 let u=lookup(s,id);
 if(!u){u=defaultUnit(id,title,order,source);s.units.push(u);}
 if(!Array.isArray(u.parts))u.parts=[];
 if(!Array.isArray(u.legacy))u.legacy=[];
 if(!Array.isArray(u.marks))u.marks=[];
 if(!u.battery)u.battery={attempted:0,correct:0};
 if(!u.general)u.general={attempted:0,correct:0};
 return u;
}
function ensureParts(u,numbers,prefix='Videoaula'){
 const previous=new Map((u.parts||[]).map(p=>[p.id,p]));
 const allCompleted=!!u.theoryDone;
 u.parts=numbers.map((n,i)=>{
  const id=u.id+'-v'+escP(n),old=previous.get(id)||previous.get(u.id+'-bloco-'+n)||null;
  return {id,number:n,title:prefix+' '+escP(n),
   done:old?!!old.done:allCompleted};
 });
 return u;
}
function buildData(st){
 const byId=new Map(st.subjects.map(s=>[s.id,s]));
 for(const [id,,course] of SUBJECTS){
  let s=byId.get(id);
  if(!s){s={id,phase:'new',course,slotMinutes:60,units:[],checkpoints:{},notebooks:[]};st.subjects.push(s);byId.set(id,s);}
  s.course=course;s.phase='new';s.units=Array.isArray(s.units)?s.units:[];
  s.checkpoints=s.checkpoints||{};s.notebooks=Array.isArray(s.notebooks)?s.notebooks:[];
 }
 const dad=byId.get('dad');
 for(let i=0;i<DAD_PASTAS.length;i++){
  const [n,topic,nums]=DAD_PASTAS[i],u=ensureUnit(dad,'ima-tha-dad-'+n,
   'Pasta '+n+' — '+topic,100+i,'Thallius Moraes · Curso Direito Administrativo');
  u.teacher='Thallius Moraes';u.courseLabel='DAD — Thallius Moraes';u.imaTopic=topic;u.editalTopic=topic;
  u.courseStage='DAD';u.isMandatory=true;
  ensureParts(u,nums);
 }
 const port=byId.get('port');
 for(let n=1;n<=40;n++){
  const u=ensureUnit(port,'port-u-'+n,
   n<=13?(lookup(port,'port-u-'+n)?.title||'Aula '+n):'Aula '+escP(n)+' — título individual não identificado na fonte',n,
   'Marcello Giulian · Extensivo');
  // Não preencher títulos 14–40 por suposição. Permitir que Camile acrescente o título exato.
  if(n>13&&!u.title.startsWith('Aula '+escP(n)))u.title='Aula '+escP(n)+' — '+u.title.replace(/^Aula\s+\d+\s*[–-]\s*/,'');
  u.teacher='Marcello Giulian';u.courseLabel='Português — Extensivo (40 aulas)';u.courseStage='PORT';
 }
 const dcon=byId.get('dcon');
 const a4=lookup(dcon,'dcon-u-2');
 if(a4){a4.title='Estratégia A04 — Direitos e garantias, art. 5º (24 VAs + VA25 exercícios)';ensureParts(a4,Array.from({length:25},(_,i)=>i+1),'VA');
  if(a4.theoryDone&&a4.exerciseVideoDone)a4.parts=a4.parts.map(x=>({...x,done:true}));
  a4.teacher='Nelma Fontana';a4.courseLabel='Estratégia · Aula 04';
 }
 const a5=ensureUnit(dcon,'ESTRATEGIA-DCON-05','Estratégia A05 — Remédios Constitucionais (8 VAs)',3,'Nelma Fontana · Estratégia');
 ensureParts(a5,Array.from({length:8},(_,i)=>i+1),'VA');
 for(const id of DCON_IDS){const u=lookup(dcon,id);if(u){u.teacher='Nelma Fontana';u.courseLabel=id.startsWith('NELMA')?'DCON Cebraspe':'DCON Estratégia';}}
 const afo=byId.get('afo');IMA_AUDIT.afo.forEach((r,i)=>{
  const u=ensureUnit(afo,r.id,'BizurAFO — '+r.lesson+' · '+r.topic,i+1,'Leandro Ravyelle · BizurAFO');
  u.teacher='Leandro Ravyelle';u.courseLabel='BizurAFO';u.editalTopic=r.topic;u.imaTopic=r.topic;
 });
 const rl=byId.get('rl-ima');IMA_AUDIT.rl.forEach((r,i)=>{
  const u=ensureUnit(rl,r.id,r.topic+' — '+r.lesson,i+1,r.source);
  u.teacher='Guilherme Neves';u.courseLabel='Escola de Exatas — Enxutos e complementos';u.imaTopic=r.topic;
 });
 const apu=byId.get('adm-publica');
 const ap=ensureUnit(apu,'MARC_ADM-ADM-AP-05','AP-05 · Transparência e Accountability (2 VAs)',1,'Marcelo Soares · Faixa Preta Administração Pública');
 ap.teacher='Marcelo Soares';ap.courseLabel='Faixa Preta — Administração Pública';ap.imaTopic='Transparência, accountability';
 if(!ap.parts?.length)ap.parts=[{id:'AP-05-TRANSP',number:1,title:'T01 — Transparência na Administração Pública',done:!!ap.theoryDone},{id:'AP-05-ACCOUNT',number:2,title:'T01 — Accountability',done:!!ap.theoryDone}];
 const ti=byId.get('ti-ima');
 const tech=[
  ['IMA-TI-R67','Inteligência Artificial e Aprendizado de Máquina — Rodrigo · Combo (grupo 67)',5],
  ['IMA-TI-R49','Sistemas de apoio à decisão — Rodrigo · Combo (grupo 49)',1],
  ['IMA-TI-R15','Segurança da informação — Rodrigo · Combo (grupo 15)',8],
  ['IMA-TI-DIG','Automação e transformação digital no setor público — complemento pelo edital',0],
  ['IMA-TI-RESP','IA responsável: vieses, transparência e supervisão humana — complemento pelo edital',0]
 ];
 tech.forEach(([id,title,count],i)=>{const u=ensureUnit(ti,id,title,i+1,count?'Rodrigo Schaeffer · Combo':'Edital IMA — complemento');u.teacher=count?'Rodrigo Schaeffer':'Complemento legislativo/temático';u.courseLabel=count?'Informática · Rodrigo Schaeffer':'Complemento do Anexo V';if(count)ensureParts(u,Array.from({length:count},(_,i)=>i+1));});
 const env=byId.get('leg-ambiental');
 ENV_IDS.forEach((id,i)=>{const row=IMA_LAWS.find(r=>r.id===id);const u=ensureUnit(env,id,row?.title||id,i+1,'Anexo V IMA/SC — legislação ambiental');
  u.courseLabel=id==='ima-env-pnma'?'André Rocha · Estratégia / Lei 6.938/81':'Leitura dirigida e questões FURB';});
 const lic=byId.get('licita-ima');
 for(const [n,num,topic] of [['14',21,'Lei 14.133/2021 — Licitações'],['15',8,'Contratos administrativos']]){
  const u=ensureUnit(lic,'ima-lic-'+n,'Thallius · Pasta '+n+' — '+topic+' ('+num+' VAs)',Number(n),'Thallius Moraes · Licitações');
  u.teacher='Thallius Moraes';u.courseLabel='Licitações — Thallius Moraes';
  ensureParts(u,Array.from({length:num},(_,i)=>i+1));
 }
 for(let i=1;i<=6;i++){
  const u=ensureUnit(lic,'IMA-LIC-RAFAEL-A10-P'+i,'Rafael Oliveira · Aula 10 — Parte '+i+' / 6 (sanções, controle e PNCP)',100+i,'Rafael Oliveira · Grupo GEN');
  u.teacher='Rafael Oliveira';u.courseLabel='Complemento opcional após Thallius';u.optionalSupplement=true;
 }
 const cp=ensureUnit(lic,'IMA-LIC-CRIMES','Crimes em licitações — CP arts. 337-E a 337-P (leitura e questões)',200,'Código Penal — complemento');
 cp.teacher='Legislação seca';cp.optionalSupplement=true;
 // Apenas nove disciplinas da prova ativa. Restos de CGU e Andresan não chegam à app.
 st.subjects=SUBJECTS.map(([id])=>{
  const s=byId.get(id),allowed=keySet([...(IDs[id]||[]),...(LEGACY_KEPT[id]||[])]);
  const units=s.units.filter(u=>allowed.has(u.id)).sort((a,b)=>IDs[id].indexOf(a.id)-IDs[id].indexOf(b.id));
  // Não transportar catálogos e metadados legados junto com a nova app.
  // O backup local pré-migração continua guardando esses dados integralmente.
  const cleanUnits=units.map(u=>{
   const keys=['id','title','order','source','sourceURL','courseId','courseLabel','teacher',
    'imaTopic','editalTopic','theoryDone','theoryDate','batteryDone','generalDone',
    'materialReady','battery','general','blocksCompleted','exerciseVideoDone',
    'completedBlocks','equivalenceSource','equivalenceReviewRequired','confirmedThallius',
    'optionalSupplement','imaCompletionSource','imaCompletionVerifiedAt'];
   const out={};for(const k of keys)if(u[k]!==undefined)out[k]=clone(u[k]);
   out.legacy=[];out.marks=[];
   out.parts=(u.parts||[]).map(p=>({id:p.id,title:p.title,number:p.number,done:!!p.done}));
   out.hiddenFromRoute=!IDs[id].includes(u.id);out.deferred=out.hiddenFromRoute;
   return out;
  });
  return {id,course:s.course,phase:'new',slotMinutes:60,units:cleanUnits,
   checkpoints:{},notebooks:[]};
 });
 return st;
}
export function prepareIMA(raw){
 let st=clone(raw);
 if(st.imaOnly?.version===VERSION&&st.subjects?.length===SUBJECTS.length)return st;
 if(!Array.isArray(st.subjects))st.subjects=[];
 if(!Array.isArray(st.sessions))st.sessions=[];
 if(!Array.isArray(st.imports))st.imports=[];
 if(!Array.isArray(st.archive))st.archive=[];
 if(!st.settings)st.settings={};
 if(!st.cycle)st.cycle={index:0,minutes:0};
 st.version=1;
 // Primeiro reconhecer a conclusão real por fonte, sem copiar horas/questões fictícias.
 st=reconcileDconProgram(st);
 st=reconcileImaSubjects(st);
 st=reconcileCamileImaProgress(st);
 st=buildData(st);
 const active=new Set(SUBJECTS.map(([id])=>id));
 const initialSessionCount=st.sessions.length;
 const subjectById=new Map(st.subjects.map(s=>[s.id,s]));
 const sessions=st.sessions.filter(r=>active.has(r.subjectId)&&
  (['port','dcon','adm-publica'].includes(r.subjectId)||/^2026-11-/.test(r.date||'')||r.ima===true))
  .map(r=>{
    const recordedUnit=subjectById.get(r.subjectId)?.units.find(u=>u.id===r.unitId);
    const validForIMA=!!(recordedUnit&&!recordedUnit.hiddenFromRoute&&
       r.date>='2026-11-06');
    const clean={id:r.id,date:r.date,subjectId:r.subjectId,unitId:r.unitId,
     activity:r.activity||'theory',minutes:Number(r.minutes)||0,
     questions:Number(r.questions)||0,correct:Number(r.correct)||0,
     title:recordedUnit?.title||'Sessão anterior de disciplina aproveitada'};
    if(r.ima===true||validForIMA)clean.ima=true;
    return clean;
  });
 const lawSessions=(st.legislation?.sessions||[]).filter(r=>IMA_LAWS.some(x=>x.id===r.normId)&&
  (r.date||'')>='2026-11-06').map(r=>({
    id:r.id,normId:r.normId,date:r.date,minutes:Number(r.minutes)||0,source:'IMA-EXTRACICLO'
  }));
 const verified=st.imaUserVerified?{
   version:st.imaUserVerified.version,
   confirmedOn:st.imaUserVerified.confirmedOn,
   portCompletedThrough:st.imaUserVerified.portCompletedThrough,
   dconCebraspeCompleted:st.imaUserVerified.dconCebraspeCompleted,
   estrategiaA04CompletedVideos:st.imaUserVerified.estrategiaA04CompletedVideos,
   estrategiaA05NextBlock:st.imaUserVerified.estrategiaA05NextBlock,
   apuLastConfirmed:st.imaUserVerified.apuLastConfirmed
 }:null;
 return {
  version:1,
  settings:{focus:'IMA',secondary:'IMA',weeklyMinimum:1800,weeklyTarget:1800,
   dailyMinimum:240,dailyTarget:240},
  subjects:st.subjects,
  sessions,
  imports:[],archive:[],cycle:{index:0,minutes:0},
  legislation:{sessions:lawSessions},
  imaProfile:{status:'IMA_ACTIVE',examDate:'2027-02-14',
   cycleWeeklyMinutes:1800,lawExtraWeeklyMinutes:210},
  ...(verified?{imaUserVerified:verified}:{}),
  imaOnly:{version:VERSION,focus:'IMA-SC',activeIds:[...active],
   archivedOldSessions:initialSessionCount-sessions.length,
   updatedOn:'2026-11-12',exam:'2027-02-14',dailyLawsExtra:30,
   notes:'Planejamento exclusivo IMA; backup integral anterior guardado separadamente no dispositivo.'}
 };

}
export function activeUnits(st,sid){const s=st.subjects.find(x=>x.id===sid);return (s?.units||[]).filter(u=>IDs[sid]?.includes(u.id));}
export function getUnit(st,sid,uid){return activeUnits(st,sid).find(x=>x.id===uid);}
export function isLicUnlocked(st){return imaLicitationStatus(st).unlocked;}
export function nextLessons(st,sid,count=2){
 if(sid==='licita-ima'&&!isLicUnlocked(st))return [];
 return activeUnits(st,sid).filter(u=>!u.theoryDone).slice(0,count);
}
export function setPart(st,sid,uid,pid,done,date){
 const out=clone(st),u=getUnit(out,sid,uid);
 if(!u||!u.parts?.length)throw Error('Videoaula não encontrada.');
 if(sid==='licita-ima'&&!isLicUnlocked(out))throw Error('Conclua primeiro DAD, pastas 02–08.');
 const part=u.parts.find(p=>p.id===pid);
 if(!part)throw Error('Parte não encontrada.');
 part.done=!!done;
 const all=u.parts.every(p=>p.done);
 u.theoryDone=all;
 if(all)u.theoryDate=u.theoryDate||date||'';else u.theoryDate='';
 if(uid==='dcon-u-2'){u.blocksCompleted=u.parts.filter(p=>p.done&&p.number<=24).length;u.exerciseVideoDone=!!u.parts.find(p=>p.number===25)?.done;}
 if(uid==='ESTRATEGIA-DCON-05'){u.blocksCompleted=u.parts.filter(p=>p.done).length;u.completedBlocks=u.parts.filter(p=>p.done).map(p=>p.number);}
 return out;
}
export function setTheory(st,sid,uid,done,date){
 const out=clone(st),u=getUnit(out,sid,uid);
 if(!u)throw Error('Aula não encontrada.');
 if(sid==='licita-ima'&&!isLicUnlocked(out))throw Error('Licitações bloqueadas até DAD Pasta 08.');
 if(u.parts?.length)throw Error('Esta unidade possui videoaulas: marque as partes individualmente.');
 u.theoryDone=!!done;u.theoryDate=done?(u.theoryDate||date||''):'';
 return out;
}
export const formatMinutes=x=>Math.floor(x/60)+'h'+String(x%60).padStart(2,'0');
export const isoToday=()=>new Date(Date.now()-new Date().getTimezoneOffset()*60000).toISOString().slice(0,10);
export function weekBounds(today=isoToday()){
 const d=new Date(today+'T12:00:00Z');const dow=d.getUTCDay();d.setUTCDate(d.getUTCDate()-(dow+1)%7);
 const start=d.toISOString().slice(0,10);d.setUTCDate(d.getUTCDate()+6);return {start,end:d.toISOString().slice(0,10)};
}
export function weekSummary(st,today=isoToday()){
 const bounds=weekBounds(today),totals=imaWeeklyMinutesFor(st),actual=Object.fromEntries(SUBJECTS.map(([id])=>[id,0]));
 let law=0;
 for(const r of st.sessions||[]){
  if(r.date<bounds.start||r.date>bounds.end||!actual.hasOwnProperty(r.subjectId))continue;
  // Histórico antigo de CGU nunca compõe as 30 horas atuais do IMA.
  if(r.ima===true||r.courseTrack==='IMA')actual[r.subjectId]+=Number(r.minutes)||0;
 }
 for(const r of st.legislation?.sessions||[])if(r.date>=bounds.start&&r.date<=bounds.end)law+=Number(r.minutes)||0;
 return {...bounds,targets:totals,actual,cycle:Object.values(actual).reduce((a,b)=>a+b,0),law};
}
export const lawPair=date=>imaLegislationPair(date);
export const weekSchedule=st=>imaWeekScheduleFor(st);
export {IMA_WELCOME,IMA_AUDIT};
export function appendSession(st,input){
 const out=clone(st),u=getUnit(out,input.subjectId,input.unitId),date=input.date||isoToday();
 if(!u)throw Error('Selecione uma aula válida.');
 if(input.subjectId==='licita-ima'&&!isLicUnlocked(out))throw Error('Licitações bloqueadas até DAD Pasta 08.');
 const minutes=Number(input.hours||0)*60+Number(input.minutes||0),
  questions=Number(input.questions||0),correct=Number(input.correct||0);
 if(!Number.isInteger(minutes)||minutes<1||minutes>600)throw Error('Registre entre 1 minuto e 10 horas.');
 if(!Number.isInteger(questions)||questions<0||questions>9999||
  !Number.isInteger(correct)||correct<0||correct>questions)throw Error('Questões/acertos inválidos.');
 if(!/^\d{4}-\d{2}-\d{2}$/.test(date)||date>isoToday())throw Error('Data inválida ou futura.');
 const id='ima_'+Date.now().toString(36)+'_'+Math.random().toString(36).slice(2,8);
 out.sessions.push({id,date,subjectId:input.subjectId,unitId:input.unitId,activity:input.activity||'theory',
  minutes,questions,correct,ima:true,title:u.title});
 return out;
}
export function appendLaw(st,normId,date=isoToday(),minutes=15){
 const out=clone(st);if(!IMA_LAWS.some(x=>x.id===normId))throw Error('Norma não cadastrada.');
 if(!out.legislation)out.legislation={};
 if(!Array.isArray(out.legislation.sessions))out.legislation.sessions=[];
 if(!Number.isInteger(minutes)||minutes<1||minutes>180)throw Error('Tempo inválido.');
 out.legislation.sessions.push({id:'ima_law_'+Date.now().toString(36)+'_'+Math.random().toString(36).slice(2,8),
  normId,date,minutes,source:'IMA-EXTRACICLO'});
 return out;
}
export function allSourceRecords(st){
 const entries=st.sessions.filter(r=>r.ima===true);
 return entries.sort((a,b)=>b.date.localeCompare(a.date));
}
