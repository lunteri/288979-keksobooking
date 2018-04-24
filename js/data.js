'use strict';


window.MIN_X = 300;
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



function getRandomArray(array) {
  var copiedArray = array.slice();
  copiedArray.sort(randomCallback);
  copiedArray.length = getRandom(0, copiedArray.length);
  return copiedArray;
}
