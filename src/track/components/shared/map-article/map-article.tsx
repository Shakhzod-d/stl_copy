import { ArticleProps } from "../../../types";

import { useState } from "react";

import {
  CardArticle,
  Between,
  Title,
  Card,
  Status,
  Dots,
} from "./article-styled";
import { Box, SmallBox } from "../../../constants";

import { CustomInput, PageLoad } from "../../ui";
import { Flex } from "../drivers-header/drivers-header-styled";
import { Text } from "@/track/utils/constants";
import { useDebounce } from "@/track/hooks/use-debauce";
interface Props {
  data: ArticleProps[];
  search?: true | false;
  width: string;
  active?: number;
  setActive: (e: number) => void;
  loading: boolean;
}

export const MapArticle = ({
  data,
  search = false,
  loading,
  setActive,
  active,
}: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const searchValue = useDebounce(searchTerm, 300);

  const filterData = data.filter(
    (item) => item.title.toLowerCase().startsWith(searchValue.toLowerCase())
  );
  return (
    <CardArticle>
      <CustomInput
        type="search"
        width="100%"
        margin="0 0 10px 0"
        placeholder="Search driver by name"
        change={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchTerm(e.target.value)
        }
        clear
      />
      {search || (
        <Flex>
          {" "}
          <Box></Box>
          <SmallBox></SmallBox>
        </Flex>
      )}

      {!loading ? (
        filterData.map((item: ArticleProps) => (
          <Card
            key={item.id}
            $color={active === item.id}
            onClick={() => setActive(item.id)}
          >
            <Between>
              <div>
                <Title>{item.title} (Unit 2021)</Title>
              </div>
              <Status $statusBg={item.status}>{item.status}</Status>
            </Between>
            <Flex $gap="5px" $align="center" $m="0 0 15px 0">
              <img src="/assets/icons/map_pin.svg" alt="pin" />
              <Text color="#5D5E5F" size={12} $font="500">
                {item.text}
              </Text>
              <Flex $gap="5px" $align="center" $m="0 0 0 5px">
                <img src="/assets/icons/copy.svg" alt="copy" />
                <img src="/assets/icons/share.svg" alt="share" />
              </Flex>
            </Flex>
            <Flex $gap="5px" $align="center">
              <img src="/assets/icons/fuel.svg" alt="fuel" />
              <Flex $gap="8px" $align={"center"}>
                <Text color="#8C8C9B" size={13}>
                  Fuel : 26%{" "}
                </Text>
                <Dots />
                <Text color="#8C8C9B" size={13}>
                  Started: 03-11-2024, 02:13 EST
                </Text>
              </Flex>
            </Flex>
          </Card>
        ))
      ) : (
        <PageLoad />
      )}
    </CardArticle>
  );
};
