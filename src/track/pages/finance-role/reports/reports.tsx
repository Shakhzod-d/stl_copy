import { RangePicker } from "@/track/components/shared/data-picker/range-picker";
import { Flex } from "@/track/components/shared/drivers-header/drivers-header-styled";
import { CustomInput, Navbar } from "@/track/components/ui";
import { Main } from "@/track/constants";
import moment, { Moment } from "moment";
import { PrimaryBtn } from "../../units/units-styled";
import { CustomTable } from "@/track/components/shared";
import { useState } from "react";
import { DownloadReport } from "./_components/download-report";
export const FinanceReports = () => {
  const [open, setOpen] = useState(false);
  return (
    <Main>
      <DownloadReport open={open} setOpen={setOpen} />
      <Navbar title="Reports" search={false} />
      <Flex $justify="end">
        <CustomInput type="search" />
      </Flex>
      <Flex $justify="space-between" $m="20px 0 0 0">
        <RangePicker dValue={defaultRange} format="DD.MM.YYYY" />
        <PrimaryBtn height="54px" onClick={() => setOpen(true)}>
          Download report
        </PrimaryBtn>
      </Flex>
      <CustomTable
        columns={tableHeader}
        data={tableData}
        itemColor={[{ id: 2, clr: "#6298EF" }]}
      />
    </Main>
  );
};

const defaultRange: [Moment, Moment] = [
  moment("2024-01-01"),
  moment("2024-12-31"),
];
const tableHeader = [
  { header: "Created time", accessor: "time", id: 1 },
  { header: "Download", accessor: "download", id: 2 },
];
const tableData = [
  { time: "2023-10-01 - 2023-12-31", download: "Download ageing" },
];
