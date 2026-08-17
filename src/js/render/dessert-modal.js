import { fetchDessertById } from '../api/dessert-modal-api.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { openOrderModal } from './order.js'; 
import raterJs from 'rater-js';

const backdrop = document.querySelector('.bd-modal-desert');
const dynamicContentContainer = document.querySelector('.js-modal-dynamic-content');
const closeModalBtn = document.querySelector('.btn-modal-desert-close');

let raterInstance = null;

document.addEventListener('click', handleProductClick);
dynamicContentContainer?.addEventListener('click', handleOrderButtonClick);

function getScrollbarWidth() {
  return window.innerWidth - document.documentElement.clientWidth;
}

async function handleProductClick(event) {
  const targetButton = event.target.closest('.js-open-modal');
  if (!targetButton) return; 

  if (backdrop && !backdrop.classList.contains('is-hidden')) return;

  const dessertId = targetButton.dataset.id;

  try {
    const dessertData = await fetchDessertById(dessertId);
    if (!dessertData) throw new Error('Дані відсутні');

    renderModalMarkup(dessertData);
    
    initRating(dessertData.rate);

    if (backdrop) {
      const scrollbarWidth = getScrollbarWidth();
      document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);

      backdrop.classList.remove('is-hidden');
      document.body.classList.add('no-scroll');
    }

    addCloseListeners();

  } catch (error) {
    console.error('Помилка модального вікна:', error);
    iziToast.error({
      title: 'Помилка',
      message: 'Не вдалося завантажити дані про десерт',
      position: 'topRight',
    });
  }
}

function renderModalMarkup(dessert) {
  const { _id, image, name, category, price, description, composition, rate } = dessert;

  dynamicContentContainer.innerHTML = `
    <div class="modal-dessert-details">
      <div class="modal-img-wrapper">
        <img src="${image || ''}" alt="${name || 'Десерт'}" class="modal-dessert-img" width="295" />
      </div>
      
      <div class="modal-dessert-info">
        <h2 class="modal-dessert-title">${name || 'Без назви'}</h2>
        <p class="modal-dessert-price">${price || 0} грн</p>
        <div class="modal-dessert-rating-wrapper">
          <div id="dessert-rater"></div>
        </div>
        <p class="modal-dessert-desc">${description || ''}</p>
        <p class="modal-dessert-comp"><span class="modal-dessert-comp-span">Склад:</span> ${composition || 'Не вказано'}</p>
        <button class="btn-modal-desert" data-id="${_id}">Перейти до замовлення</button>
      </div>
    </div>
  `;
}

function initRating(ratingValue) {
  const raterContainer = document.querySelector('#dessert-rater');
  if (!raterContainer) return;

  raterInstance = raterJs({
    element: raterContainer,
    rating: ratingValue || 0, 
    starSize: 20,              
    readOnly: true,            
    max: 5                     
  });
}

function handleOrderButtonClick(event) {
  const orderButton = event.target.closest('.btn-modal-desert');
  if (!orderButton) return; 

  const dessertId = orderButton.dataset.id;

  closeModal();
  openOrderModal(dessertId);
}

function addCloseListeners() {
  closeModalBtn?.addEventListener('click', closeModal);
  backdrop?.addEventListener('click', handleBackdropClick);
  window.addEventListener('keydown', handleEscPress);
}

function closeModal() {
  if (backdrop) backdrop.classList.add('is-hidden');
  
  document.body.classList.remove('no-scroll');
  document.documentElement.style.setProperty('--scrollbar-width', '0px');

  if (dynamicContentContainer) dynamicContentContainer.innerHTML = ''; 
  
  raterInstance = null;
  
  closeModalBtn?.removeEventListener('click', closeModal);
  backdrop?.removeEventListener('click', handleBackdropClick);
  window.removeEventListener('keydown', handleEscPress);
}

function handleBackdropClick(event) {
  if (event.target === backdrop) closeModal();
}

function handleEscPress(event) {
  if (event.code === 'Escape') closeModal();
}
