import styled from "styled-components";

export const Title = styled.p`
  font-weight: 700;
  font-size: 12px;
  letter-spacing: -0.04em;
  margin-bottom: 5px;
`;
export const Value = styled.p`
  font-weight: 590;
  font-size: 14px;
  color:${({theme})=>theme.clr}
`;
export const ProgressWrapper = styled.div`
  width: 155px;
  height: 155px;
  position: relative;

`;
export const ValueWrapper = styled.div`
  position: absolute;
  top: 65px;
  left: 55px;

  text-align: center;
  color: #000;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 2px;

`;
