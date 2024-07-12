// Подключение функционала 
import { isMobile, _slideToggle, removeClasses, bodyLock, bodyUnlock } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";

function initSliders() {
  if (document.querySelector('.main-banner__slider')) {
    const mainBannerSlider = new Swiper('.main-banner__slider', {
      observer: true,
      observeParents: true,
      slidesPerView: 1,
      spaceBetween: 40,
      autoHeight: false,
      speed: 800,
      loop: true,

      // Пагинация
      pagination: {
        el: '.main-banner__slider .swiper-pagination',
        clickable: true,
      },


      // Брейкпоинты
      /*
      breakpoints: {
        992: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
      },
      */
      // События
      on: {

      }
    });
  }

  if (document.querySelector('.widget-products__slider')) {
    const widgetProductsSlider = new Swiper('.widget-products__slider', {
      observer: true,
      observeParents: true,
      slidesPerView: 1.4,
      spaceBetween: 20,
      autoHeight: false,
      speed: 800,


      // Пагинация
      navigation: {
        prevEl: '.widget-products .swiper-arrows__arrow_prev',
        nextEl: '.widget-products .swiper-arrows__arrow_next',
      },


      // Брейкпоинты
      breakpoints: {
        480: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        1240: {
          slidesPerView: 4,
          spaceBetween: 18,
        },
        1800: {
          slidesPerView: 5,
          spaceBetween: 18,
        },
      },

      // События
      on: {

      }
    });
  }

  if (document.querySelector('.product-preview__slider')) {
    const productPreviewSlider = new Swiper('.product-preview__slider', {
      observer: true,
      observeParents: true,
      slidesPerView: 1,
      spaceBetween: 20,
      autoHeight: false,
      speed: 800,
      effect: 'fade',
      crossFade: true,
      lazy: true,

      // Пагинация
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });

    let swiperIndex;

    // Получаем индекс слайдера, в котором нужно менять слайды
    var swiperContainers = document.querySelectorAll('[data-mousemove-swipe]');
    swiperContainers.forEach(function (container, index) {
      container.addEventListener('mousemove', function () {
        swiperIndex = Array.from(swiperContainers).indexOf(container) + 1;
      });
    });

    function sliderMouseSlideInit() {
      document.addEventListener('mousemove', function (e) {
        const targetElement = e.target;
        if (targetElement.closest('[data-mousemove-swipe]')) {
          let parentSlider = targetElement.closest('.widget-products__slider');
          let parentSliderWrapper;
          let translateXValue = 0;
          let parentOffset = 0;
          let sliderElement;

          if (parentSlider) {
            parentSliderWrapper = targetElement.closest('.widget-products__wrapper');
            translateXValue = getTranslateXValue(parentSliderWrapper);
            let styles = window.getComputedStyle(parentSlider);
            var paddingLeft = parseFloat(styles.paddingLeft);
            parentOffset = parentSlider.offsetLeft + paddingLeft;
          }

          sliderElement = targetElement.closest('.widget-products__slide');
          if (!sliderElement) {
            sliderElement = targetElement.closest('.product-card');
          }

          const sliderItem = productPreviewSlider[swiperIndex - 1];
          const sliderLength = sliderItem.slides.length;

          if (sliderLength > 1) {
            const sliderWidth = sliderItem.width;
            const sliderPath = Math.round(sliderWidth / sliderLength);
            const sliderMousePos = e.clientX - (sliderElement.offsetLeft + parentOffset) + (-translateXValue);
            const sliderSlide = Math.floor(sliderMousePos / sliderPath);
            sliderItem.slideTo(sliderSlide);
          }
        }
      })

      // Получаем индекс слайдера, в котором нужно менять слайды
      function getIndex(el) {
        return Array.from(el.parentNode.children).indexOf(el);
      }

      // Получаем смещение верхнего слайдера при переключении слайдов
      function getTranslateXValue(element) {
        const styles = window.getComputedStyle(element);
        const transformValue = styles.getPropertyValue('transform');

        if (transformValue && transformValue !== 'none') {
          const matrix = transformValue.match(/^matrix\((.+)\)$/);
          if (matrix) {
            const matrixValues = matrix[1].split(', ');
            if (matrixValues.length >= 4) {
              return parseFloat(matrixValues[4]);
            }
          }
        }

        return 0;
      }
    }

    sliderMouseSlideInit();
  }

  if (document.querySelector('.widget-sales__slider')) {
    const widgetSalesSlider = new Swiper('.widget-sales__slider', {
      observer: true,
      observeParents: true,
      slidesPerView: 1.25,
      spaceBetween: 12,
      autoHeight: false,
      speed: 800,


      // Пагинация
      navigation: {
        prevEl: '.widget-sales .swiper-arrows__arrow_prev',
        nextEl: '.widget-sales .swiper-arrows__arrow_next',
      },


      // Брейкпоинты
      breakpoints: {
        480: {
          slidesPerView: 1.6,
          spaceBetween: 20,
        },
        575: {
          slidesPerView: 1.6,
          spaceBetween: 24,
        },
        860: {
          slidesPerView: 2,
          spaceBetween: 24,
        },
        992: {
          slidesPerView: 2.3,
          spaceBetween: 24,
        },
        1240: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
        1800: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
      },

      // События
      on: {
      }
    });
  }

  if (document.querySelector('.compare__main-slider')) {
    const compareMainSlider = new Swiper('.compare__main-slider', {
      observer: true,
      observeParents: true,
      slidesPerView: 1,
      spaceBetween: 10,
      autoHeight: false,
      speed: 800,

      // Пагинация
      pagination: {
        el: '.compare__main-slider .swiper-pagination',
        clickable: true,
      },

      // Брейкпоинты
      breakpoints: {
        767.98: {
          slidesPerView: 2,
          spaceBetween: 4,
        },
        991.98: {
          slidesPerView: 2,
          spaceBetween: 4,
        },
        1279.98: {
          slidesPerView: 3,
          spaceBetween: 4,
        },
        1639.98: {
          slidesPerView: 4,
          spaceBetween: 4,
        },
      },

      // События
      on: {
      }
    });

    // Добавляем фракции
    if (window.innerWidth <= 767.98) {
      let compareMainSliderTotal = document.querySelector('.compare__main-slider .swiper-fraction__total');
      let compareMainSliderCurrent = document.querySelector('.compare__main-slider .swiper-fraction__current');

      compareMainSliderTotal.innerHTML = compareMainSlider.slides.length - 1;

      compareMainSlider.on('slideChange', function () {
        let currentSlide = ++compareMainSlider.realIndex;
        compareMainSliderCurrent.innerHTML = currentSlide;
      })
    }

    const compareAttributesSlider = new Swiper('.compare__attributes-slider', {
      slidesPerView: 1,
      spaceBetween: 10,
      autoHeight: false,
      speed: 800,

      breakpoints: {
        767.98: {
          slidesPerView: 2,
          spaceBetween: 4,
        },
        991.98: {
          slidesPerView: 2,
          spaceBetween: 4,
        },
        1279.98: {
          slidesPerView: 3,
          spaceBetween: 4,
        },
        1639.98: {
          slidesPerView: 4,
          spaceBetween: 4,
        },
      },

      // События
      on: {
        // Задаем высоту аттрибутам
        init: function () {
          if (window.innerWidth >= 767.98) {
            const compareCards = document.querySelectorAll('.compare-attributes');
            const maxHeights = [];

            compareCards.forEach(card => {
              const items = card.querySelectorAll('.compare-attributes__item');
              items.forEach((item, index) => {
                const height = item.clientHeight;
                if (!maxHeights[index] || height > maxHeights[index]) {
                  maxHeights[index] = height;
                }
              });
            });

            compareCards.forEach(card => {
              const items = card.querySelectorAll('.compare-attributes__item');
              items.forEach((item, index) => {
                item.style.height = `${maxHeights[index]}px`;
              });
            });
          }
        }
      }
    });

    compareMainSlider.controller.control = compareAttributesSlider;
    compareAttributesSlider.controller.control = compareMainSlider;

    if (window.innerWidth <= 767.98) {
      // Клонируем мейн слайдер
      const originalMainSlider = document.querySelector('.compare-table__products_main');
      const clonedMainSlider = originalMainSlider.cloneNode(true);
      clonedMainSlider.classList.add('compare-table__products_clone');
      document.querySelector('.compare-table__top').appendChild(clonedMainSlider);

      let compareNewMainSliderTotal = document.querySelector('.compare-table__products_main.compare-table__products_clone .swiper-fraction__total');
      let compareNewMainSliderCurrent = document.querySelector('.compare-table__products_main.compare-table__products_clone .swiper-fraction__current');

      const newMainSlider = new Swiper('.compare-table__products_clone .compare__main-slider', {
        slidesPerView: 1,
        spaceBetween: 4,
        autoHeight: false,
        initialSlide: 1,
        speed: 800,

        // Пагинация
        pagination: {
          el: '.compare__main-slider .swiper-pagination',
          clickable: true,
        },

        on: {
          init: function (e) {
            let currentSlide = ++e.realIndex;
            compareNewMainSliderCurrent.innerHTML = currentSlide;
          }
        }
      });

      compareNewMainSliderTotal.innerHTML = newMainSlider.slides.length - 1;

      newMainSlider.on('slideChange', function () {
        let currentSlide = ++newMainSlider.realIndex;
        compareNewMainSliderCurrent.innerHTML = currentSlide;
      })

      // Клонируем слайдер аттрибутов
      const originalAttributesSlider = document.querySelector('.compare-table__products_attributes');
      const clonedAttributesSlider = originalAttributesSlider.cloneNode(true);
      clonedAttributesSlider.classList.add('compare-table__products_clone');
      document.querySelector('.compare-table__bottom').appendChild(clonedAttributesSlider);

      const newAttributesSlider = new Swiper('.compare-table__products_clone .compare__attributes-slider', {
        slidesPerView: 1,
        spaceBetween: 4,
        autoHeight: false,
        initialSlide: 1,
        speed: 800,

        on: {
          // Задаем высоту аттрибутам
          init: function () {
            const compareCards = document.querySelectorAll('.compare-attributes');
            const maxHeights = [];

            compareCards.forEach(card => {
              const items = card.querySelectorAll('.compare-attributes__item');
              items.forEach((item, index) => {
                const height = item.clientHeight;
                if (!maxHeights[index] || height > maxHeights[index]) {
                  maxHeights[index] = height;
                }
              });
            });

            compareCards.forEach(card => {
              const items = card.querySelectorAll('.compare-attributes__item');
              items.forEach((item, index) => {
                item.style.height = `${maxHeights[index]}px`;
              });
            });
          }
        }
      });

      newMainSlider.controller.control = newAttributesSlider;
      newAttributesSlider.controller.control = newMainSlider;
    }
  }

  if (document.querySelector('.reviews-gallery__slider')) {
    const reviewsGallerySlider = new Swiper('.reviews-gallery__slider', {
      observer: true,
      observeParents: true,
      slidesPerView: 3.5,
      spaceBetween: 10,
      autoHeight: false,
      speed: 800,

      // Пагинация
      navigation: {
        prevEl: '.reviews-gallery .swiper-arrows__arrow_prev',
        nextEl: '.reviews-gallery .swiper-arrows__arrow_next',
      },


      // Брейкпоинты

      breakpoints: {
        768: {
          slidesPerView: 3.2,
          spaceBetween: 15,
        },
        992: {
          slidesPerView: 4,
          spaceBetween: 15,
        },
        1280: {
          slidesPerView: 5,
          spaceBetween: 15,
        },
        1640: {
          slidesPerView: 6,
          spaceBetween: 18,
        },
      },

      // События
      on: {

      }
    });
  }
}

// Работа с noUiSlider
function noUiSliderInit() {
  var sliders = document.querySelectorAll('.range-slider__range');
  var minInputs = document.querySelectorAll('.range-slider__min');
  var maxInputs = document.querySelectorAll('.range-slider__max');

  if (sliders.length > 0) {
    sliders.forEach(function (slider, index) {
      var min = parseInt(slider.getAttribute('data-min'));
      var max = parseInt(slider.getAttribute('data-max'));
      var start = slider.getAttribute('data-start').split(',').map(Number);
      var prefix = slider.getAttribute('data-prefix');

      var rangeSlider = noUiSlider.create(slider, {
        start: start,
        connect: true,
        range: {
          'min': min,
          'max': max
        },
      });

      function formatValue(value, prefix) {
        return Math.round(value) + prefix;
      }

      rangeSlider.on('update', function (values, handle) {
        var value = values[handle];
        if (handle === 0) {
          minInputs[index].value = formatValue(value, prefix);
        } else {
          maxInputs[index].value = formatValue(value, prefix);
        }
      });

      minInputs[index].addEventListener('change', function () {
        rangeSlider.set([this.value.replace(prefix, ''), null]);
      });

      maxInputs[index].addEventListener('change', function () {
        rangeSlider.set([null, this.value.replace(prefix, '')]);
      });
    });
  }
}

window.addEventListener("load", function (e) {
  // Запуск инициализации слайдеров
  initSliders();

  // Запуск инициализации noUiSlider
  noUiSliderInit();
});

document.addEventListener('click', function (e) {
  const targetElement = e.target;

  // Показываем выпадающее меню при клике на стрелку
  if (window.innerWidth > 991.98) {
    if (targetElement.classList.contains('menu__arrow') || targetElement.closest('.menu__arrow')) {
      targetElement.closest('.menu__item').classList.toggle('_hover');
    }
    if (!targetElement.closest('.menu__item') && document.querySelectorAll('.menu__item._hover').length > 0) {
      removeClasses(document.querySelectorAll('.menu__item._hover'), "_hover");
    }
  }

  if (window.innerWidth < 991.98) {
    if (targetElement.classList.contains('menu__arrow')) {
      const arrowParent = targetElement.closest('.menu__item');
      const list = arrowParent.querySelector('ul');
      _slideToggle(list);
      arrowParent.classList.toggle('_hover');
    }
  }

  // Показываем каталог в шапке
  if (targetElement.classList.contains('header-catalog__button .btn') || targetElement.closest('.header-catalog__button')) {
    targetElement.closest('.header-catalog').classList.toggle('_active');
  }

  // Показываем поиск
  if (targetElement.classList.contains('search-form__btn') || targetElement.closest('.search-form__btn')) {
    targetElement.closest('body').classList.add('_search-active');
    bodyLock();
  }
  if (!targetElement.closest('.search-results') && document.querySelectorAll('body._search-active').length > 0 && !targetElement.closest('.search-form')) {
    document.querySelector('body').classList.remove('_search-active');
    bodyUnlock();
  }
  if ((targetElement.classList.contains('search-form__reset') || targetElement.closest('.search-form__reset')) && window.innerWidth <= 991.98) {
    document.querySelector('body').classList.remove('_search-active');
    bodyUnlock();
  }

  // Показываем выбор города
  if (targetElement.classList.contains('location__button') || targetElement.closest('.location__button')) {
    targetElement.closest('body').classList.add('_location-active');
    bodyLock();
  }
  if (!targetElement.closest('.location-dropdown') && document.querySelectorAll('body._location-active').length > 0 && !targetElement.closest('.location__button')) {
    document.querySelector('body').classList.remove('_location-active');
    document.querySelector('body').classList.remove('_location-select');
    bodyUnlock();
  }
  if ((targetElement.classList.contains('location-close') || targetElement.closest('.location-close'))) {
    document.querySelector('body').classList.remove('_location-active');
    document.querySelector('body').classList.remove('_location-select');
    bodyUnlock();
  }
  if ((targetElement.classList.contains('location-next') || targetElement.closest('.location-next'))) {
    document.querySelector('body').classList.add('_location-select');
  }

  // Показываем фильтры на мобильном
  if (targetElement.classList.contains('catalog-filter__caption') || targetElement.closest('.catalog-filter__caption')) {
    targetElement.closest('body').classList.add('_filter-active');
    bodyLock();
  }
  if (targetElement.closest('.catalog-filter__close') || targetElement.closest('.catalog-filter__found')) {
    targetElement.closest('body').classList.remove('_filter-active');
    bodyUnlock();
  }
})

// Скрываем строки с одинаковыми значениями
const compareSwitch = document.querySelector('.compare__switch .switch__input');
if (compareSwitch) {
  compareSwitch.addEventListener('change', function () {
    const isChecked = this.checked;

    const compareCards = document.querySelectorAll('.compare-table__products .compare-attributes');
    const rows = [];

    // Получаем строки из каждой карточки
    compareCards.forEach(card => {
      const cardRows = Array.from(card.querySelectorAll('.compare-attributes__item'));
      rows.push(cardRows);
    });


    // Сравниваем строки между карточками
    rows[0].forEach((row, index) => {
      const rowValues = Array.from(row.children).map(child => child.textContent.trim());

      const isSame = rows.every(cardRows => {
        const currentRowValues = Array.from(cardRows[index].children).map(child => child.textContent.trim());
        return currentRowValues.every((value, i) => value === rowValues[i]);
      });

      if (isSame) {
        rows.forEach(cardRows => {
          const rowToToggle = cardRows[index];
          if (isChecked) {
            rowToToggle.classList.add('d-none');
          } else {
            rowToToggle.classList.remove('d-none');
          }
        });

        const compareAttributesRows = document.querySelectorAll('.compare-table__head .compare-attributes .compare-attributes__item');
        const compareAttributesRow = compareAttributesRows[index];
        compareAttributesRows[index].classList.add('d-none');
        if (isChecked) {
          compareAttributesRow.classList.add('d-none');
        } else {
          compareAttributesRow.classList.remove('d-none');
        }
      }
    })
  });
}

// Поиск нужной инструкции
const templateInstructions = document.querySelector('.template-instructions');
if (templateInstructions) {
  const instructionItems = document.querySelectorAll('.template-instructions__item');
  const instructionSearch = document.querySelector('.template-instructions__search input');

  instructionSearch.addEventListener('input', function () {
    instructionItems.forEach(item => {
      if (item.textContent.toLowerCase().includes(instructionSearch.value.toLowerCase())) {
        item.removeAttribute('hidden');
      } else {
        item.setAttribute('hidden', 'true');
      }
    });
  })
}
