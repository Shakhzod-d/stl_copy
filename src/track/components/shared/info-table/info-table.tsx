import { CompanyData, InfoTableData, UserData } from "@/track/types";
import { Flex } from "../drivers-header/drivers-header-styled";
import { Card, CardsTop, CustomFlex, Img } from "./info-table-styled";

import { Text } from "@/track/constants";
import { NoData, NotFound } from "../custom-table/custom-styled";
import { BsClipboardData } from "react-icons/bs";

interface Header {
  header: string;
  accessor: string;
}

interface Prop<T> {
  header: Header[];
  data: any[] | [];
  editData?: (id: string) => void;
  onClick?: (id: string) => void;
  isLoading?: boolean;
}

interface TableData {
  id: number | string;
  icon?: JSX.Element | string | null;
  text: string;
  type: string;
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
  isLoading,
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
                  {rowData?.img && <Img src={rowData.img} alt="" />}
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
                        color={
                          c.type === "company"
                            ? "#8C8C9B"
                            : c.type === "contact"
                            ? "#5D5E5F"
                            : "undefined"
                        }
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
      {data.length === 0 && (
        <NoData>
          {isLoading && <img src="/assets/icons/load.svg" alt="" width={100} />}
          {!isLoading && (
            <NotFound>
              <BsClipboardData size={30} />
              <Text size={30}>No Data</Text>
            </NotFound>
          )}
        </NoData>
      )}
    </>
  );
};
