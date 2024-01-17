import { Button } from "antd";
import React from "react";
import { useForm } from "react-hook-form";
import TextField from "@/components/form/TextField";
const NAMES = {
     firstName: "firstName",
     lastName: "secondName",
     phoneNumber: "phoneNumber",
};
interface IFormData {
     firstName: string;
     lastName: string;
     phoneNumber: string;
}

const Profile: React.FC = () => {
     const { control, handleSubmit } = useForm<IFormData>();
     const onSubmit = (formData: IFormData) => { };
     return (
          <div className="profile-container page">
               <h1>Profile</h1>
               <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="profile-form-container"
               >
                    <TextField
                         placeholder="First name"
                         label="First name"
                         control={control}
                         name="firstName"
                    />
                    <TextField
                         placeholder="Last name"
                         label="Last name"
                         control={control}
                         name="lastName"
                    />
                    <TextField
                         placeholder="Phone name"
                         label="Phone name"
                         control={control}
                         name="phoneNumber"
                    />
               </form>

               <Button type="dashed">Cancel</Button>
               <Button type="primary" htmlType="submit">
                    OK
               </Button>
          </div>
     );
};

export default Profile;
