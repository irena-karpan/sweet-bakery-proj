import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import iziToast from 'izitoast';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const feedbackList = document.getElementById('sweet-factory-feedback-list');
const loader = document.getElementById('feedback-loader');

const backupFeedbacks = [
  {
    author: 'Олена Коваленко',
    description:
      "Неймовірно смачно! Торт був ніжний, цукру в міру. Обов'язково замовлю ще!",
    rate: 5,
  },
  {
    author: 'Ігор Петренко',
    description:
      "Дуже сподобалися макаруни та еклери. Смак як у найкращих кав'ярнях Парижа.",
    rate: 4.5,
  },
  {
    author: 'Марія Шевченко',
    description:
      'Шоколадний фондан — це шедевр! Доставка вчасна, все красиво запаковано.',
    rate: 5,
  },
  {
    author: 'Дмитро Гриценко',
    description:
      'Прекрасна кондитерська! Тістечка свіжі, а крем дуже легкий та повітряний.',
    rate: 4.8,
  },
  {
    author: 'Анна Мороз',
    description:
      'Найкращий веганський чізкейк! Дуже дякую за турботу про всіх клієнтів.',
    rate: 5,
  },
  {
    author: 'Олександр Кравченко',
    description:
      'Чудовий асортимент десертів. Кава теж на висоті. Рекомендую майстерню!',
    rate: 4.2,
  },
  {
    author: 'Тетяна Василенко',
    description:
      'Ваша випічка — це любов! Круасани хрусткі, а начинки всередині дуже багато.',
    rate: 5,
  },
  {
    author: 'Юлія Мельник',
    description:
      'Дуже смачні мусові тістечка. Справжнє естетичне гастрономічне задоволення.',
    rate: 4.7,
  },
  {
    author: 'Андрій Бондаренко',
    description:
      "Замовляв капкейки в офіс — з'їли за хвилину! Ідеальний бісквіт та ніжний крем.",
    rate: 5,
  },
  {
    author: 'Наталія Попова',
    description:
      'Дякую за якість! Смак ідеально збалансований, не занадто солодкий.',
    rate: 4.9,
  },
];

function createFeedbackMarkup(feedbacks) {
  if (!Array.isArray(feedbacks)) return '';
  return feedbacks
    .map(
      ({ author, description, rate }) => `
      <li class="swiper-slide feedback-card">
        <div class="star-rating" style="--rating: ${Number(rate)};" role="img" aria-label="Рейтинг ${rate} з 5"></div>
        <p class="feedback-text">${description}</p>
        <h3 class="feedback-user-name">${author}</h3>
      </li>
    `
    )
    .join('');
}

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

async function renderFeedbackSection() {
  if (loader) loader.classList.remove('hidden');

  try {
    const response = await fetch('https://goit.study');
    if (!response.ok) throw new Error();

    const data = await response.json();
    const feedbacksArray = data && data.feedbacks ? data.feedbacks : data;

    if (Array.isArray(feedbacksArray) && feedbacksArray.length > 0) {
      if (feedbackList)
        feedbackList.innerHTML = createFeedbackMarkup(feedbacksArray);
    } else {
      if (feedbackList)
        feedbackList.innerHTML = createFeedbackMarkup(backupFeedbacks);
    }
  } catch (error) {
    if (feedbackList)
      feedbackList.innerHTML = createFeedbackMarkup(backupFeedbacks);
    console.log('Запит пригнічено інтерцептором, активовано бекап');
  } finally {
    if (loader) loader.classList.add('hidden');
    initSwiper();
  }
}

renderFeedbackSection();
