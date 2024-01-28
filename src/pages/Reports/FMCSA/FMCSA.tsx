import FormModal from "@/components/elements/FormModal";
import Select from "@/components/form/Select";
import { select_paging } from "@/constants";
import useApi from "@/hooks/useApi";
import { AppDispatch, RootState } from "@/store";
import { getFmcsaReports } from "@/store/slices/reportSlice";
import { IDriverData } from "@/types/driver.type";
import { Button, Col, DatePicker, Row, message } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

export interface IIftaCreateForm {
  fromTo: string;
  driverId: string;
  // state: string[];
}

const FMCSA = () => {
  // const [isOpen, setIsOpen] = useState<boolean>(false);
  const { handleSubmit, control, reset, setValue, formState } =
    useForm<IIftaCreateForm>();
  const [fromTo, setFromTo] = useState<[any, any]>([0, 0]);

  const { data: drivers, isLoading: driverLoad } = useApi<{
    data: IDriverData[];
  }>("/drivers", select_paging, { suspense: true });
  const dispatch = useDispatch<AppDispatch>();

  // @ts-ignore
  const { MFCSAReports, loading } = useSelector<RootState>((s) => s.reports);

  const isValidDateRange =
    fromTo[0] &&
    fromTo[1] &&
    moment.isMoment(fromTo[0]) &&
    moment.isMoment(fromTo[1]);

  const handleGetReport = (formState: any) => {
    // console.log(`**`, formState);

    if (isValidDateRange && formState.driverId) {
      const url = `/fmsca?from=${fromTo[0]?.unix()}&to=${fromTo[1]?.unix()}&driverId=${
        formState.driverId
      }`;

      dispatch(getFmcsaReports(url));
    } else {
      message.error("Please select a valid date range.");
    }
  };
  console.log(MFCSAReports);

  // console.log(formState);

  useEffect(() => {
    // console.log("this is running");
  }, []);

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
          style={{ width: "500px" }}
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
                <span style={{ color: "red" }}>
                  Please select a date range.
                </span>
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
            disabled={
              (!isValidDateRange && !formState.isValid) || !formState.isDirty
            }
          >
            Submit
          </button>
        </form>
      </div>
      {/* <h3>ddd</h3> */}
      <div>
        {MFCSAReports !== null && (
          <div>
            <p>{MFCSAReports.jsonLink}</p>
            <p>{MFCSAReports.xmlLink}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FMCSA;
