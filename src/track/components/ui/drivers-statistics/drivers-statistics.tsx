import { Left, Right } from "./drivers-statistics-styled";
import { driversStatisticsData } from "../../../utils";
import { Flex } from "../../shared/drivers-header/drivers-header-styled";

export const DriversStatistics = () => {
  return (
    <Flex $gap={"11px"} style={{ marginBottom: "10px" }}>
      {driversStatisticsData.map((item) => (
        <Flex $gap={"2px"} key={item.id}>
          <Left color={item.color}>{item.statistics_number}</Left>
          <Right color={item.color}>{item.text}</Right>
        </Flex>
      ))}
    </Flex>
  );
};
