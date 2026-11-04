// Catálogo DCON a partir de "DCON - Nelma.pdf" (24 páginas, recebido em 03/11/2026).
// Migração aditiva e idempotente: nunca recria sessões, horas, questões, metas ou checkpoints.
export const DCON_PROGRAM_VERSION='dcon-nelma-20261103-v1';
export const DCON_CEBRASPE_URL='https://nelmafontana.com.br/cursos/direito-constitucional-cebraspe/';
export const DCON_ESTRATEGIA_URL='https://concursos.estrategia.com/curso/curso-regular-nelma-fontana/';
export const DCON_AVANCADO_URL='https://nelmafontana.com.br/cursos/direito-constitucional-avancado/';
const regularRows=[
 ['Aplicabilidade das normas constitucionais',2,5],
 ['Teoria dos direitos e garantias fundamentais',3,6],
 ['Direitos sociais; nacionalidade',2,7],
 ['Direitos políticos; partidos políticos',3,7],
 ['Organização político-administrativa do Estado',4,8],
 ['Poder Legislativo',2,9],
 ['Processo Legislativo',4,10],
 ['Fiscalização contábil, financeira e orçamentária; Poder Executivo',2,11],
 ['Poder Judiciário',3,11],
 ['Funções essenciais à justiça',2,12],
 ['Controle de constitucionalidade',6,13],
 ['Defesa do Estado e das Instituições Democráticas',1,14],
 ['Constituição: conceito e classificações',1,14],
 ['Poder Constituinte',1,15],
 ['Ordem Econômica e Financeira',1,16],
 ['Ordem Social',2,17]
];
const advancedRows=[
 ['Hermenêutica Constitucional',3,18],
 ['Poder Constituinte',2,18],
 ['Direito Constitucional Intertemporal',1,19],
 ['Princípios Fundamentais',1,19],
 ['Teoria dos Direitos Fundamentais',1,20],
 ['Direitos e deveres individuais e coletivos',3,20],
 ['Direitos sociais, nacionalidade, cidadania, direitos políticos e partidos políticos',3,20],
 ['Organização político-administrativa e Administração Pública (título abreviado no PDF)',3,21],
 ['Poder Legislativo',1,21],
 ['Processo Legislativo',2,22],
 ['Poder Executivo',1,22],
 ['Poder Judiciário',1,22],
 ['Funções essenciais à justiça',1,23],
 ['Controle de Constitucionalidade',3,23],
 ['Princípios da Ordem Econômica',1,24],
 ['Ordem Social: meio ambiente e indígenas',1,24]
];
export const DCON_CEBRASPE=Object.freeze(regularRows.map(([title,blocks,page],i)=>Object.freeze({id:'NELMA-DCON-'+String(i+1).padStart(2,'0'),number:i+1,title,blocks,sourcePage:page,course:'Cebraspe',url:DCON_CEBRASPE_URL})));
export const DCON_AVANCADO=Object.freeze(advancedRows.map(([title,blocks,page],i)=>Object.freeze({id:'NELMA-DCON-AV-'+String(i+1).padStart(2,'0'),number:i+1,title,blocks,sourcePage:page,course:'Avançado',url:DCON_AVANCADO_URL})));
export const DCON_BASE_ORDER=Object.freeze([
 DCON_CEBRASPE[0].id,'ESTRATEGIA-DCON-04','ESTRATEGIA-DCON-05',...DCON_CEBRASPE.slice(1).map(x=>x.id)
]);
const clone=x=>JSON.parse(JSON.stringify(x));
const emptyCount=()=>({attempted:0,correct:0});
function createUnit(row,order,phase){
 return {id:row.id,title:'Nelma · '+(phase==='avancado'?'Avançado':'Cebraspe')+' · Aula '+String(row.number).padStart(2,'0')+' · '+row.title,
 order,courseId:phase==='avancado'?'nelma-dcon-avancado':'nelma-dcon-cebraspe',courseLabel:phase==='avancado'?'Nelma Fontana · Direito Constitucional Avançado':'Nelma Fontana · Direito Constitucional Cebraspe',
 programPhase:phase,source:'Nelma Fontana',sourcePage:row.sourcePage,sourceURL:row.url,totalBlocks:row.blocks,
 theoryDone:false,theoryDate:'',batteryDone:false,generalDone:false,materialReady:false,battery:emptyCount(),general:emptyCount(),legacy:[],marks:[],
 completedBlocks:[],blocksCompleted:0,catalog:true,hiddenFromRoute:phase==='avancado',deferred:phase==='avancado',
 parts:Array.from({length:row.blocks},(_,i)=>({id:row.id+'-bloco-'+(i+1),number:i+1,title:'Bloco '+(i+1)+' de '+row.blocks,done:false}))};
}
export function dconProgramStatus(st){
 const s=st?.subjects?.find(x=>x.id==='dcon');
 if(!s)return {baseDone:false,advancedDone:false,baseFinished:0,baseTotal:18,advancedFinished:0,advancedTotal:16};
 const art4=s.units.find(x=>['ESTRATEGIA-DCON-04','dcon-u-2'].includes(x.id)&&!x.legacyPreserved)||
    s.units.find(x=>['ESTRATEGIA-DCON-04','dcon-u-2'].includes(x.id));
 const ids=[DCON_CEBRASPE[0].id,art4?.id,'ESTRATEGIA-DCON-05',...DCON_CEBRASPE.slice(1).map(x=>x.id)];
 const completed=ids.filter(id=>{const u=s.units.find(x=>x.id===id);return !!(u?.theoryDone&&u?.batteryDone);}).length;
 const exerciseReady=!!art4?.exerciseVideoDone;
 const baseDone=completed===18&&exerciseReady;
 const advancedFinished=DCON_AVANCADO.filter(row=>{const u=s.units.find(x=>x.id===row.id);return u?.theoryDone&&u?.batteryDone;}).length;
 return {baseDone,advancedDone:advancedFinished===16,baseFinished:completed,baseTotal:18,advancedFinished,advancedTotal:16,exerciseReady};
}
export function reconcileDconProgram(current){
 const st=clone(current),s=st?.subjects?.find(x=>x.id==='dcon');
 if(!s)return st;
 // Identificadores existentes são mantidos: Camile usa dcon-u-2 para Estratégia A04.
 const art4=s.units.find(x=>x.id==='ESTRATEGIA-DCON-04')||s.units.find(x=>x.id==='dcon-u-2');
 const a4id=art4?.id||'ESTRATEGIA-DCON-04';
 const order=[DCON_CEBRASPE[0].id,a4id,'ESTRATEGIA-DCON-05',...DCON_CEBRASPE.slice(1).map(x=>x.id),...DCON_AVANCADO.map(x=>x.id)];
 for(const row of [...DCON_CEBRASPE,...DCON_AVANCADO]){
  let u=s.units.find(x=>x.id===row.id);
  const phase=row.course==='Avançado'?'avancado':'cebraspe',ord=order.indexOf(row.id)+1;
  if(!u){u=createUnit(row,ord,phase);s.units.push(u);}
  else{
   u.order=ord;u.programPhase=phase;u.courseId=u.courseId||('nelma-dcon-'+phase);
   u.courseLabel=u.courseLabel||('Nelma Fontana · '+row.course);u.totalBlocks=row.blocks;
   u.sourcePage=row.sourcePage;u.sourceURL=row.url;u.catalog=true;
   // Sem marcar bloco/conclusão por inferência. Os blocos não detalhados no PDF recebem nomes neutros.
   if(phase==='avancado'&&!u.parts)u.parts=Array.from({length:row.blocks},(_,i)=>({id:row.id+'-bloco-'+(i+1),number:i+1,title:'Bloco '+(i+1)+' de '+row.blocks,done:false}));
  }
 }
 for(const id of [a4id,'ESTRATEGIA-DCON-05']){
  const u=s.units.find(x=>x.id===id);if(!u)continue;
  u.order=order.indexOf(id)+1;u.programPhase='estrategia';u.sourceURL=DCON_ESTRATEGIA_URL;u.catalog=true;
  u.courseLabel=id===a4id?'Nelma Fontana · Estratégia · Aula 04 (art. 5º)':'Nelma Fontana · Estratégia · Aula 05 (remédios)';
  u.totalBlocks=id===a4id?24:8;
  if(id===a4id){u.exerciseVideoRequired=true;u.exerciseVideoLabel='VA 25 · exercícios';}
 }
 const status=dconProgramStatus(st);
 for(const row of DCON_AVANCADO){
  const u=s.units.find(x=>x.id===row.id);
  u.hiddenFromRoute=!status.baseDone;u.deferred=!status.baseDone;
  u.unlockCondition='Após concluir Cebraspe A01–A16 e Estratégia A04/A05 (teoria, exercícios e baterias).';
 }
 for(const id of order.slice(0,18)){const u=s.units.find(x=>x.id===id);if(u){u.hiddenFromRoute=false;u.deferred=false;}}
 s.dconProgram={version:DCON_PROGRAM_VERSION,source:'DCON - Nelma.pdf, 24 páginas, 03/11/2026',baseOrder:order.slice(0,18),advancedOrder:order.slice(18),
  advancedUnlocked:status.baseDone,cebraspeUrl:DCON_CEBRASPE_URL,estrategiaUrl:DCON_ESTRATEGIA_URL,avancadoUrl:DCON_AVANCADO_URL};
 st.dconProgramVersion=DCON_PROGRAM_VERSION;
 return st;
}
