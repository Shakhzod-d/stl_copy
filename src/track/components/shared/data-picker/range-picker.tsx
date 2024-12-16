import React from "react";
import { Container, StyledRangePicker } from "./_styled";
import { Moment } from "moment";
import { GlobalStyle } from "@/components/elements/RangePicker/RangePicker";
import { CalendarIcon } from "@/track/utils/icons";
import { IoSearchOutline } from "react-icons/io5";
interface Props {
  dValue?: [Moment, Moment];
  format?: string;
}
export const RangePicker = ({ dValue, format }: Props) => {
  return (
    <Container>
      <GlobalStyle bg={1}/>
      <CalendarIcon />
      <StyledRangePicker
        defaultValue={dValue}
        placeholder={["Start Date", "End Date"]}
        separator={<img src="/assets/icons/right-arrow.svg" alt="" />}
        format={format}
      />
      <IoSearchOutline size={20} color="gray" className="search-icon" />
    </Container>
  );
};
