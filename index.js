import{a as u,i as k,S as M,P as q,N as B,r as j,A as K,b as D}from"./assets/vendor-BnzpHVZG.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function r(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(s){if(s.ep)return;s.ep=!0;const a=r(s);fetch(s.href,a)}})();u.defaults.baseURL="https://deserts-store.b.goit.study/api/";async function G(){return(await u.get("desserts",{params:{page:1,limit:8,type:"popular"}})).data.desserts}const T="/sweet-bakery-proj/assets/sprite-Bt9wopdv.svg",w=document.querySelector(".popular-swiper .swiper-wrapper"),Q=document.querySelector(".loader-container"),X=document.querySelector(".slider-controls");function Y(e,t){const r=e.map(({_id:o,image:s,name:a,price:l,category:_,description:C})=>`
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
              <p class="product-card-category">${_.name}</p>
              <h3 class="product-card-title">${a}</h3>
              <p class="product-card-desc">${C}</p>
            </div>

            <div class="product-card-footer">
              <p class="product-card-price">${l} грн</p>
              
              <button 
                type="button" 
                class="product-card-btn-arrow js-open-modal" 
                data-id="${o}"
                aria-label="Переглянути деталі ${a}"
              > <svg class="arrow-card-icon" width="24" height="24">
            <use href="${T}#arrow_outward-icon"></use>
          </svg>
              </button>
            </div>
          </article>
        </div>
      `).join("");t.innerHTML=r}function Z(){new M(".popular-swiper",{modules:[q,B],slidesPerView:1,spaceBetween:16,pagination:{el:".slider-controls .popular-pagination",clickable:!0,dynamicBullets:!0,dynamicMainBullets:1},navigation:{nextEl:".slider-controls .slider-button-next",prevEl:".slider-controls .slider-button-prev"},breakpoints:{768:{slidesPerView:2,spaceBetween:16},1440:{slidesPerView:3,spaceBetween:24}}})}async function ee(){if(w)try{const e=await G();if(!e||e.length<3){w.innerHTML='<p class="error-message">На жаль, десерти відсутні</p>';return}Y(e,w),Z(),X.classList.remove("is-hidden")}catch(e){console.error("Помилка завантаження:",e),w.innerHTML='<p class="error-message">Не вдалося завантажити бестселлери</p>',k.error({title:"Помилка",message:"Не вдалося завантажити популярні десерти",position:"topRight"})}finally{Q.classList.add("is-hidden")}}ee();async function te(){const{data:e}=await u.get("categories");return e}async function N({page:e,limit:t,category:r}={}){const o={page:e,limit:t};r&&(o.category=r);const{data:s}=await u.get("desserts",{params:o});return s}const i={page:1,limit:8,category:null,totalItems:0,isLoading:!1},n={categories:document.querySelector(".desserts__categories"),categorySelect:document.querySelector(".desserts__select"),grid:document.querySelector(".desserts__grid"),loader:document.querySelector(".desserts__loader"),loadMoreButton:document.querySelector(".desserts__load-more")};function d(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function re(e){const t=d(e._id),r=d(e.name),o=d(e.description),s=d(e.category.name),a=d(e.image),l=d(e.price);return`
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
          <p class="dessert-card__description">${o}</p>
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
              <use href="${T}#arrow_outward-icon"></use>
            </svg>
          </button>
        </div>
      </div>
    </li>
  `}function se(e){return e.map(re).join("")}function ne(e){const t=d(e._id),r=d(e.name);return`
    <button
      class="desserts__category"
      type="button"
      data-category-id="${t}"
    >
      ${r}
    </button>
  `}function oe(e){const t=d(e._id),r=d(e.name);return`<option value="${t}">${r}</option>`}function ae(e){n.categories.insertAdjacentHTML("beforeend",e.map(ne).join("")),n.categorySelect.insertAdjacentHTML("beforeend",e.map(oe).join(""))}function L(){const e=i.category??"";n.categorySelect.value=e,n.categories.querySelectorAll(".desserts__category").forEach(t=>{const r=t.dataset.categoryId===e;t.classList.toggle("is-active",r),t.setAttribute("aria-pressed",String(r))})}function S(e,{append:t=!1}={}){i.isLoading=e,e&&n.grid.insertAdjacentElement(t?"afterend":"beforebegin",n.loader),n.loader.hidden=!e,n.grid.setAttribute("aria-busy",String(e)),n.loadMoreButton.disabled=e,n.categorySelect.disabled=e,n.categories.classList.toggle("is-loading",e),n.categories.setAttribute("aria-busy",String(e))}function ie(){const e=n.grid.children.length;n.loadMoreButton.hidden=i.totalItems===0||e>=i.totalItems}function $(e){k.error({title:"Помилка",message:e,position:"topRight"})}function R(e,{append:t,page:r}){const o=e.desserts;if(!Array.isArray(o))throw new TypeError("Invalid desserts response");const s=se(o);t?n.grid.insertAdjacentHTML("beforeend",s):n.grid.innerHTML=s,i.page=Number(e.page)||r,i.limit=Number(e.limit)||i.limit,i.totalItems=Number(e.totalItems)||0,ie()}async function H({append:e=!1,page:t=i.page}={}){if(!i.isLoading){S(!0,{append:e});try{const r=await N({page:t,limit:i.limit,category:i.category});return R(r,{append:e,page:t}),!0}catch{return e||(n.loadMoreButton.hidden=!0),$("Не вдалося завантажити десерти. Спробуйте ще раз."),!1}finally{S(!1)}}}async function V(e){const t=e||null;if(i.isLoading||t===i.category){L();return}const r=i.category;i.category=t,L(),await H({page:1})||(i.category=r,L())}function ce(e){const t=e.target.closest(".desserts__category");!t||!n.categories.contains(t)||V(t.dataset.categoryId)}function de(e){V(e.target.value)}function le(){i.isLoading||H({append:!0,page:i.page+1})}async function ue(){S(!0);const[e,t]=await Promise.allSettled([te(),N({page:1,limit:i.limit})]);e.status==="fulfilled"&&Array.isArray(e.value)?(ae(e.value),L()):$("Не вдалося завантажити категорії десертів.");try{if(t.status==="rejected")throw t.reason;R(t.value,{append:!1,page:1})}catch{n.loadMoreButton.hidden=!0,$("Не вдалося завантажити десерти. Спробуйте ще раз.")}finally{S(!1)}}n.categories&&n.categorySelect&&n.grid&&n.loader&&n.loadMoreButton&&(n.categories.addEventListener("click",ce),n.categorySelect.addEventListener("change",de),n.loadMoreButton.addEventListener("click",le),ue());let y=null;function W(){window.innerWidth>=768&&!y&&(y=new M(".about-us-swiper",{modules:[B,q],slidesPerView:2,spaceBetween:24,navigation:{prevEl:".about-us-button-prev",nextEl:".about-us-button-next"},pagination:{el:".about-us-pagination",clickable:!0,dynamicBullets:!0}})),window.innerWidth<768&&y&&(y.destroy(!0,!0),y=null)}W();window.addEventListener("resize",W);async function pe(){return(await u.get("feedbacks",{params:{page:1,limit:10}})).data.feedbacks}const O=document.querySelector("#sweet-factory-feedback-list"),p=document.querySelector("#feedback-loader")||document.querySelector(".loader-container"),m=document.querySelector("#feedback-controls")||document.querySelector(".feedback-controls");let x=null;function me(e){return`
    <div
      class="feedback-rating star-rating"
      data-rating="${Number(e)}"
    ></div>
  `}function fe(e){return e.map(({author:t,description:r,rate:o})=>`
        <li class="swiper-slide feedback-card">
          ${me(o)}
          <p class="feedback-text">"${r}"</p>
          <h3 class="feedback-user-name">${t}</h3>
        </li>
      `).join("")}function ge(){document.querySelectorAll(".feedback-rating").forEach(t=>{const r=Number(t.dataset.rating)||0;j({element:t,max:5,rating:r,starSize:20,step:.5,readOnly:!0})})}function ye(){x||(x=new M(".feedback-swiper",{modules:[B,q],slidesPerView:1,spaceBetween:16,navigation:{prevEl:".feedback-button-prev",nextEl:".feedback-button-next"},pagination:{el:".feedback-pagination",clickable:!0,dynamicBullets:!0},breakpoints:{768:{slidesPerView:3,spaceBetween:24},1440:{slidesPerView:3,spaceBetween:24}}}))}async function be(){p==null||p.classList.remove("hidden"),m==null||m.classList.add("is-hidden");try{const e=await pe();if(!e||!e.length){console.warn("Отримано порожній масив відгуків");return}O&&(O.innerHTML=fe(e)),ge(),ye(),m==null||m.classList.remove("is-hidden")}catch(e){console.error("Помилка завантаження відгуків:",e),k.error({title:"Помилка",message:"Не вдалося завантажити відгуки",position:"topRight"})}finally{p==null||p.classList.add("hidden")}}be();document.addEventListener("DOMContentLoaded",()=>{new K(".accordion-container",{duration:300,showMultiple:!1})});const ve=document.querySelector(".burger-btn"),A=document.querySelector(".mobile-menu"),P=document.querySelector(".mobile-backdrop"),he=document.querySelector(".mobile-close"),we=document.querySelectorAll(".mobile-link"),Le=document.querySelector(".mobile-logo");Le.addEventListener("click",v);function Se(){A.classList.add("is-open"),P.classList.add("is-open"),document.body.classList.add("no-scroll")}function v(){A.classList.remove("is-open"),P.classList.remove("is-open"),document.body.classList.remove("no-scroll")}ve.addEventListener("click",Se);he.addEventListener("click",v);P.addEventListener("click",v);we.forEach(e=>{e.addEventListener("click",v)});document.addEventListener("keydown",e=>{e.key==="Escape"&&A.classList.contains("is-open")&&v()});async function ke(e){return(await u.get(`desserts/${e}`)).data}async function Ee(e){return(await u.post("orders",e)).data}const b=document.querySelector(".modal-order"),_e=document.querySelector(".order-close"),I=document.querySelector(".order-form"),z=document.querySelector(".loader-backdrop");let F="";function $e(e){F=e,b.classList.remove("is-hidden"),document.documentElement.classList.add("no-scroll"),document.body.classList.add("no-scroll")}function E(){b.classList.add("is-hidden"),document.documentElement.classList.remove("no-scroll"),document.body.classList.remove("no-scroll")}function Me(){return F}function qe(){z.classList.remove("is-hidden")}function Be(){z.classList.add("is-hidden")}_e.addEventListener("click",E);b.addEventListener("click",e=>{e.target===b&&E()});document.addEventListener("keydown",e=>{const t=!b.classList.contains("is-hidden");e.key==="Escape"&&t&&E()});function Ae(e){D.fire({icon:"success",title:"Заявку успішно надіслано!",text:`Номер вашого замовлення: ${e}`,confirmButtonText:"Добре"})}function Pe(e){D.fire({icon:"error",title:"Щось пішло не так",text:e,confirmButtonText:"Спробувати ще раз"})}I.addEventListener("submit",async e=>{e.preventDefault();const{username:t,phone:r,comment:o}=e.target.elements,s={name:t.value.trim(),phone:r.value.trim(),dessertId:Me(),comment:o.value.trim()};try{qe();const a=await Ee(s);E(),I.reset(),Ae(a.orderNum)}catch{Pe("Не вдалося надіслати заявку. Спробуйте ще раз.")}finally{Be()}});const c=document.querySelector(".bd-modal-desert"),f=document.querySelector(".js-modal-dynamic-content"),g=document.querySelector(".btn-modal-desert-close");document.addEventListener("click",Oe);f==null||f.addEventListener("click",je);function Ce(){return window.innerWidth-document.documentElement.clientWidth}async function Oe(e){const t=e.target.closest(".js-open-modal");if(!t||c&&!c.classList.contains("is-hidden"))return;const r=t.dataset.id;try{const o=await ke(r);if(!o)throw new Error("Дані відсутні");if(xe(o),Ie(o.rate),c){const s=Ce();document.documentElement.style.setProperty("--scrollbar-width",`${s}px`),c.classList.remove("is-hidden"),document.body.classList.add("no-scroll")}De()}catch(o){console.error("Помилка модального вікна:",o),k.error({title:"Помилка",message:"Не вдалося завантажити дані про десерт",position:"topRight"})}}function xe(e){const{_id:t,image:r,name:o,category:s,price:a,description:l,composition:_,rate:C}=e;f.innerHTML=`
    <div class="modal-dessert-details">
      <div class="modal-img-wrapper">
        <img src="${r||""}" alt="${o||"Десерт"}" class="modal-dessert-img" width="295" />
      </div>
      
      <div class="modal-dessert-info">
        <h2 class="modal-dessert-title">${o||"Без назви"}</h2>
        <p class="modal-dessert-price">${a||0} грн</p>
        <div class="modal-dessert-rating-wrapper">
          <div id="dessert-rater"></div>
        </div>
        <p class="modal-dessert-desc">${l||""}</p>
        <p class="modal-dessert-comp"><span class="modal-dessert-comp-span">Склад:</span> ${_||"Не вказано"}</p>
        <button class="btn-modal-desert" data-id="${t}">Перейти до замовлення</button>
      </div>
    </div>
  `}function Ie(e){const t=document.querySelector("#dessert-rater");t&&j({element:t,rating:e||0,starSize:20,readOnly:!0,max:5})}function je(e){const t=e.target.closest(".btn-modal-desert");if(!t)return;const r=t.dataset.id;h(),$e(r)}function De(){g==null||g.addEventListener("click",h),c==null||c.addEventListener("click",U),window.addEventListener("keydown",J)}function h(){c&&c.classList.add("is-hidden"),document.body.classList.remove("no-scroll"),document.documentElement.style.setProperty("--scrollbar-width","0px"),f&&(f.innerHTML=""),g==null||g.removeEventListener("click",h),c==null||c.removeEventListener("click",U),window.removeEventListener("keydown",J)}function U(e){e.target===c&&h()}function J(e){e.code==="Escape"&&h()}
//# sourceMappingURL=index.js.map
