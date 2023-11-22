import React from "react";
import MainLayout from "@/layouts/MainLayout";
import DoubleButton from "@/components/elements/DoubleButton";
import DatePicker from "@/components/elements/DatePicker";
import SearchByQuery from "@/components/elements/SearchByQuery";
import Select from "@/components/elements/Select";
import { Table } from "antd";
import { historyPush } from "@/utils";
import { useMainColumns } from "./components/LogTable/columns";
import useApi from "@/hooks/useApi";
import { IDriverData } from "@/types/driver.type";
import { IPageData } from "@/types";
import useParseData from "@/hooks/useParseData";
import { PAGE_LIMIT } from "@/constants/general.const";
import {
     NumberParam,
     StringParam,
     useQueryParam,
     withDefault,
} from "use-query-params";
import useMomentZone from "@/hooks/useMomentZone";
import { Moment } from "moment-timezone";
import { useDriversData } from "./services/useDriversData";
import { IViolation } from "@/types/violation";

const Logs: React.FC = () => {
     const momentZone = useMomentZone();

     // Query params states
     const [violations, setViolations] = useQueryParam(
          "violation",
          withDefault(StringParam, undefined)
     );
     const [warnings, setWarnings] = useQueryParam(
          "warning",
          withDefault(StringParam, undefined)
     );
     const [location, setLocation] = useQueryParam(
          "location",
          withDefault(StringParam, undefined)
     );
     const [search, setSearch] = useQueryParam(
          "name",
          withDefault(StringParam, undefined)
     );
     const [time, setTime] = useQueryParam(
          "time",
          withDefault(NumberParam, momentZone().startOf("day").valueOf())
     );

     const { isFetching, isLoading, page, setPage, tableData, totalPage } =
          useDriversData({
               search,
               location,
               time,
          });


     const columns = useMainColumns();

     const handleLeft = () => {
          setTime(momentZone(time).add(-1, "day").valueOf());
     };
     const handleRight = () => {
          setTime(momentZone(time).add(1, "day").valueOf());
     };

     const onDateChange = (value: Moment) => {
          setTime(momentZone(value).valueOf());
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
                              <DoubleButton
                                   onLeft={handleLeft}
                                   onRight={handleRight}
                              />
                         </div>
                         <div className="logs-head-right">
                              <SearchByQuery
                                   className="mw-250"
                                   placeholder={"Search"}
                                   query={search}
                                   setQuery={setSearch}
                              />
                              <SearchByQuery
                                   className="mw-250"
                                   placeholder={"Location"}
                                   query={location}
                                   setQuery={setLocation}
                              />
                              <Select
                                   data={data?.data.map((item) => ({
                                        ...item,
                                   }))}
                                   value={violations}
                                   setValue={setViolations}
                                   placeholder="Violations"
                              />
                              <Select
                                   data={[]}
                                   value={warnings}
                                   setValue={setWarnings}
                                   placeholder="Warnings"
                              />
                         </div>
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
                              onRow={({ _id }) => {
                                   return {
                                        onClick: () =>
                                             historyPush(
                                                  `/main/log/logs/inner/${_id}?time=${time}`
                                             ),
                                   };
                              }}
                         />
                    </div>
               </div>
          </MainLayout>
     );
};

export default Logs;
