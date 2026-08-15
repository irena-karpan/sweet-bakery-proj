import{a as c,i as p,S as u,P as f,N as m,A as w}from"./assets/vendor-CXeMV1Qs.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function a(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=a(e);fetch(e.href,r)}})();c.defaults.baseURL="https://deserts-store.b.goit.study/api/";async function g(){return(await c.get("desserts",{params:{page:1,limit:8,type:"popular"}})).data.desserts}const y="/sweet-bakery-proj/assets/sprite-Bt9wopdv.svg",n=document.querySelector(".popular-swiper .swiper-wrapper"),h=document.querySelector(".loader-container"),v=document.querySelector(".slider-controls");function b(t,s){const a=t.map(({_id:i,image:e,name:r,price:o,category:d,description:l})=>`
        <div class="swiper-slide">
          <article class="product-card">
            <div class="product-card-thumb">
              <img 
                src="${e}" 
                alt="${r}" 
                width="280" 
              />
            </div>

            <div class="product-card-content">
              <p class="product-card-category">${d.name}</p>
              <h3 class="product-card-title">${r}</h3>
              <p class="product-card-desc">${l}</p>
            </div>

            <div class="product-card-footer">
              <p class="product-card-price">${o} грн</p>
              
              <button 
                type="button" 
                class="product-card-btn-arrow js-open-modal" 
                data-id="${i}"
                aria-label="Переглянути деталі ${r}"
              > <svg class="arrow-card-icon" width="24" height="24">
            <use href="${y}#arrow_outward-icon"></use>
          </svg>
              </button>
            </div>
          </article>
        </div>
      `).join("");s.innerHTML=a}function P(){new u(".popular-swiper",{modules:[f,m],slidesPerView:1,spaceBetween:16,pagination:{el:".slider-controls .popular-pagination",clickable:!0,dynamicBullets:!0,dynamicMainBullets:1},navigation:{nextEl:".slider-controls .slider-button-next",prevEl:".slider-controls .slider-button-prev"},breakpoints:{768:{slidesPerView:2,spaceBetween:16},1440:{slidesPerView:3,spaceBetween:24}}})}async function L(){if(n)try{const t=await g();if(!t||t.length<3){n.innerHTML='<p class="error-message">На жаль, десерти відсутні</p>';return}b(t,n),P(),v.classList.remove("is-hidden")}catch(t){console.error("Помилка завантаження:",t),n.innerHTML='<p class="error-message">Не вдалося завантажити бестселлери</p>',p.error({title:"Помилка",message:"Не вдалося завантажити популярні десерти",position:"topRight"})}finally{h.classList.add("is-hidden")}}L();document.addEventListener("DOMContentLoaded",()=>{new w(".accordion-container",{duration:300,showMultiple:!1})});
//# sourceMappingURL=index.js.map
