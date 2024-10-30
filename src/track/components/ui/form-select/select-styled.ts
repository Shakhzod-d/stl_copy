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
    background-color: ${({ $bg = "#f9f9fa" }) => $bg} !important;
    border: none !important;
    color: ${({ theme }) => theme.clr} !important;
  }

  .ant-select-dropdown {
    background-color: ${({ theme }) => theme.selectGray} !important;

    .ant-select-item-option {
      color: ${({ theme }) => theme.clr} !important;

      &:hover {
        background-color: #f0f0f0 !important;
        color: #000 !important;
      }

      /* Faol yoki tanlangan element uchun rang */
      &.ant-select-item-option-active,
      &.ant-select-item-option-selected {
        background-color: blue !important;
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
    background-color: ${({ theme }) => theme.selectGray} !important;
  }

  .ant-select-item-option {
    color: ${({ theme }) => theme.clr} !important;
  }

  .ant-select-item-option:hover {
    background-color: #f0f0f0 !important;
    color: #000 !important;
  }

  /* Faol (tanlangan) holat */
  .ant-select-item-option-selected, .ant-select-item-option-active {
    background-color: blue !important;
    color: #fff !important;
    font-weight: bold !important;
  }

  .ant-select-selection-placeholder {
    color: ${({ theme }) => theme.clr} !important;
  }
`;
