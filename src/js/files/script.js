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
})