import React from "react";
import { Button } from "antd";
import TextField from "@/components/form/TextField";
import PasswordField from "@/components/form/PasswordField";
import { useForm, SubmitHandler } from "react-hook-form";
import { EMAIL_PATTERN } from "@/constants";
import { formProps } from "@/constants";
import {
  setIsAuth,
  setLocalStorage,
  setUserData,
  errorMessage,
  historyReplace,
} from "@/utils";
import { ILoginData } from "./login.types";
import useApiMutation from "@/hooks/useApiMutation";
import { IRoleName } from "@/types";

type FormValues = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const { handleSubmit, control } = useForm<FormValues>(formProps);

  const loginMutation = useApiMutation("/user/login", { hideMessage: true });

  const submitFunc: SubmitHandler<FormValues> = (data) => {
    loginMutation.mutate(data, {
      onSuccess: (res: ILoginData) => {
        const { data } = res;
        const role: IRoleName = data.role;

        const isAdmin = role === "superAdmin";
        const isService = ["serviceAdmin,secondServiceAdmin"].includes(role);
        const isCompany = ["companyAdmin,logger"].includes(role);

        setIsAuth(true);
        setUserData(data);
        setLocalStorage("token", data?.token);
        if (isAdmin) setTimeout(() => historyReplace("/admin/services"), 0);
      },
      onError: (err) => {
        errorMessage(err?.data.error);
      },
    });
  };

  return (
    <div className="app-login">
      <form
        className="form"
        onSubmit={handleSubmit(submitFunc)}
        id="TMK-login-forum"
      >
        {/* <img src={`/assets/icons/logisoft.png`} alt="logo" /> */}
        {/* <img
          className="logo-icon"
          src="https://tmk.roundedteam.uz/assets/icons/logo-icon.svg"
          alt=""
        />
        <img
          className="logo-title"
          src="https://tmk.roundedteam.uz/assets/icons/logo-title.svg"
          alt=""
        /> */}
        <img
          style={{ width: 200 }}
          className="logo-title"
          src="/assets/images/STL.png"
          alt=""
        />
        <TextField
          placeholder={"example@gmail.com"}
          label={"Email"}
          name="email"
          control={control}
          className="mb-24"
          validation={{
            pattern: {
              value: EMAIL_PATTERN,
              message: "Please enter the correct email",
            },
          }}
          required
        />
        <PasswordField
          label={"Password"}
          placeholder={"******"}
          name="password"
          control={control}
          className="mb-32"
          validation={{
            minLength: {
              value: 6,
              message: "Password should contain at least 6 characters",
            },
          }}
          required
        />
        {/* <Checkbox>Remember me</Checkbox> */}
        <Button
          htmlType="submit"
          form="TMK-login-forum"
          type="primary"
          loading={loginMutation.isLoading}
          className="w-100"
        >
          Sign In
        </Button>
      </form>
    </div>
  );
};

export default Login;
