import React from "react";
import { Input } from "antd";

interface Props {
  label?: string;
  placeholder: string;
  errorText?: string;
  disabled?: boolean;
  autoComplete?: "on" | "off";
  className?: string;
  onChange?: (e: any) => any;
  value?: any;
  autofocus?: boolean;
  width?: number;
  type?:
    | "button"
    | "checkbox"
    | "color"
    | "date"
    | "datetime-local"
    | "email"
    | "file"
    | "hidden"
    | "image"
    | "month"
    | "number"
    | "password"
    | "radio"
    | "range"
    | "reset"
    | "search"
    | "submit"
    | "tel"
    | "text"
    | "time"
    | "url"
    | "week";
}

const TextField: React.FC<Props> = ({
  label = "",
  placeholder = "",
  type = "text",
  disabled = false,
  autoComplete = "off",
  className = "",
  onChange,
  value,
  width,
  autofocus = false,
}) => {
  return (
    <div className={`text-field-wrapper ${className}`} style={{ width }}>
      {label && <label>{label}</label>}
      <Input
        placeholder={placeholder}
        type={type}
        value={value}
        // @ts-ignore
        onChange={onChange}
        autoFocus={autofocus}
        disabled={disabled}
        autoComplete={autoComplete}
      />
    </div>
  );
};

export default TextField;
