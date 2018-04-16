'use strict';
var MIN_X = 300, 
  MAX_X = 900,
  map = document.querySelector('.map__pins'),
  MIN_Y = 150,
  MAX_Y = 500,
  MIN_PRICE = 1000,
  MAX_PRICE = 1000000,
  map = document.querySelector('.map'),
  PIN_HEIGHT = 76,
  PIN_WIDTH = PIN_HEIGHT / 2,
  titles = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
].sort(randomCallback),
  features = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
],
  typeElement = {
    bungalo: 'Бунгало',
    palace: 'Дворец',
    house: 'Дом',
    flat: 'Квартира'
  };

function getRandomArray(array) {
  var copiedArray = array.slice();
  copiedArray.sort(randomCallback);
  copiedArray.length = getRandom(0, copiedArray.length); // от 0 до 5 -> 3
  return copiedArray;
}
var images = [1, 2, 3, 4, 5, 6, 7, 8].sort(randomCallback),
  type = [
  'palace',
  'flat',
  'house',
  'bungalo'
],
  photos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
  roomsRange = {
    min: 1,
    max: 5
  },

  checks = ['12:00', '13:00', '14:00'],
  getRandom = function (min, max) {
    return Math.round((Math.random() * (max - min)) + min);
  },

  getRandomNumbers = function (arr, num) {
    return arr[Math.floor(Math.random() * num)];
  },
  arr = [2, 4, 5, 6];

function getOffers() {
  var offers = [];
  for (var i = 0; i < 8; i++) {
    offers.push({
      "author": {
        "avatar": 'img/avatars/user0' + images[i] + '.png'
      },

      "offer": {
        "title": titles[i],
        "address": getRandom(MIN_X, MAX_X) + getRandom(MIN_Y, MAX_Y),
        "price": getRandom(MIN_PRICE, MAX_PRICE),
        "type": getRandomNumbers(type, 4),
        "rooms": getRandom(roomsRange.min, roomsRange.max),
        "guests": getRandomNumbers(images, 8),
        "checkin": getRandomNumbers(checks, 3),
        "checkout": getRandomNumbers(checks, 3),
        "features": getRandomArray(features),
        "description": '',
        "photos": photos.sort(randomCallback)
      },

      "location": {
        "x": getRandom(MIN_X, MAX_X),
        "y": getRandom(MIN_Y, MAX_Y)
      }
    });
  }

  return offers;
}

var offers = getOffers();


map.classList.remove('map--faded');

function createPin(offer) {
  var marking = '<button class="map__pin" style="left: ' + (offer.location.x - PIN_HEIGHT) + 'px; top: ' + (offer.location.y - PIN_WIDTH) + 'px;"> <img src="' + offer.author.avatar + '" alt="' + offer.offer.title + '" width="40" height="40"> </button>';
  var template = document.createElement('div');
  template.insertAdjacentHTML('afterBegin', marking);
  return template.querySelector('.map__pin');
}

function addPins(offer) {
  var containterOfPins = document.createDocumentFragment();
  for (var i = 0; i < offers.length; i++) {
    var pin = createPin(offers[i]);
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
  for (var i = 0; i < photos.length; i++) {
    var photosImg = photos[i];
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

function addCard() {
  var cardOffer = createCard(offers[0]);
  map.appendChild(cardOffer);
}

function randomCallback() {
  return Math.random() - 0.5;
}



var MARKER_WIDTH = 62;
var MARKER_HEIGHT = 62;
var MARKER_Y = 570;
var MARKER_X = 375;
var markerPin = (MARKER_X - MARKER_WIDTH / 2) + ', ' + (MARKER_Y - MARKER_HEIGHT / 2);
var inputDisabled = document.querySelectorAll('input');
var marker = document.querySelector('.map__pin--main');
map.classList.add('map--faded');
var addressInput = document.querySelector('#address');
var buttonPins = document.querySelectorAll('.map__pin');

function disabledInput() {
  for (var i = 0; i < inputDisabled.length; i++) {
    var input = inputDisabled[i];
    input.setAttribute('disabled', 'disabled');
  }
}
disabledInput();

function activeInput() {
  for (var i = 0; i < inputDisabled.length; i++) {
    var input = inputDisabled[i];
    input.removeAttribute('disabled', 'disabled');
  };
};

var onMarkerMouseMouseUp = function () {
  map.classList.remove('map--faded');
  addPins(offers);
  var form = document.querySelector('.ad-form');
  form.classList.remove('ad-form--disabled');
  activeInput();
  addressInput.focus();
  addressInput.setAttribute('value', (markerPin));

}

marker.addEventListener('mouseup', onMarkerMouseMouseUp);

var searchPin = function () {
  var buttonPins = document.querySelectorAll('button[class="map__pin"]');
  console.log(buttonPins);
  for (var i = 0; i < buttonPins.length; i++) {
    var buttonPin = buttonPins[i];
    buttonPin.addEventListener('click', function () {
      addCard();
    });
  };
};

searchPin();