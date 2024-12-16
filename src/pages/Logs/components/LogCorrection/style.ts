import { Button, Checkbox, Radio } from "antd";
import styled from "styled-components";

export const RadioGroup = styled(Radio.Group)`
  width: 100%;
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;

export const RadioButton = styled(Radio.Button)<{ active?: string }>`
  width: 179px;
  height: 69px !important;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.textAriaBg} !important;
  border: none !important;
  border-radius: 10px !important;
  font-size: 14px;
  color: ${({ theme }) => theme.clr} !important;
  transition: all 0.3s ease;

  // Ant Design'ning default classlarini o'chirish:
  &.ant-radio-button-wrapper {
    border: none !important;
    box-shadow: none !important;
    background: ${({ theme }) => theme.textAriaBg} !important;
    color: ${({ theme }) => theme.clr} !important;

    &:hover {
      background: ${({ theme }) => theme.hoverBg} !important; // Hover rangi
    }

    &:focus-within {
      outline: none !important;
      box-shadow: none !important; // Outline'ni o'chirish
    }

    &.ant-radio-button-wrapper-checked {
      background: ${({ active }) => active} !important; // Aktiv rang
      color: ${({ theme }) => theme.activeClr} !important;
    }
  }
`;

export const Box = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  font-size: 20px;
`;

export const ModalButton = styled(Button)`
  width: 100%;
  height: 49px;
  border-radius: 10px;
  background: ${({ theme }) => theme.textAriaBg} !important;
  color: ${({ theme }) => theme.clr} !important;
  border: none !important;
`;

export const Btn = styled(Button)`
  width: 112px;
  height: 49px;
  border-radius: 10px;
  background: ${({ theme }) => theme.textAriaBg} !important;
  color: ${({ theme }) => theme.clr} !important;
  border: none;
`;

export const StyledCheckbox = styled(Checkbox)`
  .ant-checkbox-inner {
    width: 20px;
    height: 20px;
    border-radius: 50%; /* Circle shape */
    border: 2px solid ${({ theme }) => theme.primaryColor || "#1890ff"}; /* Border color */
    background-color: transparent; /* Remove background */
    transition: all 0.3s;

    &:hover {
      border-color: ${({ theme }) =>
        theme.hoverColor || "#40a9ff"}; /* Hover border color */
    }
  }

  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: ${({ theme }) =>
      theme.primaryColor || "#1890ff"}; /* Checked circle color */
    border-color: ${({ theme }) => theme.primaryColor || "#1890ff"};
  }

  .ant-checkbox-checked .ant-checkbox-inner::after {
    border-color: white; /* Checkmark color */
    width: 6px; /* Adjust checkmark width */
    height: 10px; /* Adjust checkmark height */
    top: 50%; /* Center checkmark */
    left: 50%; /* Center checkmark */
    transform: translate(-50%, -50%) rotate(45deg);
  }

  .ant-checkbox-wrapper {
    font-size: 16px; /* Label font size */
    color: ${({ theme }) => theme.textColor || "#000"}; /* Label text color */
    padding-left: 8px;

    &:hover {
      color: ${({ theme }) =>
        theme.hoverColor || "#40a9ff"}; /* Hover text color */
    }
  }
`;
