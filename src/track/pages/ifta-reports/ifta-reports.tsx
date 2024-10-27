import { useState } from "react";

import { TransparentButton } from "./ifta-reports-styled";
import {
  IftaReportButtons,
  IftaReportColData,
  IftaReportData,
  IftaReportSelectData,
  Main,
} from "../../utils/index";
import { CustomSelect, Navbar } from "../../components/ui";
import { CustomTable } from "../../components/shared";
import { Flex } from "@/track/components/shared/drivers-header/drivers-header-styled";

export const IftaReports = () => {
  const [activeBtn, setActiveBtn] = useState<number>(1);

  return (
    <Main>
      <Navbar title={"Ifta Reports"} />

      {/* Ifta Reports sort select items */}

      <Flex $justify="space-between" $align="center">
        <Flex $gap={"10px"}>
          {IftaReportSelectData.map((item) => (
            <CustomSelect
              key={item.id}
              placeholder={item.defaultValue}
              option={item.options}
              width="185px"
              height={50}
              // color="#000"
            />
          ))}
        </Flex>

        <TransparentButton>Generate CSV</TransparentButton>
      </Flex>

      {/* Ifta Reports change UI data buttons */}

      <Flex $gap={"10px"} style={{ margin: "20px 0" }}>
        {IftaReportButtons.map((item) => (
          <TransparentButton
            key={item.id}
            active={(activeBtn == item.id).toString()}
            onClick={() => setActiveBtn(item.id)}
          >
            {item.text}
          </TransparentButton>
        ))}
      </Flex>

      {/* Ifta Reports data table */}

      <CustomTable columns={IftaReportColData} data={IftaReportData} />
    </Main>
  );
};
