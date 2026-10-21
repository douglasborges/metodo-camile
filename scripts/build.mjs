import {cp,mkdir,rm,readdir} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
for(const file of await readdir('src'))if(file.endsWith('.js'))execFileSync(process.execPath,['--check','src/'+file]);
for(const file of ['drive-sync.js','drive-sync-ui.js','oauth-client-hotfix.js','sw.js'])execFileSync(process.execPath,['--check',file]);
await rm('dist',{recursive:true,force:true});
await mkdir('dist',{recursive:true});
for(const path of ['index.html','styles.css','drive-sync.css','drive-sync.js','drive-sync-ui.js','oauth-client-hotfix.js','sw.js','manifest.webmanifest','version.json','assets','src','data','cgu-check'])await cp(path,'dist/'+path,{recursive:true});
console.log('Build concluído: dist/; dados iniciais copiados sem modificação.');
