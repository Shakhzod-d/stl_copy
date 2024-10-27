import { Checkbox } from "antd";
import styled from "styled-components";

export const Wrapper = styled.div`
  border-radius: 10px;
  padding: 10px;
  width: 312px;
  backdrop-filter: blur(80px);
  box-shadow: 0 10px 60px 0 rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.97);
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export const Item = styled.div`
  border-radius: 10px;
  padding: 15px 25px;
  width: 292px;
  height: 49px;
  background: #f9f9fa;
`;
export const StyledCheckbox = styled(Checkbox)`
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: orange;
    border-color: orange;
  }
  .ant-checkbox-checked:hover {
  }
  .ant-checkbox-checked::after {
    border-color: orange;
  }

  .ant-checkbox-checked .ant-checkbox-inner::after {
    border-color: white; /* Check mark color */
  }
  .ant-checkbox-input:focus + .ant-checkbox-inner {
  }
`;