import { Form, Input } from "antd";

import styled from "styled-components";

export const Item = styled(Form.Item)`
  width: 100%;
  background: ${({ theme }) => theme.formSelect};
`;

export const StyledInput = styled(Input)<{
  $w?: string;
  $p?: string;
  $clr?: string;
  $pClr?: string;
  $bg?: string;
  $h?: string;
}>`
  border-radius: 10px;
  padding: ${({ $p = "20px" }) => $p};
  height: ${({ $h = "60px" }) => $h};
  width: ${({ $w = "100%" }) => $w};
  color: ${({ $clr = "#000" }) => $clr} !important;
  background: ${({ $bg="#f9f9fa" }) => $bg};
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
    color: ${({ $pClr = "#000" }) => $pClr} !important;
  }
    &.ant-input {
    background-color: ${({ $bg = "#f9f9fa" }) => $bg} !important;
  }
`;
