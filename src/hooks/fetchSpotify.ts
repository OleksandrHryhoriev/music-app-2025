import { getCachedSession } from "@/src/lib/authSession";

const fetchSpotify = async (path: string) => {
   const session = await getCachedSession();

   if (session) {
      const accessToken = session.access_token;

      if (!accessToken) {
         throw new Error("No access token");
      }

      try {
         const res = await fetch(`https://api.spotify.com/${path}`, {
            headers: {
               Authorization: `Bearer ${accessToken}`,
            },
         });
         console.log(res.status);
         const data = await res.json();
         return data;
      } catch (error) {
         console.log(error);
      }
   }
};

export default fetchSpotify;
