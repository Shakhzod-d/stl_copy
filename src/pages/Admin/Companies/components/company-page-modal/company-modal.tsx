// import { Btn, TabBtn } from "../manage-user-modal/modal-styled";
import { Dispatch, SetStateAction, useState } from "react";

import { companySettingsModal, CustomModal } from "@/track/constants";
import {
  Btn,
  TabBtn,
  TextAria,
} from "@/track/pages/company-users/modals/manage-user-modal/modal-styled";
import { RootState } from "@/store";
import { Flex } from "@/track/components/shared/drivers-header/drivers-header-styled";
import { Select } from "@/track/components/shared/select";
import { EditModalBtn, FormInput } from "@/track/components/ui";

import { Form } from "antd";

import { useSelector } from "react-redux";
import { CompanyForm } from "@/types/company.type";
import useApiMutation from "@/hooks/useApiMutation";
import { errorMessage, successMessage } from "@/track/utils/message";

const timezone = [
  {
    label: "Eastern Standard Time (EST)",
    value: "Eastern Standard Time (EST)",
  },
  { label: "Central Standard Time(CST)", value: "Central Standard Time(CST)" },
  {
    label: "Mountain Standard Time (MST)",
    value: "Mountain Standard Time (MST)",
  },
  {
    label: "Pacific Standard Time (PST)",
    value: "Pacific Standard Time (PST)",
  },
];
const country = [
  {
    label: "US",
    value: "US",
  },
  {
    label: "CA",
    value: "CA",
  },
];

const status = [
  { label: "Active", value: "active" },
  { label: "On Hold", value: "On Hold" },
  { label: "Inactive", value: "Inactive" },
  { label: "Suspended", value: "Suspended" },
];
const state = [{ value: "ny", label: "NY" }];
const btnArr = [
  { id: 1, label: "Details" },
  { id: 2, label: "settings" },
];
interface Props {
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}

// companyAddress: "New York";
// companyName: "Saturn LLC 3";
// createdAt: "2024-10-01T05:59:33.544Z";
// driversCount: 0;
// homeTerminalAddress: "Farg'ona";
// homeTerminalTimezone: "Hawaii-Aleutian Time";
// isActive: true;
// phone: "+998900590103";
// serviceId: "643b9e2e96e9eec7c146a56f";
// trucksCount: 3;
// updatedAt: "2024-11-09T17:25:41.003Z";
// usdot: "usdot";
// _id: "66fb8fc51cd8d940cd31408e";

export const CompanyModal = ({ setOpen, open }: Props) => {
  const [tabId, setTabId] = useState(1);
  const companyMutation = useApiMutation("/company", { hideMessage: true });
  const dark = useSelector((state: RootState) => state.booleans.darkMode);

  const editCompany: any = useSelector(
    (state: RootState) => state.company.editCompany
  );

  const selectBg = dark ? "#373737" : "#F9F9FA";
  const [form] = Form.useForm();
  const handleReset = () => {
    form.resetFields();
    setOpen(false); // Formani tozalash
    // removeImage(); // Rasmni ham tozalash
  };
  const submit = (data: CompanyForm) => {
    const preparedData: any = {
      ...data,
      zip: Number(data.zip),
    };

    companyMutation.mutate(preparedData, {
      onSuccess: () => {
        successMessage("Company added");
        handleReset(); // Formani va rasmni tozalash
      },
      onError: (err) => {
        errorMessage(err?.data?.error || "validation error");
      },
    });
  };

  return (
    <CustomModal
      open={open}
      width={"1300px"}
      // onOk={() => setOpen(false)}
      onCancel={handleReset}
    >
      <Flex $justify="" $align="center" $m={"0 0 15px 0"}>
        <Flex $gap={"8px"} $align="center">
          {btnArr.map((item) => (
            <TabBtn
              key={item.id}
              type="primary"
              $active={item.id === tabId}
              onClick={() => setTabId(item.id)}
            >
              {item.label}
            </TabBtn>
          ))}
        </Flex>
      </Flex>
      <Form
        onFinish={submit}
        form={form}
        initialValues={editCompany ? editCompany : undefined}
      >
        {tabId === 1 ? (
          <>
            <Flex $gap="10px" $m="0 0 10px 0">
              <FormInput
                placeholder="Account Name"
                h="60px"
                name="companyName"
                // value={
                //   Boolean(editCompany) ? editCompany?.companyName : undefined
                // }
              />
              <FormInput
                placeholder="DOT"
                h="60px"
                name="usdot"
                // value={editCompany ? editCompany?.usdot : undefined}
              />
              <Select
                placeholder="Timezone"
                option={timezone}
                h="60px"
                w="100%"
                bg={selectBg}
                clr="#5D5E5F"
                name="homeTerminalTimezone"
                // dValue={
                //   initialValue
                //     ? timezone.find(
                //         (item) =>
                //           item.value === initialValue?.homeTerminalTimezone
                //       )
                //     : undefined
                // }
              />
              <Select
                clr="#5D5E5F"
                option={country}
                w="100%"
                bg={selectBg}
                placeholder="Country"
                h="60px"
                name="homeTerminalAddress"
                // dValue={
                //   initialValue
                //     ? country.find(
                //         (item) =>
                //           item.value === initialValue?.homeTerminalAddress
                //       )
                //     : undefined
                // }
              />
            </Flex>
            <Flex $gap="10px" $m="0 0 10px 0">
              <FormInput
                placeholder="Address Line 1"
                h="60px"
                name="companyAddress"
                // value={initialValue ? initialValue?.companyAddress : undefined}
              />
              <FormInput placeholder="Address Line 2" h="60px" />
              <FormInput placeholder="Contact phone" h="60px" />
              <FormInput placeholder="City" h="60px" />
            </Flex>
            <Flex $gap="10px" $m="0 0 10px 0">
              <Select
                clr="#5D5E5F"
                placeholder="State"
                option={state}
                w="100%"
                h="60px"
                bg={selectBg}
                name="state"
                // dValue={
                //   initialValue
                //     ? state.find((item) => item.value === initialValue?.state)
                //     : undefined
                // }
              />
              <Select
                clr="#5D5E5F"
                option={status}
                w="100%"
                placeholder="Status"
                h="60px"
                bg={selectBg}
              />
            </Flex>
            <Flex $gap="10px" $m="0 0 10px 0">
              <FormInput
                placeholder="Zip"
                h="60px"
                name="zip"
                type="number"
                // value={initialValue ? initialValue.zip : undefined}
              />
              <FormInput
                placeholder="Phone"
                h="60px"
                name="phone"
                // value={initialValue ? initialValue.phone : undefined}
              />
              <FormInput
                placeholder="Email"
                h="60px"
                type="email"
                name="mail"
                // value={initialValue ? initialValue.mail : undefined}
              />
              <FormInput
                placeholder="password"
                h="60px"
                type="password"
                name="password"
                // value={initialValue ? initialValue.password : undefined}
              />
            </Flex>
            <TextAria
              placeholder="Note"
              // value={initialValue ? initialValue.note : undefined}
            />
          </>
        ) : (
          companySettingsModal?.map((col) => (
            <Flex key={col.id} $vertical={true} $gap={"20px"}>
              {col.options.map((item) => (
                <Flex $vertical={true} $gap={"15px"} style={{ margin: "40px" }}>
                  <Flex $gap={"15px"}>
                    {item.buttons.map((btn) => (
                      <EditModalBtn
                        key={btn.id}
                        text={btn.text}
                        isActive={btn.isActive}
                      />
                    ))}
                  </Flex>
                </Flex>
              ))}
            </Flex>
          ))
        )}
        <Flex $justify="end">
          <Flex $gap={"6px"}>
            <Btn type="primary" onClick={handleReset}>
              Close
            </Btn>

            <Btn
              type="primary"
              $type="add"
              htmlType="submit"
              loading={companyMutation.isLoading}
            >
              Save
            </Btn>
          </Flex>
        </Flex>
      </Form>
    </CustomModal>
  );
};
