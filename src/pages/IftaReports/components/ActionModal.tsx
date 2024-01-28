import { Col, DatePicker, Row, message } from "antd";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import FormModal from "@/components/elements/FormModal";
import Select from "@/components/form/Select";
import { IIftaCreateBody, IIftaCreateForm } from "./ifta-reports.types";
import { IftaCreateFormNames as NAMES } from "./ifta-reports.types";
import { getLocalStorage } from "@/utils";
import { state_names } from "@/constants";
import useApi from "@/hooks/useApi";
import { IVehicleData } from "@/types/vehicle.type";
import moment from "moment";
import { useDispatch } from "react-redux";
import { filterReport } from "@/store/slices/reportSlice";
import { AppDispatch } from "@/store";
import useApiMutation from "@/hooks/useApiMutation";

interface Props {
  toggle: () => void;
}

const ActionModal: React.FC<Props> = ({ toggle }) => {
  const { handleSubmit, control, reset, setValue, formState } =
    useForm<IIftaCreateForm>();

  const [fromTo, setFromTo] = useState<[any, any]>([0, 0]);
  const dispatch = useDispatch<AppDispatch>();

  const { data, status } = useApi<{
    data: { total: number; data: IVehicleData[] };
  }>("vehicles", {
    page: 1,
    limit: 100,
  });

  const submitFunc = (formData: IIftaCreateForm) => {
    const isValidDateRange =
      moment.isMoment(fromTo[0]) && moment.isMoment(fromTo[1]);

    if (isValidDateRange) {
      const url = `/ifta/generate?from=${fromTo[0]?.unix()}&to=${fromTo[1]?.unix()}`;
      const allObj = {
        url,
        body: {
          vehicleId: formData.vehicleId === undefined ? [] : formData.vehicleId,
          state: formData.state === undefined ? [] : formData.state,
        },
        toggle,
      };

      dispatch(filterReport(allObj));
    } else {
      message.error("Please select a valid date range.");
    }
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
      visible={true}
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
              data={data?.data?.data || []}
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
              data={state_names}
            />
          </Col>
        </Row>
      </form>
    </FormModal>
  );
};

export default ActionModal;
