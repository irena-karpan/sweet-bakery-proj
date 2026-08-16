import{a as p,i as v,S as m,P as f,N as w,A as L}from"./assets/vendor-CXeMV1Qs.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&c(s)}).observe(document,{childList:!0,subtree:!0});function l(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function c(e){if(e.ep)return;e.ep=!0;const t=l(e);fetch(e.href,t)}})();p.defaults.baseURL="https://deserts-store.b.goit.study/api/";async function h(){return(await p.get("desserts",{params:{page:1,limit:8,type:"popular"}})).data.desserts}const S="/sweet-bakery-proj/assets/sprite-Bt9wopdv.svg",a=document.querySelector(".popular-swiper .swiper-wrapper"),E=document.querySelector(".loader-container"),P=document.querySelector(".slider-controls");function k(r,o){const l=r.map(({_id:c,image:e,name:t,price:s,category:y,description:g})=>`
        <div class="swiper-slide">
          <article class="product-card">
            <div class="product-card-thumb">
              <img 
                src="${e}" 
                alt="${t}" 
                width="280" 
              />
            </div>

            <div class="product-card-content">
              <p class="product-card-category">${y.name}</p>
              <h3 class="product-card-title">${t}</h3>
              <p class="product-card-desc">${g}</p>
            </div>

            <div class="product-card-footer">
              <p class="product-card-price">${s} грн</p>
              
              <button 
                type="button" 
                class="product-card-btn-arrow js-open-modal" 
                data-id="${c}"
                aria-label="Переглянути деталі ${t}"
              > <svg class="arrow-card-icon" width="24" height="24">
            <use href="${S}#arrow_outward-icon"></use>
          </svg>
              </button>
            </div>
          </article>
        </div>
      `).join("");o.innerHTML=l}function q(){new m(".popular-swiper",{modules:[f,w],slidesPerView:1,spaceBetween:16,pagination:{el:".slider-controls .popular-pagination",clickable:!0,dynamicBullets:!0,dynamicMainBullets:1},navigation:{nextEl:".slider-controls .slider-button-next",prevEl:".slider-controls .slider-button-prev"},breakpoints:{768:{slidesPerView:2,spaceBetween:16},1440:{slidesPerView:3,spaceBetween:24}}})}async function B(){if(a)try{const r=await h();if(!r||r.length<3){a.innerHTML='<p class="error-message">На жаль, десерти відсутні</p>';return}k(r,a),q(),P.classList.remove("is-hidden")}catch(r){console.error("Помилка завантаження:",r),a.innerHTML='<p class="error-message">Не вдалося завантажити бестселлери</p>',v.error({title:"Помилка",message:"Не вдалося завантажити популярні десерти",position:"topRight"})}finally{E.classList.add("is-hidden")}}B();let i=null;function b(){window.innerWidth>=768&&!i&&(i=new m(".about-us-swiper",{modules:[w,f],slidesPerView:2,spaceBetween:24,navigation:{prevEl:".about-us-button-prev",nextEl:".about-us-button-next"},pagination:{el:".about-us-pagination",clickable:!0,dynamicBullets:!0}})),window.innerWidth<768&&i&&(i.destroy(!0,!0),i=null)}b();window.addEventListener("resize",b);document.addEventListener("DOMContentLoaded",()=>{new L(".accordion-container",{duration:300,showMultiple:!1})});const M=document.querySelector(".burger-btn"),d=document.querySelector(".mobile-menu"),u=document.querySelector(".mobile-backdrop"),$=document.querySelector(".mobile-close"),O=document.querySelectorAll(".mobile-link"),x=document.querySelector(".mobile-logo");x.addEventListener("click",n);function A(){d.classList.add("is-open"),u.classList.add("is-open"),document.body.classList.add("no-scroll")}function n(){d.classList.remove("is-open"),u.classList.remove("is-open"),document.body.classList.remove("no-scroll")}M.addEventListener("click",A);$.addEventListener("click",n);u.addEventListener("click",n);O.forEach(r=>{r.addEventListener("click",n)});document.addEventListener("keydown",r=>{r.key==="Escape"&&d.classList.contains("is-open")&&n()});
//# sourceMappingURL=index.js.map
