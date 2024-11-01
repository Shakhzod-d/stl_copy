import moment from "moment";

export const useWeekData = (dateStr: string) => {
  const date = moment(dateStr, "LLLL"); // Parse the input date
  const datesArray = [];

  // "Fri, 1-Nov"
  for (let i = 0; i < 7; i++) {
    datesArray.push(date.format("ddd, D-MMM")); // Format to abbreviated weekday and month
    date.subtract(1, "day");
  }
  const result = datesArray.map((item, i) => {
    const month = item.slice(0, item.indexOf(",")),
      day = item.slice(item.indexOf(",") + 1, item.indexOf("-")),
      week = item.slice(item.indexOf("-") + 1);
    return {
      text: `${month} ${day}/${week}`,
      value: i + 1,
    };
  });

  return result;
};
