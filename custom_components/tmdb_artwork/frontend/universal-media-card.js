function t(t,e,i,s){var r,a=arguments.length,n=a<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,s);else for(var o=t.length-1;o>=0;o--)(r=t[o])&&(n=(a<3?r(n):a>3?r(e,i,n):r(e,i))||n);return a>3&&n&&Object.defineProperty(e,i,n),n}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),r=new WeakMap;let a=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=r.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&r.set(e,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new a(i,t,s)},o=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new a("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:c,defineProperty:l,getOwnPropertyDescriptor:d,getOwnPropertyNames:u,getOwnPropertySymbols:h,getPrototypeOf:p}=Object,m=globalThis,_=m.trustedTypes,g=_?_.emptyScript:"",f=m.reactiveElementPolyfillSupport,b=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},y=(t,e)=>!c(t,e),$={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;let A=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=$){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&l(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:r}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const a=s?.call(this);r?.call(this,e),this.requestUpdate(t,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??$}static _$Ei(){if(this.hasOwnProperty(b("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(b("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b("properties"))){const t=this.properties,e=[...u(t),...h(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(o(t))}else void 0!==t&&e.push(o(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),r=e.litNonce;void 0!==r&&s.setAttribute("nonce",r),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:v).toAttribute(e,i.type);this._$Em=t,null==r?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=s;const a=r.fromAttribute(e,t.type);this[s]=a??this._$Ej?.get(s)??a,this._$Em=null}}requestUpdate(t,e,i,s=!1,r){if(void 0!==t){const a=this.constructor;if(!1===s&&(r=this[t]),i??=a.getPropertyOptions(t),!((i.hasChanged??y)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(a._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:r},a){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,a??e??this[t]),!0!==r||void 0!==a)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};A.elementStyles=[],A.shadowRootOptions={mode:"open"},A[b("elementProperties")]=new Map,A[b("finalized")]=new Map,f?.({ReactiveElement:A}),(m.reactiveElementVersions??=[]).push("2.1.2");const w=globalThis,S=t=>t,x=w.trustedTypes,k=x?x.createPolicy("lit-html",{createHTML:t=>t}):void 0,E="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,M="?"+C,P=`<${M}>`,U=document,z=()=>U.createComment(""),O=t=>null===t||"object"!=typeof t&&"function"!=typeof t,T=Array.isArray,N="[ \t\n\f\r]",H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,I=/>/g,j=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),D=/'/g,B=/"/g,L=/^(?:script|style|textarea|title)$/i,W=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),V=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),K=new WeakMap,Q=U.createTreeWalker(U,129);function F(t,e){if(!T(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==k?k.createHTML(e):e}const G=(t,e)=>{const i=t.length-1,s=[];let r,a=2===e?"<svg>":3===e?"<math>":"",n=H;for(let e=0;e<i;e++){const i=t[e];let o,c,l=-1,d=0;for(;d<i.length&&(n.lastIndex=d,c=n.exec(i),null!==c);)d=n.lastIndex,n===H?"!--"===c[1]?n=R:void 0!==c[1]?n=I:void 0!==c[2]?(L.test(c[2])&&(r=RegExp("</"+c[2],"g")),n=j):void 0!==c[3]&&(n=j):n===j?">"===c[0]?(n=r??H,l=-1):void 0===c[1]?l=-2:(l=n.lastIndex-c[2].length,o=c[1],n=void 0===c[3]?j:'"'===c[3]?B:D):n===B||n===D?n=j:n===R||n===I?n=H:(n=j,r=void 0);const u=n===j&&t[e+1].startsWith("/>")?" ":"";a+=n===H?i+P:l>=0?(s.push(o),i.slice(0,l)+E+i.slice(l)+C+u):i+C+(-2===l?e:u)}return[F(t,a+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class Z{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let r=0,a=0;const n=t.length-1,o=this.parts,[c,l]=G(t,e);if(this.el=Z.createElement(c,i),Q.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=Q.nextNode())&&o.length<n;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(E)){const e=l[a++],i=s.getAttribute(t).split(C),n=/([.?@])?(.*)/.exec(e);o.push({type:1,index:r,name:n[2],strings:i,ctor:"."===n[1]?et:"?"===n[1]?it:"@"===n[1]?st:tt}),s.removeAttribute(t)}else t.startsWith(C)&&(o.push({type:6,index:r}),s.removeAttribute(t));if(L.test(s.tagName)){const t=s.textContent.split(C),e=t.length-1;if(e>0){s.textContent=x?x.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],z()),Q.nextNode(),o.push({type:2,index:++r});s.append(t[e],z())}}}else if(8===s.nodeType)if(s.data===M)o.push({type:2,index:r});else{let t=-1;for(;-1!==(t=s.data.indexOf(C,t+1));)o.push({type:7,index:r}),t+=C.length-1}r++}}static createElement(t,e){const i=U.createElement("template");return i.innerHTML=t,i}}function J(t,e,i=t,s){if(e===V)return e;let r=void 0!==s?i._$Co?.[s]:i._$Cl;const a=O(e)?void 0:e._$litDirective$;return r?.constructor!==a&&(r?._$AO?.(!1),void 0===a?r=void 0:(r=new a(t),r._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=r:i._$Cl=r),void 0!==r&&(e=J(t,r._$AS(t,e.values),r,s)),e}class X{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??U).importNode(e,!0);Q.currentNode=s;let r=Q.nextNode(),a=0,n=0,o=i[0];for(;void 0!==o;){if(a===o.index){let e;2===o.type?e=new Y(r,r.nextSibling,this,t):1===o.type?e=new o.ctor(r,o.name,o.strings,this,t):6===o.type&&(e=new rt(r,this,t)),this._$AV.push(e),o=i[++n]}a!==o?.index&&(r=Q.nextNode(),a++)}return Q.currentNode=U,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Y{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=J(this,t,e),O(t)?t===q||null==t||""===t?(this._$AH!==q&&this._$AR(),this._$AH=q):t!==this._$AH&&t!==V&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>T(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==q&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(U.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Z.createElement(F(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new X(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=K.get(t.strings);return void 0===e&&K.set(t.strings,e=new Z(t)),e}k(t){T(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const r of t)s===e.length?e.push(i=new Y(this.O(z()),this.O(z()),this,this.options)):i=e[s],i._$AI(r),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=S(t).nextSibling;S(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,r){this.type=1,this._$AH=q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=q}_$AI(t,e=this,i,s){const r=this.strings;let a=!1;if(void 0===r)t=J(this,t,e,0),a=!O(t)||t!==this._$AH&&t!==V,a&&(this._$AH=t);else{const s=t;let n,o;for(t=r[0],n=0;n<r.length-1;n++)o=J(this,s[i+n],e,n),o===V&&(o=this._$AH[n]),a||=!O(o)||o!==this._$AH[n],o===q?t=q:t!==q&&(t+=(o??"")+r[n+1]),this._$AH[n]=o}a&&!s&&this.j(t)}j(t){t===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===q?void 0:t}}class it extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==q)}}class st extends tt{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){if((t=J(this,t,e,0)??q)===V)return;const i=this._$AH,s=t===q&&i!==q||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==q&&(i===q||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class rt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){J(this,t)}}const at=w.litHtmlPolyfillSupport;at?.(Z,Y),(w.litHtmlVersions??=[]).push("3.3.2");const nt=globalThis;class ot extends A{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let r=s._$litPart$;if(void 0===r){const t=i?.renderBefore??null;s._$litPart$=r=new Y(e.insertBefore(z(),t),t,void 0,i??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return V}}ot._$litElement$=!0,ot.finalized=!0,nt.litElementHydrateSupport?.({LitElement:ot});const ct=nt.litElementPolyfillSupport;ct?.({LitElement:ot}),(nt.litElementVersions??=[]).push("4.2.2");const lt=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},dt={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:y},ut=(t=dt,e,i)=>{const{kind:s,metadata:r}=i;let a=globalThis.litPropertyMetadata.get(r);if(void 0===a&&globalThis.litPropertyMetadata.set(r,a=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),a.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const r=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,r,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const r=this[s];e.call(this,i),this.requestUpdate(s,r,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function ht(t){return(e,i)=>"object"==typeof i?ut(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function pt(t){return ht({...t,state:!0,attribute:!1})}const mt=["media_title","media_series_title","media_channel","source","app_name","friendly_name"],_t=["media_artist","media_album_name","media_channel","source","app_name"];function gt(t,e){const i=t.attributes;for(const t of e){const e=i[t];if(null!=e&&""!==String(e).trim())return String(e).trim()}}function ft(t){return gt(t,mt)}function bt(t){const e=t.attributes;if(e.media_series_title&&(null!=e.media_season||null!=e.media_episode)){return`S${null!=e.media_season?String(e.media_season):"?"} E${null!=e.media_episode?String(e.media_episode):"?"}`}return e.media_artist&&e.media_album_name?`${e.media_artist} • ${e.media_album_name}`:gt(t,_t)}const vt=["entity_picture","media_image_url","media_thumbnail"];function yt(t){for(const e of vt){const i=t.attributes[e];if(null!=i&&""!==String(i).trim())return String(i).trim()}}const $t=["media_title","media_series_title","media_season","media_episode","media_artist","media_album_name","media_channel","source","app_name","app_id","entity_picture","media_image_url","media_thumbnail"];function At(t){const e=(t.attributes.app_id||t.attributes.app_name||"").toString().toLowerCase();return e.includes("netflix")?"mdi:netflix":e.includes("youtube")?"mdi:youtube":e.includes("prime")||e.includes("amazon")?"mdi:amazon-prime":e.includes("disney")?"mdi:disney":e.includes("spotify")?"mdi:spotify":e.includes("kodi")?"mdi:kodi":e.includes("magenta")||e.includes("magentatv")?"mdi:television":e.includes("wow")||e.includes("sky")?"mdi:satellite-variant":void 0}class wt{getAppIcon(t){const e=At(t);return e||(t.attributes.entity_picture||"mdi:television")}getAppName(t){return t.attributes.app_name||"SkyQ"}getMediaTitle(t){return t.attributes.media_title||t.attributes.media_series_title||t.attributes.media_channel||ft(t)||t.attributes.friendly_name}getMediaSubtitle(t){return t.attributes.media_artist?t.attributes.media_artist:!t.attributes.media_series_title||null==t.attributes.media_season&&null==t.attributes.media_episode?t.attributes.media_channel||bt(t):`S${t.attributes.media_season??"?"} E${t.attributes.media_episode??"?"}`}getMediaImage(t){return yt(t)||t.attributes.entity_picture||t.attributes.media_image_url||t.attributes.media_thumbnail}canPlay(t){return"idle"===t.state||"paused"===t.state||"standby"===t.state}canPause(t){return"playing"===t.state}canControl(t){return(t.attributes.supported_features||0)>0}}class St{getAppIcon(t){const e=At(t);return e||(t.attributes.entity_picture||"mdi:television-box")}getAppName(t){return t.attributes.app_name||"Android TV"}getMediaTitle(t){return t.attributes.media_title||t.attributes.media_series_title||t.attributes.media_channel||ft(t)||t.attributes.friendly_name}getMediaSubtitle(t){return t.attributes.media_artist||t.attributes.media_album_name||bt(t)||t.attributes.app_name}getMediaImage(t){return yt(t)||t.attributes.entity_picture||t.attributes.media_image_url||t.attributes.media_thumbnail}canPlay(t){return"idle"===t.state||"paused"===t.state||"standby"===t.state}canPause(t){return"playing"===t.state}canControl(t){return(t.attributes.supported_features||0)>0}}class xt{getAppIcon(t){return yt(t)||"mdi:spotify"}getAppName(t){return"Spotify"}getMediaTitle(t){return t.attributes.media_title||ft(t)}getMediaSubtitle(t){return t.attributes.media_artist?t.attributes.media_album_name?`${t.attributes.media_artist} • ${t.attributes.media_album_name}`:t.attributes.media_artist:t.attributes.media_album_name||bt(t)}getMediaImage(t){return yt(t)||t.attributes.entity_picture||t.attributes.media_image_url||t.attributes.media_thumbnail}canPlay(t){return"idle"===t.state||"paused"===t.state||"standby"===t.state}canPause(t){return"playing"===t.state}canControl(t){return(t.attributes.supported_features||0)>0}}class kt{getAppIcon(t){const e=At(t);return e||(yt(t)||"mdi:music-note")}getAppName(t){return t.attributes.app_name||t.attributes.friendly_name||"Media Player"}getMediaTitle(t){return ft(t)||t.attributes.friendly_name}getMediaSubtitle(t){return t.attributes.media_artist?t.attributes.media_album_name?`${t.attributes.media_artist} • ${t.attributes.media_album_name}`:t.attributes.media_artist:bt(t)||t.attributes.source}getMediaImage(t){return yt(t)||t.attributes.entity_picture||t.attributes.media_image_url||t.attributes.media_thumbnail}canPlay(t){return"idle"===t.state||"paused"===t.state||"standby"===t.state}canPause(t){return"playing"===t.state}canControl(t){return(t.attributes.supported_features||0)>0}}function Et(t){switch(t){case"skyq":return new wt;case"android_tv":return new St;case"spotify":return new xt;default:return new kt}}const Ct={playing:0,paused:1,idle:2,standby:3,on:4,off:5,unavailable:6,unknown:7};var Mt;Mt={type:"universal-media-card",name:"Universal Media Card",description:"Universal Media Card – eine Karte, automatische Quellenauswahl"},window.customCards||(window.customCards=[]),window.customCards.push(Mt);let Pt=class extends ot{constructor(){super(...arguments),this._sourceStates=new Map}static async getConfigElement(){return await Promise.resolve().then(function(){return zt}),document.createElement("universal-media-card-editor")}static async getStubConfig(t){const e=Object.keys(t.states),i=e.filter(t=>t.startsWith("media_player.")),s=e.find(t=>t.startsWith("sensor.")&&(t.includes("tmdb_artwork")||t.includes("artwork")&&t.includes("fallback")));return{type:"custom:universal-media-card",sources:i.slice(0,2).map(e=>({entity:e,type:"generic",name:t.states[e]?.attributes.friendly_name||e})),show_app_icon:!0,...s&&{artwork_fallback_entity:s}}}setConfig(t){if(!t.sources||0===t.sources.length)throw new Error("Mindestens eine Quelle muss konfiguriert sein");this._config={show_app_icon:!0,show_attributes:!1,...t}}connectedCallback(){super.connectedCallback(),this._updateSourceStates()}_updateSourceStates(){this.hass&&this._config&&(this._config.sources.forEach(t=>{const e=this.hass.states[t.entity];e&&this._sourceStates.set(t.entity,{entity:t.entity,state:e.state,attributes:e.attributes})}),this._activeSource=this._computeActiveSource(),this.requestUpdate())}updated(t){t.has("hass")&&this._updateSourceStates()}_computeActiveSource(){const t=this._config.sources;if(!t.length)return"";let e=t[0].entity,i=999;for(const s of t){const t=this._sourceStates.get(s.entity),r=Ct[t?.state??"unavailable"]??8;r<i&&(i=r,e=s.entity)}const s=this._config.default_source||t[0].entity;return i>=5?s:e}_getActiveSourceConfig(){return this._config.sources.find(t=>t.entity===this._activeSource)}_getActiveSourceState(){return this._activeSource?this._sourceStates.get(this._activeSource):void 0}_getVolumeEntity(){const t=this._getActiveSourceConfig();if(t)return t.audio_source||t.entity}_getVolumeLevel(){const t=this._getVolumeEntity();if(!t)return 0;const e=this.hass?.states[t];return e?.attributes?.volume_level??0}_getIsVolumeMuted(){const t=this._getVolumeEntity();if(!t)return!1;const e=this.hass?.states[t];return e?.attributes?.is_volume_muted??!1}async _callService(t,e){const i=this._getActiveSourceConfig();if(!i)return;let s=e?.entity_id??i.entity;"volume_set"!==t&&"volume_mute"!==t||(s=this._getVolumeEntity()||s),await this.hass.callService("media_player",t,{entity_id:s,...e}),this._updateSourceStates()}_getMediaImageUrl(t){const e=t.attributes.entity_picture||t.attributes.media_image_url||t.attributes.media_thumbnail;if(e){if(e.startsWith("/")){return`${this.hass.config.api_url||window.location.origin}${e}`}return e}const i=this._config.artwork_fallback_entity;if(i){const t=this.hass.states[i],e=t?.state;if(e&&"string"==typeof e&&(e.startsWith("http")||e.startsWith("/"))){if(e.startsWith("/")){return`${this.hass.config.api_url||window.location.origin}${e}`}return e}}}_renderMediaArtwork(){const t=this._getActiveSourceState();if(!t)return q;const e=this._getMediaImageUrl(t),i=this._getActiveSourceConfig();if(!i)return q;const s=Et(i.type).getAppIcon(t);return e?W`
        <div class="media-artwork">
          <img src="${e}" alt="" />
        </div>
      `:W`
      <div class="media-artwork no-image">
        <ha-icon icon="${s||"mdi:music-note"}" class="artwork-icon"></ha-icon>
      </div>
    `}_renderMediaInfo(){const t=this._getActiveSourceState(),e=this._getActiveSourceConfig();if(!t||!e)return q;const i=Et(e.type),s=i.getMediaTitle(t),r=i.getMediaSubtitle(t),a=i.getAppName(t),n=e.name||t.attributes.friendly_name||e.entity;return W`
      <div class="media-info">
        <div class="entity-name">${n}</div>
        ${s?W`<div class="media-title">${s}</div>`:a?W`
                <div class="media-title app-fallback">${a}</div>
                <div class="media-subtitle hint">Kein Titel von der App – nur Gerätename angezeigt</div>
              `:W`<div class="media-title app-fallback">Keine Medieninfo</div>`}
        ${s&&r?W`<div class="media-subtitle">${r}</div>`:q}
        ${s&&!r&&a&&a!==n?W`<div class="app-name">${a}</div>`:q}
        <div class="media-state">${this._formatState(t.state)}</div>
      </div>
    `}_renderAttributesDebug(){if(!this._config.show_attributes)return q;const t=this._getActiveSourceState();if(!t)return q;const e=function(t){const e={},i=t.attributes;for(const t of $t)if(void 0!==i[t]&&null!==i[t]&&""!==i[t]){const s=i[t];"string"==typeof s&&s.length>80?e[t]=s.substring(0,80)+"…":e[t]=s}return e}(t),i=Object.keys(e);return 0===i.length?W`
        <div class="attributes-debug">
          <div class="attributes-title">Media-Attribute (von Entity)</div>
          <div class="attributes-empty">Keine Media-Attribute gesetzt – Gerät/Integration liefert keine Titel/Bilder.</div>
        </div>
      `:W`
      <div class="attributes-debug">
        <div class="attributes-title">Media-Attribute (von Entity)</div>
        <dl class="attributes-list">
          ${i.map(t=>W`
            <dt>${t}</dt>
            <dd>${String(e[t])}</dd>
          `)}
        </dl>
      </div>
    `}_formatState(t){return{playing:"Wiedergabe",paused:"Pausiert",idle:"Bereit",off:"Aus",standby:"Standby",on:"An",unavailable:"Nicht verfügbar"}[t]||t}_renderMediaControls(){const t=this._getActiveSourceState(),e=this._getActiveSourceConfig();if(!t||!e)return W``;const i=Et(e.type),s=i.canPlay(t),r=i.canPause(t),a=i.canControl(t),n="playing"===t.state,o=this._getVolumeLevel(),c=this._getIsVolumeMuted();return W`
      <div class="media-controls">
        <button
          class="control-button"
          @click="${()=>this._callService("media_previous_track")}"
          ?disabled="${!a}"
          title="Vorheriger"
        >
          <ha-icon icon="mdi:skip-previous"></ha-icon>
        </button>
        ${n&&r?W`
              <button
                class="control-button play-pause"
                @click="${()=>this._callService("media_pause")}"
                title="Pause"
              >
                <ha-icon icon="mdi:pause"></ha-icon>
              </button>
            `:W`
              <button
                class="control-button play-pause"
                @click="${()=>this._callService("media_play")}"
                ?disabled="${!s}"
                title="Abspielen"
              >
                <ha-icon icon="mdi:play"></ha-icon>
              </button>
            `}
        <button
          class="control-button"
          @click="${()=>this._callService("media_next_track")}"
          ?disabled="${!a}"
          title="Nächster"
        >
          <ha-icon icon="mdi:skip-next"></ha-icon>
        </button>
      </div>
      <div class="volume-controls">
        <button
          class="volume-button"
          @click="${()=>this._callService("volume_mute")}"
          title="${c?"Stummschaltung aufheben":"Stummschalten"}"
        >
          <ha-icon
            icon="${c?"mdi:volume-mute":o>.5?"mdi:volume-high":o>0?"mdi:volume-medium":"mdi:volume-low"}"
          ></ha-icon>
        </button>
        <input
          type="range"
          class="volume-slider"
          min="0"
          max="1"
          step="0.01"
          .value="${o.toString()}"
          @input="${t=>{const e=t.target;this._callService("volume_set",{volume_level:parseFloat(e.value)})}}"
          title="Lautstärke"
        />
        <span class="volume-value">${Math.round(100*o)}%</span>
      </div>
    `}render(){if(!this._config)return W`<ha-card><div class="error">Konfiguration fehlt</div></ha-card>`;return this._getActiveSourceState()?W`
      <ha-card>
        <div class="card-content">
          ${this._renderMediaArtwork()}
          <div class="media-section">
            ${this._renderMediaInfo()}
            ${this._renderMediaControls()}
          </div>
        </div>
        ${this._renderAttributesDebug()}
      </ha-card>
    `:W`
        <ha-card>
          <div class="empty">Keine Medienquelle verfügbar</div>
        </ha-card>
      `}};Pt.styles=n`
    :host {
      display: block;
    }

    ha-card {
      padding: 0;
      overflow: hidden;
      background: var(--ha-card-background, var(--card-background-color, #fff));
      border-radius: var(--ha-card-border-radius, 12px);
      box-shadow: var(--ha-card-box-shadow, 0 2px 4px rgba(0, 0, 0, 0.1));
    }

    .card-content {
      display: flex;
      padding: 16px;
      gap: 20px;
      align-items: flex-start;
    }

    .media-artwork {
      flex-shrink: 0;
      width: 180px;
      height: 180px;
      border-radius: 8px;
      overflow: hidden;
      background: var(--secondary-background-color, #e0e0e0);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .media-artwork img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .media-artwork.no-image {
      background: var(--primary-color, #03a9f4);
    }

    .media-artwork .artwork-icon {
      --mdc-icon-size: 72px;
      color: rgba(255, 255, 255, 0.9);
    }

    .media-section {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .media-info {
      flex: 0 0 auto;
    }

    .entity-name {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--primary-text-color);
      margin: 0 0 4px 0;
      line-height: 1.3;
    }

    .app-name {
      font-size: 0.75rem;
      color: var(--secondary-text-color);
      margin-bottom: 6px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .media-title {
      font-size: 1rem;
      font-weight: 500;
      color: var(--primary-text-color);
      margin: 0 0 2px 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .media-subtitle {
      font-size: 0.875rem;
      color: var(--secondary-text-color);
      margin: 0 0 8px 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .media-state {
      font-size: 0.8125rem;
      color: var(--secondary-text-color);
    }

    .media-title.app-fallback {
      color: var(--secondary-text-color);
      font-weight: 500;
    }

    .media-subtitle.hint {
      font-size: 0.75rem;
      font-style: italic;
      margin-top: 2px;
    }

    .attributes-debug {
      margin-top: 12px;
      padding: 12px 16px;
      border-top: 1px solid var(--divider-color);
      background: var(--secondary-background-color, rgba(0, 0, 0, 0.05));
      border-radius: 0 0 var(--ha-card-border-radius, 12px);
    }

    .attributes-title {
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--secondary-text-color);
      margin-bottom: 8px;
    }

    .attributes-list {
      margin: 0;
      font-size: 0.8125rem;
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 2px 12px;
    }

    .attributes-list dt {
      color: var(--secondary-text-color);
      font-weight: 500;
    }

    .attributes-list dd {
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .attributes-empty {
      font-size: 0.8125rem;
      color: var(--secondary-text-color);
      font-style: italic;
    }

    .media-controls {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 12px;
      margin-top: 4px;
    }

    .control-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      border: none;
      background: var(--primary-color);
      color: var(--text-primary-color);
      cursor: pointer;
      transition: background-color 0.2s, transform 0.15s;
    }

    .control-button:hover:not(:disabled) {
      opacity: 0.9;
      transform: scale(1.05);
    }

    .control-button:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    .control-button.play-pause {
      width: 56px;
      height: 56px;
    }

    .control-button.play-pause ha-icon {
      --mdc-icon-size: 28px;
    }

    .control-button ha-icon {
      --mdc-icon-size: 24px;
    }

    .volume-controls {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-top: 8px;
    }

    .volume-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border: none;
      border-radius: 50%;
      background: transparent;
      color: var(--primary-text-color);
      cursor: pointer;
    }

    .volume-button:hover {
      background: var(--secondary-background-color);
    }

    .volume-button ha-icon {
      --mdc-icon-size: 22px;
    }

    .volume-slider {
      flex: 1;
      height: 4px;
      border-radius: 2px;
      background: var(--secondary-background-color);
      -webkit-appearance: none;
      appearance: none;
      cursor: pointer;
    }

    .volume-slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: var(--primary-color);
      cursor: pointer;
    }

    .volume-slider::-moz-range-thumb {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: var(--primary-color);
      cursor: pointer;
      border: none;
    }

    .volume-value {
      font-size: 0.8125rem;
      color: var(--secondary-text-color);
      min-width: 36px;
      text-align: right;
    }

    .error,
    .empty {
      padding: 16px;
      text-align: center;
      color: var(--secondary-text-color);
    }

    .error {
      color: var(--error-color);
    }

    @media (max-width: 500px) {
      .card-content {
        flex-direction: column;
        align-items: center;
      }

      .media-artwork {
        width: 100%;
        max-width: 240px;
        height: 240px;
      }

      .media-section {
        width: 100%;
      }
    }
  `,t([ht({attribute:!1})],Pt.prototype,"hass",void 0),t([pt()],Pt.prototype,"_config",void 0),t([pt()],Pt.prototype,"_activeSource",void 0),t([pt()],Pt.prototype,"_sourceStates",void 0),Pt=t([lt("universal-media-card")],Pt);let Ut=class extends ot{constructor(){super(...arguments),this._sources=[]}setConfig(t){this.config=t,this._sources=t.sources||[]}_addSource(){this._sources=[...this._sources,{entity:"",type:"generic",name:""}],this._updateConfig()}_removeSource(t){this._sources=this._sources.filter((e,i)=>i!==t),this._updateConfig()}_updateSource(t,e){this._sources=this._sources.map((i,s)=>s===t?{...i,...e}:i),this._updateConfig()}_updateConfig(){const t={...this.config,sources:this._sources},e=new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0});this.dispatchEvent(e)}_getMediaPlayerEntities(){return this.hass?Object.keys(this.hass.states).filter(t=>t.startsWith("media_player.")):[]}_fireEvent(t,e){const i=new CustomEvent(t,{detail:e,bubbles:!0,composed:!0});this.dispatchEvent(i)}render(){return this.hass?W`
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
          <p class="config-hint">Die Karte zeigt automatisch die aktive Quelle (z. B. Wiedergabe &gt; Pausiert &gt; Bereit). Lautstärke steuert immer die Audio-Quelle (Receiver), falls pro Quelle eingetragen.</p>
          <label class="select-label">Standard-Anzeige (wenn nichts abspielt)</label>
          <select
            class="default-source-select"
            .value="${this.config.default_source||""}"
            @change="${t=>{const e=t.target;this._fireEvent("config-changed",{config:{...this.config,default_source:e.value||void 0}})}}"
          >
            <option value="">Erste Quelle</option>
            ${this._sources.map(t=>W`
              <option .value="${t.entity}">
                ${t.name||t.entity}
              </option>
            `)}
          </select>

          <ha-formfield label="App-Icon/Artwork anzeigen">
            <ha-switch
              .checked="${!1!==this.config.show_app_icon}"
              @change="${t=>{const e=t.target;this._fireEvent("config-changed",{config:{...this.config,show_app_icon:e.checked}})}}"
            ></ha-switch>
          </ha-formfield>

          <ha-formfield label="Media-Attribute anzeigen (Debug)">
            <ha-switch
              .checked="${!0===this.config.show_attributes}"
              @change="${t=>{const e=t.target;this._fireEvent("config-changed",{config:{...this.config,show_attributes:e.checked}})}}"
            ></ha-switch>
          </ha-formfield>
          <p class="config-hint">Zeigt unter der Karte, welche Attribute die Entity liefert (media_title, app_name, entity_picture …). Nützlich um zu prüfen, ob Gerät/Integration Titel/Bild liefert.</p>

          <ha-entity-picker
            .hass="${this.hass}"
            .value="${this.config.artwork_fallback_entity||""}"
            .label="Artwork-Fallback (z. B. TMDB-Sensor)"
            .placeholder="Kein Fallback"
            .filter="${t=>t.entity_id.startsWith("sensor.")||t.entity_id.startsWith("input_text.")}"
            @value-changed="${t=>{this._fireEvent("config-changed",{config:{...this.config,artwork_fallback_entity:t.detail.value||void 0}})}}"
          ></ha-entity-picker>
          <p class="config-hint">Wenn die Quelle kein Bild liefert, wird der State dieser Entity als Bild-URL genutzt (z. B. sensor.tmdb_artwork_fallback von der TMDB Artwork Integration).</p>
        </div>
      </div>
    `:W`<div>Loading...</div>`}};Ut.styles=n`
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

    .config-hint {
      font-size: 0.875rem;
      color: var(--secondary-text-color);
      margin: 0 0 12px 0;
      line-height: 1.4;
    }

    .select-label {
      display: block;
      font-size: 0.875rem;
      margin-bottom: 6px;
      color: var(--primary-text-color);
    }

    ha-formfield {
      display: block;
      margin-bottom: 12px;
    }
  `,t([ht({attribute:!1})],Ut.prototype,"hass",void 0),t([ht({attribute:!1})],Ut.prototype,"config",void 0),t([pt()],Ut.prototype,"_sources",void 0),Ut=t([lt("universal-media-card-editor")],Ut);var zt=Object.freeze({__proto__:null,get UniversalMediaCardEditor(){return Ut}});export{Pt as UniversalMediaCard};
//# sourceMappingURL=universal-media-card.js.map
