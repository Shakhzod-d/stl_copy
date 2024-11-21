import styled from "styled-components";
export const Container = styled.div<{ $w?: string }>`
  min-width: ${({ $w = "200px" }) => $w} !important;
  // max-width: 300px;
  position: relative;
  // border: 1px solid red;
  margin: 0;
`;
export const OptionContainer = styled.div<{
  $active?: boolean;
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
  top: 45px;
  left: 0;
  border-radius: 5px;
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
export const Option = styled.div<{ $active?: boolean; $clr: string }>`
  width: 100%;

  background: ${({ $active, theme }) =>
    $active ? "#FC973A" : theme.selectHover};
  height: 38px;
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
