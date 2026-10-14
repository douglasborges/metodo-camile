import {copy,day,validDay,uid,CYCLE,RULES} from './core.js?v=1.3.2-cgu-final';
import {cycleSourceLabel} from './cgu-materials.js?v=1.3.2-cgu-final';
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
 {subjectId:'ti',label:'TI / Dados',referenceMinutes:60,source:'Ramon TI TOTAL · próxima etapa'},
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

export const GOAL_FOCUS=Object.freeze([
 [
  'Ciclo prioritário · 4 voltas: AFO/Finanças → Auditoria → Administração Pública → DCON → DAD. Tempo real prevalece sobre a referência.',
  'AFO · BizurAFO primeiro; avance a primeira passagem antes de liberar Celso/Gilmar.',
  'Auditoria · Marcelo Soares é a base. Direção ainda não entra.',
  'Administração Pública · Marcelo primeiro; iniciar a leitura dirigida de Pacelli/Francisco Netto apenas nos capítulos já aderentes à base estudada.',
  'DCON/DAD · continuar Art. 5º pelo Estratégia + Nelma; Rafael Oliveira na sequência real. Manutenção semanal: 1 ocorrência de Políticas, TI/Dados e Português.'
 ],
 [
  'AFO · continuar BizurAFO, com foco em fechar orçamento/planejamento/execução antes de complementos.',
  'Auditoria · avançar Marcelo Soares. Sem Auditoria do Estratégia; Direção só depois da base Marcelo.',
  'Livro Pacelli/Francisco Netto · trilha comum dirigida: capítulos 2 → 5 → 6 → 7, sem reler conteúdo já fechado.',
  'DAD · Rafael em sequência; Herbert/Estratégia entram apenas para LAI, LIA, LGPD, Lei 9.784, Lei 12.813 e LINDB/Decreto 9.830 quando o item exigir.',
  'Manutenção · Estratégia Políticas Públicas, Ramon TI/Dados e Marcello/Andresan em uma ocorrência semanal cada.'
 ],
 [
  'AFO · fechar o máximo possível da base BizurAFO; só então mapear A2.1 para Celso Natale e A2.4–A2.6 para Gilmar Possati.',
  'Livro Pacelli/Francisco Netto · capítulos 8 → 9 → 10 → 15, seguindo apenas o recorte CGU.',
  'Auditoria · continuar Marcelo; registrar exatamente o ponto em A1/C5 já coberto.',
  'DAD · priorizar a chegada à U12 Licitações/Contratos; U8 PPP é seletivo para a Camile.',
  'DCON/Adm. Pública · seguir fonte principal sem duplicação; manutenção transversal permanece 1x/semana.'
 ],
 [
  'AFO · Celso Natale somente nas lacunas A2.1 comprovadas; Gilmar Possati entra depois em A2.4–A2.6.',
  'Livro Pacelli/Francisco Netto · capítulos 16 → 17 → 24 → 26 → 28; começar extras da Camile 12 → 13 quando a base correspondente estiver pronta.',
  'Licitações · depois de Rafael U12 e da base correspondente de Marcelo, liberar Como Combater a Corrupção em Licitações na ordem 2 → 3 → 6.',
  'Auditoria · capítulo 4 do livro de licitações continua bloqueado até a base Marcelo estar concluída.',
  'Políticas/TI/Português · manter uma ocorrência semanal, sem roubar prioridade das cinco matérias centrais.'
 ],
 [
  'Auditoria/A5 · Pacelli/Francisco Netto extras da Camile: 19 → 20 → 25 → 27, de forma dirigida e sem leitura integral do livro.',
  'Licitações · após cumprir os pré-requisitos, continuar Como Combater a Corrupção em Licitações: capítulo 4 → capítulo 5.',
  'Auditoria · objetivo é concluir a base Marcelo; somente depois entram Direção/TSE e NBC/IPPF seletivos.',
  'AFO · concluir Celso/Gilmar necessários; A2.7 permanece lacuna controlada para fechamento pós-edital.',
  'Administração/DCON/DAD · avançar teoria e iniciar baterias/checkpoints no que já estiver fechado.'
 ],
 [
  'Auditoria · depois de Marcelo: Direção/TSE para papéis, testes, amostragem, execução, evidências e achados; comunicação/relatório/monitoramento apenas se lacuna persistir.',
  'NBC TA 230, 500, 505/520 e 320/330; IPPF, riscos e três linhas: somente se o Check do Edital indicar lacuna concreta.',
  'A4/A5 · usar livro de licitações + Pacelli/Netto + base jurídica Rafael/Herbert/Estratégia; não criar segunda teoria.',
  'AFO/Adm./DCON/DAD · fechar lacunas prioritárias e migrar conteúdo concluído para revisão/questões.',
  'Manutenção transversal segue curta: Políticas, TI e Português 1x/semana.'
 ],
 [
  'Fechamento das cinco prioridades: AFO, Auditoria, Administração Pública, DCON e DAD. Nenhum curso novo por completude.',
  'Disciplinas fechadas migram para Estudo Sólido, erros, favoritas e checkpoints.',
  'Sociedade Brasileira/Diversidade permanece Fase 4 e só é ativada quando as prioridades estiverem sob controle; então usar Direção B2 integral.',
  'Check do Edital passa a comandar lacunas finais. Os códigos B/C/A/CD são internos da matriz; priorize sempre o nome do conteúdo.',
  'Legislação Seca continua 30 min/dia; Políticas, TI e Português seguem em manutenção.'
 ],
 [
  'Consolidação final até 07/12: erros, favoritas, revisões gerais, checkpoints e questões Cebraspe.',
  'Nenhuma teoria ampla nova; apenas lacuna curta e de alto valor indicada no Check do Edital.',
  'Revisar AFO/A2, Auditoria A1/A4/A5, Administração/Integridade, DCON e DAD com os próprios materiais e livros dirigidos.',
  'Sociedade Brasileira/Diversidade entra apenas se ainda houver espaço real e prioridade concluída; nunca desloca os cinco blocos centrais.',
  'Fechar a Meta 08 em 07/12 para liberar 08–12/12 exclusivamente ao Sprint Final.'
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
