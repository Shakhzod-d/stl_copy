
import { Flex } from "@/track/components/shared/drivers-header/drivers-header-styled";
import { CustomTable } from "../../components/shared";

import { Box, LogsData, LogsDataHeader, SmallBox } from "../../utils/constants";

export function LogsLog() {
  return (
    <>
      <Flex $align="center" $justify="space-between">
        <Flex $gap={"8px"}>
          <Box>02-14-2024 → 03-11-2024</Box>
          <Box>Davit Gogotidze</Box>
          <SmallBox style={{ rotate: "180deg" }}></SmallBox>
        </Flex>
        <Flex $gap={"8px"}>
          <Flex $gap={"2px"}>
            <Box>Violation</Box>
            <SmallBox style={{ rotate: "180deg" }}></SmallBox>
          </Flex>
          <Flex $gap={"2px"}>
            <Box>Warnings</Box>
            <SmallBox style={{ rotate: "180deg" }}></SmallBox>
          </Flex>
          <Box>Search</Box>
        </Flex>
      </Flex>

      <CustomTable columns={LogsDataHeader} data={LogsData} />
    </>
  );
}
