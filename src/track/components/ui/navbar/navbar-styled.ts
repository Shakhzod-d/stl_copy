import styled from "styled-components";

export const Header = styled.header`
  width: 100%;
  // border: 1px solid;
  // max-width: 1700px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  position: sticky;
  background: ${(props) => props.theme.mainBg};
  z-index: 1000;
  top: 0;
`;

export const Title = styled.h2`
  font-weight: 500;
  font-size: 40px;
  letter-spacing: -0.01em;
  color: ${(props) => props.theme.clr};
  margin-bottom: 0;
`;
export const Icon = styled.div`
  cursor: pointer;
  color: ${(props) => props.theme.clr};
`;
