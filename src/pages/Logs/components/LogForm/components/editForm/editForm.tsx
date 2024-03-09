import TextField from "@/components/form/TextField";
import { Button, Col, Row, Alert, message } from "antd";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLogsInnerContext } from "../../../LogsInner.context";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { putLogForm } from "@/store/slices/logSlice";
import { AppDispatch } from "@/store";
import { log } from "console";

interface IEditFormProps {
  item: EditFormValues;
}

interface EditFormValues {
  _id: string;
  driver: string;
  mile: number;
  trailers: string;
  notes: string;
}

interface Props extends IEditFormProps {
  setOpenEdit: (el: boolean) => void;
}

export const EditForm = ({ item, setOpenEdit }: Props) => {
  const { control, reset, handleSubmit } =
    useForm<EditFormValues>({
      defaultValues: {
        _id: item?._id || "",
        driver: item?.driver || "",
        mile: item?.mile || 0,
        trailers: item?.trailers || "",
        notes: item?.notes || "",
      },
    });

  const dispatch = useDispatch<AppDispatch>();

  const handleLogForm: SubmitHandler<EditFormValues> = (data) => {
    if (!data.driver || !data.mile || !data.trailers || !data.notes) {
      return;
    }else{

      dispatch(putLogForm(data));
      setOpenEdit(false);
      message.success('Success');
    }
  };

  return (
    <form
      className="mb-24 log-correction-form"
      onSubmit={handleSubmit(handleLogForm)}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          border: "1px solid #ececee",
          marginBottom: "18px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          padding: "8px 4px 4px 4px",
          borderRadius: "6px",
          width: "100%",
          height: "80px",
        }}
      >
        <div>
          <TextField
            style={{ width: "150px", height: "28px" }}
            name="notes"
            required
            placeholder="test"
            control={control}
            label="notes"
          />
        </div>
        <div>
          <TextField
            style={{ width: "150px", height: "28px" }}
            name="trailers"
            required
            placeholder="test"
            control={control}
            label="trailers"
          />
        </div>
        <div>
          <TextField
            style={{ width: "150px", height: "28px" }}
            name="driver"
            required
            placeholder="test"
            control={control}
            label="driver"
          />
        </div>
        <div>
          <TextField
            style={{ width: "150px", height: "28px" }}
            name="mile"
            required
            placeholder="test"
            control={control}
            label="mile"
          />
        </div>
        <Button
          className="w-150"
          style={{ width: "150px", height: "28px", fontSize: "12px" }}
          onClick={() => setOpenEdit(false)}
        >
          Cancel
        </Button>

        <Button
          type="primary"
          className="w-150"
          style={{ width: "150px", height: "28px", fontSize: "12px" }}
          htmlType="submit"
        >
          Save
        </Button>
      </div>
    </form>
  );
};
