const DEFAULT_VOLUME = 50;
const VOLUME_KEY = "player-volume";

export function loadVolume(): number {
   if (typeof window === "undefined") {
      return DEFAULT_VOLUME;
   }

   const stored = Number(localStorage.getItem(VOLUME_KEY));

   return Number.isFinite(stored) && stored >= 0 && stored <= 100
      ? stored
      : DEFAULT_VOLUME;
}

export function saveVolume(volume: number): void {
   localStorage.setItem(VOLUME_KEY, String(volume));
}
