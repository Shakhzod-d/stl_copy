import { Controller, RegisterOptions, FieldValues, Control, Path } from "react-hook-form";
import { Input, InputProps } from "antd";

interface Props<T extends FieldValues = any> extends InputProps {
     control: Control<T>
     name: Path<T>
     validation?: RegisterOptions
     label: string
     errorText?: string
}

function TextField<T extends FieldValues>({
     control,
     validation,
     label,
     errorText,
     className,
     name,
     required,
     autoComplete = "off",
     ...props
}: Props<T>) {
     return (
          <Controller
               render={({
                    field: { onChange, onBlur, value, name, ref },
                    fieldState: { error },
               }) => (
                    <div
                         className={`text-field-wrapper ${error ? "error" : ""
                              } ${className}`}
                    >
                         {label && <label>{label}</label>}
                         <Input
                              value={value}
                              onChange={onChange}
                              onBlur={onBlur}
                              ref={ref}
                              status={error && "error"}
                              name={name}
                              autoComplete={autoComplete}
                              {...props}
                         />
                         {error && (
                              <span className="error-text">
                                   {error.message ||
                                        errorText ||
                                        "Please fill in the field"}
                              </span>
                         )}
                    </div>
               )}
               name={name}
               control={control}
               rules={{ required: required, ...validation }}
          />
     );
};

export default TextField;
