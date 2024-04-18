import Select from "@/components/elements/Select";
import { select_paging } from "@/constants";
import useApi from "@/hooks/useApi";
import useApiMutation from "@/hooks/useApiMutation";
import { IDriverData } from "@/types/driver.type";
import { ILog } from "@/types/log.type";
import { mapDrivers } from "@/utils";
import { Button, Table } from "antd";
import React, { Key, useEffect, useState } from "react";

interface ILogTable {
  columns: any;
  data: ILog[];
  setHoveredId: any;
  hoveredId: any;
  driver?: IDriverData;
}

const LogTable: React.FC<ILogTable> = ({
  columns,
  data,
  setHoveredId,
  hoveredId,
  driver,
  //   rowSelection,
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
  const [switchingDriverId, setSwitchingDriverId] = useState();
  const onSelectChange = (newSelectedRowKeys: any[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  return (
    <div style={{ padding: "1rem 0" }}>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="_id"
        style={{
          maxHeight: "1000px",
          overflow: "scroll",
          // border: "1px solid red",
        }}
        className="pointer action"
        rowSelection={{
          selectedRowKeys,
          onChange: onSelectChange,
        }}
        onRow={(record: ILog, rowIndex) => {
          //  console.log("on click on row");
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
                drivers?.data?.data?.filter((d) => d._id !== driver?._id) || []
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
