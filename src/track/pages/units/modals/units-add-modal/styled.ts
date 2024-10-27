import { Checkbox } from "antd";
import TextArea from "antd/es/input/TextArea";
import styled from "styled-components";
export const ModalTextArea = styled(TextArea)`
  color: ${({ theme }) => theme.clr};
  font-size: 16px;
  font-weight: 500;
  border-radius: 10px;
  background: ${({ theme }) => theme.textAriaBg};
  padding: 20px 25px;
  border: none;
  margin: 10px 0;

  &::placeholder {
    color: ${({ theme }) => theme.clr};
  }

  &:hover {
    background: ${({ theme }) => theme.textAriaBg} !important;
  }

  /* Xatolik holatida */
  &.ant-input-status-error {
    background: ${({ theme }) => theme.textAriaBg} !important;
  }
`;


export const ModalCheckBox = styled(Checkbox)`
  color: ${({ theme }) => theme.clr};
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 10px;
`;

export const ModalTitle = styled.h2`
  color: ${({ theme }) => theme.clr};
  font-size: 32px;
  font-weight: 700;
  letter-spacing: -0.5px;
  margin-bottom: 30px;
`;
