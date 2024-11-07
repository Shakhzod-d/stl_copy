import { Button } from "antd";
import {
  Block,
  BtnContainer,
  Flex,
  Status,
  StyleButton,
  Text,
} from "./drivers-header-styled";
import { BiLeftArrow } from "react-icons/bi";
import { BsAndroid2 } from "react-icons/bs";
// import ptIcon from "../../../assets/icons/pt.svg";

import { useState } from "react";
import { DriversWeek } from "@/track/constants";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// import { RootState } from "../../../store/store";
import { getLocalStorage } from "@/utils/localStorage";
import { RootState } from "@/store";
import LogActions from "@/pages/Logs/components/LogActions";
import { useLogsInnerContext } from "@/pages/Logs/components/LogsInner.context";
import moment from "moment";
import { useWeekData } from "@/track/hooks/use-data-piker";
interface DriverData {
  fullName: string | undefined;
  phone?: string;
}
export interface WeekData {
  text: string;
  value: number;
}
export const DriversHeader = ({ fullName, phone }: DriverData) => {
  const arrData: WeekData[] = useSelector(
    (state: RootState) => state.company.weekData
  );
  const week_data = arrData.slice().reverse();
  const [activeBtn, setActiveBtn] = useState(week_data.length - 1);
  // const dark = useSelector((state: RootState) => state.booleans.darkMode);

  const {
    state: { time: initialTime },
    actions: { setTime },
  } = useLogsInnerContext();
  const onDateChange = (value: number, i: number) => {
    if (i !== activeBtn) {
      //     setCurrentLog(null); // TODO: uncomment to delete current log
      setTime(moment(value).valueOf());
      setActiveBtn(i);
    }
  };
  const date = moment(initialTime).format("LLLL");

  // console.log(arrData.slice().reverse());

  const companyId = getLocalStorage("companyId");
  return (
    <div>
      <Flex $justify="space-between" $m="0 0 15px 0">
        <Flex $gap={"16px"} $align="center">
          <Link to={`/main/logs/drivers`}>
            <Block display="flex" content="center">
              <BiLeftArrow />
            </Block>
          </Link>
          <Block display="flex" content="center" $gap={64}>
            <Flex $gap="17px" $align={"center"}>
              <Text size={20} $font={500}>
                {fullName}
              </Text>
              <Text size={13} color="#babac1">
                Phone No: {phone}
              </Text>
            </Flex>

            <Flex $gap={"16px"} $align="center">
              <Status>
                <p>Sleep</p>
              </Status>
              <BsAndroid2 size={24} color="#BABAC1" />
              <img src={"/assets/icons/pt.svg"} alt="" />
            </Flex>
          </Block>
          <Flex $gap={"6px"} $align="center">
            <Block display="flex" width={248} $gap={5}>
              <Text size={15} color="#babac1">
                Worked hours:
              </Text>
              <Text $font={700}>No Working hours</Text>
            </Block>
            <Block display="flex" width={200} $gap={5}>
              <Text size={15} color="#babac1">
                Certified:
              </Text>
              <Text $font={700} color="red">
                No
              </Text>
            </Block>
            <Block display="flex" width={200} $gap={5}>
              <Text size={15} color="#babac1">
                Violations:
              </Text>
              <Text $font={700}>No</Text>
            </Block>
          </Flex>
        </Flex>

        <LogActions />
      </Flex>
      <BtnContainer>
        {week_data.map((item, i) => (
          <StyleButton
            key={item.value}
            active={activeBtn === i ? "true" : ""}
            type={"primary"}
            onClick={() => onDateChange(item.value, i)}
          >
            {item.text}
          </StyleButton>
        ))}
      </BtnContainer>
    </div>
  );
};
