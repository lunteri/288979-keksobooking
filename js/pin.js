'use strict';
(function () {
  var PIN_HEIGHT = 76;
  var PIN_WIDTH = PIN_HEIGHT / 2;

  function createPin(offer) {
    var marking = '<button class="map__pin" style="left: ' + (offer.location.x - PIN_HEIGHT) + 'px; top: ' + (offer.location.y - PIN_WIDTH) + 'px;"> <img src="' + offer.author.avatar + '" alt="' + offer.offer.title + '" width="40" height="40"> </button>';
    var template = document.createElement('div');
    template.innerHTML = marking;
    return template.querySelector('.map__pin');
  }
  window.createPin = createPin;
})();
