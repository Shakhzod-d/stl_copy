import { mapTableData } from "@/utils";
import { useMemo } from "react";

const useParseData = <T>(data: any, isPaging: boolean = true) => {
    // Map vehicles data to table
    const tableData: T[] = useMemo(() => {
        if (data) {
            const current = isPaging ? data?.data.data : data?.data;
            return mapTableData(current);
        }
        return [];
    }, [data]);

    // get total page
    const totalPage = useMemo(() => {
        return (isPaging && data?.data.total) || 0;
    }, [data]);

    return { tableData, totalPage };
};

export default useParseData;
