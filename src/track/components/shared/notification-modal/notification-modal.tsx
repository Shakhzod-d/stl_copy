import { Text } from "@/track/constants";
import { Modal, ModalWrapper } from "./styled";
import { BsX } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  setModalActive,
  setModalAnimated,
} from "@/store/slices/booleans-slice";
import { useRef } from "react";

export const NotificationModal = () => {
  const dark = useSelector((state: RootState) => state.booleans.darkMode),
    modalBox = useRef<HTMLDivElement>(null),
    dispatch = useDispatch(),
    close = (e: any) => {
      if (e.target !== modalBox.current) {
        closeModal();
      }
    };

  const modalAnimated = useSelector(
    (state: RootState) => state.booleans.modalAnimated
  );
  const closeModal = () => {
    dispatch(setModalAnimated(true));
    setTimeout(() => {
      dispatch(setModalActive(false));
      dispatch(setModalAnimated(false));
    }, 100);
  };
  return (
    <>
      <ModalWrapper className="modal-wrapper" onClick={close}>
        <Modal $modalActive={modalAnimated} ref={modalBox}>
          <BsX
            size={30}
            color={dark ? "#fff" : "#000"}
            cursor={"pointer"}
            onClick={closeModal}
          />
          <Text size={30}>No notification yet </Text>
        </Modal>
      </ModalWrapper>
    </>
  );
};
