import useApiMutation from "@/hooks/useApiMutation";
import { errorMessage } from "@/utils";

export const useEditDailyLog = (onSuccess?: (props: any) => void) => {
    const { mutate, isLoading: editLogsLoading } = useApiMutation("/logs");
    const editLogsMutation = (formData: any) => {
        mutate(formData, {
            onSuccess: (data) => onSuccess?.(data),
            onError: (err: any) => errorMessage(err?.data.message),
        });
    };
    return { editLogsMutation, editLogsLoading };
};
