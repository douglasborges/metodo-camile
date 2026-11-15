/**
 * Progresso histórico IMA-SC da Camile, confirmado em 07/11/2026.
 * Fontes: confirmação explícita + relatório de auditoria do Google Drive
 * (backup de 06/11). Os backups iniciais 05/10 e 20/10 estão zerados.
 *
 * Não cria sessões, notas, datas individuais nem conclusão de outras aulas.
 */
export const VERIFIED_PROGRESS_VERSION='camile-historico-20261115-v1';
export function preserveVerifiedCamileProgress(st){
 const get=(sid,uid)=>st.subjects.find(s=>s.id===sid)?.units.find(u=>u.id===uid);
 const source='CONFIRMACAO_DIRETA_USUARIO_2026_11_07';
 for(let n=1;n<=8;n++){
  const u=get('port','port-u-'+n);if(!u)continue;
  u.theoryDone=true;
  u.imaCompletionSource=u.imaCompletionSource||source;
  u.imaCompletionVerifiedAt=u.imaCompletionVerifiedAt||'2026-11-07';
  if(typeof u.studiedTopic!=='string')u.studiedTopic='';
 }
 const nelma=get('dcon','NELMA-DCON-01');
 if(nelma){nelma.theoryDone=true;nelma.imaCompletionSource=nelma.imaCompletionSource||source;}
 const a04=get('dcon','dcon-u-2');
 if(a04){
  a04.theoryDone=true;
  a04.parts=(a04.parts||[]).map(p=>({...p,done:true}));
  a04.blocksCompleted=24;a04.exerciseVideoDone=true;
  a04.imaCompletionSource=a04.imaCompletionSource||source;
  a04.imaCompletionVerifiedAt=a04.imaCompletionVerifiedAt||'2026-11-07';
 }
 const ap01=get('adm-publica','MARC_ADM-ADM-AP-01');
 if(ap01){
  ap01.historicalStudy={
   status:'ESTUDADO_PARCIALMENTE',teacher:'Marcelo Soares',
   course:'Faixa Preta — Administração Pública',durationMinutes:140,
   sessionsReported:2,completedBlocks:1,totalBlocks:3,
   note:'Somente bloco 1/3 confirmado. Blocos restantes sem comprovação; não repetir o trecho estudado.',
   source:'Auditoria do Drive sobre backup 06/11/2026'
  };
 }
 st.imaProgressReadout={
  version:VERIFIED_PROGRESS_VERSION,portConfirmedThrough:8,
  nelmaCebraspeConfirmed:['NELMA-DCON-01'],
  estrategiaA04ConfirmedVideos:25,apuAP01PartialMinutes:140,
  apuAP01CompletedBlocks:1,apuAP01TotalBlocks:3,
  confirmationDate:'2026-11-07',
  auditDocumentUrl:'https://docs.google.com/document/d/1iaxIaa1XGuGNntCJUVBrRPGAI6sE6WZPz3-D0zuyymw/edit',
  disclaimer:'Não gerar sessões, horas de ciclo, datas de aula ou conclusões de temas ainda não confirmados.'
 };
 return st;
}
