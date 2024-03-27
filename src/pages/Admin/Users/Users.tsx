import React, { useState, useEffect } from "react";
import { Button, Table } from "antd";
import { useColumns } from "./components/tableColumns";
import Icon from "@/components/icon/Icon";
import ActionModal from "./components/ActionModal";
import SearchByQuery from "@/components/elements/SearchByQuery";
import useApi from "@/hooks/useApi";
import useApiMutationID from "@/hooks/useApiMutationID";
import { NumberParam, StringParam, useQueryParam, withDefault } from "use-query-params";
import { PAGE_LIMIT } from "@/constants/general.const";
import { IPageData } from "@/types";
import useParseData from "@/hooks/useParseData";
import { IUserData } from "@/types/user.type";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { RoleNames } from "@/App";

const Users: React.FC = () => {
	const { userData } = useSelector((state: RootState) => state.auth);
	const serviceId = userData?.serviceId
	


	// Query params states
	const [search, setSearch] = useQueryParam("name", withDefault(StringParam, undefined));
	const [page, setPage] = useQueryParam("page", withDefault(NumberParam, 1))

	// All states
	const [isOpen, setIsOpen] = useState(false);
	const [updateId, setUpdateId] = useState<string | null>(null);

	// Queries and mutations

	const [users, setUsers] = useState()
	const { data, isLoading, refetch, isRefetching } = useApi<IPageData<IUserData[]>>("/users", { search, page, limit: PAGE_LIMIT })
	const { data: data1, isLoading: isLoading1, refetch: refetch1, isRefetching: isRefetching1 } = useApi<IPageData<IUserData[]>>("/users/by", { search, page, limit: PAGE_LIMIT, serviceId })
	
	
	const { mutate: deleteCompany, isLoading: deleteLoading } = useApiMutationID("DELETE", "/user");

	// Genete table columns
	const columns = useColumns({ handleDelete, editFunc });

	// parse api data 
	const { tableData, totalPage } = useParseData<IUserData>(data)
	const { tableData: tableData1, totalPage: totalPage1 } = useParseData<IUserData>(data1)
	

	function editFunc(id: string) {
		setUpdateId(id);
		setIsOpen(true);
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
		<section className="admin-user">
			<div className="header">
				<SearchByQuery
					query={search}
					setQuery={setSearch}
					className="mw-250"
					placeholder="search"
				/>
				<Button onClick={handleModal} type="primary">
					<Icon icon="plus" className="mr-8" />
					Add User
				</Button>
			</div>
			{
				userData?.role.roleName === RoleNames.SERVICE_ADMIN || userData?.role.roleName === RoleNames.SECOND_SERVICE_ADMIN ?
				<Table
				columns={columns}
				dataSource={tableData1}
				loading={isLoading1 || deleteLoading || isRefetching1}
				rowClassName="hoverable"
				pagination={{
					onChange: (page) => setPage(page),
					current: page,
					pageSize: PAGE_LIMIT,
					total: totalPage1
				}}
			/>:
			<Table
				columns={columns}
				dataSource={tableData}
				loading={isLoading || deleteLoading || isRefetching}
				rowClassName="hoverable"
				pagination={{
					onChange: (page) => setPage(page),
					current: page,
					pageSize: PAGE_LIMIT,
					total: totalPage
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

export default Users;
