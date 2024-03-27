import Accordion from "@/components/elements/Accordion";
import moment from "moment";
import { formatTime } from "./helper";

export const Recap = ({ data }: any) => {
  return (
    <Accordion
      className="mb-24 mt-24"
      title="Recap"
      content={<CustomTableToShowRecup data={data?.recup} />}
    />
  );
};

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const data2 = {
  HourAvailableToday: 0,
  HoursAvailableTomarrow: 0,
  HoursWorkedToday: 0,
  recup: [],
  total: 0,
};

const CustomTableToShowRecup = ({ data = data2 }: any) => {
  // console.log(data);
  return (
    <table style={{ width: "100%", borderCollapse: "collapse"}}>
      <tbody>
        {[...data?.recup]?.reverse()?.map((item: any, idx: number) => (
          <tr key={idx}>
            <td style={{ border: "1px solid #dddddd", padding: "8px" }}>
              {daysOfWeek[idx]}
            </td>
            <td
              style={{ border: "1px solid #dddddd", padding: "8px" }}
            >{`${moment.unix(item?.date).format("MMMM")} ${moment
              .unix(item?.date)
              .format("D")}`}</td>
            <td style={{ border: "1px solid #dddddd", padding: "8px" }}>
              <b>
                {formatTime(moment.utc(item?.recup * 1000).format("H: m")) || 0}
              </b>
            </td>
          </tr>
        ))}
        <tr>
          <td style={{ border: "1px solid #dddddd", padding: "8px" }}>
            Total:
          </td>
          <td
            colSpan={2}
            style={{ border: "1px solid #dddddd", padding: "8px" }}
          >
            <b>{formatTime(moment.utc(data?.total * 1000).format("H: m"))}</b>
          </td>
        </tr>
        <tr>
          <td style={{ border: "1px solid #dddddd", padding: "8px" }}>
            Hours Worked Today:
          </td>
          <td
            colSpan={2}
            style={{ border: "1px solid #dddddd", padding: "8px" }}
          >
            <b>
              {formatTime(
                moment.utc(data?.HoursWorkedToday * 1000).format("H: m")
              )}
            </b>
          </td>
        </tr>
        <tr>
          <td style={{ border: "1px solid #dddddd", padding: "8px" }}>
            Hour Available Today:
          </td>
          <td
            colSpan={2}
            style={{ border: "1px solid #dddddd", padding: "8px" }}
          >
            <b>
              {formatTime(
                moment.utc(data?.HourAvailableToday * 1000).format("H: m")
              )}
            </b>
          </td>
        </tr>
        <tr>
          <td style={{ border: "1px solid #dddddd", padding: "8px" }}>
            Hours Available Tomorrow:
          </td>
          <td
            colSpan={2}
            style={{ border: "1px solid #dddddd", padding: "8px" }}
          >
            <b>
              {formatTime(
                moment.utc(data?.HoursAvailableTomarrow * 1000).format("H: m")
              )}
            </b>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
