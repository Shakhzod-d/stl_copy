import { Col, Row } from "antd";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { formProps, issue_stats } from "@/constants";
import FormModal from "@/components/elements/FormModal";
import NumberField from "@/components/form/NumberField";
import PhoneField from "@/components/form/PhoneField";
import Select from "@/components/form/Select";
import TextField from "@/components/form/TextField";
import useApi from "@/hooks/useApi";
import useApiMutation from "@/hooks/useApiMutation";
import useApiMutationID from "@/hooks/useApiMutationID";
import { IServiceForm } from "@/types/service.type";

interface Props {
  toggle: () => void;
  id: string | null;
  onSuccess: () => void;
}

const ActionModal: React.FC<Props> = ({ toggle, id, onSuccess }) => {
  const { handleSubmit, control, reset } = useForm<IServiceForm>(formProps);
  // console.log(id);

  // get one service to update
  const { data, isLoading } = useApi(
    `/services/${id}`,
    {},
    { enabled: Boolean(id) }
  );

  //action mutations
  const { mutate: createMutate, isLoading: createLoading } =
    useApiMutation("service");

  const { mutate: updateMutate, isLoading: updateLoading } = useApiMutationID(
    "PUT",
    "service"
  );

  useEffect(() => {
    const item = data?.data;
    if (item)
      reset({
        name: item.name,
        homeTerminalTimezone: item.homeTerminalTimezone,
        phone: item.phone,
        dotNumber: item.dotNumber,
        address: item.address,
        homeTerminalAddress: item.homeTerminalAddress,
      });
  }, [data]);

  const submitFunc = (data: IServiceForm) => {
    if (id) updateMutate({ id, data }, { onSuccess });
    else createMutate(data, { onSuccess });
  };

  return (
    <FormModal
      visible={true}
      onCancel={toggle}
      loading={createLoading || updateLoading}
      modalLoading={isLoading}
      modalTitle="Add Service"
      width={800}
      formId="create-service-form"
    >
      <form onSubmit={handleSubmit(submitFunc)} id="create-service-form">
        <Row gutter={[24, 16]}>
          <Col span={24}>
            <Row gutter={[24, 16]}>
              <Col span={12}>
                <TextField
                  label={"Service name*"}
                  placeholder={"Service name"}
                  name="name"
                  control={control}
                  // required
                />
              </Col>
              <Col span={12}>
                <Select
                  label={"Home terminal zone*"}
                  placeholder={"Select"}
                  name="homeTerminalTimezone"
                  control={control}
                  required
                  data={issue_stats}
                  labelProp="label"
                  valueProp="label"
                />
              </Col>
              <Col span={12}>
                <PhoneField
                  label={"Phone*"}
                  placeholder={"Phone number"}
                  name="phone"
                  control={control}
                  required
                />
              </Col>
              <Col span={12}>
                <NumberField
                  label={"Usdot*"}
                  placeholder={"Usdot number"}
                  name="dotNumber"
                  control={control}
                  required
                />
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <TextField
              placeholder={"Service address"}
              label={"Service address*"}
              name="address"
              control={control}
              required
            />
          </Col>
          <Col span={24}>
            <TextField
              placeholder={"Home terminal address"}
              label={"Terminal address*"}
              name="homeTerminalAddress"
              control={control}
              required
            />
          </Col>
        </Row>
      </form>
    </FormModal>
  );
};

export default ActionModal;
