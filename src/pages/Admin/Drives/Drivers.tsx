import React from "react";
import { Table } from "antd";
import { useColumns } from "./components/tableColumns";
import SearchByQuery from "@/components/elements/SearchByQuery";
import useApi from "@/hooks/useApi";
import { IDriverData } from "@/types/driver.type";
import { NumberParam, StringParam, useQueryParam, withDefault } from "use-query-params";
import { PAGE_LIMIT } from "@/constants/general.const";
import useParseData from "@/hooks/useParseData";
import { IPageData } from "@/types";

const Drivers: React.FC = () => {

     // Query params states
     const [search, setSearch] = useQueryParam("name", withDefault(StringParam, undefined));
     const [page, setPage] = useQueryParam("page", withDefault(NumberParam, 1))

     // Queries and mutations
     const { data, isLoading } = useApi<IPageData<IDriverData[]>>("/main/drivers", { search, page, limit: PAGE_LIMIT });

     // Genete table columns
     const columns = useColumns();

     // parse api data 
     const { tableData, totalPage } = useParseData<IDriverData>(data)


     return (
          <section className="admin-drivers">
               <div className="header">
                    <SearchByQuery
                         query={search}
                         setQuery={setSearch}
                         className="mw-250"
                         placeholder="search"
                    />
               </div>
               <Table
                    columns={columns}
                    dataSource={tableData}
                    loading={isLoading}
                    pagination={{
                         onChange: (page) => setPage(page),
                         current: page,
                         pageSize: PAGE_LIMIT,
                         total: totalPage
                    }}
               />
          </section>
     );
};

export default Drivers;
