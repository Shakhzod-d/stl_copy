import { Button, Form, message } from "antd";
import { ILoginData, LoginData } from "../../types";

import useApiMutation from "@/hooks/useApiMutation";
import {
  getLocalStorage,
  historyPush,
  setLocalStorage,
  setUserData,
} from "@/utils";
import { errorMessage } from "@/utils/message";
import { useState } from "react";

import {
  BoldText,
  Description,
  FromWrapper,
  Image,
  Label,
  Main,
  StyledForm,
  StyledInput,
} from "@/track/pages/login/login-styled";
import { AxiosError } from "axios";

export const Login = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const error = (message: string) => {
    messageApi.open({
      type: "error",
      content: message,
    });
  };
  const [loading, setLoading] = useState<boolean>(false);
  const loginMutation = useApiMutation("/user/login", { hideMessage: true });
  const onFinish = (values: unknown) => {
    setLoading(true);
    const data = values as LoginData;

    loginMutation.mutate(data, {
      onSuccess: (res: ILoginData) => {
        setLoading(false);
        const { data } = res;
        setLocalStorage("token", data?.token);

        setUserData(data);
        setLocalStorage("roleId", data?.role?.roleId);
        // setLocalStorage("companyId", "66fcf8f52ccf4ba8e6b32c36");
        if (!getLocalStorage("company")) {
          historyPush("/company");
        } else {
          historyPush("/");
        }
      },
      onError: (err: AxiosError) => {
        errorMessage(err?.message);

        setLoading(false);
      },
    });
  };
  return (
    <Main>
      <Image>
        <img src="assets/icons/login-logo.svg" alt="" />
      </Image>
      {contextHolder}
      <FromWrapper>
        <StyledForm autoComplete="off" onFinish={onFinish}>
          <Label htmlFor="">Login</Label>
          <Form.Item
            style={{ marginBottom: "10px" }}
            name={"email"}
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
          >
            <StyledInput placeholder="Enter login" type="" />
          </Form.Item>
          <Label htmlFor="">Password</Label>
          <Form.Item
            name={"password"}
            rules={[{ required: true, message: "Please input your password!" }]}
            style={{ margin: 0 }}
          >
            <StyledInput
              placeholder="Enter password"
              type="password"
              style={{ marginBottom: "20px" }}
            />
          </Form.Item>
          <Form.Item style={{ marginBottom: "20px" }}>
            <Button
              htmlType="submit"
              type="primary"
              loading={loading}
              style={{
                width: "552px",
                background: "#FC973A",
                color: "#fff",
                height: "60px",
                borderRadius: "6px",
              }}
            >
              Create
            </Button>
          </Form.Item>
          <BoldText>Forgot password?</BoldText>
          <Description>
            Don't have an account? <span>Create one now</span>
          </Description>
        </StyledForm>
      </FromWrapper>
    </Main>
  );
};
