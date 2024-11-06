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
import api from "@/api";
import { useImageUpload } from "@/track/hooks/use-debauce";
import { useMutation } from "react-query";

interface CompanyData {
  [key: string]: number | boolean | string;
}

export const TabCompany = () => {
  const companyMutation = useApiMutation("/company", { hideMessage: true });

  const { image, file, handleImageUpload, handleRemoveImage } =
    useImageUpload();

  const [form] = Form.useForm();

  const submitImage = async (file: File | null) => {
    if (!file) throw new Error("No file selected");

    const formData = new FormData();
    formData.append("image", file);

    const response = await api.post("/company/logo", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  };

  const handleReset = () => {
    form.resetFields(); // Formani tozalash
  };
  const mutation = useMutation(() => submitImage(file), {
    onSuccess: (res) => {
      console.log(res);
      alert("Image uploaded successfully!");
    },
    onError: (err: any) => {
      console.error(err);
      alert(`Error uploading image: ${err.message}`);
    },
  });

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
        <DefaultBtn onClick={() => mutation.mutate()}>cancel</DefaultBtn>
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
