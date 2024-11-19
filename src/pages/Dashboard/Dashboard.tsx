import {
  CustomTable,
  TimePickerModal,
  ViolationsChart,
} from "@/track/components/shared";
import { Drivers, Navbar, OverviewCard } from "@/track/components/ui";
import { getLocalStorage, setLocalStorage } from "../../utils/index";
import { useDispatch, useSelector } from "react-redux";
import { BiCalendarStar } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import { Radio } from "antd";
import {
  dashboardTableHeader,
  Reload,
  companyTable,
  Text,
  companyTableElement,
  dateTable,
  dateTableElement,
  Main,
  refreshSelect,
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
import { useCallback, useEffect, useState } from "react";
import { RootState } from "@/store";
import { dashboardProgressActive } from "@/store/slices/booleans-slice";
import { autoRefresh } from "@/track/utils/method";
import { Flex } from "@/track/components/shared/drivers-header/drivers-header-styled";
import { Select } from "@/track/components/shared/select";
import { dashboardData } from "@/track/utils/mapData";
import useApi from "@/hooks/useApi";

export const Dashboard = () => {
  const [open, setOpen] = useState(false);
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
  const { data, isLoading } = useApi("/main/violations", {
    page: 1,
    limit: 1000,
  });

  const filerData = dashboardData(data ? data?.data?.data : []);

  const dispatch = useDispatch();

  function onChange(event: unknown) {
    // console.log(event);

    setSelectEvent(event);
  }

  const reloadStatus: number =
    getLocalStorage("autoReload") !== null
      ? Number(getLocalStorage("autoReload"))
      : 0;
  const refreshHandler = useCallback((e: number | string | unknown) => {
    let reload = e === 30000 ? 1 : e === 300000 ? 2 : e === 600000 ? 3 : 0;

    setLocalStorage("autoReload", reload);
    autoRefresh(e !== "off" ? Number(reload) : 0);
  }, []);

  useEffect(() => {
    if (Boolean(reloadStatus)) {
      autoRefresh(reloadStatus);
    }
  }, []);
  const refreshDefault = refreshSelect[reloadStatus];
  return (
    <Main>
      <Navbar title="Dashboard" />
      <Day>
        <Flex $gap={"20px"} style={{ position: "relative" }}>
          {open && <TimePickerModal setOpen={setOpen} /> }
          <CustomBtn>
            <BiCalendarStar size={30} onClick={() => setOpen(true)} />
          </CustomBtn>
        </Flex>
        <Flex $gap={"5px"}>
          <Select
            option={refreshSelect}
            dValue={refreshDefault}
            onChange={refreshHandler}
            optionW="200px"
            font="600"
            w="200px"
            // placeholder="Auto Refresh off"
            // change={refreshHandler}
          />
        </Flex>
        <CustomBtn onClick={Reload}>Refresh</CustomBtn>
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
        <Flex $gap={"6px"} $w="100%" $align="end">
          <Select option={option} placeholder="Name" clr="#5D5E5F" w="100%" />
          <Select
            option={option}
            placeholder="Company"
            clr="#5D5E5F"
            w="100%"
          />
          <Select
            option={option}
            placeholder="Violations"
            clr="#5D5E5F"
            w="100%"
          />
          <Select option={option} placeholder="Date" clr="#5D5E5F" w="100%" />
          <Select
            option={option}
            placeholder="Eld connection"
            clr="#5D5E5F"
            w="100%"
          />
          <Select option={option} placeholder="Cycle" clr="#5D5E5F" />

          <div style={{ width: "100%" }}>
            <Text size={12} $mb="3px">
              Driver option
            </Text>
            <Select
              option={option}
              placeholder="Cycle"
              w="100%"
              clr="#5D5E5F"
            />
          </div>
          <div style={{ width: "100%" }}>
            <Text size={12} $mb="3px">
              Driver option
            </Text>
            <Select
              w="100%"
              clr="#5D5E5F"
              option={[
                { value: "order", label: "Order By" },
                { value: "company", label: "Company" },
                { value: "date", label: "Date" },
              ]}
              placeholder="Order By"
              onChange={onChange}
            />
          </div>
          <div style={{ width: "100%" }}>
            <Text size={12} $mb="20px"></Text>
            <Select
              clr="#5D5E5F"
              option={[{ value: "direction", label: "direction" }]}
              w={"100%"}
              placeholder="Direction"
            />
          </div>
        </Flex>
      </SelectWrapper>

      {selectEvent === "order" ? (
        <CustomTable
          columns={dashboardTableHeader}
          data={filerData}
          isLoading={isLoading}
        />
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
