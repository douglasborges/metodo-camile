import {veonProgress,veonQuestionTarget,VEON_INFO_URL,VEON_RFB_URL} from './veon-info-dados-20261104.js';
const pt=n=>Number(n||0).toLocaleString('pt-BR');
function listCard(u,sid,esc){
 const done=u.parts.filter(p=>p.done).length,total=u.parts.length,finished=done===total;
 const partRows=u.parts.map(p=>'<div class="row" style="padding:7px 0;gap:10px;border-top:1px solid var(--line, #ddd)">'+
  '<div style="flex:1"><b>'+esc(p.title)+'</b><small style="display:block">'+(p.done?'Concluída'+(p.completedOn?' em '+esc(p.completedOn.split('-').reverse().join('/')):''):'A estudar')+'</small></div>'+
  '<button class="secondary small" data-action="veon-lesson" data-sid="'+esc(sid)+'" data-uid="'+esc(u.id)+'" data-pid="'+esc(p.id)+'">'+
  (p.done?'Registrar revisão':'Estudar / registrar')+'</button></div>').join('');
 return '<details class="card" style="margin:12px 0;padding:14px"><summary style="cursor:pointer"><b>'+esc(u.title)+
  '</b> <span class="badge">'+pt(done)+'/'+pt(total)+' aulas</span> <small>'+esc(u.priority||'')+' · PDF pág. '+pt(u.sourcePage)+'</small></summary>'+
  '<p class="muted">'+esc(u.guidance||'')+'</p>'+
  (u.questionOnly?'<p>Questões em paralelo: registre o tempo real e os acertos quando houver. Estes vídeos não bloqueiam a fase.</p>':
  '<p>Meta de bateria da unidade: <b>'+veonQuestionTarget(u)+' questões</b> após a teoria. Registradas: '+pt(u.battery?.attempted)+
  '. '+(u.batteryDone?'Bateria concluída.':'Bateria ainda não concluída.')+'</p>')+
  '<p style="font-size:12px">Curso: <a href="'+esc(u.sourceURL)+'" target="_blank" rel="noopener noreferrer">Abrir VEON</a>. Cada aula abaixo corresponde ao número mostrado no PDF; títulos individuais não foram fornecidos.</p>'+
  partRows+'</details>';
}
export function veonSubjectPanel(s,esc){
 const p=veonProgress(s),isBase=s.id==='info',
  reserved=p.all.filter(u=>!u.questionOnly&&u.hiddenFromRoute),
  main=p.main,question=p.questionGroup;
 const completedMain=main.filter(u=>u.theoryDone).length,
  old=(s.units||[]).filter(u=>u.originalStudyRoutePreserved);
 const header=isBase?
  '<p><b>Fase 1 — base para prefeituras, câmaras, administrativos e policiais.</b> Estudar 131 aulas essenciais e 8 de ponte para Dados. As 83 restantes permanecem em reserva/sob edital, sem bloquear progresso.</p>'+
  '<p><b>Primeira volta:</b> hardware → Windows 11 → Word/Excel 365 → LibreOffice 7 → redes e internet → e-mail → segurança/LGPD → Linux → nuvem e Google Workspace → cinco aulas de banco de dados → noções de BI/análise/Big Data.</p>':
  '<p><b>Fase 2 — TI/Dados (curso RFB):</b> 37 aulas teóricas em 12 módulos; 20 videoaulas de questões durante o percurso. A RFB não substitui Windows, Office ou LibreOffice.</p>'+
  '<p><b>Pré-requisito recomendado:</b> fundamentos, planilhas, internet, segurança e a ponte Banco de Dados da Fase 1. Não exige concluir todas as reservas. SQL, ETL e estatística mais profunda podem requerer curso específico para TCU.</p>';
 const counts='<div class="grid metrics four">'+
  '<div class="card metric"><small>TEORIA PRIORIZADA</small><strong>'+pt(p.requiredVideos)+'</strong><span class="sub">videoaulas</span></div>'+
  '<div class="card metric"><small>VIDEOAULAS CONCLUÍDAS</small><strong>'+pt(p.requiredDone)+'</strong><span class="sub">da rota principal</span></div>'+
  '<div class="card metric"><small>MÓDULOS CONCLUÍDOS</small><strong>'+completedMain+'/'+main.length+'</strong></div>'+
  '<div class="card metric"><small>QUESTÕES EM VÍDEO</small><strong>'+question.parts.filter(x=>x.done).length+'/'+question.parts.length+'</strong></div></div>';
 const links='<p><a href="'+(isBase?VEON_INFO_URL:VEON_RFB_URL)+'" target="_blank" rel="noopener noreferrer">Abrir curso original VEON</a>'+
  (isBase?' · <button class="secondary small" data-select="dados-rodrigo">Ir para Fase 2 — Dados</button>':
  ' · <button class="secondary small" data-select="info">Voltar à Fase 1</button>')+'</p>';
 return '<section class="card section-title"><span class="eyebrow">PLANEJAMENTO VEON · RODRIGO SCHAEFFER · 04/11/2026</span><h2>'+esc(s.course)+'</h2>'+
  header+'<p><b>Próxima unidade recomendada:</b> '+esc(p.next?.title||'Teoria priorizada concluída. Reforçar questões e revisões.')+'</p>'+
  '<p><b>Regra do Método ET:</b> registrar horas/minutos reais, praticar, revisar em 24h e em 7 dias, resolver baterias por módulo e consolidar erros. Não há conclusão automática por visita à página.</p>'+links+'</section>'+
  counts+'<section class="section-title"><h2>Roteiro principal — ordem recomendada</h2><p class="muted">Somente unidades obrigatórias e ponte nesta lista; leia o módulo e registre cada videoaula estudada. O progresso individual é preservado.</p>'+
  main.map(u=>listCard(u,s.id,esc)).join('')+'</section>'+
  '<section class="section-title"><h2>Questões comentadas — ao longo da teoria</h2><p class="muted">Assistir às resoluções conforme os tópicos já vistos, não esperar terminar todos os módulos.</p>'+
  (question?listCard(question,s.id,esc):'')+'</section>'+
  (isBase?'<section class="section-title"><details class="card" style="padding:16px"><summary><b>83 videoaulas sob edital / reserva — NÃO estudar na primeira volta</b></summary>'+
   '<p>Estudar apenas se edital específico exigir, ou se questões identificarem lacuna: Office 2019, Windows 10, Firefox/Edge, tecnologias legadas, moedas virtuais, IoT, IA adicional e temas especiais.</p>'+
   reserved.map(u=>listCard(u,s.id,esc)).join('')+'</details>'+
   (old.length?'<details class="card" style="padding:16px;margin-top:12px"><summary>Arquivo anterior preservado ('+old.length+' unidades)</summary>'+
    '<p class="muted">As unidades antigas e seus registros não foram excluídos, mas não bloqueiam a nova rota. Seus IDs e sessões permanecem no backup.</p>'+
    old.map(u=>'<p>'+esc(u.title)+'</p>').join('')+'</details>':'')+'</section>':'');
}
