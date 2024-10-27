import styled from "styled-components";

export const Wrapper = styled.div<{ $bg?: string; $h?: string }>`
  width: 100%;
  height: ${({ $h = "100vh" }) => $h};
  background: ${({ theme, $bg = theme.mainBg }) => $bg};
  display: flex;
  justify-content: center;
  align-items: center;

`;
