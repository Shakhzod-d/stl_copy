import React from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { getLocalStorage } from "@/utils";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

const useColumns = () => {
  const authCompany: any = useSelector<RootState>((s) => s.auth.companies);
  let companyTimeZone = authCompany?.find((item: any) => item._id === getLocalStorage("companyId"))

  function downloadPDF(url: string, filename: string) {
    fetch(`https://ptapi.roundedteam.uz/public/uploads/ifta/${url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/pdf'
      },
    }).then(response => response.blob())
    .then(blob => {
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = 'example.pdf'; 
  
      document.body.appendChild(downloadLink);
      downloadLink.click();
  
      document.body.removeChild(downloadLink)
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
