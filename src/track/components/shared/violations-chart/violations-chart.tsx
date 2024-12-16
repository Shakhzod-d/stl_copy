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
interface Props {
  data: any;
}
export const ViolationsChart = ({ data }: Props) => {
  const active = useSelector(
    (state: RootState) => state.booleans.dashboardProgress
  );
  const dark = useSelector((state: RootState) => state.booleans.darkMode);
  const violations =
    (data?.data.violationsChart?.driversWithViolationsCount /
      data?.data.violationsChart?.totaldriversCount) *
    100;
  const violations2 =
    (data?.data.violationsChart?.noSignatureViolationsCount /
      data?.data.violationsChart?.totaldriversCount) *
    100;
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
                    percent={
                      data?.data.violationsChart?.driversWithViolationsCount *
                      10
                    }
                    width={22}
                    strokeWidth={22}
                    showInfo={false}
                    trailColor={dark ? "#fff" : ""}
                    strokeColor={"#EF3E2D"}
                  />
                  <ResValue>
                    {data?.data.violationsChart?.noSignatureViolationsCount} (
                    {violations.toFixed(0)}%)
                  </ResValue>
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
                  <ResValue>
                    {" "}
                    {data?.data.violationsChart?.driversWithViolationsCount} (
                    {violations2.toFixed(0)}%)
                  </ResValue>
                </Flex>
              </Flex>
            </StyleFlex>
          </>
        )}
        {active && (
          <>
            <Text $mb="30px" size={16} $font="600" $line="19.09px">
              Violations Chart
            </Text>
            <div
              style={{
                display: "flex",
                gap: "40px",
                justifyContent: "center",
                marginTop: "10px",
              }}
            >
              <ProgressBar
                title="Violations"
                value={Number(violations.toFixed(0))}
                color="#EF3E2D"
                drivers={data?.data.violationsChart?.driversWithViolationsCount}
              />
              <ProgressBar
                title="Violations"
                value={Number(violations2.toFixed(0))}
                color="#FC973A"
                drivers={data?.data.violationsChart?.noSignatureViolationsCount}
              />
            </div>
          </>
        )}
      </InfoCard>
    </div>
  );
};
