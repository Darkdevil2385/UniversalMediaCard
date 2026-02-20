import { MediaSourceState } from "../types";
/** Beste Titel-Zeile aus dem State (alle gängigen HA-Attribute) */
export declare function getBestTitle(state: MediaSourceState): string | undefined;
/** Untertitel: z.B. Künstler, Album, Staffel/Episode, Kanal */
export declare function getBestSubtitle(state: MediaSourceState): string | undefined;
export declare function getBestImage(state: MediaSourceState): string | undefined;
export declare function getRelevantAttributes(state: MediaSourceState): Record<string, unknown>;
