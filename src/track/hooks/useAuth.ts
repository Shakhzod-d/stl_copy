import { useEffect, useState } from "react";
import { getLocalStorage, removeLocalStorage } from "@/utils/localStorage";
import { getUserData } from "@/api/calls/authCall";
import { AxiosError, AxiosResponse } from "axios";
import { Obj, ObjType } from "../types/helper.type";
import { historyPush } from "@/utils";


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
        const data: AxiosResponse<Obj, ObjType> = res;
        const bool: boolean = data.status >= 400 ? false : true;
        setIsAuth(bool);
      } catch (err) {
        console.log(err);
        removeLocalStorage("token");
        removeLocalStorage("company");
        removeLocalStorage("roleId");
        removeLocalStorage("companyId");
        setIsAuth(false);
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
export const useErrAuth = () => {
  
  const errFun = (err: AxiosError) => {
    if (errMessage.includes(err.message)) {
      removeLocalStorage("token");
      removeLocalStorage("roleId");
      removeLocalStorage("company");
      removeLocalStorage("companyId");
      return historyPush("/login");
    } else {
      return console.log(err.message);
    }
  };
  return { errFun };
};
