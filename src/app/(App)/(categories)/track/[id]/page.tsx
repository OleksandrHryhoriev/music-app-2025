import TrackPage from "@/src/components/main/pages/track/TrackPage";
import NotFoundPage from "@/src/components/NotFoundPage/NotFoundPage";
import { getSeveralArtists } from "@/src/music/services/pageServices/track/severalArtists";
import { getTrack } from "@/src/music/services/pageServices/track/track";

export default async function Track({
   params,
}: {
   params: Promise<{ id: string }>;
}) {
   const { id } = await params;
   const track = await getTrack(id);

   if (track === null) return <NotFoundPage category="track" />;

   const ids = track.artists.map((artist) => artist.id).join(",");

   const artists = await getSeveralArtists(ids);

   return <TrackPage track={track} artists={artists} />;
}
