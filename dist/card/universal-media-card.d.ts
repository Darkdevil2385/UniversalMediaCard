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
    private _getActiveSourceConfig;
    private _getActiveSourceState;
    private _switchSource;
    private _callService;
    private _renderAppIcon;
    private _renderNowPlaying;
    private _renderSourceSelector;
    private _renderMediaControls;
    protected render(): TemplateResult;
    static styles: import("lit").CSSResult;
}
