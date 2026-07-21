"use client";

import "../../TrackList/TrackList.css";
import { TrackType } from "@/src/types/types";
import { useEffect, useState } from "react";
import { usePlayerStore } from "@/src/music/stores/playerStore";
import TrackListItem from "../../TrackList/TrackListItem";

type ArtistTrackListProps = {
   items: TrackType[];
   context: string;
};

const ArtistTrackList = ({ items, context }: ArtistTrackListProps) => {
   const [activeId, setActiveId] = useState<string>("");
   const setPlayer = usePlayerStore((s) => s.setPlayer);

   useEffect(() => {
      setPlayer({ contextUri: context });

      return () => {
         setPlayer({ contextUri: null });
      };
   }, [setPlayer, context]);

   return (
      <ul className="tracklist artist-tracklist w-full">
         {items.map((item, index) => (
            <li
               key={item.id}
               className="tracklist_item artist-tracklist_item w-full"
               onClick={() => setActiveId(item.id)}
            >
               <TrackListItem
                  context={context}
                  item={item}
                  index={index}
                  isActive={activeId === item.id}
               />
            </li>
         ))}
      </ul>
   );
};

export default ArtistTrackList;
