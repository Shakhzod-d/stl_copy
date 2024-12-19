import { Form } from "antd";
import { StyledCheckbox } from "./modal-styled";
import { Flex } from "@/track/components/shared/drivers-header/drivers-header-styled";
import { BsX } from "react-icons/bs";
import { useState } from "react";

interface Props {
  name: string;
  text: string;
  isActive: boolean;
}

export const CheckboxBtn = ({ isActive, text, name }: Props) => {
  const [active, setActive] = useState(isActive);
  return (
    <Form.Item
      name={name}
      valuePropName="checked" // Checkbox uchun "checked" qiymatini bog'laydi
      initialValue={active} // Boshlang'ich qiymat
    >
      <StyledCheckbox
        checked={isActive}
        onClick={() => setActive((c) => !c)}
        type="checkbox"
      >
        <Flex $gap="10px" $align="center">
          <div>{text}</div>
          {/* Agar checked true bo'lsa, BsX ni ko'rsatadi */}
          {active && <BsX size={20} color="#fff" />}
        </Flex>
      </StyledCheckbox>
    </Form.Item>
  );
};
