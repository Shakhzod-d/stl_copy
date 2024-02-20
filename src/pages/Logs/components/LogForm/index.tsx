import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Col, Row, Table, Tag } from "antd";
import React, { useEffect } from "react";
import Accordion from "@/components/elements/Accordion";

interface ILogForm {
  logData: any;
}

const LogForm = ({ logData }: ILogForm) => {
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
      title: "Truck",
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
      key: "1",
      name: "Temurbek Rajapboyev",
      distance: "666 ml",
      coDriver: "6",
      truck: "1010",
      trailers: "103",
      shippingDocs: "123456",
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
