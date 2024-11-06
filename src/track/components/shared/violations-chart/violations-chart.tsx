import { InfoCard, Text } from "@/track/constants";
import { ProgressBar } from "../progress-bar";

import { Progress } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  ResText,
  ResTitle,
  ResValue,
  StyleFlex,
} from "../../ui/overview-card/overview-styled";
import { Flex } from "../drivers-header/drivers-header-styled";

export const ViolationsChart = () => {
  const active = useSelector(
    (state: RootState) => state.booleans.dashboardProgress
  );
  const dark = useSelector((state: RootState) => state.booleans.darkMode);
  return (
    <div>
      <InfoCard $active={active}>
        {active || (
          <>
            <StyleFlex>
              <ResTitle>Violations Chart</ResTitle>
              <Flex $gap="20px" $align="center">

              <Flex $gap={"6px"} $align="center">
                <ResText $clr="#EF3E2D">Violations</ResText>
                <Progress
                  type="dashboard"
                  percent={20}
                  width={22}
                  strokeWidth={22}
                  showInfo={false}
                  trailColor={dark ? "#fff" : ""}
                  strokeColor={"#EF3E2D"}
                  />
                <ResValue>2 ( 20% )</ResValue>
              </Flex>
              <Flex $gap={"6px"} $align="center">
                <ResText $clr="#FC973A">Signature</ResText>
                <Progress
                  type="dashboard"
                  percent={80}
                  width={22}
                  strokeWidth={22}
                  showInfo={false}
                  trailColor={dark ? "#fff" : ""}
                  strokeColor={"#FC973A"}
                  />
                <ResValue>8 ( 80% )</ResValue>
                  </Flex>
              </Flex>
            </StyleFlex>
          </>
        )}
        {active && (
          <>
            <Text $mb="30px" size={16} $font="600" $line="19.09px">Violations Chart</Text>
            <div
              style={{
                display: "flex",
                gap: "40px",
                justifyContent: "center",
                marginTop: "10px",
              }}
            >
              <ProgressBar title="Violations" value={20} color="#EF3E2D" />
              <ProgressBar title="Violations" value={80} color="#FC973A" />
            </div>
          </>
        )}
      </InfoCard>
    </div>
  );
};
