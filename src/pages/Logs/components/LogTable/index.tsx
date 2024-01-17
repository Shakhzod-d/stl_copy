import Select from "@/components/elements/Select";
import { select_paging } from "@/constants";
import useApi from "@/hooks/useApi";
import useApiMutation from "@/hooks/useApiMutation";
import { IDriverData } from "@/types/driver.type";
import { ILog } from "@/types/log.type";
import { mapDrivers } from "@/utils";
import { Button, Table } from "antd";
import React, { Key, useState } from "react";

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
            style={{
               height: 1000,
            }}
            className="pointer action"
            rowSelection={{
               selectedRowKeys,
               onChange: onSelectChange,
            }}
            onRow={(record: ILog, rowIndex) => {
               return {
                  onMouseEnter: () => setHoveredId(record._id || null), // mouse enter row
                  onMouseLeave: () => setHoveredId(null), // mouse leave row
               };
            }}
            rowClassName={(record) => {
               return record._id === hoveredId ? "hovered" : "";
            }}
            scroll={{ x: "max-content", y: 400 }}
            pagination={false}
         />
         <h4 className="mt-32">Switch to co-driver:</h4>
         <div className="d-flex">
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
                        logs: selectedRowKeys.map((id) => ({
                           _id: id as string,
                        })),
                     })
                  }
               >
                  SWITCH
               </Button>
            ) : null}
         </div>
      </div>
   );
};

export default LogTable;
