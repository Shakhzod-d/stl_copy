import { ISetState } from "@/types";
import { Select as AntSelect } from "antd";
import React from "react";
import Icon from "../../icon/Icon";

const { Option } = AntSelect;

interface Props {
     label?: string;
     placeholder: string;
     disabled?: boolean;
     className?: string;
     showSearch?: boolean;
     loading?: boolean;
     labelProp?: string;
     labelProp2?: string;
     valueProp?: string;
     data: any;
     allowClear?: boolean;
     value: any;
     setValue: ISetState<any>;
     defaultValue?: any;
}

const Select: React.FC<Props> = ({
     label = "",
     placeholder = "",
     disabled = false,
     className = "",
     showSearch = true,
     loading = false,
     allowClear = true,
     data = [],
     labelProp = "name",
     labelProp2,
     valueProp = "_id",
     value,
     defaultValue,
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
                    filterOption={(input, option) =>
                         (option!.children as unknown as string)
                              ?.toLowerCase()
                              .includes(input?.toLowerCase())
                    }
                    value={value}
                    onChange={setValue}
                    loading={loading}
                    disabled={disabled}
                    allowClear={allowClear}
                    defaultValue={defaultValue}
                    suffixIcon={loading ? undefined : <Icon icon="drop-down" />}
               >
                    {data.map((item: any, i: number) =>
                         typeof item === "object" ? (
                              <Option key={i} value={item[valueProp]}>
                                   {item[labelProp]}{" "}
                                   {labelProp2 ? item[labelProp2] : ""}
                              </Option>
                         ) : (
                              <Option key={i} value={item}>
                                   {item}
                              </Option>
                         )
                    )}
               </AntSelect>
          </div>
     );
};

export default Select;
