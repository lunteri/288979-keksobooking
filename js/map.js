'use strict';
(function () {

  var map = document.querySelector('.map');
  var offers = window.getOffers();
  var mainPin = document.querySelector('.map__pin--main');
  var MAIN_PIN_WIDTH = 62;
  var MAIN_PIN_HEIGHT = 62;
  var DRAG_LOCATION = {
    xMin: 65,
    xMax: 1200,
    yMin: 150,
    yMax: 700
  };

  function deletePins() {
    var buttonPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < buttonPins.length; i++) {
      var buttonPin = buttonPins[i];
      if (buttonPin) {
        buttonPin.remove();
      }
    }
  }

  function addPins() {
    var containterOfPins = document.createDocumentFragment();
    for (var i = 0; i < offers.length; i++) {
      var pin = window.createPin(offers[i]);
      setListenerToPin(pin, offers[i]);
      containterOfPins.appendChild(pin);
    }
    map.appendChild(containterOfPins);
  }

  function onMainPinMouseMouseUp() {
    map.classList.remove('map--faded');
    addPins(offers);
    window.form.enable();
    mainPin.removeEventListener('click', onMainPinMouseMouseUp);

  }
  function setListenerToPin(pin, offer) {
    pin.addEventListener('click', function () {
      var currentCard = document.querySelector('.map__card');
      if (currentCard) {
        currentCard.remove();
      }
      window.card.add(offer, map);


    });
  }

  function onClickRemove() {
    map.classList.add('map--faded');
    window.form.disable();
    window.form.setAddress(570, 375);
    window.card.remove();
    deletePins();
    mainPin.style.left = 570 + 'px';
    mainPin.style.top = 375 + 'px';
  }


  window.form.disable();
  mainPin.addEventListener('mouseup', onMainPinMouseMouseUp);
  window.form.setResetListener(onClickRemove);
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

  var form = document.querySelector('.ad-form');
  form.addEventListener('submit', function (evt) {

    window.backendSend(new FormData(form), function (response) {
      window.form.disable();
    });
    evt.preventDefault();
  });

})();
