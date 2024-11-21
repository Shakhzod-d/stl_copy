import { Flex } from "@/track/components/shared/drivers-header/drivers-header-styled";
import { CustomTable } from "../../components/shared";

import { Box, LogsDataHeader, SmallBox } from "../../utils/constants";

import { useState } from "react";

import useApi from "@/hooks/useApi";
import { CustomSelect } from "@/track/components/shared/custom-select";
import { CustomRangePicker } from "@/components/elements/RangePicker/RangePicker";
import { companyDrivers, LogsByDriverMap } from "@/track/utils/mapData";

export function LogsLog() {
  const [rangeDate, setRangeDate] = useState<any[]>();
  const [drId, setDrId] = useState("");
  const { data: drivers } = useApi("/drivers", {
    page: 1,
    limit: 1000,
  });
  const driver = companyDrivers(drivers ? drivers?.data?.data : []);

  const { data: drData,isLoading } = useApi("/logs/bydriver", {
    from: rangeDate ? rangeDate[0].unix() : 0,
    to: rangeDate ? rangeDate[1].unix() : 0,
    driver: drId,
  });
  // console.log(drData);

  const change = (e: any) => {
    setDrId(e.driverId);
  };
  const filterData = LogsByDriverMap(drData?.data.data ? drData.data.data : []);
  console.log(filterData);

  return (
    <>
      <Flex $align="center" $justify="space-between">
        <Flex $gap={"8px"}>
          <CustomRangePicker onChange={setRangeDate} value={rangeDate} />
          {/* <Box>02-14-2024 → 03-11-2024</Box> */}

          <CustomSelect
            option={driver.LogsByDriver}
            dValue={{ driver: "Driver", driverId: "" }}
            onChange={change}
          />
        </Flex>
        <Flex $gap={"8px"}>
          <Flex $gap={"2px"}>
            <Box>Violation</Box>
            <SmallBox style={{ rotate: "180deg" }}></SmallBox>
          </Flex>
          <Flex $gap={"2px"}>
            <Box>Warnings</Box>
            <SmallBox style={{ rotate: "180deg" }}></SmallBox>
          </Flex>
          <Box>Search</Box>
        </Flex>
      </Flex>

      <CustomTable columns={LogsDataHeader} data={filterData} isLoading={isLoading}/>
    </>
  );
}
