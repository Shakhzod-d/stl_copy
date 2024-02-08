import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Col, Row, Tag } from "antd";
import React from "react";
import Accordion from "@/components/elements/Accordion";

const LogForm: React.FC = () => {
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
              <Tag color="red">No signature!</Tag>
            </Col>
          </Row>
        </div>
      }
    />
  );
};

export default LogForm;
