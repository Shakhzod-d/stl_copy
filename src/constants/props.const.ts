import { UseFormProps } from "react-hook-form";
import { QueryClient } from "react-query";

const formProps: UseFormProps<any> = {
    mode: "onSubmit",
};

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            keepPreviousData: true,
            cacheTime: 1000 * 60 * 3, // 3 minute
            retry: false,
            suspense: false,
        },
    },
});

export { formProps, queryClient };
