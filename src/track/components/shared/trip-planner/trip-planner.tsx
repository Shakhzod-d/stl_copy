

import { CustomButton, Text } from "@/track/constants";
import { Flex } from "../drivers-header/drivers-header-styled";
import { Block, Map } from "./planner-styled";
import { IoIosArrowDown } from "react-icons/io";

export const TripPlanner = () => {
  return (
    <section>
      <Flex
        $align="center"
        $justify="space-between"
        style={{ marginBottom: "15px" }}
      >
        <Text size={32} $font="500">
        Trip Planner
        </Text>
        <CustomButton
          type="primary"
          $background="#FC973A"
          padding="15px 25px"
          height="50px"
        >
          Roadmap
        </CustomButton>
      </Flex>
      <Flex $gap={"6px"}>
        <div style={{ width: "400px" }}>
          <Block $bottom="10px">
            <Text color="#5d5e5f">From</Text>
          </Block>
          <Text size={14} color="#5d5e5f" $mb="20px">
            Location age: 14 min ago
          </Text>
          <Flex $gap={"6px"} style={{ marginBottom: "20px" }}>
            <Block width="338px">To</Block>
            <Block>
              <IoIosArrowDown />
            </Block>
          </Flex>
          <CustomButton
            $background="#FC973A"
            color="#fff"
            width="100%"
            height="59px"
            mb="20px"
            type="primary"
          >
            Run trip
          </CustomButton>
          <Flex $align="center" $gap={"6px"} $wrap={"wrap"}>
            <Block width="115px">516 mi</Block>
            <Block width="188px">8 hours 50 minut</Block>
            <Block width="193px">Copy last location</Block>
          </Flex>
        </div>
        <Map>
        <iframe
          src="https://yandex.uz/map-widget/v1/?um=constructor%3A31d0b3b1d6458e4ef408bb6eeb5c3278cc2ff150ae9b84e02b99e2ae3c9872b6&amp;source=constructor"
          width={"100%"}
          height={"100%"}
        ></iframe>
        </Map>
      </Flex>
    </section>
  );
};
