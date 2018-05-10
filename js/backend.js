'use strict';

(function () {
  var URL_SEND = 'https://js.dump.academy/keksobooking/';
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var STATUS_CODE = 200;
  var TIMEOUT_NUMBER = 3000;
  function send(data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_CODE) {
        onLoad(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_NUMBER;

    xhr.open('POST', URL_SEND);
    xhr.send(data);
  }

  function load(onLoad, onError) {

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_CODE) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_NUMBER;

    xhr.open('GET', URL_LOAD);
    xhr.send();

  }
  window.backend = {
    send: send,
    load: load
  };
})();
