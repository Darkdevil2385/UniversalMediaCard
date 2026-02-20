import { LitElement, TemplateResult } from "lit";
import { HomeAssistant } from "../ha/types";
import { UniversalMediaCardConfig } from "../types";
export declare class UniversalMediaCard extends LitElement {
    hass: HomeAssistant;
    private _config;
    private _activeSource?;
    private _sourceStates;
    static getConfigElement(): Promise<HTMLElement>;
    static getStubConfig(hass: HomeAssistant): Promise<UniversalMediaCardConfig>;
    setConfig(config: UniversalMediaCardConfig): void;
    connectedCallback(): void;
    private _updateSourceStates;
    protected updated(changedProperties: Map<string | number | symbol, unknown>): void;
    /** Ermittelt die aktuell anzuzeigende Quelle: playing > paused > idle > standby > off, sonst default/first */
    private _computeActiveSource;
    private _getActiveSourceConfig;
    private _getActiveSourceState;
    /** Für Lautstärke: immer die audio_source (Receiver) verwenden, falls konfiguriert */
    private _getVolumeEntity;
    private _getVolumeLevel;
    private _getIsVolumeMuted;
    private _callService;
    private _getMediaImageUrl;
    private _renderMediaArtwork;
    private _renderMediaInfo;
    private _renderAttributesDebug;
    private _formatState;
    private _renderMediaControls;
    protected render(): TemplateResult;
    static styles: import("lit").CSSResult;
}
