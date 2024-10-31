import { Text } from "@/track/constants";
import { Modal, ModalWrapper } from "./styled";
import { BsX } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  setModalActive,
  setModalAnimated,
} from "@/store/slices/booleans-slice";

export const NotificationModal = () => {
  const dark = useSelector((state: RootState) => state.booleans.darkMode);
  const dispatch = useDispatch();
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
      <ModalWrapper>
        <Modal $modalActive={modalAnimated}>
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
