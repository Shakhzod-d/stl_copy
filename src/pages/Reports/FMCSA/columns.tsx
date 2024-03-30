import api from "@/api";
import { DownloadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import moment from "moment";

const useColumns = () => {
 const fetchDataAndDownload = async (url: string, fileType: string) => {
  api(`/fmcsa/file?path=${url}`)
   .then((response) => {
    downloadFile(response, fileType);
   })
   .catch((error) => {
    console.error("Error fetching data:", error);
   });
 };

 const downloadFile = (data: any, fileType: string) => {
  let mimeType, extension;
  let fileContent;
  if (fileType === "json") {
   mimeType = "text/json";
   extension = "json";
   fileContent = JSON.stringify(data);
  } else if (fileType === "xml") {
   mimeType = "text/xml";
   extension = "xml";
   fileContent = data;
  }

  const blob = new Blob([fileContent], { type: mimeType });

  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;

  a.download = `data.${extension}`;

  document.body.appendChild(a);
  a.click();

  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
 };

 return [
  {
   title: "NO",
   width: "20px",
   render: (value: any, item: any, index: any) => index + 1,
  },
  {
   title: "First Name",
   dataIndex: "driver",
   render: (value: any) => value.firstName,
  },
  {
   title: "Last Name",
   dataIndex: "driver",
   render: (value: any) => value.lastName,
  },
  {
   title: "Date",
   dataIndex: "date",
   render: (value: any) => {
    return <span>{moment.unix(value).format("DD.MM.YYYY / HH:mm")}</span>;
   },
  },
  {
   title: "To",
   dataIndex: "to",
   render: (value: any) => {
    return <span>{moment.unix(value).format("DD.MM.YYYY")}</span>;
   },
  },

  {
   title: "From",
   dataIndex: "from",
   render: (value: any) => {
    return <span>{moment.unix(value).format("DD.MM.YYYY")}</span>;
   },
  },
  {
   title: "Download",
   dataIndex: "links",
   render: (value: any) => {
    return (
     <div className="d-flex" style={{ columnGap: "4px", maxWidth: "100px" }}>
      <div className="download-btn">
       <Button
        type="primary"
        style={{ fontSize: "12px", padding: "5px 10px" }}
        onClick={() => fetchDataAndDownload(value.xml, "xml")}
       >
        <DownloadOutlined />
        XML
       </Button>
      </div>
      <div className="download-btn">
       <Button
        type="primary"
        style={{ fontSize: "12px", padding: "5px 10px" }}
        onClick={() => fetchDataAndDownload(value.json, "json")}
       >
        <DownloadOutlined />
        JSON
       </Button>
      </div>
     </div>
    );
   },
  },
 ];
};

export default useColumns;
