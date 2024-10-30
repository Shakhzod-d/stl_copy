import { Modal, ModalWrapper } from "./notification-styled";
import { BiX } from "react-icons/bi";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Text } from "@/track/constants";
import { setModal } from "@/track/utils/dispatch";

export const NotificationModal = () => {
  const dark = useSelector((state: RootState) => state.booleans.darkMode);
  return (
    <ModalWrapper>
      <Modal>
        <BiX
          size={30}
          style={{ cursor: "pointer" }}
          color={dark ? "white" : "black"}
          onClick={() => setModal(false)}
        />
        <Text size={20}>No notification yet </Text>
      </Modal>
    </ModalWrapper>
  );
};
