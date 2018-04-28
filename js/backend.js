'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/';
  window.backendSend= function (data, onLoad) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      onLoad(xhr.response);
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };


})();
