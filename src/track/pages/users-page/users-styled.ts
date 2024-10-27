import { Button } from "antd";
import styled from "styled-components";

export const CustomButton = styled(Button)`
  width: 43px;
  height: 43px;
  border-radius: 50%;
  background: #fc973a !important;
  &:hover {
    border: none;
  }
  color: red;
`;
export const Title = styled.h2<{ size?: string }>`
  color: ${({ theme }) => theme.clr};
  font-size: ${({ size }) => size || "36px"};
  font-weight: 600;
  letter-spacing: -0.5px;
`;
