export const libOptions = ["playlist", "artist", "album"] as const;
export type LibOptions = (typeof libOptions)[number];

interface BaseData {
   id: string;
   uri: string;
   name: string;
}
interface Image {
   url: string;
   height: number | null;
   width: number | null;
}
interface MusicBaseType extends BaseData {
   image?: Image;
}

export interface UserProfile extends MusicBaseType {
   accountId?: string;
   country?: string;
   email?: string;
   followers: number;
   product: string;
}

export interface LibItemType extends MusicBaseType {
   type: LibOptions;
   owner?: string; // playlists only
   artist?: string; // albums only
}

export interface TrackType extends MusicBaseType {
   album: MusicBaseType;
   artists: BaseData[];
   duration: number;
}

export interface PlaylistType extends MusicBaseType {
   owner: {
      id: string;
      name: string;
   };
   public: boolean;
   total: number;
   items: {
      keyId: string;
      added_at: string;
      item: TrackType;
   }[];
}

export interface ArtistType extends MusicBaseType {
   href: string;
   followers: number;
   genres: string[];
}

export interface AlbumType extends MusicBaseType {
   artists: BaseData[];
   release: string;
   type: string;
   items: {
      keyId: string;
      item: TrackType;
   }[];
}

export interface PlaybackTrack extends MusicBaseType {
   album: MusicBaseType;
   artists: BaseData[];
   duration: number;
}

export interface CurrentTrackType {
   track: TrackType | null;
   isPlaying: boolean;
   progress: number;
}
