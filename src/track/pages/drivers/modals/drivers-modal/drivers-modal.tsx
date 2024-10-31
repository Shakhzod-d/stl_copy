import useApiMutation from "@/hooks/useApiMutation";
import { RootState } from "@/store";
import { Flex } from "@/track/components/shared/drivers-header/drivers-header-styled";
import { FormInput, FormSelect } from "@/track/components/ui";
import { CustomModal, stateSelect } from "@/track/constants";
import {
  DefaultBtn,
  ModalCheckBox,
  ModalTextArea,
  ModalTitle,
  PrimaryBtn,
} from "@/track/pages/units/units-styled";
import { Obj } from "@/track/types/helper.type";
import { validatePhoneNumber } from "@/track/utils/method";
import { errorMessage, successMessage } from "@/utils";
import { Form } from "antd";
import { Dispatch, SetStateAction } from "react";

import { useSelector } from "react-redux";

interface Prop {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  refetch: () => void;
}

export const DriversModal = ({ open, setOpen, refetch }: Prop) => {
  const [form] = Form.useForm();

  const handleReset = () => {
    form.resetFields(); // Formani tozalash
    setOpen(false);
  };

  const vehicleId = useSelector(
    (state: RootState) => state.booleans.driverSelect
  );

  const driversMutation = useApiMutation("/driver", { hideMessage: true });
  const submit = (data: Obj) => {
    // handleReset();

    const DriverData = {
      ...data,
      organization: "Unity",
    };
    driversMutation.mutate(DriverData, {
      onSuccess: (res: unknown) => {
        console.log(res);
        successMessage("driver create success");
        handleReset();
        refetch();
      },
      onError: (err) => {
        console.log(err);
        errorMessage(err.message);
      },
    });
  };
  return (
    <CustomModal
      centered
      open={open}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      width={"95%"}
      style={{ maxWidth: "1515px" }}
    >
      <ModalTitle>Create Drivers</ModalTitle>
      <Form onFinish={submit} form={form}>
        <Flex $vertical={true} $gap={"10px"} $w="100%">
          <Flex $gap={"10px"} $w="100%">
            <FormInput
              name="firstName"
              placeholder="First Name*"
              padding="20px 25px"
              h="70px"
              rules={[
                { required: true, message: "Please input your FirstName!" },
              ]}
            />
            <FormInput
              placeholder="Last name*"
              name="lastName"
              h="70px"
              rules={[
                { required: true, message: "Please input your Last name!" },
              ]}
            />
            <FormInput
              placeholder="Username*"
              name="username"
              h="70px"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            />
            <FormInput
              placeholder="Email*"
              type="email"
              name="email"
              h="70px"
              rules={[
                { required: true, message: "Please input your email!" },
                {
                  pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please enter a valid email address!",
                },
              ]}
            />
          </Flex>
          <Flex $gap={"10px"} $w="100%">
            <FormInput
              placeholder="Password*"
              name="password"
              type="password"
              h="70px"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            />
            <FormInput
              placeholder="Phone No*"
              type="tel"
              name="phone"
              h="70px"
              rules={[{ validator: validatePhoneNumber }]}
            />
            <FormSelect
              placeholder="Vehicle Id"
              h="70px"
              data={vehicleId}
              // width="50%"
              name="vehicleId"
              rules={[
                { required: true, message: "Please input your VehicleId!" },
              ]}
            />
            <FormInput
              placeholder="Driver's License No*"
              name="driverLicense"
              h="70px"
              rules={[
                { required: true, message: "Please Driver's License No " },
              ]}
            />
          </Flex>
          <Flex $gap={"10px"} $w="100%">
            <FormSelect
              placeholder="Driver's License Issuing State*"
              data={stateSelect}
              name="driverLicenseIssuingState"
              h="70px"
              rules={[
                {
                  required: true,
                  message: "Please Driver's License Issuing State ",
                },
              ]}
            />
            <FormInput
              placeholder="Home Terminal Address*"
              name="homeTerminalAddress"
              h="70px"
              rules={[
                { required: true, message: "Please homeTerminalAddress " },
              ]}
            />
            <FormSelect
              placeholder={"CO Driver"}
              data={[{ value: "default", label: "CO Driver" }]}
              h="70px"
            />
            <FormSelect
              placeholder={"Colors"}
              data={[{ value: "default", label: "Colors" }]}
              width=""
              h="70px"
            />
          </Flex>
          <Flex $gap={"10px"} $w="100%">
            <FormSelect
              placeholder={"Address 1"}
              data={[{ value: "default", label: "Address 1" }]}
              h="70px"
            />
            <FormInput placeholder="Address 2" h="70px" />
            <FormInput placeholder="City" h="70px" />
            <FormInput placeholder="State" h="70px" />
            <FormInput placeholder="Zip" h="70px" />
          </Flex>
          <Form.Item
            name={"notes"}
            style={{ width: "100%" }}
            rules={[{ required: true, message: "Please input your notes!" }]}
          >
            {/* <ModalTextArea placeholder="Notes" /> */}
            <ModalTextArea placeholder="Notes" />
          </Form.Item>
          <Flex style={{ marginBottom: "30px" }} $gap={"150px"} $w="100%">
            <ModalCheckBox>Allow Personal Conviance</ModalCheckBox>
            <ModalCheckBox>Allow Yard Move</ModalCheckBox>
          </Flex>
          <Flex $justify="end" $gap={"10px"} $w="100%">
            <DefaultBtn
              onClick={handleReset}
              style={{ width: "200px", height: "55px" }}
            >
              Close
            </DefaultBtn>
            <PrimaryBtn
              // onClick={}
              loading={driversMutation.isLoading}
              htmlType="submit"
              style={{ width: "200px", height: "55px" }}
            >
              Save
            </PrimaryBtn>
          </Flex>
        </Flex>
      </Form>
    </CustomModal>
  );
};
