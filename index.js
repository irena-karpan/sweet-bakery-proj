import{a as p,i as E,S as T,P as x,N as O,r as R,A as re,b as V,c as F}from"./assets/vendor-Cee3kg8f.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function o(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(n){if(n.ep)return;n.ep=!0;const i=o(n);fetch(n.href,i)}})();p.defaults.baseURL="https://deserts-store.b.goit.study/api/";async function oe(){return(await p.get("desserts",{params:{page:1,limit:8,type:"popular"}})).data.desserts}const N="/sweet-bakery-proj/assets/sprite-Bt9wopdv.svg",S=document.querySelector(".popular-swiper .swiper-wrapper"),se=document.querySelector(".loader-container"),ne=document.querySelector(".slider-controls");function ie(e,t){const o=e.map(({_id:s,image:n,name:i,price:c,category:u,description:P})=>`
        <div class="swiper-slide">
          <article class="product-card" data-aos="fade-up">
            <div class="product-card-thumb">
              <img 
                src="${n}" 
                alt="${i}" 
                width="280" 
              />
            </div>

            <div class="product-card-content">
              <p class="product-card-category">${u.name}</p>
              <h3 class="product-card-title">${i}</h3>
              <p class="product-card-desc">${P}</p>
            </div>

            <div class="product-card-footer">
              <p class="product-card-price">${c} грн</p>
              
              <button 
                type="button" 
                class="product-card-btn-arrow js-open-modal" 
                data-id="${s}"
                aria-label="Переглянути деталі ${i}"
              > <svg class="arrow-card-icon" width="24" height="24">
            <use href="${N}#arrow_outward-icon"></use>
          </svg>
              </button>
            </div>
          </article>
        </div>
      `).join("");t.innerHTML=o}function ae(){new T(".popular-swiper",{modules:[x,O],slidesPerView:1,spaceBetween:16,pagination:{el:".slider-controls .popular-pagination",clickable:!0,dynamicBullets:!0,dynamicMainBullets:1},navigation:{nextEl:".slider-controls .slider-button-next",prevEl:".slider-controls .slider-button-prev"},breakpoints:{768:{slidesPerView:2,spaceBetween:16},1440:{slidesPerView:3,spaceBetween:24}}})}async function de(){if(S)try{const e=await oe();if(!e||e.length<3){S.innerHTML='<p class="error-message">На жаль, десерти відсутні</p>';return}ie(e,S),ae(),ne.classList.remove("is-hidden")}catch(e){console.error("Помилка завантаження:",e),S.innerHTML='<p class="error-message">Не вдалося завантажити бестселлери</p>',E.error({title:"Помилка",message:"Не вдалося завантажити популярні десерти",position:"topRight"})}finally{se.classList.add("is-hidden")}}de();async function ce(){const{data:e}=await p.get("categories");return e}async function W({page:e,limit:t,category:o}={}){const s={page:e,limit:t};o&&(s.category=o);const{data:n}=await p.get("desserts",{params:s});return n}const a={page:1,limit:8,category:null,totalItems:0,isLoading:!1},r={categories:document.querySelector(".desserts__categories"),dropdown:document.querySelector(".desserts-dropdown"),dropdownTrigger:document.querySelector(".desserts-dropdown__trigger"),dropdownValue:document.querySelector(".desserts-dropdown__value"),dropdownMenu:document.querySelector(".desserts-dropdown__menu"),grid:document.querySelector(".desserts__grid"),loader:document.querySelector(".desserts__loader"),loadMoreButton:document.querySelector(".desserts__load-more"),dropdownScrollbar:document.querySelector(".desserts-dropdown__scrollbar"),dropdownScrollbarThumb:document.querySelector(".desserts-dropdown__scrollbar-thumb")};function l(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function le(e){const t=l(e._id),o=l(e.name),s=l(e.description),n=l(e.category.name),i=l(e.image),c=l(e.price);return`
    <li class="dessert-card">
      <img
        class="dessert-card__image"
        src="${i}"
        alt="${o}"
        loading="lazy"
      />
      <div class="dessert-card__content">
        <div class="dessert-card__info">
          <p class="dessert-card__category">${n}</p>
          <h3 class="dessert-card__title">${o}</h3>
          <p class="dessert-card__description">${s}</p>
        </div>
        <div class="dessert-card__footer">
          <p class="dessert-card__price">${c} грн</p>
          <button
            class="dessert-card__button js-open-modal"
            type="button"
            data-id="${t}"
            aria-label="Переглянути ${o}"
          >
            <svg class="dessert-card__icon" aria-hidden="true">
              <use href="${N}#arrow_outward-icon"></use>
            </svg>
          </button>
        </div>
      </div>
    </li>
  `}function ue(e){return e.map(le).join("")}function pe(e){const t=l(e._id),o=l(e.name);return`
    <button
      class="desserts__category"
      type="button"
      data-category-id="${t}"
    >
      ${o}
    </button>
  `}function me(e){const t=l(e._id),o=l(e.name);return`
    <li>
      <button
        class="desserts-dropdown__option"
        type="button"
        role="option"
        aria-selected="false"
        data-category-id="${t}"
      >
        ${o}
      </button>
    </li>
  `}function fe(e){r.categories.insertAdjacentHTML("beforeend",e.map(pe).join("")),r.dropdownMenu.insertAdjacentHTML("beforeend",e.map(me).join(""))}function k(){const e=a.category??"";r.categories.querySelectorAll(".desserts__category").forEach(o=>{const s=o.dataset.categoryId===e;o.classList.toggle("is-active",s),o.setAttribute("aria-pressed",String(s))}),r.dropdownMenu.querySelectorAll(".desserts-dropdown__option").forEach(o=>{const s=o.dataset.categoryId===e;o.classList.toggle("is-active",s),o.setAttribute("aria-selected",String(s)),s&&(r.dropdownValue.textContent=o.textContent.trim())})}function _(e,{append:t=!1}={}){a.isLoading=e,e&&r.grid.insertAdjacentElement(t?"afterend":"beforebegin",r.loader),r.loader.hidden=!e,r.grid.setAttribute("aria-busy",String(e)),r.loadMoreButton.disabled=e,r.dropdownTrigger.disabled=e,r.dropdown.classList.toggle("is-loading",e),r.categories.classList.toggle("is-loading",e),r.categories.setAttribute("aria-busy",String(e))}function ge(){const e=r.grid.children.length;r.loadMoreButton.hidden=a.totalItems===0||e>=a.totalItems}function $(e){E.error({title:"Помилка",message:e,position:"topRight"})}function z(e,{append:t,page:o}){const s=e.desserts;if(!Array.isArray(s))throw new TypeError("Invalid desserts response");const n=ue(s);t?r.grid.insertAdjacentHTML("beforeend",n):r.grid.innerHTML=n,a.page=Number(e.page)||o,a.limit=Number(e.limit)||a.limit,a.totalItems=Number(e.totalItems)||0,ge()}async function U({append:e=!1,page:t=a.page}={}){if(!a.isLoading){_(!0,{append:e});try{const o=await W({page:t,limit:a.limit,category:a.category});return z(o,{append:e,page:t}),!0}catch{return e||(r.loadMoreButton.hidden=!0),$("Не вдалося завантажити десерти. Спробуйте ще раз."),!1}finally{_(!1)}}}async function K(e){const t=e||null;if(a.isLoading||t===a.category){k();return}const o=a.category;a.category=t,k(),await U({page:1})||(a.category=o,k())}function we(e){const t=e.target.closest(".desserts__category");!t||!r.categories.contains(t)||K(t.dataset.categoryId)}function ye(){r.dropdownMenu.hidden=!1,r.dropdownTrigger.setAttribute("aria-expanded","true"),r.dropdown.classList.add("is-open"),J()}function M(){r.dropdownMenu.hidden=!0,r.dropdownTrigger.setAttribute("aria-expanded","false"),r.dropdown.classList.remove("is-open")}function be(){r.dropdownTrigger.getAttribute("aria-expanded")==="true"?M():ye()}function he(e){const t=e.target.closest(".desserts-dropdown__option");!t||!r.dropdownMenu.contains(t)||(K(t.dataset.categoryId),M())}function ve(e){r.dropdown.contains(e.target)||M()}function Le(e){e.key==="Escape"&&(M(),r.dropdownTrigger.focus())}function J(){const e=r.dropdownMenu,t=r.dropdownScrollbarThumb;if(!e||!t)return;const o=e.scrollHeight-e.clientHeight;if(o<=0){r.dropdownScrollbar.hidden=!0;return}r.dropdownScrollbar.hidden=!1;const s=r.dropdownScrollbar.clientHeight,n=t.offsetHeight,i=s-n,u=e.scrollTop/o*i;t.style.transform=`translateY(${u}px)`}function Se(){a.isLoading||U({append:!0,page:a.page+1})}async function ke(){_(!0);const[e,t]=await Promise.allSettled([ce(),W({page:1,limit:a.limit})]);e.status==="fulfilled"&&Array.isArray(e.value)?(fe(e.value),k()):$("Не вдалося завантажити категорії десертів.");try{if(t.status==="rejected")throw t.reason;z(t.value,{append:!1,page:1})}catch{r.loadMoreButton.hidden=!0,$("Не вдалося завантажити десерти. Спробуйте ще раз.")}finally{_(!1)}}r.categories&&r.dropdown&&r.dropdownTrigger&&r.dropdownValue&&r.dropdownMenu&&r.grid&&r.loader&&r.dropdownScrollbar&&r.dropdownScrollbarThumb&&r.loadMoreButton&&(r.categories.addEventListener("click",we),r.dropdownTrigger.addEventListener("click",be),r.dropdownMenu.addEventListener("click",he),document.addEventListener("click",ve),document.addEventListener("keydown",Le),r.loadMoreButton.addEventListener("click",Se),r.dropdownMenu.addEventListener("scroll",J),ke());let h=null;function Y(){window.innerWidth>=768&&!h&&(h=new T(".about-us-swiper",{modules:[O,x],slidesPerView:2,spaceBetween:24,navigation:{prevEl:".about-us-button-prev",nextEl:".about-us-button-next"},pagination:{el:".about-us-pagination",clickable:!0,dynamicBullets:!0}})),window.innerWidth<768&&h&&(h.destroy(!0,!0),h=null)}Y();window.addEventListener("resize",Y);async function _e(){return(await p.get("feedbacks",{params:{page:1,limit:10}})).data.feedbacks}const I=document.querySelector("#sweet-factory-feedback-list"),m=document.querySelector("#feedback-loader")||document.querySelector(".loader-container"),f=document.querySelector("#feedback-controls")||document.querySelector(".feedback-controls"),g=document.querySelector(".feedback-navigation-buttons");let H=null;function Ee(e){return`
    <div
      class="feedback-rating star-rating"
      data-rating="${Number(e)}"
    ></div>
  `}function Me(e){return e.map(({author:t,description:o,rate:s})=>`
        <li class="swiper-slide feedback-card">
          ${Ee(s)}
          <p class="feedback-text">"${o}"</p>
          <h3 class="feedback-user-name">${t}</h3>
        </li>
      `).join("")}function qe(){document.querySelectorAll(".feedback-rating").forEach(t=>{const o=Number(t.dataset.rating)||0;R({element:t,max:5,rating:o,starSize:20,step:.5,readOnly:!0})})}function $e(){H||(H=new T(".feedback-swiper",{modules:[O,x],slidesPerView:1,spaceBetween:16,navigation:{prevEl:".feedback-button-prev",nextEl:".feedback-button-next"},pagination:{el:".feedback-pagination",clickable:!0,dynamicBullets:!0},breakpoints:{768:{slidesPerView:3,spaceBetween:24},1440:{slidesPerView:3,spaceBetween:24}}}))}async function Ae(){m==null||m.classList.remove("hidden"),f==null||f.classList.add("is-hidden"),g==null||g.classList.add("is-hidden");try{const e=await _e();if(!e||!e.length){console.warn("Отримано порожній масив відгуків");return}I&&(I.innerHTML=Me(e)),qe(),$e(),f==null||f.classList.remove("is-hidden"),g==null||g.classList.remove("is-hidden")}catch(e){console.error("Помилка завантаження відгуків:",e),E.error({title:"Помилка",message:"Не вдалося завантажити відгуки",position:"topRight"})}finally{m==null||m.classList.add("hidden")}}Ae();document.addEventListener("DOMContentLoaded",()=>{new re(".accordion-container",{duration:300,showMultiple:!1})});const Te=document.querySelector(".burger-btn"),B=document.querySelector(".mobile-menu"),D=document.querySelector(".mobile-backdrop"),xe=document.querySelector(".mobile-close"),Oe=document.querySelectorAll(".mobile-link"),Be=document.querySelector(".mobile-logo");Be.addEventListener("click",b);const De=document.querySelector(".mobile-btn");De.addEventListener("click",b);function Pe(){B.classList.add("is-open"),D.classList.add("is-open"),document.body.classList.add("no-scroll")}function b(){B.classList.remove("is-open"),D.classList.remove("is-open"),document.body.classList.remove("no-scroll")}Te.addEventListener("click",Pe);xe.addEventListener("click",b);D.addEventListener("click",b);Oe.forEach(e=>{e.addEventListener("click",b)});document.addEventListener("keydown",e=>{e.key==="Escape"&&B.classList.contains("is-open")&&b()});async function Ie(e){return(await p.get(`desserts/${e}`)).data}async function He(e){return(await p.post("orders",e)).data}const v=document.querySelector(".modal-order"),Ce=document.querySelector(".order-close"),A=document.querySelector(".order-form"),G=document.querySelector(".loader-backdrop");let Q="";function je(e){e.closest(".form-field").classList.add("is-error"),e.classList.add("error")}function Re(e){e.closest(".form-field").classList.remove("is-error"),e.classList.remove("error")}function X(e){return e.checkValidity()?(Re(e),!0):(je(e),!1)}const Ve=A.querySelectorAll("input, textarea");Ve.forEach(e=>{e.addEventListener("input",()=>{X(e)})});function Fe(e){Q=e,v.classList.remove("is-hidden"),document.documentElement.classList.add("no-scroll"),document.body.classList.add("no-scroll")}function q(){v.classList.add("is-hidden"),document.documentElement.classList.remove("no-scroll"),document.body.classList.remove("no-scroll")}function Ne(){return Q}function We(){G.classList.remove("is-hidden")}function ze(){G.classList.add("is-hidden")}Ce.addEventListener("click",q);v.addEventListener("click",e=>{e.target===v&&q()});document.addEventListener("keydown",e=>{const t=!v.classList.contains("is-hidden");e.key==="Escape"&&t&&q()});function Ue(e){V.fire({icon:"success",title:"Заявку успішно надіслано!",text:`Номер вашого замовлення: ${e}`,confirmButtonText:"Добре"})}function Ke(e){V.fire({icon:"error",title:"Щось пішло не так",text:e,confirmButtonText:"Спробувати ще раз"})}A.addEventListener("submit",async e=>{e.preventDefault();const{username:t,phone:o,comment:s}=e.target.elements;if(![t,o,s].every(X))return;const c={name:t.value.trim(),phone:o.value.trim(),dessertId:Ne(),comment:s.value.trim()};try{We();const u=await He(c);q(),A.reset(),Ue(u.orderNum)}catch{Ke("Не вдалося надіслати заявку. Спробуйте ще раз.")}finally{ze()}});const d=document.querySelector(".bd-modal-desert"),w=document.querySelector(".js-modal-dynamic-content"),y=document.querySelector(".btn-modal-desert-close"),Je=320;let C=null;document.addEventListener("click",Ge);w==null||w.addEventListener("click",Ze);function Ye(){return window.innerWidth-document.documentElement.clientWidth}async function Ge(e){const t=e.target.closest(".js-open-modal");if(!t||d&&!d.classList.contains("is-hidden"))return;const o=t.dataset.id;try{const s=await Ie(o);if(!s)throw new Error("Дані відсутні");if(Qe(s),Xe(s.rate),d){const n=Ye();document.documentElement.style.setProperty("--scrollbar-width",`${n}px`),d.classList.remove("is-hidden"),document.body.classList.add("no-scroll")}et()}catch(s){console.error("Помилка модального вікна:",s),E.error({title:"Помилка",message:"Не вдалося завантажити дані про десерт",position:"topRight"})}}function Qe(e){const{_id:t,image:o,name:s,category:n,price:i,description:c,composition:u,rate:P}=e;w.innerHTML=`
    <div class="modal-dessert-details">
      <div class="modal-img-wrapper">
        <img src="${o||""}" alt="${s||"Десерт"}" class="modal-dessert-img" width="295" />
      </div>
      
      <div class="modal-dessert-info">
        <h2 class="modal-dessert-title">${s||"Без назви"}</h2>
        <p class="modal-dessert-price">${i||0} грн</p>
        <div class="modal-dessert-rating-wrapper">
          <div id="dessert-rater"></div>
        </div>
        <p class="modal-dessert-desc">${c||""}</p>
        <p class="modal-dessert-comp"><span class="modal-dessert-comp-span">Склад:</span> ${u||"Не вказано"}</p>
        <button class="btn-modal-desert" data-id="${t}">Перейти до замовлення</button>
      </div>
    </div>
  `}function Xe(e){const t=document.querySelector("#dessert-rater");t&&R({element:t,rating:e||0,starSize:20,readOnly:!0,max:5})}function Ze(e){const t=e.target.closest(".btn-modal-desert");if(!t)return;const o=t.dataset.id;L({keepScrollLocked:!0,afterClose:()=>Fe(o)})}function et(){y==null||y.addEventListener("click",L),d==null||d.addEventListener("click",Z),window.addEventListener("keydown",ee)}function L({afterClose:e,keepScrollLocked:t=!1}={}){clearTimeout(C),d&&d.classList.add("is-hidden"),t||(document.body.classList.remove("no-scroll"),document.documentElement.style.setProperty("--scrollbar-width","0px")),y==null||y.removeEventListener("click",L),d==null||d.removeEventListener("click",Z),window.removeEventListener("keydown",ee),C=setTimeout(()=>{w&&(w.innerHTML=""),e==null||e()},Je)}function Z(e){e.target===d&&L()}function ee(e){e.code==="Escape"&&L()}const tt=[".hero-title",".hero-description",".hero-btn",".popular-title",".desserts__title",".desserts__description",".desserts__select-wrapper",".desserts__category",".dessert-card",".about-us-title",".about-us-text",".about-us-slider",".feedback-title",".feedback-subtitle",".feedback-card",".faq-title",".faq-item",".footer-container"];let j=null;function te(){tt.forEach(e=>{document.querySelectorAll(e).forEach(t=>{t.dataset.aos||(t.dataset.aos="fade-up")})})}function rt(){clearTimeout(j),j=setTimeout(()=>{te(),F.refreshHard()},100)}window.addEventListener("load",()=>{te(),F.init({duration:600,easing:"ease-out",offset:80,once:!0,disable:()=>window.matchMedia("(prefers-reduced-motion: reduce)").matches}),new MutationObserver(rt).observe(document.body,{childList:!0,subtree:!0})});
//# sourceMappingURL=index.js.map
