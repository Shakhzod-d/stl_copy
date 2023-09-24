import RangePicker from "@/components/elements/RangePicker";
import Select from "@/components/elements/Select";
import useApi from "@/hooks/useApi";
import useMomentZone from "@/hooks/useMomentZone";
import { useQueryParams } from "@/hooks/useQueryParams";
import MainLayout from "@/layouts/MainLayout";
import { IPageData } from "@/types";
import { IDriverData } from "@/types/driver.type";
import { historyPush } from "@/utils";
import { Table } from "antd";
import React, { useState } from "react";
import { ILogsByDriver, useColumnsLogsByDriver } from "./LogsByDriver.columns";

const LogsByDriver: React.FC = () => {
  const momentZone = useMomentZone();

  const { data: driversData, isLoading: driversDataIsLoading } = useApi<
    IPageData<ILogsByDriver[]>
  >("/drivers", { page: 1, limit: 100 });

  const [driver, setDriver] = useQueryParams("driver_id", null);
  const [violations, setViolations] = useQueryParams("violations", null);
  const [warnings, setWarnings] = useQueryParams("warnings", null);
  const [rangeDate, setRangeDate] = useState<any>();

  const columns = useColumnsLogsByDriver();

  // Get all drivers data
  // const [queryKey, setQueryKey] = useState()
  const { data: LogsByDriverData, isLoading } = useApi<{
    data: any[];
  }>(
    `/logs/bydriver`,
    {
      driver,
      from: rangeDate?.[0].unix(),
      to: rangeDate?.[1].unix(),
    },
    {
      enabled: !!driver && !!rangeDate,
    }
  );

  return (
    <MainLayout>
      <div className="logs-by-driver page">
        <div className="logs-by-driver-head">
          <div className="logs-by-driver-head-left">
            <Select
              data={driversData?.data.data}
              value={driver}
              loading={isLoading}
              setValue={setDriver}
              placeholder="Driver"
              labelProp="firstName"
              labelProp2="lastName"
            />
            <RangePicker onChange={setRangeDate} value={rangeDate} />
          </div>
          <div className="logs-by-driver-head-right">
            <Select
              data={[]}
              value={violations}
              setValue={setViolations}
              placeholder="Violations 0"
            />
            <Select
              data={[]}
              value={warnings}
              setValue={setWarnings}
              placeholder="Warnings 0"
            />
          </div>
        </div>
        <div className="logs-by-driver-body mt-24">
          <Table
            className="pointer"
            columns={columns}
            // dataSource={fakeData}
            dataSource={LogsByDriverData?.data?.data?.map((item, index) => ({
              ...item,
              no: index + 1,
            }))}
            /* pagination={{
              onChange: (page) => setPage(page),
              current: page,
              pageSize: PAGE_LIMIT,
              total: totalPage,
            }} */
            pagination={false}
            onRow={({ driverId, date }) => {
              return {
                onClick: () =>
                  historyPush(
                    `/main/log/logs/inner/${driverId}?time=${date * 1000}`
                  ),
              };
            }}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default LogsByDriver;
