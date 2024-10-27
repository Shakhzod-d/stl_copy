import { Button, Radio } from "antd";

import styled from "styled-components";

export const Day = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  gap: 10px;
  margin-bottom: 10px;
`;

export const CustomBtn = styled(Button)`
  border-radius: 10px;
  padding: 1px 20px;
  height: 50px;
  justify-content: center;
  align-items: center;
  display: flex;
  gap: 10px;
  border: none;
  font-weight: 700;
  color: ${({ theme }) => theme.clr};
  background: ${({ theme }) => theme.white} !important;
  div {
    height: 13px;
  }
  svg {
    width: 14px;
  }
`;

export const Title = styled.h2`
  font-weight: 500;
  font-size: 32px;
  letter-spacing: -0.02em;
  color: #000;
  margin-bottom: 20px;
`;

export const CardWrapper = styled.div<{ $width: boolean }>`
  width: 100%;

  margin-bottom: 40px;

  display: grid;
  grid-template-columns: 1fr 1.1fr 1fr 40px;
  align-items: end;
  // justify-content: space-between;
  ${({ $width }) => (!$width ? "" : "")};
  gap: 10px;
  padding-bottom: 15px;
  &::-webkit-scrollbar {
    width: 10px !important;
    height: 10px !important;
    background: #ebe8e8;
  }

  &::-webkit-scrollbar-thumb {
    background: #d6d3d3;
  }
`;
export const CustomRadio = styled(Radio)`
  &.ant-radio-wrapper-checked .ant-radio-inner {
    background-color: #fc973a;
    border-color: #fc973a;
  }

  & .ant-radio-inner::after {
    background-color: #fc973a;
  }

  & .ant-radio-inner {
    width: 16px;
    height: 16px;
  }

  & .ant-radio-checked .ant-radio-inner {
    background-color: #fc973a;
    border: 2px solid #fff;
  }
`;

export const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
`;
export const TableWrapper = styled.div`
  height: calc(100vh - 505px);
  // overflow-x: auto;
`;

export const ArrowIcon = styled.div<{ $active: boolean }>`
  ${({ $active }) => $active && `transform: rotate(180deg)`};
`;
