import { Button } from "antd";
import styled from "styled-components";

export const StyledBtn = styled(Button)<{ active: string }>`
  border-radius: 10px;
  background: ${({ active }) => (active === "true" ? "#FC973A" : "#f9f9fa")};
  padding: 10px 15px;
  color: ${({ active }) => (active === "true" ? "#fff" : "#5d5e5f")};
  font-size: 14px;
  font-weight: 400;

  &:hover {
    background: ${({ active }) =>
      active === "true" ? "#FC973A" : "#f9f9fa"} !important;
    color: ${({ active }) =>
      active === "true" ? "#fff" : "#5d5e5f"} !important;
  }
`;
