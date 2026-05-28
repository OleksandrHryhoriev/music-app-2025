import { RepeatMode } from "@/src/music/player/repeatMode";

export type SpotifyRepeatMode = "off" | "context" | "track";

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

export function fromSpotifyRepeat(mode: SpotifyRepeatMode): RepeatMode {
   switch (mode) {
      case "off":
         return "off";
      case "context":
         return "all";
      case "track":
         return "one";
      default:
         return "off";
   }
}
