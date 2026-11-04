import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import * as M from '../src/core.js';
import {
 ANDRESAN_COURSES,ANDRESAN_LESSONS,reconcilePortugueseAndresan,
 andresanLesson,PORT_ANDRESAN_VERSION
} from '../src/portugues-andresan-catalog.js';

const seed=()=>JSON.parse(fs.readFileSync(new URL('../data/initial-state.json',import.meta.url)));
const port=s=>s.subjects.find(x=>x.id==='port');

test('Português: 14 aulas exatas e somente questões por assunto disponíveis',()=>{
 assert.equal(ANDRESAN_LESSONS.length,14);
 assert.equal(ANDRESAN_LESSONS[0].title,'Acentuação Gráfica');
 assert.equal(ANDRESAN_LESSONS.at(-1).title,'Leitura');
 assert.equal(new Set(ANDRESAN_LESSONS.map(x=>x.id)).size,14);
 assert.equal(ANDRESAN_COURSES.length,8);
 assert.deepEqual(ANDRESAN_COURSES.filter(x=>x.available).map(x=>x.id),['andresan-cebraspe-questoes-assuntos']);
 assert.equal(ANDRESAN_COURSES.some(x=>x.id.includes('teorico-2023')),false);
});

test('cadastro preserva histórico, metas e progresso; recarga não duplica unidades',()=>{
 const before=seed(),history={id:'session-antiga',subjectId:'port',date:'2026-10-30',minutes:65,questions:31,correct:25};
 before.sessions.push(history);
 const originalUnits=JSON.parse(JSON.stringify(port(before).units));
 const next=reconcilePortugueseAndresan(before),again=reconcilePortugueseAndresan(next);
 assert.deepEqual(port(before).units,originalUnits);
 assert.equal(port(next).andresanCatalog.version,PORT_ANDRESAN_VERSION);
 assert.deepEqual(next.sessions,before.sessions);
 assert.deepEqual(next.cycle,before.cycle);
 assert.deepEqual(next.goals,before.goals);
 assert.deepEqual(port(next).units,port(again).units);
 for(const l of ANDRESAN_LESSONS){
  assert.equal(port(next).units.filter(u=>u.id===l.id).length,1);
  const u=port(next).units.find(u=>u.id===l.id);
  assert.equal(u.questionOnly,true);
  assert.equal(u.supplemental,true);
 }
});

test('questões do Andresan registram aula, horas e acertos sem concluir teoria',()=>{
 const before=reconcilePortugueseAndresan(seed()),date=M.day(),priorMinutes=before.sessions.reduce((n,s)=>n+(s.minutes||0),0);
 const after=M.session(before,{
  subjectId:'port',unitId:'ANDRESAN-Q-01',andresanLessonId:'ANDRESAN-Q-01',
  date,activity:'andresan',minutes:75,questions:24,correct:20,medium:'video',
  notes:'Videoaula de questões após teoria do Marcello',applyCycle:false
 });
 const entry=after.sessions.at(-1),u=port(after).units.find(x=>x.id==='ANDRESAN-Q-01');
 assert.equal(entry.andresanLessonId,'ANDRESAN-Q-01');
 assert.match(entry.title,/Acentuação Gráfica/);
 assert.equal(entry.minutes,75);
 assert.equal(entry.questions,24);
 assert.equal(entry.correct,20);
 assert.equal(entry.medium,'video');
 assert.equal(u.battery.attempted,24);
 assert.equal(u.theoryDone,false);
 assert.deepEqual(after.cycle,before.cycle);
 assert.equal(after.sessions.reduce((n,s)=>n+(s.minutes||0),0),priorMinutes+75);
 assert.throws(()=>M.session(before,{subjectId:'port',unitId:'ANDRESAN-Q-01',andresanLessonId:'INEXISTENTE',date,activity:'andresan',minutes:30,questions:1,correct:1}),/válida/);
});

test('videoaula do Andresan pode ter zero questões; unidade histórica sem novo campo permanece compatível',()=>{
 let s=reconcilePortugueseAndresan(seed()),date=M.day();
 s=M.session(s,{subjectId:'port',unitId:'ANDRESAN-Q-02',date,activity:'andresan',minutes:38,questions:0,correct:0,medium:'video'});
 assert.equal(s.sessions.at(-1).andresanLessonId,'ANDRESAN-Q-02');
 assert.equal(s.sessions.at(-1).questions,0);
 assert.ok(andresanLesson('ANDRESAN-Q-02'));
});
