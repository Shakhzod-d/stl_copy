import React, { useRef, useState } from "react";
import { DownloadOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import ReactToPrint from "react-to-print";
import DoubleButton from "@/components/elements/DoubleButton";
import Modal from "@/components/elements/Modal";
import { ISetState, IVoid } from "@/types";
import { historyPush } from "@/utils";
import DatePicker from "@/components/elements/DatePicker/DatePicker";
import Normalize from "./components/Normalize";
import OriginalLogs from "./components/OriginalLogs";
import Report from "./components/Report";
import { IDriverData } from "@/types/driver.type";
import { IHistoryLog, ILog, IReport } from "@/types/log.type";
import useMomentZone from "@/hooks/useMomentZone";
import InsertInfoLog, {
  IInsertInfoLogFormData,
} from "./components/InsertInfoLog";
import { MutationStatus } from "react-query";
import FormModal from "@/components/elements/FormModal";
import HistoryTable from "./components/HistoryTable";
import TransferLogs from "./components/TransferLogs";
import moment from "moment";
import { useLogsInnerContext } from "../LogsInner.context";

interface ILogActions {}

const LogActions: React.FC<ILogActions> = ({}) => {
  const {
    state: {
      logs = [],
      driverData,
      currentLog,
      time: initialTime,
      isFetching,
      transferStatus,
      isLogsEdited,
      infoLogFormData,
      isVisibleInsertInfoLog,
      historyLogs,
      reportData,
      isAlreadyClicked,
    },
    actions: {
      setTime,
      refetch,
      setCurrentLog,
      onOk,
      onSend,
      onRevert,
      onCancel,
      onTransfer,
      onNormalize,
      onInsertInfoLog,
      onInsertDutyStatus,
      setIsVisibleInsertInfoLog,
    },
  } = useLogsInnerContext();
  const momentZone = useMomentZone();

  const [isVisibleHistoryLog, setIsVisibleHistoryLog] = useState(false);
  const [isVisibleOriginalLogs, setIsVisibleOriginalLogs] = useState(false);
  const [isVisibleReport, setIsVisibleReport] = useState(false);
  const [isVisibleNormalize, setIsVisibleNormalize] = useState(false);
  const [isVisibleTransfer, setIsVisibleTransfer] = useState(false);

  let componentRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const whenSomethingIsLoading = !!isFetching;

  // useEffect(() => {
  //      setIsVisibleTransfer(false);
  // }, [transferStatus]);

  const onDateChange = (type: "prev" | "next") => {
    //     setCurrentLog(null); // TODO: uncomment to delete current log
    if (type === "next") setTime(moment(initialTime).add(1, "day").valueOf());
    else setTime(moment(initialTime).add(-1, "day").valueOf());
  };

  const handleInserInfoLogSubmit = () => {
    const insertObj = {
      driverId: driverData?.data?._id,
      start: 1706955789,
      end: 1706955789,
      status: "login",
      engineHours: 0,
      odometer: 0,
      distance: 0,
      document: "",
      notes: " ",
      trailer: "",
      serviceId: "",
      vehicleUnit: "",
      location: {
        lat: 0,
        lng: 0,
        name: " ",
      },
      origin: "Auto",
    };
  };

  return (
    <div className="log-actions">
      <div className="log-left-actions">
        <div style={{ width: 150 }}>
          <DatePicker
            onChange={(val) => {
              //     setCurrentLog(null); // TODO: uncomment to delete current log
              setTime(moment(val).valueOf());
            }}
            value={moment(initialTime)}
          />
        </div>
        <DoubleButton
          disableLeft={whenSomethingIsLoading}
          disableRight={whenSomethingIsLoading}
          onLeft={() => onDateChange("prev")}
          onRight={() => onDateChange("next")}
        />
      </div>
      <div className="log-right-actions">
        {!currentLog ? (
          <>
            <Button
              className="log-btn"
              disabled={whenSomethingIsLoading}
              onClick={() =>
                historyPush(
                  `/main/trackings/inner/${
                    driverData?.data?._id
                  }?time=${momentZone(initialTime).unix()}` // there is to be added ID
                )
              }
            >
              Tracking
            </Button>
            <Button
              disabled={whenSomethingIsLoading}
              onClick={() => setIsVisibleHistoryLog(true)}
              className="log-btn"
            >
              History
            </Button>
            <Button
              disabled={whenSomethingIsLoading}
              onClick={() => setIsVisibleReport(true)}
              className="log-btn"
            >
              Report
            </Button>
            {/* <Button
                                   disabled={whenSomethingIsLoading}
                                   onClick={() =>
                                        setIsVisibleOriginalLogs(true)
                                   }
                                   className="log-btn"
                              >
                                   Original Logs
                              </Button> */}
            <Button
              disabled={whenSomethingIsLoading}
              className="log-btn"
              onClick={() => setIsVisibleInsertInfoLog(true)}
            >
              Insert info log
            </Button>
            <Button
              disabled={whenSomethingIsLoading}
              className="log-btn"
              onClick={() => setCurrentLog(logs[0])}
            >
              correction
            </Button>
            <Button className="log-btn" onClick={() => refetch()}>
              <ReloadOutlined />
            </Button>
          </>
        ) : (
          <>
            <Button
              disabled={whenSomethingIsLoading}
              className="log-btn"
              onClick={() => setIsVisibleHistoryLog(true)}
            >
              History
            </Button>
            {currentLog.status === "dr" && (
              <Button
                disabled={whenSomethingIsLoading}
                className="log-btn"
                onClick={() => setIsVisibleNormalize(true)}
              >
                Normalize
              </Button>
            )}
            <Button
              disabled={whenSomethingIsLoading || isAlreadyClicked}
              className="log-btn"
              onClick={onInsertDutyStatus}
            >
              Insert Duty Status
            </Button>
            {["off", "off_pc", "sb", "on", "on_ym"].includes(
              currentLog.status
            ) &&
              !currentLog.isNewLog &&
              driverData?.data?.currentStatus !== "dr" && (
                <Button
                  disabled={whenSomethingIsLoading}
                  className="log-btn"
                  onClick={() => setIsVisibleTransfer(true)}
                >
                  Transfer
                </Button>
              )}
            <Button
              disabled={whenSomethingIsLoading}
              onClick={() => onCancel()}
              className="log-btn"
            >
              cancel
            </Button>
            {isLogsEdited ? (
              <Button
                disabled={whenSomethingIsLoading}
                className="log-btn"
                type="primary"
                onClick={() => onSend()}
              >
                Send
              </Button>
            ) : (
              // <Button
              //      className="log-btn"
              //      onClick={() => onOk()}
              // >
              //      Ok
              // </Button>
              <Button
                disabled={whenSomethingIsLoading}
                className="log-btn"
                onClick={() => onOk()}
              >
                Ok
              </Button>
            )}
            <Button
              disabled={whenSomethingIsLoading}
              className="log-btn"
              onClick={() => refetch()}
            >
              <ReloadOutlined />
            </Button>
          </>
        )}
      </div>
      <FormModal
        modalTitle="Insert info log"
        onCancel={() => setIsVisibleInsertInfoLog(false)}
        onOk={handleInserInfoLogSubmit}
        open={isVisibleInsertInfoLog}
        formId={"insert-info-log"}
        closable
        okText="Add info log"
        width="700px"
        bodyStyle={{
          overflowY: "auto",
          maxHeight: "calc(100vh - 200px)",
        }}
      >
        <InsertInfoLog
          formData={infoLogFormData}
          onInsert={onInsertInfoLog}
          onCancel={() => setIsVisibleInsertInfoLog(false)}
        />
      </FormModal>
      <Modal
        title="History"
        onCancel={() => setIsVisibleHistoryLog(false)}
        open={isVisibleHistoryLog}
        zIndex={1004}
        width="1200px"
      >
        <HistoryTable
          historyLogs={historyLogs}
          logs={logs}
          setIsHistoryLogVisible={setIsVisibleHistoryLog}
          onRevert={onRevert}
        />
      </Modal>
      {/* <Modal
                    title="Original logs"
                    onCancel={() => setIsVisibleOriginalLogs(false)}
                    visible={isVisibleOriginalLogs}
                    width="1100px"
                    bodyStyle={{
                         padding: 20,
                    }}
               >
                    <OriginalLogs logs={logs} />
               </Modal> */}
      <Modal
        title="Normalize logs"
        onCancel={() => setIsVisibleNormalize(false)}
        open={isVisibleNormalize}
        width="900px"
        bodyStyle={{
          padding: 40,
        }}
      >
        <Normalize onNormalize={onNormalize} />
      </Modal>
      <Modal
        title="Transfer log"
        onCancel={() => setIsVisibleTransfer(false)}
        open={isVisibleTransfer}
        width="900px"
        bodyStyle={{
          padding: 40,
        }}
      >
        {/* @ts-ignore */}
        <TransferLogs
          onCancel={() => setIsVisibleTransfer(false)}
          transferStatus={transferStatus}
          isVisibleTransfer={isVisibleTransfer}
          currentLog={currentLog}
          initialTime={initialTime}
          onTransfer={onTransfer}
        />
      </Modal>
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
            initialTime={initialTime / 1000}
            reportData={reportData}
          />
        </div>
      </Modal>
    </div>
  );
};

export default LogActions;
