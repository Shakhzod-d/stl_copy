import styled from "styled-components";

export const Block = styled.div<{ $bottom?: string; width?: string }>`
  border-radius: 10px;
  padding: 20px;
  width: ${({ width }) => width};
  height: 59px;
  background: ${({theme})=>theme.white} !important;
  // background: #fdfdfd;
  color: ${({theme})=>theme.clr};
  margin-bottom: ${({ $bottom }) => $bottom};
`;

export const MapWrap = styled.div`
  border: 5px solid #fff;
  border-radius: 10px;
  padding: 5px;
  width: 100%;
  // max-width: 1170px;
  height: 500px;
`;
