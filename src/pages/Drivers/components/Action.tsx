import { Button, Col, Row } from "antd";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import {
  EMAIL_PATTERN,
  formProps,
  issue_stats,
  select_paging,
} from "@/constants";
import PasswordField from "@/components/form/PasswordField";
import PhoneField from "@/components/form/PhoneField";
import Select from "@/components/form/Select";
import TextField from "@/components/form/TextField";
import { historyGoBack, mapBusyDisable, mapDrivers } from "@/utils";
import useApi from "@/hooks/useApi";
import { IDriverData, IDriverForm } from "@/types/driver.type";
import { IVehicleData } from "@/types/vehicle.type";
import useApiMutation from "@/hooks/useApiMutation";
import useApiMutationID from "@/hooks/useApiMutationID";

const Action = () => {
  const { id } = useParams<{ id: string }>();

  // Get data
  const { data: drivers, isLoading: driverLoad } = useApi<{
    data: IDriverData[];
  }>("/drivers", select_paging, { suspense: true });
  const { data: vehicles, isLoading: vehicleLoad } = useApi<{
    data: IVehicleData[];
    total: number;
  }>("/vehicles", select_paging, { suspense: true });

  const { data } = useApi<IDriverData>(
    `/driver/${id}`,
    {},
    { enabled: Boolean(id), suspense: true }
  );

  // console.log(`data`, data);

  // Action mutation
  const { mutate: createMutation, isLoading: createLoading } =
    useApiMutation("/driver");
  const { mutate: updateMutation, isLoading: updateLoading } = useApiMutationID(
    "PUT",
    "/driver"
  );

  const { handleSubmit, control, reset } = useForm<IDriverForm>(formProps);

  useEffect(() => {
    if (data) {
      const driver = data.data;
      reset({
        firstName: driver.firstName,
        lastName: driver.lastName,
        username: driver.username,
        email: driver.email,
        password: driver.password,
        phone: driver.phone,
        vehicleId: driver.vehicleId,
        driverLicense: driver.driverLicense,
        driverLicenseIssuingState: driver.driverLicenseIssuingState,
        homeTerminalAddress: driver.homeTerminalAddress,
        coDriverId: driver.coDriverId,
        notes: driver.notes,
        organization: driver.organization,
      });
    }
  }, [data]);

  const submit = (data: IDriverForm) => {
    if (!id) createMutation(data, { onSuccess: historyGoBack });
    else updateMutation({ id, data }, { onSuccess: historyGoBack });
  };

  return (
    <div className="drivers page">
      <div className="drivers-header">
        <h4 className="medium-18">{id ? "EDIT DRIVER" : "NEW DRIVER"}</h4>
      </div>
      <div className="page-line mt-16" />
      <form onSubmit={handleSubmit(submit)}>
        <Row gutter={[40, 32]}>
          <Col span={8}>
            <TextField
              label={"First Name*"}
              placeholder={"First Name"}
              name="firstName"
              control={control}
              required
            />
          </Col>
          <Col span={8}>
            <TextField
              label={"Last Name*"}
              placeholder={"Last Name"}
              name="lastName"
              control={control}
              required
            />
          </Col>
          <Col span={8}>
            <TextField
              label={"Username*"}
              placeholder={"Username"}
              name="username"
              control={control}
              autoComplete={"off"}
              required
            />
          </Col>
          <Col span={8}>
            <TextField
              label={"Organization*"}
              placeholder={"Organization"}
              name="organization"
              control={control}
              autoComplete={"off"}
              required
            />
          </Col>
          <Col span={8}>
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
          <Col span={8}>
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
          <Col span={8}>
            <PhoneField
              label="Phone No*"
              placeholder="Phone number"
              name="phone"
              control={control}
              required
            />
          </Col>
          <Col span={8}>
            <Select
              label={"Vehicle*"}
              placeholder={"Select"}
              name="vehicleId"
              control={control}
              required
              data={mapBusyDisable(vehicles?.data?.data)}
              loading={vehicleLoad}
              labelProp="vin"
              valueProp={"_id"}
            />
          </Col>
          <Col span={8}>
            <TextField
              label={"Driver’s License No*"}
              placeholder={"Driver’s License number"}
              name="driverLicense"
              control={control}
              required
            />
          </Col>
          <Col span={8}>
            <Select
              label={"Driver’s License Issuing State*"}
              placeholder={"Driver’s License Issuing State"}
              name="driverLicenseIssuingState"
              control={control}
              required
              data={issue_stats}
              labelProp="label"
              valueProp="label"
            />
          </Col>
          <Col span={8}>
            <TextField
              label={"Home Terminal Adress*"}
              placeholder={"Home Terminal Adress"}
              name="homeTerminalAddress"
              control={control}
              required
            />
          </Col>
          <Col span={8}>
            <Select
              label={"Co-Driver"}
              placeholder={"Co-Driver"}
              name="fullName"
              control={control}
              data={mapDrivers(drivers?.data?.data || []).filter(
                (item) => item._id !== id
              )}
              labelProp="fullName"
              valueProp="fullName"
              loading={driverLoad}
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
          <Button className="mr-16 w-150" onClick={historyGoBack}>
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
