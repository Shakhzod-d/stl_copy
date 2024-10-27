export const useDate = (dateString: string | unknown): string => {
  const value = String(dateString);
  const date = new Date(value);

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

  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  const getDaySuffix = (day: number) => {
    if (day > 3 && day < 21) return "th"; // Handle 11th, 12th, 13th
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const daySuffix = getDaySuffix(day);

  return `${month} ${day}${daySuffix} ${year}`;
};
