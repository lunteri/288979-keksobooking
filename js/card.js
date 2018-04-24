'use strict';


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


