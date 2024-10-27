import {
  CustomButton,
  logsForm,
  logsFormTwo,
  logsFromThee,
  Text,
} from "@/track/constants";
import { Flex } from "../drivers-header/drivers-header-styled";
import {
  FormRow,
  FormTitle,
  FormTitleText,
  StyleFlex,
  Value,
  ValueBox,
} from "./form-styled";
// import { useSelector } from "react-redux";
// import { RootState } from "../../../store/store";

export const DriversForm = () => {
  // const sidebarActive = useSelector(
  //   (state: RootState) => state.booleans.sidebarActive
  // );
  const sidebarActive = false;
  return (
    <section style={{ marginBottom: "40px" }}>
      <Flex
        $align="center"
        $justify="space-between"
        style={{ marginBottom: "15px" }}
      >
        <Text size={32} $font="500">
          Log form
        </Text>
        <CustomButton
          type="primary"
          $background="#FC973A"
          padding="15px 25px"
          height="50px"
        >
          Correction & Annotation
        </CustomButton>
      </Flex>
      <StyleFlex $active={sidebarActive}>
        <div>
          {logsForm.map((item) => (
            <FormRow key={item.id}>
              <FormTitle>
                <FormTitleText>{item.title}</FormTitleText>
              </FormTitle>
              {item.title == "Trailers" || item.title == "Shipping docs" ? (
                <ValueBox>
                  <Value $clr="black">{item.value}</Value>
                </ValueBox>
              ) : (
                <Value $clr={item.value == "Signed" ? "#32BE61" : ""}>
                  {item.value}
                </Value>
              )}
            </FormRow>
          ))}
        </div>
        <div>
          {logsFormTwo.map((item) => (
            <FormRow key={item.id}>
              <FormTitle>
                <FormTitleText>{item.title}</FormTitleText>
              </FormTitle>

              <Value>{item.value}</Value>
            </FormRow>
          ))}
        </div>
        <div>
          {logsFromThee.map((item) => (
            <FormRow key={item.id}>
              <FormTitle>
                <FormTitleText>{item.title}</FormTitleText>
              </FormTitle>

              <Value>{item.value}</Value>
            </FormRow>
          ))}
        </div>
      </StyleFlex>
    </section>
  );
};