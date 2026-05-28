- !!!! Handle getMusicProviders and getProviderFromSession flow. Errors when unauthorized or unexpected provider. Remove 'return "spotify"' from catch.

- Solve provider info import in refreshAccessToken. it shouldn't be spotify only

- Add posibility to have several providers for one USER

- Handle repeat mode. PlayerControls should just switch between cases of current provider

- Solve progress jumps when clicking repeat or shuffle btn

===========================================================================================

INSTRUCTIONs.
1.To add new Provider:

- follow src/music/providers/providers.ts, add new provider property to PROVIDERS.
- follow src/music/providers/types.ts, add new provider name as union to MusicProvider type.
- follow src/music/providers and copypaste 'spotify' folder. Modify all according new provider documentation.
- if local player available, follow src/music/player/useLocalPlayer.ts and add case for new provider.
