import {
   ArtistType,
   CurrentTrackType,
   LibItemType,
   PlaylistType,
   UserProfile,
} from "../../types/types";

export type MusicProvider = "spotify"; // Add new one as union

export type MusicProviderClient = {
   getUserProfile(id: string): Promise<UserProfile | null>;
   getMyProfile(): Promise<UserProfile | null>;
   getPlaylistList?(): Promise<LibItemType[]>;
   getAlbumList?(): Promise<LibItemType[]>;
   getArtistList?(): Promise<LibItemType[]>;
   getLibrary(): Promise<LibItemType[]>;
   getPlaylist(id: string): Promise<PlaylistType | null>;
   getArtist(id: string): Promise<ArtistType | null>;
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
