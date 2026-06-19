"use client";

import "./TrackList.css";
import DurationIcon from "../../icons/DurationIcon";
import { PlaylistType } from "@/src/types/types";
import TrackListItem from "./TrackListItem";
import { useEffect, useState } from "react";
import { usePlayerStore } from "@/src/music/stores/playerStore";

type TrackListProps = {
   items: PlaylistType["items"];
   context: string;
};

const TrackList = ({ items, context }: TrackListProps) => {
   const [activeId, setActiveId] = useState<string>("");
   const setPlayer = usePlayerStore((s) => s.setPlayer);

   useEffect(() => {
      setPlayer({ contextUri: context });

      return () => {
         setPlayer({ contextUri: null });
      };
   }, [setPlayer, context]);

   return (
      <ul className="tracklist w-full">
         <li className="tracklist_header w-full mb-2 relative">
            <div className="tracklist_row w-full py-2 px-4 text-sm secondary-text">
               <div className="track-index text-center">#</div>
               <div className="track-title">Title</div>
               <div className="track-album hidden lg:block">Album</div>
               <div className="track-added">Date added</div>
               <div className="track-duration justify-self-end">
                  <span className="block w-5 h-5">
                     <DurationIcon />
                  </span>
               </div>
            </div>
         </li>
         {items.map(({ item, added_at }, index) => (
            <li
               key={item.id}
               className="tracklist_item w-full"
               onClick={() => setActiveId(item.id)}
            >
               <TrackListItem
                  context={context}
                  item={item}
                  added_at={added_at}
                  index={index}
                  isActive={activeId === item.id}
               />
            </li>
         ))}
      </ul>
   );
};

export default TrackList;
