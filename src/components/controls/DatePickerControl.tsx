import { FC } from "react";
import { Controller } from "react-hook-form";
import { DatePicker } from "antd";
import moment from "moment";

interface DatePickerProps {
  name: string;
  control: any;
  errors?: any;
  isDisabled?: boolean;
  placeholder?: string;
  format?: string;
  className?: string;
  showTime?: boolean;
}
export const DatePickerControl: FC<DatePickerProps> = ({
  name,
  control,
  errors,
  isDisabled = false,
  placeholder = "DD/MM/YYYY",
  format = "DD/MM/YYYY",
  className = "",
  showTime = false
}) => {
  let errMsg = errors?.[name]?.message;
  return (
    <div>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <DatePicker
            allowClear
            {...field}
            id={name}
            className={`!rounded-lg !my-1 !w-full ${className}`}
            status={errMsg && "error"}
            size="large"
            disabled={isDisabled}
            placeholder={placeholder}
            placement={"bottomLeft"}
            format={format}
            value={field.value ? moment(field.value) : null}
            showTime={showTime}
          />
        )}
      />
      <p className="text-red-600 text-xs">{errMsg}</p>
    </div>
  );
};
