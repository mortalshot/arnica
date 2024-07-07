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
}

window.addEventListener("load", function (e) {
  // Запуск инициализации слайдеров
  initSliders();
  // Запуск инициализации скролла на базе слайдера (по классу swiper_scroll)
  //initSlidersScroll();
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
})