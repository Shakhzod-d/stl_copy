import { MdOutlineArrowBack } from "react-icons/md";
import { Between, Box, SmallBox } from "@/track/constants";
import { Flex } from "../../shared/drivers-header/drivers-header-styled";
import moment from "moment";
import { Dispatch, SetStateAction, useState } from "react";
interface Props {
  setUnix?: Dispatch<SetStateAction<any>>;
}
export const TimeContainer = ({ setUnix }: Props) => {
  const [dayControl, setDayControl] = useState(0);


  function getUnixTimestamp(date: Date): number {
    return Math.floor(date.getTime() / 1000); 
  }

  const today = new Date(); 

 
  function formatUnixDate(unixTimestamp: number, daysToShift: number): string {
    const day = moment.unix(unixTimestamp).add(daysToShift, "days");
    setUnix?.(day.unix()); 

    return day.format("DD-MM-YYYY"); 
  }

  const day = getUnixTimestamp(today); 
  const shiftedDate = moment.unix(day).add(dayControl, "days").unix(); 
  const formattedDate = formatUnixDate(day, dayControl); 
  const addBtnBool = today.getDate() === new Date(shiftedDate * 1000).getDate(); 

  return (
    <Between>
      <Flex $align="center" $gap={"8px"} $justify="center">
        <Box>{formattedDate}</Box>
        <SmallBox onClick={() => setDayControl((c) => c - 1)}>
          <MdOutlineArrowBack />
        </SmallBox>
        <SmallBox
          style={{ rotate: "180deg" }}
          onClick={() =>
            addBtnBool !== true ? setDayControl((c) => c + 1) : null
          }
          $disabled={addBtnBool}
        >
          <MdOutlineArrowBack />
        </SmallBox>
      </Flex>
      <Flex $gap={"8px"}>
        <Box>Driver name</Box>
        <Box>Location</Box>

        <Box>Warnings</Box>
      </Flex>
    </Between>
  );
};
