import useApiMutation from "@/hooks/useApiMutation";
import { Flex } from "@/track/components/shared/drivers-header/drivers-header-styled";
import { FormInput, FormSelect } from "@/track/components/ui";
import { CustomModal, Text } from "@/track/constants";
import { DefaultBtn } from "@/track/pages/drivers/styled";
import { PrimaryBtn } from "@/track/pages/units/units-styled";
import { errorMessage, getLocalStorage, successMessage } from "@/utils";
import { Form } from "antd";

import { Dispatch, SetStateAction } from "react";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  refetch: () => void;
}
export const AddUser = ({ open, setOpen, refetch }: Props) => {
  const UserMutation = useApiMutation("/user", { hideMessage: true });

  const roleSelectOption = [
    { value: "superAdmin", label: "superAdmin" },
    { value: "serviceAdmin", label: "serviceAdmin" },
    { value: "loggerAdmin", label: "loggerAdmin" },
    { value: "companyAdmin", label: "companyAdmin" },
  ];
  interface User {
    [key: string]: string;
  }
  const roleId = getLocalStorage("roleId");
  const submit = (data: User) => {
    console.log(data);
    const userData = {
      firstName: data.fistName,
      lastName: data.lastName,
      role: {
        roleName: data.role,
        roleId: roleId,
      },
      phone: data.phone,
      email: data.email,
      password: data.password,
    };
    UserMutation.mutate(userData, {
      onSuccess: (res: unknown) => {
        successMessage("add user success");
        setOpen(false);
        refetch();
      },
      onError: (err) => {
        console.log(err);
        errorMessage(err?.message);
      },
    });
  };
  return (
    <CustomModal width={"70%"} open={open} onCancel={() => setOpen(false)}>
      <Text $mb="20px" size={30}>
        Add user
      </Text>

      <Form onFinish={submit}>
        <Flex $gap={"20px"} $vertical={true}>
          <Flex $gap={"20px"} $w="100%">
            <FormInput
              name="firstName"
              rules={[
                {
                  required: true,
                  message: "Please input your firstName!",
                },
              ]}
              placeholder="FirstName"
              width="100%"
            />
            <FormInput
              name="lastName"
              rules={[
                { required: true, message: "Please input your LastName!" },
              ]}
              placeholder="lastName"
              width="100%"
            />
            <FormSelect
              name="role"
              rules={[{ required: true, message: "Please input your Role!" }]}
              placeholder="Role"
              data={roleSelectOption}
            />
          </Flex>

          <Flex $gap={"20px"} $w="100%">
            <FormInput
              name="phone"
              rules={[{ required: true, message: "Please input your phone!" }]}
              placeholder="Phone"
              width="100%"
            />
            <FormInput
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your login!",
                },
                {
                  pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please enter a valid email address!",
                },
              ]}
              placeholder="Email"
              width="100%"
            />
            <FormInput
              name={"password"}
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
              placeholder="password"
              type="password"
            />
          </Flex>
          <Flex $justify="end" $gap={"20px"} $w="100%">
            <DefaultBtn
              style={{ width: "200px", height: "55px" }}
              onClick={() => setOpen(false)}
            >
              Close
            </DefaultBtn>
            <Form.Item name={"lastName"}>
              <PrimaryBtn
                padding="15px 50px"
                loading={UserMutation.isLoading}
                htmlType="submit"
              >
                Add
              </PrimaryBtn>
            </Form.Item>
          </Flex>
        </Flex>
      </Form>
    </CustomModal>
  );
};
