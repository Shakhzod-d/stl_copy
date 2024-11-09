import { Checkbox } from "antd";
import { TextAria } from "./modal-styled";
import { FormInput, FormSelect } from "@/track/components/ui";
import { Text } from "@/track/constants";
import { Flex } from "@/track/components/shared/drivers-header/drivers-header-styled";
import { Select } from "@/track/components/shared/select";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

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
  const dark = useSelector((state: RootState) => state.booleans.darkMode);
  const selectBg = dark ? "#373737" : "#F9F9FA";
  return (
    <>
      <Flex $gap={"6px"} $m="0 0 10px 0">
        <Select
          option={[{ value: "driver", label: "Driver" }]}
          w="100%"
          h="60px"
          bg={selectBg}
          placeholder="Driver"
        />
        <Select
          w="100%"
          h="60px"
          bg={selectBg}
          option={[{ value: "status", label: "Status" }]}
          placeholder="Status"
        />
      </Flex>
      <Flex $gap={"6px"} $m="0 0 10px 0">
        <FormInput placeholder="First Name*" h="69px" />
        <FormInput placeholder="Lats Name*" h="69px" />
        <FormInput placeholder="Username*" h="69px" />
        <FormInput placeholder="Email" h="69px" />
      </Flex>
      <Flex $gap={"6px"} $m="0 0 10px 0">
        <FormInput placeholder="Password*" h="69px" />
        <FormInput placeholder="Phone No" h="69px" />
        <Select
          option={[{ value: "vehicle", label: "Vehicle ID" }]}
          w="100%"
          placeholder="Vehicle ID"
          bg={selectBg}
          h={"69px"}
        />
        <FormInput placeholder="Driver's License No*" h="69px" />
      </Flex>
      <Flex $gap={"6px"} $m="0 0 10px 0">
        <Select
          placeholder="Driver's License Issuing State*"
          bg={selectBg}
          option={[
            { value: "drivers", label: "Driver's License Issuing State*" },
          ]}
          w="100%"
          h={"69px"}
        />
        <FormInput placeholder="Home Terminal Address*" h="69px" />
        <Select
          option={[{ value: "coDriver", label: "Co-Driver" }]}
          w="100%"
          h={"69px"}
          placeholder="Co-Driver"
          bg={selectBg}
        />
      </Flex>
      <Flex $gap={"6px"} $m="0 0 10px 0">
        <Select
          placeholder="Address 1"
          bg={selectBg}
          option={[{ value: "address1", label: "Address 1" }]}
          w="100%"
          h={"69px"}
        />
        <FormInput placeholder="Address 2" h="69px" />
        <FormInput placeholder="City" h="69px" />
        <FormInput placeholder="State" h="69px" />
        <FormInput placeholder="Zip" h="69px" />
      </Flex>
      <Flex $gap={"6px"} $m="0 0 10px 0">
        <Select
          option={cycleType}
          w="100%"
          h={"60px"}
          bg={selectBg}
          placeholder="Cycle type"
        />

        <Select
          option={restart}
          w="100%"
          h={"60px"}
          bg={selectBg}
          placeholder="Restart"
        />
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
