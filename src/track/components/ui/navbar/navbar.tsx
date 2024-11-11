import { IoMoonOutline, IoNotificationsOutline } from "react-icons/io5";
import { Header, Icon, Title } from "./navbar-styled";

import { CustomInput } from "../custom-input";
import { useDispatch, useSelector } from "react-redux";
import { setDarkMode, setModalActive } from "@/store/slices/booleans-slice";
import { RootState } from "@/store";
import { removeLocalStorage, setLocalStorage } from "@/utils/localStorage";
import { CgSun } from "react-icons/cg";
import { Flex } from "../../shared/drivers-header/drivers-header-styled";
import { CompanyIcon, User } from "../../shared/sidebar/sidebar-styled";

import { historyPush } from "@/utils";
import { setCompanyData } from "@/store/slices/company-slice";
// import { setModal } from "@/track/utils/dispatch";

interface Props {
  title: string;
  search?: boolean;
}
export const Navbar = ({ title, search = true }: Props) => {
  const dispatch = useDispatch();
  const dark = useSelector((state: RootState) => state.booleans.darkMode);
  const CompanyData = useSelector((state: RootState) => state.company.company);
  const darkMode = () => {
    setLocalStorage("darkMode", !dark);
    dispatch(setDarkMode());
  };
  const exitFun = () => {
    removeLocalStorage("company");
    removeLocalStorage("companyId");
    dispatch(setCompanyData(false));
    historyPush("/company");
  };

  return (
    <Header>
      <Title>{title}</Title>
      <Flex $align="center" $gap={"20px"}>
        {search && <CustomInput type="search" />}
        <Icon onClick={darkMode}>
          {dark ? <CgSun size={30} /> : <IoMoonOutline size={30} />}
        </Icon>
        <Icon onClick={() => dispatch(setModalActive(true))}>
          <IoNotificationsOutline size={30} />
        </Icon>
        {CompanyData && (
          <User
            className="light user-profile"
            $background={dark ? "#212121" : "#fff"}
            color="#000"
            onClick={exitFun}
          >
            <CompanyIcon>
              <p>
                {CompanyData && String(CompanyData?.companyName).slice(0, 1)}
              </p>
            </CompanyIcon>

            <div>
              <h2 style={{ color: dark ? "#fff" : "#000" }}>
                {" "}
                {CompanyData && CompanyData?.companyName}
              </h2>
            </div>
          </User>
        )}
      </Flex>
    </Header>
  );
};
