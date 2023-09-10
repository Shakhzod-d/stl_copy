import { useEffect, useMemo } from "react";
import { Col, Row } from "antd";
import { useForm } from "react-hook-form";
import FormModal from "@/components/elements/FormModal";
import TextField from "@/components/form/TextField";

import { EMAIL_PATTERN, role_names } from "@/constants";
import PasswordField from "@/components/form/PasswordField/index";
import useApi from "@/hooks/useApi";
import Select from "@/components/form/Select";
import PhoneField from "@/components/form/PhoneField";
import { IUserForm } from "@/types/user.type";
import useApiMutation from "@/hooks/useApiMutation";
import useApiMutationID from "@/hooks/useApiMutationID";
import { getLocalStorage } from "@/utils";

interface Props {
     toggle: () => void;
     editingUserId: string | undefined;
     onSuccess: () => void;
}

const ActionModal: React.FC<Props> = ({ toggle, editingUserId: id, onSuccess }) => {
     const { handleSubmit, control, reset } = useForm<IUserForm>();

     // get one company to update
     const { data, isLoading } = useApi(`/user/${id}`, {}, { enabled: Boolean(id) });

     const { mutate: createMutate, isLoading: createLoading } = useApiMutation("/user");
     const { mutate: updateMutate, isLoading: updateLoading } = useApiMutationID("PUT", "/user");

     useEffect(() => {
          const item: IUserForm = data?.data
          if (item)
               reset({
                    firstName: item.firstName,
                    lastName: item.lastName,
                    email: item.email,
                    phone: item.phone,
                    password: item.password,
                    role: item.role,
               });
     }, [data]);

     const roles = useMemo(() => {
          return role_names.filter(el => el.forCompany)
     }, [role_names])

     const submitFunc = (data: IUserForm) => {
          data.companyId = getLocalStorage("companyId")
          if (id) updateMutate({ id, data }, { onSuccess });
          else createMutate(data, { onSuccess });
     };

     return (
          <FormModal
               visible={true}
               onCancel={toggle}
               loading={createLoading || updateLoading}
               modalLoading={isLoading}
               modalTitle="Assign User"
               width={800}
               formId="create-service-form"
          >
               <form
                    onSubmit={handleSubmit(submitFunc)}
                    id="create-service-form"
               >
                    <Row gutter={[24, 24]}>
                         <Col span={12}>
                              <TextField
                                   label="First name"
                                   placeholder="First name"
                                   name="firstName"
                                   control={control}
                              />
                         </Col>
                         <Col span={12}>
                              <TextField
                                   label="Last name"
                                   placeholder="Last name"
                                   name="lastName"
                                   control={control}
                              />
                         </Col>
                         <Col span={12}>
                              <Select
                                   label={"Role*"}
                                   placeholder="Choose role"
                                   data={roles}
                                   labelProp="name"
                                   valueProp="value"
                                   name="role"
                                   control={control}
                                   required
                              />
                         </Col>
                         <Col span={12}>
                              <PhoneField
                                   label="Phone number"
                                   placeholder="Phone number"
                                   name="phone"
                                   control={control}
                              />
                         </Col>
                         <Col span={12}>
                              <TextField
                                   label={"Email*"}
                                   placeholder={"Email"}
                                   name="email"
                                   control={control}
                                   autoComplete={"off"}
                                   validation={{
                                        pattern: {
                                             value: EMAIL_PATTERN,
                                             message: "Please enter the correct email",
                                        },
                                   }}
                                   required
                              />
                         </Col>
                         <Col span={12}>
                              <PasswordField
                                   label="Password*"
                                   placeholder="Password"
                                   name="password"
                                   autoComplete={"off"}
                                   control={control}
                                   validation={{
                                        minLength: {
                                             value: 5,
                                             message: "Password should contain at least 5 characters",
                                        },
                                   }}
                                   required
                              />
                         </Col>
                    </Row>
               </form>
          </FormModal>
     );
};

export default ActionModal;
