import styled from "styled-components";

export const ModalWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99999;
`;

export const Modal = styled.div`
  width: 300px;
  height: 100vh;
  background: ${({ theme }) => theme.white};
  padding: 20px;
  position: absolute;
  right: 0;
  top: 0;
`;
