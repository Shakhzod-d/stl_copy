import { Flex } from "@/track/components/shared/drivers-header/drivers-header-styled";
import React, { useState } from "react";
import { Label, Note, TextContainer } from "../_styled";

import { useSelector } from "react-redux";
import { RootState } from "@/store";

export const CompanyInfo = () => {
  const [show, setShow] = useState(true);
  const companyData: any = useSelector(
    (state: RootState) => state.company.loggerCompanyData
  );

  return (
    <div>
      <Flex $gap="10px" $m="0 0 10px 0">
        <div style={{ width: "100%" }}>
          <Label>Company Name</Label>
          <TextContainer>
            {companyData && companyData?.companyName}
          </TextContainer>
        </div>
        <div style={{ width: "100%" }}>
          <Label>USDOT*</Label>
          <TextContainer> {companyData && companyData?.usdot}</TextContainer>
        </div>
        <div style={{ width: "100%" }}>
          <Label>Terminal Address</Label>
          <TextContainer>
            {companyData && companyData?.homeTerminalAddress}
          </TextContainer>
        </div>
      </Flex>

      <Flex $gap="10px" $m="0 0 15px 0">
        <div style={{ width: "100%" }}>
          <Label>Country</Label>
          <TextContainer>Us</TextContainer>
        </div>
        <div style={{ width: "100%" }}>
          <Label>Status</Label>
          <TextContainer>
            {companyData && companyData?.isActive ? "Active" : "not Active"}{" "}
          </TextContainer>
        </div>
        <div style={{ width: "100%" }}>
          <Label>Zip</Label>
          <TextContainer>456944</TextContainer>
        </div>
        <div style={{ width: "100%" }}>
          <Label>City</Label>
          <TextContainer>Nyu York</TextContainer>
        </div>
      </Flex>

      <Flex $gap="10px" $m="0 0 15px 0">
        <div style={{ width: "100%" }}>
          <Label>Address Line 1</Label>
          <TextContainer>
            123 Main Street, apt 4B San Diego CA, 91911
          </TextContainer>
        </div>
        <div style={{ width: "100%" }}>
          <Label>Address Line 2</Label>
          <TextContainer>123 Main Street, apt </TextContainer>
        </div>
        <div style={{ width: "100%" }}>
          <Label>Company Timezone*</Label>
          <TextContainer>
            {companyData && companyData?.homeTerminalTimezone}
          </TextContainer>
        </div>
        <div style={{ width: "100%" }}>
          <Label>State</Label>
          <TextContainer>The United States</TextContainer>
        </div>
      </Flex>

      <Flex $gap="10px" $m="0 0 20px 0">
        <div style={{ width: "100%" }}>
          <Label> Start of week</Label>
          <TextContainer>Monday, November 11th</TextContainer>
        </div>
        <div style={{ width: "100%" }}>
          <Label>Email</Label>
          <TextContainer>example@mail.com </TextContainer>
        </div>
        <div style={{ width: "100%" }}>
          <Label>Password</Label>
          <TextContainer>
            {show ? "***" : "1234"}{" "}
            <img
              src="/assets/images/eye.png"
              alt=""
              onClick={() => setShow((c) => !c)}
            />{" "}
          </TextContainer>
        </div>
        <div style={{ width: "100%" }}>
          <Label>Phone Number</Label>
          <TextContainer>{companyData && companyData?.phone}</TextContainer>
        </div>
      </Flex>
      <Note>Note</Note>
    </div>
  );
};
