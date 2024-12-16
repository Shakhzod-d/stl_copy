import styled from "styled-components";

export const NotificationWrap = styled.div`
  width: 100%;
  display: flex;
  //   border-top: 2px solid #ffffff;
  overflow: hidden;
  //   border: 1px solid red;
  height: calc(100vh - 130px);
  margin: 0;
`;

export const ChatBarContainer = styled.div`
  //   width: 300px;
  border-right: 2px solid ${({ theme }) => theme.white};
  //   border: 1px solid red;
  padding: 25px 20px 0 0;
`;

export const UserCard = styled.div<{ m?: string; $active?: boolean }>`
  width: 260px;
  height: 72px;
  border-radius: 15px;
  background: ${({ theme, $active }) => ($active ? "#3DA8D5" : theme.white)};
  padding: 15px 12px;
  display: flex;
  gap: 16px;
  margin: ${({ m }) => m};
  h3 {
    font-size: 16;
    font-weight: 600;
    color: ${({ theme }) => theme.chatClr};
  }
  p {
    font-size: 13px;
    color: ${({ $active }) => ($active ? "#fff" : "#BABAC1")};
  }
`;
export const Hr = styled.div`
  width: 100%;
  height: 2px;
  background: ${({ theme }) => theme.white};
  position: absolute;

  left: 0;
  z-index: 10;
`;

export const Img = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 50%;
`;

export const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ChatContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px 12px 20px 25px;
  display: flex;
  flex-direction: column;
`;
export const ChatHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  // border: 1px solid red;
  align-items: center;
  margin:bottom:70px;
`;

export const ChatUser = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
`;

export const MessageWrap = styled.div`
  width: 100%;
  flex: 1;
  // border: 1px solid red;
  margin-bottom: 20px;
`;

export const Input = styled.div`
  width: 100%;
  // height:74px;
  border-radius: 15px;
  padding: 25px;
  background: ${({ theme }) => theme.white};
  display: flex;
  gap: 20px;
  #input {
    width: 100%;
    border: none;
    outline: none;
    background: transparent;
    color: ${({ theme }) => theme.chatClr};
  }
`;

//  ------Modal

export const ModalTitle = styled.span`
  font-size: 30px;
  color: ${({ theme }) => theme.clr};
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 30px;
  p {
    color: #3da8d5;
  }
`;
