import { Button, Input } from "antd";
import styled from "styled-components";

export const CustomInput = styled(Input)`
  width: 100%;
  border-radius: 10px;
  padding: 25px 20px;
  height: 69px;
  background: #ffffff;
`;

export const Label = styled.label`
  font-weight: 500;
  font-size: 14px;
  color: #8c8c9b;
`;
export const StyleFlex = styled.div`
  width: 100%;
  margin-bottom: 10px;
  display: flex;
  gap: 6px;
  align-items: start;
`;
export const Div = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const AddBtn = styled(Button)`
  border-radius: 16px;
  padding: 6px 7px !important;
  width: 55px !important;
  height: 30px !important;
  background: #373737;
  color: #fff;
`;
export const UploadBtn = styled.div`
  width: 100%;
  border: 1px solid #d3d3df;
  border-radius: 10px;
  padding: 25px 20px;
  max-width: 812px;
  height: 69px;
  background: ${({ theme }) => theme.selectBg};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  margin-bottom: 20px;
  border: none !important;
  color: ${({ theme }) => theme.clr};
`;

export const Note = styled.textarea`
  border-radius: 10px;
  padding: 20px 20px 80px 20px;
  width: 100%;
  max-width: 1635px;
  color: ${({ theme }) => theme.clr};
  height: 119px;
  background: ${({ theme }) => theme.selectBg};
  border: none;
  outline: none;
  margin-bottom: 20px;
  &::placeholder {
    color: ${({ theme }) => theme.clr};
  }
`;

export const ImgContainer = styled.div`
  position: relative;
  display: flex;
  gap: 20px;
  align-items: center;
`;

export const DeleteImg = styled.div`
  width: 20px;
  height: 20px;

  border-radius: 50%;
  background: red;
  display: flex;
  justify-content: center;
  align-items: start;
  color: white;
  cursor: pointer;
  position: absolute;
  left: 0;
  top: 0;
`;
