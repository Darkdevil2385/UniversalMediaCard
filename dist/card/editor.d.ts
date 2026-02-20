import { LitElement, TemplateResult } from "lit";
import { HomeAssistant } from "../ha/types";
import { UniversalMediaCardConfig } from "../types";
export declare class UniversalMediaCardEditor extends LitElement {
    hass: HomeAssistant;
    config: UniversalMediaCardConfig;
    private _sources;
    setConfig(config: UniversalMediaCardConfig): void;
    private _addSource;
    private _removeSource;
    private _updateSource;
    private _updateConfig;
    private _getMediaPlayerEntities;
    private _fireEvent;
    protected render(): TemplateResult;
    static styles: import("lit").CSSResult;
}
