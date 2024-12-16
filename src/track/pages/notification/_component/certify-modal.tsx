import { CustomModal, Text } from "@/track/constants";
import { Dispatch, SetStateAction } from "react";
import { ModalTitle } from "../notification-style";
import { Checkbox } from "antd";
import { FormInput, FormSelect } from "@/track/components/ui";
import { Flex } from "@/track/components/shared/drivers-header/drivers-header-styled";
import { Select } from "@/track/components/shared/select";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { DefaultBtn, PrimaryBtn } from "../../units/units-styled";
interface Prop {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  refetch?: () => void;
}
const selectData = [
  { id: 1, label: "Notification", value: "notification" },
  { id: 2, label: "Clock", value: "clock" },
  { id: 3, label: "Rooster", value: "rooster" },
  { id: 4, label: "Danger", value: "danger" },
];

export const CertifyModal = ({ open, setOpen }: Prop) => {
  const dark = useSelector((state: RootState) => state.booleans.darkMode);
  const selectBg = dark ? "#373737" : "#F9F9FA";
  return (
    <CustomModal
      closable={false}
      width={"964px"}
      open={open}
      onCancel={() => setOpen(false)}
    >
      <ModalTitle>
        Sent notification to <p>Sabit Amirbabay</p>
      </ModalTitle>
      <Checkbox style={{ marginBottom: "25px;" }}>
        <Text size={20}>Hight volume</Text>
      </Checkbox>
      <FormInput placeholder="Message" />
      <Flex $gap="10px" $align="center" $m="45px">
        <Select option={selectData} bg={selectBg} w="100%" h="60px" />
        <img src="/assets/icons/play.svg" alt="" />
      </Flex>
      <Flex $justify="end" $gap={"10px"}>
        <DefaultBtn
          onClick={() => setOpen(false)}
          style={{ width: "200px", height: "55px", color: "#F3F3F4" }}
          type="primary"
        >
          Cancel
        </DefaultBtn>

        <PrimaryBtn
          style={{ width: "200px", height: "55px" }}
          htmlType="submit"
          //   loading={unitsMutation.isLoading}
        >
          Sent
        </PrimaryBtn>
      </Flex>
    </CustomModal>
  );
};
