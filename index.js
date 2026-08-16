import{a as m,i as w,S as h,P as L,N as _,A as q}from"./assets/vendor-CXeMV1Qs.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const l of n.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function o(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(s){if(s.ep)return;s.ep=!0;const n=o(s);fetch(s.href,n)}})();m.defaults.baseURL="https://deserts-store.b.goit.study/api/";async function P(){return(await m.get("desserts",{params:{page:1,limit:8,type:"popular"}})).data.desserts}const S="/sweet-bakery-proj/assets/sprite-Bt9wopdv.svg",p=document.querySelector(".popular-swiper .swiper-wrapper"),j=document.querySelector(".loader-container"),I=document.querySelector(".slider-controls");function N(e,t){const o=e.map(({_id:i,image:s,name:n,price:l,category:C,description:k})=>`
        <div class="swiper-slide">
          <article class="product-card">
            <div class="product-card-thumb">
              <img 
                src="${s}" 
                alt="${n}" 
                width="280" 
              />
            </div>

            <div class="product-card-content">
              <p class="product-card-category">${C.name}</p>
              <h3 class="product-card-title">${n}</h3>
              <p class="product-card-desc">${k}</p>
            </div>

            <div class="product-card-footer">
              <p class="product-card-price">${l} грн</p>
              
              <button 
                type="button" 
                class="product-card-btn-arrow js-open-modal" 
                data-id="${i}"
                aria-label="Переглянути деталі ${n}"
              > <svg class="arrow-card-icon" width="24" height="24">
            <use href="${S}#arrow_outward-icon"></use>
          </svg>
              </button>
            </div>
          </article>
        </div>
      `).join("");t.innerHTML=o}function T(){new h(".popular-swiper",{modules:[L,_],slidesPerView:1,spaceBetween:16,pagination:{el:".slider-controls .popular-pagination",clickable:!0,dynamicBullets:!0,dynamicMainBullets:1},navigation:{nextEl:".slider-controls .slider-button-next",prevEl:".slider-controls .slider-button-prev"},breakpoints:{768:{slidesPerView:2,spaceBetween:16},1440:{slidesPerView:3,spaceBetween:24}}})}async function D(){if(p)try{const e=await P();if(!e||e.length<3){p.innerHTML='<p class="error-message">На жаль, десерти відсутні</p>';return}N(e,p),T(),I.classList.remove("is-hidden")}catch(e){console.error("Помилка завантаження:",e),p.innerHTML='<p class="error-message">Не вдалося завантажити бестселлери</p>',w.error({title:"Помилка",message:"Не вдалося завантажити популярні десерти",position:"topRight"})}finally{j.classList.add("is-hidden")}}D();async function O(){const{data:e}=await m.get("categories");return e}async function M({page:e,limit:t,category:o}={}){const i={page:e,limit:t};o&&(i.category=o);const{data:s}=await m.get("desserts",{params:i});return s}const a={page:1,limit:8,category:null,totalItems:0,isLoading:!1},r={categories:document.querySelector(".desserts__categories"),categorySelect:document.querySelector(".desserts__select"),grid:document.querySelector(".desserts__grid"),loader:document.querySelector(".desserts__loader"),loadMoreButton:document.querySelector(".desserts__load-more")};function c(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function H(e){const t=c(e._id),o=c(e.name),i=c(e.description),s=c(e.category.name),n=c(e.image),l=c(e.price);return`
    <li class="dessert-card">
      <img
        class="dessert-card__image"
        src="${n}"
        alt="${o}"
        loading="lazy"
      />
      <div class="dessert-card__content">
        <div class="dessert-card__info">
          <p class="dessert-card__category">${s}</p>
          <h3 class="dessert-card__title">${o}</h3>
          <p class="dessert-card__description">${i}</p>
        </div>
        <div class="dessert-card__footer">
          <p class="dessert-card__price">${l} грн</p>
          <button
            class="dessert-card__button"
            type="button"
            data-dessert-id="${t}"
            aria-label="Переглянути ${o}"
          >
            <svg class="dessert-card__icon" aria-hidden="true">
              <use href="${S}#arrow_outward-icon"></use>
            </svg>
          </button>
        </div>
      </div>
    </li>
  `}function x(e){return e.map(H).join("")}function R(e){const t=c(e._id),o=c(e.name);return`
    <button
      class="desserts__category"
      type="button"
      data-category-id="${t}"
    >
      ${o}
    </button>
  `}function z(e){const t=c(e._id),o=c(e.name);return`<option value="${t}">${o}</option>`}function U(e){r.categories.insertAdjacentHTML("beforeend",e.map(R).join("")),r.categorySelect.insertAdjacentHTML("beforeend",e.map(z).join(""))}function g(){const e=a.category??"";r.categorySelect.value=e,r.categories.querySelectorAll(".desserts__category").forEach(t=>{const o=t.dataset.categoryId===e;t.classList.toggle("is-active",o),t.setAttribute("aria-pressed",String(o))})}function f(e,{append:t=!1}={}){a.isLoading=e,e&&r.grid.insertAdjacentElement(t?"afterend":"beforebegin",r.loader),r.loader.hidden=!e,r.grid.setAttribute("aria-busy",String(e)),r.loadMoreButton.disabled=e,r.categorySelect.disabled=e,r.categories.classList.toggle("is-loading",e),r.categories.setAttribute("aria-busy",String(e))}function V(){const e=r.grid.children.length;r.loadMoreButton.hidden=a.totalItems===0||e>=a.totalItems}function y(e){w.error({title:"Помилка",message:e,position:"topRight"})}function A(e,{append:t,page:o}){const i=e.desserts;if(!Array.isArray(i))throw new TypeError("Invalid desserts response");const s=x(i);t?r.grid.insertAdjacentHTML("beforeend",s):r.grid.innerHTML=s,a.page=Number(e.page)||o,a.limit=Number(e.limit)||a.limit,a.totalItems=Number(e.totalItems)||0,V()}async function E({append:e=!1,page:t=a.page}={}){if(!a.isLoading){f(!0,{append:e});try{const o=await M({page:t,limit:a.limit,category:a.category});return A(o,{append:e,page:t}),!0}catch{return e||(r.loadMoreButton.hidden=!0),y("Не вдалося завантажити десерти. Спробуйте ще раз."),!1}finally{f(!1)}}}async function $(e){const t=e||null;if(a.isLoading||t===a.category){g();return}const o=a.category;a.category=t,g(),await E({page:1})||(a.category=o,g())}function W(e){const t=e.target.closest(".desserts__category");!t||!r.categories.contains(t)||$(t.dataset.categoryId)}function F(e){$(e.target.value)}function K(){a.isLoading||E({append:!0,page:a.page+1})}async function G(){f(!0);const[e,t]=await Promise.allSettled([O(),M({page:1,limit:a.limit})]);e.status==="fulfilled"&&Array.isArray(e.value)?(U(e.value),g()):y("Не вдалося завантажити категорії десертів.");try{if(t.status==="rejected")throw t.reason;A(t.value,{append:!1,page:1})}catch{r.loadMoreButton.hidden=!0,y("Не вдалося завантажити десерти. Спробуйте ще раз.")}finally{f(!1)}}r.categories&&r.categorySelect&&r.grid&&r.loader&&r.loadMoreButton&&(r.categories.addEventListener("click",W),r.categorySelect.addEventListener("change",F),r.loadMoreButton.addEventListener("click",K),G());let d=null;function B(){window.innerWidth>=768&&!d&&(d=new h(".about-us-swiper",{modules:[_,L],slidesPerView:2,spaceBetween:24,navigation:{prevEl:".about-us-button-prev",nextEl:".about-us-button-next"},pagination:{el:".about-us-pagination",clickable:!0,dynamicBullets:!0}})),window.innerWidth<768&&d&&(d.destroy(!0,!0),d=null)}B();window.addEventListener("resize",B);document.addEventListener("DOMContentLoaded",()=>{new q(".accordion-container",{duration:300,showMultiple:!1})});const J=document.querySelector(".burger-btn"),b=document.querySelector(".mobile-menu"),v=document.querySelector(".mobile-backdrop"),Q=document.querySelector(".mobile-close"),X=document.querySelectorAll(".mobile-link"),Y=document.querySelector(".mobile-logo");Y.addEventListener("click",u);function Z(){b.classList.add("is-open"),v.classList.add("is-open"),document.body.classList.add("no-scroll")}function u(){b.classList.remove("is-open"),v.classList.remove("is-open"),document.body.classList.remove("no-scroll")}J.addEventListener("click",Z);Q.addEventListener("click",u);v.addEventListener("click",u);X.forEach(e=>{e.addEventListener("click",u)});document.addEventListener("keydown",e=>{e.key==="Escape"&&b.classList.contains("is-open")&&u()});
//# sourceMappingURL=index.js.map
