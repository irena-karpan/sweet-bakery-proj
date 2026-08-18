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
  dropdown: document.querySelector('.desserts-dropdown'),
  dropdownTrigger: document.querySelector('.desserts-dropdown__trigger'),
  dropdownValue: document.querySelector('.desserts-dropdown__value'),
  dropdownMenu: document.querySelector('.desserts-dropdown__menu'),
  grid: document.querySelector('.desserts__grid'),
  loader: document.querySelector('.desserts__loader'),
  loadMoreButton: document.querySelector('.desserts__load-more'),
  dropdownScrollbar: document.querySelector('.desserts-dropdown__scrollbar'),
  dropdownScrollbarThumb: document.querySelector(
    '.desserts-dropdown__scrollbar-thumb'
  ),
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
            class="dessert-card__button js-open-modal"
            type="button"
            data-id="${id}"
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

function createDropdownOption(category) {
  const id = escapeMarkup(category._id);
  const name = escapeMarkup(category.name);

  return `
    <li>
      <button
        class="desserts-dropdown__option"
        type="button"
        role="option"
        aria-selected="false"
        data-category-id="${id}"
      >
        ${name}
      </button>
    </li>
  `;
}

function renderCategories(categories) {
  refs.categories.insertAdjacentHTML(
    'beforeend',
    categories.map(createCategoryButton).join('')
  );
  refs.dropdownMenu.insertAdjacentHTML(
    'beforeend',
    categories.map(createDropdownOption).join('')
  );
}

function updateCategoryControls() {
  const selectedCategory = state.category ?? '';

  refs.categories.querySelectorAll('.desserts__category').forEach(button => {
    const isActive = button.dataset.categoryId === selectedCategory;
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });

  const dropdownOptions = refs.dropdownMenu.querySelectorAll(
    '.desserts-dropdown__option'
  );

  dropdownOptions.forEach(option => {
    const isActive = option.dataset.categoryId === selectedCategory;

    option.classList.toggle('is-active', isActive);
    option.setAttribute('aria-selected', String(isActive));

    if (isActive) {
      refs.dropdownValue.textContent = option.textContent.trim();
    }
  });
}

function setLoading(isLoading, { append = false } = {}) {
  state.isLoading = isLoading;

  if (isLoading) {
    refs.grid.insertAdjacentElement(
      append ? 'afterend' : 'beforebegin',
      refs.loader
    );
  }

  refs.loader.hidden = !isLoading;
  refs.grid.setAttribute('aria-busy', String(isLoading));
  refs.loadMoreButton.disabled = isLoading;
  refs.dropdownTrigger.disabled = isLoading;
  refs.dropdown.classList.toggle('is-loading', isLoading);
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

  setLoading(true, { append });

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

function openDropdown() {
  refs.dropdownMenu.hidden = false;
  refs.dropdownTrigger.setAttribute('aria-expanded', 'true');
  refs.dropdown.classList.add('is-open');
  updateDropdownScrollbar();
}

function closeDropdown() {
  refs.dropdownMenu.hidden = true;
  refs.dropdownTrigger.setAttribute('aria-expanded', 'false');
  refs.dropdown.classList.remove('is-open');
}

function toggleDropdown() {
  const isOpen = refs.dropdownTrigger.getAttribute('aria-expanded') === 'true';

  if (isOpen) {
    closeDropdown();
  } else {
    openDropdown();
  }
}

function handleDropdownOptionClick(event) {
  const option = event.target.closest('.desserts-dropdown__option');

  if (!option || !refs.dropdownMenu.contains(option)) {
    return;
  }

  selectCategory(option.dataset.categoryId);
  closeDropdown();
}

function handleDocumentClick(event) {
  if (!refs.dropdown.contains(event.target)) {
    closeDropdown();
  }
}

function handleDocumentKeydown(event) {
  if (event.key === 'Escape') {
    closeDropdown();
    refs.dropdownTrigger.focus();
  }
}

function updateDropdownScrollbar() {
  const menu = refs.dropdownMenu;
  const thumb = refs.dropdownScrollbarThumb;

  if (!menu || !thumb) {
    return;
  }

  const maxScroll = menu.scrollHeight - menu.clientHeight;

  if (maxScroll <= 0) {
    refs.dropdownScrollbar.hidden = true;
    return;
  }

  refs.dropdownScrollbar.hidden = false;

  const trackHeight = refs.dropdownScrollbar.clientHeight;
  const thumbHeight = thumb.offsetHeight;
  const maxThumbOffset = trackHeight - thumbHeight;

  const scrollRatio = menu.scrollTop / maxScroll;
  const thumbOffset = scrollRatio * maxThumbOffset;

  thumb.style.transform = `translateY(${thumbOffset}px)`;
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
  refs.dropdown &&
  refs.dropdownTrigger &&
  refs.dropdownValue &&
  refs.dropdownMenu &&
  refs.grid &&
  refs.loader &&
  refs.dropdownScrollbar &&
  refs.dropdownScrollbarThumb &&
  refs.loadMoreButton
) {
  refs.categories.addEventListener('click', handleCategoryClick);
  refs.dropdownTrigger.addEventListener('click', toggleDropdown);
  refs.dropdownMenu.addEventListener('click', handleDropdownOptionClick);
  document.addEventListener('click', handleDocumentClick);
  document.addEventListener('keydown', handleDocumentKeydown);
  refs.loadMoreButton.addEventListener('click', handleLoadMore);
  refs.dropdownMenu.addEventListener('scroll', updateDropdownScrollbar);
  initializeDessertList();
}
