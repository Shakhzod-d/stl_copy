import { useState } from "react";
import { PrimaryBtn, TopContainer } from "./units-styled";

import { Main, unitsButtons, unitsColumns } from "../../utils/index";
import { Navbar, PageLoad } from "../../components/ui";

import { CustomTable } from "../../components/shared";
// import { UnitsAddModal } from "../../components/shared/units-add-modal"; //modal

import { ObjType } from "../../types/helper.type";
import { SelectData } from "../../types";
import { DriversSelectId } from "../../utils/dispatch";
import { Text } from "../../utils/constants";
import { Flex } from "@/track/components/shared/drivers-header/drivers-header-styled";
import { TransparentButton } from "@/track/constants";
import useApi from "@/hooks/useApi";
import { UnitsAddModal } from "./modals/units-add-modal";
export const Units = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [activeBtn, setActiveBtn] = useState<number>(1);

  const { data, isLoading, refetch } = useApi("/vehicles", {
    page: 1,
    limit: 1000,
  });

  interface unitsProp {
    id: number | string;
    vehicle: { [key: string]: string | number | undefined };
    drivers: string;
    model: string;
    eld: string;
    notes: { [key: string]: string | number | undefined };
    vin: { [key: string]: string | number | undefined };
    documents: string;
    activated: string;
  }

  const dataSort = (dataArr: ObjType[] | []) => {
    const arr: unitsProp[] = dataArr.map((item, i) => {
      const firstName = item?.driver.firstName;
      const lastNama = item?.driver.lastName;

      const modelMake = ` ${item.model}/ ${item.make}`;
      return {
        id: i,
        vehicle: item.unit,
        drivers: `${firstName} ${lastNama}`,
        model: modelMake,
        eld: "PT30_09A3",
        notes: item.notes,
        vin: item.vin,
        documents: "2024-03-02",
        activated: "",
      };
    });
    const select: SelectData[] = dataArr.map((item) => {
      const firstName = item?.model;
      const lastNama = item?.make;

      return {
        value: item._id,
        label: `${firstName} ${lastNama}`,
      };
    });
    console.log(select);

    return { arr, select };
  };

  // const unitsData = dataSort(data ? data.data?.data : []);

  // DriversSelectId(unitsData.select);
  return (
    <Main>
      <Navbar title={"Units"} />
      <TopContainer>
        <PrimaryBtn onClick={() => setOpen(true)}>Add new vehicle</PrimaryBtn>
      </TopContainer>
      <Flex $gap={"10px"}>
        {unitsButtons.map((item) => (
          <TransparentButton
            key={item.id}
            active={(activeBtn == item.id).toString()}
            onClick={() => setActiveBtn(item.id)}
          >
            {item.text}
          </TransparentButton>
        ))}
      </Flex>

      {/* Units table data */}
      {isLoading ? (
        <PageLoad h="calc(100vh - 400px)" />
      ) : [].length === 0 ? (
        <CustomTable columns={unitsColumns} data={[]} />
      ) : (
        <>
          <CustomTable columns={unitsColumns} data={[{}]} />
          <Text size={20}>NO Data</Text>
        </>
      )}
      <UnitsAddModal open={open} setOpen={setOpen} refetch={refetch} />
      {/* Units change modal */}
    </Main>
  );
};
