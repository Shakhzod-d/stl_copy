/* eslint-disable react-hooks/exhaustive-deps */
import { Col, Row } from "antd";
import React, { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import {
  EMAIL_PATTERN,
  formProps,
  role_names,
  select_paging,
} from "@/constants";
import FormModal from "@/components/elements/FormModal";
import useApi from "@/hooks/useApi";
import useApiMutation from "@/hooks/useApiMutation";
import useApiMutationID from "@/hooks/useApiMutationID";
import { IUserForm } from "@/types/user.type";
import TextField from "@/components/form/TextField";
import PhoneField from "@/components/form/PhoneField";
import Select from "@/components/form/Select";
import PasswordField from "@/components/form/PasswordField";
import useParseData from "@/hooks/useParseData";

interface Props {
  toggle: () => void;
  onSuccess: () => void;
  id: string | null;
}

const ActionModal: React.FC<Props> = ({ toggle, id, onSuccess }) => {
  const { handleSubmit, control, reset, watch, getValues } =
    useForm<IUserForm>(formProps);

  // get one company to update
  const { data, isLoading } = useApi(
    `/user/${id}`,
    {},
    { enabled: Boolean(id) }
  );

  // get Services
  const { data: servicesData, isLoading: servicesLoad } = useApi(
    "/main",
    select_paging
  );
  const { data: companiesData, isLoading: companiesLoad } = useApi(
    `/main/${getValues("serviceId")}`,
    select_paging,
    { enabled: Boolean(watch("serviceId")) }
  );

  //action mutations
  const { mutate: createMutate, isLoading: createLoading } =
    useApiMutation("/user");
  const { mutate: updateMutate, isLoading: updateLoading } = useApiMutationID(
    "PUT",
    "/user"
  );

  // parse data
  const { tableData: services } = useParseData(servicesData);

  useEffect(() => {
    const item: IUserForm = data?.data;
    if (item)
      reset({
        firstName: item.firstName,
        lastName: item.lastName,
        email: item.email,
        phone: item.phone,
        password: item.password,
        role: item.role,
        serviceId: item.serviceId,
        companyId: item.companyId,
      });
  }, [data]);

  const isServiceRequired = useMemo(() => {
    const role = watch("role");
    return role && role.roleName !== "superAdmin";
  }, [watch("role")]);

  const isCompanyRequired = useMemo(() => {
    const role = watch("role");
    return role && ["logger", "companyAdmin"].includes(role.roleName);
  }, [watch("role")]);

  const submitFunc = (data: IUserForm) => {
    if (!isServiceRequired) data.serviceId = null;
    if (!isCompanyRequired) data.serviceId = null;
    if (id) updateMutate({ id, data }, { onSuccess });
    else createMutate(data, { onSuccess });
  };

  return (
    <FormModal
      open={true}
      onCancel={toggle}
      loading={createLoading || updateLoading}
      modalLoading={isLoading || servicesLoad}
      modalTitle="Add Company"
      width={800}
      formId="create-company-form"
    >
      <form onSubmit={handleSubmit(submitFunc)} id="create-company-form">
        <Row gutter={[24, 16]}>
          <Col span={12}>
            <TextField
              label="First name"
              placeholder="First name"
              name="firstName"
              control={control}
            />
          </Col>
          <Col span={12}>
            <TextField
              label="Last name"
              placeholder="Last name"
              name="lastName"
              control={control}
            />
          </Col>
          <Col span={12}>
            <Select
              label={"Role*"}
              placeholder="Choose role"
              data={role_names}
              labelProp="name"
              valueProp="value"
              name="role"
              control={control}
              required
            />
          </Col>
          <Col span={12}>
            <PhoneField
              label="Phone number"
              placeholder="Phone number"
              name="phone"
              control={control}
            />
          </Col>
          <Col span={12}>
            <TextField
              label={"Email*"}
              placeholder={"Email"}
              name="email"
              control={control}
              autoComplete={"off"}
              validation={{
                pattern: {
                  value: EMAIL_PATTERN,
                  message: "Please enter the correct email",
                },
              }}
              required
            />
          </Col>
          <Col span={12}>
            <PasswordField
              label="Password*"
              placeholder="Password"
              name="password"
              autoComplete={"off"}
              control={control}
              validation={{
                minLength: {
                  value: 5,
                  message: "Password should contain at least 5 characters",
                },
              }}
              required
            />
          </Col>
          {isServiceRequired && (
            <Col span={24}>
              <Select
                label="Service*"
                placeholder="Choose service"
                data={services}
                labelProp="name"
                valueProp="_id"
                name="serviceId"
                control={control}
                required
              />
            </Col>
          )}
          {isCompanyRequired && (
            <Col span={24}>
              <Select
                label={"Company*"}
                placeholder="Choose company"
                data={companiesData?.data}
                loading={companiesLoad}
                labelProp="companyName"
                valueProp="_id"
                name="companyId"
                control={control}
                required
              />
            </Col>
          )}
        </Row>
      </form>
    </FormModal>
  );
};

export default ActionModal;
