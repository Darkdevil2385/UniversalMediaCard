import { MediaSourceHandler, MediaSourceState, MediaSourceType } from "../types";
export declare class SkyQHandler implements MediaSourceHandler {
    getAppIcon(state: MediaSourceState): string | undefined;
    getAppName(state: MediaSourceState): string | undefined;
    getMediaTitle(state: MediaSourceState): string | undefined;
    getMediaSubtitle(state: MediaSourceState): string | undefined;
    getMediaImage(state: MediaSourceState): string | undefined;
    canPlay(state: MediaSourceState): boolean;
    canPause(state: MediaSourceState): boolean;
    canControl(state: MediaSourceState): boolean;
}
export declare class AndroidTVHandler implements MediaSourceHandler {
    getAppIcon(state: MediaSourceState): string | undefined;
    getAppName(state: MediaSourceState): string | undefined;
    getMediaTitle(state: MediaSourceState): string | undefined;
    getMediaSubtitle(state: MediaSourceState): string | undefined;
    getMediaImage(state: MediaSourceState): string | undefined;
    canPlay(state: MediaSourceState): boolean;
    canPause(state: MediaSourceState): boolean;
    canControl(state: MediaSourceState): boolean;
}
export declare class SpotifyHandler implements MediaSourceHandler {
    getAppIcon(state: MediaSourceState): string | undefined;
    getAppName(state: MediaSourceState): string | undefined;
    getMediaTitle(state: MediaSourceState): string | undefined;
    getMediaSubtitle(state: MediaSourceState): string | undefined;
    getMediaImage(state: MediaSourceState): string | undefined;
    canPlay(state: MediaSourceState): boolean;
    canPause(state: MediaSourceState): boolean;
    canControl(state: MediaSourceState): boolean;
}
export declare class GenericHandler implements MediaSourceHandler {
    getAppIcon(state: MediaSourceState): string | undefined;
    getAppName(state: MediaSourceState): string | undefined;
    getMediaTitle(state: MediaSourceState): string | undefined;
    getMediaSubtitle(state: MediaSourceState): string | undefined;
    getMediaImage(state: MediaSourceState): string | undefined;
    canPlay(state: MediaSourceState): boolean;
    canPause(state: MediaSourceState): boolean;
    canControl(state: MediaSourceState): boolean;
}
export declare function getHandlerForType(type: MediaSourceType): MediaSourceHandler;
