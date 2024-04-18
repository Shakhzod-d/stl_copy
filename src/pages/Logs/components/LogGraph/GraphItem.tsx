import Slider from "rc-slider";
import React, { useEffect, useRef, useState } from "react";
import Icon from "@/components/icon/Icon";
import { ISetState, TItemStatus } from "@/types";
import { getDurationDate, parseUnix } from "@/utils";
import { ILog } from "@/types/log.type";
import moment from "moment";
import { useSelector } from "react-redux";
import useTimezoneConverter from "./useTimezoneConverter";
import { RootState } from "@/store";

const statusPosition = {
  off: 1,
  off_pc: 1,
  sb: 2,
  dr: 3,
  intermediate: 3,
  on: 4,
  on_ym: 4,
  login: 4,
  logout: 4,
  power_on: 4,
  power_off: 4,
};

export interface IGraphItem {
  item: ILog;
  lastStatus: TItemStatus;
  graphHeight: number | undefined;
  graphWidth: number | undefined;
  currentLog?: ILog | null;
  setCurrentLog?: ISetState<ILog | null>;
  setHoveredId?: ISetState<any | null>;
  hoveredId?: any;
  afterRangeChange?: (val: any, item: ILog) => void;
  initialTime: number;
  isLaTMKog: boolean;
  isFirTMKog: boolean;
  isPrevLogDisabled: boolean | undefined;
  isNextLogDisabled: boolean | undefined;
  hoverLogOptions?: {
    show: "duration" | "time";
  };
}

const myMap = new Map([
  ["Eastern Time", "America/New_York"],
  ["Central Time", "America/Chicago"],
  ["Mountain Time", "America/Denver"],
  ["Pacific Time", "America/Los_Angeles"],
  ["Alaska Time", "America/Anchorage"],
  ["Hawaii-Aleutian Time", "Pacific/Honolulu"],
]);

const GraphItem: React.FC<IGraphItem> = ({
  item: initialItem,
  lastStatus,
  graphHeight = 0,
  currentLog,
  setCurrentLog,
  setHoveredId,
  hoveredId,
  graphWidth = 0,
  afterRangeChange,
  initialTime,
  hoverLogOptions = {
    show: "duration",
  },
  // isPrevLogDisabled,
  // isNextLogDisabled,
}) => {
  const [rangeVal, setRangeVal] = useState<any>(initialItem.rangeVal || []);
  const state = useSelector((state: any) => state?.auth);
  const companyTimeZone: any = useSelector<RootState>(
    (state) => state?.log.companyTimeZone
  );

  const item = initialItem;
  const start = initialItem.start;
  const end = initialItem.end;
  const status = item.status;
  const ONE_DAY_SECONDS = 24 * 60 * 60; // 24 hours
  const duration = item.end - item.start;

  const itemPosition =
    (graphWidth * (start - initialTime)) / ONE_DAY_SECONDS || 0;
  const topPosition =
    (graphHeight / 4) * statusPosition[status] - (1 + graphHeight / 8) || 0;
  const itemWidth = (graphWidth * duration) / ONE_DAY_SECONDS || 0;

  const horizontalY = statusPosition[lastStatus] < statusPosition[status];
  const horizontalHeight =
    (graphHeight / 4) *
      Math.abs(statusPosition[lastStatus] - statusPosition[status]) || 0;
  const rangePosition = (rangeVal[0] * graphWidth) / ONE_DAY_SECONDS || 0;
  const rangeWidth =
    ((rangeVal[1] - rangeVal[0]) * graphWidth) / ONE_DAY_SECONDS || 0;

  useEffect(() => {
    const first = Number(start - initialTime);
    const second = Number(end - initialTime);
    setRangeVal(currentLog?.rangeVal || [first, second]);
  }, [currentLog]);

  const getStatusDuration = (start: any, end: any) => {
    const { days, hours, minutes, seconds } = getDurationDate(
      parseUnix(start),
      parseUnix(end)
    );
    return (
      <span className="duration">
        {hours ? `${hours}h:` : ""}
        {minutes ? `${minutes}m:` : ""}
        {seconds ? `${seconds}s` : days ? `${days}d` : "0s"}
      </span>
    );
  };
  const getStatusTime = () => {
    return (
      <span className="duration">
        {moment.unix(initialTime).format("DD-MMM")}
      </span>
    );
  };

  // "Eastern Time"
  const timeZones = {
    "Eastern Time": "America/New_York",
    "Central Time": "America/Chicago",
    "Mountain Time": "America/Denver",
    "Pacific Time": "America/Los_Angeles",
    "Alaska Time": "America/Anchorage",
    "Hawaii-Aleutian Time": "Pacific/Honolulu",
  };

  // const isFutureTime = value[1] > getCurrentTimeInSeconds();

  // o'ng slider
  const timeZone = "America/New_York";

  const currentDate_2 = new Date(0).toLocaleString("en-US", {
    timeZone: timeZones[companyTimeZone as keyof typeof timeZones],
  });
  const h = new Date(currentDate_2).getHours();
  const m = new Date(currentDate_2).getMinutes();
  const s = new Date(currentDate_2).getSeconds();
  const ts = h * 3600 + m * 60 + s; // ts = total seconds based on time zone

  const dateFromTimestamp = new Date(0);
  const currentDateET = new Date().toLocaleString("en-US", {
    timeZone: timeZones[companyTimeZone as keyof typeof timeZones],
  });
  const currentDate = new Date(currentDateET);

  const isToday =
    dateFromTimestamp.getDate() === currentDate.getDate() &&
    dateFromTimestamp.getMonth() === currentDate.getMonth() &&
    dateFromTimestamp.getFullYear() === currentDate.getFullYear();

  const [formattedDateTime, setFormattedDateTime] = useState<string | null>(
    null
  );

  // ******************************************* hook
  const formattedStartTime = useTimezoneConverter({
    unixTimestamp: start,
    timezone:
      timeZones[companyTimeZone as keyof typeof timeZones] ||
      "America/New_York",
  });

  const formattedEndTime = useTimezoneConverter({
    unixTimestamp: end,
    timezone:
      timeZones[companyTimeZone as keyof typeof timeZones] ||
      "America/New_York",
  });

  const formattedLeftTime = useTimezoneConverter({
    unixTimestamp: initialTime + rangeVal[0],
    timezone:
      timeZones[companyTimeZone as keyof typeof timeZones] ||
      "America/New_York",
  });

  const formattedRightTime = useTimezoneConverter({
    unixTimestamp: initialTime + rangeVal[1],
    timezone:
      timeZones[companyTimeZone as keyof typeof timeZones] ||
      "America/New_York",
  });

  useEffect(() => {
    // Create a new Date object using the provided Unix timestamp
    const date = new Date((initialTime + rangeVal[0]) * 1000); // Multiply by 1000 to convert seconds to milliseconds

    // Convert the date to Eastern Time (ET)
    // const etDateTime = date.toLocaleString("en-US", {
    //   timeZone: "America/New_York", // Eastern Time
    // });
    const etDateTime = moment(
      moment // @ts-ignore
        .unix(date) // @ts-ignore
        .tz(timeZones[companyTimeZone])
    ).format("h:mm:ss A");

    // Set the formatted date and time to state
    setFormattedDateTime(etDateTime);
  }, [initialTime]);

  // console.log(
  //   `formattedStartTime`,
  //   formattedRightTime,
  //   moment(parseUnix(initialTime + rangeVal[1])).format("HH:mm:ss")
  //   // moment(parseUnix(initialTime + rangeVal[1])).format("HH:mm:ss")
  // );

  // console.log("graphWidth", `ts`, ts - 44, rangeVal[1] - 100); //rangeVal[1] > ts
  // console.log("item", item); //rangeVal[1] > ts

  return (
    <div>
      {status === "intermediate" ? (
        <div
          className={`${status}`}
          style={{
            left: itemPosition,
            top: topPosition,
            // border: "1px solid red",
          }}
        >
          <span
            className={`circle ${item._id === hoveredId ? "hovered" : ""}`}
            onMouseEnter={() => !currentLog && setHoveredId?.(item._id)}
            onMouseLeave={() => setHoveredId?.("")}
          />
          <span className="time">
            {/* {moment(parseUnix(start)).format("HH:mm:ss")} */}
            {formattedStartTime}
          </span>
        </div>
      ) : !initialItem.isNewLog ? (
        <div
          style={{
            width: itemWidth,
            left: itemPosition,
          }}
          className={`box-wrapper ${status} ${
            item._id === hoveredId
              ? "hovered"
              : ""
          }`}
          onClick={() => setCurrentLog?.(item)}
          onMouseEnter={() => !currentLog && setHoveredId?.(item._id)}
          onMouseLeave={() => setHoveredId?.("")}
        >
          <div className="box-content">
            {!currentLog && (
              <>
                <span className="start">{formattedStartTime}</span>
                <span className="end">{formattedEndTime}</span>
                {hoverLogOptions.show === "duration"
                  ? getStatusDuration(start, end)
                  : getStatusTime()}
              </>
            )}
          </div>

          <span
            className={"vertical-line " + status}
            style={{ top: topPosition }}
          />
          {lastStatus ? (
            <span
              style={{
                top: topPosition,
                transform: horizontalY
                  ? "translateY(calc(-100% + 1px))"
                  : "translateY(calc(1px))",
                height: horizontalHeight + 0.5,
              }}
              className={"horizontal-line " + status}
            />
          ) : null}

          {!item.isEnded && item?.hasFlag ? (
            // item.cropPoint === "start" &&
            // item.cropPoint !== "end" ? (

            <span
              className="flag-content"
              style={{
                width: graphWidth * 0.001,
                bottom: 0,
                left: "100%",
                height: graphHeight * 1.2,
              }}
            >
              <span className="flag-box">14</span>
            </span>
          ) : null}
        </div>
      ) : null}
      <div
        className={`range-wrapper ${
          currentLog?._id === item._id ? "active" : ""
        }`}
      >
        <div
          className={`range-content ${status}`}
          style={{
            left: rangePosition,
            width: rangeWidth, // NEED TO LIMIT HERE SO RANGE WILL BE STOPPED > itemWidth ? itemWidth : rangeWidth
            // > temp ? temp : rangeWidth
          }}
        >
          <Icon icon="range-left" className="range-left" />
          <Icon icon="range-right" className="range-right" />
          <span className="time time-left">
            {/* {moment(parseUnix(initialTime + rangeVal[0])).format("HH:mm:ss")}{" "} */}
            {formattedLeftTime}
          </span>
          <span className="time time-right">
            {/* {moment(parseUnix(initialTime + rangeVal[1])).format("HH:mm:ss")} */}
            {formattedRightTime}
          </span>
          {getStatusDuration(start, end)}
        </div>

        <Slider
          allowCross={false}
          min={1}
          max={ONE_DAY_SECONDS}
          value={rangeVal}
          range
          disabled={isToday && rangeVal[1] - 100 > ts - 44}
          // defaultValue={time}
          onChangeComplete={(value: any) => {
            // const val = [
            //      value[0] - (value[0] % 1000),
            //      value[1] - (value[1] % 1000),
            // ];
            afterRangeChange?.(value, item);
          }}
          // onAfterChange={(value: any) => {
          //   // const val = [
          //   //      value[0] - (value[0] % 1000),
          //   //      value[1] - (value[1] % 1000),
          //   // ];
          //   afterRangeChange?.(value, item);
          // }}
          onChange={(value: any) => {
            const isWithinRange = value[0] >= 0 && value[1] <= ONE_DAY_SECONDS;

            if (isToday && rangeVal[1] - 100 > ts - 44) {
              return;
            }

            // console.log(`value`, value);
            // if (isToday === true && rangeWidth > temp) {
            //   // Only allow changes if the slider is not disabled
            //   return;
            // }

            // if (isWithinRange && !isFutureTime) {
            //   // Update the state only if within the allowed range and not in the future
            //   setRangeVal(value);
            // }

            // ***********************************

            // console.log(`isToday`, isToday);

            // const isWithinRange = value[0] >= 0 && value[1] <= ONE_DAY_SECONDS;

            if (isWithinRange) {
              // Update the state only if within the allowed range
              setRangeVal(value);
            }
            // ******************************
            // if (
            //   //. !isPrevLogDisabled &&
            //   (!isFirTMKog ||
            //     !(rangeVal?.[0] === 0) ||
            //     rangeVal?.[1] !== value[1]) &&
            //   //. !isNextLogDisabled &&
            //   (!isLaTMKog ||
            //     !(rangeVal?.[1] === 60 * 60 * 24) ||
            //     rangeVal?.[0] !== value[0])
            // ) {
            //   if (value[1] - value[0] > 60 * 5) {
            //     setRangeVal(value);
            //   }
            // }
          }}
        />
      </div>
    </div>
  );
};

export default GraphItem;
