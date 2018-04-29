'use strict';
(function () {
  var MIN_X = 300;
  var MAX_X = 900;
  var MIN_Y = 150;
  var MAX_Y = 500;
  var MIN_PRICE = 1000;
  var MAX_PRICE = 1000000;
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

  function randomCallback() {
    return Math.random() - 0.5;
  }

})();
