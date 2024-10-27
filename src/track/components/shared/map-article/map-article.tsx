import { ArticleProps } from "../../../types";

import { useState } from "react";

import {
  CardArticle,
  Between,
  Title,
  Card,
  TruckNum,
  Status,
  Description,
} from "./article-styled";
import { Box, SmallBox } from "../../../constants";
import { Flex } from "../../ui/time-container/time-styled";

import { CustomInput } from "../../ui";
interface Props {
  data: ArticleProps[];
  search?: true | false;
  width: string;
  active?: number;
  setActive: (e: number) => void;
}

export const MapArticle = ({
  data,
  search = false,

  setActive,
  active,
}: Props) => {
  const [dataValue, setDataValue] = useState(data);

  const searchData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;

    const filter = data.filter((item) =>
      item.title.toLocaleLowerCase().includes(term.toLocaleLowerCase())
    );

    setDataValue(filter);
  };
  return (
    <CardArticle>
      <CustomInput
        type="search"
        width="100%"
        margin="0 0 10px 0"
        change={searchData}
      />
      {search || (
        <Flex>
          {" "}
          <Box></Box>
          <SmallBox></SmallBox>
        </Flex>
      )}
      {dataValue.map((item: ArticleProps) => (
        <Card
          key={item.id}
          $color={active == item.id}
          onClick={() => setActive(item.id)}
        >
          <Between>
            <div>
              <Title>{item.title}</Title>
              <TruckNum>{item.text}</TruckNum>
            </div>
            <Status $statusBg={item.status}>{item.status}</Status>
          </Between>
          <Description>
            {item.desc}
            <p>{item?.time}</p>
          </Description>
        </Card>
      ))}
    </CardArticle>
  );
};
