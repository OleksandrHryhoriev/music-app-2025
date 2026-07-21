import {
   AlbumType,
   ArtistType,
   CurrentTrackType,
   LibItemType,
   PlaylistType,
   TrackType,
   UserProfile,
} from "../../types/types";

export type MusicProvider = "spotify"; // Add new one as union

export type MusicProviderClient = {
   //user
   getUserProfile(id: string): Promise<UserProfile | null>;
   getMyProfile(): Promise<UserProfile | null>;
   //lib
   getPlaylistList?(): Promise<LibItemType[] | null>;
   getAlbumList?(): Promise<LibItemType[] | null>;
   getArtistList?(): Promise<LibItemType[] | null>;
   getLibrary(): Promise<LibItemType[]>;
   //page
   getPlaylist(id: string): Promise<PlaylistType | null>;
   getArtist(id: string): Promise<ArtistType | null>;
   getArtistTopTracks(id: string): Promise<TrackType[] | null>;
   getAlbum(id: string): Promise<AlbumType | null>;
   getTrack(id: string): Promise<TrackType | null>;
   getSeveralArtists(ids: string): Promise<ArtistType[] | null>;
   //player
   getCurrentTrack(): Promise<CurrentTrackType | null>;
};

export type MusicProviderConfig = {
   tokenEndpoint: string;
   authHeader: string;
   client: MusicProviderClient;
   playbackType: "local" | "remote";
};

export type ClientProvider = {
   provider: MusicProvider;
   playbackType: "local" | "remote";
};
