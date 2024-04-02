import { Button, Col, Radio, Row } from "antd";
import moment from "moment-timezone";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import TextField from "@/components/form/TextField";

import TimePicker from "@/components/elements/TimePicker";
import useMomentZone from "@/hooks/useMomentZone";
import { useLogsInnerContext } from "../LogsInner.context";
import DriveWheel from "./assets/DriveWheel";
import MoonIcon from "./assets/MoonIcon";
import OffIcon from "./assets/OffIcon";
import TruckIcon from "./assets/TruckIcon";
import useApiMutation from "@/hooks/useApiMutation";
import useApiMutationID from "@/hooks/useApiMutationID";
import { useDispatch } from "react-redux";
import { ILog } from "@/types/log.type";
import { AppDispatch } from "@/store";
import { putLogForm, putOtherStatus } from "@/store/slices/logSlice";

type TFormConnection = {
  fromTo: any;
  lat?: any;
  lng: any;
  location: any;
  hours: any;
  odometer: any;
  notes: any;
  vehicle: any;
  document: any;
  trailer: any;
};
const logCorrectionFormNames = {
  fromTo: "start " + `                ` + "end",
  lat: "lat",
  lng: "lng",
  location: "location",
  hours: "hours",
  odometer: "odometer",
  notes: "notes",
  vehicle: "vehicle",
  document: "shipping docs",
  trailer: "trailer",
};

interface ILogCorrection {
  handleCloseEditing: () => void;
  // putTable: () => void;
  // currentLog: ILog | null;
  // onChangeStatus: (val: TItemStatus) => void;
  // initialTime: number | undefined;
  // onCancel: () => void;
  // onTimeChange: (range: [number, number]) => void;
  // setLogs: ISetState<ILog[]>;
}

const LogCorrection: React.FC<ILogCorrection> = ({ handleCloseEditing }) => {
  const {
    state: { currentLog, logs },
    actions: { onChangeStatus, onCancel, onTimeChange, setLogs },
  } = useLogsInnerContext();
  const { control, reset, handleSubmit } = useForm<TFormConnection>();
  const [fromTo, setFromTo] = useState<[any, any]>([0, 0]);
  const momentZone = useMomentZone();
 const distpatch = useDispatch<AppDispatch>()
  // const { mutate: createMutate, isLoading: createLoading } =
  // useApiMutation("/interlog?_id=");
  //   const { mutate: updateMutate, isLoading: updateLoading } = useApiMutationID(
  // "PUT",
  // "/interlog?_id="
// );
  // const { data: vehicles, isLoading: vehicleLoad } = useApi<{
  //      data: IVehicle[];
  //      total: number;
  // }>("/vehicles?page=1&limit=100", {});

  const formNames: TFormConnection = logCorrectionFormNames;

  useEffect(() => {
    // console.log("♻resetting currentLog: ", currentLog);

    reset({
      document: currentLog?.document || "",
      // [formNames.fromTo]: [
      //      moment(
      //           moment(currentLog?.start).format("HH:mm:ss"),
      //           "HH:mm:ss"
      //      ),
      //      moment(
      //           moment(currentLog?.end).format("HH:mm:ss"),
      //           "HH:mm:ss"
      //      ),ewfwefew
      // ],
      hours: currentLog?.engineHours || "",
      // lat: currentLog?.location?.lat || "",
      lng: currentLog?.location?.lng || "",
      location: currentLog?.location?.name || "",
      odometer: currentLog?.odometer || "",
      notes: currentLog?.notes || "",
      vehicle: currentLog?.vehicleId || "",
      trailer: currentLog?.trailer || "",
    });
    setFromTo([
      momentZone(moment.unix(currentLog?.start || 0)),
      momentZone(moment.unix(currentLog?.end || 0)),
    ]);
  }, [currentLog]);
  // console.log(`currentLog?.location?.lng `, currentLog?.location);

  const submit = (formData: TFormConnection) => {
    handleCloseEditing();
    //  console.log(moment(formData.fromTo[1]).format("HH:mm:ss"));
    setLogs((prevLogs: any) => {
      return prevLogs.map((prevLog: any) =>
        prevLog._id === currentLog?._id
          ? {
              ...currentLog!,
              ...formData,
              location: {
                name: currentLog?.location.name!,
                lat: +formData.lng.split(",")[0],
                lng: +formData.lng.split(",")[1],
              },
              odometer: +formData.odometer,
              engineHours: +formData.hours,
            }
          : prevLog
      );
      /* return fixLogsStatus(
                     correctLogsTime(
                          prev,
                          currentLog,
                          [
                               moment(formData.fromTo[0]).valueOf(),
                               moment(formData.fromTo[1]).valueOf(),
                          ]
                     )
                ); */
    });
    
    //  console.log(moment(formData.fromTo[0]).format("HH:mm:ss")); // that is how time is to be got
    const newItem = {
      ...currentLog!,
      ...formData,
      location: {
      name: currentLog?.location.name!,
      lat: +formData.lng.split(",")[0],
      lng: +formData.lng.split(",")[1],
    },
    // start: fromTo[0].unix(),
    // end: fromTo[1].unix(),
    odometer: +formData.odometer,
    engineHours: +formData.hours,}
    
    //@ts-ignore
    if(currentLog?.status !== "certify"){
      distpatch(putOtherStatus(newItem))
    }else{
      distpatch(putLogForm(newItem))
    }
  };

  return (
    <div className="log-correction">
      {/* @ts-ignore */}
      <form onSubmit={handleSubmit(submit)}>
        <Radio.Group
          value={currentLog?.status}
          size="large"
          onChange={(e) => onChangeStatus(e.target.value)}
          className="log-correction-statuses"
        >
          <Radio.Button value="off" className="off">
            <span>
              <OffIcon />
            </span>
            off
          </Radio.Button>
          <Radio.Button value="sb" className="sb">
            <span>
              <MoonIcon />
            </span>
            sb
          </Radio.Button>
          <Radio.Button type="primary" value="dr" className="dr">
            <span>
              <DriveWheel />
            </span>
            dr
          </Radio.Button>
          <Radio.Button value="on" className="on">
            <span>
              <TruckIcon />
            </span>
            on
          </Radio.Button>
          <Radio.Button value="off_pc" className="off_pc">
            off(pc)
          </Radio.Button>
          <Radio.Button value="on_ym" className="on_ym">
            on(ym)
          </Radio.Button>
        </Radio.Group>

        {/* log-correction-form  shu form ni row qilishim kerak va yangi row ga qo'shib qo'yaman */}
        <div className="log-correction-form">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              // flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              border: "1px solid #ececee",
              marginBottom: "18px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              padding: "4px",
              borderRadius: "6px",
              width: "100%",
              height: "80px",
            }}
          >
            <div className="h-28">
              {
                <TimePicker
                className="w-100 h-20"
                style={{ height: "28px" }}
                label={formNames.fromTo}
                value={fromTo}
                // placeholder={formNames.from}
                name={formNames.fromTo}
                // control={control}
                range={true}
                onChange={(val) => setFromTo(val)}
                required
              />
              }
            </div>
            {/* <Row gutter={[40, 15]} style={{ border: "1px solid green" }}>
              <Col span={20}>
                <TimePicker
                  label={formNames.fromTo}
                  value={fromTo}
                  // placeholder={formNames.from}
                  name={formNames.fromTo}
                  //   control={control}
                  range={true}
                  onChange={(val) => onTimeChange(val)}
                  required
                />
              </Col>
            </Row> */}
            {/* <Row gutter={[90, 15]} align="stretch"> */}
            {/* <Col span={6} style={{}}> */}
            {/* <div>
              <TextField
                label={formNames.lat}
                placeholder={formNames.lat}
                name={formNames.lat}
                control={control}
                required
                style={{ width: "100px", height: "28px" }}
              />
            </div> */}
            {/* </Col> */}
            {/* <Col span={8}> */}
            <div>
              <TextField
                label={`${formNames.lat} ${formNames.lng}`}
                placeholder={"0, 0"}
                name={formNames.lng}
                control={control}
                required
                style={{ width: "100px", height: "28px" }}
              />
            </div>
            {/* </Col> */}
            {/* <Col span={4}> */}

            {/* <Button
              style={{ width: "100px", height: "28px", fontSize: "12px" }}
              type="primary"
            >
              Get location
            </Button> */}
            {/* </Col> */}
            {/* </Row> */}
            {/* <Row gutter={[40, 15]} align="bottom"> */}
            {/* <Col span={16}> */}
            {/* <div>
              <TextField
                label={formNames.location}
                placeholder={formNames.location}
                name={formNames.location}
                control={control}
                required
                style={{ width: "200px", height: "28px" }}
              />
            </div> */}
            {/* </Col> */}
            {/* <Col span={4}> */}
            {/* <Button
              type="primary"
              style={{ width: "100px", height: "28px", fontSize: "12px" }}
            >
              Get coordinates
            </Button> */}
            {/* </Col> */}
            {/* </Row> */}
            {/* <Row gutter={[40, 15]}> */}
            {/* <Col span={20}> */}

            {/* </Col> */}
            {/* <Col span={20}> */}
            <div>
              <TextField
                label={formNames.odometer}
                placeholder={formNames.odometer}
                name={formNames.odometer}
                control={control}
                required
                style={{ width: "70px", height: "28px" }}
              />
            </div>
            <div style={{}}>
              <TextField
                label={"Eng H"}
                placeholder={"Eng H"}
                name={formNames.hours}
                control={control}
                required
                style={{
                  width: "70px",
                  height: "28px",
                  // border: "1px solid red !important",
                }}
              />
            </div>
            {/* </Col> */}
            {/* </Row> */}
            {/* <Row gutter={[40, 15]}> */}
            {/* <Col span={20}> */}
            <div>
              <TextField
                label={formNames.notes}
                placeholder={formNames.notes}
                name={formNames.notes}
                control={control}
                // required
                style={{ width: "100px", height: "28px" }}
              />
            </div>
            {/* </Col> */}
            {/* <Col span={20}> */}
            {/* <Select
              label={"Truck"}
              placeholder={"Truck"}
              control={control}
              name={formNames.trailers}
              required
            /> */}
            {/* </Col> */}
            {/* </Row> */}
            {/* <Row gutter={[40, 15]}>
              <Col span={20}>
                <TextField
                  label={formNames.document}
                  placeholder={formNames.document}
                  name={formNames.document}
                  control={control}
                  required
                />
              </Col>
              <Col span={20}>
                <TextField
                  label={formNames.trailer}
                  placeholder={formNames.trailer}
                  name={formNames.trailer}
                  control={control}
                  required
                />
              </Col>
            </Row> */}
            {/* <Row justify="end" gutter={[40, 15]}> */}
            {/* <Col span={10}> */}
            <div>
              <TextField
                label={formNames.document}
                placeholder={formNames.document}
                name={formNames.document}
                control={control}
                // required
                style={{ width: "100px", height: "28px" }}
              />
            </div>
            <div>
              <TextField
                style={{ width: "100px", height: "28px" }}
                label={formNames.trailer}
                placeholder={formNames.trailer}
                name={formNames.trailer}
                control={control}
                // required
              />
            </div>

            <Button
              className="w-150"
              style={{ width: "100px", height: "28px", fontSize: "12px" }}
              onClick={() => onCancel()}
            >
              Cancel
            </Button>

            <Button
              type="primary"
              className="w-150"
              style={{ width: "100px", height: "28px", fontSize: "12px" }}
              htmlType="submit"
              // loading={createLoading || updateLoading}
            >
              Save
            </Button>
            {/* </Col> */}
            {/* </Row> */}
          </div>
        </div>
      </form>
    </div>
  );
};

export default LogCorrection;
