import { timeZones } from "@/pages/Logs/components/LogTable/helper";
import { RootState } from "@/store";
import { getLocalStorage } from "@/utils";
import moment from "moment";
import { useSelector } from "react-redux";

const useColumns = () => {
 const authCompany: any = useSelector<RootState>((s) => s.auth.companies);
 let companyTimeZone = authCompany?.find((item: any) => item._id === getLocalStorage("companyId"))

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
  { title: "Status", dataIndex: "status" },
  {
   title: "Date",
   dataIndex: "date",
   render: (value: any) => {
    return (
     <span>
      {moment
        .unix(value) // @ts-ignore
       .tz(timeZones[companyTimeZone.homeTerminalTimezone])
       .format("hh:mm:ss")}
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
      {moment
        .unix(value) // @ts-ignore
       .tz(timeZones[companyTimeZone.homeTerminalTimezone])
       .format("hh:mm:ss")}
     </span>
    );
   },
  },

  {
   title: "From",
   dataIndex: "from",
   render: (value: any) => {
    return (
     <span style={{ textAlign: "left" }}>
      {moment
        .unix(value) // @ts-ignore
       .tz(timeZones[companyTimeZone.homeTerminalTimezone])
       .format("hh:mm:ss")}
     </span>
    );
   },
  },
 ];
};

export default useColumns;
