// Integração aditiva: 2 fases, progresso real por videoaula, sem apagar estudo anterior.
// Fonte: "Disciplina de INFO e TI_Dados - Rodrigo.pdf" (36 pp., 04/11/2026).
import {COMBO_GROUPS,COMBO_QUESTIONS,COMBO_COUNTS} from './veon-combo-catalog.js';
import {RFB_GROUPS,RFB_COUNTS} from './veon-rfb-catalog.js';
export {COMBO_GROUPS,COMBO_QUESTIONS,COMBO_COUNTS,RFB_GROUPS,RFB_COUNTS};
export const VEON_PROGRAM_VERSION='veon-info-dados-camile-20261104-v1';
export const VEON_INFO_URL='https://veonconcurso.com.br/ver/curso/informatica-para-concursos-combo/';
export const VEON_RFB_URL='https://veonconcurso.com.br/ver/curso/curso-de-fluencia-em-dados-para-concurso-receita-federal/';
export const VEON_SOURCE='Disciplina de INFO e TI_Dados - Rodrigo.pdf · 36 páginas · 04/11/2026';
const copy=x=>JSON.parse(JSON.stringify(x));
const score=()=>({attempted:0,correct:0});
const SPECIAL_NOTES={
 'rs-info-03':'Windows 11 é a versão prioritária; praticar pesquisa, atalhos, arquivos e configurações.',
 'rs-info-09':'Word 365 como base. Word 2019 é complemento por edital ou lacuna em questões.',
 'rs-info-10':'Excel 365 como base. Praticar fórmulas, referências, filtros e planilhas reais.',
 'rs-info-12':'O LibreOffice 7 consta expressamente na PMSC/2026; não pular Writer, Calc ou Impress.',
 'rs-info-13':'Praticar planilhas no Calc 7. Complementar Excel quando houver diferenças funcionais.',
 'rs-info-15':'Segurança é recorrente: malwares, phishing, cópias, autenticação e cuidados práticos.',
 'rs-info-32':'PONTE na Fase 1: cinco aulas de conceitos de bancos de dados antes do curso RFB.',
 'rs-info-49':'PONTE para inteligência de negócio e sistemas de apoio à decisão.',
 'rs-info-50':'PONTE: aprender vocabulário da análise de dados antes da RFB.',
 'rs-info-62':'PONTE: visão introdutória de Big Data, aprofundada na RFB.',
 'rs-info-02':'Windows 10 como diferencial quando constar do edital, não duplicar toda a teoria básica.',
 'rs-info-06':'Somente por edital Word 2019 ou lacuna específica após Word 365.',
 'rs-info-07':'Somente por edital Excel 2019 ou lacuna específica após Excel 365.',
 'rs-info-67':'Introdução à IA apenas se exigida em prova geral; na RFB há cinco aulas próprias de IA/ML.',
 'rs-info-30':'Internet Explorer 11 é legado; não estudar agora sem edital expresso.',
 'rs-info-36':'Skype é legado; não estudar agora sem edital expresso.',
 'rs-info-37':'Hangouts é legado; não estudar agora sem edital expresso.'
};
function note(row){
 return SPECIAL_NOTES[row.id]||(
 row.track==='essencial'?'Primeira passagem obrigatória: teoria, prática no computador, questões e revisões.':
 row.track==='ponte'?'Ponte de Dados na Fase 1; depois aprofundar pela RFB.':
 row.track==='sob-edital'?'Não estudar na primeira passagem. Ativar se o edital exigir ou surgir lacuna em questões.':
 row.track==='reserva'?'Não priorizar; ferramenta legada ou escopo muito específico.':
 'Fase 2: aprofundamento RFB. O curso não garante sozinho cobertura de todo o TCU.'
 );
}
const partsFor=row=>Array.from({length:row.count},(_,i)=>({
 id:row.id+'-va-'+String(i+1).padStart(2,'0'),number:i+1,
 title:row.id==='rs-info-questions'?COMBO_QUESTIONS[i]:
 row.id==='rs-rfb-questions'?'Questões — Aula '+(i+1):'Aula '+(i+1),done:false
}));
const listFor=id=>{
 const main=id==='info'?COMBO_GROUPS:RFB_GROUPS;
 const question=id==='info'?
 {id:'rs-info-questions',title:'Questões · 500 questões / 32 aulas',count:32,
  number:68,sourcePage:29,track:'questoes',activeOrder:199,questionOnly:true}:
 {id:'rs-rfb-questions',title:'Questões · 20 videoaulas',count:20,
  number:13,sourcePage:36,track:'questoes',activeOrder:199,questionOnly:true};
 return [...main,question];
};
function unit(row,sid){
 const question=!!row.questionOnly,info=sid==='info',active=row.activeOrder>0&&!question;
 return {id:row.id,title:row.title,order:active?row.activeOrder:200+row.number,
  track:row.track,studyPhase:info?1:2,questionOnly:question,
  courseId:info?'veon-info-combo':'veon-rfb',courseLabel:info?'Informática · Combo':'Fluência em Dados · RFB',
  source:'VEON · Rodrigo Schaeffer',sourceURL:info?VEON_INFO_URL:VEON_RFB_URL,
  sourcePage:row.sourcePage,pdfSource:VEON_SOURCE,totalBlocks:row.count,parts:partsFor(row),
  guidance:question?'Resolver questões em paralelo à teoria, por assunto. Não esperar terminar o curso.':note(row),
  catalog:true,veonCatalog:true,priority:
   row.track==='essencial'?'P1 · ESSENCIAL':row.track==='ponte'?'P1 · PONTE':
   row.track==='sob-edital'?'P2 · SOB EDITAL':row.track==='reserva'?'RESERVA':
   question?'QUESTÕES EM PARALELO':'P2 · DADOS',
  hiddenFromRoute:!active,deferred:!active,
  theoryDone:false,theoryDate:'',batteryDone:false,generalDone:false,materialReady:false,
  battery:score(),general:score(),legacy:[],marks:[]
 };
}
export function reconcileVeonCurriculum(current){
 const st=copy(current);if(!Array.isArray(st.subjects))return st;
 for(const [sid,course] of [
  ['info','Fase 1 · Informática para Concursos · Rodrigo Schaeffer / VEON'],
  ['dados-rodrigo','Fase 2 · TI/Dados · Fluência em Dados RFB · Rodrigo Schaeffer']
 ]){
  let s=st.subjects.find(x=>x.id===sid);
  if(!s){s={id:sid,phase:'new',course,slotMinutes:60,units:[],checkpoints:{},notebooks:[],andresanComplete:false};st.subjects.push(s);}
  s.course=course;s.phase=s.phase||'new';s.slotMinutes=Number.isInteger(s.slotMinutes)?s.slotMinutes:60;
  s.checkpoints=s.checkpoints||{};s.notebooks=s.notebooks||[];s.units=s.units||[];
  s.veonProgram={version:VEON_PROGRAM_VERSION,source:VEON_SOURCE,
   phase:sid==='info'?1:2,url:sid==='info'?VEON_INFO_URL:VEON_RFB_URL};
  // Em Informática, manter todas as unidades antigas e seus registros; fora da nova rota.
  if(sid==='info')for(const u of s.units)if(!String(u.id).startsWith('rs-info-')){
   u.hiddenFromRoute=true;u.deferred=true;u.originalStudyRoutePreserved=true;
  }
  for(const row of listFor(sid)){
   const nu=unit(row,sid),old=s.units.find(x=>x.id===row.id);
   if(!old){s.units.push(nu);continue;}
   for(const key of ['title','order','track','studyPhase','questionOnly','courseId','courseLabel',
    'source','sourceURL','sourcePage','pdfSource','totalBlocks','guidance','catalog',
    'veonCatalog','priority','hiddenFromRoute','deferred'])old[key]=nu[key];
   old.parts=Array.isArray(old.parts)?old.parts:nu.parts;
   const ids=new Set(old.parts.map(p=>p.id));
   for(const p of nu.parts)if(!ids.has(p.id))old.parts.push(p);
   old.parts.sort((a,b)=>a.number-b.number);
   old.battery=old.battery||score();old.general=old.general||score();
   old.legacy=Array.isArray(old.legacy)?old.legacy:[];old.marks=Array.isArray(old.marks)?old.marks:[];
  }
 }
 st.veonProgramVersion=VEON_PROGRAM_VERSION;
 return st;
}
export function veonQuestionTarget(u){
 if(u?.questionOnly)return 0;
 return Number(u?.totalBlocks||1)>=8?30:Number(u?.totalBlocks||1)>=4?20:10;
}
export function veonProgress(s){
 const all=(s?.units||[]).filter(u=>u.veonCatalog),main=all.filter(u=>!u.hiddenFromRoute).sort((a,b)=>(a.order||0)-(b.order||0));
 return {all,main,requiredVideos:main.reduce((n,u)=>n+u.parts.length,0),
  requiredDone:main.reduce((n,u)=>n+u.parts.filter(p=>p.done).length,0),
  next:main.find(u=>!u.theoryDone),questionGroup:all.find(u=>u.questionOnly)};
}
export function markVeonLesson(current,sid,uid,pid,date,finish){
 const st=copy(current),u=st.subjects.find(s=>s.id===sid)?.units.find(x=>x.id===uid);
 const p=u?.parts?.find(x=>x.id===pid);if(!u?.veonCatalog||!p)throw Error('Aula VEON não encontrada.');
 if(finish){
  if(p.done)throw Error('A aula já está concluída. Registre como revisão, sem remarcar.');
  p.done=true;p.completedOn=date;
  u.completedBlocks=u.parts.filter(x=>x.done).map(x=>x.number);u.blocksCompleted=u.completedBlocks.length;
  if(u.parts.every(x=>x.done)){u.theoryDone=true;u.theoryDate=u.theoryDate||date;}
 }
 return st;
}
