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
import { Rules } from "@/track/types/helper.type";

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
  rules?: Rules[];
  onChange?: (e: unknown) => void;
}
// Your other imports remain the same...

export const Select = (props: Props) => {
  const dark = useSelector((state: RootState) => state.booleans.darkMode);
  const {
    option,
    placeholder,
    dValue,
    w,
    clr,
    optionW,
    font,
    onChange,
    bg,
    h,
    rules,
  } = props;
  const [active, setActive] = useState(false);

  const selectRef = useRef<HTMLDivElement>(null);

  // Helper to check if value is valid or not
  const isValidInitialValue = (
    value: SelectOption | string | undefined | boolean
  ) => {
    return value !== undefined && value !== false && value !== "";
  };

  // Calculate the default or initial value
  const initialValue = dValue ? dValue : placeholder ? placeholder : undefined;

  // Set initial state for defaultValue, with error handling for invalid values
  const [defaultValue, setDValue] = useState<SelectOption | string | undefined>(
    isValidInitialValue(initialValue) ? initialValue : undefined
  );

  // Select toggle function
  const toggleSelect = () => setActive((prev) => !prev);

  // Close select function
  const closeSelect = () => {
    setActive(false);
  };

  // Close select if clicking outside of the component
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        closeSelect();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle onChange and update selected value
  const onClickFun = (e: unknown) => {
    const value = option.find((item) => item.value === e);
    setDValue(value);
    setActive(false);
    if (onChange) {
      onChange(e);
    }
  };

  // Form item with validation for the initial value
  return (
    <Item
      initialValue={
        isValidInitialValue(defaultValue) ? defaultValue : undefined
      }
      rules={rules}
      name="select"
    >
      <Container $w={w} ref={selectRef}>
        <StyleSelect onClick={toggleSelect} $active={active} bg={bg} h={h}>
          <Text $font={font} color={dark ? "#fff" : clr}>
            {typeof defaultValue === "string"
              ? defaultValue
              : defaultValue?.label || placeholder}
          </Text>
          <IoIosArrowDown color={dark ? "#fff" : "#000"} />
        </StyleSelect>
        <OptionContainer $active={active} $w={optionW || w} h={h}>
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
