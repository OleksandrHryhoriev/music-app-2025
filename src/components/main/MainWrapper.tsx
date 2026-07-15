"use client";

import React from "react";
import CustomScrollbar from "../CustomScrollbar/CustomScrollbar";
import PlayButton from "./PlayButton";

type MainWrapperProps = {
   children: React.ReactNode;
   title: string;
   context: string;
   bgColor?: string;
};

const MainWrapper = ({
   children,
   title,
   context,
   bgColor,
}: MainWrapperProps) => {
   return (
      <div className="main-wrapper anim-container w-full h-full relative">
         <div className="w-full min-w-[420px] h-16 absolute top-0 z-10 ">
            <div
               className="header-scroll w-full h-full sticky"
               style={{ backgroundColor: bgColor }}
            >
               <div className="header-scroll-content flex gap-2 w-full h-full items-center px-5">
                  <div className="w-12 h-12 shrink-0 rounded-full overflow-hidden">
                     <PlayButton context={context} color="#000000" />
                  </div>
                  <h2 className="text-2xl font-bold truncate-lh">{title}</h2>
               </div>
            </div>
         </div>
         <CustomScrollbar>{children}</CustomScrollbar>
      </div>
   );
};

export default MainWrapper;
