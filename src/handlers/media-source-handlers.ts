import { MediaSourceHandler, MediaSourceState, MediaSourceType } from "../types";
import { getBestImage, getBestSubtitle, getBestTitle } from "../utils/media-attributes";

function appIconFromAppName(state: MediaSourceState): string | undefined {
  const appId = (state.attributes.app_id || state.attributes.app_name || "").toString().toLowerCase();
  if (appId.includes("netflix")) return "mdi:netflix";
  if (appId.includes("youtube")) return "mdi:youtube";
  if (appId.includes("prime") || appId.includes("amazon")) return "mdi:amazon-prime";
  if (appId.includes("disney")) return "mdi:disney";
  if (appId.includes("spotify")) return "mdi:spotify";
  if (appId.includes("kodi")) return "mdi:kodi";
  if (appId.includes("magenta") || appId.includes("magentatv")) return "mdi:television";
  if (appId.includes("wow") || appId.includes("sky")) return "mdi:satellite-variant";
  return undefined;
}

export class SkyQHandler implements MediaSourceHandler {
  getAppIcon(state: MediaSourceState): string | undefined {
    const byApp = appIconFromAppName(state);
    if (byApp) return byApp;
    return state.attributes.entity_picture || "mdi:television";
  }

  getAppName(state: MediaSourceState): string | undefined {
    return state.attributes.app_name || "SkyQ";
  }

  getMediaTitle(state: MediaSourceState): string | undefined {
    return state.attributes.media_title
      || state.attributes.media_series_title
      || state.attributes.media_channel
      || getBestTitle(state)
      || state.attributes.friendly_name;
  }

  getMediaSubtitle(state: MediaSourceState): string | undefined {
    if (state.attributes.media_artist) return state.attributes.media_artist;
    if (state.attributes.media_series_title && (state.attributes.media_season != null || state.attributes.media_episode != null)) {
      return `S${state.attributes.media_season ?? "?"} E${state.attributes.media_episode ?? "?"}`;
    }
    return state.attributes.media_channel || getBestSubtitle(state);
  }

  getMediaImage(state: MediaSourceState): string | undefined {
    return getBestImage(state) || state.attributes.entity_picture
      || state.attributes.media_image_url
      || state.attributes.media_thumbnail;
  }

  canPlay(state: MediaSourceState): boolean {
    return state.state === "idle" || state.state === "paused" || state.state === "standby";
  }

  canPause(state: MediaSourceState): boolean {
    return state.state === "playing";
  }

  canControl(state: MediaSourceState): boolean {
    return (state.attributes.supported_features || 0) > 0;
  }
}

export class AndroidTVHandler implements MediaSourceHandler {
  getAppIcon(state: MediaSourceState): string | undefined {
    const byApp = appIconFromAppName(state);
    if (byApp) return byApp;
    return state.attributes.entity_picture || "mdi:television-box";
  }

  getAppName(state: MediaSourceState): string | undefined {
    return state.attributes.app_name || "Android TV";
  }

  getMediaTitle(state: MediaSourceState): string | undefined {
    return state.attributes.media_title
      || state.attributes.media_series_title
      || state.attributes.media_channel
      || getBestTitle(state)
      || state.attributes.friendly_name;
  }

  getMediaSubtitle(state: MediaSourceState): string | undefined {
    return state.attributes.media_artist
      || state.attributes.media_album_name
      || getBestSubtitle(state)
      || state.attributes.app_name;
  }

  getMediaImage(state: MediaSourceState): string | undefined {
    return getBestImage(state) || state.attributes.entity_picture
      || state.attributes.media_image_url
      || state.attributes.media_thumbnail;
  }

  canPlay(state: MediaSourceState): boolean {
    return state.state === "idle" || state.state === "paused" || state.state === "standby";
  }

  canPause(state: MediaSourceState): boolean {
    return state.state === "playing";
  }

  canControl(state: MediaSourceState): boolean {
    return (state.attributes.supported_features || 0) > 0;
  }
}

export class SpotifyHandler implements MediaSourceHandler {
  getAppIcon(state: MediaSourceState): string | undefined {
    return getBestImage(state) || "mdi:spotify";
  }

  getAppName(state: MediaSourceState): string | undefined {
    return "Spotify";
  }

  getMediaTitle(state: MediaSourceState): string | undefined {
    return state.attributes.media_title || getBestTitle(state);
  }

  getMediaSubtitle(state: MediaSourceState): string | undefined {
    if (state.attributes.media_artist) {
      return state.attributes.media_album_name
        ? `${state.attributes.media_artist} • ${state.attributes.media_album_name}`
        : state.attributes.media_artist;
    }
    return state.attributes.media_album_name || getBestSubtitle(state);
  }

  getMediaImage(state: MediaSourceState): string | undefined {
    return getBestImage(state) || state.attributes.entity_picture
      || state.attributes.media_image_url
      || state.attributes.media_thumbnail;
  }

  canPlay(state: MediaSourceState): boolean {
    return state.state === "idle" || state.state === "paused" || state.state === "standby";
  }

  canPause(state: MediaSourceState): boolean {
    return state.state === "playing";
  }

  canControl(state: MediaSourceState): boolean {
    return (state.attributes.supported_features || 0) > 0;
  }
}

export class GenericHandler implements MediaSourceHandler {
  getAppIcon(state: MediaSourceState): string | undefined {
    const byApp = appIconFromAppName(state);
    if (byApp) return byApp;
    return getBestImage(state) || "mdi:music-note";
  }

  getAppName(state: MediaSourceState): string | undefined {
    return state.attributes.app_name
      || state.attributes.friendly_name
      || "Media Player";
  }

  getMediaTitle(state: MediaSourceState): string | undefined {
    return getBestTitle(state) || state.attributes.friendly_name;
  }

  getMediaSubtitle(state: MediaSourceState): string | undefined {
    if (state.attributes.media_artist) {
      return state.attributes.media_album_name
        ? `${state.attributes.media_artist} • ${state.attributes.media_album_name}`
        : state.attributes.media_artist;
    }
    return getBestSubtitle(state) || state.attributes.source;
  }

  getMediaImage(state: MediaSourceState): string | undefined {
    return getBestImage(state) || state.attributes.entity_picture
      || state.attributes.media_image_url
      || state.attributes.media_thumbnail;
  }

  canPlay(state: MediaSourceState): boolean {
    return state.state === "idle" || state.state === "paused" || state.state === "standby";
  }

  canPause(state: MediaSourceState): boolean {
    return state.state === "playing";
  }

  canControl(state: MediaSourceState): boolean {
    return (state.attributes.supported_features || 0) > 0;
  }
}

export function getHandlerForType(type: MediaSourceType): MediaSourceHandler {
  switch (type) {
    case "skyq":
      return new SkyQHandler();
    case "android_tv":
      return new AndroidTVHandler();
    case "spotify":
      return new SpotifyHandler();
    case "generic":
    default:
      return new GenericHandler();
  }
}
