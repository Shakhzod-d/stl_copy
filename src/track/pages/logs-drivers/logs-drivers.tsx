import { CustomTable } from "../../components/shared";
import { PageLoad, TimeContainer } from "../../components/ui";
import { LogsDriverDataHeader } from "../../utils/constants";

import { setLocalStorage } from "../../utils";
import useApi from "@/hooks/useApi";
import { historyPush } from "@/utils";
import { companyDrivers } from "@/track/utils/mapData";

export function LogsDrivers() {
  const { data, isLoading } = useApi("/drivers", {
    page: 1,
    limit: 1000,
  });
  console.log(data);

  const driversData = companyDrivers(data ? data.data.data : []);
  // console.log(driversData);

  const driversInfoHandler = (id: string) => {
    setLocalStorage("driverId", id);
    historyPush(`inner/${id}`);
  };

  return (
    <>
      <TimeContainer />
      {isLoading ? (
        <PageLoad h="90%" />
      ) : (
        <CustomTable
          columns={LogsDriverDataHeader}
          data={driversData ? driversData.logDrivers : []}
          onClick={driversInfoHandler}
        />
      )}
    </>
  );
}
