document.addEventListener("DOMContentLoaded" ,function() {
  // Источник текстов — JSON (ru.json/en.json). Внутренний словарь удалён.
  const homTexts = {};
  const langButtons = document.querySelectorAll("[data-btn]");
  // Включаем i18n: тексты берутся из JSON (ru/en). По умолчанию RU, DOM не трогаем
  const I18N_ENABLED = true;
  const PlayVdeo = document.querySelectorAll(".play_slide_video");
  const play = document.querySelectorAll(".slide-video__video");
  const plays = document.querySelectorAll(".video-preview__plays1");
  const statstitle = document.querySelector(".stats__title");
  const btnen = document.querySelector(".btn_en");
  if (btnen) {
    btnen.addEventListener("click", function () {
      if (window.innerWidth < 680 && statstitle) {
        statstitle.classList.add("stats_title_change");
      }

      if (window.innerWidth < 390 && statstitle) {
    statstitle.style.cssText = `
      font-size: 26px !important
        `;
      }
    });
   }
  // plays.forEach(elem => {
  //   elem.addEventListener("click", function(e) {
        
  //   })
    
  // })
  
  const videos = document.querySelectorAll(".video-portfolio__slider .slide-video__video video");
  let currentLang = "ru";
  const currentPathName = window.location.pathname;
  let currentTexts = {};
  const originalRu = {};

  // play.forEach(video => {
  //   video.addEventListener("click", function(e) {
  //     console.log("safasfasf");
      
  //     video.classList.add("hide_play")
  //   videos.forEach(videos => {
  //     videos.style.opacity = "1"
  //     videos.autoplay = true

  //   })
  //   })
  // })

  function changesAboutUs() {
    langButtons.forEach((btn) => {
      
      btn.addEventListener("click", (event) => {
     langButtons.forEach(btn => {
           btn.classList.remove('lang-switcher__item--active');
        })
        event.target.classList.add('lang-switcher__item--active')
          currentLang = event.target.dataset.btn;
        
         
          changeLang();
         
       
      });
    });
  }
  changesAboutUs()
  function checkPagePathName() {
    switch (currentPathName) {
      case "/index.html":
        
        currentTexts = homTexts;
        break;
    

      default:
        currentTexts = homTexts;
        break;
    }
  }
  checkPagePathName();

  // Синхронизация RU‑копира из текущей разметки и автодобавление недостающих ключей.
  // Это сохраняет все <br> и точную верстку RU‑версии и предотвращает перезапись.
  function syncRuFromDom() {
    try {
      // 1) Добавляем любые отсутствующие ключи из DOM в словарь
      document.querySelectorAll('[data-lang]').forEach((node) => {
        const key = node.getAttribute('data-lang');
        if (!key) return;
        if (!homTexts[key]) homTexts[key] = { ru: '', en: '' };
      });

      // 2) Для всех ключей обновляем RU значением из DOM (с сохранением разметки)
      for (const key in homTexts) {
        const el = document.querySelector(`[data-lang=${key}]`);
        if (el && homTexts[key] && typeof homTexts[key] === 'object') {
          // Не перезаписываем, если RU уже задан в ru.json
          if (!homTexts[key].ru) homTexts[key].ru = el.innerHTML;
        }
      }
    } catch (_) {
      // игнорируем — RU останется как было
    }
  }

  // Сохраняем исходные RU тексты из DOM как "истину" для RU
  function captureOriginalRu() {
    document.querySelectorAll('[data-lang]').forEach((node) => {
      const key = node.getAttribute('data-lang');
      if (!key) return;
      originalRu[key] = node.innerHTML;
    });
  }

   function changeLang() {
    // Обновляем ВСЕ элементы с data-lang, а не только первый
    document.querySelectorAll('[data-lang]').forEach((elem) => {
      const key = elem.getAttribute('data-lang');
      if (!key) return;

      const dict = currentTexts[key] || homTexts[key] || { ru: '', en: '' };
      const ru = originalRu[key] ?? '';
      const en = dict && typeof dict === 'object' ? (dict.en ?? '') : '';
      const value = currentLang === 'en' ? (en || ru) : ru; // RU всегда из DOM
      if (value !== '') elem.innerHTML = value;
    });
  }

  // Фиксируем RU из DOM один раз на старте
  captureOriginalRu();
  // Сначала подтягиваем RU прямо из DOM (сохраняет все <br>),
  // затем применяем выбор языка
  if (I18N_ENABLED) {
    // Не меняем DOM здесь — только наполняем словарь при необходимости
    // syncRuFromDom()
  }
  
  // RU из JSON не грузим — источником RU является DOM

  // Загружаем EN переводы из внешнего JSON и мержим
  async function loadEnTranslations() {
    try {
      const res = await fetch('./assets/i18n/en.json', { cache: 'no-store' });
      if (!res.ok) throw new Error('Failed to load en.json');
      const enDict = await res.json();
      // Мержим только .en, RU уже синхронизирован из DOM
      Object.keys(enDict).forEach((key) => {
        if (!homTexts[key]) homTexts[key] = { ru: '', en: '' };
        homTexts[key].en = enDict[key];
      });
    } catch (e) {
      console.warn('EN i18n load failed:', e);
    } finally {
      // Не перерисовываем RU по умолчанию, чтобы не ломать DOM.
      // Обновляем только если уже выбран EN.
      if (currentLang !== 'ru') changeLang();
    }
  }

  // Порядок: 1) грузим RU из файла (если есть), 2) дополняем RU из DOM, 3) грузим EN, 4) применяем
  if (I18N_ENABLED) {
    (async function initI18n() {
      // RU не грузим, берём из DOM
      await loadEnTranslations();
      // Применяем RU из JSON сразу, чтобы страница совпадала с ru.json
      currentLang = 'ru';
      // Оставляем RU из DOM; EN применится по клику
    })();
  }

    function modalController({modal, btnOpen, btnClose, time = 300}) {
  const buttonElements = document.querySelectorAll(btnOpen);
  const modalElem = document.querySelector(modal);

 

  const openMOdal = () => {
    modalElem.classList.add("modal_animate")
   
   
   
    
    window.addEventListener("keydown", closeModal)
  };
  buttonElements.forEach((item) => {
    item.addEventListener("click", openMOdal);
  });
  modalElem.addEventListener("click", closeModal);

  function closeModal(event) {
    const target = event.target;

    if (target == modalElem || (btnClose && target.closest(btnClose)) || event.code === "Escape") {
    modalElem.classList.remove("modal_animate")
      
      window.removeEventListener("keydown", closeModal)
    }
  }
}

// modalController({
//     modal: ".modal",
//     btnOpen: ".modal_window2",
//     btnClose: ".modal__close",
//     time: "300"
// })
const slider = document.querySelector(".advertising-preview__content .swiper")
const btnPlaySlider = document.querySelectorAll(".modal_window1")
const modalVideo = document.querySelector(".modal_container video")
const modalClose = document.querySelector(".modal__close")
const modal = document.querySelector(".modal")
const imgSlider = document.querySelector(".slider_video .slide-advertising__image img")

// Функция закрытия модалки
function closeVideoModal() {
  if (modal && modalVideo) {
    modal.classList.remove('modal_animate')
    modalVideo.pause()
    modalVideo.currentTime = 0
  }
}

// Обработчик закрытия модалки по кнопке
if (modalClose) {
  modalClose.addEventListener("click", closeVideoModal)
}

// Закрытие по клику на фон модалки
if (modal) {
  modal.addEventListener("click", function(e) {
    // Закрываем только если кликнули на сам фон, а не на content внутри
    if (e.target === modal) {
      closeVideoModal()
    }
  })
}

// Закрытие по Escape
document.addEventListener("keydown", function(e) {
  if (e.key === "Escape" && modal && modal.classList.contains('modal_animate')) {
    closeVideoModal()
  }
})

// Обработчик открытия видео в модалке
if (btnPlaySlider.length > 0 && modalVideo && modal) {
  btnPlaySlider.forEach((btn, index) => {
    btn.addEventListener("click", function(event) {
      event.preventDefault()
      
      // Находим video элемент рядом с кнопкой (nextElementSibling)
      const videoElement = btn.nextElementSibling
      
      if (videoElement && videoElement.tagName === 'VIDEO') {
        const videoSrc = videoElement.getAttribute('src')
        
        if (videoSrc) {
          // Устанавливаем src в модальное видео
          modalVideo.setAttribute('src', videoSrc)
          
          // Открываем модалку
          modal.classList.add('modal_animate')
          
          // Запускаем видео после небольшой задержки
          setTimeout(() => {
            modalVideo.play().catch(err => {
              console.warn('Video autoplay failed:', err)
            })
          }, 300)
        }
      }
    })
  })
}
 const resizableSwiper = (
    breakpoint,
    swiperClass,
    swiperSettings,
    callback
  ) => {
    let swiper;

    breakpoint = window.matchMedia(breakpoint);

    const enableSwiper = function (className, settings) {
      swiper = new Swiper(className, settings);
// const swiperPrev = document.getElementById('swiperPrev')
// const swiperNext = document.getElementById('swiperNext')

// swiperPrev.addEventListener('click', () => {
//   swiper.slidePrev();
// })
// swiperNext.addEventListener('click', () => {
//   swiper.slideNext();
// })
      if (callback) {
        callback(swiper);
      }
    };

    const checker = function () {
      if (breakpoint.matches) {
        return enableSwiper(swiperClass, swiperSettings);
      } else {
        if (swiper !== undefined) swiper.destroy(true, true);
        return;
      }
    };

    breakpoint.addEventListener("change", checker);
    checker();
  };

  const someFunc = (instance) => {
    if (instance) {
      instance.on("slideChange", function (e) {
        console.log("*** mySwiper.activeIndex", instance.activeIndex);
      });
    }
  };

    resizableSwiper("(max-width: 9000px)", ".slider_video10", {
    loop: true,
    spaceBetween: 10,
    slidesPerView: 5,
    freeMode: true,
    pagination: {
            el: ".swiper-pagination",
            clickable: true
          },
    breakpoints: {
      1200: {
        spaceBetween: 20,
      },
    },
  });


   resizableSwiper("(max-width: 1700px)", ".slider_video1", {
    loop: true,
    spaceBetween: 10,
    slidesPerView: 1,
    freeMode: true,
    pagination: {
            el: ".swiper-pagination",
            clickable: true
          },
    breakpoints: {
      1200: {
        spaceBetween: 20,
      },
    },
  });

  // Старое переключение классов отключено — используем единый слайдер выше

  function tabsTriggersItem() {
    document.querySelectorAll(".reviews__item button").forEach(item => {
      item.addEventListener("click", function(e) {
        e.preventDefault()
        let currentBtn = item
        let tabId = currentBtn.getAttribute("data-tab")
        let currentTab = document.querySelector(tabId)
        console.log(currentTab);
        
        
         document.querySelectorAll(".reviews__item button").forEach(child => {
          child.classList.remove("reviews__button_active")
         })
          document.querySelectorAll(".reviews__contents ").forEach(child => {
          child.classList.remove("reviews__contents_active")
         })
         item.classList.add("reviews__button_active")
         currentTab.classList.add("reviews__contents_active")
        
      })
    })
  }
  tabsTriggersItem();

  // Подгоняем логотип APPYLAND под ширину контейнера по реальным пропорциям букв
  // Используем ширину контейнера и сумму аспект‑коэффициентов, чтобы слово занимало всю строку
  function fitHeroLogo() {
    const logo = document.querySelector('.hero__logo');
    if (!logo) return;

    const letters = Array.from(logo.querySelectorAll('.hero__logo-letter'));
    if (!letters.length) return;

    const availableWidth = logo.clientWidth;
    if (!availableWidth) return;

    // Функция возвращает коэффициент ширины к высоте для конкретной буквы
    const getRatio = (index, el) => {
      if (el.classList.contains('letter-a')) return 0.929; // agrass_2 рендер
      if (el.classList.contains('letter-p')) return index === 1 ? 0.745 : 1; // первая P — узкая, вторая квадрат
      if (el.classList.contains('letter-y')) return 810/936; // новая Y_0_1 пропорция
      return 1; // остальные квадратные рендеры
    };

    const ratios = letters.map((el, i) => getRatio(i, el));
    const sumRatios = ratios.reduce((s, r) => s + r, 0);
    if (!sumRatios) return;

    // Вычисляем высоту, чтобы суммарная ширина ровно заняла контейнер
    const targetHeight = Math.max(48, Math.floor(availableWidth / sumRatios));

    letters.forEach((el, i) => {
      const w = Math.round(targetHeight * ratios[i]);
      el.style.height = targetHeight + 'px';
      el.style.width = w + 'px';
    });
  }

  // Инициализация и реакция на ресайз/перерисовку
  window.addEventListener('resize', fitHeroLogo);
  fitHeroLogo();
  // Повтор через небольшой таймаут — на случай поздней загрузки шрифтов/полос прокрутки
  setTimeout(fitHeroLogo, 300);

})