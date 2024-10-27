import { Select } from "antd";
import { GlobalStyle, Item, StyledSelect } from "./select-styled";
import { FaAngleDown } from "react-icons/fa";
import { Rules } from "../../../types/helper.type";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface Option {
  id?: number | string;
  label: string | number;
  value: string | boolean | number | unknown;
}
interface Props {
  name?: string;
  rules?: Rules[];
  h?: string;
  width?: string;
  clr?: string;
  pClr?: string;
  bg?: string;
  placeholder?: string;
  data: Option[];
  value?: string | number | boolean;
}

export const FormSelect = (props: Props) => {
  const { h, rules, width, name, clr, pClr, bg, placeholder, data, value } =
    props;
  const dark = useSelector((state: RootState) => state.booleans.darkMode);
  return (
    <>
      <GlobalStyle />
      <Item name={name} rules={rules} initialValue={value}>
        <StyledSelect
          suffixIcon={<FaAngleDown />}
          placeholder={placeholder}
          $bg={dark ? "#7c7c80d6" : bg}
          $pClr={dark ? "#fff" : pClr}
          $clr={dark ? "#fff" : clr}
          $w={width}
          $h={h}
        >
          {data?.map((item, i) => {
            return (
              <Select.Option value={item.value} key={i}>
                {item.label}
              </Select.Option>
            );
          })}
        </StyledSelect>
      </Item>
    </>
  );
};
