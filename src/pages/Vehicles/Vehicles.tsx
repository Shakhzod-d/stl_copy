import React from "react";
import { historyPush } from "@/utils";
import { Button, Table } from "antd";
import Icon from "@/components/icon/Icon";
import useColumns from "./components/columns";
import useApi from "@/hooks/useApi";
import { IPageData } from "@/types";
import { IVehicleData } from "@/types/vehicle.type";
import { NumberParam, StringParam, useQueryParam, withDefault } from "use-query-params";
import SearchByQuery from "@/components/elements/SearchByQuery";
import { PAGE_LIMIT } from "@/constants/general.const";
import useParseData from "@/hooks/useParseData";

const Vehicles = () => {

     // Query params states
     const [search, setSearch] = useQueryParam("name", withDefault(StringParam, undefined));
     const [page, setPage] = useQueryParam("page", withDefault(NumberParam, 1))

     // Get all vehicles data
     const { data, isLoading, isRefetching, refetch } = useApi<IPageData<IVehicleData[]>>("/vehicles", { search, page, limit: PAGE_LIMIT, });

     // parse api data
     const { tableData, totalPage } = useParseData<IVehicleData>(data)

     // Genete table columns
     const columns = useColumns(refetch);

     return (
          <div className="vehicles page">
               <div className="vehicles-header">
                    <h4 className="medium-18">Vehicles</h4>
                    <div className="right">
                         <SearchByQuery
                              className="mw-250 mr-8"
                              placeholder={"Search"}
                              query={search}
                              setQuery={setSearch}
                         />
                         <Button
                              onClick={() =>
                                   historyPush("/units/vehicles/create")
                              }
                              type="primary"
                         >
                              <Icon icon="plus" />
                              Add Vehicle
                         </Button>
                    </div>
               </div>
               <div className="page-line" />
               <div className="vehicles-main">
                    <Table
                         scroll={{ x: "max-content" }}
                         columns={columns}
                         loading={isLoading || isRefetching}
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

export default Vehicles;
