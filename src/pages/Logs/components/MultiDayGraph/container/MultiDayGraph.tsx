import useApi from "@/hooks/useApi";
import useMomentZone from "@/hooks/useMomentZone";
import useScrollToBottom from "@/hooks/useScrollToBottom";
import { TItemStatus } from "@/types";
import { IMultidayLogs } from "@/types/log.type";
import { Tooltip } from "antd";
import "rc-slider/assets/index.css";
import { useEffect } from "react";
import { useResizeDetector } from "react-resize-detector";
import GraphItem from "../../LogGraph/GraphItem";
import { useLogsInnerContext } from "../../LogsInner.context";
import { POINT_STATUSES } from "../../constants";
import { cropOneDayLogs } from "../../correction_algorithms";

interface IMultiDayGraph {}
const MultiDayGraph = ({}: IMultiDayGraph) => {
   const momentZone = useMomentZone();
   const {
      state: { driverData },
      actions: { setTime },
   } = useLogsInnerContext();
   console.log();
   const { width: graphWidth, height: graphHeight, ref } = useResizeDetector();
   const { data, isSuccess } = useApi<IMultidayLogs[]>(
      "/logs/range",
      {
         from: momentZone().startOf("day").unix() - 60 * 60 * 24 * 10,
         to: momentZone().startOf("day").unix(),
         driverId: driverData?.data._id,
      },
      { suspense: true, enabled: !!driverData?.data._id }
   );
   const { scrollRef, scrollToBottom } = useScrollToBottom();
   useEffect(() => {
      if (isSuccess) {
         scrollToBottom();
      }
   }, [isSuccess]);

   return (
      <div className="multi-day-graph-container">
         <Tooltip placement="topLeft" title={"Shift + scroll"}>
            <div className="graph-container">
               <div className="graph-content">
                  {data?.data.map(({ logs, day }) => {
                     const { croppedLogs } = cropOneDayLogs(logs, day);
                     const getLastStatus = (i: number): TItemStatus => {
                        let index = i;
                        let status: TItemStatus = "off";
                        if (
                           !POINT_STATUSES.includes(
                              croppedLogs?.[index]?.status
                           ) &&
                           POINT_STATUSES.includes(
                              croppedLogs?.[index - 1]?.status
                           )
                        ) {
                           while (
                              POINT_STATUSES.includes(
                                 croppedLogs?.[index - 1]?.status
                              )
                           ) {
                              status = croppedLogs?.[index - 2]?.status;
                              index--;
                           }
                        } else {
                           status = croppedLogs?.[index - 1]?.status ?? null;
                        }
                        return status;
                     };
                     return (
                        <div className="graph-body">
                           <img
                              src="/assets/icons/roller-multi-days.svg"
                              alt=""
                              className="graph-image"
                              id="graph-image"
                           />
                           <div className="status-wrapper">
                              <div className="status-inner" ref={ref}>
                                 {croppedLogs?.length > 0 &&
                                    croppedLogs?.map((item, i) => (
                                       <>
                                          <GraphItem
                                             key={item._id}
                                             item={item}
                                             lastStatus={getLastStatus(i)}
                                             graphWidth={graphWidth || 0}
                                             graphHeight={graphHeight}
                                             // currentLog={currentLog}
                                             setCurrentLog={() =>
                                                setTime(
                                                   momentZone(
                                                      item?.start * 1000
                                                   )
                                                      .startOf("day")
                                                      .valueOf()
                                                )
                                             }
                                             // setHoveredId={setHoveredId}
                                             // hoveredId={hoveredId}
                                             initialTime={day || 0}
                                             isLastLog={
                                                croppedLogs.length - 1 === i
                                             }
                                             isFirstLog={0 === i}
                                             isPrevLogDisabled={
                                                croppedLogs[i - 1]?.hasFlag
                                             }
                                             isNextLogDisabled={
                                                croppedLogs[i + 1]?.hasFlag
                                             }
                                             hoverLogOptions={{
                                                show: "time",
                                             }}
                                          />
                                          {i === croppedLogs.length - 1 && (
                                             <div ref={scrollRef} />
                                          )}
                                       </>
                                    ))}
                              </div>
                           </div>
                        </div>
                     );
                  })}
               </div>
            </div>
         </Tooltip>
      </div>
   );
};

export default MultiDayGraph;
