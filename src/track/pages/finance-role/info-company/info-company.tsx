import { Flex } from "@/track/components/shared/drivers-header/drivers-header-styled";
import { Navbar } from "@/track/components/ui";
import { Main, TransparentButton } from "@/track/constants";
import React, { useState } from "react";
import { CompanyInfo } from "./_components/company-info";
import { CompanyUsers } from "./_components/company-users";

export const InfoCompany = () => {
  const [activeBtn, setActiveBtn] = useState<number>(1);
  return (
    <Main>
      <Navbar title="Info Company" />
      <Flex $gap={"10px"} style={{ margin: "20px 0" }}>
        {btn.map((item) => (
          <TransparentButton
            key={item.id}
            active={(activeBtn === item.id).toString()}
            onClick={() => setActiveBtn(item.id)}
          >
            {item.text}
          </TransparentButton>
        ))}
      </Flex>
      {activeBtn === 1 ? <CompanyInfo /> : <CompanyUsers />}
    </Main>
  );
};
const btn = [
  { id: 1, text: "Company" },
  { id: 2, text: "Users" },
];
