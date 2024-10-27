import { Button } from "antd";
import styled from "styled-components";

export const Wrapper = styled.div`
  border-radius: 10px;
  width: 100%;
  // max-width: 1040px;
  padding: 20px;
  height: 533px;
  margin-top: 10px;
  background: ${({ theme }) => theme.white};
  // background: #fdfdfd;
  margin-bottom: 40px;
  @media (max-width: 1620px) {
    padding: 20px 10px;
  }
`;

export const CustomButton = styled(Button)`
  border-radius: 10px;
  padding: 20px 35px;
  // width: 114px;
  height: 59px;
  background: ${({ theme }) => theme.customBtn} !important;
  // background: #f3f3f4 !important;
  border: none;
  color: ${({ theme }) => theme.clr};
  @media (max-width: 1755px) {
    padding: 15px 25px;
  }
  @media (max-width: 1620px) {
    padding: 10px;
  }
`;
