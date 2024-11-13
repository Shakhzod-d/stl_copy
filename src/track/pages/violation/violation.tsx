import useApi from "@/hooks/useApi";
import { CustomTable } from "../../components/shared";
import { TimeContainer } from "../../components/ui";
import { violationTabHeader } from "../../utils/constants";
import { violationsPageData } from "@/track/utils/mapData";
import {  useState } from "react";

export function Violation() {
  function getUnixTimestamp(date: Date): number {
    return Math.floor(date.getTime() / 1000);
  }

  const today = new Date();

  const [day, setDay] = useState(getUnixTimestamp(today));

  const { data, isLoading } = useApi(`/violations?date=${day}`, {
    page: 1,
    limit: 1000,
  });
  const filterData = violationsPageData(data?.data ? data.data : []);

  return (
    <>
      <TimeContainer setUnix={setDay} />
      <CustomTable
        columns={violationTabHeader}
        data={filterData}
        isLoading={isLoading}
      />
    </>
  );
}
