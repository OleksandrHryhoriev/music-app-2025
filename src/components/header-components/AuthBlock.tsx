import SignIn from "./SignIn";
import User from "./User";
import SignOut from "./SignOut";
import { getUser } from "@/src/lib/auth/authSession";

const AuthBlock = async () => {
   const user = await getUser();

   if (!user) return <SignIn />;

   return (
      <div className="flex gap-4 items-center">
         <User user={user} />
         <SignOut />
      </div>
   );
};

export default AuthBlock;
