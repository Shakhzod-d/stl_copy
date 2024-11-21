// import React from "react";
// import { DatePicker as AndDatePicker } from "antd";
// import Icon from "../../icon/Icon";
// import moment from "moment";

// interface Props {
//   className?: string;
//   value: any;
//   onChange: (props: any) => void;
//   disabledFuture?: boolean;
// }
// const disableFuture = (current: any) => {
//   // Disable dates after today
//   return current ? current > moment().endOf("day") : false;
// };

// const RangePicker: React.FC<Props> = ({
//   className,
//   value,
//   onChange,
//   disabledFuture,
// }) => (
//   <div className={`date-picker-wrapper ${className || ""}`}>
//     <AndDatePicker.RangePicker
//       suffixIcon={<Icon icon="calendar" />}
//       superNextIcon={null}
//       superPrevIcon={null}
//       nextIcon={<Icon icon="arrow-right" />}
//       prevIcon={<Icon icon="arrow-left" />}
//       value={value}
//       onChange={onChange}
//       style={{width:"300px"}}
//       disabledDate={disabledFuture ? disableFuture : undefined}
//     />
//   </div>
// );

// export default RangePicker;

import React, { useState } from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import { DatePicker, Switch } from "antd";
import "antd/dist/antd.css";
import {
  ArrowDownOutlined,
  ArrowRightOutlined,
  SwapRightOutlined,
} from "@ant-design/icons";
import { ArrowIcon } from "@/pages/Dashboard/dashboard-styled";

const { RangePicker } = DatePicker;

// Global style (Ant Design styles override for dark mode)
const GlobalStyle = createGlobalStyle`

.ant-picker {
  margin:0;
  min-width:200px !important;
background: ${({ theme }) => theme.white};
  color: #8c8c9b;
  border:none;
    border-radius:10px !important;
  }
  .ant-picker-input > input {
    // color: ${({ theme }) => theme.textColor};
    color: #8c8c9b;
    border-radius:10px !important;
  }
  .ant-picker:hover {
    border-color: ${({ theme }) => theme.pickerHoverBorder};
  }
  .ant-picker-panel-container {
  color: red !important;
  background: ${({ theme }) => theme.white};
  }
`;

// Styled RangePicker
const StyledRangePicker = styled(RangePicker)`
  width: 100%;
  border-radius: 8px;
  padding: 8px;

  // Custom styles for RangePicker

  &.ant-picker {
    font-size: 16px;
  }
`;

// Themes for Light and Dark Modes
const lightTheme = {
  bodyBackground: "#ffffff",
  textColor: "#000000",
  pickerBackground: "#ffffff",
  pickerBorder: "#d9d9d9",
  pickerHoverBorder: "#40a9ff",
  panelBackground: "#ffffff",
};

const darkTheme = {
  bodyBackground: "#1f1f1f",
  textColor: "#ffffff",
  pickerBackground: "#3c3c3c",
  pickerBorder: "#535353",
  pickerHoverBorder: "#1890ff",
  panelBackground: "#3c3c3c",
};

type ThemeType = typeof lightTheme;
interface Props {
  className?: string;
  value: any;
  onChange: (props: any) => void;
  disabledFuture?: boolean;
}
export const CustomRangePicker = ({ value, onChange }: Props) => {
  return (
    <>
      <GlobalStyle />
      <div>
        <StyledRangePicker separator={"→"} value={value} onChange={onChange} />
      </div>
    </>
  );
};
