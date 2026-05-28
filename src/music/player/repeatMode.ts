export type RepeatMode = "off" | "one" | "all";

export function getNextRepeat(mode: RepeatMode): RepeatMode {
   switch (mode) {
      case "off":
         return "all";
      case "all":
         return "one";
      case "one":
         return "off";
      default:
         return "off";
   }
}
