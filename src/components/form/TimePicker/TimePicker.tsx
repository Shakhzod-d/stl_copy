import React from "react";
import {
  Controller,
  RegisterOptions,
  FieldValues,
  Control,
  Path,
} from "react-hook-form";
import { TimePicker as AntdTimePicker, TimePickerProps } from "antd";
import moment from "moment";

export interface ITimePicker<T extends FieldValues = any>
  extends TimePickerProps {
  control: Control<T>;
  name: Path<T>;
  required?: boolean;
  validation?: RegisterOptions;
  label: string;
  errorText?: string;
  disabled?: boolean;
  autoComplete?: "on" | "off";
  className?: string;
  range?: boolean;
  onChangeCustom?: (props: any) => void;
}

function TimePicker<T extends FieldValues>({
  control,
  name,
  required,
  validation,
  label,
  errorText,
  disabled,
  autoComplete,
  className,
  range = false,
  onChangeCustom,
  value: formatValue,
  format = "",
}: ITimePicker<T>) {
  return (
    <Controller
      render={({
        field: { onChange, /* onBlur, */ value, name /* ref */ },
        fieldState: { error },
      }) => {
        return (
          <div
            className={`text-field-wrapper ${
              error ? "error" : ""
            } ${className}`}
          >
            {label && <label>{label}</label>}
            {range ? (
              <AntdTimePicker.RangePicker
                value={value}
                onChange={(values) => {
                  onChange(values);
                  onChangeCustom?.(values);
                }}
                // onBlur={onBlur}
                // ref={ref}
                status={error && "error"}
                name={name}
                disabled={disabled}
                autoComplete={autoComplete}
                format="HH:mm:ss"
                allowClear={false}
              />
            ) : (
              <AntdTimePicker
                // value={value}
                // value={formatValue}
                value={value ? moment(value) : null}
                // dateRender={moment(23141)}
                onChange={onChangeCustom}
                // onBlur={onBlur}
                // ref={ref}
                status={error && "error"}
                name={name}
                disabled={disabled} //format
                format={format?.length > 0 ? format : "HH:mm:ss"}
                autoComplete={autoComplete}
              />
            )}
            {error && (
              <span className="error-text">
                {error.message || errorText || "Please fill in the field"}
              </span>
            )}
          </div>
        );
      }}
      name={name}
      control={control}
      rules={{ required: required }}
    />
  );
}

export default TimePicker;
