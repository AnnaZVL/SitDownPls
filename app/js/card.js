//Select Регион
const $regionSelect = document.getElementById('region');
const choicesRegion = new Choices($regionSelect, {
      searchEnabled: false,
      placeholder: true,
      placeholderValue: null,
      itemSelectText: '',
      allowHTML: false,
      classNames: {
            listDropdown: 'region-dropdown'
      }
});

//Select Категория
const $categorySelect = document.getElementById('category');
const choicesCategory = new Choices($categorySelect, {
      searchEnabled: false,
      placeholder: true,
      placeholderValue: 'Категория',      
      itemSelectText: '',
      allowHTML: false,
      classNames: {
            containerOuter: 'choices choices-category',
            containerInner: 'choices__inner choices__inner-category',
            item: 'choices__item choices__item-category',
      }
});

// Отмена перезагрузки формы поиска
const $formSearch = document.querySelector('.search');

$formSearch.addEventListener('submit', (e) => {
      e.preventDefault();
});

//Бургер меню
const $btnBurger = document.querySelector('.burger-btn'),
      $btnClose = document.querySelector('.menu-pages__close'),
      $menuBox = document.querySelector('.menu-pages'),
      $menu = document.querySelector('.menu-pages__list');

$btnBurger.addEventListener('click', () => {      
      $btnBurger.classList.toggle('open');
      $menuBox.classList.toggle('active');
});

$btnClose.addEventListener('click', () => { 
      $btnBurger.classList.remove('open');  
      $menuBox.classList.remove('active');
});

// Свайпер похожих товаров
const swiperSimilar = new Swiper('.similar__swiper', {      
    slidesPerView: 2,
    spaceBetween: 16,   
    breakpoints: {
          1220: {     
                slidesPerView: 4, 
                spaceBetween: 32,     
          },
          1024: {     
                slidesPerView: 3,  
                spaceBetween: 32,     
          },
          568: {     
                slidesPerView: 2, 
                spaceBetween: 32,     
          },
    },
    loop: false,
    navigation: {
    nextEl: '.similar__swiper-button-next',
    prevEl: '.similar__swiper-button-prev',
    hideOnClick: true
    },    
    a11y: {
    containerMessage: 'Галерея похожих товаров',
    paginationBulletMessage: `Слайд {{index}}`,
    slideLabelMessage: '{{index}} / {{slidesLength}}',
    enabled: true,
    prevSlideMessage: 'Предыдущий слайд',
    nextSlideMessage: 'Следующий слайд',
    firstSlideMessage: 'Первый слайд',
    lastSlideMessage: 'Последний слайд',
    },
});

const swiperDetailsThumbs = new Swiper('.modal-swiper__thumbs', {      
      slidesPerView: 1,
      spaceBetween: 72,   
      breakpoints: {
            768: {     
                  slidesPerView: 4, 
                  spaceBetween: 72,     
            },
            568: {     
                  slidesPerView: 2, 
                  spaceBetween: 72,     
            },
      },
      
      loop: true,      
      a11y: {
      containerMessage: 'Галерея товара',
      paginationBulletMessage: `Слайд {{index}}`,
      slideLabelMessage: '{{index}} / {{slidesLength}}',
      enabled: true,
      prevSlideMessage: 'Предыдущий слайд',
      nextSlideMessage: 'Следующий слайд',
      firstSlideMessage: 'Первый слайд',
      lastSlideMessage: 'Последний слайд',
      },
      navigation: {
            nextEl: '.btn__next',
            prevEl: '.btn__prev',
            hideOnClick: true
      },
  });

const swiperDetails = new Swiper('.modal-swiper__swiper', {      
      slidesPerView: 1,
      spaceBetween: 50,   
      loop: false,
      thumbs: {
            swiper: swiperDetailsThumbs,
          },      
      a11y: {
      containerMessage: 'Галерея товара',
      paginationBulletMessage: `Слайд {{index}}`,
      slideLabelMessage: '{{index}} / {{slidesLength}}',
      enabled: true,
      prevSlideMessage: 'Предыдущий слайд',
      nextSlideMessage: 'Следующий слайд',
      firstSlideMessage: 'Первый слайд',
      lastSlideMessage: 'Последний слайд',
      },
  });

//Модальное окно свайпера
const $btnModalSwiperOpen = document.querySelector('.details__left-top'),
      $btnModalExit = document.querySelectorAll('.modal__btn-exit'),
      $modalWrapperSwiper = document.querySelector('.modal-swiper');      

$btnModalSwiperOpen.addEventListener('click', () => {
      $modalWrapperSwiper.classList.add('open');
      disableScroll();
});

$btnModalExit.forEach(button => {
      button.addEventListener('click', () => {
            if ($modalWrapperSwiper) {
                  $modalWrapperSwiper.classList.remove('open');
            };
            if ($modalWrapperForm) {
                  $modalWrapperForm.classList.remove('open');
            };
            enableScroll();
      });
});

//Модальное окно формы
const $btnModalFormOpen = document.querySelector('.details__btn'),
      $modalWrapperForm = document.querySelector('.modal-form'),
      $modalWrapper = document.querySelectorAll('.modal'),
      $modalcontent = document.querySelector('.modal__content-form'),
      $modalForm = document.querySelector('.modal-form');

$btnModalFormOpen.addEventListener('click', () => {
      $modalWrapperForm.classList.add('open');
      disableScroll();      
});

//Запрет скрола при открытом модальном окне и убран прыжок на ширину скрола
function disableScroll() {
      let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
      document.body.classList.add('disable-scroll');
      document.body.style.paddingRight = paddingOffset;
};

//Возвращение скрола при закрытии модального окна
function enableScroll() {
      document.body.classList.remove('disable-scroll');
      document.body.style.paddingRight = 0;
};

//Валидация формы
const validateModal = new JustValidate('.form')
                  
validateModal
      .addField('#name', [
      {
            rule: 'required',
            value: 3,
            errorMessage: 'Поле обязательно для заполнения',
      }
      ])
      .addField('#tel', [
      {
            rule: 'required',
            errorMessage: 'Поле обязательно для заполнения',
      },
]);

$modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (validateModal.isValid) {
            //Создание модального окна "Перезвоним"
            const $img = document.createElement('img'),
            $text = document.createElement('span');

            $img.src = '../../images/icons/modal_logo.svg';
            $img.classList.add('modal__img');

            $text.textContent = 'Спасибо, мы вам перезвоним!';
            $text.classList.add('modal__call');

            $modalcontent.textContent = '';
            $modalcontent.append($img, $text);
      };
});

//Закрытие модального окна по крестику и вне формы
$modalWrapper.forEach(el => {
      el.onclick = function (e) {
            let target = e.target;        
            if (target.matches('.modal__wrapper') || target.matches('.modal__btn-exit')) {       
                  el.classList.remove('open');                    
            }; 
      };
});

