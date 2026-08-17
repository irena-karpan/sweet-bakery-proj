import{a as u,i as E,S as q,P as B,N as A,r as D,A as G,b as T}from"./assets/vendor-BnzpHVZG.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function r(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(s){if(s.ep)return;s.ep=!0;const a=r(s);fetch(s.href,a)}})();u.defaults.baseURL="https://deserts-store.b.goit.study/api/";async function Q(){return(await u.get("desserts",{params:{page:1,limit:8,type:"popular"}})).data.desserts}const N="/sweet-bakery-proj/assets/sprite-Bt9wopdv.svg",L=document.querySelector(".popular-swiper .swiper-wrapper"),X=document.querySelector(".loader-container"),Y=document.querySelector(".slider-controls");function Z(e,t){const r=e.map(({_id:n,image:s,name:a,price:l,category:$,description:O})=>`
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
              <p class="product-card-category">${$.name}</p>
              <h3 class="product-card-title">${a}</h3>
              <p class="product-card-desc">${O}</p>
            </div>

            <div class="product-card-footer">
              <p class="product-card-price">${l} грн</p>
              
              <button 
                type="button" 
                class="product-card-btn-arrow js-open-modal" 
                data-id="${n}"
                aria-label="Переглянути деталі ${a}"
              > <svg class="arrow-card-icon" width="24" height="24">
            <use href="${N}#arrow_outward-icon"></use>
          </svg>
              </button>
            </div>
          </article>
        </div>
      `).join("");t.innerHTML=r}function ee(){new q(".popular-swiper",{modules:[B,A],slidesPerView:1,spaceBetween:16,pagination:{el:".slider-controls .popular-pagination",clickable:!0,dynamicBullets:!0,dynamicMainBullets:1},navigation:{nextEl:".slider-controls .slider-button-next",prevEl:".slider-controls .slider-button-prev"},breakpoints:{768:{slidesPerView:2,spaceBetween:16},1440:{slidesPerView:3,spaceBetween:24}}})}async function te(){if(L)try{const e=await Q();if(!e||e.length<3){L.innerHTML='<p class="error-message">На жаль, десерти відсутні</p>';return}Z(e,L),ee(),Y.classList.remove("is-hidden")}catch(e){console.error("Помилка завантаження:",e),L.innerHTML='<p class="error-message">Не вдалося завантажити бестселлери</p>',E.error({title:"Помилка",message:"Не вдалося завантажити популярні десерти",position:"topRight"})}finally{X.classList.add("is-hidden")}}te();async function re(){const{data:e}=await u.get("categories");return e}async function R({page:e,limit:t,category:r}={}){const n={page:e,limit:t};r&&(n.category=r);const{data:s}=await u.get("desserts",{params:n});return s}const i={page:1,limit:8,category:null,totalItems:0,isLoading:!1},o={categories:document.querySelector(".desserts__categories"),categorySelect:document.querySelector(".desserts__select"),grid:document.querySelector(".desserts__grid"),loader:document.querySelector(".desserts__loader"),loadMoreButton:document.querySelector(".desserts__load-more")};function d(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function se(e){const t=d(e._id),r=d(e.name),n=d(e.description),s=d(e.category.name),a=d(e.image),l=d(e.price);return`
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
            class="dessert-card__button js-open-modal"
            type="button"
            data-id="${t}"
            aria-label="Переглянути ${r}"
          >
            <svg class="dessert-card__icon" aria-hidden="true">
              <use href="${N}#arrow_outward-icon"></use>
            </svg>
          </button>
        </div>
      </div>
    </li>
  `}function oe(e){return e.map(se).join("")}function ne(e){const t=d(e._id),r=d(e.name);return`
    <button
      class="desserts__category"
      type="button"
      data-category-id="${t}"
    >
      ${r}
    </button>
  `}function ae(e){const t=d(e._id),r=d(e.name);return`<option value="${t}">${r}</option>`}function ie(e){o.categories.insertAdjacentHTML("beforeend",e.map(ne).join("")),o.categorySelect.insertAdjacentHTML("beforeend",e.map(ae).join(""))}function S(){const e=i.category??"";o.categorySelect.value=e,o.categories.querySelectorAll(".desserts__category").forEach(t=>{const r=t.dataset.categoryId===e;t.classList.toggle("is-active",r),t.setAttribute("aria-pressed",String(r))})}function k(e,{append:t=!1}={}){i.isLoading=e,e&&o.grid.insertAdjacentElement(t?"afterend":"beforebegin",o.loader),o.loader.hidden=!e,o.grid.setAttribute("aria-busy",String(e)),o.loadMoreButton.disabled=e,o.categorySelect.disabled=e,o.categories.classList.toggle("is-loading",e),o.categories.setAttribute("aria-busy",String(e))}function ce(){const e=o.grid.children.length;o.loadMoreButton.hidden=i.totalItems===0||e>=i.totalItems}function M(e){E.error({title:"Помилка",message:e,position:"topRight"})}function H(e,{append:t,page:r}){const n=e.desserts;if(!Array.isArray(n))throw new TypeError("Invalid desserts response");const s=oe(n);t?o.grid.insertAdjacentHTML("beforeend",s):o.grid.innerHTML=s,i.page=Number(e.page)||r,i.limit=Number(e.limit)||i.limit,i.totalItems=Number(e.totalItems)||0,ce()}async function V({append:e=!1,page:t=i.page}={}){if(!i.isLoading){k(!0,{append:e});try{const r=await R({page:t,limit:i.limit,category:i.category});return H(r,{append:e,page:t}),!0}catch{return e||(o.loadMoreButton.hidden=!0),M("Не вдалося завантажити десерти. Спробуйте ще раз."),!1}finally{k(!1)}}}async function W(e){const t=e||null;if(i.isLoading||t===i.category){S();return}const r=i.category;i.category=t,S(),await V({page:1})||(i.category=r,S())}function de(e){const t=e.target.closest(".desserts__category");!t||!o.categories.contains(t)||W(t.dataset.categoryId)}function le(e){W(e.target.value)}function ue(){i.isLoading||V({append:!0,page:i.page+1})}async function pe(){k(!0);const[e,t]=await Promise.allSettled([re(),R({page:1,limit:i.limit})]);e.status==="fulfilled"&&Array.isArray(e.value)?(ie(e.value),S()):M("Не вдалося завантажити категорії десертів.");try{if(t.status==="rejected")throw t.reason;H(t.value,{append:!1,page:1})}catch{o.loadMoreButton.hidden=!0,M("Не вдалося завантажити десерти. Спробуйте ще раз.")}finally{k(!1)}}o.categories&&o.categorySelect&&o.grid&&o.loader&&o.loadMoreButton&&(o.categories.addEventListener("click",de),o.categorySelect.addEventListener("change",le),o.loadMoreButton.addEventListener("click",ue),pe());let b=null;function z(){window.innerWidth>=768&&!b&&(b=new q(".about-us-swiper",{modules:[A,B],slidesPerView:2,spaceBetween:24,navigation:{prevEl:".about-us-button-prev",nextEl:".about-us-button-next"},pagination:{el:".about-us-pagination",clickable:!0,dynamicBullets:!0}})),window.innerWidth<768&&b&&(b.destroy(!0,!0),b=null)}z();window.addEventListener("resize",z);async function me(){return(await u.get("feedbacks",{params:{page:1,limit:10}})).data.feedbacks}const x=document.querySelector("#sweet-factory-feedback-list"),p=document.querySelector("#feedback-loader")||document.querySelector(".loader-container"),m=document.querySelector("#feedback-controls")||document.querySelector(".feedback-controls"),f=document.querySelector(".feedback-navigation-buttons");let I=null;function fe(e){return`
    <div
      class="feedback-rating star-rating"
      data-rating="${Number(e)}"
    ></div>
  `}function ge(e){return e.map(({author:t,description:r,rate:n})=>`
        <li class="swiper-slide feedback-card">
          ${fe(n)}
          <p class="feedback-text">"${r}"</p>
          <h3 class="feedback-user-name">${t}</h3>
        </li>
      `).join("")}function ye(){document.querySelectorAll(".feedback-rating").forEach(t=>{const r=Number(t.dataset.rating)||0;D({element:t,max:5,rating:r,starSize:20,step:.5,readOnly:!0})})}function be(){I||(I=new q(".feedback-swiper",{modules:[A,B],slidesPerView:1,spaceBetween:16,navigation:{prevEl:".feedback-button-prev",nextEl:".feedback-button-next"},pagination:{el:".feedback-pagination",clickable:!0,dynamicBullets:!0},breakpoints:{768:{slidesPerView:3,spaceBetween:24},1440:{slidesPerView:3,spaceBetween:24}}}))}async function ve(){p==null||p.classList.remove("hidden"),m==null||m.classList.add("is-hidden"),f==null||f.classList.add("is-hidden");try{const e=await me();if(!e||!e.length){console.warn("Отримано порожній масив відгуків");return}x&&(x.innerHTML=ge(e)),ye(),be(),m==null||m.classList.remove("is-hidden"),f==null||f.classList.remove("is-hidden")}catch(e){console.error("Помилка завантаження відгуків:",e),E.error({title:"Помилка",message:"Не вдалося завантажити відгуки",position:"topRight"})}finally{p==null||p.classList.add("hidden")}}ve();document.addEventListener("DOMContentLoaded",()=>{new G(".accordion-container",{duration:300,showMultiple:!1})});const he=document.querySelector(".burger-btn"),P=document.querySelector(".mobile-menu"),C=document.querySelector(".mobile-backdrop"),we=document.querySelector(".mobile-close"),Le=document.querySelectorAll(".mobile-link"),Se=document.querySelector(".mobile-logo");Se.addEventListener("click",h);function ke(){P.classList.add("is-open"),C.classList.add("is-open"),document.body.classList.add("no-scroll")}function h(){P.classList.remove("is-open"),C.classList.remove("is-open"),document.body.classList.remove("no-scroll")}he.addEventListener("click",ke);we.addEventListener("click",h);C.addEventListener("click",h);Le.forEach(e=>{e.addEventListener("click",h)});document.addEventListener("keydown",e=>{e.key==="Escape"&&P.classList.contains("is-open")&&h()});async function Ee(e){return(await u.get(`desserts/${e}`)).data}async function _e(e){return(await u.post("orders",e)).data}const v=document.querySelector(".modal-order"),$e=document.querySelector(".order-close"),j=document.querySelector(".order-form"),F=document.querySelector(".loader-backdrop");let U="";function Me(e){U=e,v.classList.remove("is-hidden"),document.documentElement.classList.add("no-scroll"),document.body.classList.add("no-scroll")}function _(){v.classList.add("is-hidden"),document.documentElement.classList.remove("no-scroll"),document.body.classList.remove("no-scroll")}function qe(){return U}function Be(){F.classList.remove("is-hidden")}function Ae(){F.classList.add("is-hidden")}$e.addEventListener("click",_);v.addEventListener("click",e=>{e.target===v&&_()});document.addEventListener("keydown",e=>{const t=!v.classList.contains("is-hidden");e.key==="Escape"&&t&&_()});function Pe(e){T.fire({icon:"success",title:"Заявку успішно надіслано!",text:`Номер вашого замовлення: ${e}`,confirmButtonText:"Добре"})}function Ce(e){T.fire({icon:"error",title:"Щось пішло не так",text:e,confirmButtonText:"Спробувати ще раз"})}j.addEventListener("submit",async e=>{e.preventDefault();const{username:t,phone:r,comment:n}=e.target.elements,s={name:t.value.trim(),phone:r.value.trim(),dessertId:qe(),comment:n.value.trim()};try{Be();const a=await _e(s);_(),j.reset(),Pe(a.orderNum)}catch{Ce("Не вдалося надіслати заявку. Спробуйте ще раз.")}finally{Ae()}});const c=document.querySelector(".bd-modal-desert"),g=document.querySelector(".js-modal-dynamic-content"),y=document.querySelector(".btn-modal-desert-close");document.addEventListener("click",xe);g==null||g.addEventListener("click",De);function Oe(){return window.innerWidth-document.documentElement.clientWidth}async function xe(e){const t=e.target.closest(".js-open-modal");if(!t||c&&!c.classList.contains("is-hidden"))return;const r=t.dataset.id;try{const n=await Ee(r);if(!n)throw new Error("Дані відсутні");if(Ie(n),je(n.rate),c){const s=Oe();document.documentElement.style.setProperty("--scrollbar-width",`${s}px`),c.classList.remove("is-hidden"),document.body.classList.add("no-scroll")}Te()}catch(n){console.error("Помилка модального вікна:",n),E.error({title:"Помилка",message:"Не вдалося завантажити дані про десерт",position:"topRight"})}}function Ie(e){const{_id:t,image:r,name:n,category:s,price:a,description:l,composition:$,rate:O}=e;g.innerHTML=`
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
        <p class="modal-dessert-comp"><span class="modal-dessert-comp-span">Склад:</span> ${$||"Не вказано"}</p>
        <button class="btn-modal-desert" data-id="${t}">Перейти до замовлення</button>
      </div>
    </div>
  `}function je(e){const t=document.querySelector("#dessert-rater");t&&D({element:t,rating:e||0,starSize:20,readOnly:!0,max:5})}function De(e){const t=e.target.closest(".btn-modal-desert");if(!t)return;const r=t.dataset.id;w(),Me(r)}function Te(){y==null||y.addEventListener("click",w),c==null||c.addEventListener("click",J),window.addEventListener("keydown",K)}function w(){c&&c.classList.add("is-hidden"),document.body.classList.remove("no-scroll"),document.documentElement.style.setProperty("--scrollbar-width","0px"),g&&(g.innerHTML=""),y==null||y.removeEventListener("click",w),c==null||c.removeEventListener("click",J),window.removeEventListener("keydown",K)}function J(e){e.target===c&&w()}function K(e){e.code==="Escape"&&w()}
//# sourceMappingURL=index.js.map
