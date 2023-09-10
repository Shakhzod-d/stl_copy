import { useState, FC } from "react";
import { getDurationDate, mapDriverLogs } from "@/utils";
import LogGraph from "../../LogGraph";
import LogTable from "../../LogTable";
import moment from "moment-timezone";
import { DriverStatus } from "@/components/elements/TableElements";
import { ILog } from "@/types/log.type";

const OriginalLogs: FC<{ logs: ILog[] }> = ({ logs }) => {
     const [hoveredId, setHoveredId] = useState<string | null>(null);
     const [currentLog, setCurrentLog] = useState();
     const columns = useGraphColumns(() => { });
     return (
          <div className="original-logs-modal">
               <LogGraph
                    data={logs}
                    setHoveredId={setHoveredId}
                    hoveredId={hoveredId}
                    initialTime={logs[0].start}
               />
               <LogTable
                    data={logs}
                    columns={columns}
                    setHoveredId={setHoveredId}
                    hoveredId={hoveredId}
               />
          </div>
     );
};

const useGraphColumns = (setCurrentLog: any) => {
     return [
          {
               title: "no",
               dataIndex: "number",
          },
          {
               title: "status",
               dataIndex: "status",
               render: DriverStatus,
          },
          {
               title: "Start",
               dataIndex: "start",
               render: (date: any) => (
                    <span>{moment(date).format("hh:mm:ss A")}</span>
               ),
          },
          {
               title: "duration",
               dataIndex: "end",
               render: (time: any, { start, end }: any) => {
                    const { seconds, minutes, hours } = getDurationDate(
                         start,
                         end
                    );
                    return (
                         <span>
                              {hours ? `${hours}h:` : ""}
                              {minutes ? `${minutes}m:` : ""}
                              {seconds ? `${seconds}s` : ""}
                         </span>
                    );
               },
          },
          {
               title: "location",
               dataIndex: "location",
          },
          {
               title: "Vehicle",
               dataIndex: "vehicle",
          },
          {
               title: "Odometer",
               dataIndex: "odometer",
          },
          {
               title: "Eng. hours",
               dataIndex: "hours",
          },
          {
               title: "Notes",
               dataIndex: "notes",
               render: () => <>...</>,
          },
          {
               title: "Document",
               dataIndex: "document",
          },
     ];
};

export default OriginalLogs;
