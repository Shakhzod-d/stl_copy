import React from "react";
import { DatePicker as AndDatePicker } from "antd";
import Icon from "../../icon/Icon";
import moment from "moment";

interface Props {
  className?: string;
  value: any;
  onChange: (props: any) => void;
  disabledFuture?: boolean;
}
const disableFuture = (current: any) => {
  // Disable dates after today
  return current ? current > moment().endOf("day") : false;
};

const RangePicker: React.FC<Props> = ({
  className,
  value,
  onChange,
  disabledFuture,
}) => (
  <div className={`date-picker-wrapper ${className || ""}`}>
    <AndDatePicker.RangePicker
      suffixIcon={<Icon icon="calendar" />}
      superNextIcon={null}
      superPrevIcon={null}
      nextIcon={<Icon icon="arrow-right" />}
      prevIcon={<Icon icon="arrow-left" />}
      value={value}
      onChange={onChange}
      disabledDate={disabledFuture ? disableFuture : undefined}
    />
  </div>
);

export default RangePicker;
