import { Button } from "antd";
import styled from "styled-components";

export const Block = styled.div<{
  display: string;
  $gap?: number;
  content?: string;
  width?: number;
  $disabled?: boolean;
}>`
  max-width: ${({ width }) =>
    `${width}px`} !important; /* ma-width to'g'ri yozildi */
  border-radius: 10px;

  padding: 15px 20px;
  background: ${({ theme }) => theme.white};
  // background: #fdfdfd;
  display: ${({ display }) => display};
  align-items: center;
  height: 59px;
  gap: ${({ $gap = 0 }) => `${$gap}px`};
  justify-content: ${({ content }) => content};
  color ${({ theme }) => theme.clr};
  cursor:${({ $disabled }) => ($disabled ? "no-drop" : "pointer")};
  ${({ $disabled }) => ($disabled ? "opacity:0.8" : "")}
`;

export const Div = styled.div<{ $w?: string }>`
  width: 100%;
  max-width: ${({ $w = "100px" }) => $w} !important;
  border: 1px solid;
`;
export const Text = styled.p<{ size?: number; $font?: number; color?: string }>`
  font-weight: ${({ $font }) => $font};
  font-size: ${({ size }) => `${size}px`};
  letter-spacing: -0.03em;
  color: ${({ theme }) => theme.clr};
  color: ${({ color }) => color};
  display: flex;
  gap: 2px;
`;

export const StyleButton = styled(Button)<{ active: string }>`
  border-radius: 10px;
  padding: 20px;
  width: 100%;
  // max-width: 192px;
  height: 57px;

  background: ${({ active, theme }) =>
    active === "true" ? theme.btnActive : theme.white} !important;
  color: ${({ theme, active }) => theme.clr} !important;
  border: none;
  &:hover {
    background: ${({ active, theme }) =>
      active === "true" ? theme.blueBtn : theme.btnActive} !important;
    opacity: 0.8;
    color: ${({ theme, active }) => theme.clr} !important;
  }
`;
export const BtnContainer = styled.div`
  width: 100%;
  max-width: 1900px;
  margin: 0 auto;
  margin-top: 10px;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
  overflow-x: auto;
`;

export const Flex = styled.div<{
  $justify?: string;
  $align?: string;
  $gap?: string;
  $wrap?: string;
  $vertical?: boolean;
  $m?: string;
  $w?: string;
  $h?: string;
}>`
  width: ${({ $w }) => $w};
  display: flex;
  ${({ $vertical }) => ($vertical ? "flex-direction: column" : "")}
  justify-content: ${({ $justify = "start" }) => $justify};
  height: ${({ $h }) => $h};
  align-items: ${({ $align = "start" }) => $align};
  gap: ${({ $gap = "0" }) => $gap};
  flex-wrap: ${({ $wrap }) => $wrap};
  margin: ${({ $m = "0" }) => $m};
  flex-direction: ${({ $vertical }) => ($vertical ? "column" : "")};
`;

export const StyleFlex = styled.div`
  width: 100%;
  display: flex;
  align-items: end;
  gap: 6px;

  @media (max-width: 1500px) {
    flex-wrap: wrap;
  }
`;

export const Status = styled.div`
  width: 50px;
  height: 24px;
  border-radius: 5px;
  background: #fc973a;
  color: #000;
  & p {
    font-size: 12px;
    color: #212121;
  }
  display: flex;
  justify-content: center;
  align-items: center;
`;
