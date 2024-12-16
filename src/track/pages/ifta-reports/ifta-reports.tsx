import { useState } from "react";

import { TransparentButton } from "./ifta-reports-styled";
import {
  IftaReportButtons,
  IftaReportColData,
  IftaReportData,
  Main,
} from "../../utils/index";
import { CustomInput, Navbar } from "../../components/ui";
import { CustomTable } from "../../components/shared";
import { Flex } from "@/track/components/shared/drivers-header/drivers-header-styled";

import { PrimaryBtn } from "../units/units-styled";
const tableClr = [
  { id: 5, clr: "#32BE61" },
  { id: 6, clr: "#6298EF" },
  { id: 7, clr: "#6298EF" },
];
export const IftaReports = () => {
  const [activeBtn, setActiveBtn] = useState<number>(1);

  return (
    <Main>
      <Navbar title={"Ifta Reports"} />

      {/* Ifta Reports sort select items */}

      <Flex $justify="end" $align="center" $m="10px 0 0 0 " $gap="10px">
        <CustomInput type="search" width="270px" height={"59px"} />
        <PrimaryBtn width="147px">New report</PrimaryBtn>
      </Flex>

      {/* Ifta Reports change UI data buttons */}

      <Flex $gap={"10px"} style={{ margin: "20px 0" }}>
        {IftaReportButtons.map((item) => (
          <TransparentButton
            key={item.id}
            active={(activeBtn === item.id).toString()}
            onClick={() => setActiveBtn(item.id)}
          >
            {item.text}
          </TransparentButton>
        ))}
      </Flex>

      {/* Ifta Reports data table */}

      <CustomTable
        columns={IftaReportColData}
        data={IftaReportData}
        itemColor={tableClr}
        pagination
        pTotal={7}
      />
    </Main>
  );
};
