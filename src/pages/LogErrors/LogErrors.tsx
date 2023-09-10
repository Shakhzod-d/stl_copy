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

const LogErrors: React.FC = () => {
     // Query params states
     const [drivers, setDrivers] = useQueryParams("driver", null);
     const [warnings, setWarnings] = useQueryParams("warnings", null);

     const columns = useMainColumns();

     return (
          <MainLayout>
               <div className="logs page">
                    <div className="logs-head">
                         <div className="logs-head-left">
                              <DatePicker />
                              <DoubleButton />
                         </div>
                         <div className="logs-head-right">
                              <Select
                                   data={[]}
                                   value={drivers}
                                   setValue={setDrivers}
                                   placeholder="Drivers 0"
                              />
                              <Select
                                   data={[]}
                                   value={warnings}
                                   setValue={setWarnings}
                                   placeholder="Warnings 0"
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

export default LogErrors;
