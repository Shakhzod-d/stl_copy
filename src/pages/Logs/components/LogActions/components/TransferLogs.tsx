import React, { useState, useEffect } from "react";
import DurationPicker from "react-duration-picker";
import TimePicker from "@/components/elements/TimePicker";
import moment from "moment-timezone";
import { Button } from "antd";
import { MutationStatus } from "react-query";
import { ILog } from "@/types/log.type";

interface IDuration {
  hours?: number;
  minutes: number;
  seconds: number;
}
const TransferLogs: React.FC<{
  currentLog: ILog | null;
  initialTime: number;
  onTransfer: (duration: number, currentLog: ILog) => void;
  transferStatus: MutationStatus;
  isVisibleTransfer: boolean;
}> = ({
  currentLog,
  initialTime,
  onTransfer,
  transferStatus,
  isVisibleTransfer,
}) => {
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
        STL ELD Inc, as your service provider, is not responsible for any
        financial or legal repercussions resulting from facilitating your
        request. It is the sole responsibility of the user to maintain legal
        compliance while using ELD.
      </p>
      <TimePicker
        label="Duration"
        required
        value={moment.unix(duration)}
        name="duration"
        onChange={(val) => setDuration(val.unix())}
      />
      <div className="d-flex justify-end mt-32">
        <Button
          // @ts-ignore
          onClick={() => onTransfer(duration, currentLog)}
          className="mr-32"
          type="primary"
          disabled={transferStatus === "loading" || duration === 0}
        >
          OK
        </Button>
        <Button className="mr-32">Cancel</Button>
      </div>
    </div>
  );
};

export default TransferLogs;
