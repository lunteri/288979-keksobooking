'use strict';
(function () {
  var DEBOUNCE_INTERVAL = 500;

  var lastTimeout;
  function debounce(fun) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(fun, DEBOUNCE_INTERVAL);
  }
  window.debounce = debounce;
})();
