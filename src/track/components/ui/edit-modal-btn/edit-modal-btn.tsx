import { useState } from "react";
import { StyledBtn } from "./styled";
import { BsX } from "react-icons/bs";

interface Props {
  text: string;
  isActive: boolean;
}

export const EditModalBtn = ({ text, isActive }: Props) => {
  const [activeBtn, setActiveBtn] = useState(isActive || false);

  return (
    <StyledBtn
    // type="primary"
      active={String(activeBtn)}
      onClick={() => setActiveBtn((prev) => !prev)}
    >
      {text}

      {activeBtn ? <BsX size={20} color="#fff"/> : ""}
    </StyledBtn>
  );
};
