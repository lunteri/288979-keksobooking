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

function addCard(offer) {
  var cardOffer = createCard(offer);
  map.appendChild(cardOffer);
}

function randomCallback() {
  return Math.random() - 0.5;
}


var MAIN_PIN_WIDTH = 62;
var MAIN_PIN_HEIGHT = 62;
var MAIN_PIN_Y = 570;
var MAIN_PIN_X = 375;
var markerPin = (MAIN_PIN_X - MAIN_PIN_WIDTH / 2) + ', ' + (MAIN_PIN_Y - MAIN_PIN_HEIGHT / 2);
var form = document.querySelector('.ad-form');
var formInputs = form.querySelectorAll('input');
var mainPin = document.querySelector('.map__pin--main');
var addressInput = document.querySelector('#address');

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
  addressInput.setAttribute('value', (markerPin));
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
     currentCard.remove()
}     
      addCard(offer)
     var popupClose =  document.querySelector('.popup__close');
     var createdCard = document.querySelector('.map__card');
     function onClickCloseButton() {
         createdCard.remove();
     }
     
     document.addEventListener('keydown', function(evt) {
         if (evt.keyCode === 27) {
             createdCard.remove();
         }
    })
      popupClose.addEventListener('click', onClickCloseButton);
      mainPin.removeEventListener('mouseup', onMainPinMouseMouseUp);
  });
}


disableInputs();
mainPin.addEventListener('mouseup', onMainPinMouseMouseUp);


