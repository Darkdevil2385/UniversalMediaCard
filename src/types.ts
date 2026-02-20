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
  /** Zeigt die von der Entity gelieferten Media-Attribute an (zum Prüfen, was Gerät/Integration liefert) */
  show_attributes?: boolean;
  /** Entity (z. B. sensor.tmdb_artwork_fallback): Bild-URL als Fallback, wenn die Quelle kein Artwork liefert (State = URL). */
  artwork_fallback_entity?: string;
}

export interface MediaSourceState {
  entity: string;
  state: string;
  attributes: {
    media_title?: string;
    media_series_title?: string;
    media_season?: number | string;
    media_episode?: number | string;
    media_artist?: string;
    media_album_name?: string;
    media_channel?: string;
    media_content_type?: string;
    media_content_id?: string;
    app_name?: string;
    app_id?: string;
    source?: string;
    entity_picture?: string;
    media_image_url?: string;
    media_thumbnail?: string;
    media_image_remotely_accessible?: boolean;
    volume_level?: number;
    is_volume_muted?: boolean;
    supported_features?: number;
    friendly_name?: string;
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
