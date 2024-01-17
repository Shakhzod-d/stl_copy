import React from "react";
import { useResizeDetector } from "react-resize-detector";
import { ISetState, TItemStatus } from "@/types";
import GraphItem from "./GraphItem";
import { POINT_STATUSES } from "../constants";
import { ILog } from "@/types/log.type";
import useTimeZone from "@/hooks/useMomentZone";
import "rc-slider/assets/index.css";
import { getDurationDate, parseUnix } from "@/utils";

export interface IGraph {
   data?: ILog[];
   setHoveredId?: ISetState<string | null>;
   hoveredId?: string | null;
   currentLog?: ILog | null;
   setCurrentLog?: ISetState<ILog | null>;
   afterRangeChange?: (val: any, item: any) => void;
   initialTime?: number;
   isFetching?: boolean;
}

const Graph: React.FC<IGraph> = ({
   data: logs = [],
   setHoveredId,
   hoveredId,
   currentLog,
   setCurrentLog,
   afterRangeChange,
   isFetching,
   initialTime = 0,
}) => {
   const { width: graphWidth, height: graphHeight, ref } = useResizeDetector();

   const momentZone = useTimeZone();

   const getLastStatus = (i: number): TItemStatus => {
      let index = i;
      let status: TItemStatus = "off";
      if (
         !POINT_STATUSES.includes(logs?.[index]?.status) &&
         POINT_STATUSES.includes(logs?.[index - 1]?.status)
      ) {
         while (POINT_STATUSES.includes(logs?.[index - 1]?.status)) {
            status = logs?.[index - 2]?.status;
            index--;
         }
      } else {
         status = logs?.[index - 1]?.status ?? null;
      }
      return status;
   };

   const getTotalTime = (statusType: TItemStatus[]) => {
      const totalSum = () =>
         logs?.reduce(
            (prev: number, log: ILog) =>
               statusType.includes(log.status)
                  ? log.end - log.start + prev
                  : prev,
            0
         );
      const result = momentZone((totalSum() + initialTime) * 1000).format(
         "HH:mm"
      );
      return result === "00:00" && totalSum() > 0 ? "23:59" : result;
   };

   const mainDuration = () => {
      if (logs.length) {
         const start = parseUnix(logs[0].start);
         const end = parseUnix(logs[logs.length - 1].end);
         const { hours, minutes, seconds } = getDurationDate(start, end);
         return `${hours}:${minutes}:${seconds}`;
      }
      return "00:00:00";
   };

   return (
      <div className="graph-container">
         <div className="graph-content">
            <div className="graph-body">
               <img
                  src="/assets/icons/roller.svg"
                  alt=""
                  className="graph-image"
                  id="graph-image"
               />
               <div className="status-wrapper">
                  <div className="status-inner" ref={ref}>
                     {!isFetching &&
                        logs?.length > 0 &&
                        logs?.map((item, i: number) => (
                           <GraphItem
                              key={item._id}
                              item={item}
                              lastStatus={getLastStatus(i)}
                              graphWidth={graphWidth || 0}
                              graphHeight={graphHeight}
                              currentLog={currentLog}
                              setCurrentLog={setCurrentLog}
                              setHoveredId={setHoveredId}
                              hoveredId={hoveredId}
                              initialTime={initialTime || 0}
                              isLastLog={logs.length - 1 === i}
                              isFirstLog={0 === i}
                              afterRangeChange={afterRangeChange}
                              isPrevLogDisabled={logs[i - 1]?.hasFlag}
                              isNextLogDisabled={logs[i + 1]?.hasFlag}
                           />
                        ))}
                  </div>
               </div>
            </div>
            <div className="graph-duration">
               <div className="duration-wrapper">
                  <span>{getTotalTime(["off", "off_pc"])}</span>
                  <span>{getTotalTime(["sb"])}</span>
                  <span>{getTotalTime(["dr"])}</span>
                  <span>{getTotalTime(["on", "on_ym"])}</span>
               </div>
            </div>
         </div>
         <div className="graph-total">
            {/* <span>Total: {"1108"}</span> */}
            <span>Total: {mainDuration()}</span>
         </div>
      </div>
   );
};

export default Graph;

// Each member of the union type '{ (callbackfn: (previousValue: _i_ , currentValue: _i_ , currentIndex: number, array: _i_ []) => _i_ ):
//      _i_ ; (callbackfn: (previousValue: _i_ , currentValue: _i_ , currentIndex: number, array: _i_ []) => _i_ , initialValue: _i_ ):
//      _i_ ; <U>(callbackfn: (previousValue: U, ...' has signatures, but none of those signatures are compatible with each other.
