import React from "react";
import MainLayout from "@/layouts/MainLayout";
import DoubleButton from "@/components/elements/DoubleButton";
import DatePicker from "@/components/elements/DatePicker";
import Select from "@/components/elements/Select";
import { Table, Button } from "antd";
import { historyPush } from "@/utils";
import Icon from "@/components/icon/Icon";
import { fakeData, useMainColumns } from "../Logs/components/LogTable/columns";
import { useQueryParams } from "@/hooks/useQueryParams";
import useApi from "@/hooks/useApi";
import { IViolation } from "@/types/violation";
import useMomentZone from "@/hooks/useMomentZone";
import { NumberParam, useQueryParam, withDefault } from "use-query-params";
import { Moment } from "moment";

const LogErrors: React.FC = () => {
  const momentZone = useMomentZone();
  // Query params states
  const [drivers, setDrivers] = useQueryParams("driver", null);
  const [warnings, setWarnings] = useQueryParams("warnings", null);

  const columns = useMainColumns();

  const [time, setTime] = useQueryParam(
    "time",
    withDefault(NumberParam, momentZone().startOf("day").valueOf())
  );
  const onDateChange = (value: Moment) => {
    setTime(momentZone(value).valueOf());
  };
  const handleLeft = () => {
    setTime(momentZone(time).add(-1, "day").valueOf());
  };
  const handleRight = () => {
    setTime(momentZone(time).add(1, "day").valueOf());
  };

  const { data } = useApi<IViolation[]>("violations", {
    date: time / 1000,
  });
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
              data={[]}
              value={drivers}
              setValue={setDrivers}
              placeholder="Drivers"
            />
            <Select
              data={[]}
              value={warnings}
              setValue={setWarnings}
              placeholder="Warnings"
            />
            <Button type="primary">
              <Icon icon="refresh" />
              Refresh
            </Button>
          </div>
        </div>
        <div className="logs-body mt-24">
          <Table
            className="pointer"
            columns={columns}
            dataSource={data?.data}
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
