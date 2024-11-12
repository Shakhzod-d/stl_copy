import React, { useRef, useState } from "react";
import {
  AddBtn,
  DeleteImg,
  Div,
  ImgContainer,
  Label,
  Note,
  StyleFlex,
  UploadBtn,
} from "./styled";
import { TiDownload } from "react-icons/ti";
import { Text } from "../../utils/constants";
import { FaPlus } from "react-icons/fa6";
import { Form } from "antd";
import { PrimaryBtn } from "../units/units-styled";
import { DefaultBtn } from "../drivers/styled";
import { FormInput } from "../../components/ui";
import useApiMutation from "@/hooks/useApiMutation";
import { errorMessage, successMessage } from "../../utils/message";
import { validatePhoneNumber } from "../../utils/method";
import { Flex } from "@/track/components/shared/drivers-header/drivers-header-styled";
import { AxiosResponse } from "axios";
import { getLocalStorage } from "@/utils";

interface CompanyData {
  [key: string]: number | boolean | string;
}

export const TabCompany = () => {
  const companyMutation = useApiMutation("/company", { hideMessage: true });
  const logoMutation = useApiMutation("/company/logo", { hideMessage: true });
  const roleId = getLocalStorage("roleId");
  const companyId = getLocalStorage("companyId");
  const [form] = Form.useForm();

  const handleReset = () => {
    form.resetFields(); // Formani tozalash
    removeImage(); // Rasmni ham tozalash
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

  const submitCompanyData = (CompanyData: CompanyData) => {
    companyMutation.mutate(CompanyData, {
      onSuccess: () => {
        successMessage("Company added");
        handleReset(); // Formani va rasmni tozalash
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
      companyId,
      roleId,
    };

    if (imagePreview && formData.current.has("file")) {
      // Agar `imagePreview` mavjud bo'lsa, `logoMutation`ni ishga tushirish
      logoMutation.mutate(formData.current, {
        onSuccess: (res: AxiosResponse) => {
          const updatedCompanyData = {
            ...preparedData,
            logo: res.data,
            companyId,
            roleId,
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
    <Form style={{ maxWidth: "100%" }} onFinish={submit} form={form}>
      <StyleFlex>
        <Div>
          <Label>Company Name*</Label>
          <FormInput
            name="companyName"
            bg="#ffffff"
            padding="25px 10px"
            h="69px"
            rules={[
              { required: true, message: "Please input your CompanyName!" },
            ]}
          />
        </Div>
        <Div>
          <Label>USDOT*</Label>
          <FormInput
            name="usdot"
            bg="#ffffff"
            padding="25px 10px"
            h="69px"
            rules={[{ required: true, message: "Please input your Usdot!" }]}
          />
        </Div>
        <Div>
          <Label>Terminal Address*</Label>
          <FormInput
            name="homeTerminalAddress"
            bg="#ffffff"
            padding="25px 10px"
            h="69px"
            rules={[
              {
                required: true,
                message: "Please input your Terminal Address!",
              },
            ]}
          />
        </Div>
        <AddBtn type="primary">
          <FaPlus />
        </AddBtn>
      </StyleFlex>

      <StyleFlex>
        <Div>
          <Label>Country</Label>
          <FormInput
            // name="country"
            bg="#ffffff"
            padding="25px 10px"
            h="69px"
          />
        </Div>
        <Div>
          <Label>Status</Label>
          <FormInput name="status" bg="#ffffff" padding="25px 10px" h="69px" />
        </Div>
        <Div>
          <Label>Zip</Label>
          <FormInput
            name="zip"
            bg="#ffffff"
            padding="25px 10px"
            h="69px"
            rules={[{ required: true, message: "Please input your Zip!" }]}
            type="number"
          />
        </Div>
        <Div>
          <Label>City</Label>
          <FormInput name="city" bg="#ffffff" padding="25px 10px" h="69px" />
        </Div>
      </StyleFlex>

      <StyleFlex>
        <Div>
          <Label>Address Line 1</Label>
          <FormInput
            name="companyAddress"
            bg="#ffffff"
            padding="25px 10px"
            h="69px"
            rules={[
              {
                required: true,
                message: "Please input your companyAddress!",
              },
            ]}
          />
        </Div>
        <Div>
          <Label>Address Line 2</Label>
          <FormInput
            name="companyAddress2"
            bg="#ffffff"
            padding="25px 10px"
            h="69px"
          />
        </Div>
        <Div>
          <Label>Company Timezone*</Label>
          <FormInput
            name="homeTerminalTimezone"
            bg="#ffffff"
            padding="25px 10px"
            h="69px"
            rules={[
              {
                required: true,
                message: "Please input your homeTerminalTimezone!",
              },
            ]}
          />
        </Div>
        <Div>
          <Label>State</Label>
          <FormInput
            name="state"
            bg="#ffffff"
            padding="25px 10px"
            h="69px"
            rules={[{ required: true, message: "Please input your State!" }]}
          />
        </Div>
      </StyleFlex>

      <StyleFlex>
        <Div>
          <Label>Start of week</Label>
          <FormInput
            name="startOfWeek"
            bg="#ffffff"
            padding="25px 10px"
            h="69px"
          />
        </Div>
        <Div>
          <Label>Email</Label>
          <FormInput
            name="mail"
            bg="#ffffff"
            padding="25px 10px"
            h="69px"
            rules={[
              { required: true, message: "Please input your Email!" },
              {
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Please enter a valid email address!",
              },
            ]}
          />
        </Div>
        <Div>
          <Label>Password</Label>
          <FormInput
            name="password"
            bg="#ffffff"
            padding="25px 10px"
            h="69px"
          />
        </Div>
        <Div>
          <Label>Phone Number</Label>
          <FormInput
            rules={[{ validator: validatePhoneNumber }]}
            name="phone"
            bg="#ffffff"
            padding="25px 10px"
            h="69px"
          />
        </Div>
      </StyleFlex>

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

      <Form.Item
        name={"note"}
        rules={[
          {
            required: true,
            message: "Please input your Note!",
          },
        ]}
      >
        <Note placeholder="Note" />
      </Form.Item>

      <Flex $justify="end" $gap={"20px"}>
        <DefaultBtn onClick={handleReset}>Cancel</DefaultBtn>
        <PrimaryBtn
          padding="15px 40px"
          htmlType="submit"
          loading={
            imagePreview ? logoMutation.isLoading : companyMutation.isLoading
          }
        >
          Submit
        </PrimaryBtn>
      </Flex>
    </Form>
  );
};
