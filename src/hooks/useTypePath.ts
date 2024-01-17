import { useSelector } from "react-redux";
import { RootState } from "@/store";

export const useTypePath = () => {
    const { userType } = useSelector((state: RootState) => state.auth);
    const types = {
        1: "/admin/services", // admin
        2: "/main/dashboard", // company
        3: "/company", // service
    };
    // @ts-ignore
    return userType ? types[userType] : "/";
};

export default useTypePath;
