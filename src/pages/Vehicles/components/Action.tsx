import { Button, Col, Row } from "antd";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { formProps, fuiel_types, issue_stats } from "@/constants";
import Select from "@/components/form/Select";
import TextField from "@/components/form/TextField";
import AppLoader from "@/components/loaders/AppLoader";
import { generateYear, historyGoBack } from "@/utils";
import useApi from "@/hooks/useApi";
import useApiMutation from "@/hooks/useApiMutation";
import useApiMutationID from "@/hooks/useApiMutationID";
import { IVehicleData, IVehicleForm } from "@/types/vehicle.type";

const Action = () => {
     const { id } = useParams<{ id: string }>();

     // Get data
     const { data, isLoading } = useApi(`/vehicle/${id}`, {}, { enabled: Boolean(id) });

     // Create mutation
     const { mutate: createMutation, isLoading: createLoading } = useApiMutation("/vehicle");
     const { mutate: updateMutation, isLoading: updateLoading } = useApiMutationID("PUT", "/vehicle");

     const { handleSubmit, control, reset, watch } = useForm<IVehicleForm>(formProps);

     useEffect(() => {
          if (data) {
               const vehicle: IVehicleData = data.data;
               reset({
                    unit: vehicle.unit,
                    make: vehicle.make,
                    model: vehicle.model,
                    year: vehicle.year,
                    licensePlateNo: vehicle.licensePlateNo,
                    licensePlateIssuingState: vehicle.licensePlateIssuingState,
                    fuelType: vehicle.fuelType,
                    notes: vehicle.notes,
                    vin: vehicle.vin,
               })
          }
     }, [data]);

     const submit = (data: IVehicleForm) => {
          if (!id) createMutation(data, { onSuccess: historyGoBack });
          else updateMutation({ data, id }, { onSuccess: historyGoBack })
     };
     if (isLoading) return <AppLoader />;

     return (
          <div className="vehicles page">
               <div className="vehicles-header">
                    <h4 className="medium-18">
                         {id ? "EDIT VEHICLE" : "NEW VEHICLE"}
                    </h4>
               </div>
               <div className="page-line mt-16" />
               <form onSubmit={handleSubmit(submit)}>
                    <Row gutter={[40, 32]}>
                         <Col span={8}>
                              <TextField
                                   label={"Vehicle Unit*"}
                                   placeholder={"Vehicle Unit"}
                                   name="unit"
                                   control={control}
                                   required
                              />
                         </Col>
                         <Col span={8}>
                              <TextField
                                   label={"Make*"}
                                   placeholder={"Make"}
                                   name="make"
                                   control={control}
                                   required
                              />
                         </Col>
                         <Col span={8}>
                              <TextField
                                   label={"Model*"}
                                   placeholder={"Model"}
                                   name="model"
                                   control={control}
                                   required
                              />
                         </Col>
                         <Col span={8}>
                              <TextField
                                   label="VIN*"
                                   placeholder="VIN"
                                   name="vin"
                                   control={control}
                                   required
                                   validation={{
                                        minLength: 14,
                                        maxLength: 14
                                   }}
                                   suffix={`${watch("vin")?.length || 0}/14`}
                              />
                         </Col>
                         <Col span={8}>
                              <Select
                                   label={"Year*"}
                                   placeholder={"Year"}
                                   name="year"
                                   control={control}
                                   required
                                   data={generateYear()}
                              />
                         </Col>
                         <Col span={8}>
                              <TextField
                                   label={"License Plate No"}
                                   placeholder={"License Plate No"}
                                   name="licensePlateNo"
                                   control={control}
                              />
                         </Col>
                         <Col span={8}>
                              <Select
                                   label="License Plate Issuing State*"
                                   placeholder={"Select"}
                                   name="licensePlateIssuingState"
                                   control={control}
                                   data={issue_stats}
                                   required
                                   labelProp="label"
                                   valueProp="label"
                              />
                         </Col>
                         <Col span={8}>
                              <Select
                                   label={"Fuel Type*"}
                                   placeholder={"Select"}
                                   name="fuelType"
                                   control={control}
                                   data={fuiel_types}
                                   required
                              />
                         </Col>
                         <Col span={8}>
                              <TextField
                                   label={"Notes"}
                                   placeholder={"Notes"}
                                   name="notes"
                                   control={control}
                              />
                         </Col>
                    </Row>
                    <div className="d-flex justify-center mt-40">
                         <Button
                              className="mr-16 w-150"
                              onClick={historyGoBack}
                         >
                              Cancel
                         </Button>
                         <Button
                              type="primary"
                              className="w-150"
                              htmlType="submit"
                              loading={createLoading || updateLoading}
                         >
                              Save
                         </Button>
                    </div>
               </form>
          </div>
     );
};

export default Action;
