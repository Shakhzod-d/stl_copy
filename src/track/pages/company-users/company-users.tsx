import { usersTableData } from "@/track/constants";
import { InfoTable } from "../../components/shared";
import { usersTableHeader } from "../../utils/constants";

export const CompanyUsers = () => {
  return (
    <div>
      <InfoTable header={usersTableHeader} data={usersTableData} />
    </div>
  );
};
