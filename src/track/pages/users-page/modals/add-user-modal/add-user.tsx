import useApiMutation from "@/hooks/useApiMutation";
import { RootState } from "@/store";
import { Flex } from "@/track/components/shared/drivers-header/drivers-header-styled";
import { Select } from "@/track/components/shared/select";
import { FormInput, FormSelect } from "@/track/components/ui";
import { CustomModal, Text } from "@/track/constants";

import { DefaultBtn, PrimaryBtn } from "@/track/pages/units/units-styled";
import { errorMessage, getLocalStorage, successMessage } from "@/utils";
import { Form } from "antd";

import { Dispatch, SetStateAction } from "react";
import { useSelector } from "react-redux";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  refetch: () => void;
}
export const AddUser = ({ open, setOpen, refetch }: Props) => {
  const UserMutation = useApiMutation("/user", { hideMessage: true });
  const dark = useSelector((state: RootState) => state.booleans.darkMode);
  const roleSelectOption = [
    { value: "Manager", label: "Manager" },

    { value: "Finance", label: "Finance" },
    { value: "Logbook Specialist", label: "Logbook Specialist" },
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
  const selectBg = dark ? "#373737" : "#F9F9FA";
  return (
    <CustomModal width={"70%"} open={open} onCancel={() => setOpen(false)}>
      <Text $mb="20px" size={30}>
        Add user
      </Text>

      <Form onFinish={submit}>
        <Flex $gap={"20px"} $vertical={true}>
          <Flex $gap={"20px"} $w="100%">
            <Select
              name="role"
              rules={[{ required: true, message: "Please input your Role!" }]}
              placeholder="Role"
              option={roleSelectOption}
              bg={selectBg}
              w="100%"
              h="60px"
            />
            <FormInput
              name="phone"
              rules={[{ required: true, message: "Please input your phone!" }]}
              placeholder="Phone"
              width="100%"
            />
          </Flex>
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
          <Select
            name="status"
            // rules={[{ required: true, message: "Please input your Role!" }]}
            placeholder="Status"
            option={[]}
            bg={selectBg}
            w="100%"
            h="60px"
          />
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
