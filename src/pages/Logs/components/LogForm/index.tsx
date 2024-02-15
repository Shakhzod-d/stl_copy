import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Col, Row, Tag } from "antd";
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

  return (
    <Accordion
      className="mb-24 mt-24"
      title="Log form"
      content={
        <div>
          <Tag
            style={{
              width: "100%",
              fontSize: 20,
              padding: 10,
              marginBottom: 10,
            }}
            icon={<ExclamationCircleOutlined />}
            color="error"
          >
            Warning alert: No Signature!
          </Tag>
          <Row gutter={[35, 12]}>
            <Col span={12}>Driver</Col>
            <Col span={12}>Temurbek Rajapboyev</Col>
            <Col span={12}>Distance</Col>
            <Col span={12}>666 ml</Col>
            <Col span={12}>Co Driver</Col>
            <Col span={12}>6</Col>
            <Col span={12}>Truck</Col>
            <Col span={12}>1010</Col>
            <Col span={12}>Trailers</Col>
            <Col span={12}>
              <Tag color="#686868">103</Tag>
            </Col>
            <Col span={12}>Shipping Docs</Col>
            <Col span={12}>
              <Tag color="#686868">123456</Tag>
            </Col>
            <Col span={12}>From</Col>
            <Col span={12}>New york</Col>
            <Col span={12}>To</Col>
            <Col span={12}>Broklyn</Col>
            <Col span={12}>Signature</Col>
            <Col span={12}>
              {!!logData && logData?.hasOwnProperty("lastCertify") ? (
                <img
                  width={50}
                  src={`https://ptapi.roundedteam.uz/public/uploads/signatures/${logData?.lastCertify?.signatureImg}`}
                  alt="signeture"
                />
              ) : (
                <Tag color="red">No signature!</Tag>
              )}
            </Col>
          </Row>
        </div>
      }
    />
  );
};

export default LogForm;
