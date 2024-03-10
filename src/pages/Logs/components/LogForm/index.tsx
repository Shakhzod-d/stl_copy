import { ControlFilled, ExclamationCircleOutlined } from "@ant-design/icons";
import { Col, Modal, Row, Table, Tag, message } from "antd";
import React, { useEffect, useState } from "react";
import Accordion from "@/components/elements/Accordion";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getItems, putLogForm } from "@/store/slices/logSlice";
import { AppDispatch } from "@/store";
import Icon from "@/components/icon/Icon";
import { EditForm } from "./components";

interface ILogForm {
  logData: any;
}

const LogForm = ({ logData }: ILogForm) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [upData, setUpData] = useState(null)
  const state = useSelector((state) => state);
  // const {
  //   driver = "",
  //   mile = 0,
  //   notes,
  //   trailers = "",
  //   //@ts-ignore
  // } = state?.log?.logForm;
  // notes, trailers, shipping docs ni edit qilsa bo'ladi
  const params: { id: "" } = useParams();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  // @ts-ignore
  let stateLogForm = state?.log?.logForm;
  let upDate = location?.search?.split("=")[1].slice(0, 10);

  const handleLogForm = async (data: any) => {
    if (!data.driver || !data.trailers || !data.notes || !data.documents) {
      return;
    }

    dispatch(putLogForm(data));
    setUpData(data)
    setOpenEdit(false);
    message.success("Success");
  };

  useEffect(() => {
    const url = `/mainInfo?driverId=${params?.id}&date=${location?.search
      ?.split("=")[1]
      .slice(0, 10)}`;
    dispatch(getItems(url));
  }, [upDate, upData]);

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
      title: "Notes",
      dataIndex: "notes",
      key: "notes",
    },
    {
      title: "Shipping Docs",
      dataIndex: "shippingDocs",
      key: "shippingDocs",
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
    {
      title: "action",
      render: (item: any) => {
        // console.log(`id`, item);
        return (
          <div className="action-table">
            {item.key === "_id" ? (
              "Edit not working"
            ) : (
              <div onClick={() => setOpenEdit(true)}>
                <Icon icon="pencil" className="pencil" />
              </div>
            )}
          </div>
        );
      },
    },
    // {
    //   title: "Delete",
    //   dataIndex: "delete",
    //   key: "delete",
    //   render: (signature: string) => {
    //     return (
    //       <div className="action-table">
    //         <div onClick={() => {}}>
    //           <Icon icon="trash" className="pencil" />
    //         </div>
    //       </div>
    //     );
    //   },
    // },
  ];

  const dataSource = [
    {
      // @ts-ignore
      key: state?.log?.logForm?._id || "_id",
      // @ts-ignore
      name: state?.log?.logForm?.driver || "no name",
      // @ts-ignore
      distance: `${state?.log?.logForm?.mile || 0} ml`,
      // @ts-ignore
      coDriver: state?.log?.logForm?.coDriver || "no codriver",
      // @ts-ignore
      truck: state?.log?.logForm?.vehicleUnit || "no vehicle number",
      // @ts-ignore
      trailers: state?.log?.logForm?.trailers || "no trailer",
      // @ts-ignore
      shippingDocs: state?.log?.logForm?.documents || "no shipping docs",
      // @ts-ignore
      notes: state?.log?.logForm?.notes || "",
      signature: `https://ptapi.roundedteam.uz/public/uploads/signatures/${logData?.lastCertify?.signatureImg}`,
    },
  ];

  return (
    <Accordion
      className="mb-24 mt-24"
      title="Log form"
      content={
        <div>
          {/*  @ts-ignore */}
          {openEdit && (
            <EditForm
              item={stateLogForm}
              handleLogForm={handleLogForm}
              setOpenEdit={setOpenEdit}
            />
          )}
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
