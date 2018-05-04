'use strict';
(function () {
  var ADDRESS_X = 570;
  var ADDRESS_Y = 375;
  var MAIN_PIN_WIDTH = 62;
  var MAIN_PIN_HEIGHT = 62;
  var DRAG_LOCATION = {
    xMin: 65,
    xMax: 1200,
    yMin: 150,
    yMax: 700
  };
  var successBlock = document.querySelector('.success');
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var filterForm = document.querySelector('.map__filters');

  function deletePins() {
    var buttonPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < buttonPins.length; i++) {
      var buttonPin = buttonPins[i];
      if (buttonPin) {
        buttonPin.remove();
      }
    }
  }

  function onError(message) {
    var errorBlock = document.createElement('div');
    errorBlock.style.width = '89%';
    errorBlock.style.height = '28px';
    errorBlock.style.position = 'absolute';
    errorBlock.style.background = '#fff';
    errorBlock.style.color = '#000';
    errorBlock.style.top = '0';
    errorBlock.style.left = '0';
    errorBlock.style.right = '0';
    errorBlock.style.textAlign = 'center';
    errorBlock.style.margin = '0 auto';
    errorBlock.style.zIndex = '20';
    errorBlock.style.fontSize = '18px';
    errorBlock.style.border = '2px solid #f00';
    errorBlock.style.paddingTop = '2px';
    errorBlock.textContent = message;
    document.body.insertAdjacentElement('afterbegin', errorBlock);

  }

  function addPins(offers) {
    var containterOfPins = document.createDocumentFragment();
    for (var i = 0; i < offers.length; i++) {
      var pin = window.createPin(offers[i]);
      setListenerToPin(pin, offers[i]);
      containterOfPins.appendChild(pin);
    }
    map.appendChild(containterOfPins);
  }

  function onMainPinMouseMouseUp() {
    window.backend.load(function (data) {
      window.pins = data;
      map.classList.remove('map--faded');
      var result = filterValue(window.pins);
      addPins(result);
      window.form.enable();
      mainPin.removeEventListener('mouseup', onMainPinMouseMouseUp);
      mainPin.addEventListener('mouseup', function () {
        map.classList.remove('map--faded');
        var resultSecond = filterValue(window.pins);
        addPins(resultSecond);
        window.form.enable();
      });
    }, onError());
  }

  function setListenerToPin(pin, offer) {
    pin.addEventListener('click', function () {
      window.card.remove();
      window.card.add(offer, map);
    });
  }

  function onClickRemove() {
    map.classList.add('map--faded');
    window.form.disable();
    window.form.setAddress(ADDRESS_X, ADDRESS_Y);
    window.card.remove();
    deletePins();
    mainPin.style.left = ADDRESS_X + 'px';
    mainPin.style.top = ADDRESS_Y + 'px';
  }

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      var newY = mainPin.offsetTop - shift.y;
      var newX = mainPin.offsetLeft - shift.x;
      if (newY >= DRAG_LOCATION.yMin - MAIN_PIN_HEIGHT && newY <= DRAG_LOCATION.yMax - MAIN_PIN_HEIGHT
        && newX >= DRAG_LOCATION.xMin - MAIN_PIN_WIDTH && newX <= DRAG_LOCATION.xMax - MAIN_PIN_WIDTH) {
        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };
        mainPin.style.top = mainPin.offsetTop - shift.y + 'px';
        mainPin.style.left = mainPin.offsetLeft - shift.x + 'px';
        window.form.setAddress(newX, newY);
      }

    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  function onSuccessSumbit(evt) {
    window.backend.send(new FormData(evt.target), function () {
      onClickRemove();
      successBlock.classList.remove('hidden');
      successBlock.addEventListener('click', function () {
        successBlock.classList.add('hidden');
      });

    }, onError());
    evt.preventDefault();
  }


  window.form.disable();
  mainPin.addEventListener('mouseup', onMainPinMouseMouseUp);
  var valueOfSelect = {
    housingType: document.querySelector('#housing-type'),
    housingPrice: document.querySelector('#housing-price'),
    housingRooms: document.querySelector('#housing-rooms'),
    housingGuests: document.querySelector('#housing-guests'),
    housingFeatures: document.querySelector('#housing-features')
  };
  filterForm.addEventListener('change', function () {
    var result = filterValue(window.pins);
    deletePins();
    addPins(result);
  });

  function filterValue(array) {
    var newArray = array.filter(function (it) {

      if (valueOfSelect.housingType.value != it.offer.type && valueOfSelect.housingType.value != 'any') {
        return false;
      }
      if (valueOfSelect.housingPrice.value != it.offer.price && valueOfSelect.housingPrice.value != 'any') {
      return false
      }

      if (valueOfSelect.housingRooms.value != it.offer.rooms && valueOfSelect.housingRooms.value != 'any') {
        return false
      }

      if (valueOfSelect.housingGuests.value != it.offer.guests && valueOfSelect.housingGuests.value != 'any') {
        return false
      }
      return true;
    };
    return newArray;
  }

  window.form.setResetListener(onClickRemove);
  window.form.setSumbitListener(onSuccessSumbit);
  window.form.setAddress(ADDRESS_X, ADDRESS_Y);

})();
