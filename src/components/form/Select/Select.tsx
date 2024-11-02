import {
  Control,
  Controller,
  RegisterOptions,
  FieldValues,
  Path,
} from "react-hook-form";
import { Select as AntSelect, SelectProps } from "antd";
import Icon from "../../icon/Icon";

const { Option } = AntSelect;

interface Props<T extends FieldValues = any> extends SelectProps {
  control: Control<T>;
  name: Path<T>;
  required?: boolean;
  validation?: RegisterOptions;
  label: string;
  errorText?: string;
  labelProp?: string;
  valueProp?: string;
  data?: any[];
  renderValidation?: boolean;
}

function Select<T extends FieldValues>({
  control,
  name,
  required,
  validation,
  label,
  errorText,
  className,
  data = [],
  labelProp = "name",
  renderValidation = true,
  valueProp = "_id",
  ...props
}: Props<T>) {
  return (
    <Controller
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState: { error },
      }) => (
        <div
          className={`selection-wrapper ${error ? "error" : ""} ${className}`}
        >
          {label && <label>{label}</label>}
          <AntSelect
            style={{ width: "100%", overflow: "hidden" }}
            showSearch={true}
            placeholder={props.placeholder || "Tanlang"}
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option!?.children as unknown as string)
                ?.toLowerCase?.()
                .includes?.(input?.toLowerCase?.())
            }
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            ref={ref}
            status={renderValidation ? "" : error && "error"}
            allowClear={true}
            suffixIcon={props.loading ? undefined : <Icon icon="drop-down" />}
            {...props}
          >
            {data?.map((item: any, i: number) =>
              typeof item === "object" ? (
                <Option key={i} value={item[valueProp]}>
                  {item[labelProp]}
                </Option>
              ) : (
                <Option key={i} value={item}>
                  {item}
                </Option>
              )
            )}
          </AntSelect>
          {renderValidation && error && (
            <span className="error-text">
              {error.message || errorText || "Please select value"}
            </span>
          )}
        </div>
      )}
      name={name}
      control={control}
      rules={{ required: required }}
    />
  );
}

export default Select;
