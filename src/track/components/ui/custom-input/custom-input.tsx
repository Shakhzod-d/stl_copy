import { AiOutlineSearch } from "react-icons/ai";
import { StyledInput } from "./input-styled";

import { RootState } from "@/store";
import { useSelector } from "react-redux";
interface Props {
  type?: string;
  change?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  width?: string | "";
  height?: number;
  margin?: string;
}
export const CustomInput = ({ type, change, width, margin }: Props) => {
  const dark = useSelector((state: RootState) => state.booleans.darkMode);
  return (
    <StyledInput
    
    style={{backgroundAttachment:"red"}}
      $width={width}
      $margin={margin}
      prefix={
        type == "search" ? (
          <AiOutlineSearch size={20} color={dark ? "#fff" : "#000"} />
        ) : null
      }
      onChange={change}
    />
  );
};
