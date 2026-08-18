import{a as p,i as _,S as T,P as x,N as B,r as H,A as X,b as j}from"./assets/vendor-BnzpHVZG.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function o(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(n){if(n.ep)return;n.ep=!0;const i=o(n);fetch(n.href,i)}})();p.defaults.baseURL="https://deserts-store.b.goit.study/api/";async function Z(){return(await p.get("desserts",{params:{page:1,limit:8,type:"popular"}})).data.desserts}const R="/sweet-bakery-proj/assets/sprite-Bt9wopdv.svg",S=document.querySelector(".popular-swiper .swiper-wrapper"),ee=document.querySelector(".loader-container"),te=document.querySelector(".slider-controls");function re(e,t){const o=e.map(({_id:s,image:n,name:i,price:c,category:u,description:P})=>`
        <div class="swiper-slide">
          <article class="product-card">
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
            <use href="${R}#arrow_outward-icon"></use>
          </svg>
              </button>
            </div>
          </article>
        </div>
      `).join("");t.innerHTML=o}function oe(){new T(".popular-swiper",{modules:[x,B],slidesPerView:1,spaceBetween:16,pagination:{el:".slider-controls .popular-pagination",clickable:!0,dynamicBullets:!0,dynamicMainBullets:1},navigation:{nextEl:".slider-controls .slider-button-next",prevEl:".slider-controls .slider-button-prev"},breakpoints:{768:{slidesPerView:2,spaceBetween:16},1440:{slidesPerView:3,spaceBetween:24}}})}async function se(){if(S)try{const e=await Z();if(!e||e.length<3){S.innerHTML='<p class="error-message">На жаль, десерти відсутні</p>';return}re(e,S),oe(),te.classList.remove("is-hidden")}catch(e){console.error("Помилка завантаження:",e),S.innerHTML='<p class="error-message">Не вдалося завантажити бестселлери</p>',_.error({title:"Помилка",message:"Не вдалося завантажити популярні десерти",position:"topRight"})}finally{ee.classList.add("is-hidden")}}se();async function ne(){const{data:e}=await p.get("categories");return e}async function V({page:e,limit:t,category:o}={}){const s={page:e,limit:t};o&&(s.category=o);const{data:n}=await p.get("desserts",{params:s});return n}const d={page:1,limit:8,category:null,totalItems:0,isLoading:!1},r={categories:document.querySelector(".desserts__categories"),dropdown:document.querySelector(".desserts-dropdown"),dropdownTrigger:document.querySelector(".desserts-dropdown__trigger"),dropdownValue:document.querySelector(".desserts-dropdown__value"),dropdownMenu:document.querySelector(".desserts-dropdown__menu"),grid:document.querySelector(".desserts__grid"),loader:document.querySelector(".desserts__loader"),loadMoreButton:document.querySelector(".desserts__load-more"),dropdownScrollbar:document.querySelector(".desserts-dropdown__scrollbar"),dropdownScrollbarThumb:document.querySelector(".desserts-dropdown__scrollbar-thumb")};function l(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function ie(e){const t=l(e._id),o=l(e.name),s=l(e.description),n=l(e.category.name),i=l(e.image),c=l(e.price);return`
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
              <use href="${R}#arrow_outward-icon"></use>
            </svg>
          </button>
        </div>
      </div>
    </li>
  `}function de(e){return e.map(ie).join("")}function ae(e){const t=l(e._id),o=l(e.name);return`
    <button
      class="desserts__category"
      type="button"
      data-category-id="${t}"
    >
      ${o}
    </button>
  `}function ce(e){const t=l(e._id),o=l(e.name);return`
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
  `}function le(e){r.categories.insertAdjacentHTML("beforeend",e.map(ae).join("")),r.dropdownMenu.insertAdjacentHTML("beforeend",e.map(ce).join(""))}function k(){const e=d.category??"";r.categories.querySelectorAll(".desserts__category").forEach(o=>{const s=o.dataset.categoryId===e;o.classList.toggle("is-active",s),o.setAttribute("aria-pressed",String(s))}),r.dropdownMenu.querySelectorAll(".desserts-dropdown__option").forEach(o=>{const s=o.dataset.categoryId===e;o.classList.toggle("is-active",s),o.setAttribute("aria-selected",String(s)),s&&(r.dropdownValue.textContent=o.textContent.trim())})}function E(e,{append:t=!1}={}){d.isLoading=e,e&&r.grid.insertAdjacentElement(t?"afterend":"beforebegin",r.loader),r.loader.hidden=!e,r.grid.setAttribute("aria-busy",String(e)),r.loadMoreButton.disabled=e,r.dropdownTrigger.disabled=e,r.dropdown.classList.toggle("is-loading",e),r.categories.classList.toggle("is-loading",e),r.categories.setAttribute("aria-busy",String(e))}function ue(){const e=r.grid.children.length;r.loadMoreButton.hidden=d.totalItems===0||e>=d.totalItems}function $(e){_.error({title:"Помилка",message:e,position:"topRight"})}function F(e,{append:t,page:o}){const s=e.desserts;if(!Array.isArray(s))throw new TypeError("Invalid desserts response");const n=de(s);t?r.grid.insertAdjacentHTML("beforeend",n):r.grid.innerHTML=n,d.page=Number(e.page)||o,d.limit=Number(e.limit)||d.limit,d.totalItems=Number(e.totalItems)||0,ue()}async function N({append:e=!1,page:t=d.page}={}){if(!d.isLoading){E(!0,{append:e});try{const o=await V({page:t,limit:d.limit,category:d.category});return F(o,{append:e,page:t}),!0}catch{return e||(r.loadMoreButton.hidden=!0),$("Не вдалося завантажити десерти. Спробуйте ще раз."),!1}finally{E(!1)}}}async function W(e){const t=e||null;if(d.isLoading||t===d.category){k();return}const o=d.category;d.category=t,k(),await N({page:1})||(d.category=o,k())}function pe(e){const t=e.target.closest(".desserts__category");!t||!r.categories.contains(t)||W(t.dataset.categoryId)}function me(){r.dropdownMenu.hidden=!1,r.dropdownTrigger.setAttribute("aria-expanded","true"),r.dropdown.classList.add("is-open"),z()}function M(){r.dropdownMenu.hidden=!0,r.dropdownTrigger.setAttribute("aria-expanded","false"),r.dropdown.classList.remove("is-open")}function fe(){r.dropdownTrigger.getAttribute("aria-expanded")==="true"?M():me()}function ge(e){const t=e.target.closest(".desserts-dropdown__option");!t||!r.dropdownMenu.contains(t)||(W(t.dataset.categoryId),M())}function we(e){r.dropdown.contains(e.target)||M()}function ye(e){e.key==="Escape"&&(M(),r.dropdownTrigger.focus())}function z(){const e=r.dropdownMenu,t=r.dropdownScrollbarThumb;if(!e||!t)return;const o=e.scrollHeight-e.clientHeight;if(o<=0){r.dropdownScrollbar.hidden=!0;return}r.dropdownScrollbar.hidden=!1;const s=r.dropdownScrollbar.clientHeight,n=t.offsetHeight,i=s-n,u=e.scrollTop/o*i;t.style.transform=`translateY(${u}px)`}function be(){d.isLoading||N({append:!0,page:d.page+1})}async function he(){E(!0);const[e,t]=await Promise.allSettled([ne(),V({page:1,limit:d.limit})]);e.status==="fulfilled"&&Array.isArray(e.value)?(le(e.value),k()):$("Не вдалося завантажити категорії десертів.");try{if(t.status==="rejected")throw t.reason;F(t.value,{append:!1,page:1})}catch{r.loadMoreButton.hidden=!0,$("Не вдалося завантажити десерти. Спробуйте ще раз.")}finally{E(!1)}}r.categories&&r.dropdown&&r.dropdownTrigger&&r.dropdownValue&&r.dropdownMenu&&r.grid&&r.loader&&r.dropdownScrollbar&&r.dropdownScrollbarThumb&&r.loadMoreButton&&(r.categories.addEventListener("click",pe),r.dropdownTrigger.addEventListener("click",fe),r.dropdownMenu.addEventListener("click",ge),document.addEventListener("click",we),document.addEventListener("keydown",ye),r.loadMoreButton.addEventListener("click",be),r.dropdownMenu.addEventListener("scroll",z),he());let b=null;function U(){window.innerWidth>=768&&!b&&(b=new T(".about-us-swiper",{modules:[B,x],slidesPerView:2,spaceBetween:24,navigation:{prevEl:".about-us-button-prev",nextEl:".about-us-button-next"},pagination:{el:".about-us-pagination",clickable:!0,dynamicBullets:!0}})),window.innerWidth<768&&b&&(b.destroy(!0,!0),b=null)}U();window.addEventListener("resize",U);async function ve(){return(await p.get("feedbacks",{params:{page:1,limit:10}})).data.feedbacks}const C=document.querySelector("#sweet-factory-feedback-list"),m=document.querySelector("#feedback-loader")||document.querySelector(".loader-container"),f=document.querySelector("#feedback-controls")||document.querySelector(".feedback-controls"),g=document.querySelector(".feedback-navigation-buttons");let I=null;function Le(e){return`
    <div
      class="feedback-rating star-rating"
      data-rating="${Number(e)}"
    ></div>
  `}function Se(e){return e.map(({author:t,description:o,rate:s})=>`
        <li class="swiper-slide feedback-card">
          ${Le(s)}
          <p class="feedback-text">"${o}"</p>
          <h3 class="feedback-user-name">${t}</h3>
        </li>
      `).join("")}function ke(){document.querySelectorAll(".feedback-rating").forEach(t=>{const o=Number(t.dataset.rating)||0;H({element:t,max:5,rating:o,starSize:20,step:.5,readOnly:!0})})}function Ee(){I||(I=new T(".feedback-swiper",{modules:[B,x],slidesPerView:1,spaceBetween:16,navigation:{prevEl:".feedback-button-prev",nextEl:".feedback-button-next"},pagination:{el:".feedback-pagination",clickable:!0,dynamicBullets:!0},breakpoints:{768:{slidesPerView:3,spaceBetween:24},1440:{slidesPerView:3,spaceBetween:24}}}))}async function _e(){m==null||m.classList.remove("hidden"),f==null||f.classList.add("is-hidden"),g==null||g.classList.add("is-hidden");try{const e=await ve();if(!e||!e.length){console.warn("Отримано порожній масив відгуків");return}C&&(C.innerHTML=Se(e)),ke(),Ee(),f==null||f.classList.remove("is-hidden"),g==null||g.classList.remove("is-hidden")}catch(e){console.error("Помилка завантаження відгуків:",e),_.error({title:"Помилка",message:"Не вдалося завантажити відгуки",position:"topRight"})}finally{m==null||m.classList.add("hidden")}}_e();document.addEventListener("DOMContentLoaded",()=>{new X(".accordion-container",{duration:300,showMultiple:!1})});const Me=document.querySelector(".burger-btn"),O=document.querySelector(".mobile-menu"),D=document.querySelector(".mobile-backdrop"),qe=document.querySelector(".mobile-close"),$e=document.querySelectorAll(".mobile-link"),Ae=document.querySelector(".mobile-logo");Ae.addEventListener("click",v);function Te(){O.classList.add("is-open"),D.classList.add("is-open"),document.body.classList.add("no-scroll")}function v(){O.classList.remove("is-open"),D.classList.remove("is-open"),document.body.classList.remove("no-scroll")}Me.addEventListener("click",Te);qe.addEventListener("click",v);D.addEventListener("click",v);$e.forEach(e=>{e.addEventListener("click",v)});document.addEventListener("keydown",e=>{e.key==="Escape"&&O.classList.contains("is-open")&&v()});async function xe(e){return(await p.get(`desserts/${e}`)).data}async function Be(e){return(await p.post("orders",e)).data}const h=document.querySelector(".modal-order"),Oe=document.querySelector(".order-close"),A=document.querySelector(".order-form"),K=document.querySelector(".loader-backdrop");let J="";function De(e){e.closest(".form-field").classList.add("is-error"),e.classList.add("error")}function Pe(e){e.closest(".form-field").classList.remove("is-error"),e.classList.remove("error")}function Y(e){return e.checkValidity()?(Pe(e),!0):(De(e),!1)}const Ce=A.querySelectorAll("input, textarea");Ce.forEach(e=>{e.addEventListener("input",()=>{Y(e)})});function Ie(e){J=e,h.classList.remove("is-hidden"),document.documentElement.classList.add("no-scroll"),document.body.classList.add("no-scroll")}function q(){h.classList.add("is-hidden"),document.documentElement.classList.remove("no-scroll"),document.body.classList.remove("no-scroll")}function He(){return J}function je(){K.classList.remove("is-hidden")}function Re(){K.classList.add("is-hidden")}Oe.addEventListener("click",q);h.addEventListener("click",e=>{e.target===h&&q()});document.addEventListener("keydown",e=>{const t=!h.classList.contains("is-hidden");e.key==="Escape"&&t&&q()});function Ve(e){j.fire({icon:"success",title:"Заявку успішно надіслано!",text:`Номер вашого замовлення: ${e}`,confirmButtonText:"Добре"})}function Fe(e){j.fire({icon:"error",title:"Щось пішло не так",text:e,confirmButtonText:"Спробувати ще раз"})}A.addEventListener("submit",async e=>{e.preventDefault();const{username:t,phone:o,comment:s}=e.target.elements;if(![t,o,s].every(Y))return;const c={name:t.value.trim(),phone:o.value.trim(),dessertId:He(),comment:s.value.trim()};try{je();const u=await Be(c);q(),A.reset(),Ve(u.orderNum)}catch{Fe("Не вдалося надіслати заявку. Спробуйте ще раз.")}finally{Re()}});const a=document.querySelector(".bd-modal-desert"),w=document.querySelector(".js-modal-dynamic-content"),y=document.querySelector(".btn-modal-desert-close");document.addEventListener("click",We);w==null||w.addEventListener("click",Ke);function Ne(){return window.innerWidth-document.documentElement.clientWidth}async function We(e){const t=e.target.closest(".js-open-modal");if(!t||a&&!a.classList.contains("is-hidden"))return;const o=t.dataset.id;try{const s=await xe(o);if(!s)throw new Error("Дані відсутні");if(ze(s),Ue(s.rate),a){const n=Ne();document.documentElement.style.setProperty("--scrollbar-width",`${n}px`),a.classList.remove("is-hidden"),document.body.classList.add("no-scroll")}Je()}catch(s){console.error("Помилка модального вікна:",s),_.error({title:"Помилка",message:"Не вдалося завантажити дані про десерт",position:"topRight"})}}function ze(e){const{_id:t,image:o,name:s,category:n,price:i,description:c,composition:u,rate:P}=e;w.innerHTML=`
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
  `}function Ue(e){const t=document.querySelector("#dessert-rater");t&&H({element:t,rating:e||0,starSize:20,readOnly:!0,max:5})}function Ke(e){const t=e.target.closest(".btn-modal-desert");if(!t)return;const o=t.dataset.id;L(),Ie(o)}function Je(){y==null||y.addEventListener("click",L),a==null||a.addEventListener("click",G),window.addEventListener("keydown",Q)}function L(){a&&a.classList.add("is-hidden"),document.body.classList.remove("no-scroll"),document.documentElement.style.setProperty("--scrollbar-width","0px"),w&&(w.innerHTML=""),y==null||y.removeEventListener("click",L),a==null||a.removeEventListener("click",G),window.removeEventListener("keydown",Q)}function G(e){e.target===a&&L()}function Q(e){e.code==="Escape"&&L()}
//# sourceMappingURL=index.js.map
