import { useEffect, useState } from "react";
import moment from "moment-timezone";

interface TimezoneConverterProps {
  unixTimestamp: number;
  timezone: string;
}

const useTimezoneConverter = ({
  unixTimestamp,
  timezone,
}: TimezoneConverterProps) => {
  const [formattedTime, setFormattedTime] = useState<string | null>(null);
  //   moment(parseUnix(start)).format("HH:mm:ss")

  useEffect(() => {
    // Convert the Unix timestamp to a moment object
    const momentObj = moment.unix(unixTimestamp);

    // Format the moment object in the specified timezone
    const formatted = momentObj.tz(timezone).format("HH:mm:ss");

    // Set the formatted time to state
    setFormattedTime(formatted);
  }, [unixTimestamp, timezone]);

  return formattedTime;
};

export default useTimezoneConverter;
