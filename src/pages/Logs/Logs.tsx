import DatePicker from "@/components/elements/DatePicker";
import DoubleButton from "@/components/elements/DoubleButton";
import SearchByQuery from "@/components/elements/SearchByQuery";
import Select from "@/components/elements/Select";
import { PAGE_LIMIT } from "@/constants/general.const";
import useApi from "@/hooks/useApi";
import useMomentZone from "@/hooks/useMomentZone";
import MainLayout from "@/layouts/MainLayout";
import { IViolation } from "@/types/violation";
import { historyPush } from "@/utils";
import { Table } from "antd";
import { Moment } from "moment-timezone";
import React from "react";
import {
   NumberParam,
   StringParam,
   useQueryParam,
   withDefault,
} from "use-query-params";
import { useDriversData } from "./services/useDriversData";
import { useMainColumns } from "./Logs.columns";

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
                  <DoubleButton onLeft={handleLeft} onRight={handleRight} />
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
                     data={data?.data?.map((item) => ({
                        ...item.Violations,
                     }))}
                     value={violations}
                     labelProp="violation"
                     valueProp="_id"
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
