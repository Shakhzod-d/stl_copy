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
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useState } from "react";
import { DriversWeek } from "@/track/constants";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// import { RootState } from "../../../store/store";
import { getLocalStorage } from "@/utils/localStorage";
import { RootState } from "@/store";

export const DriversHeader = () => {
  const [activeBtn, setActiveBtn] = useState(1);
  const dark = useSelector((state: RootState) => state.booleans.darkMode);
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
                Jonibek Muradov
              </Text>
              <Text size={13} color="#babac1">
                Phone No: Show phone
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
        <Flex $gap="6px">
          <Block display="flex" width={200}>
            <div>
              <Text size={15} color="#babac1">
                03-10-2024
              </Text>
            </div>
          </Block>
          <Block display="flex" content="center">
            <IoIosArrowBack color={dark ? "#fff" : "#000"} />
          </Block>
          <Block display="flex" content="center">
            <IoIosArrowForward color={dark ? "#fff" : "#000"} />
          </Block>
        </Flex>
      </Flex>
      <BtnContainer>
        {DriversWeek.map((item) => (
          <StyleButton
            key={item.id}
            active={activeBtn == item.id ? "true" : ""}
            type={"primary"}
            onClick={() => setActiveBtn(item.id)}
          >
            Jan 24 / Wed
          </StyleButton>
        ))}
      </BtnContainer>
    </div>
  );
};
