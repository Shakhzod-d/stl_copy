import { IoIosArrowDown } from "react-icons/io";
import {
  Container,
  Item,
  Option,
  OptionContainer,
  StyleSelect,
} from "./select-css";
import { useEffect, useRef, useState } from "react";

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
  onChange?: (e: unknown) => void;
}
export const Select = (props: Props) => {
  const dark = useSelector((state: RootState) => state.booleans.darkMode);
  const { option, placeholder, dValue, w, clr, optionW, font, onChange } =
    props;
  const [active, setActive] = useState(false);

  const selectRef = useRef<HTMLDivElement>(null);

  // Selectni ochish yoki yopish funksiyasi

  // Selectni yopish funksiyasi
  const closeSelect = () => {
    setActive(false);
  };

  // Tashqi joyni bosishni kuzatish
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        closeSelect();
      }
    };

    // Tashqi joyga bosilganda handleClickOutside funksiyasini chaqirish
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const value = dValue ? dValue : placeholder ? placeholder : undefined;

  const [defaultValue, setDValue] = useState<SelectOption | undefined | string>(
    value
  );
  const onClickFun = (e: unknown) => {
    const value = option.find((item) => item.value === e);
    setDValue(value);
    setActive(false);

    onChange?.(e); // TypeScript endi xatolik bermaydi
  };
  return (
    <Item
      initialValue={
        typeof defaultValue == "string" ? defaultValue : defaultValue?.value
      }
      name={"select"}
    >
      <Container $w={w} ref={selectRef}>
        <StyleSelect onClick={() => setActive((c) => !c)} $active={active}>
          <Text $font={font} color={dark ? "#fff" : clr}>
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
                $clr={dark ? "#fff" : clr}
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
