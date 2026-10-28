// Correção curricular DCON (2026-10-28).
// Reordena por IDs estáveis: não recria unidades, sessões, notas ou checkpoints.
import {FINAL_CGU_PLAN as BASE_PLAN,FINAL_CGU_LESSONS as BASE_LESSONS} from './cgu-final-plan.js';
const ORDER=['NELMA-DCON-01','ESTRATEGIA-DCON-04','dcon-u-2','ESTRATEGIA-DCON-05','NELMA-DCON-02','NELMA-DCON-03'];
const positions=new Map(ORDER.map((id,i)=>[id,i]));
const normalize=lesson=>{
 if(lesson.id==='ESTRATEGIA-DCON-04'||lesson.id==='dcon-u-2')return {...lesson,
  deps:'Cebraspe Aula 01 (Princípios Fundamentais). NÃO exige a Aula 02 Cebraspe.',
  note:'Fonte principal e exclusiva da teoria do art. 5º: 24 vídeos e exercícios. Registrar questões da Aula 04 mesmo durante a teoria; a bateria só é concluída após os requisitos do Método ET. Depois, estudar Aula 05 do Estratégia (8 vídeos) e RETORNAR à Aula 02 Cebraspe para questões, antes da Aula 03. Não repetir a teoria do art. 5º.'};
 if(lesson.id==='ESTRATEGIA-DCON-05')return {...lesson,deps:'Estratégia Aula 04 (24 vídeos e exercícios), antes da Aula 02 Cebraspe.'};
 if(lesson.id==='NELMA-DCON-02')return {...lesson,
  title:'Direitos e Garantias Fundamentais — Aula 02 Cebraspe (questões e consolidação, sem repetir teoria do art. 5º)',
  deps:'Estratégia Aula 04 (24 vídeos) → Estratégia Aula 05 (8 vídeos) → Aula 02 Cebraspe (questões).',
  note:'Após as Aulas 04 e 05 do Estratégia, RETORNAR à Aula 02 do Cebraspe para questões e consolidação. Não refazer a teoria do art. 5º. Preservar todas as conclusões e sessões já registradas.'};
 if(lesson.id==='NELMA-DCON-03')return {...lesson,deps:'Retomada da Aula 02 Cebraspe → Aula 03, depois das Aulas 04 e 05 do Estratégia.'};
 return lesson;
};
const rows=BASE_LESSONS.map(normalize);
const nelma=rows.filter(x=>x.source==='NELMA');
const ordered=[...nelma].sort((a,b)=>{
 const ia=positions.has(a.id)?positions.get(a.id):100+nelma.indexOf(a);
 const ib=positions.has(b.id)?positions.get(b.id):100+nelma.indexOf(b);
 return ia-ib;
});
const first=rows.findIndex(x=>x.source==='NELMA');
const outside=rows.filter(x=>x.source!=='NELMA');
export const FINAL_CGU_LESSONS=Object.freeze([...outside.slice(0,first),...ordered,...outside.slice(first)]);
export const FINAL_CGU_PLAN={...BASE_PLAN,lessons:FINAL_CGU_LESSONS};
if(FINAL_CGU_LESSONS.length!==BASE_LESSONS.length||new Set(FINAL_CGU_LESSONS.map(x=>x.id)).size!==BASE_LESSONS.length)
 throw new Error('Catálogo DCON inconsistente: verifique IDs e duplicações.');
