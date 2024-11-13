import { MdOutlineArrowBack } from "react-icons/md";
import { Between, Box, SmallBox } from "@/track/constants";
import { Flex } from "../../shared/drivers-header/drivers-header-styled";
import moment from "moment";
import { Dispatch, SetStateAction, useState } from "react";
interface Props {
  setUnixTime?: Dispatch<SetStateAction<number>>;
}
export const TimeContainer = ({ setUnixTime }: Props) => {
  const [dayControl, setDayControl] = useState(0);
  function getUnixTimestamp(date: Date): number {
    return Math.floor(date.getTime() / 1000);
  }

  const today = new Date();

  function formatUnixDate(unixTimestamp: number, daysToShift: number): string {
    const day: any = moment.unix(unixTimestamp).add(daysToShift, "days").unix(); // `daysToShift` musbat bo‘lsa oldinga, manfiy bo‘lsa orqaga suradi

    setUnixTime?.(day._i);
    return moment
      .unix(unixTimestamp)
      .add(daysToShift, "days") // `daysToShift` musbat bo‘lsa oldinga, manfiy bo‘lsa orqaga suradi
      .format("DD-MM-YYYY");
  }
  const day = getUnixTimestamp(today); // Masalan, 1780999 kabi qiymat qaytaradi
  const date: any = moment.unix(day).add(dayControl, "days").unix();

  const formattedDate = formatUnixDate(day, dayControl);
  const addBtnBool = today.getDate() === new Date(date * 1000).getDate();

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
