import { CompanyData, InfoTableData, UserData } from "@/track/types";
import { Flex } from "../drivers-header/drivers-header-styled";
import { Card, CardsTop, CustomFlex } from "./info-table-styled";

import { Text } from "@/track/constants";

interface Header {
  header: string;
  accessor: string;
}

interface Prop<T> {
  header: Header[];
  data: InfoTableData[];
  editData?: (id: string) => void;
  onClick?: (id: string) => void;
}

interface TableData {
  id: number | string;
  icon?: JSX.Element | string | null;
  text: string;
}

interface RowData {
  label?: string;
  img?: string;
  data?: TableData[];
}

export const InfoTable = ({
  header,
  data,
  editData,
  onClick,
}: Prop<CompanyData | UserData>) => {
  const edit = (id: string, event: React.MouseEvent) => {
    // Stops event propagation when Edit button is clicked
    event.stopPropagation();
    editData?.(id);
  };

  return (
    <>
      <CardsTop>
        {header.map((item, i) => (
          <p key={i}>{item.header}</p>
        ))}
      </CardsTop>

      {data.map((item, i) => (
        <Card key={i} onClick={() => onClick?.(String(item.id))}>
          {header.map((row, ind) => {
            const HeaderKey: string = row.accessor;
            const rowData = item[HeaderKey] as RowData;

            return (
              <div key={ind}>
                <Flex $gap="8px" $align="center">
                  {rowData?.img && <img src={rowData.img} alt="" />}
                  <Text
                    color={
                      rowData?.label === "Active"
                        ? "#32BE61"
                        : rowData?.label === "Edit"
                        ? "#FC973A"
                        : undefined
                    }
                    $mb="5px"
                    size={ind === 0 ? 20 : 16}
                    onClick={(e) =>
                      rowData?.label === "Edit"
                        ? edit(String(item.id), e)
                        : undefined
                    }
                  >
                    {rowData?.label || ""}
                  </Text>
                </Flex>

                <CustomFlex style={{ marginLeft: ind === 0 ? "40px" : "" }}>
                  {rowData?.data?.map((c) => (
                    <Flex $gap="8px" key={c.id} $align="center">
                      {c.icon && c.icon}
                      <Text
                        $font="400"
                        size={14}
                        color={c.text === "Active" ? "red" : undefined}
                      >
                        {c.text}
                      </Text>
                    </Flex>
                  ))}
                </CustomFlex>
              </div>
            );
          })}
        </Card>
      ))}
    </>
  );
};
