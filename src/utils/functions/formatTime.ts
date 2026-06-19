export default function formatTime(miliseconds: number): string {
   const totalSeconds = Math.floor(miliseconds / 1000);
   const minutes = Math.floor(totalSeconds / 60);
   const seconds = totalSeconds % 60;

   return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

export function formatTimeHours(miliseconds: number): string {
   const totalSeconds = Math.floor(miliseconds / 1000);
   const hours = Math.floor(totalSeconds / 3600);
   const minutes = Math.floor((totalSeconds / 60) % 60);
   const seconds = totalSeconds % 60;

   if (hours !== 0) return `${hours} h ${minutes} min`;
   return `${minutes} min ${seconds} s`;
}
