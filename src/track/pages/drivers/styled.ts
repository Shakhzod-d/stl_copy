import { Button } from "antd";
import styled from "styled-components";

export const BtnWrap = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

export const ActiveBtn = styled(Button)<{ $active?: boolean }>`
  width: 120px;
  height: 49px;
  border-radius: 10px;
  background: ${({ theme, $active }) =>
    $active ? theme.btnActive : theme.blueBtn} !important;
  color: ${({ theme, $active }) => ($active ? "#fff" : theme.clr)};
  font-size: 16px;
  font-weight: 500;
  border: none;
`;
export const DefaultBtn = styled(Button)<{ $active?: boolean }>`
  width: 149px;
  height: 49px;
  border-radius: 10px;
  background: ${({ theme, $active }) =>
    $active ? theme.btnActive : theme.blueBtn} !important;
  color: ${({ theme, $active }) => ($active ? "#fff" : theme.clr)};
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -0.5px;
  border: none;
`;
