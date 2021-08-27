/* eslint-disable */
/*stylelint-disable*/
'use strict';

// filter
var checkFilter = function () {
  var filter = document.querySelector('#filter');

  filter.addEventListener('input', function () {
    var val = this.value.trim();
    var filterItems = document.querySelectorAll('.catalog__list li');

    if (val.length >= 1) {
      filterItems.forEach(function(el) {
        var filterText = el.querySelector('.catalog__list .item__title');
        var text = filterText.innerText.toLowerCase();
        if (text.search(val.toLowerCase()) == -1) {
          el.classList.add('hide');
        }
        else {
          el.classList.remove('hide');
        }
      });
    }
    else {
      filterItems.forEach(function(el) {
        el.classList.remove('hide');
      });
    }
  });
};

if (document.querySelector('.catalog__list')) {
  checkFilter();
}


// Data
var PHOTOS = [
  'images/item01@1x.jpg',
  'images/item02@1x.jpg',
  'images/item03@1x.jpg',
  'https://via.placeholder.com/377x227.jpg'
];

var renderType = function (card, el) {
  if (card.type == 'IndependentLiving') {
    el.querySelector('.item__tag').textContent = 'Independent living' || 'no value';
    el.classList.add('IndependentLiving');
  }
  else {
    el.querySelector('.item__tag').textContent = 'Restaurant & Support' || 'no value';
    el.classList.add('SupportAvailable');
  }
};

var renderPhoto = function (el, item) {
  var path = 'images/item0' + (el.id) + '@1x.jpg';

  if (PHOTOS.includes(path)) {
    item.querySelector('.item__img img').src = 'images/item0' + (el.id) + '@1x.jpg';
    item.querySelector('.item__img img').srcset = 'images/item0' + (el.id) + '@2x.jpg';
    item.querySelector('.item__img source').srcset = 'images/item0' + (el.id) + '@1x.webp' + ', ' + 'images/item0' + (el.id) + '@2x.webp';

  } else {
    item.querySelector('.item__img img').src = 'images/377x227@1x.jpg';
    item.querySelector('.item__img img').srcset = 'images/377x227@2x.jpg';
    item.querySelector('.item__img source').srcset = 'images/377x227@1x.webp' + ', ' + 'images/377x227@2x.webp';
  }
};

var cardTemplate = document.querySelector('#card').content.querySelector('.catalog__item');

var createCard = function (card) {
  var cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.item__title').textContent = card.title || 'no value';
  cardElement.querySelector('.item__address').textContent = card.address || 'no value';
  cardElement.querySelector('.item__price').textContent = '£' + card.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") || 'no value';

  renderType(card, cardElement);
  renderPhoto(card, cardElement);

  return cardElement;
};

var CARD_NUMBER = 6;
var listElement = document.querySelector('.catalog__list ul');

var buttonMore = document.querySelector('.catalog__btn button');
var currentIndex = 0;

var loadMore = function (items) {
  var maxRes = 6;
  for (var i=0; i<maxRes; i++) {
    if (currentIndex >= items.length) {
      buttonMore.setAttribute("disabled", "disabled");
      return
    }
    listElement.appendChild(createCard(items[i+currentIndex]));
  }
  currentIndex += maxRes;
};


$.ajax('https://603e38c548171b0017b2ecf7.mockapi.io/homes', {
  success: function(data) {
    loadMore(data);
    buttonMore.addEventListener("click", function(){
      loadMore(data);
    });
  }
});
