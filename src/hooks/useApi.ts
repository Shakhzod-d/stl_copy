import { useQuery, UseQueryOptions } from "react-query";
import { AxiosResponse } from "axios";
import api from "../api";

import { errFun } from "@/track/hooks/useAuth";

const useApi = <Data = any, Error = any>(
  url: string,
  params: object = {},
  options: UseQueryOptions<AxiosResponse<Data>, Error> = {}
) =>
  // @ts-ignore
  useQuery([url, params], async () => api.get<Data>(url, { params }), {
    ...options,
    onError: (error) => {
      console.error("Error fetching data:", error); // Xatolikni konsolda chiqaradi
      errFun(error);
      if (options.onError) {
        options.onError(error); // Agar qo'shimcha `onError` funksiyasi berilgan bo'lsa, uni chaqiradi
      }
    },
  });

export default useApi;
