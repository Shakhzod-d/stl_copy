import { DataPicker } from "@/track/components/shared/data-picker/data-picker";
import { Flex } from "@/track/components/shared/drivers-header/drivers-header-styled";
import { CustomModal, Text } from "@/track/constants";
import { Btn } from "@/track/pages/company-users/modals/manage-user-modal/modal-styled";
import { PrimaryBtn } from "@/track/pages/units/units-styled";
import { Dispatch, SetStateAction } from "react";
interface Prop {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
export const DownloadReport = ({ open, setOpen }: Prop) => {
  return (
    <CustomModal
      width={"800px"}
      open={open}
      onCancel={() => setOpen(false)}
      closable={false}
    >
      <Text size={35}>Download report</Text>
      <Flex $gap="10px" $m="0 0 45px 0">
        <DataPicker placeholder="Start time" />
        <DataPicker placeholder="End time" />
      </Flex>
      <Flex $justify="end" $gap="10px">
        <Btn type="primary" onClick={() => setOpen(false)}>
          Cancel
        </Btn>
        <PrimaryBtn width="200px" onClick={() => setOpen(false)}>
          Basic
        </PrimaryBtn>
        <PrimaryBtn width="200px" onClick={() => setOpen(false)}>
          Advanced
        </PrimaryBtn>
      </Flex>
    </CustomModal>
  );
};
