import { Button } from "antd";
import styled from "styled-components";

export const BtnWrap = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

export const ActiveBtn = styled(Button)`
  width: 120px;
  height: 49px;
  border-radius: 10px;
  background: #19223f !important;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
`;
export const DefaultBtn = styled(Button)`
  width: 149px;
  height: 49px;
  border-radius: 10px;
  background: #fff !important;
  color: #000;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -0.5px;
`;
