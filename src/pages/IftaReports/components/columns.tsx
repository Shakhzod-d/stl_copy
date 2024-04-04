import React from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { getLocalStorage } from "@/utils";
import { Button } from "antd";
import { CloseOutlined, DownloadOutlined } from "@ant-design/icons";
interface IUseColumns {
  handleDeleteIfta: (id: string) => void;
}

const useColumns = ({
  handleDeleteIfta
}: IUseColumns) => {

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
         <div className="download-btn" >
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
     {
      title: "Actions",
      dataIndex: "_id",
      render: (id: string, order: any) => (
           <div className="d-flex justify-center">
            <CloseOutlined style={{color: '#f0324c', fontSize: '18px'}} onClick={()=> handleDeleteIfta(id)}/>
           </div>
      ),
 },
  ];
};

export default useColumns;
