import { IoMoonOutline, IoNotificationsOutline } from "react-icons/io5";
import { Header, Icon, Title } from "./navbar-styled";

import { CustomInput } from "../custom-input";
import { useDispatch, useSelector } from "react-redux";
import { setDarkMode, setModalActive } from "@/store/slices/booleans-slice";
import { RootState } from "@/store";
import { setLocalStorage } from "@/utils/localStorage";
import { CgSun } from "react-icons/cg";
import { Flex } from "../../shared/drivers-header/drivers-header-styled";
// import { setModal } from "@/track/utils/dispatch";

interface Props {
  title: string;
  search?: boolean;
}
export const Navbar = ({ title, search = true }: Props) => {
  const dispatch = useDispatch();
  const dark = useSelector((state: RootState) => state.booleans.darkMode);
  const darkMode = () => {
    setLocalStorage("darkMode", !dark);
    dispatch(setDarkMode());
  };
  return (
    <Header>
      <Title>{title}</Title>
      <Flex $align="center" $gap={"20px"}>
        {search && <CustomInput type="search" />}
        <Icon onClick={darkMode}>
          {dark ? <CgSun size={30} /> : <IoMoonOutline size={30} />}
        </Icon>
        <Icon onClick={()=>dispatch(setModalActive(true))}>
          <IoNotificationsOutline size={30} />
        </Icon>
      </Flex>
    </Header>
  );
};
