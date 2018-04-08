var minX = 300;
var maxX = 900;
var minY = 150;
var maxY = 500;
var minPrice = 1000;
var maxPrice = 1000000;
var titles = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде',
];
var features = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
var img = [1, 2, 3, 4, 5, 6, 7, 8];
var type = [
'palace',
'flat',
'house',
'bungalo'
];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var rooms = [1, 2, 3, 4, 5];
var check = ['12:00', '13:00', '14:00'];
var getRandom = function (min, max) {
  var value = Math.round((Math.random() * (max - min)) + min);
  return value;
}

var getRandomNumbers = function (arr, num) {
  var ranNum = arr[Math.floor(Math.random() * num)];
  return ranNum;
};

var offers = []
for (var i = 0; i < 8; i++) {
  offers[i] = {
    "author": {
      "avatar": 'img/avatars/user' + getRandomNumbers(img, 8) + '.png'
    },

    "offer": {
      "title": getRandomNumbers(titles, 8),
      "address": getRandom(minX, maxX) + getRandom(minY, maxY),
      "price": getRandom(minPrice, maxPrice),
      "type": getRandomNumbers(type, 4),
      "rooms": getRandomNumbers(rooms, 5),
      "guests": getRandomNumbers(img, 8),
      "checkin": getRandomNumbers(check, 3),
      "checkout": getRandomNumbers(check, 3),
      "features": getRandomNumbers(features, 6),
      "description": '',
      "photos": getRandomNumbers(photos, 3)
    },

    "location": {
      "x": getRandom(minX, maxX),
      "y": getRandom(minY, maxY)
    }
  }
}
