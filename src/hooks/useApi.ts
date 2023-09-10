import { useQuery, UseQueryOptions } from "react-query";
import { AxiosResponse } from "axios";
import api from "../api";

const useApi = <Data = any, Error = any>(
    url: string,
    params: object = {},
    options: UseQueryOptions<AxiosResponse<Data>, Error> = {}
) =>
    // @ts-ignore
    useQuery([url, params], async () => api.get<Data>(url, { params }), {
        ...options,
    });

export default useApi;
