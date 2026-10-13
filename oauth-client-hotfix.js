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


  const CORRECT_CLIENT_ID = '242070309786-1rn9vsc4fo0coaq3e3mptrlf1m9f0kt3.apps.googleusercontent.com';
  let patched = false;

  function patchGoogleIdentity() {
    if (patched) return true;
    const oauth2 = window.google?.accounts?.oauth2;
    if (!oauth2 || typeof oauth2.initTokenClient !== 'function') return false;

    const originalInitTokenClient = oauth2.initTokenClient.bind(oauth2);
    oauth2.initTokenClient = options => originalInitTokenClient({
      ...(options || {}),
      client_id: CORRECT_CLIENT_ID
    });

    patched = true;
    window.__METODO_ET_GOOGLE_CLIENT_ID_FIXED__ = true;
    return true;
  }

  patchGoogleIdentity();

  document.addEventListener('load', event => {
    const target = event.target;
    if (!(target instanceof HTMLScriptElement)) return;
    if (!String(target.src || '').includes('accounts.google.com/gsi/client')) return;
    patchGoogleIdentity();
  }, true);
})();
