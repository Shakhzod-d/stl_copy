import { useMutation, UseMutationOptions } from "react-query";
import { AxiosResponse } from "axios";
import api from "../api";
import { message } from "antd";
import { IHideMessage } from "@/types";

const useApiMutation = <Variables = any, Response = any, Error = any>(
    url: string,
    options?: UseMutationOptions<AxiosResponse<Response>, Error, Variables> &
        IHideMessage
) =>
    useMutation<AxiosResponse<Response>, Error, Variables>(
        async (data) => await api.post(url, data),
        {
            onError: (err: any) => {
                if (err?.message && !options?.hideMessage)
                    message.error(err?.message);
            },
            onSuccess: (res: any) => {
                if (res?.message && !options?.hideMessage)
                    message.success(res?.message);
            },
            ...options,
        }
    );

export default useApiMutation;
