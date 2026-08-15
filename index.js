import{a as d,i as g,S as l,P as u,N as p,A as y}from"./assets/vendor-CXeMV1Qs.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function c(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=c(e);fetch(e.href,t)}})();d.defaults.baseURL="https://deserts-store.b.goit.study/api/";async function b(){return(await d.get("desserts",{params:{page:1,limit:8,type:"popular"}})).data.desserts}const h="/sweet-bakery-proj/assets/sprite-Bt9wopdv.svg",a=document.querySelector(".popular-swiper .swiper-wrapper"),v=document.querySelector(".loader-container"),P=document.querySelector(".slider-controls");function L(r,s){const c=r.map(({_id:n,image:e,name:t,price:o,category:w,description:m})=>`
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
              <p class="product-card-category">${w.name}</p>
              <h3 class="product-card-title">${t}</h3>
              <p class="product-card-desc">${m}</p>
            </div>

            <div class="product-card-footer">
              <p class="product-card-price">${o} грн</p>
              
              <button 
                type="button" 
                class="product-card-btn-arrow js-open-modal" 
                data-id="${n}"
                aria-label="Переглянути деталі ${t}"
              > <svg class="arrow-card-icon" width="24" height="24">
            <use href="${h}#arrow_outward-icon"></use>
          </svg>
              </button>
            </div>
          </article>
        </div>
      `).join("");s.innerHTML=c}function S(){new l(".popular-swiper",{modules:[u,p],slidesPerView:1,spaceBetween:16,pagination:{el:".slider-controls .popular-pagination",clickable:!0,dynamicBullets:!0,dynamicMainBullets:1},navigation:{nextEl:".slider-controls .slider-button-next",prevEl:".slider-controls .slider-button-prev"},breakpoints:{768:{slidesPerView:2,spaceBetween:16},1440:{slidesPerView:3,spaceBetween:24}}})}async function $(){if(a)try{const r=await b();if(!r||r.length<3){a.innerHTML='<p class="error-message">На жаль, десерти відсутні</p>';return}L(r,a),S(),P.classList.remove("is-hidden")}catch(r){console.error("Помилка завантаження:",r),a.innerHTML='<p class="error-message">Не вдалося завантажити бестселлери</p>',g.error({title:"Помилка",message:"Не вдалося завантажити популярні десерти",position:"topRight"})}finally{v.classList.add("is-hidden")}}$();let i=null;function f(){window.innerWidth>=768&&!i&&(i=new l(".about-us-swiper",{modules:[p,u],slidesPerView:2,spaceBetween:24,navigation:{prevEl:".about-us-button-prev",nextEl:".about-us-button-next"},pagination:{el:".about-us-pagination",clickable:!0,dynamicBullets:!0}})),window.innerWidth<768&&i&&(i.destroy(!0,!0),i=null)}f();window.addEventListener("resize",f);document.addEventListener("DOMContentLoaded",()=>{new y(".accordion-container",{duration:300,showMultiple:!1})});
//# sourceMappingURL=index.js.map
