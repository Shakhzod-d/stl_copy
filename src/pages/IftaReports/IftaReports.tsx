import React, { useEffect, useState } from "react";
import { Button, Table, Pagination } from "antd";
import Icon from "@/components/icon/Icon";
import useColumns from "./components/columns";
import SearchByQuery from "@/components/elements/SearchByQuery";
import ActionModal from "./components/ActionModal";
import { useQueryParams } from "@/hooks/useQueryParams";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { getReportsInitially } from "@/store/slices/reportSlice";

const IftaReports = () => {
  // @ts-ignore
  const { IFTAReports, loading } = useSelector<RootState>((s) => s.reports);
  //   console.log(`s`, r);

  // Query params
  const [search, setSearch] = useQueryParams("search", "");

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [pageCounter, setPageCounter] = useState<number>(1);
  const dispatch = useDispatch<AppDispatch>();

  // Get all drivers data
  // const queryParams: any = ["/drivers", {}]
  // const { data, isLoading } = useApi(queryParams[0], queryParams[1])

  // Generate table columns
  const columns = useColumns();

  // // Map drivers data to table
  // const tableData: any = useMemo(() => {
  //      if (data) {
  //           const drivers = data.data
  //           return mapDrivers(drivers)
  //      }
  //      return []
  // }, [data])
  const handlePageChange = (page: number) => {
    setPageCounter(page);
  };

  function getUnixTimeRange(): { from: number; to: number } {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const startDate = new Date(currentYear, currentMonth, 1);

    const endDate = currentDate;

    // Calculate Unix time in milliseconds
    const fromUnixTime = startDate.getTime();
    const toUnixTime = endDate.getTime();

    return {
      from: Math.floor(fromUnixTime / 1000), // convert to seconds
      to: Math.floor(toUnixTime / 1000), // convert to seconds
    };
  }

  useEffect(() => {
    const s = {
      vehicleId: ["6588bb17a87b9871b7b594f1", "6588bb37a87b9871b7b594fc"],
      state: ["AL", "AR", "AZ", "VA"],
      from: getUnixTimeRange().from,
      to: getUnixTimeRange().to,
    };
    const partOfUrl = `/ifta/data?page=${pageCounter}&limit=10`;

    dispatch(getReportsInitially({ url: partOfUrl, body: s }));
  }, [pageCounter]);

  const handleModal = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="ifta-reports page">
      <div className="ifta-reports-header">
        <h4 className="medium-18">IFTA REPORTS</h4>
        <div className="right">
          <SearchByQuery
            className="mw-250 mr-8"
            placeholder={"Search"}
            query={search}
            setQuery={setSearch}
          />
          <Button type="primary" onClick={handleModal}>
            <Icon icon="plus" />
            New Report
          </Button>
        </div>
      </div>
      <div className="page-line" />
      <div className="ifta-reports-main">
        <Table
          scroll={{ x: "max-content" }}
          columns={columns}
          loading={loading}
          // @ts-ignore
          dataSource={IFTAReports}
          className="action"
          pagination={false}
        />
        <br />
        <Pagination
          current={pageCounter}
          pageSize={10}
          total={IFTAReports?.length}
          onChange={handlePageChange}
          showSizeChanger={false}
          showQuickJumper={false}
          showTotal={(total, range) =>
            `${range[0]}-${range[1]} of ${total} items`
          }
        />
      </div>
      {isOpen && <ActionModal toggle={handleModal} />}
    </div>
  );
};

export default IftaReports;
