import { Flex } from "@/track/components/shared/drivers-header/drivers-header-styled";
import { FormInput } from "@/track/components/ui";
import { CustomModal, Text } from "@/track/constants";
import { Form } from "antd";
import { DefaultBtn, PrimaryBtn } from "../../units/units-styled";
import { Dispatch, SetStateAction } from "react";
interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
export const AddKey = ({ open, setOpen }: Props) => {
  return (
    <CustomModal width={"800px"} style={{ padding: "25px" }} open={open} onCancel={()=>setOpen(false)}>
      <Text size={30} $mb="25px">
        Generate API Key
      </Text>
      <Form>
        <FormInput placeholder="Inter a Title" />
        <Flex $align="end" $gap="10px" $w="100%" $justify="end" $m="45px 0 0 0">
          <DefaultBtn
            width="200px"
            height="60px"
            onClick={() => setOpen(false)}
          >
            Cancel
          </DefaultBtn>
          <PrimaryBtn
            width="200px"
            height="60px"
            onClick={() => setOpen(false)}
          >
            Generate
          </PrimaryBtn>
        </Flex>
      </Form>
    </CustomModal>
  );
};
