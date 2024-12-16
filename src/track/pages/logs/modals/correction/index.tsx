import { Flex } from "@/track/components/shared/drivers-header/drivers-header-styled";
import { TimeContainer } from "@/track/components/ui";
import { CustomModal } from "@/track/constants";
import { Dispatch, SetStateAction } from "react";
interface Prop {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  // refetch: () => void;
}
export const CorrectionModal = ({ open, setOpen }: Prop) => {
  return (
    <CustomModal open={open} onCancel={() => setOpen(false)} width={"1478px"}>
      <Flex>
        <TimeContainer />
      </Flex>
    </CustomModal>
  );
};
