import { Form } from "antd";
import styled from "styled-components";
export const Container = styled.div<{ $w?: string }>`
  width: ${({ $w = "200px" }) => $w} !important;
  max-width: 300px;
  position: relative;
  // border: 1px solid red;
  margin: 0;
`;
export const StyleSelect = styled.div`
  width: 100%;
  height: 47px;
  padding-left: 15px;
  border-radius: 10px;
  padding-right: 10px;
  // margin-bottom: 10px;
  background: ${({ theme }) => theme.white};
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  user-select: none;
`;

export const OptionContainer = styled.div<{ $active: boolean; $w?: string }>`
  width: ${({ $w = "200px" }) => $w};
  box-shadow: 0px 10px 60px 0px #0000001a;
  backdrop-filter: blur(80px);

  padding: 10px;
  background: ${({ theme }) => theme.white};
  display: flex;
  flex-direction: column;
  gap: 5px;
  user-select: none;
  position: absolute;
  top: 50px;
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
  height: 49px;
  background: ${({ $active, theme }) => ($active ? "blue" : theme.selectHover)};
  border-radius: 10px;
  padding-left: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
  color: ${({ theme, $active, $clr = theme.clr }) => ($active ? "#fff" : $clr)};
  user-select: none;
  &:hover {
    background: ${({ theme }) => theme.selectHover};
    opacity: 0.8;
  }
`;

export const Item = styled(Form.Item)`
  width: 100%;
  margin: 0;
`;
