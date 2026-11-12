import {
 VERSION,OLD_STORAGE_KEY,ARCHIVE_KEY,SUBJECTS,IMA_WELCOME,IMA_AUDIT,
 initialIMAState,prepareIMA,activeUnits,getUnit,isLicUnlocked,nextLessons,setPart,setTheory,setPortugueseTopic,
 weekSummary,weekSchedule,weekBounds,isoToday,formatMinutes,lawPair,appendSession,appendLaw,allSourceRecords
} from './ima-only-state.js';

const $=s=>document.querySelector(s),esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const subjName=id=>SUBJECTS.find(s=>s[0]===id)?.[1]||id;
const fmtDate=iso=>(iso||'').split('-').reverse().join('/');
const uName=u=>u?.title||'Sem aula identificada';
const safeID=x=>String(x||'').replace(/[^a-z0-9-]/gi,'');
const CURRENT_WEEK_START='2026-11-07';
const NUM_GOALS=14;
let state,storedRaw='',selectedWeek=0,selectedSubject='dad',hasNotice=false;
function notice(msg,error=false){
 const el=$('#notice');if(!el)return;el.textContent=msg;el.classList.toggle('error',error);
 hasNotice=true;
}
function fail(e){notice(e?.message||String(e),true);}
function store(next){
 const latest=localStorage.getItem(OLD_STORAGE_KEY)||'';
 if(latest!==storedRaw)throw Error('O Drive ou outra aba alterou os dados. Recarregue a página antes de salvar.');
 next.updatedAt=new Date().toISOString();
 const raw=JSON.stringify(next);
 localStorage.setItem(OLD_STORAGE_KEY,raw);storedRaw=raw;state=next;
 render();
}
function update(fn,msg){
 try{store(fn(state));if(msg)notice(msg);}catch(e){fail(e);}
}
function dateWeek(n){
 const d=new Date(CURRENT_WEEK_START+'T12:00:00Z');d.setUTCDate(d.getUTCDate()+7*n);
 const start=d.toISOString().slice(0,10);d.setUTCDate(d.getUTCDate()+6);
 return {start,end:d.toISOString().slice(0,10)};
}
function currentIndex(){
 const weeks=(Date.parse(isoToday()+'T00:00:00Z')-Date.parse(CURRENT_WEEK_START+'T00:00:00Z'))/86400000;
 return Math.max(0,Math.min(NUM_GOALS-1,Math.floor(weeks/7)));
}
function countCycle(w){
 const actual=Object.fromEntries(SUBJECTS.map(([id])=>[id,0]));
 let laws=0;
 for(const s of state.sessions||[]){
  if(s.date<w.start||s.date>w.end||!Object.prototype.hasOwnProperty.call(actual,s.subjectId))continue;
  if(s.ima===true||s.courseTrack==='IMA')actual[s.subjectId]+=Number(s.minutes||0);
 }
 for(const l of state.legislation?.sessions||[])if(l.date>=w.start&&l.date<=w.end)laws+=Number(l.minutes)||0;
 return {actual,laws,cycle:Object.values(actual).reduce((a,b)=>a+b,0)};
}
function headline(kicker,title,desc=''){
 return '<div class="page-head"><div><span class="eyebrow">'+esc(kicker)+'</span><h1>'+esc(title)+'</h1>'+
 (desc?'<p>'+esc(desc)+'</p>':'')+'</div><button class="secondary" data-action="register">+ Registrar estudo</button></div>';
}
function stat(label,value,detail=''){return '<article class="card metric"><small>'+esc(label)+'</small><strong>'+esc(value)+'</strong><span class="sub">'+esc(detail)+'</span></article>';}
function actionButton(act,label,data={},variant='secondary'){
 return '<button class="'+variant+' small" data-action="'+act+'" '+Object.entries(data).map(([k,v])=>'data-'+k+'="'+esc(v)+'"').join(' ')+'>'+esc(label)+'</button>';
}
function statusText(u){if(u.theoryDone)return 'Teoria concluída';if(u.parts?.some(p=>p.done))return u.parts.filter(x=>x.done).length+'/'+u.parts.length+' vídeos vistos';return 'Não iniciada';}
function lessonCard(sid,u){
 const done=u.theoryDone,locked=sid==='licita-ima'&&!isLicUnlocked(state);
 const head='<div class="lesson-head"><div><b>'+esc(u.title)+'</b><small>'+esc(u.courseLabel||u.source||'')+'</small>'+
 (u.imaTopic?'<small>Tópico: '+esc(u.imaTopic)+'</small>':'')+
 '</div><span class="badge '+(done?'status-done':'status-pending')+'">'+esc(statusText(u))+'</span></div>';
 let content='';
 if(u.parts?.length){
  content='<div class="ima-parts">'+u.parts.map(p=>'<div class="ima-part"><span>'+
   esc(p.title)+'</span>'+actionButton('part',p.done?'✓ Concluída':'Marcar concluída',
   {subject:sid,unit:u.id,part:p.id,done:p.done?'0':'1'})+'</div>').join('')+'</div>';
 }else{
  content='<div class="actions">'+actionButton('theory',done?'✓ Teoria concluída':'Marcar teoria concluída',
   {subject:sid,unit:u.id,done:done?'0':'1'})+'</div>';
 }
 if(u.id==='dcon-u-2'&&done)content='<p class="muted">24 videoaulas teóricas e VA25 de exercícios já concluídas. Não repetir.</p>'+content;
 if(sid==='port'){
  content+= '<form class="port-topic-form" data-port-topic="'+esc(u.id)+'">'+
   '<label for="topic-'+esc(u.id)+'">Tópico estudado nesta aula (preenchimento livre)</label>'+
   '<div class="port-topic-row"><input type="text" id="topic-'+esc(u.id)+'" name="studiedTopic" '+
   'value="'+esc(u.studiedTopic||'')+'" maxlength="500" '+
   'placeholder="Escreva aqui o tópico estudado" autocomplete="off">'+
   '<button class="secondary small" type="submit">Salvar tópico</button></div>'+
   '<small class="muted">O título da aula permanece '+esc(u.title)+
   '. Você pode preencher, corrigir ou apagar o tópico sem alterar a conclusão.</small></form>';
 }
 if(u.optionalSupplement)content='<p class="muted">Complemento específico — não substitui as aulas do Thallius.</p>'+content;
 return '<div class="ima-lesson '+(done?'ima-done':'')+'"><div>'+head+'</div>'+
 (locked?'<p class="warning">Bloqueada até concluir DAD, pastas 02–08.</p>':content)+'</div>';
}
function dashboard(){
 const w=weekSummary(state),gate=isLicUnlocked(state);
 const n=SUBJECTS.map(([id,name])=>{
  const units=activeUnits(state,id),completed=units.filter(x=>x.theoryDone).length;
  const next=nextLessons(state,id,1)[0];
  return '<article class="card"><h3>'+esc(name)+'</h3><p class="muted">'+completed+'/'+units.length+
   ' aulas/unidades concluídas</p><p>'+(id==='licita-ima'&&!gate?'Aguardando DAD Pasta 08':(next?'Próxima: '+esc(next.title):'Revisões e questões FURB'))+
   '</p><a href="#disc-'+esc(id)+'">Abrir roteiro</a></article>';
 }).join('');
 const daily=weekSchedule(state).map(day=>'<article class="card schedule-row"><b>'+esc(day.day)+'</b><p>'+
 day.slots.map(([id,m])=>esc(subjName(id))+' '+m+'min').join(' · ')+'</p></article>').join('');
 return headline('IMA-SC · FURB · Analista Administrativo',IMA_WELCOME,
 'Aplicação exclusiva para o IMA-SC, com cursos e metas selecionados para o edital.')+
 '<div class="grid metrics four">'+stat('Ciclo da semana',formatMinutes(w.cycle),'Meta 30h, sem legislação seca')+
 stat('Leis extraciclo',formatMinutes(w.law),'2 leituras de 15 minutos por dia')+
 stat('Fase',gate?'2 · Licitações liberadas':'1 · Fundamentos',gate?'DAD, DCON e Licitações 4h/sem.':'DAD e DCON 6h/sem.')+
 stat('Data da prova','14/02/2027','IMA-SC · FURB')+'</div>'+
 '<section class="card"><h2>Prioridades imediatas</h2>'+
 '<p><b>Português:</b> Marcello Giulian, Extensivo, Aula 9 (Aulas 1–8 concluídas). A Camile informa livremente o tópico de cada aula.</p>'+
 '<p><b>DCON:</b> Nelma Fontana, Estratégia A05, Bloco 01/08 — Remédios Constitucionais (A04/VA25 concluídas).</p>'+
 '<p><b>DAD:</b> Thallius Moraes, Pasta 02. Licitações só é liberada após concluir as pastas 02–08.</p>'+
 '<p><b>APU:</b> Marcelo Soares, AP-05 — Transparência e Accountability. AP-01 tem 140 minutos de estudo anterior aproveitados.</p>'+
 '</section><section class="section-title"><h2>Disciplinas e continuidade</h2><div class="grid two">'+n+'</div></section>'+
 '<section class="section-title"><h2>Grade semanal atual — 30h</h2><div class="grid two">'+daily+'</div>'+
 '<p>Legislação seca: 30 minutos diários <b>fora</b> das 30h de ciclo.</p></section>';
}
function subjectsPage(){
 return headline('ROTEIRO DE ESTUDOS','Disciplinas do IMA','Nove disciplinas, cada uma com professor e curso definidos.')+
 '<div class="grid two">'+SUBJECTS.map(([id,name,course])=>{
  const units=activeUnits(state,id),done=units.filter(u=>u.theoryDone).length;
  return '<section class="card"><h2>'+esc(name)+'</h2><p>'+esc(course)+'</p>'+
   '<p>'+done+'/'+units.length+' aulas/unidades concluídas</p><a href="#disc-'+esc(id)+'">Ver aulas</a></section>';
 }).join('')+'</div>';
}
function subjectPage(id){
 const s=SUBJECTS.find(x=>x[0]===id);if(!s)return dashboard();
 const units=activeUnits(state,id),done=units.filter(x=>x.theoryDone).length,gate=isLicUnlocked(state);
 const info=id==='port'?'Somente Marcello Giulian — Extensivo. Aulas 1 a 40, sem conteúdo presumido. A Camile preenche o tópico estudado livremente, inclusive nas aulas 1 a 8 já concluídas. Questões no TEC/FURB.':
  id==='dad'?'Exclusivamente Thallius Moraes. Pasta 01 é Vade Mecum de consulta; o curso ativo começa na Pasta 02. Concluir as pastas 02–08 libera Licitações.':
  id==='adm-publica'?'Marcelo Soares: somente AP-05 (T01 Transparência e T01 Accountability). AP-01 foi estudada parcialmente no histórico e não precisa ser reiniciada.':
  id==='licita-ima'?'Thallius Moraes é o professor principal. Pasta 14 (21 VAs), Pasta 15 (8 VAs) e Rafael Oliveira Aula 10 (seis partes) como complemento.':
  id==='dcon'?'Nelma Fontana Cebraspe A01 concluída; Estratégia A04 (24 VAs + VA25) concluída; próxima é Estratégia A05 bloco 01/08.':'Somente conteúdos selecionados do edital IMA/SC.';
 return headline('DISCIPLINA · IMA-SC',s[1],s[2])+
 '<section class="card"><div class="statline"><span><b>'+done+'/'+units.length+'</b> unidades concluídas</span>'+
 '<span><b>'+formatMinutes(weekSummary(state).targets[id]||0)+'</b> meta semanal</span></div><p>'+esc(info)+'</p>'+
 (id==='licita-ima'&&!gate?'<div class="warning">Licitações bloqueada. DAD Thallius exige as pastas 02–08.</div>':'')+
 '</section><section class="card"><h2>Sequência de aulas e módulos</h2><div class="ima-lesson-list">'+
 units.map(u=>lessonCard(id,u)).join('')+'</div></section>';
}
function goals(){
 const current=selectedWeek,dates=dateWeek(current),g=countCycle(dates),target=weekSummary(state).targets,
  isPast=dates.end<isoToday();
 const rows=SUBJECTS.map(([id,name])=>{
  const aim=target[id]||0,done=g.actual[id]||0,next=nextLessons(state,id,1)[0],
   cap=aim?Math.min(100,Math.round(100*done/aim)):0;
  return '<tr><td>'+esc(name)+'</td><td>'+formatMinutes(aim)+'</td><td>'+formatMinutes(done)+'</td>'+
   '<td><progress max="100" value="'+cap+'"></progress></td><td>'+
   (id==='licita-ima'&&!isLicUnlocked(state)?'Bloqueada até DAD P08':esc(next?.title||'Revisar e resolver questões'))+'</td></tr>';
 }).join('');
 const opts=Array.from({length:NUM_GOALS},(_,i)=>{const d=dateWeek(i);return '<option value="'+i+'" '+(i===current?'selected':'')+
 '>Meta '+(i+1)+' · '+fmtDate(d.start)+' a '+fmtDate(d.end)+'</option>';}).join('');
 return headline('PLANEJAMENTO SEMANAL','Metas IMA','Somente a preparação para o IMA. Metas de 30h, legislação seca extraciclo.')+
 '<section class="card"><label>Semana de referência<select id="week-select">'+opts+'</select></label>'+
 '<h2>Meta '+(current+1)+' — '+fmtDate(dates.start)+' a '+fmtDate(dates.end)+'</h2>'+
 '<p>'+formatMinutes(g.cycle)+' de 30h no ciclo · '+formatMinutes(g.laws)+' de legislação extraciclo</p>'+
 '<progress max="1800" value="'+Math.min(1800,g.cycle)+'"></progress>'+
 (isPast?'<p class="muted">Semana encerrada; a meta histórica continua consultável.</p>':'')+'</section>'+
 '<section class="card"><div class="table-wrap"><table><thead><tr><th>Disciplina</th><th>Meta</th><th>Realizado</th><th>Progresso</th><th>Próximo</th></tr></thead>'+
 '<tbody>'+rows+'</tbody></table></div></section><section class="card">'+
 '<h2>Meta 1 — continuidade</h2><p>Português: Aula 9 do Extensivo de Marcello Giulian (tópico preenchido pela Camile). DCON: Estratégia A05 bloco 01/08. DAD: Thallius Pasta 02.'+
 ' APU: Marcelo AP-05. AFO: BizurAFO. RL: Guilherme Neves. TI: Rodrigo. Ambiental: Anexo V.</p></section>';
}
function coverage(){
 const pairs=[['dad','DAD — Thallius'],['port','Português — Marcello'],['dcon','DCON — Nelma'],['afo','AFO — BizurAFO'],
 ['rl','RL/Matemática — Guilherme'],['apu','Administração Pública — Marcelo'],['ti','TI/IA — Rodrigo'],['ambiental','Legislação Ambiental'],['licita','Licitações — Thallius e Rafael']];
 const content=pairs.map(([id,name])=>'<section class="card"><h2>'+esc(name)+'</h2><div class="table-wrap"><table><thead>'+
 '<tr><th>Tópico do edital</th><th>Curso e aula</th><th>Cobertura</th></tr></thead><tbody>'+
 (IMA_AUDIT[id]||[]).map(x=>'<tr><td>'+esc(x.topic)+'</td><td>'+esc(x.source)+' · '+esc(x.lesson)+'</td><td>'+
 esc(x.status)+(x.note?'<small class="muted">'+esc(x.note)+'</small>':'')+'</td></tr>').join('')+
 '</tbody></table></div></section>').join('');
 return headline('ANEXO V','Edital × aulas','Matriz de cobertura documental; não marca aulas como estudadas.')+content;
}
function lawPage(){
 const pair=lawPair(isoToday()),today=isoToday();
 return headline('LEITURA EXTRA-CICLO','Legislação seca','Duas leituras diárias, 15 minutos cada; não descontar das 30 horas do ciclo.')+
 '<section class="grid two">'+pair.map(row=>'<article class="card"><h2>'+esc(row.short)+'</h2><p>'+esc(row.title)+'</p>'+
 actionButton('law','Registrar 15 minutos',{norm:row.id})+'</article>').join('')+'</section>'+
 '<section class="card"><h2>Leituras de hoje</h2><p>'+
 (state.legislation?.sessions||[]).filter(x=>x.date===today).reduce((s,x)=>s+Number(x.minutes||0),0)+
 ' minutos já registrados. Para concluir as duas leituras, são 30 minutos.</p></section>';
}
function diary(){
 const rows=allSourceRecords(state).slice(0,150);
 const counts=rows.reduce((a,r)=>({minutes:a.minutes+(r.minutes||0),questions:a.questions+(r.questions||0),correct:a.correct+(r.correct||0)}),{minutes:0,questions:0,correct:0});
 return headline('DIÁRIO IMA','Histórico de estudos','Sessões recentes do IMA. O progresso reaproveitado de Português, DCON e APU permanece nas aulas.')+
 '<div class="grid metrics four">'+stat('Sessões IMA',rows.length)+stat('Tempo IMA',formatMinutes(counts.minutes))+
 stat('Questões',counts.questions)+stat('Acertos',counts.correct)+'</div>'+
 '<section class="card"><div class="table-wrap"><table><thead><tr><th>Data</th><th>Matéria</th><th>Aula</th><th>Atividade</th><th>Tempo</th><th>Questões</th></tr></thead><tbody>'+
 rows.map(r=>'<tr><td>'+fmtDate(r.date)+'</td><td>'+esc(subjName(r.subjectId))+'</td><td>'+esc(r.subjectId==='port'?(getUnit(state,'port',r.unitId)?.title||r.unitId):(r.title||getUnit(state,r.subjectId,r.unitId)?.title||r.unitId))+'</td>'+
 '<td>'+esc(r.activity)+'</td><td>'+formatMinutes(Number(r.minutes)||0)+'</td><td>'+
 (Number(r.questions)||0)+' / '+(Number(r.correct)||0)+'</td></tr>').join('')+
 '</tbody></table></div></section>';
}
function dataPage(){
 const u=state.imaUserVerified||{};
 const lines=['Português A01–A08 · teoria concluída','DCON Cebraspe A01 · concluída',
 'DCON Estratégia A04 · 24 vídeos + VA25 concluídos','DCON Estratégia A05 · ainda não iniciada',
 'Administração Pública AP-01 · 140 min comprovados; AP-05 pendente'];
 return headline('DADOS E SEGURANÇA','Backup e importação','Nenhum conteúdo antigo de outras seleções aparece no plano ativo.')+
 '<section class="card"><h2>Progresso aproveitado</h2><ul>'+lines.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul>'+
 '<p>Fonte de confirmação: '+esc(u.source||'histórico comunicado e backup antigo')+'.</p></section>'+
 '<section class="card"><h2>Proteção do histórico</h2>'+
 '<p>Antes de migrar, a aplicação guarda uma cópia do estado anterior neste navegador. O novo plano mantém somente as nove disciplinas IMA e o histórico relevante.</p>'+
 '<div class="actions">'+actionButton('export','Exportar backup IMA')+
 actionButton('export-old','Exportar backup anterior')+
 actionButton('import','Mesclar outro backup')+'</div>'+
 '<p class="muted">Use um backup salvo antes de trocar de dispositivo. A sincronização Google Drive mantém seu mecanismo anterior.</p></section>';
}
function showModal(html){const d=$('#modal');$('#modal-body').innerHTML=html;if(d?.showModal)d.showModal();else d.open=true;}
function closeModal(){const d=$('#modal');if(d?.close)d.close();else d.open=false;}
function selectOptions(sid,chosen=''){
 const active=activeUnits(state,sid);
 return active.map(u=>'<option value="'+esc(u.id)+'" '+(u.id===chosen?'selected':'')+'>'+esc(u.title)+'</option>').join('');
}
function registerModal(){
 const sid=selectedSubject==='licita-ima'&&!isLicUnlocked(state)?'dad':selectedSubject;const opts=SUBJECTS.filter(([id])=>id!=='licita-ima'||isLicUnlocked(state))
 .map(([id,name])=>'<option value="'+esc(id)+'" '+(id===sid?'selected':'')+'>'+esc(name)+'</option>').join('');
 showModal('<h2>Registrar estudo do IMA</h2><form id="session-form" class="form-grid">'+
 '<label>Disciplina<select name="subjectId" id="reg-subject">'+opts+'</select></label>'+
 '<label>Aula<select name="unitId" id="reg-unit">'+selectOptions(sid)+'</select></label>'+
 '<label>Data<input type="date" name="date" value="'+isoToday()+'" max="'+isoToday()+'" required></label>'+
 '<label>Tipo de estudo<select name="activity"><option value="theory">Teoria</option><option value="battery">Questões TEC / FURB</option><option value="review">Revisão</option></select></label>'+
 '<label>Horas<input type="number" name="hours" value="1" min="0" max="10"></label>'+
 '<label>Minutos<input type="number" name="minutes" value="0" min="0" max="59"></label>'+
 '<label>Questões<input type="number" name="questions" value="0" min="0" max="9999"></label>'+
 '<label>Acertos<input type="number" name="correct" value="0" min="0" max="9999"></label>'+
 '<button class="full" type="submit">Salvar sessão</button></form>');
 $('#reg-subject').onchange=()=>{$('#reg-unit').innerHTML=selectOptions($('#reg-subject').value);};
 $('#session-form').onsubmit=e=>{
  e.preventDefault();const f=e.target;
  update(st=>appendSession(st,{subjectId:f.elements.subjectId.value,unitId:f.elements.unitId.value,
   date:f.elements.date.value,activity:f.elements.activity.value,hours:f.elements.hours.value,
   minutes:f.elements.minutes.value,questions:f.elements.questions.value,correct:f.elements.correct.value}), 'Sessão IMA registrada.');
  closeModal();
 };
}
function downloadJSON(raw,name){
 const b=new Blob([raw],{type:'application/json'}),url=URL.createObjectURL(b),a=document.createElement('a');
 a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1200);
}
function doImport(){
 showModal('<h2>Mesclar backup com segurança</h2><p>Os registros atuais prevalecem; progresso do backup acrescenta apenas sessões ou aulas não existentes.</p>'+
 '<input type="file" id="backup-file" accept=".json,application/json"><div id="backup-preview"></div>');
 $('#backup-file').onchange=async e=>{
  try{
   const file=e.target.files[0];if(!file)return;
   if(file.size>15*1024*1024)throw Error('Arquivo grande demais para importação automática.');
   const raw=JSON.parse(await file.text());
   if(raw.version!==1||!Array.isArray(raw.subjects)||!Array.isArray(raw.sessions))throw Error('Backup Método ET incompatível.');
   const incoming=prepareIMA(raw),current=state,merged=structuredClone(current);
   const sessions=new Set(merged.sessions.map(x=>x.id));
   for(const r of incoming.sessions||[])if(!sessions.has(r.id)){merged.sessions.push(r);sessions.add(r.id);}
   for(const sub of merged.subjects){
    const from=incoming.subjects.find(s=>s.id===sub.id);
    for(const u of sub.units){
     const prior=from?.units.find(v=>v.id===u.id);if(!prior)continue;
     if(prior.theoryDone&&!u.theoryDone){u.theoryDone=true;u.theoryDate=u.theoryDate||prior.theoryDate||'';}
     if(prior.batteryDone)u.batteryDone=true;
     if(u.id.startsWith('port-u-')&&!String(u.studiedTopic||'').trim()&&String(prior.studiedTopic||'').trim())u.studiedTopic=prior.studiedTopic;
     if(Array.isArray(u.parts)&&Array.isArray(prior.parts))for(const p of u.parts)if(prior.parts.some(q=>q.id===p.id&&q.done))p.done=true;
    }
   }
   merged.imaOnly.version=VERSION;
   $('#backup-preview').innerHTML='<p>Mesclagem proposta: '+(merged.sessions.length-current.sessions.length)+' sessões adicionais.</p>'+
   '<button id="confirm-import">Confirmar mesclagem</button>';
   $('#confirm-import').onclick=()=>{update(()=>merged,'Backup conciliado sem substituir sessões atuais.');closeModal();};
  }catch(ex){$('#backup-preview').textContent=ex.message;}
 };
}
function render(){
 const route=(location.hash||'#ima').slice(1);
 if(route.startsWith('disc-'))selectedSubject=route.slice(5);
 const page=route==='subjects'?subjectsPage():route==='planning'?goals():
 route==='coverage'?coverage():route==='legislation'?lawPage():route==='history'?diary():
 route==='data'?dataPage():route.startsWith('disc-')?subjectPage(selectedSubject):dashboard();
 $('#main').innerHTML=page;
 const label=$('#date-label');if(label)label.textContent=new Date().toLocaleDateString('pt-BR',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
 document.querySelectorAll('nav a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+route));
 const wk=$('#week-select');if(wk)wk.onchange=e=>{selectedWeek=Number(e.target.value);render();};
}
function events(){
 window.addEventListener('hashchange',render);
 // Salvar tópico por aula sem trocar o nome do curso ou status de conclusão.
 document.addEventListener('submit',e=>{
  const form=e.target?.closest?.('form[data-port-topic]');
  if(!form)return;
  e.preventDefault();
  const uid=form.getAttribute('data-port-topic');
  const topic=form.elements.studiedTopic.value;
  update(st=>setPortugueseTopic(st,uid,topic),'Tópico da aula salvo.');
 });
 const closer=$('#close-modal');if(closer)closer.addEventListener('click',closeModal);
 document.addEventListener('click',e=>{
  const button=e.target.closest('[data-action]');if(!button)return;
  e.preventDefault();const {action,subject,unit,part,done,norm}=button.dataset;
  if(action==='register'){registerModal();return;}
  if(action==='part'){update(st=>setPart(st,subject,unit,part,done==='1',isoToday()),'Progresso da videoaula atualizado.');return;}
  if(action==='theory'){update(st=>setTheory(st,subject,unit,done==='1',isoToday()),'Status da teoria atualizado.');return;}
  if(action==='law'){update(st=>appendLaw(st,norm,isoToday(),15),'Leitura extraciclo registrada (+15 min).');return;}
  if(action==='export'){downloadJSON(JSON.stringify(state,null,2),'Camile-IMA-Backup-'+isoToday()+'.json');return;}
  if(action==='export-old'){const raw=localStorage.getItem(ARCHIVE_KEY);
   if(!raw){notice('Não há cópia anterior gravada neste navegador.',true);return;}
   downloadJSON(raw,'Camile-Backup-Antes-IMA-'+isoToday()+'.json');return;
  }
  if(action==='import'){doImport();return;}
 });
}
async function init(){
 try{
  let raw=localStorage.getItem(OLD_STORAGE_KEY),data;
  if(raw){data=JSON.parse(raw);}
  else{data=initialIMAState();}
  if(data.imaOnly?.version!==VERSION&&!localStorage.getItem(ARCHIVE_KEY)){
   localStorage.setItem(ARCHIVE_KEY,raw||JSON.stringify(data));
  }
  state=prepareIMA(data);
  storedRaw=raw||'';
  if(!raw||JSON.stringify(data)!==JSON.stringify(state)){
   const latest=localStorage.getItem(OLD_STORAGE_KEY)||'';
   if(latest!==storedRaw)throw Error('Dados alterados por outra aba durante a migração. Recarregue.');
   state.updatedAt=new Date().toISOString();
   storedRaw=JSON.stringify(state);
   localStorage.setItem(OLD_STORAGE_KEY,storedRaw);
  }
  selectedWeek=currentIndex();
  events();render();
 }catch(e){fail(e);$('#main').innerHTML='<section class="card"><h1>Não foi possível abrir o planejamento IMA</h1><p>'+
 esc(e.message)+'</p><p>O backup anterior não foi apagado. Confira a conexão e tente recarregar.</p></section>';}
}
init();
