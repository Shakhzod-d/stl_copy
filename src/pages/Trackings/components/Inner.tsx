import React from "react";
// import MainLayout from "@/layouts/MainLayout";
import DatePicker from "@/components/elements/DatePicker";
import DoubleButton from "@/components/elements/DoubleButton";
import { Button } from "antd";
import Icon from "@/components/icon/Icon";
import MapContainer from "./MapContainer";
import { useParams } from "react-router-dom";
import { DriverStatus } from "@/components/elements/TableElements";
import TruckLoader from "@/components/loaders/TruckLoader";
import useApi from "@/hooks/useApi";
import { IDriverData } from "@/types/driver.type";
import { NumberParam, useQueryParam, withDefault } from "use-query-params";
import { ITracking } from "@/types/tracking.type";
import useMomentZone from "@/hooks/useMomentZone";
import moment, { Moment } from "moment";

const Inner: React.FC = () => {
  const momentZone = useMomentZone();

  // const { data, status } = useApi<ITracking>("mapDraw");
  const { id, time: initTime } = useParams<{ id: string; time: string }>();
  const value = initTime ? initTime : "";
  const [time, setTime] = useQueryParam(
    "time",
    withDefault(NumberParam, parseFloat(value))
  );

  const { data, refetch, isFetching } = useApi<ITracking>(
    "/mapDraw",
    { time: moment(time).unix(), driverId: id },
    { suspense: true }
  );

  const { data: driverData } = useApi<IDriverData>(
    `driver/${id}`,
    {},
    { suspense: true }
  );

  const handleLeft = () => {
    setTime(momentZone(time).add(-1, "day").valueOf());
  };
  const handleRight = () => {
    setTime(momentZone(time).add(1, "day").valueOf());
  };

  const onDateChange = (value: Moment) => {
    setTime(momentZone(value).valueOf());
  };

  return (
    // <MainLayout>
    <div className="trackings page">
      <div className="trackings-head">
        <div className="driver-info">
          <div className="driver-info-top">
            <span className="circle" />
            <span className="name">
              {driverData?.data?.firstName + " " + driverData?.data?.lastName}
            </span>
            <div className="status">
              {DriverStatus(driverData?.data?.currentStatus || "off")}
            </div>
          </div>
          <p className="driver-info-desc">
            Phone No: {driverData?.data?.phone}
          </p>
          <p className="driver-info-desc">
            {/* Driver ID: {DRIVER_DATA?.data?.driverId} */}
          </p>
        </div>
        <div className="driver-btn">
          <DatePicker
            onChange={onDateChange}
            value={momentZone(time)}
            className="w-200"
            disabled={isFetching}
          />
          <DoubleButton
            onLeft={handleLeft}
            onRight={handleRight}
            disableLeft={isFetching}
            disableRight={isFetching}
          />
          <Button
            className="rounded outlined"
            disabled={isFetching}
            onClick={() => refetch()}
          >
            <Icon icon="refresh" />
          </Button>
        </div>
      </div>
      {!isFetching ? (
        data?.data && <MapContainer data={data.data} />
      ) : (
        <TruckLoader />
      )}
    </div>
    // </MainLayout>
  );
};

export default Inner;
