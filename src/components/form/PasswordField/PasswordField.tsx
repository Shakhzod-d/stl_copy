import {
  Controller,
  RegisterOptions,
  FieldValues,
  Control,
  Path,
} from "react-hook-form";
import { Input, InputProps } from "antd";
import Icon from "@/components/icon/Icon";

interface Props<T extends FieldValues = any> extends InputProps {
  control: Control<T>;
  name: Path<T>;
  validation?: RegisterOptions;
  label: string;
  errorText?: string;
}

function PasswordField<T extends FieldValues>({
  type,
  control,
  name,
  validation,
  label,
  errorText,
  className,
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
          className={`password-field-wrapper ${
            error ? "error" : ""
          } ${className}`}
        >
          {label && <label>{label}</label>}
          <Input.Password
            type={type}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            ref={ref}
            status={error && "error"}
            name={name}
            autoComplete={autoComplete}
            iconRender={(visible) =>
              visible ? (
                <span
                  role="img"
                  aria-label="eye-invisible"
                  tabIndex={-1}
                  className="anticon anticon-eye-invisible ant-input-password-icon"
                >
                  <Icon icon="eye" className="eye-icon" />
                </span>
              ) : (
                <span
                  role="img"
                  aria-label="eye"
                  tabIndex={-1}
                  className="anticon anticon-eye ant-input-password-icon"
                >
                  <Icon icon="eye-off" className="eye-icon" />
                </span>
              )
            }
            {...props}
          />
          {error && (
            <span className="error-text">
              {error.message || errorText || "Please fill in the field"}
            </span>
          )}
        </div>
      )}
      name={name}
      control={control}
      rules={{ required: required, ...validation }}
    />
  );
}

export default PasswordField;
