import styled from "styled-components";

export const Left = styled.div<{ color: string }>`
  padding: 15px 15px 15px 20px;
  color: ${({ color }) => color};
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.5px;
  border-radius: 10px 0px 0px 10px;
  background: rgba(253, 253, 253, 0.8);
`;

export const Right = styled.div<{ color: string }>`
  padding: 15px 26px 15px 15px;
  color: ${({ color }) => color};
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.5px;
  border-radius: 0px 10px 10px 0px;
  background: rgba(253, 253, 253, 0.8);
`;
