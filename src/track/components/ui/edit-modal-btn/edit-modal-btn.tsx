import { useState } from "react";
import { StyledBtn } from "./styled";

interface Props {
  text: string;
  isActive: boolean;
}

export const EditModalBtn = ({ text, isActive }: Props) => {
  const [activeBtn, setActiveBtn] = useState(isActive || false);

  return (
    <StyledBtn
      active={String(activeBtn)}
      onClick={() => setActiveBtn((prev) => !prev)}
    >
      {text}

      {activeBtn ? <span>x</span> : ""}
    </StyledBtn>
  );
};
