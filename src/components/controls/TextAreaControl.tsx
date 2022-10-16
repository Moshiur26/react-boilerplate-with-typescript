import { FC } from "react";
import { Controller } from "react-hook-form";
import { Input } from "antd";

const { TextArea } = Input;
interface TextAreaControlProps {
  name: string;
  type?: string;
  control: any;
  errors?: any;
  isDisabled?: boolean;
  placeholder?: string;
  maxLength?: number;
  className?: string;
}
export const TextAreaControl: FC<TextAreaControlProps> = ({
  name,
  type = "text",
  control,
  errors,
  isDisabled = false,
  placeholder = "",
  maxLength = 1000,
  className = "",
}) => {
  let errMsg = errors?.[name]?.message;
  return (
    <div>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <TextArea
            allowClear
            {...field}
            id={name}
            className={`!rounded-lg !my-1 ${className}`}
            status={errMsg && "error"}
            size="large"
            rows={4}
            maxLength={maxLength}
            disabled={isDisabled}
            placeholder={placeholder}
          />
        )}
      />
      <p className="text-red-600 text-xs">{errMsg}</p>
    </div>
  );
};
