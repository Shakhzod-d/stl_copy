import {
  ArrowBtn,
  BtnWrap,
  Description,
  LogoutBtn,
  PageActive,
  PageBtn,
  SidebarContainer,
  StyleFlex,
  StyleLogo,
  TabBtn,
  User,
} from "./sidebar-styled";

import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import React, { useCallback, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { sidebarToggle } from "@/store/slices/booleans-slice";
import { Link } from "react-router-dom";
import { historyPush, removeLocalStorage } from "@/utils";
import { setCompany } from "@/track/utils/dispatch";
import useApi from "@/hooks/useApi";
import { BiLogOut } from "react-icons/bi";
import {
  CompanyICon,
  DashboardIcon,
  EldIcon,
  FileIcon,
  ReportIcon,
} from "@/utils/icons";

import { Text } from "@/track/constants";

export const Sidebar = React.memo(() => {
  const [btnActive, setBtnActive] = useState<number>(0);
  const companyData = useSelector((state: RootState) => state.company.company);

  const items = [
    {
      key: 1,
      icon: <EldIcon />,
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
      icon: <ReportIcon />,
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
      key: 4,
      icon: <FileIcon />,
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

  const exitFun = useCallback(() => {
    removeLocalStorage("company");
    removeLocalStorage("companyId");
    setCompany(false);
    historyPush("/company");
  }, []);
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
  const logoutFun = useCallback(() => {
    removeLocalStorage("token");
    removeLocalStorage("roleId");
    removeLocalStorage("company");
    removeLocalStorage("companyId");
    sessionStorage.clear();
    window.location.reload();
  }, []);
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
        <PageBtn
          onClick={() => setBtnActive(0)}
          to={`/main/dashboard`}
          $active={active}
        >
          <DashboardIcon />

          {active && <p>Dashboard</p>}
        </PageBtn>

        {!companyData && (
          <PageBtn to={"/company"} $active={active}>
            <CompanyICon />

            {active && (
              <>
                <p>Company</p>{" "}
                <p style={{ marginLeft: "50px" }}>{data?.data.data.length}</p>
              </>
            )}
          </PageBtn>
        )}

        {companyData && <Description>Menu</Description>}
        {companyData &&
          sidebarData.map((item) => {
            const Icon = () => item.icon;

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
          })}
        {userData?.role.roleName === "superAdmin" && !companyData ? (
          <PageBtn
            onClick={() => setBtnActive(0)}
            to={"/users"}
            $active={active}
          >
            <FileIcon />
            <p>Users</p>
          </PageBtn>
        ) : userData?.role.roleName === "logger" ? (
          <PageBtn
            onClick={() => setBtnActive(0)}
            to={"/reports"}
            $active={active}
          >
            <ReportIcon />
            <p>Reports</p>
          </PageBtn>
        ) : (
          ""
        )}
        {userData?.role.roleName === "logger" ||
          (userData?.role.roleName === "superAdmin" && !companyData ? (
            <PageBtn
              onClick={() => setBtnActive(0)}
              to={"/notification"}
              $active={active}
            >
              <FileIcon />
              <p>Notification</p>
            </PageBtn>
          ) : (
            ""
          ))}
      </div>

      <LogoutBtn onClick={logoutFun}>
        <BiLogOut size={20} />
        {active && <p>Log aut</p>}
      </LogoutBtn>
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
});
