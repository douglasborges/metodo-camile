import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import * as M from '../src/core.js';
import {normalizeExtras} from '../src/personal.js';
import {applyFinalCguCurriculum} from '../src/cgu-final-runtime.js';
const camile=true;
test('posição 13 abre 7 Fontes, inicia cronômetro cgu7 e salva sessão cgu7 sem perder registros',async()=>{
 let state=JSON.parse(fs.readFileSync(new URL('../data/initial-state.json',import.meta.url)));
 state=normalizeExtras(state);
 if(!camile)state=(await import('../src/goals.js')).normalizeGoals(state);
 state=camile?M.normalizeMethodState(state):applyFinalCguCurriculum(state);
 state.cycle={index:12,minutes:47};
 const original=structuredClone(state.sessions);
 // Publicadas ainda exigem conferência de complemento: registro livre, sem liberar aulas.
 assert.equal(M.methodUnits(state.subjects.find(s=>s.id==='cgu7')).length,0);
 const storage=new Map([[M.KEY,JSON.stringify(state)]]),elements=new Map(),listeners={};
 const get=q=>{if(!elements.has(q))elements.set(q,{innerHTML:'',textContent:'',className:'',classList:{toggle(){}},focus(){},setAttribute(){},prepend(){},scrollIntoView(){},open:false,showModal(){this.open=true;},close(){this.open=false;},elements:{subjectId:{value:'cgu7'},activity:{value:'free'},unitId:{value:''},applyCycle:{checked:false},finishPassage:{checked:false}}});return elements.get(q);};
 const globals=['document','window','location','localStorage','fetch','setInterval','setTimeout','clearTimeout','FormData'];const before=Object.fromEntries(globals.map(k=>[k,globalThis[k]]));
 try{
  globalThis.document={querySelector:get,querySelectorAll:()=>[],addEventListener:(n,f)=>listeners[n]=f};
  globalThis.window={addEventListener:(n,f)=>listeners[n]=f};globalThis.location={hash:'#today'};
  globalThis.localStorage={getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v),removeItem:k=>storage.delete(k)};
  globalThis.fetch=async()=>({ok:true,json:async()=>state});globalThis.setInterval=()=>0;globalThis.setTimeout=()=>0;globalThis.clearTimeout=()=>{};
  const click=action=>listeners.click({target:{closest:()=>({dataset:{action}})}});
  await import('../src/app.js');await new Promise(r=>setImmediate(r));
  assert.doesNotMatch(get('#main').innerHTML,/Não foi possível abrir/,get('#load-error').textContent);
  assert.equal(JSON.parse(storage.get(M.KEY)).cycle.index,12,'índice após inicialização');
  click('go-subject');location.hash='#subjects';listeners.hashchange();assert.match(get('#main').innerHTML,/7 Fontes/);
  location.hash='#today';listeners.hashchange();click('timer-start');
  assert.match(get('#modal-body').innerHTML,/Iniciar foco · 7 Fontes CGU/);
  assert.doesNotMatch(get('#modal-body').innerHTML,/<option value="7F-/);
  get('#timer-form').onsubmit({preventDefault(){},target:get('#timer-form')});
  assert.equal(JSON.parse(storage.get(M.KEY+':timer')).subjectId,'cgu7');
  click('session');assert.match(get('#modal-body').innerHTML,/value="cgu7" selected/);
  globalThis.FormData=class{*[Symbol.iterator](){yield* Object.entries({subjectId:'cgu7',unitId:'',activity:'free',date:M.day(),hours:'0',durationMinutes:'17',questions:'0',correct:'0',medium:'video',notes:'Sessão de teste',start:'',end:''});}};
  get('#session-form').onsubmit({preventDefault(){},target:get('#session-form')});
  const saved=JSON.parse(storage.get(M.KEY));assert.equal(saved.sessions.length,original.length+1);
  assert.deepEqual(saved.sessions.slice(0,-1),original);assert.equal(saved.sessions.at(-1).subjectId,'cgu7');assert.equal(saved.sessions.at(-1).unitId,'');assert.equal(saved.sessions.at(-1).minutes,17);
  assert.deepEqual(saved.cycle,{index:12,minutes:47});
  await import('../src/app.js?slot13-reload');await new Promise(r=>setImmediate(r));
  const reloaded=JSON.parse(storage.get(M.KEY));assert.deepEqual(reloaded.sessions,saved.sessions);assert.deepEqual(reloaded.cycle,saved.cycle);
  click('timer-start');assert.match(get('#modal-body').innerHTML,/Iniciar foco · 7 Fontes CGU/);
 }finally{for(const k of globals)globalThis[k]=before[k];}
});
