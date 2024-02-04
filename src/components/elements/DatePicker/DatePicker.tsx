import React from "react";
import { DatePicker as AndDatePicker } from "antd";
import Icon from "@/components/icon/Icon";
import { Moment } from "moment-timezone";

interface Props {
  className?: string;
  label?: string;
  value?: Moment;
  onChange?: (val: Moment) => void;
  disabled?: boolean;
  allowClear?: boolean;
}

const DatePicker: React.FC<Props> = ({
  className,
  label = "",
  value,
  onChange,
  disabled,
  allowClear,
}) => (
  <div className={`date-picker-wrapper ${className || ""}`}>
    <label className="text-field-wrapper">{label}</label>
    <AndDatePicker
      //@ts-ignore
      onChange={onChange}
      suffixIcon={<Icon icon="calendar" />}
      showToday={false}
      superNextIcon={null}
      value={value}
      superPrevIcon={null}
      format={"DD-MM-YYYY"}
      nextIcon={<Icon icon="arrow-right" />}
      prevIcon={<Icon icon="arrow-left" />}
      disabled={disabled}
      allowClear={allowClear}
    />
  </div>
);

export default DatePicker;
