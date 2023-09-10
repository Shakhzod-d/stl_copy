import React, { useEffect, useState } from "react";
import { CloseCircleFilled } from "@ant-design/icons";
import { Input } from "antd";
import { ISetState } from "@/types";
import Icon from "../../icon/Icon";

interface Props {
     name?: string;
     label?: string;
     placeholder?: string;
     disabled?: boolean;
     autoComplete?: "on" | "off";
     className?: string;
     query: any;
     showSearch?: boolean;
     setQuery: ISetState<any>;
     timeout?: number
}

const SearchField: React.FC<Props> = ({
     name = "",
     label = "",
     className = "",
     placeholder = "",
     disabled = false,
     autoComplete = "off",
     query,
     setQuery,
     showSearch = true,
     timeout = 500
}) => {
     const [value, setValue] = useState<string | undefined>(query);

     useEffect(() => {
          const timer = setTimeout(() => {
               setQuery(value || undefined)
          }, timeout)
          return () => clearTimeout(timer)
     }, [value])

     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          setValue(e.target.value);
     };

     const handleClear = () => {
          setValue(undefined);
          setQuery(undefined);
     };

     return (
          <div className={`text-field-wrapper ${className}`}>
               {label && <label>{label}</label>}
               <div
                    className={`text-field-suffix ${!showSearch ? "unicon" : ""
                         }`}
               >
                    {showSearch && <Icon icon="search" />}
                    <Input
                         value={value}
                         onChange={handleChange}
                         placeholder={placeholder}
                         name={name}
                         disabled={disabled}
                         autoComplete={autoComplete}
                    />
                    {query && <CloseCircleFilled onClick={handleClear} />}
               </div>
          </div>
     );
};

export default SearchField;
