import { Select } from "antd";
import styled from "styled-components";

interface Props {
  width?: string;
  height?: number;
  color?: string;
}

export const StyledSelect = styled(Select)<Props>`
  width: ${({ width = "268px" }) => width};
  height: ${({ height = 47 }) => `${height}px`};
  border-radius: 10px;
  background: ${(props) => props.theme.white} !important;

  .ant-select-selector {
    padding: 25px 10px;
    border: none !important;
    background: ${(props) => props.theme.white} !important;
  }

  .ant-select-arrow {
    * {
      display: flex !important;
      justify-content: center !important;
      align-items: center !important;
      width: 15px !important;
      height: 12px !important;
      overflow: hidden !important;
      fill: ${({ theme }) => theme.clr} !important;
      background: ${(props) => props.theme.white} !important;
    }
    color: ${({ theme }) => theme.clr} !important;
    font-size: 15px;
    height: 10px;
  }

  .ant-select-dropdown {
    .ant-select-item-option {
      background: ${(props) => props.theme.white} !important;
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
    color: ${({ theme, color = theme.clr }) => color};
    font-size: 16px !important;
    font-weight: 500;
  }

  &::placeholder {
    color: ${({ theme }) => theme.clr} !important;
  }
`;
