const burgerBtn = document.querySelector('.burger-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const backdrop = document.querySelector('.mobile-backdrop');
const closeBtn = document.querySelector('.mobile-close');
const links = document.querySelectorAll('.mobile-link');

function openMenu() {
    mobileMenu.classList.add('is-open');
    backdrop.classList.add('is-open');
    document.body.classList.add('no-scroll');
}

function closeMenu() {
    mobileMenu.classList.remove('is-open');
    backdrop.classList.remove('is-open');
    document.body.classList.remove('no-scroll');
}

burgerBtn.addEventListener('click', openMenu);
closeBtn.addEventListener('click', closeMenu);
backdrop.addEventListener('click', closeMenu);

links.forEach(link => {
    link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenu();
});

document.addEventListener('keydown', e => {
if (
e.key === 'Escape' &&
mobileMenu.classList.contains('is-open')
) {
closeMenu();
}
});