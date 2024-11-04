
import useMomentZone from "@/hooks/useMomentZone";

import { historyPush, setLocalStorage } from "@/utils";
import moment from "moment-timezone";
import React  from "react";
import {
  NumberParam,
  StringParam,
  useQueryParam,
  withDefault,
} from "use-query-params";
import { useDriversData } from "./services/useDriversData";

import { PageLoad, TimeContainer } from "@/track/components/ui";
import { CustomTable } from "@/track/components/shared";
import {  LogsDriverDataHeader } from "@/track/constants";
import { useWeekData } from "@/track/hooks/use-data-piker";
import { useDispatch } from "react-redux";
import { WeekData } from "@/track/components/shared/drivers-header/drivers-header";
import { setWeekData } from "@/store/slices/company-slice";

const LogDrivers: React.FC = () => {
  const momentZone = useMomentZone();
  const dispatch = useDispatch();


  const [location,] = useQueryParam(
    "location",
    withDefault(StringParam, undefined)
  );
  const [search,] = useQueryParam(
    "name",
    withDefault(StringParam, undefined)
  );
  const [time, ] = useQueryParam(
    "time",
    withDefault(NumberParam, momentZone().startOf("day").valueOf())
  );

  const {  isLoading, tableData, } =
    useDriversData({
      search,
      location,
      time,
    });



  const date = moment(time).format("LLLL");
  const weekData: WeekData[] = useWeekData(date);

  const driversInfoHandler = (id: string) => {
    setLocalStorage("driverId", id);
    historyPush(`inner/${id}?time=${time}`);
    dispatch(setWeekData(weekData));
  };

  return (
    <>
      <TimeContainer />
      {isLoading ? (
        <PageLoad h="90%" />
      ) : (
        <CustomTable
          columns={LogsDriverDataHeader}
          data={tableData ? tableData : []}
          onClick={driversInfoHandler}
        />
      )}
    </>
  );
};

export default LogDrivers;
