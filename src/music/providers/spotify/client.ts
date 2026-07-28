import { MusicProviderClient } from "../types";
import {
   SpotifyAlbumListSchema,
   SpotifyAlbumSchema,
   SpotifyArtistListSchema,
   SpotifyArtistSchema,
   SpotifyArtistTopTraksSchema,
   SpotifyCurrentTrackSchema,
   SpotifyPlaylistListSchema,
   SpotifyPlaylistSchema,
   SpotifySeveralArtistsSchema,
   SpotifyTrackSchema,
   SpotifyUserSchema,
} from "./schemas";
import getSpotifyPath, { SPOTIFY_PATH } from "./endpoints";
import {
   AlbumType,
   ArtistType,
   CurrentTrackType,
   LibItemType,
   PlaylistType,
   TrackType,
   UserProfile,
} from "@/src/types/types";
import requestMusicApi from "../../api/requestMusicApi";
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
      const [error, data] = await requestMusicApi(
         path,
         SpotifyPlaylistListSchema,
      );

      if (!error) {
         return data as LibItemType[];
      }
      return handleApiErrors(error);
   },
   async getAlbumList() {
      const path = getSpotifyPath(SPOTIFY_PATH.library.albumList);
      const [error, data] = await requestMusicApi(path, SpotifyAlbumListSchema);

      if (!error) {
         return data as LibItemType[];
      }
      return handleApiErrors(error);
   },
   async getArtistList() {
      const path = getSpotifyPath(SPOTIFY_PATH.library.artistList);
      const [error, data] = await requestMusicApi(
         path,
         SpotifyArtistListSchema,
      );

      if (!error) {
         return data as LibItemType[];
      }
      return handleApiErrors(error);
   },
   async getLibrary() {
      const p = await this.getPlaylistList?.();
      const art = await this.getArtistList?.();
      const alb = await this.getAlbumList?.();

      return [...(p ?? []), ...(art ?? []), ...(alb ?? [])];
   },

   // Main page
   async getPlaylist(id) {
      const path = getSpotifyPath(SPOTIFY_PATH.page.playlist + id);
      const [error, data] = await requestMusicApi(path, SpotifyPlaylistSchema);

      if (!error) {
         return data as PlaylistType;
      }
      return handleApiErrors(error);
   },
   async getArtist(id) {
      const path = getSpotifyPath(SPOTIFY_PATH.page.artist + id);
      const [error, data] = await requestMusicApi(path, SpotifyArtistSchema);

      if (!error) {
         return data as ArtistType;
      }
      return handleApiErrors(error);
   },
   async getArtistTopTracks(id) {
      const path = getSpotifyPath(
         SPOTIFY_PATH.page.artist + id + SPOTIFY_PATH.page.topTracks,
      );
      const [error, data] = await requestMusicApi(
         path,
         SpotifyArtistTopTraksSchema,
      );

      if (!error) {
         return data as TrackType[];
      }
      return handleApiErrors(error);
   },
   async getAlbum(id) {
      const path = getSpotifyPath(SPOTIFY_PATH.page.album + id);
      const [error, data] = await requestMusicApi(path, SpotifyAlbumSchema);

      if (!error) {
         return data as AlbumType;
      }
      return handleApiErrors(error);
   },
   async getTrack(id) {
      const path = getSpotifyPath(SPOTIFY_PATH.page.track + id);
      const [error, data] = await requestMusicApi(path, SpotifyTrackSchema);

      if (!error) {
         return data as TrackType;
      }
      return handleApiErrors(error);
   },
   async getSeveralArtists(ids) {
      const path = getSpotifyPath(SPOTIFY_PATH.page.artists + ids);
      const [error, data] = await requestMusicApi(
         path,
         SpotifySeveralArtistsSchema,
      );

      if (!error) {
         return data as ArtistType[];
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
