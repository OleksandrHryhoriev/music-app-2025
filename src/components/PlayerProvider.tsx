"use client";

import { useEffect } from "react";
import { ClientProvider } from "../music/providers/types";
import { usePlayerStore } from "../music/stores/playerStore";
import { createPlaybackEngine } from "../music/engine/createEngine";
import { useLocalPlayer } from "../music/player/useLocalPlayer";

export function PlayerProvider({ provider }: { provider: ClientProvider }) {
   const engine = usePlayerStore((s) => s.engine);
   const setEngine = usePlayerStore((s) => s.setEngine);

   useEffect(() => {
      if (engine) return;

      const e = createPlaybackEngine(provider);
      setEngine(e);
   }, [engine, setEngine, provider]);

   useLocalPlayer(provider);

   return null;
}
