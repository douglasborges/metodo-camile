import {copy,day,validDay,uid,CYCLE,RULES} from './core.js?v=1.3.0-cgu-final';
import {cycleSourceLabel} from './cgu-materials.js?v=1.3.0-cgu-final';
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
export const GOAL_CYCLES_PER_META=2;
export const GOAL_META_COUNT=8;
const GOAL_CORE_MINUTES=CYCLE.reduce((sum,id)=>sum+(RULES[id]?.minutes||60),0)*GOAL_CYCLES_PER_META;

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

export const GOAL_FOCUS=Object.freeze([
 [
  'Português · Marcello em sequência; Andresan entra como bateria Cebraspe, sem substituir a teoria.',
  'DCON · continuar a ponte do Art. 5º pelo Estratégia a partir do ponto real e preservar Nelma como curso principal.',
  'AFO · iniciar/avançar BizurAFO dentro dos três slots de AFO; ainda não abrir Celso/Gilmar.',
  'TI/Dados · começar pela rota Ramon: FD01 → TI60; seguir somente quando a etapa anterior estiver fechada.',
  'Adm./Diversidade/DAD/Políticas/Auditoria · abrir as fontes principais na primeira ocorrência de cada disciplina e registrar o ponto real.'
 ],
 [
  'AFO · consolidar o primeiro núcleo do BizurAFO e avançar pelos módulos seguintes, sem pular o ciclo.',
  'TI/Dados · avançar TI60 → TI63 → TI83 conforme o tempo real.',
  'Políticas Públicas · Estratégia como fonte principal; Aula 01/02 e sequência do plano de avaliação.',
  'Auditoria · Marcelo Soares continua sozinho como fonte principal; Direção ainda não entra.',
  'B1/B3/C1 e B2 · Direção apenas nos blocos definidos como fonte/lacuna, sem duplicar Marcelo/Nelma/Rafael.'
 ],
 [
  'AFO · fechar o máximo possível da primeira passagem BizurAFO; Módulo 13 segue fora do primeiro giro e Módulo 16 é diagnóstico/opcional.',
  'TI/Dados · Monitoria 36 e TI37-I somente quando a rota anterior estiver concluída.',
  'Políticas Públicas · Ex Ante/Ex Post, CMAP e métodos conforme a sequência do Estratégia.',
  'Auditoria · continuar Marcelo Soares; nenhuma aula do Direção antes da base principal.',
  'Ao final da semana, identificar objetivamente as lacunas A2.1 que justificam Celso Natale.'
 ],
 [
  'AFO · depois da base BizurAFO, entrar em Celso Natale somente nas lacunas A2.1 já mapeadas.',
  'AFO · não iniciar Gilmar antes de concluir o complemento econômico/finanças públicas necessário.',
  'TI/Dados · TI36 → TI61 conforme a rota Ramon.',
  'Políticas Públicas · métodos qualitativos/mistos e identificação causal conforme o curso principal.',
  'Demais disciplinas · continuar a próxima etapa real do Método ET, priorizando baterias/checkpoints quando liberados.'
 ],
 [
  'AFO · Gilmar Possati entra seletivamente em A2.4–A2.6 após BizurAFO/Celso: CASP/MCASP/NBC TSP, custos e estatais.',
  'TI/Dados · TI35 → TI97 e diagnóstico das lacunas C4/A1.5.',
  'Auditoria · objetivo é concluir a base Marcelo Soares; Direção só pode entrar depois dessa condição.',
  'Políticas/DAD/DCON/Português · avançar teoria e começar consolidação onde já houver revisão geral/material prontos.',
  'A2.7 · manter como lacuna controlada; não inventar material antes do mapeamento pós-edital.'
 ],
 [
  'Auditoria · após Marcelo, usar Direção/TSE para papéis, testes, amostragem, execução, evidências e achados.',
  'Auditoria · comunicação/relatório/monitoramento e NBC TA 230/500/505-520/320-330 só se a lacuna persistir; IPPF/riscos/três linhas também seletivos.',
  'A4/A5 · tratar como lacunas controladas do pós-edital, usando base jurídica e mapeamento interno do Direção sem atribuir aula inexistente.',
  'Adm./Diversidade/DAD/Políticas · fechar lacunas teóricas e transformar cobertura concluída em revisão/questões.',
  'AFO/TI · fechar os complementos necessários; evitar abrir conteúdo amplo fora do recorte CGU.'
 ],
 [
  'Fechamento de teoria prioritária: nenhuma duplicação de curso; lacuna comprovada primeiro.',
  'Disciplinas concluídas migram para Estudo Sólido com cadernos, erros e favoritas.',
  'Baterias e checkpoints ganham prioridade crescente, sem abandonar as matérias ainda em Estudo Novo.',
  'Legislação Seca continua 30 min/dia no rodízio CF+LAI / Leg. CGU+LGPD.',
  'Usar o Check do Edital para localizar os últimos buracos de cobertura e atacar apenas o que é material para a prova.'
 ],
 [
  'Consolidação final: revisão geral, erros/favoritas, checkpoints pendentes e questões Cebraspe.',
  'Nenhuma teoria ampla nova: somente correção de lacuna curta e de alto valor.',
  'Revisar Auditoria, AFO/A2, Políticas Públicas e os blocos transversais C1–C5 com base nos próprios materiais.',
  'Manter Português/DCON/DAD ativos por questões e revisão, sem reabrir cursos inteiros.',
  'Fechar a Meta até 07/12 para liberar cinco dias exclusivamente de revisão final antes da prova.'
 ]
]);

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
 return Array.from({length:GOAL_CYCLES_PER_META},(_,round)=>CYCLE.map((sid,index)=>{
  step++;
  return {
   id:'meta-'+String(metaNumber).padStart(2,'0')+'-c'+(round+1)+'-'+String(index+1).padStart(2,'0'),
   title:'Volta '+(round+1)+' · '+(RULES[sid]?.label||sid)+' · '+cycleSourceLabel(sid),
   hint:'Ocorrência '+step+'/'+(CYCLE.length*GOAL_CYCLES_PER_META)+' · referência '+Math.round((RULES[sid]?.minutes||60)/15)*15+' min · conclua a etapa real prevista, não uma cota artificial.',
   subjectId:sid,
   cycleRound:round+1,
   cyclePosition:index+1,
   referenceMinutes:RULES[sid]?.minutes||60,
   check:['cycleStep',sid,'',step]
  };
 })).flat();
}
export const GOAL_TEMPLATES=Array.from({length:GOAL_META_COUNT},(_,i)=>{
 const number=i+1,window=GOAL_WINDOWS[i];
 return {
  id:'meta-'+String(number).padStart(2,'0'),
  number,
  title:'Meta '+String(number).padStart(2,'0')+' · 30h · '+window.label,
  subtitle:'Duas voltas completas na ordem Port → DCON → AFO → TI → Adm. Pública → Diversidade → AFO → DAD → Políticas Públicas → Auditoria → AFO.',
  targetMinutes:1800,
  coreMinutes:GOAL_CORE_MINUTES,
  marginMinutes:1800-GOAL_CORE_MINUTES,
  targetStart:window.start,
  targetEnd:window.end,
  targetLabel:window.label,
  dailyReferenceMinutes:300,
  weeklyReferenceMinutes:1800,
  focus:GOAL_FOCUS[i],
  tasks:buildCycleGoalTasks(number)
 };
});

export const BIZURAFO_MODULES=Object.freeze([
 {id:'biz-01',number:1,title:'Conceito, dimensões, tipos de orçamento e intervenção do Estado nas finanças públicas',status:'core',note:'Núcleo CGU: funções do governo, falhas de mercado, políticas econômicas, federalismo fiscal e conceitos de orçamento. Se a aula entrar em tripé macroeconômico como aprofundamento autônomo, não priorize nesta passagem de AFO.'},
 {id:'biz-02',number:2,title:'Instrumentos de planejamento — PPA, LDO e LOA',status:'core',note:'Núcleo de AFO/Finanças Públicas para a CGU.'},
 {id:'biz-03',number:3,title:'Princípios orçamentários',status:'core',note:'Núcleo de AFO/Finanças Públicas para a CGU. Na primeira passagem, priorize a teoria principal; a aula única extra e as baterias longas podem ficar para depois.'},
 {id:'biz-04',number:4,title:'Créditos adicionais e alterações orçamentárias',status:'core',note:'Núcleo de AFO/Finanças Públicas para a CGU.'},
 {id:'biz-05',number:5,title:'Ciclo orçamentário',status:'core',note:'Núcleo de AFO/Finanças Públicas para a CGU: elaboração, discussão/votação, emendas, execução e controle.'},
 {id:'biz-06',number:6,title:'Técnicas orçamentárias e orçamento-programa',status:'core',note:'Núcleo de AFO/Finanças Públicas para a CGU: evolução conceitual, técnicas e orçamento-programa.'},
 {id:'biz-07',number:7,title:'Receita pública',status:'core',note:'Núcleo CGU: classificações, estágios, fontes e dívida ativa.'},
 {id:'biz-08',number:8,title:'Despesa pública',status:'core',note:'Núcleo CGU: classificações e estágios. Restos a pagar e temas correlatos reaparecem nos módulos seguintes.'},
 {id:'biz-09',number:9,title:'Execução orçamentária e financeira, programação e descentralização',status:'core',note:'Execução, programação e descentralização são mantidas pelo recorte CGU de orçamento/execução e pelo valor transversal para controle.'},
 {id:'biz-10',number:10,title:'Restos a pagar, despesas de exercícios anteriores e suprimento de fundos',status:'core',note:'ESTUDAR. Restos a pagar, DEA e suprimento de fundos permanecem no plano por integrarem a execução orçamentária/financeira e a Lei 4.320/1964 relevante ao recorte CGU.'},
 {id:'biz-11',number:11,title:'Lei de Responsabilidade Fiscal — LRF',status:'cut',note:'ESTUDAR COM CORTES: priorize conceitos/RCL, planejamento, LDO/LOA, renúncia, geração de despesas, transferências voluntárias, destinação ao setor privado, transparência, prestação de contas e fiscalização. Adie, neste intensivão, pessoal, seguridade, endividamento, gestão patrimonial e relatórios RREO/RGF quando tratados só como aprofundamento de LRF.'},
 {id:'biz-12',number:12,title:'Sistemas de informações',status:'cut',note:'ESTUDAR COM CORTES: priorize os sistemas diretamente úteis à execução orçamentária, financeira e ao controle; detalhes periféricos ficam para lacunas do pacote atualizado.'},
 {id:'biz-13',number:13,title:'Regime de ajustes fiscais',status:'pause',note:'NÃO ESTUDAR NESTE INTENSIVÃO. Fica fora do primeiro giro definido para a Camile; preservar para segunda volta se o pacote atualizado indicar necessidade.'},
 {id:'biz-14',number:14,title:'Lei 4.320/1964 — multibancas',status:'cut',note:'ESTUDAR COM CORTE/SEGUNDA VOLTA: usar a Lei 4.320/1964 como consolidação dos pontos de orçamento e execução efetivamente exigidos no edital CGU. Na aula dos arts. 22–35, não priorize arts. 22–33 (Títulos II e III); retome a partir do art. 34. Use o restante como consolidação, não como primeiro contato.'},
 {id:'biz-15',number:15,title:'Conta Única do Tesouro Nacional',status:'core',note:'Núcleo de AFO/Finanças Públicas para a CGU: conceito e previsão legal.'},
 {id:'biz-16',number:16,title:'Questões extras Cebraspe',status:'optional',note:'OPCIONAL NO PRIMEIRO GIRO. Use como diagnóstico ao final dos blocos; não é necessário assistir todas as resoluções longas agora.'}
]);
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
 if(!snap.routeReady)throw Error('Antes de fechar a meta, conclua as duas voltas completas do ciclo. Faltam '+(snap.tasks.length-snap.doneTasks)+' ocorrências.');
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
