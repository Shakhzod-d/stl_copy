import Slider from "rc-slider";
import React, { useEffect, useState } from "react";
import Icon from "@/components/icon/Icon";
import { ISetState, TItemStatus } from "@/types";
import { getDurationDate, parseUnix } from "@/utils";
import { ILog } from "@/types/log.type";
import moment from "moment";

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
   isLastLog: boolean;
   isFirstLog: boolean;
   isPrevLogDisabled: boolean | undefined;
   isNextLogDisabled: boolean | undefined;
   hoverLogOptions?: {
      show: "duration" | "time";
   };
}
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
   isLastLog,
   isFirstLog,
   hoverLogOptions = {
      show: "duration",
   },
   // isPrevLogDisabled,
   // isNextLogDisabled,
}) => {
   const [rangeVal, setRangeVal] = useState<any>(initialItem.rangeVal || []);

   const item = initialItem;
   const start = initialItem.start;
   const end = initialItem.end;
   const status = item.status;
   const ONE_DAY_SECONDS = 24 * 60 * 60 - 1; // 24 hours
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

   useEffect(() => {
      // console.log(currentLog, rangeVal);
   }, [currentLog, rangeVal]);

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

   return (
      <>
         {status === "intermediate" ? (
            <div
               className={`${status}`}
               style={{
                  left: itemPosition,
                  top: topPosition,
               }}
            >
               <span
                  className={`circle ${
                     item._id === hoveredId ? "hovered" : ""
                  }`}
                  onMouseEnter={() => !currentLog && setHoveredId?.(item._id)}
                  onMouseLeave={() => setHoveredId?.("")}
               />
               <span className="time">
                  {moment(parseUnix(start)).format("HH:mm:ss")}
               </span>
            </div>
         ) : !initialItem.isNewLog ? (
            <div
               style={{
                  width: itemWidth,
                  left: itemPosition,
               }}
               className={`box-wrapper ${status} ${
                  /* ? "readonly"
                                   : " " + */ item._id === hoveredId
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
                        <span className="start">
                           {moment(parseUnix(start)).format("HH:mm:ss")}
                        </span>
                        <span className="end">
                           {moment(parseUnix(end)).format("HH:mm:ss")}
                        </span>
                        {/* <span className="duration">
                               moment.duration(duration).seconds()
                         </span> */}
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

               {!item.isEnded &&
               item?.hasFlag &&
               // item.cropPoint === "start" &&
               item.cropPoint !== "end" ? (
                  <span
                     className="flag-content"
                     style={{
                        width: graphWidth * 0.002,
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
                  width: rangeWidth,
               }}
            >
               <Icon icon="range-left" className="range-left" />
               <Icon icon="range-right" className="range-right" />
               <span className="time time-left">
                  {moment(parseUnix(initialTime + rangeVal[0])).format(
                     "HH:mm:ss"
                  )}
               </span>
               <span className="time time-right">
                  {moment(parseUnix(initialTime + rangeVal[1])).format(
                     "HH:mm:ss"
                  )}
               </span>
               {getStatusDuration(start, end)}
            </div>
            <Slider
               allowCross={false}
               min={0}
               max={ONE_DAY_SECONDS}
               value={rangeVal}
               range
               onAfterChange={(value: any) => {
                  // const val = [
                  //      value[0] - (value[0] % 1000),
                  //      value[1] - (value[1] % 1000),
                  // ];
                  afterRangeChange?.(value, item);
               }}
               onChange={(value: any) => {
                  if (
                     //. !isPrevLogDisabled &&
                     (!isFirstLog ||
                        !(rangeVal?.[0] === 0) ||
                        rangeVal?.[1] !== value[1]) &&
                     //. !isNextLogDisabled &&
                     (!isLastLog ||
                        !(rangeVal?.[1] === 60 * 60 * 24) ||
                        rangeVal?.[0] !== value[0])
                  ) {
                     if (value[1] - value[0] > 60 * 5) {
                        setRangeVal(value);
                     }
                  }
               }}
            />
         </div>
      </>
   );
};

export default GraphItem;
