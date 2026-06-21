import { MusicProviderClient } from "../types";
import {
   SpotifyAlbumListSchema,
   SpotifyArtistListSchema,
   SpotifyArtistSchema,
   SpotifyCurrentTrackSchema,
   SpotifyPlaylistListSchema,
   SpotifyPlaylistSchema,
   SpotifyUserSchema,
} from "./schemas";
import getSpotifyPath, { SPOTIFY_PATH } from "./endpoints";
import {
   ArtistType,
   CurrentTrackType,
   LibItemType,
   PlaylistType,
   UserProfile,
} from "@/src/types/types";
import requestMusicApi from "../../api/requestMusicApi";
import fetchMusicApi from "../../api/fetchMusicApi";
import { handleApiErrors } from "../../errors";

export const sporifyClient: MusicProviderClient = {
   // User
   async getUserProfile(id) {
      const path = getSpotifyPath(SPOTIFY_PATH.user.user + id);
      const [error, data] = await requestMusicApi(path, SpotifyUserSchema);

      if (!error) {
         return data as UserProfile;
      }
      return handleApiErrors(error);
   },
   async getMyProfile() {
      const path = getSpotifyPath(SPOTIFY_PATH.user.me);
      const [error, data] = await requestMusicApi(path, SpotifyUserSchema);

      if (!error) {
         return data as UserProfile;
      }
      return handleApiErrors(error);
   },
   // Library
   async getPlaylistList() {
      const path = getSpotifyPath(SPOTIFY_PATH.library.playlistList);
      const data = await fetchMusicApi(path);
      const parsed = SpotifyPlaylistListSchema.parse(data);

      return parsed.items as LibItemType[];
   },
   async getAlbumList() {
      const path = getSpotifyPath(SPOTIFY_PATH.library.albumList);
      const data = await fetchMusicApi(path);
      const parsed = SpotifyAlbumListSchema.parse(data);

      return parsed.items as LibItemType[];
   },
   async getArtistList() {
      const path = getSpotifyPath(SPOTIFY_PATH.library.artistList);
      const data = await fetchMusicApi(path);
      const parsed = SpotifyArtistListSchema.parse(data);

      return parsed.items as LibItemType[];
   },
   async getLibrary() {
      const p = await this.getPlaylistList?.();
      const art = await this.getArtistList?.();
      const alb = await this.getAlbumList?.();

      return [...(p ?? []), ...(art ?? []), ...(alb ?? [])];
   },

   // Main page
   async getPlaylist(id) {
      const path = getSpotifyPath(SPOTIFY_PATH.playlist + id);
      const [error, data] = await requestMusicApi(path, SpotifyPlaylistSchema);

      if (!error) {
         return data as PlaylistType;
      }
      return handleApiErrors(error);
   },
   async getArtist(id) {
      const path = getSpotifyPath(SPOTIFY_PATH.artist + id);
      const [error, data] = await requestMusicApi(path, SpotifyArtistSchema);

      if (!error) {
         return data as ArtistType;
      }
      return handleApiErrors(error);
   },
   // Player actions
   async getCurrentTrack() {
      const path = getSpotifyPath(SPOTIFY_PATH.player.current);
      const [error, data] = await requestMusicApi(
         path,
         SpotifyCurrentTrackSchema,
      );

      if (!error) {
         return data as CurrentTrackType;
      }
      return handleApiErrors(error);
   },
};
