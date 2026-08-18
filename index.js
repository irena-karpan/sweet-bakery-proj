import{a as u,i as _,S as A,P as B,N as P,r as D,A as Q,b as T}from"./assets/vendor-BnzpHVZG.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const d of i.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&o(d)}).observe(document,{childList:!0,subtree:!0});function r(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(s){if(s.ep)return;s.ep=!0;const i=r(s);fetch(s.href,i)}})();u.defaults.baseURL="https://deserts-store.b.goit.study/api/";async function X(){return(await u.get("desserts",{params:{page:1,limit:8,type:"popular"}})).data.desserts}const F="/sweet-bakery-proj/assets/sprite-Bt9wopdv.svg",S=document.querySelector(".popular-swiper .swiper-wrapper"),Y=document.querySelector(".loader-container"),Z=document.querySelector(".slider-controls");function ee(e,t){const r=e.map(({_id:o,image:s,name:i,price:d,category:b,description:O})=>`
        <div class="swiper-slide">
          <article class="product-card">
            <div class="product-card-thumb">
              <img 
                src="${s}" 
                alt="${i}" 
                width="280" 
              />
            </div>

            <div class="product-card-content">
              <p class="product-card-category">${b.name}</p>
              <h3 class="product-card-title">${i}</h3>
              <p class="product-card-desc">${O}</p>
            </div>

            <div class="product-card-footer">
              <p class="product-card-price">${d} грн</p>
              
              <button 
                type="button" 
                class="product-card-btn-arrow js-open-modal" 
                data-id="${o}"
                aria-label="Переглянути деталі ${i}"
              > <svg class="arrow-card-icon" width="24" height="24">
            <use href="${F}#arrow_outward-icon"></use>
          </svg>
              </button>
            </div>
          </article>
        </div>
      `).join("");t.innerHTML=r}function te(){new A(".popular-swiper",{modules:[B,P],slidesPerView:1,spaceBetween:16,pagination:{el:".slider-controls .popular-pagination",clickable:!0,dynamicBullets:!0,dynamicMainBullets:1},navigation:{nextEl:".slider-controls .slider-button-next",prevEl:".slider-controls .slider-button-prev"},breakpoints:{768:{slidesPerView:2,spaceBetween:16},1440:{slidesPerView:3,spaceBetween:24}}})}async function re(){if(S)try{const e=await X();if(!e||e.length<3){S.innerHTML='<p class="error-message">На жаль, десерти відсутні</p>';return}ee(e,S),te(),Z.classList.remove("is-hidden")}catch(e){console.error("Помилка завантаження:",e),S.innerHTML='<p class="error-message">Не вдалося завантажити бестселлери</p>',_.error({title:"Помилка",message:"Не вдалося завантажити популярні десерти",position:"topRight"})}finally{Y.classList.add("is-hidden")}}re();async function se(){const{data:e}=await u.get("categories");return e}async function N({page:e,limit:t,category:r}={}){const o={page:e,limit:t};r&&(o.category=r);const{data:s}=await u.get("desserts",{params:o});return s}const a={page:1,limit:8,category:null,totalItems:0,isLoading:!1},n={categories:document.querySelector(".desserts__categories"),categorySelect:document.querySelector(".desserts__select"),grid:document.querySelector(".desserts__grid"),loader:document.querySelector(".desserts__loader"),loadMoreButton:document.querySelector(".desserts__load-more")};function l(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function oe(e){const t=l(e._id),r=l(e.name),o=l(e.description),s=l(e.category.name),i=l(e.image),d=l(e.price);return`
    <li class="dessert-card">
      <img
        class="dessert-card__image"
        src="${i}"
        alt="${r}"
        loading="lazy"
      />
      <div class="dessert-card__content">
        <div class="dessert-card__info">
          <p class="dessert-card__category">${s}</p>
          <h3 class="dessert-card__title">${r}</h3>
          <p class="dessert-card__description">${o}</p>
        </div>
        <div class="dessert-card__footer">
          <p class="dessert-card__price">${d} грн</p>
          <button
            class="dessert-card__button js-open-modal"
            type="button"
            data-id="${t}"
            aria-label="Переглянути ${r}"
          >
            <svg class="dessert-card__icon" aria-hidden="true">
              <use href="${F}#arrow_outward-icon"></use>
            </svg>
          </button>
        </div>
      </div>
    </li>
  `}function ne(e){return e.map(oe).join("")}function ie(e){const t=l(e._id),r=l(e.name);return`
    <button
      class="desserts__category"
      type="button"
      data-category-id="${t}"
    >
      ${r}
    </button>
  `}function ae(e){const t=l(e._id),r=l(e.name);return`<option value="${t}">${r}</option>`}function ce(e){n.categories.insertAdjacentHTML("beforeend",e.map(ie).join("")),n.categorySelect.insertAdjacentHTML("beforeend",e.map(ae).join(""))}function k(){const e=a.category??"";n.categorySelect.value=e,n.categories.querySelectorAll(".desserts__category").forEach(t=>{const r=t.dataset.categoryId===e;t.classList.toggle("is-active",r),t.setAttribute("aria-pressed",String(r))})}function E(e,{append:t=!1}={}){a.isLoading=e,e&&n.grid.insertAdjacentElement(t?"afterend":"beforebegin",n.loader),n.loader.hidden=!e,n.grid.setAttribute("aria-busy",String(e)),n.loadMoreButton.disabled=e,n.categorySelect.disabled=e,n.categories.classList.toggle("is-loading",e),n.categories.setAttribute("aria-busy",String(e))}function de(){const e=n.grid.children.length;n.loadMoreButton.hidden=a.totalItems===0||e>=a.totalItems}function q(e){_.error({title:"Помилка",message:e,position:"topRight"})}function R(e,{append:t,page:r}){const o=e.desserts;if(!Array.isArray(o))throw new TypeError("Invalid desserts response");const s=ne(o);t?n.grid.insertAdjacentHTML("beforeend",s):n.grid.innerHTML=s,a.page=Number(e.page)||r,a.limit=Number(e.limit)||a.limit,a.totalItems=Number(e.totalItems)||0,de()}async function H({append:e=!1,page:t=a.page}={}){if(!a.isLoading){E(!0,{append:e});try{const r=await N({page:t,limit:a.limit,category:a.category});return R(r,{append:e,page:t}),!0}catch{return e||(n.loadMoreButton.hidden=!0),q("Не вдалося завантажити десерти. Спробуйте ще раз."),!1}finally{E(!1)}}}async function V(e){const t=e||null;if(a.isLoading||t===a.category){k();return}const r=a.category;a.category=t,k(),await H({page:1})||(a.category=r,k())}function le(e){const t=e.target.closest(".desserts__category");!t||!n.categories.contains(t)||V(t.dataset.categoryId)}function ue(e){V(e.target.value)}function pe(){a.isLoading||H({append:!0,page:a.page+1})}async function me(){E(!0);const[e,t]=await Promise.allSettled([se(),N({page:1,limit:a.limit})]);e.status==="fulfilled"&&Array.isArray(e.value)?(ce(e.value),k()):q("Не вдалося завантажити категорії десертів.");try{if(t.status==="rejected")throw t.reason;R(t.value,{append:!1,page:1})}catch{n.loadMoreButton.hidden=!0,q("Не вдалося завантажити десерти. Спробуйте ще раз.")}finally{E(!1)}}n.categories&&n.categorySelect&&n.grid&&n.loader&&n.loadMoreButton&&(n.categories.addEventListener("click",le),n.categorySelect.addEventListener("change",ue),n.loadMoreButton.addEventListener("click",pe),me());let v=null;function W(){window.innerWidth>=768&&!v&&(v=new A(".about-us-swiper",{modules:[P,B],slidesPerView:2,spaceBetween:24,navigation:{prevEl:".about-us-button-prev",nextEl:".about-us-button-next"},pagination:{el:".about-us-pagination",clickable:!0,dynamicBullets:!0}})),window.innerWidth<768&&v&&(v.destroy(!0,!0),v=null)}W();window.addEventListener("resize",W);async function fe(){return(await u.get("feedbacks",{params:{page:1,limit:10}})).data.feedbacks}const I=document.querySelector("#sweet-factory-feedback-list"),p=document.querySelector("#feedback-loader")||document.querySelector(".loader-container"),m=document.querySelector("#feedback-controls")||document.querySelector(".feedback-controls"),f=document.querySelector(".feedback-navigation-buttons");let j=null;function ge(e){return`
    <div
      class="feedback-rating star-rating"
      data-rating="${Number(e)}"
    ></div>
  `}function ye(e){return e.map(({author:t,description:r,rate:o})=>`
        <li class="swiper-slide feedback-card">
          ${ge(o)}
          <p class="feedback-text">"${r}"</p>
          <h3 class="feedback-user-name">${t}</h3>
        </li>
      `).join("")}function be(){document.querySelectorAll(".feedback-rating").forEach(t=>{const r=Number(t.dataset.rating)||0;D({element:t,max:5,rating:r,starSize:20,step:.5,readOnly:!0})})}function ve(){j||(j=new A(".feedback-swiper",{modules:[P,B],slidesPerView:1,spaceBetween:16,navigation:{prevEl:".feedback-button-prev",nextEl:".feedback-button-next"},pagination:{el:".feedback-pagination",clickable:!0,dynamicBullets:!0},breakpoints:{768:{slidesPerView:3,spaceBetween:24},1440:{slidesPerView:3,spaceBetween:24}}}))}async function he(){p==null||p.classList.remove("hidden"),m==null||m.classList.add("is-hidden"),f==null||f.classList.add("is-hidden");try{const e=await fe();if(!e||!e.length){console.warn("Отримано порожній масив відгуків");return}I&&(I.innerHTML=ye(e)),be(),ve(),m==null||m.classList.remove("is-hidden"),f==null||f.classList.remove("is-hidden")}catch(e){console.error("Помилка завантаження відгуків:",e),_.error({title:"Помилка",message:"Не вдалося завантажити відгуки",position:"topRight"})}finally{p==null||p.classList.add("hidden")}}he();document.addEventListener("DOMContentLoaded",()=>{new Q(".accordion-container",{duration:300,showMultiple:!1})});const we=document.querySelector(".burger-btn"),x=document.querySelector(".mobile-menu"),C=document.querySelector(".mobile-backdrop"),Le=document.querySelector(".mobile-close"),Se=document.querySelectorAll(".mobile-link"),ke=document.querySelector(".mobile-logo");ke.addEventListener("click",w);function Ee(){x.classList.add("is-open"),C.classList.add("is-open"),document.body.classList.add("no-scroll")}function w(){x.classList.remove("is-open"),C.classList.remove("is-open"),document.body.classList.remove("no-scroll")}we.addEventListener("click",Ee);Le.addEventListener("click",w);C.addEventListener("click",w);Se.forEach(e=>{e.addEventListener("click",w)});document.addEventListener("keydown",e=>{e.key==="Escape"&&x.classList.contains("is-open")&&w()});async function _e(e){return(await u.get(`desserts/${e}`)).data}async function $e(e){return(await u.post("orders",e)).data}const h=document.querySelector(".modal-order"),qe=document.querySelector(".order-close"),M=document.querySelector(".order-form"),z=document.querySelector(".loader-backdrop");let U="";function Me(e){e.closest(".form-field").classList.add("is-error"),e.classList.add("error")}function Ae(e){e.closest(".form-field").classList.remove("is-error"),e.classList.remove("error")}function J(e){return e.checkValidity()?(Ae(e),!0):(Me(e),!1)}const Be=M.querySelectorAll("input, textarea");Be.forEach(e=>{e.addEventListener("input",()=>{J(e)})});function Pe(e){U=e,h.classList.remove("is-hidden"),document.documentElement.classList.add("no-scroll"),document.body.classList.add("no-scroll")}function $(){h.classList.add("is-hidden"),document.documentElement.classList.remove("no-scroll"),document.body.classList.remove("no-scroll")}function xe(){return U}function Ce(){z.classList.remove("is-hidden")}function Oe(){z.classList.add("is-hidden")}qe.addEventListener("click",$);h.addEventListener("click",e=>{e.target===h&&$()});document.addEventListener("keydown",e=>{const t=!h.classList.contains("is-hidden");e.key==="Escape"&&t&&$()});function Ie(e){T.fire({icon:"success",title:"Заявку успішно надіслано!",text:`Номер вашого замовлення: ${e}`,confirmButtonText:"Добре"})}function je(e){T.fire({icon:"error",title:"Щось пішло не так",text:e,confirmButtonText:"Спробувати ще раз"})}M.addEventListener("submit",async e=>{e.preventDefault();const{username:t,phone:r,comment:o}=e.target.elements;if(![t,r,o].every(J))return;const d={name:t.value.trim(),phone:r.value.trim(),dessertId:xe(),comment:o.value.trim()};try{Ce();const b=await $e(d);$(),M.reset(),Ie(b.orderNum)}catch{je("Не вдалося надіслати заявку. Спробуйте ще раз.")}finally{Oe()}});const c=document.querySelector(".bd-modal-desert"),g=document.querySelector(".js-modal-dynamic-content"),y=document.querySelector(".btn-modal-desert-close");document.addEventListener("click",Te);g==null||g.addEventListener("click",Re);function De(){return window.innerWidth-document.documentElement.clientWidth}async function Te(e){const t=e.target.closest(".js-open-modal");if(!t||c&&!c.classList.contains("is-hidden"))return;const r=t.dataset.id;try{const o=await _e(r);if(!o)throw new Error("Дані відсутні");if(Fe(o),Ne(o.rate),c){const s=De();document.documentElement.style.setProperty("--scrollbar-width",`${s}px`),c.classList.remove("is-hidden"),document.body.classList.add("no-scroll")}He()}catch(o){console.error("Помилка модального вікна:",o),_.error({title:"Помилка",message:"Не вдалося завантажити дані про десерт",position:"topRight"})}}function Fe(e){const{_id:t,image:r,name:o,category:s,price:i,description:d,composition:b,rate:O}=e;g.innerHTML=`
    <div class="modal-dessert-details">
      <div class="modal-img-wrapper">
        <img src="${r||""}" alt="${o||"Десерт"}" class="modal-dessert-img" width="295" />
      </div>
      
      <div class="modal-dessert-info">
        <h2 class="modal-dessert-title">${o||"Без назви"}</h2>
        <p class="modal-dessert-price">${i||0} грн</p>
        <div class="modal-dessert-rating-wrapper">
          <div id="dessert-rater"></div>
        </div>
        <p class="modal-dessert-desc">${d||""}</p>
        <p class="modal-dessert-comp"><span class="modal-dessert-comp-span">Склад:</span> ${b||"Не вказано"}</p>
        <button class="btn-modal-desert" data-id="${t}">Перейти до замовлення</button>
      </div>
    </div>
  `}function Ne(e){const t=document.querySelector("#dessert-rater");t&&D({element:t,rating:e||0,starSize:20,readOnly:!0,max:5})}function Re(e){const t=e.target.closest(".btn-modal-desert");if(!t)return;const r=t.dataset.id;L(),Pe(r)}function He(){y==null||y.addEventListener("click",L),c==null||c.addEventListener("click",K),window.addEventListener("keydown",G)}function L(){c&&c.classList.add("is-hidden"),document.body.classList.remove("no-scroll"),document.documentElement.style.setProperty("--scrollbar-width","0px"),g&&(g.innerHTML=""),y==null||y.removeEventListener("click",L),c==null||c.removeEventListener("click",K),window.removeEventListener("keydown",G)}function K(e){e.target===c&&L()}function G(e){e.code==="Escape"&&L()}
//# sourceMappingURL=index.js.map
