import { Flex } from "@/track/components/shared/drivers-header/drivers-header-styled";
import { CustomModal, Text } from "@/track/constants";
import { Dispatch, SetStateAction, useState } from "react";
import { Btn, TabBtn } from "../manage-user-modal/modal-styled";
import { Information } from "./information";
import { Permission } from "./permission";
interface Props {
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}
const btnArr = [
  { id: 1, label: "Base information" },
  { id: 2, label: "Permission" },
];
export const UserAdd = ({ setOpen, open }: Props) => {
  const [tabId, setTabId] = useState(1);
  return (
    <CustomModal
      width={"1300px"}
      open={open}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
    >
      <Flex $justify="space-between" $align="center" $m="30px 0">
        <Text size={30}>Edit User</Text>
        <Flex $gap={"6px"} $align="center">
          {btnArr.map((item) => (
            <TabBtn
              key={item.id}
              type="primary"
              $active={item.id === tabId}
              onClick={() => setTabId(item.id)}
            >
              {item.label}
            </TabBtn>
          ))}
        </Flex>
      </Flex>
      {tabId === 1 ? <Information /> : <Permission />}
      <Flex $justify="end" $align="center" $m="30px 0">
        <Flex $gap={"6px"}>
          <Btn type="primary" onClick={() => setOpen(false)}>
            Close
          </Btn>

          <Btn type="primary" $type="add">
            Add
          </Btn>
        </Flex>
      </Flex>
    </CustomModal>
  );
};
