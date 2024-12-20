import { Button, Checkbox, Col, Form, Radio, Row } from "antd";
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
import { useDispatch, useSelector } from "react-redux";
import { ILog } from "@/types/log.type";
import { AppDispatch, RootState } from "@/store";
import { putLogForm, putOtherStatus } from "@/store/slices/logSlice";
// import { CustomModal, Text } from "";
import {
  Box,
  Btn,
  ModalButton,
  RadioButton,
  RadioGroup,
  StyledCheckbox,
} from "./style";
import { TbMoonStars } from "react-icons/tb";
import { EldIcon } from "@/utils/icons";
import { CustomModal, Text } from "@/track/constants";
import { DriverIcon } from "@/track/utils/icons";
import { Flex } from "@/track/components/shared/drivers-header/drivers-header-styled";
import { FormInput } from "@/track/components/ui";
import { StyleButton } from "@/track/pages/logs/logs-styled";
import { DefaultBtn, PrimaryBtn } from "@/track/pages/units/units-styled";
import { EditLog } from "@/track/utils/constants";
import api from "@/api";
import { getLocalStorage } from "@/utils";
import { setLogEdit } from "@/store/slices/booleans-slice";

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

const   LogCorrection: React.FC<ILogCorrection> = ({ handleCloseEditing }) => {
  const {
    state: { currentLog, logs, time },
    actions: { onChangeStatus, onCancel, onTimeChange, setLogs },
  } = useLogsInnerContext();
  const editLog = useSelector((state: RootState) => state.booleans.logEdit);
  const dispatch = useDispatch();
  const { control, reset, handleSubmit } = useForm<TFormConnection>();
  const [fromTo, setFromTo] = useState<[any, any]>([0, 0]);

  const from = moment(fromTo[0]._i).format("hh:mm:ss A");
  const to = moment(fromTo[1]._i).format("hh:mm:ss A");

  const momentZone = useMomentZone();
  const distpatch = useDispatch<AppDispatch>();
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

  const submit = (formData: any) => {
    const logEdit = {
      date: time,
      driverId: getLocalStorage("driverId"),
      log: logs,
      historyLog: {
        user: "Iqboljon;",
        time: time,
        afterLogs: [],
        beforeLogs: [],
      },
    };
    api.post("/logs", logEdit);

    // handleCloseEditing();
    // //  console.log(moment(formData.fromTo[1]).format("HH:mm:ss"));
    // setLogs((prevLogs: any) => {
    //   return prevLogs.map((prevLog: any) =>
    //     prevLog._id === currentLog?._id
    //       ? {
    //           ...currentLog!,
    //           ...formData,
    //           location: {
    //             name: currentLog?.location.name!,
    //             lat: +formData.lng.split(",")[0],
    //             lng: +formData.lng.split(",")[1],
    //           },
    //           odometer: +formData.odometer,
    //           engineHours: +formData.hours,
    //         }
    //       : prevLog
    //   );
    //   /* return fixLogsStatus(
    //                  correctLogsTime(
    //                       prev,
    //                       currentLog,
    //                       [
    //                            moment(formData.fromTo[0]).valueOf(),
    //                            moment(formData.fromTo[1]).valueOf(),
    //                       ]
    //                  )
    //             ); */
    // });

    // //  console.log(moment(formData.fromTo[0]).format("HH:mm:ss")); // that is how time is to be got
    // const newItem = {
    //   ...currentLog!,
    //   ...formData,
    //   location: {
    //     name: currentLog?.location.name!,
    //     lat: +formData.lng.split(",")[0],
    //     lng: +formData.lng.split(",")[1],
    //   },
    //   // start: fromTo[0].unix(),
    //   // end: fromTo[1].unix(),
    //   odometer: +formData.odometer,
    //   engineHours: +formData.hours,
    // };

    // //@ts-ignore
    // if (currentLog?.status !== "certify") {
    //   distpatch(putOtherStatus(newItem));
    // } else {
    //   distpatch(putLogForm(newItem));
    // }
  };
  const cancelModal = () => {
    dispatch(setLogEdit());
  };
  const dataSubmit = () => {
    api.put("/interlog", EditLog);
  };

  return (
    <CustomModal
      className="log-correction"
      open={editLog}
      width={"985px"}
      onCancel={cancelModal}
    >
      {/* @ts-ignore */}
      <Form onFinish={submit}>
        <RadioGroup
          value={currentLog?.status}
          size="large"
          onChange={(e) => onChangeStatus(e.target.value)}
          // className="log-correction-statuses"
        >
          <RadioButton value="on" className="on" active="#3DA8D5">
            <Box>
              <DriverIcon />
              On
            </Box>
          </RadioButton>
          <RadioButton value="sb" className="sb" active="#FC973A">
            <Box>
              <TbMoonStars size={20} />
              Sb
            </Box>
          </RadioButton>
          <RadioButton value="off" className="off" active="#8C8C9B">
            <Box>
              <EldIcon />
              Off
            </Box>
          </RadioButton>

          <RadioButton value="off_pc" className="off_pc">
            <Box>
              <img src="/assets/icons/ym.svg" alt="" />
              Ym
            </Box>
          </RadioButton>
          <RadioButton value="on_ym" className="on_ym">
            <Box>
              <img src="/assets/icons/ps.svg" alt="" />
              Pc
            </Box>
          </RadioButton>
        </RadioGroup>
        <Flex $gap="10px" $m="0 0 30px 0">
          <ModalButton>Login</ModalButton>
          <ModalButton>Logout</ModalButton>
          <ModalButton>Power up</ModalButton>
          <ModalButton>Power off</ModalButton>
          <ModalButton>Intermediate</ModalButton>
        </Flex>
        <Flex $gap="10px" $m="0 0 30px 0" $justify="end">
          <Btn type="primary">duplicate</Btn>
          <Btn type="primary">Clear Form</Btn>
        </Flex>
        <Flex $gap="10px">
          <FormInput placeholder="From" value={from} name="from" />
          <FormInput placeholder={"To"} value={to} name="to" />
        </Flex>
        <Flex $gap="10px">
          <FormInput
            width="458px"
            placeholder="Lat"
            name="lat"
            rules={[
              {
                required: true,
                message: "Please input your Makes",
              },
            ]}
          />

          <FormInput
            width="320px"
            placeholder="Lng"
            name={"lng"}
            rules={[
              {
                required: true,
                message: "Please input your Licensec Plate No",
              },
            ]}
          />
          <PrimaryBtn
            type="primary"
            $background="#3DA8D5"
            width="134px"
            padding="20px 25px"
          >
            Get location
          </PrimaryBtn>
        </Flex>
        <Flex $gap="10px">
          <FormInput placeholder="Location Name" name="location_name" />
          <PrimaryBtn
            type="primary"
            $background="#3DA8D5"
            width="163px"
            padding="20px 25px"
          >
            Get Coordinates
          </PrimaryBtn>
        </Flex>
        <FormInput
          placeholder="Odometer"
          name={"odometer"}
          rules={[
            {
              required: true,
              message: "Please input your Licensec Plate No",
            },
          ]}
        />
        <FormInput
          placeholder="Eng. hours"
          name={"hours"}
          rules={[
            {
              required: true,
              message: "Please input your Licensec Plate No",
            },
          ]}
        />
        <Flex $gap="10px">
          <FormInput placeholder="Note" name={"notes"} />
          <PrimaryBtn
            type="primary"
            $background="#3DA8D5"
            width="134px"
            padding="20px 25px"
          >
            Add quickly
          </PrimaryBtn>
        </Flex>
        <Flex $gap="10px">
          <FormInput placeholder="ELD" name="eld" />
          <FormInput placeholder="Vehicle" name="vehicle" />
        </Flex>
        <StyledCheckbox>
          <Text>Lock</Text>
        </StyledCheckbox>
        <Flex $justify="space-between">
          <Flex $gap="10px">
            <PrimaryBtn width="150px">Swap</PrimaryBtn>
            <PrimaryBtn width="150px">Time</PrimaryBtn>
          </Flex>
          <Flex $gap="10px">
            <DefaultBtn width="200px" height="59px" onClick={cancelModal}>
              Cancel
            </DefaultBtn>
            <PrimaryBtn width="200px" htmlType="submit">
              Ok
            </PrimaryBtn>
          </Flex>
        </Flex>
        {/* log-correction-form  shu form ni row qilishim kerak va yangi row ga qo'shib qo'yaman */}
      </Form>
    </CustomModal>
  );
};

export default LogCorrection;

// <div className="log-correction-form">
//   <div
//     style={{
//       display: "flex",
//       flexDirection: "row",
//       // flexWrap: "wrap",
//       alignItems: "center",
//       justifyContent: "space-between",
//       border: "1px solid #ececee",
//       marginBottom: "18px",
//       boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//       padding: "4px",
//       borderRadius: "6px",
//       width: "100%",
//       height: "80px",
//     }}
//   >
//     <div className="h-28">
//       {
//         <TimePicker
//           className="w-100 h-20"
//           style={{ height: "28px" }}
//           label={formNames.fromTo}
//           value={fromTo}
//           // placeholder={formNames.from}
//           name={formNames.fromTo}
//           // control={control}
//           range={true}
//           onChange={(val) => setFromTo(val)}
//           required
//         />
//       }
//     </div>
//     {/* <Row gutter={[40, 15]} style={{ border: "1px solid green" }}>
//       <Col span={20}>
//         <TimePicker
//           label={formNames.fromTo}
//           value={fromTo}
//           // placeholder={formNames.from}
//           name={formNames.fromTo}
//           //   control={control}
//           range={true}
//           onChange={(val) => onTimeChange(val)}
//           required
//         />
//       </Col>
//     </Row> */}
//     {/* <Row gutter={[90, 15]} align="stretch"> */}
//     {/* <Col span={6} style={{}}> */}
//     {/* <div>
//       <TextField
//         label={formNames.lat}
//         placeholder={formNames.lat}
//         name={formNames.lat}
//         control={control}
//         required
//         style={{ width: "100px", height: "28px" }}
//       />
//     </div> */}
//     {/* </Col> */}
//     {/* <Col span={8}> */}
//     <div>
//       <TextField
//         label={`${formNames.lat} ${formNames.lng}`}
//         placeholder={"0, 0"}
//         name={formNames.lng}
//         control={control}
//         required
//         style={{ width: "100px", height: "28px" }}
//       />
//     </div>
//     {/* </Col> */}
//     {/* <Col span={4}> */}

//     {/* <Button
//       style={{ width: "100px", height: "28px", fontSize: "12px" }}
//       type="primary"
//     >
//       Get location
//     </Button> */}
//     {/* </Col> */}
//     {/* </Row> */}
//     {/* <Row gutter={[40, 15]} align="bottom"> */}
//     {/* <Col span={16}> */}
//     {/* <div>
//       <TextField
//         label={formNames.location}
//         placeholder={formNames.location}
//         name={formNames.location}
//         control={control}
//         required
//         style={{ width: "200px", height: "28px" }}
//       />
//     </div> */}
//     {/* </Col> */}
//     {/* <Col span={4}> */}
//     {/* <Button
//       type="primary"
//       style={{ width: "100px", height: "28px", fontSize: "12px" }}
//     >
//       Get coordinates
//     </Button> */}
//     {/* </Col> */}
//     {/* </Row> */}
//     {/* <Row gutter={[40, 15]}> */}
//     {/* <Col span={20}> */}

//     {/* </Col> */}
//     {/* <Col span={20}> */}
//     <div>
//       <TextField
//         label={formNames.odometer}
//         placeholder={formNames.odometer}
//         name={formNames.odometer}
//         control={control}
//         required
//         style={{ width: "70px", height: "28px" }}
//       />
//     </div>
//     <div style={{}}>
//       <TextField
//         label={"Eng H"}
//         placeholder={"Eng H"}
//         name={formNames.hours}
//         control={control}
//         required
//         style={{
//           width: "70px",
//           height: "28px",
//           // border: "1px solid red !important",
//         }}
//       />
//     </div>
//     {/* </Col> */}
//     {/* </Row> */}
//     {/* <Row gutter={[40, 15]}> */}
//     {/* <Col span={20}> */}
//     <div>
//       <TextField
//         label={formNames.notes}
//         placeholder={formNames.notes}
//         name={formNames.notes}
//         control={control}
//         // required
//         style={{ width: "100px", height: "28px" }}
//       />
//     </div>
//     {/* </Col> */}
//     {/* <Col span={20}> */}
//     {/* <Select
//       label={"Truck"}
//       placeholder={"Truck"}
//       control={control}
//       name={formNames.trailers}
//       required
//     /> */}
//     {/* </Col> */}
//     {/* </Row> */}
//     {/* <Row gutter={[40, 15]}>
//       <Col span={20}>
//         <TextField
//           label={formNames.document}
//           placeholder={formNames.document}
//           name={formNames.document}
//           control={control}
//           required
//         />
//       </Col>
//       <Col span={20}>
//         <TextField
//           label={formNames.trailer}
//           placeholder={formNames.trailer}
//           name={formNames.trailer}
//           control={control}
//           required
//         />
//       </Col>
//     </Row> */}
//     {/* <Row justify="end" gutter={[40, 15]}> */}
//     {/* <Col span={10}> */}
//     <div>
//       <TextField
//         label={formNames.document}
//         placeholder={formNames.document}
//         name={formNames.document}
//         control={control}
//         // required
//         style={{ width: "100px", height: "28px" }}
//       />
//     </div>
//     <div>
//       <TextField
//         style={{ width: "100px", height: "28px" }}
//         label={formNames.trailer}
//         placeholder={formNames.trailer}
//         name={formNames.trailer}
//         control={control}
//         // required
//       />
//     </div>

//     <Button
//       className="w-150"
//       style={{ width: "100px", height: "28px", fontSize: "12px" }}
//       onClick={() => onCancel()}
//     >
//       Cancel
//     </Button>

//     <Button
//       type="primary"
//       className="w-150"
//       style={{ width: "100px", height: "28px", fontSize: "12px" }}
//       htmlType="submit"
//       // loading={createLoading || updateLoading}
//     >
//       Save
//     </Button>
//     {/* </Col> */}
//     {/* </Row> */}
//   </div>
// </div>
