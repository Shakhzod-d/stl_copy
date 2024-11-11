import { Form } from "antd";
import styled from "styled-components";
export const Container = styled.div<{ $w?: string }>`
  width: ${({ $w = "200px" }) => $w} !important;
  // max-width: 300px;
  position: relative;
  // border: 1px solid red;
  margin: 0;
`;
export const StyleSelect = styled.div<{
  $active: boolean;
  bg?: string;
  h?: string;
}>`
  width: 100%;
  height: ${({ h = "47px" }) => h};
  padding-left: 15px;
  border-radius: 10px;
  padding-right: 10px;
  // margin-bottom: 10px;
  background: ${({ theme, bg = theme.white }) => bg};
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  ${({ $active }) => ($active ? "border :1px solid #FC973A" : "")};
  user-select: none;
  color: ${({ theme }) => theme.clr};
`;

export const OptionContainer = styled.div<{
  $active: boolean;
  $w?: string;
  h?: string;
}>`
  width: ${({ $w = "200px" }) => $w};
  box-shadow: ${({ theme }) => theme.selectShadow};
  backdrop-filter: blur(80px);
  // height:100%;
  max-height: 300px;
  overflow: auto;
  padding: 10px;
  background: ${({ theme }) => theme.selectOptionBg};
  // display: flex;
  // flex-direction: column;
  // gap: 5px;
  user-select: none;
  position: absolute;
  top: ${({ h }) => h};
  left: 0;
  border-radius: 10px;
  transition: 0.2s all;
  opacity: 0;
  transform: translateY(-5px);
  z-index: -1;
  // display: none;
  ${({ $active }) =>
    $active
      ? `
  z-index: 999;
  
  transform: translateY(0);
  opacity: 1;
    transition: 0.2s all;
   `
      : ""};
`;

export const Option = styled.div<{ $active: boolean; $clr?: string }>`
  width: 100%;
  height: 49px !important;
  background: ${({ $active, theme }) =>
    $active ? "#FC973A" : theme.selectHover};
  border-radius: 10px;
  padding-left: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
  color: ${({ theme, $active, $clr = theme.clr }) => ($active ? "#fff" : $clr)};
  user-select: none;
  margin-bottom: 5px;
  &:hover {
    background: ${({ theme }) => theme.selectHover};
    opacity: 0.8;
  }
`;

export const Item = styled(Form.Item)`
  width: 100%;
  margin: 0;
`;
