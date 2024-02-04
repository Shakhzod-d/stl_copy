import React, { useState } from "react";
import FormModal from "../FormModal";
import Icon from "../../icon/Icon";
import moment from "moment-timezone";
import { IDeviceInfo } from "@/types";

const DeviceInfo: React.FC<IDeviceInfo> = (props) => {
  const [isOpen, setOpen] = useState(false);
  const handleModal = () => setOpen((p) => !p);
  return (
    <div>
      <span className="device-info" onClick={handleModal}>
        open
      </span>
      <FormModal
        open={isOpen}
        onCancel={handleModal}
        modalTitle="Device Information"
        modalLoading={false}
        okText="Require Permissions"
      >
        <ul className="device-info">
          <li className="device-info-item">
            <div className="device-info-item-icon">
              <Icon icon="battery" />
              Battery
            </div>
            <div className="device-info-item-btn">{props?.battery}%</div>
          </li>
          <DeviceStatus
            icon="blutooth"
            title="Bluetooth"
            status={props?.bluetooth}
          />
          <DeviceStatus
            icon="link"
            title="STL Connection"
            status={props?.STLConnection}
          />

          <DeviceStatus
            icon="map"
            title="GSP Permission"
            status={props?.gpsPermission}
          />
          <DeviceStatus
            icon="location"
            title="Location"
            status={props?.location}
          />
          <li className="device-info-item">
            <div className="device-info-item-icon">
              <Icon icon="watch" />
              System Time
            </div>
            <div className="device-info-item-time">
              {/* 01.12.2021 / 04:00PM */}
              {moment.unix(props?.systemTime).format("DD.MM.YYYY / HH:mm")}
            </div>
          </li>
        </ul>
      </FormModal>
    </div>
  );
};

const DeviceStatus: React.FC<{
  status: boolean;
  title: string;
  icon: string;
}> = ({ icon, status, title }) => (
  <li className="device-info-item">
    <div className="device-info-item-icon">
      <Icon icon={icon} />
      {title}
    </div>
    <div
      className={`device-info-item-btn ${status ? "on" : "off"}`}
      style={
        {
          // backgroundColor: status ? "#ee5e52 !important" : "#ee5e52 !important",
        }
      }
    >
      {status ? "on" : "off"}
    </div>
  </li>
);

export default DeviceInfo;
