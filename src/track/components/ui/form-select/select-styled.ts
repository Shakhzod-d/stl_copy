import { Form, Select } from "antd";
import styled, { createGlobalStyle } from "styled-components";

export const Item = styled(Form.Item)`
  width: 100%;
  padding: 0;
`;

export const StyledSelect = styled(Select)<{
  $w?: string;
  $h?: string;
  $clr?: string;
  $pClr?: string;
  $bg?: string;
}>`
  .ant-select-selector {
    border-radius: 10px !important;
    background: ${({ $bg = "#f9f9f9" }) => $bg} !important;
    height: ${({ $h = "60px" }) => $h} !important;
    width: ${({ $w = "100%" }) => $w} !important;
    padding-top: 15px !important;
    border: none !important;
    color: ${({ theme }) => theme.clr} !important;
  }

  .ant-select-dropdown {
    background-color: blue !important; /* Blue background */
    border-radius: 10px !important; /* Rounded corners for dropdown */
    padding: 8px; /* Padding inside dropdown */

    .ant-select-item-option {
      background-color: transparent !important;
      color: ${({ theme }) => theme.clr} !important;
      border-radius: 10px; /* Rounded corners for each option */
      margin: 4px 0; /* Spacing between options */
      padding: 8px 12px; /* Padding inside each option */

      &:hover {
        background-color: #f0f0f0 !important;
        color: #000 !important;
      }

      &.ant-select-item-option-active,
      &.ant-select-item-option-selected {
        background-color: darkblue !important; /* Dark blue for selected option */
        color: white !important;
        font-weight: bold !important;
      }
    }
  }

  .ant-select-selection-placeholder {
    color: ${({ theme, $pClr = theme.clr }) => $pClr} !important;
  }

  .ant-select-arrow svg {
    color: ${({ theme }) => theme.clr} !important;
  }
`;

export const GlobalStyle = createGlobalStyle`
  .ant-select-dropdown {
    background-color: #2B2B2B !important;
    border-radius: 10px !important;
    border:none !important;
    box-shadow: 0px 30px 100px 0px #00000080 !important;

  }

  .ant-select-item-option {
      width: 100%;
  height: 49px !important;
  background: #373737;
  border-radius: 10px !important;
  padding-left: 15px !important;
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  cursor: pointer !important;
  font-size: 30px !important;
  color: ${({ theme }) => theme.clr} !important;
  user-select: none !important;
  margin-bottom: 5px !important;
  text-align:center !important;
  &:hover {
    background: ${({ theme }) => theme.selectHover};
    opacity: 0.8;
  }
    &:hover {
      background-color: #f0f0f0 !important;
      color: #000 !important;
    }

    &.ant-select-item-option-active,
    &.ant-select-item-option-selected {
      background-color: darkblue !important;
   color: ${({ theme }) => theme.clr} !important;
      font-weight: bold !important;
    }
  }

  .ant-select-selection-placeholder {
    color: ${({ theme }) => theme.clr} !important;
  }
`;
