'use strict';
var MIN_X = 300;
var MAX_X = 900;
var MIN_Y = 150;
var MAX_Y = 500;
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var map = document.querySelector('.map');
var PIN_HEIGHT = 76;
var PIN_WIDTH = PIN_HEIGHT / 2;
var titles = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
].sort(randomCallback);
var features = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
var typeElement = {
  bungalo: 'Бунгало',
  palace: 'Дворец',
  house: 'Дом',
  flat: 'Квартира'
};

var images = [1, 2, 3, 4, 5, 6, 7, 8].sort(randomCallback);
var type = [
  'palace',
  'flat',
  'house',
  'bungalo'
];
var photos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var roomsRange = {
  min: 1,
  max: 5
};

var checks = ['12:00', '13:00', '14:00'];

function getRandomArray(array) {
  var copiedArray = array.slice();
  copiedArray.sort(randomCallback);
  copiedArray.length = getRandom(0, copiedArray.length);
  return copiedArray;
}


function getRandom(min, max) {
  return Math.round((Math.random() * (max - min)) + min);
}

function getRandomNumbers(arr, num) {
  return arr[Math.floor(Math.random() * num)];
}

function getOffers() {
  var offers = [];
  for (var i = 0; i < 8; i++) {
    offers.push({
      'author': {
        'avatar': 'img/avatars/user0' + images[i] + '.png'
      },

      'offer': {
        'title': titles[i],
        'address': getRandom(MIN_X, MAX_X) + getRandom(MIN_Y, MAX_Y),
        'price': getRandom(MIN_PRICE, MAX_PRICE),
        'type': getRandomNumbers(type, 4),
        'rooms': getRandom(roomsRange.min, roomsRange.max),
        'guests': getRandomNumbers(images, 8),
        'checkin': getRandomNumbers(checks, 3),
        'checkout': getRandomNumbers(checks, 3),
        'features': getRandomArray(features),
        'description': '',
        'photos': photos.sort(randomCallback)
      },

      'location': {
        'x': getRandom(MIN_X, MAX_X),
        'y': getRandom(MIN_Y, MAX_Y)
      }
    });
  }

  return offers;
}

var offers = getOffers();


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


function createCard(container) {
  var markingCard = document.querySelector('template');
  var article = markingCard.content.querySelector('article').cloneNode(true);
  article.querySelector('.popup__title').textContent = container.offer.title;
  article.querySelector('.popup__text--address').textContent = container.offer.address;
  article.querySelector('.popup__text--price').textContent = container.offer.price + '₽/ночь';
  article.querySelector('.popup__type').textContent = typeElement[container.offer.type];
  article.querySelector('.popup__text--capacity').textContent = container.offer.rooms + ' комнаты для ' + container.offer.guests + ' гостей';
  article.querySelector('.popup__text--time').textContent = 'Заезд после ' + container.offer.checkin + ', выезд до ' + container.offer.checkout;
  var featuresContainer = article.querySelector('.popup__features');
  featuresContainer.innerHTML = '';
  for (var i = 0; i < features.length; i++) {
    var featuresLiAdd = features[i];
    var featuresLi = document.createElement('li');
    featuresLi.classList.add('popup__feature');
    featuresLi.classList.add('popup__feature--' + featuresLiAdd);
    featuresContainer.appendChild(featuresLi);
  }
  article.querySelector('.popup__description').textContent = container.offer.description;
  var photosBlock = article.querySelector('.popup__photos');
  photosBlock.innerHTML = '';
  for (var j = 0; j < photos.length; j++) {
    var photosImg = photos[j];
    var photosBlockImg = document.createElement('img');
    photosBlockImg.src = photosImg;
    photosBlockImg.width = '45';
    photosBlockImg.height = '40';
    photosBlockImg.alt = 'Фотография жилья';
    photosBlockImg.classList.add('popup__photo');
    photosBlock.appendChild(photosBlockImg);
  }

  var avatar = article.querySelector('.popup__avatar');
  avatar.src = container.author.avatar;
  return article;
}

function addCard(offer) {
  var cardOffer = createCard(offer);
  var closeBtn = cardOffer.querySelector('.popup__close');
  closeBtn.addEventListener('click', function () {
    cardOffer.remove();
  });
  document.addEventListener('keydown', onCloseEscape);
  map.appendChild(cardOffer);
}
function onCloseEscape(evt) {
  if (evt.keyCode === 27) {
    var card = document.querySelector('.map__card');
    card.remove();
  }
  document.removeEventListener('keydown', onCloseEscape);
}

function randomCallback() {
  return Math.random() - 0.5;
}


var MAIN_PIN_WIDTH = 62;
var MAIN_PIN_HEIGHT = 62;
var form = document.querySelector('.ad-form');
var formInputs = form.querySelectorAll('fieldset');
var mainPin = document.querySelector('.map__pin--main');
var addressInput = document.querySelector('#address');
var buttonRelode = document.querySelector('.ad-form__reset');
var addForm = document.querySelector('.ad-form');
var accommodationType = document.querySelector('select[name="type"]');
var priceOfNight = document.querySelector('#price');
var rooms = document.querySelector('select[name="rooms"]');
var capacity = document.querySelector('select[name="capacity"]');
var timein = document.querySelector('#timein');
var pinHandle = document.querySelector('.map__pin--main');
var timeout = document.querySelector('#timeout');


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

function onMainPinMouseMouseUp() {
  map.classList.remove('map--faded');
  addPins(offers);
  form.classList.remove('ad-form--disabled');
  enableInputs();
  searchPin();
  mainPin.removeEventListener('click', onMainPinMouseMouseUp);
}


function searchPin() {
  var buttonPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  for (var i = 0; i < buttonPins.length; i++) {
    var buttonPin = buttonPins[i];
    setListenerToPin(buttonPin, offers[i]);
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


function onTermOfStayChange(field1, field2) {
  field1.addEventListener('change', function () {
    field2.value = field1.value;
  });
  field2.addEventListener('change', function () {
    field1.value = field2.value;
  });
}


mainPin.addEventListener('mouseup', onMainPinMouseMouseUp);
buttonRelode.addEventListener('click', onClickRemove);
disableInputs();
accommodationType.addEventListener('change', onChangeMinPrice);
rooms.addEventListener('change', onChangeRooms);
onTermOfStayChange(timein, timeout);

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
