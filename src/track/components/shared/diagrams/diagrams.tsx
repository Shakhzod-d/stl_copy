import { CustomButton, Wrapper } from "./diagrams-styled";
import { CustomProgress } from "@/track/components/ui/progress";
import {
  BREAK_TIME_LIMIT,
  CYCLE_TIME_LIMIT,
  DRIVE_TIME_LIMIT,
  SHIFT_TIME_LIMIT,
  Text,
} from "@/track/constants/index";
import { Flex } from "../drivers-header/drivers-header-styled";
import { IGraph } from "@/pages/Logs/components/LogGraph";
import LogGraph from "@/pages/Logs/components/LogGraph";
import { formatTime } from "@/track/utils/method";
import ReactToPrint from "react-to-print";

import moment from "moment";
import { useLogsInnerContext } from "@/pages/Logs/components/LogsInner.context";
import { DownloadOutlined, ReloadOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import api from "@/api";
import { useLocation, useParams } from "react-router-dom";
import { Button, Modal } from "antd";
import Report from "@/pages/Logs/components/LogActions/components/Report";
import { setLogEdit } from "@/store/slices/booleans-slice";
import { useDispatch } from "react-redux";
import { CorrectionModal } from "@/track/pages/logs/modals/correction";

export const Diagrams = ({
  data: logs = [],
  setHoveredId,
  hoveredId,
  currentLog,
  setCurrentLog,
  afterRangeChange,
  filterDrawStatus,
  isFetching,
  initialTime = 0,
  cycle,
}: IGraph) => {
  const circleDiagram = [
    {
      id: 1,
      title: "Break",
      color: "#FFAF66",
      valueData: cycle?.break ? (
        moment.utc(cycle.break * 1000).format("HH:mm")
      ) : (
        <span className="error-text">limit reached</span>
      ),
      value: cycle ? (cycle?.break / BREAK_TIME_LIMIT) * 100 : 0,
    },
    {
      id: 2,
      title: "Drive",
      color: "#32BE61",
      valueData: cycle?.drive ? (
        moment.utc(cycle.drive * 1000).format("HH:mm")
      ) : (
        <span className="error-text">limit reached</span>
      ),
      value: DRIVE_TIME_LIMIT,
    },
    {
      id: 3,
      title: "Shift",
      color: "#6298EF",
      valueData: cycle?.shift ? (
        moment.utc(cycle.shift * 1000).format("HH:mm")
      ) : (
        <span className="error-text">limit reached</span>
      ),
      value: cycle ? (cycle?.break / SHIFT_TIME_LIMIT) * 100 : 0,
    },
    {
      id: 4,
      title: "Cycle",
      color: "#5D5E5F",
      valueData: cycle?.cycle ? (
        moment.utc(cycle.cycle * 1000).format("HH:mm")
      ) : (
        <span className="error-text">limit reached</span>
      ),
      value: cycle ? (cycle?.break / CYCLE_TIME_LIMIT) * 100 : 0,
    },
  ];
  const {
    state: {
      // logs = [],
      driverData,
      // currentLog,
      // time: initialTime,
      // isFetching,
      transferStatus,
      isLogsEdited,
      infoLogFormData,
      isVisibleInsertInfoLog,
      historyLogs,
      isAlreadyClicked,
    },
    actions: {
      setTime,
      refetch,
      // setCurrentLog,
      onOk,
      onSend,
      onRevert,
      onCancel,
      onTransfer,
      onNormalize,
      onInsertInfoLog,
      onInsertDutyStatus,
      setIsVisibleInsertInfoLog,
      setLogs,
    },
  } = useLogsInnerContext();
  const [isVisibleHistoryLog, setIsVisibleHistoryLog] = useState(false);
  const [correction, setCorrection] = useState(false);
  const [isVisibleReport, setIsVisibleReport] = useState(false);
  const [renderReport, setRenderReport] = useState<boolean>(false);
  let componentRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  // const [renderReport, setRenderReport] = useState<boolean>(false);
  const [data, setReportData] = useState<any>();
  const dispatch = useDispatch();
  const handleSetData = (res: any) => {
    setReportData(res?.report);
    setLogs(res?.logs);
  };
  const params: { id: "" } = useParams();
  const location = useLocation();
  let upDate = location?.search?.split("=")[1]?.slice(0, 10);
  useEffect(() => {
    const response = api(`daily/report?driverId=${params.id}&date=${upDate}`);
    response
      .then((res) => {
        handleSetData(res?.data);
      })
      .catch((error) => console.log(error));
  }, [renderReport]);

  const upDateReport = () => {
    setIsVisibleReport(true);
    setRenderReport(!renderReport);
  };

  const whenSomethingIsLoading = !!isFetching;
  const duplicateFun = () => {
    dispatch(setLogEdit());
    // onInsertDutyStatus();
  };
  return (
    <>
      <Wrapper>
        <Flex $justify="space-between" $align="center ">
          <Flex $gap={"20px"} $align="center">
            {circleDiagram.map((item) => (
              <Flex $gap={"8px"} key={item.id} $align="center">
                <Flex $gap={"8px"}>
                  <Text color={item.color} $font="500">
                    {item.title}
                  </Text>
                  <Text $font="bold">{item.valueData}</Text>
                </Flex>
                <CustomProgress
                  percent={item.value}
                  color={item.color}
                  // size="small"
                />
              </Flex>
            ))}
          </Flex>

          {/* <Flex $gap={"6px"} style={{ margin: "20px 0" }}>
            <CustomButton>Report</CustomButton>
            <CustomButton>Certify</CustomButton>
            <CustomButton >Duplicate</CustomButton>
            <CustomButton>Al check</CustomButton>
            <CustomButton>Correction</CustomButton>
            <CustomButton>Current Location</CustomButton>
            <CustomButton>EHF</CustomButton>
          </Flex> */}
          <Flex $gap="6px">
            {/* {!currentLog ? ( */}
            <>
              <CustomButton
                disabled={whenSomethingIsLoading}
                className="log-btn"
                // onClick={() => setCurrentLog(logs[0])}
              >
                {/* correction */}
                Al check
              </CustomButton>
              <CustomButton>Time</CustomButton>
              {/* <CustomButton
                    disabled={whenSomethingIsLoading}
                    onClick={() => upDateReport()}
                  >
                    Report
                  </CustomButton> */}
              <CustomButton
                disabled={whenSomethingIsLoading}
                onClick={() => setIsVisibleHistoryLog(true)}
                className="log-btn"
              >
                {/* History */}
                Certify
              </CustomButton>
              <CustomButton
                // disabled={whenSomethingIsLoading}
                className="log-btn"
                // onClick={() => setIsVisibleInsertInfoLog(true)}
                onClick={onInsertDutyStatus}
                disabled={whenSomethingIsLoading || isAlreadyClicked}
              >
                Duplicate
              </CustomButton>
              {currentLog && (
                <>
                  <CustomButton onClick={() => onCancel()}>Cancel</CustomButton>
                  <CustomButton onClick={duplicateFun}>ok</CustomButton>
                </>
              )}
              <CustomButton onClick={() => setCorrection(true)}>
                Correction
              </CustomButton>
              <CustomButton>Current Location</CustomButton>
              <CustomButton>EHF</CustomButton>
            </>
            {/* ) : ( */}
            {/* <>
                <CustomButton
                  disabled={whenSomethingIsLoading}
                  className="log-btn"
                  onClick={() => setIsVisibleHistoryLog(true)}
                >
                  History
                </CustomButton>
                {currentLog.status === "dr" && (
                  <CustomButton
                    disabled={whenSomethingIsLoading}
                    className="log-btn"
                    // onClick={() => setIsVisibleNormalize(true)}
                  >
                    Normalize
                  </CustomButton>
                )}
                <CustomButton
                  disabled={whenSomethingIsLoading || isAlreadyClicked}
                  className="log-btn"
                  onClick={duplicateFun}
                >
                  Duplicate
                </CustomButton>
                {["off", "off_pc", "sb", "on", "on_ym"].includes(
                  currentLog.status
                ) &&
                  !currentLog.isNewLog &&
                  driverData?.data?.currentStatus !== "dr" && (
                    <CustomButton
                      disabled={whenSomethingIsLoading}
                      className="log-btn"
                      // onClick={() => setIsVisibleTransfer(true)}
                    >
                      Transfer
                    </CustomButton>
                  )}
                <CustomButton
                  disabled={whenSomethingIsLoading}
                  onClick={() => onCancel()}
                  className="log-btn"
                >
                  cancel
                </CustomButton>
                {isLogsEdited ? (
                  <CustomButton
                    disabled={whenSomethingIsLoading}
                    // className="log-btn"
                    // type="primary"
                    onClick={() => onSend()}
                  >
                    Send
                  </CustomButton>
                ) : (
                  <CustomButton
                    disabled={whenSomethingIsLoading}
                    className="log-btn"
                    onClick={() => onOk()}
                  >
                    Ok
                  </CustomButton>
                )}
                <CustomButton>Correction</CustomButton>
                <CustomButton>Current Location</CustomButton>
                <CustomButton>EHF</CustomButton>
              </> */}
            {/* )} */}
          </Flex>
        </Flex>

        <LogGraph
          data={filterDrawStatus}
          setHoveredId={setHoveredId}
          hoveredId={hoveredId}
          currentLog={currentLog}
          setCurrentLog={setCurrentLog}
          afterRangeChange={afterRangeChange}
          isFetching={isFetching}
          initialTime={initialTime}
        />
      </Wrapper>
      <Modal
        title={
          <div style={{ width: "100%" }}>
            <ReactToPrint
              // @ts-ignore
              content={() => componentRef}
              trigger={() => (
                <Button type="primary" onClick={() => {}}>
                  <DownloadOutlined />
                  Download PDF
                </Button>
              )}
            />
          </div>
        }
        onCancel={() => setIsVisibleReport(false)}
        open={isVisibleReport}
        width="900px"
        okText="ok"
        okButtonProps={{
          children: <h1>Download</h1>,
          title: "download",
        }}
      >
        {/* @ts-ignore */}
        <div ref={(el) => (componentRef = el)}>
          <Report
            isPrinting={true}
            logs={logs}
            initialTime={initialTime}
            reportData={data}
          />
        </div>
      </Modal>
      <CorrectionModal setOpen={setCorrection} open={correction} />
    </>
  );
};
