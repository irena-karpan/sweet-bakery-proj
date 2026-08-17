import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import iziToast from 'izitoast';
import raterJs from 'rater-js';

import 'swiper/css';
import 'swiper/css/pagination';

import { fetchFeedbacks } from '../api/feedback-api';

const feedbackList = document.querySelector('#sweet-factory-feedback-list');
const loader = document.querySelector('#feedback-loader') || document.querySelector('.loader-container');
const feedbackControls = document.querySelector('#feedback-controls') || document.querySelector('.feedback-controls');
const navigationButtons = document.querySelector('.feedback-navigation-buttons');

let feedbackSwiper = null;

function createRatingMarkup(rate) {
  return `
    <div
      class="feedback-rating star-rating"
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
          <p class="feedback-text">"${description}"</p>
          <h3 class="feedback-user-name">${author}</h3>
        </li>
      `
    )
    .join('');
}

function initRatings() {
  const ratingElements = document.querySelectorAll('.feedback-rating');

  ratingElements.forEach(element => {
    const value = Number(element.dataset.rating) || 0;

    raterJs({
      element: element,
      max: 5,
      rating: value,
      starSize: 20,
      step: 0.5,
      readOnly: true,
    });
  });
}

function initSwiper() {

  if (feedbackSwiper) return;

  feedbackSwiper = new Swiper('.feedback-swiper', {
    modules: [Navigation, Pagination],

    slidesPerView: 1,
    spaceBetween: 16,

    navigation: {
      prevEl: '.feedback-button-prev',
      nextEl: '.feedback-button-next',
    },

    pagination: {
      el: '.feedback-pagination',
      clickable: true,
      dynamicBullets: true,
    },

    breakpoints: {
      768: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
      1440: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
    },
  });
}

async function renderFeedbackSection() {
loader?.classList.remove('hidden');
feedbackControls?.classList.add('is-hidden');
navigationButtons?.classList.add('is-hidden');


  try {
    const feedbacks = await fetchFeedbacks();

    if (!feedbacks || !feedbacks.length) {
      console.warn('Отримано порожній масив відгуків');
      return;
    }

    if (feedbackList) {
      feedbackList.innerHTML = createFeedbackMarkup(feedbacks);
    }

    
    initRatings();
    initSwiper();

      feedbackControls?.classList.remove('is-hidden');
      navigationButtons?.classList.remove('is-hidden');
  } catch (error) {
    console.error('Помилка завантаження відгуків:', error);

    iziToast.error({
      title: 'Помилка',
      message: 'Не вдалося завантажити відгуки',
      position: 'topRight',
    });
  } finally {
    loader?.classList.add('hidden');
  }
}

renderFeedbackSection();