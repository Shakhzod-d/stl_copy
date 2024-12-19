import { Checkbox, Form } from "antd";
import { TextAria } from "./modal-styled";
import { FormInput } from "@/track/components/ui";
import { Text } from "@/track/constants";
import { Flex } from "@/track/components/shared/drivers-header/drivers-header-styled";
import { Select } from "@/track/components/shared/select";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useEffect, useState } from "react";
import { validatePhoneNumber } from "@/track/utils/method";
import { stateSelect } from "@/track/utils/constants";
import useApi from "@/hooks/useApi";
import { companyDrivers } from "@/track/utils/mapData";

const cycleType = [
  { label: "Cycle Type", value: "cycle" },
  { label: "USA 70/8", value: "usa70/8" },
  { label: "USA 60/7", value: "60" },
  { label: "California 80/8", value: "California" },
  { label: "Canada 120/14", value: "Canada 120/14" },
];
const restart = [
  { label: "Restart", value: "restart" },
  { label: "34", value: "34" },
  { label: "24", value: "24" },
];
const selectData = [
  { id: 0, value: "employer", label: "Employer" },
  { id: 1, value: "driver", label: "Driver" },
];
interface Props {
  roleChange: (data: string) => void;
  userRole: string | undefined;
  modalRole: string;
}
export const Information = ({ roleChange, userRole, modalRole }: Props) => {
  console.log({ userRole });

  //  ------------------state
  const vehicleId = useSelector(
    (state: RootState) => state.booleans.driverSelect
  );
  const dark = useSelector((state: RootState) => state.booleans.darkMode);

  const { data } = useApi("/drivers", {
    page: 1,
    limit: 1000,
  });
  const coDriver = companyDrivers(data ? data.data.data : []);

  const selectBg = dark ? "#373737" : "#F9F9FA";
  const [role, setRole] = useState(0);
  useEffect(() => {
    if (userRole === "employer") {
      setRole(0);
    } else {
      setRole(1);
    }
  }, [userRole]);
  const change = (e: any) => {
    setRole(e.id);
    roleChange(e.value);
  };
  return (
    <>
      <Flex $gap={"6px"} $m="0 0 10px 0">
        {modalRole !== "edit" && (
          <Select
            option={selectData}
            w="100%"
            h="60px"
            bg={selectBg}
            placeholder="employee"
            onChange={change}
            dValue={selectData[role]}
            disabled={modalRole === "edit" ? true : false}
          />
        )}
        <Select
          w="100%"
          h="60px"
          bg={selectBg}
          option={[{ value: "status", label: "Status" }]}
          placeholder="Status"
        />
      </Flex>

      {role === 1 ? (
        <>
          <Flex $gap={"6px"} $m="0 0 10px 0">
            <FormInput
              placeholder="First Name*"
              h="69px"
              name="firstName"
              rules={[
                { required: true, message: "Please input your FirstName!" },
              ]}
            />
            <FormInput
              placeholder="Lats Name*"
              h="69px"
              name="lastName"
              rules={[
                { required: true, message: "Please input your Last name!" },
              ]}
            />
            <FormInput
              placeholder="Username*"
              h="69px"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            />
            <FormInput
              placeholder="Email"
              h="69px"
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                {
                  pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please enter a valid email address!",
                },
              ]}
            />
          </Flex>
          <Flex $gap={"6px"} $m="0 0 10px 0">
            <FormInput
              placeholder="Password*"
              h="69px"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            />
            <FormInput
              placeholder="Phone No"
              h="69px"
              name="phone"
              type="tel"
              rules={[{ validator: validatePhoneNumber }]}
            />
            <Select
              option={vehicleId}
              w="100%"
              placeholder="Vehicle ID"
              bg={selectBg}
              name="vehicleId"
              h={"69px"}
              rules={[
                { required: true, message: "Please input your VehicleId!" },
              ]}
            />
            <FormInput
              placeholder="Driver's License No*"
              h="69px"
              name="driverLicense"
              rules={[
                { required: true, message: "Please Driver's License No " },
              ]}
            />
          </Flex>
          <Flex $gap={"6px"} $m="0 0 10px 0">
            <Select
              placeholder="Driver's License Issuing State*"
              bg={selectBg}
              option={stateSelect}
              w="100%"
              h={"69px"}
              name="driverLicenseIssuingState"
              rules={[
                {
                  required: true,
                  message: "Please Driver's License Issuing State ",
                },
              ]}
            />
            <FormInput
              placeholder="Home Terminal Address*"
              h="69px"
              name="homeTerminalAddress"
              rules={[
                { required: true, message: "Please homeTerminalAddress " },
              ]}
            />
            <Select
              option={coDriver.coDriver}
              w="100%"
              h={"69px"}
              placeholder="Co-Driver"
              bg={selectBg}
              name="coDriverId"
              // rules={[{ required: true, message: "Please Co Driver " }]}
            />
          </Flex>
          <Flex $gap={"6px"} $m="0 0 10px 0">
            <Select
              placeholder="Address 1"
              bg={selectBg}
              option={[{ value: "address1", label: "Address 1" }]}
              w="100%"
              h={"69px"}
            />
            <FormInput placeholder="Address 2" h="69px" />
            <FormInput placeholder="City" h="69px" />
            <FormInput placeholder="State" h="69px" />
            <FormInput placeholder="Zip" h="69px" />
          </Flex>
          <Flex $gap={"6px"} $m="0 0 10px 0">
            <Select
              option={cycleType}
              w="100%"
              h={"60px"}
              bg={selectBg}
              placeholder="Cycle type"
            />

            <Select
              option={restart}
              w="100%"
              h={"60px"}
              bg={selectBg}
              placeholder="Restart"
            />
          </Flex>
          <Form.Item name={"notes"}>
            <TextAria placeholder="Note" />
          </Form.Item>
          <Flex $gap={"6px"} $m="0 0 30px 0">
            <Checkbox>
              <Text> Allow Personal Conviance</Text>
            </Checkbox>
            <Checkbox>
              {" "}
              <Text> Allow Yard Move</Text>
            </Checkbox>
          </Flex>
        </>
      ) : (
        <>
          <Flex $gap={"6px"} $m="0 0 10px 0">
            <FormInput
              placeholder="First Name*"
              h="69px"
              name="role"
              rules={[
                {
                  required: true,
                  message: "Please input your FistName",
                },
              ]}
            />
            <FormInput
              placeholder="Lats Name*"
              h="69px"
              name="lastName"
              rules={[
                {
                  required: true,
                  message: "Please input your LastName",
                },
              ]}
            />
          </Flex>
          <Flex $gap={"6px"} $m="0 0 10px 0">
            <FormInput
              placeholder="Mobile"
              h="69px"
              name="phone"
              rules={[{ validator: validatePhoneNumber }]}
            />
            <FormInput
              placeholder="Email"
              h="69px"
              type="email"
              name="email"
              rules={[
                { required: true, message: "Please input your Vehicle email" },
                {
                  pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please enter a valid email address!",
                },
              ]}
            />
            <FormInput
              placeholder="Password"
              h="69px"
              type="password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password",
                },
              ]}
            />
          </Flex>
        </>
      )}
    </>
  );
};
