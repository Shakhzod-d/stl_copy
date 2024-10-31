import React from "react";


import moment from "moment";
import { useLogsInnerContext } from "../LogsInner.context";


import {
  Block,
  Flex,
} from "@/track/components/shared/drivers-header/drivers-header-styled";
import { Text } from "@/track/constants";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface ILogActions {}

const LogActions: React.FC<ILogActions> = ({}) => {
  const {
    state: {

      time: initialTime,
  
    },
    actions: {
      setTime,
    
    },
  } = useLogsInnerContext();

  const onDateChange = (type: "prev" | "next") => {
    //     setCurrentLog(null); // TODO: uncomment to delete current log
    if (type === "next") setTime(moment(initialTime).add(1, "day").valueOf());
    else setTime(moment(initialTime).add(-1, "day").valueOf());
  };

  function dataPiker(time: number): string {
    return moment(time).format("DD-MM-YYYY");
  }

  

  const dark = useSelector((state: RootState) => state.booleans.darkMode);
  return (
    <div className="log-actions">
      <div className="log-left-actions">
        <Flex $gap="6px">
          <Block display="flex" width={200}>
            <div>
              <Text size={15} color="#babac1">
                {dataPiker(initialTime)}
              </Text>
            </div>
          </Block>
          <Block
            display="flex"
            content="center"
            onClick={() => onDateChange("prev")}
          >
            <IoIosArrowBack color={dark ? "#fff" : "#000"} />
          </Block>
          <Block
            display="flex"
            content="center"
            onClick={() => onDateChange("next")}
          >
            <IoIosArrowForward color={dark ? "#fff" : "#000"} />
          </Block>
        </Flex>
      </div>
    </div>
  );
};

export default LogActions;
