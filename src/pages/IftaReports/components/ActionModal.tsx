import { Col, DatePicker, Row } from "antd";
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

interface Props {
  toggle: () => void;
}

const ActionModal: React.FC<Props> = ({ toggle }) => {
  const { handleSubmit, control, reset } = useForm<IIftaCreateForm>();
  const [fromTo, setFromTo] = useState<[any, any]>([0, 0]);
  const { data, status } = useApi<{
    data: { total: number; data: IVehicleData[] };
  }>("vehicles", {
    page: 1,
    limit: 100,
  });

  const submitFunc = (formData: IIftaCreateForm) => {
    const body: IIftaCreateBody = {
      from: fromTo[0].unix(),
      to: fromTo[1].unix(),
      name: "",
      recipient: getLocalStorage("email") || "",
      status: "done",
      vehicleId: +formData.vehicleId,
      type: "IFTA by vehicle",
    };
  };

  console.log(moment(fromTo[0]).valueOf(), status);

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
              }}
              allowClear={false}
            />
          </Col>
          <Col span={24}>
            <Select
              label={"Vehicle"}
              placeholder={"Vehicle"}
              name="vehicleId"
              control={control}
              required
              labelProp="vehicleId"
              valueProp="vehicleId"
              // @ts-ignore
              data={data?.data?.data.data || []}
            />
          </Col>
          <Col span={24}>
            <Select
              label={"States"}
              placeholder={"Select"}
              name="states"
              control={control}
              required
              data={state_names}
            />
          </Col>
        </Row>
      </form>
    </FormModal>
  );
};

export default ActionModal;
