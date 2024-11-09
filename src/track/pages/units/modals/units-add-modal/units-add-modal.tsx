import { Form } from "antd";
import { ModalCheckBox, ModalTextArea, ModalTitle } from "./styled";
// import { DefaultBtn, PrimaryBtn } from "../../../pages/units/units-styled";
// import { FormInput, FormSelect } from "../../ui";
import { Dispatch, SetStateAction } from "react";
// import {
//   CustomModal,
//   fuelType,
//   makesState,
//   models,
//   stateSelect,
//   yearState,
// }
//  from "../../../utils/constants";
// }
import { RuleObject } from "antd/es/form";
import useApiMutation from "@/hooks/useApiMutation";
import { errorMessage, successMessage } from "@/utils";
import {
  CustomModal,
  fuelType,
  makesState,
  models,
  stateSelect,
  Text,
  yearState,
} from "@/track/constants";
import { Flex } from "@/track/components/shared/drivers-header/drivers-header-styled";
import { FormInput, FormSelect } from "@/track/components/ui";
import { DefaultBtn, PrimaryBtn } from "../../units-styled";
import { Select } from "@/track/components/shared/select";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
// import useApiMutation from "../../../hooks/useApiMutation";
// import { errorMessage, successMessage } from "../../../utils/message";
interface Prop {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  refetch: () => void;
}
interface Data {
  [key: string]: string | boolean;
}

export const UnitsAddModal = ({ open, setOpen, refetch }: Prop) => {
  const unitsMutation = useApiMutation("/vehicle", { hideMessage: true });

  const dark = useSelector((state: RootState) => state.booleans.darkMode);

  const [form] = Form.useForm();

  const handleReset = () => {
    form.resetFields(); // Formani tozalash
    setOpen(false);
  };

  const validateLength = (_: RuleObject, value: string) => {
    if (value && value.length === 17) {
      return Promise.resolve();
    }
    return Promise.reject(
      new Error("The input must be exactly 17 characters long!")
    );
  };

  //--------------submit
  const submit = (data: Data) => {
    unitsMutation.mutate(data, {
      onSuccess: (res: unknown) => {
        console.log(res);

        successMessage("vehicle created added");
        handleReset();
        refetch();
      },
      onError: (err) => {
        errorMessage(`${err.data.message}  (${err.data.data})`);
      },
    });
  };
  const selectBg = dark ? "#373737" : "#F9F9FA";
  //--------------submit end
  return (
    <CustomModal
      centered
      open={open}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      width={1000}
    >
      <ModalTitle>Create Vehicle</ModalTitle>

      <Flex $vertical={true}  $w="100%">
        <Form onFinish={submit} form={form} style={{ width: "100%" }}>
          <Flex $justify="space-between" $gap="10px" $w="100%" $m={"0"}>
            <FormInput
              placeholder="Vehicle ID"
              // name="vehicle_id"
              disabled={true}
              rules={[
                {
                  required: true,
                  message: "Please input your Vehicle ID",
                },
              ]}
            />
            <Select
              placeholder={"Makes"}
              bg={selectBg}
              rules={[
                {
                  required: true,
                  message: "Please input your Makes",
                },
              ]}
              // pClr="#000"
              option={makesState}
              h={"60px"}
              name="make"
              w="100%"
            />
          </Flex>

          <Flex $justify="space-between" $gap="10px" $w="100%">
            <Select
              bg={selectBg}
              w="100%"
              placeholder={"Models"}
              rules={[
                {
                  required: true,
                  message: "Please input your Models",
                },
              ]}
              option={models}
              h={"60px"}
              name="model"
            />

            <FormInput
              placeholder="Licensec Plate No"
              name="licensePlateNo"
              rules={[
                {
                  required: true,
                  message: "Please input your Licensec Plate No",
                },
              ]}
            />
          </Flex>

          <Flex $justify="space-between" $gap="10px" $w="100%" $m="0 0 10px 0">
            <Select
              placeholder={"License Plate Issuing State"}
              bg={selectBg}
              w="100%"
              option={stateSelect}
              h={"60px"}
              // name="licensec_state"
              // rules={[
              //   {
              //     required: true,
              //     message: "License Plate Issuing State",
              //   },
              // ]}
            />
            <Select
              bg={selectBg}
              w="100%"
              placeholder={"Year"}
              option={yearState}
              h={"60px"}
              name="year"
              rules={[
                {
                  required: true,
                  message: "Please input your Year",
                },
              ]}
            />
          </Flex>

          <Flex $w="100%">
            <Select
             bg={selectBg}
              w="100%"
              placeholder={"fuel type"}
              option={fuelType}
              h={"60px"}
              name="fuelType"
              rules={[
                {
                  required: true,
                  message: "Please input your Fuel type",
                },
              ]}
            />
          </Flex>

          <Form.Item
            name={"notes"}
            rules={[
              {
                required: true,
                message: "Please input your notes",
              },
            ]}
          >
            <ModalTextArea placeholder="Notes" />
          </Form.Item>

          <Flex $vertical={true}>
            <ModalCheckBox>
              <Text>Enter Vin Manually</Text>
            </ModalCheckBox>
            <FormInput
              placeholder="Type"
              name="vin"
              rules={[
                {
                  required: true,
                  message: "Please input 17 characters!",
                },
                {
                  validator: validateLength,
                },
              ]}
            />
          </Flex>

          <Flex $vertical={true}>
            <ModalCheckBox>
              <Text>Get Automatically from ELD ( recommended )</Text>
            </ModalCheckBox>
            <FormInput
              placeholder="Type"
              name="unit"
              rules={[
                {
                  required: true,
                  message: "Please input your uint",
                },
              ]}
            />
          </Flex>

          <Flex $justify="end" $gap={"10px"}>
            <DefaultBtn
              onClick={handleReset}
              style={{ width: "200px", height: "55px" }}
            >
              Close
            </DefaultBtn>

            <PrimaryBtn
              style={{ width: "200px", height: "55px" }}
              htmlType="submit"
              loading={unitsMutation.isLoading}
            >
              Save
            </PrimaryBtn>
          </Flex>
        </Form>
      </Flex>
    </CustomModal>
  );
};
