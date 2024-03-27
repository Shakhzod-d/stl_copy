import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import { historyPush, setLocalStorage, } from "@/utils";
import { useColumns } from "./components/tableColumns";
import Icon from "@/components/icon/Icon";
import ActionModal from "./components/ActionModal";
import SearchByQuery from "@/components/elements/SearchByQuery";
import useApi from "@/hooks/useApi";
import useApiMutationID from "@/hooks/useApiMutationID";
import { ICompanyData } from "@/types/company.type";
import { PAGE_LIMIT } from "@/constants/general.const";
import { IPageData } from "@/types";
import useParseData from "@/hooks/useParseData";
import { NumberParam, StringParam, useQueryParam, withDefault } from "use-query-params";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { RoleNames } from "@/App";

const Companies: React.FC = () => {
     const { userData } = useSelector((state: RootState) => state.auth);

     // Query params states
     const [search, setSearch] = useQueryParam("name", withDefault(StringParam, undefined));
     const [page, setPage] = useQueryParam("page", withDefault(NumberParam, 1))

     // All states
     const [isOpen, setIsOpen] = useState(false);
     const [updateId, setUpdateId] = useState<string | null>(null);
     const [ data1, setData1] = useState<ICompanyData[] | any | undefined>(undefined)

     // Queries and mutations
     const { data, isLoading, refetch, isRefetching } = useApi<IPageData<ICompanyData[]>>("/main/allcompany", { search, page, limit: PAGE_LIMIT });
     

     useEffect(()=>{
          if(userData?.serviceId){
               setData1(data?.data?.data.filter((item: any) => {
                 
                    if(item.serviceId === userData?.serviceId){
                         return item
                    }
               })) 
          }
     }, [data])

     const { mutate: updateCompany, isLoading: updateLoading } = useApiMutationID("PUT", "/company");
     const { mutate: deleteCompany, isLoading: deleteLoading } = useApiMutationID("DELETE", "/company");

     // Genete table columns
     const columns = useColumns({ updateStatus, handleDelete, editFunc });

     // parse api data 
     const { tableData, totalPage } = useParseData<ICompanyData>(data)
     // const { tableData: tableData1, totalPage: totalPage1 } = useParseData<ICompanyData>(data as data1)
     
     
     

     function editFunc(id: string) {
          setUpdateId(id);
          setIsOpen(true);
     }

     function updateStatus(id: string, isActive: boolean) {
          updateCompany({ id, data: { isActive } }, { onSuccess: () => refetch() })
     }

     function handleDelete(id: string) {
          deleteCompany({ id }, { onSuccess: () => refetch() })
     }

     // Handle modal function
     const handleModal = () => {
          setIsOpen((prev) => {
               if (!prev && updateId) {
                    setUpdateId(null);
               }
               return !prev;
          });
     };

     return (
          <section className="admin-company">
               <div className="header">
                    <SearchByQuery
                         query={search}
                         setQuery={setSearch}
                         className="mw-250"
                         placeholder="search"
                    />
                    <Button onClick={handleModal} type="primary">
                         <Icon icon="plus" className="mr-8" />
                         Add Company
                    </Button>
               </div>
               
               {
                    userData?.role.roleName === RoleNames.SERVICE_ADMIN || userData?.role.roleName === RoleNames.SECOND_SERVICE_ADMIN ? 
                    <div>
                         <Table
                    columns={columns}
                    dataSource={data1}
                    loading={isLoading || updateLoading || deleteLoading || isRefetching}
                    rowClassName="hoverable"
                    pagination={{
                         onChange: (page) => setPage(page),
                         current: page,
                         pageSize: PAGE_LIMIT,
                         total: totalPage
                    }}
                    onRow={(data1: ICompanyData) => {
                         return {
                              onClick: (e) => {
                                   e.stopPropagation();
                                   setLocalStorage("companyId", data1._id);
                                   historyPush("/main/dashboard");
                                   window.location.reload();
                              },
                         };
                    }}
                    />
                    </div> 
                    : 
                    <Table
                    columns={columns}
                    dataSource={tableData}
                    loading={isLoading || updateLoading || deleteLoading || isRefetching}
                    rowClassName="hoverable"
                    pagination={{
                         onChange: (page) => setPage(page),
                         current: page,
                         pageSize: PAGE_LIMIT,
                         total: totalPage
                    }}
                    onRow={(data: ICompanyData) => {
                         return {
                              onClick: (e) => {
                                   e.stopPropagation();
                                   setLocalStorage("companyId", data._id);
                                   historyPush("/main/dashboard");
                                   window.location.reload();
                              },
                         };
                    }}
                    />
                } 
               {isOpen && (
                    <ActionModal
                         toggle={handleModal}
                         id={updateId}
                         onSuccess={() => { handleModal(); refetch() }}
                    />
               )}
          </section>
     );
};

export default Companies;
