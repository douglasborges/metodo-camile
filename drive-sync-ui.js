(() => {
  'use strict';

  // PWA self-heal: if this script updates before a stale Home Screen shell, reload the shell too.
  async function ensureLatestInstalledBuild() {
    try {
      const pageBuild = document.querySelector('meta[name="metodo-et-build"]')?.content || '';
      const response = await fetch('./version.json?t=' + Date.now(), { cache: 'no-store' });
      if (!response.ok) return;
      const latest = String((await response.json())?.build || '');
      if (!latest || pageBuild === latest) return;
      const attemptKey = 'metodo-et:script-update-attempt:' + latest;
      if (sessionStorage.getItem(attemptKey)) return;
      sessionStorage.setItem(attemptKey, '1');
      if ('serviceWorker' in navigator) {
        const regs = await navigator.serviceWorker.getRegistrations();
        await Promise.all(regs.filter(reg => reg.scope.includes('/metodo-camile/')).map(reg => reg.unregister()));
      }
      if ('caches' in window) {
        const keys = await caches.keys();
        await Promise.all(keys.filter(key => key.startsWith('studyos-metodo-et-')).map(key => caches.delete(key)));
      }
      const url = new URL(location.href);
      url.searchParams.set('build', latest);
      url.searchParams.set('refresh', Date.now().toString());
      location.replace(url.toString());
    } catch {}
  }
  window.addEventListener('pageshow', ensureLatestInstalledBuild, { once: true });

  const META_KEY='metodo-et-camile-drive-sync-meta-v1';
  let open=false,manage=null,panel=null,lastRaw='';

  function meta(){
    try{return JSON.parse(localStorage.getItem(META_KEY)||'{}')||{};}catch{return {};}
  }
  function fmt(value){
    if(!value)return 'Ainda não sincronizado nesta instalação.';
    const d=new Date(value);
    return Number.isFinite(d.getTime())?d.toLocaleString('pt-BR',{day:'2-digit',month:'2-digit',year:'numeric',hour:'2-digit',minute:'2-digit'}):'Sincronização registrada.';
  }
  function esc(value){
    return String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }
  function render(){
    const raw=localStorage.getItem(META_KEY)||'{}';
    if(raw===lastRaw&&panel&&!open)return;
    lastRaw=raw;
    const m=meta(),status=document.querySelector('.drive-sync-floating');
    if(manage){
      manage.dataset.state=status?.dataset.state||'disconnected';
      manage.title=m.accountEmail?('Gerenciar Drive · '+m.accountEmail):'Gerenciar sincronização do Drive';
    }
    if(!panel)return;
    panel.hidden=!open;
    if(!open)return;
    const state=status?.dataset.state||'disconnected';
    const label=(status?.textContent||'Drive').replace('☁ ','');
    const detail=status?.title||'';
    const remoteUrl=m.remoteFileId?'https://drive.google.com/file/d/'+encodeURIComponent(m.remoteFileId)+'/view':'';
    panel.innerHTML=`<div class="drive-panel-head"><div><span class="drive-kicker">GOOGLE DRIVE</span><strong>${esc(m.accountName||'Método ET · Camile')}</strong><small>${esc(m.accountEmail||'Conta será identificada na próxima conexão.')}</small></div><button class="drive-close" type="button" data-drive-ui="close" aria-label="Fechar">×</button></div><div class="drive-panel-status"><span class="drive-state-dot" data-state="${esc(state)}"></span><div><b>${esc(label)}</b><small>${esc(detail)}</small></div></div><dl><div><dt>Última sincronização</dt><dd>${esc(fmt(m.lastSyncAt))}</dd></div><div><dt>Arquivo vivo</dt><dd>${remoteUrl?'<a href="'+esc(remoteUrl)+'" target="_blank" rel="noopener">Metodo ET - Camile - Dados.json ↗</a>':'Metodo ET - Camile - Dados.json'}</dd></div></dl><div class="drive-panel-actions"><button type="button" data-drive-ui="sync">Sincronizar agora</button><button type="button" class="secondary" data-drive-ui="switch">Trocar conta</button></div><p class="drive-panel-note">O JSON é o backup vivo da Camile. Após a primeira conexão, o link direto aparece aqui para facilitar auditoria e recuperação.</p>`;
  }
  function mount(){
    if(document.querySelector('.drive-sync-manage'))return;
    manage=document.createElement('button');
    manage.type='button';
    manage.className='drive-sync-manage';
    manage.textContent='⚙';
    manage.setAttribute('aria-label','Gerenciar sincronização do Google Drive');
    panel=document.createElement('section');
    panel.className='drive-sync-panel';
    panel.hidden=true;
    document.body.append(manage,panel);
    manage.addEventListener('click',()=>{open=!open;render();});
    panel.addEventListener('click',e=>{
      const action=e.target.closest?.('[data-drive-ui]')?.dataset.driveUi;
      if(!action)return;
      if(action==='close'){open=false;render();return;}
      if(action==='sync'){window.dispatchEvent(new CustomEvent('metodo-et-drive-sync-now'));return;}
      if(action==='switch'){open=false;render();window.dispatchEvent(new CustomEvent('metodo-et-drive-switch-account'));}
    });
    document.addEventListener('click',e=>{
      if(!open||panel.contains(e.target)||manage.contains(e.target))return;
      open=false;render();
    });
    render();
    setInterval(render,1000);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();