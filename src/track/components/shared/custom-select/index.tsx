import { Box, SmallBox } from "@/track/utils/constants";
import { Flex } from "../drivers-header/drivers-header-styled";
import { IoIosArrowDown } from "react-icons/io";
import { Container, Option, OptionContainer } from "./style";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
interface Props {
  dValue?: Select;
  option: Select[] | any[];
  onChange?: (e: any) => void;
}
export interface Select {
  driver: string;
  driverId: string;
}
export const CustomSelect = ({ dValue, option, onChange }: Props) => {
  const dark = useSelector((state: RootState) => state.booleans.darkMode);
  const [active, setActive] = useState(false);
  const isValidInitialValue = (
    value: Select | string | undefined | boolean
  ) => {
    return value !== undefined && value !== false && value !== "";
  };

  // Calculate the default or initial value
  const initialValue = dValue ? dValue : undefined;

  // Set initial state for defaultValue, with error handling for invalid values
  const [defaultValue, setDValue] = useState<Select | undefined>(
    isValidInitialValue(initialValue) ? initialValue : undefined
  );
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const onClickFun = (data: string) => {
    const selectedOption = option.find((item) => item.driverId === data);
    if (selectedOption) {
      setDValue(selectedOption);
      setActive(false);
      if (onChange) {
        onChange(selectedOption);
      }
    }
  };
  return (
    <Flex $gap="2px" $align="center">
      <Container ref={selectRef}>
        <Box>{defaultValue?.driver}</Box>
        <OptionContainer $active={active} $w="246px">
          {option.map((item) => {
            return (
              <Option
                onClick={() => onClickFun(item.driverId)}
                $clr={dark ? "#fff" : "#000"}
                $active={defaultValue?.driverId === item.driverId}
              >
                {item.driver}
              </Option>
            );
          })}
        </OptionContainer>
      </Container>
      <SmallBox
        style={{ rotate: "180deg" }}
        onClick={() => setActive((c) => !c)}
      >
        <IoIosArrowDown style={{ rotate: "-180deg" }} />
      </SmallBox>
    </Flex>
  );
};
