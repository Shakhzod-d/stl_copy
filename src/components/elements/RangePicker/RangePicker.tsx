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

import styled, { createGlobalStyle } from "styled-components";
import { DatePicker } from "antd";
import "antd/dist/antd.css";

const { RangePicker } = DatePicker;

// Global style (Ant Design styles override for dark mode)
export const GlobalStyle = createGlobalStyle<{ bg?: number }>`
  .ant-picker {
    margin: 0;
    background: ${({ theme, bg = 1 }) =>
      bg === 1
        ? theme.white
        : bg === 2
        ? theme.textAriaBg
        : theme.secondaryBg}; /* 3 xil rangni boshqarish */
    color: ${({ theme }) => theme.clr};
    border: none !important;
    border-radius: 10px !important;
    box-shadow: none !important;
    outline: none !important;
    display: inline-flex;
    width: auto;
  }

  .ant-picker-input > input {
    color: #8c8c9b !important;
    background: transparent !important;
    border: none !important;
    outline: none !important;
    width: auto !important;
    text-align: center;
  }

  .ant-picker:hover,
  .ant-picker-focused,
  .ant-picker:focus {
    border: none !important;
    box-shadow: none !important;
  }

  .ant-picker-panel-container {
    color: ${({ theme }) => theme.clr};
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
