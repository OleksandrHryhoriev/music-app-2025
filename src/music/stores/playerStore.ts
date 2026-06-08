"use client";

import { PlaybackTrack } from "@/src/types/types";
import { create } from "zustand";
import { PlaybackEngine } from "../engine/types";
import { RepeatMode } from "../player/repeatMode";
import { saveVolume } from "@/src/utils/volumeStorage";

export type SetPlayerType = (
   updater: Partial<PlayerState> | ((s: PlayerState) => Partial<PlayerState>),
) => void;

export type PlayerState = {
   engine: PlaybackEngine | null;
   contextUri: string | null;
   contextTracks: string[];
   currentIndex: number;
   track: PlaybackTrack | null;
   nextTrack: PlaybackTrack | null;
   prevTrack: PlaybackTrack | null;
   isPlaying: boolean;
   duration: number;
   progress: number;
   sdkTimeStamp: number;
   repeatMode: RepeatMode;
   shuffleState: boolean;
   lastUpdated: number;
   deviceId: string | null;
   volume: number;

   setEngine: (engine: PlaybackEngine) => void;
   setPlayer: SetPlayerType;
   setVolume: (volume: number) => void;
};

export const usePlayerStore = create<PlayerState>((set) => ({
   engine: null,
   contextUri: null,
   contextTracks: [],
   currentIndex: 0,
   track: null,
   nextTrack: null,
   prevTrack: null,
   isPlaying: false,
   duration: 0,
   progress: 0,
   sdkTimeStamp: 0,
   repeatMode: "off",
   shuffleState: false,
   lastUpdated: 0,
   deviceId: null,
   volume: 0,

   setEngine: (engine) => set({ engine }),
   setPlayer: (updater) =>
      set((state) => {
         const next = typeof updater === "function" ? updater(state) : updater;
         return {
            ...state,
            ...next,
            lastUpdated: performance.now(),
         };
      }),
   setVolume: (volume) => {
      saveVolume(volume);
      set({ volume });
   },
}));
