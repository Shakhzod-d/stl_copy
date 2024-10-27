import styled from "styled-components";
export const Wrapper = styled.main`
  width: 100%;
  // display: flex;
  flex-direction: column;
  gap: 50px;
  height: calc(100vh - 175px);
  // border: 1px solid red;
  overflow-x: auto;
`;

export const Map = styled.div<{ $active: boolean }>`
  width: 100%;
  max-width: ${({ $active }) =>
    $active ? "calc( 100vw - 850px )" : "calc( 100vw - 200px )"};
  border: 3px solid #fff;
  border-radius: 10px;
  padding: 10px;
  height: calc(100vh - 270px);
`;

export const Div = styled.div`
  margin: 50px auto;
  display: flex;
  justify-content: center;
`;
