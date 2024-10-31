import { AddBtn, Div, Label, Note, StyleFlex, UploadBtn } from "./styled";
import { TiDownload } from "react-icons/ti";
import { Text } from "../../utils/constants";
import { FaPlus } from "react-icons/fa6";
import { Form } from "antd";
import { PrimaryBtn } from "../units/units-styled";
import { DefaultBtn } from "../drivers/styled";
import { FormInput } from "../../components/ui";
// import useApiMutation from "../../hooks/useApiMutation";
import { errorMessage, successMessage } from "../../utils/message";
import { validatePhoneNumber } from "../../utils/method";
import { Flex } from "@/track/components/shared/drivers-header/drivers-header-styled";

import useApiMutation from "@/hooks/useApiMutation";
import { useImageHandler } from "@/track/hooks/use-debauce";


interface CompanyData {
  [key: string]: number | boolean | string;
}

export const TabCompany = () => {
  const companyMutation = useApiMutation("/company", { hideMessage: true });

  const { image, handleImageUpload, handleRemoveImage } = useImageHandler();
  // Append the file with the key 'file'import axios from "axios";


  // const submitImage = async (imageUrl: string) => {
  //   try {
  //     const formData = new FormData();

  //     // Rasm URL'sini FormData'ga qo'shamiz
  //     formData.append("file", imageUrl); // Rasm URL'sini qo'shish

  //     // So‘rovni backend'ga jo‘natamiz
  //     const backendResponse = await api.post("/company/logo", formData, {
  //       headers: {
  //         Authorization: `Bearer ${companyId}`, // Kerakli header
  //         "Content-Type": "multipart/form-data", // Mavjud bo'lishi kerak
  //       },
  //     });

  //     // Konsolda backend javobini ko'rsatamiz
  //     console.log("backendResponse:", backendResponse);

  //     if (backendResponse.data.success) {
  //       // Yuklangan rasmning to'liq URL manzilini yarating
  //       const uploadedImageUrl = `https://unityapi.roundedteam.uz/public/uploads/companyLogos/${backendResponse.data.data}`;
  //       console.log("Rasm yuklandi:", uploadedImageUrl);

  //       // Rasmdan foydalangan holda img tegini yarating yoki ko'rsating
  //       const img = document.createElement("img");
  //       img.src = uploadedImageUrl;
  //       img.alt = "Yuklangan Rasm";
  //       img.width = 200; // O'lchamini kerakli qiymatda o'zgartiring
  //       document.body.appendChild(img);
  //     } else {
  //       console.error(
  //         "Yuklashda xatolik yuz berdi:",
  //         backendResponse.data.message
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Rasm yuklashda xatolik:", error);
  //   }
  // };
  // const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // // Rasm tanlash uchun funksiya
  // const handleImageUpload = () => {
  //   const fileInput = document.createElement("input");
  //   fileInput.type = "file";
  //   fileInput.accept = "image/*";

  //   fileInput.onchange = () => {
  //     const file = fileInput.files?.[0];
  //     if (file) {
  //       const reader = new FileReader();
  //       reader.onload = () => {
  //         setSelectedImage(reader.result as string);
  //       };
  //       reader.readAsDataURL(file);
  //     }
  //   };

  //   fileInput.click();
  // };

  // // Rasmni olib tashlash uchun funksiya
  // const handleRemoveImage = () => {
  //   setSelectedImage(null);
  // };

  // Example: Buni buttonga ishlatish

  const [form] = Form.useForm();

  const handleReset = () => {
    form.resetFields(); // Formani tozalash
  };

  const submit = async (data: CompanyData) => {
    const CompanyData = {
      ...data,
      zip: Number(data.zip),
    };

    console.log(CompanyData);

    companyMutation.mutate(CompanyData, {
      onSuccess: (res: unknown) => {
        successMessage("company added");
        handleReset();
      },
      onError: (err) => {
        errorMessage(err?.data.error);
      },
    });
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
                message: "Please input your Terminal Address  !",
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
            // rules={[{ required: true, message: "Please input your CompanyName!" }]}
          />
        </Div>
        <Div>
          <Label>Status</Label>
          <FormInput
            // name="status"
            bg="#ffffff"
            padding="25px 10px"
            h="69px"
            // rules={[{ required: true, message: "Please input your CompanyName!" }]}
          />
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
          <FormInput
            // name="city"
            bg="#ffffff"
            padding="25px 10px"
            h="69px"
            // rules={[{ required: true, message: "Please input your CompanyName!" }]}
          />
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
                message: "Please input your companyAddress !",
              },
            ]}
          />
        </Div>
        <Div>
          <Label>Address Line 2</Label>
          <FormInput
            // name="companyAddress2"
            bg="#ffffff"
            padding="25px 10px"
            h="69px"
            // rules={[{ required: true, message: "Please input your companyAddress2 !" }]}
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
                message: "Please input your homeTerminalTimezone !",
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
            rules={[{ required: true, message: "Please input your State !" }]}
          />
        </Div>
      </StyleFlex>

      <StyleFlex>
        <Div>
          <Label>Start of week</Label>
          <FormInput
            // name="startOfWeek"
            bg="#ffffff"
            padding="25px 10px"
            h="69px"
            // rules={[{ required: true, message: "Please input your homeTerminalTimezone !" }]}
          />{" "}
        </Div>
        <Div>
          <Label>Email</Label>
          <FormInput
            name="mail"
            bg="#ffffff"
            padding="25px 10px"
            h="69px"
            rules={[
              { required: true, message: "Please input your Email !" },
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
            // name="password"
            bg="#ffffff"
            padding="25px 10px"
            h="69px"

            // rules={[{ required: true, message: "Please input your homeTerminalTimezone !" }]}
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
            // type="text"
          />
        </Div>
      </StyleFlex>
      <UploadBtn onClick={handleImageUpload}>
        {image && (
          <div style={{ position: "relative", display: "inline-block" }}>
            <img
              src={image}
              alt="Tanlangan rasm"
              style={{
                width: "70px",
                height: "70px",
                objectFit: "cover",
                borderRadius: "8px",
                border: "1px solid #ddd",
              }}
            />
            <button
              onClick={handleRemoveImage}
              style={{
                position: "absolute",
                top: "5px",
                right: "5px",
                backgroundColor: "red",
                color: "white",
                border: "none",
                padding: "1px 5px",
                cursor: "pointer",
                borderRadius: "50%",
              }}
            >
              ✕
            </button>
          </div>
        )}
        <TiDownload />
        <Text> Upload company logo</Text>
      </UploadBtn>

      <Form.Item
        name={"note"}
        rules={[
          {
            required: true,
            message: "Please input your Phone number !",
          },
        ]}
      >
        <Note placeholder="Note" />
      </Form.Item>
      <Flex $justify="end" $gap={"20px"} onClick={handleReset}>
        <DefaultBtn
        
        >
          cancel
        </DefaultBtn>
        <PrimaryBtn
          padding="15px 40px"
          htmlType="submit"
          loading={companyMutation.isLoading}
        >
          Submit
        </PrimaryBtn>
      </Flex>
    </Form>
  );
};
