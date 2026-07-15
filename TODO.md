- Add posibility to have several providers for one USER

===========================================================================================

INSTRUCTIONs.
1.To add new Provider:

- follow src/music/providers/providers.ts, add new provider property to PROVIDERS.
- follow src/music/providers/types.ts, add new provider name as union to MusicProvider type.
- follow src/music/providers and copypaste 'spotify' folder. Modify all according new provider documentation.
- if local player available, follow src/music/player/useLocalPlayer.ts and add case for new provider.

"dev": "next dev -H 192.168.0.106 --experimental-https --turbopack ",
