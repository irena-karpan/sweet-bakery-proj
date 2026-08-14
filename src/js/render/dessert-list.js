import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import spriteUrl from '../../img/sprite.svg';
import { fetchDessertCategories } from '../api/dessert-categories.js';
import { fetchDesserts } from '../api/dessert-list-api.js';

const state = {
  page: 1,
  limit: 8,
  category: null,
  totalItems: 0,
  isLoading: false,
};

const refs = {
  categories: document.querySelector('.desserts__categories'),
  categorySelect: document.querySelector('.desserts__select'),
  grid: document.querySelector('.desserts__grid'),
  loader: document.querySelector('.desserts__loader'),
  loadMoreButton: document.querySelector('.desserts__load-more'),
};

function escapeMarkup(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

export function createDessertCard(dessert) {
  const id = escapeMarkup(dessert._id);
  const name = escapeMarkup(dessert.name);
  const description = escapeMarkup(dessert.description);
  const categoryName = escapeMarkup(dessert.category.name);
  const image = escapeMarkup(dessert.image);
  const price = escapeMarkup(dessert.price);

  return `
    <li class="dessert-card">
      <img
        class="dessert-card__image"
        src="${image}"
        alt="${name}"
        loading="lazy"
      />
      <div class="dessert-card__content">
        <div class="dessert-card__info">
          <p class="dessert-card__category">${categoryName}</p>
          <h3 class="dessert-card__title">${name}</h3>
          <p class="dessert-card__description">${description}</p>
        </div>
        <div class="dessert-card__footer">
          <p class="dessert-card__price">${price} грн</p>
          <button
            class="dessert-card__button"
            type="button"
            data-dessert-id="${id}"
            aria-label="Переглянути ${name}"
          >
            <svg class="dessert-card__icon" aria-hidden="true">
              <use href="${spriteUrl}#arrow_outward-icon"></use>
            </svg>
          </button>
        </div>
      </div>
    </li>
  `;
}

export function createDessertsMarkup(desserts) {
  return desserts.map(createDessertCard).join('');
}

function createCategoryButton(category) {
  const id = escapeMarkup(category._id);
  const name = escapeMarkup(category.name);

  return `
    <button
      class="desserts__category"
      type="button"
      data-category-id="${id}"
    >
      ${name}
    </button>
  `;
}

function createCategoryOption(category) {
  const id = escapeMarkup(category._id);
  const name = escapeMarkup(category.name);

  return `<option value="${id}">${name}</option>`;
}

function renderCategories(categories) {
  refs.categories.insertAdjacentHTML(
    'beforeend',
    categories.map(createCategoryButton).join('')
  );
  refs.categorySelect.insertAdjacentHTML(
    'beforeend',
    categories.map(createCategoryOption).join('')
  );
}

function updateCategoryControls() {
  const selectedCategory = state.category ?? '';

  refs.categorySelect.value = selectedCategory;
  refs.categories
    .querySelectorAll('.desserts__category')
    .forEach(button => {
      const isActive = button.dataset.categoryId === selectedCategory;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });
}

function setLoading(isLoading) {
  state.isLoading = isLoading;
  refs.loader.hidden = !isLoading;
  refs.grid.setAttribute('aria-busy', String(isLoading));
  refs.loadMoreButton.disabled = isLoading;
  refs.categorySelect.disabled = isLoading;
  refs.categories.classList.toggle('is-loading', isLoading);
  refs.categories.setAttribute('aria-busy', String(isLoading));
}

function updateLoadMoreButton() {
  const loadedItems = refs.grid.children.length;
  refs.loadMoreButton.hidden =
    state.totalItems === 0 || loadedItems >= state.totalItems;
}

function showLoadingError(message) {
  iziToast.error({
    title: 'Помилка',
    message,
    position: 'topRight',
  });
}

function applyDessertsResponse(response, { append, page }) {
  const desserts = response.desserts;

  if (!Array.isArray(desserts)) {
    throw new TypeError('Invalid desserts response');
  }

  const markup = createDessertsMarkup(desserts);

  if (append) {
    refs.grid.insertAdjacentHTML('beforeend', markup);
  } else {
    refs.grid.innerHTML = markup;
  }

  state.page = Number(response.page) || page;
  state.limit = Number(response.limit) || state.limit;
  state.totalItems = Number(response.totalItems) || 0;
  updateLoadMoreButton();
}

async function loadDesserts({ append = false, page = state.page } = {}) {
  if (state.isLoading) {
    return;
  }

  setLoading(true);

  try {
    const response = await fetchDesserts({
      page,
      limit: state.limit,
      category: state.category,
    });

    applyDessertsResponse(response, { append, page });
    return true;
  } catch {
    if (!append) {
      refs.loadMoreButton.hidden = true;
    }

    showLoadingError('Не вдалося завантажити десерти. Спробуйте ще раз.');
    return false;
  } finally {
    setLoading(false);
  }
}

async function selectCategory(categoryId) {
  const nextCategory = categoryId || null;

  if (state.isLoading || nextCategory === state.category) {
    updateCategoryControls();
    return;
  }

  const previousCategory = state.category;
  state.category = nextCategory;
  updateCategoryControls();

  const isLoaded = await loadDesserts({ page: 1 });

  if (!isLoaded) {
    state.category = previousCategory;
    updateCategoryControls();
  }
}

function handleCategoryClick(event) {
  const button = event.target.closest('.desserts__category');

  if (!button || !refs.categories.contains(button)) {
    return;
  }

  selectCategory(button.dataset.categoryId);
}

function handleCategoryChange(event) {
  selectCategory(event.target.value);
}

function handleLoadMore() {
  if (state.isLoading) {
    return;
  }

  loadDesserts({ append: true, page: state.page + 1 });
}

async function initializeDessertList() {
  setLoading(true);

  const [categoriesResult, dessertsResult] = await Promise.allSettled([
    fetchDessertCategories(),
    fetchDesserts({ page: 1, limit: state.limit }),
  ]);

  if (
    categoriesResult.status === 'fulfilled' &&
    Array.isArray(categoriesResult.value)
  ) {
    renderCategories(categoriesResult.value);
    updateCategoryControls();
  } else {
    showLoadingError('Не вдалося завантажити категорії десертів.');
  }

  try {
    if (dessertsResult.status === 'rejected') {
      throw dessertsResult.reason;
    }

    applyDessertsResponse(dessertsResult.value, {
      append: false,
      page: 1,
    });
  } catch {
    refs.loadMoreButton.hidden = true;
    showLoadingError('Не вдалося завантажити десерти. Спробуйте ще раз.');
  } finally {
    setLoading(false);
  }
}

if (
  refs.categories &&
  refs.categorySelect &&
  refs.grid &&
  refs.loader &&
  refs.loadMoreButton
) {
  refs.categories.addEventListener('click', handleCategoryClick);
  refs.categorySelect.addEventListener('change', handleCategoryChange);
  refs.loadMoreButton.addEventListener('click', handleLoadMore);
  initializeDessertList();
}
