import{css as t,LitElement as e,nothing as i,html as r}from"lit";function s(t,e,i,r){var s,a=arguments.length,o=a<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,r);else for(var n=t.length-1;n>=0;n--)(s=t[n])&&(o=(a<3?s(o):a>3?s(e,i,o):s(e,i))||o);return a>3&&o&&Object.defineProperty(e,i,o),o}"function"==typeof SuppressedError&&SuppressedError;const a=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},o=globalThis,n=o.ShadowRoot&&(void 0===o.ShadyCSS||o.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,c=Symbol(),d=new WeakMap;let l=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==c)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(n&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=d.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&d.set(e,t))}return t}toString(){return this.cssText}};const u=(t,e)=>{if(n)t.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of e){const e=document.createElement("style"),r=o.litNonce;void 0!==r&&e.setAttribute("nonce",r),e.textContent=i.cssText,t.appendChild(e)}},p=n?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new l("string"==typeof t?t:t+"",void 0,c))(e)})(t):t,{is:h,defineProperty:m,getOwnPropertyDescriptor:f,getOwnPropertyNames:_,getOwnPropertySymbols:g,getPrototypeOf:b}=Object,y=globalThis,v=y.trustedTypes,S=v?v.emptyScript:"",$=y.reactiveElementPolyfillSupport,w=(t,e)=>t,x={toAttribute(t,e){switch(e){case Boolean:t=t?S:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},E=(t,e)=>!h(t,e),k={attribute:!0,type:String,converter:x,reflect:!1,useDefault:!1,hasChanged:E};Symbol.metadata??=Symbol("metadata"),y.litPropertyMetadata??=new WeakMap;class P extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=k){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(t,i,e);void 0!==r&&m(this.prototype,t,r)}}static getPropertyDescriptor(t,e,i){const{get:r,set:s}=f(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:r,set(e){const a=r?.call(this);s?.call(this,e),this.requestUpdate(t,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??k}static _$Ei(){if(this.hasOwnProperty(w("elementProperties")))return;const t=b(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(w("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(w("properties"))){const t=this.properties,e=[..._(t),...g(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(p(t))}else void 0!==t&&e.push(p(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return u(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,i);if(void 0!==r&&!0===i.reflect){const s=(void 0!==i.converter?.toAttribute?i.converter:x).toAttribute(e,i.type);this._$Em=t,null==s?this.removeAttribute(r):this.setAttribute(r,s),this._$Em=null}}_$AK(t,e){const i=this.constructor,r=i._$Eh.get(t);if(void 0!==r&&this._$Em!==r){const t=i.getPropertyOptions(r),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:x;this._$Em=r;const a=s.fromAttribute(e,t.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(t,e,i,r=!1,s){if(void 0!==t){const a=this.constructor;if(!1===r&&(s=this[t]),i??=a.getPropertyOptions(t),!((i.hasChanged??E)(s,e)||i.useDefault&&i.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(a._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:r,wrapped:s},a){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,a??e??this[t]),!0!==s||void 0!==a)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===r&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,r=this[e];!0!==t||this._$AL.has(e)||void 0===r||this.C(e,void 0,i,r)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}}P.elementStyles=[],P.shadowRootOptions={mode:"open"},P[w("elementProperties")]=new Map,P[w("finalized")]=new Map,$?.({ReactiveElement:P}),(y.reactiveElementVersions??=[]).push("2.1.2");const C={attribute:!0,type:String,converter:x,reflect:!1,hasChanged:E},A=(t=C,e,i)=>{const{kind:r,metadata:s}=i;let a=globalThis.litPropertyMetadata.get(s);if(void 0===a&&globalThis.litPropertyMetadata.set(s,a=new Map),"setter"===r&&((t=Object.create(t)).wrapped=!0),a.set(i.name,t),"accessor"===r){const{name:r}=i;return{set(i){const s=e.get.call(this);e.set.call(this,i),this.requestUpdate(r,s,t,!0,i)},init(e){return void 0!==e&&this.C(r,void 0,t,e),e}}}if("setter"===r){const{name:r}=i;return function(i){const s=this[r];e.call(this,i),this.requestUpdate(r,s,t,!0,i)}}throw Error("Unsupported decorator location: "+r)};function M(t){return(e,i)=>"object"==typeof i?A(t,e,i):((t,e,i)=>{const r=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),r?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function U(t){return M({...t,state:!0,attribute:!1})}class O{getAppIcon(t){const e=t.attributes.app_id||t.attributes.app_name?.toLowerCase();return e?.includes("sky")?"mdi:satellite-variant":e?.includes("netflix")?"mdi:netflix":e?.includes("youtube")?"mdi:youtube":e?.includes("prime")?"mdi:amazon-prime":t.attributes.entity_picture||"mdi:television"}getAppName(t){return t.attributes.app_name||"SkyQ"}getMediaTitle(t){return t.attributes.media_title||t.attributes.friendly_name}getMediaSubtitle(t){return t.attributes.media_artist?t.attributes.media_artist:t.attributes.media_series_title?`S${t.attributes.media_season||"?"}E${t.attributes.media_episode||"?"}`:t.attributes.media_channel||void 0}getMediaImage(t){return t.attributes.entity_picture||t.attributes.media_image_url||t.attributes.media_thumbnail}canPlay(t){return"idle"===t.state||"paused"===t.state||"standby"===t.state}canPause(t){return"playing"===t.state}canControl(t){return(t.attributes.supported_features||0)>0}}class z{getAppIcon(t){const e=t.attributes.app_id||t.attributes.app_name?.toLowerCase();return e?.includes("netflix")?"mdi:netflix":e?.includes("youtube")?"mdi:youtube":e?.includes("prime")?"mdi:amazon-prime":e?.includes("disney")?"mdi:disney":e?.includes("spotify")?"mdi:spotify":e?.includes("kodi")?"mdi:kodi":t.attributes.entity_picture||"mdi:television-box"}getAppName(t){return t.attributes.app_name||"Android TV"}getMediaTitle(t){return t.attributes.media_title||t.attributes.friendly_name}getMediaSubtitle(t){return t.attributes.media_artist||t.attributes.media_album_name||t.attributes.app_name}getMediaImage(t){return t.attributes.entity_picture||t.attributes.media_image_url||t.attributes.media_thumbnail}canPlay(t){return"idle"===t.state||"paused"===t.state||"standby"===t.state}canPause(t){return"playing"===t.state}canControl(t){return(t.attributes.supported_features||0)>0}}class j{getAppIcon(t){return t.attributes.entity_picture||t.attributes.media_image_url||"mdi:spotify"}getAppName(t){return"Spotify"}getMediaTitle(t){return t.attributes.media_title}getMediaSubtitle(t){return t.attributes.media_artist?t.attributes.media_album_name?`${t.attributes.media_artist} • ${t.attributes.media_album_name}`:t.attributes.media_artist:t.attributes.media_album_name}getMediaImage(t){return t.attributes.entity_picture||t.attributes.media_image_url||t.attributes.media_thumbnail}canPlay(t){return"idle"===t.state||"paused"===t.state||"standby"===t.state}canPause(t){return"playing"===t.state}canControl(t){return(t.attributes.supported_features||0)>0}}class T{getAppIcon(t){return t.attributes.entity_picture||t.attributes.media_image_url||"mdi:music-note"}getAppName(t){return t.attributes.app_name||t.attributes.friendly_name||"Media Player"}getMediaTitle(t){return t.attributes.media_title||t.attributes.friendly_name}getMediaSubtitle(t){return t.attributes.media_artist?t.attributes.media_album_name?`${t.attributes.media_artist} • ${t.attributes.media_album_name}`:t.attributes.media_artist:t.attributes.media_album_name||t.attributes.source}getMediaImage(t){return t.attributes.entity_picture||t.attributes.media_image_url||t.attributes.media_thumbnail}canPlay(t){return"idle"===t.state||"paused"===t.state||"standby"===t.state}canPause(t){return"playing"===t.state}canControl(t){return(t.attributes.supported_features||0)>0}}function R(t){switch(t){case"skyq":return new O;case"android_tv":return new z;case"spotify":return new j;default:return new T}}var I;I={type:"universal-media-card",name:"Universal Media Card",description:"Universal Media Card mit Multi-Source-Support"},window.customCards||(window.customCards=[]),window.customCards.push(I);let N=class extends e{constructor(){super(...arguments),this._sourceStates=new Map}static async getConfigElement(){return await Promise.resolve().then(function(){return L}),document.createElement("universal-media-card-editor")}static async getStubConfig(t){const e=Object.keys(t.states).filter(t=>t.startsWith("media_player."));return{type:"custom:universal-media-card",sources:e.slice(0,2).map(e=>({entity:e,type:"generic",name:t.states[e]?.attributes.friendly_name||e})),show_app_icon:!0,compact_view:!1}}setConfig(t){if(!t.sources||0===t.sources.length)throw new Error("Mindestens eine Quelle muss konfiguriert sein");this._config={show_app_icon:!0,compact_view:!1,hide_source_selector:!1,...t},this._activeSource||(this._activeSource=t.default_source||t.sources[0].entity)}connectedCallback(){super.connectedCallback(),this._updateSourceStates()}_updateSourceStates(){this.hass&&this._config&&(this._config.sources.forEach(t=>{const e=this.hass.states[t.entity];e&&this._sourceStates.set(t.entity,{entity:t.entity,state:e.state,attributes:e.attributes})}),this.requestUpdate())}updated(t){t.has("hass")&&this._updateSourceStates()}_getActiveSourceConfig(){return this._config.sources.find(t=>t.entity===this._activeSource)}_getActiveSourceState(){return this._activeSource?this._sourceStates.get(this._activeSource):void 0}_switchSource(t){this._activeSource=t,this.requestUpdate()}async _callService(t,e){const i=this._getActiveSourceConfig();if(!i)return;const r=e?.entity_id||i.entity;await this.hass.callService("media_player",t,{entity_id:r,...e}),this._updateSourceStates()}_renderAppIcon(){if(!this._config.show_app_icon)return i;const t=this._getActiveSourceState(),e=this._getActiveSourceConfig();if(!t||!e)return i;const s=R(e.type),a=s.getAppIcon(t),o=s.getMediaImage(t);return o&&o.startsWith("http")?r`
        <div class="app-icon">
          <img src="${o}" alt="${s.getAppName(t)||""}" />
        </div>
      `:r`
      <div class="app-icon">
        <ha-icon icon="${a||"mdi:play-circle"}" class="icon-large"></ha-icon>
      </div>
    `}_renderNowPlaying(){const t=this._getActiveSourceState(),e=this._getActiveSourceConfig();if(!t||!e)return i;const s=R(e.type),a=s.getMediaTitle(t),o=s.getMediaSubtitle(t),n=s.getAppName(t);return a||o?r`
      <div class="now-playing">
        ${this._config.show_app_icon?r`
          <div class="app-name">${n}</div>
        `:i}
        <div class="media-title">${a||"Kein Titel"}</div>
        ${o?r`<div class="media-subtitle">${o}</div>`:i}
      </div>
    `:i}_renderSourceSelector(){return this._config.hide_source_selector||this._config.sources.length<=1?i:r`
      <div class="source-selector">
        ${this._config.sources.map(t=>{this._sourceStates.get(t.entity);const e=t.entity===this._activeSource;return r`
            <button
              class="source-button ${e?"active":""}"
              @click="${()=>this._switchSource(t.entity)}"
            >
              ${t.icon?r`<ha-icon icon="${t.icon}"></ha-icon>`:i}
              <span>${t.name||t.entity}</span>
            </button>
          `})}
      </div>
    `}_renderMediaControls(){const t=this._getActiveSourceState(),e=this._getActiveSourceConfig();if(!t||!e)return r``;const i=R(e.type),s=i.canPlay(t),a=i.canPause(t),o=i.canControl(t);return r`
      <div class="media-controls">
        <button
          class="control-button"
          @click="${()=>this._callService("media_previous_track")}"
          ?disabled="${!o}"
        >
          <ha-icon icon="mdi:skip-previous"></ha-icon>
        </button>
        ${a?r`
          <button
            class="control-button play-pause"
            @click="${()=>this._callService("media_pause")}"
          >
            <ha-icon icon="mdi:pause"></ha-icon>
          </button>
        `:r`
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
    `}render(){if(!this._config)return r`<ha-card><div class="error">Konfiguration fehlt</div></ha-card>`;this._getActiveSourceState();const t=this._config.compact_view;return r`
      <ha-card class="${t?"compact":""}">
        ${this._config.title?r`
          <div class="card-header">
            <h2>${this._config.title}</h2>
          </div>
        `:i}
        ${this._renderSourceSelector()}
        <div class="card-content">
          ${this._renderAppIcon()}
          ${this._renderNowPlaying()}
          ${this._renderMediaControls()}
        </div>
      </ha-card>
    `}};N.styles=t`
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
  `,s([M({attribute:!1})],N.prototype,"hass",void 0),s([U()],N.prototype,"_config",void 0),s([U()],N.prototype,"_activeSource",void 0),s([U()],N.prototype,"_sourceStates",void 0),N=s([a("universal-media-card")],N);let q=class extends e{constructor(){super(...arguments),this._sources=[]}setConfig(t){this.config=t,this._sources=t.sources||[]}_addSource(){this._sources=[...this._sources,{entity:"",type:"generic",name:""}],this._updateConfig()}_removeSource(t){this._sources=this._sources.filter((e,i)=>i!==t),this._updateConfig()}_updateSource(t,e){this._sources=this._sources.map((i,r)=>r===t?{...i,...e}:i),this._updateConfig()}_updateConfig(){const t={...this.config,sources:this._sources},e=new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0});this.dispatchEvent(e)}_getMediaPlayerEntities(){return this.hass?Object.keys(this.hass.states).filter(t=>t.startsWith("media_player.")):[]}_fireEvent(t,e){const i=new CustomEvent(t,{detail:e,bubbles:!0,composed:!0});this.dispatchEvent(i)}render(){return this.hass?r`
      <div class="card-config">
        <div class="config-section">
          <h3>Medienquellen</h3>
          ${this._sources.map((t,e)=>r`
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
            ${this._sources.map(t=>r`
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
    `:r`<div>Loading...</div>`}};q.styles=t`
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
  `,s([M({attribute:!1})],q.prototype,"hass",void 0),s([M({attribute:!1})],q.prototype,"config",void 0),s([U()],q.prototype,"_sources",void 0),q=s([a("universal-media-card-editor")],q);var L=Object.freeze({__proto__:null,get UniversalMediaCardEditor(){return q}});export{N as UniversalMediaCard};
//# sourceMappingURL=universal-media-card.js.map
