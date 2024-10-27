// import { Flex } from "antd";
import styled from "styled-components";

export const FormRow = styled.div`
  width: 100%;
  border-radius: 10px;
  margin-bottom: 5px;
  padding: 15px 25px;
  max-width: 575px;
  display: flex;
  align-items: center;

  background: ${({ theme }) => theme.white};
  // background:#fdfdfd;
`;

export const FormTitle = styled.div`
  width: 190px;
  @media (max-width: 1450px) {
    width: 140px;
  }
`;
export const ValueBox = styled.span`
  border-radius: 10px;
  padding: 10px 15px;
  //   width: 146px;
  height: 39px;
  background: #dbdbdb;
`;

export const StyleFlex = styled.div<{ $active: boolean }>`
  width: 100%;
  max-width: calc(100vw - ${({ $active }) => ($active ? "295px" : "100px")});
  gap: 15px;
  display: grid;
  grid-template-columns: repeat(3, minmax(200px, 1fr));
`;

export const FormTitleText = styled.p`
  font-weight: 500;
  font-size: 16px;
  letter-spacing: -0.03em;
  color: #8c8c9b;
`;

export const Value = styled.p<{ $clr?: string }>`
  font-weight: 600;
  font-size: 18px;
  color: ${({ theme, $clr = theme.clr }) => ($clr == "" ? theme.clr : $clr)};
  @media (max-width: 1550px) {
    font-size: 14px;
  }
`;
