import { RepeatMode } from "@/src/music/player/repeatMode";

export type SpotifyRepeatMode = "off" | "context" | "track";
export type SpotifySDKRepeatMode = 0 | 1 | 2;

export function toSpotifyRepeat(mode: RepeatMode): SpotifyRepeatMode {
   switch (mode) {
      case "off":
         return "off";
      case "all":
         return "context";
      case "one":
         return "track";
      default:
         return "off";
   }
}

export function fromSpotifySDKRepeat(mode: SpotifySDKRepeatMode): RepeatMode {
   switch (mode) {
      case 0:
         return "off";
      case 1:
         return "all";
      case 2:
         return "one";
      default:
         return "off";
   }
}
