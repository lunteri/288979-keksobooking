'use strict';
(function () {
  var form = document.querySelector('.ad-form');
  var addressInput = document.querySelector('#address');
  var buttonReset = document.querySelector('.ad-form__reset');
  var formInputs = form.querySelectorAll('fieldset');
  var accommodationType = document.querySelector('select[name="type"]');
  var priceOfNight = document.querySelector('#price');
  var rooms = document.querySelector('select[name="rooms"]');
  var capacity = document.querySelector('select[name="capacity"]');
  var timein = document.querySelector('#timein');
  var timeout = document.querySelector('#timeout');

  function onChangeRooms(evt) {
    switch (evt.target.value) {
      case '1':
        capacity[0].disabled = true;
        capacity[1].disabled = true;
        capacity[2].disabled = false;
        capacity[2].selected = true;
        capacity[3].disabled = true;
        break;
      case '2':
        capacity[0].disabled = true;
        capacity[1].disabled = false;
        capacity[2].selected = true;
        capacity[2].disabled = false;
        capacity[3].disabled = true;
        break;
      case '3':
        capacity[0].disabled = false;
        capacity[1].disabled = false;
        capacity[2].disabled = false;
        capacity[3].disabled = true;
        break;
      case '100':
        capacity[0].disabled = true;
        capacity[1].disabled = true;
        capacity[2].disabled = true;
        capacity[3].disabled = false;
        capacity[3].selected = true;
        break;
    }
  }

  function disableInputs() {
    for (var i = 0; i < formInputs.length; i++) {
      var input = formInputs[i];
      input.setAttribute('disabled', 'disabled');
    }
  }

  function enableInputs() {
    for (var i = 0; i < formInputs.length; i++) {
      var input = formInputs[i];
      input.removeAttribute('disabled', 'disabled');
    }
  }


  function onTermOfStayChange(field1, field2) {
    field1.addEventListener('change', function () {
      field2.value = field1.value;
    });
    field2.addEventListener('change', function () {
      field1.value = field2.value;
    });
  }

  onTermOfStayChange(timein, timeout);
  accommodationType.addEventListener('change', onChangeMinPrice);
  rooms.addEventListener('change', onChangeRooms);
  function onChangeMinPrice(evt) {
    switch (evt.target.value) {
      case 'flat':
        priceOfNight.setAttribute('min', '1000');
        priceOfNight.setAttribute('placeholder', '1000');
        break;
      case 'bungalo':
        priceOfNight.setAttribute('min', '0');
        priceOfNight.setAttribute('placeholder', '0');
        break;
      case 'house':
        priceOfNight.setAttribute('min', '5000');
        priceOfNight.setAttribute('placeholder', '5000');
        break;
      case 'palace':
        priceOfNight.setAttribute('min', '10000');
        priceOfNight.setAttribute('placeholder', '10000');
        break;
    }
  }

  function setAddress(x, y) {
    addressInput.value = x + ', ' + y;
  }

  function disable() {
    form.classList.add('ad-form--disabled');
    form.reset();
    disableInputs();
  }

  function enable() {
    form.classList.remove('ad-form--disabled');
    enableInputs();
  }

  function setResetListener(callback) {
    buttonReset.addEventListener('click', callback);
  }
  function setSumbitListener(callback) {
    form.addEventListener('submit', callback);
  }

  window.form = {
    setAddress: setAddress,
    enable: enable,
    disable: disable,
    setResetListener: setResetListener,
    setSumbitListener: setSumbitListener
  };
})();
