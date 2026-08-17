import{a as u,i as _,S,P as E,N as M,A as j,b as A}from"./assets/vendor-BFzgMvxN.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const d of a.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&i(d)}).observe(document,{childList:!0,subtree:!0});function o(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(s){if(s.ep)return;s.ep=!0;const a=o(s);fetch(s.href,a)}})();u.defaults.baseURL="https://deserts-store.b.goit.study/api/";async function T(){return(await u.get("desserts",{params:{page:1,limit:8,type:"popular"}})).data.desserts}const $="/sweet-bakery-proj/assets/sprite-Bt9wopdv.svg",m=document.querySelector(".popular-swiper .swiper-wrapper"),x=document.querySelector(".loader-container"),N=document.querySelector(".slider-controls");function H(e,t){const o=e.map(({_id:i,image:s,name:a,price:d,category:O,description:D})=>`
        <div class="swiper-slide">
          <article class="product-card">
            <div class="product-card-thumb">
              <img 
                src="${s}" 
                alt="${a}" 
                width="280" 
              />
            </div>

            <div class="product-card-content">
              <p class="product-card-category">${O.name}</p>
              <h3 class="product-card-title">${a}</h3>
              <p class="product-card-desc">${D}</p>
            </div>

            <div class="product-card-footer">
              <p class="product-card-price">${d} грн</p>
              
              <button 
                type="button" 
                class="product-card-btn-arrow js-open-modal" 
                data-id="${i}"
                aria-label="Переглянути деталі ${a}"
              > <svg class="arrow-card-icon" width="24" height="24">
            <use href="${$}#arrow_outward-icon"></use>
          </svg>
              </button>
            </div>
          </article>
        </div>
      `).join("");t.innerHTML=o}function R(){new S(".popular-swiper",{modules:[E,M],slidesPerView:1,spaceBetween:16,pagination:{el:".slider-controls .popular-pagination",clickable:!0,dynamicBullets:!0,dynamicMainBullets:1},navigation:{nextEl:".slider-controls .slider-button-next",prevEl:".slider-controls .slider-button-prev"},breakpoints:{768:{slidesPerView:2,spaceBetween:16},1440:{slidesPerView:3,spaceBetween:24}}})}async function z(){if(m)try{const e=await T();if(!e||e.length<3){m.innerHTML='<p class="error-message">На жаль, десерти відсутні</p>';return}H(e,m),R(),N.classList.remove("is-hidden")}catch(e){console.error("Помилка завантаження:",e),m.innerHTML='<p class="error-message">Не вдалося завантажити бестселлери</p>',_.error({title:"Помилка",message:"Не вдалося завантажити популярні десерти",position:"topRight"})}finally{x.classList.add("is-hidden")}}z();async function U(){const{data:e}=await u.get("categories");return e}async function k({page:e,limit:t,category:o}={}){const i={page:e,limit:t};o&&(i.category=o);const{data:s}=await u.get("desserts",{params:i});return s}const n={page:1,limit:8,category:null,totalItems:0,isLoading:!1},r={categories:document.querySelector(".desserts__categories"),categorySelect:document.querySelector(".desserts__select"),grid:document.querySelector(".desserts__grid"),loader:document.querySelector(".desserts__loader"),loadMoreButton:document.querySelector(".desserts__load-more")};function c(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function V(e){const t=c(e._id),o=c(e.name),i=c(e.description),s=c(e.category.name),a=c(e.image),d=c(e.price);return`
    <li class="dessert-card">
      <img
        class="dessert-card__image"
        src="${a}"
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
          <p class="dessert-card__price">${d} грн</p>
          <button
            class="dessert-card__button"
            type="button"
            data-dessert-id="${t}"
            aria-label="Переглянути ${o}"
          >
            <svg class="dessert-card__icon" aria-hidden="true">
              <use href="${$}#arrow_outward-icon"></use>
            </svg>
          </button>
        </div>
      </div>
    </li>
  `}function W(e){return e.map(V).join("")}function F(e){const t=c(e._id),o=c(e.name);return`
    <button
      class="desserts__category"
      type="button"
      data-category-id="${t}"
    >
      ${o}
    </button>
  `}function K(e){const t=c(e._id),o=c(e.name);return`<option value="${t}">${o}</option>`}function G(e){r.categories.insertAdjacentHTML("beforeend",e.map(F).join("")),r.categorySelect.insertAdjacentHTML("beforeend",e.map(K).join(""))}function g(){const e=n.category??"";r.categorySelect.value=e,r.categories.querySelectorAll(".desserts__category").forEach(t=>{const o=t.dataset.categoryId===e;t.classList.toggle("is-active",o),t.setAttribute("aria-pressed",String(o))})}function f(e,{append:t=!1}={}){n.isLoading=e,e&&r.grid.insertAdjacentElement(t?"afterend":"beforebegin",r.loader),r.loader.hidden=!e,r.grid.setAttribute("aria-busy",String(e)),r.loadMoreButton.disabled=e,r.categorySelect.disabled=e,r.categories.classList.toggle("is-loading",e),r.categories.setAttribute("aria-busy",String(e))}function J(){const e=r.grid.children.length;r.loadMoreButton.hidden=n.totalItems===0||e>=n.totalItems}function v(e){_.error({title:"Помилка",message:e,position:"topRight"})}function B(e,{append:t,page:o}){const i=e.desserts;if(!Array.isArray(i))throw new TypeError("Invalid desserts response");const s=W(i);t?r.grid.insertAdjacentHTML("beforeend",s):r.grid.innerHTML=s,n.page=Number(e.page)||o,n.limit=Number(e.limit)||n.limit,n.totalItems=Number(e.totalItems)||0,J()}async function q({append:e=!1,page:t=n.page}={}){if(!n.isLoading){f(!0,{append:e});try{const o=await k({page:t,limit:n.limit,category:n.category});return B(o,{append:e,page:t}),!0}catch{return e||(r.loadMoreButton.hidden=!0),v("Не вдалося завантажити десерти. Спробуйте ще раз."),!1}finally{f(!1)}}}async function C(e){const t=e||null;if(n.isLoading||t===n.category){g();return}const o=n.category;n.category=t,g(),await q({page:1})||(n.category=o,g())}function Q(e){const t=e.target.closest(".desserts__category");!t||!r.categories.contains(t)||C(t.dataset.categoryId)}function X(e){C(e.target.value)}function Y(){n.isLoading||q({append:!0,page:n.page+1})}async function Z(){f(!0);const[e,t]=await Promise.allSettled([U(),k({page:1,limit:n.limit})]);e.status==="fulfilled"&&Array.isArray(e.value)?(G(e.value),g()):v("Не вдалося завантажити категорії десертів.");try{if(t.status==="rejected")throw t.reason;B(t.value,{append:!1,page:1})}catch{r.loadMoreButton.hidden=!0,v("Не вдалося завантажити десерти. Спробуйте ще раз.")}finally{f(!1)}}r.categories&&r.categorySelect&&r.grid&&r.loader&&r.loadMoreButton&&(r.categories.addEventListener("click",Q),r.categorySelect.addEventListener("change",X),r.loadMoreButton.addEventListener("click",Y),Z());let l=null;function P(){window.innerWidth>=768&&!l&&(l=new S(".about-us-swiper",{modules:[M,E],slidesPerView:2,spaceBetween:24,navigation:{prevEl:".about-us-button-prev",nextEl:".about-us-button-next"},pagination:{el:".about-us-pagination",clickable:!0,dynamicBullets:!0}})),window.innerWidth<768&&l&&(l.destroy(!0,!0),l=null)}P();window.addEventListener("resize",P);document.addEventListener("DOMContentLoaded",()=>{new j(".accordion-container",{duration:300,showMultiple:!1})});const ee=document.querySelector(".burger-btn"),h=document.querySelector(".mobile-menu"),w=document.querySelector(".mobile-backdrop"),te=document.querySelector(".mobile-close"),re=document.querySelectorAll(".mobile-link"),se=document.querySelector(".mobile-logo");se.addEventListener("click",p);function oe(){h.classList.add("is-open"),w.classList.add("is-open"),document.body.classList.add("no-scroll")}function p(){h.classList.remove("is-open"),w.classList.remove("is-open"),document.body.classList.remove("no-scroll")}ee.addEventListener("click",oe);te.addEventListener("click",p);w.addEventListener("click",p);re.forEach(e=>{e.addEventListener("click",p)});document.addEventListener("keydown",e=>{e.key==="Escape"&&h.classList.contains("is-open")&&p()});async function ne(e){return(await u.post("https://deserts-store.b.goit.study/api/orders",e)).data}const y=document.querySelector(".modal-order"),ae=document.querySelector(".order-close"),L=document.querySelector(".order-form"),I=document.querySelector(".loader-backdrop");let ie="";function b(){y.classList.add("is-hidden"),document.documentElement.classList.remove("no-scroll"),document.body.classList.remove("no-scroll")}function ce(){return ie}function de(){I.classList.remove("is-hidden")}function le(){I.classList.add("is-hidden")}ae.addEventListener("click",b);y.addEventListener("click",e=>{e.target===y&&b()});document.addEventListener("keydown",e=>{const t=!y.classList.contains("is-hidden");e.key==="Escape"&&t&&b()});function ue(e){A.fire({icon:"success",title:"Заявку успішно надіслано!",text:`Номер вашого замовлення: ${e}`,confirmButtonText:"Добре"})}function pe(e){A.fire({icon:"error",title:"Щось пішло не так",text:e,confirmButtonText:"Спробувати ще раз"})}L.addEventListener("submit",async e=>{e.preventDefault();const{username:t,phone:o,comment:i}=e.target.elements,s={name:t.value.trim(),phone:o.value.trim(),dessertId:ce(),comment:i.value.trim()};try{de();const a=await ne(s);b(),L.reset(),ue(a.orderNum)}catch{pe("Не вдалося надіслати заявку. Спробуйте ще раз.")}finally{le()}});
//# sourceMappingURL=index.js.map
