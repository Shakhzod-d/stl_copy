import { timeZones } from "@/pages/Logs/components/LogTable/helper";
import { RootState } from "@/store";
import moment from "moment";
import { useSelector } from "react-redux";

const useColumns = () => {
 const companyTimeZone = useSelector<RootState>((s) => s.log.companyTimeZone);

 return [
  { title: "NO", render: (value: any, item: any, index: any) => index + 1 },
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
  { title: "Status", dataIndex: "status" },
  {
   title: "To",
   dataIndex: "to",
   render: (to: any) => {
    return <span>{moment(to * 1000).format("h:mm:ss")}</span>;
   },
  },
  {
   title: "Date",
   dataIndex: "date",
   render: (to: any) => {
    return <span>{moment(to * 1000).format("h:mm:ss")}</span>;
   },
  },
  {
   title: "From",
   dataIndex: "from",
   render: (to: any) => {
    return <span style={{textAlign: "left"}}>{moment(to * 1000).format("h:mm:ss")}</span>;
   },
  },
 ];
};

export default useColumns;
