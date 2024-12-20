import { usersTableData } from "@/track/constants";
import { InfoTable } from "../../components/shared";
import { usersTableHeader } from "../../utils/constants";
import { UserAdd } from "./modals/user-add/user-add";
import { useState } from "react";
import { Flex } from "@/track/components/shared/drivers-header/drivers-header-styled";
import { TransparentButton } from "../ifta-reports/ifta-reports-styled";
import useApi from "@/hooks/useApi";
import { companyDrivers, mapUserData } from "@/track/utils/mapData";
import { useDispatch } from "react-redux";
import { SetEditDriverModal } from "@/store/slices/booleans-slice";
import { setRefetch } from "@/store/slices/company-slice";

export const CompanyUsers = () => {
  const [tab, setTab] = useState(1);
  const dispatch = useDispatch();
  const {
    data: user,
    isLoading: userLoad,
    refetch: userRefetch,
  } = useApi("/users", {
    page: 1,
    limit: 1000,
  });
  const { data, isLoading, refetch } = useApi("/drivers", {
    page: 1,
    limit: 1000,
  });

  const drivers = companyDrivers(data ? data?.data?.data : []);
  const users = mapUserData(user ? user?.data?.data : []);

  dispatch(setRefetch(userRefetch));
  const editData = (id: string) => {
    if (tab === 2) {
      dispatch(
        SetEditDriverModal({
          role: "edit",
          open: true,
          id,
          userRole: "driver",
          refetch,
        })
      );
    } else {
      dispatch(
        SetEditDriverModal({
          role: "edit",
          open: true,
          id,
          userRole: "employer",
          refetch: userRefetch,
        })
      );
    }
  };
  return (
    <div>
      <Flex $justify="end" $gap="5px">
        <TransparentButton
          width="112px"
          active={String(tab === 2)}
          onClick={() => setTab(1)}
        >
          Employer
        </TransparentButton>
        <TransparentButton
          width="92px"
          active={String(tab === 1)}
          onClick={() => setTab(2)}
        >
          Driver
        </TransparentButton>
      </Flex>
      <InfoTable
        header={usersTableHeader}
        data={tab === 1 ? users : drivers.companyDriver}
        editData={editData}
        isLoading={isLoading || userLoad}
      />
    </div>
  );
};
