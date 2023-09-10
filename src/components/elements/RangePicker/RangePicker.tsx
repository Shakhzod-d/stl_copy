import React from "react";
import { DatePicker as AndDatePicker } from "antd";
import Icon from "../../icon/Icon";

interface Props {
     className?: string;
     value: any;
     onChange: (props: any) => void;
}

const RangePicker: React.FC<Props> = ({ className, value, onChange }) => (
     <div className={`date-picker-wrapper ${className || ""}`}>
          <AndDatePicker.RangePicker
               suffixIcon={<Icon icon="calendar" />}
               superNextIcon={null}
               superPrevIcon={null}
               nextIcon={<Icon icon="arrow-right" />}
               prevIcon={<Icon icon="arrow-left" />}
               value={value}
               onChange={onChange}
          />
     </div>
);

export default RangePicker;
