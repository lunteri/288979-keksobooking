'use strict';

(function () {
  var TIMEOUT_SECONDS = 3000;
  var successBlock = document.querySelector('.success');

  function showError(message) {
    var errorBlock = document.createElement('div');
    errorBlock.style.width = '89%';
    errorBlock.style.height = '28px';
    errorBlock.style.position = 'fixed';
    errorBlock.style.background = '#fff';
    errorBlock.style.color = '#000';
    errorBlock.style.top = document.body.scrollTop + 'px';
    errorBlock.style.left = '0';
    errorBlock.style.right = '0';
    errorBlock.style.textAlign = 'center';
    errorBlock.style.margin = '0 auto';
    errorBlock.style.zIndex = '20';
    errorBlock.style.fontSize = '18px';
    errorBlock.style.border = '2px solid #f00';
    errorBlock.style.paddingTop = '2px';
    errorBlock.textContent = message;
    document.body.appendChild(errorBlock);
    window.setTimeout(function () {
      errorBlock.remove();
    }, TIMEOUT_SECONDS);
  }

  function showSuccess() {
    successBlock.classList.remove('hidden');
    successBlock.addEventListener('click', function () {
      successBlock.classList.add('hidden');
    });
  }

  window.message = {
    showError: showError,
    showSuccess: showSuccess
  };
})();
