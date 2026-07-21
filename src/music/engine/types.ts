import { RepeatMode } from "../player/repeatMode";

export type BaseEngine = {
   play: (uri: string | string[], index?: number | null) => Promise<void>;
   resume: () => Promise<void>;
   pause: () => Promise<void>;
   seek: (positionMs: number) => Promise<void>;
   repeat: (mode: RepeatMode) => Promise<void>;
   shuffle: (state: boolean) => Promise<void>;
   next: () => Promise<void>;
   previous: () => Promise<void>;
   volume: (value: number) => Promise<void>;
};

export type SpotifyEngine = BaseEngine & {
   playbackType: "local";
   sdk: Spotify.Player | null;
   resumeLocal: () => Promise<void>;
   togglePlayLocal: () => Promise<void>;
};

export type RemoteEngine = BaseEngine & {
   playbackType: "remote";
};

export type PlaybackEngine = SpotifyEngine | RemoteEngine;
