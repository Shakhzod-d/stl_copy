import { useState } from "react";
import {
  TableContainer,
  Column,
  Div,
  Department,
  Container,
  Text,
} from "./order-styled";
import { IoIosArrowUp } from "react-icons/io";
import { Obj } from "@/track/types/helper.type";
const Company = [
  { title: "Company" },
  { title: "Name" },
  { title: "Violations" },
  { title: "Date" },
  { title: "Eld connection" },
  { title: "Cycle" },
  { title: "Updated" },
];
const Data = [
  { title: "Date" },
  { title: "Name" },
  { title: "Violations" },
  { title: "Company" },
  { title: "Eld connection" },
  { title: "Cycle" },
  { title: "Updated" },
];

interface TableProps {
  data: Obj[];
  element: Obj[];
  selectEvent?: unknown;
}

export const OrderTable = (props: TableProps) => {
  const [column, setColumn] = useState<boolean>(true);
  const [columnAnimate, setColumnAnimate] = useState<boolean>(true);
  const { data, selectEvent, element } = props;
  return (
    <TableContainer>
      <Column>
        {(selectEvent == "company" ? Company : Data).map((items, i) => {
          return (
            <p key={i} style={{ margin: "auto" }}>
              {items.title}
            </p>
          );
        })}
      </Column>
      <Container>
        <Div>
          <Department>
            <p>{data[0].company || String(selectEvent)}</p>
            <IoIosArrowUp
              style={{ cursor: "pointer", rotate: column ? "180deg" : "" }}
              onClick={() => {
                setColumn(!column);
              }}
            />
          </Department>
          {data.map((items, i) => {
            return (
              <Column key={i} display={column ? "grid" : "none"}>
                <Text>{items.company}</Text>
                <Text>{items.name}</Text>
                <Text color="#FC973A">{items.violations}</Text>
                <Text>{items.date}</Text>
                <Text color="#32BE61">{items.connection}</Text>
                <Text>{items.cycle}</Text>
                <Text color="#3DA8D5">{items.update}</Text>
              </Column>
            );
          })}
        </Div>

        <Div>
          <Department>
            <p>{element[0].company || String(selectEvent)}</p>
            <IoIosArrowUp
              style={{
                cursor: "pointer",
                rotate: columnAnimate ? "180deg" : "",
              }}
              onClick={() => {
                setColumnAnimate(!columnAnimate);
              }}
            />
          </Department>
          {element.map((items, i) => {
            return (
              <Column key={i} display={columnAnimate ? "grid" : "none"}>
                <Text>{items.company}</Text>
                <Text>{items.name}</Text>
                <Text color="#FC973A">{items.violations}</Text>
                <Text>{items.date}</Text>
                <Text color="#32BE61">{items.connection}</Text>
                <Text>{items.cycle}</Text>
                <Text color="#3DA8D5">{items.update}</Text>
              </Column>
            );
          })}
        </Div>
      </Container>
    </TableContainer>
  );
};
