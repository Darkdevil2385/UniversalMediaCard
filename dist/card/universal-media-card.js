var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { registerCustomCard } from "../utils/custom-cards";
import { getHandlerForType } from "../handlers/media-source-handlers";
registerCustomCard({
    type: "universal-media-card",
    name: "Universal Media Card",
    description: "Universal Media Card mit Multi-Source-Support",
});
let UniversalMediaCard = class UniversalMediaCard extends LitElement {
    constructor() {
        super(...arguments);
        this._sourceStates = new Map();
    }
    static async getConfigElement() {
        await import("./editor");
        return document.createElement("universal-media-card-editor");
    }
    static async getStubConfig(hass) {
        const entities = Object.keys(hass.states);
        const mediaPlayers = entities.filter((e) => e.startsWith("media_player."));
        return {
            type: "custom:universal-media-card",
            sources: mediaPlayers.slice(0, 2).map((entity) => ({
                entity,
                type: "generic",
                name: hass.states[entity]?.attributes.friendly_name || entity,
            })),
            show_app_icon: true,
            compact_view: false,
        };
    }
    setConfig(config) {
        if (!config.sources || config.sources.length === 0) {
            throw new Error("Mindestens eine Quelle muss konfiguriert sein");
        }
        this._config = {
            show_app_icon: true,
            compact_view: false,
            hide_source_selector: false,
            ...config,
        };
        // Setze aktive Quelle
        if (!this._activeSource) {
            this._activeSource = config.default_source || config.sources[0].entity;
        }
    }
    connectedCallback() {
        super.connectedCallback();
        this._updateSourceStates();
    }
    _updateSourceStates() {
        if (!this.hass || !this._config)
            return;
        this._config.sources.forEach((source) => {
            const entity = this.hass.states[source.entity];
            if (entity) {
                this._sourceStates.set(source.entity, {
                    entity: source.entity,
                    state: entity.state,
                    attributes: entity.attributes,
                });
            }
        });
        this.requestUpdate();
    }
    updated(changedProperties) {
        if (changedProperties.has("hass")) {
            this._updateSourceStates();
        }
    }
    _getActiveSourceConfig() {
        return this._config.sources.find((s) => s.entity === this._activeSource);
    }
    _getActiveSourceState() {
        return this._activeSource ? this._sourceStates.get(this._activeSource) : undefined;
    }
    _switchSource(entityId) {
        this._activeSource = entityId;
        this.requestUpdate();
    }
    async _callService(service, serviceData) {
        const activeSource = this._getActiveSourceConfig();
        if (!activeSource)
            return;
        const entityId = serviceData?.entity_id || activeSource.entity;
        await this.hass.callService("media_player", service, {
            entity_id: entityId,
            ...serviceData,
        });
        this._updateSourceStates();
    }
    _renderAppIcon() {
        if (!this._config.show_app_icon)
            return nothing;
        const state = this._getActiveSourceState();
        const config = this._getActiveSourceConfig();
        if (!state || !config)
            return nothing;
        const handler = getHandlerForType(config.type);
        const icon = handler.getAppIcon(state);
        const image = handler.getMediaImage(state);
        if (image && image.startsWith("http")) {
            return html `
        <div class="app-icon">
          <img src="${image}" alt="${handler.getAppName(state) || ""}" />
        </div>
      `;
        }
        return html `
      <div class="app-icon">
        <ha-icon icon="${icon || "mdi:play-circle"}" class="icon-large"></ha-icon>
      </div>
    `;
    }
    _renderNowPlaying() {
        const state = this._getActiveSourceState();
        const config = this._getActiveSourceConfig();
        if (!state || !config)
            return nothing;
        const handler = getHandlerForType(config.type);
        const title = handler.getMediaTitle(state);
        const subtitle = handler.getMediaSubtitle(state);
        const appName = handler.getAppName(state);
        if (!title && !subtitle)
            return nothing;
        return html `
      <div class="now-playing">
        ${this._config.show_app_icon ? html `
          <div class="app-name">${appName}</div>
        ` : nothing}
        <div class="media-title">${title || "Kein Titel"}</div>
        ${subtitle ? html `<div class="media-subtitle">${subtitle}</div>` : nothing}
      </div>
    `;
    }
    _renderSourceSelector() {
        if (this._config.hide_source_selector || this._config.sources.length <= 1) {
            return nothing;
        }
        return html `
      <div class="source-selector">
        ${this._config.sources.map((source) => {
            const state = this._sourceStates.get(source.entity);
            const isActive = source.entity === this._activeSource;
            return html `
            <button
              class="source-button ${isActive ? "active" : ""}"
              @click="${() => this._switchSource(source.entity)}"
            >
              ${source.icon ? html `<ha-icon icon="${source.icon}"></ha-icon>` : nothing}
              <span>${source.name || source.entity}</span>
            </button>
          `;
        })}
      </div>
    `;
    }
    _renderMediaControls() {
        const state = this._getActiveSourceState();
        const config = this._getActiveSourceConfig();
        if (!state || !config)
            return html ``;
        const handler = getHandlerForType(config.type);
        const canPlay = handler.canPlay(state);
        const canPause = handler.canPause(state);
        const canControl = handler.canControl(state);
        return html `
      <div class="media-controls">
        <button
          class="control-button"
          @click="${() => this._callService("media_previous_track")}"
          ?disabled="${!canControl}"
        >
          <ha-icon icon="mdi:skip-previous"></ha-icon>
        </button>
        ${canPause ? html `
          <button
            class="control-button play-pause"
            @click="${() => this._callService("media_pause")}"
          >
            <ha-icon icon="mdi:pause"></ha-icon>
          </button>
        ` : html `
          <button
            class="control-button play-pause"
            @click="${() => this._callService("media_play")}"
            ?disabled="${!canPlay}"
          >
            <ha-icon icon="mdi:play"></ha-icon>
          </button>
        `}
        <button
          class="control-button"
          @click="${() => this._callService("media_next_track")}"
          ?disabled="${!canControl}"
        >
          <ha-icon icon="mdi:skip-next"></ha-icon>
        </button>
      </div>
      <div class="volume-controls">
        <button
          class="control-button"
          @click="${() => this._callService("volume_mute", {
            entity_id: config.audio_source || config.entity,
        })}"
        >
          <ha-icon icon="${state.attributes.is_volume_muted ? "mdi:volume-mute" : "mdi:volume-high"}"></ha-icon>
        </button>
        <input
          type="range"
          class="volume-slider"
          min="0"
          max="1"
          step="0.01"
          .value="${state.attributes.volume_level || 0}"
          @input="${(e) => {
            const target = e.target;
            this._callService("volume_set", {
                entity_id: config.audio_source || config.entity,
                volume_level: parseFloat(target.value),
            });
        }}"
        />
      </div>
    `;
    }
    render() {
        if (!this._config) {
            return html `<ha-card><div class="error">Konfiguration fehlt</div></ha-card>`;
        }
        const state = this._getActiveSourceState();
        const isCompact = this._config.compact_view;
        return html `
      <ha-card class="${isCompact ? "compact" : ""}">
        ${this._config.title ? html `
          <div class="card-header">
            <h2>${this._config.title}</h2>
          </div>
        ` : nothing}
        ${this._renderSourceSelector()}
        <div class="card-content">
          ${this._renderAppIcon()}
          ${this._renderNowPlaying()}
          ${this._renderMediaControls()}
        </div>
      </ha-card>
    `;
    }
};
UniversalMediaCard.styles = css `
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
  `;
__decorate([
    property({ attribute: false })
], UniversalMediaCard.prototype, "hass", void 0);
__decorate([
    state()
], UniversalMediaCard.prototype, "_config", void 0);
__decorate([
    state()
], UniversalMediaCard.prototype, "_activeSource", void 0);
__decorate([
    state()
], UniversalMediaCard.prototype, "_sourceStates", void 0);
UniversalMediaCard = __decorate([
    customElement("universal-media-card")
], UniversalMediaCard);
export { UniversalMediaCard };
