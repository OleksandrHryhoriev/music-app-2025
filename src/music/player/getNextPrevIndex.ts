// import { getCurrentProgress } from "../selectors/selectors";
// import { PlayerState } from "../stores/playerStore";

// export function getNextIndex(state: PlayerState): number | null {
//    if (state.repeatMode === "one") {
//       return state.currentIndex;
//    }

//    const next = state.currentIndex + 1;

//    if (next >= state.contextTracks.length) {
//       if (state.repeatMode === "all") return 0;
//       return null;
//    }

//    return next;
// }

// export function getPrevIndex(state: PlayerState): number | null {
//    const progress = getCurrentProgress(state);

//    if (progress > 3000) return state.currentIndex;

//    const prev = state.currentIndex - 1;
//    console.log(prev);

//    if (prev >= 0) return prev;

//    if (state.repeatMode === "all") {
//       return state.contextTracks.length - 1;
//    }

//    return null;
// }
