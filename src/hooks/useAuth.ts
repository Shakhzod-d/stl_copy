import { useState, useEffect } from "react";
import { getUserData } from "@/api/calls";
import {
    getLocalStorage,
    setUserData,
    setUserType,
    removeLocalStorage,
    historyPush,
} from "@/utils";
import { errorMessage } from "@/utils/message";

export const useIsAuth = () => {
    const [isAuth, setIsAuth] = useState<boolean>(false);
    useEffect(() => {
        authFunc();
    }, []);
    const authFunc = async () => {
        if (getLocalStorage("token")) {
            try {
                const res = await getUserData(getLocalStorage("company_id"));
                const data = res.data;
                setUserData(data);
                setUserType(data.type);
            } catch (err: any) {
                if (err) {
                    removeLocalStorage("token");
                    removeLocalStorage("company_id");
                    errorMessage(err?.message);
                    historyPush("/login");
                }
            }
        }
        setIsAuth(true);
    };
    return isAuth;
};

export default useIsAuth;
