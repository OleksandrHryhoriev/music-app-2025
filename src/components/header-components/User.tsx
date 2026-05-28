import { type User } from "next-auth";
import Image from "next/image";

type UserProps = {
   user: User;
};

const User = ({ user }: UserProps) => {
   return (
      <div className="flex items-center gap-3">
         {user.image && (
            <div className="flex items-center justify-center w-10 h-10 relative rounded-full overflow-hidden">
               <Image
                  src={user.image}
                  alt="User avatar"
                  className="w-full object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
               />
            </div>
         )}
         <div>{user.name || "Authorized User"}</div>
      </div>
   );
};

export default User;
