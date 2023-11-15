import { useForm } from "react-hook-form";
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
import { Moment } from 'moment';

const statusOptions = [
     {
          name: "certify",
          _id: "certify",
     },
     {
          name: "intermediate (driving)",
          _id: "intermediate",
     },
     {
          name: "intermediate (personal)",
          _id: "intermediate_pc",
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
          name: "poweron (driving)",
          _id: "poweron_dr",
     },
     {
          name: "poweron (personal)",
          _id: "poweron_pc",
     },
     {
          name: "poweroff (driving)",
          _id: "poweroff_dr",
     },
     {
          name: "poweroff (personal)",
          _id: "poweroff_pc",
     },
];

const truckOptions = [
     {
          name: "12",
          _id: "12",
     },
     {
          name: "231",
          _id: "231",
     },
     {
          name: "184",
          _id: "184",
     },
     {
          name: "312",
          _id: "312",
     },
     {
          name: "873",
          _id: "873",
     },
     {
          name: "1025",
          _id: "1025",
     },
];
export interface IInsertInfoLogFormData {
     time:  any;
     signature: string;
     lat: string;
     lng: string;
     locationName: string;
     odometer: string;
     hours: string;
     document: string;
     trailer: string;
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
     document: "document",
     trailer: "trailer",
     truck: "truck",
     lock: "lock",
};

export interface IInsertInfoLog {
     formData?: ILog | undefined;
     onInsert: (infoLog: IInsertInfoLogFormData) => void;
}

const InsertInfoLog: FC<IInsertInfoLog> = ({ formData, onInsert }) => {
     const { control, handleSubmit, setValue, getValues, reset, watch } =
          useForm<IInsertInfoLogFormData>({
               defaultValues: {
                    time: moment("12:00:00", "HH:mm:ss")
               }
          });
     const [status, setStatus] = useState<TItemStatus>("login");
     const submit = (formData: IInsertInfoLogFormData) => {
          // @ts-ignore
          onInsert({
               ...formData,
               // @ts-ignore
               status,
               time: formData.time.valueOf() / 1000 - getTodaysInitialTime(),
          });
     };
     const formNames = insertInfoLogFormData;
     useEffect(() => {
          if (formData) {
               reset({
                    [formNames.document]: formData?.document,
                    [formNames.engineHours]: formData?.duration,
                    [formNames.lat]: formData?.location?.lat,
                    [formNames.lng]: formData?.location?.lng,
                    // [formNames.locationName]: defaultFormData?.location.name,
                    [formNames.trailer]: formData?.trailer,
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


     console.log(watch("time"));
     

     return (
          <form id="insert-info-log" onSubmit={handleSubmit(submit)}>
               <p className="color-main">
                    STL ELD Inc, as your service provider, is not responsible
                    for any financial or legal repercussions resulting from
                    facilitating your request. It is the sole responsibility of
                    the user to maintain legal compliance while using ELD.
               </p>
               <br />
               <TimePicker
                    label="Time"
                    name="time"
                    control={control}
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
                              <Col span={9}>
                                   <TextField
                                        required
                                        name="lat"
                                        placeholder="lat"
                                        control={control}
                                        label="Lat"
                                   />
                              </Col>
                              <Col span={9}>
                                   <TextField
                                        required
                                        name="lng"
                                        placeholder="Lng"
                                        control={control}
                                        label="Lng"
                                   />
                              </Col>
                              <Col style={{ marginTop: "auto" }} span={3}>
                                   <Button type="primary">Get location </Button>
                              </Col>
                         </Row>
                         <br />
                         <Row justify="space-between" gutter={[36, 0]}>
                              <Col span={10}>
                                   <TextField
                                        required
                                        name="locationName"
                                        placeholder="Location Name"
                                        control={control}
                                        label="Location Name"
                                   />
                              </Col>
                              <Col style={{ marginTop: "auto" }} span={7.2}>
                                   <Button type="primary">
                                        Get coordinates
                                   </Button>
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
                         {/* <TextField
                              required
                              name={formNames.engineHours}
                              placeholder="Engine hours"
                              type="number"
                              control={control}
                              label="Engine hours"
                         /> */}
                         <br />
                         <TextField
                              required
                              name="document"
                              placeholder="Shipping document"
                              control={control}
                              label="Shipping document"
                         />
                         <br />
                         <TextField
                              required
                              name="trailer"
                              placeholder="Trailer"
                              control={control}
                              label="Trailer"
                         />
                    </>
               )}
               <br />
               <FormSelect
                    placeholder="truck"
                    label="Truck"
                    required
                    name="truck"
                    data={truckOptions}
                    control={control}
               />
               <br />
               <div className="d-flex">
                    <label htmlFor="lock" className="mr-32">
                         Lock
                    </label>
                    {/* <Checkbox required name={formNames.lock} id="lock" /> */}
               </div>
          </form>
     );
};

export default InsertInfoLog;
