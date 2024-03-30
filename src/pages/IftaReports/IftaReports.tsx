import React, { useState, useRef } from "react";
import { Button, Table } from "antd";
import Icon from "@/components/icon/Icon";
import useColumns from "./components/columns";
import ActionModal from "./components/ActionModal";
import { useSelector } from "react-redux";
import {  RootState } from "@/store";
import { PDFExport} from "@progress/kendo-react-pdf";
import { DownloadOutlined } from "@ant-design/icons";
import moment from "moment";
import api from "@/api";
import { NumberParam, useQueryParam, withDefault } from "use-query-params";
import useApi from "@/hooks/useApi";
import { PAGE_LIMIT } from "@/constants/general.const";
import useParseData from "@/hooks/useParseData";
import axios from "axios";

const IftaReports = () => {
  // @ts-ignore
  const { IFTAReports } = useSelector<RootState>((s) => s.reports);
  const pdfExportComponent = useRef<PDFExport>(null)
  const [fromTo, setFromTo1] = useState<[any, any]>([0, 0])
  const [generatedDate, setGeneratedDate] = useState<any>()

  // Query params
  const [page, setPage] = useQueryParam("page", withDefault(NumberParam, 1))

  const { data, isLoading } = useApi<any>("/ifta", { page, limit: PAGE_LIMIT });
  const { tableData, totalPage } = useParseData<any>(data)
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Generate table columns
  const columns = useColumns();

  const handleModal = () => {
    setIsOpen((prev) => !prev);
  };

  const handleDownloadAndPostPDF = async () => {
    if (pdfExportComponent.current) {
      
      // Generate PDF content
       const pdfData: any = pdfExportComponent.current.save();
       const pdfBlobData = new Blob([pdfData], { type: 'application/pdf' });
       const formData = new FormData();
       formData.append('file', pdfBlobData, 'report.pdf');

      // Send PDF data to server
      const postPDFUrl = `https://ptapi.roundedteam.uz/ifta?from=${fromTo[0].unix()}&to=${fromTo[1].unix()}`;
      const param = {
        file: formData
      };
      console.log(pdfExportComponent.current);
      
      try {
        const response = await fetch(postPDFUrl, {
          method: 'POST',
          body: formData
        });

        if (response.ok) {
          console.log('PDF sent successfully');
        } else {
          console.error('Failed to send PDF');
        }
      } catch (error) {
        console.error('Error sending PDF:', error);
      }
     
    }
  }

  return (
    <div className="ifta-reports page">

      <div className="ifta-reports-header">
        <h4 className="medium-18">IFTA REPORTS</h4>
        <div className="right">
          {IFTAReports.length > 0 && (
            <div style={{ marginRight: '20px' }} className="download-btn">
              <Button
                type="primary"
                onClick={() => {
                  handleDownloadAndPostPDF()
                }}
              >
                <DownloadOutlined />
                Download PDF
              </Button>
            </div>
          )}
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
              <div>
              {
                IFTAReports?.map((items: any[], index: number) => (
                  <div key={index} className={`tableDiv ${index !== 0 ? "page-break" : null}`}>
                    <div className="mb-16 d-flex justify-center align-center" style={{ flexDirection: 'column', position: 'relative' }}>
                      <div className="report-top">
                        <p className="name-report">Baikozu INC</p>
                        <p className="name-report-bottom">2550 Waterview Dr, Unit 128, <br /> Northbrook, IL, 60062</p>
                      </div>
                      <h1 className="report-title" style={{ fontSize: '25px', fontWeight: '600' }}>{`Period: ${moment(fromTo[0]).format('DD/MM/YYYY')} - ${moment(fromTo[1]).format('DD/MM/YYYY')}`}</h1>
                      <h1 className="report-title" style={{ fontSize: '23px', fontWeight: '500' }}>{`Report generated: ${moment(generatedDate).format('DD/MM/YYYY')}`}</h1>
                      <div className="line"></div>
                      <div className="vehicle-unit" style={{ fontSize: '20px', fontWeight: '600' }}>{`Vehicle unit - ${items[0]?.vehicleId}  (${items[0]?.vehicleVin})`}</div>
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
              </div>
            </PDFExport>
          }
        </div>
        <Table
          scroll={{ x: "max-content" }}
          columns={columns}
          loading={isLoading}
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
      {isOpen && <ActionModal toggle={handleModal} setFromTo1={setFromTo1} setGeneratedDate={setGeneratedDate} />}
    </div>

  );
};

export default IftaReports;
