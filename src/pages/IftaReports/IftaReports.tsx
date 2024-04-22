import React, { useState, useRef, useEffect } from "react";
import { Button, Table } from "antd";
import Icon from "@/components/icon/Icon";
import useColumns from "./components/columns";
import ActionModal from "./components/ActionModal";
import { useSelector } from "react-redux";
import {  RootState } from "@/store";
import { DownloadOutlined } from "@ant-design/icons";
import moment from "moment";
import { NumberParam, useQueryParam, withDefault } from "use-query-params";
import useApi from "@/hooks/useApi";
import { PAGE_LIMIT } from "@/constants/general.const";
import useParseData from "@/hooks/useParseData";
import api from "@/api";
import useApiMutationID from "@/hooks/useApiMutationID";

interface StateVehicle{
  state: string[],
  vehicleId: string[];
}

const IftaReports = () => {
  // @ts-ignore
  const { IFTAReports } = useSelector<RootState>((s) => s.reports);
  const [fromTo, setFromTo1] = useState<[any, any]>([0, 0])
  const [generatedDate, setGeneratedDate] = useState<any>()
  const [stateVehicle, setStateVehicle] = useState<StateVehicle | null>(null)

  // Query params
  const [page, setPage] = useQueryParam("page", withDefault(NumberParam, 1))

  const { data, isLoading, refetch, isFetching} = useApi<any>("/ifta", { page, limit: PAGE_LIMIT });
  const { tableData, totalPage } = useParseData<any>(data)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { mutate: deleteIfta, isLoading: deleteLoading } = useApiMutationID("DELETE", "/ifta");

  const handleDeleteIfta = (id: string) => {
    deleteIfta({ id }, { onSuccess: () => refetch() })
}

  // Generate table columns
  const columns = useColumns({  handleDeleteIfta });
  

  const handleModal = () => {
    setIsOpen((prev) => !prev);
  };
  

  const handleDownloadPDF = async () => {
      const postPDFUrl = `/ifta/pdf?from=${fromTo[0]?.unix()}&to=${fromTo[1]?.unix()}`
      api.post(postPDFUrl, stateVehicle)
  }

  return (
    <div className="ifta-reports page">

      <div className="ifta-reports-header">
        <h4 className="medium-18">IFTA REPORTS</h4>
        <div className="right">
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
        <div style={{ width: '100%', margin: "0 auto", display: 'flex',flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div id="pdf-content" style={{display: `${IFTAReports.length ? 'block' : 'none'}`}}>
            {
                <div  style={{width: '880px'}} className={`tableDiv`}>
                  <div className="mb-16 d-flex justify-center align-center" style={{ flexDirection: 'column', position: 'relative' }}>
                    <h1 className="report-title" style={{ fontSize: '25px', fontWeight: '600' }}>{`Period: ${moment(fromTo[0]).format('DD/MM/YYYY')} - ${moment(fromTo[1]).format('DD/MM/YYYY')}`}</h1>
                    <h1 className="report-title" style={{ fontSize: '23px', fontWeight: '500' }}>{`Report generated: ${moment(generatedDate).format('DD/MM/YYYY')}`}</h1>
                    
                  </div>
                  {
                    IFTAReports?.map((items: any[], index: number) => {
                      return <div key={index} >
                        <div className="line"></div>
                        <div className="vehicle-unit">{`Vehicle unit - ${items[0]?.vehicleId}  (${items[0]?.vehicleVin})`}</div>
                        <table className="table" >
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>State</th>
                        <th>Miles</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items?.map((item: any, itemIndex: number) => {
                        return <tr key={itemIndex}>
                        <td>{itemIndex + 1}</td>
                        <td>{item.state}</td>
                        <td>{item.miles}</td>
                      </tr>
                      })}

                    </tbody>
                  </table>
                      </div>
                    })
                  }
                </div>
            }
            </div>
            {IFTAReports.length > 0 && (
            <div style={{ marginRight: '50px', alignSelf: 'end', marginBottom: '20px' }} className="download-btn">
              <Button
                type="primary"
                onClick={() => {
                  
                  handleDownloadPDF()
                }}
              >
                <DownloadOutlined />
                Save PDF
              </Button>
            </div>
          )}
        </div>
        <Table
          scroll={{ x: "max-content" }}
          columns={columns}
          loading={isLoading || isFetching}
          dataSource={tableData}
          className="action"
          pagination={{
            onChange: (page) => setPage(page),
            current: page,
            pageSize: PAGE_LIMIT,
            total: totalPage
          }}
        />
      </div>
      {isOpen && <ActionModal toggle={handleModal} setFromTo1={setFromTo1} setGeneratedDate={setGeneratedDate} setStateVehicle={setStateVehicle}/>}
    </div>

  );
};

export default IftaReports;
