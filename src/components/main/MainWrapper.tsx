"use client";

import React from "react";
import CustomScrollbar from "../CustomScrollbar/CustomScrollbar";

type MainWrapperProps = {
   children: React.ReactNode;
};

const MainWrapper = ({ children }: MainWrapperProps) => {
   return (
      <div className="w-full h-full">
         <CustomScrollbar>
            <div className="min-w-[420px] h-full">{children}</div>
         </CustomScrollbar>
      </div>
   );
};

export default MainWrapper;
