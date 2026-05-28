import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import React from "react";
import "./CustomScrollbar.css";

type CustomScrollbarProps = {
   children: React.ReactNode;
};

const CustomScrollbar = ({ children }: CustomScrollbarProps) => {
   return (
      <OverlayScrollbarsComponent
         className="w-full h-full scrollbar-custom"
         options={{
            scrollbars: {
               autoHide: "leave",
            },
         }}
      >
         {children}
      </OverlayScrollbarsComponent>
   );
};

export default CustomScrollbar;
