import { HomeAssistant } from "./ha/types";

export type MediaSourceType = "skyq" | "android_tv" | "spotify" | "generic";

export interface MediaSourceConfig {
  entity: string;
  type: MediaSourceType;
  name?: string;
  audio_source?: string;
  icon?: string;
}

export interface UniversalMediaCardConfig {
  type: "custom:universal-media-card";
  sources: MediaSourceConfig[];
  default_source?: string;
  show_app_icon?: boolean;
  compact_view?: boolean;
  hide_source_selector?: boolean;
  title?: string;
}

export interface MediaSourceState {
  entity: string;
  state: string;
  attributes: {
    media_title?: string;
    media_artist?: string;
    media_album_name?: string;
    media_content_type?: string;
    media_content_id?: string;
    app_name?: string;
    app_id?: string;
    entity_picture?: string;
    media_image_url?: string;
    media_image_remotely_accessible?: boolean;
    volume_level?: number;
    is_volume_muted?: boolean;
    supported_features?: number;
    [key: string]: any;
  };
}

export interface MediaSourceHandler {
  getAppIcon(state: MediaSourceState): string | undefined;
  getAppName(state: MediaSourceState): string | undefined;
  getMediaTitle(state: MediaSourceState): string | undefined;
  getMediaSubtitle(state: MediaSourceState): string | undefined;
  getMediaImage(state: MediaSourceState): string | undefined;
  canPlay(state: MediaSourceState): boolean;
  canPause(state: MediaSourceState): boolean;
  canControl(state: MediaSourceState): boolean;
}
