import noUiSlider from '/libs/nouislider.mjs';

const $btnPagNext = document.querySelector('.btn-next'),
      $btnPagPrev = document.querySelector('.btn-prev'),   
      $btnPagEnd = document.querySelector('.btn-end'),    
      $catalogCart = document.querySelectorAll('.catalog__card');

start()
window.addEventListener('resize', start)

function start() {
    const width = document.documentElement.clientWidth;
 
    if (width >= 1320 || (width <= 1024 && width >= 980)) {
          renderCarts(8, $catalogCart);         
    };

    if ((width <= 1320 && width > 1024) || width <= 980) {
          renderCarts(5, $catalogCart);
    };

    $btnPagPrev.addEventListener('click', () =>  {    
        $btnPagNext.classList.remove('active');
        $btnPagEnd.classList.remove('active');
        $btnPagPrev.classList.add('active');
        if (width >= 1320) {
            renderCarts(8, $catalogCart, 0);
        };
        if (width <= 1320 && width >= 1024) {
            renderCarts(5, $catalogCart, 0);
        };    
    });

    $btnPagNext.addEventListener('click', () =>  {
        $btnPagPrev.classList.remove('active');
        $btnPagEnd.classList.remove('active');
        $btnPagNext.classList.add('active');
        if (width >= 1320) {
            renderCarts(8, $catalogCart, 8);
        };

        if (width <= 1320 && width >= 1024) {
            renderCarts(5, $catalogCart, 6);
        };
    });

    $btnPagEnd.addEventListener('click', () =>  {
        $btnPagPrev.classList.remove('active');
        $btnPagNext.classList.remove('active');
        $btnPagEnd.classList.add('active');
       
        renderCarts(5, $catalogCart, 6);        
    });
};

function renderCarts(quantity, arr, startNumber = 0) {
    for (let i = 0; i < arr.length; i++) {
          arr[i].classList.remove('hidden');
          if (i > quantity) {
                arr[i - startNumber].classList.add('hidden');
          };
    };
};

const slider = document.getElementById('slider'),
    $inputs = document.querySelectorAll('.price'),
    $priceFrom = document.querySelector('.price__from'),
    $priceTo = document.querySelector('.price__to');

noUiSlider.create(slider, {
    start: [5000, 150000],
    connect: true,
    range: {
        'min': 0,
        'max': 200000
    }
});

slider.noUiSlider.on('update', function (values, handle) {
    $inputs[handle].value = Math.trunc(values[handle]);
});

$inputs.forEach(function (input, handle) {
    input.addEventListener('change', function () {
        slider.noUiSlider.setHandle(handle, this.value);
    });
});

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

//Спойлеры фильтра 
const spoilersArr = document.querySelectorAll('[data-spoilers]');

if (spoilersArr.length > 0) {
    const spoilers = Array.from(spoilersArr).filter(function (item, index, self) {
        return item.dataset.spoilers.split(',')[0];
    });

    if (spoilers.length > 0) {
        const breakpointArr = [];
        spoilers.forEach(item => {
            const params = item.dataset.spoilers;
            const breakpoint = {};
            const paramsArr = params.split(',');

            breakpoint.value = paramsArr[0];
            breakpoint.type = paramsArr[1] ? paramsArr[1].trim() : "max";
            breakpoint.item = item;

            breakpointArr.push(breakpoint);  
            
        });    

        let mediaQuerys = breakpointArr.map(function(item) {
            return '(' + item.type + '-width: ' + item.value + 'px),' + item.value + ',' + item.type;
        });
        
        mediaQuerys = mediaQuerys.filter(function(item, index, self) {            
            return self.indexOf(item) === index;
        });
        
        mediaQuerys.forEach(breakpoint => {
            const paramArr = breakpoint.split(','),
                mediaBreakpoint = paramArr[1],
                mediaType = paramArr[2],
                matchMedia = window.matchMedia(paramArr[0]);
            
            const spoilersArr = breakpointArr.filter(function(item) {
                if (item.value === mediaBreakpoint && item.type === mediaType) {
                    return true;
                };
            });
            matchMedia.addEventListener('change', function(){
               
                initSpoiler(spoilersArr, matchMedia)
            })
            initSpoiler(spoilersArr, matchMedia)
        });
    };
};

function initSpoiler(spoilersArr, matchMedia = false) {
    spoilersArr.forEach(spoilersBlock => {
        spoilersBlock = matchMedia ? spoilersBlock.item : spoilersBlock;

        if (matchMedia.matches ||!matchMedia) {
            spoilersBlock.classList.add('_init');
            initSpoilersBody(spoilersBlock);
            spoilersBlock.addEventListener('click', setSpoilerAction);
        } else {
            spoilersBlock.classList.remove('_init');
            initSpoilersBody(spoilersBlock, false);
        }
    })
}

function initSpoilersBody(spoilersBlock, hideSpoilerBody = true) {
    const $spoilerTitle = spoilersBlock.querySelector('[data-spoiler]'),
        $spoilerItem  = spoilersBlock.querySelector('.filter__item'),
        $spoilerBody = spoilersBlock.querySelector('.filter__body');

    $spoilerTitle.addEventListener('click', () => {
        if (!$spoilerTitle.classList.contains('_active')) {            
            $spoilerTitle.classList.toggle('_active');
            $spoilerItem.classList.toggle('_active');
            $spoilerBody.classList.toggle('_active');
        };        
    });
};

function setSpoilerAction(e) {
    const el = e.target;
    if (el.hasAttribute('[data-spoiler]') || el.closest('[data-spoiler]')) {
        const spoilerTitle = el.hasAttribute('[data-spoiler]') ? el : el.closest('[data-spoiler]')
        const spoilersBlock = spoilerTitle.closest('[data-spoilers]');
        const oneSpoiler = spoilersBlock.hasAttribute('[data-one-spoiler]') ? true : false;
        if (!spoilersBlock.querySelectorAll('_slide').length) {
            if (oneSpoiler &&!spoilerTitle.classList.contains('_active')) {
                hideSpoilerBody(spoilersBlock);
            }
            spoilerTitle.classList.toggle('_active');            
        }
        e.preventDefault();
    };
};

function hideSpoilerBody(spoilersBlock) {
    const spoilersActiveTitle = spoilersBlock.querySelector(('[data-spoiler]._active'));
    if (spoilersActiveTitle) {
        spoilersActiveTitle.classList.remove('_active');        
    };
};