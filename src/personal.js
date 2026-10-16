import {copy,day,validDay,uid,CYCLE,RULES} from './core.js?v=1.5.0-cgu-books-final';
import {cycleSourceLabel} from './cgu-materials.js?v=1.5.0-cgu-books-final';
export const REMINDER_STATUS={todo:'A fazer',done:'Feito',future:'Futuramente'};
export const LEGISLATION_QUEUE=[
 {id:'cf88',short:'CF/88',title:'Constituição Federal de 1988'},
 {id:'lai',short:'LAI',title:'Lei 12.527/2011 — Lei de Acesso à Informação'},
 {id:'cgu',short:'Leg. CGU',title:'Sistema de Controle Interno e Auditoria — Lei 10.180/2001, Decreto 3.591/2000 e IN SFC/CGU 3/2017'},
 {id:'lgpd',short:'LGPD',title:'Lei 13.709/2018 — Lei Geral de Proteção de Dados Pessoais'}
];
export const LEGISLATION_PAIRS=Object.freeze([['cf88','lai'],['cgu','lgpd']]);
export const LAW_PLAN_START='2026-10-12';
export function legislationPair(date=day()){
 const serial=s=>{const [y,m,d]=s.split('-').map(Number);return Date.UTC(y,m-1,d)/86400000;};
 const index=Math.max(0,serial(date)-serial(LAW_PLAN_START))%LEGISLATION_PAIRS.length;
 return LEGISLATION_PAIRS[index].map(id=>LEGISLATION_QUEUE.find(x=>x.id===id));
}
export const GOAL_PLAN_VERSION=3;
export const GOAL_PLAN_START='2026-10-13T00:00:00-03:00';
export const GOAL_CYCLES_PER_META=4;
export const GOAL_META_COUNT=8;
export const WEEKLY_MAINTENANCE=Object.freeze([
 {subjectId:'politicas',label:'Políticas Públicas',referenceMinutes:60,source:'Estratégia PP/Avaliação · próxima etapa'},
 {subjectId:'ti',label:'Evidências / Dados / IA',referenceMinutes:60,source:'Lucas Ianni comum + Ramon TI TOTAL técnico'},
 {subjectId:'port',label:'Português',referenceMinutes:60,source:'Marcello Giulian + Andresan'}
]);
const GOAL_CORE_MINUTES=CYCLE.reduce((sum,id)=>sum+(RULES[id]?.minutes||60),0)*GOAL_CYCLES_PER_META;
const GOAL_MAINTENANCE_MINUTES=WEEKLY_MAINTENANCE.reduce((sum,x)=>sum+x.referenceMinutes,0);

export const GOAL_WINDOWS=Object.freeze([
 {start:'2026-10-13',end:'2026-10-19',label:'13–19/10'},
 {start:'2026-10-20',end:'2026-10-26',label:'20–26/10'},
 {start:'2026-10-27',end:'2026-11-02',label:'27/10–02/11'},
 {start:'2026-11-03',end:'2026-11-09',label:'03–09/11'},
 {start:'2026-11-10',end:'2026-11-16',label:'10–16/11'},
 {start:'2026-11-17',end:'2026-11-23',label:'17–23/11'},
 {start:'2026-11-24',end:'2026-11-30',label:'24–30/11'},
 {start:'2026-12-01',end:'2026-12-07',label:'01–07/12'}
]);

export const GOAL_MATERIAL_TARGETS=Object.freeze([
 [
  'AFO: M1 do BizurAFO e, em seguida, Celso Natale A2.1; depois retomar M2/M3/M4 conforme as ocorrências.',
  'Auditoria: Marcelo AIG → Avaliação → Consultoria → Apuração; Direção ainda bloqueado.',
  'Administração: Marcelo Evolução APU T01-T03 + questões de Reforma → Governança.',
  'DCON: seguir A01/Teoria dos Direitos/Art. 5º sem reiniciar histórico; DAD: Rafael U2 → U3 → U7.',
  'Manutenção: Rodrigo PP + Lucas Ianni/Ramon + Marcello/Andresan.'
 ],
 [
  'AFO: M6 → M7 → M8/M9; M5 não entra na rota. Consolidar A2.1 Celso se ainda houver lacuna.',
  'Auditoria: Marcelo Objetividade → PGMQ → PAINT → Planejamento Individual T1/T2.',
  'Administração: Gestão para Resultados → Planejamento → Excelência T01/T02.',
  'Pacelli/Netto: capítulos 2 → 5 → 6 → 7, somente após a base correspondente.',
  'DAD: avançar U17 → U10 → U11; depois Lei 9.784 como fechamento.'
 ],
 [
  'AFO: M10 SOMENTE RAP → M11 → M13; M12 não entra na rota atual.',
  'Pacelli/Netto: capítulos 8 → 9 → 10 → 15; respeitar LAI/LGPD/Conflito antes dos capítulos dependentes.',
  'DAD: U19 → U6 → chegar à U12 Licitações/Contratos; U8 PPP será seletivo.',
  'Auditoria: terminar os módulos Marcelo já liberados; mapear A1/C5 antes de abrir Direção.',
  'Políticas: PP A01/A02 → Ex Ante completa para Camile.'
 ],
 [
  'AFO: M14 seletivo → M15 → questões; iniciar Gilmar A2.4-A2.7 quando o núcleo orçamentário estiver maduro.',
  'Gilmar: DCASP → NBC TSP 34/MIC → Custos → Estatais I/II; A2.7 combina Gilmar + Nelma A15.',
  'Pacelli/Netto: capítulos 16 → 17 → 24 → 26 → 28; capítulos 12/13 entram quando DAD/Auditoria derem base.',
  'Livro Licitações: após Rafael U12, cap. 1 rápido → 2 → 3 → 6; cap. 4 continua bloqueado até achados/evidências do Marcelo.',
  'Dados comum: Lucas Ianni C4.1/C4.2-C4.5 + Ramon técnico da Camile.'
 ],
 [
  'Pacelli/Netto extras Camile: 19 → 20 → 25 → 27; cap. 12 para responsabilização conforme DAD.',
  'Livro Licitações: cap. 4 depois da base Marcelo; cap. 5 apenas após DAD/Responsabilização.',
  'Auditoria: somente agora liberar Direção/TSE Papéis + Testes + Amostragem + Execução + Evidências + Achados.',
  'NBC TA 230/500; 505/520 e 320/330 apenas em lacuna real.',
  'Políticas: Ex Post → CMAP seletivo → Passo A01/A02 + simulados.'
 ],
 [
  'A4.2/A4.3: Rafael como base; Direção pós-edital apenas na execução contratual/transferências que faltarem.',
  'A5.6: tratar como GAP JURÍDICO PRIORITÁRIO; complemento específico para prescrição, dosimetria, TAC, leniência e coordenação.',
  'C2.5 e A3.6-A3.7 continuam gaps controlados: localizar material específico, sem presumir cobertura.',
  'Organização/Competências CGU: A02 → A03 seletivo → A05 → A06 → A00/A01 → A04 seletivo.',
  'Conteúdo fechado migra para baterias, checkpoints e Estudo Sólido.'
 ],
 [
  'Fechar as cinco prioridades e atacar apenas itens PARCIAL/PENDENTE do Check do Edital.',
  'Revisar livros somente pelos capítulos marcados; Pacelli 22 e 29 permanecem reservas.',
  'Sociedade Brasileira/Diversidade só entra se o núcleo prioritário e a Fase 2 estiverem sob controle.',
  'Questões Cebraspe, erros, favoritas e legislação passam a dominar a carga.',
  'Não abrir curso completo por sensação de incompletude.'
 ],
 [
  'Consolidação total até 07/12: sem teoria ampla nova.',
  'Revisar AFO A2.1-A2.7, Auditoria A1/A4/A5, Administração/Integridade, DCON e DAD pelos próprios materiais.',
  'C2.5, A3.6-A3.7, A4.2-A4.3, A5.6 e A2.7 recebem somente fechamento pontual se ainda estiverem abertos.',
  'Políticas, Dados/IA e Português seguem em manutenção por questões/revisão.',
  'Preparar o Sprint Final 08–12/12.'
 ]
]);

export const GOAL_FOCUS=Object.freeze([
 [
  'Ciclo prioritário: AFO/Finanças → Auditoria → Administração Pública → DCON → DAD; quatro voltas na Meta.',
  'Regra-mestra v1.6: um item do edital tem uma fonte principal; complemento somente depois, sem duplicação.',
  'AFO já segue a rota final: M1 → Celso A2.1 → M2/M3/M4; M5 não entra.',
  'Auditoria começa exclusivamente pelo Marcelo; Estratégia Auditoria pré-edital está removido.',
  'Tempo real prevalece e o histórico individual jamais é reiniciado.'
 ],
 [
  'AFO continua M6/M7/M8/M9; Celso fecha apenas A2.1.',
  'Marcelo Auditoria avança até PAINT/Planejamento; Direção continua bloqueado.',
  'Administração segue a sequência Faixa Preta definida no Plano Mestre Final.',
  'Leis especiais entram somente depois da aula-base Rafael/Ética correspondente.',
  'Manutenção semanal: Políticas, Evidências/Dados/IA e Português.'
 ],
 [
  'AFO entra em M10 apenas RAP, M11 e M13; M12 fica fora da rota.',
  'Rafael DAD deve alcançar U12 sem saltar a rota-base; U8 PPP é seletivo.',
  'Pacelli/Netto é leitura dirigida, nunca curso linear.',
  'Ex Ante é completa para Camile; PP A03/A04 só reaproveitam B1.',
  'Registrar no Check exatamente o que foi coberto e o que permanece parcial.'
 ],
 [
  'AFO: M14 seletivo, M15 e início de Gilmar A2.4-A2.7.',
  'Livro de licitações entra após Rafael U12; cap. 4 espera a base Marcelo em achados/evidências.',
  'Lucas Ianni cobre o recorte comum C4; Ramon segue como fonte técnica da Camile.',
  'Pacelli capítulos altos entram apenas com a base normativa pronta.',
  'Nenhum pacote paralelo refaz conteúdo já concluído.'
 ],
 [
  'Depois do Marcelo, Direção/TSE entra somente em testes, amostragem, execução, evidências e achados.',
  'Direção/CGU NBC TA é seletivo; não transformar NBC/IPPF em segundo curso completo.',
  'A4 usa Rafael + livro; o livro não fecha execução contratual nem transferências/parcerias.',
  'A5 usa Pacelli/Netto + Rafael/Herbert + Organização CGU; A5.6 permanece gap prioritário.',
  'Baterias/checkpoints crescem à medida que a teoria fecha.'
 ],
 [
  'Fechamento de A4.2/A4.3, A5.6, C2.5, A3.6-A3.7 e A2.7 somente por material específico.',
  'Organização/Competências CGU entra seletivamente na rota institucional.',
  'Direção C1/C2/B1 só entra em lacuna nominal.',
  'Conteúdo fechado migra para revisão/questões em vez de nova teoria.',
  'Manutenção transversal continua curta.'
 ],
 [
  'Fechamento das prioridades: nada de curso novo por completude.',
  'Sociedade Brasileira/Diversidade permanece Fase 4 até o núcleo de maior retorno estar sob controle.',
  'Check do Edital comanda as lacunas finais e preserva códigos internos apenas como referência técnica.',
  'Legislação Seca continua 30 min/dia dentro das 30h.',
  'Erros, favoritas, checkpoints e simulados ganham prioridade.'
 ],
 [
  'Consolidação final até 07/12: erros, favoritas, revisões gerais, checkpoints e Cebraspe.',
  'Nenhuma teoria ampla nova; apenas gaps curtos de alto valor.',
  'Revisar pelas fontes principais já estudadas e pelos capítulos dirigidos.',
  'B2 só entra se houver espaço real sem deslocar o núcleo central.',
  'Meta 08 fecha em 07/12 e libera o Sprint 08–12/12.'
 ]
])

export const FINAL_SPRINT=Object.freeze({
 start:'2026-12-08',
 end:'2026-12-12',
 label:'08–12/12',
 title:'Sprint Final · 5 dias',
 actions:[
  'Sem curso novo e sem teoria ampla nova.',
  'Erros, favoritas, revisões gerais e pontos marcados como lacuna no Check do Edital.',
  'Legislação Seca e normas de alta incidência em leitura direcionada.',
  'Questões/simulados e revisão das justificativas dos erros.',
  'Na véspera, reduzir carga e priorizar recuperação, material curto e logística da prova.'
 ]
});

function buildCycleGoalTasks(metaNumber){
 let step=0;
 const perSubject={};
 const core=Array.from({length:GOAL_CYCLES_PER_META},(_,round)=>CYCLE.map((sid,index)=>{
  step++;
  perSubject[sid]=(perSubject[sid]||0)+1;
  return {
   id:'meta-'+String(metaNumber).padStart(2,'0')+'-c'+(round+1)+'-'+String(index+1).padStart(2,'0'),
   title:'Volta '+(round+1)+' · '+(RULES[sid]?.label||sid)+' · '+cycleSourceLabel(sid),
   hint:'Ciclo prioritário · ocorrência '+step+'/'+(CYCLE.length*GOAL_CYCLES_PER_META)+' · referência '+Math.round((RULES[sid]?.minutes||60)/15)*15+' min · conclua a etapa real prevista.',
   subjectId:sid,
   cycleRound:round+1,
   cyclePosition:index+1,
   referenceMinutes:RULES[sid]?.minutes||60,
   check:['cycleSubjectCount',sid,'',perSubject[sid]]
  };
 })).flat();
 const maintenance=WEEKLY_MAINTENANCE.map((m,index)=>({
  id:'meta-'+String(metaNumber).padStart(2,'0')+'-m'+String(index+1).padStart(2,'0'),
  title:'Manutenção · '+m.label+' · '+m.source,
  hint:'1 ocorrência na semana · referência '+m.referenceMinutes+' min · fora do ciclo prioritário, sem avançar a ordem central.',
  subjectId:m.subjectId,
  maintenance:true,
  referenceMinutes:m.referenceMinutes,
  check:['goalSubjectCount',m.subjectId,'',1]
 }));
 return [...core,...maintenance];
}
export const GOAL_TEMPLATES=Array.from({length:GOAL_META_COUNT},(_,i)=>{
 const number=i+1,window=GOAL_WINDOWS[i];
 return {
  id:'meta-'+String(number).padStart(2,'0'),
  number,
  title:'Meta '+String(number).padStart(2,'0')+' · 30h · '+window.label,
  subtitle:'4 voltas do ciclo prioritário AFO/Finanças → Auditoria → Administração Pública → DCON → DAD + manutenção semanal de Políticas Públicas, TI/Dados e Português.',
  targetMinutes:1800,
  coreMinutes:GOAL_CORE_MINUTES,
  maintenanceMinutes:GOAL_MAINTENANCE_MINUTES,
  marginMinutes:1800-GOAL_CORE_MINUTES-GOAL_MAINTENANCE_MINUTES,
  targetStart:window.start,
  targetEnd:window.end,
  targetLabel:window.label,
  dailyReferenceMinutes:300,
  weeklyReferenceMinutes:1800,
  focus:GOAL_FOCUS[i],
  materialTargets:GOAL_MATERIAL_TARGETS[i],
  tasks:buildCycleGoalTasks(number)
 };
});

export const BIZURAFO_MODULES=Object.freeze([
 {id:'biz-01',number:1,title:'Base A2.1 · economia/finanças públicas e intervenção do Estado',status:'core',note:'ESTUDAR. Depois do M1, usar Celso Natale no fechamento de A2.1.'},
 {id:'biz-02',number:2,title:'PPA, LDO e LOA',status:'core',note:'ESTUDAR na rota final da Camile.'},
 {id:'biz-03',number:3,title:'Princípios orçamentários',status:'core',note:'ESTUDAR na rota final da Camile.'},
 {id:'biz-04',number:4,title:'Créditos adicionais',status:'core',note:'ESTUDAR na rota final da Camile.'},
 {id:'biz-05',number:5,title:'Módulo 05',status:'pause',note:'NÃO ESTUDAR na rota final atual da Camile.'},
 {id:'biz-06',number:6,title:'Técnicas orçamentárias e orçamento-programa',status:'core',note:'ESTUDAR.'},
 {id:'biz-07',number:7,title:'Receita pública',status:'core',note:'ESTUDAR.'},
 {id:'biz-08',number:8,title:'Despesa pública',status:'core',note:'ESTUDAR.'},
 {id:'biz-09',number:9,title:'Execução orçamentária e financeira',status:'core',note:'ESTUDAR.'},
 {id:'biz-10',number:10,title:'Restos a Pagar',status:'cut',note:'ESTUDAR SOMENTE RAP. DEA e suprimento de fundos não fazem parte do recorte atual deste módulo.'},
 {id:'biz-11',number:11,title:'Lei de Responsabilidade Fiscal — LRF',status:'core',note:'ESTUDAR na rota final.'},
 {id:'biz-12',number:12,title:'Sistemas de informações',status:'pause',note:'NÃO ESTUDAR na rota final atual da Camile.'},
 {id:'biz-13',number:13,title:'Regimes / ajustes fiscais',status:'core',note:'ESTUDAR. O Plano Mestre Final recolocou o M13 na rota da Camile.'},
 {id:'biz-14',number:14,title:'Lei 4.320/1964',status:'cut',note:'SELETIVO. Usar apenas os pontos aderentes ao edital e ao fechamento A2.2/A2.3.'},
 {id:'biz-15',number:15,title:'Conta Única do Tesouro Nacional',status:'core',note:'ESTUDAR.'},
 {id:'biz-16',number:16,title:'Questões extras Cebraspe',status:'optional',note:'Usar como diagnóstico/bateria; não é teoria obrigatória na rota.'}
])
const BIZ_STATUS_LABEL={core:'ESTUDAR',cut:'ESTUDAR COM CORTES',pause:'NÃO ESTUDAR AGORA',optional:'OPCIONAL'};
export function bizurStatusLabel(status){return BIZ_STATUS_LABEL[status]||status;}
export function bizurSnapshot(current){
 const st=normalizeExtras(copy(current)),b=st.bizurafo,rows=(st.sessions||[]).filter(s=>s.bizurafoModuleId);
 const modules=BIZURAFO_MODULES.map(m=>{const rec=b.modules.find(x=>x.id===m.id)||{},logs=rows.filter(x=>x.bizurafoModuleId===m.id);return {...m,done:!!rec.done,minutes:logs.reduce((a,x)=>a+(Number(x.minutes)||0),0),questions:logs.reduce((a,x)=>a+(Number(x.questions)||0),0),correct:logs.reduce((a,x)=>a+(Number(x.correct)||0),0)};});
 const active=modules.find(m=>!m.done&&m.status!=='pause'&&m.status!=='optional')||modules.find(m=>!m.done&&m.status!=='pause')||modules.at(-1);
 return {active:b.focus.active,startedAt:b.focus.startedAt,pausedCycleIndex:b.focus.pausedCycleIndex,modules,next:active,done:modules.filter(m=>m.done).length,minutes:rows.reduce((a,x)=>a+(Number(x.minutes)||0),0)};
}
export function recordBizurAFO(current,input){
 const st=normalizeExtras(copy(current)),m=BIZURAFO_MODULES.find(x=>x.id===input.moduleId),date=String(input.date||''),minutes=Number(input.minutes),questions=Number(input.questions||0),correct=Number(input.correct||0);
 if(!m)throw Error('Módulo BizurAFO não encontrado.');
 if(!validDay(date)||date>day()||!Number.isInteger(minutes)||minutes<1||minutes>1440)throw Error('Confira data e duração do estudo.');
 if(!Number.isInteger(questions)||!Number.isInteger(correct)||questions<0||correct<0||correct>questions)throw Error('Confira questões e acertos.');
 if(m.status==='pause')throw Error('Este módulo está marcado para não estudar neste intensivão.');
 st.sessions.push({id:uid(),subjectId:'afo',unitId:'',title:'BizurAFO · Módulo '+String(m.number).padStart(2,'0')+' · '+m.title,date,createdAt:new Date().toISOString(),activity:'free',minutes,questions,correct,medium:String(input.medium||'video'),start:null,end:null,notes:String(input.notes||''),legacy:false,cycleApplied:false,bizurafoModuleId:m.id});
 const rec=st.bizurafo.modules.find(x=>x.id===m.id);if(input.done)rec.done=true;
 return st;
}
export function setBizurModuleDone(current,id,done=true){const st=normalizeExtras(copy(current)),rec=st.bizurafo.modules.find(x=>x.id===id);if(!rec)throw Error('Módulo BizurAFO não encontrado.');rec.done=!!done;return st;}
export function endBizurFocus(current){const st=normalizeExtras(copy(current));st.bizurafo.focus.active=false;st.bizurafo.focus.endedAt=new Date().toISOString();return st;}
export function resumeBizurFocus(current){const st=normalizeExtras(copy(current));st.bizurafo.focus.active=true;st.bizurafo.focus.startedAt=st.bizurafo.focus.startedAt||new Date().toISOString();return st;}

export const MOTIVATION=[
 {file:'past-future.svg',title:'Meu passado não define meu futuro!',alt:'Seu passado não define seu futuro. O futuro será impactado pelo que você fizer hoje. Cada avanço no presente impactará positivamente seu futuro.',source:'Material enviado por Douglas'},
 {file:'mindset.svg',title:'Mentalidade do 01',alt:'Não estude apenas para passar: dedique-se com o primeiro lugar como objetivo. Busque compreender de verdade. Isso não exige perfeição; exige elevar seu padrão de execução.',source:'Material enviado por Douglas'},
 {file:'routine.svg',title:'O topo é construído na rotina.',alt:'O topo é construído na rotina. Uma sessão com foco. Uma dúvida resolvida. Um passo adiante.',source:'Arte original · Método ET'},
 {file:'next-step.svg',title:'Um passo de cada vez.',alt:'Você não precisa vencer tudo hoje. Precisa cumprir o próximo passo — e continuar amanhã.',source:'Arte original · Método ET'}
];
function placeholderGoal(number){
 const n=String(number).padStart(2,'0');
 return {id:'meta-'+n,number,title:'Meta '+n+' · 30h reais',subtitle:'Próxima etapa da jornada. O roteiro será definido ao final da meta atual, usando seu avanço real.',targetMinutes:1800,coreMinutes:1500,marginMinutes:300,tasks:[],placeholder:true};
}
function goalTemplateAt(index){return GOAL_TEMPLATES[index]||placeholderGoal(index+1);}
function ensureGoalItem(st,index,status='locked'){
 const t=goalTemplateAt(index);
 let item=st.goals.items.find(x=>x.id===t.id);
 if(!item){item={id:t.id,status,startedAt:null,completedAt:null};st.goals.items.push(item);}
 return item;
}
function normalizeGoalState(st){
 if(st.goalPlanVersion!==GOAL_PLAN_VERSION){
  if(st.goals)st.goalArchive=[...(Array.isArray(st.goalArchive)?st.goalArchive:[]),{version:st.goalPlanVersion||1,savedAt:new Date().toISOString(),goals:copy(st.goals),cycleIndex:Number(st.cycle?.index)||0}];
  st.goals={current:0,items:GOAL_TEMPLATES.map((g,i)=>({id:g.id,status:i===0?'active':'locked',startedAt:i===0?GOAL_PLAN_START:null,completedAt:null}))};
  if(st.cycle)st.cycle={...st.cycle,index:0,minutes:0};
  st.goalPlanVersion=GOAL_PLAN_VERSION;
 }
 if(!st.goals||!Array.isArray(st.goals.items))throw Error('Metas ET inválidas no backup.');
 for(const [i,t] of GOAL_TEMPLATES.entries()){
  let item=st.goals.items.find(x=>x.id===t.id);
  if(!item){item={id:t.id,status:i===0?'active':'locked',startedAt:i===0?GOAL_PLAN_START:null,completedAt:null};st.goals.items.push(item);}
  if(!['active','locked','done'].includes(item.status))throw Error('Situação de Meta ET inválida no backup.');
 }
 let activeIndex=st.goals.items.findIndex(x=>x.status==='active');
 if(activeIndex>=0)st.goals.current=activeIndex;
 else{
  const firstNotDone=GOAL_TEMPLATES.findIndex(t=>st.goals.items.find(x=>x.id===t.id)?.status!=='done');
  st.goals.current=firstNotDone>=0?firstNotDone:GOAL_TEMPLATES.length-1;
 }
 const horizon=st.goals.current+1;
 if(horizon<GOAL_TEMPLATES.length){
  const next=ensureGoalItem(st,horizon,'locked');
  if(next.status!=='done'&&next.status!=='active')next.status='locked';
 }
 return st;
}
export function goalTaskDone(current,task,goalRows=[]){
 if(!task?.check)return false;
 const [kind,sid,id,a,b]=task.check,s=current.subjects?.find(x=>x.id===sid);
 if(kind==='cycleSubjectCount'){
  const count=Number(a)||1;
  return goalRows.filter(v=>v.legacy!==true&&v.cycleApplied===true&&v.subjectId===sid).length>=count;
 }
 if(kind==='goalSubjectCount'){
  const count=Number(a)||1;
  return goalRows.filter(v=>v.legacy!==true&&v.subjectId===sid&&v.activity!=='night').length>=count;
 }
 if(kind==='cycleStep'){
  const target=Number(a)||0;
  const cycleRows=[...goalRows].filter(v=>v.legacy!==true&&v.cycleApplied===true).sort((x,y)=>String(x.createdAt||x.date).localeCompare(String(y.createdAt||y.date)));
  const row=cycleRows[target-1];
  return !!row&&row.subjectId===sid;
 }
 if(kind==='checkpoint')return !!s?.checkpoints?.[id]?.done;
 if(kind==='sessionCount'){
  const count=Number(b)||1;
  return (current.sessions||[]).filter(v=>v.legacy!==true&&v.subjectId===sid&&v.unitId===id&&(!a||v.activity===a)).length>=count;
 }
 if(kind==='blockAtLeast'){
  const target=Number(a)||0,rows=(current.sessions||[]).filter(v=>v.legacy!==true&&v.subjectId===sid&&v.unitId===id),u=s?.units?.find(x=>x.id===id);
  let max=Number(u?.blocksCompleted)||0;for(const v of rows){for(const m of (String(v.title||'')+' '+String(v.notes||'')).matchAll(/bloco\s*(\d+)/gi))max=Math.max(max,Number(m[1])||0);}
  return max>=target;
 }
 const u=s?.units?.find(x=>x.id===id);
 return kind==='theory'?!!u?.theoryDone:kind==='battery'?!!u?.batteryDone:kind==='general'?!!u?.generalDone:false;
}
export function goalSnapshot(current,index=null){
 const st=normalizeGoalState(copy(current)),i=index===null?st.goals.current:Number(index),template=goalTemplateAt(i),item=st.goals.items.find(x=>x.id===template.id);
 if(!template||!item)throw Error('Meta ET não encontrada.');
 const target=template.targetMinutes;
 if(item.status==='locked')return {...template,...item,index:i,minutes:0,studyMinutes:0,lawMinutes:0,remaining:target,progress:0,hoursReady:false,routeReady:false,ready:false,tasks:template.tasks.map(t=>({...t,done:false}))};
 const start=item.startedAt?Date.parse(item.startedAt):NaN,end=item.completedAt?Date.parse(item.completedAt):Infinity;
 const startDay=item.startedAt?String(item.startedAt).slice(0,10):'',endDay=item.completedAt?String(item.completedAt).slice(0,10):'';
 const within=s=>{
  const studyDay=String(s.date||'');
  if(startDay&&studyDay<startDay)return false;
  if(endDay&&studyDay>endDay)return false;
  const stamp=Date.parse(s.createdAt||studyDay+'T12:00:00');
  if(startDay&&studyDay===startDay&&Number.isFinite(start)&&Number.isFinite(stamp)&&stamp<start)return false;
  if(endDay&&studyDay===endDay&&Number.isFinite(end)&&Number.isFinite(stamp)&&stamp>end)return false;
  return true;
 };
 const rows=st.sessions.filter(s=>s.legacy!==true&&s.activity!=='night'&&within(s)),lawRows=(st.legislation?.sessions||[]).filter(within);
 const studyMinutes=rows.reduce((a,s)=>a+(Number(s.minutes)||0),0),lawMinutes=lawRows.reduce((a,s)=>a+(Number(s.minutes)||0),0),minutes=studyMinutes+lawMinutes;
 const tasks=template.tasks.map(t=>({...t,done:goalTaskDone(st,t,rows)})),doneTasks=tasks.filter(t=>t.done).length;
 const hoursReady=minutes>=target,routeReady=doneTasks===tasks.length;
 return {...template,...item,index:i,minutes,studyMinutes,lawMinutes,remaining:Math.max(0,target-minutes),progress:target?Math.min(1,minutes/target):0,hoursReady,routeReady,ready:hoursReady&&routeReady,doneTasks,tasks};
}
export function completeGoal(current,id){
 const st=normalizeGoalState(copy(current)),index=st.goals.items.findIndex(x=>x.id===id),template=GOAL_TEMPLATES[index];
 if(index<0||!template)throw Error('Meta ET não encontrada.');
 const item=st.goals.items[index];
 if(item.status==='locked')throw Error('Esta meta ainda está bloqueada.');
 if(item.status==='done')return st;
 const snap=goalSnapshot(st,index);
 if(!snap.hoursReady)throw Error('A meta fecha apenas com 30 horas reais registradas. Faltam '+Math.max(0,snap.remaining)+' minutos.');
 if(!snap.routeReady)throw Error('Antes de fechar a meta, conclua as ocorrências previstas do ciclo prioritário e da manutenção semanal. Faltam '+(snap.tasks.length-snap.doneTasks)+' ocorrências.');
 const now=new Date().toISOString();item.status='done';item.completedAt=now;
 const next=GOAL_TEMPLATES[index+1];
 if(next){
  const n=ensureGoalItem(st,index+1,'locked');n.status='active';n.startedAt=now;st.goals.current=index+1;
  if(index+2<GOAL_TEMPLATES.length)ensureGoalItem(st,index+2,'locked');
 }else st.goals.current=index;
 return st;
}

export function normalizeExtras(current){
 const st=copy(current);
 if(st.reminders===undefined)st.reminders=[];
 if(!Array.isArray(st.reminders))throw Error('Lista de lembretes inválida.');
 for(const n of st.reminders)if(typeof n.id!=='string'||typeof n.text!=='string'||!n.text.trim()||n.text.length>5000||!Object.hasOwn(REMINDER_STATUS,n.status))throw Error('Lembrete inválido no backup.');
 if(new Set(st.reminders.map(n=>n.id)).size!==st.reminders.length)throw Error('Lembretes duplicados.');
 if(st.motivationStartDay===undefined)st.motivationStartDay=day();
 if(!validDay(st.motivationStartDay))throw Error('Data de motivação inválida.');

 if(st.legislation===undefined)st.legislation={queue:copy(LEGISLATION_QUEUE),current:0,sessions:[],completed:[],planVersion:2,planStart:LAW_PLAN_START};
 if(!Array.isArray(st.legislation.sessions))st.legislation.sessions=[];
 if(!Array.isArray(st.legislation.completed))st.legislation.completed=[];
 if(st.legislation.planVersion!==2){
  st.legislation.queue=copy(LEGISLATION_QUEUE);
  st.legislation.current=0;
  st.legislation.planVersion=2;
  st.legislation.planStart=LAW_PLAN_START;
 }
 if(!Array.isArray(st.legislation.queue)||!st.legislation.queue.length)st.legislation.queue=copy(LEGISLATION_QUEUE);
 for(const norm of LEGISLATION_QUEUE)if(!st.legislation.queue.some(x=>x.id===norm.id))st.legislation.queue.push(copy(norm));
 st.legislation.queue=LEGISLATION_QUEUE.map(norm=>({...norm}));
 st.legislation.current=0;
 for(const x of st.legislation.sessions){if(typeof x.id!=='string'||!validDay(x.date)||!Number.isInteger(x.minutes)||x.minutes<1||x.minutes>1440||typeof x.normId!=='string')throw Error('Registro de legislação inválido no backup.');}

 if(st.cguCheck===undefined)st.cguCheck={version:2,startedAt:'2026-10-12',examDate:'2026-12-13',checked:{}};
 if(!st.cguCheck||typeof st.cguCheck!=='object')throw Error('Check do edital CGU inválido.');
 if(!st.cguCheck.checked||typeof st.cguCheck.checked!=='object'||Array.isArray(st.cguCheck.checked))st.cguCheck.checked={};
 st.cguCheck.version=2;st.cguCheck.startedAt=st.cguCheck.startedAt||'2026-10-12';st.cguCheck.examDate='2026-12-13';

 if(st.achievementsSeen===undefined)st.achievementsSeen=[];
 if(!Array.isArray(st.achievementsSeen)||st.achievementsSeen.some(id=>typeof id!=='string')||new Set(st.achievementsSeen).size!==st.achievementsSeen.length)throw Error('Histórico de conquistas inválido no backup.');

 if(st.bizurafo===undefined)st.bizurafo={focus:{active:false,startedAt:null,endedAt:null,pausedCycleIndex:Number(st.cycle?.index)||0},modules:BIZURAFO_MODULES.map(m=>({id:m.id,done:false}))};
 if(!st.bizurafo.focus||typeof st.bizurafo.focus.active!=='boolean')throw Error('Modo BizurAFO inválido no backup.');
 if(!Array.isArray(st.bizurafo.modules))st.bizurafo.modules=[];
 for(const m of BIZURAFO_MODULES)if(!st.bizurafo.modules.some(x=>x.id===m.id))st.bizurafo.modules.push({id:m.id,done:false});
 st.bizurafo.focus.active=false; // Pós-edital CGU: BizurAFO permanece dentro do ciclo normal; nunca pausa as demais disciplinas.

 normalizeGoalState(st);
 return st;
}
export function saveReminder(current,{id,text,status='todo'}){const st=normalizeExtras(current);text=String(text??'').trim();if(!text||text.length>5000||!Object.hasOwn(REMINDER_STATUS,status))throw Error('Escreva um lembrete de até 5.000 caracteres e escolha uma situação válida.');let note=id?st.reminders.find(n=>n.id===id):null;if(id&&!note)throw Error('Lembrete não encontrado.');if(!note){note={id:uid(),createdAt:new Date().toISOString()};st.reminders.push(note);}Object.assign(note,{text,status,updatedAt:new Date().toISOString()});return st;}
export function motivationForDay(start,date=day()){const serial=d=>{let [y,m,dd]=d.split('-').map(Number);return Date.UTC(y,m-1,dd)/86400000;};const elapsed=Math.max(0,serial(date)-serial(start));return {...MOTIVATION[elapsed%MOTIVATION.length],index:elapsed%MOTIVATION.length};}
