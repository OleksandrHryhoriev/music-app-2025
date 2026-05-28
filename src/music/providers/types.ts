import {
   ArtistType,
   CurrentTrackType,
   LibItemType,
   PlaylistType,
} from "../../types/types";

export type MusicProvider = "spotify"; // Add new one as union

export type MusicProviderClient = {
   getPlaylistList?(): Promise<LibItemType[]>;
   getAlbumList?(): Promise<LibItemType[]>;
   getArtistList?(): Promise<LibItemType[]>;
   getLibrary(): Promise<LibItemType[]>;
   getPlaylist(id: string): Promise<PlaylistType | null>;
   getArtist(id: string): Promise<ArtistType | null>;
   getCurrentTrack(): Promise<CurrentTrackType>;
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
