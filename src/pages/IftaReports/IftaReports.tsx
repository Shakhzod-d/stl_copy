import React, { useEffect, useState, useRef } from "react";
import { Button, Table, Pagination } from "antd";
import Icon from "@/components/icon/Icon";
import useColumns from "./components/columns";
import SearchByQuery from "@/components/elements/SearchByQuery";
import ActionModal from "./components/ActionModal";
import { useQueryParams } from "@/hooks/useQueryParams";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { getReportsInitially } from "@/store/slices/reportSlice";
import { PDFExport,savePDF } from "@progress/kendo-react-pdf";
import { DownloadOutlined } from "@ant-design/icons";
import moment from "moment";
import api from "@/api";
import { NumberParam, useQueryParam, withDefault } from "use-query-params";
import useApi from "@/hooks/useApi";
import { PAGE_LIMIT } from "@/constants/general.const";
import useParseData from "@/hooks/useParseData";

const IftaReports = () => {
  // @ts-ignore
  const { IFTAReports, loading } = useSelector<RootState>((s) => s.reports);
  const pdfExportComponent = useRef(null) as React.MutableRefObject<null>;
  // const container = React.useRef<HTMLDivElement>(null);
  const [fromTo, setFromTo1] = useState<[any, any]>([0, 0])
  const [generatedDate, setGeneratedDate] = useState<any>()

  // const exportPDFWithMethod = () => {
  //   let element = container.current || document.body;
  //   savePDF(element, {
  //     paperSize: "auto",
  //     margin: 40,
  //     fileName: `Report for ${new Date().getFullYear()}`,
  //   });
  // };
  // const exportPDFWithComponent = () => {
  //   if (pdfExportComponent.current) {
  //     pdfExportComponent?.current
  //   }
  // };

  // Query params
  // const [search, setSearch] = useQueryParam("name", withDefault(StringParam, undefined));
   const [page, setPage] = useQueryParam("page", withDefault(NumberParam, 1))

  // const [search, setSearch] = useQueryParams("search", "")

   const { data, isLoading, refetch, isFetching } = useApi<any>("/ifta", { page, limit: PAGE_LIMIT });

  const { tableData, totalPage } = useParseData<any>(data)

  const [isOpen, setIsOpen] = useState<boolean>(false);
  // const [pageCounter, setPageCounter] = useState<number>(1);
  const dispatch = useDispatch<AppDispatch>();

  //  const handlePrint = useReactToPrint({
  //   content: () => tableRef.current,
  // });

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
  // const handlePageChange = (page: number) => {
  //   setPageCounter(page);
  // };

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

  // useEffect(() => {
   
  //   const partOfUrl = `/ifta?page=${pageCounter}&limit=10`;

  //   dispatch(getReportsInitially({ url: partOfUrl}));
  // }, [pageCounter]);

  const handleModal = () => {
    setIsOpen((prev) => !prev);

  };

  const postPDF = () => {
    const postPDFUrl = `/ifta?from=${fromTo[0].unix()}&to=${fromTo[1].unix()}`
    const param = {
      file: 'dsf'
    }
    api.post(postPDFUrl, param)
    console.log('sssss');
    
  }


  

  return (
    <div className="ifta-reports page">

      <div className="ifta-reports-header">
        <h4 className="medium-18">IFTA REPORTS</h4>
        <div className="right">
          {IFTAReports.length > 0 && (
            <div style={{marginRight: '20px'}} className="download-btn">
              <Button
                type="primary"
                onClick={() => {
                  if (pdfExportComponent.current) {
                    // @ts-ignore
                    pdfExportComponent.current?.save();
                    postPDF()
                  }
                  // exportPDFWithComponent()
                }}
              >
                <DownloadOutlined />
                Download PDF
              </Button>
            </div>
          )}
          {/* <SearchByQuery
            className="mw-250 mr-8"
            placeholder={"Search"}
            query={search}
            setQuery={setSearch}
          /> */}
          <Button type="primary" onClick={handleModal}>
            <Icon icon="plus" />
            New Report
          </Button>
        </div>
      </div>
      <div className="page-line" />
      <div className="ifta-reports-main">
        <div >
        </div>
        <div style={{ width: '100%', margin: "0 auto", display: 'flex', justifyContent: 'center' }}>
          {
            <PDFExport 
              forcePageBreak=".page-break"
              ref={pdfExportComponent}
              fileName={'file'}
              author="STL">
              {
                IFTAReports?.map((items: any[], index: number) => (
                  <div  className={`tableDiv ${index !== 0 ? "page-break" : null}`}>
                    <div className="mb-16 d-flex justify-center align-center" style={{ flexDirection: 'column', position: 'relative'}}>
                      <div className="report-top">
                          <p className="name-report">Baikozu INC</p>
                          <p className="name-report-bottom">2550 Waterview Dr, Unit 128, <br /> Northbrook, IL, 60062</p>
                      </div>
                      <h1 className="report-title" style={{fontSize: '25px', fontWeight: '600'}}>{`Period: ${moment(fromTo[0]).format('DD/MM/YYYY')} - ${moment(fromTo[1]).format('DD/MM/YYYY')}`}</h1>
                      <h1 className="report-title" style={{fontSize: '23px', fontWeight: '500'}}>{`Report generated: ${moment(generatedDate).format('DD/MM/YYYY')}`}</h1>
                      <div className="line"></div>
                      <div className="vehicle-unit" style={{fontSize: '20px', fontWeight: '600'}}>{`Vehicle unit - ${items[0]?.vehicleId}  (${items[0]?.vehicleVin})`}</div>
                    </div>
                    <table key={index} className="table">
                      <thead>
                        <tr>
                          <th>No</th>
                          <th>State</th>
                          <th>Miles</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item: any, itemIndex: number) => (
                          <tr key={itemIndex}>
                            <td>{itemIndex + 1}</td>
                            <td>{item.state}</td>
                            <td>{item.miles}</td>
                          </tr>
                        ))}

                      </tbody>
                    </table>
                  </div>
                ))
              }
            </PDFExport>
          }
        </div>


        <Table
          scroll={{ x: "max-content" }}
          columns={columns}
          loading={isLoading}
          // @ts-ignore
          dataSource={tableData}
          className="action"
            pagination={{
              onChange: (page) => setPage(page),
              current: page,
              pageSize: PAGE_LIMIT,
              total: totalPage
         }}
        />

        <br />

        {/* <Pagination
          current={page}
          pageSize={10}
          total={IFTAReports?.length}
          onChange={handlePageChange}
          showSizeChanger={false}
          showQuickJumper={false}
          showTotal={(total, range) =>
            `${range[0]}-${range[1]} of ${total} items`
          }
        /> */}
      </div>
      {isOpen && <ActionModal toggle={handleModal} setFromTo1={setFromTo1} setGeneratedDate={setGeneratedDate}/>}
    </div>

  );
};

export default IftaReports;
