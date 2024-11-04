import { Select } from "antd";
import styled from "styled-components";

interface Props {
  width?: string;
  height?: number;
  color?: string;
}

export const StyledSelect = styled(Select)<Props>`
  // background: ${(props) => props.theme.white} !important;
  .ant-select-selector {
    position: absolute;
    left:1px;
    border-radius: 10px !important;
    width: ${({ width = "268px" }) => width} !important;
    height: ${({ height = 47 }) => `${height}px`} !important;
    padding: 8px 10px !important;
    border: none !important;
    background: ${(props) => props.theme.white} !important;
    // background: red !important;
  }

  .ant-select-arrow {
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    width: 15px !important;
    height: 12px !important;
    overflow: hidden !important;
    fill: ${({ theme }) => theme.clr} !important;
    background: ${(props) => props.theme.white} !important;

    color: ${({ theme }) => theme.clr} !important;
    font-size: 15px !important;
    height: 10px;
  }

  .ant-select-dropdown {
    // position: relative !important; /* Ensure dropdown is positioned correctly */
    // z-index: 1000 !important; /* Ensure it appears above other content */
    // border:1px solid !important;
    .ant-select-item-option {
      background: ${(props) => props.theme.white} !important;
      border: 1px solid red !important;
      &:hover {
        background: black !important; /* Hover holatida fon qizil bo'ladi */
      }
    }

    .ant-select-item-option-active,
    .ant-select-item-option-selected {
      background-color: blue !important; /* Tanlangan holatda fon ko'k rangda bo'ladi */
      color: white !important; /* Tanlangan holatda matn oq rangda bo'ladi */
      font-weight: bold !important;
    }
  }

  span {
    color: ${({ theme, color = theme.clr }) => color} !important;
    font-size: 16px !important;
    font-weight: 500;
  }
`;
