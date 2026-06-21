import { useHover } from "@/src/hooks/useHover";
import React from "react";

type UserMenuItemProps = {
   children: React.ReactNode;
};

const UserMenuItem = ({ children }: UserMenuItemProps) => {
   const [liRef, isHovered] = useHover<HTMLLIElement>();
   return (
      <li
         ref={liRef}
         className={`text-sm w-full rounded-xs ${isHovered && "bg-(--bgActiveHover)"} cursor-pointer`}
      >
         {children}
      </li>
   );
};

export default UserMenuItem;
