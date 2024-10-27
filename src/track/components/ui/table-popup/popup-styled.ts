import styled from "styled-components";

export const PopupContainer = styled.div`
  border-radius: 10px;
  padding: 10px;
  width: 201px;
  height: 177px;
  backdrop-filter: blur(80px);
  box-shadow: 0 10px 60px 0 rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.97), #5c5c5c;
  position: absolute;
  right: 12px;
  top: 50px;
  z-index: 99999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;
export const Item = styled.div`
  border-radius: 10px;
  padding: 15px 25px;
  width: 174px;
  height: 49px;
  background-color: rgba(211, 211, 211, 0.433);
  cursor: pointer;
`;
