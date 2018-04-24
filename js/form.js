'use strict';

(function () {
  window.changePrice = function onChangeMinPrice(evt) {
    switch (evt.target.value) {
      case 'flat':
        window.priceOfNight.setAttribute('min', '1000');
        window.priceOfNight.setAttribute('placeholder', '1000');
        break;
      case 'bungalo':
        window.priceOfNight.setAttribute('min', '0');
        window.priceOfNight.setAttribute('placeholder', '0');
        break;
      case 'house':
        window.priceOfNight.setAttribute('min', '5000');
        window.priceOfNight.setAttribute('placeholder', '5000');
        break;
      case 'palace':
        window.priceOfNight.setAttribute('min', '10000');
        window.priceOfNight.setAttribute('placeholder', '10000');
        break;
    }
  };


  window.changeRooms = function onChangeRooms(evt) {
    switch (evt.target.value) {
      case '1':
        window.capacity[0].disabled = true;
        window.capacity[1].disabled = true;
        window.capacity[2].disabled = false;
        window.capacity[2].selected = true;
        window.capacity[3].disabled = true;
        break;
      case '2':
        window.capacity[0].disabled = true;
        window.capacity[1].disabled = false;
        window.capacity[2].selected = true;
        window.capacity[2].disabled = false;
        window.capacity[3].disabled = true;
        break;
      case '3':
        window.capacity[0].disabled = false;
        window.capacity[1].disabled = false;
        window.capacity[2].disabled = false;
        window.capacity[3].disabled = true;
        break;
      case '100':
        window.capacity[0].disabled = true;
        window.capacity[1].disabled = true;
        window.capacity[2].disabled = true;
        window.capacity[3].disabled = false;
        window.capacity[3].selected = true;
        break;
    }
  };


  window.termOfStayChange = function onTermOfStayChange(field1, field2) {
    field1.addEventListener('change', function () {
      field2.value = field1.value;
    });
    field2.addEventListener('change', function () {
      field1.value = field2.value;
    });
  };

  window.enableInputs = function enableInputs() {
    for (var i = 0; i < window.formInputs.length; i++) {
      var input = window.formInputs[i];
      input.removeAttribute('disabled', 'disabled');
    }
  };

  window.disabledInuts = function disableInputs() {
    for (var i = 0; i < window.formInputs.length; i++) {
      var input = window.formInputs[i];
      input.setAttribute('disabled', 'disabled');
    }
  };
})();
