var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
let UniversalMediaCardEditor = class UniversalMediaCardEditor extends LitElement {
    constructor() {
        super(...arguments);
        this._sources = [];
    }
    setConfig(config) {
        this.config = config;
        this._sources = config.sources || [];
    }
    _addSource() {
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
    _removeSource(index) {
        this._sources = this._sources.filter((_, i) => i !== index);
        this._updateConfig();
    }
    _updateSource(index, updates) {
        this._sources = this._sources.map((source, i) => i === index ? { ...source, ...updates } : source);
        this._updateConfig();
    }
    _updateConfig() {
        const config = {
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
    _getMediaPlayerEntities() {
        if (!this.hass)
            return [];
        return Object.keys(this.hass.states).filter((e) => e.startsWith("media_player."));
    }
    _fireEvent(type, detail) {
        const event = new CustomEvent(type, {
            detail,
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(event);
    }
    render() {
        if (!this.hass) {
            return html `<div>Loading...</div>`;
        }
        return html `
      <div class="card-config">
        <div class="config-section">
          <h3>Medienquellen</h3>
          ${this._sources.map((source, index) => html `
            <div class="source-config">
              <div class="source-row">
                <ha-entity-picker
                  .hass="${this.hass}"
                  .value="${source.entity}"
                  .label="Entity"
                  .filter="${(entity) => entity.entity_id.startsWith('media_player.')}"
                  @value-changed="${(e) => {
            this._updateSource(index, { entity: e.detail.value });
        }}"
                ></ha-entity-picker>
                <select
                  class="type-select"
                  .value="${source.type}"
                  @change="${(e) => {
            const target = e.target;
            this._updateSource(index, { type: target.value });
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
                  @input="${(e) => {
            const target = e.target;
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
                  .filter="${(entity) => entity.entity_id.startsWith('media_player.')}"
                  @value-changed="${(e) => {
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
          <p class="config-hint">Die Karte zeigt automatisch die aktive Quelle (z. B. Wiedergabe &gt; Pausiert &gt; Bereit). Lautstärke steuert immer die Audio-Quelle (Receiver), falls pro Quelle eingetragen.</p>
          <label class="select-label">Standard-Anzeige (wenn nichts abspielt)</label>
          <select
            class="default-source-select"
            .value="${this.config.default_source || ""}"
            @change="${(e) => {
            const target = e.target;
            this._fireEvent("config-changed", {
                config: {
                    ...this.config,
                    default_source: target.value || undefined,
                },
            });
        }}"
          >
            <option value="">Erste Quelle</option>
            ${this._sources.map((source) => html `
              <option .value="${source.entity}">
                ${source.name || source.entity}
              </option>
            `)}
          </select>

          <ha-formfield label="App-Icon/Artwork anzeigen">
            <ha-switch
              .checked="${this.config.show_app_icon !== false}"
              @change="${(e) => {
            const target = e.target;
            this._fireEvent("config-changed", {
                config: {
                    ...this.config,
                    show_app_icon: target.checked,
                },
            });
        }}"
            ></ha-switch>
          </ha-formfield>

          <ha-formfield label="Media-Attribute anzeigen (Debug)">
            <ha-switch
              .checked="${this.config.show_attributes === true}"
              @change="${(e) => {
            const target = e.target;
            this._fireEvent("config-changed", {
                config: {
                    ...this.config,
                    show_attributes: target.checked,
                },
            });
        }}"
            ></ha-switch>
          </ha-formfield>
          <p class="config-hint">Zeigt unter der Karte, welche Attribute die Entity liefert (media_title, app_name, entity_picture …). Nützlich um zu prüfen, ob Gerät/Integration Titel/Bild liefert.</p>
        </div>
      </div>
    `;
    }
};
UniversalMediaCardEditor.styles = css `
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
  `;
__decorate([
    property({ attribute: false })
], UniversalMediaCardEditor.prototype, "hass", void 0);
__decorate([
    property({ attribute: false })
], UniversalMediaCardEditor.prototype, "config", void 0);
__decorate([
    state()
], UniversalMediaCardEditor.prototype, "_sources", void 0);
UniversalMediaCardEditor = __decorate([
    customElement("universal-media-card-editor")
], UniversalMediaCardEditor);
export { UniversalMediaCardEditor };
