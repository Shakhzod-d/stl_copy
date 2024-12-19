// import { TextAria } from "./modal-styled";
import { FormInput } from "@/track/components/ui";

import { Flex } from "@/track/components/shared/drivers-header/drivers-header-styled";
import { Select } from "@/track/components/shared/select";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { log } from "node:console";

export const Information = () => {
  const dark = useSelector((state: RootState) => state.booleans.darkMode);
  const selectBg = dark ? "#373737" : "#F9F9FA";
  const selectChange = (e: any) => {
    console.log(e);
  };
  return (
    <>
      <Flex $gap={"6px"} $m="0 0 10px 0">
        <Select
          option={[]}
          w="100%"
          h="60px"
          bg={selectBg}
          placeholder="Employer"
          // onChange={selectChange}
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
        <FormInput placeholder="First Name*" h="60px" />
        <FormInput placeholder="Lats Name*" h="60px" />
      </Flex>
      <Flex $gap={"6px"} $m="0 0 10px 0">
        <FormInput placeholder="Mobile" h="60px" />

        <FormInput placeholder="Email" h="60px" />
        <FormInput placeholder="Password*" h="60px" />
      </Flex>
    </>
  );
};

;
