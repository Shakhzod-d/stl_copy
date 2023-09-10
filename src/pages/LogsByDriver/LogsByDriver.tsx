import React, { useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import RangePicker from "@/components/elements/RangePicker";
import Select from "@/components/elements/Select";
import { Table } from "antd";
import { historyPush } from "@/utils";
import { fakeData, useMainColumns } from "../Logs/components/LogTable/columns";
import { useQueryParams } from "@/hooks/useQueryParams";

const LogsByDriver: React.FC = () => {
     // Query params states
     const [driver, setDriver] = useQueryParams("driver_id", null);
     const [violations, setViolations] = useQueryParams("violations", null);
     const [warnings, setWarnings] = useQueryParams("warnings", null);
     const [date, setDate] = useState<any>();

     const columns = useMainColumns();

     return (
          <MainLayout>
               <div className="logs-by-driver page">
                    <div className="logs-by-driver-head">
                         <div className="logs-by-driver-head-left">
                              <Select
                                   data={[]}
                                   value={driver}
                                   setValue={setDriver}
                                   placeholder="Driver"
                              />
                              <RangePicker onChange={setDate} value={date} />
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
                              dataSource={fakeData}
                              pagination={false}
                              onRow={({ id }) => {
                                   return {
                                        onClick: () =>
                                             historyPush(
                                                  `/main/log/logs/inner/${id}`
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
