import { CustomInput, Navbar, PageLoad } from "../../components/ui";
import { Main } from "../../utils";

import { FaPlus } from "react-icons/fa";
import { InfoTable } from "../../components/shared";

import { usersTableHeader } from "../../utils/constants";
import { useState } from "react";
import { Flex } from "@/track/components/shared/drivers-header/drivers-header-styled";
import { UserEditModal } from "./modals/user-edit-modal";
import { AddUser } from "./modals/add-user-modal";
import useApi from "@/hooks/useApi";
import { useDebounce } from "@/track/hooks/use-debauce";

import { AddBtn } from "@/pages/Admin/Companies/company-styled";

import { mapUserData } from "@/track/utils/mapData";

export const Users = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [addUser, setAddUser] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const searchValue = useDebounce(searchTerm, 300);

  const { data, isLoading, refetch } = useApi("/users", {
    page: 1,
    limit: 1000,
  });
  const users = mapUserData(data ? data?.data?.data : []);

  const filteredData: any[] = users.filter((data) =>
    String(data?.name?.label)
      .toLowerCase()
      .startsWith(searchValue.toLowerCase())
  );

  const editData = (id: string) => {
    setOpen(true);
   
  };
  return (
    <Main>
      <AddUser open={addUser} setOpen={setAddUser} refetch={refetch} />
      <UserEditModal setOpen={setOpen} open={open} />
      <Navbar title="Users" search={false} />
      <Flex $justify="end" $gap={"20px"}>
        <CustomInput
          type="search"
          change={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchTerm(e.target.value)
          }
        />
        <AddBtn onClick={() => setAddUser(true)}>
          <FaPlus size={18} />
        </AddBtn>
      </Flex>

      <InfoTable
        header={usersTableHeader}
        data={filteredData}
        editData={editData}
        isLoading={isLoading}
      />
    </Main>
  );
};
