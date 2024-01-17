import { Button, Col, Table, Row, Modal, Tag } from "antd";
import { ColumnsType } from "antd/lib/table";
import React, { FC, useState } from "react";
import {
     ISetState,
     TItemStatus,
} from "@/types";
import Graph from "../../LogGraph";
import moment from "moment-timezone";
import deepDiffObjs from "@/utils/deepDiffObjs";
import {
     ArrowLeftOutlined,
     FastBackwardOutlined,
     MenuFoldOutlined,
} from "@ant-design/icons";
import DeleteConfirm from "@/components/elements/PopConfirms/DeleteConfirm";
import {
     DriverStatus,
     TableAction,
} from "@/components/elements/TableElements/TableElements";
import { IHistoryLog, ILog } from "@/types/log.type";
// @ts-ignore
// const data2: ILog[] = fakeData.data.logs;
interface IHistoryTable {
     logs: ILog[];
     setIsHistoryLogVisible: ISetState<boolean>;
     historyLogs?: IHistoryLog[];
     onRevert: (revertLogs: ILog[]) => void;
}
const HistoryTable: FC<IHistoryTable> = ({
     setIsHistoryLogVisible,
     historyLogs,
     onRevert,
}) => {
     const [currentHistoryGraph, setCurrentHistoryGraph] =
          useState<IHistoryLog>();
     const columns = useColumns(
          // @ts-ignore
          setCurrentHistoryGraph,
          setIsHistoryLogVisible,
          onRevert
     );

     const dataSourceAfterColumnsTable = currentHistoryGraph?.beforeLogs
          .map((log, index) =>
               deepDiffObjs().map(
                    currentHistoryGraph?.afterLogs
                         .filter((log) => log.status !== "intermediate")
                         .map(({ start, end, duration, status }) => ({
                              start,
                              end,
                              status,
                              duration,
                         }))[index],
                    currentHistoryGraph?.beforeLogs
                         .filter((log) => log.status !== "intermediate")
                         .map(({ start, end, duration, status }) => ({
                              start,
                              end,
                              status,
                              duration,
                         }))[index]
               )
          )
          .filter((log) => !log?.type);
     return (
          <div style={{ padding: "0 38px 38px 38px" }}>
               <Table
                    pagination={{ position: ["topCenter"], pageSize: 5 }}
                    dataSource={historyLogs}
                    columns={columns}
               />
               <Modal
                    onCancel={() => {
                         setCurrentHistoryGraph(undefined);
                    }}
                    visible={!!currentHistoryGraph}
                    okButtonProps={{ disabled: true }}
                    zIndex={1005}
                    width="90vw"
                    style={{
                         top: 20,
                    }}
                    bodyStyle={{
                         height: "90vh",
                         padding: 15,
                    }}
               >
                    <Row gutter={[16, 16]}>
                         <Col span={12}>
                              <h1 className="bold-24 mt-16 mb-16">
                                   Corrected by Rajapboyev Temurbek
                              </h1>
                              <Graph
                                   // @ts-ignore
                                   data={currentHistoryGraph?.beforeLogs}
                                   initialTime={
                                        currentHistoryGraph?.beforeLogs[0].start
                                   }
                              />
                              <Table
                                   dataSource={currentHistoryGraph?.beforeLogs.filter(
                                        (log) => log.status !== "intermediate"
                                   )}
                                   columns={beforeColumns}
                                   pagination={false}
                                   scroll={{ x: "max-content", y: 340 }}
                                   size="small"
                                   bordered
                                   rowClassName="history-table-row"
                              />
                         </Col>
                         <Col span={12}>
                              <h1 className="bold-24 mt-16 mb-16">Edition</h1>
                              <Graph
                                   // @ts-ignore
                                   data={currentHistoryGraph?.afterLogs}
                                   initialTime={
                                        currentHistoryGraph?.afterLogs[0].start
                                   }
                              />
                              <Table
                                   dataSource={dataSourceAfterColumnsTable}
                                   columns={afterColumns}
                                   pagination={false}
                                   scroll={{ x: "max-content", y: 340 }}
                                   size="small"
                                   bordered
                                   rowClassName="history-table-row"
                              />
                         </Col>
                    </Row>
               </Modal>
          </div>
     );
};

interface IAfterColumns {
     start: {
          type: TEditType;
          data: number;
     };
     end: {
          type: TEditType;
          data: number;
     };
     status: {
          type: TEditType;
          data: TItemStatus;
     };
     odometer: {
          type: TEditType;
          data: any;
     };
     location: {
          type: TEditType;
          data: any;
     };
}
type TEditType = "updated" | "unchanged" | "deleted";

const beforeColumns: ColumnsType<any> = [
     {
          title: "no",
          dataIndex: "number",
     },
     {
          title: "status",
          dataIndex: "status",
          render(value, record, index) {
               return DriverStatus(value);
          },
     },
     {
          title: "Start",
          dataIndex: "start",
          render: (val) => <span>{moment(val * 1000).format("HH:mm:ss")}</span>,
     },
     {
          title: "End",
          dataIndex: "end",
          render: (val) => <span>{moment(val * 1000).format("HH:mm:ss")}</span>,
     },
];
const afterColumns: ColumnsType<IAfterColumns> = [
     {
          key: "id",
          title: "№",
          render(value, record, index) {
               return index + 1;
          },
     },
     {
          key: "id",
          title: "cor",
          render(value, record, index) {
               const datas = [
                    record?.end?.type,
                    record?.start?.type,
                    record?.status?.type,
                    record?.location?.type,
                    record?.odometer?.type,
               ];
               return (
                    <Tag
                         color={
                              datas.includes("updated")
                                   ? "#2db7f5"
                                   : datas.includes("deleted")
                                        ? "#ee5e52"
                                        : "#000"
                         }
                    >
                         {datas.includes("updated")
                              ? "#updated"
                              : datas.includes("deleted")
                                   ? "#edeletede5e52"
                                   : "#not changed"}
                    </Tag>
               );
          },
          width: "min-content",
     },
     {
          key: "id",
          title: "status",
          dataIndex: "status",
          render(value, record, index) {
               return DriverStatus(value?.data);
          },
     },
     {
          key: "id",
          title: "start",
          dataIndex: "start",
          render(value) {
               return moment(value?.data * 1000).format("HH:mm:ss");
          },
     },
     {
          key: "id",
          title: "end",
          dataIndex: "end",
          render(value) {
               return moment(value?.data * 1000).format("HH:mm:ss");
          },
     },
];

const useColumns = (
     setCurrentHistoryGraph: ISetState<IHistoryLog>,
     setIsHistoryLogVisible: ISetState<boolean>,
     onRevert: (revertLogs: ILog[]) => void
): ColumnsType<IHistoryLog> => [
          {
               title: "Corrector",
               dataIndex: "user",
               key: "id",
          },
          {
               title: "Edited on",
               dataIndex: "editTime",
               key: "id",
               render(value, record, index) {
                    return moment(record.createdAt).format("MMMM Do YYYY, HH:mm:ss");
               },
          },
          {
               title: "type",
               dataIndex: "type",
               key: "id",
               render(value, record, index) {
                    return (
                         <div>
                              <p>correction</p>
                              <div className="d-flex   align-center">
                                   <Button
                                        type="primary"
                                        style={{
                                             borderRadius: 5,
                                             // width: 62,
                                             // height: 24,
                                        }}
                                        onClick={() => {
                                             // setIsHistoryLogVisible(false);
                                             setCurrentHistoryGraph(record);
                                        }}
                                   >
                                        <MenuFoldOutlined />
                                        View
                                   </Button>
                                   <Button
                                        type="ghost"
                                        style={{
                                             borderRadius: 5,
                                             // width: 62,
                                             // height: 24,
                                             backgroundColor: "#66b7f1",
                                             color: "white",
                                        }}
                                        onClick={() => {
                                             setIsHistoryLogVisible(false);

                                             // setCurrentHistoryGraph(record);
                                             onRevert(record.beforeLogs);
                                        }}
                                   >
                                        <ArrowLeftOutlined />
                                        Revert
                                   </Button>
                              </div>
                         </div>
                    );
               },
          },
     ];
export default HistoryTable;
// interface DataType {
//      key: React.Key;
//      corrector: string;
//      id: any;
//      before: string;
//      after: string;
//      when: string;
// }

// const dataSource: DataType[] = [
//      {
//           key: "1",
//           corrector: "Muhammadkarim Tursunov",
//           before: "10-05-2022 12:11:09 am",
//           after: "10-05-2022 07:51:31 am",
//           when: "10-05-2022 07:57:19 am",
//      },
//      {
//           key: "2",
//           corrector: "Muhammadkarim Tursunov",
//           before: "10-05-2022 12:11:09 am",
//           after: "10-05-2022 07:51:31 am",
//           when: "10-05-2022 07:57:19 am",
//      },
//      {
//           key: "3",
//           corrector: "Muhammadkarim Tursunov",
//           before: "10-05-2022 12:11:09 am",
//           after: "10-05-2022 07:51:31 am",
//           when: "10-05-2022 07:57:19 am",
//      },
// ];
