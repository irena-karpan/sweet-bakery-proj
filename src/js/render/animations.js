import AOS from 'aos';
import 'aos/dist/aos.css';

const animatedItems = [
  '.hero-title',
  '.hero-description',
  '.hero-btn',
  '.popular-title',
  '.desserts__title',
  '.desserts__description',
  '.desserts__select-wrapper',
  '.desserts__category',
  '.dessert-card',
  '.about-us-title',
  '.about-us-text',
  '.about-us-slider',
  '.feedback-title',
  '.feedback-subtitle',
  '.feedback-card',
  '.faq-title',
  '.faq-item',
  '.footer-container',
];

let refreshTimer = null;

function applyAnimations() {
  animatedItems.forEach(selector => {
    document.querySelectorAll(selector).forEach(element => {
      if (element.dataset.aos) return;

      element.dataset.aos = 'fade-up';
    });
  });
}

function refreshAnimations() {
  clearTimeout(refreshTimer);

  refreshTimer = setTimeout(() => {
    applyAnimations();
    AOS.refreshHard();
  }, 100);
}

window.addEventListener('load', () => {
  applyAnimations();

  AOS.init({
    duration: 600,
    easing: 'ease-out',
    offset: 80,
    once: true,
    disable: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  });

  new MutationObserver(refreshAnimations).observe(document.body, {
    childList: true,
    subtree: true,
  });
});
