import { PAGE_LIMIT } from "@/constants/general.const";
import useApi from "@/hooks/useApi";
import useParseData from "@/hooks/useParseData";
import { IPageData } from "@/types";
import { IDriverData } from "@/types/driver.type";
import { NumberParam, useQueryParam, withDefault } from "use-query-params";

const useDriversData = ({
  search,
  location,
  time,
}: {
  search: string | undefined;
  location: string | undefined;
  time: number | undefined;
}) => {
  const [page, setPage] = useQueryParam("page", withDefault(NumberParam, 1));

  // Get all drivers data
  const { data, isLoading, isFetching } = useApi<IPageData<IDriverData[]>>(
    "/drivers",
    { search, location, page, time: (time || 0) / 1000, limit: PAGE_LIMIT }
  );

  // parse api data
  const { tableData, totalPage } = useParseData<IDriverData>(data);

  return { tableData, totalPage, page, setPage, isLoading, isFetching ,data};
};

export { useDriversData };
