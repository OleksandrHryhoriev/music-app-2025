// Auth
export const SPOTIFY_CLIENT_ID: string = process.env.SPOTIFY_CLIENT_ID || "";
export const SPOTIFY_CLIENT_SECRET: string =
   process.env.SPOTIFY_CLIENT_SECRET || "";
export const SPOTIFY_AUTH_HEADER: string =
   "Basic " +
   Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString(
      "base64",
   );

export const SPOTIFY_AUTH_ENDPOINT: string =
   "https://accounts.spotify.com/authorize?";
export const SPOTIFY_TOKEN_ENDPOINT: string =
   "https://accounts.spotify.com/api/token";

// =======================================================================

// API
export const SPOTIFY_BASE_URL = "https://api.spotify.com/v1";

export const SPOTIFY_PATH = {
   user: {
      me: "/me",
      user: "/users/", // + id
   },
   library: {
      playlistList: "/me/playlists",
      artistList: "/me/following?type=artist",
      albumList: "/me/albums",
   },
   player: {
      player: "/me/player",
      current: "/me/player/currently-playing",
      play: "/me/player/play",
      pause: "/me/player/pause",
      next: "/me/player/next",
      previous: "/me/player/previous",
      repeat: "/me/player/repeat?state=", //+context, track, off
      shuffle: "/me/player/shuffle?state=", //+boolean
      seek: "/me/player/seek?position_ms=", //+ms
      volume: "/me/player/volume?volume_percent=", //+value(0-100)
   },
   playlist: "/playlists/", // + id
   artist: "/artists/", // + id
   album: "/albums/", // + id
   track: "/tracks/", // + id
};

export default function getSpotifyPath(endpoint: string) {
   return `${SPOTIFY_BASE_URL}${endpoint}`;
}
