// Catálogo aditivo do PDF "Missão Cebraspe — Prof. Andresan [2026]", páginas 3–11.
// Não substitui o extensivo do Marcello nem reinicia as unidades ou sessões existentes.
export const PORT_ANDRESAN_VERSION='port-andresan-20261103-v1';
const titles=[
 'Acentuação Gráfica','Ortografia','Classes de Palavras',
 'Funções Sintáticas - Parte 1','Funções Sintáticas - Parte 2',
 'Concordância','Regência','Crase','Pronomes','Verbos','Orações',
 'Pontuação','Diversas e Reescrita','Leitura'
];
export const ANDRESAN_LESSONS=Object.freeze(titles.map((title,i)=>Object.freeze({
 id:'ANDRESAN-Q-'+String(i+1).padStart(2,'0'),order:i+1,title,
 courseId:'andresan-cebraspe-questoes-assuntos',teacher:'Andresan Machado'
})));
export const ANDRESAN_COURSES=Object.freeze([
 {id:'andresan-cebraspe-teorico',name:'[Andresan] [Cebraspe] Português Teórico',lessons:13,available:false},
 {id:'andresan-cebraspe-questoes-assuntos',name:'[Andresan] [Cebraspe] Resolução de Questões por Assuntos',lessons:14,available:true},
 {id:'andresan-cebraspe-provas-medio',name:'[Andresan] [Cebraspe] Resolução de Questões por Provas - Nível Médio',lessons:7,available:false},
 {id:'andresan-cebraspe-provas-superior',name:'[Andresan] [Cebraspe] Resolução de Questões por Provas - Nível Superior',lessons:10,available:false},
 {id:'andresan-cebraspe-provas-2023',name:'[Andresan] [Cebraspe] Resolução de Questões por Provas - 2023',lessons:11,available:false},
 {id:'andresan-cebraspe-provas-2024',name:'[Andresan] [Cebraspe] Resolução de Questões por Provas - 2024',lessons:8,available:false},
 {id:'andresan-cebraspe-redacao-oficial',name:'[Andresan] [Cebraspe] Redação Oficial para Concurso',lessons:1,available:false},
 {id:'andresan-cebraspe-redacao-discursiva',name:'[Andresan] [Cebraspe] Redação Cebraspe',lessons:5,available:false}
].map(c=>Object.freeze(c)));
export function andresanLesson(id){return ANDRESAN_LESSONS.find(x=>x.id===id)||null;}
export function isAndresanQuestionActivity(activity){return ['battery','reviewBattery','andresan','solid'].includes(activity);}
export function reconcilePortugueseAndresan(current){
 const st=JSON.parse(JSON.stringify(current));
 const port=st.subjects?.find(s=>s.id==='port');
 if(!port)return st;
 // Apenas dados do catálogo: cursos futuros cadastrados, mas indisponíveis.
 port.andresanCatalog={
  version:PORT_ANDRESAN_VERSION,source:'Missão Cebraspe - Prof Andresan [2026].pdf',
  theoreticalCourse:'Marcello Giulian - Extensivo (40 encontros)',
  courses:ANDRESAN_COURSES.map(c=>({...c})),
  activeCourseId:'andresan-cebraspe-questoes-assuntos'
 };
 port.units=Array.isArray(port.units)?port.units:[];
 for(const lesson of ANDRESAN_LESSONS){
  // IDs já existentes no TCU são mantidos SEM modificar progresso/baterias.
  if(port.units.some(u=>u.id===lesson.id))continue;
  // Apenas unidades auxiliares; na Camile não entram na rota teórica,
  // no progresso Marcello nem nos checkpoints.
  port.units.push({
   id:lesson.id,order:100+lesson.order,
   title:'Andresan · Questões · '+lesson.title,topic:lesson.title,
   courseId:lesson.courseId,courseLabel:'[Andresan] [Cebraspe] Resolução de Questões por Assuntos',
   supplemental:true,questionOnly:true,hiddenFromRoute:true,
   theoryDone:false,theoryDate:'',theoryStarted:false,batteryDone:false,
   generalDone:false,materialReady:false,battery:{attempted:0,correct:0},
   general:{attempted:0,correct:0},legacy:[],marks:[]
  });
 }
 return st;
}
