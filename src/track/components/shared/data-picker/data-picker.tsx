import { CalendarIcon } from "@/track/utils/icons";
import { DataPickerContainer, StyledDatePicker } from "./_styled";
import { GlobalStyle } from "@/components/elements/RangePicker/RangePicker";
interface  Props {
    placeholder ?:string
}
export const DataPicker = ({placeholder}:Props) => {
  return (
    <DataPickerContainer>
      <GlobalStyle bg={2} />
      <StyledDatePicker placeholder={placeholder} />
      <CalendarIcon />
    </DataPickerContainer>
  );
};
