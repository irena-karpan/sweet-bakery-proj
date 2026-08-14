import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

import 'swiper/css';

let aboutUsSwiper = null;

const paginationBullets = document.querySelectorAll(
  '.about-us-pagination-bullet'
);

function updatePagination(activeIndex) {
  paginationBullets.forEach((bullet, index) => {
    bullet.classList.toggle('is-active', index === activeIndex);
  });
}

function initAboutUsSwiper() {
  if (window.innerWidth >= 768 && !aboutUsSwiper) {
    aboutUsSwiper = new Swiper('.about-us-swiper', {
      modules: [Navigation],

      slidesPerView: 2,
      spaceBetween: 24,

      navigation: {
        prevEl: '.about-us-button-prev',
        nextEl: '.about-us-button-next',
      },

      on: {
        slideChange(swiper) {
          updatePagination(swiper.activeIndex);
        },
      },
    });

    paginationBullets.forEach(bullet => {
      bullet.addEventListener('click', () => {
        const slideIndex = Number(bullet.dataset.slide);

        const maxIndex =
          aboutUsSwiper.slides.length - aboutUsSwiper.params.slidesPerView;

        const targetIndex = Math.min(slideIndex, maxIndex);

        aboutUsSwiper.slideTo(targetIndex);

        updatePagination(slideIndex);
      });
    });

    updatePagination(0);
  }

  if (window.innerWidth < 768 && aboutUsSwiper) {
    aboutUsSwiper.destroy(true, true);
    aboutUsSwiper = null;

    updatePagination(0);
  }
}

initAboutUsSwiper();

window.addEventListener('resize', initAboutUsSwiper);
