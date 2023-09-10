import { useState } from "react";
import { Button, Table } from "antd";
import SearchByQuery from "@/components/elements/SearchByQuery";
import Icon from "@/components/icon/Icon";
import ActionModal from "./components/ActionModal";
import useColumns from "./components/columns";
import useApi from "@/hooks/useApi";
import { NumberParam, StringParam, useQueryParam, withDefault } from "use-query-params";
import { PAGE_LIMIT } from "@/constants/general.const";
import { IPageData } from "@/types";
import { IUserData } from "@/types/user.type";
import useParseData from "@/hooks/useParseData";
import useApiMutationID from "@/hooks/useApiMutationID";

const Users = () => {

     // Query params states
     const [search, setSearch] = useQueryParam("name", withDefault(StringParam, undefined));
     const [page, setPage] = useQueryParam("page", withDefault(NumberParam, 1))

     // All states
     const [isOpen, setIsOpen] = useState<boolean>(false);
     const [editingUserId, setEditingUserId] = useState<string>();

     // Get all drivers data
     const { data, isLoading, refetch, isFetching } = useApi<IPageData<IUserData[]>>("/users", { page, search, limit: PAGE_LIMIT });

     const { mutate: deleteCompany, isLoading: deleteLoading } = useApiMutationID("DELETE", "/user");

     // parse api data
     const { tableData, totalPage } = useParseData<IUserData>(data)

     // Handle modal function
     const handleModal = (id?: string) => {
          setEditingUserId(id);
          setIsOpen((prev) => !prev);
     };

     const handleDelete = (id: string) => {
          deleteCompany({ id }, { onSuccess: () => refetch() })
     }

     const columns = useColumns({ handleModal, handleDelete });

     return (
          <div className="users page">
               <div className="users-header">
                    <h4 className="medium-18">USERS</h4>
                    <div className="right">
                         <SearchByQuery
                              className="mw-250 mr-8"
                              placeholder={"Search"}
                              query={search}
                              setQuery={setSearch}
                         />
                         <Button type="primary" onClick={() => handleModal()}>
                              <Icon icon="plus" />
                              Assign User
                         </Button>
                    </div>
               </div>
               <div className="page-line" />
               <div className="users-main">
                    <Table
                         scroll={{ x: "max-content" }}
                         columns={columns}
                         loading={isLoading || isFetching}
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
               {isOpen && (
                    <ActionModal
                         editingUserId={editingUserId}
                         toggle={handleModal}
                         onSuccess={() => { handleModal(); refetch() }}
                    />
               )}
          </div>
     );
};

export default Users;
