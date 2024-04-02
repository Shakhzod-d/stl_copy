import React, { useState, useRef } from "react";
import { Button, Table } from "antd";
import Icon from "@/components/icon/Icon";
import useColumns from "./components/columns";
import ActionModal from "./components/ActionModal";
import { useSelector } from "react-redux";
import {  RootState } from "@/store";
import { PDFExport, savePDF} from "@progress/kendo-react-pdf";
import { DownloadOutlined } from "@ant-design/icons";
import moment from "moment";
import { NumberParam, useQueryParam, withDefault } from "use-query-params";
import useApi from "@/hooks/useApi";
import { PAGE_LIMIT } from "@/constants/general.const";
import useParseData from "@/hooks/useParseData";
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';



const IftaReports = () => {
  // @ts-ignore
  const { IFTAReports } = useSelector<RootState>((s) => s.reports);
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
  

  const handleDownloadPDF = async () => {
    
   
    const input = document.getElementById('pdf-content');
    if (!input) return;
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    
    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let position = 10;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    pdf.save('download.pdf');

      // const postPDFUrl = `/ifta?from=${fromTo[0]?.unix()}&to=${fromTo[1]?.unix()}`;
      
    //   api.post(postPDFUrl, formData
    //       ).then(data => console.log(data)).catch(error => console.log(error))
  
    // }
    
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
                  
                  handleDownloadPDF()
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
            <div id="pdf-content" style={{display: `${IFTAReports.length ? 'block' : 'none'}`}}>
            {
                <div  style={{width: '880px'}} className={`tableDiv`}>
                  <div className="mb-16 d-flex justify-center align-center" style={{ flexDirection: 'column', position: 'relative' }}>
                    <div className="report-top">
                      <p className="name-report" >Baikozu INC</p>
                      <p className="name-report-bottom">2550 Waterview Dr, Unit 128, <br /> Northbrook, IL, 60062</p>
                    </div>
                    <h1 className="report-title" style={{ fontSize: '25px', fontWeight: '600' }}>{`Period: ${moment(fromTo[0]).format('DD/MM/YYYY')} - ${moment(fromTo[1]).format('DD/MM/YYYY')}`}</h1>
                    <h1 className="report-title" style={{ fontSize: '23px', fontWeight: '500' }}>{`Report generated: ${moment(generatedDate).format('DD/MM/YYYY')}`}</h1>
                    
                    
                  </div>
                  {
                    IFTAReports.map((items: any[], index: number) => {
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
                      {items.map((item: any, itemIndex: number) => {
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
