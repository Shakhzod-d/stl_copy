import { Form, Input } from "antd";

import styled from "styled-components";

export const Item = styled(Form.Item)`
  width: 100%;
  background: ${({ theme }) => theme.formSelect};
  border-radius: 10px;
  // margin: 0;
`;

export const StyledInput = styled(Input)<{
  $w?: string;
  $p?: string;
  $clr?: string;
  $pClr?: string;
  $bg?: string;
  $h?: string;
}>`
  border-radius: 10px !important;
  padding: ${({ $p = "1.25rem" }) => $p};
  height: ${({ $h = "3.75rem" }) => $h};
  width: ${({ $w = "100%" }) => $w};
  color: ${({ $clr = "#000" }) => $clr} !important;
  background: ${({ $bg = "#f9f9fa" }) => $bg};
  border: none;
  &:hover {
    background: ${({ $bg = "#f9f9fa" }) => $bg} !important;
  }
  &.ant-input-affix-wrapper-status-error {
    background: ${({ $bg = "#f9f9fa" }) => $bg} !important;
  }
  &:focus {
    background: ${({ $bg = "#f9f9fa" }) => $bg} !important;
  }
  &::placeholder {
    color: ${({ $pClr = "#5D5E5F" }) => $pClr} !important;
  }
  &.ant-input {
    background-color: ${({ $bg = "#f9f9fa" }) => $bg} !important;
  }
`;
