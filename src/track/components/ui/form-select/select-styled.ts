import { Form, Select } from "antd";
import styled, { createGlobalStyle } from "styled-components";

export const Item = styled(Form.Item)`
  width: 100%;
  padding: 0;
`;

export const StyledSelect = styled(Select)<{
  $w?: string;
  $h?: string;
  $bg?: string;
  $border?: string;
  $activeBorder?: string;
  $pClr?: string;
  $clr?: string;
}>`
  width: ${({ $w = "200px" }) => $w};

  .ant-select-selector {
    width: 100%;
    height: ${({ $h = "47px" }) => $h};
    border-radius: 10px !important;
    background: ${({ theme, $bg = theme.white }) => $bg} !important;
    padding-left: 15px;
    padding-right: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: ${({ $border = "none" }) => $border} !important;
    cursor: pointer;
    user-select: none;
    color: ${({ theme }) => theme.clr} !important;
    ${({ $activeBorder }) =>
      $activeBorder ? `border: 1px solid ${$activeBorder} !important;` : ""};
  }

  .ant-select-arrow svg {
    color: ${({ theme }) => theme.clr} !important;
  }
`;

export const GlobalStyle = createGlobalStyle`
  .ant-select-dropdown {
    background-color: ${({ theme }) => theme.selectOptionBg} !important;
    border-radius: 10px !important;
    box-shadow: ${({ theme }) => theme.selectShadow} !important;
    padding: 10px !important;
    padding-bottom: 40px !important; /* Extra space for the last option */
    border: none !important;
    overflow-y: auto !important;
  }

  .ant-select-item-option {
    width: 100%;
    height: 49px !important;
    background: ${({ theme }) => theme.selectHover} !important;
    border-radius: 10px !important;
    padding-left: 15px;
    display: flex !important;
    justify-content: space-between !important;
    align-items: center !important;
    cursor: pointer !important;
    font-size: 16px !important;
    color: ${({ theme }) => theme.clr} !important;
    user-select: none;
    margin-bottom: 5px !important;
    
    &:hover {
      background: ${({ theme }) => theme.selectHover};
      opacity: 0.8;
    }

    &.ant-select-item-option-selected {
      background-color: #FC973A !important;
      color: white !important;
      font-weight: bold !important;
    }
  }
`;