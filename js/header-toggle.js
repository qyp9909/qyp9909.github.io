(function () {
  function init() {
    if (!document.getElementById('recent-posts')) return;
    var header = document.getElementById('page-header');
    var title  = document.getElementById('site-title');
    if (!header || !title) return;

    // Avoid double-wrapping on PJAX re-init
    if (title.querySelector('#site-title-btn')) return;

    var span = document.createElement('span');
    span.id = 'site-title-btn';
    while (title.firstChild) {
      span.appendChild(title.firstChild);
    }
    title.appendChild(span);

    span.addEventListener('click', function () {
      header.classList.toggle('header-expanded');
    });
  }

  document.addEventListener('DOMContentLoaded', init);
  document.addEventListener('pjax:complete', init);
})();
