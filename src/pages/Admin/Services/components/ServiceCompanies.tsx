import React, { useMemo } from "react";
import { Table } from "antd";
import moment from "moment-timezone";
import { historyPush, mapCompanies, setLocalStorage } from "@/utils";
import useApi from "@/hooks/useApi";
import { ICompanyData } from "@/types/company.type";

const columns = [
  {
    title: "Name",
    dataIndex: "companyName",
  },

  {
    title: "phone",
    dataIndex: "phone",
  },
  {
    title: "company Address",
    dataIndex: "companyAddress",
  },
  {
    title: "home Terminal Address",
    dataIndex: "homeTerminalAddress",
  },

  {
    title: "home Terminal Address",
    render: (row: ICompanyData) => moment(row.createdAt).format("YYYY-MM-DD"),
  },
];
const ServiceCompanies: React.FC<{ selectedCompanyId: string | null }> = ({
  selectedCompanyId,
}) => {
  const { data, isLoading } = useApi<ICompanyData[]>(
    `main/${selectedCompanyId}`
  );

  const tableData: any = useMemo(() => {
    if (data?.data) {
      const services = data?.data;

      return mapCompanies(services);
    }
    return [];
  }, [data]);

  return (
    <div style={{ marginBottom: 32 }}>
      <Table
        rowClassName="hoverable"
        className="pointer"
        columns={columns}
        dataSource={tableData}
        loading={isLoading}
        pagination={false}
        onRow={(data: ICompanyData) => {
          return {
            onClick: () => {
              setLocalStorage("companyId", data._id);
              historyPush("/main/dashboard");
              window.location.reload();
            },
          };
        }}
      />
    </div>
  );
};

export default ServiceCompanies;
