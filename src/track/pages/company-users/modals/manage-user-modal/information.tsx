import { Checkbox } from "antd";
import {  TextAria } from "./modal-styled";
import { FormInput, FormSelect } from "@/track/components/ui";
import { Text } from "@/track/constants";
import { Flex } from "@/track/components/shared/drivers-header/drivers-header-styled";

const cycleType = [
  { label: "Cycle Type", value: "cycle" },
  { label: "USA 70/8", value: "usa70/8" },
  { label: "USA 60/7", value: "60" },
  { label: "California 80/8", value: "California" },
  { label: "Canada 120/14", value: "Canada 120/14" },
];
const restart = [
  { label: "Restart", value: "restart" },
  { label: "34", value: "34" },
  { label: "24", value: "24" },
];
export const Information = () => {
  return (
    <>
      <Flex $gap={"6px"} $m="0 0 30px 0">
        <FormSelect
          data={[{ value: "driver", label: "Driver" }]}
          width="100%"
        />
        <FormSelect
          data={[{ value: "status", label: "Status" }]}
          width="100%"
        />
      </Flex>
      <Flex $gap={"6px"} $m="0 0 30px 0">
        <FormInput placeholder="First Name*" h="69px" />
        <FormInput placeholder="Lats Name*" h="69px" />
        <FormInput placeholder="Username*" h="69px" />
        <FormInput placeholder="Email" h="69px" />
      </Flex>
      <Flex $gap={"6px"} $m="0 0 30px 0">
        <FormInput placeholder="Password*" h="69px" />
        <FormInput placeholder="Phone No" h="69px" />
        <FormSelect
          data={[{ value: "vehicle", label: "Vehicle ID" }]}
          width="100%"
          h={"69px"}
        />
        <FormInput placeholder="Driver's License No*" h="69px" />
      </Flex>
      <Flex $gap={"6px"} $m="0 0 30px 0">
        <FormSelect
          data={[
            { value: "drivers", label: "Driver's License Issuing State*" },
          ]}
          width="100%"
          h={"69px"}
        />
        <FormInput placeholder="Home Terminal Address*" />
        <FormSelect
          data={[{ value: "coDriver", label: "Co-Driver" }]}
          width="100%"
          h={"69px"}
        />
      </Flex>
      <Flex $gap={"6px"} $m="0 0 30px 0">
        <FormSelect
          data={[{ value: "address1", label: "Address 1" }]}
          width="100%"
          h={"69px"}
        />
        <FormInput placeholder="Address 2" h="69px" />
        <FormInput placeholder="City" h="69px" />
        <FormInput placeholder="State" />
        <FormInput placeholder="Zip" h="69px" />
      </Flex>
      <Flex $gap={"6px"} $m="0 0 30px 0">
        <FormSelect data={cycleType} width="100%" h={"69px"} />

        <FormSelect data={restart} width="100%" h={"69px"} />
      </Flex>
      <TextAria placeholder="Note" />
      <Flex $gap={"6px"} $m="0 0 30px 0">
        <Checkbox>
          <Text> Allow Personal Conviance</Text>
        </Checkbox>
        <Checkbox>
          {" "}
          <Text> Allow Yard Move</Text>
        </Checkbox>
      </Flex>
    </>
  );
};
