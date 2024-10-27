import { CustomButton, Wrapper } from "./diagrams-styled";
import { CustomProgress } from "@/track/components/ui/progress";
import { circleDiagram, Text } from "@/track/constants/index";
import { Flex } from "../drivers-header/drivers-header-styled";
import { IGraph } from "@/pages/Logs/components/LogGraph";
import LogGraph from "@/pages/Logs/components/LogGraph";
export const Diagrams = ({
  data: logs = [],
  setHoveredId,
  hoveredId,
  currentLog,
  setCurrentLog,
  afterRangeChange,
  filterDrawStatus,
  isFetching,
  initialTime = 0,
}: IGraph) => {
  return (
    <>
      <Wrapper>
        <Flex $justify="space-between" $align="center ">
          <Flex $gap={"20px"} $align="center">
            {circleDiagram.map((item) => (
              <Flex $gap={"8px"} key={item.id} $align="center">
                <Flex $gap={"8px"}>
                  <Text color={item.color} $font="500">
                    {item.title}
                  </Text>
                  <Text $font="bold">{item.valueData}</Text>
                </Flex>
                <CustomProgress
                  percent={item.value}
                  color={item.color}
                  // size="small"
                />
              </Flex>
            ))}
          </Flex>

          <Flex $gap={"6px"} style={{ margin: "20px 0" }}>
            <CustomButton>Report</CustomButton>
            <CustomButton>Certify</CustomButton>
            <CustomButton>Duplicate</CustomButton>
            <CustomButton>Al check</CustomButton>
            <CustomButton>Correction</CustomButton>
            <CustomButton>Current Location</CustomButton>
            <CustomButton>EHF</CustomButton>
          </Flex>
        </Flex>

        <LogGraph
          data={filterDrawStatus}
          setHoveredId={setHoveredId}
          hoveredId={hoveredId}
          currentLog={currentLog}
          setCurrentLog={setCurrentLog}
          afterRangeChange={afterRangeChange}
          isFetching={isFetching}
          initialTime={initialTime}
        />
      </Wrapper>
    </>
  );
};
