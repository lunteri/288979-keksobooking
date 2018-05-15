'use strict';
(function () {
  var ADDRESS_X = 570;
  var ADDRESS_Y = 375;
  var ACTIVE_PIN_HEIGHT = 80;
  var MAIN_PIN_WIDTH = 62;
  var MAIN_PIN_HEIGHT = 62;
  var DRAG_LOCATION = {
    xMin: 65,
    xMax: 1200,
    yMin: 132,
    yMax: 482
  };
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');

  function deletePins() {
    var buttonPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < buttonPins.length; i++) {
      var buttonPin = buttonPins[i];
      if (buttonPin) {
        buttonPin.remove();
      }
    }
  }

  function addPins(offers) {
    var containerOfPins = document.createDocumentFragment();
    for (var i = 0; i < offers.length; i++) {
      var pin = window.createPin(offers[i]);
      setListenerToPin(pin, offers[i]);
      containerOfPins.appendChild(pin);
    }
    map.appendChild(containerOfPins);
  }

  function onMainPinMouseUp() {
    window.backend.load(function (data) {
      map.classList.remove('map--faded');
      addPins(data.slice(0, 5));
      window.form.enable();
      window.filter.setup(data, function (ads) {
        window.card.remove();
        deletePins();
        addPins(ads);
      });
      mainPin.removeEventListener('mouseup', onMainPinMouseUp);
    }, function (message) {
      window.message.showError(message);
    });
  }

  function setListenerToPin(pin, offer) {
    pin.addEventListener('click', function () {
      window.card.remove();
      window.card.add(offer, map);
    });
  }

  function resetPage() {
    map.classList.add('map--faded');
    window.form.disable();
    window.form.setAddress(ADDRESS_X, ADDRESS_Y);
    window.card.remove();
    deletePins();
    mainPin.style.left = ADDRESS_X + 'px';
    mainPin.style.top = ADDRESS_Y + 'px';
    mainPin.addEventListener('click', onMainPinMouseUp);
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
        window.form.setAddress(newX + MAIN_PIN_WIDTH / 2, newY + ACTIVE_PIN_HEIGHT);
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

  window.form.disable();
  mainPin.addEventListener('mouseup', onMainPinMouseUp);

  window.form.setResetCallback(resetPage);
  window.form.setSubmitCallback(resetPage);
  window.form.setAddress(ADDRESS_X, ADDRESS_Y);

})();
