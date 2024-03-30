import React from "react";
import { TableAction } from "@/components/elements/TableElements/TableElements";
import moment from "moment";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { getLocalStorage } from "@/utils";
import { timeZones } from "@/pages/Logs/components/LogTable/helper";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import api from "@/api";

const useColumns = () => {
  const authCompany: any = useSelector<RootState>((s) => s.auth.companies);
  let companyTimeZone = authCompany?.find((item: any) => item._id === getLocalStorage("companyId"))

  function downloadPDF(url: string, filename: string) {
    fetch(`http://5.161.229.41:5404/public/uploads/ifta/${url}`)
      .then((response: any) => response.blob())
      .then(blob => {
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); 
      })
      .catch(error => {
        console.error('Error downloading PDF:', error);
      });
  }
  return [
    {
      title: "No",
      dataIndex: "order",
      render: (value: any, item: any, index: any) => index + 1,
    },
    {
      title: "Email",
      dataIndex: "recipient",
    },
    {
      title: "Create",
      dataIndex: "createdAt",
      render: (value: any) => moment(value).format("DD.MM.YYYY / HH:mm")
    },
    {
      title: "From",
      dataIndex: "from",
      render: (value: any) => moment.unix(value) .format("DD.MM.YYYY")
    },
    {
      title: "To",
      dataIndex: "to",
      render: (value: any) => moment.unix(value) .format("DD.MM.YYYY")
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Download",
      dataIndex: "pdfLink",
      render: (value: any) => {
       return (
         <div className="download-btn" style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
          <Button
           type="primary"
           style={{ fontSize: "12px", padding: "5px 10px" }}
           onClick={() => downloadPDF(value, value)}
          >
           <DownloadOutlined />
            Download
          </Button>
         </div>
       );
      },
     },
    //     {
    //       title: "Actions",
    //       dataIndex: "id",
    //       render: (id: number, order: any) => (
    //         <TableAction
    //           updatePush={`/units/drivers/update/${id}`}
    //           confirmTitle={`Do you want to deactivate ${
    //             order.first_name + " " + order.last_name
    //           }`}
    //         />
    //       ),
    //     },
  ];
};

export default useColumns;
