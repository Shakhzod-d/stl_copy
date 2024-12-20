// import { Btn, TabBtn } from "../manage-user-modal/modal-styled";
import { Dispatch, SetStateAction, useRef, useState } from "react";

import { companySettingsModal, CustomModal, Text } from "@/track/constants";
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
import useApiMutation from "@/hooks/useApiMutation";
import { errorMessage, successMessage } from "@/track/utils/message";
import { CompanyData } from "@/track/types";
import {
  DeleteImg,
  ImgContainer,
  UploadBtn,
} from "@/track/pages/tab-company/styled";
import { TiDownload } from "react-icons/ti";
import {
  companyState,
  companyTimeZone,
  country,
  DataStatus,
} from "@/track/utils/constants";
import { validatePhoneNumber } from "@/track/utils/method";
import { AxiosResponse } from "axios";

const btnArr = [
  { id: 1, label: "Details" },
  { id: 2, label: "settings" },
];
interface Props {
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
  role: "add" | "edit";
  id?: string | null;
  refetch: () => void;
}

export const CompanyModal = ({ setOpen, open, role ,refetch}: Props) => {
  const dark = useSelector((state: RootState) => state.booleans.darkMode);
  const [tabId, setTabId] = useState(1);
  const selectBg = dark ? "#373737" : "#F9F9FA";
  const [form] = Form.useForm();

  // ------------- MUTATIONS
  const companyMutation = useApiMutation("/company", { hideMessage: true });
  const logoMutation = useApiMutation("/company/logo", { hideMessage: true });

  // -------- lOGO UPLOAD
  const handleReset = () => {
    form.resetFields(); // Formani tozalash
    removeImage();
    setOpen(false); // Rasmni ham tozalash
  };

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const formData = useRef(new FormData());
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileExtension = file.name.split(".").pop()?.toLowerCase();
      const allowedExtensions = ["jpg", "jpeg", "png", "svg"];

      // Fayl kengaytmasini tekshirish
      if (fileExtension && allowedExtensions.includes(fileExtension)) {
        formData.current.set("file", file); // formData ni yangilash
        setFileName(file.name);
        setImagePreview(null); // Avvalgi preview ni tozalash

        // Rasm preview uchun URL oling
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string); // Preview sifatida qo'shish
        };
        reader.readAsDataURL(file);
      } else {
        // Noto'g'ri format uchun xato xabari
        errorMessage(
          "Faqat .jpg, .jpeg, .png yoki .svg formatdagi faylni yuklang."
        );
      }
    }
  };

  const removeImage = () => {
    // Preview va fayl nomini tozalash
    setImagePreview(null);
    setFileName(null);
    formData.current.delete("file"); // formData dan ham olib tashlash
  };
  //  ---  SUBMIT DATA
  const submitCompanyData = (CompanyData: CompanyData) => {
    companyMutation.mutate(CompanyData, {
      onSuccess: () => {
        successMessage("Company added");
        handleReset(); // Formani va rasmni tozalash
        refetch()
      },
      onError: (err) => {
        errorMessage(err?.data?.error || "validation error");
      },
    });
  };

  const submit = async (data: CompanyData) => {
    const preparedData: any = {
      ...data,
      zip: Number(data.zip),
      logo: null,
    };

    if (imagePreview && formData.current.has("file")) {
      // Agar `imagePreview` mavjud bo'lsa, `logoMutation`ni ishga tushirish
      logoMutation.mutate(formData.current, {
        onSuccess: (res: AxiosResponse) => {
          const updatedCompanyData = {
            ...preparedData,
            logo: res.data,
          };
          submitCompanyData(updatedCompanyData); // `companyMutation`ni chaqirish
        },
        onError: (err) => {
          console.log(err);
          // `logoMutation` muvaffaqiyatsiz bo'lsa ham `companyMutation`ni chaqirish
          submitCompanyData(preparedData);
        },
      });
    } else {
      // Agar `imagePreview` mavjud bo'lmasa, to'g'ridan-to'g'ri `companyMutation`ni chaqirish
      submitCompanyData(preparedData);
    }
  };

  return (
    <CustomModal
      open={open}
      width={"1300px"}
      onOk={() => setOpen(false)}
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
        // initialValues={editCompany ? editCompany : undefined}
      >
        {tabId === 1 ? (
          <>
            <Flex $gap="10px" $m="0 0 10px 0">
              <FormInput
                placeholder="Account Name"
                h="60px"
                name="companyName"
              />
              <FormInput placeholder="DOT" h="60px" name="usdot" />
              <Select
                placeholder="Timezone"
                option={companyTimeZone}
                h="60px"
                w="100%"
                bg={selectBg}
                clr="#5D5E5F"
                name="homeTerminalTimezone"
              />
              <Select
                clr="#5D5E5F"
                option={country}
                w="100%"
                bg={selectBg}
                placeholder="Country"
                h="60px"
                name="country"
              />
            </Flex>
            <Flex $gap="10px" $m="0 0 10px 0">
              <FormInput
                placeholder="Address Line 1"
                h="60px"
                name="addressLine1"
              />
              <FormInput
                placeholder="Address Line 2"
                h="60px"
                name="addressLine2"
              />
              <FormInput
                placeholder="Contact phone"
                h="60px"
                name={"phone"}
                rules={[{ validator: validatePhoneNumber }]}
                type="tel"
              />
              <FormInput placeholder="City" h="60px" name="companyAddress" />
            </Flex>
            <Flex $gap="10px" $m="0 0 10px 0">
              <Select
                clr="#5D5E5F"
                placeholder="State"
                option={companyState}
                w="100%"
                h="60px"
                bg={selectBg}
                name="state"
              />
              <Select
                clr="#5D5E5F"
                option={DataStatus}
                w="100%"
                placeholder="Status"
                h="60px"
                bg={selectBg}
                name="status"
              />
            </Flex>
            <Flex $gap="10px" $m="0 0 10px 0">
              <FormInput placeholder="Zip" h="60px" name="zip" type="number" />
              <FormInput
                placeholder="Terminal Address"
                h="60px"
                name="homeTerminalAddress"
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

            <Flex $gap={"20px"} $align="center">
              <UploadBtn onClick={handleButtonClick}>
                <>
                  <TiDownload />
                  <Text> Upload company logo</Text>
                </>
                <input
                  type="file"
                  onChange={onChangeFile}
                  name="file_upload"
                  style={{ display: "none" }}
                  ref={fileInputRef}
                />
              </UploadBtn>
              {imagePreview && (
                <ImgContainer>
                  <DeleteImg onClick={removeImage}>
                    <p>x</p>
                  </DeleteImg>
                  <img
                    src={imagePreview}
                    alt="Tanlangan fayl"
                    style={{
                      width: "80px",
                      height: "80px",
                    }}
                  />
                  <Text>{fileName}</Text>
                </ImgContainer>
              )}
            </Flex>
            <Form.Item name={"note"}>
              <TextAria placeholder="Note" />
            </Form.Item>
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
              loading={companyMutation.isLoading || logoMutation.isLoading}
            >
              Save
            </Btn>
          </Flex>
        </Flex>
      </Form>
    </CustomModal>
  );
};
