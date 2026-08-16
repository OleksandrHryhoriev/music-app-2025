import getSpotifyPath, { SPOTIFY_PATH } from "../providers/spotify/endpoints";
import postPlayerState from "./postPlayerState";

export async function reconnectPlayer(deviceId: string) {
   const transferPath = getSpotifyPath(SPOTIFY_PATH.player.player);
   const transferBody = { device_ids: [deviceId], play: true };

   const transferRes = await postPlayerState(
      transferPath,
      "transfer",
      "PUT",
      transferBody,
   );

   if (transferRes && transferRes.ok) {
      await new Promise((resolve) => setTimeout(resolve, 600));
      return true;
      // res = await postPlayerState(apiPath, "play", "PUT", context);
   }

   return false;
}
