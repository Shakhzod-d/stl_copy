import {
  ArrowBtn,
  BtnWrap,
  CompanyIcon,
  Description,
  PageActive,
  PageBtn,
  SidebarContainer,
  StyleFlex,
  StyleLogo,
  TabBtn,
  User,
} from "./sidebar-styled";

import { PiChartLineFill } from "react-icons/pi";
import { HiOutlineBuildingLibrary } from "react-icons/hi2";
import { FaPowerOff } from "react-icons/fa";
import {
  MdOutlineKeyboardDoubleArrowRight,
  MdOutlineReportProblem,
} from "react-icons/md";
import { VscFileSubmodule } from "react-icons/vsc";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { sidebarToggle } from "@/store/slices/booleans-slice";
import { Text } from "@/track/constants";
import { Link } from "react-router-dom";
import { historyPush, removeLocalStorage } from "@/utils";
import { setCompany } from "@/track/utils/dispatch";
import useApi from "@/hooks/useApi";
import { BiLogOut } from "react-icons/bi";

export const Sidebar = () => {
  const [btnActive, setBtnActive] = useState<number>(0);
  const companyData = useSelector((state: RootState) => state.company.company);

  const items = [
    {
      key: 1,
      icon: <FaPowerOff />,
      label: "ELD",
      page: [
        {
          id: 1,
          text: "- Logs",
          url: `/main/logs/map`,
        },
        {
          id: 2,
          text: " -  Transfer",
          url: `/main/transfer`,
        },
      ],
    },
    {
      key: 2,
      icon: <MdOutlineReportProblem />,
      label: "Reports",
      page: [
        {
          id: 1,
          text: " -  Ifta Reports",
          url: `/main/ifta-reports`,
        },
      ],
    },
    {
      key: 3,
      icon: <VscFileSubmodule />,
      label: "Notification",
    },
    {
      key: 4,
      icon: <VscFileSubmodule />,
      label: "Fleet manager",
      page: [
        {
          id: 1,
          text: " -  Units",
          url: `/main/units`,
        },
        {
          id: 2,
          text: "  -  Drivers",
          url: `/main/drivers`,
        },
        {
          id: 3,
          text: " -  Manage company",
          url: `/main/manage-company`,
        },
      ],
    },
  ];

  const { data } = useApi("/companies", {
    page: 1,
    limit: 1000,
  });

  const active = useSelector(
    (state: RootState) => state.booleans.sidebarActive
  );

  const exitFun = () => {
    removeLocalStorage("company");
    removeLocalStorage("companyId");
    setCompany(false);
    historyPush("/company");
  };
  const userData = useSelector((state: RootState) => state.auth.userData);

  const companyPage = ["Fleet manager", "ELD", "Reports"];
  const filterData = items.filter(
    (item) => item.label && !companyPage.includes(item.label)
  );
  const sidebarData = companyData ? items : filterData;

  const dispatch = useDispatch();

  const tabBtnFun = (key: number) => {
    if (key === 3) {
      historyPush("/main/notification");
    }

    if (key > 0) {
      setBtnActive(key);
      dispatch(sidebarToggle(true));
    } else {
      dispatch(sidebarToggle(active ? false : true));
      setBtnActive(0);
    }
  };
  const userFullName = `${userData?.firstName}  ${userData?.lastName}`;
  const logoutFun = () => {
    removeLocalStorage("token");
    removeLocalStorage("roleId");
    removeLocalStorage("company");
    removeLocalStorage("companyId");
    sessionStorage.clear();
    window.location.reload();
  };
  const userImage =
    userData?.image === null ? "/assets/images/user-logo.png" : userData?.image;
  return (
    <SidebarContainer $active={active}>
      <StyleFlex $active={active}>
        {active && (
          <Link to={"/"}>
            <StyleLogo src={`/assets/icons/Company_logo.svg`} alt="" />
          </Link>
        )}
        <ArrowBtn $active={active} onClick={() => tabBtnFun(0)}>
          <MdOutlineKeyboardDoubleArrowRight color="white" size={25} />
        </ArrowBtn>
      </StyleFlex>
      <div style={{ flex: "1" }}>
        {companyData && (
          <PageBtn
            onClick={() => setBtnActive(0)}
            to={`/main/dashboard`}
            $active={active}
          >
            <PiChartLineFill />

            {active && <p>Dashboard</p>}
          </PageBtn>
        )}

        {!companyData ? (
          <PageBtn
            onClick={() => setBtnActive(0)}
            to={"/company"}
            $active={active}
          >
            <HiOutlineBuildingLibrary />

            {active && (
              <>
                <p>Company</p>{" "}
                <p style={{ marginLeft: "50px" }}>{data?.data.data.length}</p>
              </>
            )}
          </PageBtn>
        ) : (
          <User
            className="light user-profile"
            $background="#FFF"
            color="#000"
            onClick={exitFun}
          >
            <CompanyIcon>
              <p>{String(companyData?.companyName).slice(0, 1)}</p>
            </CompanyIcon>
            {active && (
              <div>
                <h2>{companyData?.companyName}</h2>
              </div>
            )}
          </User>
        )}

        <Description>Menu</Description>
        {sidebarData.map((item) => {
          const Icon = () => item.icon;
          if (item.key == 3) {
            return (
              <PageBtn
                key={item.key}
                onClick={() => tabBtnFun(item.key)}
                $active={active}
                $p="0"
                to={`/main/notification`}
              >
                <BtnWrap>
                  <Icon />
                  {active && <p>{item.label}</p>}
                </BtnWrap>

                {!active ||
                  (btnActive === item.key &&
                    item.page?.map((i) => {
                      return (
                        <PageActive key={i.id} to={i.url}>
                          {/* <TbDeviceSdCard /> */}
                          {active && <p>{i.text}</p>}
                        </PageActive>
                      );
                    }))}
              </PageBtn>
            );
          } else {
            return (
              <TabBtn
                key={item.key}
                onClick={() => tabBtnFun(item.key)}
                $active={active}
              >
                <BtnWrap>
                  <Icon />
                  {active && <p>{item.label}</p>}
                </BtnWrap>

                {!active ||
                  (btnActive === item.key &&
                    item.page?.map((i) => {
                      return (
                        <PageActive key={i.id} to={i.url}>
                          {/* <TbDeviceSdCard /> */}
                          {active && <p>{i.text}</p>}
                        </PageActive>
                      );
                    }))}
              </TabBtn>
            );
          }
        })}
        {!companyData && (
          <PageBtn
            onClick={() => setBtnActive(0)}
            to={"/users"}
            $active={active}
          >
            <p>Users</p>
          </PageBtn>
        )}
      </div>
      <TabBtn onClick={logoutFun}>
        <BtnWrap>
          <BiLogOut />
          {active && <p>Logout</p>}
        </BtnWrap>
      </TabBtn>
      <User className="user-profile">
        <img src={userImage} alt="user" className="user-img" />
        {active && (
          <div>
            <h2>
              {userFullName.length > 20
                ? userFullName.slice(0, 22) + "..."
                : userFullName}
            </h2>
            <Text size={12} color="#fff">
              {userData?.email}
            </Text>
          </div>
        )}
      </User>
    </SidebarContainer>
  );
};
