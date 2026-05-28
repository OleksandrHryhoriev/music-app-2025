export default function formateDate(dateString: string): string {
   if (!dateString) return "Jan 01, 1900";

   const dateAsArray = dateString.slice(0, 10).split("-");
   const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
   ];

   return `${months[Number(dateAsArray[1]) - 1]} ${dateAsArray[2]}, ${dateAsArray[0]}`;
}
