'use strict';
(function () {
  var ConformityGuests = {
    1: ['1'],
    2: ['1', '2'],
    3: ['1', '2', '3'],
    100: ['0']
  };
  var form = document.querySelector('.ad-form');
  var filterForm = document.querySelector('.map__filters');
  var addressInput = document.querySelector('#address');
  var buttonReset = document.querySelector('.ad-form__reset');
  var formInputs = form.querySelectorAll('fieldset');
  var accommodationType = document.querySelector('select[name="type"]');
  var priceOfNight = document.querySelector('#price');
  var rooms = document.querySelector('select[name="rooms"]');
  var capacity = document.querySelector('select[name="capacity"]');
  var timeInSelect = document.querySelector('#timein');
  var timeOutSelect = document.querySelector('#timeout');
  var roomsInput = document.querySelector('#room_number');
  setGuestNumber(roomsInput.value);
  
  function onRoomsChange(evt) {
      var numberOfRooms = evt.target.value;
      setGuestNumber(numberOfRooms);
  }
  function setGuestNumber(roomsNumber) {
    var availableNumberOfGuests = ConformityGuests[roomsNumber];
    Array.from(capacity.options).forEach(function (option) {
      if (availableNumberOfGuests.includes(option.value)) {
        option.selected = true;
        option.hidden = false;
      } else {
        option.hidden = true;
      }
    });
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

  onTermOfStayChange(timeInSelect, timeOutSelect);
  accommodationType.addEventListener('change', onMinPriceChange);
  rooms.addEventListener('change', onRoomsChange);
  function onMinPriceChange(evt) {
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
    filterForm.reset();
    disableInputs();
  }

  function enable() {
    form.classList.remove('ad-form--disabled');
    enableInputs();
  }

  function setResetCallback(callback) {
    buttonReset.addEventListener('click', function () {
      callback();
    });
  }
  function setSubmitCallback(callback) {
    form.addEventListener('submit', function (evt) {
      window.backend.send(new FormData(evt.target), function () {
        callback();
        window.message.showSuccess();
      }, function (message) {
        window.message.showError(message);
      });
      evt.preventDefault();
    });
  }

  window.form = {
    setAddress: setAddress,
    enable: enable,
    disable: disable,
    setResetCallback: setResetCallback,
    setSubmitCallback: setSubmitCallback
  };
})();
