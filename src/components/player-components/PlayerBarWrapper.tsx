"use client";

import React from "react";
import CustomScrollbar from "../CustomScrollbar/CustomScrollbar";

type PlayerBarWrapperProps = {
   children: React.ReactNode;
};

const PlayerBarWrapper = ({ children }: PlayerBarWrapperProps) => {
   return (
      <CustomScrollbar>
         <div className="player-wrapper w-full h-full min-w-154 p-2">
            {children}
         </div>
      </CustomScrollbar>
   );
};

export default PlayerBarWrapper;
