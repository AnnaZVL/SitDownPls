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

// Отмена перезагрузки формы обратной связи
const $formFeedback = document.querySelector('.feedback__form');

$formFeedback.addEventListener('submit', (e) => {
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

const swiperHero = new Swiper('.hero__swiper', {
      slidesPerGroup: 1,
      slidesPerView: 1,
      spaceBetween: 32,
      autoHeight: false,
      loop: false,
      pagination: {
      el: ".hero__swiper-pagination",
      type: "bullets",
      clickable: true
      },
      a11y: {
      containerMessage: 'Галерея событий',
      paginationBulletMessage: `Слайд {{index}}`,
      slideLabelMessage: '{{index}} / {{slidesLength}}',
      enabled: true,
      prevSlideMessage: 'Предыдущий слайд',
      nextSlideMessage: 'Следующий слайд',
      firstSlideMessage: 'Первый слайд',
      lastSlideMessage: 'Последний слайд',
      },
});

 const swiperSpecoffer = new Swiper('.specoffer__swiper', {
      slidesPerGroup: 1,
      slidesPerView: 1,
      spaceBetween: 32,
      autoHeight: false,
      breakpoints: {
      1400: {
      slidesPerGroup: 3,
      slidesPerView: 3,
      spaceBetween: 32,
      },
      768: {
            slidesPerView: 2,
            spaceBetween: 34,
      }, 
      572: {
            slidesPerView: 1,
            
      }
     },
      loop: false,
      navigation: {
      nextEl: '.specoffer__swiper-button-next',
      prevEl: '.specoffer__swiper-button-prev',
      hideOnClick: true
      },
      
      a11y: {
      containerMessage: 'Галерея спецпредложений',
      paginationBulletMessage: `Слайд {{index}}`,
      slideLabelMessage: '{{index}} / {{slidesLength}}',
      enabled: true,
      prevSlideMessage: 'Предыдущий слайд',
      nextSlideMessage: 'Следующий слайд',
      firstSlideMessage: 'Первый слайд',
      lastSlideMessage: 'Последний слайд',
      },
});

const swiperUseful = new Swiper('.useful__swiper', {      
      slidesPerView: 1,
      spaceBetween: 32,     
      breakpoints: {
            1440: {     
                  slidesPerView: 2, 
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
      nextEl: '.useful__swiper-button-next',
      prevEl: '.useful__swiper-button-prev',
      hideOnClick: true
      },
      
      a11y: {
      containerMessage: 'Галерея статей',
      paginationBulletMessage: `Слайд {{index}}`,
      slideLabelMessage: '{{index}} / {{slidesLength}}',
      enabled: true,
      prevSlideMessage: 'Предыдущий слайд',
      nextSlideMessage: 'Следующий слайд',
      firstSlideMessage: 'Первый слайд',
      lastSlideMessage: 'Последний слайд',
      },
});



//Валидация формы
const validate = new JustValidate('.feedback__form')
      
validate
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
      }
      ])
      .addField('#email', [
      {
            rule: 'required',
            errorMessage: 'Поле обязательно для заполнения',
      },
      {
            rule: 'email',
            errorMessage: 'Недопустимый формат',
      },
]);

//Установка маски телефона
const maskSelector = document.getElementById('tel');

Inputmask({"mask": "(999) 999-9999"}).mask(maskSelector);

const $feedbackForm = document.querySelector('.feedback__form');

document.querySelectorAll('.feedback__input').forEach((el) => { 
      el.addEventListener('input', () => {
            el.classList.remove('error');      
      });    
});

$feedbackForm.addEventListener('submit', (e) => {
      e.preventDefault();
     
      document.querySelectorAll('.feedback__input').forEach((el) => {            
            if (el.classList.contains('just-validate-error-field')) {
                  el.classList.add('error')
            };
      });
});

//Тултип
tippy('#marker', {
      content: 'Реплицированные с зарубежных источников, исследования формируют глобальную сеть.',
      arrow: true,
});

//Количество карточек на странице
const $btnMore = document.querySelector('.rating__more'),
      $ratingCart = document.querySelectorAll('.rating__card');

start()
window.addEventListener('resize', start)

function start() {
      const width = document.documentElement.clientWidth;
   
      if (width >= 1320) {
            renderCarts(7, $ratingCart)
      } else {
            renderCarts(5, $ratingCart)
      };
};

function renderCarts(quantity, arr) {
      for (let i = 0; i < arr.length; i++) {
            arr[i].classList.remove('hidden');
            if (i > quantity) {
                  arr[i].classList.add('hidden');
            };
      };
};

// Показать больше/меньше товаров секции Высокий рейтинг
$btnMore.addEventListener('click', () => { 
      $btnMore.classList.toggle('more')
      
      if (!$btnMore.classList.contains('more')) {
            $btnMore.textContent = 'Показать меньше товаров';
            renderCarts(17, $ratingCart)
      } else {
            $btnMore.textContent = 'Смотреть больше товаров';
            renderCarts(7, $ratingCart)
      };      
});