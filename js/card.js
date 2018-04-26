'use strict';
(function () {

  var typeElement = {
    bungalo: 'Бунгало',
    palace: 'Дворец',
    house: 'Дом',
    flat: 'Квартира'
  };

  var currentCard = null;

  function createCard(ad) {
    var markingCard = document.querySelector('template');
    var newCard = markingCard.content.querySelector('article').cloneNode(true);
    newCard.querySelector('.popup__title').textContent = ad.offer.title;
    newCard.querySelector('.popup__text--address').textContent = ad.offer.address;
    newCard.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
    newCard.querySelector('.popup__type').textContent = typeElement[ad.offer.type];
    newCard.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
    newCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    var featuresContainer = newCard.querySelector('.popup__features');
    featuresContainer.innerHTML = '';
    for (var i = 0; i < ad.offer.features.length; i++) {
      var featuresLiAdd = ad.offer.features[i];
      var featuresLi = document.createElement('li');
      featuresLi.classList.add('popup__feature');
      featuresLi.classList.add('popup__feature--' + featuresLiAdd);
      featuresContainer.appendChild(featuresLi);
    }
    newCard.querySelector('.popup__description').textContent = ad.offer.description;
    var photosBlock = newCard.querySelector('.popup__photos');
    photosBlock.innerHTML = '';
    for (var j = 0; j < ad.offer.photos.length; j++) {
      var photosImg = ad.offer.photos[j];
      var photosBlockImg = document.createElement('img');
      photosBlockImg.src = photosImg;
      photosBlockImg.width = '45';
      photosBlockImg.height = '40';
      photosBlockImg.alt = 'Фотография жилья';
      photosBlockImg.classList.add('popup__photo');
      photosBlock.appendChild(photosBlockImg);
    }

    var avatar = newCard.querySelector('.popup__avatar');
    avatar.src = ad.author.avatar;
    currentCard = newCard;
    return newCard;
  }

  function setCloseListener() {
    var closeBtn = currentCard.querySelector('.popup__close');
    closeBtn.addEventListener('click', function () {
      currentCard.remove();
    });
    document.addEventListener('keydown', onCloseEscape);
  }

  function onCloseEscape(evt) {
    if (evt.keyCode === 27) {
      currentCard.remove();
      document.removeEventListener('keydown', onCloseEscape);
    }
  }

  function remove() {
    if (currentCard) {
      currentCard.remove();
    }
  }
  function addCard(offer, container) {
    var cardOffer = createCard(offer);
    setCloseListener();
    container.appendChild(cardOffer);
  }

  window.card = {
    add: addCard,
    remove: remove
  };
})();
