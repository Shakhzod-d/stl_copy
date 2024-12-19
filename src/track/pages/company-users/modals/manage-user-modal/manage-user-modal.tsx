import { Btn, TabBtn } from "./modal-styled";
import React, { useEffect, useState } from "react";
import { Information } from "./information";
import { Permission } from "./permission";
import { CustomModal, Text } from "@/track/constants";
import { Flex } from "@/track/components/shared/drivers-header/drivers-header-styled";

import { Form } from "antd";
import useApiMutation from "@/hooks/useApiMutation";
import { errorMessage, successMessage } from "@/track/utils/message";
import { useDispatch } from "react-redux";
import { SetEditDriverModal } from "@/store/slices/booleans-slice";
import { companyDriverEditData } from "@/types/company.type";
import useApi from "@/hooks/useApi";
import { companyUserInitialValue } from "@/track/utils/mapData";
import useApiMutationID from "@/hooks/useApiMutationID";
import { log } from "console";
const btnArr = [
  { id: 1, label: "Base information" },
  { id: 2, label: "Permission" },
];
interface Props {
  modalData: companyDriverEditData;
}

const filterItems = (
  source: Record<string, any>,
  condition: (key: string, value: any) => boolean
) => {
  return Object.entries(source).reduce((result, [key, value]) => {
    // Shart bajarilsa, natijaga qo'shiladi
    if (condition(key, value)) {
      result[key] = value;
    }
    return result;
  }, {} as Record<string, any>);
};

export const errMessageFun = (data: any[]) => {
  return data.map((item) => (` ${' '+item+' '}  `))
};

export const ManageUserModal = React.memo(({ modalData }: Props) => {
  const [form] = Form.useForm();

  const { data: editData, isLoading } = useApi(
    modalData.userRole === "driver"
      ? `/driver/${modalData.id}`
      : `/user/${modalData.id}`
  );

  useEffect(() => {
    if (editData?.data) {
      const initial = companyUserInitialValue(editData.data, "driver");
      form.setFieldsValue(initial); // Form qiymatlarini o'rnatish
    }
  }, [editData, form]);

  const dispatch = useDispatch();
  const onCancelFun = () => {
    dispatch(SetEditDriverModal({ role: "add", open: false }));
    form.resetFields();
  };
  const [tabId, setTabId] = useState(1);
  const [createRole, setCreateRole] = useState("employer");

  const createRoleFun = (data: string) => {
    setCreateRole(data);
  };
  //   ------------------------------------------------------------------------ MUTATIONS

  const roleMutation = useApiMutation("/role/create", { hideMessage: true });
  const userMutation = useApiMutation("/user", { hideMessage: true });
  const driversMutation = useApiMutation("/driver", { hideMessage: true });
  const { mutate: updateMutate, isLoading: updateLoading } = useApiMutationID(
    "PUT",
    `/driver`
  );

  //   ------------------------------------------------------------------------ MUTATIONS

  const submit = (data: any) => {
    if (modalData.role !== "edit") {
      const user = filterItems(data, (key, value) => typeof value === "string");

      const role = filterItems(
        data,
        (key, value) => key === "role" || typeof value !== "string"
      );
      const driver = filterItems(
        data,
        (key, value) => typeof value === "string"
      );

      const driverData = {
        ...driver,
        notes: driver?.notes ? driver?.notes : "",
        organization: "Unity",
      };

      if (createRole === "employer") {
        console.log("employer");

        roleMutation.mutate(role, {
          onSuccess: (res) => {
            const userData = {
              firstName: user.role,
              lastName: user.lastName,
              role: {
                roleName: user.role,
                roleId: res.data?._id,
              },
              phone: user.phone,
              email: user.email,
              password: user.password,
            };

            userMutation.mutate(userData, {
              onSuccess: (res) => {
                successMessage("user created");
                modalData.refetch && modalData.refetch();
                onCancelFun();
              },
              onError: (res) => {
                errorMessage(res.message);
              },
            });
          },
        });
      } else {
        console.log("driver");
        driversMutation.mutate(driverData, {
          onSuccess: (res: unknown) => {
            console.log(res);
            successMessage("driver create success");
            // handleReset();
            // refetch();
            onCancelFun();
            modalData.refetch && modalData.refetch();
          },
          onError: (err) => {
            console.log(err);
            const err_message = err.message + " "+ errMessageFun(err.data);
            errorMessage(err_message);
          },
        });
      }
    } else {
      const id = modalData.id;
      if (id)
        updateMutate(
          { id, data },
          {
            onSuccess: () => {
              modalData.refetch && modalData.refetch();
              onCancelFun();
              // successMessage("driver update added");
            },
          }
        );
    }
  };

  return (
    <CustomModal
      width={"1300px"}
      open={modalData.open}
      // onOk={() => setOpen(false)}
      onCancel={onCancelFun}
      closable={false}
    >
      <Form form={form} onFinish={submit}>
        {/* Header */}
        <Flex $justify="space-between" $align="center" $m="20px 0">
          <Text size={30}>
            {modalData.role === "edit" ? "Edit User " : "Add User"}
          </Text>
          <Flex $gap={"6px"} $align="center">
            {createRole !== "driver" ||
              (modalData.userRole !== "driver" &&
                btnArr.map((item) => (
                  <TabBtn
                    key={item.id}
                    type="primary"
                    $active={item.id === tabId}
                    onClick={() => setTabId(item.id)}
                  >
                    {item.label}
                  </TabBtn>
                )))}
          </Flex>
        </Flex>

        {/* Tabs Content */}
        <div style={{ display: tabId === 1 ? "block" : "none" }}>
          <Information
            roleChange={createRoleFun}
            userRole={modalData.userRole}
            modalRole={modalData.role}
          />
        </div>
        <div style={{ display: tabId === 2 ? "block" : "none" }}>
          <Permission />
        </div>

        {/* Footer */}
        <Flex $justify="end" $align="center" $m="20px 0">
          <Flex $gap={"6px"}>
            <Btn type="primary" onClick={onCancelFun}>
              Close
            </Btn>
            <Btn
              type="primary"
              $type="add"
              htmlType="submit"
              loading={
                driversMutation.isLoading ||
                userMutation.isLoading ||
                roleMutation.isLoading ||
                updateLoading
              }
            >
              Add
            </Btn>
          </Flex>
        </Flex>
      </Form>
    </CustomModal>
  );
});
