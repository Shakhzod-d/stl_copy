// import { Btn, TabBtn } from "../manage-user-modal/modal-styled";
import { Dispatch, SetStateAction, useState } from "react";

import { Details } from "./details";
import { Settings } from "./settings";
import { CustomModal } from "@/track/constants";
import { Flex } from "@/track/components/shared/drivers-header/drivers-header-styled";
import {
  Btn,
  TabBtn,
} from "@/track/pages/company-users/modals/manage-user-modal/modal-styled";

const btnArr = [
  { id: 1, label: "Details" },
  { id: 2, label: "settings" },
];
interface Props {
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}
export const CompanyModal = ({ setOpen, open }: Props) => {
  const [tabId, setTabId] = useState(1);

  return (
    <CustomModal
      open={open}
      width={"1300px"}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
    >
      <Flex $justify="" $align="center" $m={"0 0 15px 0"}>
        <Flex $gap={"8px"} $align="center">
          {btnArr.map((item) => (
            <TabBtn
              key={item.id}
              type="primary"
              $active={item.id == tabId}
              onClick={() => setTabId(item.id)}
            >
              {item.label}
            </TabBtn>
          ))}
        </Flex>
      </Flex>
      {tabId === 1 ? <Details /> : <Settings />}
      <Flex $justify="end">
        <Flex $gap={"6px"}>
          <Btn type="primary" onClick={() => setOpen(false)}>
            Close
          </Btn>

          <Btn type="primary" $type="add" onClick={() => setOpen(false)}>
            Save
          </Btn>
        </Flex>
      </Flex>
    </CustomModal>
  );
};
