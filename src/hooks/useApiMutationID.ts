import { useMutation, UseMutationOptions } from "react-query";
import { AxiosResponse } from "axios";
import api from "../api";
import { message } from "antd";
import { IHideMessage } from "@/types";

const useApiMutationID = <Variables = any, Response = any, Error = any>(
    method: "PUT" | "DELETE" | "POST",
    url: string,
    options?: UseMutationOptions<AxiosResponse<Response>, Error, Variables> &
        IHideMessage
) =>
    useMutation<AxiosResponse<Response>, Error, Variables>(
        ({ id, data }: any) => {
            url = `${url}/${id}`;
            const response = api({ url, method, data });
            return response;
        },
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

export default useApiMutationID;
