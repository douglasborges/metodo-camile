import test from 'node:test';
import assert from 'node:assert/strict';
test('interface publicada abre somente IMA: navegação, 40 Marcello, Thallius e Metas IMA',async()=>{
 const globals=['document','window','location','localStorage','fetch'];
 const original=Object.fromEntries(globals.map(k=>[k,globalThis[k]]));
 const el=new Map(),handlers={};
 const node=()=>({innerHTML:'',textContent:'',classList:{toggle(){}},addEventListener(){},setAttribute(){},getAttribute(){return null;}});
 const get=q=>{if(!el.has(q))el.set(q,node());return el.get(q);};
 const storage=new Map();
 try{
  globalThis.document={querySelector:get,querySelectorAll:()=>[],addEventListener:(ev,fn)=>handlers[ev]=fn};
  globalThis.window={addEventListener:(ev,fn)=>handlers[ev]=fn};
  globalThis.location={hash:'#ima'};
  globalThis.localStorage={getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)};
  globalThis.fetch=async()=>{throw Error('App nova não deve buscar catálogo inicial da CGU');};
  await import('../src/ima-only-app.js');
  await new Promise(r=>setImmediate(r));
  const rendered=()=>get('#main').innerHTML;
  assert.match(rendered(),/Bem-vida, Camile/);
  assert.match(rendered(),/Thallius/);
  assert.doesNotMatch(rendered(),/CGU|7 Fontes|Andresan/);
  const stored=JSON.parse(storage.get('metodo-et:camile:v1'));
  assert.equal(stored.subjects.length,9);assert.equal(stored.settings.focus,'IMA');
  const routes=[
   ['#subjects',/Disciplinas do IMA/],
   ['#disc-dad',/Pasta 02/],
   ['#disc-port',/Aula 40/],
   ['#disc-dcon',/A05/],
   ['#planning',/Metas IMA/],
   ['#coverage',/Edital × aulas/],
   ['#legislation',/Leitura EXTRA-CICLO|Legislação seca/],
   ['#history',/Histórico de estudos/],
   ['#data',/Backup e importação/]
  ];
  for(const [route,expect] of routes){
   location.hash=route;handlers.hashchange();
   assert.match(rendered(),expect,route+' precisa renderizar');
   assert.doesNotMatch(rendered(),/CGU|7 Fontes|Andresan/,route+' não pode exibir cursos antigos');
  }
 }finally{for(const k of globals)globalThis[k]=original[k];}
});
