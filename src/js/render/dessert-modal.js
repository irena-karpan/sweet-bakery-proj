import { fetchDessertById } from '../api/dessert-modal-api.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import 'css-star-rating/css/star-rating.css';


const backdrop = document.querySelector('.bd-modal-desert');
const dynamicContentContainer = document.querySelector('.js-modal-dynamic-content');
const closeModalBtn = document.querySelector('.btn-modal-desert-close');

document.addEventListener('click', handleProductClick);

function getScrollbarWidth() {
  return window.innerWidth - document.documentElement.clientWidth;
}

async function handleProductClick(event) {
  const targetButton = event.target.closest('.js-open-modal');
  if (!targetButton) return; 

  const dessertId = targetButton.dataset.id;

  try {
    const dessertData = await fetchDessertById(dessertId);

    renderModalMarkup(dessertData);

    if (backdrop) {
      const scrollbarWidth = getScrollbarWidth();
      document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);

      backdrop.classList.remove('is-hidden');
      document.body.classList.add('no-scroll');
    }

    addCloseListeners();

  } catch (error) {
    console.error('Ошибка модального окна:', error);
    iziToast.error({
      title: 'Помилка',
      message: 'Не вдалося завантажити данные про десерт',
      position: 'topRight',
    });
  }
}

function renderModalMarkup(dessert) {
  console.log(dessert);
    
  const { image, name, category, price, description, composition, rate } = dessert;

  dynamicContentContainer.innerHTML = `
    <div class="modal-dessert-details">
      <div class="modal-img-wrapper">
        <img src="${image}" alt="${name}" class="modal-dessert-img" width="295" />
      </div>
      
      <div class="modal-dessert-info">
        <h2 class="modal-dessert-title">${name}</h2>
        <p class="modal-dessert-price">${price} грн</p>
        
        <p class="modal-dessert-desc">${description}</p>
        <p class="modal-dessert-comp"><span class="modal-dessert-comp-span">Склад:</span> ${composition}</p>
        <button class="btn-modal-desert">Перейти до замовлення</button>
      </div>
    </div>
  `;
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
