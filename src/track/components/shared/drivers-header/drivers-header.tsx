import { Button } from "antd";
import {
  Block,
  BtnContainer,
  Flex,
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
  const [activeBtn, setActiveBtn] = useState(0);
  // const dark = useSelector((state: RootState) => state.booleans.darkMode);

  const {
    state: { time: initialTime },
    actions: { setTime },
  } = useLogsInnerContext();
  const onDateChange = (value: number, i: number) => {
    if (i !== activeBtn) {
      //     setCurrentLog(null); // TODO: uncomment to delete current log
      setTime(
        moment(initialTime)
          .add(-value + 1, "day")
          .valueOf()
      );
      setActiveBtn(i);
    }
  };
  const date = moment(initialTime).format("LLLL");

  const arrData: WeekData[] = useSelector(
    (state: RootState) => state.company.weekData
  );

  const companyId = getLocalStorage("companyId");
  return (
    <div>
      <Flex $justify="space-between">
        <Flex $gap={"16px"} $align="center">
          <Link to={`/main/logs/drivers`}>
            <Block display="flex" content="center">
              <BiLeftArrow />
            </Block>
          </Link>
          <Block display="flex" content="center" $gap={64}>
            <div>
              <Text size={20} $font={500}>
                {fullName}
              </Text>
              <Text size={13} color="#babac1">
                Phone No: {phone}
              </Text>
            </div>
            <Flex $gap={"16px"} $align="center">
              <Button type="primary" style={{ background: "#FC973A" }}>
                Sleep
              </Button>
              <BsAndroid2 size={24} color="#BABAC1" />
              {/* <img src={ptIcon} alt="" /> */}
            </Flex>
          </Block>
          <Flex $gap={"6px"}>
            <Block display="block" width={200}>
              <div>
                <Text size={13} color="#babac1">
                  Worked hours:
                </Text>
                <Text $font={700}>No Working hours</Text>
              </div>
            </Block>
            <Block display="block" width={200}>
              <div>
                <Text size={13} color="#babac1">
                  Certified:
                </Text>
                <Text $font={700} color="red">
                  No
                </Text>
              </div>
            </Block>
            <Block display="block" width={200}>
              <div>
                <Text size={10} color="#babac1">
                  Violations:
                </Text>
                <Text $font={700}>No</Text>
              </div>
            </Block>
          </Flex>
        </Flex>

        <LogActions />
      </Flex>
      <BtnContainer>
        {arrData.map((item, i) => (
          <StyleButton
            key={item.value}
            active={activeBtn === i ? "true" : ""}
            type={"primary"}
            // onClick={() => onDateChange(item.value, i)}
          >
            {item.text}
          </StyleButton>
        ))}
      </BtnContainer>
    </div>
  );
};
