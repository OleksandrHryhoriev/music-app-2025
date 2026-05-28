import { PROVIDERS } from "./providers";
import { getProviderFromSession } from "../../lib/auth/authSession";
import { ClientProvider, MusicProvider, MusicProviderConfig } from "./types";

async function getProvider(): Promise<MusicProvider | null> {
   const provider = await getProviderFromSession();

   if (!provider || !(provider in PROVIDERS)) {
      console.log("from getProvider: UnsupportedProviderError");
      return null;
   }

   return provider as MusicProvider;
}

export async function getMusicProvider(): Promise<MusicProviderConfig | null> {
   const provider = await getProvider();
   return provider ? PROVIDERS[provider] : null;
}

export async function getClientProvider(): Promise<ClientProvider | null> {
   const provider = await getProvider();

   return provider
      ? {
           provider: provider,
           playbackType: PROVIDERS[provider].playbackType,
        }
      : null;
}
