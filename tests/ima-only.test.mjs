import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {
 VERSION,SUBJECTS,initialIMAState,prepareIMA,activeUnits,getUnit,
 isLicUnlocked,nextLessons,setPart,setTheory,weekSummary,weekSchedule,lawPair,appendLaw,appendSession
} from '../src/ima-only-state.js';
const seed=()=>prepareIMA(initialIMAState());
const sum=arr=>arr.reduce((a,b)=>a+b,0);
test('reconstrução é exclusiva IMA e idempotente sem CGU, 7 Fontes ou Andresan',()=>{
 const st=seed(),second=prepareIMA(st);
 assert.equal(st.imaOnly.version,VERSION);
 assert.deepEqual(st.subjects.map(x=>x.id),SUBJECTS.map(x=>x[0]));
 assert.equal(st.subjects.length,9);
 assert.equal(JSON.stringify(st),JSON.stringify(second));
 assert.equal(st.settings.focus,'IMA');
 assert.equal(st.subjects.some(x=>x.id==='cgu7'||x.id==='auditoria'),false);
 assert.equal(st.subjects.some(x=>x.units.some(u=>/ANDRESAN-|7F-/i.test(u.id))),false);
});
test('Português é exatamente o Extensivo Marcello com 40 aulas sem Andresan',()=>{
 const st=seed(),u=activeUnits(st,'port');
 assert.equal(u.length,40);
 assert.deepEqual(u.map(x=>x.id),Array.from({length:40},(_,i)=>'port-u-'+(i+1)));
 assert.equal(u.filter(x=>x.theoryDone).length,8);
 assert.equal(nextLessons(st,'port')[0].id,'port-u-9');
 assert.match(u[0].title,/Acentuação Gráfica/);
 assert.match(u[13].title,/título individual não identificado/);
 assert.ok(u.every(x=>x.teacher==='Marcello Giulian'));
 assert.ok(!st.subjects.find(x=>x.id==='port').units.some(x=>/Andresan/i.test(x.title)));
});
test('DCON conserva A01, A04/VA25 e inicia A05 bloco 01/08',()=>{
 const st=seed(),a4=getUnit(st,'dcon','dcon-u-2'),
  a5=getUnit(st,'dcon','ESTRATEGIA-DCON-05');
 assert.equal(getUnit(st,'dcon','NELMA-DCON-01').theoryDone,true);
 assert.equal(a4.theoryDone,true);assert.equal(a4.parts.length,25);
 assert.ok(a4.parts.every(p=>p.done));assert.equal(a4.exerciseVideoDone,true);
 assert.equal(a5.theoryDone,false);assert.equal(a5.parts.length,8);
 assert.ok(a5.parts.every(p=>!p.done));
 assert.equal(nextLessons(st,'dcon')[0].id,'ESTRATEGIA-DCON-05');
 assert.equal(getUnit(st,'dcon','NELMA-DCON-03').theoryDone,false);
 const after=setPart(st,'dcon','ESTRATEGIA-DCON-05',a5.parts[0].id,true,'2026-11-12');
 assert.equal(after.subjects.find(x=>x.id==='dcon').units.find(x=>x.id==='ESTRATEGIA-DCON-05').blocksCompleted,1);
 assert.equal(st.subjects.find(x=>x.id==='dcon').units.find(x=>x.id==='ESTRATEGIA-DCON-05').blocksCompleted||0,0);
});
test('DAD contém apenas pastas do Thallius; todas 02–08 liberam Licitações',()=>{
 let st=seed(),u=activeUnits(st,'dad');
 assert.equal(u.length,17);assert.ok(u.every(x=>x.teacher==='Thallius Moraes'));
 assert.ok(!u.some(x=>/7 Fontes|Rafael/i.test(x.courseLabel||x.title)));
 assert.equal(u[0].id,'ima-tha-dad-02');
 assert.equal(getUnit(st,'dad','ima-tha-dad-08').parts.length,5);
 assert.equal(isLicUnlocked(st),false);
 const first=weekSummary(st);
 assert.equal(first.targets.dad,360);assert.equal(first.targets.dcon,360);
 assert.equal(first.targets['licita-ima'],0);
 assert.throws(()=>setTheory(st,'licita-ima','IMA-LIC-CRIMES',true),/bloquead/);
 for(const n of ['02','03','04','05','06','07','08']){
  const id='ima-tha-dad-'+n,parts=getUnit(st,'dad',id).parts.map(p=>p.id);
  for(const part of parts)st=setPart(st,'dad',id,part,true,'2026-11-12');
  assert.equal(getUnit(st,'dad',id).theoryDone,true);
 }
 assert.equal(isLicUnlocked(st),true);
 const next=weekSummary(st);
 for(const sid of ['dad','dcon','licita-ima','afo'])assert.equal(next.targets[sid],240);
 assert.equal(sum(Object.values(next.targets)),1800);
 assert.equal(getUnit(st,'licita-ima','ima-lic-14').parts.length,21);
 assert.equal(getUnit(st,'licita-ima','ima-lic-15').parts.length,8);
 assert.equal(activeUnits(st,'licita-ima').filter(x=>x.id.startsWith('IMA-LIC-RAFAEL-A10-P')).length,6);
});
test('ciclo 30h e leis 3h30 extraciclo nunca se misturam',()=>{
 let st=seed();
 assert.equal(sum(Object.values(weekSummary(st).targets)),1800);
 const sch=weekSchedule(st);
 assert.equal(sch.reduce((a,d)=>a+d.slots.reduce((x,v)=>x+v[1],0),0),1800);
 const today='2026-11-12',pair=lawPair(today);
 assert.equal(pair.length,2);
 st=appendLaw(st,pair[0].id,today,15);
 st=appendLaw(st,pair[1].id,today,15);
 let w=weekSummary(st,today);
 assert.equal(w.law,30);assert.equal(w.cycle,0);
 const x=nextLessons(st,'dad',1)[0];
 // Data escolhida do presente ou anterior para o teste de unidade.
 st=appendSession(st,{subjectId:'dad',unitId:x.id,date:today,hours:1,minutes:0,questions:20,correct:15,activity:'battery'});
 w=weekSummary(st,today);
 assert.equal(w.cycle,60);assert.equal(w.law,30);
});
test('backup legado é preservado na origem e dados ativos excluem outras seleções',()=>{
 const old=initialIMAState();
 old.subjects.push({id:'cgu7',course:'7 Fontes',phase:'new',units:[],checkpoints:{},notebooks:[],slotMinutes:60});
 old.subjects.find(x=>x.id==='port').units.push({id:'ANDRESAN-Q-01',title:'Andresan',theoryDone:false});
 old.sessions.push({id:'historico-1',date:'2026-10-15',subjectId:'port',unitId:'port-u-1',minutes:60});
 old.sessions.push({id:'historico-2',date:'2026-10-15',subjectId:'cgu7',unitId:'7F-01',minutes:90});
 const snapshot=JSON.stringify(old),out=prepareIMA(old);
 assert.equal(JSON.stringify(old),snapshot);
 assert.equal(out.subjects.length,9);
 assert.equal(out.sessions.length,1);
 assert.equal(out.sessions[0].subjectId,'port');
 assert.equal(out.subjects.some(s=>s.id==='cgu7'),false);
 assert.equal(activeUnits(out,'port').length,40);
 assert.doesNotMatch(JSON.stringify(out),/CGU|7 Fontes|Andresan/i,'Estado IMA limpo não carrega catálogos nem metadados antigos');
});
test('site ativo não carrega roteiros nem catálogos da CGU',()=>{
 const html=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
 assert.match(html,/src\/ima-only-app\.js/);
 assert.doesNotMatch(html,/<a[^>]+href="#(?:today|priorities|cgu-check|cgu-planning)"/);
 assert.doesNotMatch(html,/<script[^>]+src="\.\/src\/app\.js/);
 assert.doesNotMatch(html,/CGU|7 Fontes|Andresan/);
});

test('videoaulas Thallius concluídas prevalecem sobre equivalências herdadas',()=>{
 let st=seed();const dad=st.subjects.find(s=>s.id==='dad');
 for(const n of ['02','03','04','05','06','07','08']){
  const u=dad.units.find(u=>u.id==='ima-tha-dad-'+n);
  u.equivalenceReviewRequired=true;u.confirmedThallius=false;
 }
 for(const n of ['02','03','04','05','06','07','08']){
  const id='ima-tha-dad-'+n;
  for(const p of getUnit(st,'dad',id).parts)st=setPart(st,'dad',id,p.id,true,'2026-11-12');
  assert.equal(getUnit(st,'dad',id).confirmedThallius,true);
 }
 assert.equal(isLicUnlocked(st),true);
 assert.equal(weekSummary(st).targets['licita-ima'],240);
});
