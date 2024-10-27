

import { Navbar } from "../../components/ui";
import {
  Main,
  transferBtns,
  transferColums,
    transferData,
} from "@/track/utils/index";

import { CustomTable } from "../../components/shared";
import { TransparentButton } from "@/track/constants";
import { TopContainer } from "../units/units-styled";

export const Transfer = () => {
  return (
    <Main>
      <Navbar title={"FMCSA Report"} />

      <TopContainer $gap="5px">
        {transferBtns.map((item) => (
          <TransparentButton
            padding="20px 35px"
            width="auto"
            height="60px"
            key={item.id}
          >
            {item.text}
          </TransparentButton>
        ))}
      </TopContainer>

      <CustomTable columns={transferColums} data={transferData} />
    </Main>
  );
};
