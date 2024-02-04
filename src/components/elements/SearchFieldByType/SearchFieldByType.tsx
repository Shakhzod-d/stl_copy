import React from "react";
import { Select as AntSelect } from "antd";
import Icon from "../../icon/Icon";
import { ISetState } from "@/types";

const { Option } = AntSelect;

interface Props {
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  showSearch?: boolean;
  loading?: boolean;
  labelProp?: string;
  valueProp?: string;
  data?: any;
  allowClear?: boolean;
  value?: any;
  setValue?: ISetState<any>;
}

const SearchFieldByType: React.FC<Props> = ({
  label = "",
  placeholder = "",
  disabled = false,
  className = "",
  showSearch = true,
  loading = false,
  allowClear = false,
  data = [],
  labelProp = "name",
  valueProp = "_id",
  value = "",
  setValue,
}) => {
  return (
    <div className={`selection-wrapper ${className}`}>
      {label && <label>{label}</label>}
      <AntSelect
        style={{ width: "100%" }}
        showSearch={showSearch}
        placeholder={placeholder || "Tanlang"}
        optionFilterProp="children"
        filterOption={false}
        value={value}
        onChange={setValue}
        loading={loading}
        disabled={disabled}
        allowClear={allowClear}
        suffixIcon={<Icon icon="drop-down" />}
      >
        {data.map((item: any) => (
          <Option key={item[valueProp]} value={item[valueProp]}>
            {item[labelProp]}
          </Option>
        ))}
      </AntSelect>
    </div>
  );
};

export default SearchFieldByType;
