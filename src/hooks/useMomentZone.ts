import { useMemo } from "react";
import useAppSelector from "./useAppSelector";
import moment, { MomentInput } from "moment-timezone";
import { getLocalStorage } from "@/utils";
import { issue_stats } from "@/constants";

const useMomentZone = () => {
    const { companies } = useAppSelector(({ auth }) => auth);
    const momentZone = useMemo(() => {
        const companyId = getLocalStorage("companyId");
        if (companies?.length) {
            const company = companies.find((el) => el._id === companyId);
            const zone = issue_stats.find(
                (el) => el.label === company?.homeTerminalTimezone
            );
            return (input?: MomentInput | null) =>
                moment(input).tz(zone?.value as string);
        }
        return (input?: MomentInput | null) => moment(input);
    }, [companies]);

    return momentZone;
};

export default useMomentZone;
