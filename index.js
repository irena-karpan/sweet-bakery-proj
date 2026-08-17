import{a as m,i as _,S as B,P as A,N as C,A as z,b as P,r as U}from"./assets/vendor-CisXVA3r.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function r(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(s){if(s.ep)return;s.ep=!0;const a=r(s);fetch(s.href,a)}})();m.defaults.baseURL="https://deserts-store.b.goit.study/api/";async function V(){return(await m.get("desserts",{params:{page:1,limit:8,type:"popular"}})).data.desserts}const I="/sweet-bakery-proj/assets/sprite-Bt9wopdv.svg",h=document.querySelector(".popular-swiper .swiper-wrapper"),F=document.querySelector(".loader-container"),J=document.querySelector(".slider-controls");function K(e,t){const r=e.map(({_id:n,image:s,name:a,price:l,category:S,description:M})=>`
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
              <p class="product-card-category">${S.name}</p>
              <h3 class="product-card-title">${a}</h3>
              <p class="product-card-desc">${M}</p>
            </div>

            <div class="product-card-footer">
              <p class="product-card-price">${l} грн</p>
              
              <button 
                type="button" 
                class="product-card-btn-arrow js-open-modal" 
                data-id="${n}"
                aria-label="Переглянути деталі ${a}"
              > <svg class="arrow-card-icon" width="24" height="24">
            <use href="${I}#arrow_outward-icon"></use>
          </svg>
              </button>
            </div>
          </article>
        </div>
      `).join("");t.innerHTML=r}function G(){new B(".popular-swiper",{modules:[A,C],slidesPerView:1,spaceBetween:16,pagination:{el:".slider-controls .popular-pagination",clickable:!0,dynamicBullets:!0,dynamicMainBullets:1},navigation:{nextEl:".slider-controls .slider-button-next",prevEl:".slider-controls .slider-button-prev"},breakpoints:{768:{slidesPerView:2,spaceBetween:16},1440:{slidesPerView:3,spaceBetween:24}}})}async function Q(){if(h)try{const e=await V();if(!e||e.length<3){h.innerHTML='<p class="error-message">На жаль, десерти відсутні</p>';return}K(e,h),G(),J.classList.remove("is-hidden")}catch(e){console.error("Помилка завантаження:",e),h.innerHTML='<p class="error-message">Не вдалося завантажити бестселлери</p>',_.error({title:"Помилка",message:"Не вдалося завантажити популярні десерти",position:"topRight"})}finally{F.classList.add("is-hidden")}}Q();async function X(){const{data:e}=await m.get("categories");return e}async function O({page:e,limit:t,category:r}={}){const n={page:e,limit:t};r&&(n.category=r);const{data:s}=await m.get("desserts",{params:n});return s}const i={page:1,limit:8,category:null,totalItems:0,isLoading:!1},o={categories:document.querySelector(".desserts__categories"),categorySelect:document.querySelector(".desserts__select"),grid:document.querySelector(".desserts__grid"),loader:document.querySelector(".desserts__loader"),loadMoreButton:document.querySelector(".desserts__load-more")};function d(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Y(e){const t=d(e._id),r=d(e.name),n=d(e.description),s=d(e.category.name),a=d(e.image),l=d(e.price);return`
    <li class="dessert-card">
      <img
        class="dessert-card__image"
        src="${a}"
        alt="${r}"
        loading="lazy"
      />
      <div class="dessert-card__content">
        <div class="dessert-card__info">
          <p class="dessert-card__category">${s}</p>
          <h3 class="dessert-card__title">${r}</h3>
          <p class="dessert-card__description">${n}</p>
        </div>
        <div class="dessert-card__footer">
          <p class="dessert-card__price">${l} грн</p>
          <button
            class="dessert-card__button"
            type="button"
            data-dessert-id="${t}"
            aria-label="Переглянути ${r}"
          >
            <svg class="dessert-card__icon" aria-hidden="true">
              <use href="${I}#arrow_outward-icon"></use>
            </svg>
          </button>
        </div>
      </div>
    </li>
  `}function Z(e){return e.map(Y).join("")}function ee(e){const t=d(e._id),r=d(e.name);return`
    <button
      class="desserts__category"
      type="button"
      data-category-id="${t}"
    >
      ${r}
    </button>
  `}function te(e){const t=d(e._id),r=d(e.name);return`<option value="${t}">${r}</option>`}function re(e){o.categories.insertAdjacentHTML("beforeend",e.map(ee).join("")),o.categorySelect.insertAdjacentHTML("beforeend",e.map(te).join(""))}function b(){const e=i.category??"";o.categorySelect.value=e,o.categories.querySelectorAll(".desserts__category").forEach(t=>{const r=t.dataset.categoryId===e;t.classList.toggle("is-active",r),t.setAttribute("aria-pressed",String(r))})}function w(e,{append:t=!1}={}){i.isLoading=e,e&&o.grid.insertAdjacentElement(t?"afterend":"beforebegin",o.loader),o.loader.hidden=!e,o.grid.setAttribute("aria-busy",String(e)),o.loadMoreButton.disabled=e,o.categorySelect.disabled=e,o.categories.classList.toggle("is-loading",e),o.categories.setAttribute("aria-busy",String(e))}function se(){const e=o.grid.children.length;o.loadMoreButton.hidden=i.totalItems===0||e>=i.totalItems}function E(e){_.error({title:"Помилка",message:e,position:"topRight"})}function D(e,{append:t,page:r}){const n=e.desserts;if(!Array.isArray(n))throw new TypeError("Invalid desserts response");const s=Z(n);t?o.grid.insertAdjacentHTML("beforeend",s):o.grid.innerHTML=s,i.page=Number(e.page)||r,i.limit=Number(e.limit)||i.limit,i.totalItems=Number(e.totalItems)||0,se()}async function j({append:e=!1,page:t=i.page}={}){if(!i.isLoading){w(!0,{append:e});try{const r=await O({page:t,limit:i.limit,category:i.category});return D(r,{append:e,page:t}),!0}catch{return e||(o.loadMoreButton.hidden=!0),E("Не вдалося завантажити десерти. Спробуйте ще раз."),!1}finally{w(!1)}}}async function x(e){const t=e||null;if(i.isLoading||t===i.category){b();return}const r=i.category;i.category=t,b(),await j({page:1})||(i.category=r,b())}function oe(e){const t=e.target.closest(".desserts__category");!t||!o.categories.contains(t)||x(t.dataset.categoryId)}function ne(e){x(e.target.value)}function ae(){i.isLoading||j({append:!0,page:i.page+1})}async function ie(){w(!0);const[e,t]=await Promise.allSettled([X(),O({page:1,limit:i.limit})]);e.status==="fulfilled"&&Array.isArray(e.value)?(re(e.value),b()):E("Не вдалося завантажити категорії десертів.");try{if(t.status==="rejected")throw t.reason;D(t.value,{append:!1,page:1})}catch{o.loadMoreButton.hidden=!0,E("Не вдалося завантажити десерти. Спробуйте ще раз.")}finally{w(!1)}}o.categories&&o.categorySelect&&o.grid&&o.loader&&o.loadMoreButton&&(o.categories.addEventListener("click",oe),o.categorySelect.addEventListener("change",ne),o.loadMoreButton.addEventListener("click",ae),ie());let f=null;function T(){window.innerWidth>=768&&!f&&(f=new B(".about-us-swiper",{modules:[C,A],slidesPerView:2,spaceBetween:24,navigation:{prevEl:".about-us-button-prev",nextEl:".about-us-button-next"},pagination:{el:".about-us-pagination",clickable:!0,dynamicBullets:!0}})),window.innerWidth<768&&f&&(f.destroy(!0,!0),f=null)}T();window.addEventListener("resize",T);document.addEventListener("DOMContentLoaded",()=>{new z(".accordion-container",{duration:300,showMultiple:!1})});const ce=document.querySelector(".burger-btn"),$=document.querySelector(".mobile-menu"),k=document.querySelector(".mobile-backdrop"),de=document.querySelector(".mobile-close"),le=document.querySelectorAll(".mobile-link"),ue=document.querySelector(".mobile-logo");ue.addEventListener("click",y);function pe(){$.classList.add("is-open"),k.classList.add("is-open"),document.body.classList.add("no-scroll")}function y(){$.classList.remove("is-open"),k.classList.remove("is-open"),document.body.classList.remove("no-scroll")}ce.addEventListener("click",pe);de.addEventListener("click",y);k.addEventListener("click",y);le.forEach(e=>{e.addEventListener("click",y)});document.addEventListener("keydown",e=>{e.key==="Escape"&&$.classList.contains("is-open")&&y()});async function me(e){return(await m.get(`desserts/${e}`)).data}async function fe(e){return(await m.post("https://deserts-store.b.goit.study/api/orders",e)).data}const g=document.querySelector(".modal-order"),ge=document.querySelector(".order-close"),q=document.querySelector(".order-form"),N=document.querySelector(".loader-backdrop");let H="";function ye(e){H=e,g.classList.remove("is-hidden"),document.documentElement.classList.add("no-scroll"),document.body.classList.add("no-scroll")}function L(){g.classList.add("is-hidden"),document.documentElement.classList.remove("no-scroll"),document.body.classList.remove("no-scroll")}function ve(){return H}function he(){N.classList.remove("is-hidden")}function be(){N.classList.add("is-hidden")}ge.addEventListener("click",L);g.addEventListener("click",e=>{e.target===g&&L()});document.addEventListener("keydown",e=>{const t=!g.classList.contains("is-hidden");e.key==="Escape"&&t&&L()});function we(e){P.fire({icon:"success",title:"Заявку успішно надіслано!",text:`Номер вашого замовлення: ${e}`,confirmButtonText:"Добре"})}function Le(e){P.fire({icon:"error",title:"Щось пішло не так",text:e,confirmButtonText:"Спробувати ще раз"})}q.addEventListener("submit",async e=>{e.preventDefault();const{username:t,phone:r,comment:n}=e.target.elements,s={name:t.value.trim(),phone:r.value.trim(),dessertId:ve(),comment:n.value.trim()};try{he();const a=await fe(s);L(),q.reset(),we(a.orderNum)}catch{Le("Не вдалося надіслати заявку. Спробуйте ще раз.")}finally{be()}});const c=document.querySelector(".bd-modal-desert"),u=document.querySelector(".js-modal-dynamic-content"),p=document.querySelector(".btn-modal-desert-close");document.addEventListener("click",Ee);u==null||u.addEventListener("click",ke);function Se(){return window.innerWidth-document.documentElement.clientWidth}async function Ee(e){const t=e.target.closest(".js-open-modal");if(!t||c&&!c.classList.contains("is-hidden"))return;const r=t.dataset.id;try{const n=await me(r);if(!n)throw new Error("Дані відсутні");if(_e(n),$e(n.rate),c){const s=Se();document.documentElement.style.setProperty("--scrollbar-width",`${s}px`),c.classList.remove("is-hidden"),document.body.classList.add("no-scroll")}Me()}catch(n){console.error("Помилка модального вікна:",n),_.error({title:"Помилка",message:"Не вдалося завантажити дані про десерт",position:"topRight"})}}function _e(e){const{_id:t,image:r,name:n,category:s,price:a,description:l,composition:S,rate:M}=e;u.innerHTML=`
    <div class="modal-dessert-details">
      <div class="modal-img-wrapper">
        <img src="${r||""}" alt="${n||"Десерт"}" class="modal-dessert-img" width="295" />
      </div>
      
      <div class="modal-dessert-info">
        <h2 class="modal-dessert-title">${n||"Без назви"}</h2>
        <p class="modal-dessert-price">${a||0} грн</p>
        <div class="modal-dessert-rating-wrapper">
          <div id="dessert-rater"></div>
        </div>
        <p class="modal-dessert-desc">${l||""}</p>
        <p class="modal-dessert-comp"><span class="modal-dessert-comp-span">Склад:</span> ${S||"Не вказано"}</p>
        <button class="btn-modal-desert" data-id="${t}">Перейти до замовлення</button>
      </div>
    </div>
  `}function $e(e){const t=document.querySelector("#dessert-rater");t&&U({element:t,rating:e||0,starSize:20,readOnly:!0,max:5})}function ke(e){const t=e.target.closest(".btn-modal-desert");if(!t)return;const r=t.dataset.id;v(),ye(r)}function Me(){p==null||p.addEventListener("click",v),c==null||c.addEventListener("click",R),window.addEventListener("keydown",W)}function v(){c&&c.classList.add("is-hidden"),document.body.classList.remove("no-scroll"),document.documentElement.style.setProperty("--scrollbar-width","0px"),u&&(u.innerHTML=""),p==null||p.removeEventListener("click",v),c==null||c.removeEventListener("click",R),window.removeEventListener("keydown",W)}function R(e){e.target===c&&v()}function W(e){e.code==="Escape"&&v()}
//# sourceMappingURL=index.js.map
