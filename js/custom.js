window.addEventListener('load', function () {
  var v = document.getElementById('bg-video');
  if (v) v.style.transition = 'filter 0.4s ease';
});

// 点击内链时淡出当前页面，掩盖 backdrop-filter GPU 层重排导致的白闪
document.addEventListener('click', function (e) {
  var a = e.target.closest('a[href]');
  if (!a || !a.href || a.target === '_blank' || e.ctrlKey || e.metaKey || e.shiftKey) return;
  var href = a.href;
  try {
    var u = new URL(href);
    if (u.origin !== location.origin) return;
    // 锚点跳转不拦截
    if (u.pathname === location.pathname && u.hash) return;
  } catch (ex) { return; }
  e.preventDefault();
  document.documentElement.style.transition = 'opacity 0.22s ease';
  document.documentElement.style.opacity = '0';
  setTimeout(function () { location.href = href; }, 220);
});
