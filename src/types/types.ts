export const libOptions = ["playlist", "artist", "album"] as const;
export type LibOptions = (typeof libOptions)[number];

export type UserProfile = {
   accountId?: string;
   country?: string;
   name: string;
   email?: string;
   followers: number;
   id: string;
   image: string;
   product: string;
   uri: string;
};

export type LibItemType = {
   id: string;
   uri: string;
   name: string;
   type: LibOptions;
   image: string | null;
   owner?: string; // playlists only
   artist?: string; // albums only
};

export type TrackType = {
   album: {
      id: string;
      name: string;
      image: {
         url: string;
         height: number | null;
         width: number | null;
      };
      uri: string;
   };
   artists: {
      id: string;
      uri: string;
      name: string;
   }[];
   duration: number;
   id: string;
   name: string;
   uri: string;
};

export type PlaylistType = {
   id: string;
   uri: string;
   image?: {
      url: string;
      height: number | null;
      width: number | null;
   };
   name: string;
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
};

export type ArtistType = {
   id: string;
   uri: string;
   image?: {
      url: string;
      height: number | null;
      width: number | null;
   };
   name: string;
   href: string;
   followers: number;
   genres: string[];
};

export type PlaybackTrack = {
   album: {
      uri: string;
      name: string;
      image: {
         url: string;
      };
   };
   artists: {
      id: string;
      uri: string;
      name: string;
   }[];
   duration: number;
   id: string;
   name: string;
   uri: string;
};

export type CurrentTrackType = {
   track: TrackType | null;
   isPlaying: boolean;
   progress: number;
};
