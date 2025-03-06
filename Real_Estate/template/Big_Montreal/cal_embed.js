!function(){const M=({buttonText:i,buttonClasses:e,buttonColor:t,buttonTextColor:a})=>`<button class="z-[999999999999] hidden fixed md:bottom-6 bottom-4 md:right-10 right-4 md:left-10 left-4 ${e.join(" ")} flex h-16 origin-center bg-red-50 transform cursor-pointer items-center
rounded-full py-4 px-6 text-base outline-none drop-shadow-md transition focus:outline-none fo
cus:ring-4 focus:ring-gray-600 focus:ring-opacity-50 active:scale-95" 
style="background-color:${t}; color:${a} z-index: 10001">
<div id="button-icon" class="mr-3 flex items-center justify-center">
  <svg
	class="h-7 w-7"
	fill="none"
	stroke="currentColor"
	viewBox="0 0 24 24"
	xmlns="http://www.w3.org/2000/svg">
	<path
	  strokeLinecap="round"
	  strokeLinejoin="round"
	  strokeWidth="2"
	  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
  </svg>
</div>
<div id="button" class="font-semibold leading-5 antialiased">${i}</div>
</button>`,P=["data-button-text","data-hide-button-icon","data-button-position","data-button-color","data-button-text-color","data-toggle-off"];class f extends HTMLElement{constructor(){super();const e=this.dataset,t=e.buttonText,a=e.buttonPosition,o=e.buttonColor,r=e.buttonTextColor,n=`<style>${window.Cal.__css}</style> ${M({buttonText:t,buttonClasses:[f.updatedClassString(a,"")],buttonColor:o,buttonTextColor:r})}`;this.attachShadow({mode:"open"}),this.assertHasShadowRoot(),this.shadowRoot.innerHTML=n}static updatedClassString(e,t){return[t.replace(/hidden|md:right-10|md:left-10|left-4|right-4/g,""),e==="bottom-right"?"md:right-10 right-4":"md:left-10 left-4"].join(" ")}static get observedAttributes(){return P}attributeChangedCallback(e,t,a){var s,h,p;const o=(s=this.shadowRoot)==null?void 0:s.querySelector("#button"),r=(h=this.shadowRoot)==null?void 0:h.querySelector("button"),n=(p=this.shadowRoot)==null?void 0:p.querySelector("#button-icon");if(!o)throw new Error("#button not found");if(!r)throw new Error("button element not found");if(!n)throw new Error("#button-icon not found");if(e==="data-button-text")o.textContent=a;else if(e==="data-hide-button-icon")n.style.display=a=="true"?"none":"block";else if(e==="data-button-position")r.className=f.updatedClassString(a,r.className);else if(e==="data-button-color")r.style.backgroundColor=a;else if(e==="data-button-text-color")r.style.color=a;else if(e==="data-toggle-off"){const c=a=="true";c&&(this.buttonWrapperStyleDisplay=r.style.display),r.style.display=c?"none":this.buttonWrapperStyleDisplay}else console.log("Unknown attribute changed",e,t,a)}assertHasShadowRoot(){if(!this.shadowRoot)throw new Error("No shadow root")}}const q=`@keyframes loader{0%{transform:rotate(0)}25%{transform:rotate(180deg)}50%{transform:rotate(180deg)}75%{transform:rotate(360deg)}to{transform:rotate(360deg)}}@keyframes loader-inner{0%{height:0%}25%{height:0%}50%{height:100%}75%{height:100%}to{height:0%}}.loader-inner{vertical-align:top;display:inline-block;width:100%;animation:loader-inner 2s infinite ease-in}.loader{display:block;width:30px;height:30px;position:relative;border-width:4px;border-style:solid;animation:loader 2s infinite ease}.loader.modal-loader{margin:60px auto}
`,E=i=>i==="404"?"Error Code: 404. Cal Link seems to be wrong.":`Error Code: ${i}. Something went wrong.`;function B(i){const e={};if(i===null)return e;for(const[t,a]of i)if(e.hasOwnProperty(t)){let o=e[t];Array.isArray(o)||(o=[o]),o.push(a),e[t]=o}else e[t]=a;return e}const $=`<div id="wrapper" style="top:50%; left:50%;transform:translate(-50%,-50%)" class="absolute z-highest">
<div class="loader border-brand-default dark:border-darkmodebrand">
	<span class="loader-inner bg-brand dark:bg-darkmodebrand"></span>
</div>
<div id="error" style="transform:translate(-50%,-50%)" class="hidden">
Something went wrong.
</div>
</div>
<slot></slot>`;class N extends HTMLElement{static get observedAttributes(){return["loading"]}assertHasShadowRoot(){if(!this.shadowRoot)throw new Error("No shadow root")}attributeChangedCallback(e,t,a){this.assertHasShadowRoot();const o=this.shadowRoot.querySelector(".loader"),r=this.shadowRoot.querySelector("#error"),n=this.shadowRoot.querySelector("slot");if(!o||!n||!r)throw new Error("One of loaderEl, slotEl or errorEl is missing");if(e==="loading"){if(a=="done")o.style.display="none";else if(a==="failed"){o.style.display="none",n.style.visibility="hidden",r.style.display="block";const s=E(this.dataset.errorCode);r.innerText=s}}}constructor(){super(),this.attachShadow({mode:"open"}),this.assertHasShadowRoot(),this.shadowRoot.innerHTML=`<style>${window.Cal.__css}</style><style>${q}</style>${$}`}}const T=`@keyframes loader{0%{transform:rotate(0)}25%{transform:rotate(180deg)}50%{transform:rotate(180deg)}75%{transform:rotate(360deg)}to{transform:rotate(360deg)}}@keyframes loader-inner{0%{height:0%}25%{height:0%}50%{height:100%}75%{height:100%}to{height:0%}}.loader-inner{vertical-align:top;display:inline-block;width:100%;animation:loader-inner 2s infinite ease-in}.loader{display:block;width:30px;height:30px;position:relative;border-width:4px;border-style:solid;animation:loader 2s infinite ease}.loader.modal-loader{margin:60px auto}
`,H=`<style>
.my-backdrop {
  position:fixed;
  width:100%;
  height:100%;
  top:0;
  left:0;
  z-index:999999999999;
  display:block;
  background-color:rgb(5,5,5, 0.8)
}

.modal-box {
  margin:0 auto;
  margin-top:20px;
  margin-bottom:20px;
  position:absolute;
  width:100%;
  top:50%;
  left:50%;
  transform: translateY(-50%) translateX(-50%);
  overflow: auto;
}

.header {
  position: relative;
  float:right;
  top: 10px;
}
.close {
  font-size: 30px;
  left: -20px;
  position: relative;
  color:white;
  cursor: pointer;
}
/*Modal background is black only, so hardcode white */
.loader {
  --cal-brand-color:white;
}
</style>
<div class="my-backdrop">
<div class="header">
  <button type="button" class="close" aria-label="Close">&times;</button>
</div>
<div class="modal-box">
  <div class="body">
    <div id="wrapper" class="z-[999999999999] absolute flex w-full items-center">
      <div class="loader modal-loader border-brand-default dark:border-darkmodebrand">
        <span class="loader-inner bg-brand dark:bg-darkmodebrand"></span>
      </div>
      </div>
    <div id="error" class="hidden left-1/2 -translate-x-1/2 relative text-inverted"></div>
    <slot></slot>
  </div>
</div>
</div>`;class b extends HTMLElement{static get observedAttributes(){return["state"]}assertHasShadowRoot(){if(!this.shadowRoot)throw new Error("No shadow root")}show(e){this.assertHasShadowRoot(),this.shadowRoot.host.style.visibility=e?"visible":"hidden",e||(document.body.style.overflow=b.htmlOverflow)}open(){this.show(!0);const e=new Event("open");this.dispatchEvent(e)}isLoaderRunning(){const e=this.getAttribute("state");return!e||e==="loading"||e==="reopening"}explicitClose(){this.show(!1);const e=new Event("close");this.dispatchEvent(e)}close(){this.isLoaderRunning()||this.explicitClose()}hideIframe(){const e=this.querySelector("iframe");e&&(e.style.visibility="hidden")}showIframe(){const e=this.querySelector("iframe");e&&(e.style.visibility="")}getLoaderElement(){this.assertHasShadowRoot();const e=this.shadowRoot.querySelector(".loader");if(!e)throw new Error("No loader element");return e}getErrorElement(){this.assertHasShadowRoot();const e=this.shadowRoot.querySelector("#error");if(!e)throw new Error("No error element");return e}attributeChangedCallback(e,t,a){if(e==="state")if(a==="loading")this.open(),this.hideIframe(),this.getLoaderElement().style.display="block";else if(a=="loaded"||a==="reopening")this.open(),this.showIframe(),this.getLoaderElement().style.display="none";else if(a=="closed")this.explicitClose();else if(a==="failed"){this.getLoaderElement().style.display="none",this.getErrorElement().style.display="inline-block";const o=E(this.dataset.errorCode);this.getErrorElement().innerText=o}else a==="prerendering"&&this.explicitClose()}connectedCallback(){this.assertHasShadowRoot();const e=this.shadowRoot.querySelector(".close");document.addEventListener("keydown",t=>{t.key==="Escape"&&this.close()},{once:!0}),this.shadowRoot.host.addEventListener("click",()=>{this.close()}),e&&(e.onclick=()=>{this.explicitClose()})}constructor(){super();const e=`<style>${window.Cal.__css}</style><style>${T}</style>${H}`;this.attachShadow({mode:"open"}),b.htmlOverflow=document.body.style.overflow,document.body.style.overflow="hidden",this.open(),this.assertHasShadowRoot(),this.shadowRoot.innerHTML=e}}const _=()=>{try{const i=`cal-floating-button, cal-modal-box, cal-inline {
    /* Spacing Scale */
    --cal-spacing-0: 0px;
    --cal-spacing-px: 1px;
    --cal-spacing-0_5: 0.125rem; /* 2px */
    --cal-spacing-1: 0.25rem;   /* 4px */
    --cal-spacing-1_5: 0.375rem; /* 6px */
    --cal-spacing-2: 0.5rem;    /* 8px */
    --cal-spacing-2_5: 0.625rem; /* 10px */
    --cal-spacing-3: 0.75rem;   /* 12px */
    --cal-spacing-3_5: 0.875rem; /* 14px */
    --cal-spacing-4: 1rem;      /* 16px */
    --cal-spacing-5: 1.25rem;   /* 20px */
    --cal-spacing-6: 1.5rem;    /* 24px */
    --cal-spacing-7: 1.75rem;   /* 28px */
    --cal-spacing-8: 2rem;      /* 32px */
    --cal-spacing-9: 2.25rem;   /* 36px */
    --cal-spacing-10: 2.5rem;   /* 40px */
    --cal-spacing-11: 2.75rem;  /* 44px */
    --cal-spacing-12: 3rem;     /* 48px */
    --cal-spacing-14: 3.5rem;   /* 56px */
    --cal-spacing-16: 4rem;     /* 64px */
    --cal-spacing-20: 5rem;     /* 80px */
    --cal-spacing-24: 6rem;     /* 96px */
    --cal-spacing-28: 7rem;     /* 112px */
    --cal-spacing-32: 8rem;     /* 128px */
    --cal-spacing-36: 9rem;     /* 144px */
    --cal-spacing-40: 10rem;    /* 160px */
    --cal-spacing-44: 11rem;    /* 176px */
    --cal-spacing-48: 12rem;    /* 192px */
    --cal-spacing-52: 13rem;    /* 208px */
    --cal-spacing-56: 14rem;    /* 224px */
    --cal-spacing-60: 15rem;    /* 240px */
    --cal-spacing-64: 16rem;    /* 256px */
    --cal-spacing-72: 18rem;    /* 288px */
    --cal-spacing-80: 20rem;    /* 320px */
    --cal-spacing-96: 24rem;    /* 384px */
  
    /* Border Radius */
    --cal-radius-none: 0px;
    --cal-radius-sm: 0.125rem;  /* 2px */
    --cal-radius: 0.25rem;      /* 4px */
    --cal-radius-md: 0.375rem;  /* 6px */
    --cal-radius-lg: 0.5rem;    /* 8px */
    --cal-radius-xl: 0.75rem;   /* 12px */
    --cal-radius-2xl: 1rem;     /* 16px */
    --cal-radius-3xl: 1.5rem;   /* 24px */
    --cal-radius-full: 9999px;
  
    /* Background Standard */
    --cal-bg-emphasis: white; /* gray.200 - active items and emphasising */
    --cal-bg: hsla(0, 0%, 100%, 1); /* white - default background */
    --cal-bg-subtle: hsla(220, 14%, 94%, 1); /* gray.100 - hovering on items, subtle raising */
    --cal-bg-muted: hsla(210, 20%, 97%, 1); /* gray.50 - large items, sidebar, sections */
    --cal-bg-inverted: hsla(210, 30%, 4%, 1); /* gray.900 - tooltips */
  
    /* Background Primary */
    --cal-bg-primary: hsla(214, 30%, 16%, 1); /* stone-100 */
    --cal-bg-primary-emphasis: hsla(220, 6%, 25%, 1); /* stone-800 */
    --cal-bg-primary-muted: hsla(220, 14%, 94%, 1); /* stone-400 */
  
    /* Background Brand */
    --cal-bg-brand: hsla(214, 30%, 16%, 1); /* gray-50 */
    --cal-bg-brand-emphasis: hsla(220, 6%, 25%, 1); /* stone-100 */
    --cal-bg-brand-muted: hsla(220, 14%, 94%, 1); /* stone-100 */
    
    /* Background Semantic */
    --cal-bg-semantic-info-subtle: hsla(212, 88%, 97%, 1); /* blue-100 */
    --cal-bg-semantic-info-emphasis: hsla(236, 80%, 25%, 1); /* blue-500 */
    --cal-bg-semantic-success-subtle: hsla(167, 54%, 93%, 1); /* green-100 */
    --cal-bg-semantic-success-emphasis: hsla(158, 74%, 38%, 1); /* green-500 */
    --cal-bg-semantic-attention-subtle: hsla(34, 100%, 92%, 1); /* orange-100 */
    --cal-bg-semantic-attention-emphasis: hsla(15, 79%, 34%, 1); /* orange-500 */
    --cal-bg-semantic-error-subtle: hsla(0, 93%, 94%, 1); /* red-100 */
    --cal-bg-semantic-error-emphasis: hsla(0, 63%, 24%, 1); /* red-500 */
  
    /* Background Visualization */
    --cal-bg-visualization-1-subtle: hsla(326, 78%, 95%, 1); /* pink-100 */
    --cal-bg-visualization-1-emphasis: hsla(330, 81%, 60%, 1); /* pink-500 */
    --cal-bg-visualization-2-subtle: hsla(256, 86%, 91%, 1); /* purple-100 */
    --cal-bg-visualization-2-emphasis: hsla(256, 85%, 57%, 1); /* purple-500 */
    --cal-bg-visualization-3-subtle: hsla(217, 87%, 91%, 1); /* blue-100 */
    --cal-bg-visualization-3-emphasis: hsla(235, 100%, 63%, 1); /* blue-500 */
    --cal-bg-visualization-4-subtle: hsla(167, 54%, 93%, 1); /* green-100 */
    --cal-bg-visualization-4-emphasis: hsla(158, 74%, 38%, 1); /* green-500 */
    --cal-bg-visualization-5-subtle: hsla(55, 97%, 88%, 1); /* yellow-100 */
    --cal-bg-visualization-5-emphasis: hsla(45, 93%, 47%, 1); /* yellow-500 */
    --cal-bg-visualization-6-subtle: hsla(34, 100%, 92%, 1); /* orange-100 */
    --cal-bg-visualization-6-emphasis: hsla(25, 95%, 53%, 1); /* orange-500 */
    --cal-bg-visualization-7-subtle: hsla(0, 96%, 89%, 1); /* red-100 */
    --cal-bg-visualization-7-emphasis: hsla(0, 84%, 60%, 1); /* red-500 */
  
    /* Legacy Background Components - Consider deprecating */
    --cal-bg-info: hsla(221, 91%, 93%, 1); /* #dee9fc - info backgrounds */
    --cal-bg-success: hsla(142, 76%, 94%, 1); /* #e2fbe8 - success backgrounds */
    --cal-bg-attention: hsla(33, 100%, 92%, 1); /* #fceed8 - attention backgrounds */
    --cal-bg-error: hsla(3, 66%, 93%, 1); /* #f9e3e2 - error backgrounds */
    --cal-bg-dark-error: hsla(2, 55%, 30%, 1); /* Keeping existing dark error */
  
    /* Borders */
    --cal-border-emphasis: hsla(218, 11%, 65%, 1); /* gray.400 - input:hover */
    --cal-border: hsla(216, 12%, 84%, 1); /* gray.300 - inputs */
    --cal-border-subtle: hsla(220, 13%, 91%, 1); /* gray.200 - container borders */
    --cal-border-muted: hsla(220, 14%, 94%, 1); /* gray.100 */
    --cal-border-error: hsla(0, 96%, 89%, 1); /* Keeping existing error border */
    --cal-border-semantic-error: hsla(0, 96%, 89%, 1);
    --cal-border-booker: var(--cal-border-subtle);
  
    /* Content/Text Standard */
    --cal-text-emphasis: hsla(210, 30%, 4%, 1); /* gray-900 */
    --cal-text: hsla(220, 6%, 25%, 1); /* gray-700 */
    --cal-text-subtle: hsla(220, 9%, 46%, 1); /* gray-500 */
    --cal-text-muted: hsla(218, 11%, 65%, 1); /* gray-400 */
    --cal-text-inverted: hsla(0, 0%, 100%, 1); /* white */
  
    /* Content/Text Semantic */
    --cal-text-semantic-info: hsla(236, 80%, 25%, 1); /* blue-800 */
    --cal-text-semantic-success: hsla(150, 84%, 22%, 1); /* green-800 */
    --cal-text-semantic-attention: hsla(15, 79%, 34%, 1); /* orange-800 */
    --cal-text-semantic-error: hsla(0, 63%, 24%, 1); /* red-800 */
  
    /* Content/Text Visualization */
    --cal-text-visualization-1: hsla(332, 79%, 25%, 1); /* pink-800 */
    --cal-text-visualization-2: hsla(270, 91%, 25%, 1); /* purple-800 */
    --cal-text-visualization-3: hsla(217, 91%, 25%, 1); /* blue-800 */
    --cal-text-visualization-4: hsla(142, 71%, 25%, 1); /* green-800 */
    --cal-text-visualization-5: hsla(45, 93%, 25%, 1); /* yellow-800 */
    --cal-text-visualization-6: hsla(24, 95%, 25%, 1); /* orange-800 */
    --cal-text-visualization-7: hsla(0, 84%, 25%, 1); /* red-800 */
  
    /* Border/Semantic Subtle */
    --cal-border-semantic-attention-subtle: hsla(32, 98%, 83%, 1); 
    --cal-border-semantic-error-subtle: hsla(0, 96%, 89%, 1); 
  
    /* Legacy Content/Text Components - Consider deprecating */
    --cal-text-info: hsla(225, 57%, 33%, 1); /* #253985 - interactive text/icons */
    --cal-text-success: hsla(144, 34%, 24%, 1); /* #285231 */
    --cal-text-attention: hsla(16, 62%, 28%, 1); /* Keeping existing attention text */
    --cal-text-error: hsla(0, 63%, 31%, 1); /* Keeping existing error text */
  
    /* Brand */
    --cal-brand: hsla(221, 39%, 11%, 1); /* Keeping existing brand color */
    --cal-brand-emphasis: hsla(0, 0%, 6%, 1); /* Keeping existing brand emphasis */
    --cal-brand-text: hsla(0, 0%, 100%, 1); /* white */
  }`,e=document.createElement("style");e.id="cal-css-vars",e.textContent=i,document.head.appendChild(e)}catch(i){console.error("Error adding app css vars - Report this issue to support",i)}},j=`.cal-embed{border:0px;min-height:300px;margin:0 auto;width:100%}
`;function w(i,e){const t=new window.CustomEvent(i,{detail:e});window.dispatchEvent(t)}class C{static parseAction(e){if(!e)return null;const[t,a,o]=e.split(":");return t!=="CAL"?null:{ns:a,type:o}}getFullActionName(e){return this.namespace?`CAL:${this.namespace}:${e}`:`CAL::${e}`}fire(e,t){const a=this.getFullActionName(e),o={type:e,namespace:this.namespace,fullType:a,data:t};w(a,o),w(this.getFullActionName("*"),o)}on(e,t){const a=this.getFullActionName(e);window.addEventListener(a,t)}off(e,t){const a=this.getFullActionName(e);window.removeEventListener(a,t)}constructor(e){e=e||"",this.namespace=e}}const U=`*,:before,:after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}:before,:after{--tw-content: ""}html{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;-o-tab-size:4;tab-size:4;font-family:var(--font-inter),ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";font-feature-settings:normal;font-variation-settings:normal}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:Roboto Mono,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}button,[type=button],[type=reset],[type=submit]{-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre{margin:0}fieldset{margin:0;padding:0}legend{padding:0}ol,ul,menu{list-style:none;margin:0;padding:0}dialog{padding:0}textarea{resize:vertical}input::-moz-placeholder,textarea::-moz-placeholder{opacity:1;color:#9ca3af}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}button,[role=button]{cursor:pointer}:disabled{cursor:default}img,svg,video,canvas,audio,iframe,embed,object{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}[hidden]{display:none}[type=text],[type=email],[type=url],[type=password],[type=number],[type=date],[type=datetime-local],[type=month],[type=search],[type=tel],[type=time],[type=week],[multiple],textarea,select{-moz-appearance:none;-webkit-appearance:none;appearance:none;background-color:#fff;border-color:#6b7280;border-width:1px;border-radius:0;padding:.5rem .75rem;font-size:1rem;line-height:1.5rem;--tw-shadow: 0 0 #0000}[type=text]:focus,[type=email]:focus,[type=url]:focus,[type=password]:focus,[type=number]:focus,[type=date]:focus,[type=datetime-local]:focus,[type=month]:focus,[type=search]:focus,[type=tel]:focus,[type=time]:focus,[type=week]:focus,[multiple]:focus,textarea:focus,select:focus{outline:2px solid transparent;outline-offset:2px;--tw-ring-inset: var(--tw-empty, );--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: #2563eb;--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);border-color:#2563eb}input::-moz-placeholder,textarea::-moz-placeholder{color:#6b7280;opacity:1}input::placeholder,textarea::placeholder{color:#6b7280;opacity:1}::-webkit-datetime-edit-fields-wrapper{padding:0}::-webkit-date-and-time-value{min-height:1.5em}::-webkit-datetime-edit,::-webkit-datetime-edit-year-field,::-webkit-datetime-edit-month-field,::-webkit-datetime-edit-day-field,::-webkit-datetime-edit-hour-field,::-webkit-datetime-edit-minute-field,::-webkit-datetime-edit-second-field,::-webkit-datetime-edit-millisecond-field,::-webkit-datetime-edit-meridiem-field{padding-top:0;padding-bottom:0}select{background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");background-position:right .5rem center;background-repeat:no-repeat;background-size:1.5em 1.5em;padding-right:2.5rem;-webkit-print-color-adjust:exact;print-color-adjust:exact}[multiple]{background-image:initial;background-position:initial;background-repeat:unset;background-size:initial;padding-right:.75rem;-webkit-print-color-adjust:unset;print-color-adjust:unset}[type=checkbox],[type=radio]{-moz-appearance:none;-webkit-appearance:none;appearance:none;padding:0;-webkit-print-color-adjust:exact;print-color-adjust:exact;display:inline-block;vertical-align:middle;background-origin:border-box;-webkit-user-select:none;-moz-user-select:none;user-select:none;flex-shrink:0;height:1rem;width:1rem;color:#2563eb;background-color:#fff;border-color:#6b7280;border-width:1px;--tw-shadow: 0 0 #0000}[type=checkbox]{border-radius:0}[type=radio]{border-radius:100%}[type=checkbox]:focus,[type=radio]:focus{outline:2px solid transparent;outline-offset:2px;--tw-ring-inset: var(--tw-empty, );--tw-ring-offset-width: 2px;--tw-ring-offset-color: #fff;--tw-ring-color: #2563eb;--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}[type=checkbox]:checked,[type=radio]:checked{border-color:transparent;background-color:currentColor;background-size:100% 100%;background-position:center;background-repeat:no-repeat}[type=checkbox]:checked{background-image:url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e")}[type=radio]:checked{background-image:url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='8' cy='8' r='3'/%3e%3c/svg%3e")}[type=checkbox]:checked:hover,[type=checkbox]:checked:focus,[type=radio]:checked:hover,[type=radio]:checked:focus{border-color:transparent;background-color:currentColor}[type=checkbox]:indeterminate{background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 16 16'%3e%3cpath stroke='white' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 8h8'/%3e%3c/svg%3e");border-color:transparent;background-color:currentColor;background-size:100% 100%;background-position:center;background-repeat:no-repeat}[type=checkbox]:indeterminate:hover,[type=checkbox]:indeterminate:focus{border-color:transparent;background-color:currentColor}[type=file]{background:unset;border-color:inherit;border-width:0;border-radius:0;padding:0;font-size:unset;line-height:inherit}[type=file]:focus{outline:1px solid ButtonText;outline:1px auto -webkit-focus-ring-color}*{scrollbar-color:initial;scrollbar-width:initial}*,:before,:after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }.visible{visibility:visible}.fixed{position:fixed}.absolute{position:absolute}.relative{position:relative}.bottom-4{bottom:var(--cal-spacing-4)}.left-1\\/2{left:50%}.left-4{left:var(--cal-spacing-4)}.right-4{right:var(--cal-spacing-4)}.z-\\[999999999999\\]{z-index:999999999999}.mr-3{margin-right:var(--cal-spacing-3)}.flex{display:flex}.hidden{display:none}.h-16{height:var(--cal-spacing-16)}.h-7{height:var(--cal-spacing-7)}.w-7{width:var(--cal-spacing-7)}.w-full{width:100%}.origin-center{transform-origin:center}.-translate-x-1\\/2{--tw-translate-x: -50%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.transform{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.cursor-pointer{cursor:pointer}.items-center{align-items:center}.justify-center{justify-content:center}.rounded-full{border-radius:var(--cal-radius-full)}.bg-brand{background-color:var(--cal-brand-color, black)}.bg-red-50{--tw-bg-opacity: 1;background-color:rgb(254 242 242 / var(--tw-bg-opacity))}.px-6{padding-left:var(--cal-spacing-6);padding-right:var(--cal-spacing-6)}.py-4{padding-top:var(--cal-spacing-4);padding-bottom:var(--cal-spacing-4)}.text-base{font-size:1rem;line-height:1.5rem}.font-semibold{font-weight:600}.leading-5{line-height:1.25rem}.text-inverted{color:var(--cal-text-inverted)}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.outline-none{outline:2px solid transparent;outline-offset:2px}.drop-shadow-md{--tw-drop-shadow: drop-shadow(0 4px 3px rgb(0 0 0 / .07)) drop-shadow(0 2px 2px rgb(0 0 0 / .06));filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.transition{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,-webkit-backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter,-webkit-backdrop-filter;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}@font-face{font-family:Cal Sans;src:url(https://cal.com/cal.ttf)}h1,h2,h3,h4,h5,h6{font-family:Cal Sans;font-weight:400;letter-spacing:normal}html,body,:host{font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji}.focus\\:outline-none:focus{outline:2px solid transparent;outline-offset:2px}.focus\\:ring-gray-600:focus{--tw-ring-opacity: 1;--tw-ring-color: rgb(75 85 99 / var(--tw-ring-opacity))}.focus\\:ring-opacity-50:focus{--tw-ring-opacity: .5}.active\\:scale-95:active{--tw-scale-x: .95;--tw-scale-y: .95;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}@media (min-width: 768px){.md\\:bottom-6{bottom:var(--cal-spacing-6)}.md\\:left-10{left:var(--cal-spacing-10)}.md\\:right-10{right:var(--cal-spacing-10)}}
`,O="https://app.cal.com";customElements.define("cal-modal-box",b);customElements.define("cal-floating-button",f);customElements.define("cal-inline",N);const l=window.Cal;if(!l||!l.q)throw new Error("Cal is not defined. This shouldn't happen");K();document.head.appendChild(document.createElement("style")).innerHTML=j;function m(i,e){function t(o,r){return typeof r=="string"?typeof o==r:o instanceof r}function a(o){return typeof o>"u"}if(e.required&&a(i))throw new Error("Argument is required");for(const[o,r]of Object.entries(e.props||{})){if(r.required&&a(i[o]))throw new Error(`"${o}" is required`);let n=!0;if(r.type&&!a(i[o])&&(r.type instanceof Array?r.type.forEach(s=>{n=n||t(i[o],s)}):n=t(i[o],r.type)),!n)throw new Error(`"${o}" is of wrong type.Expected type "${r.type}"`)}}function S(i){const e=getComputedStyle(i).colorScheme;return e==="dark"||e==="light"?e:null}function y(i,e){if(!i["ui.color-scheme"]){const t=S(e);t&&(i["ui.color-scheme"]=t)}return i}const F=(i,e)=>!![...["month","date","slot","rescheduleUid","bookingUid","duration","overlayCalendar"]].includes(i);class g{constructor(e,t){this.iframeDoQueue=[],this.__config={calOrigin:O},this.api=new R(this),this.namespace=e,this.actionManager=new C(e),g.actionsManagers=g.actionsManagers||{},g.actionsManagers[e]=this.actionManager,this.processQueue(t),this.actionManager.on("__dimensionChanged",a=>{const{data:o}=a.detail,r=this.iframe;if(!r)return;const n="px";o.iframeHeight&&(r.style.height=o.iframeHeight+n),this.modalBox&&(r.style.maxHeight=`${window.innerHeight-100}px`)}),this.actionManager.on("__iframeReady",()=>{this.iframeReady=!0,this.iframe&&(this.iframe.style.visibility=""),this.doInIframe({method:"parentKnowsIframeReady"}),this.iframeDoQueue.forEach(a=>{this.doInIframe(a)})}),this.actionManager.on("__routeChanged",()=>{if(!this.inlineEl)return;const{top:a,height:o}=this.inlineEl.getBoundingClientRect();a<0&&Math.abs(a/o)>=.25&&this.inlineEl.scrollIntoView({behavior:"smooth"})}),this.actionManager.on("linkReady",()=>{var a,o;this.isPerendering||((a=this.modalBox)==null||a.setAttribute("state","loaded"),(o=this.inlineEl)==null||o.setAttribute("loading","done"))}),this.actionManager.on("linkFailed",a=>{var r,n,s,h;this.iframe&&((r=this.inlineEl)==null||r.setAttribute("data-error-code",a.detail.data.code),(n=this.modalBox)==null||n.setAttribute("data-error-code",a.detail.data.code),(s=this.inlineEl)==null||s.setAttribute("loading","failed"),(h=this.modalBox)==null||h.setAttribute("state","failed"))})}static ensureGuestKey(e){return e=e||{},{...e,guest:e.guests??void 0}}processInstruction(e){const t=[].slice.call(e);if(typeof t[0]!="string"){t.forEach(r=>{this.processInstruction(r)});return}const[a,...o]=t;this.api[a]||k(`Instruction ${a} not FOUND`);try{this.api[a](...o)}catch(r){k("Instruction couldn't be executed",r)}return t}processQueue(e){e.forEach(t=>{this.processInstruction(t)}),e.splice(0),e.push=t=>{this.processInstruction(t)}}createIframe({calLink:e,config:t={},calOrigin:a}){const o=this.iframe=document.createElement("iframe");o.className="cal-embed",o.name=`cal-embed=${this.namespace}`,o.title="Book a call";const r=this.getInitConfig(),{iframeAttrs:n,...s}=t;n&&n.id&&o.setAttribute("id",n.id);const h=this.buildFilteredQueryParams(s),p=(a||r.calOrigin||"").replace("https://cal.com","https://app.cal.com"),c=new URL(`${p}/${e}`);c.pathname.endsWith("embed")||(c.pathname=`${c.pathname}/embed`),c.searchParams.set("embed",this.namespace),r.debug&&c.searchParams.set("debug",`${r.debug}`),o.style.visibility="hidden",r.uiDebug&&(o.style.border="1px solid green");for(const[d,u]of h)c.searchParams.append(d,u);return o.src=c.toString(),o}getInitConfig(){return this.__config}doInIframe(e){if(!this.iframeReady){this.iframeDoQueue.push(e);return}if(!this.iframe)throw new Error("iframe doesn't exist. `createIframe` must be called before `doInIframe`");this.iframe.contentWindow&&this.iframe.contentWindow.postMessage({originator:"CAL",method:e.method,arg:e.arg},"*")}filterParams(e){return Object.fromEntries(Object.entries(e).filter(([t,a])=>!F(t)))}getQueryParamsFromPage(){const e=Q();return this.filterParams(e)}buildFilteredQueryParams(e){var r;const a={...(r=l.config)!=null&&r.forwardQueryParams?this.getQueryParamsFromPage():{},...e},o=new URLSearchParams;for(const[n,s]of Object.entries(a))s!==void 0&&(s instanceof Array?s.forEach(h=>o.append(n,h)):o.set(n,s));return o}}const z=class A{constructor(e){this.cal=e}init(e,t={}){let a="";if(typeof e!="string"?t=e||{}:a=e,a!==this.cal.namespace)return;A.initializedNamespaces.push(this.cal.namespace);const{calOrigin:o,origin:r,...n}=t;this.cal.__config.calOrigin=o||r||this.cal.__config.calOrigin,this.cal.__config={...this.cal.__config,...n}}initNamespace(e){l.ns[e].instance=l.ns[e].instance||new g(e,l.ns[e].q)}inline({calLink:e,elementOrSelector:t,config:a}){if(m(arguments[0],{required:!0,props:{calLink:{required:!0,type:"string"},elementOrSelector:{required:!0,type:["string",HTMLElement]},config:{required:!1,type:Object}}}),this.cal.inlineEl&&document.body.contains(this.cal.inlineEl)){console.warn("Inline embed already exists. Ignoring this call");return}if(a=a||{},typeof a.iframeAttrs=="string"||a.iframeAttrs instanceof Array)throw new Error("iframeAttrs should be an object");const o=t instanceof HTMLElement?t:document.querySelector(t);if(!o)throw new Error("Element not found");a.embedType="inline";const r=this.cal.getInitConfig(),n=this.cal.createIframe({calLink:e,config:y(g.ensureGuestKey(a),o),calOrigin:r.calOrigin});n.style.height="100%",n.style.width="100%",o.classList.add("cal-inline-container");const s=document.createElement("template");s.innerHTML='<cal-inline style="max-height:inherit;height:inherit;min-height:inherit;display:flex;position:relative;flex-wrap:wrap;width:100%"></cal-inline><style>.cal-inline-container::-webkit-scrollbar{display:none}.cal-inline-container{scrollbar-width:none}</style>',this.cal.inlineEl=s.content.children[0],this.cal.inlineEl.appendChild(n),o.appendChild(s.content)}floatingButton({calLink:e,buttonText:t="Book my Cal",hideButtonIcon:a=!1,attributes:o,buttonPosition:r="bottom-right",buttonColor:n="rgb(0, 0, 0)",buttonTextColor:s="rgb(255, 255, 255)",calOrigin:h,config:p}){let c=null;o!=null&&o.id&&(c=document.getElementById(o.id));let d;c?d=c:(d=document.createElement("cal-floating-button"),d.dataset.calLink=e,d.dataset.calNamespace=this.cal.namespace,d.dataset.calOrigin=h??"",p&&(d.dataset.calConfig=JSON.stringify(p)),o!=null&&o.id&&(d.id=o.id),document.body.appendChild(d));const u=d.dataset;u.buttonText=t,u.hideButtonIcon=`${a}`,u.buttonPosition=`${r}`,u.buttonColor=`${n}`,u.buttonTextColor=`${s}`}modal({calLink:e,config:t={},calOrigin:a,__prerender:o=!1}){const r=this.modalUid||this.preloadedModalUid||String(Date.now())||"0",n=this.preloadedModalUid&&!this.modalUid,s=document.body;this.cal.isPerendering=!!o,o&&(t.prerender="true");const h=y(g.ensureGuestKey({...t,embedType:"modal"}),s),p=document.querySelector(`cal-modal-box[uid="${r}"]`);if(p)if(n){this.cal.doInIframe({method:"connect",arg:h}),this.modalUid=r,p.setAttribute("state","loading");return}else{p.setAttribute("state","reopening");return}if(o&&(this.preloadedModalUid=r),typeof t.iframeAttrs=="string"||t.iframeAttrs instanceof Array)throw new Error("iframeAttrs should be an object");let c=null;c||(c=this.cal.createIframe({calLink:e,config:h,calOrigin:a||null})),c.style.borderRadius="8px",c.style.height="100%",c.style.width="100%";const d=document.createElement("template");d.innerHTML=`<cal-modal-box uid="${r}"></cal-modal-box>`,this.cal.modalBox=d.content.children[0],this.cal.modalBox.appendChild(c),o&&this.cal.modalBox.setAttribute("state","prerendering"),this.handleClose(),s.appendChild(d.content)}handleClose(){this.cal.actionManager.on("__closeIframe",()=>{var e;(e=this.cal.modalBox)==null||e.setAttribute("state","closed")})}on({action:e,callback:t}){m(arguments[0],{required:!0,props:{action:{required:!0,type:"string"},callback:{required:!0,type:Function}}}),this.cal.actionManager.on(e,t)}off({action:e,callback:t}){this.cal.actionManager.off(e,t)}preload({calLink:e,type:t,options:a={}}){m(arguments[0],{required:!0,props:{calLink:{type:"string",required:!0},type:{type:"string",required:!1},options:{type:Object,required:!1}}});let o=l;const r=this.cal.namespace;if(r&&(o=l.ns[r]),!o)throw new Error(`Namespace ${r} isn't defined`);const n=this.cal.getInitConfig();let s=a.prerenderIframe;if(t&&s===void 0&&(s=!0),!t&&s)throw new Error("You should provide 'type'");s?t==="modal"||t==="floatingButton"?(this.cal.isPerendering=!0,this.modal({calLink:e,calOrigin:n.calOrigin,__prerender:!0})):(console.warn("Ignoring - full preload for inline embed and instead preloading assets only"),v({calLink:e,config:n})):v({calLink:e,config:n})}prerender({calLink:e,type:t}){this.preload({calLink:e,type:t})}ui(e){m(e,{required:!0,props:{theme:{required:!1,type:"string"},styles:{required:!1,type:Object}}}),this.cal.doInIframe({method:"ui",arg:e})}};z.initializedNamespaces=[];let R=z;function Q(){const i=new URLSearchParams(window.location.search);return B(i.entries())}const L="";l.instance=new g(L,l.q);for(const[i,e]of Object.entries(l.ns))e.instance=e.instance??new g(i,e.q);window.addEventListener("message",i=>{const e=i.data,t=e.fullType,a=C.parseAction(t);if(!a)return;const o=g.actionsManagers[a.ns];if(l.__logQueue=l.__logQueue||[],l.__logQueue.push({...a,data:e.data}),!o)throw new Error(`Unhandled Action ${a}`);o.fire(a.type,e.data)});document.addEventListener("click",i=>{var c;const e=i.target,t=p(e),a=(c=t==null?void 0:t.dataset)==null?void 0:c.calLink;if(!a)return;const o=t.dataset.calNamespace,r=t.dataset.calConfig||"",n=t.dataset.calOrigin||"";let s;try{s=JSON.parse(r)}catch{s={}}let h=l;if(o&&(h=l.ns[o]),!h)throw new Error(`Namespace ${o} isn't defined`);h("modal",{calLink:a,config:s,calOrigin:n});function p(d){let u;return!(d instanceof HTMLElement)||(d!=null&&d.dataset.calLink?u=d:u=Array.from(document.querySelectorAll("[data-cal-link]")).find(I=>I.contains(d)),!(u instanceof HTMLElement))?null:u}});let x=null;(function(){setInterval(()=>{const e=S(document.body);e&&e!==x&&(x=e,R.initializedNamespaces.forEach(t=>{D(t)("ui",{colorScheme:e})}))},50)})();function D(i){let e;return i===L?e=l:e=l.ns[i],e}function v({config:i,calLink:e}){const t=document.body.appendChild(document.createElement("iframe")),a=new URL(`${i.calOrigin}/${e}`);a.searchParams.set("preload","true"),t.src=a.toString(),t.style.width="0",t.style.height="0",t.style.display="none"}function K(){l.fingerprint="2166095",l.version="1.5.2",l.__css=U,l.config||(l.config={}),l.config.forwardQueryParams=l.config.forwardQueryParams??!1}_();function k(...i){console.log(...i)}
}()