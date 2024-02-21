import DatePicker from "@/components/elements/DatePicker";
import DoubleButton from "@/components/elements/DoubleButton";
import Select from "@/components/elements/Select";
import Icon from "@/components/icon/Icon";
import useApi from "@/hooks/useApi";
import useMomentZone from "@/hooks/useMomentZone";
import { useQueryParams } from "@/hooks/useQueryParams";
import MainLayout from "@/layouts/MainLayout";
import { IViolation, TViolation } from "@/types/violation";
import { Button, Table } from "antd";
import { Moment } from "moment";
import React from "react";
import { NumberParam, useQueryParam, withDefault } from "use-query-params";
import { useLogErrorColumns } from "./LogErrors.columns";
import { Violations } from "@/constants/violations";
import { IDriverData } from "@/types/driver.type";
import { ILogsByDriver } from "../LogsByDriver/LogsByDriver.columns";
import { IPageData } from "@/types";

const LogErrors: React.FC = () => {
  const momentZone = useMomentZone();
  // Query params states
  // const [drivers, setDrivers] = useQueryParams("driver", null);
  const [violation, setViolation] = useQueryParams("warnings", null);

  const columns = useLogErrorColumns();

  const [time, setTime] = useQueryParam(
    "time",
    withDefault(NumberParam, momentZone().startOf("day").valueOf())
  );
  const [driver, setDriver] = useQueryParam("driver");
  const onDateChange = (value: Moment) => {
    setTime(momentZone(value).valueOf());
  };
  const handleLeft = () => {
    setTime(momentZone(time).add(-1, "day").valueOf());
  };
  const handleRight = () => {
    setTime(momentZone(time).add(1, "day").valueOf());
  };

  const { data, isFetching, isLoading, refetch } = useApi<IViolation[]>(
    "violations",
    {
      date: time / 1000,
      driverId: driver,
    }
  );
  const { data: DriversData } = useApi<IPageData<ILogsByDriver[]>>("drivers", {
    page: 1,
    limit: 200,
  });

  const dataViolations = data?.data?.map(
    (violation) => violation.Violations.violation
  );

  return (
    <MainLayout>
      <div className="logs page">
        <div className="logs-head">
          <div className="logs-head-left">
            <DatePicker
              onChange={onDateChange}
              value={momentZone(time)}
              allowClear={false}
            />
            <DoubleButton onLeft={handleLeft} onRight={handleRight} />
          </div>
          <div className="logs-head-right">
            <Select
              data={DriversData?.data.data}
              placeholder="Driver"
              setValue={setDriver}
              value={driver}
              labelProp="firstName"
              labelProp2="lastName"
            />
            <Select
              data={Violations.filter((option) =>
                dataViolations?.includes(option._id as TViolation)
              )}
              value={violation}
              setValue={setViolation}
              placeholder="Violations"
            />
            <Button type="primary" onClick={() => refetch()}>
              <Icon icon="refresh" />
              Refresh
            </Button>
          </div>
        </div>
        <div className="logs-body mt-24">
          <Table
            className="pointer"
            columns={columns}
            dataSource={data?.data?.filter((item) =>
              violation ? item.Violations.violation === violation : true
            )}
            loading={isFetching || isLoading}
            pagination={false}
            /* onRow={({ id }) => {
                                   return {
                                        onClick: () =>
                                             historyPush(
                                                  `/main/log/logs/inner/${id}`
                                             ),
                                   };
                              }} */
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default LogErrors;
