import { usersTableData } from "@/track/constants";
import { InfoTable } from "../../components/shared";
import { usersTableHeader } from "../../utils/constants";
import { UserAdd } from "./modals/user-add/user-add";
import { useState } from "react";

export const CompanyUsers = () => {
  const [open, setOpen] = useState(false);
  const editData = (id: string) => {
    setOpen(true);
    console.log(id);
  };
  return (
    <div>
      <UserAdd open={open} setOpen={setOpen} />
      <InfoTable
        header={usersTableHeader}
        data={usersTableData}
        editData={editData}
      />
    </div>
  );
};
