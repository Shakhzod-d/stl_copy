import { Form, Input } from "antd";
import styled from "styled-components";

export const Main = styled.main`
  width: 100%;
  min-height: 100vh;
  display: flex;
  background: #19223f;
  padding: 5px;
  gap: 5px;
`;
export const FromWrapper = styled.section`
  width: 50%;
  background: #f3f3f4;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Label = styled.label`
  font-size: 14px;
  color: #8c8c9b;
`;
export const StyledForm = styled(Form)`
  width: 552px;
  display: flex;
  flex-direction: column;
`;
export const BoldText = styled.p`
  font-weight: 700;
  font-size: 16px;
  text-align: center;

  color: #000;
`;
export const StyledInput = styled(Input)`
  border-radius: 10px;
  padding: 25px 20px;
  width: 552px;
  height: 69px;
  background: #ffffff;
  border: none;
  outline: none;
  font-weight: 500;
  font-size: 16px;
  color: #000;
  margin-top: 5px;
`;
export const Description = styled.p`
  font-weight: 500;
  font-size: 16px;
  color: #8c8c9b;
  text-align: center;

  span {
    color: #fc973a;
  }
`;

export const Image = styled.div`
  width: 50% !important;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${"assets/images/loginBg.png"});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;
