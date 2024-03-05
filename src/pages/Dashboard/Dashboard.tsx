import React, { useEffect, useMemo, useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import Accordion from "@/components/elements/Accordion";
import { Button, Input, Table } from "antd";
import Icon from "@/components/icon/Icon";
import MapContainer from "./component/MapContainer";
import { useColumns } from "./component/columns";
import TruckLoader from "@/components/loaders/TruckLoader";
import useApi from "@/hooks/useApi";
import { useQueryParams } from "@/hooks/useQueryParams";
import { IDashboardMap } from "@/types/dashbord.type";
import useParseData from "@/hooks/useParseData";

const Dashboard: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  // Query params states
  const [search, setSearch] = useState("");
  const [mapType, setMapType] = useQueryParams("map_type", "roadmap");

  const { data, status, refetch, isFetching } = useApi(
    "/map",
    { search },
    {
      suspense: true,
    }
  );

  const columns = useColumns();

  const { tableData: mapData } = useParseData<IDashboardMap>(data, false);

  const selectedDrivers = useMemo(() => {
    return mapData.filter((el: any) => selectedRowKeys.includes(el.key));
  }, [selectedRowKeys, mapData]);

  useEffect(() => {
    setSelectedRowKeys(
      mapData.map((el: any) => {
        return el.key;
      })
    );
  }, [mapData]);

  const filterDevice = (data: IDashboardMap[]) => {
    return data.filter((el) => el.device);
  };

  const changeMapType = () => {
    setMapType(mapType === "roadmap" ? "hybrid" : "roadmap");
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <MainLayout>
      <div className="dashboard">
        {/* {isFetching ? (
          <TruckLoader />
        ) : ( */}
        <>
          <Accordion
            className="mb-24"
            title="map"
            subButtons={
              <React.Fragment>
                <Button
                  type="primary"
                  className="medium capitalize"
                  onClick={changeMapType}
                >
                  {mapType === "roadmap" ? "satellite" : "roadmap"}
                </Button>
                <Button className="rounded outlined" onClick={() => refetch()}>
                  <Icon icon="refresh" />
                </Button>
              </React.Fragment>
            }
            content={
              <>
                {/* <h1>UnComment the map in Dashboard</h1> */}
                <MapContainer
                  mapType={mapType}
                  data={filterDevice(selectedDrivers)}
                />
              </>
            }
          />
          <Accordion
            title="units &"
            isClosable={false}
            subButtons={
              <Input
                className="mw-250 mr-8"
                placeholder={"Search"}
                style={{ borderRadius: "16px" }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            }
            content={
              <Table
                dataSource={mapData.map((item) => ({
                  ...item,
                  position: {
                    lat: 0,
                    lng: 0,
                  },
                }))}
                columns={columns}
                pagination={false}
                rowSelection={rowSelection}
              />
            }
          />
        </>
        {/*  )} */}
      </div>
    </MainLayout>
  );
};

export default Dashboard;
