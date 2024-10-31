import styled from "styled-components";

export const ModalWrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.448);
  z-index: 9999;
`;

export const Modal = styled.div<{ $modalActive: boolean }>`
  width: 350px;
  height: 100vh;
  position: absolute;
  right: 0;
  top: 0;
  background: ${({ theme }) => theme.white};
  padding: 20px;
  animation: ${({ $modalActive }) => !$modalActive ? "modal" : "modalEnd"} 0.2s;
`;
