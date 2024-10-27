import { MdOutlineArrowBack } from "react-icons/md";
import { Between, Box, SmallBox } from "@/track/constants";
import { Flex } from "../../shared/drivers-header/drivers-header-styled";

export const TimeContainer = () => {
  return (
    <Between>
      <Flex $align="center" $gap={"8px"} $justify="center">
        <Box>03-10-2024</Box>
        <SmallBox>
          <MdOutlineArrowBack />
        </SmallBox>
        <SmallBox style={{ rotate: "180deg" }}>
          <MdOutlineArrowBack />
        </SmallBox>
      </Flex>
      <Flex $gap={"8px"}>
        <Box>Driver name</Box>
        <Box>Location</Box>

        <Box>Warnings</Box>
      </Flex>
    </Between>
  );
};
