import { Flex } from "@/track/components/shared/drivers-header/drivers-header-styled";
import { Select } from "@/track/components/shared/select";
import { Box, Text } from "@/track/constants";
import { CalendarBox } from "./style";
import { CustomTable } from "@/track/components/shared";
import useApi from "@/hooks/useApi";
import moment from "moment";
const header = [
  {
    header: "No",
    accessor: "no",
    id: 1,
  },
  {
    header: "Driver name",
    accessor: "driverName",
    id: 2,
  },
  {
    header: "Edited by",
    accessor: "editedBy",
    id: 3,
  },
  {
    header: "Type",
    accessor: "type",
    id: 4,
  },
  {
    header: "Date",
    accessor: "date",
    id: 4,
  },
];
const dataTable = [
  {
    no: 1,
    driverName: "Jorge Martínez",
    editedBy: "Alex eld",
    type: "bulk - edit",
    date: "02-08-2024 06:00:00 pm",
  },
  {
    no: 2,
    driverName: "Zaire Chizimu",
    editedBy: "Alex eld",
    type: "direct-edit",
    date: "02-08-2024 01:47:00 pm",
  },
  {
    no: 3,
    driverName: "Aisyah Clara Riyanti ",
    editedBy: "Alex eld",
    type: "bulk - edit",
    date: "02-08-2024 09:21:05 pm",
  },
];

const historyMapData = (data: any[] | []) => {
  return data.map((item, i) => {
    return {
      no: i + 1,
      driverName: item?.driverFullName ? item?.driverFullName : "",
      editedBy: item?.userFullName ? item?.userFullName : "",
      type: item?.type,
      date: moment(item.date).format("DD-MM-YYYY hh:mm:ss A"),
    };
  });
};
export const Histories = () => {
  const { data, isLoading, refetch } = useApi("/history", {
    page: 1,
    limit: 10000,
  });
  const tableData = historyMapData(data ? data?.data?.data : []);
  console.log(tableData);

  return (
    <div>
      <Flex $justify="space-between" $align="center">
        <CalendarBox>
          <Flex $gap="0.625rem" $align="center">
            <img src="/assets/icons/calendar.svg" alt="" />
            <Flex $gap="0.313rem" $align="center">
              <Text color="#5D5E5F">20.15.2024</Text>
              <img src="/assets/icons/right-arrow.svg" alt="" />
              <Text color="#5D5E5F">20.15.2024</Text>
            </Flex>
          </Flex>
        </CalendarBox>
        <Flex $gap="5px">
          <Select
            option={[]}
            placeholder="Search driver"
            w="235px"
            clr="#5D5E5F"
          />
          <Select
            option={[]}
            placeholder="Search type"
            w="235px"
            clr="#5D5E5F"
          />
          <Select
            option={[]}
            placeholder="Search driver"
            w="235px"
            clr="#5D5E5F"
          />
        </Flex>
      </Flex>
      <CustomTable
        columns={header}
        data={tableData}
        fontId={2}
        font="600"
        isLoading={isLoading}
      />
    </div>
  );
};
