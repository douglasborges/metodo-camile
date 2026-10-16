export const KEY='metodo-et:camile:v1';
export const LEGACY_CYCLE_V13=Object.freeze(['port','dcon','afo','ti','adm-publica','diversidade','afo','dad','politicas','auditoria','afo']);
export const INTERIM_CYCLE_V14=Object.freeze(['afo','auditoria','adm-publica','dcon','dad','afo','politicas','port','ti','afo']);
export const CYCLE_PLAN_VERSION=5;
export const CYCLE=['afo','auditoria','adm-publica','dcon','dad'];
export const RULES=Object.freeze({
 afo:{label:'AFO',minutes:90,checkpoint:3,unit:'módulo'},
 cpu:{label:'Contabilidade Pública',minutes:120,checkpoint:3,unit:'módulo'},
 dad:{label:'DAD',minutes:75,checkpoint:4,unit:'aula'},
 ti:{label:'TI / Dados',minutes:60,checkpoint:4,unit:'aula'},
 port:{label:'Português',minutes:60,checkpoint:4,unit:'aula'},
 dcon:{label:'DCON',minutes:60,checkpoint:4,unit:'aula'},
 info:{label:'Informática (arquivo anterior)',minutes:60,checkpoint:4,unit:'aula'},
 'adm-publica':{label:'Adm. Pública',minutes:60,checkpoint:4,unit:'aula'},
 diversidade:{label:'Diversidade',minutes:60,checkpoint:4,unit:'aula'},
 politicas:{label:'Políticas Públicas',minutes:60,checkpoint:4,unit:'aula'},
 auditoria:{label:'Auditoria',minutes:75,checkpoint:4,unit:'aula'}
});
export const ACTIVITIES={free:'Estudo livre',theory:'Teoria',micro:'Microrrevisão',battery:'Revisão + primeira bateria',checkpoint:'Checkpoint',general:'Revisão geral',solid:'Questões — Estudo Sólido',andresan:'Andresan · questões Cebraspe',night:'Revisão noturna'};
export const TI_TCU_SELECTED_36=Object.freeze([
 'FD00','FD01','FD02','FD03','FD04','FD05','FD06','SI00','SI01',
 'TI01.I','TI01.II','TI02','TI03','TI04','TI05','TI06','TI07','TI08','TI08.II','TI09',
 'TI21.II','TI23','TI25','TI34','TI35','TI36','TI37.I','TI37.II','TI38','TI38.II',
 'TI39','TI39.II','TI40','TI41','TI42','TI43'
]);
// A Meta 01 começa em FD01. FD00 continua preservado na trilha, mas não bloqueia o ponto de entrada.
export const TI_TCU_OPERATIONAL_ORDER=Object.freeze([
 'FD01','FD02','FD03','FD04','FD05','FD06','FD00','SI00','SI01',
 'TI01.I','TI01.II','TI02','TI03','TI04','TI05','TI06','TI07','TI08','TI08.II','TI09',
 'TI21.II','TI23','TI25','TI34','TI35','TI36','TI37.I','TI37.II','TI38','TI38.II',
 'TI39','TI39.II','TI40','TI41','TI42','TI43'
]);
export const TI_TCU_TRACK=Object.freeze([
 {id:'foundation',label:'Fundamentos adicionais de segurança da trilha TCU',dependsOn:[],units:['FD01','FD02','FD03','FD04','FD05','FD06','FD00']},
 {id:'security-base',label:'Fundamentos de Segurança da Informação',dependsOn:[],units:['SI00','SI01']},
 {id:'bd',label:'Banco de Dados e SQL',dependsOn:[],units:['TI01.I','TI01.II','TI02','TI03','TI04','TI05','TI06','TI41','TI43']},
 {id:'data',label:'Data Mining, Big Data e fundamentos analíticos',dependsOn:['bd'],units:['TI07','TI08','TI08.II','TI09','TI21.II']},
 {id:'security',label:'Segurança, LAI e LGPD',dependsOn:['security-base'],units:['TI23','TI25','TI34','TI35']},
 {id:'ai',label:'IA, ML, PLN e linguagens para dados',dependsOn:['data'],units:['TI36','TI37.I','TI37.II','TI38','TI38.II','TI39','TI39.II','TI40','TI42']}
]);
function tiCode(u){
 const t=String(u?.title||'').trim();
 if(/^TI01\s*-\s*Parte I\b/i.test(t))return 'TI01.I';
 if(/^TI01\s*-\s*Parte II\b/i.test(t))return 'TI01.II';
 if(/^TI37\s*-\s*Parte I\b/i.test(t))return 'TI37.I';
 if(/^TI37\s*-\s*Parte II\b/i.test(t))return 'TI37.II';
 const m=t.match(/^(FD\d+|SI\d+|MON\d+|TI\d+(?:\.II)?(?:-B)?)/i);
 return m?m[1].toUpperCase():'';
}
export function methodUnits(s){
 const units=[...(s?.units||[])].filter(u=>u.hiddenFromRoute!==true);
 return units.sort((a,b)=>(Number(a.order)||0)-(Number(b.order)||0));
}
export function methodOrder(s,u){const i=methodUnits(s).findIndex(v=>v.id===u?.id);return i>=0?i+1:Number(u?.order)||0;}

const CGU_CHECK_START='2026-10-12';
function baseUnit(id,order,title,extra={}){return {id,title,order,theoryDone:false,theoryDate:'',batteryDone:false,generalDone:false,materialReady:false,battery:{attempted:0,correct:0},general:{attempted:0,correct:0},legacy:[],marks:[],...extra};}
function subjectUntouched(st,s){return !!s&&!(st.sessions||[]).some(x=>x.subjectId===s.id)&&(s.units||[]).every(u=>!u.theoryDone&&!u.batteryDone&&!u.generalDone&&!u.materialReady);}
function ensureSubject(st,{id,course,minutes,units,replaceUntouched=false}){
 let s=st.subjects?.find(x=>x.id===id);
 if(!s){s={id,course,phase:'new',slotMinutes:minutes,units:[],checkpoints:{},notebooks:[],andresanComplete:false};st.subjects.push(s);}
 s.course=course;s.slotMinutes=minutes;s.phase=s.phase||'new';s.checkpoints=s.checkpoints||{};s.notebooks=s.notebooks||[];s.andresanComplete=!!s.andresanComplete;
 if(replaceUntouched&&subjectUntouched(st,s)){s.units=units;s.checkpoints={};}
 else{
  for(const nu of units){
   const old=s.units.find(u=>u.id===nu.id||u.title===nu.title);
   if(old){
    old.cguCodes=[...new Set([...(old.cguCodes||[]),...(nu.cguCodes||[])])];
    old.title=nu.title||old.title;
    old.order=Number.isFinite(Number(nu.order))?Number(nu.order):old.order;
    if(nu.deferred!==undefined)old.deferred=nu.deferred;
    if(nu.hiddenFromRoute!==undefined)old.hiddenFromRoute=nu.hiddenFromRoute;
    if(nu.source)old.source=nu.source;
    if(nu.studyPlan)old.studyPlan=nu.studyPlan;
    if(nu.stage)old.stage=nu.stage;
    if(nu.totalBlocks)old.totalBlocks=nu.totalBlocks;
   }else s.units.push(nu);
  }
 }
 return s;
}
function markCguCodes(st,codes,source='auto'){
 if(!Array.isArray(codes)||!codes.length)return;
 if(!st.cguCheck||typeof st.cguCheck!=='object')st.cguCheck={version:2,startedAt:CGU_CHECK_START,examDate:'2026-12-13',checked:{}};
 if(!st.cguCheck.checked||typeof st.cguCheck.checked!=='object')st.cguCheck.checked={};
 const now=new Date().toISOString();
 for(const code of codes){
  const previous=st.cguCheck.checked[code]||{};
  st.cguCheck.checked[code]={...previous,checked:true,progress:1,source,at:now};
 }
}
function dconHistoricalProgress(st,dcon){
 if(!dcon)return;
 const u1=dcon.units?.find(u=>u.id==='dcon-u-1');
 const art5=dcon.units?.find(u=>u.id==='dcon-u-2');
 const u3=dcon.units?.find(u=>u.id==='dcon-u-4');
 if(u3)u3.title='Nelma · Aula 03 · Direitos Sociais';
 // Histórico confirmado pelo usuário em 12/10/2026: Aula 01 concluída, Aula 03 estudada,
 // e 1ª videoaula do Art. 5º concluída. Não importamos horas/progresso do Douglas.
 if(u1&&!u1.theoryDone){u1.theoryDone=true;u1.theoryDate='2026-10-12';u1.historical=true;u1.historicalNote='Conclusão confirmada pelo usuário em 12/10/2026 · dois blocos da Aula 01.';}
 if(u3&&!u3.theoryDone){u3.theoryDone=true;u3.theoryDate='2026-10-12';u3.historical=true;u3.historicalNote='Estudo da Aula 03 confirmado pelo usuário em 12/10/2026 · Direitos Sociais.';}
 if(art5){
  art5.blocksCompleted=Math.max(Number(art5.blocksCompleted)||0,1);
  art5.historical=true;
  art5.historicalNote='Art. 5º · Estratégia: 1 de 24 videoaulas concluída; exercícios pendentes.';
 }
 // B1.4.1 possui seis núcleos operacionais na descrição oficial.
 // Aula 01 cobre fundamentos/objetivos; Aula 03 cobre direitos sociais.
 // A videoaula 1/24 do Art. 5º acrescenta progresso proporcional sem declarar o tópico concluído.
 if(!st.cguCheck||typeof st.cguCheck!=='object')st.cguCheck={version:2,startedAt:CGU_CHECK_START,examDate:'2026-12-13',checked:{}};
 if(!st.cguCheck.checked||typeof st.cguCheck.checked!=='object')st.cguCheck.checked={};
 const completedSegments=(u1?.theoryDone?1:0)+(u3?.theoryDone?1:0);
 const art5Fraction=Math.min(1,(Number(art5?.blocksCompleted)||0)/24);
 const progress=Math.min(0.99,(completedSegments+(art5Fraction*2))/6);
 const previous=st.cguCheck.checked['B1.4']||{};
 if(!previous.checked){
  st.cguCheck.checked['B1.4']={
   ...previous,checked:false,progress,baselineProgress:progress,source:'historical-camile',
   at:'2026-10-12T21:14:57-03:00',
   evidence:[
    {id:'nelma-a01',status:'done',label:'✓ Nelma · Aula 01 · Princípios Fundamentais · dois blocos concluídos'},
    {id:'nelma-a03',status:'done',label:'✓ Nelma · Aula 03 · Direitos Sociais · estudada'},
    {id:'art5-estrategia',status:'partial',label:'◐ Art. 5º · Estratégia · 1/24 videoaulas concluída · exercícios pendentes'}
   ]
  };
 }
}

export function normalizeMethodState(current){
 const st=copy(current);
 st.settings=st.settings||{};
 st.settings.weeklyMinimum=1800;
 st.settings.dailyMinimum=300;
 st.settings.focus='CGU';
 st.settings.secondary='TCU';
 if(!Array.isArray(st.subjects))st.subjects=[];
 if(!st.cycle||!Number.isInteger(st.cycle.index))st.cycle={index:0,minutes:0};
 if(st.cyclePlanVersion!==CYCLE_PLAN_VERSION){
  const previousCycle=st.cyclePlanVersion===4?INTERIM_CYCLE_V14:LEGACY_CYCLE_V13;
  const previousSubject=previousCycle[Math.max(0,Math.min(previousCycle.length-1,Number(st.cycle.index)||0))];
  let nextIndex=CYCLE.indexOf(previousSubject);
  if(nextIndex<0)nextIndex=0;
  st.cycle={...st.cycle,index:nextIndex,minutes:0};
  st.cyclePlanVersion=CYCLE_PLAN_VERSION;
 }
 if(st.cycle.index<0||st.cycle.index>=CYCLE.length)st.cycle={index:0,minutes:0};
 const oldInfo=st.subjects.find(s=>s.id==='info');
 if(oldInfo&&subjectUntouched(st,oldInfo))st.subjects=st.subjects.filter(s=>s.id!=='info');

 const port=st.subjects.find(s=>s.id==='port');
 if(port){port.course='Português — Marcello Giulian · curso mantido integralmente';port.slotMinutes=60;Object.assign(port,{studyPhase:'manutencao',priority:'MANUTENÇÃO',active:true});}

 const dcon=ensureSubject(st,{id:'dcon',course:'Direito Constitucional — Nelma Fontana + Estratégia · rota CGU final',minutes:60,replaceUntouched:true,units:[
  baseUnit('dcon-u-1',1,'Nelma · A01 · Princípios Fundamentais',{source:'Nelma Fontana',cguCodes:['B1.4']}),
  baseUnit('dcon-u-3',2,'Estratégia/Nelma · A03 · Teoria dos Direitos',{source:'Estratégia/Nelma · ponte de Direitos Fundamentais',cguCodes:['B1.4']}),
  baseUnit('dcon-u-2',3,'Estratégia · A04 · Art. 5º · 24 videoaulas + exercícios',{studyPlan:'Concluir os 24 vídeos e os exercícios antes de considerar o Art. 5º fechado.',totalBlocks:24,source:'Estratégia Concursos',cguCodes:['B1.4']}),
  baseUnit('dcon-u-4',4,'Nelma Cebraspe · A03 · Direitos Sociais',{source:'Nelma Fontana',cguCodes:['B1.4']}),
  baseUnit('dcon-u-5',5,'Nelma · A04 · Direitos Políticos',{source:'Nelma Fontana',cguCodes:['B1.4']}),
  baseUnit('dcon-u-6',6,'Nelma · A05 · Organização do Estado',{source:'Nelma Fontana',cguCodes:['B1.3']}),
  baseUnit('dcon-u-7',7,'Nelma · A06 · seletivo · relações entre Poderes/representação',{source:'Nelma Fontana · seletivo',cguCodes:['B1.2']}),
  baseUnit('dcon-u-8',8,'Nelma · A08 · Fiscalização e Executivo',{source:'Nelma Fontana',cguCodes:['B1.2','C3.3']}),
  baseUnit('dcon-u-9',9,'Nelma · A09 · seletivo · relações entre Poderes',{source:'Nelma Fontana · seletivo',cguCodes:['B1.2']}),
  baseUnit('dcon-u-10',10,'Nelma · A15 · Ordem Econômica',{source:'Nelma Fontana',cguCodes:['B1.9','A2.7']}),
  ...Array.from({length:7},(_,i)=>baseUnit('dcon-u-'+(i+11),100+i,'Nelma · conteúdo fora da rota CGU atual',{source:'Reserva · histórico preservado',hiddenFromRoute:true,deferred:true}))
 ]});
 dconHistoricalProgress(st,dcon);
 Object.assign(dcon,{studyPhase:1,priority:'ALTA',active:true});

  const afoUnits=[
  baseUnit('afo-cgu-01',1,'BizurAFO · M01 · Finanças públicas e orçamento',{source:'Leandro Ravyelle · BizurAFO',cguCodes:['A2.1']}),
  baseUnit('afo-cgu-02',2,'BizurAFO · M02 · PPA, LDO e LOA',{source:'Leandro Ravyelle · BizurAFO',cguCodes:['B4.4','A2.2']}),
  baseUnit('afo-cgu-03',3,'BizurAFO · M03 · Princípios orçamentários',{source:'Leandro Ravyelle · BizurAFO',cguCodes:['A2.2']}),
  baseUnit('afo-cgu-04',4,'BizurAFO · M04 · Créditos adicionais',{source:'Leandro Ravyelle · BizurAFO',cguCodes:['A2.2']}),
  baseUnit('afo-cgu-05',90,'BizurAFO · M05 · fora da rota atual da Camile',{source:'NÃO ESTUDAR nesta rota',hiddenFromRoute:true,deferred:true}),
  baseUnit('afo-cgu-06',5,'BizurAFO · M06 · Técnicas orçamentárias / orçamento-programa',{source:'Leandro Ravyelle · BizurAFO',cguCodes:['A2.2']}),
  baseUnit('afo-cgu-07',6,'BizurAFO · M07 · Receita pública',{source:'Leandro Ravyelle · BizurAFO',cguCodes:['A2.3']}),
  baseUnit('afo-cgu-08',7,'BizurAFO · M08 · Despesa pública',{source:'Leandro Ravyelle · BizurAFO',cguCodes:['A2.3']}),
  baseUnit('afo-cgu-09',8,'BizurAFO · M09 · Execução orçamentária e financeira',{source:'Leandro Ravyelle · BizurAFO',cguCodes:['A2.3']}),
  baseUnit('afo-cgu-10',9,'BizurAFO · M10 · SOMENTE Restos a Pagar (RAP)',{source:'Leandro Ravyelle · BizurAFO · recorte',cguCodes:['A2.3']}),
  baseUnit('afo-cgu-11',10,'BizurAFO · M11 · Lei de Responsabilidade Fiscal',{source:'Leandro Ravyelle · BizurAFO',cguCodes:['A2.3']}),
  baseUnit('afo-cgu-12',91,'BizurAFO · M12 · fora da rota atual da Camile',{source:'NÃO ESTUDAR nesta rota',hiddenFromRoute:true,deferred:true}),
  baseUnit('afo-cgu-13',11,'BizurAFO · M13 · Regimes / ajustes fiscais',{source:'Leandro Ravyelle · BizurAFO',cguCodes:['A2.2','A2.3']}),
  baseUnit('afo-cgu-14',12,'BizurAFO · M14 · Lei 4.320/1964 · SELETIVO',{source:'Leandro Ravyelle · BizurAFO · seletivo',cguCodes:['A2.2','A2.3'],stage:'seletivo'}),
  baseUnit('afo-cgu-15',13,'BizurAFO · M15 · Conta Única do Tesouro Nacional',{source:'Leandro Ravyelle · BizurAFO',cguCodes:['A2.3']}),
  baseUnit('afo-cgu-16',92,'BizurAFO · M16 · questões extras Cebraspe · diagnóstico',{source:'Questões · não é teoria obrigatória',hiddenFromRoute:true,deferred:true})
 ];
 const afo=ensureSubject(st,{id:'afo',course:'AFO / Finanças Públicas — somente Leandro Ravyelle · BizurAFO',minutes:90,units:afoUnits,replaceUntouched:true});
 Object.assign(afo,{studyPhase:1,priority:'MÁXIMA',active:true});
 // Remove da rota corrente materiais que foram cadastrados em versões intermediárias.
 // As sessões já registradas permanecem no histórico, mas essas unidades não aparecem nem bloqueiam o avanço.
 const removedAfoUnits=new Set(['afo-cgu-celso-01','afo-cgu-celso-02','afo-andre-receita','afo-pacelli-2026','afo-estatais-1303','afo-cgu-gilmar-01','afo-cgu-gilmar-02','afo-cgu-gilmar-03','afo-cgu-gilmar-04','afo-cgu-gilmar-05']);
 afo.units=(afo.units||[]).filter(u=>!removedAfoUnits.has(u.id));
 for(const u of afo.units||[])if(/^afo-u-/.test(u.id||'')){u.hiddenFromRoute=true;u.deferred=true;u.source=u.source||'Histórico anterior · preservado fora da rota atual';}

 const cpuUnits=[
  baseUnit('cpu-pacelli-06',1,'Pacelli · Módulo 06 · Dos Sistemas até a Natureza das Contas',{source:'Giovanni Pacelli · Contabilidade Pública · Fase 4'}),
  baseUnit('cpu-pacelli-07',2,'Pacelli · Módulo 07 · Variações Patrimoniais Qualitativas e Quantitativas',{source:'Giovanni Pacelli · Contabilidade Pública · Fase 4'}),
  baseUnit('cpu-pacelli-08',3,'Pacelli · Módulo 08 · Plano de Contas Aplicado ao Setor Público',{source:'Giovanni Pacelli · Contabilidade Pública · Fase 4'}),
  baseUnit('cpu-pacelli-13',4,'Pacelli · Módulo 13 · Balanço Orçamentário e Balanço Financeiro',{source:'Giovanni Pacelli · Contabilidade Pública · Fase 4'}),
  baseUnit('cpu-pacelli-14',5,'Pacelli · Módulo 14 · Balanço Patrimonial e DVP',{source:'Giovanni Pacelli · Contabilidade Pública · Fase 4'}),
  baseUnit('cpu-pacelli-15',6,'Pacelli · Módulo 15 · DFC, DMPL e Notas Explicativas',{source:'Giovanni Pacelli · Contabilidade Pública · Fase 4'})
 ];
 const cpu=ensureSubject(st,{id:'cpu',course:'Contabilidade Pública — Giovanni Pacelli · módulos 06–08 e 13–15 · Fase 4',minutes:120,units:cpuUnits,replaceUntouched:true});
 Object.assign(cpu,{studyPhase:4,priority:'FINAL',active:false});


  const tiUnits=[
  baseUnit('ti-cgu-lucas-01',1,'Lucas Ianni · C4.1 · perguntas, fontes, dado x evidência',{source:'Estratégia · Fundamentos de Evidência, Dados e IA',cguCodes:['C4.1']}),
  baseUnit('ti-cgu-fd01',2,'FD01 · Fundamentos de Dados',{source:'Ramon · TI TOTAL',cguCodes:['C4.1','C4.2']}),
  baseUnit('ti-cgu-ti60',3,'TI60 · Fluência em dados: conceitos, atributos, métricas e transformação',{source:'Ramon · TI TOTAL',cguCodes:['C4.2']}),
  baseUnit('ti-cgu-ti63',4,'TI63 · análise de dados, agrupamentos, tendências e projeções',{source:'Ramon · TI TOTAL',cguCodes:['C4.2','C4.3']}),
  baseUnit('ti-cgu-ti83',5,'TI83 · trilha técnica CGU',{source:'Ramon · TI TOTAL',cguCodes:['C4.3']}),
  baseUnit('ti-cgu-mon36',6,'Monitoria 36 · trilha CGU de Dados',{source:'Ramon · TI TOTAL',cguCodes:['C4.2','C4.3']}),
  baseUnit('ti-cgu-lucas-02',7,'Lucas Ianni · C4.2/C4.3 · indicadores, inferências e erros · recorte comum',{source:'Estratégia · Fundamentos de Evidência, Dados e IA',cguCodes:['C4.2','C4.3']}),
  baseUnit('ti-cgu-ti37',8,'TI37-I · Aprendizado de Máquina e Inteligência Artificial',{source:'Ramon · TI TOTAL',cguCodes:['C4.5','A1.5']}),
  baseUnit('ti-cgu-ti36',9,'TI36 · Inteligência Artificial',{source:'Ramon · TI TOTAL',cguCodes:['C4.5','A1.5']}),
  baseUnit('ti-cgu-ti61',10,'TI61 · Governança de Dados',{source:'Ramon · TI TOTAL',cguCodes:['C4.4']}),
  baseUnit('ti-cgu-ti35',11,'TI35 · LGPD',{source:'Ramon · TI TOTAL',cguCodes:['C2.2','C4.4']}),
  baseUnit('ti-cgu-lucas-03',12,'Lucas Ianni · C4.4 · rastreabilidade, confidencialidade e proteção',{source:'Lucas Ianni + Herbert LGPD + Pacelli cap. 26',cguCodes:['C4.4']}),
  baseUnit('ti-cgu-ti97',13,'TI97 · auditoria/dados · recorte A1.5',{source:'Ramon · TI TOTAL',cguCodes:['A1.5']}),
  baseUnit('ti-cgu-lucas-04',14,'Lucas Ianni · C4.5 · direitos, limites e revisão humana em IA',{source:'Estratégia · complemento ao Ramon',cguCodes:['C4.5']}),
  baseUnit('ti-cgu-ti07',90,'TI07 · Data Mining · reserva',{source:'Ramon · TI TOTAL',cguCodes:['C4.2'],hiddenFromRoute:true,deferred:true}),
  baseUnit('ti-cgu-ti62',91,'TI62 · Processo de Ciência de Dados · reserva',{source:'Ramon · TI TOTAL',cguCodes:['C4.1'],hiddenFromRoute:true,deferred:true})
 ];
 const ti=ensureSubject(st,{id:'ti',course:'Fundamentos de Evidências, Dados e IA — Lucas Ianni (comum) + Ramon TI TOTAL (técnico Camile)',minutes:60,units:tiUnits,replaceUntouched:true});
 Object.assign(ti,{studyPhase:2,priority:'MANUTENÇÃO ALTA',active:true});
 // Histórico TI/TCU anterior preservado fora da rota CGU: não apagar, não bloquear.
 for(const u of ti.units||[])if(/^ti-u-/.test(u.id||'')){u.hiddenFromRoute=true;u.deferred=true;u.source=u.source||'Histórico anterior · preservado fora da rota CGU';}

  const admTopics=[
  ['B1.1','Estado e legitimidade'],['B1.2','Democracia e representação'],['B1.3','Federalismo e capacidades estatais'],['B1.5','Valor público e controle'],['B1.6','Corrupção como fenômeno político e social'],['B1.7','Mecanismos de reprodução e captura'],['B1.8','Consequências e respostas à corrupção'],['B1.9','Estado e modelos de desenvolvimento econômico'],
  ['B3.1','Fundamentos da ética pública'],['B3.2','Deveres profissionais'],['B3.3','Conflitos de interesses, impedimento e imparcialidade'],['B3.4','Assédio, discriminação, escuta e não retaliação'],['B3.5','Integridade como responsabilidade institucional'],
  ['B4.1','Organização administrativa'],['B4.2','Modelos de administração, governança e resultados'],['B4.3','Políticas públicas'],['B4.4','Planejamento, orçamento e sustentabilidade'],['B4.5','Serviços, usuário, simplificação e transformação digital'],
  ['C1.1','Governança e responsabilidades'],['C1.2','Riscos e controles essenciais'],['C1.3','Integridade pública'],['C1.4','Integridade privada'],['C1.5','Prevenção e melhoria institucional']
 ];
 const admSource=code=>{
  if(code==='B4.2')return 'Marcelo Faixa Preta · Evolução APU T01-T03 + Q Reforma → Governança T01/T02 → Gestão para Resultados';
  if(code==='B4.4')return 'Marcelo Faixa Preta · Planejamento (conceito/princípios + tipos) + BizurAFO recorte';
  if(code==='B4.5')return 'Marcelo · Excelência T01/T02 + Rafael U6 + Estratégia pós-edital Serviços Públicos/Transformação Digital/IA no recorte';
  if(code==='B4.1')return 'Rafael U2/U3/U4/U7/U17 · Direção só função específica se necessária';
  if(code==='B4.3')return 'Estratégia Rodrigo Rennó · PP A01/A02 · estudar na disciplina Políticas Públicas';
  if(code==='B3.1'||code==='B3.2')return 'Estratégia Ética A01/A02 + Código de Conduta CGU · depois Pacelli cap. 6';
  if(code==='B3.3')return 'Herbert Lei 12.813 + Rafael U11/Herbert Lei 9.784 · depois Pacelli cap. 10';
  if(code==='B3.4')return 'Pacelli cap. 24 + cap. 7 para proteção do denunciante';
  if(code==='B3.5')return 'Estratégia Organização A06 + Pacelli caps. 15-17';
  if(code==='B1.1')return 'Direção B1 seletivo + Marcelo para Estado-administração; PP A03 em pluralismo/intermediação';
  if(code==='B1.2')return 'Direção B1 + Nelma A06/A08/A09; Pacelli cap. 28 para participação';
  if(code==='B1.3')return 'Nelma A05 + Direção B1; PP A01 em implementação/burocracia';
  if(code==='B1.5')return 'Marcelo Governança/Resultados + Direção B1; Pacelli caps. 13/17 seletivo';
  if(['B1.6','B1.7','B1.8'].includes(code))return 'PP A03/A04 + Direção B1; Pacelli caps. 12/17/28 e cap. 22 reserva';
  if(code==='B1.9')return 'Direção B1 + Nelma A15; Celso Natale em sustentabilidade/funções do Estado';
  if(code==='C1.1'||code==='C1.2')return 'Marcelo Governança + Pacelli caps. 2/5/15; Direção C1 só se faltar framework específico';
  if(code==='C1.3'||code==='C1.5')return 'Estratégia Organização A06 + Pacelli caps. 15-17/25';
  if(code==='C1.4')return 'Pacelli caps. 19/20/27 + Rafael U22; Herbert/Lei Anticorrupção se disponível';
  return 'Plano Mestre Final CGU · fonte seletiva';
 };
 const admOrder=code=>({
  'B4.2':1,'B4.4':2,'B4.1':3,'B4.5':4,
  'C1.1':5,'C1.2':6,'C1.3':7,'C1.5':8,'C1.4':9,
  'B3.1':10,'B3.2':11,'B3.3':12,'B3.4':13,'B3.5':14,
  'B1.1':15,'B1.2':16,'B1.3':17,'B1.5':18,'B1.6':19,'B1.7':20,'B1.8':21,'B1.9':22,
  'B4.3':90
 }[code]||80);
 const adm=ensureSubject(st,{id:'adm-publica',course:'Administração Pública / Governança / Ética / Integridade — Marcelo Faixa Preta + fontes finais CGU',minutes:60,units:admTopics.map((x,i)=>baseUnit('adm-cgu-'+String(i+1).padStart(2,'0'),admOrder(x[0]),x[1],{source:admSource(x[0]),cguCodes:[x[0]],hiddenFromRoute:x[0]==='B4.3'}))});
 Object.assign(adm,{studyPhase:1,priority:'ALTA',active:true});

 const diversidadeTopics=[['B2.1','Fundamentos sociológicos'],['B2.2','Formação social e cidadania no Brasil'],['B2.3','População, território e trabalho'],['B2.4','Diversidade e acesso a direitos'],['B2.5','Desenvolvimento e realidade brasileira']];
 const diversidade=ensureSubject(st,{id:'diversidade',course:'Sociedade Brasileira, Desigualdades e Diversidade — Direção · fase final',minutes:60,units:diversidadeTopics.map((x,i)=>baseUnit('div-cgu-'+(i+1),i+1,x[1],{source:'Direção · bloco B2 integral · fase final',cguCodes:[x[0]]}))});
 Object.assign(diversidade,{studyPhase:4,priority:'FINAL',active:false});

 const dad=st.subjects.find(s=>s.id==='dad');
 if(dad){
  dad.course='DAD — Rafael Oliveira · rota CGU final + U12 Licitações/Contratos + leis especiais';
  Object.assign(dad,{studyPhase:1,priority:'ALTA',active:true});
  for(const u of dad.units||[]){u.hiddenFromRoute=true;u.deferred=true;}
  const route=(matcher,order,source,codes=[],extra={})=>{
   const u=(dad.units||[]).find(x=>matcher.test(x.title||''));
   if(!u)return;
   u.order=order;u.source=source;u.cguCodes=[...new Set([...(u.cguCodes||[]),...codes])];
   u.hiddenFromRoute=false;u.deferred=!!extra.deferred;u.stage=extra.stage||u.stage;
  };
  route(/Organiza[cç][aã]o Administrativa/i,1,'Rafael Oliveira · U2',['B4.1']);
  route(/Administra[cç][aã]o P[uú]blica Indireta/i,2,'Rafael Oliveira · U3',['B4.1']);
  route(/Cons[oó]rcios P[uú]blicos/i,3,'Rafael Oliveira · U7',['B4.1']);
  route(/Agentes P[uú]blicos/i,4,'Rafael Oliveira · U17',['B4.1','C3.4','A5.5']);
  route(/Atos Administrativos/i,5,'Rafael Oliveira · U10 · depois LINDB/Dec. 9.830',['C3.1']);
  route(/Processo Administrativo/i,6,'Rafael Oliveira · U11 · depois Herbert Lei 9.784',['B3.3','C3.2','A5.5']);
  route(/Controle da Administra[cç][aã]o/i,7,'Rafael Oliveira · U19',['C3.3']);
  route(/C[oó]digo de Defesa do Usu[aá]rio/i,8,'Rafael Oliveira · U6',['B4.5']);
  route(/Licita[cç][oõ]es e Contratos/i,9,'Rafael Oliveira · U12 · obrigatório para A4',['A4.1','A4.2','A4.4','A4.5']);
  route(/Parcerias P[uú]blico-Privadas/i,10,'Rafael Oliveira · U8 · PPP seletivo',['A4.3'],{stage:'seletivo'});
  route(/Origem, Evolu[cç][aã]o e Princ[ií]pios/i,11,'Rafael Oliveira · U1 · seletivo',['B1.4'],{stage:'seletivo'});
  route(/Terceiro Setor/i,12,'Rafael Oliveira · U4 · seletivo',['B4.1','A4.3'],{stage:'seletivo'});
  route(/Poderes Administrativos/i,13,'Rafael Oliveira · U9 · seletivo',['C3.1'],{stage:'seletivo'});
  route(/Improbidade Administrativa/i,14,'Rafael Oliveira · U20 · depois Herbert LIA',['C3.4','A5.5','A5.6'],{stage:'seletivo'});
  route(/Lei Anticorrup[cç][aã]o/i,15,'Rafael Oliveira · U22 · complemento integridade privada',['C1.4','C3.4','A5.4','A5.5','A5.6'],{stage:'seletivo'});
 }

 const ppTopics=[
  ['B4.3','Estratégia Rodrigo Rennó · PP Aula 01 · ciclo, atores e implementação'],
  ['A3.3','Estratégia Rodrigo Rennó · PP Aula 02 · indicadores e métodos'],
  ['A3.1','Estratégia · Avaliação Ex Ante · completa para Camile'],
  ['A3.3','Estratégia · Avaliação Ex Post'],
  ['A3.6','Estratégia · CMAP · seletivo e uso dos resultados'],
  ['A3.4','Métodos qualitativos e mistos · PP Aula 02 / material correspondente'],
  ['A3.5','Causalidade e avaliação econômica · Ex Post'],
  ['A3.6','Conclusões, recomendações e uso dos resultados · Ex Post/pós-edital'],
  ['A3.7','Ética da investigação · GAP CONTROLADO']
 ];
 const ppBase=ppTopics.map((x,i)=>baseUnit('pp-cgu-'+(i+1),i+1,x[1],{source:i===8?'PENDENTE · material pós-edital específico':'Estratégia · Políticas Públicas/Avaliação',cguCodes:[x[0]],deferred:i===8}));
 ppBase.push(
  baseUnit('pp-arranjos',10,'Estratégia pós-edital · Arranjos Institucionais',{source:'Estratégia · rota atual',cguCodes:['A3.1','A3.2']}),
  baseUnit('pp-intersetorialidade',11,'Estratégia pós-edital · Intersetorialidade',{source:'Estratégia · rota atual',cguCodes:['A3.2']}),
  baseUnit('pp-instrumentos',12,'Estratégia pós-edital · Instrumentos de Políticas Públicas',{source:'Estratégia · rota atual',cguCodes:['A3.1','A3.2']}),
  baseUnit('pp-avaliacao-comissao-1',13,'Estratégia pós-edital · Avaliação de Políticas Públicas / Comissão · Aula 1',{source:'Estratégia · rota atual',cguCodes:['A3.3','A3.6']}),
  baseUnit('pp-avaliacao-comissao-2',14,'Estratégia pós-edital · Avaliação de Políticas Públicas / Comissão · Aula 2',{source:'Estratégia · rota atual',cguCodes:['A3.3','A3.6']}),
  baseUnit('pp-passo',15,'Estratégia · Passo A01/A02 + simulados',{source:'Estratégia · consolidação',cguCodes:['A3.1','A3.2','A3.3','A3.4','A3.5','A3.6']}),
  baseUnit('pp-b1-reuse',90,'PP A03/A04 · reaproveitamento apenas em B1',{source:'Não é segunda teoria de Políticas Públicas',cguCodes:['B1.6','B1.7','B1.8'],hiddenFromRoute:true,deferred:true})
 );
 const politicas=ensureSubject(st,{id:'politicas',course:'Políticas Públicas e Avaliação — exclusivamente Estratégia · rota CGU 16/10',minutes:60,units:ppBase});
 Object.assign(politicas,{studyPhase:2,priority:'MANUTENÇÃO ALTA',active:true});

 const auditTopics=[
  ['C2.1','Transparência · LAI e transparência ativa'],['C2.2','Transparência e proteção de dados'],['C2.3','Ouvidoria e proteção do denunciante'],['C2.4','Participação, dados abertos e governo aberto'],['C2.5','Integridade da informação, desinformação e liberdade de expressão'],
  ['C3.5','Proteção e encaminhamento · apuração x sanção'],
  ['C5.1','Propósito, serviços e papéis'],['C5.2','Ciclo do trabalho de auditoria'],['C5.3','Evidência, achados e conclusão'],['C5.4','Comunicação, recomendações e monitoramento'],['C5.5','Atuação integrada da CGU'],
  ['A1.1','Avaliação, consultoria e apuração'],['A1.2','Planejamento técnico do trabalho'],['A1.3','Testes, técnicas e amostragem'],['A1.4','Evidências, achados, documentação e revisão'],['A1.5','Auditoria de dados e IA'],['A1.6','Relatório, recomendações, monitoramento e qualidade'],
  ['A4.1','Planejamento, seleção e risco em contratações'],['A4.2','Execução contratual'],['A4.3','Transferências e parcerias'],['A4.4','Sinais, padrões, cruzamentos e detecção de fraude'],['A4.5','Achados, dano, responsabilização e encaminhamentos'],
  ['A5.1','Integração institucional e decisão no controle'],['A5.2','Transparência e ouvidoria'],['A5.3','Proteção do denunciante'],['A5.4','Integridade pública e privada'],['A5.5','Admissibilidade, prova e responsabilização'],['A5.6','PAD/PAR, prescrição, dosimetria, leniência e TAC'],['A5.7','Aprendizado institucional e resultados']
 ];
 const auditSource=code=>{
  if(code==='C5.1')return 'Marcelo: AIG → Avaliação → Consultoria → Apuração → Objetividade';
  if(code==='C5.2')return 'Marcelo: PAINT → Planejamento Individual T1/T2';
  if(code==='C5.3')return 'Marcelo base; depois Direção/TSE Evidências/Achados + NBC TA 230/500 e 505/520 seletivo';
  if(code==='C5.4')return 'Marcelo + PGMQ; Direção/TSE Comunicação/Relatório/Monitoramento só se faltar';
  if(code==='C5.5')return 'Estratégia Organização A04-A06 + Pacelli 5/7-9/12/13/15-17 + Marcelo AIG/Apuração';
  if(code==='A1.1')return 'Marcelo: Avaliação → Consultoria → Apuração';
  if(code==='A1.2')return 'Marcelo: PAINT + Planejamento Individual T1/T2; Direção 320/330 apenas se faltar materialidade/testes';
  if(code==='A1.3')return 'Marcelo técnicas/testes; depois Direção/TSE Papéis + Testes + Amostragem + Execução + Evidências + Achados';
  if(code==='A1.4')return 'Marcelo; depois Direção/TSE + Direção/CGU NBC TA 230/500; 505/520 seletivo';
  if(code==='A1.5')return 'Ramon TI TOTAL · base técnica da Camile + Marcelo para aplicação auditorial';
  if(code==='A1.6')return 'Marcelo + PGMQ; Direção/TSE Comunicação/Relatório/Monitoramento/Qualidade se faltar';
  if(code==='C2.1')return 'Estratégia/Herbert LAI + Dados Abertos → Pacelli caps. 8/9';
  if(code==='C2.2')return 'Estratégia/Herbert LGPD → Pacelli cap. 26';
  if(code==='C2.3')return 'Estratégia Organização A05 → Pacelli cap. 7';
  if(code==='C2.4')return 'Herbert LAI/Dados Abertos + Pacelli caps. 9/28; Direção C2 só se gap';
  if(code==='C2.5')return 'Estratégia pós-edital · Integridade da Informação · aula específica; usar no recorte nominal';
  if(code==='C3.5')return 'Pacelli caps. 7/12/24 + Marcelo Apuração; jurídico pós-edital se necessário';
  if(code==='A4.1')return 'Rafael U12 + livro Corrupção em Licitações caps. 2 e 6';
  if(code==='A4.2')return 'Rafael U12 + Estratégia pós-edital · Execução Contratual; Direção só se ainda faltar detalhe';
  if(code==='A4.3')return 'Rafael U4/U8 seletivo + Estratégia pós-edital · Transferências/Parcerias; Direção só se ainda faltar detalhe';
  if(code==='A4.4')return 'Livro Corrupção em Licitações caps. 2/3/6 + Ramon/ferramentas de dados quando aplicável';
  if(code==='A4.5')return 'Livro Corrupção em Licitações caps. 4/5 + Marcelo; Direção só detalhe jurídico faltante';
  if(code==='A5.1')return 'Marcelo + Estratégia Organização + Pacelli caps. 5/13/17';
  if(code==='A5.2'||code==='A5.3')return 'Herbert LAI/LGPD + Pacelli caps. 7/8/9/24/26/28 + Estratégia Organização A05';
  if(code==='A5.4')return 'Pacelli caps. 2/15-20/25/27 + Estratégia A06; Rafael U22/Herbert lei especial';
  if(code==='A5.5')return 'Pacelli cap. 12 + Rafael U17/U20/U22 + Herbert 8.429/9.784/Conflito; Direção só requisito jurídico fino';
  if(code==='A5.6')return 'GAP JURÍDICO PRIORITÁRIO · Rafael/Herbert base legal + complemento pós-edital para prescrição/dosimetria/TAC/leniência/coordenação';
  if(code==='A5.7')return 'Pacelli caps. 13/17 + Marcelo Recomendações/Monitoramento';
  return 'Plano Mestre Final CGU · fonte seletiva';
 };
 const auditOrder=code=>({
  'C5.1':1,'A1.1':2,'C5.2':3,'A1.2':4,'A1.3':5,'C5.3':6,'A1.4':7,'A1.5':8,'A1.6':9,'C5.4':10,
  'C5.5':11,'C3.5':12,'C2.1':13,'C2.2':14,'C2.3':15,'C2.4':16,'C2.5':17,
  'A4.1':18,'A4.4':19,'A4.2':20,'A4.3':21,'A4.5':22,
  'A5.1':23,'A5.2':24,'A5.3':25,'A5.4':26,'A5.5':27,'A5.6':28,'A5.7':29
 }[code]||80);
 const auditoria=ensureSubject(st,{id:'auditoria',course:'Auditoria Governamental — Marcelo Soares rota final → Direção/TSE/NBC somente depois → A4/A5 dirigidos',minutes:75,units:auditTopics.map((x,i)=>baseUnit('aud-cgu-'+String(i+1).padStart(2,'0'),auditOrder(x[0]),x[1],{source:auditSource(x[0]),cguCodes:[x[0]],deferred:['A5.6'].includes(x[0])}))});
 Object.assign(auditoria,{studyPhase:1,priority:'MÁXIMA',active:true});

 for(const s of st.subjects||[])for(const u of s.units||[]){
  if(u.theoryDone&&Number(u.battery?.attempted||0)>=30)u.batteryDone=true;
  if(u.theoryDone)markCguCodes(st,u.cguCodes,'auto-history');
 }
 for(const row of st.sessions||[]){
  if(row.legacy===true||row.activity!=='theory'||!row.unitId)continue;
  const note=(String(row.title||'')+' '+String(row.notes||'')).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  if(!/(finalizei|concluid[ao]|totalmente concluid[ao]|pdf concluido|teoria concluida)/.test(note))continue;
  const s=st.subjects?.find(x=>x.id===row.subjectId),u=s?.units?.find(x=>x.id===row.unitId);
  if(u&&!u.theoryDone){u.theoryDone=true;u.theoryDate=validDay(row.date)?row.date:u.theoryDate;markCguCodes(st,u.cguCodes,'auto-history');}
 }
 const art5=dcon?.units?.find(u=>u.id==='dcon-u-2');
 if(art5&&!art5.theoryDone){
  const hit=(st.sessions||[]).some(row=>row.subjectId==='dcon'&&row.unitId==='dcon-u-2'&&/bloco\s*24\b/i.test(String(row.title||'')+' '+String(row.notes||'')));
  if(hit){art5.theoryDone=true;art5.blocksCompleted=24;art5.theoryDate=(st.sessions||[]).filter(row=>row.subjectId==='dcon'&&row.unitId==='dcon-u-2'&&/bloco\s*24\b/i.test(String(row.title||'')+' '+String(row.notes||''))).map(row=>row.date).sort().at(-1)||art5.theoryDate;}
 }
 dconHistoricalProgress(st,dcon);
 return st;
}
export const copy=v=>JSON.parse(JSON.stringify(v));
export const uid=()=>globalThis.crypto.randomUUID();
export function day(d=new Date()){return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');}
export function validDay(s){return /^\d{4}-\d{2}-\d{2}$/.test(s||'')&&day(new Date(s+'T12:00:00'))===s;}
export function weekStart(s=day()){let d=new Date(s+'T12:00:00');d.setDate(d.getDate()-(d.getDay()+6)%7);return day(d);}
export function hm(n){n=Math.round(n||0);return Math.floor(n/60)+'h'+String(n%60).padStart(2,'0');}
export function pct(q){return q?.attempted?Math.round(q.correct/q.attempted*100)+'%':'—';}
export function emptyState(){return {version:1,settings:{weeklyMinimum:1800,dailyMinimum:300,focus:'CGU',secondary:'TCU'},subjects:[],sessions:[],cycle:{index:0,minutes:0},imports:[],archive:[],updatedAt:null};}
const touched=u=>u.legacy.some(e=>e.status!=='Em espera')||u.theoryDone;
export function checkpoints(s){let result=[],size=RULES[s.id]?.checkpoint||4,route=methodUnits(s);for(let i=0;i<route.length;i+=size){let units=route.slice(i,i+size),id=s.id+'-cp-'+(i/size+1),record=s.checkpoints[id];result.push({id,number:i/size+1,units,partial:units.length<size,record,status:record?.done?'done':units.every(u=>u.theoryDone&&u.batteryDone)?'due':units.every(u=>u.theoryDone)?'battery':units.every(touched)?'audit':'planned'});}return result;}
export function unitSituation(u){if(u?.deferred&&!u.theoryDone&&!u.batteryDone)return 'Deixar para depois';return u.generalDone&&u.materialReady?'Revisão geral concluída':u.theoryDone&&u.batteryDone?'Bateria concluída':u.theoryDone?'Bateria pendente':touched(u)?'Conferir avanço importado':'Estudar';}
export function canSolid(s){let units=methodUnits(s);return units.length>0&&units.every(u=>u.theoryDone&&u.batteryDone&&u.generalDone&&u.materialReady)&&checkpoints(s).every(c=>c.status==='done');}
export function nextAction(s){if(s.phase==='solid')return 'Continuar caderno de questões';let cp=checkpoints(s).find(c=>['due','battery','audit'].includes(c.status));if(cp)return cp.status==='due'?'Fazer checkpoint '+cp.number:cp.status==='audit'?'Conferir avanço do bloco '+cp.number:'Concluir baterias do bloco '+cp.number;let units=methodUnits(s),u=units.find(u=>!u.theoryDone||!u.batteryDone);if(u)return (u.theoryDone?'Revisar + resolver bateria: ':'Estudar: ')+u.title;return units.some(u=>!u.generalDone||!u.materialReady)?'Revisão geral e material de revisão':'Pronto para Estudo Sólido';}
export function totals(st,date=day()){let start=weekStart(date),d=new Date(start+'T12:00:00');d.setDate(d.getDate()+7);let end=day(d),law=st.legislation?.sessions||[],studyDay=st.sessions.filter(s=>s.date===date&&s.activity!=='night').reduce((a,s)=>a+s.minutes,0),lawDay=law.filter(s=>s.date===date).reduce((a,s)=>a+s.minutes,0),studyWeek=st.sessions.filter(s=>s.date>=start&&s.date<end&&s.activity!=='night').reduce((a,s)=>a+s.minutes,0),lawWeek=law.filter(s=>s.date>=start&&s.date<end).reduce((a,s)=>a+s.minutes,0);return {day:studyDay+lawDay,night:st.sessions.filter(s=>s.date===date&&s.activity==='night').reduce((a,s)=>a+s.minutes,0),week:studyWeek+lawWeek,lawDay,lawWeek};}
export function nightTasks(st,date=day()){return [...new Set(st.sessions.filter(s=>s.date===date&&s.activity!=='night'&&RULES[s.subjectId]).map(s=>s.subjectId))].map(id=>({id,done:st.sessions.some(s=>s.date===date&&s.subjectId===id&&s.activity==='night')}));}
export function fingerprint(v){let t=JSON.stringify(v),h=2166136261;for(let i=0;i<t.length;i++)h=Math.imul(h^t.charCodeAt(i),16777619);return (h>>>0).toString(16)+'-'+t.length;}
export function migrate(payload,current=emptyState()){
 const src=payload?.state||payload;if(!Array.isArray(src?.topics)||!Array.isArray(src?.sessions)||!Array.isArray(src?.disciplines))throw Error('Backup StudyOS inválido.');
 let st=copy(current),key=fingerprint(src);if(st.imports.some(i=>i.id===key))return st;
 const map={afo:'afo',dcon:'dcon',ti:'ti','dad-rafael-oliveira-vas-2026':'dad','port-ceb-teorico-2026':'port'},topicMap={};
 for(let [oldId,id] of Object.entries(map)){
  let s=st.subjects.find(s=>s.id===id);if(!s){s={id,course:src.disciplines.find(d=>d.id===oldId)?.name||RULES[id].label,phase:'new',slotMinutes:RULES[id].minutes,units:[],checkpoints:{},notebooks:[],andresanComplete:false};st.subjects.push(s);}
  let ts=src.topics.filter(t=>t.disciplineId===oldId).sort((a,b)=>a.order-b.order),modules=new Set(ts.filter(t=>t.title.includes(' — ')).map(t=>t.title.split(' — ')[0].trim()));
  for(let t of ts){let title=t.title.trim();if(id==='afo'){title=title.split(' — ')[0].trim();if(!modules.has(title))continue;}
   let u=s.units.find(u=>u.title===title);if(!u){u={id:id+'-u-'+(s.units.length+1),title,order:s.units.length+1,theoryDone:false,theoryDate:'',batteryDone:false,generalDone:false,materialReady:false,battery:{attempted:0,correct:0},general:{attempted:0,correct:0},legacy:[],marks:[]};s.units.push(u);}topicMap[t.id]={subjectId:id,unitId:u.id};
   if(t.status!=='Em espera'&&!u.legacy.some(e=>e.id===t.id))u.legacy.push({id:t.id,title:t.title,status:t.status,notes:t.notes||''});
  }
 }
 for(let old of src.sessions){if(!old.id||st.sessions.some(s=>s.id===old.id))continue;let minutes=Number(old.durationMinutes??old.hours*60);if(!validDay(old.date)||!Number.isFinite(minutes)||minutes<=0)continue;let m=topicMap[old.topicId],subjectId=map[old.disciplineId]||(old.disciplineId==='portugues'?'port':'legacy:'+old.disciplineId);let activity=/noturna/i.test(old.mode||'')||['night','night-review'].includes(old.kind)?'night':old.mode==='Questões'?'battery':old.mode==='Revisão'?'general':'theory';
  st.sessions.push({id:old.id,date:old.date,createdAt:old.createdAt,subjectId,unitId:m?.unitId||'',title:old.subject||'',minutes:Math.round(minutes),activity,questions:Number(old.questions)||0,correct:Number(old.correct)||0,notes:old.notes||'',medium:'',start:null,end:null,legacy:true,originalSubject:old.disciplineName||old.disciplineId,cycleApplied:false});
  let u=st.subjects.find(s=>s.id===subjectId)?.units.find(u=>u.id===m?.unitId);if(u&&!u.legacy.some(e=>e.id===old.id))u.legacy.push({id:old.id,date:old.date,title:old.subject||'',status:old.mode||'',notes:old.notes||''});
 }
 st.imports.push({id:key,sourceUpdatedAt:payload.updatedAt||src.updatedAt,at:new Date().toISOString()});st.archive.push({id:key,payload:copy(payload)});return st;
}
function requirePrevious(s,u){
 if(s.id==='info'){
  const route=methodUnits(s),index=route.findIndex(v=>v.id===u.id);
  if(index>=0){
   const previous=route.slice(0,index).filter(v=>!v.deferred);
   if(previous.some(v=>!v.theoryDone||!v.batteryDone))throw Error('Conclua teoria e bateria das etapas anteriores de Informática e Dados antes de avançar.');
   return;
  }
 }
 if(s.id==='ti'){
  const route=methodUnits(s),index=route.findIndex(v=>v.id===u.id);
  if(index>=0){
   const previous=route.slice(0,index);
   if(previous.some(v=>!v.theoryDone||!v.batteryDone))throw Error('Conclua a teoria e a bateria das etapas anteriores da trilha TI–TCU antes de avançar.');
   const code=tiCode(u),group=TI_TCU_TRACK.find(g=>g.units.includes(code));
   for(const depId of group?.dependsOn||[]){const dep=TI_TCU_TRACK.find(g=>g.id===depId),present=route.filter(v=>dep?.units.includes(tiCode(v)));if(present.length&&present.some(v=>!v.theoryDone||!v.batteryDone))throw Error('Conclua a base de '+dep.label+' antes de avançar para '+group.label+'.');}
   return;
  }
 }
 let previous=methodUnits(s).filter(v=>v.order<u.order);if(previous.some(v=>!v.theoryDone||!v.batteryDone))throw Error('Conclua a teoria e a bateria das unidades anteriores antes de avançar.');if(checkpoints(s).some(c=>c.units.at(-1).order<u.order&&c.status!=='done'))throw Error('Conclua o checkpoint do bloco anterior antes de avançar.');
}
function getUnit(st,sid,id){let s=st.subjects.find(s=>s.id===sid),u=s?.units.find(u=>u.id===id);if(!u)throw Error('Aula não encontrada.');return {s,u};}
export function session(current,input){
 let st=copy(current),s=st.subjects.find(s=>s.id===input.subjectId),minutes=Number(input.minutes),q=Number(input.questions||0),correct=Number(input.correct||0);
 if(!s||!validDay(input.date)||input.date>day()||!Number.isInteger(minutes)||minutes<1||minutes>1440||!ACTIVITIES[input.activity])throw Error('Confira disciplina, data, atividade e duração.');
 if(!Number.isInteger(q)||!Number.isInteger(correct)||q<0||correct<0||correct>q)throw Error('Confira questões e acertos.');
 if(input.activity==='night'&&(minutes<5||minutes>10))throw Error('Revisão noturna: de 5 a 10 minutos por disciplina.');
 if(input.activity==='andresan'&&(s.id!=='port'||q<1))throw Error('Andresan: registre em Português e informe ao menos 1 questão resolvida.');
 let u=input.unitId?getUnit(st,s.id,input.unitId).u:null;
 if(['theory','battery','general','checkpoint'].includes(input.activity)&&!u)throw Error('Selecione a aula ou módulo.');
 if(input.activity==='solid'&&s.phase!=='solid')throw Error('Conclua o Estudo Novo antes de registrar sessões do Estudo Sólido.');
 if(input.activity==='night'&&st.sessions.filter(v=>v.subjectId===s.id&&v.date===input.date&&v.activity==='night').reduce((a,v)=>a+v.minutes,0)+minutes>10)throw Error('A revisão noturna totaliza de 5 a 10 minutos por disciplina no dia.');
 if(input.activity==='checkpoint'&&!checkpoints(s).some(c=>c.units.some(v=>v.id===u.id)&&['due','done'].includes(c.status)))throw Error('Conclua teoria e baterias do bloco antes do checkpoint.');
 // Modo flexível Camile: registros históricos de bateria/revisão podem ser lançados livremente.
 // A consolidação da etapa continua dependendo dos requisitos do Método ET.
 let start=input.start===''||input.start==null?null:Number(input.start),end=input.end===''||input.end==null?null:Number(input.end);
 if((start!==null||end!==null)&&(!Number.isFinite(start)||!Number.isFinite(end)||start<0||end<start))throw Error('Preencha início e fim válidos do conteúdo.');
 const entry={id:uid(),subjectId:s.id,unitId:u?.id||'',title:String(input.title||'').trim()||u?.title||'',date:input.date,createdAt:new Date().toISOString(),activity:input.activity,minutes,questions:q,correct,medium:input.medium||'',start,end,notes:String(input.notes||''),legacy:false,cycleApplied:false};
 if(s.id==='dcon'&&u?.id==='dcon-u-2'){
  const match=(String(input.title||'')+' '+String(input.notes||'')).match(/bloco\s*(\d+)/i);
  if(match)u.blocksCompleted=Math.max(Number(u.blocksCompleted)||0,Math.min(24,Number(match[1])||0));
 }
 if(input.applyCycle&&!['night','andresan'].includes(input.activity)&&input.date===day()&&CYCLE[st.cycle.index]===s.id){
  st.cycle.minutes=0;
  st.cycle.index=(st.cycle.index+1)%CYCLE.length;
  entry.cycleApplied=true;
  entry.slotComplete=true;
 }
 st.sessions.push(entry);if(u&&['battery','general'].includes(input.activity)){u[input.activity].attempted+=q;u[input.activity].correct+=correct;if(input.activity==='battery'&&u.theoryDone&&u.battery.attempted>=30)u.batteryDone=true;}if(u&&input.date>=CGU_CHECK_START&&input.activity!=='night'&&(u.theoryDone||['battery','general','checkpoint'].includes(input.activity)))markCguCodes(st,u.cguCodes,'auto-study');if(s.id==='dcon')dconHistoricalProgress(st,s);return st;
}
export function setUnit(current,sid,id,values){let st=copy(current),{s,u}=getUnit(st,sid,id);
 let theory=!!values.theoryDone,battery=!!values.batteryDone,general=!!values.generalDone,material=!!values.materialReady;
 // Modo flexível Camile: a conclusão pode ser informada fora da ordem para reconstruir histórico.
 if(theory&&(!validDay(values.theoryDate)||values.theoryDate>day()))throw Error('Informe a data real da conclusão da teoria.');
 if(battery&&(!theory||u.battery.attempted<30))throw Error('A primeira bateria exige teoria concluída e ao menos 30 questões registradas.');
 if(general&&(!methodUnits(s).every(v=>v.id===u.id?theory&&battery:v.theoryDone&&v.batteryDone)||!checkpoints(s).every(c=>c.status==='done')))throw Error('Conclua teoria, baterias e checkpoints antes da revisão geral.');
 Object.assign(u,{theoryDone:theory,theoryDate:theory?values.theoryDate:'',batteryDone:battery&&theory,generalDone:general&&battery&&theory,materialReady:material});
 if(!theory||!battery){let cp=checkpoints(s).find(c=>c.units.some(v=>v.id===id));if(cp)delete s.checkpoints[cp.id];for(let x of s.units)x.generalDone=false;}
 if(theory)markCguCodes(st,u.cguCodes,'auto-unit');if(s.id==='dcon')dconHistoricalProgress(st,s);if(s.phase==='solid'&&!canSolid(s))s.phase='new';return st;
}
function checkpointTotals(perUnit){return Object.values(perUnit||{}).reduce((a,r)=>({attempted:a.attempted+(Number(r?.attempted)||0),correct:a.correct+(Number(r?.correct)||0)}),{attempted:0,correct:0});}
function checkpointSession(st,s,cp,record,minutes){
 const date=validDay(record.date)?record.date:day(),totals=checkpointTotals(record.perUnit);
 let entry=record.sessionId?st.sessions.find(v=>v.id===record.sessionId):null;
 if(!entry)entry=st.sessions.find(v=>v.subjectId===s.id&&v.activity==='checkpoint'&&(v.checkpointId===cp.id||(!v.checkpointId&&v.date===date&&cp.units.some(u=>u.id===v.unitId))));
 if(!entry){
  entry={id:uid(),subjectId:s.id,unitId:cp.units[0]?.id||'',title:'Checkpoint '+cp.number+' · '+(RULES[s.id]?.label||s.id),date,createdAt:new Date().toISOString(),activity:'checkpoint',minutes,questions:totals.attempted,correct:totals.correct,medium:'',start:null,end:null,notes:'',legacy:false,cycleApplied:false,checkpointId:cp.id};
  st.sessions.push(entry);
 }else Object.assign(entry,{minutes,questions:totals.attempted,correct:totals.correct,checkpointId:cp.id});
 record.minutes=minutes;record.sessionId=entry.id;return entry;
}
export function finishCheckpoint(current,sid,id,results,minutes,applyCycle=false){let st=copy(current),s=st.subjects.find(s=>s.id===sid),cp=s&&checkpoints(s).find(c=>c.id===id);if(cp?.status!=='due')throw Error('Conclua teoria e primeira bateria de todas as unidades do bloco.');
 minutes=Number(minutes);if(!Number.isInteger(minutes)||minutes<1||minutes>1440)throw Error('Informe o tempo real do checkpoint.');
 let perUnit={};for(let u of cp.units){let r=results[u.id],attempted=Number(r?.attempted),correct=Number(r?.correct);if(!Number.isInteger(attempted)||attempted<1||attempted>20||!Number.isInteger(correct)||correct<0||correct>attempted)throw Error('Registre de 1 a 20 questões por unidade, com acertos válidos.');perUnit[u.id]={attempted,correct};}
 const record={done:true,date:day(),minutes,perUnit};s.checkpoints[id]=record;const entry=checkpointSession(st,s,{...cp,record},record,minutes);
 if(applyCycle){
  if(CYCLE[st.cycle.index]!==s.id)throw Error('Só a disciplina atual pode concluir a ocorrência do ciclo.');
  st.cycle.minutes=0;st.cycle.index=(st.cycle.index+1)%CYCLE.length;entry.cycleApplied=true;entry.slotComplete=true;
 }
 return st;
}
export function setCheckpointTime(current,sid,id,minutes){let st=copy(current),s=st.subjects.find(s=>s.id===sid),cp=s&&checkpoints(s).find(c=>c.id===id);if(!cp?.record?.done)throw Error('Conclua o checkpoint antes de registrar o tempo.');
 minutes=Number(minutes);if(!Number.isInteger(minutes)||minutes<1||minutes>1440)throw Error('Informe o tempo real do checkpoint.');
 checkpointSession(st,s,cp,cp.record,minutes);return st;
}
export function switchSolid(current,sid,minutes){let st=copy(current),s=st.subjects.find(s=>s.id===sid);minutes=Number(minutes);if(!s||!canSolid(s))throw Error('Conclua revisão geral, material e checkpoints.');if(!Number.isInteger(minutes)||minutes<30||minutes>=s.slotMinutes)throw Error('Defina uma carga menor, de pelo menos 30 minutos.');if(CYCLE[st.cycle.index]===sid&&st.cycle.minutes>=minutes)throw Error('Conclua o bloco atual antes de reduzir a carga.');s.slotMinutes=minutes;s.phase='solid';return st;}
export function addNotebook(current,sid,title,url,target){let st=copy(current),s=st.subjects.find(s=>s.id===sid);target=Number(target);if(s?.phase!=='solid')throw Error('Cadernos contínuos pertencem ao Estudo Sólido.');if(!title.trim()||!Number.isInteger(target)||target<1||url&&!/^https:\/\//.test(url))throw Error('Informe nome, total de questões e link HTTPS válido.');if(s.notebooks.some(n=>n.stage!=='done'))throw Error('Conclua o caderno atual, seus erros e favoritas.');s.notebooks.push({id:uid(),title,url,target,stage:'main',log:[],errors:0,afterErrors:'favorites'});return st;}
export function notebookRound(current,sid,id,attempted,correct){let st=copy(current),s=st.subjects.find(s=>s.id===sid),n=s?.notebooks.find(n=>n.id===id);attempted=Number(attempted);correct=Number(correct);if(!n||n.stage==='done'||!Number.isInteger(attempted)||!Number.isInteger(correct)||attempted<0||correct<0||correct>attempted)throw Error('Rodada inválida.');if(n.stage==='main'&&attempted!==n.target||n.stage==='errors'&&attempted!==n.errors)throw Error('Finalize todas as questões desta rodada.');n.log.push({date:day(),stage:n.stage,attempted,correct});n.errors=attempted-correct;if(n.stage==='main'){n.afterErrors='favorites';n.stage=n.errors?'errors':'favorites';}else if(n.stage==='favorites'){n.afterErrors='done';n.stage=n.errors?'errors':'done';}else n.stage=n.errors?'errors':n.afterErrors;return st;}
export function validate(st){
 if(st?.version!==1||!Array.isArray(st.subjects)||!Array.isArray(st.sessions)||!Array.isArray(st.imports)||!Array.isArray(st.archive)||!st.settings||!st.cycle)throw Error('Backup Método ET inválido.');
 if(st.settings.focus!=='CGU'||st.settings.secondary!=='TCU'||!Number.isInteger(st.settings.dailyMinimum)||st.settings.dailyMinimum<60||!Number.isInteger(st.settings.weeklyMinimum)||st.settings.weeklyMinimum<180)throw Error('Planejamento incompatível com a base da Camile.');
 const ids=st.subjects.map(s=>s.id),required=['afo','dad','ti','port','dcon'];
 if(new Set(ids).size!==ids.length||!required.every(id=>ids.includes(id)))throw Error('O backup da Camile deve preservar as disciplinas-base do Método ET.');
 if(!Number.isInteger(st.cycle.index)||st.cycle.index<0||st.cycle.index>=CYCLE.length||!Number.isFinite(st.cycle.minutes)||st.cycle.minutes<0)throw Error('Ciclo inválido.');
 for(let s of st.subjects){
  if(!RULES[s.id]||!['new','solid'].includes(s.phase)||!Array.isArray(s.units)||!s.checkpoints||!Array.isArray(s.notebooks)||!Number.isInteger(s.slotMinutes)||s.slotMinutes<30||s.slotMinutes>120)throw Error('Disciplina inválida.');
  for(let u of s.units)if(typeof u.id!=='string'||typeof u.title!=='string'||!Array.isArray(u.legacy)||!Array.isArray(u.marks)||!u.battery||!u.general)throw Error('Aula inválida.');
 }
 return st;
}
