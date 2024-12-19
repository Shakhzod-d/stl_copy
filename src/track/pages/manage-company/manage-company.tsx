import { Navbar } from "../../components/ui";
import { Main } from "../../utils";

import { MCTabPages } from "../../utils/constants";

import { NavLink, useLocation } from "react-router-dom";
import React, { ReactNode, useEffect, useState } from "react";
import { TransparentButton } from "../ifta-reports/ifta-reports-styled";
import { AddBtn } from "./manage-company-styled";
import { FaPlus } from "react-icons/fa6";
import { historyPush } from "@/utils";
import { Flex } from "@/track/components/shared/drivers-header/drivers-header-styled";
import { ManageUserModal } from "../company-users/modals/manage-user-modal";
import { AddKey } from "../api-keys/_components/addKey";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { SetEditDriverModal } from "@/store/slices/booleans-slice";
interface Props {
  children: ReactNode;
}
export const ManageCompany: React.FC<Props> = ({ children }) => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const driverModal: any = useSelector(
    (state: RootState) => state.booleans.editDriverModal
  );
  const [keysModal, setKeysModal] = useState(false);
  useEffect(() => {
    if (String(pathname.endsWith("/company")))
      historyPush("/main/manage-company/company");
  }, []);

  return (
    <Main>
      <ManageUserModal modalData={driverModal} />
      {keysModal && <AddKey open={keysModal} setOpen={setKeysModal} />}
      <Navbar title="Manage Company" />
      {/* <DriversStatistics /> */}

      <Flex $justify="space-between">
        <Flex $gap={"5px"} style={{ marginBottom: "20px" }}>
          {MCTabPages.map((item) => (
            <NavLink to={item.to} key={item.key}>
              <TransparentButton
                active={String(pathname.endsWith(item.to))}
                padding="25px 10px"
              >
                {item.label}
              </TransparentButton>
            </NavLink>
          ))}
        </Flex>
        {pathname === "/main/manage-company/users" && (
          <AddBtn
            type="primary"
            onClick={() =>
              dispatch(SetEditDriverModal({ role: "add", open: true ,userRole:'employer'}))
            }
          >
            <FaPlus /> Add
          </AddBtn>
        )}
        {pathname === "/main/manage-company/keys" && (
          <AddBtn type="primary" onClick={() => setKeysModal(true)}>
            Add Key
          </AddBtn>
        )}
      </Flex>
      {children}
    </Main>
  );
};
