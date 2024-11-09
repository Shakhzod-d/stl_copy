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
  value: string | number | any;
  label: string | number;
}

interface Props {
  option: [] | SelectOption[];
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
    name,
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
  const initialValue = dValue ? dValue : undefined;

  // Set initial state for defaultValue, with error handling for invalid values
  const [defaultValue, setDValue] = useState<SelectOption | undefined>(
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
  const [test, setTest] = useState<string | undefined>(undefined);
  // Handle onChange and update selected value
  const onClickFun = (value: string | number | unknown) => {
    const selectedOption = option.find((item) => item.value === value);
    if (selectedOption) {
      setDValue(selectedOption); // Selectning default qiymatini yangilaydi
      setTest(selectedOption.value.toString()); // Error sinovi uchun test state o'rnatiladi
      setActive(false);
      if (onChange) {
        onChange(selectedOption);
      }
    }
  };

  return (
    <Item key={test} initialValue={test} rules={rules} name={name}>
      <Container $w={w} ref={selectRef}>
        <StyleSelect onClick={toggleSelect} $active={active} bg={bg} h={h}>
          <Text $font={font} color={dark ? "#fff" : clr}>
            {defaultValue ? defaultValue.label : placeholder}
          </Text>
          <IoIosArrowDown color={dark ? "#fff" : "#000"} />
        </StyleSelect>
        <OptionContainer $active={active} $w={optionW || w} h={h}>
          {option.map((item) => (
            <Option
              $clr={dark ? "#fff" : clr}
              onClick={() => onClickFun(item.value)}
              key={item.id}
              $active={defaultValue?.value === item.value}
            >
              {item.label}
            </Option>
          ))}
        </OptionContainer>
      </Container>
    </Item>
  );
};
