import z from "zod";
import {
   AlbumType,
   ArtistType,
   LibItemType,
   PlaylistType,
   TrackType,
   UserProfile,
} from "@/src/types/types";

const BaseDataSchema = z.object({
   id: z.string(),
   uri: z.string(),
   name: z.string(),
});
const ImageBaseSchema = z.object({
   url: z.string(),
   height: z.number().nullable(),
   width: z.number().nullable(),
});
const MusicBaseSchema = BaseDataSchema.extend({
   images: z.array(ImageBaseSchema).optional(),
});

// User schemas =============================
export const SpotifyUserSchema = z
   .object({
      id: z.string(),
      uri: z.string(),
      display_name: z.string(),
      images: z.array(ImageBaseSchema).optional(),
      account_id: z.string().optional(),
      country: z.string().optional(),
      email: z.string().optional(),
      followers: z.object({
         total: z.number(),
      }),
      product: z.string(),
   })
   .transform(
      (data): UserProfile => ({
         id: data.id,
         uri: data.uri,
         name: data.display_name,
         image: data.images?.[0],
         accountId: data.account_id,
         country: data.country,
         email: data.email,
         followers: data.followers.total,
         product: data.product,
      }),
   );

// Library schemas ==========================

// playlists
export const SpotifyLibPlaylistSchema = MusicBaseSchema.extend({
   owner: z
      .object({
         display_name: z.string(),
      })
      .optional(),
}).transform(
   (data): LibItemType => ({
      id: data.id,
      uri: data.uri,
      name: data.name,
      image: data.images?.[0],
      type: "playlist",
      owner: data.owner?.display_name,
   }),
);

export const SpotifyPlaylistListSchema = z
   .object({ items: z.array(SpotifyLibPlaylistSchema) })
   .transform((data) => data.items);

// artists
export const SpotifyLibArtistSchema = MusicBaseSchema.transform(
   (data): LibItemType => ({
      id: data.id,
      uri: data.uri,
      name: data.name,
      image: data.images?.[0],
      type: "artist",
   }),
);

export const SpotifyArtistListSchema = z
   .object({
      artists: z.object({
         items: z.array(SpotifyLibArtistSchema),
      }),
   })
   .transform((data) => data.artists.items);

// albums
export const SpotifyLibAlbumSchema = z
   .object({
      album: MusicBaseSchema.extend({
         artists: z
            .array(
               z.object({
                  name: z.string(),
               }),
            )
            .optional(),
      }),
   })
   .transform(
      (data): LibItemType => ({
         id: data.album.id,
         uri: data.album.uri,
         name: data.album.name,
         type: "album",
         image: data.album.images?.[0],
         artist: data.album.artists?.[0]?.name,
      }),
   );

export const SpotifyAlbumListSchema = z
   .object({ items: z.array(SpotifyLibAlbumSchema) })
   .transform((data) => data.items);

// Page schemas ==============================

// track
export const SpotifyTrackSchema = BaseDataSchema.extend({
   album: MusicBaseSchema.extend({
      release_date: z.string(),
   }),
   artists: z.array(BaseDataSchema),
   duration_ms: z.number(),
}).transform(
   (data): TrackType => ({
      id: data.id,
      uri: data.uri,
      name: data.name,
      album: {
         id: data.album.id,
         uri: data.album.uri,
         name: data.album.name,
         image: data.album.images?.[0],
         release: data.album.release_date,
      },
      artists: [...data.artists],
      duration: data.duration_ms,
   }),
);

// playlist
export const SpotifyPlaylistSchema = MusicBaseSchema.extend({
   owner: z.object({
      id: z.string(),
      display_name: z.string(),
   }),
   public: z.boolean(),
   items: z.object({
      total: z.number(),
      items: z.array(
         z.object({
            added_at: z.string(),
            item: SpotifyTrackSchema,
         }),
      ),
   }),
}).transform(
   (data): PlaylistType => ({
      id: data.id,
      uri: data.uri,
      name: data.name,
      image: data.images?.[0],
      owner: {
         id: data.owner.id,
         name: data.owner.display_name,
      },
      public: data.public,
      total: data.items.total,
      items: data.items.items.map((entry) => ({
         ...entry.item,
         keyId: crypto.randomUUID(),
         added: entry.added_at,
      })),
   }),
);

// artist
export const SpotifyArtistSchema = MusicBaseSchema.extend({
   href: z.string(),
   followers: z.object({ total: z.number() }),
   genres: z.array(z.string()),
}).transform(
   (data): ArtistType => ({
      id: data.id,
      uri: data.uri,
      name: data.name,
      image: data.images?.[0],
      href: data.href,
      followers: data.followers.total,
      genres: [...data.genres],
   }),
);

// several artists
export const SpotifySeveralArtistsSchema = z
   .object({
      artists: z.array(SpotifyArtistSchema),
   })
   .transform((data) => data.artists);

// artist top tracks
export const SpotifyArtistTopTraksSchema = z
   .object({
      tracks: z.array(SpotifyTrackSchema),
   })
   .transform((data): TrackType[] =>
      data.tracks.map((entry) => ({
         ...entry,
         keyId: crypto.randomUUID(),
      })),
   );

// album
export const SpotifyAlbumTrackSchema = BaseDataSchema.extend({
   artists: z.array(BaseDataSchema),
   duration_ms: z.number(),
}).transform(
   (data): TrackType => ({
      id: data.id,
      uri: data.uri,
      name: data.name,
      artists: [...data.artists],
      duration: data.duration_ms,
   }),
);

export const SpotifyAlbumSchema = MusicBaseSchema.extend({
   artists: z.array(BaseDataSchema),
   release_date: z.string(),
   album_type: z.string(),
   tracks: z.object({
      items: z.array(SpotifyAlbumTrackSchema),
   }),
}).transform(
   (data): AlbumType => ({
      id: data.id,
      uri: data.uri,
      name: data.name,
      image: data.images?.[0],
      artists: [...data.artists],
      release: data.release_date,
      type: data.album_type,
      items: data.tracks.items.map((entry) => ({
         ...entry,
         keyId: crypto.randomUUID(),
      })),
   }),
);

// Player schemas ===============================

// current track
export const SpotifyCurrentTrackSchema = z
   .object({
      item: z.object(SpotifyTrackSchema).nullable(),
      is_playing: z.boolean(),
      progress_ms: z.number(),
   })
   .transform((data) => ({
      track: data.item,
      isPlaying: data.is_playing,
      progress: data.progress_ms,
   }));

// playback track
export const SpotifyPlaybackTrackSchema = BaseDataSchema.extend({
   album: z.object({
      uri: z.string(),
      name: z.string(),
      images: z.array(
         z.object({
            url: z.string(),
         }),
      ),
   }),
   artists: z.array(
      z
         .object({
            uri: z.string(),
            name: z.string(),
         })
         .transform((artist) => ({
            ...artist,
            id: artist.uri.replace(/^spotify:artist:/, ""),
         })),
   ),
   duration_ms: z.number(),
}).transform((data) => ({
   id: data.id,
   uri: data.uri,
   name: data.name,
   album: {
      uri: data.album.uri,
      name: data.album.name,
      image: data.album.images[0],
   },
   artists: [...data.artists],
   duration: data.duration_ms,
}));

// player state
export const SpotifyPlayerStateSchema = z.object({
   paused: z.boolean(),
   position: z.number(),
   shuffle: z.boolean(),
   repeat_mode: z.union([z.literal(0), z.literal(1), z.literal(2)]),
   track_window: z.object({
      current_track: SpotifyPlaybackTrackSchema,
      previous_tracks: z.array(SpotifyPlaybackTrackSchema),
      next_tracks: z.array(SpotifyPlaybackTrackSchema),
   }),
});
