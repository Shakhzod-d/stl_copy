// import { useState, useEffect } from "react";
// import { getUserData } from "@/api/calls/authCall";
// import {
//   getLocalStorage,
//   setUserData,
//   setUserType,
//   removeLocalStorage,
//   historyPush,
// } from "@/utils";
// import { errorMessage } from "@/utils/message";

import { historyPush, removeLocalStorage } from "@/utils";
import { AxiosError } from "axios";

// export const useIsAuth = () => {
//   const [isAuth, setIsAuth] = useState<boolean>(false);
//   useEffect(() => {
//     authFunc();
//   }, []);
//   const authFunc = async () => {
//     if (getLocalStorage("token")) {
//       try {
//         const res = await getUserData(;
//         const data = res.data;
//         setUserData(data);
//         setUserType(data.type);
//       } catch (err: any) {
//         if (err) {
//           removeLocalStorage("token");
//           removeLocalStorage("company_id");
//           errorMessage(err?.message);
//           historyPush("/login");
//         }
//       }
//     }
//     setIsAuth(true);
//   };
//   return isAuth;
// };

// export default useIsAuth;
const errMessage = ["Unauthorized 1", "Unauthorized"];
export const useErrAuth = () => {
  const errFun = (err: any | unknown) => {
    if (errMessage.includes(err.message)) {
      removeLocalStorage("token");
      removeLocalStorage("roleId");
      removeLocalStorage("company");
      removeLocalStorage("companyId");
      return historyPush("/login");
    } else {
      // return navigate("/login");
      return console.log(err.message);
    }
  };
  return { errFun };
};
