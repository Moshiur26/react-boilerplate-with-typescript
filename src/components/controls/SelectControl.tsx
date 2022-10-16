import { FC, useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import { Select } from "antd";

const { Option } = Select;

interface option {
  value: string | number | boolean;
  label: string | number;
}
interface SelectControlProps {
  name: string;
  control: any;
  options: option[];
  defaultValue?: any;
  multiple?: boolean;
  errors?: any;
  isDisabled?: boolean;
  placeholder?: string;
  className?: string;
  mode?: string;
}

export const SelectControl: FC<SelectControlProps> = ({
  name,
  control,
  options,
  defaultValue,
  multiple = false,
  errors,
  isDisabled = false,
  placeholder = "",
  className = "",
  mode = "create"
}) => {
  const [optionList, setOptionList] = useState<any>([]);

  useEffect(() => {
    setOptionList(options);
  }, [options]);
  let errMsg = errors?.[name]?.message;

  

  return (
    <div className="my-select-container">
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Select
            {...field}
            defaultValue={defaultValue}
            mode={multiple ? "multiple" : undefined}
            placeholder={placeholder}
            disabled={isDisabled}
            className={`!py-2 !w-full ${className}`}
            status={errMsg && "error"}
            size="large"
            // allowClear
            bordered
          >
            {!defaultValue ? <Option value="0" 
             disabled={mode === 'create' ? true : false}
            >{placeholder}</Option> : null}

            {optionList.length > 0 && (
              <>
                {optionList?.map((item: any, index: any) => (
                  <Option key={`${index}-${item.value}`} value={item?.value}>
                    {item?.label}
                  </Option>
                ))}
              </>
            )}
          </Select>
        )}
      />
      <p className="text-red-600 text-xs">{errMsg}</p>
    </div>
  );
};
