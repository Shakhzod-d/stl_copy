import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { formProps, issue_stats, select_paging } from "@/constants";
import FormModal from "@/components/elements/FormModal";
import NumberField from "@/components/form/NumberField";
import PhoneField from "@/components/form/PhoneField";
import Select from "@/components/form/Select";
import TextField from "@/components/form/TextField";
import useApi from "@/hooks/useApi";
import useApiMutation from "@/hooks/useApiMutation";
import useApiMutationID from "@/hooks/useApiMutationID";
import { ICompanyForm } from "@/types/company.type";
import useParseData from "@/hooks/useParseData";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { RoleNames } from "@/App";

interface Props {
  toggle: () => void;
  onSuccess: () => void;
  id: string | null;
}

const ActionModal: React.FC<Props> = ({ toggle, id, onSuccess }) => {
  const { handleSubmit, control, reset } = useForm<ICompanyForm>(formProps);
  const { userData } = useSelector((state: RootState) => state.auth);
  const [ newAllServices, setNewAllServices] = useState<any | undefined>()

  // get one company to update
  const { data, isLoading } = useApi(
    `/company/${id}`,
    {},
    { enabled: Boolean(id) }
  );
  

  // get Services
  const { data: serviceData, isLoading: servicesLoad } = useApi(
    "/main",
    select_paging
  );

  useEffect(()=>{
      if(userData?.role.roleName === RoleNames.SERVICE_ADMIN || userData?.role.roleName === RoleNames.SECOND_SERVICE_ADMIN){
        setNewAllServices({...serviceData, data: {data: serviceData?.data.data.filter((item: any)=>item._id === userData?.serviceId)}})
      }else{
        setNewAllServices(serviceData)
      }
  }, [serviceData])
  
  
  //action mutations
  const { mutate: createMutate, isLoading: createLoading } =
    useApiMutation("/company");
  const { mutate: updateMutate, isLoading: updateLoading } = useApiMutationID(
    "PUT",
    "/company"
  );

  // parse data
  const { tableData: allServices } = useParseData(newAllServices);
  
  
    
    
    
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
        serviceId: item.serviceId,
      });
  }, [data]);

  const submitFunc = (data: ICompanyForm) => {
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
          <Col span={24}>
            <Row gutter={[24, 16]}>
              <Col span={12}>
                <TextField
                  label={"Company name*"}
                  placeholder={"Company name"}
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
          <Col span={24}>
            <Select
              data={allServices}
              labelProp={"name"}
              valueProp={"_id"}
              placeholder={"Choose service"}
              label={"Service*"}
              name="serviceId"
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
