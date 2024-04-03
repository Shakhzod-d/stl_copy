import { Col, DatePicker, Row, message } from "antd";
import React, {  useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FormModal from "@/components/elements/FormModal";
import Select from "@/components/form/Select";
import {  IIftaCreateForm } from "./ifta-reports.types";
import { state_names } from "@/constants";
import useApi from "@/hooks/useApi";
import { IVehicleData } from "@/types/vehicle.type";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { filterReport } from "@/store/slices/reportSlice";
import { AppDispatch, RootState } from "@/store";
import useParseData from "@/hooks/useParseData";



interface Props {
  toggle: () => void;
  setFromTo1: (item: any) => void;
  setGeneratedDate: (item: any) => void;
  setStateVehicle: (item: any) => void;
}

const ActionModal: React.FC<Props> = ({ toggle, setFromTo1, setGeneratedDate, setStateVehicle }) => {
  const { handleSubmit, control, reset, setValue, formState, watch } =
    useForm<IIftaCreateForm>();
    const s= useSelector<RootState>((s) => s.reports.IFTAReports);
  const [fromTo, setFromTo] = useState<[any, any]>([0, 0]);
  const dispatch = useDispatch<AppDispatch>();
  const [stateNames, setStateNames] = useState([{label: 'All State', value: 'all'}, ...state_names])

  const { data, status } = useApi<{
    data: { total: number; data: IVehicleData[] };
  }>("vehicles", {
    page: 1,
    limit: 100,
  });
  
  const { tableData, totalPage } = useParseData<IVehicleData>(data)
  
  
  
  const state11 = watch('state')
  const vehicle11 = watch('vehicleId')
  const [vehicleNames, setVehicleNames] = useState<any[]>([{unit: 'All State', _id: 'all'}, ...tableData])
  
  
 useEffect(()=>{
  if(vehicle11?.includes('all')){
    setVehicleNames([{unit: 'All Vehicles', _id: 'all'}])
  }else{
    setVehicleNames([{unit: 'All Vehicles', _id: 'all'}, ...tableData])
  }
 }, [vehicle11, tableData])

 useEffect(()=>{
  if(state11?.includes('all')){
    setStateNames([{label: 'All States', value: 'all'}])
  }else{
    setStateNames([{label: 'All States', value: 'all'}, ...state_names])
  }
 }, [state11])

  const submitFunc = (formData: IIftaCreateForm) => {
    const date = new Date()
    const isValidDateRange =
      moment.isMoment(fromTo[0]) && moment.isMoment(fromTo[1]);

    if (isValidDateRange) {
      const url = `/ifta/generate?from=${fromTo[0]?.unix()}&to=${fromTo[1]?.unix()}`;
      const allObj = {
        url,
        body: {
          vehicleId: vehicle11.includes('all') ? ['all'] : formData.vehicleId === undefined ? [] : formData.vehicleId,
          state: state11.includes('all') ? ['all'] : formData.state === undefined ? [] : formData.state,
        },
        toggle,
      };
      
      setStateVehicle(allObj?.body)
      dispatch(filterReport(allObj));
      setGeneratedDate(date)
      // setIftaReport();
      // console.log(s);
      // handlePrint()
      
    } else {
      message.error("Please select a valid date range.");
    }
    
      
    setFromTo1(fromTo)
    // const url = `/ifta/data?from=${fromTo[0].unix()}&to=${fromTo[1].unix()}`;

    // const allObj = {
    //   url,
    //   body: formData,
    //   toggle,
    // };

    // if (!fromTo[0] || !fromTo[1]) {
    //   // Display an error message or handle validation as needed
    //   // @ts-ignore
    //   setValue("fromTo", null);
    //   return;
    // }
    // dispatch(filterReport(allObj));
  };

  return (
    <FormModal
      open={true}
      onCancel={toggle}
      // loading={createLoading || updateLoading}
      // modalLoading={isLoading}
      modalTitle="New IFTA Report"
      width={800}
      formId="create-service-form"
    >
      <form onSubmit={handleSubmit(submitFunc)} id="create-service-form">
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
              mode="multiple"
              label={"Vehicle"}
              placeholder={"Vehicle"}
              name="vehicleId"
              control={control}
              // required
              labelProp="unit"
              valueProp="_id"
              renderValidation={false}
              // @ts-ignore
              data={vehicleNames || []}
            />
          </Col>
          <Col span={24}>
            <Select
              mode="multiple"
              label={"States"}
              placeholder={"Select"}
              name="state"
              control={control}
              // required
              labelProp={"label"}
              renderValidation={false}
              valueProp={"value"}
              data={stateNames}
            />
          </Col>
        </Row>
      </form>
    </FormModal>
  );
};

export default ActionModal;
