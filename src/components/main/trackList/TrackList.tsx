"use client";

import { usePlayerStore } from "@/src/music/stores/playerStore";
import { TrackType } from "@/src/types/types";
import { useEffect, useState } from "react";
import TrackAdded from "./TrackAdded";
import TrackAlbum from "./TrackAlbum";
import "./TrackListStyles.css";
import TrackListHeader from "./TrackListHeader";
import TrackListItem from "./TrackListItem";

type TrackListProps = {
   items: TrackType[];
   context: string | string[];
   type: "album" | "artist" | "playlist";
};

const TrackList = ({ items, context, type }: TrackListProps) => {
   const [activeId, setActiveId] = useState<string>("");
   const setPlayer = usePlayerStore((s) => s.setPlayer);

   useEffect(() => {
      setPlayer({ contextUri: context });

      return () => {
         setPlayer({ contextUri: null });
      };
   }, [setPlayer, context]);

   return (
      <ul className={`tracklist tracklist_${type} w-full`}>
         {type !== "artist" && (
            <li
               key={context[0]}
               className="tracklist-header w-full mb-2 relative"
            >
               <TrackListHeader type={type} />
            </li>
         )}
         {items.map((item, index) => (
            <li
               key={item.keyId}
               className="tracklist-item w-full"
               onClick={() => setActiveId(item.id)}
            >
               <TrackListItem
                  context={context}
                  item={item}
                  index={index}
                  withImage={type !== "album"}
                  isActive={activeId === item.id}
               >
                  {item.album && <TrackAlbum album={item.album} />}
                  {item.added && <TrackAdded added={item.added} />}
               </TrackListItem>
            </li>
         ))}
      </ul>
   );
};

export default TrackList;
