document.addEventListener("DOMContentLoaded" ,function() {
  const homTexts = {
     services: {
      ru: "услуги",
      en: "services",
    },
     portfolio: {
      ru: "Портфолио",
      en: "portfolio",
    },
     aboutus: {
      ru: "О нас",
      en: "About Us",
    },
     project: {
      ru: "Обсудить проект",
      en: "Discuss the project",
    },
     whoweare: {
      ru: "Кто мы",
      en: "Who we are",
    },
     text: {
      ru: "Креативная команда, которая делает точно, с душой и вау-эффектом.",
      en: "A creative team that delivers with precision, passion, and wow-factor.",
    },
     text1: {
      ru: "Наши партнёры возвращаются, <br><span>because we make them hAPPY!</span>",
      en: "Our partners are returning, <br><span>because we make them hAPPY!</span>",
    },
     text2: {
      ru: "МЫ ЛЮБИМ ДИЗАЙН <br /> <span> <img src='./assets/img/smile.png' alt='Image'/></span> И ЦИФРЫ ЭТО ПОДТВЕРЖДАЮТ!",
      en: "WE LOVE DESIGN <br /> <span> <img src='./assets/img/smile.png' alt='Image'/></span>AND THE NUMBERS PROVE IT!",
    },
     text3: {
      ru: "Лет опыта и проектов",
      en: "Years of experience and projects",
    },
     text5: {
      ru: "Роликов и баннеров",
      en: "Videos and banners",
    },
     text6: {
      ru: "Довольных клиентов",
      en: "Satisfied customers",
    },
     text7: {
      ru: "Идей для воплощения ваших задумок",
      en: "Ideas to bring your ideas to life",
    },
     text8: {
      ru: "С НАМИ РАБОТАЛИ",
      en: "WE WORKED WITH",
    },
     text9: {
      ru: "что мы делаем",
      en: "what we do",
    },
     text10: {
      ru: "промо и обучающие ролики",
      en: "promotional and educational videos",
    },
     text11: {
      ru: "2D-графика",
      en: "2D graphics",
    },
     text12: {
      ru: "иллюстрации",
      en: "illustrations",
    },
     text13: {
      ru: "3D-дизайн",
      en: "3D design",
    },
     text14: {
      ru: "баннеры",
      en: "banners",
    },
     text15: {
      ru: "А теперь то, чем мы гордимся",
      en: "And now, what we're proud of",
    },
     text16: {
      ru: "Креатив, в который мы вложили себя. Листайте!",
      en: "Creative work we've put ourselves into. Scroll through!",
    },
     text17: {
      ru: "наши кейсы",
      en: "our cases",
    },
     text18: {
      ru: "Ещё нас можно найти тут",
      en: "You can also find us here",
    },
     text19: {
      ru: "баннеры",
      en: "banners",
    },
     text20: {
      ru: "иллюстрации",
      en: "illustrations",
    },
     text21: {
      ru: "АЛЬФА-БАНК",
      en: "ALFA-BANK",
    },
     text22: {
      ru: "Иллюстрации и кук visuals с 3D и AI, анимация для TikTok, оформление для брендинг дизайн-процесс под различные дизайн-форматы.",
      en: "Illustrations and visuals with 3D and AI, animation for TikTok, branding design process for various design formats.",
    },
     text23: {
      ru: "Анимированные иконки в фирменном стиле и простое визуальное объяснение, как работает прокси-сервер и зачем он нужен.",
      en: "Animated icons in your brand style and a simple visual explanation of how a proxy server works and why it's needed.",
    },
     text24: {
      ru: "Моушн-дизайн",
      en: "Motion design",
    },
     text25: {
      ru: "Рекламные ролики",
      en: "Commercials",
    },
     text26: {
      ru: "Яндекс Образование. Игра Визионеры",
      en: "Yandex Education. Visionaries Game",
    },
     text27: {
      ru: "С помощью моушн-графики рассказали о том, как играть в игру «Визионеры».",
      en: "Using motion graphics, we explained how to play the game 'Visionaries.'",
    },
     text28: {
      ru: "Appodeal. рекламная кампания",
      en: "Appodeal advertising campaign",
    },
     text29: {
      ru: "Серия креативов для Appodeal — коротко, ярко, по делу о преимуществах сервиса.",
      en: "A series of creatives for Appodeal—short, bright, and to the point about the service's benefits.",
    },
     text30: {
      ru: "SOAX. Продуктовый эксплейнер",
      en: "SOAX. Product Explainer",
    },
       text31: {
      ru: "Наглядное видео о том, как работает сервис, и почему он такой удобный.",
      en: "A visual video about how the service works and why it's so convenient.",
    },
       text32: {
      ru: "Tencent.PUBG Showreel",
      en: "Tencent.PUBG Showreel",
    },
       text33: {
      ru: "Собрали всё крутое, что делали для PUBG, в один динамичный ролик.",
      en: "We've compiled all the cool stuff we've done for PUBG into one dynamic video.",
    },
       text34: {
      ru: "Tencent x Егор Крид.PUBG",
      en: "Tencent x Egor Creed.PUBG",
    },
      video: {
      ru: "Видео в поддержку масштабной коллаборации PUBG и Егора Крида.",
      en: "A video in support of the large-scale collaboration between PUBG and Egor Creed.",
    },
       text35: {
      ru: "Альфа-Банк. <b> <br>сБП",
      en: "Alfa-Bank.<br>SBP",
    },
       text36: {
      ru: "Просто о том, как выбрать банк основным для СБП.",
      en: "Simply about how to choose a bank as the main one for the SBP.",
    },
       text37: {
      ru: "Альфа-Банк. A-Клуб PRO",
      en: "Alfa-Bank.A-Club PRO",
    },
       text38: {
      ru: "Ролик про закрытый клуб для самых-самых клиентов Альфы.",
      en: "A video about a private club for Alfa's most exclusive clients.",
    },
       text39: {
      ru: "Альфа-Банк. Умная камера",
      en: "Alfa-Bank.Smart camera",
    },
       text40: {
      ru: "Простым языком рассказываем, как работает «умная» камера в приложении и зачем она нужна.",
      en: "In simple terms, we explain how the app's smart camera works and why it's needed.",
    },
       text41: {
      ru: "Профи.ру. <br>Видеокреатив",
      en: "Profi.ru Video creative",
    },
       text42: {
      ru: "Про то, как легко найти мастера на все руки.",
      en: "About how easy it is to find a jack of all trades.",
    },
       text43: {
      ru: "Appodeal. <br> Реклама",
      en: "Appodeal. Advertising",
    },
       text44: {
      ru: "Серия креативов для Appodeal — коротко, ярко, по делу о сервисе.",
      en: "A series of creatives for Appodeal — short, bright, and to the point about the service.",
    },
       text45: {
      ru: "Яндекс Игры. TikTok-кампания",
      en: "Yandex Games TikTok campaign",
    },
       text46: {
      ru: "Видеокреативы для запуска рекламы в TikTok с крутым результатом по CPI.",
      en: "Video creatives for TikTok ads with great CPI results.",
    },
       text47: {
      ru: "Indrive. <br>Реклама",
      en: "Indrive. <br>Advertising",
    },
       text48: {
      ru: "Промо креатив для международного сервиса такси.",
      en: "Promotional creative for an international taxi service.",
    },
       text49: {
      ru: "Альфа-Банк. Кэшбек до 20%",
      en: "Alfa-Bank. Cashback up to 20%",
    },
       text50: {
      ru: "О том, как просто настроить кэшбек.",
      en: "How to easily set up cashback.",
    },
       text51: {
      ru: "Смотреть ролик!",
      en: "Watch the video!",
    },
       text52: {
      ru: "Персонажи шоурила, в котором собрано всё самое крутое из наших работ для PUBG в одном динамичном ролике.",
      en: "Characters from a showreel that brings together all the coolest of our PUBG work in one dynamic video.",
    },
       text53: {
      ru: "Персонаж из наших роликов о том, как работает прокси-сервис, и почему он такой удобный.",
      en: "A character from our videos about how a proxy service works and why it's so convenient.",
    },
      alfa: {
      ru: "Альфа-Банк",
      en: "Alfa-Bank",
    },
       text54: {
      ru: "Интерактивные сторисв приложении банка, которые рассказывают о сервисах и вовлекают пользователей.",
      en: "Interactive stories in the bank's app that explain services and engage users.",
    },
       text55: {
      ru: "Как мы работаем",
      en: "How we work",
    },
       text56: {
      ru: "Как всё происходит: <br> от «хочу» до «вау!»",
      en: "How it all happens: <br> from 'I want it to 'wow!'",
    },
       text57: {
      ru: "БРИФ",
      en: "BRIEF",
    },
       text58: {
      ru: "Обсуждаем задачу",
      en: "Let's discuss the problem",
    },
       text59: {
      ru: "СТАРТ",
      en: "START",
    },
       text60: {
      ru: "Считаем и утверждаем",
      en: "We count and affirm",
    },
       text61: {
      ru: "РАБОТА",
      en: "JOB",
    },
       text62: {
      ru: "Делаем и дорабатываем",
      en: "We're doing it and improving it",
    },
       text63: {
      ru: "Финал",
      en: "The finale",
    },
        text64: {
      ru: "Сдаем и радуем",
      en: "We rent and make you happy",
    },
       text65: {
      ru: "Сроки и стоимость зависят от сложности задачи и объема креативов на выходе. <br> <br> Но у нас есть один секрет: чем больше объём задач, тем комфортнее будет стоимость.",
      en: "Timeframes and prices depend on the complexity of the task and the volume of creative output.<br> <br> But we have a secret: the larger the task, the more affordable the price.",
    },
       text66: {
      ru: "Но у нас есть один секрет: чем больше объём задач, тем комфортнее будет стоимость.",
      en: "But we have one secret: the larger the volume of tasks, the more comfortable the price will be.",
    },
       text67: {
      ru: "наш секрет прост - классная команда",
      en: "Our secret is simple - a great team",
    },
       text68: {
      ru: "Собрали тех, кто любит своё дело и умеет делать круто. Креаторы, моушн-дизайнеры, 3D-артисты, иллюстраторы: такие разные, но на одной волне. <br> <br> Общаемся легко, думаем глубоко, собираем проекты по миллиметру. <br>И да, на позитивных вайбах, всегда!",
      en: "We brought together those who love their craft and know how to do great things. <br> <br>Creatives, motion designers, 3D artists, illustrators: so different, but on the same wavelength.",
    },
       text69: {
      ru: "Общаемся легко, думаем глубоко, собираем проекты по миллиметру. И да, на позитивных вайбах, всегда!",
      en: "We communicate easily, think deeply, and assemble projects down to the last millimeter. And yes, always with a positive vibe!",
    },
       text70: {
      ru: "знакомьтесь!",
      en: "meet!",
    },
       text71: {
      ru: "Антон",
      en: "Anton",
    },
       text72: {
      ru: "Паша",
      en: "Pasha",
    },
       text73: {
      ru: "Маша",
      en: "Masha",
    },
       text74: {
      ru: "Надя",
      en: "Nadya",
    },
       text75: {
      ru: "Марина",
      en: "Marina",
    },
       text76: {
      ru: "Ника",
      en: "Nika",
    },
       text77: {
      ru: "Алик",
      en: "Alik",
    },
       text78: {
      ru: "Илья",
      en: "Ilya",
    },
        text79: {
      ru: "Женя",
      en: "Zhenya",
    },
        text80: {
      ru: "Лада",
      en: "Lada",
    },
        text81: {
      ru: "Настя",
      en: "Nastya",
    },
        text82: {
      ru: "Алина",
      en: "Alina",
    },
        text83: {
      ru: "А что говорят о нас?",
      en: "What do they say about us?",
    },
        text84: {
      ru: "За время работы мы собрали целую коллекцию историй и отзывов. И каждая — напоминание о том, что мы всё делаем не зря. Вот что о нас говорят те, с кем мы работали.",
      en: "Over the years, we've collected a whole collection of stories and testimonials. And each one is a reminder that everything we do isn't in vain. Here's what those we've worked with say about us.",
    },
        text85: {
      ru: "Хотите обсудить проект",
      en: "Would you like to discuss the project?",
    },
        text86: {
      ru: "Напишите нам",
      en: "Write to us",
    },
        text87: {
      ru: "",
      en: "",
    },
        text88: {
      ru: "",
      en: "",
    },
        text89: {
      ru: "",
      en: "",
    },
        text90: {
      ru: "",
      en: "",
    },
        text91: {
      ru: "",
      en: "",
    },
        text92: {
      ru: "",
      en: "",
    },
        text93: {
      ru: "",
      en: "",
    },
        text94: {
      ru: "",
      en: "",
    },
        text95: {
      ru: "",
      en: "",
    },
        text96: {
      ru: "",
      en: "",
    },
        text97: {
      ru: "",
      en: "",
    },
        text98: {
      ru: "",
      en: "",
    },
        text99: {
      ru: "",
      en: "",
    },
    
        text100: {
      ru: "Смотреть ролик!",
      en: "Watch the video!",
    },

     text101: {
      ru: "Моушн-дизайн",
      en: "Motion design",
    },
     text102: {
      ru: "Рекламные ролики",
      en: "Commercials",
    }





   
  }
  const langButtons = document.querySelectorAll("[data-btn]");
  const PlayVdeo = document.querySelectorAll(".play_slide_video");
  const play = document.querySelectorAll(".slide-video__video");
  const plays = document.querySelectorAll(".video-preview__plays1");
  const statstitle = document.querySelector(".stats__title");
  const btnen = document.querySelector(".btn_en");
 btnen.addEventListener("click",function() {
  if(window.innerWidth < 680) {
  statstitle.classList.add("stats_title_change")
  }

   if(window.innerWidth < 390) {
    statstitle.style.cssText = `
      font-size: 26px !important
    `
   }
 })
  // plays.forEach(elem => {
  //   elem.addEventListener("click", function(e) {
        
  //   })
    
  // })
  
  const videos = document.querySelectorAll(".video-portfolio__slider .slide-video__video video");
  let currentLang = "ru";
  const currentPathName = window.location.pathname;
  let currentTexts = {};

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

   function changeLang() {
    for (const key in currentTexts) {
      let elem = document.querySelector(`[data-lang=${key}]`);
      if (elem) {
        elem.innerHTML = currentTexts[key][currentLang];
      }
    }
  }
  changeLang()

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
const imgSlider = document.querySelector(".slider_video .slide-advertising__image img")
// modalController({
//     modal: ".modal2",
//     btnOpen: ".modal_window2",
//     btnClose: ".modal__close"
// })
modalClose.addEventListener("click", function(e) {
  e.target.previousElementSibling.firstElementChild.src =""
  console.log( e.target.previousElementSibling.src);
  
})
btnPlaySlider.forEach(btn => {
  btn.addEventListener("click", function(event) {
    let target = event.target
    if(target) {
    btn.style.display ="none"
    
      btn.previousElementSibling.children[2].style.display ="none"

    console.log(btn.previousElementSibling);
    
     target.nextElementSibling.style.display ="block"
      
    }
   
  })
})
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
  //   navigation: {
  //   nextEl: '.swiper-button-next',
  //   prevEl: '.swiper-button-prev',
  //   clickable: true
  // },
    // autoplay: {
    //     delay: 5000,
    //   },
    // pagination: {
    //   el: ".swiperslider-pagination",
    //   clickable: true,
    // },
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
  //   navigation: {
  //   nextEl: '.swiper-button-next',
  //   prevEl: '.swiper-button-prev',
  //   clickable: true
  // },
    // autoplay: {
    //     delay: 5000,
    //   },
    // pagination: {
    //   el: ".swiperslider-pagination",
    //   clickable: true,
    // },
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

  if(window.innerWidth < 1700) {
    console.log("slider");
    slider.classList.remove('advertising-preview__slider')
     slider.classList.add('slider_video')
  }

    if(window.innerWidth > 1700) {
    console.log("slider");
    slider.classList.remove('slider_video')
     slider.classList.add('advertising-preview__slider')
  }
  if(window.innerWidth < 1030) {
    console.log("slider");
    slider.classList.add('slider_video2')
     slider.classList.remove('slider_video')
  }

  if(window.innerWidth > 1030) {
       slider.classList.remove('slider_video2')
  }

   if(window.innerWidth < 680) {
       slider.classList.remove('slider_video2')
       slider.classList.add('advertising-preview__slider')
  }

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
})