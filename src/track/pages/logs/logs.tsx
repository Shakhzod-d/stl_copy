import { Navbar } from "../../components/ui";

import { LogsTabPages, Reload, Main, TransparentButton } from "../../constants";
import { NavLink, useLocation } from "react-router-dom";

import React, { ReactNode, useEffect } from "react";
import { MdRestartAlt } from "react-icons/md";
import { Flex } from "@/track/components/shared/drivers-header/drivers-header-styled";
import { historyPush } from "@/utils";
interface Props {
  children: ReactNode;
}
const Logs: React.FC<Props> = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.length <= 6) historyPush("/map");
  }, [pathname.length]);

  return (
    <Main>
      <Navbar title="Logs" />
      <Flex $justify="space-between">
        <Flex $gap={"5px"} style={{ marginBottom: "20px" }}>
          {LogsTabPages.map((item) => (
            <NavLink
              to={item.to}
              key={item.key}
              
            >
              <TransparentButton
                
                width="120px"
                active={String(pathname.endsWith(item.to))}
                padding="0 25px"
              >
                {item.label}
              </TransparentButton>
            </NavLink>
          ))}
        </Flex>

        <TransparentButton onClick={Reload} padding="15px 25px" type="primary">
          <MdRestartAlt />
          Refresh
        </TransparentButton>
      </Flex>

      {children}
    </Main>
  );
};

export default Logs;
