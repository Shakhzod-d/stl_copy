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
import { NumberParam, StringParam, useQueryParam, withDefault } from "use-query-params";
import useMomentZone from "@/hooks/useMomentZone";
import { Moment } from "moment-timezone";


const Logs: React.FC = () => {

     const momentZone = useMomentZone()

     // Query params states
     const [violations, setViolations] = useQueryParam("violation", withDefault(StringParam, undefined));
     const [warnings, setWarnings] = useQueryParam("warning", withDefault(StringParam, undefined));
     const [location, setLocation] = useQueryParam("location", withDefault(StringParam, undefined));
     const [search, setSearch] = useQueryParam("name", withDefault(StringParam, undefined));
     const [page, setPage] = useQueryParam("page", withDefault(NumberParam, 1))
     const [time, setTime] = useQueryParam("time", withDefault(NumberParam, momentZone().startOf("day").valueOf()))

     // Get all drivers data
     const { data, isLoading, isFetching } = useApi<IPageData<IDriverData[]>>("/drivers", { search, page, limit: PAGE_LIMIT });

     const columns = useMainColumns();

     // parse api data 
     const { tableData, totalPage } = useParseData<IDriverData>(data)

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
                                   total: totalPage
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
