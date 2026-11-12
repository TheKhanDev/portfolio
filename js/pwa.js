/* ============================================================
   pwa.js — PWA registration, install prompt, offline detection
   ============================================================ */

(function () {
  'use strict';

  /* ---------- Feature & Protocol Detection ---------- */
  const isStandalone =
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true;

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  
  // CRITICAL FIX: Do not run PWA logic on file:/// (prevents CORS errors)
  const isLocalFile = location.protocol === 'file:';

  let deferredPrompt = null;

  /* ---------- Register Service Worker ---------- */
  if ('serviceWorker' in navigator && !isLocalFile) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js', { scope: './' })
        .then(reg => {
          reg.addEventListener('updatefound', () => {
            const newSW = reg.installing;
            if (!newSW) return;
            newSW.addEventListener('statechange', () => {
              if (newSW.state === 'installed' && navigator.serviceWorker.controller) {
                showUpdateBanner();
              }
            });
          });
        })
        .catch(err => console.warn('[PWA] SW registration failed:', err));
    });
  } else if (isLocalFile) {
    console.log('[PWA] Ignoring PWA setup because the site is running on file:///. Use a local server.');
  }

  /* ---------- Install Prompt Elements ---------- */
  const installBtn = document.getElementById('installApp');
  const installBtnLabel = document.getElementById('installAppLabel');

  function showInstallBtn() {
    if (!installBtn || isStandalone || isLocalFile) return;
    installBtn.hidden = false;
    installBtn.classList.add('visible');
  }

  function hideInstallBtn() {
    if (!installBtn) return;
    installBtn.classList.remove('visible');
    installBtn.hidden = true;
  }

  /* ---------- Android / Desktop Install Logic ---------- */
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    showInstallBtn();
  });

  installBtn?.addEventListener('click', async () => {
    if (deferredPrompt) {
      try {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          hideInstallBtn();
          if (window.showToast) window.showToast('App installed successfully! 🎉', 'success');
        }
        deferredPrompt = null;
      } catch (err) {
        console.warn('[PWA] Install failed:', err);
      }
    } else if (isIOS) {
      if (window.showToast) window.showToast('Tap the Share button → "Add to Home Screen"', 'success', 6000);
    }
  });

  window.addEventListener('appinstalled', () => {
    hideInstallBtn();
    deferredPrompt = null;
    if (window.showToast) window.showToast('App installed! Launch from your home screen.', 'success');
  });

  /* ---------- iOS Safari Prompt ---------- */
  if (isIOS && !isStandalone && installBtn && !isLocalFile) {
    installBtn.hidden = false;
    installBtn.classList.add('visible');
    if (installBtnLabel) installBtnLabel.textContent = 'Add to Home';
  }

  /* ---------- Update Banner ---------- */
  function showUpdateBanner() {
    const banner = document.getElementById('pwaUpdate');
    if (!banner) return;
    banner.classList.add('visible');
    
    banner.querySelector('[data-update-reload]')?.addEventListener('click', () => {
      navigator.serviceWorker.controller?.postMessage('SKIP_WAITING');
      setTimeout(() => location.reload(), 100);
    });
    
    banner.querySelector('[data-update-dismiss]')?.addEventListener('click', () => {
      banner.classList.remove('visible');
    });
  }

  /* ---------- Online / Offline Badge ---------- */
  const offlineBadge = document.getElementById('offlineBadge');

  function updateOnlineStatus() {
    if (!offlineBadge) return;
    if (navigator.onLine) {
      offlineBadge.classList.remove('visible');
    } else {
      offlineBadge.classList.add('visible');
    }
  }
  
  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
  updateOnlineStatus();

  /* ---------- Desktop Delayed Prompt ---------- */
  if (window.matchMedia('(min-width: 1024px) and (hover: hover)').matches && !isStandalone && !isLocalFile) {
    setTimeout(() => {
      if (deferredPrompt) showInstallBtn();
    }, 8000);
  }

})();