/** Alle bekannten HA media_player Attribute für Titel (Reihenfolge = Priorität) */
const TITLE_ATTRS = [
    "media_title",
    "media_series_title",
    "media_channel",
    "source",
    "app_name",
    "friendly_name",
];
/** Alle bekannten Attribute für Untertitel / zweite Zeile */
const SUBTITLE_ATTRS = [
    "media_artist",
    "media_album_name",
    "media_channel",
    "source",
    "app_name",
];
/** Erste nicht-leere Zeichenkette aus den angegebenen Attributen */
function firstNonEmpty(state, keys) {
    const attrs = state.attributes;
    for (const key of keys) {
        const v = attrs[key];
        if (v != null && String(v).trim() !== "")
            return String(v).trim();
    }
    return undefined;
}
/** Beste Titel-Zeile aus dem State (alle gängigen HA-Attribute) */
export function getBestTitle(state) {
    return firstNonEmpty(state, TITLE_ATTRS);
}
/** Untertitel: z.B. Künstler, Album, Staffel/Episode, Kanal */
export function getBestSubtitle(state) {
    const attrs = state.attributes;
    if (attrs.media_series_title && (attrs.media_season != null || attrs.media_episode != null)) {
        const s = attrs.media_season != null ? String(attrs.media_season) : "?";
        const e = attrs.media_episode != null ? String(attrs.media_episode) : "?";
        return `S${s} E${e}`;
    }
    if (attrs.media_artist && attrs.media_album_name) {
        return `${attrs.media_artist} • ${attrs.media_album_name}`;
    }
    return firstNonEmpty(state, SUBTITLE_ATTRS);
}
/** Erstes verfügbares Bild-URL-Attribut */
const IMAGE_ATTRS = ["entity_picture", "media_image_url", "media_thumbnail"];
export function getBestImage(state) {
    for (const key of IMAGE_ATTRS) {
        const v = state.attributes[key];
        if (v != null && String(v).trim() !== "")
            return String(v).trim();
    }
    return undefined;
}
/** Relevante Media-Attribute für Debug-Anzeige (nur gesetzte Werte) */
const DEBUG_ATTRS = [
    "media_title",
    "media_series_title",
    "media_season",
    "media_episode",
    "media_artist",
    "media_album_name",
    "media_channel",
    "source",
    "app_name",
    "app_id",
    "entity_picture",
    "media_image_url",
    "media_thumbnail",
];
export function getRelevantAttributes(state) {
    const out = {};
    const attrs = state.attributes;
    for (const key of DEBUG_ATTRS) {
        if (attrs[key] !== undefined && attrs[key] !== null && attrs[key] !== "") {
            const v = attrs[key];
            if (typeof v === "string" && v.length > 80) {
                out[key] = v.substring(0, 80) + "…";
            }
            else {
                out[key] = v;
            }
        }
    }
    return out;
}
