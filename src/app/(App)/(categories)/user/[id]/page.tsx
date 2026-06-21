import NotFoundPage from "@/src/components/NotFoundPage/NotFoundPage";
import { getUserProfile } from "@/src/music/services/userServices/userProfile";

export default async function Page({
   params,
}: {
   params: Promise<{ id: string }>;
}) {
   const { id } = await params;

   const userProfile = await getUserProfile(id);

   if (userProfile === null) return <NotFoundPage category="user" />;

   return (
      <div className="text-sm w-full h-full flex items-center justify-center">
         {userProfile.name}
      </div>
   );
}
