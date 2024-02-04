import React from "react";
import { TimePicker as AntdTimePicker } from "antd";
import { Moment } from "moment-timezone";
declare type EventValue<DateType> = DateType | null;
declare type RangeValue<DateType> =
  | [EventValue<DateType>, EventValue<DateType>]
  | null;
export interface ITimePicker {
  name: string;
  required?: boolean;
  label: string;
  errorText?: string;
  disabled?: boolean;
  autoComplete?: "on" | "off";
  className?: string;
  range?: boolean;
  onChange?: (props: any) => void;
  defaultValue?: any;
  value: any;
  style?: {};
}

const TimePicker: React.FC<ITimePicker> = ({
  name,
  required,
  label,
  disabled,
  autoComplete,
  className,
  range = false,
  defaultValue,
  value,
  onChange,
  style = {},
}) => {
  return (
    <div className={`text-field-wrapper`}>
      {label && <label>{label}</label>}
      {range ? (
        <AntdTimePicker.RangePicker
          className={className}
          defaultValue={defaultValue}
          onChange={onChange}
          value={value}
          // onBlur={onBlur}
          // ref={ref}
          name={name}
          disabled={disabled}
          autoComplete={autoComplete}
          format="HH:mm:ss"
          allowClear={false}
          style={style}
        />
      ) : (
        <AntdTimePicker
          defaultValue={defaultValue}
          className={className}
          // dateRender={moment(23141)}
          value={value}
          onChange={onChange}
          // onBlur={onBlur}
          // ref={ref}
          name={name}
          disabled={disabled}
          format="HH:mm:ss"
          autoComplete={autoComplete}
        />
      )}
    </div>
  );
};

export default TimePicker;
