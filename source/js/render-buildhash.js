(function() {
  var hash = window.BUILD_COMMIT || '';
  if (!hash) return;
  var footer = document.querySelector('footer');
  if (!footer) return;
  var span = document.createElement('span');
  span.className = 'footer-customize-slot my-1';
  span.textContent = '<font size=2rem>BUILD</font> ' + hash;
  footer.appendChild(span);
})();