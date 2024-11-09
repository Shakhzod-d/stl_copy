import { Button } from "antd";
import styled from "styled-components";

export const StyledBtn = styled(Button)<{ active: string }>`
  border-radius: 10px;
  background: ${({ active ,theme}) =>
    active === "true" ? "#FC973A" : theme.textAriaBg} !important;
  padding: 10px 15px;
  color: ${({ active ,theme}) => (active === "true" ? "#fff" : theme.clr)};
  font-size: 14px;
  font-weight: 400;

  &:hover {
    background: ${({ active, theme }) =>
      active === "true" ? "#FC973A" : theme.textAriaBg} !important;
    color: ${({ active }) =>
      active === "true" ? "#fff" : "#5d5e5f"} !important;
  }
`;
