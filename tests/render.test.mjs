import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
test('dashboard e catálogo exibem ciclo e exceção art. 5º com os dados iniciais reais',async()=>{
 const elements=new Map(),listeners={},mock=()=>({innerHTML:'',textContent:'',className:'',classList:{toggle(){}},focus(){},setAttribute(){},prepend(){},scrollIntoView(){},open:false,showModal(){this.open=true;},close(){this.open=false;},elements:{subjectId:{value:'afo'},activity:{value:'free'},applyCycle:{checked:false,disabled:false},finishPassage:{checked:false,disabled:false},hours:{value:0},durationMinutes:{value:0}}}),get=q=>{if(!elements.has(q))elements.set(q,mock());return elements.get(q);};
 const globals=['document','window','location','localStorage','fetch','setInterval','setTimeout','clearTimeout'];let previous=Object.fromEntries(globals.map(k=>[k,globalThis[k]]));
 try{globalThis.document={querySelector:get,querySelectorAll:()=>[],addEventListener:(n,f)=>listeners[n]=f};globalThis.window={addEventListener:(n,f)=>listeners[n]=f};globalThis.location={hash:''};let storage=new Map();globalThis.localStorage={getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)};globalThis.fetch=async()=>({ok:true,json:async()=>JSON.parse(fs.readFileSync(new URL('../data/initial-state.json',import.meta.url)))});globalThis.setInterval=()=>0;globalThis.setTimeout=()=>0;globalThis.clearTimeout=()=>{};

 await import('../src/app.js');await new Promise(r=>setImmediate(r));
 assert.doesNotMatch(get('#main').innerHTML,/Não foi possível abrir/);
 assert.match(get('#main').innerHTML,/13 posições/);assert.match(get('#main').innerHTML,/Curso:<\/b>/);
 for(const route of ['priorities','subjects','today','data']){
  location.hash='#'+route;listeners.hashchange();assert.doesNotMatch(get('#main').innerHTML,/undefined|NaN/);
  if(route==='priorities'){
   assert.match(get('#main').innerHTML,/Aula 04 do Estratégia/);
   assert.match(get('#main').innerHTML,/Aula 02 do Cebraspe/);
   assert.match(get('#main').innerHTML,/Aula 02 Cebraspe não é pré-requisito/);
  }
 }
 location.hash='#subjects';listeners.hashchange();
 listeners.click({target:{closest:()=>({dataset:{select:'cgu7'}})}});
 assert.match(get('#main').innerHTML,/aulas no catálogo 7 Fontes/);
 assert.match(get('#main').innerHTML,/EM PREPARAÇÃO/);
 assert.match(get('#main').innerHTML,/Indisponível para estudo/);
 assert.match(get('#main').innerHTML,/Desenvolvimento e realidade brasileira/);
 }finally{for(let k of globals)globalThis[k]=previous[k];}
});
