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
import { IOnlyCompanyForm } from "@/types/onlyCompany.type";

interface Props {
  toggle: () => void;
  onSuccess: () => void;
  id: string | null;
}

const ActionModal: React.FC<Props> = ({ toggle, id, onSuccess }) => {
  const { handleSubmit, control, reset } = useForm<IOnlyCompanyForm>(formProps);

  // get one company to update
  const { data, isLoading } = useApi(
    `/onlyCompany/${id}`,
    {},
    { enabled: Boolean(id) }
  );

  //action mutations
  const { mutate: createMutate, status: createStatus } =
    useApiMutation("/onlyCompany");
  const { mutate: updateMutate, isLoading: updateLoading } = useApiMutationID(
    "PUT",
    "/onlyCompany"
  );

  useEffect(() => {
    const item = data?.data;
    if (item)
      reset({
        companyName: item.companyName,
        phone: item.phone,
        usdot: item.usdot,
        companyAddress: item.companyAddress,
        homeTerminalTimezone: item.homeTerminalTimezone,
        homeTerminalAddress: item.homeTerminalAddress,
      });
  }, [data]);

  const submitFunc = (data: IOnlyCompanyForm) => {
    if (id) updateMutate({ id, data }, { onSuccess });
    else createMutate(data, { onSuccess });
  };

  return (
    <FormModal
      open={true}
      onCancel={toggle}
      loading={createStatus === "loading" || updateLoading}
      modalLoading={isLoading}
      modalTitle="Add Only Company"
      width={800}
      formId="create-only-company-form"
    >
      <form onSubmit={handleSubmit(submitFunc)} id="create-only-company-form">
        <Row gutter={[24, 16]}>
          <Col span={24}>
            <Row gutter={[24, 16]}>
              <Col span={12}>
                <TextField
                  label={"Company name*"}
                  placeholder={"company name"}
                  name="companyName"
                  control={control}
                  required
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
                  name="usdot"
                  control={control}
                  required
                />
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <TextField
              placeholder={"Company address"}
              label={"Company address*"}
              name="companyAddress"
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
