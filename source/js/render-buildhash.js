(function() {
  function renderBuild() {
    var hash = (window.BUILD_COMMIT || '').trim();
    if (!hash) return;
    var slot = document.querySelector('[data-footer-slot="left"]');
    if (!slot) return;
    slot.innerHTML = '<font size="2rem">BUILD</font> ' + hash;
  }
  renderBuild();
  document.addEventListener('swup:contentReplaced', renderBuild);
})();