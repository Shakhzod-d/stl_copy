import { AiOutlineSearch } from "react-icons/ai";
import { StyledInput } from "./input-styled";

import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { Cross, Search } from "@/track/utils/icons";
import { useState } from "react";
interface Props {
  type?: string;
  change?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  width?: string | "";
  height?: string;
  margin?: string;
  placeholder?: string;
  clear?: boolean;
}
export const CustomInput = ({
  type,
  change,
  width,
  margin,
  height,
  placeholder,
  clear,
}: Props) => {
  const dark = useSelector((state: RootState) => state.booleans.darkMode);
  const [value, setValue] = useState<any>("");

  const handleClear = () => {
    setValue(""); // Clear the input value
  };
  const onChangeFun = (e: React.ChangeEvent<HTMLInputElement>) => {
    change?.(e);
    setValue(e.target.value);
  };

  return (
    <StyledInput
      style={{ backgroundAttachment: "red" }}
      $width={width}
      value={value}
      $margin={margin}
      $h={height}
      placeholder={placeholder}
      prefix={type === "search" ? <Search /> : null}
      suffix={
        clear ? (
          <span onClick={handleClear} style={{ cursor: "pointer" }}>
            <Cross />
          </span>
        ) : null
      }
      onChange={onChangeFun}
    />
  );
};
