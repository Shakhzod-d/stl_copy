import api from "@/api";
import FormModal from "@/components/elements/FormModal";
import Select from "@/components/form/Select";
import { select_paging } from "@/constants";
import useApi from "@/hooks/useApi";
import { AppDispatch, RootState } from "@/store";
import { getFmcsaReports } from "@/store/slices/reportSlice";
import { IDriverData } from "@/types/driver.type";
import { Button, Col, DatePicker, Row, Table, message } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import useColumns from "./columns";

export interface IIftaCreateForm {
 fromTo: string;
 driverId: string;
}

const FMCSA = () => {
 const columns = useColumns();
 const { handleSubmit, control, reset, setValue, formState } =
  useForm<IIftaCreateForm>();
 const [fromTo, setFromTo] = useState<[any, any]>([0, 0]);

 const { data: drivers, isLoading: driverLoad } = useApi<{
  data: IDriverData[];
 }>("/drivers", select_paging, { suspense: true });
 const dispatch = useDispatch<AppDispatch>();

 // @ts-ignore
 const { MFCSAReports, loading } = useSelector<RootState>((s) => s.reports);
 const [fmData, setFMData] = useState<any>();
 const isValidDateRange =
  fromTo[0] &&
  fromTo[1] &&
  moment.isMoment(fromTo[0]) &&
  moment.isMoment(fromTo[1]);

 const handleGetReport = async(formState: any) => {
  // console.log(`**`, formState);

  if (isValidDateRange && formState.driverId) {
   const url = `/fmcsa?from=${fromTo[0]?.unix()}&to=${fromTo[1]?.unix()}&driverId=${
    formState.driverId
   }`;

   await dispatch(getFmcsaReports(url));
  } else {
   message.error("Please select a valid date range.");
  }

  getFmcsaReportsData();
 };

 const getFmcsaReportsData = async () => {
  const url = "/fmcsa/page?page=1&limit=10";

  await api(url)
   .then((res) => {
    setFMData(res.data.data);
   })
   .catch((error) => console.log(error));
 };

 useEffect(() => {}, [fmData]);

 return (
  <div className="ifta-reports page">
   <div className="ifta-reports-header">
    <h4 className="medium-18">FMCSA REPORTS</h4>
    <div className="right"></div>
   </div>
   <div className="page-line" />
   <div className="ifta-reports-main">
    <form
     onSubmit={handleSubmit(handleGetReport)}
     id="create-service-form"
     style={{ width: "400px", marginBottom: "40px" }}
    >
     <Row gutter={[24, 24]}>
      <Col span={24}>
       <p className="mb-4">Date range</p>
       <DatePicker.RangePicker
        onChange={(val: any) => {
         setFromTo(val);
         // @ts-ignore
         setValue("fromTo", val);
        }}
        allowClear={false}
       />
       {/*  @ts-ignore */}
       {formState.errors.fromTo && (
        <span style={{ color: "red" }}>Please select a date range.</span>
       )}
      </Col>
      <Col span={24}>
       <Select
        // mode="multiple"
        label={"Driver"}
        placeholder={"Select driver"}
        name="driverId"
        control={control}
        required
        labelProp="name"
        valueProp="_id"
        renderValidation={false}
        // @ts-ignore
        data={
         drivers?.data?.data.map((item: any) => ({
          ...item,
          name: `${item.firstName} ${item.lastName}`,
         })) || []
        }
       />
      </Col>
     </Row>
     <br />

     <button
      type="submit"
      className="ant-btn ant-btn-primary"
      // @ts-ignore
      disabled={(!isValidDateRange && !formState.isValid) || !formState.isDirty}
     >
      Submit
     </button>
    </form>
   </div>
   {/* <h3>ddd</h3> */}
   <div>
    <Table
     scroll={{ x: "max-content" }}
     rowKey={"_id"}
     columns={columns}
     loading={loading}
     // @ts-ignore
     dataSource={fmData}
     pagination={false}
    />
   </div>
  </div>
 );
};

export default FMCSA;
