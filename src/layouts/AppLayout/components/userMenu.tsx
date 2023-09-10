import { Button, Menu } from "antd";
import { NavLink } from "react-router-dom";
import Icon from "@/components/icon/Icon";
import {
     historyPush,
     historyReplace,
     logoutUser,
     setLocalStorage,
} from "@/utils";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { ICompanyData } from "@/types/company.type";

const useUserMenu = (
     companies: ICompanyData[] | undefined,
     ref: React.MutableRefObject<HTMLElement | undefined>
) => {
     const { userData } = useSelector((state: RootState) => state.auth);

     return (
          <Menu
               className="navbar-menu-dropdown"
               items={[
                    {
                         key: "1",
                         type: "group",
                         className: "item menu-links",
                         children: [
                              {
                                   key: "2",
                                   label: (
                                        <NavLink
                                             to={"/profile"}
                                             activeClassName="active"
                                        >
                                             <Icon icon="person" />
                                             Profile
                                        </NavLink>
                                   ),
                              },
                              {
                                   key: "3",
                                   label: (
                                        <NavLink
                                             to={"/settings"}
                                             activeClassName="active"
                                        >
                                             <Icon icon="settings" />
                                             Settings
                                        </NavLink>
                                   ),
                              },
                              {
                                   key: "4",
                                   label: (
                                        <NavLink
                                             to={"/subscription"}
                                             activeClassName="active"
                                        >
                                             <Icon icon="date-range" />
                                             Update subscription
                                        </NavLink>
                                   ),
                              },
                         ],
                    },
                    {
                         key: "5",
                         type: "group",
                         className: "item menu-companies all-companies",
                         label: (
                              <div className="d-flex justify-center">
                                   <Button
                                        onClick={() =>
                                             historyReplace(
                                                  "/admin/all-companies"
                                             )
                                        }
                                        className="menu-companies-title"
                                   >
                                        Companies
                                   </Button>
                              </div>
                         ),
                         children: companies?.map((company) => ({
                              key: company?._id,
                              label: (
                                   <span
                                        className={`menu-companies-link ${localStorage.getItem(
                                             "companyId"
                                        ) === company._id && "active"
                                             }`}
                                        key={company._id}
                                        // @ts-ignore
                                        ref={
                                             localStorage.getItem(
                                                  "companyId"
                                             ) === company._id
                                                  ? ref
                                                  : undefined
                                        }
                                        onClick={(e) => {
                                             e.stopPropagation();
                                             setLocalStorage(
                                                  "companyId",
                                                  company?._id
                                             );
                                             historyPush("/main/dashboard");
                                             window.location.reload();
                                        }}
                                   >
                                        {company?.companyName}
                                   </span>
                              ),
                         })),
                    },
                    {
                         key: "9",
                         type: "group",
                         className: "item menu-companies",
                         label: (
                              <span className="menu-companies-title">
                                   Accounts
                              </span>
                         ),
                         children: [
                              {
                                   key: "10",
                                   label: (
                                        <span className="menu-companies-user">
                                             <span>
                                                  -
                                                  {userData?.firstName +
                                                       " " +
                                                       userData?.lastName}
                                             </span>{" "}
                                             <Icon icon="close" />
                                        </span>
                                   ),
                              },
                         ],
                    },
                    {
                         key: "11",
                         label: (
                              <div className="item logout" onClick={logoutUser}>
                                   <Icon icon="logout" /> Log out
                              </div>
                         ),
                    },
               ]}
          />
     );
};

export default useUserMenu;
