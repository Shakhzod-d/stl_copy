import React from "react";
import { Progress } from "antd";
import { hexToRgba } from "@/utils";
import { ICycle, TItemStatus } from "@/types";
import moment from "moment-timezone";
import { AndroidFilled } from "@ant-design/icons";
import {
  BREAK_TIME_LIMIT,
  CYCLE_TIME_LIMIT,
  DRIVE_TIME_LIMIT,
} from "../constants";
import { SHIFT_TIME_LIMIT } from "./../constants";
import { getSumDuration } from "@/utils";
import { getTodaysInitialTime } from "../correction_algorithms";
import { IDriverData } from "@/types/driver.type";
import { ILog } from "@/types/log.type";

import { addMinutes, format } from "date-fns";
import { formatWithOptions } from "date-fns/fp";

interface Props {
  title: string;
  value: number;
  time: React.ReactNode | number | string | JSX.Element;
  color: string;
}

interface ILogsHead {
  logs: ILog[] | undefined;
  initialTime: number | undefined;
  cycle: ICycle | undefined;
  driverData: IDriverData;
}

const LogsHead: React.FC<ILogsHead> = ({
  logs = [],
  initialTime = 0,
  driverData,
  cycle = {
    break: 0,
    cycle: 0,
    drive: 0,
    shift: 0,
  },
}) => {
  const getStatusTotalTime = (statusType: TItemStatus) => {
    const totalSum = () =>
      logs.reduce(
        (prev, log) => (log.status === statusType ? log.duration + prev : prev),
        initialTime || 0
      );
    return {
      val: totalSum() - initialTime,
      time: moment.utc(totalSum() * 1000).format("HH:mm"),
    };
  };

  const getShiftTotalTime = () => {
    const totalSum = () =>
      logs.reduce(
        (prev, log) =>
          ["on", "on_ym", "dr"].includes(log.status)
            ? log.end - log.start + prev
            : prev,
        0
      );
    const TOTAL_STATUS_SUM = totalSum();
    return {
      val: TOTAL_STATUS_SUM - initialTime,
      time: moment.utc(TOTAL_STATUS_SUM * 1000).format("HH:mm"),
    };
  };

  // const isToday = initialTime === getTodaysInitialTime();

  return (
    <div className="logs-inner-head">
      <div className="driver-info">
        <div className="driver-info-top">
          <span className="circle" />
          <p className="name">
            {driverData.firstName + " " + driverData.lastName}
          </p>
          <div className="current-status">{driverData.currentStatus}</div>
          <AndroidFilled className="android-icon" />
        </div>
        <p className="driver-info-desc">Phone No: {driverData.phone}</p>
        <p className="driver-info-desc">
          {/* Driver ID: {driverData.driverId} */}
        </p>
        <p className="driver-info-desc">Mongo ID: {driverData._id}</p>
        <p className="driver-info-desc">
          Time-zone: {driverData.driverLicenseIssuingState}
        </p>
      </div>

      <div className="driver-progress-bar">
        <CircleProgress
          value={(cycle.break / BREAK_TIME_LIMIT) * 100}
          title="break"
          color="#db1c4c"
          time={moment.utc(cycle.break * 1000).format("HH:mm")}
          // time={getStatusTotalTime("sb").time}
        />
        <CircleProgress
          value={(cycle.drive / DRIVE_TIME_LIMIT) * 100}
          title="drive"
          color="#5CB176"
          // color={
          //      (getStatusTotalTime("dr").val /
          //           DRIVE_TIME_LIMIT) *
          //           100 <
          //      DRIVE_TIME_LIMIT
          //           ? "#5CB176"
          //           : "#FF0000"
          // }
          time={
            cycle.drive > 0 ? (
              moment.utc(cycle.drive * 1000).format("HH:mm")
            ) : (
              <span className="error-text">limit reached</span>
            )
          }
          // time={getStatusTotalTime("dr").time}
        />
        <CircleProgress
          value={(cycle.shift / SHIFT_TIME_LIMIT) * 100}
          title="shift"
          color="#66B7F1"
          time={
            cycle.shift > 0 ? (
              moment.utc(cycle.shift * 1000).format("HH:mm")
            ) : (
              <span className="error-text">limit reached</span>
            )
          }
        />
        <CircleProgress
          value={(cycle.cycle / CYCLE_TIME_LIMIT) * 100}
          title="cycle"
          color="#EE5E52"
          time={
            getSumDuration(cycle.cycle).hours > 0 ? (
              <>
                {getSumDuration(cycle.cycle).hours +
                  ":" +
                  getSumDuration(cycle.cycle).minutes}
              </>
            ) : (
              <span className="error-text">limit reached</span>
            )
          }
        />
      </div>
      <div className="driver-progress">
        <div className="driver-progress-info">
          <div className="driver-progress-info-item">
            <span>Worked hours: </span>
            <h5>{getShiftTotalTime().time}</h5>
          </div>
          <div className="driver-progress-info-item">
            <span>Violations:</span>{" "}
            <h5>{driverData.violations?.length || "No"}</h5>
          </div>
          <div className="driver-progress-info-item">
            <span>Signature:</span>{" "}
            <h5>{driverData.violations?.length || "No"}</h5>
          </div>
        </div>
        {/* ) : (
                    <div style={{ height: 124 }}></div> */}
      </div>
    </div>
  );
};

const CircleProgress: React.FC<Props> = ({ title, value, time = 0, color }) => {
  // console.log(`time`, time);

  if (typeof time === "number" && !isNaN(time)) {
    // Calculate off-duty time
    const currentTime = new Date();
    const logEndTime = addMinutes(currentTime, time); // Assuming 'time' is in minutes

    // Format the off-duty time
    const formattedEndTime = format(logEndTime, "hh:mm a");

    console.log("Off-duty time:", formattedEndTime);
  } else {
    console.error("Invalid time:", time);
  }

  return (
    <Progress
      type="circle"
      percent={value}
      strokeWidth={10}
      className="logs-progress"
      trailColor={hexToRgba(color, 0.1)}
      strokeColor={color}
      format={() => (
        <div className="logs-progress-content">
          <div
            className="circle"
            style={{
              transform: `translate(-50%, -50%) rotate(${3.6 * value - 6}deg)`,
            }}
          />
          <div className="border">
            <svg
              viewBox="0 0 78 78"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="39"
                cy="39"
                r="38.25"
                stroke={color}
                strokeWidth="1"
                strokeLinecap="round"
                strokeDasharray="1 5"
              />
            </svg>
          </div>
          <div className="info">
            <p>{title}</p>
            <span style={{ color }}>{time}</span>
          </div>
        </div>
      )}
      width={100}
    />
  );
};

export default LogsHead;
