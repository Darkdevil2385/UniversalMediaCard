import { html, LitElement, TemplateResult, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { HomeAssistant } from "../ha/types";
import { UniversalMediaCardConfig, MediaSourceConfig, MediaSourceState, MediaSourceType } from "../types";
import { registerCustomCard } from "../utils/custom-cards";
import { getHandlerForType } from "../handlers/media-source-handlers";

// Priorität: welcher State wird angezeigt (niedriger = bevorzugt)
const STATE_PRIORITY: Record<string, number> = {
  playing: 0,
  paused: 1,
  idle: 2,
  standby: 3,
  on: 4,
  off: 5,
  unavailable: 6,
  unknown: 7,
};

registerCustomCard({
  type: "universal-media-card",
  name: "Universal Media Card",
  description: "Universal Media Card – eine Karte, automatische Quellenauswahl",
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
    };
  }

  setConfig(config: UniversalMediaCardConfig): void {
    if (!config.sources || config.sources.length === 0) {
      throw new Error("Mindestens eine Quelle muss konfiguriert sein");
    }
    this._config = {
      show_app_icon: true,
      ...config,
    };
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

    this._activeSource = this._computeActiveSource();
    this.requestUpdate();
  }

  protected updated(changedProperties: Map<string | number | symbol, unknown>): void {
    if (changedProperties.has("hass")) {
      this._updateSourceStates();
    }
  }

  /** Ermittelt die aktuell anzuzeigende Quelle: playing > paused > idle > standby > off, sonst default/first */
  private _computeActiveSource(): string {
    const sources = this._config.sources;
    if (!sources.length) return "";

    let bestEntity = sources[0].entity;
    let bestPriority = 999;

    for (const source of sources) {
      const s = this._sourceStates.get(source.entity);
      const state = s?.state ?? "unavailable";
      const priority = STATE_PRIORITY[state] ?? 8;
      if (priority < bestPriority) {
        bestPriority = priority;
        bestEntity = source.entity;
      }
    }

    const defaultId = this._config.default_source || sources[0].entity;
    if (bestPriority >= 5) return defaultId;
    return bestEntity;
  }

  private _getActiveSourceConfig(): MediaSourceConfig | undefined {
    return this._config.sources.find((s) => s.entity === this._activeSource);
  }

  private _getActiveSourceState(): MediaSourceState | undefined {
    return this._activeSource ? this._sourceStates.get(this._activeSource) : undefined;
  }

  /** Für Lautstärke: immer die audio_source (Receiver) verwenden, falls konfiguriert */
  private _getVolumeEntity(): string | undefined {
    const config = this._getActiveSourceConfig();
    if (!config) return undefined;
    return config.audio_source || config.entity;
  }

  private _getVolumeLevel(): number {
    const entityId = this._getVolumeEntity();
    if (!entityId) return 0;
    const entity = this.hass?.states[entityId];
    return entity?.attributes?.volume_level ?? 0;
  }

  private _getIsVolumeMuted(): boolean {
    const entityId = this._getVolumeEntity();
    if (!entityId) return false;
    const entity = this.hass?.states[entityId];
    return entity?.attributes?.is_volume_muted ?? false;
  }

  private async _callService(service: string, serviceData?: Record<string, any>): Promise<void> {
    const activeSource = this._getActiveSourceConfig();
    if (!activeSource) return;

    let entityId = serviceData?.entity_id ?? activeSource.entity;
    if (service === "volume_set" || service === "volume_mute") {
      entityId = this._getVolumeEntity() || entityId;
    }

    await this.hass.callService("media_player", service, {
      entity_id: entityId,
      ...serviceData,
    });
    this._updateSourceStates();
  }

  private _getMediaImageUrl(state: MediaSourceState): string | undefined {
    const image =
      state.attributes.entity_picture ||
      state.attributes.media_image_url ||
      state.attributes.media_thumbnail;
    if (!image) return undefined;
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
          <img src="${imageUrl}" alt="" />
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
        ${appName && appName !== entityName
          ? html`<div class="app-name">${appName}</div>`
          : nothing}
        ${title ? html`<div class="media-title">${title}</div>` : nothing}
        ${subtitle ? html`<div class="media-subtitle">${subtitle}</div>` : nothing}
        <div class="media-state">${this._formatState(state.state)}</div>
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
      on: "An",
      unavailable: "Nicht verfügbar",
    };
    return stateMap[state] || state;
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
    const volumeLevel = this._getVolumeLevel();
    const isMuted = this._getIsVolumeMuted();

    return html`
      <div class="media-controls">
        <button
          class="control-button"
          @click="${() => this._callService("media_previous_track")}"
          ?disabled="${!canControl}"
          title="Vorheriger"
        >
          <ha-icon icon="mdi:skip-previous"></ha-icon>
        </button>
        ${isPlaying && canPause
          ? html`
              <button
                class="control-button play-pause"
                @click="${() => this._callService("media_pause")}"
                title="Pause"
              >
                <ha-icon icon="mdi:pause"></ha-icon>
              </button>
            `
          : html`
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
          title="Nächster"
        >
          <ha-icon icon="mdi:skip-next"></ha-icon>
        </button>
      </div>
      <div class="volume-controls">
        <button
          class="volume-button"
          @click="${() => this._callService("volume_mute")}"
          title="${isMuted ? "Stummschaltung aufheben" : "Stummschalten"}"
        >
          <ha-icon
            icon="${isMuted
              ? "mdi:volume-mute"
              : volumeLevel > 0.5
                ? "mdi:volume-high"
                : volumeLevel > 0
                  ? "mdi:volume-medium"
                  : "mdi:volume-low"
            }"
          ></ha-icon>
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
              volume_level: parseFloat(target.value),
            });
          }}"
          title="Lautstärke"
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
    if (!state) {
      return html`
        <ha-card>
          <div class="empty">Keine Medienquelle verfügbar</div>
        </ha-card>
      `;
    }

    return html`
      <ha-card>
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
  `;
}
