import { Table } from "antd";
import React from "react";
import DatePicker from "@/components/elements/DatePicker";
import DoubleButton from "@/components/elements/DoubleButton";
import MainLayout from "@/layouts/MainLayout";
import { historyPush } from "@/utils";
import { useMainColumns } from "../Logs/components/LogTable/columns";
import useApi from "@/hooks/useApi";
import { IDriverData } from "@/types/driver.type";
import {
  NumberParam,
  StringParam,
  useQueryParam,
  withDefault,
} from "use-query-params";
import { PAGE_LIMIT } from "@/constants/general.const";
import { IPageData } from "@/types";
import useParseData from "@/hooks/useParseData";
import SearchByQuery from "@/components/elements/SearchByQuery";
import useMomentZone from "@/hooks/useMomentZone";
import { Moment } from "moment";

const Trackings: React.FC = () => {
  const momentZone = useMomentZone();

  // Query params states
  const [search, setSearch] = useQueryParam(
    "name",
    withDefault(StringParam, undefined)
  );
  const [page, setPage] = useQueryParam("page", withDefault(NumberParam, 1));
  const [time, setTime] = useQueryParam(
    "time",
    withDefault(NumberParam, momentZone().valueOf())
  );

  // Get all drivers data
  const { data, isLoading, isFetching } = useApi<IPageData<IDriverData[]>>(
    "/drivers",
    { search, page, limit: PAGE_LIMIT, time: time / 1000 }
  );

  const columns = useMainColumns();

  // parse api data
  const { tableData, totalPage } = useParseData<IDriverData>(data);

  const handleLeft = () => {
    setTime(momentZone(time).add(-1, "day").valueOf());
  };
  const handleRight = () => {
    setTime(momentZone(time).add(1, "day").valueOf());
  };

  const onDateChange = (value: Moment) => {
    setTime(momentZone(value).valueOf());
  };

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
          <SearchByQuery
            className="mw-250 mr-8"
            placeholder={"Search"}
            query={search}
            setQuery={setSearch}
          />
        </div>
        <div className="logs-body mt-24">
          <Table
            className="pointer"
            columns={columns}
            dataSource={tableData}
            loading={isLoading || isFetching}
            pagination={{
              onChange: (page) => setPage(page),
              current: page,
              pageSize: PAGE_LIMIT,
              total: totalPage,
            }}
            onRow={({ _id }: IDriverData) => {
              return {
                onClick: () =>
                  historyPush(
                    `/main/trackings/inner/${_id}?time=${momentZone(
                      time
                    ).unix()}`
                  ),
              };
            }}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default Trackings;
