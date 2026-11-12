import {cp,mkdir,rm} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
const runtime=[
 'ima-only-app.js','ima-only-state.js','ima-sc-curriculum-20261105.js',
 'ima-sc-auditoria-edital-20261106.js','ima-camile-progresso-metas-20261107.js',
 'dcon-programacao-20261103.js'
];
for(const file of runtime)execFileSync(process.execPath,['--check','src/'+file]);
for(const file of ['drive-sync.js','drive-sync-ui.js'])execFileSync(process.execPath,['--check',file]);
await rm('dist',{recursive:true,force:true});await mkdir('dist/src',{recursive:true});
for(const file of ['index.html','styles.css','ima-only.css','drive-sync.css','drive-sync.js',
 'drive-sync-ui.js','oauth-client-hotfix.js','sw.js','manifest.webmanifest','version.json'])
 await cp(file,'dist/'+file);
await cp('assets','dist/assets',{recursive:true});
for(const file of runtime)await cp('src/'+file,'dist/src/'+file);
console.log('Build IMA-only: '+runtime.length+' módulos, sem catálogos CGU/7 Fontes/Andresan e sem backup inicial CGU.');
