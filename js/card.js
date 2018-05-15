'use strict';
(function () {
  var ESC_CODE = 27;
  var TypeElements = {
    bungalo: 'Бунгало',
    palace: 'Дворец',
    house: 'Дом',
    flat: 'Квартира'
  };
  var markingCard = document.querySelector('template');
  var newCard = markingCard.content.querySelector('article').cloneNode(true);
  var featuresContainer = newCard.querySelector('.popup__features');
  var photosBlock = newCard.querySelector('.popup__photos');
  var currentCard = null;
  function renderFeatureContainer(features) {
    featuresContainer.innerHTML = '';
    var featureFragment = document.createDocumentFragment();
    for (var i = 0; i < features.length; i++) {
      var featureElementAdd = features[i];
      var featureElement = document.createElement('li');
      featureElement.classList.add('popup__feature');
      featureElement.classList.add('popup__feature--' + featureElementAdd);
      featureFragment.appendChild(featureElement);
    }
    featuresContainer.appendChild(featureFragment);
  }

  function renderPhotosContainer(photos) {
    photosBlock.innerHTML = '';
    var photosFragment = document.createDocumentFragment();
    for (var j = 0; j < photos.length; j++) {
      var photosImg = photos[j];
      var photosBlockImg = document.createElement('img');
      photosBlockImg.src = photosImg;
      photosBlockImg.width = '45';
      photosBlockImg.height = '40';
      photosBlockImg.alt = 'Фотография жилья';
      photosBlockImg.classList.add('popup__photo');
      photosFragment.appendChild(photosBlockImg);
    }
    photosBlock.appendChild(photosFragment);
  }
  function createCard(ad) {
    newCard.querySelector('.popup__title').textContent = ad.offer.title;
    newCard.querySelector('.popup__text--address').textContent = ad.offer.address;
    newCard.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
    newCard.querySelector('.popup__type').textContent = TypeElements[ad.offer.type];
    newCard.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
    newCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    renderFeatureContainer(ad.offer.features);
    newCard.querySelector('.popup__description').textContent = ad.offer.description;
    renderPhotosContainer(ad.offer.photos);
    var avatar = newCard.querySelector('.popup__avatar');
    avatar.src = ad.author.avatar;
    currentCard = newCard;
    return newCard;
  }

  function setCloseListener() {
    var closeBtn = currentCard.querySelector('.popup__close');
    closeBtn.addEventListener('click', function () {
      currentCard.remove();
      document.removeEventListener('keydown', onCardClose);
    });
    document.addEventListener('keydown', onCardClose);
  }

  function onCardClose(evt) {
    if (evt.keyCode === ESC_CODE) {
      currentCard.remove();
      document.removeEventListener('keydown', onCardClose);
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
