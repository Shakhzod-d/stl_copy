import { Button, Tabs } from "antd";
import styled from "styled-components";

export const StyleTabs = styled(Tabs)`
  .ant-tabs-tab {
    background-color: #fff !important;
    color: #000;
    border-radius: 8px !important;

    padding: 20px 35px !important;
  }

  .ant-tabs-tab-active {
    background-color: #1c294e !important;
    color: #fff !important;
    font-weight: 500;
  }

  .ant-tabs-ink-bar {
    display: none;
  }
`;
export const StyleButton = styled(Button)`
  border-radius: 10px;
  padding: 20px 25px;
  width: 128px;
  height: 59px;
  background: rgba(255, 255, 255, 0.5);
`;
export const ButtonsWrapper = styled.div`
  width: 100%;
  margin-top: 10px;
  align-items: start;
`;
export const ReflashButton = styled(Button)`
  width: 150px;
  background-color: #fff;
  color: #000;
  border-radius: 8px;
  position: absolute;
  right: 30px;
  cursor: pointer;
  padding: 20px 35px;
`;
