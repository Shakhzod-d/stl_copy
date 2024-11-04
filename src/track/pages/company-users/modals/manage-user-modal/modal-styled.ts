import { Button, Input } from "antd";
import styled from "styled-components";

export const TabBtn = styled(Button)<{ $active: boolean }>`
  border-radius: 10px;
  padding: 15px 20px;
  height: 49px;
  background: ${({ $active }) => ($active ? " #19223f" : "#F3F3F4")};
  color: ${({ $active }) => ($active ? " #fff" : "#000")};
  &:hover {
    background: ${({ $active }) =>
      $active ? " #19223f" : "#F3F3F4"} !important;
    opacity: 0.9;
    color: ${({ $active }) => ($active ? " #fff" : "#000")} !important;
  }
`;

// export const CustomFlex = styled(Flex)`
//   margin: 30px 0;
// `;

// export const StyleFlex = styled(Flex)`
//   margin-bottom: 10px;
// `;

export const CustomInput = styled(Input)<{ $margin?: string }>`
  border-radius: 10px;
  padding: 20px !important;
  width: 100%;
  color: #000 !important;
  font-weight: 500;
  background: #f9f9fa;
  margin: ${({ $margin }) => $margin};
  &::placeholder {
    color: #000 !important;
    font-weight: 500;
  }
`;

export const TextAria = styled.textarea`
  border-radius: 10px;
  padding: 25px 20px;
  width: 1250px;
  height: 150px;
  background: ${({ theme }) => theme.textAriaBg};
  color: ${({ theme }) => theme.clr};
  border: none;
  outline: none;
  margin-bottom: 20px;
  &::placeholder {
    color: ${({ theme }) => theme.clr};
  }
`;

export const Btn = styled(Button)<{ $type?: string }>`
  border-radius: 10px;
  padding: 20px 25px;
  width: 200px;
  height: 59px;
  min-width: 200px;
  color: ${({ $type }) => ($type == "add" ? "#FFF" : "#000")};
  background: ${({ $type }) => ($type == "add" ? "#FC973A" : "#f3f3f4")};
  &:hover {
    background: ${({ $type }) => ($type ? " #FC973A" : "#F3F3F4")} !important;
    opacity: 0.9;
    color: ${({ $type }) => ($type ? " #fff" : "#000")} !important;
  }
`;
