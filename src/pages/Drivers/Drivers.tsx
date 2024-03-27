import React from "react";
import { historyPush } from "@/utils";
import { Button, Table } from "antd";
import Icon from "@/components/icon/Icon";
import useColumns from "./components/columns";
import SearchByQuery from "@/components/elements/SearchByQuery";
import useApi from "@/hooks/useApi";
import { IDriverData } from "@/types/driver.type";
import { IPageData } from "@/types";
import useParseData from "@/hooks/useParseData";
import { PAGE_LIMIT } from "@/constants/general.const";
import { useQueryParam, withDefault, StringParam, NumberParam } from "use-query-params";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const Drivers: React.FC = () => {
     const { userData } = useSelector((state: RootState) => state.auth);

     // Query params states
     const [search, setSearch] = useQueryParam("name", withDefault(StringParam, undefined));
     const [page, setPage] = useQueryParam("page", withDefault(NumberParam, 1))

     const { data, isLoading, refetch } = useApi<IPageData<IDriverData[]>>("/drivers", { search, page, limit: PAGE_LIMIT });

     // Generate table columns
     const columns = useColumns(refetch);

     // parse api data 
     const { tableData, totalPage } = useParseData<IDriverData>(data)
     

     return (
          <div className="drivers page">
               <div className="drivers-header">
                    <h4 className="medium-18">DRIVERS</h4>
                    <div className="right">
                         <SearchByQuery
                              className="mw-250 mr-8"
                              placeholder={"Search"}
                              query={search}
                              setQuery={setSearch}
                         />
                         <Button
                         disabled={userData?.role.roleName === 'logger'}
                              onClick={() =>
                                   historyPush("/units/drivers/create")
                              }
                              type="primary"
                         >
                              <Icon icon="plus" />
                              Add Driver
                         </Button>
                    </div>
               </div>
               <div className="page-line" />
               <div className="drivers-main">
                    <Table
                         scroll={{ x: "max-content" }}
                         columns={columns}
                         loading={isLoading}
                         dataSource={tableData}
                         className="action"
                         pagination={{
                              onChange: (page) => setPage(page),
                              current: page,
                              pageSize: PAGE_LIMIT,
                              total: totalPage
                         }}
                    />
               </div>
          </div>
     );
};

export default Drivers;
