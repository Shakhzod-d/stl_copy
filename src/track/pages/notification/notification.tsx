import { Flex } from "@/track/components/shared/drivers-header/drivers-header-styled";
import { CustomInput, Navbar } from "@/track/components/ui";
import { Text } from "@/track/constants";
import { Main } from "@/track/utils";
import {
  ChatBarContainer,
  ChatContainer,
  ChatHeader,
  ChatUser,
  Hr,
  Img,
  Input,
  MessageWrap,
  NotificationWrap,
  UserCard,
  UserContainer,
} from "./notification-style";
import { CertifyModal } from "./_component/certify-modal";
import { useState } from "react";

export const User = [
  {
    id: 1,
    FullName: "Sabit Amirbabay",
    role: "Dispatcher",
    img: "/assets/images/user.png",
  },
  {
    id: 2,
    FullName: "Shittu Waliu",
    role: "Dispatcher",
    img: "/assets/images/user.png",
  },
  {
    id: 3,
    FullName: "Daniyar Izbassarov",
    role: "Dispatcher",
    img: "/assets/images/user.png",
  },
];

export const Notification = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Main>
        <CertifyModal open={open} setOpen={setOpen} />
        <Navbar search={true} title="Notification / Chat" />
        <Hr />
        <NotificationWrap>
          <ChatBarContainer>
            <UserCard m="0 0 32px 0">
              <Img src="/assets/images/user.png" />
              <div>
                <h3>Anvar Sobirov</h3>
                <Text size={13} color="#BABAC1">
                  Dispatcher 001
                </Text>
              </div>
            </UserCard>
            <CustomInput
              type="search"
              width="260px"
              height="49px"
              margin=" 0 0 10px 0"
            />
            <UserContainer>
              {User.map((item) => (
                <UserCard key={item.id} $active={item.id === 1}>
                  <Img src={item.img} />
                  <div>
                    <Text size={16} $font="600" $mb="2px">
                      {item.FullName}
                    </Text>
                    <p>{item.role}</p>
                  </div>
                </UserCard>
              ))}
            </UserContainer>
          </ChatBarContainer>
          <ChatContainer>
            <ChatHeader>
              <ChatUser>
                <img src="/assets/images/user.png" />
                <div>
                  <Text size={16} $font="600" $mb="2px">
                    Sabit Amirbabay
                  </Text>
                  <Text size={13} color="#BABAC1" $font="500">
                    Dispatcher
                  </Text>
                </div>
              </ChatUser>
              <Flex $gap="20px" $align="center">
                <img src="/assets/icons/mouse.svg" alt="mouse" />
                <img
                  src="/assets/icons/wifi.svg"
                  alt="voice"
                  style={{ cursor: "pointer" }}
                  onClick={() => setOpen(true)}
                />
              </Flex>
            </ChatHeader>
            <MessageWrap></MessageWrap>
            <Input>
              <input type="text" placeholder="Type something..." id="input" />
              <Flex $gap="20px" $align="center">
                <img src="/assets/icons/voice.svg" alt="voice" />
                <img src="/assets/icons/send.svg" alt="mouse" />
              </Flex>
            </Input>
          </ChatContainer>
        </NotificationWrap>
      </Main>
    </>
  );
};
