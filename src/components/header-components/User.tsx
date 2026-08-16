"use client";

import useClickOutside from "@/src/hooks/useClickOutside";
import { useHover } from "@/src/hooks/useHover";
import Image from "next/image";
import { useRef, useState } from "react";
import UserMenu from "./UserMenu";
import { UserProfile } from "@/src/types/types";

type UserProps = {
   user: UserProfile;
};

const User = ({ user }: UserProps) => {
   const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
   const [buttonRef, isHovered, setIsHovered] = useHover<HTMLDivElement>();
   const menuRef = useRef<HTMLDivElement>(null);

   useClickOutside([buttonRef, menuRef], () => setIsMenuOpen(false));

   const handleClick = () => {
      setIsHovered(false);
      setIsMenuOpen((prev) => !prev);
   };

   return (
      <div className="relative">
         <div
            ref={buttonRef}
            onClick={handleClick}
            className="w-12 h-12 relative rounded-full overflow-hidden p-1.5 bg-(--backgroundSecondary) transition-all  hover:bg-(--bgHover) hover:scale-103"
         >
            {user?.image && (
               <div className="w-9 h-9 relative rounded-full overflow-hidden">
                  <Image
                     src={user.image.url}
                     alt="User avatar"
                     className="w-full object-cover"
                     fill
                     sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
               </div>
            )}
         </div>

         {isHovered && (
            <div className="absolute z-5 top-full -right-1 translate-y-2.5 px-2 py-1 bg-(--bgActive) rounded-sm shadow-[0px_5px_15px_5px_var(--backgroundSecondary)] text-sm text-nowrap">
               {user?.name || "Authorized User"}
            </div>
         )}
         {isMenuOpen && (
            <div
               ref={menuRef}
               className="absolute top-full -right-1 translate-y-2.5 p-1 bg-(--bgHover) rounded-md w-70 shadow-[0px_5px_15px_5px_var(--backgroundSecondary)]"
            >
               <UserMenu user={user} closeMenu={handleClick} />
            </div>
         )}
      </div>
   );
};

export default User;
