import styled from "styled-components";
import { Input } from "antd";

export const StyledInput = styled(Input)<{ $width?: string; $margin?: string }>`
  border-radius: 10px !important;
  padding: 10px 15px !important;
  width: ${({ $width = "270px" }) => $width} !important;
  height: 44px !important;
  background-color: ${({ theme }) => theme.inputBg} !important;
  color: ${({ theme }) => theme.clr} !important;
  margin: ${({ $margin }) => $margin} !important;
  border: none !important;
  // Focus, active, and hover background color
  &:focus,
  &:active,
  &:hover {
    background-color: ${({ theme }) => theme.inputBg} !important;
    color: ${({ theme }) => theme.clr} !important;
  }

  // Extra targeting with a CSS selector for the input inside if needed
  & .ant-input {
    background-color: ${({ theme }) => theme.inputBg} !important;
    color: ${({ theme }) => theme.clr} !important;
  }
`;
