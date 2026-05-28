export default function formatTime(miliseconds: number): string {
   const totalSeconds = Math.floor(miliseconds / 1000);
   const minutes = Math.floor(totalSeconds / 60);
   const seconds = totalSeconds % 60;

   return `${String(minutes)}:${String(seconds).padStart(2, "0")}`;
}
