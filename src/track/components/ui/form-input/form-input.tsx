import { useSelector } from "react-redux";
import { Rules } from "@/track/types/helper.type";
import { Item, StyledInput } from "./input-styled";
import { RootState } from "@/store";

interface Props {
  name?: string;
  rules?: Rules[];
  placeholder?: string;
  width?: string;
  padding?: string;
  clr?: string;
  pClr?: string;
  bg?: string;
  type?: string;
  h?: string;
  value?: string | number | undefined;
  change?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}
export const FormInput = (prop: Props) => {
  const {
    name,
    rules,
    placeholder,
    width,
    padding,
    clr,
    pClr,
    bg,
    type,
    h,
    change,
    disabled,
  } = prop;
const dark = useSelector((state: RootState) => state.booleans.darkMode);
  return (
    <Item name={name} rules={rules ? rules : []}>
      <StyledInput
        onChange={change}
        disabled={disabled}
        placeholder={placeholder}
        $w={width}
        $p={padding}
        $clr={dark ?"#fff": clr}
        $pClr={dark? "#fff": pClr}
        $bg={dark ?"#7c7c80d6": bg}
        $h={h}
        type={type}
      />
    </Item>
  );
};
