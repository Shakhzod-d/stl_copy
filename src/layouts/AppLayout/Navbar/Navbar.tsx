import React, { useEffect, useState, useRef } from "react";
import { Dropdown, Switch } from "antd";
import { changeTheme } from "@/utils";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { INavStatus } from "@/types";
import useUserMenu from "../components/userMenu";
import useApi from "@/hooks/useApi";

const Navbar: React.FC = () => {

     const { theme, userData, companies } = useSelector((state: RootState) => state.auth);
     const ref = useRef<HTMLElement | undefined>();


     const [status, setStatus] = useState<INavStatus | null>(null);
     const { data, status: countStatus } = useApi<
          {
               _id: "off" | "on" | "dr" | "sb";
               count: 1;
          }[]
     >(
          "count",
          {},
          {
               // refetchInterval: 5000,
          }
     );

     const userMenu = useUserMenu(companies, ref);

     useEffect(() => {
          if (countStatus === "success") {
               let statuses: INavStatus = {
                    dr: 0,
                    sb: 0,
                    off: 0,
                    on: 0,
               };
               data.data.forEach((statusItem) => {
                    statuses = {
                         ...statuses,
                         [statusItem._id]: statusItem.count,
                    };
               });
               setStatus(statuses);
          }
     }, [countStatus, data]);

     const onDropdownOpen = () => {
          ref?.current?.scrollIntoView({
               behavior: "smooth",
          });
     };

     return (
          <div className="app-nav">
               <div className="main">
                    <div className="left">
                         {/* <SearchByQuery
                              className="mw-250"
                              query={search}
                              setQuery={setSearch}
                         /> */}
                    </div>
                    <div className="time_drop">
                         <div className="item">
                              <div className="left bold-12 bg_blue blue">
                                   {status?.["on"] ?? 0}
                              </div>
                              <div className="right bold-12 blue"> On</div>
                         </div>
                         <div className="item">
                              <div className="left bold-12 bg_green green">
                                   {status?.["dr"] ?? 0}
                              </div>
                              <div className="right bold-12 green"> dr</div>
                         </div>
                         <div className="item">
                              <div className="left bold-12 bg_gray gray">
                                   {status?.["off"] ?? 0}
                              </div>
                              <div className="right bold-12 gray"> off</div>
                         </div>
                         <div className="item">
                              <div className="left bold-12 bg_yellow yellow">
                                   {status?.["sb"] ?? 0}
                              </div>
                              <div className="right bold-12 yellow"> sb</div>
                         </div>
                    </div>
                    <div className="right">
                         <Switch
                              checked={theme === "dark"}
                              onChange={(val) =>
                                   changeTheme(val ? "dark" : "light")
                              }
                         />
                         <Dropdown
                              overlay={userMenu}
                              placement="bottomLeft"
                              trigger={["click"]}
                              onVisibleChange={onDropdownOpen}
                         >
                              <div className="nav-info">
                                   <span>
                                        {companies.find(
                                             (company) =>
                                                  company._id ===
                                                  localStorage.getItem(
                                                       "companyId"
                                                  )
                                        )?.companyName || "Company name"}
                                   </span>
                                   <span>
                                        {userData?.firstName +
                                             " " +
                                             userData?.lastName || "User name"}
                                   </span>
                              </div>
                         </Dropdown>
                    </div>
               </div>
          </div>
     );
};

export default Navbar;
