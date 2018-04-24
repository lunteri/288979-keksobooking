'use strict';

document.MAIN_PIN_WIDTH = 62;
document.MAIN_PIN_HEIGHT = 62;
document.mainPin = document.querySelector('.map__pin--main');


function createPin(offer) {
  var marking = '<button class="map__pin" style="left: ' + (offer.location.x - PIN_HEIGHT) + 'px; top: ' + (offer.location.y - PIN_WIDTH) + 'px;"> <img src="' + offer.author.avatar + '" alt="' + offer.offer.title + '" width="40" height="40"> </button>';
  var template = document.createElement('div');
  template.insertAdjacentHTML('afterBegin', marking);
  return template.querySelector('.map__pin');
}

function addPins() {
  var buttonPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  for (var i = 0; i < buttonPins.length; i ++) {
    var buttonPin = buttonPins[i];
    if (buttonPin) {
      buttonPin.remove();
    }
  }
  var containterOfPins = document.createDocumentFragment();
  for (var j = 0; j < offers.length; j++) {
    var pin = createPin(offers[j]);
    containterOfPins.appendChild(pin);
  }

  map.appendChild(containterOfPins);

}

var DRAG_LOCATION = {
  xMin: 65,
  xMax: 1200,
  yMin: 150,
  yMax: 700
};

pinHandle.addEventListener('mousedown', function (evt) {
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

    var newY = pinHandle.offsetTop - shift.y;
    var newX = pinHandle.offsetLeft - shift.x;
    if (newY >= DRAG_LOCATION.yMin - MAIN_PIN_HEIGHT && newY <= DRAG_LOCATION.yMax - MAIN_PIN_HEIGHT
      && newX >= DRAG_LOCATION.xMin - MAIN_PIN_WIDTH && newX <= DRAG_LOCATION.xMax - MAIN_PIN_WIDTH) {
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      pinHandle.style.top = pinHandle.offsetTop - shift.y + 'px';
      pinHandle.style.left = pinHandle.offsetLeft - shift.x + 'px';
      addressInput.value = newY + ', ' + newX;
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

function onClickRemove() {
  map.classList.add('map--faded');
  disableInputs();
  addForm.classList.add('ad-form--disabled');
  var drawCard = document.querySelector('.map__card');
  if (drawCard) {
    drawCard.remove();
  }
  var drawPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  for (var i = 0; i < drawPins.length; i++) {
    var drawPin = drawPins[i];
    drawPin.remove();
  }
}

function setListenerToPin(pin, offer) {
  pin.addEventListener('click', function () {
    var currentCard = document.querySelector('.map__card');
    if (currentCard) {
      currentCard.remove();
    }
    addCard(offer);
  });
}

function searchPin() {
  var buttonPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  for (var i = 0; i < buttonPins.length; i++) {
    var buttonPin = buttonPins[i];
    setListenerToPin(buttonPin, offers[i]);
  }
}

function onMainPinMouseMouseUp() {
  map.classList.remove('map--faded');
  addPins(offers);
  form.classList.remove('ad-form--disabled');
  enableInputs();
  searchPin();
  mainPin.removeEventListener('click', onMainPinMouseMouseUp);
}
