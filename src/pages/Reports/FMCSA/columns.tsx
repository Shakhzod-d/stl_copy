import { DownloadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import moment from "moment";

const useColumns = () => {

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
    return (
     <span>
      {moment.unix(value).format("DD.MM.YYYY / HH:mm")}
     </span>
    );
   },
  },
  {
   title: "To",
   dataIndex: "to",
   render: (value: any) => {
    return (
     <span>
      {moment.unix(value).format("DD.MM.YYYY")}
     </span>
    );
   },
  },

  {
   title: "From",
   dataIndex: "from",
   render: (value: any) => {
    return (
     <span>
      {moment.unix(value).format("DD.MM.YYYY")}
     </span>
    );
   },
  },
  {
    title: "Download",
    render: () => {
        return(
            <div className="d-flex" style={{columnGap: "4px", maxWidth: "100px"}}>
                <div className="download-btn">
              <Button
                type="primary"
                style={{fontSize: "12px", padding: "5px 10px"}}
                onClick={() => {
                }}
              >
                <DownloadOutlined />
                XML
              </Button>
            </div>
            <div className="download-btn">
            <Button
              type="primary"
              style={{fontSize: "12px", padding: "5px 10px"}}
              onClick={() => {
              }}
            >
              <DownloadOutlined />
              JSON
            </Button>
          </div>
            </div>
        )
    }
  }
 ];
};

export default useColumns;
