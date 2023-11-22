import React, { Key, useState } from "react";
import { Button, Table } from "antd";
import Modal from "@/components/elements/Modal";
import { ILog } from "@/types/log.type";
import useApiMutation from "@/hooks/useApiMutation";
import useApi from "@/hooks/useApi";
import { IDriverData } from "@/types/driver.type";
import { select_paging } from "@/constants";
import { mapDrivers } from "@/utils";
import Select from "@/components/elements/Select";
import { useLogsInnerContext } from "../LogsInner.context";

interface ILogTable {
     columns: any;
     data: ILog[];
     setHoveredId: any;
     hoveredId: any;
     driver?: IDriverData;
     // rowSelection: {
     //      selectedRowKeys: React.Key[];
     //      onChange: (newSelectedRowKeys: React.Key[]) => void;
     //      columns: ILog[];
     // };
}

const LogTable: React.FC<ILogTable> = ({
     columns,
     data,
     setHoveredId,
     hoveredId,
     driver,
     // rowSelection,
}) => {
     const { mutate } = useApiMutation<{
          coDriverId: string;
          logs: {
               _id: string;
          }[];
     }>("logs/switch");
     const { data: drivers, isLoading: driverLoad } = useApi<{
          data: IDriverData[];
     }>("/drivers", select_paging, { suspense: true });
     const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>();

     const onSelectChange = (newSelectedRowKeys: any[]) => {
          setSelectedRowKeys(newSelectedRowKeys);
     };
     const [switchingDriverId, setSwitchingDriverId] = useState();

     return (
          <div>
               <Table
                    columns={columns}
                    dataSource={data}
                    rowKey="_id"
                    className="pointer action"
                    rowSelection={{
                         selectedRowKeys,
                         onChange: onSelectChange,
                    }}
                    onRow={(record: ILog, rowIndex) => {
                         return {
                              onMouseEnter: () =>
                                   setHoveredId(record._id || null), // mouse enter row
                              onMouseLeave: () => setHoveredId(null), // mouse leave row
                         };
                    }}
                    rowClassName={(record) => {
                         return record._id === hoveredId ? "hovered" : "";
                    }}
                    scroll={{ x: "max-content", y: 400 }}
                    pagination={false}
               />
               <div className="d-flex mt-32">
                    <div className="mr-16" style={{ width: 300 }}>
                         {selectedRowKeys?.length ? (
                              <Select
                                   // label={"Co-Driver"}

                                   placeholder={"Co-Driver"}
                                   // name="coDriverId"
                                   // control={control}
                                   data={mapDrivers(
                                        drivers?.data?.data?.filter(
                                             (d) => d._id !== driver?._id
                                        ) || []
                                   ).filter(
                                        (driver) => !driver.coDriverId // ! here is to driver create bug
                                   )}
                                   setValue={setSwitchingDriverId}
                                   value={switchingDriverId}
                                   labelProp="name"
                                   valueProp="_id"
                                   loading={driverLoad}
                              />
                         ) : null}
                    </div>
                    {switchingDriverId && selectedRowKeys?.length ? (
                         <Button
                              onClick={() =>
                                   mutate({
                                        coDriverId: switchingDriverId,
                                        logs: [],
                                   })
                              }
                         >
                              SWITCH
                         </Button>
                    ) : null}
               </div>
               {/* <div className="d-flex">
                         <Button>Bulk edit</Button>
                         <Button>Cancel</Button>
                    </div> */}
               {/* <Modal visible={isVisibleCoordinates}>
                    <table>
                         <tbody>
                              <tr>
                                   <td>&nbsp;</td>
                                   <td>&nbsp;</td>
                                   <td>&nbsp;</td>
                                   <td>&nbsp;</td>
                                   <td>&nbsp;</td>
                              </tr>
                              <tr>
                                   <td>&nbsp;</td>
                                   <td>&nbsp;</td>
                                   <td>&nbsp;</td>
                                   <td>&nbsp;</td>
                                   <td>&nbsp;</td>
                              </tr>
                              <tr>
                                   <td>&nbsp;</td>
                                   <td>&nbsp;</td>
                                   <td>&nbsp;</td>
                                   <td>&nbsp;</td>
                                   <td>&nbsp;</td>
                              </tr>
                              <tr>
                                   <td>&nbsp;</td>
                                   <td>&nbsp;</td>
                                   <td>&nbsp;</td>
                                   <td>&nbsp;</td>
                                   <td>&nbsp;</td>
                              </tr>
                              <tr>
                                   <td>&nbsp;</td>
                                   <td>&nbsp;</td>
                                   <td>&nbsp;</td>
                                   <td>&nbsp;</td>
                                   <td>&nbsp;</td>
                              </tr>
                         </tbody>
                    </table>
               </Modal> */}
          </div>
     );
};

export default LogTable;
