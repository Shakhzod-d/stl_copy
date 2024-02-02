import React, { useState, useEffect } from "react";
import DurationPicker from "react-duration-picker";
import TimePicker from "@/components/elements/TimePicker";
import moment, { Moment } from "moment-timezone";
import { Button } from "antd";
import { MutationStatus } from "react-query";
import { ILog } from "@/types/log.type";
import { useLogsInnerContext } from "../../LogsInner.context";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { updateLogsTransfer } from "@/store/slices/logSlice";

interface IDuration {
  hours?: number;
  minutes: number;
  seconds: number;
}
const TransferLogs: React.FC<{
  onCancel: () => void;
  currentLog: ILog | null;
  initialTime: number;
  onTransfer: (duration: number, currentLog: ILog) => void;
  transferStatus: MutationStatus;
  isVisibleTransfer: boolean;
}> = ({
  onCancel,
  currentLog,
  initialTime,
  onTransfer,
  transferStatus,
  isVisibleTransfer,
}) => {
  const {
    state: { ids },
    actions: { setIds },
  } = useLogsInnerContext();
  const dispatch = useDispatch<AppDispatch>();
  // const initDur: IDuration = {
  // hours: Math.trunc((log.end - log.start) / (60 * 60)),
  // minutes: Math.trunc((log.end - log.start) / (60 * 60 * 60))
  // seconds: Math.trunc((log.end - log.start) / (60 * 60 * 60))
  // };
  // useEffect(() => {
  //      setDuration(0);
  // }, []);
  const [duration, setDuration] = useState<number>(
    currentLog ? currentLog?.end - currentLog?.start + initialTime : 0
  );

  const handleDurationChange = (val: Moment) => {
    // Get the duration in seconds and update the state
    const durationInSeconds =
      val.hours() * 3600 + val.minutes() * 60 + val.seconds();
    // setDuration(durationInSeconds);
    setDuration(val.unix());
    setIds((prev) => ({ ...prev, time: durationInSeconds }));
    // console.log(`durationInSeconds`, durationInSeconds);
  };

  const handleTranferLog = () => {
    // console.log("this is log transfer");
    const tempObj = {
      ...ids,
      onCancel,
    };
    dispatch(updateLogsTransfer(tempObj));
  };

  useEffect(() => {
    // if (transferStatus === "success") {
    setDuration(
      currentLog ? currentLog?.end - currentLog?.start + initialTime : 0
    );
    // }
  }, [currentLog]);

  // const onChange = (duration: IDuration) => {
  //      const { hours, minutes, seconds } = duration;
  //      setDuration({ hours, minutes, seconds });
  // };

  return (
    <div>
      <h3>Responsibility warning</h3>
      <p className="color-main medium-16 mb-4"> 
        ELD ELD Inc, as your service provider, is not responsible for any
        financial or legal repercussions resulting from facilitating your
        request. It is the sole responsibility of the user to maintain legal
        compliance while using ELD.
      </p>
      <TimePicker
        label="Duration"
        required
        value={moment.unix(duration)}
        name="duration"
        // onChange={(val) => setDuration(val.unix())}
        onChange={handleDurationChange}
      />
      <div className="d-flex justify-end mt-32">
        <Button
          // @ts-ignore
          // onClick={() => onTransfer(duration, currentLog)}
          onClick={handleTranferLog}
          className="mr-32"
          type="primary"
          disabled={ids._id1 === "" || ids._id2 === "" || ids.time === 0}
        >
          OK
        </Button>
        <Button className="mr-32">Cancel</Button>
      </div>
    </div>
  );
};

export default TransferLogs;
