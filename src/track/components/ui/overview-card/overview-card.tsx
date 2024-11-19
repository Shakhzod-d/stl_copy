import { useSelector } from "react-redux";

import {
  Item,
  Title,
  Value,
  Wrapper,
  StyleFlex,
  ResText,
  ResTitle,
} from "./overview-styled";
import { RootState } from "@/store";

import { Text, InfoCard } from "@/track/constants";
import { Flex } from "../../shared/drivers-header/drivers-header-styled";
interface Props {
  activeDrivers: number;
  activeVehicles: number;
  inspection: number;
}
export const OverviewCard = ({
  activeDrivers,
  activeVehicles,
  inspection,
}: Props) => {
  const active = useSelector(
    (state: RootState) => state.booleans.dashboardProgress
  );
  return (
    <InfoCard $active={active}>
      {active ? (
        <>
          <Text $font="600" size={16} $mb="42px">
            Overview
          </Text>

          <Wrapper>
            <Item>
              <Value style={{ color: "#32BE61" }}>{activeDrivers}</Value>
              <Title>Active drivers</Title>
            </Item>
            <Item>
              <Value style={{ color: "#EF3E2D" }}>{activeVehicles}</Value>
              <Title>Active vehicles</Title>
            </Item>
            <Item>
              <Value style={{ color: "#FC973A" }}>{inspection}</Value>
              <Title>Inspection</Title>
            </Item>
          </Wrapper>
        </>
      ) : (
        <StyleFlex>
          <ResTitle>Overview</ResTitle>
          <Flex $gap={"6px"}>
            <ResText $clr="#32BE61">{activeDrivers}</ResText>
            <ResText>Active drivers</ResText>
          </Flex>
          <Flex $gap={"6px"}>
            <ResText $clr="#EF3E2D">{activeVehicles}</ResText>
            <ResText>Active vehicles</ResText>
          </Flex>
          <Flex $gap={"6px"}>
            <ResText $clr="#FC973A">{inspection}</ResText>
            <ResText>Inspection</ResText>
          </Flex>
        </StyleFlex>
      )}
    </InfoCard>
  );
};
