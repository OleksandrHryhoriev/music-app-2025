import { getMyProfile } from "@/src/music/services/userServices/userProfile";
import SignIn from "./SignIn";
import User from "./User";
import { getUser } from "@/src/lib/auth/authSession";

const AuthBlock = async () => {
   const user = await getUser();
   if (user === null) return <SignIn />;

   const userProfile = await getMyProfile();

   if (!userProfile) return null; //TODO

   return (
      <div className="flex gap-4 items-center">
         <User user={userProfile} />
      </div>
   );
};

export default AuthBlock;
