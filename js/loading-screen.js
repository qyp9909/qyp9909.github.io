(function () {
  var overlay = document.getElementById('wls-overlay');
  if (!overlay) return;

  var fill  = document.getElementById('wls-fill');
  var pctEl = document.getElementById('wls-pct');
  var progress = 0;
  var finished = false;
  var startTime = Date.now();
  var MIN_DURATION = 2000;

  function setProgress(v) {
    v = Math.min(100, Math.max(0, Math.round(v)));
    if (fill) fill.style.width = v + '%';
    if (pctEl) pctEl.textContent = v;
  }

  var simTimer = setInterval(function () {
    if (finished) return;
    progress += Math.random() * 9 + 2;
    if (progress > 88) progress = 88;
    setProgress(progress);
  }, 190);

  function doFinish() {
    finished = true;
    clearInterval(simTimer);
    function rush() {
      progress += 5;
      if (progress >= 100) {
        setProgress(100);
        setTimeout(unlock, 360);
        return;
      }
      setProgress(progress);
      requestAnimationFrame(rush);
    }
    requestAnimationFrame(rush);
  }

  function finish() {
    if (finished) return;
    var elapsed = Date.now() - startTime;
    var remaining = MIN_DURATION - elapsed;
    if (remaining > 0) {
      setTimeout(doFinish, remaining);
    } else {
      doFinish();
    }
  }

  function unlock() {
    overlay.classList.add('wls-unlock');
    overlay.addEventListener('transitionend', function () {
      overlay.style.display = 'none';
      sessionStorage.setItem('wls-done', '1');
    }, { once: true });
  }

  window.addEventListener('load', finish);
  setTimeout(finish, 7000);
})();
