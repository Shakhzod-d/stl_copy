import TextField from "@/components/form/TextField";
import { Button } from "antd";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

interface IEditFormProps {
  item: EditFormValues;
}

interface EditFormValues {
  _id: string | null;
  driver: string;
  trailers: string;
  notes: string;
  documents: string;
}

interface Props extends IEditFormProps {
  setOpenEdit: (el: boolean) => void;
  handleLogForm: (data: EditFormValues) => void;
}

export const EditForm = ({ item, setOpenEdit, handleLogForm }: Props) => {
  
  const { control, reset, handleSubmit } =
    useForm<EditFormValues>({});

    useEffect(() => {
      reset({
        driver: item?.driver || "",
        trailers: item?.trailers || "",
        notes: item?.notes || "",
        documents: item?.documents || ""
      })
    }, [item])

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
            name="documents"
            required
            placeholder="test"
            control={control}
            label="shipping docs"
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
