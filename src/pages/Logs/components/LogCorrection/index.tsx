import { Button, Col, Radio, Row } from "antd";
import moment from "moment-timezone";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import TextField from "@/components/form/TextField";
import { ISetState, TItemStatus } from "../../../../types";

import TimePicker from "@/components/elements/TimePicker";
import useMomentZone from "@/hooks/useMomentZone";
import { ILog } from "@/types/log.type";
import { correctLogsTime, fixLogsStatus } from "../correction_algorithms";
import DriveWheel from "./assets/DriveWheel";
import MoonIcon from "./assets/MoonIcon";
import OffIcon from "./assets/OffIcon";
import TruckIcon from "./assets/TruckIcon";

type TFormConnection = {
  fromTo: any;
  lat: any;
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
  fromTo: "fromTo",
  lat: "lat",
  lng: "lng",
  location: "location",
  hours: "hours",
  odometer: "odometer",
  notes: "notes",
  vehicle: "vehicle",
  document: "document",
  trailer: "trailer",
};

interface ILogCorrection {
  currentLog: ILog | null;
  onChangeStatus: (val: TItemStatus) => void;
  initialTime: number | undefined;
  onCancel: () => void;
  onTimeChange: (range: [number, number]) => void;
  setLogs: ISetState<ILog[]>;
}

const LogCorrection: React.FC<ILogCorrection> = ({
  currentLog,
  onChangeStatus,
  initialTime,
  onCancel,
  onTimeChange,
  setLogs,
}) => {
  const { control, reset, handleSubmit } = useForm<TFormConnection>();
  const [fromTo, setFromTo] = useState<any[] | undefined>([]);
  const momentZone = useMomentZone();

  // const { data: vehicles, isLoading: vehicleLoad } = useApi<{
  //      data: IVehicle[];
  //      total: number;
  // }>("/vehicles?page=1&limit=100", {});

  const formNames: TFormConnection = logCorrectionFormNames;

  useEffect(() => {
    console.log("♻resetting currentLog: ", currentLog);

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
      lat: currentLog?.location?.lat || "",
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

  const submit = (formData: TFormConnection) => {
    //  console.log(initialTime! - moment(formData.fromTo[0]).valueOf());
    //  console.log(moment(formData.fromTo[1]).format("HH:mm:ss"));
    setLogs((prevLogs) => {
      return prevLogs.map((prevLog) =>
        prevLog._id === currentLog?._id
          ? {
              ...currentLog!,
              ...formData,
              location: {
                name: currentLog?.location.name!,
                lat: +formData.lat,
                lng: +formData.lng,
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
        <div className="log-correction-form">
          <div>
            <Row gutter={[40, 15]}>
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
              {/* <Col span={10}>
                                   <TextField
                                        label={formNames.to}
                                        placeholder={formNames.to}
                                        name={formNames.to}
                                        control={control}
                                        required
                                   />
                              </Col> */}
            </Row>
            <Row gutter={[40, 15]} align="bottom">
              <Col span={8}>
                <TextField
                  label={formNames.lat}
                  placeholder={formNames.lat}
                  name={formNames.lat}
                  control={control}
                  required
                />
              </Col>
              <Col span={8}>
                <TextField
                  label={formNames.lng}
                  placeholder={formNames.lng}
                  name={formNames.lng}
                  control={control}
                  required
                />
              </Col>
              <Col span={4}>
                <Button type="primary">Get location</Button>
              </Col>
            </Row>
            <Row gutter={[40, 15]} align="bottom">
              <Col span={16}>
                <TextField
                  label={formNames.location}
                  placeholder={formNames.location}
                  name={formNames.location}
                  control={control}
                  required
                />
              </Col>
              <Col span={4}>
                <Button type="primary">Get coordinates</Button>
              </Col>
            </Row>
            <Row gutter={[40, 15]}>
              <Col span={20}>
                <TextField
                  label={"Engine hours"}
                  placeholder={formNames.hours}
                  name={formNames.hours}
                  control={control}
                  required
                />
              </Col>
              <Col span={20}>
                <TextField
                  label={formNames.odometer}
                  placeholder={formNames.odometer}
                  name={formNames.odometer}
                  control={control}
                  required
                />
              </Col>
            </Row>
            <Row gutter={[40, 15]}>
              <Col span={20}>
                <TextField
                  label={formNames.notes}
                  placeholder={formNames.notes}
                  name={formNames.notes}
                  control={control}
                  required
                />
              </Col>
              <Col span={20}>
                {/* <Select
                                             label={"Truck"}
                                             placeholder={"Truck"}
                                             control={control}
                                             name={formNames.trailers}
                                             required
                                        /> */}
              </Col>
            </Row>
            <Row gutter={[40, 15]}>
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
            </Row>
            <Row justify="end" gutter={[40, 15]}>
              {/* <Col span={10}> */}
              <Button className="mr-16 w-150" onClick={() => onCancel()}>
                Cancel
              </Button>

              <Button
                type="primary"
                className="w-150"
                htmlType="submit"
                // loading={createLoading || updateLoading}
              >
                Save
              </Button>
              {/* </Col> */}
            </Row>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LogCorrection;
