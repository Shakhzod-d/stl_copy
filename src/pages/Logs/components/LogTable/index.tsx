import React from "react";
import { Button, Table } from "antd";
import Modal from "@/components/elements/Modal";
import { ILog } from "@/types/log.type";

interface ILogTable {
     columns: any;
     data: any;
     setHoveredId: any;
     hoveredId: any;
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
     // rowSelection,
}) => {
     const [selectedRowKeys, setSelectedRowKeys] =
          React.useState<React.Key[]>();
     const [isVisibleCoordinates, setIsVisibleCoordinates] =
          React.useState(false);

     const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
          setSelectedRowKeys(newSelectedRowKeys);
     };
     return (
          <div>
               <Table
                    columns={columns}
                    dataSource={data}
                    className="pointer action"
                    rowSelection={{
                         selectedRowKeys,
                         onChange: onSelectChange,
                    }}
                    onRow={(record: ILog, rowIndex) => {
                         return {
                              onMouseEnter: () => setHoveredId(record._id), // mouse enter row
                              onMouseLeave: () => setHoveredId(null), // mouse leave row
                         };
                    }}
                    rowClassName={(record) => {
                         return record._id === hoveredId ? "hovered" : "";
                    }}
                    scroll={{ x: "max-content", y: 400 }}
                    pagination={false}
               />
               <div className="d-flex justify-space-between mt-32">
                    <div className="d-flex">
                         <Button onClick={() => setIsVisibleCoordinates(true)}>
                              Coordinates
                         </Button>
                         <Button>Copy Logs</Button>
                    </div>
                    <div className="d-flex">
                         <Button>Bulk edit</Button>
                         <Button>Cancel</Button>
                    </div>
               </div>
               <Modal visible={isVisibleCoordinates}>
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
               </Modal>
          </div>
     );
};

export default LogTable;
