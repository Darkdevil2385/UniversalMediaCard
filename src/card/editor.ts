import { html, LitElement, TemplateResult, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { HomeAssistant } from "../ha/types";
import { UniversalMediaCardConfig, MediaSourceConfig, MediaSourceType } from "../types";

@customElement("universal-media-card-editor")
export class UniversalMediaCardEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ attribute: false }) public config!: UniversalMediaCardConfig;
  @state() private _sources: MediaSourceConfig[] = [];

  setConfig(config: UniversalMediaCardConfig): void {
    this.config = config;
    this._sources = config.sources || [];
  }

  private _addSource(): void {
    this._sources = [
      ...this._sources,
      {
        entity: "",
        type: "generic",
        name: "",
      },
    ];
    this._updateConfig();
  }

  private _removeSource(index: number): void {
    this._sources = this._sources.filter((_, i) => i !== index);
    this._updateConfig();
  }

  private _updateSource(index: number, updates: Partial<MediaSourceConfig>): void {
    this._sources = this._sources.map((source, i) =>
      i === index ? { ...source, ...updates } : source
    );
    this._updateConfig();
  }

  private _updateConfig(): void {
    const config: UniversalMediaCardConfig = {
      ...this.config,
      sources: this._sources,
    };

    const event = new CustomEvent("config-changed", {
      detail: { config },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  private _getMediaPlayerEntities(): string[] {
    if (!this.hass) return [];
    return Object.keys(this.hass.states).filter((e) => e.startsWith("media_player."));
  }

  private _fireEvent(type: string, detail?: any): void {
    const event = new CustomEvent(type, {
      detail,
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  protected render(): TemplateResult {
    if (!this.hass) {
      return html`<div>Loading...</div>`;
    }

    return html`
      <div class="card-config">
        <div class="config-section">
          <h3>Medienquellen</h3>
          ${this._sources.map((source, index) => html`
            <div class="source-config">
              <div class="source-row">
                <ha-entity-picker
                  .hass="${this.hass}"
                  .value="${source.entity}"
                  .label="Entity"
                  .filter="${(entity: any) => entity.entity_id.startsWith('media_player.')}"
                  @value-changed="${(e: CustomEvent) => {
                    this._updateSource(index, { entity: e.detail.value });
                  }}"
                ></ha-entity-picker>
                <select
                  class="type-select"
                  .value="${source.type}"
                  @change="${(e: Event) => {
                    const target = e.target as HTMLSelectElement;
                    this._updateSource(index, { type: target.value as MediaSourceType });
                  }}"
                >
                  <option value="skyq">SkyQ</option>
                  <option value="android_tv">Android TV</option>
                  <option value="spotify">Spotify</option>
                  <option value="generic">Generic</option>
                </select>
                <ha-textfield
                  label="Name (optional)"
                  .value="${source.name || ""}"
                  @input="${(e: Event) => {
                    const target = e.target as HTMLInputElement;
                    this._updateSource(index, { name: target.value });
                  }}"
                ></ha-textfield>
                <ha-icon-button
                  icon="mdi:delete"
                  @click="${() => this._removeSource(index)}"
                ></ha-icon-button>
              </div>
              <div class="source-row">
                <ha-entity-picker
                  .hass="${this.hass}"
                  .value="${source.audio_source || ""}"
                  .label="Audio-Quelle (optional)"
                  .filter="${(entity: any) => entity.entity_id.startsWith('media_player.')}"
                  @value-changed="${(e: CustomEvent) => {
                    this._updateSource(index, { audio_source: e.detail.value || undefined });
                  }}"
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
            .value="${this.config.default_source || ""}"
            @change="${(e: Event) => {
              const target = e.target as HTMLSelectElement;
              this._fireEvent("config-changed", {
                config: {
                  ...this.config,
                  default_source: target.value || undefined,
                },
              });
            }}"
          >
            <option value="">Keine</option>
            ${this._sources.map((source) => html`
              <option .value="${source.entity}">
                ${source.name || source.entity}
              </option>
            `)}
          </select>

          <ha-formfield label="App-Icon anzeigen">
            <ha-switch
              .checked="${this.config.show_app_icon !== false}"
              @change="${(e: Event) => {
                const target = e.target as HTMLInputElement;
                this._fireEvent("config-changed", {
                  config: {
                    ...this.config,
                    show_app_icon: target.checked,
                  },
                });
              }}"
            ></ha-switch>
          </ha-formfield>

          <ha-formfield label="Kompakte Ansicht">
            <ha-switch
              .checked="${this.config.compact_view === true}"
              @change="${(e: Event) => {
                const target = e.target as HTMLInputElement;
                this._fireEvent("config-changed", {
                  config: {
                    ...this.config,
                    compact_view: target.checked,
                  },
                });
              }}"
            ></ha-switch>
          </ha-formfield>

          <ha-formfield label="Source-Selector ausblenden">
            <ha-switch
              .checked="${this.config.hide_source_selector === true}"
              @change="${(e: Event) => {
                const target = e.target as HTMLInputElement;
                this._fireEvent("config-changed", {
                  config: {
                    ...this.config,
                    hide_source_selector: target.checked,
                  },
                });
              }}"
            ></ha-switch>
          </ha-formfield>
        </div>
      </div>
    `;
  }

  static styles = css`
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
  `;
}
