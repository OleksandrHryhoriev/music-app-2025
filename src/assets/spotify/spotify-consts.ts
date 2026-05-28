export const SPOTIFY_CLIENT_ID: string = process.env.SPOTIFY_CLIENT_ID || "";
export const SPOTIFY_CLIENT_SECRET: string =
   process.env.SPOTIFY_CLIENT_SECRET || "";
export const basicAuth: string = Buffer.from(
   `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`,
).toString("base64");

export const SPOTIFY_AUTH_ENDPOINT: string =
   "https://accounts.spotify.com/authorize?";
export const SPOTIFY_TOKEN_ENDPOINT: string =
   "https://accounts.spotify.com/api/token";

const scopes: readonly string[] = [
   "user-read-email",
   "user-read-private",
   "user-read-playback-state",
   "user-modify-playback-state",
   "user-read-currently-playing",
   "user-library-read",
   "user-follow-read",
   "user-follow-modify",
   "user-read-playback-position",
   "user-top-read",
   "user-read-recently-played",
   "playlist-read-private",
   "playlist-modify-private",
   "playlist-modify-public",
   "streaming",
   "playlist-read-collaborative",
];

const params: { scope: string } = {
   scope: scopes.join(","),
};
const queryParams = new URLSearchParams(params);

export const SPOTIFY_LOGIN_URL: string = `${SPOTIFY_AUTH_ENDPOINT}${queryParams}`;

export const SPOTIFY_REPEAT_STATES: readonly string[] = [
   "off",
   "context",
   "track",
];
