import styled from "styled-components";
import { Input } from "antd";

export const StyledInput = styled(Input)<{
  $width?: string;
  $margin?: string;
  $h?: string;
}>`
  border-radius: 10px !important;
  padding: 10px 15px !important;
  width: ${({ $width = "270px" }) => $width} !important;
  height: ${({ $h = "44px" }) => $h} !important;
  background-color: ${({ theme }) => theme.inputBg} !important;
  color: ${({ theme }) => theme.clr} !important;
  margin: ${({ $margin }) => $margin} !important;
  border: none !important;
  background-color: transparent;

  // Focus, active, and hover background color removal
  &:focus,
  &:hover,
  &:active {
    background-color: ${({ theme }) => theme.inputBg} !important;
    color: ${({ theme }) => theme.clr} !important;
    border: none !important;
    box-shadow: none !important; // Remove Ant Design's shadow
    outline: none !important; // Remove focus outline
  }

  // Ant Design's internal hover and focus removal

    &.ant-input:hover,
    &.ant-input:focus,
  &.ant-input:active {
    background-color: ${({ theme }) => theme.inputBg} !important;
    color: ${({ theme }) => theme.clr} !important;
    border: none !important;
    box-shadow: none !important;
    outline: none !important;
    }
    
    // Disable Ant Design's default behavior
    .ant-input {
      background-color: ${({ theme }) => theme.inputBg} !important;
    &:hover,
    &:focus,
    &:active {
      background-color: ${({ theme }) => theme.inputBg} !important;
      color: ${({ theme }) => theme.clr} !important;
      border: none !important;
      box-shadow: none !important;
      outline: none !important;
    }
  }
`;
