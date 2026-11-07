/**
 * Migração de progresso e Metas IMA, independente do ciclo legado da CGU.
 * As evidências são extraídas das sessões e flags do backup do próprio navegador,
 * nunca de um backup pessoal publicado no repositório.
 */
import {imaLicitationStatus,imaWeeklyMinutesFor} from './ima-sc-auditoria-edital-20261106.js';
export const IMA_PROGRESS_VERSION='camile-ima-backup-audit-20261107-v1';
export const IMA_VERIFIED_STUDY_VERSION='camile-confirmacao-historica-port8-dcon-a4-20261107-v2';
export const IMA_GOALS_VERSION='camile-ima-weekly-goals-20261107-v1';
export const IMA_META_START='2026-11-07';
export const IMA_META_WEEKS=14;
const copy=x=>JSON.parse(JSON.stringify(x));
const ids=['dad','dcon','afo','port','rl-ima','adm-publica','ti-ima','leg-ambiental','licita-ima'];
const seq={
 dad:['ima-tha-dad-02','ima-tha-dad-03','ima-tha-dad-04','ima-tha-dad-05','ima-tha-dad-06','ima-tha-dad-07','ima-tha-dad-08','ima-tha-dad-09','ima-tha-dad-11','ima-tha-dad-12','ima-tha-dad-13','ima-tha-dad-16','ima-tha-dad-17','ima-tha-dad-19','ima-tha-dad-26','ima-tha-dad-27','ima-tha-dad-28'],
 dcon:['dcon-u-2','ESTRATEGIA-DCON-05','NELMA-DCON-02','NELMA-DCON-03','NELMA-DCON-04','NELMA-DCON-05','NELMA-DCON-06','NELMA-DCON-07','NELMA-DCON-08','NELMA-DCON-09','NELMA-DCON-10','NELMA-DCON-15','NELMA-DCON-16'],
 afo:['IMA-AFO-M01','IMA-AFO-M02','IMA-AFO-M03','IMA-AFO-M04','IMA-AFO-M05','IMA-AFO-M06','IMA-AFO-M07','IMA-AFO-M08','IMA-AFO-M09','IMA-AFO-M10','IMA-AFO-M11','IMA-AFO-M14'],
 port:['port-u-1','port-u-2','port-u-3','port-u-4','port-u-5','port-u-6','port-u-7','port-u-8','port-u-9','port-u-10','port-u-11','port-u-12','port-u-13'],
 'rl-ima':['IMA-RL-A01','IMA-RL-A02','IMA-RL-A03','IMA-RL-A04','IMA-MAT-M01','IMA-MAT-M05','IMA-MAT-M07','IMA-MAT-M12','IMA-MAT-M13','IMA-MAT-M31','IMA-MAT-M32','IMA-EST-M49'],
 'adm-publica':['MARC_ADM-ADM-AP-05'],
 'ti-ima':['ima-ti-ia','ima-ti-apoio','ima-ti-seg','IMA-TI-DIG','IMA-TI-RESP'],
 'leg-ambiental':['ima-env-cf225','ima-env-lc140','ima-env-pnma','ima-env-sc14675-t1','ima-env-sc14675-t2','ima-env-ima17354'],
 'licita-ima':['ima-lic-14','ima-lic-15','IMA-LIC-CRIMES','IMA-LIC-PNCP']
};
const subject= (st,id)=>st.subjects?.find(s=>s.id===id);
const unit=(st,sid,uid)=>subject(st,sid)?.units?.find(u=>u.id===uid);
const sessions=(st,sid,uid)=> (st.sessions||[]).filter(s=>s.subjectId===sid&&s.unitId===uid);
const counted=r=>r.activity!=='night';
const mins=arr=>arr.filter(counted).reduce((n,x)=>n+Number(x.minutes||0),0);
const sumQuestions=arr=>arr.reduce((a,s)=>({questions:a.questions+Number(s.questions||0),correct:a.correct+Number(s.correct||0)}),{questions:0,correct:0});
const sessionDates=arr=>arr.filter(x=>x.date).map(x=>x.date).sort();
export function reconcileCamileImaProgress(current){
 const st=copy(current);
 if(!st.imaProfile||st.imaProfile.status!=='IMA_ACTIVE')return st;
 st.settings=st.settings||{};
 // Não mudar os campos internos focus/secondary exigidos pela base histórica.
 st.settings.weeklyMinimum=1800;st.settings.weeklyTarget=1800;
 st.settings.dailyMinimum=240;st.settings.dailyTarget=240;
 st.imaProfile.weeklyMinimum=1800;st.imaProfile.cycleWeeklyMinutes=1800;
 st.imaProfile.lawExtraWeeklyMinutes=210;
 st.imaProfile.weeklyBySubject=imaWeeklyMinutesFor(st);
 // AFO: o backup CGU guarda BizurAFO/Pacelli em histórico, mas o IMA usa a matriz de módulos M01–M14.
 // Exibir apenas a trilha auditada, sem perder o estudo do Pacelli já registrado.
 // Garantir a fonte única de APU até em instalações antigas sem a disciplina no backup.
 const apuSubject=subject(st,'adm-publica');
 if(apuSubject&&!apuSubject.units.some(u=>u.id==='MARC_ADM-ADM-AP-05')){
  apuSubject.units.push({id:'MARC_ADM-ADM-AP-05',title:'AP-05 · Transparência e Accountability — T01 Transparência + T01 Accountability',
   order:805,courseId:'marcelo-faixa-preta-administracao-publica',source:'Marcelo Soares · Faixa Preta Administração Pública',
   theoryDone:false,theoryDate:'',batteryDone:false,generalDone:false,materialReady:false,battery:{attempted:0,correct:0},
   general:{attempted:0,correct:0},legacy:[],marks:[],hiddenFromRoute:false,deferred:false});
 }
 const afoSubject=subject(st,'afo');
 if(afoSubject){
  afoSubject.imaActiveCourse='Leandro Ravyelle · BizurAFO (M01 a M11 + M14; recortes do edital IMA)';
  for(const u of afoSubject.units||[]){
   if(/^IMA-AFO-M(0[1-9]|10|11|14)$/.test(u.id)){u.hiddenFromRoute=false;u.deferred=false;u.imaActive=true;}
   else if(/^afo-cgu-/.test(u.id)){u.hiddenFromRoute=true;u.deferred=true;u.imaLegacyStatus='Catálogo CGU anterior; utilizar matriz IMA sem duplicar';}
  }
 }

 const previous=st.imaProgressAudit||{};
 if(previous.version!==IMA_PROGRESS_VERSION){
  const port1=unit(st,'port','port-u-1'),p1=sessions(st,'port','port-u-1');
  const lecture=p1.filter(s=>s.activity==='theory'),questions=p1.filter(s=>['battery','free','general'].includes(s.activity));
  const q=sumQuestions(questions),doneFromEvidence=lecture.length>=2&&mins(lecture)>=150&&q.questions>=30;
  if(port1&&doneFromEvidence){
   port1.theoryDone=true;port1.theoryDate=port1.theoryDate||sessionDates(lecture).at(-1)||'';
   port1.batteryDone=true;
   const battery=sumQuestions(p1.filter(s=>s.activity==='battery'));
   port1.battery={attempted:Math.max(Number(port1.battery?.attempted||0),battery.questions),correct:Math.max(Number(port1.battery?.correct||0),battery.correct)};
   port1.imaPriorLearning={status:'CONCLUIDO_COM_EVIDENCIA',source:'Sessões originais do Método ET',theoryMinutes:mins(lecture),questions:q.questions,correct:q.correct,rule:'Teoria em 2 sessões, >=150 min e >=30 questões; evidência forte, sem criar sessões'};
  }
  for(const uid of ['port-u-3','port-u-5']){
   const u=unit(st,'port',uid),arr=sessions(st,'port',uid).filter(s=>s.activity==='theory');
   if(u&&arr.length){u.imaPriorLearning={status:u.theoryDone?'CONCLUIDO':'ESTUDADO_PARCIALMENTE',source:'Diário da app antes do IMA',theoryMinutes:mins(arr),dates:sessionDates(arr),instruction:'Não repetir automaticamente os trechos já vistos; confirmar o último vídeo/parte e continuar ou resolver questões.'};}
  }
  const art5=unit(st,'dcon','dcon-u-2');
  if(art5){
   const a=sessions(st,'dcon','dcon-u-2'),labels=a.map(s=>s.title||'');
   const cited=[...new Set(labels.flatMap(t=>[...t.matchAll(/Bloco\s*0?(\d+)/gi)].map(x=>Number(x[1]))))].sort((a,b)=>a-b);
   art5.imaPriorLearning={status:art5.theoryDone?'CONCLUIDO':'EM_ANDAMENTO',
    source:'Campo blocksCompleted e diário da app',registeredBlocks:Number(art5.blocksCompleted||0),
    citedBlocks:cited,theoryMinutes:mins(a.filter(s=>s.activity==='theory')),
    instruction:'Há divergência entre contador de blocos e títulos das sessões; conferir na plataforma quais vídeos faltam, não iniciar do zero.',
    requiresPositionReview:cited.some(n=>n>Number(art5.blocksCompleted||0))};
  }
  for(const [sid,uid] of [['adm-publica','MARC_ADM-ADM-AP-01'],['afo','PAC_AFO-AFO-PRI'],['info','info-u-11']]){
   const u=unit(st,sid,uid),arr=sessions(st,sid,uid);
   if(u&&arr.length)u.imaPriorLearning={status:u.theoryDone?'CONCLUIDO':'ESTUDADO_PARCIALMENTE',source:'Sessões históricas registradas',theoryMinutes:mins(arr.filter(s=>s.activity==='theory')),dates:sessionDates(arr),instruction:'Preservar no histórico e aproveitar conteúdo, sem atribuir conclusão a aula de outro professor.'};
  }
  const a1=unit(st,'afo','IMA-AFO-M01'),vg=unit(st,'afo','PAC_AFO-AFO-VG');
  if(a1&&vg?.theoryDone){
   a1.imaPriorLearning={status:'APROVEITAMENTO_CONCEITUAL',source:'Pacelli — visão geral concluída, 37 questões (26 acertos)',instruction:'Não reassistir a introdução já dominada; conferir apenas recortes exclusivos do BizurAFO M01.'};
  }
  const am3=unit(st,'afo','IMA-AFO-M03'),pri=sessions(st,'afo','PAC_AFO-AFO-PRI');
  if(am3&&mins(pri)>0)am3.imaPriorLearning={status:'APROVEITAMENTO_PARCIAL',theoryMinutes:mins(pri),source:'Pacelli — princípios orçamentários',instruction:'Retomar pontos pendentes, não marcar o módulo inteiro como concluído.'};
  // Os aliases Cebraspe recebem crédito apenas das unidades explicitamente concluídas.
  for(const [oldId,newId] of [['dcon-u-1','NELMA-DCON-01'],['dcon-u-4','NELMA-DCON-03']]){
   const src=unit(st,'dcon',oldId),dst=unit(st,'dcon',newId);
   if(src?.theoryDone&&dst){dst.theoryDone=true;dst.theoryDate=dst.theoryDate||src.theoryDate||'';dst.batteryDone=dst.batteryDone||!!src.batteryDone;
    dst.imaPriorLearning={status:'CONCLUIDO_NO_HISTORICO',source:oldId,notes:'Conclusão anterior comprovada no próprio backup, sem sessão duplicada.'};}
  }
  st.imaProgressAudit={
    version:IMA_PROGRESS_VERSION,source:'Backup local Camile e sessões vinculadas',completionPolicy:'Concluído apenas por flag explícita ou evidência forte de aula + questões',
    notes:['Acentuação aproveitada com sessões/questões','Art. 5º tem divergência contador 6 × títulos de blocos posteriores','AP-01 não equivale à AP-05','Pacelli não libera automaticamente BizurAFO','DAD Thallius e Licitações sem sessões anteriores'],
    sessionsAtMigration:(st.sessions||[]).length
  };
 }

 // Segunda reconciliação: confirmação direta do progresso real após auditoria
 // de backups de 05/10, 20/10, 06/11 e branches históricas do GitHub.
 // Esses backups iniciais contêm 0 sessões e NÃO refutam a confirmação atual.
 const verified=st.imaUserVerified||{};
 if(verified.version!==IMA_VERIFIED_STUDY_VERSION){
   const confirmedDate='2026-11-07';
   const narrative='Confirmação explícita recebida em 07/11/2026; data exata de cada conclusão não fornecida. Não gerar sessão, hora ou questão.';
   for(let k=1;k<=8;k++){
     const u=unit(st,'port','port-u-'+k);
     if(!u)continue;
     const original={theoryDone:!!u.theoryDone,theoryDate:u.theoryDate||'',batteryDone:!!u.batteryDone};
     u.theoryDone=true;
     // A informação "até a aula 8" refere-se à teoria. Não marcar questões Tec sem registro.
     u.imaPriorLearning={...(u.imaPriorLearning||{}),status:'TEORIA_CONCLUIDA_POR_CONFIRMACAO',
       source:'Confirmação direta da Camile comunicada pelo usuário',
       confirmedOn:confirmedDate,original,note:narrative,
       instruction:'Não repetir a teoria desta aula. Fazer questões da FURB/TEC e revisões; manter dados históricos.'};
     u.imaCompletionSource='CONFIRMACAO_USUARIO_2026_11_07';
     u.imaCompletionVerifiedAt=confirmedDate;
   }
   const dcon1=unit(st,'dcon','NELMA-DCON-01');
   const legacy1=unit(st,'dcon','dcon-u-1');
   for(const u of [dcon1,legacy1].filter(Boolean)){
     u.theoryDone=true;
     u.imaCompletionSource=u.imaCompletionSource||'BACKUP_2026_11_06_E_USUARIO';
     u.imaCompletionVerifiedAt=confirmedDate;
   }
   const a4=unit(st,'dcon','dcon-u-2')||unit(st,'dcon','ESTRATEGIA-DCON-04');
   if(a4){
     a4.imaHistoricalProgressSnapshot={blocksCompleted:a4.blocksCompleted||0,
       theoryDone:!!a4.theoryDone,exerciseVideoDone:!!a4.exerciseVideoDone};
     // Aula 04 do Estratégia: 24 vídeos de teoria + VA25 de exercícios.
     a4.totalBlocks=24;
     a4.blocksCompleted=24;
     a4.exerciseVideoRequired=true;
     a4.exerciseVideoDone=true;
     a4.theoryDone=true;
     a4.imaCompletionSource='CONFIRMACAO_USUARIO_2026_11_07';
     a4.imaCompletionVerifiedAt=confirmedDate;
     a4.imaPriorLearning={status:'TEORIA_24_VIDEOS_E_EXERCICIOS_VA25_CONCLUIDOS',
       source:'Confirmação direta, corroborada pela progressão de sessões até 28/10',
       confirmedOn:confirmedDate,notes:'25 videoaulas concluídas (24 teóricas e VA25 exercícios); bateria TEC separada não comprovada',
       instruction:'NÃO estudar A04 novamente. Começar imediatamente Estratégia A05, bloco 1 de 8.'};
   }
   const a5=unit(st,'dcon','ESTRATEGIA-DCON-05');
   if(a5){
     const hadSessions=sessions(st,'dcon','ESTRATEGIA-DCON-05').length;
     if(!hadSessions){
       a5.theoryDone=false;
       a5.blocksCompleted=0;
       a5.completedBlocks=[];
       a5.imaPriorLearning={status:'NAO_INICIADA',source:'Confirmação direta',
         instruction:'Primeira aula a iniciar: Estratégia A05 Remédios Constitucionais, BLOCO 01 de 08.'};
     }
   }
   // O backup de 06/11 marca Cebraspe A03 indevidamente como concluída;
   // manter o fato da marcação original em trilha de auditoria e corrigir o estado ATUAL.
   for(const id of ['NELMA-DCON-03','dcon-u-4']){
     const u=unit(st,'dcon',id);
     if(!u)continue;
     const newer=sessions(st,'dcon',id).some(x=>x.date>confirmedDate);
     if(!newer){
       u.imaHistoricalFlagBeforeCorrection={theoryDone:!!u.theoryDone,
         batteryDone:!!u.batteryDone,theoryDate:u.theoryDate||'',source:'backup 06/11, sem sessão de Cebraspe A03'};
       u.theoryDone=false;
       u.batteryDone=false;
       u.theoryDate='';
       u.imaPriorLearning={status:'PENDENTE_CONFIRMACAO_ATUAL',source:'Confirmação direta do usuário, 07/11/2026',
         instruction:'Apenas A01 do curso Cebraspe confirmada. A03 deve ficar na rota após A05 e A02; marcação anterior conservada como evidência, sem dispensar teoria.'};
     }
   }
   const apu1=unit(st,'adm-publica','MARC_ADM-ADM-AP-01');
   if(apu1){
     const rows=sessions(st,'adm-publica','MARC_ADM-ADM-AP-01');
     apu1.imaPriorLearning={status:'EM_ANDAMENTO_PONTO_NAO_CONFIRMADO',source:'Backup 06/11',
       theoryMinutes:mins(rows.filter(x=>x.activity==='theory')),
       recordedFirstBlock:'Conclui o bloco 1/3 (nota de 22/10)',
       instruction:'Já estudou Administração Pública na CGU, mas não há evidência de conclusão do curso inteiro. Não recomeçar AP-01; confirmar blocos 2/3 e 3/3 caso precise retornar a ela. APU do IMA: AP-05 ainda pendente.'};
   }
   st.imaUserVerified={version:IMA_VERIFIED_STUDY_VERSION,confirmedOn:confirmedDate,
     source:'Relato direto do progresso atualizado, confrontado com backups do Drive 05/10 e 20/10, backup JSON 06/11 e versões históricas do GitHub',
     rules:'Aulas confirmadas recebem teoriaDone, sem horas artificiais. Baterias Tec não se presumem. Retificações históricas ficam rastreáveis.',
     portCompletedThrough:8,dconCebraspeCompleted:['NELMA-DCON-01'],
     estrategiaA04CompletedVideos:25,estrategiaA05NextBlock:1,
     apuLastConfirmed:'AP-01: 140 minutos; bloco 1/3 registrado; demais blocos sem comprovação'};
 }
 if(!st.imaGoals||st.imaGoals.version!==IMA_GOALS_VERSION){
   st.imaGoals={...(st.imaGoals||{}),version:IMA_GOALS_VERSION,start:IMA_META_START,weeklyCycleMinutes:1800,lawExtraMinutes:210,
    rule:'Metas independentes da CGU; período sábado–sexta; progresso por sessões reais das nove disciplinas IMA; não contar lei seca no ciclo'};
 }
 return st;
}
const pad=x=>String(x).padStart(2,'0');
function offsetDate(iso,offset){
 const a=iso.split('-').map(Number);const d=new Date(Date.UTC(a[0],a[1]-1,a[2]+offset));
 return d.getUTCFullYear()+'-'+pad(d.getUTCMonth()+1)+'-'+pad(d.getUTCDate());
}
export function imaGoalWeek(index){
 if(!Number.isInteger(index)||index<0||index>=IMA_META_WEEKS)throw Error('Meta fora do período');
 return {index,number:index+1,start:offsetDate(IMA_META_START,7*index),end:offsetDate(IMA_META_START,7*index+6)};
}
export function imaCurrentGoalIndex(iso=IMA_META_START){
 const diff=(Date.parse(iso+'T00:00:00Z')-Date.parse(IMA_META_START+'T00:00:00Z'))/86400000;
 return Math.min(IMA_META_WEEKS-1,Math.max(0,Math.floor(diff/7)));
}
const conciseTitle=u=>u?.title||'Roteiro de aula pendente de atualização';
const status=u=>u?.theoryDone?'Teoria concluída; verificar questões':'Teoria pendente / em andamento';
export function imaNextLessons(st,sid){
 const unitIds=seq[sid]||[],found=unitIds.map(id=>unit(st,sid,id)).filter(Boolean);
 return found.filter(u=>!u.theoryDone&&!u.hiddenFromRoute).slice(0,2).map(u=>({id:u.id,title:conciseTitle(u),state:status(u),history:u.imaPriorLearning?.status||''}));
}
export function imaMetaSnapshot(st,index=imaCurrentGoalIndex(new Date().toISOString().slice(0,10))){
 const week=imaGoalWeek(index),gate=imaLicitationStatus(st),targets=imaWeeklyMinutesFor(st),actual={};
 for(const sid of ids)actual[sid]=0;
 for(const r of st.sessions||[]){
  if(!counted(r)||r.date<week.start||r.date>week.end||!ids.includes(r.subjectId))continue;
  actual[r.subjectId]=(actual[r.subjectId]||0)+Number(r.minutes||0);
 }
 const cycleMinutes=Object.values(actual).reduce((a,b)=>a+b,0),lawMinutes=(st.legislation?.sessions||[]).filter(x=>x.date>=week.start&&x.date<=week.end).reduce((a,x)=>a+Number(x.minutes||0),0);
 const rows=ids.map(sid=>({id:sid,target:targets[sid]||0,actual:actual[sid]||0,lessons:imaNextLessons(st,sid),locked:sid==='licita-ima'&&!gate.unlocked}));
 const ready=cycleMinutes>=1800&&rows.every(x=>x.locked||x.actual>=x.target);
 const notes=index===0?[
  'PORT: Marcello Giulian A01–A08 CONCLUÍDAS por confirmação direta. Iniciar A09 (Colocação Pronominal); questões da FURB no TEC e revisão dos erros, sem repetir teoria anterior.',
  'DCON: Nelma Cebraspe A01 concluída. Estratégia A04 art. 5º COMPLETA (24 aulas teóricas e VA25 de exercícios). Começar A05 Remédios Constitucionais BLOCO 01/08. Depois retomar Cebraspe A02 (questões/consolidação) e A03, não presumir A03 concluída.',
  'DAD: Thallius Pasta 02 em diante; caminho 02–08; Licitações permanece bloqueada até fechar a 08.',
  'APU: Marcelo AP-01 possui 140min de estudo e anotação de conclusão somente do bloco 1/3. AP-05 Transparência e Accountability (conteúdo do IMA) ainda precisa ser estudada; não duplicar os temas fora do edital.',
  'AFO: Pacelli VG concluída; princípios iniciados. No BizurAFO, priorizar recortes não vistos e questões; nenhum módulo completo foi presumido.',
  'RL, TI e Ambiental: iniciar aulas específicas do IMA; estudo antigo de Hardware e Software não substitui TI/IA.'
 ]:[
  'Continuidade: as duas aulas pendentes exibidas para cada disciplina refletem o progresso registrado no momento da consulta.',
  'Preservar estudo anterior e fazer questões na FURB/TEC; não repetir conteúdos já concluídos.',
  'Licitações só entra após concluir as Pastas 02–08 do Thallius.'
 ];
 return {...week,phase:gate.unlocked?'FASE_2':'FASE_1',rows,cycleMinutes,lawMinutes,overallMinutes:cycleMinutes+lawMinutes,target:1800,ready,notes};
}
export function mergeCamileBackupSafely(current,incoming){
 const src=incoming?.state||incoming;
 if(src?.version!==1||!Array.isArray(src?.subjects)||!Array.isArray(src?.sessions))throw Error('Arquivo de backup Método ET inválido.');
 const st=copy(current),seen=new Set((st.sessions||[]).map(x=>x.id));
 for(const r of src.sessions){if(typeof r.id==='string'&&!seen.has(r.id)){st.sessions.push(copy(r));seen.add(r.id);}}
 const subjIds=new Map((st.subjects||[]).map(x=>[x.id,x]));
 for(const remote of src.subjects){
  const local=subjIds.get(remote.id);
  if(!local){st.subjects.push(copy(remote));subjIds.set(remote.id,st.subjects.at(-1));continue;}
  local.checkpoints=local.checkpoints||{};
  for(const [k,v] of Object.entries(remote.checkpoints||{}))if(!(k in local.checkpoints))local.checkpoints[k]=copy(v);
  local.notebooks=Array.isArray(local.notebooks)?local.notebooks:[];
  const notebookIds=new Set(local.notebooks.map(x=>x.id));
  for(const n of remote.notebooks||[])if(!notebookIds.has(n.id)){local.notebooks.push(copy(n));notebookIds.add(n.id);}
  if(remote.andresanComplete)local.andresanComplete=true;
  const units=new Map((local.units||[]).map(x=>[x.id,x]));
  for(const prior of remote.units||[]){
   const cur=units.get(prior.id);
   if(!cur){local.units.push(copy(prior));units.set(prior.id,local.units.at(-1));continue;}
   for(const flag of ['theoryDone','batteryDone','generalDone','materialReady']){
     const isDconA03=remote.id==='dcon'&&['NELMA-DCON-03','dcon-u-4'].includes(prior.id);
     const protectedA03=isDconA03&&st.imaUserVerified?.version===IMA_VERIFIED_STUDY_VERSION;
     if(prior[flag]&&!(protectedA03&&['theoryDone','batteryDone'].includes(flag)))cur[flag]=true;
   }
   // Conservar metadados de vídeo e curso quando o catálogo local ainda não os possui.
   for(const k of ['source','course','courseLabel','lessonNumber','sourceURL','completedBlocks',
     'totalBlocks','blockTitles','parts','historicalNote','imaPriorLearning','studyPlan']){
    if(cur[k]===undefined&&prior[k]!==undefined)cur[k]=copy(prior[k]);
   }
   if(!cur.theoryDate&&prior.theoryDate)cur.theoryDate=prior.theoryDate;
   for(const flag of ['battery','general']){
     const p=prior[flag]||{},c=cur[flag]||{};
     if(Number(p.attempted||0)>Number(c.attempted||0))cur[flag]={attempted:p.attempted,correct:p.correct};
   }
   if(typeof prior.blocksCompleted==='number')cur.blocksCompleted=Math.max(Number(cur.blocksCompleted||0),prior.blocksCompleted);
   for(const k of ['legacy','marks']){
    const prev=cur[k]||[],stored=new Set(prev.map(x=>JSON.stringify(x)));
    for(const x of prior[k]||[])if(!stored.has(JSON.stringify(x))){prev.push(copy(x));stored.add(JSON.stringify(x));}
    cur[k]=prev;
   }
  }
 }
 if(!st.legislation&&src.legislation)st.legislation=copy(src.legislation);
 else if(st.legislation&&src.legislation){
  const seenL=new Set((st.legislation.sessions||[]).map(x=>x.id));
  for(const r of src.legislation.sessions||[])if(r.id&&!seenL.has(r.id)){st.legislation.sessions.push(copy(r));seenL.add(r.id);}
 }
 if(!st.goals&&src.goals)st.goals=copy(src.goals);
 if(!st.imaProfile&&src.imaProfile)st.imaProfile=copy(src.imaProfile);
 if(!st.imaUserVerified&&src.imaUserVerified)st.imaUserVerified=copy(src.imaUserVerified);
 if(!st.cguCheck&&src.cguCheck)st.cguCheck=copy(src.cguCheck);
 if(!st.bizurafo&&src.bizurafo)st.bizurafo=copy(src.bizurafo);
 st.achievementsSeen=[...new Set([...(st.achievementsSeen||[]),...(src.achievementsSeen||[])])];
 st.reminders=Array.isArray(st.reminders)?st.reminders:[];
 const reminderIds=new Set(st.reminders.map(x=>x.id));
 for(const r of src.reminders||[])if(!reminderIds.has(r.id)){st.reminders.push(copy(r));reminderIds.add(r.id);}
 st.goalArchive=Array.isArray(st.goalArchive)?st.goalArchive:[];
 const archiveKeys=new Set(st.goalArchive.map(x=>JSON.stringify([x.version,x.savedAt])));
 for(const a of src.goalArchive||[]){
   const key=JSON.stringify([a.version,a.savedAt]);
   if(!archiveKeys.has(key)){st.goalArchive.push(copy(a));archiveKeys.add(key);}
 }

 st.camileMergeAudit={source:'Backup importado manualmente',sessionsAdded:st.sessions.length-(current.sessions||[]).length,mode:'MERGE_ONLY',notes:'Sessões e histórico local preservados; nenhuma sessão substituída'};
 return st;
}
