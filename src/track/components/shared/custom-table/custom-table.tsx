import { TablePopup } from "../../ui/table-popup";
import {
  BorderLBottom,
  BorderLTop,
  BorderRBottom,
  BorderRTop,
  HoverBox,
  StatusBadge,
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
// import { RootState } from "../../../store/store";

// import { successMessage } from "../../../utils/message";
type CustomObject = Record<string, string | number | JSX.Element>;

interface TableColumn {
  header: string | JSX.Element;
  accessor: string;
  id?: string | number;
}

interface TableProps {
  columns: TableColumn[];
  data: CustomObject[];
  itemColor?: string;
  colorId?: number | string;
  onClick?: (id: string) => void;
  copyId?: number;
  pagination?: true | false;
  pTotal?: number;
}

const status = ["sb", "off", "dr", "on"];
export const CustomTable = (props: TableProps) => {
  const { columns, data, onClick, copyId = 0, pagination, pTotal } = props;
  const [PopupActive, setPopupActive] = useState<
    number | null | string | undefined
  >(null);

  function tableDataHandler<T>(id: string, text?: T): void {
    console.log(id);

    if (onClick) {
      onClick(id);
    }
    if (text == "dots") {
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
    if (index == PopupActive) {
      setPopupActive(null);
    } else {
      setPopupActive(index);
    }
  }
  function colorFun<T>(text: T, title: T): string {
    let color: string = dark ? "#f9f9f9" : "#000";

    if (title == "updated" || title == "location_date") return "#3DA8D5";
    if (title == "warnings" || title == "error") return "red";

    switch (text) {
      case "connected":
        color = "#32BE61";
        break;
      case "not connected":
        color = "red";
        break;
      case "form & signature":
        color = "#FC973A";
        break;
      case "violation":
        color = "red";
        break;
      default:
        color = dark ? "#f9f9f9" : "#000";
        break;
    }
    // if (dark) return "white";
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
                      column.accessor.toLowerCase() == "warnings"
                        ? "table_hover_elm"
                        : ""
                    }
                    key={column.accessor}
                    color={colorFun(
                      row[column?.accessor]?.valueOf().toString().toLowerCase(),
                      column.accessor.toLowerCase()
                    )}
                    onClick={() => tableDataHandler(ID, column.accessor)}
                  >
                    {index == 0 && (
                      <>
                        <BorderLBottom></BorderLBottom>
                        <BorderLTop></BorderLTop>
                      </>
                    )}
                    {column.accessor.toLowerCase() == "warnings" && (
                      <HoverBox className="hover_container">
                        <Text $font="600">1. Shift limit</Text>
                        <Text $font="600">2. Cycle limit</Text>
                        <Text $font="600">3. No signature</Text>
                      </HoverBox>
                    )}
                    {columns.length - 1 == index && (
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
                    {PopupActive == row.id && column.accessor == "dots" ? (
                      <TablePopup />
                    ) : (
                      ""
                    )}
                    {copyId == column.id ? (
                      <GoCopy
                        style={{ marginLeft: "20px " }}
                        onClick={() => handleCopy(String(row[column.accessor]))}
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
      {pagination && <Pagination total={pTotal} defaultCurrent={1} />}
    </TableContainer>
  );
};
