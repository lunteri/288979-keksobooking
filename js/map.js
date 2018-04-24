'use strict';

window.form = document.querySelector('.ad-form');
window.formInputs = form.querySelectorAll('fieldset');
window.addressInput = document.querySelector('#address');
window.buttonRelode = document.querySelector('.ad-form__reset');
window.addForm = document.querySelector('.ad-form');
window.accommodationType = document.querySelector('select[name="type"]');
window.priceOfNight = document.querySelector('#price');
window.rooms = document.querySelector('select[name="rooms"]');
window.capacity = document.querySelector('select[name="capacity"]');
window.timein = document.querySelector('#timein');
window.pinHandle = document.querySelector('.map__pin--main');
window.timeout = document.querySelector('#timeout');

window.random = function getRandom(min, max) {
  return Math.round((Math.random() * (max - min)) + min);
};

window.randomNumbers = function getRandomNumbers(arr, num) {
  return arr[Math.floor(Math.random() * num)];
};

window.randomCallback = function randomCallback() {
  return Math.random() - 0.5;
};

mainPin.addEventListener('mouseup', onMainPinMouseMouseUp);
window.buttonRelode.addEventListener('click', onClickRemove);
window.disableInputs();
window.accommodationType.addEventListener('change', onChangeMinPrice);
window.rooms.addEventListener('change', onChangeRooms);
window.onTermOfStayChange(timein, timeout);

