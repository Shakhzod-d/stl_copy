import React, { useState } from "react";
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

const Users: React.FC = () => {

	// Query params states
	const [search, setSearch] = useQueryParam("name", withDefault(StringParam, undefined));
	const [page, setPage] = useQueryParam("page", withDefault(NumberParam, 1))

	// All states
	const [isOpen, setIsOpen] = useState(false);
	const [updateId, setUpdateId] = useState<string | null>(null);

	// Queries and mutations
	const { data, isLoading, refetch, isRefetching } = useApi<IPageData<IUserData[]>>("/users", { search, page, limit: PAGE_LIMIT });

	const { mutate: deleteCompany, isLoading: deleteLoading } = useApiMutationID("DELETE", "/user");

	// Genete table columns
	const columns = useColumns({ handleDelete, editFunc });

	// parse api data 
	const { tableData, totalPage } = useParseData<IUserData>(data)

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
