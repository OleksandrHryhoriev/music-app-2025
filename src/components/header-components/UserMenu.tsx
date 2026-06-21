import SignOut from "./SignOut";
import UserMenuItem from "./UserMenuItem";
import Link from "next/link";
import { UserProfile } from "@/src/types/types";

type UserMenuProps = {
   user: UserProfile;
   closeMenu: () => void;
};

const UserMenu = ({ user, closeMenu }: UserMenuProps) => {
   return (
      <ul className="flex flex-col w-full" onClick={closeMenu}>
         <UserMenuItem>
            <span className="block w-full p-3">
               Account (not available yet)
            </span>
         </UserMenuItem>
         <UserMenuItem>
            <Link href={`/user/${user.id}`} className="block w-full p-3">
               Profile
            </Link>
         </UserMenuItem>
         <UserMenuItem>
            <span className="block w-full p-3">
               Settings (not available yet)
            </span>
         </UserMenuItem>
         <UserMenuItem>
            <SignOut />
         </UserMenuItem>
      </ul>
   );
};

export default UserMenu;
