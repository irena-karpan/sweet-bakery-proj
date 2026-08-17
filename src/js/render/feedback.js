import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import iziToast from 'izitoast';
import raterJs from 'rater-js';

import 'swiper/css';
import 'swiper/css/navigation';

import { fetchFeedbacks } from '../api/feedback-api';

const feedbackList = document.querySelector(
  '#sweet-factory-feedback-list'
);
const loader = document.querySelector('#feedback-loader');

function initSwiper() {
  setTimeout(() => {
    new Swiper('.feedback-swiper', {
      modules: [Navigation, Pagination],

      slidesPerView: 1,
      spaceBetween: 16,

      observer: true,
      observeParents: true,

      navigation: {
        nextEl: '.feedback-btn-next',
        prevEl: '.feedback-btn-prev',
      },

      pagination: {
        el: '#feedback .feedback-pagination',
        clickable: true,
        dynamicBullets: true,
      },

      breakpoints: {
        768: {
          slidesPerView: 3,
          spaceBetween: 20,
        },

        1440: {
          slidesPerView: 3,
          spaceBetween: 32,
        },
      },
    });
  }, 50);
}

function createRatingMarkup(rate) {
  return `
    <div
      class="feedback-rating"
      data-rating="${Number(rate)}"
    ></div>
  `;
}

function createFeedbackMarkup(feedbacks) {
  return feedbacks
    .map(
      ({ author, description, rate }) => `
        <li class="swiper-slide feedback-card">
          ${createRatingMarkup(rate)}

          <p class="feedback-text">${description}</p>

          <h3 class="feedback-user-name">${author}</h3>
        </li>
      `
    )
    .join('');
}

function initRatings() {
  const ratingElements =
    document.querySelectorAll('.feedback-rating');

  ratingElements.forEach(element => {
    const value = Number(element.dataset.rating);

    raterJs({
      element,
      max: 5,
      rating: value,
      starSize: 20,
      step: 0.5,
      readOnly: true,
    });
  });
}

async function renderFeedbackSection() {
  loader?.classList.remove('hidden');

  try {
    const feedbacks = await fetchFeedbacks();

    if (!feedbacks.length) {
      throw new Error('No feedbacks');
    }

    feedbackList.innerHTML = createFeedbackMarkup(feedbacks);

    initRatings();
  } catch (error) {
    console.error(error);

    iziToast.error({
      message: 'Не вдалося завантажити відгуки',
      position: 'topRight',
    });
  } finally {
    loader?.classList.add('hidden');

    initSwiper();
  }
}

renderFeedbackSection();