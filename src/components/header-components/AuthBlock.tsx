import SignIn from "../SignIn";
import User from "../User";
import SignOut from "../SignOut";
import { getCachedSession } from "@/src/lib/authSession";

const AuthBlock = async () => {
   const session = await getCachedSession();

   if (!session?.user) return <SignIn />;

   return (
      <div className="flex gap-4 items-center">
         <User user={session.user} />
         <SignOut />
      </div>
   );
};

export default AuthBlock;
