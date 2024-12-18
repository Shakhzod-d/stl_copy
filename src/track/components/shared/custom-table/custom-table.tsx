import { TablePopup } from "../../ui/table-popup";
import {
  BorderLBottom,
  BorderLTop,
  BorderRBottom,
  BorderRTop,
  HoverBox,
  NoData,
  NotFound,
  StatusBadge,
  StyledPagination,
  TableContainer,
  TableData,
  TableElement,
  TableHeader,
  TableRow,
} from "./custom-styled";

import { GoCopy } from "react-icons/go";

import { Text } from "@/track/constants";
import { message, Pagination } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { BsClipboardData } from "react-icons/bs";

export type CustomObject = Record<string, string | number | JSX.Element>;

interface TableColumn {
  header: string | JSX.Element;
  accessor: string;
  id?: string | number;
}

interface TableProps {
  columns: TableColumn[];
  data: any[];
  itemColor?: { id: number; clr: string }[];
  colorId?: number[];
  onClick?: (id: string) => void;
  copyId?: number;
  pagination?: true | false;
  pTotal?: number;
  font?: string;
  fontId?: number;
  isLoading?: boolean;
}

const status = ["sb", "off", "dr", "on"];
export const CustomTable = (props: TableProps) => {
  const {
    columns,
    data,
    onClick,
    copyId = 0,
    pagination,
    pTotal,
    font,
    fontId,
    isLoading,
    itemColor,
    colorId,
  } = props;
  const [PopupActive, setPopupActive] = useState<
    number | null | string | undefined
  >(null);

  function tableDataHandler<T>(id: string, text?: T): void {
    if (onClick) {
      onClick(id);
    }
    if (text === "dots") {
      PopupOpen(id);
    }
  }
  const [messageApi, contextHolder] = message.useMessage();
  const successMessage = (message: string) => {
    messageApi.open({
      type: "success",
      content: message,
    });
  };
  const dark = useSelector((state: RootState) => state.booleans.darkMode);

  function PopupOpen<T extends number | null | string | undefined>(index: T) {
    console.log(index);
    if (index === PopupActive) {
      setPopupActive(null);
    } else {
      setPopupActive(index);
    }
  }
  function colorFun<T>(text: T, title: T, id: T): string {
    let color: string = dark ? "#f9f9f9" : "#000";

    if (title === "updated" || title === "location_date") return "#3DA8D5";
    if (title === "warnings" || title === "error" || title === "violations")
      return "#FF6F61";

    switch (text) {
      case "connected":
        color = "#32BE61";
        break;
      case "not connected":
        color = "#FF6F61";
        break;
      case "No Signature!":
        color = "#FC973A";
        break;
      case "No Form":
        color = "red";
        break;
      default:
        color = dark ? "#f9f9f9" : "#000";
        break;
    }
    itemColor &&
      itemColor.map((item) => {
        if (item.id === id) {
          color = item.clr;
        }
      });

    return color;
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      successMessage("copy added");
    });
  };

  return (
    <TableContainer>
      {contextHolder}
      <TableElement>
        <thead>
          <tr>
            {columns.map((column) => (
              <TableHeader key={column.accessor}>{column.header}</TableHeader>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, element) => {
            const ID = row.id as string;

            return (
              <TableRow key={element}>
                {columns.map((column, index) => (
                  <TableData
                    className={
                      column.accessor.toLowerCase() === "warnings"
                        ? "table_hover_elm"
                        : ""
                    }
                    $font={fontId === column.id ? font : ""}
                    key={column.accessor}
                    color={colorFun(
                      row[column?.accessor]?.valueOf().toString().toLowerCase(),
                      column.accessor.toLowerCase(),
                      column.id
                    )}
                    onClick={() => tableDataHandler(ID, column.accessor)}
                  >
                    {index === 0 && (
                      <>
                        <BorderLBottom></BorderLBottom>
                        <BorderLTop></BorderLTop>
                      </>
                    )}
                    {column.accessor.toLowerCase() === "warnings" && (
                      <HoverBox className="hover_container">
                        <Text $font="600">1. Shift limit</Text>
                        <Text $font="600">2. Cycle limit</Text>
                        <Text $font="600">3. No signature</Text>
                      </HoverBox>
                    )}
                    {columns.length - 1 === index && (
                      <>
                        <BorderRTop></BorderRTop>
                        <BorderRBottom></BorderRBottom>
                      </>
                    )}
                    {status.includes(
                      String(row[column?.accessor]).toLowerCase()
                    ) ? (
                      <StatusBadge $status={row[column?.accessor]}>
                        {row[column.accessor]}
                      </StatusBadge>
                    ) : (
                      row[column.accessor]
                    )}
                    {PopupActive === row.id && column.accessor === "dots" ? (
                      <TablePopup />
                    ) : (
                      ""
                    )}
                    {copyId === column.id ? (
                      <GoCopy
                        style={{ marginLeft: "20px " }}
                        onClick={() =>
                          handleCopy(`(${row["lat"]},${row["lng"]})`)
                        }
                      />
                    ) : (
                      ""
                    )}
                  </TableData>
                ))}
              </TableRow>
            );
          })}
        </tbody>
      </TableElement>
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
      {pagination && <StyledPagination total={50} defaultCurrent={1}  style={{color:"red"}}/>}
    </TableContainer>
  );
};
