import z from "zod";
import { LibItemType } from "@/src/types/types";

// Library schemas ==========================
// playlists
export const SpotifyLibPlaylistSchema = z
   .object({
      id: z.string(),
      name: z.string(),
      images: z
         .array(
            z.object({
               url: z.string(),
            }),
         )
         .optional(),
      owner: z
         .object({
            display_name: z.string(),
         })
         .optional(),
   })
   .transform(
      (data): LibItemType => ({
         id: data.id,
         name: data.name,
         image: data.images?.[0]?.url ?? null,
         type: "playlist",
         owner: data.owner?.display_name,
      }),
   );

export const SpotifyPlaylistListSchema = z.object({
   items: z.array(SpotifyLibPlaylistSchema),
});

// artists
export const SpotifyLibArtistSchema = z
   .object({
      id: z.string(),
      name: z.string(),
      images: z
         .array(
            z.object({
               url: z.string(),
            }),
         )
         .optional(),
   })
   .transform(
      (data): LibItemType => ({
         id: data.id,
         name: data.name,
         image: data.images?.[0]?.url ?? null,
         type: "artist",
      }),
   );

export const SpotifyArtistListSchema = z
   .object({
      artists: z.object({
         items: z.array(SpotifyLibArtistSchema),
      }),
   })
   .transform((data) => ({
      items: data.artists.items,
   }));

// albums
export const SpotifyLibAlbumSchema = z
   .object({
      album: z.object({
         id: z.string(),
         name: z.string(),
         images: z
            .array(
               z.object({
                  url: z.string(),
               }),
            )
            .optional(),
         artists: z.array(
            z.object({
               name: z.string(),
            }),
         ),
      }),
   })
   .transform(
      (data): LibItemType => ({
         id: data.album.id,
         name: data.album.name,
         type: "album",
         image: data.album.images?.[0]?.url || null,
         artist: data.album.artists?.[0]?.name,
      }),
   );

export const SpotifyAlbumListSchema = z.object({
   items: z.array(SpotifyLibAlbumSchema),
});

// Page schemas ==============================
// track
export const SpotifyTrackSchema = z
   .object({
      album: z.object({
         id: z.string(),
         name: z.string(),
         images: z.array(
            z.object({
               url: z.string(),
               height: z.number(),
               width: z.number(),
            }),
         ),
      }),
      artists: z.array(
         z.object({
            id: z.string(),
            uri: z.string(),
            name: z.string(),
         }),
      ),
      duration_ms: z.number(),
      id: z.string(),
      name: z.string(),
      uri: z.string(),
   })
   .transform((data) => ({
      album: {
         id: data.album.id,
         name: data.album.name,
         image: data.album.images[0],
      },
      artists: [...data.artists],
      duration: data.duration_ms,
      id: data.id,
      name: data.name,
      uri: data.uri,
   }));
// playlist
export const SpotifyPlaylistSchema = z
   .object({
      id: z.string(),
      uri: z.string(),
      images: z
         .array(
            z.object({
               url: z.string(),
               height: z.number().nullable(),
               width: z.number().nullable(),
            }),
         )
         .optional(),
      name: z.string(),
      owner: z.object({
         id: z.string(),
         display_name: z.string(),
      }),
      public: z.boolean(),
      items: z.object({
         total: z.number(),
         next: z.string().nullable(),
         previous: z.string().nullable(),
         limit: z.number(),
         items: z.array(
            z.object({
               added_at: z.string(),
               item: SpotifyTrackSchema,
            }),
         ),
      }),
   })
   .transform((data) => ({
      id: data.id,
      uri: data.uri,
      image: data.images?.[0],
      name: data.name,
      owner: {
         id: data.owner.id,
         name: data.owner.display_name,
      },
      public: data.public,
      total: data.items.total,
      items: [...data.items.items],
   }));
// artist
export const SpotifyArtistSchema = z
   .object({
      id: z.string(),
      uri: z.string(),
      images: z
         .array(
            z.object({
               url: z.string(),
               height: z.number().nullable(),
               width: z.number().nullable(),
            }),
         )
         .optional(),
      name: z.string(),
      href: z.string(),
      followers: z.object({ total: z.number() }),
      genres: z.array(z.string()),
   })
   .transform((data) => ({
      id: data.id,
      uri: data.uri,
      image: data.images?.[0],
      name: data.name,
      href: data.href,
      followers: data.followers.total,
      genres: [...data.genres],
   }));
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
export const SpotifyPlaybackTrackSchema = z
   .object({
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
      id: z.string(),
      name: z.string(),
      uri: z.string(),
   })
   .transform((data) => ({
      album: {
         uri: data.album.uri,
         name: data.album.name,
         image: data.album.images[0],
      },
      artists: [...data.artists],
      duration: data.duration_ms,
      id: data.id,
      name: data.name,
      uri: data.uri,
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
