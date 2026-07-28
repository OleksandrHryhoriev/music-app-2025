type DateType = {
   day: number;
   month: number;
   year: number;
};

export function getDate(dateString: string): DateType {
   const date = new Date(dateString);
   return {
      day: date.getDay(),
      month: date.getMonth(),
      year: date.getFullYear(),
   };
}

export default function formateDate(dateString: string): string {
   const MONTHS = [
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

   const date = getDate(dateString);

   return `${MONTHS[date.month - 1]} ${date.day}, ${date.year}`;
}
