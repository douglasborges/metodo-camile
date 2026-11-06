import {refineImaCurriculum} from './ima-sc-auditoria-edital-20261106.js';
// IMA/SC 2026 — Analista Administrativo (ANA), Edital 001/2026, Anexo V, pp. 56-59.
// Catálogo aditivo. Não alterar históricos de CGU/TCU; modo IMA usa trilhas distintas.
export const IMA_EXAM_DATE='2027-02-14';
export const IMA_WEEKS_MINUTES=1800;
export const IMA_LAW_START='2026-11-06';
export const IMA_LAW_DAYS_PER_ROTATION=5;
export const IMA_ENVIRONMENTAL=Object.freeze([
 {id:'ima-env-cf225',short:'CF art. 225',title:'CF/88 — Título VIII, Capítulo VI, Meio Ambiente',group:'ambiental',edital:'ANA Ambiental',source:'CF/88'},
 {id:'ima-env-lc140',short:'LC 140/11',title:'LC 140/2011 — Cooperação ambiental federativa',group:'ambiental',edital:'ANA Ambiental'},
 {id:'ima-env-pnma',short:'Lei 6.938',title:'Lei 6.938/1981 — PNMA, SISNAMA e instrumentos',group:'ambiental',edital:'ANA Ambiental'},
 {id:'ima-env-sc14675-t1',short:'SC 14.675 T.I',title:'SC Lei 14.675/2009 — somente Título I',group:'ambiental',edital:'ANA Ambiental'},
 {id:'ima-env-sc14675-t2',short:'SC 14.675 T.II',title:'SC Lei 14.675/2009 — somente Título II',group:'ambiental',edital:'ANA Ambiental'},
 {id:'ima-env-ima17354',short:'SC 17.354',title:'SC Lei 17.354/2017 — criação, estrutura e atribuições do IMA',group:'ambiental',edital:'ANA Ambiental'}
]);
export const IMA_DCON_LAWS=Object.freeze([
 {id:'ima-dcon-cf-1-4',short:'CF 1–4',title:'CF/88 — Princípios Fundamentais (arts. 1º–4º)',group:'dcon'},
 {id:'ima-dcon-cf-5',short:'CF art. 5º',title:'CF/88 — Direitos e garantias fundamentais (art. 5º)',group:'dcon'},
 {id:'ima-dcon-cf-6-17',short:'CF 6–17',title:'CF/88 — Direitos sociais, nacionalidade e direitos políticos',group:'dcon'},
 {id:'ima-dcon-cf-18-43',short:'CF 18–43',title:'CF/88 — Organização do Estado e Administração Pública',group:'dcon'},
 {id:'ima-dcon-cf-44-135',short:'CF Poderes',title:'CF/88 — Organização dos Poderes e Funções Essenciais',group:'dcon'},
 {id:'ima-dcon-cf-165-169',short:'CF 165–169',title:'CF/88 — Orçamento (arts. 165 a 169)',group:'dcon'},
 {id:'ima-dcon-cf-social',short:'CF Ordem Social',title:'CF/88 — Ordem social, seguridade e meio ambiente',group:'dcon'}
]);
export const IMA_DAD_LAWS=Object.freeze([
 {id:'ima-dad-6745-t1',short:'SC 6.745 T.I',title:'SC Lei 6.745/1985 — Disposições iniciais',group:'dad'},
 {id:'ima-dad-6745-t2',short:'SC 6.745 T.II',title:'SC Lei 6.745/1985 — Admissão, reingresso e vacância',group:'dad'},
 {id:'ima-dad-6745-t5',short:'SC 6.745 T.V',title:'SC Lei 6.745/1985 — Deveres e responsabilidades',group:'dad'},
 {id:'ima-dad-8429',short:'Lei 8.429',title:'Lei 8.429/1992 — Improbidade Administrativa',group:'dad'},
 {id:'ima-dad-9784',short:'Lei 9.784',title:'Lei 9.784/1999 — Processo Administrativo',group:'dad'},
 {id:'ima-dad-lai',short:'LAI',title:'Lei 12.527/2011 — Acesso à Informação',group:'dad'},
 {id:'ima-dad-lgpd',short:'LGPD',title:'Lei 13.709/2018 — Proteção de Dados Pessoais',group:'dad'},
 {id:'ima-dad-anticor',short:'Lei 12.846',title:'Lei 12.846/2013 — Anticorrupção',group:'dad'},
 {id:'ima-dad-lindb',short:'LINDB',title:'Decreto-Lei 4.657/1942 — LINDB',group:'dad'},
 {id:'ima-dad-lc741',short:'SC LC 741',title:'SC LC 741/2019 — Organização administrativa estadual',group:'dad'},
 {id:'ima-dad-9637',short:'Lei 9.637',title:'Lei 9.637/1998 — Organizações Sociais',group:'dad'},
 {id:'ima-dad-9790',short:'Lei 9.790',title:'Lei 9.790/1999 — OSCIPs',group:'dad'},
 {id:'ima-dad-13019',short:'Lei 13.019',title:'Lei 13.019/2014 — Parcerias com organizações da sociedade civil',group:'dad'},
 {id:'ima-afo-4320',short:'Lei 4.320',title:'Lei 4.320/1964 — Orçamento e contabilidade pública',group:'dad'},
 {id:'ima-afo-lrf',short:'LC 101',title:'LC 101/2000 — Lei de Responsabilidade Fiscal: planejamento, renúncia, despesa, transferências, transparência e controle',group:'dad'},
 {id:'ima-dad-14133',short:'Lei 14.133',title:'Lei 14.133/2021 — Licitações e contratos',group:'dad'}
]);
export const IMA_LAWS=Object.freeze([...IMA_ENVIRONMENTAL,...IMA_DCON_LAWS,...IMA_DAD_LAWS]);
const ordinal=d=>Math.floor(Date.UTC(...d.split('-').map((x,i)=>i===1?Number(x)-1:Number(x)))/86400000);
export function imaLegislationPair(date=IMA_LAW_START){
 const block=Math.max(0,Math.floor((ordinal(date)-ordinal(IMA_LAW_START))/IMA_LAW_DAYS_PER_ROTATION));
 // Alternar CF+ambiental (dia 1) e DAD+ambiental (dia 2);
 // alterar os textos de DCON e DAD a cada 5 dias, independentemente da alternância.
 const currentDay=Math.max(0,ordinal(date)-ordinal(IMA_LAW_START));
 const group=currentDay%2===0?IMA_DCON_LAWS:IMA_DAD_LAWS;
 return [group[block%group.length],IMA_ENVIRONMENTAL[block%IMA_ENVIRONMENTAL.length]];
}
// 26h30 de disciplinas + 3h30 de legislação seca (7 × 30 min) = 30h semanais.
export const IMA_WEEKLY_MINUTES=Object.freeze({
 'dad':240,'licita-ima':240,'afo':180,'dcon':150,'port':240,
 'rl-ima':180,'adm-publica':120,'ti-ima':120,'leg-ambiental':120
});
export const IMA_TECH_COURSE=Object.freeze([
 {id:'rs-info-67',source:'Rodrigo Schaeffer · Combo',topic:'Inteligência Artificial e Aprendizado de Máquina',videos:5,status:'SELETIVO'},
 {id:'rs-info-49',source:'Rodrigo Schaeffer · Combo',topic:'Sistemas de suporte à decisão',videos:1,status:'ESTUDAR'},
 {id:'rs-info-15',source:'Rodrigo Schaeffer · Combo',topic:'Segurança da informação',videos:8,status:'SELETIVO'}
]);
export const IMA_MARCELO=Object.freeze([
 {id:'MARC_ADM-ADM-AP-05',course:'Faixa Preta · Administração Pública',topic:'Transparência e accountability',status:'ESTUDAR (tópico próprio de APU)'},
 {id:'MARC_ADM-ADM-AP-04',course:'Faixa Preta · Administração Pública',topic:'Excelência nos serviços públicos',status:'EM ESPERA (apoio, não conteúdo literal independente)'},
 {id:'MARC_ADM-ADM-AP-03',course:'Faixa Preta · Administração Pública',topic:'Gestão para resultados',status:'EM ESPERA (apoio)'}
]);
function unit(row,order){return{id:row.id,order,title:row.title,source:row.source||'Edital IMA/SC — ANA',
  studyPlan:row.note||'',theoryDone:false,theoryDate:'',batteryDone:false,generalDone:false,
  materialReady:false,battery:{attempted:0,correct:0},general:{attempted:0,correct:0},
  legacy:[],marks:[],hiddenFromRoute:!!row.wait,deferred:!!row.wait,ima:true};}
export function reconcileImaSubjects(current){
 const st=JSON.parse(JSON.stringify(current));st.subjects=Array.isArray(st.subjects)?st.subjects:[];
 const items=[
  {id:'leg-ambiental',course:'IMA/SC — Legislação Ambiental Aplicada (ANA)',minutes:120,topics:IMA_ENVIRONMENTAL.map(x=>({...x,source:'Edital ANA — Anexo V'}))},
  {id:'ti-ima',course:'IMA/SC — TI: IA e Segurança da Informação (Rodrigo)',minutes:120,topics:[
    {id:'ima-ti-ia',title:'IA, automação e transformação digital no setor público',source:'Rodrigo · Combo Grupo 67 · 5 aulas; selecionar conforme tópico'},
    {id:'ima-ti-apoio',title:'Sistemas de suporte à decisão',source:'Rodrigo · Combo Grupo 49 · 1 aula'},
    {id:'ima-ti-seg',title:'Segurança da informação aplicada à IA',source:'Rodrigo · Combo Grupo 15 · seleção entre 8 aulas'}
  ]},
  {id:'rl-ima',course:'IMA/SC — RL-Matemática (Guilherme Neves, Enxutos)',minutes:240,topics:[
    {id:'ima-rl-log',title:'Enxuto RL — proposições, tabelas-verdade, equivalências, argumentos',source:'Guilherme · A01–A04'},
    {id:'ima-rl-comb',title:'Enxuto RL — análise combinatória e probabilidade',source:'Guilherme · A06–A07'},
    {id:'ima-rl-seq',title:'Enxuto RL — sequências',source:'Guilherme · A08'},
    {id:'ima-rl-mat',title:'Alfabetização Matemática Enxuta — inteiros, frações, proporções, porcentagem, medidas, conjuntos e médias',source:'Guilherme · módulos seletivos'}
  ]},
  {id:'licita-ima',course:'IMA/SC — Licitações e Contratos (Thallius)',minutes:240,topics:[
    {id:'ima-lic-14',title:'Lei 14.133/2021 — licitações, PNCP, sanções e recursos',source:'Thallius · Pasta 14, 21 aulas',note:'Após DAD pastas 01–08'},
    {id:'ima-lic-15',title:'Contratos administrativos e crimes em licitações',source:'Thallius · Pasta 15, 8 aulas',note:'Após DAD pastas 01–08'}
  ]}
 ];
 for(const row of items){let s=st.subjects.find(x=>x.id===row.id);if(!s){s={id:row.id,phase:'new',course:row.course,slotMinutes:row.minutes,units:[],checkpoints:{},notebooks:[],andresanComplete:false};st.subjects.push(s);}
  s.course=row.course;s.slotMinutes=row.minutes;s.units=Array.isArray(s.units)?s.units:[];
  for(let i=0;i<row.topics.length;i++){const v=row.topics[i],exist=s.units.find(u=>u.id===v.id);if(!exist)s.units.push(unit({id:v.id,title:v.title||v.title,source:v.source,note:v.note},i+1));}
 }
 // Ativar somente o conteúdo IMA; preservar conclusões e sessões dos cursos antigos.
 // Registros CGU/TCU não são apagados: apenas saem da rota ativa.
 const relevantAfo=new Set(['01','02','03','04','05','06','07','08','09','10','11','14']);
 const oldDad=new Set(['dad-u-1','dad-u-2','dad-u-3','dad-u-4','dad-u-5','dad-u-9','dad-u-10','dad-u-11','dad-u-17','dad-u-18','dad-u-19','dad-u-20','dad-u-22']);
 const dad=st.subjects.find(x=>x.id==='dad');
 if(dad){
   const thallius=[
    ['01','Vade Mecum Bizurado — apenas consulta de normas do IMA',''],
    ['02','Noções introdutórias e conceito de Administração','dad-u-1'],
    ['03','Organização da Administração Pública','dad-u-2'],
    ['04','Órgãos públicos','dad-u-2'],
    ['05','Centralização, descentralização, concentração e desconcentração','dad-u-2'],
    ['06','Princípios administrativos','dad-u-1'],
    ['07','Atos administrativos','dad-u-10'],
    ['08','Poderes administrativos','dad-u-9'],
    ['09','Agentes públicos','dad-u-17'],
    ['11','Improbidade — Lei 8.429/1992','dad-u-20'],
    ['12','Processo Administrativo — Lei 9.784/1999','dad-u-11'],
    ['13','Responsabilidade Civil do Estado','dad-u-18'],
    ['16','Controle da Administração','dad-u-19'],
    ['17','Serviços públicos','dad-u-5'],
    ['19','Entidades paraestatais e terceiro setor','dad-u-4'],
    ['26','LAI — Lei 12.527/2011',''],
    ['27','Lei Anticorrupção — Lei 12.846/2013','dad-u-22'],
    ['28','LGPD — Lei 13.709/2018','']
   ];
   const basenum=800;
   for(let i=0;i<thallius.length;i++){
     const [number,title,legacy]=thallius[i],id='ima-tha-dad-'+number;
     if(dad.units.some(u=>u.id===id))continue;
     const nu=unit({id,title:'Thallius · Pasta '+number+' — '+title,source:'Thallius Moraes · DAD, pasta '+number},basenum+i);
     const prior=legacy&&dad.units.find(u=>u.id===legacy);
     // Transferir apenas conclusão comprovada de tópico diretamente equivalente;
     // a sessão original continua vinculada ao seu identificador de origem.
     if(prior?.theoryDone){nu.theoryDone=true;nu.theoryDate=prior.theoryDate||'';nu.equivalenceSource=legacy;nu.equivalenceReviewRequired=true;}
     dad.units.push(nu);
   }
   for(const u of dad.units){
     const isThallius=String(u.id).startsWith('ima-tha-dad-');
     if(!isThallius){u.hiddenFromRoute=true;u.deferred=true;u.imaLegacyStatus=oldDad.has(u.id)?'HISTÓRICO / EQUIVALÊNCIA':'[EM ESPERA]';}
   }
 }
 for(const x of st.subjects){
   if(['cpu','auditoria','ti','info','dados-rodrigo','politicas','diversidade','cgu7'].includes(x.id))
     for(const u of x.units||[]){u.hiddenFromRoute=true;u.deferred=true;u.imaLegacyStatus='[EM ESPERA]';}
   if(x.id==='port')for(const u of x.units||[])if(u.courseId?.includes('andresan')||String(u.id).startsWith('ANDRESAN-')){u.hiddenFromRoute=true;u.deferred=true;u.imaLegacyStatus='[EM ESPERA]';}
   if(x.id==='dcon')for(const u of x.units||[])if(String(u.id).includes('-AV-')){u.hiddenFromRoute=true;u.deferred=true;u.imaLegacyStatus='[EM ESPERA]';}
   if(x.id==='afo')for(const u of x.units||[]){
     const m=String(u.id).match(/^afo-cgu-([0-9]{2})$/);
     const active=m&&relevantAfo.has(m[1]);
     if(!active){u.hiddenFromRoute=true;u.deferred=true;u.imaLegacyStatus='[EM ESPERA]';}
   }
   if(x.id==='adm-publica')for(const u of x.units||[]){
     const active=u.id==='MARC_ADM-ADM-AP-05';
     if(!active){u.hiddenFromRoute=true;u.deferred=true;u.imaLegacyStatus='[EM ESPERA]';}
   }
 }
 // Licitações: exigir que as pastas iniciais 01–08 do Thallius constem como concluídas.
 const early=['02','03','04','05','06','07','08'].map(n=>'ima-tha-dad-'+n);
 const unlock=early.every(id=>dad?.units?.some(u=>u.id===id&&u.theoryDone));
 const lic=st.subjects.find(x=>x.id==='licita-ima');
 if(lic)for(const u of lic.units||[]){u.hiddenFromRoute=!unlock;u.deferred=!unlock;u.unlockCondition='Concluir DAD Thallius 02–08 (01 é Vade Mecum)';}
  st.imaProfile={version:'2026-11-05-v1',examDate:IMA_EXAM_DATE,weeklyMinimum:1800,environmentalHours:2,subjects:['dad','licita-ima','afo','dcon','port','rl-ima','adm-publica','ti-ima','leg-ambiental'],status:'IMA_ACTIVE',scope:'Edital 001/2026, Anexo V, ANA'};
 return refineImaCurriculum(st);
}
