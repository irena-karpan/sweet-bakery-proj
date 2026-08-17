import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { createOrder } from '../api/order-api.js';
import '../../css/loader.css';

const orderModal = document.querySelector('.modal-order');
const closeOrderButton = document.querySelector('.order-close');
const orderForm = document.querySelector('.order-form');
const loader = document.querySelector('.loader-backdrop');

let selectedDessertId = '';

export function openOrderModal(dessertId) {
  selectedDessertId = dessertId;

  orderModal.classList.remove('is-hidden');
  document.documentElement.classList.add('no-scroll');
  document.body.classList.add('no-scroll');
}

export function closeOrderModal() {
  orderModal.classList.add('is-hidden');
  document.documentElement.classList.remove('no-scroll');
  document.body.classList.remove('no-scroll');
}

function getSelectedDessertId() {
  return selectedDessertId;
}

function showLoader() {
  loader.classList.remove('is-hidden');
}

function hideLoader() {
  loader.classList.add('is-hidden');
}

closeOrderButton.addEventListener('click', closeOrderModal);

orderModal.addEventListener('click', event => {
  if (event.target === orderModal) {
    closeOrderModal();
  }
});

document.addEventListener('keydown', event => {
  const modalIsOpen = !orderModal.classList.contains('is-hidden');

  if (event.key === 'Escape' && modalIsOpen) {
    closeOrderModal();
  }
});

export function showOrderSuccess(orderNum) {
  Swal.fire({
    icon: 'success',
    title: 'Заявку успішно надіслано!',
    text: `Номер вашого замовлення: ${orderNum}`,
    confirmButtonText: 'Добре',
  });
}

export function showOrderError(message) {
  Swal.fire({
    icon: 'error',
    title: 'Щось пішло не так',
    text: message,
    confirmButtonText: 'Спробувати ще раз',
  });
}

orderForm.addEventListener('submit', async sendForm => {
    sendForm.preventDefault();

    const {username, phone, comment} = sendForm.target.elements;

    const formData = {
        "name": username.value.trim(),
        "phone": phone.value.trim(),
        "dessertId": getSelectedDessertId(),
        "comment": comment.value.trim()
    };

    try {
        showLoader();

        const orderData = await createOrder(formData);

        closeOrderModal();
        orderForm.reset();

        showOrderSuccess(orderData.orderNum);
    } catch {
        showOrderError('Не вдалося надіслати заявку. Спробуйте ще раз.');
    } finally {
      hideLoader();
    }
});