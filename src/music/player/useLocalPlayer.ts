"use client";

import { useEffect } from "react";
import { ClientProvider } from "../providers/types";
import { usePlayerStore } from "../stores/playerStore";
import { setSpotifyLocalPlayer } from "../providers/spotify/sdk/spotifyLocalPlayer";

export function useLocalPlayer({ provider, playbackType }: ClientProvider) {
   const { engine, setPlayer } = usePlayerStore((s) => s);

   useEffect(() => {
      if (playbackType !== "local") {
         return;
      }
      if (!engine || engine.playbackType !== "local") return;

      switch (provider) {
         case "spotify":
            setSpotifyLocalPlayer(engine, setPlayer);
         // case "anotherProvider":
         //    anotherProviderLocalPlayer(engine, setPlayer);
         default:
            return;
      }
   }, [provider, playbackType, engine, setPlayer]);
}
