import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import Swiper from 'swiper';
import { Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { fetchPopularProducts } from '../api/bestsellers-api';



const swiperWrapper = document.querySelector('.popular-swiper .swiper-wrapper');
const loaderContainer = document.querySelector('.loader-container');
const sliderControls = document.querySelector('.slider-controls');

export function renderPopularProducts(products, container) {

  const markup = products
      .map(({ _id, image, name, price, category, description }) => {
        
      return `
        <div class="swiper-slide">
          <article class="product-card">
            <div class="product-card-thumb">
              <img 
                src="${image}" 
                alt="${name}" 
                width="280" 
              />
            </div>

            <div class="product-card-content">
              <p class="product-card-category">${category.name}</p>
              <h3 class="product-card-title">${name}</h3>
              <p class="product-card-desc">${description}</p>
            </div>

            <div class="product-card-footer">
              <p class="product-card-price">${price} грн</p>
              
              <button 
                type="button" 
                class="product-card-btn-arrow js-open-modal" 
                data-id="${_id}"
                aria-label="Переглянути деталі ${name}"
              > <svg class="arrow-card-icon" width="24" height="24">
            <use href="./img/sprite.svg#arrow_outward-icon"></use>
          </svg>
              </button>
            </div>
          </article>
        </div>
      `;
    })
    .join('');

  container.innerHTML = markup;
}

function initSwiper() {
  new Swiper('.popular-swiper', {
    
    modules: [Pagination, Navigation],

    slidesPerView: 1,
    spaceBetween: 16,

    pagination: {
  el: '.slider-controls .popular-pagination',
  clickable: true,
  dynamicBullets: true,
  dynamicMainBullets: 1, 
},

    
    navigation: {
      nextEl: '.slider-controls .slider-button-next',
      prevEl: '.slider-controls .slider-button-prev',
    },

    
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 16,
      },
      1440: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
    },
  });
}

async function initPopularSection() {
  if (!swiperWrapper) return;

    try {
        
      const products = await fetchPopularProducts();

      if (!products || products.length < 3) {
      swiperWrapper.innerHTML = '<p class="error-message">На жаль, десерти відсутні</p>';
      return;
    }
      
      renderPopularProducts(products, swiperWrapper);
      
      initSwiper();

  } catch (error) {
    console.error('Помилка завантаження:', error);
    
    swiperWrapper.innerHTML = '<p class="error-message">Не вдалося завантажити бестселлери</p>';
      
    iziToast.error({
      title: 'Помилка',
      message: 'Не вдалося завантажити популярні десерти',
      position: 'topRight',
    });
  } finally {
    loaderContainer.classList.add('is-hidden');
    sliderControls.classList.remove('is-hidden');
  }
}

initPopularSection();