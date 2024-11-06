import { useEffect, useState } from "react";
import { getLocalStorage, removeLocalStorage } from "@/utils/localStorage";
import { getUserData } from "@/api/calls/authCall";
import {  AxiosResponse } from "axios";

import { historyPush, setUserData } from "@/utils";
import { IUserData } from "@/types/user.type";
import { setCompany } from "../utils/dispatch";

export const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    authFun();
  }, []);
  const authFun = async () => {
    if (getLocalStorage("token")) {
      try {
        setLoading(true);
        const res = await getUserData();
        const data: AxiosResponse<IUserData> = res;
        const user: IUserData = data.data;
        setUserData(user);

        const bool: boolean = data.status >= 400 ? false : true;
        setIsAuth(bool);
      } catch (err) {
        console.log(err);
        removeLocalStorage("token");
        removeLocalStorage("company");
        removeLocalStorage("roleId");
        removeLocalStorage("companyId");
        setIsAuth(false);
        setCompany(false);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };
  return { loading, isAuth };
};
const errMessage = ["Unauthorized 1", "Unauthorized"];

export const errFun = (err: any) => {
  if (errMessage.includes(err.message)) {
    removeLocalStorage("token");
    setCompany(false);
    removeLocalStorage("roleId");
    removeLocalStorage("company");
    removeLocalStorage("companyId");
    return historyPush("/login");
  } else {
    return console.log(err.message);
  }
};
