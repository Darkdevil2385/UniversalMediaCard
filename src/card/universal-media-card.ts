import { html, LitElement, TemplateResult, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { HomeAssistant } from "../ha/types";
import { HassEntity } from "../ha/types";
import { UniversalMediaCardConfig, MediaSourceConfig, MediaSourceState, MediaSourceType } from "../types";
import { registerCustomCard } from "../utils/custom-cards";
import { getHandlerForType } from "../handlers/media-source-handlers";

registerCustomCard({
  type: "universal-media-card",
  name: "Universal Media Card",
  description: "Universal Media Card mit Multi-Source-Support",
});

@customElement("universal-media-card")
export class UniversalMediaCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: UniversalMediaCardConfig;
  @state() private _activeSource?: string;
  @state() private _sourceStates: Map<string, MediaSourceState> = new Map();

  public static async getConfigElement(): Promise<HTMLElement> {
    await import("./editor");
    return document.createElement("universal-media-card-editor");
  }

  public static async getStubConfig(hass: HomeAssistant): Promise<UniversalMediaCardConfig> {
    const entities = Object.keys(hass.states);
    const mediaPlayers = entities.filter((e) => e.startsWith("media_player."));
    return {
      type: "custom:universal-media-card",
      sources: mediaPlayers.slice(0, 2).map((entity) => ({
        entity,
        type: "generic" as MediaSourceType,
        name: hass.states[entity]?.attributes.friendly_name || entity,
      })),
      show_app_icon: true,
      compact_view: false,
    };
  }

  setConfig(config: UniversalMediaCardConfig): void {
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

  connectedCallback(): void {
    super.connectedCallback();
    this._updateSourceStates();
  }

  private _updateSourceStates(): void {
    if (!this.hass || !this._config) return;

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

  protected updated(changedProperties: Map<string | number | symbol, unknown>): void {
    if (changedProperties.has("hass")) {
      this._updateSourceStates();
    }
  }

  private _getActiveSourceConfig(): MediaSourceConfig | undefined {
    return this._config.sources.find((s) => s.entity === this._activeSource);
  }

  private _getActiveSourceState(): MediaSourceState | undefined {
    return this._activeSource ? this._sourceStates.get(this._activeSource) : undefined;
  }

  private _switchSource(entityId: string): void {
    this._activeSource = entityId;
    this.requestUpdate();
  }

  private async _callService(service: string, serviceData?: Record<string, any>): Promise<void> {
    const activeSource = this._getActiveSourceConfig();
    if (!activeSource) return;

    const entityId = serviceData?.entity_id || activeSource.entity;
    await this.hass.callService("media_player", service, {
      entity_id: entityId,
      ...serviceData,
    });
    this._updateSourceStates();
  }

  private _getMediaImageUrl(state: MediaSourceState): string | undefined {
    const image = state.attributes.entity_picture || 
                 state.attributes.media_image_url || 
                 state.attributes.media_thumbnail;
    
    if (!image) return undefined;
    
    // Wenn relative URL, mache sie absolut
    if (image.startsWith("/")) {
      const apiUrl = this.hass.config.api_url || window.location.origin;
      return `${apiUrl}${image}`;
    }
    
    return image;
  }

  private _renderMediaArtwork(): TemplateResult | typeof nothing {
    const state = this._getActiveSourceState();
    if (!state) return nothing;

    const imageUrl = this._getMediaImageUrl(state);
    const config = this._getActiveSourceConfig();
    if (!config) return nothing;

    const handler = getHandlerForType(config.type);
    const icon = handler.getAppIcon(state);

    if (imageUrl) {
      return html`
        <div class="media-artwork">
          <img src="${imageUrl}" alt="Media artwork" />
        </div>
      `;
    }

    return html`
      <div class="media-artwork no-image">
        <ha-icon icon="${icon || "mdi:music-note"}" class="artwork-icon"></ha-icon>
      </div>
    `;
  }

  private _renderMediaInfo(): TemplateResult | typeof nothing {
    const state = this._getActiveSourceState();
    const config = this._getActiveSourceConfig();
    if (!state || !config) return nothing;

    const handler = getHandlerForType(config.type);
    const title = handler.getMediaTitle(state);
    const subtitle = handler.getMediaSubtitle(state);
    const appName = handler.getAppName(state);
    const entityName = config.name || state.attributes.friendly_name || config.entity;

    return html`
      <div class="media-info">
        <div class="entity-name">${entityName}</div>
        ${appName && appName !== entityName ? html`
          <div class="app-name">${appName}</div>
        ` : nothing}
        ${title ? html`
          <div class="media-title">${title}</div>
        ` : nothing}
        ${subtitle ? html`
          <div class="media-subtitle">${subtitle}</div>
        ` : nothing}
        ${state.state ? html`
          <div class="media-state">${this._formatState(state.state)}</div>
        ` : nothing}
      </div>
    `;
  }

  private _formatState(state: string): string {
    const stateMap: Record<string, string> = {
      playing: "Wiedergabe",
      paused: "Pausiert",
      idle: "Bereit",
      off: "Aus",
      standby: "Standby",
      unavailable: "Nicht verfügbar",
    };
    return stateMap[state] || state;
  }

  private _renderSourceSelector(): TemplateResult | typeof nothing {
    if (this._config.hide_source_selector || this._config.sources.length <= 1) {
      return nothing;
    }

    return html`
      <div class="source-selector">
        ${this._config.sources.map((source) => {
          const state = this._sourceStates.get(source.entity);
          const isActive = source.entity === this._activeSource;
          const handler = getHandlerForType(source.type);
          const sourceState = state ? {
            entity: source.entity,
            state: state.state,
            attributes: state.attributes,
          } : undefined;
          const icon = sourceState ? handler.getAppIcon(sourceState) : source.icon || "mdi:cast";
          
          return html`
            <button
              class="source-button ${isActive ? "active" : ""}"
              @click="${() => this._switchSource(source.entity)}"
              title="${source.name || source.entity}"
            >
              <ha-icon icon="${icon}"></ha-icon>
              <span>${source.name || source.entity.split(".")[1]}</span>
            </button>
          `;
        })}
      </div>
    `;
  }

  private _renderMediaControls(): TemplateResult {
    const state = this._getActiveSourceState();
    const config = this._getActiveSourceConfig();
    if (!state || !config) return html``;

    const handler = getHandlerForType(config.type);
    const canPlay = handler.canPlay(state);
    const canPause = handler.canPause(state);
    const canControl = handler.canControl(state);
    const isPlaying = state.state === "playing";
    const volumeLevel = state.attributes.volume_level ?? 0;
    const isMuted = state.attributes.is_volume_muted ?? false;

    return html`
      <div class="media-controls">
        <button
          class="control-button"
          @click="${() => this._callService("media_previous_track")}"
          ?disabled="${!canControl}"
          title="Vorheriger Titel"
        >
          <ha-icon icon="mdi:skip-previous"></ha-icon>
        </button>
        ${isPlaying && canPause ? html`
          <button
            class="control-button play-pause"
            @click="${() => this._callService("media_pause")}"
            title="Pause"
          >
            <ha-icon icon="mdi:pause"></ha-icon>
          </button>
        ` : html`
          <button
            class="control-button play-pause"
            @click="${() => this._callService("media_play")}"
            ?disabled="${!canPlay}"
            title="Abspielen"
          >
            <ha-icon icon="mdi:play"></ha-icon>
          </button>
        `}
        <button
          class="control-button"
          @click="${() => this._callService("media_next_track")}"
          ?disabled="${!canControl}"
          title="Nächster Titel"
        >
          <ha-icon icon="mdi:skip-next"></ha-icon>
        </button>
      </div>
      <div class="volume-controls">
        <button
          class="volume-button"
          @click="${() => this._callService("volume_mute", {
            entity_id: config.audio_source || config.entity,
          })}"
          title="${isMuted ? "Stummschaltung aufheben" : "Stummschalten"}"
        >
          <ha-icon icon="${isMuted ? "mdi:volume-mute" : volumeLevel > 0.5 ? "mdi:volume-high" : volumeLevel > 0 ? "mdi:volume-medium" : "mdi:volume-low"}"></ha-icon>
        </button>
        <input
          type="range"
          class="volume-slider"
          min="0"
          max="1"
          step="0.01"
          .value="${volumeLevel.toString()}"
          @input="${(e: Event) => {
            const target = e.target as HTMLInputElement;
            this._callService("volume_set", {
              entity_id: config.audio_source || config.entity,
              volume_level: parseFloat(target.value),
            });
          }}"
          title="Lautstärke: ${Math.round(volumeLevel * 100)}%"
        />
        <span class="volume-value">${Math.round(volumeLevel * 100)}%</span>
      </div>
    `;
  }

  protected render(): TemplateResult {
    if (!this._config) {
      return html`<ha-card><div class="error">Konfiguration fehlt</div></ha-card>`;
    }

    const state = this._getActiveSourceState();
    const isCompact = this._config.compact_view;

    return html`
      <ha-card class="${isCompact ? "compact" : ""}">
        ${this._renderSourceSelector()}
        <div class="card-content">
          ${this._renderMediaArtwork()}
          <div class="media-section">
            ${this._renderMediaInfo()}
            ${this._renderMediaControls()}
          </div>
        </div>
      </ha-card>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }

    ha-card {
      padding: 0;
      background: var(--card-background-color, #fff);
      border-radius: var(--ha-card-border-radius, 12px);
      box-shadow: var(--ha-card-box-shadow, 0 2px 4px rgba(0,0,0,0.1));
      overflow: hidden;
    }

    .source-selector {
      display: flex;
      gap: 8px;
      padding: 12px 16px;
      border-bottom: 1px solid var(--divider-color, rgba(0,0,0,0.12));
      background: var(--card-background-color, #fff);
      flex-wrap: wrap;
    }

    .source-button {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      border: 1px solid var(--divider-color, rgba(0,0,0,0.12));
      border-radius: 20px;
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color, #000);
      cursor: pointer;
      transition: all 0.2s;
      font-size: 0.875em;
      font-weight: 500;
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

    .source-button ha-icon {
      --mdc-icon-size: 18px;
    }

    .card-content {
      display: flex;
      gap: 16px;
      padding: 16px;
    }

    .media-artwork {
      flex-shrink: 0;
      width: 200px;
      height: 200px;
      border-radius: 8px;
      overflow: hidden;
      background: var(--secondary-background-color, #f5f5f5);
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
      background: linear-gradient(135deg, var(--primary-color, #03a9f4) 0%, var(--accent-color, #ff9800) 100%);
    }

    .media-artwork .artwork-icon {
      --mdc-icon-size: 80px;
      color: rgba(255, 255, 255, 0.9);
    }

    .media-section {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-width: 0;
    }

    .media-info {
      flex: 1;
    }

    .entity-name {
      font-size: 1.25em;
      font-weight: 600;
      color: var(--primary-text-color, #000);
      margin-bottom: 4px;
    }

    .app-name {
      font-size: 0.875em;
      color: var(--secondary-text-color, rgba(0,0,0,0.6));
      margin-bottom: 8px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .media-title {
      font-size: 1.1em;
      font-weight: 500;
      color: var(--primary-text-color, #000);
      margin-bottom: 4px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .media-subtitle {
      font-size: 0.95em;
      color: var(--secondary-text-color, rgba(0,0,0,0.6));
      margin-bottom: 8px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .media-state {
      font-size: 0.875em;
      color: var(--secondary-text-color, rgba(0,0,0,0.6));
      margin-top: 8px;
    }

    .media-controls {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 16px;
      margin-top: 16px;
      padding-top: 16px;
      border-top: 1px solid var(--divider-color, rgba(0,0,0,0.12));
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
      transform: scale(1.1);
    }

    .control-button:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    .control-button.play-pause {
      width: 64px;
      height: 64px;
      background: var(--primary-color, #03a9f4);
    }

    .control-button.play-pause ha-icon {
      --mdc-icon-size: 32px;
    }

    .control-button ha-icon {
      --mdc-icon-size: 24px;
    }

    .volume-controls {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-top: 12px;
      padding-top: 12px;
      border-top: 1px solid var(--divider-color, rgba(0,0,0,0.12));
    }

    .volume-button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: none;
      background: transparent;
      color: var(--primary-text-color, #000);
      cursor: pointer;
      transition: all 0.2s;
    }

    .volume-button:hover {
      background: var(--secondary-background-color, #f5f5f5);
    }

    .volume-button ha-icon {
      --mdc-icon-size: 24px;
    }

    .volume-slider {
      flex: 1;
      height: 4px;
      border-radius: 2px;
      background: var(--divider-color, rgba(0,0,0,0.12));
      outline: none;
      -webkit-appearance: none;
      cursor: pointer;
    }

    .volume-slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: var(--primary-color, #03a9f4);
      cursor: pointer;
      transition: all 0.2s;
    }

    .volume-slider::-webkit-slider-thumb:hover {
      transform: scale(1.2);
    }

    .volume-slider::-moz-range-thumb {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: var(--primary-color, #03a9f4);
      cursor: pointer;
      border: none;
      transition: all 0.2s;
    }

    .volume-slider::-moz-range-thumb:hover {
      transform: scale(1.2);
    }

    .volume-value {
      font-size: 0.875em;
      color: var(--secondary-text-color, rgba(0,0,0,0.6));
      min-width: 40px;
      text-align: right;
    }

    .error {
      padding: 16px;
      color: var(--error-color, #f44336);
      text-align: center;
    }

    /* Compact View */
    ha-card.compact .card-content {
      flex-direction: row;
      align-items: center;
      padding: 12px;
    }

    ha-card.compact .media-artwork {
      width: 120px;
      height: 120px;
    }

    ha-card.compact .media-section {
      gap: 8px;
    }

    ha-card.compact .media-controls {
      margin-top: 8px;
      padding-top: 8px;
    }

    /* Responsive */
    @media (max-width: 600px) {
      .card-content {
        flex-direction: column;
      }

      .media-artwork {
        width: 100%;
        max-width: 300px;
        margin: 0 auto;
      }
    }
  `;
}
