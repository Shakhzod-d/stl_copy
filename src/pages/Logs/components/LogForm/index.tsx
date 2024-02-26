import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Col, Row, Table, Tag } from "antd";
import React, { useEffect } from "react";
import Accordion from "@/components/elements/Accordion";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getItems } from "@/store/slices/logSlice";
import { AppDispatch } from "@/store";

interface ILogForm {
  logData: any;
}

const LogForm = ({ logData }: ILogForm) => {
  const state = useSelector((state) => state);
  const {
    _id,
    driver = "",
    mile = 0,
    notes,
    trailers = "",
    //@ts-ignore
  } = state?.log?.logForm;
  // notes, trailers, shipping docs ni edit qilsa bo'ladi
  const params: { id: "" } = useParams();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  console.log(`state`, state);

  useEffect(() => {
    const url = `/mainInfo?driverId=${params?.id}&date=${location?.search
      ?.split("=")[1]
      .slice(0, 10)}`;
    dispatch(getItems(url));
  }, []);

  // moment().unix()
  // useEffect(() => {
  //   // https://ptapi.roundedteam.uz/public/uploads/signatures/5d851f2a5809f34ba196f7b46dc627de.jpg
  //   if (!!logData && logData?.hasOwnProperty("lastCertify")) {
  //     const imageUrl = `https://ptapi.roundedteam.uz/public/uploads/signatures/${logData?.lastCertify?.signatureImg}`;
  //     console.log(`logData`, imageUrl);
  //   }
  // }, []);
  const columns = [
    {
      title: "Driver",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Distance",
      dataIndex: "distance",
      key: "distance",
    },
    {
      title: "Co Driver",
      dataIndex: "coDriver",
      key: "coDriver",
    },
    {
      title: "vehicle number",
      dataIndex: "truck",
      key: "truck",
    },
    {
      title: "Trailers",
      dataIndex: "trailers",
      key: "trailers",
    },
    {
      title: "Shipping Docs",
      dataIndex: "shippingDocs",
      key: "shippingDocs",
    },
    {
      title: "From",
      dataIndex: "from",
      key: "from",
    },
    {
      title: "To",
      dataIndex: "to",
      key: "to",
    },
    {
      title: "Signature",
      dataIndex: "signature",
      key: "signature",
      render: (signature: string) => {
        return !!logData && logData?.hasOwnProperty("lastCertify") ? (
          <img width={200} src={signature} alt="signeture" />
        ) : (
          <Tag color="red">No signature!</Tag>
        );
      },
    },
  ];

  const dataSource = [
    {
      key: _id,
      name: driver,
      distance: `${mile} ml`,
      coDriver: "6",
      truck: "1010",
      trailers: trailers,
      shippingDocs: "123456",
      notes,
      from: "New york",
      to: "Broklyn",
      signature: `https://ptapi.roundedteam.uz/public/uploads/signatures/${logData?.lastCertify?.signatureImg}`,
    },
  ];

  return (
    <Accordion
      className="mb-24 mt-24"
      title="Log form"
      content={
        <div>
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={{ position: [] }}
          />
        </div>
      }
    />
  );
};

export default LogForm;
