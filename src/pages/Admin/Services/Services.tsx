// import React, { useState } from "react";
// import { Button, Table } from "antd";
// import Icon from "@/components/icon/Icon";
// import ActionModal from "./components/ActionModal";
// import { useColumns } from "./components/tableColumns";
// import SearchByQuery from "@/components/elements/SearchByQuery";
// import Modal from "@/components/elements/Modal";
// import ServiceCompanies from "./components/ServiceCompanies";
// import useApi from "@/hooks/useApi";
// import useApiMutationID from "@/hooks/useApiMutationID";
// import { IServiceData } from "@/types/service.type";
// import useParseData from "@/hooks/useParseData";
// import { IPageData } from "@/types";
// import { PAGE_LIMIT } from "@/constants/general.const";
// import {
//   NumberParam,
//   StringParam,
//   useQueryParam,
//   withDefault,
// } from "use-query-params";
// import { getLocalStorage } from "@/utils";

// const Services: React.FC = () => {
//   // All states
//   const [isOpen, setIsOpen] = useState<boolean>(false);
//   const [isOpenCompanies, setIsOpenCompanies] = useState(false);
//   const [updateId, setUpdateId] = useState<string | null>(null);
//   const serviceId: string | null = getLocalStorage('serviceId') || null

//   // Query params states
//   const [search, setSearch] = useQueryParam(
//     "name",
//     withDefault(StringParam, undefined)
//   );
//   const [page, setPage] = useQueryParam("page", withDefault(NumberParam, 1));

//   // Get all services data
//   const {
//     data,
//     isLoading: getLoading,
//     isRefetching,
//     refetch,
//   } = useApi<IPageData<IServiceData[]>>("/main", {
//     search,
//     page,
//     limit: PAGE_LIMIT,
//   });

//   //action mutations
//   const { mutate: updateService, isLoading: updateLoading } = useApiMutationID(
//     "PUT",
//     "/service"
//   );
//   const { mutate: deleteService, isLoading: deleteLoading } = useApiMutationID(
//     "DELETE",
//     "/service"
//   );

//   // Generate table columns
//   const columns = useColumns({ handleDelete, updateStatus, editFunc });

//   // parse api data
//   const { tableData, totalPage } = useParseData<IServiceData>(data);

//   function editFunc(id: string) {
//     setUpdateId(id);
//     setIsOpen(true);
//   }

//   function updateStatus(id: string, isActive: boolean) {
//     updateService({ id, data: { isActive } }, { onSuccess: () => refetch() });
//   }

//   function handleDelete(id: string) {
//     deleteService({ id }, { onSuccess: () => refetch() });
//   }

//   // Handle modal function
//   const handleModal = () => {
//     setIsOpen((prev) => {
//       if (!prev && updateId) setUpdateId(null);
//       return !prev;
//     });
//   };

  
//   const openModal = (): React.ReactNode =>{
//     if(serviceId){
//       // setTimeout(() => {
//       //   setIsOpenCompanies(true)
//       // }, 1000)
//       return <Modal
//         open={isOpenCompanies}
//         closable
//         onCancel={() => setIsOpenCompanies(false)}
//         width={"80%"}
//         title="Service companies"
//         >
//             <ServiceCompanies selectedCompanyId={serviceId} />
//         </Modal>
//     }
//     if(!serviceId){
      
//       return <Modal
//           open={isOpenCompanies}
//           closable
//           onCancel={() => setIsOpenCompanies(false)}
//           width={"80%"}
//           title="Service companies"
//         >
//           <ServiceCompanies selectedCompanyId={updateId} />
//         </Modal>
//     }
//   }
  

//   return (
//     <section className="admin-services">
     
//       <div className="header">
//         <SearchByQuery
//           query={search}
//           setQuery={setSearch}
//           className="mw-250"
//           placeholder="search"
//         />
//         <Button onClick={handleModal} type="primary">
//           <Icon icon="plus" className="mr-8" />
//           Add Service
//         </Button>
//       </div>
//       <Table
//         className="action"
//         rowClassName="hoverable"
//         columns={columns}
//         dataSource={tableData}
//         loading={deleteLoading || updateLoading || getLoading || isRefetching}
//         onRow={(row: IServiceData) => ({
//           onClick: (e) => {
//             e.stopPropagation();
//             setUpdateId(row._id);
//             setIsOpenCompanies(true);
//           },
//         })}
//         pagination={{
//           onChange: (page) => setPage(page),
//           current: page,
//           pageSize: PAGE_LIMIT,
//           total: totalPage,
//         }}
//       />
//       {isOpen && (
//         <ActionModal
//           toggle={handleModal}
//           id={updateId}
//           onSuccess={() => {
//             handleModal();
//             refetch();
//           }}
//         />
//       )}
//       {
//         openModal()
//       }
      
//     </section >
    
//   );
// };

// export default Services;
 export {}