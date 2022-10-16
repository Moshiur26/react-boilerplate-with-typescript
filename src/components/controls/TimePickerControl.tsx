import { FC } from "react";
import { Controller } from "react-hook-form";
import { DatePicker, TimePicker } from "antd";
import moment from "moment";

interface TimePickerProps {
  name: string;
  control: any;
  errors?: any;
  isDisabled?: boolean;
  placeholder?: string;
  format?: string;
  className?: string;
  use12Hours?: boolean;
}
export const TimePickerControl: FC<TimePickerProps> = ({
  name,
  control,
  errors,
  isDisabled = false,
  placeholder = "12:00 AM",
  format = "h:mm a",
  className = "",
  use12Hours = true,
}) => {
  let errMsg = errors?.[name]?.message;
  return (
    <div>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <TimePicker
            {...field}
            id={name}
            className={`!rounded-lg !my-1 !w-full ${className}`}
            status={errMsg && "error"}
            use12Hours
            format={format} 
            size="large"
            disabled={isDisabled}
            placeholder={placeholder}
            placement={"bottomLeft"}
            value={field.value ? moment(field.value) : null}
          />
        )}
      />
      <p className="text-red-600 text-xs">{errMsg}</p>
    </div>
  );
};
