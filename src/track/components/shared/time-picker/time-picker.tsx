import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Div, P, StyledCalendar, Modal } from "./styled";
import { StyledInput } from "../../../pages/manage-company/manage-company-styled";
import { TransparentButton } from "../../../pages/ifta-reports/ifta-reports-styled";
import { MdRestartAlt } from "react-icons/md";
import { DefaultBtn, PrimaryBtn } from "../../../pages/units/units-styled";
import { Flex } from "../drivers-header/drivers-header-styled";

interface Props {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const TimePickerModal = ({ setOpen }: Props) => {
  const [startActiveBtn, setStartActiveBtn] = useState(1);
  const [finishActiveBtn, setFinishActiveBtn] = useState(2);

  const selectRef = useRef<HTMLDivElement>(null);

    const closeSelect = () => {
      setOpen(false);
    };
   useEffect(() => {
     const handleClickOutside = (event: MouseEvent) => {
       if (
         selectRef.current &&
         !selectRef.current.contains(event.target as Node)
       ) {
         closeSelect();
       }
     };

     document.addEventListener("mousedown", handleClickOutside);

     return () => {
       document.removeEventListener("mousedown", handleClickOutside);
     };
   }, []);

  return (
    <Modal ref={selectRef}>
      <StyledCalendar />

      <Flex $justify="space-between" $align="center" style={{ width: "100%" }}>
        <P>Start</P>

        <Flex $gap="5px" $align="center">
          <StyledInput
            defaultValue={"08:00"}
            width={"65px"}
            height={"34px"}
            padding="6px 11px"
            $background={"#f9f9fa"}
          />

          <Div>
            <TransparentButton
              padding="3px 10px"
              width="58px"
              height="34px"
              $background={startActiveBtn != 1 ? "#F9F9FA" : "#F3F3F4"}
              onClick={() => setStartActiveBtn(1)}
            >
              AM
            </TransparentButton>
            <TransparentButton
              padding="3px 10px"
              width="58px"
              height="34px"
              $background={startActiveBtn != 2 ? "#F9F9FA" : "#F3F3F4"}
              onClick={() => setStartActiveBtn(2)}
            >
              PM
            </TransparentButton>
          </Div>
        </Flex>
      </Flex>

      <Flex $justify="space-between" $align="center" style={{ width: "100%" }}>
        <P>End</P>

        <Flex $gap="5px" $align="center">
          <StyledInput
            defaultValue={"08:00"}
            width={"65px"}
            height={"34px"}
            padding="6px 11px"
            $background={"#f9f9fa"}
          />

          <Div>
            <TransparentButton
              padding="3px 10px"
              width="58px"
              height="34px"
              $background={finishActiveBtn != 1 ? "#F9F9FA" : "#F3F3F4"}
              onClick={() => setFinishActiveBtn(1)}
            >
              AM
            </TransparentButton>
            <TransparentButton
              padding="3px 10px"
              width="58px"
              height="34px"
              $background={finishActiveBtn != 2 ? "#F9F9FA" : "#F3F3F4"}
              onClick={() => setFinishActiveBtn(2)}
            >
              PM
            </TransparentButton>
          </Div>
        </Flex>
      </Flex>

      <Flex $gap="10px">
        <DefaultBtn
          padding="15px 25px"
          width="100px"
          height="50px"
          $background="#F3F3F4"
        >
          <MdRestartAlt />
        </DefaultBtn>

        <PrimaryBtn width="220px" height="50px">
          Apply
        </PrimaryBtn>
      </Flex>
    </Modal>
  );
};
