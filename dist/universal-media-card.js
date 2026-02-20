function t(t,e,i,s){var r,o=arguments.length,n=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(n=(o<3?r(n):o>3?r(e,i,n):r(e,i))||n);return o>3&&n&&Object.defineProperty(e,i,n),n}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),r=new WeakMap;let o=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=r.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&r.set(e,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new o(i,t,s)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:c,defineProperty:l,getOwnPropertyDescriptor:d,getOwnPropertyNames:u,getOwnPropertySymbols:h,getPrototypeOf:p}=Object,_=globalThis,m=_.trustedTypes,g=m?m.emptyScript:"",f=_.reactiveElementPolyfillSupport,b=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},y=(t,e)=>!c(t,e),$={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),_.litPropertyMetadata??=new WeakMap;let A=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=$){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&l(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:r}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const o=s?.call(this);r?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??$}static _$Ei(){if(this.hasOwnProperty(b("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(b("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b("properties"))){const t=this.properties,e=[...u(t),...h(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),r=e.litNonce;void 0!==r&&s.setAttribute("nonce",r),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:v).toAttribute(e,i.type);this._$Em=t,null==r?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=s;const o=r.fromAttribute(e,t.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(t,e,i,s=!1,r){if(void 0!==t){const o=this.constructor;if(!1===s&&(r=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??y)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:r},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==r||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};A.elementStyles=[],A.shadowRootOptions={mode:"open"},A[b("elementProperties")]=new Map,A[b("finalized")]=new Map,f?.({ReactiveElement:A}),(_.reactiveElementVersions??=[]).push("2.1.2");const S=globalThis,x=t=>t,w=S.trustedTypes,E=w?w.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",k=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+k,M=`<${P}>`,U=document,O=()=>U.createComment(""),T=t=>null===t||"object"!=typeof t&&"function"!=typeof t,N=Array.isArray,H="[ \t\n\f\r]",R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,z=/-->/g,j=/>/g,I=RegExp(`>|${H}(?:([^\\s"'>=/]+)(${H}*=${H}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),D=/'/g,L=/"/g,q=/^(?:script|style|textarea|title)$/i,W=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),B=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),K=new WeakMap,Q=U.createTreeWalker(U,129);function F(t,e){if(!N(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const J=(t,e)=>{const i=t.length-1,s=[];let r,o=2===e?"<svg>":3===e?"<math>":"",n=R;for(let e=0;e<i;e++){const i=t[e];let a,c,l=-1,d=0;for(;d<i.length&&(n.lastIndex=d,c=n.exec(i),null!==c);)d=n.lastIndex,n===R?"!--"===c[1]?n=z:void 0!==c[1]?n=j:void 0!==c[2]?(q.test(c[2])&&(r=RegExp("</"+c[2],"g")),n=I):void 0!==c[3]&&(n=I):n===I?">"===c[0]?(n=r??R,l=-1):void 0===c[1]?l=-2:(l=n.lastIndex-c[2].length,a=c[1],n=void 0===c[3]?I:'"'===c[3]?L:D):n===L||n===D?n=I:n===z||n===j?n=R:(n=I,r=void 0);const u=n===I&&t[e+1].startsWith("/>")?" ":"";o+=n===R?i+M:l>=0?(s.push(a),i.slice(0,l)+C+i.slice(l)+k+u):i+k+(-2===l?e:u)}return[F(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class Z{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let r=0,o=0;const n=t.length-1,a=this.parts,[c,l]=J(t,e);if(this.el=Z.createElement(c,i),Q.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=Q.nextNode())&&a.length<n;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(C)){const e=l[o++],i=s.getAttribute(t).split(k),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:r,name:n[2],strings:i,ctor:"."===n[1]?et:"?"===n[1]?it:"@"===n[1]?st:tt}),s.removeAttribute(t)}else t.startsWith(k)&&(a.push({type:6,index:r}),s.removeAttribute(t));if(q.test(s.tagName)){const t=s.textContent.split(k),e=t.length-1;if(e>0){s.textContent=w?w.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],O()),Q.nextNode(),a.push({type:2,index:++r});s.append(t[e],O())}}}else if(8===s.nodeType)if(s.data===P)a.push({type:2,index:r});else{let t=-1;for(;-1!==(t=s.data.indexOf(k,t+1));)a.push({type:7,index:r}),t+=k.length-1}r++}}static createElement(t,e){const i=U.createElement("template");return i.innerHTML=t,i}}function G(t,e,i=t,s){if(e===B)return e;let r=void 0!==s?i._$Co?.[s]:i._$Cl;const o=T(e)?void 0:e._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),void 0===o?r=void 0:(r=new o(t),r._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=r:i._$Cl=r),void 0!==r&&(e=G(t,r._$AS(t,e.values),r,s)),e}class X{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??U).importNode(e,!0);Q.currentNode=s;let r=Q.nextNode(),o=0,n=0,a=i[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new Y(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new rt(r,this,t)),this._$AV.push(e),a=i[++n]}o!==a?.index&&(r=Q.nextNode(),o++)}return Q.currentNode=U,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Y{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=G(this,t,e),T(t)?t===V||null==t||""===t?(this._$AH!==V&&this._$AR(),this._$AH=V):t!==this._$AH&&t!==B&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>N(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==V&&T(this._$AH)?this._$AA.nextSibling.data=t:this.T(U.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Z.createElement(F(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new X(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=K.get(t.strings);return void 0===e&&K.set(t.strings,e=new Z(t)),e}k(t){N(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const r of t)s===e.length?e.push(i=new Y(this.O(O()),this.O(O()),this,this.options)):i=e[s],i._$AI(r),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=x(t).nextSibling;x(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,r){this.type=1,this._$AH=V,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=V}_$AI(t,e=this,i,s){const r=this.strings;let o=!1;if(void 0===r)t=G(this,t,e,0),o=!T(t)||t!==this._$AH&&t!==B,o&&(this._$AH=t);else{const s=t;let n,a;for(t=r[0],n=0;n<r.length-1;n++)a=G(this,s[i+n],e,n),a===B&&(a=this._$AH[n]),o||=!T(a)||a!==this._$AH[n],a===V?t=V:t!==V&&(t+=(a??"")+r[n+1]),this._$AH[n]=a}o&&!s&&this.j(t)}j(t){t===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===V?void 0:t}}class it extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==V)}}class st extends tt{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){if((t=G(this,t,e,0)??V)===B)return;const i=this._$AH,s=t===V&&i!==V||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==V&&(i===V||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class rt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){G(this,t)}}const ot=S.litHtmlPolyfillSupport;ot?.(Z,Y),(S.litHtmlVersions??=[]).push("3.3.2");const nt=globalThis;class at extends A{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let r=s._$litPart$;if(void 0===r){const t=i?.renderBefore??null;s._$litPart$=r=new Y(e.insertBefore(O(),t),t,void 0,i??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return B}}at._$litElement$=!0,at.finalized=!0,nt.litElementHydrateSupport?.({LitElement:at});const ct=nt.litElementPolyfillSupport;ct?.({LitElement:at}),(nt.litElementVersions??=[]).push("4.2.2");const lt=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},dt={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:y},ut=(t=dt,e,i)=>{const{kind:s,metadata:r}=i;let o=globalThis.litPropertyMetadata.get(r);if(void 0===o&&globalThis.litPropertyMetadata.set(r,o=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),o.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const r=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,r,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const r=this[s];e.call(this,i),this.requestUpdate(s,r,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function ht(t){return(e,i)=>"object"==typeof i?ut(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function pt(t){return ht({...t,state:!0,attribute:!1})}class _t{getAppIcon(t){const e=t.attributes.app_id||t.attributes.app_name?.toLowerCase();return e?.includes("sky")?"mdi:satellite-variant":e?.includes("netflix")?"mdi:netflix":e?.includes("youtube")?"mdi:youtube":e?.includes("prime")?"mdi:amazon-prime":t.attributes.entity_picture||"mdi:television"}getAppName(t){return t.attributes.app_name||"SkyQ"}getMediaTitle(t){return t.attributes.media_title||t.attributes.friendly_name}getMediaSubtitle(t){return t.attributes.media_artist?t.attributes.media_artist:t.attributes.media_series_title?`S${t.attributes.media_season||"?"}E${t.attributes.media_episode||"?"}`:t.attributes.media_channel||void 0}getMediaImage(t){return t.attributes.entity_picture||t.attributes.media_image_url||t.attributes.media_thumbnail}canPlay(t){return"idle"===t.state||"paused"===t.state||"standby"===t.state}canPause(t){return"playing"===t.state}canControl(t){return(t.attributes.supported_features||0)>0}}class mt{getAppIcon(t){const e=t.attributes.app_id||t.attributes.app_name?.toLowerCase();return e?.includes("netflix")?"mdi:netflix":e?.includes("youtube")?"mdi:youtube":e?.includes("prime")?"mdi:amazon-prime":e?.includes("disney")?"mdi:disney":e?.includes("spotify")?"mdi:spotify":e?.includes("kodi")?"mdi:kodi":t.attributes.entity_picture||"mdi:television-box"}getAppName(t){return t.attributes.app_name||"Android TV"}getMediaTitle(t){return t.attributes.media_title||t.attributes.friendly_name}getMediaSubtitle(t){return t.attributes.media_artist||t.attributes.media_album_name||t.attributes.app_name}getMediaImage(t){return t.attributes.entity_picture||t.attributes.media_image_url||t.attributes.media_thumbnail}canPlay(t){return"idle"===t.state||"paused"===t.state||"standby"===t.state}canPause(t){return"playing"===t.state}canControl(t){return(t.attributes.supported_features||0)>0}}class gt{getAppIcon(t){return t.attributes.entity_picture||t.attributes.media_image_url||"mdi:spotify"}getAppName(t){return"Spotify"}getMediaTitle(t){return t.attributes.media_title}getMediaSubtitle(t){return t.attributes.media_artist?t.attributes.media_album_name?`${t.attributes.media_artist} • ${t.attributes.media_album_name}`:t.attributes.media_artist:t.attributes.media_album_name}getMediaImage(t){return t.attributes.entity_picture||t.attributes.media_image_url||t.attributes.media_thumbnail}canPlay(t){return"idle"===t.state||"paused"===t.state||"standby"===t.state}canPause(t){return"playing"===t.state}canControl(t){return(t.attributes.supported_features||0)>0}}class ft{getAppIcon(t){return t.attributes.entity_picture||t.attributes.media_image_url||"mdi:music-note"}getAppName(t){return t.attributes.app_name||t.attributes.friendly_name||"Media Player"}getMediaTitle(t){return t.attributes.media_title||t.attributes.friendly_name}getMediaSubtitle(t){return t.attributes.media_artist?t.attributes.media_album_name?`${t.attributes.media_artist} • ${t.attributes.media_album_name}`:t.attributes.media_artist:t.attributes.media_album_name||t.attributes.source}getMediaImage(t){return t.attributes.entity_picture||t.attributes.media_image_url||t.attributes.media_thumbnail}canPlay(t){return"idle"===t.state||"paused"===t.state||"standby"===t.state}canPause(t){return"playing"===t.state}canControl(t){return(t.attributes.supported_features||0)>0}}function bt(t){switch(t){case"skyq":return new _t;case"android_tv":return new mt;case"spotify":return new gt;default:return new ft}}var vt;vt={type:"universal-media-card",name:"Universal Media Card",description:"Universal Media Card mit Multi-Source-Support"},window.customCards||(window.customCards=[]),window.customCards.push(vt);let yt=class extends at{constructor(){super(...arguments),this._sourceStates=new Map}static async getConfigElement(){return await Promise.resolve().then(function(){return At}),document.createElement("universal-media-card-editor")}static async getStubConfig(t){const e=Object.keys(t.states).filter(t=>t.startsWith("media_player."));return{type:"custom:universal-media-card",sources:e.slice(0,2).map(e=>({entity:e,type:"generic",name:t.states[e]?.attributes.friendly_name||e})),show_app_icon:!0,compact_view:!1}}setConfig(t){if(!t.sources||0===t.sources.length)throw new Error("Mindestens eine Quelle muss konfiguriert sein");this._config={show_app_icon:!0,compact_view:!1,hide_source_selector:!1,...t},this._activeSource||(this._activeSource=t.default_source||t.sources[0].entity)}connectedCallback(){super.connectedCallback(),this._updateSourceStates()}_updateSourceStates(){this.hass&&this._config&&(this._config.sources.forEach(t=>{const e=this.hass.states[t.entity];e&&this._sourceStates.set(t.entity,{entity:t.entity,state:e.state,attributes:e.attributes})}),this.requestUpdate())}updated(t){t.has("hass")&&this._updateSourceStates()}_getActiveSourceConfig(){return this._config.sources.find(t=>t.entity===this._activeSource)}_getActiveSourceState(){return this._activeSource?this._sourceStates.get(this._activeSource):void 0}_switchSource(t){this._activeSource=t,this.requestUpdate()}async _callService(t,e){const i=this._getActiveSourceConfig();if(!i)return;const s=e?.entity_id||i.entity;await this.hass.callService("media_player",t,{entity_id:s,...e}),this._updateSourceStates()}_renderAppIcon(){if(!this._config.show_app_icon)return V;const t=this._getActiveSourceState(),e=this._getActiveSourceConfig();if(!t||!e)return V;const i=bt(e.type),s=i.getAppIcon(t),r=i.getMediaImage(t);return r&&r.startsWith("http")?W`
        <div class="app-icon">
          <img src="${r}" alt="${i.getAppName(t)||""}" />
        </div>
      `:W`
      <div class="app-icon">
        <ha-icon icon="${s||"mdi:play-circle"}" class="icon-large"></ha-icon>
      </div>
    `}_renderNowPlaying(){const t=this._getActiveSourceState(),e=this._getActiveSourceConfig();if(!t||!e)return V;const i=bt(e.type),s=i.getMediaTitle(t),r=i.getMediaSubtitle(t),o=i.getAppName(t);return s||r?W`
      <div class="now-playing">
        ${this._config.show_app_icon?W`
          <div class="app-name">${o}</div>
        `:V}
        <div class="media-title">${s||"Kein Titel"}</div>
        ${r?W`<div class="media-subtitle">${r}</div>`:V}
      </div>
    `:V}_renderSourceSelector(){return this._config.hide_source_selector||this._config.sources.length<=1?V:W`
      <div class="source-selector">
        ${this._config.sources.map(t=>{this._sourceStates.get(t.entity);const e=t.entity===this._activeSource;return W`
            <button
              class="source-button ${e?"active":""}"
              @click="${()=>this._switchSource(t.entity)}"
            >
              ${t.icon?W`<ha-icon icon="${t.icon}"></ha-icon>`:V}
              <span>${t.name||t.entity}</span>
            </button>
          `})}
      </div>
    `}_renderMediaControls(){const t=this._getActiveSourceState(),e=this._getActiveSourceConfig();if(!t||!e)return W``;const i=bt(e.type),s=i.canPlay(t),r=i.canPause(t),o=i.canControl(t);return W`
      <div class="media-controls">
        <button
          class="control-button"
          @click="${()=>this._callService("media_previous_track")}"
          ?disabled="${!o}"
        >
          <ha-icon icon="mdi:skip-previous"></ha-icon>
        </button>
        ${r?W`
          <button
            class="control-button play-pause"
            @click="${()=>this._callService("media_pause")}"
          >
            <ha-icon icon="mdi:pause"></ha-icon>
          </button>
        `:W`
          <button
            class="control-button play-pause"
            @click="${()=>this._callService("media_play")}"
            ?disabled="${!s}"
          >
            <ha-icon icon="mdi:play"></ha-icon>
          </button>
        `}
        <button
          class="control-button"
          @click="${()=>this._callService("media_next_track")}"
          ?disabled="${!o}"
        >
          <ha-icon icon="mdi:skip-next"></ha-icon>
        </button>
      </div>
      <div class="volume-controls">
        <button
          class="control-button"
          @click="${()=>this._callService("volume_mute",{entity_id:e.audio_source||e.entity})}"
        >
          <ha-icon icon="${t.attributes.is_volume_muted?"mdi:volume-mute":"mdi:volume-high"}"></ha-icon>
        </button>
        <input
          type="range"
          class="volume-slider"
          min="0"
          max="1"
          step="0.01"
          .value="${t.attributes.volume_level||0}"
          @input="${t=>{const i=t.target;this._callService("volume_set",{entity_id:e.audio_source||e.entity,volume_level:parseFloat(i.value)})}}"
        />
      </div>
    `}render(){if(!this._config)return W`<ha-card><div class="error">Konfiguration fehlt</div></ha-card>`;this._getActiveSourceState();const t=this._config.compact_view;return W`
      <ha-card class="${t?"compact":""}">
        ${this._config.title?W`
          <div class="card-header">
            <h2>${this._config.title}</h2>
          </div>
        `:V}
        ${this._renderSourceSelector()}
        <div class="card-content">
          ${this._renderAppIcon()}
          ${this._renderNowPlaying()}
          ${this._renderMediaControls()}
        </div>
      </ha-card>
    `}};yt.styles=n`
    :host {
      display: block;
    }

    ha-card {
      padding: 16px;
      background: var(--card-background-color, #fff);
      border-radius: var(--ha-card-border-radius, 12px);
      box-shadow: var(--ha-card-box-shadow, 0 2px 4px rgba(0,0,0,0.1));
    }

    .card-header {
      margin-bottom: 16px;
      border-bottom: 1px solid var(--divider-color, rgba(0,0,0,0.12));
      padding-bottom: 12px;
    }

    .card-header h2 {
      margin: 0;
      font-size: 1.2em;
      font-weight: 500;
      color: var(--primary-text-color, #000);
    }

    .source-selector {
      display: flex;
      gap: 8px;
      margin-bottom: 16px;
      flex-wrap: wrap;
    }

    .source-button {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 8px 12px;
      border: 1px solid var(--divider-color, rgba(0,0,0,0.12));
      border-radius: 8px;
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color, #000);
      cursor: pointer;
      transition: all 0.2s;
      font-size: 0.9em;
    }

    .source-button:hover {
      background: var(--secondary-background-color, #f5f5f5);
      border-color: var(--primary-color, #03a9f4);
    }

    .source-button.active {
      background: var(--primary-color, #03a9f4);
      color: var(--text-primary-color, #fff);
      border-color: var(--primary-color, #03a9f4);
    }

    .card-content {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .app-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 80px;
      height: 80px;
      margin: 0 auto;
      border-radius: 12px;
      overflow: hidden;
      background: var(--secondary-background-color, #f5f5f5);
    }

    .app-icon img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .app-icon ha-icon {
      --mdc-icon-size: 48px;
      color: var(--primary-color, #03a9f4);
    }

    .now-playing {
      text-align: center;
    }

    .app-name {
      font-size: 0.85em;
      color: var(--secondary-text-color, rgba(0,0,0,0.6));
      margin-bottom: 4px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .media-title {
      font-size: 1.1em;
      font-weight: 500;
      color: var(--primary-text-color, #000);
      margin-bottom: 4px;
    }

    .media-subtitle {
      font-size: 0.9em;
      color: var(--secondary-text-color, rgba(0,0,0,0.6));
    }

    .media-controls {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 12px;
    }

    .control-button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      border: none;
      background: var(--primary-color, #03a9f4);
      color: var(--text-primary-color, #fff);
      cursor: pointer;
      transition: all 0.2s;
    }

    .control-button:hover:not(:disabled) {
      background: var(--primary-color-dark, #0288d1);
      transform: scale(1.05);
    }

    .control-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .control-button.play-pause {
      width: 64px;
      height: 64px;
    }

    .control-button.play-pause ha-icon {
      --mdc-icon-size: 32px;
    }

    .volume-controls {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 0 16px;
    }

    .volume-slider {
      flex: 1;
      height: 4px;
      border-radius: 2px;
      background: var(--divider-color, rgba(0,0,0,0.12));
      outline: none;
      -webkit-appearance: none;
    }

    .volume-slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: var(--primary-color, #03a9f4);
      cursor: pointer;
    }

    .volume-slider::-moz-range-thumb {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: var(--primary-color, #03a9f4);
      cursor: pointer;
      border: none;
    }

    .error {
      padding: 16px;
      color: var(--error-color, #f44336);
      text-align: center;
    }

    ha-card.compact .card-content {
      flex-direction: row;
      align-items: center;
    }

    ha-card.compact .app-icon {
      width: 60px;
      height: 60px;
      margin: 0;
    }

    ha-card.compact .now-playing {
      flex: 1;
      text-align: left;
    }

    ha-card.compact .media-controls {
      flex-direction: column;
      gap: 8px;
    }
  `,t([ht({attribute:!1})],yt.prototype,"hass",void 0),t([pt()],yt.prototype,"_config",void 0),t([pt()],yt.prototype,"_activeSource",void 0),t([pt()],yt.prototype,"_sourceStates",void 0),yt=t([lt("universal-media-card")],yt);let $t=class extends at{constructor(){super(...arguments),this._sources=[]}setConfig(t){this.config=t,this._sources=t.sources||[]}_addSource(){this._sources=[...this._sources,{entity:"",type:"generic",name:""}],this._updateConfig()}_removeSource(t){this._sources=this._sources.filter((e,i)=>i!==t),this._updateConfig()}_updateSource(t,e){this._sources=this._sources.map((i,s)=>s===t?{...i,...e}:i),this._updateConfig()}_updateConfig(){const t={...this.config,sources:this._sources},e=new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0});this.dispatchEvent(e)}_getMediaPlayerEntities(){return this.hass?Object.keys(this.hass.states).filter(t=>t.startsWith("media_player.")):[]}_fireEvent(t,e){const i=new CustomEvent(t,{detail:e,bubbles:!0,composed:!0});this.dispatchEvent(i)}render(){return this.hass?W`
      <div class="card-config">
        <div class="config-section">
          <h3>Medienquellen</h3>
          ${this._sources.map((t,e)=>W`
            <div class="source-config">
              <div class="source-row">
                <ha-entity-picker
                  .hass="${this.hass}"
                  .value="${t.entity}"
                  .label="Entity"
                  .filter="${t=>t.entity_id.startsWith("media_player.")}"
                  @value-changed="${t=>{this._updateSource(e,{entity:t.detail.value})}}"
                ></ha-entity-picker>
                <select
                  class="type-select"
                  .value="${t.type}"
                  @change="${t=>{const i=t.target;this._updateSource(e,{type:i.value})}}"
                >
                  <option value="skyq">SkyQ</option>
                  <option value="android_tv">Android TV</option>
                  <option value="spotify">Spotify</option>
                  <option value="generic">Generic</option>
                </select>
                <ha-textfield
                  label="Name (optional)"
                  .value="${t.name||""}"
                  @input="${t=>{const i=t.target;this._updateSource(e,{name:i.value})}}"
                ></ha-textfield>
                <ha-icon-button
                  icon="mdi:delete"
                  @click="${()=>this._removeSource(e)}"
                ></ha-icon-button>
              </div>
              <div class="source-row">
                <ha-entity-picker
                  .hass="${this.hass}"
                  .value="${t.audio_source||""}"
                  .label="Audio-Quelle (optional)"
                  .filter="${t=>t.entity_id.startsWith("media_player.")}"
                  @value-changed="${t=>{this._updateSource(e,{audio_source:t.detail.value||void 0})}}"
                  allow-custom-entity
                ></ha-entity-picker>
              </div>
            </div>
          `)}
          <ha-button @click="${this._addSource}">
            <ha-icon icon="mdi:plus" slot="icon"></ha-icon>
            Quelle hinzufügen
          </ha-button>
        </div>

        <div class="config-section">
          <h3>Allgemeine Einstellungen</h3>
          <select
            class="default-source-select"
            .value="${this.config.default_source||""}"
            @change="${t=>{const e=t.target;this._fireEvent("config-changed",{config:{...this.config,default_source:e.value||void 0}})}}"
          >
            <option value="">Keine</option>
            ${this._sources.map(t=>W`
              <option .value="${t.entity}">
                ${t.name||t.entity}
              </option>
            `)}
          </select>

          <ha-formfield label="App-Icon anzeigen">
            <ha-switch
              .checked="${!1!==this.config.show_app_icon}"
              @change="${t=>{const e=t.target;this._fireEvent("config-changed",{config:{...this.config,show_app_icon:e.checked}})}}"
            ></ha-switch>
          </ha-formfield>

          <ha-formfield label="Kompakte Ansicht">
            <ha-switch
              .checked="${!0===this.config.compact_view}"
              @change="${t=>{const e=t.target;this._fireEvent("config-changed",{config:{...this.config,compact_view:e.checked}})}}"
            ></ha-switch>
          </ha-formfield>

          <ha-formfield label="Source-Selector ausblenden">
            <ha-switch
              .checked="${!0===this.config.hide_source_selector}"
              @change="${t=>{const e=t.target;this._fireEvent("config-changed",{config:{...this.config,hide_source_selector:e.checked}})}}"
            ></ha-switch>
          </ha-formfield>
        </div>
      </div>
    `:W`<div>Loading...</div>`}};$t.styles=n`
    .card-config {
      padding: 16px;
    }

    .config-section {
      margin-bottom: 24px;
    }

    .config-section h3 {
      margin: 0 0 12px 0;
      font-size: 1.1em;
      font-weight: 500;
    }

    .source-config {
      border: 1px solid var(--divider-color, rgba(0,0,0,0.12));
      border-radius: 8px;
      padding: 12px;
      margin-bottom: 12px;
    }

    .source-row {
      display: flex;
      gap: 8px;
      align-items: center;
      margin-bottom: 8px;
    }

    .source-row:last-child {
      margin-bottom: 0;
    }

    .source-row ha-entity-picker,
    .source-row ha-textfield,
    .source-row .type-select {
      flex: 1;
    }

    .type-select,
    .default-source-select {
      padding: 8px;
      border: 1px solid var(--divider-color, rgba(0,0,0,0.12));
      border-radius: 4px;
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color, #000);
      font-size: 14px;
    }

    .default-source-select {
      width: 100%;
      margin-bottom: 12px;
    }

    ha-formfield {
      display: block;
      margin-bottom: 12px;
    }
  `,t([ht({attribute:!1})],$t.prototype,"hass",void 0),t([ht({attribute:!1})],$t.prototype,"config",void 0),t([pt()],$t.prototype,"_sources",void 0),$t=t([lt("universal-media-card-editor")],$t);var At=Object.freeze({__proto__:null,get UniversalMediaCardEditor(){return $t}});export{yt as UniversalMediaCard};
//# sourceMappingURL=universal-media-card.js.map
