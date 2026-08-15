import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

let aboutUsSwiper = null;

function initAboutUsSwiper() {
  if (window.innerWidth >= 768 && !aboutUsSwiper) {
    aboutUsSwiper = new Swiper('.about-us-swiper', {
      modules: [Navigation, Pagination],

      slidesPerView: 2,
      spaceBetween: 24,

      navigation: {
        prevEl: '.about-us-button-prev',
        nextEl: '.about-us-button-next',
      },

      pagination: {
        el: '.about-us-pagination',
        clickable: true,
        dynamicBullets: true,
      },
    });
  }

  if (window.innerWidth < 768 && aboutUsSwiper) {
    aboutUsSwiper.destroy(true, true);
    aboutUsSwiper = null;
  }
}

initAboutUsSwiper();

window.addEventListener('resize', initAboutUsSwiper);
