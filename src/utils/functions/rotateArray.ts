export function rotateArray<T>(arr: T[]) {
   if (!arr.length) return arr;
   return [...arr.slice(1), arr[0]];
}
