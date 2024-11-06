import { CustomTable, ViolationsChart } from "@/track/components/shared";
import {
  CustomSelect,
  Drivers,
  Navbar,
  OverviewCard,
} from "@/track/components/ui";
import { getLocalStorage, setLocalStorage } from "../../utils/index";

import { useDispatch, useSelector } from "react-redux";
import { BiCalendarStar } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import { Radio } from "antd";
import {
  dashboardTableHeader,
  dataSource,
  Reload,
  companyTable,
  Text,
  companyTableElement,
  dateTable,
  dateTableElement,
  Main,
} from "@/track/constants";

import {
  ArrowIcon,
  CardWrapper,
  CustomBtn,
  Day,
  SelectWrapper,
  Title,
  CustomRadio,
} from "./dashboard-styled";
import { OrderTable } from "@/track/components/shared/order-table";
import { useEffect, useState } from "react";
import { RootState } from "@/store";
import { dashboardProgressActive } from "@/store/slices/booleans-slice";
import { autoRefresh } from "@/track/utils/method";
import { Flex } from "@/track/components/shared/drivers-header/drivers-header-styled";
import { Select } from "@/track/components/shared/select";
// import useApi from "../../hooks/useApi";
// import { dashboardData } from "../../utils/mapData";

export const refreshSelect = [
  { value: "off", label: "Auto Refresh off" },
  { value: 30000, label: "1 minute" },
  { value: 300000, label: "5 minute" },
  { value: 600000, label: "10 minute" },
];
export const Dashboard = () => {
  const active = useSelector(
    (state: RootState) => state.booleans.dashboardProgress
  );
  const sidebarActive = useSelector(
    (state: RootState) => state.booleans.sidebarActive
  );
  const [selectEvent, setSelectEvent] = useState<unknown>("order");
  const option = [
    { value: "status", label: "Two-factures" },
    { value: "active", label: "Actice" },
    { value: "completed", label: "Completed" },
  ];
  // const { data, isLoading } = useApi("/main/violations", {
  //   page: 1,
  //   limit: 10,
  // });
  // console.log(data);
  // const filerData = dashboardData(data ? data?.data?.data : []);
  // console.log(filerData);

  useEffect(() => {}, []);
  const dispatch = useDispatch();

  function onChange(event: unknown) {
    setSelectEvent(event);
  }
  const reloadStatus: number =
    getLocalStorage("autoReload") !== null
      ? Number(getLocalStorage("autoReload"))
      : 0;
  const refreshHandler = (e: number | string | unknown) => {
    let reload = e === 30000 ? 1 : e === 300000 ? 2 : e === 600000 ? 3 : 0;

    setLocalStorage("autoReload", reload);
    autoRefresh(e !== "off" ? Number(reload) : 0);
  };

  useEffect(() => {
    if (Boolean(reloadStatus)) {
      autoRefresh(reloadStatus);
    }
  }, []);
  return (
    <Main>
      <Navbar title="Dashboard" />
      <Day>
        <Flex $gap={"20px"}>
          <CustomBtn>
            <BiCalendarStar size={30} />
          </CustomBtn>
        </Flex>
        <Flex $gap={"5px"}>
          <Select
            option={refreshSelect}
            dValue={refreshSelect[0]}
            optionW="220px"
            font="600"
            w="170px"
            // placeholder="Auto Refresh off"
            // change={refreshHandler}
          />
        </Flex>
        <CustomBtn  onClick={Reload}>
          Refresh
        </CustomBtn>
      </Day>

      <CardWrapper $width={sidebarActive}>
        <Drivers />
        <ViolationsChart />
        <OverviewCard />
        <CustomBtn onClick={() => dispatch(dashboardProgressActive())}>
          <ArrowIcon $active={active}>
            <IoIosArrowDown />
          </ArrowIcon>
        </CustomBtn>
      </CardWrapper>

      <Title>Drivers info</Title>

      <SelectWrapper>
        <Radio.Group defaultValue={1}>
          <CustomRadio value={1}>
            <Text>Include</Text>
          </CustomRadio>
          <CustomRadio value={2}>
            <Text>Exclude</Text>
          </CustomRadio>
        </Radio.Group>
        <Flex $gap={"6px"} $align="end" $wrap={"wrap"}>
          <Select option={option} placeholder="Name" w="264px" clr="#5D5E5F" />
          <Select
            option={option}
            placeholder="Company"
            w="264px"
            clr="#5D5E5F"
          />
          <Select
            option={option}
            placeholder="Violations"
            w="264px"
            clr="#5D5E5F"
          />
          <Select option={option} placeholder="Date" w="264px" clr="#5D5E5F" />
          <Select
            option={option}
            placeholder="Eld connection"
            w="264px"
            clr="#5D5E5F"
          />
          <Select option={option} placeholder="Cycle" w="264px" clr="#5D5E5F" />

          <div>
            <Text size={12} $mb="10px">
              Driver option
            </Text>
            <Select
              option={option}
              placeholder="Cycle"
              w="264px"
              clr="#5D5E5F"
            />
          </div>
          <div>
            <Text size={12} $mb="10px">
              Driver option
            </Text>
            <Select
              clr="#5D5E5F"
              option={[
                { value: "order", label: "Order By" },
                { value: "company", label: "Company" },
                { value: "date", label: "Date" },
              ]}
              w={"126px"}
              placeholder="Order By"
              // change={onChange}
            />
          </div>
          <div>
            <Text size={12} $mb="20px"></Text>
            <Select
              clr="#5D5E5F"
              option={[{ value: "direction", label: "direction" }]}
              w={"126px"}
              placeholder="Direction"
            />
          </div>
        </Flex>
      </SelectWrapper>

      {selectEvent === "order" ? (
        <CustomTable columns={dashboardTableHeader} data={dataSource} />
      ) : (
        <OrderTable
          data={selectEvent === "company" ? companyTable : dateTable}
          element={
            selectEvent === "company" ? companyTableElement : dateTableElement
          }
          selectEvent={selectEvent}
        />
      )}
    </Main>
  );
};
