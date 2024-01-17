import { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import qs from "query-string";
import { ISetState } from "@/types";

export const useQueryParams = <S = any>(params: string, initialState: S) => {
    const history = useHistory();
    const { search } = useLocation();
    const [queryState, setQueryState] = useState<S>(initialState);
    const [isMounted, setIsMounded] = useState(false);
    useEffect(() => {
        const queryObj: any = qs.parse(search);
        if (isMounted) {
            if (queryState) {
                queryObj[params] = queryState;
            } else {
                delete queryObj[params];
            }
            const stringified = qs.stringify(queryObj);
            history.push({ search: stringified });
        } else {
            if (queryObj[params]) {
                setQueryState(queryObj[params]);
            }
            setIsMounded(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, queryState]);

    return [queryState, setQueryState] as [S, ISetState<S>];
};
