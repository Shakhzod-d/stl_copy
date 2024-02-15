import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import { useLocation } from "react-router-dom";
import sider from "../components/sider";
import Icon from "@/components/icon/Icon";
import { historyPush } from "@/utils";

const { Sider } = Layout;

interface Props {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<Props> = ({ collapsed, setCollapsed }) => {
  const { pathname } = useLocation();

  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  useEffect(() => {
    const path = pathname.split("/").filter((item) => item);
    if (path) {
      setSelectedKeys([path[1]] || []);
    }
  }, [pathname]);

  return (
    <Sider
      trigger={null}
      width={202}
      className="app-sidebar"
      collapsible
      collapsed={collapsed}
    >
      <div
        onClick={() => {
          historyPush("/main/dashboard");
        }}
        className={`logo ${collapsed ? "collapsed" : ""}`}
      >
        {/* <img
          className="logo-icon"
          src="https://tmk.roundedteam.uz/assets/icons/logo-icon.svg"
          alt=""
          width={"119px"}
        /> */}
        {/* <img
          className="logo-icon"
          src="https://tmk.roundedteam.uz/assets/icons/logo-title.svg"
          alt=""
        /> */}
        {/* <img className="logo-title" src="/assets/images/STL.png" alt="" /> */}
        <img
          width={50}
          height={50}
          className="logo-title"
          src="/assets/images/STL.png"
          alt=""
        />
        {/* <img
          width={50}
          height={50}
          className="logo-title"
          style={{ background: "#FFF", borderRadius: "10px" }}
          src="/assets/icons/Logo_TMK_dashbord_page_vector.svg"
          alt=""
        /> */}
      </div>
      <div className="sidebar-scroll">
        <Menu
          theme="light"
          mode="inline"
          openKeys={openKeys}
          onOpenChange={setOpenKeys}
          selectedKeys={selectedKeys}
          items={sider}
        />
      </div>
      <div className={`toggle-menu ${collapsed ? "collapsed" : ""}`}>
        <div className="icon-wrapper" onClick={() => setCollapsed((p) => !p)}>
          <Icon icon="arrow-left" />
        </div>
      </div>
    </Sider>
  );
};

export default Sidebar;
