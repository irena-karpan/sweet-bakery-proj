import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import iziToast from 'izitoast';
import { fetchFeedbacks } from '../api/feedback-api.js';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const feedbackList = document.getElementById('feedback-list');
const loader = document.querySelector('.loader');

function createFeedbackMarkup(feedbacks) {
  return feedbacks
    .map(
      ({ author, description, rate }) => `
      <li class="swiper-slide feedback-card">
        <div class="star-rating" style="--rating: ${rate};" aria-label="Rating: ${rate} out of 5"></div>
        <p class="feedback-text">${description}</p>
        <h3 class="feedback-user-name">${author}</h3>
      </li>
    `
    )
    .join('');
}

function initSwiper() {
  new Swiper('.feedback-swiper', {
    modules: [Navigation, Pagination],
    slidesPerView: 1,
    spaceBetween: 20,
    setWrapperSize: true,

    navigation: {
      nextEl: '.feedback-btn-next',
      prevEl: '.feedback-btn-prev',
    },

    pagination: {
      el: '.feedback-pagination',
      clickable: true,
      dynamicBullets: true, // Дод. завд.: динамічна пагінація за дефолтом
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
}

async function renderFeedbackSection() {
  if (loader) loader.classList.remove('is-hidden');

  try {
    const data = await fetchFeedbacks();

    if (!data || data.length === 0) {
      throw new Error('No data');
    }

    feedbackList.innerHTML = createFeedbackMarkup(data);

    initSwiper();
  } catch (error) {
    iziToast.error({
      title: 'Помилка',
      message: 'Не вдалося завантажити відгуки клієнтів.',
      position: 'topRight',
    });
  } finally {
    if (loader) loader.classList.add('is-hidden');
  }
}

renderFeedbackSection();
