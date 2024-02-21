import React from "react";
import {
  BREAK_TIME_LIMIT,
  CYCLE_TIME_LIMIT,
  DRIVE_TIME_LIMIT,
  SHIFT_TIME_LIMIT,
} from "../../../pages/Logs/components/constants";
import { historyPush, historyReplace, successMessage } from "@/utils";
import Icon from "../../icon/Icon";
import { IDeviceInfo, TItemStatus } from "@/types";
import DeviceInfo from "../DeviceInfo";
import DeleteConfirm from "../PopConfirms/DeleteConfirm";
import moment from "moment-timezone";
import { secondsToHoursAndMinutes } from "@/pages/Logs/helper";

export const ClipLocation = (position: { lat: number; lng: number }) => {
  // console.log(`position`, position);
  return (
    <div
      className="clip-board"
      onClick={() =>
        navigator.clipboard
          .writeText(
            `https://www.google.com/maps/search/?api=1&query=${position.lat},${position.lng}`
          )
          .then(() => successMessage("Location copied to clipboard"))
      }
    >
      <Icon icon="file-copy" />
    </div>
  );
};

export const DriverStatus = (status: TItemStatus) => {
  return (
    <span className={`driver-status ${status ? status : "active"}`}>
      {status ? status : "active"}
    </span>
  );
};
export const DriverIsActive = (isActive: boolean = false) => {
  return (
    <span className={`driver-is-active ${isActive ? "active" : "inactive"}`}>
      {isActive ? "active" : "inactive"}
    </span>
  );
};
export const TableStatus = (isActive: boolean) => {
  return (
    <span className={`status ${isActive ? "active" : "inactive"}`}>
      {isActive ? "active" : "inactive"}
    </span>
  );
};

export const TableDeviceInfo = (props: IDeviceInfo) => {
  return props ? <DeviceInfo {...props} /> : "-";
};

export const VehicleMakeModel = (order: any) => {
  return `${order.make}/${order.model}`;
};

export const TableAction: React.FC<{
  updatePush?: any;
  replace?: boolean;
  updateFunction?: (props?: any) => void;
  confirmTitle?: any;
  onDeleteConfirm?: (props?: any) => void;
  children?: React.ReactNode;
}> = ({
  updatePush,
  updateFunction,
  confirmTitle,
  replace = false,
  onDeleteConfirm,
  children,
}) => {
  return (
    <div className="action-table">
      {children ? (
        children
      ) : (
        <div
          onClick={() => {
            console.log(1);
            if (typeof updateFunction === "function") {
              updateFunction?.();
            }
            if (replace) {
              historyReplace(updatePush);
            } else {
              historyPush(updatePush);
            }
          }}
        >
          <Icon icon="pencil" className="pencil" />
        </div>
      )}
      <DeleteConfirm onConfirm={onDeleteConfirm} title={confirmTitle} />
    </div>
  );
};

export const AppVersion = (app_version: string) => (
  <div className="app_version">
    <Icon icon="android" className="green mr-4" /> <span>{app_version}</span>
  </div>
);

export const TrackNo = (no: string) => (
  <div className="track-no">
    <Icon icon="track" />
    {no}
  </div>
);

export const DriverCondition = () => {
  const Element = ({ statusTimeLeft, status, LIMIT }: any) => {
    return (
      <div className={`driver-condition ${status}`}>
        <span className="driver-condition-title">
          {status !== "cycle"
            ? moment.utc(statusTimeLeft * 1000).format("HH:mm")
            : secondsToHoursAndMinutes(statusTimeLeft)}
          {/*  : `${Math.trunc(statusTimeLeft / (60 * 60))}` ?? 0} */}
        </span>
        <div className="driver-condition-bar">
          <div
            className="driver-condition-progress"
            style={{
              width: `${100 * (statusTimeLeft / LIMIT) ?? 0}%`,
            }}
          />
          <div className="driver-condition-dots">
            {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((el, index) => (
              <span className="dot" key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  };
  const Break = (data: any) => (
    <Element statusTimeLeft={data} status="break" LIMIT={BREAK_TIME_LIMIT} />
  );
  const Drive = (data: any) => (
    <Element statusTimeLeft={data} status="drive" LIMIT={DRIVE_TIME_LIMIT} />
  );
  const Shift = (data: any) => (
    <Element statusTimeLeft={data} status="shift" LIMIT={SHIFT_TIME_LIMIT} />
  );
  const Cycle = (data: any) => (
    <Element statusTimeLeft={data} status="cycle" LIMIT={CYCLE_TIME_LIMIT} />
  );
  return { Break, Drive, Shift, Cycle };
};
