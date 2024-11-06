import { IoIosArrowDown } from "react-icons/io";
import {
  Container,
  Item,
  Option,
  OptionContainer,
  StyleSelect,
} from "./select-css";
import { useState } from "react";

import { Text } from "@/track/constants";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface SelectOption {
  id?: number;
  value: string | number;
  label: string | number;
}

interface Props {
  option: SelectOption[];
  placeholder?: string;
  dValue?: SelectOption;
  w?: string;
  h?: string;
  bg?: string;
  optionW?: string;
  optionBg?: string;
  name?: string;
  clr?: string;
  optionClr?: string;
  pClr?: string;
  font?: string;
}
export const Select = (props: Props) => {
  const dark = useSelector((state: RootState) => state.booleans.darkMode);
  const { option, placeholder, dValue, w, clr, optionW, font } = props;
  const [active, setActive] = useState(false);
  const value = dValue ? dValue : placeholder ? placeholder : undefined;

  const [defaultValue, setDValue] = useState<SelectOption | undefined | string>(
    value
  );
  const onClickFun = (e: unknown) => {
    const value = option.find((item) => item.value === e);
    setDValue(value);
    setActive(false);
  };
  return (
    <Item
      initialValue={
        typeof defaultValue == "string" ? defaultValue : defaultValue?.value
      }
      name={"select"}
    >
      <Container $w={w}>
        <StyleSelect onClick={() => setActive((c) => !c)}>
          <Text $font={font} color={clr}>
            {typeof defaultValue == "string"
              ? defaultValue
              : defaultValue?.label}
          </Text>
          <IoIosArrowDown color={dark ? "#fff" : "#000"} />
        </StyleSelect>
        <OptionContainer $active={active} $w={optionW ? optionW : w}>
          {option.map((item) => {
            const isActive =
              typeof defaultValue !== "string"
                ? defaultValue?.value === item.value
                : false;
            return (
              <Option
                $clr={clr}
                onClick={() => onClickFun(item.value)}
                key={item.id}
                $active={isActive}
              >
                {item.label}
              </Option>
            );
          })}
        </OptionContainer>
      </Container>
    </Item>
  );
};
