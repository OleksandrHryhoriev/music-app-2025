export const SPOTIFY_CLIENT_ID: string = process.env.SPOTIFY_CLIENT_ID || "";
export const SPOTIFY_CLIENT_SECRET: string =
   process.env.SPOTIFY_CLIENT_SECRET || "";
export const basicAuth: string = Buffer.from(
   `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
).toString("base64");

export const SPOTIFY_AUTH_ENDPOINT: string =
   "https://accounts.spotify.com/authorize?";
export const SPOTIFY_TOKEN_ENDPOINT: string =
   "https://accounts.spotify.com/api/token";

const scopes: string[] = [
   "user-read-email",
   "user-read-playback-state",
   "user-read-currently-playing",
   "user-library-read",
   "playlist-read-private",
   "playlist-modify-private",
   "playlist-modify-public",
   "streaming",
   "playlist-read-private",
   "playlist-read-collaborative",
];

const params: { scope: string } = {
   scope: scopes.join(","),
};
const queryParams = new URLSearchParams(params);

export const SPOTIFY_LOGIN_URL: string = `${SPOTIFY_AUTH_ENDPOINT}${queryParams}`;

// PATHs
// User based paths
export const USER_PLAYLISTS_PATH = "v1/me/playlists";

// General paths
export const PLAYLIST_PATH = "v1/playlists/"; // + id
