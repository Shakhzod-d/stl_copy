import React from "react";
import { Button, Input } from "antd";
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
  historyPush,
} from "@/utils";
import { ILoginData } from "./login.types";
import useApiMutation from "@/hooks/useApiMutation";
import { IUserRole } from "@/types/user.type";

type FormValues = {
  email: string;
  password: string;
  pwd: string;
};

const Login: React.FC = () => {
  const { handleSubmit, control } = useForm<FormValues>(formProps);

  const loginMutation = useApiMutation("/user/login", { hideMessage: true });

  const submitFunc: SubmitHandler<FormValues> = (data) => {
    loginMutation.mutate(data, {
      onSuccess: (res: ILoginData) => {
        const { data } = res;
        const role: IUserRole = data.role;

        const isAdmin = role.roleName === "superAdmin";
        const isService = ["serviceAdmin", "secondServiceAdmin"].includes(role.roleName);
        const isCompany = ["companyAdmin"].includes(role.roleName);
        const isLogger = ["logger"].includes(role.roleName)
        

        setIsAuth(true);
        setUserData(data);
        setLocalStorage("token", data?.token);
        if (isAdmin) setTimeout(() => historyReplace("/admin/services"), 0);
        // if (isCompany){ setTimeout(() => historyReplace("/main/dashboard"), 0)}
        if (isCompany){ 
          setLocalStorage("companyId", data.companyId)
          historyPush("/main/dashboard")
          window.location.reload();
        }
        // if (isLogger) setTimeout(() => historyReplace('/admin/all-companies'), 0)
        if(isLogger){
          setLocalStorage('companyId', data.companyId)
          historyPush('/main/log/logs')
          window.location.reload();
          
        }
        // if (isService) setTimeout(() => historyReplace('/admin/all-companies'), 0)
        if(isService){
          setLocalStorage('serviceId', data.serviceId)
          historyPush('/admin/services')
          window.location.reload();
          
        }
        console.log('user', data);
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
          src="/assets/icons/Logo_STL1_vector.svg"
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
        {/* <Input.Password
          placeholder="Enter your password"
          type="password"
          className="custom-password-input"
        /> */}
        {/* <TextField
          placeholder={"Password"}
          label={"Password"}
          name="password"
          control={control}
          className="mb-24 custom-password-input"
          validation={{
            minLength: {
              value: 6,
              message: "Password should contain at least 6 characters",
            },
          }}
          required
        /> */}
        <PasswordField
          // type={"text"}
          // style={{ border: "1px solid green" }}
          label={"Password"}
          placeholder={"Enter your password"}
          name="password"
          control={control}
          className="mb-32 custom-password-input"
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
