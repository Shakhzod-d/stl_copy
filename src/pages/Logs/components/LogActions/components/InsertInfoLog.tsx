import { Controller, useForm } from "react-hook-form";
import { FC } from "react";
import Select from "@/components/elements/Select";
import FormSelect from "@/components/form/Select";
import TextField from "@/components/form/TextField";
import TimePicker from "@/components/form/TimePicker";
import DatePicker from "@/components/elements/DatePicker/index";
import { Checkbox, Row, Col, Button } from "antd";
import { useEffect, useState } from "react";
import { TItemStatus } from "@/types";
import moment from "moment-timezone";
import {
  getTodaysInitialTime,
  getTodaysSeconds,
} from "../../correction_algorithms";
import { ILog } from "@/types/log.type";
import { Moment } from "moment";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { timeZones } from "../../LogTable/helper";

const statusOptions = [
  {
    name: "certify",
    _id: "certify",
  },
  {
    name: "intermediate",
    _id: "intermediate",
  },
  {
    name: "login",
    _id: "login",
  },
  {
    name: "logout",
    _id: "logout",
  },
  {
    name: "power off",
    _id: "power_off",
  },
  {
    name: "power on",
    _id: "power_on",
  },
];

export interface IInsertInfoLogFormData {
  time: any;
  signature: string;
  lat: string;
  lng: string;
  locationName: string;
  odometer: string;
  // hours: string;
  engineHours: any;
  // document: string;
  start: number;
  end: number;
  // trailer: string;
  status: "";
  truck: string;
  lock: string;
}
// export interface IInsertInfoLogFormData {}
const insertInfoLogFormData = {
  time: "time",
  signature: "signature",
  lat: "lat",
  lng: "lng",
  locationName: "locationName",
  odometer: "odometer",
  engineHours: "engineHours",
  // document: "document",
  // eng: "eng",
  truck: "truck",
  lock: "lock",
};

export interface IInsertInfoLog {
  formData?: ILog | undefined;
  onInsert: (infoLog: IInsertInfoLogFormData) => void;
  onCancel: () => void;
}

const InsertInfoLog: FC<IInsertInfoLog> = ({
  formData,
  onInsert,
  onCancel,
}) => {
  const companyTimeZone: any = useSelector<RootState>(
    (s) => s.log.companyTimeZone
  );

  const [currentTime, setCurrentTime] = useState<Moment | null>(
    !!formData
      ? moment // @ts-ignore
          .unix(formData?.start) // @ts-ignore
          .tz(timeZones[companyTimeZone]) // @ts-ignore
      : moment().tz(timeZones[companyTimeZone])
  );

  const { control, handleSubmit, setValue, getValues, reset, watch } =
    useForm<IInsertInfoLogFormData>({
      defaultValues: {
        // time: moment("12:00:00", "HH:mm:ss"),
        time: moment(
          moment // @ts-ignore
            .unix(formData?.start) // @ts-ignore
            .tz(timeZones[companyTimeZone])
            .format("h:mm:ss A")
        ),
      },
    });
  const [status, setStatus] = useState<TItemStatus>("login");

  const submit = (formData: IInsertInfoLogFormData) => {
    // console.log(`getValues()`, getValues());
    // @ts-ignore
    onInsert({
      ...formData,
      // @ts-ignore
      status,
      start: currentTime !== null ? currentTime.unix() : moment().valueOf(),
      end: currentTime !== null ? currentTime.unix() : moment().valueOf(),
      time: formData.time.valueOf() / 1000 - getTodaysInitialTime(),
      onCancel,
    });
  };
  const formNames = insertInfoLogFormData;
  useEffect(() => {
    if (formData) {
      reset({
        // [formNames.document]: formData?.document,
        [formNames.engineHours]: formData?.duration,
        // [formNames.lat]: formData?.location?.lat,
        [formNames.lng]: formData?.location?.lng,
        // [formNames.locationName]: defaultFormData?.location.name,
        // [formNames.trailer]: formData?.trailer,
        [formNames.truck]: "",
        [formNames.time]: moment(
          moment(formData?.end * 1000).format("HH:mm:ss"),
          "HH:mm:ss"
        ),
        // [formNames.signature]: defaultFormData?.,
      });
      setStatus("login");
    }
  }, []);

  const handleChangeTime = (value: moment.Moment | null) => {
    console.log(getValues());
    setValue("time", value);
  };

  return (
    <form id="insert-info-log" onSubmit={handleSubmit(submit)}>
      <p className="color-main">
        TMK TMK Inc, as your service provider, is not responsible for any
        financial or legal repercussions resulting from facilitating your
        request. It is the sole responsibility of the user to maintain legal
        compliance while using TMK.
      </p>
      <br />

      <TimePicker
        value={currentTime}
        format="h:mm:ss A"
        label="Time"
        name="time"
        control={control}
        onChangeCustom={(
          value //@ts-ignore
        ) => setCurrentTime(value.tz(timeZones[companyTimeZone]))}
      />
      <br />
      <Select
        placeholder="status"
        label="Status"
        data={statusOptions}
        setValue={setStatus}
        defaultValue={"certify"}
        value={status}
        valueProp={"_id"}
        labelProp={"name"}
      />
      {/* @ts-ignore */}
      {status === "certify" ? (
        <>
          <br />
          <TextField
            required
            name="signature"
            placeholder="signatures"
            control={control}
            label="Driver signature"
          />
          <br />
          <DatePicker label="Certify date" className="" />
        </>
      ) : (
        <>
          <br />
          <Row gutter={[36, 0]}>
            <Col span={18}>
              <TextField
                required
                name="lat"
                placeholder="0, 0"
                control={control}
                label="Lat, lng"
              />
            </Col>

            <Col style={{ marginTop: "auto" }} span={3}>
              <Button type="primary">Get location </Button>
            </Col>
          </Row>
          <br />

          <TextField
            required
            name="odometer"
            type="number"
            placeholder="Odometer"
            control={control}
            label="Odometer"
          />
          <br />
          <TextField
            required
            //@ts-ignore
            name={formNames.engineHours} //engineHours
            placeholder="Engine hours"
            type="number"
            control={control}
            label="Engine hours"
          />
          <br />
          <TextField
            label="VEHICLE UNIT"
            placeholder="VEHICLE UNIT"
            required
            name="truck"
            control={control}
          />
        </>
      )}
    </form>
  );
};

export default InsertInfoLog;
